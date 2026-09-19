import type { Product } from '@/types';

/**
 * RIVIERA COLLECTION
 * Image folder: /public/images/rivieracollection
 *
 * Adding to this lineup:
 *   1. Drop the photo in /public/images/rivieracollection
 *   2. Add its path to `rivieracollectionGallery`
 *   3. Add the product to `rivieraProducts` (marked at the bottom)
 */

// ─── Images ──────────────────────────────────────────────────────────────

/** Cover shown on the Riviera collection card (collectionImages.Riviera). */
export const rivieraCoverImage = '/images/rivieracollection/4E922519-1B74-40F6-9214-3E489E32947E.jpg';

/** Lifestyle hero shot. Also used by the "Inside the Riviera Collection" journal article. */
export const rivieraHeroImage = '/images/rivieracollection/IMG_0146.JPG';

/** Local shortcuts for shots reused across this lineup's products. */
const img = {
  IMG_0312: '/images/rivieracollection/IMG_0312.JPG',
  IMG_2164: '/images/rivieracollection/IMG_2164.JPG',
};

// ─── Gallery ─────────────────────────────────────────────────────────────

export const rivieracollectionGallery = [
  '/images/rivieracollection/4E922519-1B74-40F6-9214-3E489E32947E.jpg',
  '/images/rivieracollection/5BFFE213-6DF7-443F-BA95-496F1F05BAD1.jpg',
  '/images/rivieracollection/C7C5E311-E4EF-496B-A637-20C3A0494B28.jpg',
  '/images/rivieracollection/IMG_0414.heic.jpg',
  '/images/rivieracollection/IMG_0433.heic.jpg',
  '/images/rivieracollection/IMG_0055.JPG',
  '/images/rivieracollection/IMG_0146.JPG',
  '/images/rivieracollection/IMG_0312.JPG',
  '/images/rivieracollection/IMG_2164.JPG',
  '/images/rivieracollection/IMG_6337.JPG',
  '/images/rivieracollection/IMG_6368.JPG',
  '/images/rivieracollection/IMG_6628.JPG',
  '/images/rivieracollection/IMG_6634.jpg',
  '/images/rivieracollection/IMG_7492.JPG',
];

// ─── Products ────────────────────────────────────────────────────────────

// Riviera is shirts only — Melek doesn't sell trousers, it styles these shirts
// with different trousers. All Riviera shirts are short sleeve.

export const rivieraProducts: Product[] = [
  {
    id: 'The Collared Riviera Shirt',
    name: 'The Collared Riviera Shirt',
    collection: 'Riviera',
    category: 'Polos',
    price: 50000,
    description: 'A short-sleeve, placket-less, buttonless open-collar Melek polo designed for casual elegance. Cut from breathable cotton with a relaxed resort silhouette and contrast ribbed tipping along the sleeve cuffs and bottom hem.',
    colors: [
      { name: 'Ivory', hex: '#f0e6d9' },
      { name: 'Stone', hex: '#c2ab87' },
      { name: 'Chocolate', hex: '#553828' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [img.IMG_0312, img.IMG_2164, rivieraHeroImage],
    signatureLabel: 'Open-Collar Melek Polos',
    signatureDescription: 'Placket-less, buttonless collars designed for casual elegance.',
  },
  {
    id: 'riviera-open-collar-polo-sand',
    name: 'The Collared Riviera Shirt — Sand',
    collection: 'Riviera',
    category: 'Polos',
    price: 50000,
    description: 'The short-sleeve open-collar Melek polo in a textured, seersucker-effect warm sand, finished with a contrast black collar and ribbed black-and-white tipping at the cuffs and hem.',
    colors: [
      { name: 'Sand', hex: '#c8b28a' },
      { name: 'Black', hex: '#1a1a1a' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/images/rivieracollection/4E922519-1B74-40F6-9214-3E489E32947E.jpg',
      '/images/rivieracollection/IMG_0414.heic.jpg',
      '/images/rivieracollection/IMG_0433.heic.jpg',
    ],
    signatureLabel: 'Open-Collar Melek Polos',
    signatureDescription: 'Placket-less, buttonless collars designed for casual elegance.',
  },
  {
    id: 'riviera-open-collar-polo-navy',
    name: 'The Collared Riviera Shirt — Navy',
    collection: 'Riviera',
    category: 'Polos',
    price: 50000,
    description: 'The short-sleeve open-collar Melek polo in deep navy fine ribbed knit, with a black collar and clean black-and-white tipping — a sharper, evening-ready take on the Riviera shirt.',
    colors: [
      { name: 'Navy', hex: '#1b2a4a' },
      { name: 'Black', hex: '#1a1a1a' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: ['/images/rivieracollection/5BFFE213-6DF7-443F-BA95-496F1F05BAD1.jpg'],
    signatureLabel: 'Open-Collar Melek Polos',
    signatureDescription: 'Placket-less, buttonless collars designed for casual elegance.',
  },
  {
    id: 'riviera-heritage-stripe-polo',
    name: 'The Collared Riviera Shirt — Heritage Stripe',
    collection: 'Riviera',
    category: 'Polos',
    price: 50000,
    description: 'The short-sleeve open-collar Melek polo in a bold rust-and-navy stripe with fine white pinstripes and a black collar, bringing a heritage sportswear edge to the Riviera line.',
    colors: [
      { name: 'Rust', hex: '#8a3f2a' },
      { name: 'Navy', hex: '#1b2a4a' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: ['/images/rivieracollection/C7C5E311-E4EF-496B-A637-20C3A0494B28.jpg'],
    signatureLabel: 'Open-Collar Melek Polos',
    signatureDescription: 'Placket-less, buttonless collars designed for casual elegance.',
  },

  // ▼▼▼ ADD NEW RIVIERA PRODUCTS BELOW THIS LINE ▼▼▼
];
