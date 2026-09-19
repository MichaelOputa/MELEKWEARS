import { Heart, Eye, ShoppingBag } from 'lucide-react';
import type { Product } from '@/types';
import { useStore } from '@/store/StoreContext';
import Price from '@/components/Price';
import Img from '@/components/Img';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onNavigate: (page: string) => void;
}

export default function ProductCard({ product, onQuickView, onNavigate }: ProductCardProps) {
  const { toggleWishlist, isInWishlist, addToCart } = useStore();
  const wished = isInWishlist(product.id);

  return (
    <div className="group flex flex-col">
      <div className="relative overflow-hidden bg-chocolate-800 aspect-[3/4]">
        <Img
          thumb
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
        />
        {/* Hover image */}
        {product.images[1] && (
          <Img
            thumb
            fade={false}
            src={product.images[1]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          />
        )}

        {/* Wishlist button */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-chocolate-950/40 backdrop-blur-sm hover:bg-chocolate-950/60 transition-all"
          aria-label="Toggle wishlist"
        >
          <Heart
            size={18}
            className={wished ? 'fill-gold text-gold' : 'text-ivory-100'}
          />
        </button>

        {/* Hover actions */}
        <div className="absolute bottom-0 left-0 right-0 flex gap-2 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <button
            onClick={() => onQuickView(product)}
            className="flex-1 flex items-center justify-center gap-2 bg-ivory-50/95 text-chocolate-900 text-xs tracking-wider-2 uppercase py-3 hover:bg-ivory-50 transition-colors"
          >
            <Eye size={14} /> Quick View
          </button>
          <button
            onClick={() => addToCart(product, product.sizes[0], product.colors[0].name)}
            className="flex items-center justify-center bg-chocolate-950/90 text-ivory-100 px-4 hover:bg-gold hover:text-chocolate-950 transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>

      <div className="pt-4 text-center">
        <p className="text-[10px] tracking-wider-2 uppercase text-gold/80">{product.collection}</p>
        <button
          onClick={() => onQuickView(product)}
          className="font-serif text-base text-ivory-50 hover:text-gold transition-colors mt-1"
        >
          {product.name}
        </button>
        <p className="text-sm text-ivory-200 mt-1"><Price amount={product.price} /></p>
        <div className="flex items-center justify-center gap-1.5 mt-2">
          {product.colors.map((color) => (
            <span
              key={color.name}
              className="w-3 h-3 rounded-full border border-ivory-300/30"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProductCardFooter({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <button
      onClick={() => onNavigate('shop')}
      className="hidden"
    />
  );
}
