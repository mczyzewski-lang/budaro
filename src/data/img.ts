import type { ImageMetadata } from 'astro';
const all = import.meta.glob<{ default: ImageMetadata }>('../assets/**/*.webp', { eager: true });
/** img('modele/heaven-1') -> ImageMetadata */
export function img(path: string): ImageMetadata {
  const hit = all[`../assets/${path}.webp`];
  if (!hit) throw new Error(`Brak obrazu: ${path}`);
  return hit.default;
}
