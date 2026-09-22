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

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  created_at?: string;
  updated_at?: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  id?: string;
  order_id?: string;
  product_id: string;
  product_name: string;
  product_image?: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  created_at?: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id?: string | null;
  customer_email: string;
  customer_name: string;
  customer_phone?: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state?: string;
  shipping_postal_code?: string;
  shipping_country: string;
  shipping_cost: number;
  subtotal: number;
  total: number;
  status: OrderStatus;
  payment_method: string;
  payment_status: string;
  created_at: string;
  order_items?: OrderItem[];
}

