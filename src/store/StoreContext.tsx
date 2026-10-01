import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Product, CartItem, Size } from '@/types';
import { products as starterProducts } from '@/data/products';
import { supabase } from '@/lib/supabase';

interface StoreContextValue {
  products: Product[];
  saveProduct: (product: Product) => Promise<void>;
  deleteProduct: (product: Product) => Promise<void>;
  cart: CartItem[];
  wishlist: string[];
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isMenuOpen: boolean;
  addToCart: (product: Product, size: Size, color: string, quantity?: number) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setMenuOpen: (open: boolean) => void;
  cartCount: number;
  cartTotal: number;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(starterProducts);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('melek-cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('melek-wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setCartOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    void supabase
      .from('catalog_products')
      .select('id, product, is_deleted')
      .then(({ data }) => {
        if (!active || !data) return;
        const overrides = new Map(data.map((row) => [row.id, row.product as Product]));
        const deleted = new Set(data.filter((row) => row.is_deleted).map((row) => row.id));
        const merged = starterProducts
          .filter((product) => !deleted.has(product.id))
          .map((product) => overrides.get(product.id) ?? product);
        for (const row of data) {
          if (!row.is_deleted && !starterProducts.some((product) => product.id === row.id)) {
            merged.push(row.product as Product);
          }
        }
        setProducts(merged);
      });
    return () => {
      active = false;
    };
  }, []);

  const saveProduct = async (product: Product) => {
    if (!supabase) throw new Error('Connect Supabase before saving products.');
    const { error } = await supabase.from('catalog_products').upsert({
      id: product.id,
      product,
      is_deleted: false,
    });
    if (error) throw error;
    setProducts((current) => {
      const index = current.findIndex((item) => item.id === product.id);
      if (index < 0) return [...current, product];
      return current.map((item) => (item.id === product.id ? product : item));
    });
  };

  const deleteProduct = async (product: Product) => {
    if (!supabase) throw new Error('Connect Supabase before deleting products.');
    const { error } = await supabase.from('catalog_products').upsert({
      id: product.id,
      product,
      is_deleted: true,
    });
    if (error) throw error;
    setProducts((current) => current.filter((item) => item.id !== product.id));
  };

  useEffect(() => {
    localStorage.setItem('melek-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('melek-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product: Product, size: Size, color: string, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size && item.color === color,
      );
      if (existing >= 0) {
        const next = [...prev];
        next[existing].quantity += quantity;
        return next;
      }
      return [...prev, { product, size, color, quantity }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) => {
      const next = [...prev];
      next[index].quantity = quantity;
      return next;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        products,
        saveProduct,
        deleteProduct,
        cart,
        wishlist,
        isCartOpen,
        isSearchOpen,
        isMenuOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        setCartOpen,
        setSearchOpen,
        setMenuOpen,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
