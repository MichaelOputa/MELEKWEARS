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
export const rivieraCoverImage = '/images/rivieracollection/4E922519-1B74-40F6-9214-3E489E32947E.PNG';

/** Lifestyle hero shot. Also used by the "Inside the Riviera Collection" journal article. */
export const rivieraHeroImage = '/images/rivieracollection/IMG_0146.JPG';

/** Local shortcuts for shots reused across this lineup's products. */
const img = {
  IMG_0312: '/images/rivieracollection/IMG_0312.JPG',
  IMG_2164: '/images/rivieracollection/IMG_2164.JPG',
  IMG_6337: '/images/rivieracollection/IMG_6337.JPG',
  IMG_6368: '/images/rivieracollection/IMG_6368.JPG',
  IMG_6628: '/images/rivieracollection/IMG_6628.JPG',
  IMG_6634: '/images/rivieracollection/IMG_6634.jpg',
};

// ─── Gallery ─────────────────────────────────────────────────────────────

export const rivieracollectionGallery = [
  '/images/rivieracollection/4E922519-1B74-40F6-9214-3E489E32947E.PNG',
  '/images/rivieracollection/5BFFE213-6DF7-443F-BA95-496F1F05BAD1.PNG',
  '/images/rivieracollection/C7C5E311-E4EF-496B-A637-20C3A0494B28.PNG',
  '/images/rivieracollection/IMG_0414.heic',
  '/images/rivieracollection/IMG_0433.heic',
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

export const rivieraProducts: Product[] = [
  {
    id: 'The Collared Riviera Shirt',
    name: 'The Collared Riviera Shirt',
    collection: 'Riviera',
    category: 'Polos',
    price: 85000,
    description: 'A placket-less, buttonless open-collar polo designed for casual elegance. Cut from breathable cotton with a relaxed resort silhouette and contrast ribbed tipping along the sleeve cuffs and bottom hem.',
    colors: [
      { name: 'Ivory', hex: '#f0e6d9' },
      { name: 'Stone', hex: '#c2ab87' },
      { name: 'Chocolate', hex: '#553828' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [img.IMG_0312, img.IMG_2164, rivieraHeroImage],
    signatureLabel: 'The Collared Riviera Shirt',
    signatureDescription: 'Placket-less, buttonless collars designed for casual elegance.',
  },
  {
    id: 'lounge-trouser-chocolate',
    name: 'Relaxed Lounge Trouser',
    collection: 'Riviera',
    category: 'Trousers',
    price: 75000,
    description: 'Relaxed-fit tailored trousers designed for effortless style. Made from a breathable cotton blend with a clean drape that transitions seamlessly from leisure to evening.',
    colors: [
      { name: 'Chocolate', hex: '#553828' },
      { name: 'Stone', hex: '#c2ab87' },
      { name: 'Black', hex: '#1a1a1a' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [img.IMG_6337, img.IMG_6368, img.IMG_0312],
    signatureLabel: 'Two-Piece Sets & Lounge Trousers',
    signatureDescription: 'Relaxed-fit tailored trousers and coordinated sets designed for effortless style.',
  },
  {
    id: 'riviera-two-piece-ivory',
    name: 'Riviera Two-Piece Set',
    collection: 'Riviera',
    category: 'Sets',
    price: 155000,
    description: 'A coordinated two-piece set featuring the open-collar Johnny polo and matching lounge trouser. Designed for a unified resort silhouette with contrast ribbed tipping.',
    colors: [
      { name: 'Ivory', hex: '#f0e6d9' },
      { name: 'Stone', hex: '#c2ab87' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [img.IMG_6628, img.IMG_6634, rivieraHeroImage],
    signatureLabel: 'Two-Piece Sets & Lounge Trousers',
    signatureDescription: 'Relaxed-fit tailored trousers and coordinated sets designed for effortless style.',
  },
  {
    id: 'riviera-johnny-polo-cocoa',
    name: 'Riviera Johnny Polo — Cocoa',
    collection: 'Riviera',
    category: 'Polos',
    price: 85000,
    description: 'The signature open-collar Johnny polo in a deep cocoa tone. Placket-less, buttonless, and cut from breathable cotton with contrast ribbed tipping.',
    colors: [
      { name: 'Cocoa', hex: '#6f4a36' },
      { name: 'Ivory', hex: '#f0e6d9' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [img.IMG_2164, img.IMG_0312, rivieraHeroImage],
    signatureLabel: 'Open-Collar Johnny Polos',
    signatureDescription: 'Placket-less, buttonless collars designed for casual elegance.',
  },
  {
    id: 'riviera-open-collar-polo-sand',
    name: 'Riviera Open-Collar Polo — Sand',
    collection: 'Riviera',
    category: 'Polos',
    price: 88000,
    description: 'A textured, seersucker-effect open-collar polo in warm sand, finished with a contrast black collar and ribbed black-and-white tipping at the cuffs and hem.',
    colors: [
      { name: 'Sand', hex: '#c8b28a' },
      { name: 'Black', hex: '#1a1a1a' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/images/rivieracollection/4E922519-1B74-40F6-9214-3E489E32947E.PNG',
      '/images/rivieracollection/IMG_0414.heic',
      '/images/rivieracollection/IMG_0433.heic',
    ],
    signatureLabel: 'Open-Collar Johnny Polos',
    signatureDescription: 'Placket-less, buttonless collars designed for casual elegance.',
  },
  {
    id: 'riviera-open-collar-polo-navy',
    name: 'Riviera Open-Collar Polo — Navy',
    collection: 'Riviera',
    category: 'Polos',
    price: 88000,
    description: 'A deep navy open-collar polo in a fine ribbed knit, with a black collar and clean black-and-white tipping — a sharper, evening-ready take on the signature Johnny polo.',
    colors: [
      { name: 'Navy', hex: '#1b2a4a' },
      { name: 'Black', hex: '#1a1a1a' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: ['/images/rivieracollection/5BFFE213-6DF7-443F-BA95-496F1F05BAD1.PNG'],
    signatureLabel: 'Open-Collar Johnny Polos',
    signatureDescription: 'Placket-less, buttonless collars designed for casual elegance.',
  },
  {
    id: 'riviera-heritage-stripe-polo',
    name: 'Riviera Heritage Stripe Polo',
    collection: 'Riviera',
    category: 'Polos',
    price: 90000,
    description: 'A bold rust-and-navy striped polo with fine white pinstripes and a black collar, bringing a heritage sportswear edge to the Riviera line.',
    colors: [
      { name: 'Rust', hex: '#8a3f2a' },
      { name: 'Navy', hex: '#1b2a4a' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: ['/images/rivieracollection/C7C5E311-E4EF-496B-A637-20C3A0494B28.PNG'],
    signatureLabel: 'Open-Collar Johnny Polos',
    signatureDescription: 'Placket-less, buttonless collars designed for casual elegance.',
  },

  // ▼▼▼ ADD NEW RIVIERA PRODUCTS BELOW THIS LINE ▼▼▼
];
