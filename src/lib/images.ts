/**
 * '/images/atelier/x.jpg'  ->  '/images/thumbs/atelier/x.jpg.jpg'
 * The small (800px) copies are made by `npm run images` (scripts/optimize-images.mjs).
 */
export function thumbSrc(src: string): string {
  return src.startsWith('/images/') && !src.startsWith('/images/thumbs/')
    ? `${src.replace('/images/', '/images/thumbs/')}.jpg`
    : src;
}
