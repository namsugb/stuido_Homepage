export const imagePresets = {
    hero: {
        priority: true,
        placeholder: "empty" as const,
        quality: 90,
        sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
    },
    gallery: {
        priority: false,
        placeholder: "empty" as const,
        quality: 85,
        sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    },
    thumbnail: {
        priority: false,
        placeholder: "empty" as const,
        quality: 75,
        sizes: "(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
    },
    profile: {
        priority: true,
        placeholder: "empty" as const,
        quality: 90,
        sizes: "(max-width: 768px) 100vw, 400px"
    },
    product: {
        priority: false,
        placeholder: "empty" as const,
        quality: 85,
        sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    },
    event: {
        priority: false,
        placeholder: "empty" as const,
        quality: 80,
        sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
    }
}
