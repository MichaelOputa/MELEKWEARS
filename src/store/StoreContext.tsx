import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Product, CartItem, Size } from '@/types';
import { supabase } from '@/lib/supabase';

interface StoreContextValue {
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
    localStorage.setItem('melek-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('melek-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync wishlist with Supabase for authenticated users
  useEffect(() => {
    const client = supabase;
    if (!client) return;

    const syncWishlist = async () => {
      try {
        const { data: { session } } = await client.auth.getSession();
        if (!session?.user) return;

        const { data, error } = await client
          .from('user_wishlists')
          .select('product_id')
          .eq('user_id', session.user.id);

        if (!error && data) {
          const remoteProductIds = data.map((item: { product_id: string }) => item.product_id);
          setWishlist((prev) => Array.from(new Set([...prev, ...remoteProductIds])));
        }
      } catch {
        // Silently fall back to local storage
      }
    };

    syncWishlist();

    const { data: sub } = client.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        syncWishlist();
      }
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

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

  const toggleWishlist = async (productId: string) => {
    const isAdding = !wishlist.includes(productId);
    setWishlist((prev) =>
      isAdding ? [...prev, productId] : prev.filter((id) => id !== productId),
    );

    const client = supabase;
    if (client) {
      try {
        const { data: { session } } = await client.auth.getSession();
        if (session?.user) {
          if (isAdding) {
            await client.from('user_wishlists').upsert(
              { user_id: session.user.id, product_id: productId },
              { onConflict: 'user_id,product_id' }
            );
          } else {
            await client
              .from('user_wishlists')
              .delete()
              .eq('user_id', session.user.id)
              .eq('product_id', productId);
          }
        }
      } catch {
        // Fall back to local state
      }
    }
  };


  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
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
