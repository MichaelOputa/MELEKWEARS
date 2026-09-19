import type { JournalArticle } from '@/types';
import { rivieraHeroImage } from './riviera';
import { atelierFabricImage, craftsmanshipImages } from './atelier';
import { aboutNigeriaImage } from './brand';

export const journalArticles: JournalArticle[] = [
  {
    id: 'inside-riviera',
    title: 'Inside the Riviera Collection',
    category: 'Collections',
    excerpt: 'An exploration of the open-collar silhouette and the resort-inspired philosophy behind our signature leisurewear line.',
    image: rivieraHeroImage,
    date: '',
  },
  {
    id: 'art-of-open-collar',
    title: 'The Art of the Open-Collar Polo',
    category: 'Craftsmanship',
    excerpt: 'How the placket-less, buttonless collar became a defining gesture of casual elegance in modern menswear.',
    image: atelierFabricImage,
    date: '',
  },
  {
    id: 'texture-modern-luxury',
    title: 'Why Texture Defines Modern Luxury',
    category: 'Fabrics',
    excerpt: 'From multi-tonal bouclé to waffle weaves — the tactile fabrics that distinguish MelekWears from the ordinary.',
    image: craftsmanshipImages.texture,
    date: '',
  },
  {
    id: 'made-in-nigeria',
    title: 'Made in Nigeria: Craftsmanship Without Compromise',
    category: 'Nigerian Fashion',
    excerpt: 'A reflection on building a luxury fashion house in Lagos that meets global standards of quality and finish.',
    image: aboutNigeriaImage,
    date: '',
  },
];
