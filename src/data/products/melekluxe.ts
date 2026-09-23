import type { Product } from '@/types';

/**
 * MELEK LUXE  (collection value: 'Melek Luxe Collections')
 * Image folder: /public/images/melekluxe
 *
 * Adding to this lineup:
 *   1. Drop the photo in /public/images/melekluxe
 *   2. Add its path to `melekluxeGallery`
 *   3. Add the product to `melekluxeProducts` (marked at the bottom)
 */

// ─── Images ──────────────────────────────────────────────────────────────

/** Cover shown on the Melek Luxe collection card (collectionImages['Melek Luxe Collections']). */
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
  '/images/melekluxe/IMG_0537.heic.jpg',
  '/images/melekluxe/IMG_0574.JPG',
  '/images/melekluxe/IMG_0588.JPG',
  '/images/melekluxe/IMG_0640.JPG',
  '/images/melekluxe/IMG_0696.heic.jpg',
  '/images/melekluxe/IMG_1173.jpg',
  '/images/melekluxe/IMG_1305.jpg',
  '/images/melekluxe/IMG_1308.jpg',
];

// ─── Products ────────────────────────────────────────────────────────────

export const melekluxeProducts: Product[] = [
  {
    id: 'luxe-round-neck-cream',
    name: 'Melek Luxe Round-Neck Tee',
    collection: 'Melek Luxe Collections',
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
    signatureLabel: 'Melek Luxe Round-Neck Tees',
    signatureDescription: 'Minimalist, high-fit crew necks made for refined everyday dressing.',
  },
  {
    id: 'melek-round-neck-two-piece-set',
    name: 'Melek Round-Neck Two-Piece Set',
    collection: 'Melek Luxe Collections',
    category: 'Sets',
    price: 80000,
    description: 'The Melek Luxe round-neck tee with its matching bottom, cut as one coordinated up-and-down set in the same premium slub knit.',
    colors: [
      { name: 'Forest', hex: '#3f5a45' },
      { name: 'Plum', hex: '#6b4560' },
      { name: 'Mustard', hex: '#d9a441' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: ['/images/melekluxe/IMG_1308.jpg', '/images/melekluxe/IMG_4658.JPG', '/images/melekluxe/IMG_4662.JPG', '/images/melekluxe/IMG_1305.jpg'],
    signatureLabel: 'Two-Piece Sets',
    signatureDescription: 'Up-and-down sets from Atelier and Melek Luxe, cut to match.',
  },
  {
    id: 'melek-round-neck',
    name: 'Melek Luxe Round Neck 2piece-sets',
    collection: 'Melek Luxe Collections',
    category: 'Shorts',
    price: 60000,
    description: 'A relaxed short nicker in the Melek Luxe knit — the easy, everyday bottom to wear with any Melek tee or shirt.',
    colors: [
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Forest', hex: '#3f5a45' },
      { name: 'Plum', hex: '#6b4560' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: ['/images/melekluxe/IMG_4662.JPG', '/images/melekluxe/IMG_1305.jpg', '/images/melekluxe/IMG_1308.jpg'],
  },

  // ▼▼▼ ADD NEW MELEK LUXE PRODUCTS BELOW THIS LINE ▼▼▼
];
