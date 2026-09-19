import { useState, useEffect } from 'react';
import { X, Heart, ShoppingBag, Minus, Plus } from 'lucide-react';
import type { Product, Size } from '@/types';
import { useStore } from '@/store/StoreContext';
import Price from '@/components/Price';
import Img from '@/components/Img';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (product) {
      setSelectedSize(null);
      setSelectedColor(product.colors[0]?.name ?? '');
      setQuantity(1);
      setActiveImage(0);
    }
  }, [product]);

  if (!product) return null;

  const wished = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize, selectedColor, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-chocolate-950/85 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-chocolate-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto grid md:grid-cols-2 gap-0">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-ivory-100 hover:text-gold transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Gallery */}
        <div className="flex flex-col">
          <div className="aspect-[3/4] bg-chocolate-800 overflow-hidden">
            <Img
              priority
              src={product.images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2 p-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-16 h-20 overflow-hidden border-2 transition-colors ${
                  activeImage === i ? 'border-gold' : 'border-transparent'
                }`}
              >
                <Img thumb src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="p-8 flex flex-col">
          <p className="text-[10px] tracking-wider-2 uppercase text-gold/80">{product.collection}</p>
          <h2 className="font-serif text-2xl text-ivory-50 mt-2">{product.name}</h2>
          <p className="text-lg text-gold mt-2"><Price amount={product.price} /></p>

          <p className="text-sm text-ivory-200/80 leading-relaxed mt-4">{product.description}</p>

          {/* Color */}
          <div className="mt-6">
            <p className="text-xs tracking-wider-2 uppercase text-ivory-300/70 mb-2">
              Color: <span className="text-ivory-100">{selectedColor}</span>
            </p>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
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
          <div className="mt-5">
            <p className="text-xs tracking-wider-2 uppercase text-ivory-300/70 mb-2">Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[3rem] px-3 py-2 text-xs tracking-wider uppercase border transition-all ${
                    selectedSize === size
                      ? 'border-gold bg-gold text-chocolate-950'
                      : 'border-chocolate-600 text-ivory-100 hover:border-ivory-300/50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-5">
            <p className="text-xs tracking-wider-2 uppercase text-ivory-300/70 mb-2">Quantity</p>
            <div className="flex items-center gap-4 border border-chocolate-600 w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 text-ivory-100 hover:text-gold transition-colors"
                aria-label="Decrease"
              >
                <Minus size={14} />
              </button>
              <span className="text-sm text-ivory-100 w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 text-ivory-100 hover:text-gold transition-colors"
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
              disabled={!selectedSize}
              className="flex-1 flex items-center justify-center gap-2 bg-gold text-chocolate-950 text-xs tracking-wider-2 uppercase py-4 hover:bg-gold-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ShoppingBag size={16} /> Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className="p-4 border border-chocolate-600 text-ivory-100 hover:border-gold hover:text-gold transition-colors"
              aria-label="Toggle wishlist"
            >
              <Heart size={18} className={wished ? 'fill-gold text-gold' : ''} />
            </button>
          </div>
          {!selectedSize && (
            <p className="text-xs text-ivory-300/50 mt-3">Please select a size</p>
          )}
        </div>
      </div>
    </div>
  );
}
