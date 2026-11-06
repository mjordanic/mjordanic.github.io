import type { ImageMetadata } from "astro";

// Resolve image file names from projects.json to optimised assets.
const images = import.meta.glob<{ default: ImageMetadata }>("../assets/projects/*/*.{png,jpg,jpeg,webp}", {
  eager: true,
});

export function projectImage(slug: string, file: string): ImageMetadata {
  const key = `../assets/projects/${slug}/${file}`;
  const mod = images[key];
  if (!mod) {
    throw new Error(`Missing project image: ${key}`);
  }
  return mod.default;
}
