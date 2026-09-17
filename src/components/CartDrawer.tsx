import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { formatPrice } from '@/lib/format';

interface CartDrawerProps {
  onNavigate: (page: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({ onNavigate, onCheckout }: CartDrawerProps) {
  const { cart, isCartOpen, setCartOpen, removeFromCart, updateQuantity, cartTotal } = useStore();

  return (
    <div
      className={`fixed inset-0 z-[60] transition-all duration-500 ${
        isCartOpen ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-chocolate-950/70 backdrop-blur-sm"
        onClick={() => setCartOpen(false)}
      />
      <div
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-chocolate-900 flex flex-col transition-transform duration-500 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-8 py-6 border-b border-chocolate-700">
          <h2 className="font-serif text-xl text-ivory-50">Shopping Bag</h2>
          <button
            onClick={() => setCartOpen(false)}
            className="text-ivory-100 hover:text-gold transition-colors"
            aria-label="Close cart"
          >
            <X size={22} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-4">
            <p className="font-serif text-lg text-ivory-200">Your bag is empty</p>
            <p className="text-sm text-ivory-300/60">Discover timeless pieces from our collections.</p>
            <button
              onClick={() => {
                setCartOpen(false);
                onNavigate('shop');
              }}
              className="mt-4 text-xs tracking-wider-2 uppercase border border-gold/50 text-gold px-8 py-3 hover:bg-gold hover:text-chocolate-950 transition-all duration-300"
            >
              Shop the Collection
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-8 py-4">
              {cart.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="flex gap-4 py-5 border-b border-chocolate-700/50"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-28 object-cover bg-chocolate-800"
                  />
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-serif text-sm text-ivory-50">{item.product.name}</h3>
                    <p className="text-xs text-ivory-300/60 mt-1">
                      {item.color} · Size {item.size}
                    </p>
                    <p className="text-sm text-gold mt-1">{formatPrice(item.product.price)}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          className="text-ivory-200 hover:text-gold transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm text-ivory-100 w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                          className="text-ivory-200 hover:text-gold transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-ivory-300/40 hover:text-red-400 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-8 py-6 border-t border-chocolate-700">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs tracking-wider-2 uppercase text-ivory-300/70">Subtotal</span>
                <span className="font-serif text-lg text-ivory-50">{formatPrice(cartTotal)}</span>
              </div>
              <p className="text-xs text-ivory-300/50 mb-4">
                Shipping calculated at checkout based on your destination.
              </p>
              <button
                onClick={() => {
                  setCartOpen(false);
                  onCheckout();
                }}
                className="w-full text-xs tracking-wider-2 uppercase bg-gold text-chocolate-950 py-4 hover:bg-gold-light transition-colors duration-300"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={() => {
                  setCartOpen(false);
                  onNavigate('shop');
                }}
                className="w-full text-xs tracking-wider-2 uppercase text-ivory-200 hover:text-gold transition-colors mt-3"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
