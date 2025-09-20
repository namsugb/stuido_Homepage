#!/usr/bin/env node
/**
 * Rename files in public folder based on their path structure.
 * Files will be renamed to: path1_path2_01.ext, path1_path2_02.ext, etc.
 * 
 * Usage examples:
 *   node scripts/rename-path-based.js --dir ./public
 *   node scripts/rename-path-based.js --dir ./public --dry-run
 *   node scripts/rename-path-based.js --dir ./public --start-number 1
 */

import fs from 'fs';
import path from 'path';

function parseArgs() {
    const args = process.argv.slice(2);
    const options = {
        dir: './public',
        dryRun: false,
        startNumber: 1,
        include: ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.bmp', '.tiff'],
        excludeDirs: ['node_modules', '.git', '.next']
    };

    for (let i = 0; i < args.length; i++) {
        const a = args[i];
        if (a === '--dir' || a === '-d') options.dir = args[++i];
        else if (a === '--dry-run') options.dryRun = true;
        else if (a === '--start-number') options.startNumber = parseInt(args[++i]) || 1;
        else if (a === '--include') options.include = args[++i].split(',').map(s => s.trim().toLowerCase());
        else if (a === '--exclude-dirs') options.excludeDirs = args[++i].split(',').map(s => s.trim());
    }
    return options;
}

function isImageFile(filePath, includeExts) {
    const ext = path.extname(filePath).toLowerCase();
    return includeExts.includes(ext);
}

function getPathBasedName(filePath, baseDir, startNumber) {
    // Get relative path from base directory
    const relativePath = path.relative(baseDir, filePath);

    // Get directory path (without filename)
    const dirPath = path.dirname(relativePath);

    // Get file extension
    const ext = path.extname(filePath);

    // If file is in root of public folder
    if (dirPath === '.') {
        return `root_${startNumber.toString().padStart(2, '0')}${ext}`;
    }

    // Convert directory path to underscore-separated string
    const pathParts = dirPath.split(path.sep);
    const pathString = pathParts.join('_');

    // Create filename: path1_path2_01.ext
    return `${pathString}_${startNumber.toString().padStart(2, '0')}${ext}`;
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

async function renameFiles() {
    const opts = parseArgs();
    const baseDir = path.resolve(opts.dir);

    if (!fs.existsSync(baseDir)) {
        console.error(`Directory does not exist: ${baseDir}`);
        process.exit(1);
    }

    console.log(`Scanning directory: ${baseDir}`);
    console.log(`Include extensions: ${opts.include.join(', ')}`);
    console.log(`Start number: ${opts.startNumber}`);
    console.log(`Dry run: ${opts.dryRun ? 'Yes' : 'No'}`);
    console.log('---');

    // Group files by their directory path
    const filesByDir = new Map();

    for await (const filePath of walk(baseDir, opts.excludeDirs)) {
        if (!isImageFile(filePath, opts.include)) continue;

        const dirPath = path.dirname(filePath);
        if (!filesByDir.has(dirPath)) {
            filesByDir.set(dirPath, []);
        }
        filesByDir.get(dirPath).push(filePath);
    }

    if (filesByDir.size === 0) {
        console.log('No image files found to rename.');
        return;
    }

    let totalRenamed = 0;
    let totalSkipped = 0;

    for (const [dirPath, files] of filesByDir) {
        console.log(`\nProcessing directory: ${path.relative(baseDir, dirPath) || 'root'}`);

        // Sort files to ensure consistent ordering
        files.sort();

        for (let i = 0; i < files.length; i++) {
            const filePath = files[i];
            const fileName = path.basename(filePath);
            const newName = getPathBasedName(filePath, baseDir, opts.startNumber + i);
            const newPath = path.join(dirPath, newName);

            // Check if new filename already exists
            if (fs.existsSync(newPath) && newPath !== filePath) {
                console.log(`  [SKIP] ${fileName} -> ${newName} (file already exists)`);
                totalSkipped++;
                continue;
            }

            if (opts.dryRun) {
                console.log(`  [DRY]  ${fileName} -> ${newName}`);
            } else {
                try {
                    await fs.promises.rename(filePath, newPath);
                    console.log(`  [DONE] ${fileName} -> ${newName}`);
                    totalRenamed++;
                } catch (error) {
                    console.error(`  [ERROR] Failed to rename ${fileName}: ${error.message}`);
                    totalSkipped++;
                }
            }
        }
    }

    console.log('\n---');
    console.log(`Summary:`);
    console.log(`  Total renamed: ${totalRenamed}`);
    console.log(`  Total skipped: ${totalSkipped}`);

    if (opts.dryRun) {
        console.log(`\nThis was a dry run. No files were actually renamed.`);
        console.log(`Run without --dry-run to actually rename the files.`);
    }
}

// Handle command line errors
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

renameFiles().catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
});
