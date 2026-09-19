import type { Product } from '@/types';

/**
 * MELEK LUXE  (collection value: 'Melek Luxe Round Neck')
 * Image folder: /public/images/melekluxe
 *
 * Adding to this lineup:
 *   1. Drop the photo in /public/images/melekluxe
 *   2. Add its path to `melekluxeGallery`
 *   3. Add the product to `melekluxeProducts` (marked at the bottom)
 */

// ─── Images ──────────────────────────────────────────────────────────────

/** Cover shown on the Melek Luxe collection card (collectionImages['Melek Luxe Round Neck']). */
export const melekluxeCoverImage = '/images/melekluxe/IMG_0574.JPG';

/** Local shortcuts for shots reused across this lineup's products. */
const img = {
  hero: '/images/melekluxe/IMG_1448.JPG',
  IMG_0574: '/images/melekluxe/IMG_0574.JPG',
  IMG_0588: '/images/melekluxe/IMG_0588.JPG',
};

// ─── Gallery ─────────────────────────────────────────────────────────────

export const melekluxeGallery = [
  '/images/melekluxe/fliq Media 14.jpg',
  '/images/melekluxe/FM 1.JPG',
  '/images/melekluxe/FM 2.JPG',
  '/images/melekluxe/FM 4.JPG',
  '/images/melekluxe/IMG_0537.heic',
  '/images/melekluxe/IMG_0574.JPG',
  '/images/melekluxe/IMG_0588.JPG',
  '/images/melekluxe/IMG_0640.JPG',
  '/images/melekluxe/IMG_0696.heic',
  '/images/melekluxe/IMG_1173.jpg',
  '/images/melekluxe/IMG_1305.jpg',
  '/images/melekluxe/IMG_1308.jpg',
];

// ─── Products ────────────────────────────────────────────────────────────

export const melekluxeProducts: Product[] = [
  {
    id: 'luxe-round-neck-cream',
    name: 'Luxe Round-Neck Top',
    collection: 'Melek Luxe Round Neck',
    category: 'Tops',
    price: 50000,
    description: 'A minimalist, high-fit crew neck made for refined everyday dressing. Crafted from premium slub knit for a subtle texture that elevates the simplest silhouette.',
    colors: [
      { name: 'Cream', hex: '#f9f4ed' },
      { name: 'Cocoa', hex: '#6f4a36' },
      { name: 'Black', hex: '#1a1a1a' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [img.IMG_0574, img.IMG_0588, img.hero],
    signatureLabel: 'Luxe Round-Neck Tops',
    signatureDescription: 'Minimalist, high-fit crew necks made for refined everyday dressing.',
  },
  {
    id: 'luxe-round-neck-stone',
    name: 'Luxe Round-Neck Top — Stone',
    collection: 'Melek Luxe Round Neck',
    category: 'Tops',
    price: 65000,
    description: 'The Luxe Round-Neck in a warm stone tone. A minimalist, high-fit crew neck in premium slub knit for refined everyday luxury.',
    colors: [
      { name: 'Stone', hex: '#c2ab87' },
      { name: 'Cream', hex: '#f9f4ed' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [img.IMG_0588, img.IMG_0574, img.hero],
    signatureLabel: 'Luxe Round-Neck Tops',
    signatureDescription: 'Minimalist, high-fit crew necks made for refined everyday dressing.',
  },
  {
    id: 'luxe-textured-knit-polo',
    name: 'Luxe Textured Knit Polo',
    collection: 'Melek Luxe Round Neck',
    category: 'Polos',
    price: 78000,
    description: 'A tweed-effect textured knit polo with a black collar and ribbed cuffs, striking a balance between the line\'s minimalist ethos and a more tactile, patterned finish.',
    colors: [{ name: 'Tweed Multi', hex: '#8a7d6a' }],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/images/melekluxe/fliq Media 14.jpg',
      '/images/melekluxe/FM 1.JPG',
      '/images/melekluxe/FM 2.JPG',
      '/images/melekluxe/FM 4.JPG',
    ],
    signatureLabel: 'Textured Knit Polos',
    signatureDescription: 'A patterned, tactile counterpoint to the line\'s minimalist round-neck staples.',
  },
  {
    id: 'luxe-oversized-tee',
    name: 'Luxe Oversized Tee',
    collection: 'Melek Luxe Round Neck',
    category: 'Tops',
    price: 45000,
    description: 'A heavyweight, boxy-fit crew-neck tee finished with a subtle embroidered logo — the everyday essential beneath the Luxe line\'s more elevated pieces.',
    colors: [
      { name: 'Ivory', hex: '#f0e6d9' },
      { name: 'Black', hex: '#1a1a1a' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      '/images/melekluxe/IMG_0537.heic',
      '/images/melekluxe/IMG_0640.JPG',
      '/images/melekluxe/IMG_0696.heic',
      '/images/melekluxe/IMG_1173.jpg',
      '/images/melekluxe/IMG_1305.jpg',
      '/images/melekluxe/IMG_1308.jpg',
    ],
    signatureLabel: 'Oversized Essential Tees',
    signatureDescription: 'Heavyweight, relaxed-fit tees finished with a subtle embroidered logo.',
  },

  // ▼▼▼ ADD NEW MELEK LUXE PRODUCTS BELOW THIS LINE ▼▼▼
];
