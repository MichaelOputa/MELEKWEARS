/**
 * PRODUCT DATA — entry point.
 *
 * Everything the rest of the app used to import from `products.ts` is still
 * exported from here, so existing `import { ... } from '@/data/products'` lines
 * keep working (a folder's index.ts resolves the same as the old file).
 *
 * Structure (tab order on the shop page: All → Atelier → Melek Luxe → Riviera):
 *
 *   atelier.ts     Atelier lineup: images, gallery, products
 *   melekluxe.ts   Melek Luxe lineup: images, gallery, products
 *   riviera.ts     Riviera lineup: images, gallery, products
 *   brand.ts       Hero + brand-wide imagery (not a clothing lineup)
 *   journal.ts     Journal articles
 *
 * To add a product      → open that lineup's file, add it under the marked line.
 * To add a new lineup   → copy one lineup file, then add three lines below:
 *                         (1) import it, (2) spread its products into `products`,
 *                         (3) add its cover to `collectionImages` and its
 *                         gallery to `allGalleryImages`.
 */

import type { Product } from '@/types';

import { atelierProducts, atelierGallery, atelierCoverImage } from './atelier';
import { melekluxeProducts, melekluxeGallery, melekluxeCoverImage } from './melekluxe';
import { rivieraProducts, rivieracollectionGallery, rivieraCoverImage } from './riviera';
import { essentialsGallery } from './brand';

// ─── "All" = every lineup, in tab order ──────────────────────────────────

export const products: Product[] = [
  ...atelierProducts,
  ...melekluxeProducts,
  ...rivieraProducts,
];

export const collectionImages = {
  Atelier: atelierCoverImage,
  'Melek Luxe Round Neck': melekluxeCoverImage,
  Riviera: rivieraCoverImage,
};

export const allGalleryImages = Array.from(
  new Set([...atelierGallery, ...essentialsGallery, ...melekluxeGallery, ...rivieracollectionGallery])
);

// ─── Re-exports (unchanged public API) ───────────────────────────────────

export { atelierGallery, craftsmanshipImages } from './atelier';
export { melekluxeGallery } from './melekluxe';
export { rivieracollectionGallery } from './riviera';
export { heroImage, brandStatementImage, aboutImage, packagingImage, essentialsGallery } from './brand';
export { journalArticles } from './journal';

// Per-lineup lists, for pages that render a single collection.
export { atelierProducts, melekluxeProducts, rivieraProducts };
