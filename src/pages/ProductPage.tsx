import { useState, useEffect } from 'react';
import { Heart, ShoppingBag, Minus, Plus, ChevronLeft, Truck, Shield, RefreshCw } from 'lucide-react';
import { products } from '@/data/products';
import { useStore } from '@/store/StoreContext';
import Price from '@/components/Price';
import ProductCard from '@/components/ProductCard';
import type { Product, Size } from '@/types';
import Img from '@/components/Img';

interface ProductPageProps {
  product: Product;
  onNavigate: (page: string) => void;
  onQuickView: (product: Product) => void;
}

export default function ProductPage({ product, onNavigate, onQuickView }: ProductPageProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setSelectedSize(null);
    setSelectedColor(product.colors[0]?.name ?? '');
    setQuantity(1);
    setActiveImage(0);
    setShowError(false);
  }, [product]);

  const wished = isInWishlist(product.id);

  const related = products
    .filter((p) => p.collection === product.collection && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowError(true);
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setShowError(true);
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
    onNavigate('checkout');
  };

  return (
    <div className="pt-24 lg:pt-28">
      {/* Breadcrumb */}
      <div className="px-6 lg:px-10 py-4 bg-chocolate-950">
        <div className="mx-auto max-w-[1600px] flex items-center gap-2 text-xs text-ivory-300/50">
          <button onClick={() => onNavigate('home')} className="hover:text-gold transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => onNavigate('shop')} className="hover:text-gold transition-colors">Shop</button>
          <span>/</span>
          <span className="text-ivory-200/80">{product.name}</span>
        </div>
      </div>

      <div className="px-6 lg:px-10 py-8 bg-chocolate-950">
        <div className="mx-auto max-w-[1600px] grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Gallery */}
          <div className="flex flex-col-reverse lg:flex-row gap-4">
            <div className="flex lg:flex-col gap-3 lg:w-24">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-20 lg:w-full lg:h-28 overflow-hidden border-2 transition-colors flex-shrink-0 ${
                    activeImage === i ? 'border-gold' : 'border-transparent'
                  }`}
                >
                  <Img thumb src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="flex-1 aspect-[3/4] bg-chocolate-800 overflow-hidden">
              <Img
                priority
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <p className="text-xs tracking-wider-2 uppercase text-gold/80">{product.collection}</p>
            <h1 className="font-serif text-3xl lg:text-4xl text-ivory-50 mt-2">{product.name}</h1>
            <p className="text-xl text-gold mt-3"><Price amount={product.price} /></p>

            <p className="text-sm text-ivory-200/80 leading-relaxed mt-6">{product.description}</p>

            {/* Color */}
            <div className="mt-8">
              <p className="text-xs tracking-wider-2 uppercase text-ivory-300/70 mb-3">
                Color: <span className="text-ivory-100">{selectedColor}</span>
              </p>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color.name
                        ? 'border-gold scale-110'
                        : 'border-ivory-300/30'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mt-6">
              <p className="text-xs tracking-wider-2 uppercase text-ivory-300/70 mb-3">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setShowError(false); }}
                    className={`min-w-[3rem] px-4 py-2.5 text-xs tracking-wider uppercase border transition-all ${
                      selectedSize === size
                        ? 'border-gold bg-gold text-chocolate-950'
                        : 'border-chocolate-600 text-ivory-100 hover:border-ivory-300/50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {showError && <p className="text-xs text-red-400 mt-2">Please select a size</p>}
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <p className="text-xs tracking-wider-2 uppercase text-ivory-300/70 mb-3">Quantity</p>
              <div className="flex items-center gap-4 border border-chocolate-600 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-ivory-100 hover:text-gold transition-colors"
                  aria-label="Decrease"
                >
                  <Minus size={14} />
                </button>
                <span className="text-sm text-ivory-100 w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-ivory-100 hover:text-gold transition-colors"
                  aria-label="Increase"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 border border-gold/50 text-gold text-xs tracking-wider-2 uppercase py-4 hover:bg-gold hover:text-chocolate-950 transition-all duration-300"
              >
                <ShoppingBag size={16} /> Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-gold text-chocolate-950 text-xs tracking-wider-2 uppercase py-4 hover:bg-gold-light transition-colors"
              >
                Buy Now
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="p-4 border border-chocolate-600 text-ivory-100 hover:border-gold hover:text-gold transition-colors"
                aria-label="Toggle wishlist"
              >
                <Heart size={18} className={wished ? 'fill-gold text-gold' : ''} />
              </button>
            </div>

            {/* Info */}
            <div className="mt-10 space-y-4 border-t border-chocolate-700 pt-6">
              <div className="flex items-start gap-3">
                <Truck size={18} className="text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs tracking-wider-2 uppercase text-ivory-100">Shipping Information</p>
                  <p className="text-xs text-ivory-200/60 mt-1">Shipping costs and delivery times are calculated at checkout based on your destination.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RefreshCw size={18} className="text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs tracking-wider-2 uppercase text-ivory-100">Returns</p>
                  <p className="text-xs text-ivory-200/60 mt-1">Items can be returned within 14 days of delivery in original condition.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield size={18} className="text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs tracking-wider-2 uppercase text-ivory-100">Care Information</p>
                  <p className="text-xs text-ivory-200/60 mt-1">Machine wash cold with similar colors. Do not bleach. Hang dry. Iron on low heat.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="px-6 lg:px-10 py-16 lg:py-24 bg-chocolate-900">
          <div className="mx-auto max-w-[1600px]">
            <div className="flex items-center gap-4 mb-10">
              <button onClick={() => onNavigate('shop')} className="text-ivory-300/60 hover:text-gold transition-colors">
                <ChevronLeft size={20} />
              </button>
              <h2 className="font-serif text-2xl lg:text-3xl text-ivory-50">Related Pieces</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {related.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onQuickView={onQuickView}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
