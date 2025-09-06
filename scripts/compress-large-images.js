#!/usr/bin/env node
/**
 * Compress images larger than 1MB to <= 1MB.
 * - Recursively walks a target directory (default: project root)
 * - Supports JPEG/JPG/PNG/WebP/AVIF
 * - Tries quality/resize strategies to fit under 1MB while balancing quality
 *
 * Usage examples:
 *   node scripts/compress-large-images.js --dir ./public --maxMB 1
 *   node scripts/compress-large-images.js --dir ./assets --concurrency 4
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const sharp = require('sharp');

const BYTES_PER_MB = 1024 * 1024;

function parseArgs() {
    const args = process.argv.slice(2);
    const options = {
        dir: process.cwd(),
        maxMB: 1,
        concurrency: Math.max(2, Math.min(os.cpus()?.length || 4, 8)),
        dryRun: false,
        include: ['.jpg', '.jpeg', '.png', '.webp', '.avif'],
        excludeDirs: ['node_modules', '.next', '.git']
    };

    for (let i = 0; i < args.length; i++) {
        const a = args[i];
        if (a === '--dir' || a === '-d') options.dir = path.resolve(args[++i]);
        else if (a === '--maxMB') options.maxMB = Number(args[++i]) || 1;
        else if (a === '--concurrency' || a === '-c') options.concurrency = Number(args[++i]) || options.concurrency;
        else if (a === '--dry-run') options.dryRun = true;
        else if (a === '--include') options.include = args[++i].split(',').map(s => s.trim().toLowerCase());
        else if (a === '--exclude-dirs') options.excludeDirs = args[++i].split(',').map(s => s.trim());
    }
    return options;
}

function isImageFile(filePath, includeExts) {
    const ext = path.extname(filePath).toLowerCase();
    return includeExts.includes(ext);
}

async function* walk(dir, excludeDirs) {
    const entries = await fs.promises.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            if (excludeDirs.includes(entry.name)) continue;
            yield* walk(fullPath, excludeDirs);
        } else if (entry.isFile()) {
            yield fullPath;
        }
    }
}

async function compressToTarget(inputPath, maxBytes) {
    const ext = path.extname(inputPath).toLowerCase();
    const original = await fs.promises.readFile(inputPath);
    if (original.byteLength <= maxBytes) return { changed: false };

    const image = sharp(original, { failOn: 'none' });
    const metadata = await image.metadata();

    const targetFormat = (ext === '.png' || ext === '.webp' || ext === '.avif') ? ext.slice(1) : 'jpeg';

    const qualitySteps = [80, 70, 60, 50, 40, 32, 25];
    const resizeScales = [1.0, 0.9, 0.8, 0.7, 0.6, 0.5];

    for (const scale of resizeScales) {
        const width = metadata.width ? Math.max(1, Math.floor(metadata.width * scale)) : undefined;
        const height = metadata.height ? Math.max(1, Math.floor(metadata.height * scale)) : undefined;

        for (const quality of qualitySteps) {
            let pipeline = sharp(original, { failOn: 'none' });
            if (width || height) pipeline = pipeline.resize({ width, height, fit: 'inside', withoutEnlargement: true });

            if (targetFormat === 'jpeg' || targetFormat === 'jpg') {
                pipeline = pipeline.jpeg({ quality, mozjpeg: true });
            } else if (targetFormat === 'png') {
                // Use WebP instead of PNG for better compression unless original is PNG and user likely expects PNG.
                // Keep as PNG but with palette to reduce size.
                pipeline = pipeline.png({ quality, palette: true, compressionLevel: 9 });
            } else if (targetFormat === 'webp') {
                pipeline = pipeline.webp({ quality });
            } else if (targetFormat === 'avif') {
                pipeline = pipeline.avif({ quality });
            }

            const outputBuffer = await pipeline.toBuffer();
            if (outputBuffer.byteLength <= maxBytes) {
                return { changed: true, buffer: outputBuffer, width, height, quality };
            }
        }
    }
    // If still too large, return the smallest tried version
    const smallestScale = resizeScales[resizeScales.length - 1];
    const smallestQuality = qualitySteps[qualitySteps.length - 1];
    let pipeline = sharp(original, { failOn: 'none' });
    const width = metadata.width ? Math.max(1, Math.floor(metadata.width * smallestScale)) : undefined;
    const height = metadata.height ? Math.max(1, Math.floor(metadata.height * smallestScale)) : undefined;
    if (width || height) pipeline = pipeline.resize({ width, height, fit: 'inside', withoutEnlargement: true });
    if (targetFormat === 'jpeg' || targetFormat === 'jpg') {
        pipeline = pipeline.jpeg({ quality: smallestQuality, mozjpeg: true });
    } else if (targetFormat === 'png') {
        pipeline = pipeline.png({ quality: smallestQuality, palette: true, compressionLevel: 9 });
    } else if (targetFormat === 'webp') {
        pipeline = pipeline.webp({ quality: smallestQuality });
    } else if (targetFormat === 'avif') {
        pipeline = pipeline.avif({ quality: smallestQuality });
    }
    const buffer = await pipeline.toBuffer();
    return { changed: true, buffer, width, height, quality: smallestQuality };
}

async function run() {
    const opts = parseArgs();
    const maxBytes = Math.max(1, Math.floor(opts.maxMB * BYTES_PER_MB));

    const candidates = [];
    for await (const filePath of walk(opts.dir, opts.excludeDirs)) {
        if (!isImageFile(filePath, opts.include)) continue;
        const stat = await fs.promises.stat(filePath);
        if (stat.size > maxBytes) {
            candidates.push({ filePath, size: stat.size });
        }
    }

    if (candidates.length === 0) {
        console.log(`No images over ${opts.maxMB}MB found in ${opts.dir}`);
        return;
    }

    console.log(`Found ${candidates.length} image(s) over ${opts.maxMB}MB in ${opts.dir}`);

    let active = 0;
    let index = 0;
    let processed = 0;
    let savedTotal = 0;

    function next() {
        if (index >= candidates.length) return Promise.resolve();
        const job = candidates[index++];
        active++;
        return processOne(job)
            .catch(err => {
                console.error(`Error processing ${job.filePath}:`, err?.message || err);
            })
            .finally(() => {
                active--;
            })
            .then(() => {
                if (active < opts.concurrency && index < candidates.length) {
                    return next();
                }
            });
    }

    async function processOne({ filePath, size }) {
        const rel = path.relative(process.cwd(), filePath);
        const beforeKB = (size / 1024).toFixed(1);
        const result = await compressToTarget(filePath, maxBytes);
        if (!result.changed) {
            console.log(`[skip] ${rel} already <= target (${beforeKB}KB)`);
            return;
        }
        const afterKB = (result.buffer.byteLength / 1024).toFixed(1);
        const saved = size - result.buffer.byteLength;
        savedTotal += saved > 0 ? saved : 0;

        if (opts.dryRun) {
            console.log(`[dry]  ${rel} ${beforeKB}KB -> ${afterKB}KB (q=${result.quality}${result.width ? `, w=${result.width}` : ''})`);
            return;
        }

        await fs.promises.writeFile(filePath, result.buffer);
        console.log(`[done] ${rel} ${beforeKB}KB -> ${afterKB}KB (q=${result.quality}${result.width ? `, w=${result.width}` : ''})`);
        processed++;
    }

    const starters = [];
    const initial = Math.min(opts.concurrency, candidates.length);
    for (let i = 0; i < initial; i++) starters.push(next());
    await Promise.all(starters);

    const savedMB = (savedTotal / BYTES_PER_MB).toFixed(2);
    console.log(`Processed ${processed}/${candidates.length} file(s). Total saved ~ ${savedMB} MB.`);
}

run().catch(err => {
    console.error(err);
    process.exitCode = 1;
});


