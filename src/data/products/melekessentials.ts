import type { Product } from '@/types';

/**
 * MELEK ESSENTIALS  (collection value: 'Melek Essentials')
 * Image folder: /public/images/melekessentials
 */

export const essentialsCoverImage = '/images/melekessentials/E8986025-5727-4C92-8FF5-06387BF074B5.jpg';

export const melekessentialsGallery = [
  '/images/melekessentials/09046B03-28F4-4E04-815F-32F2FE26BE02.jpg',
  '/images/melekessentials/30f5ce44-c810-473b-976e-857559e0b9ea.jpg',
  '/images/melekessentials/38d82a32-1a32-443e-858d-1a5b7410d9f8.JPG',
  '/images/melekessentials/A03CFD22-69E6-4FAF-8B61-92684EF4FFA4.jpg',
  '/images/melekessentials/B66A65FA-EA2C-4D36-A83F-0039FB25D405.jpg',
  '/images/melekessentials/bb00ab0d-c550-45db-bd8d-666937598242.JPG',
  '/images/melekessentials/E4A2BB48-CF03-4858-83D3-62326C7FF19E.jpg',
  '/images/melekessentials/E8986025-5727-4C92-8FF5-06387BF074B5.jpg',
  '/images/melekessentials/IMG_0131.JPG',
  '/images/melekessentials/IMG_0133.jpg',
  '/images/melekessentials/IMG_0560.jpg',
  '/images/melekessentials/IMG_9181.jpg',
  '/images/melekessentials/IMG_9877.JPG',
  '/images/melekessentials/IMG_9878.JPG',
  '/images/melekessentials/IMG_9879.JPG',
];

export const melekessentialsProducts: Product[] = [
  {
    id: 'essential-crewneck-tee',
    name: 'Melek Essential Crewneck Tee',
    collection: 'Melek Essentials',
    category: 'Tops',
    price: 45000,
    description:
      'An indispensable luxury daily staple cut from premium heavy-combed organic cotton with a reinforced ribbed crew neckline. Engineered for enduring shape retention, an effortless drape, and breathable all-day comfort.',
    colors: [
      { name: 'White', hex: '#ffffff' },
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Forest Green', hex: '#3b4b32' },
      { name: 'Wine', hex: '#4a1521' },
      { name: 'Powder Blue', hex: '#9bb7d4' },
      { name: 'Mocha', hex: '#553828' },
      { name: 'Lavender', hex: '#8a7eb5' },
      { name: 'Blush', hex: '#e8c4c4' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    images: [
      '/images/melekessentials/E8986025-5727-4C92-8FF5-06387BF074B5.jpg',
      '/images/melekessentials/09046B03-28F4-4E04-815F-32F2FE26BE02.jpg',
      '/images/melekessentials/38d82a32-1a32-443e-858d-1a5b7410d9f8.JPG',
      '/images/melekessentials/A03CFD22-69E6-4FAF-8B61-92684EF4FFA4.jpg',
      '/images/melekessentials/30f5ce44-c810-473b-976e-857559e0b9ea.jpg',
    ],
    signatureLabel: 'Essential Crewneck Tees',
    signatureDescription: 'Classic heavy-combed cotton crewnecks in signature colorways.',
  },
  {
    id: 'essential-tipped-rib-tee',
    name: 'Melek Essential Tipped Tee',
    collection: 'Melek Essentials',
    category: 'Tops',
    price: 48000,
    description:
      'Subtle athletic heritage meets modern tailoring. Tailored with contrasting ribbed tipping at the sleeve cuffs and collar for an understated accent on a relaxed silhouette.',
    colors: [
      { name: 'Ivory / Black', hex: '#f0e6d9' },
      { name: 'Olive / Black', hex: '#3b4b32' },
      { name: 'Lavender / White', hex: '#8a7eb5' },
      { name: 'Chocolate / Black', hex: '#553828' },
      { name: 'Sky Blue / White', hex: '#9bb7d4' },
      { name: 'Black / White', hex: '#1a1a1a' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    images: [
      '/images/melekessentials/E4A2BB48-CF03-4858-83D3-62326C7FF19E.jpg',
      '/images/melekessentials/09046B03-28F4-4E04-815F-32F2FE26BE02.jpg',
      '/images/melekessentials/B66A65FA-EA2C-4D36-A83F-0039FB25D405.jpg',
      '/images/melekessentials/30f5ce44-c810-473b-976e-857559e0b9ea.jpg',
    ],
    signatureLabel: 'Essential Tipped Tees',
    signatureDescription: 'Signature contrast tipped rib trims on ultra-soft combed cotton.',
  },
  {
    id: 'essential-palette-trio',
    name: 'The Essentials Palette Trio',
    collection: 'Melek Essentials',
    category: 'Sets',
    price: 125000,
    description:
      'A curated three-piece bundle of our signature essentials tees. Select from our earth tone, monochromatic, or muted pastel palette sets crafted from dense 280gsm combed cotton.',
    colors: [
      { name: 'Earth Trio', hex: '#553828' },
      { name: 'Monochromatic Trio', hex: '#1a1a1a' },
      { name: 'Pastel Trio', hex: '#e8c4c4' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      '/images/melekessentials/09046B03-28F4-4E04-815F-32F2FE26BE02.jpg',
      '/images/melekessentials/E8986025-5727-4C92-8FF5-06387BF074B5.jpg',
      '/images/melekessentials/E4A2BB48-CF03-4858-83D3-62326C7FF19E.jpg',
      '/images/melekessentials/38d82a32-1a32-443e-858d-1a5b7410d9f8.JPG',
      '/images/melekessentials/IMG_0560.jpg',
    ],
    signatureLabel: 'Essential Palette Bundles',
    signatureDescription: 'Curated multi-piece essentials sets crafted for effortless daily rotation.',
  },
];
