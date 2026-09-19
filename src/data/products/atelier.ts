import type { Product } from '@/types';

/**
 * ATELIER
 * Image folder: /public/images/atelier
 *
 * Adding to this lineup:
 *   1. Drop the photo in /public/images/atelier
 *   2. Add its path to `atelierGallery`
 *   3. Add the product to `atelierProducts` (marked at the bottom)
 */

// ─── Images ──────────────────────────────────────────────────────────────

/** Cover shown on the Atelier collection card (collectionImages.Atelier). */
export const atelierCoverImage = '/images/atelier/5A0E9C1B-7118-4A81-B01F-DF43C0E4CF25.jpg';

/** Close-up detail shots used in the craftsmanship section. */
export const craftsmanshipImages = {
  trims: '/images/atelier/IMG_2201.JPG.jpeg',
  branding: '/images/atelier/IMG_1782.JPG',
  construction: '/images/atelier/IMG_1850.JPG',
  texture: '/images/atelier/38B7A0A9-A660-4203-B6AE-CB9551A43B38.jpg',
};

/** Fabric close-up used by the "Art of the Open-Collar Polo" journal article. */
export const atelierFabricImage = '/images/atelier/IMG_1753.JPG';

// ─── Gallery ─────────────────────────────────────────────────────────────

export const atelierGallery = [
  '/images/atelier/154AF174-168C-47A0-BDB9-A033B5F44DA0.jpg',
  '/images/atelier/38B7A0A9-A660-4203-B6AE-CB9551A43B38.jpg',
  '/images/atelier/5506B975-8884-4373-8FB5-07096C67EEFE.jpg',
  '/images/atelier/5A0E9C1B-7118-4A81-B01F-DF43C0E4CF25.jpg',
  '/images/atelier/BD033733-A617-4B67-B203-EE22940D9F47.jpg',
  '/images/atelier/FFC65607-0AAA-4124-8BA1-63FD467DCE16.jpg',
  '/images/atelier/IMG_1704.JPG',
  '/images/atelier/IMG_1753.JPG',
  '/images/atelier/IMG_1765.JPG',
  '/images/atelier/IMG_1775.JPG',
  '/images/atelier/IMG_1782.JPG',
  '/images/atelier/IMG_1850.JPG',
  '/images/atelier/IMG_1856.JPG',
  '/images/atelier/IMG_2134.jpg',
];

// ─── Products ────────────────────────────────────────────────────────────

export const atelierProducts: Product[] = [
  {
    id: 'atelier long sleeves',
    name: 'Atelier Collared Shirt',
    collection: 'Atelier',
    category: 'Polos',
    price: 60000,
    description: 'A structured, tactile long-sleeve collared shirt crafted from waffle-weave fabric for texture and comfort. Tailored shoulders and an open placket create a refined resort fit. Styled with the trousers of your choice.',
    colors: [
      { name: 'Stone', hex: '#c2ab87' },
      { name: 'Ivory', hex: '#f0e6d9' },
      { name: 'Espresso', hex: '#3d2820' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      '/images/atelier/154AF174-168C-47A0-BDB9-A033B5F44DA0.jpg',
      '/images/atelier/38B7A0A9-A660-4203-B6AE-CB9551A43B38.jpg',
      '/images/atelier/5506B975-8884-4373-8FB5-07096C67EEFE.jpg',
      '/images/atelier/5A0E9C1B-7118-4A81-B01F-DF43C0E4CF25.jpg',
      '/images/atelier/BD033733-A617-4B67-B203-EE22940D9F47.jpg',
      '/images/atelier/FFC65607-0AAA-4124-8BA1-63FD467DCE16.jpg',
      '/images/atelier/IMG_1704.JPG',
    ],
    signatureLabel: 'Atelier Collared Shirts',
    signatureDescription: 'Structured, tactile long-sleeve shirts crafted for texture and comfort.',
  },
  {
    id: 'atelier-two-piece-set',
    name: 'Atelier Two-Piece Set',
    collection: 'Atelier',
    category: 'Sets',
    price: 85000,
    description: 'The Atelier collared shirt and its matching trouser, cut as one up-and-down set. Heavy-gauge textured knit with structured shoulders and a tailored resort fit.',
    colors: [
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Navy', hex: '#1b2a4a' },
      { name: 'Charcoal', hex: '#4a4a4a' },
      { name: 'Ivory', hex: '#f0e6d9' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      '/images/atelier/IMG_2134.jpg',
      '/images/atelier/IMG_0739.JPG.jpeg',
      '/images/atelier/IMG_0740.JPG.jpeg',
      '/images/atelier/IMG_0742.JPG.jpeg',
      '/images/atelier/IMG_1753.JPG',
      '/images/atelier/IMG_1765.JPG',
      '/images/atelier/IMG_1775.JPG',
      '/images/atelier/IMG_1782.JPG',
    ],
    signatureLabel: 'Two-Piece Sets',
    signatureDescription: 'Up-and-down sets from Atelier and Melek Luxe, cut to match.',
  },

  // ▼▼▼ ADD NEW ATELIER PRODUCTS BELOW THIS LINE ▼▼▼
];
