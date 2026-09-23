export type Collection = 'Riviera' | 'Melek Luxe Collections' | 'Atelier' | 'Melek Essentials';
export type ProductCategory = 'Polos' | 'Tops' | 'Sets' | 'Shorts';

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface Product {
  id: string;
  name: string;
  collection: Collection;
  category: ProductCategory;
  price: number;
  description: string;
  colors: { name: string; hex: string }[];
  sizes: Size[];
  images: string[];
  signatureLabel?: string;
  signatureDescription?: string;
}

export interface CartItem {
  product: Product;
  size: Size;
  color: string;
  quantity: number;
}

export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  date: string;
}



