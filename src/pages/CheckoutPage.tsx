import { useState } from 'react';
import { ChevronLeft, CreditCard, Truck, Check } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import Price from '@/components/Price';
import Img from '@/components/Img';

interface CheckoutPageProps {
  onNavigate: (page: string) => void;
}

const regions = ['Nigeria', 'Europe', 'Americas'];

export default function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { cart, cartTotal } = useStore();
  const [step, setStep] = useState<'information' | 'shipping' | 'payment'>('information');
  const [region, setRegion] = useState('Nigeria');
  const [orderComplete, setOrderComplete] = useState(false);

  const shippingCost = region === 'Nigeria' ? 3000 : region === 'Europe' ? 18000 : 25000;
  const grandTotal = cartTotal + shippingCost;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderComplete(true);
  };

  if (orderComplete) {
    return (
      <div className="pt-24 lg:pt-28 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-gold" />
          </div>
          <h1 className="font-serif text-3xl text-ivory-50">Order Confirmed</h1>
          <p className="text-sm text-ivory-200/60 mt-4 leading-relaxed">
            Thank you for your order. A confirmation has been sent to your email, and your MelekWears pieces are being prepared with care.
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="mt-8 bg-gold text-chocolate-950 text-xs tracking-wider-2 uppercase px-10 py-4 hover:bg-gold-light transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="pt-24 lg:pt-28 min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="font-serif text-2xl text-ivory-200/60">Your bag is empty</p>
          <button
            onClick={() => onNavigate('shop')}
            className="mt-6 text-xs tracking-wider-2 uppercase text-gold border border-gold/50 px-8 py-3 hover:bg-gold hover:text-chocolate-950 transition-all"
          >
            Shop the Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 lg:pt-28 bg-chocolate-950 min-h-screen">
      <div className="px-6 lg:px-10 py-8">
        <button
          onClick={() => onNavigate('shop')}
          className="flex items-center gap-2 text-xs tracking-wider-2 uppercase text-ivory-300/60 hover:text-gold transition-colors mb-8"
        >
          <ChevronLeft size={16} /> Continue Shopping
        </button>

        <h1 className="font-serif text-3xl lg:text-4xl text-ivory-50 mb-8">Checkout</h1>

        {/* Steps */}
        <div className="flex items-center gap-4 mb-10">
          {(['information', 'shipping', 'payment'] as const).map((s, i) => (
            <div key={s} className="flex items-center gap-4">
              <div
                className={`flex items-center gap-2 ${step === s ? 'text-gold' : step > s ? 'text-gold/60' : 'text-ivory-300/40'}`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${
                  step === s ? 'border-gold' : step > s ? 'border-gold/60' : 'border-ivory-300/30'
                }`}>
                  {step > s ? <Check size={12} /> : i + 1}
                </span>
                <span className="text-xs tracking-wider-2 uppercase">{s}</span>
              </div>
              {i < 2 && <div className="w-8 h-px bg-chocolate-700" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-12">
          {/* Form */}
          <div>
            {step === 'information' && (
              <form
                onSubmit={(e) => { e.preventDefault(); setStep('shipping'); }}
                className="space-y-5"
              >
                <h2 className="font-serif text-xl text-ivory-50 mb-4">Contact Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="First name" required className="bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors" />
                  <input type="text" placeholder="Last name" required className="bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors" />
                </div>
                <input type="email" placeholder="Email address" required className="w-full bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors" />
                <input type="tel" placeholder="Phone number" required className="w-full bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors" />

                <h2 className="font-serif text-xl text-ivory-50 mb-4 mt-8">Shipping Address</h2>
                <input type="text" placeholder="Address" required className="w-full bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors" />
                <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="City" required className="bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors" />
                  <input type="text" placeholder="Postal code" required className="bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors" />
                </div>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full bg-chocolate-900 border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors"
                >
                  {regions.map((r) => (
                    <option key={r} value={r} className="bg-chocolate-900">{r}</option>
                  ))}
                </select>

                <button type="submit" className="bg-gold text-chocolate-950 text-xs tracking-wider-2 uppercase px-10 py-4 hover:bg-gold-light transition-colors mt-4">
                  Continue to Shipping
                </button>
              </form>
            )}

            {step === 'shipping' && (
              <form onSubmit={(e) => { e.preventDefault(); setStep('payment'); }} className="space-y-5">
                <h2 className="font-serif text-xl text-ivory-50 mb-4">Shipping Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center justify-between border border-chocolate-600 p-4 cursor-pointer hover:border-gold transition-colors">
                    <div className="flex items-center gap-3">
                      <input type="radio" name="shipping" defaultChecked className="accent-gold" />
                      <div>
                        <p className="text-sm text-ivory-100">Standard Shipping</p>
                        <p className="text-xs text-ivory-300/50">{region}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gold"><Price amount={shippingCost} /></p>
                  </label>
                </div>

                <div className="flex gap-3 mt-6">
                  <button type="button" onClick={() => setStep('information')} className="text-xs tracking-wider-2 uppercase text-ivory-300/60 hover:text-gold transition-colors">
                    Back
                  </button>
                  <button type="submit" className="bg-gold text-chocolate-950 text-xs tracking-wider-2 uppercase px-10 py-4 hover:bg-gold-light transition-colors">
                    Continue to Payment
                  </button>
                </div>
              </form>
            )}

            {step === 'payment' && (
              <form onSubmit={handlePlaceOrder} className="space-y-5">
                <h2 className="font-serif text-xl text-ivory-50 mb-4">Payment Details</h2>
                <div className="flex items-center gap-2 text-xs text-ivory-300/50 mb-4">
                  <CreditCard size={16} />
                  <span>Payment information is collected securely at the point of purchase.</span>
                </div>
                <input type="text" placeholder="Card number" required className="w-full bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="MM / YY" required className="bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors" />
                  <input type="text" placeholder="CVC" required className="bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors" />
                </div>
                <input type="text" placeholder="Name on card" required className="w-full bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors" />

                <div className="flex gap-3 mt-6">
                  <button type="button" onClick={() => setStep('shipping')} className="text-xs tracking-wider-2 uppercase text-ivory-300/60 hover:text-gold transition-colors">
                    Back
                  </button>
                  <button type="submit" className="bg-gold text-chocolate-950 text-xs tracking-wider-2 uppercase px-10 py-4 hover:bg-gold-light transition-colors">
                    Place Order
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Order summary */}
          <div className="bg-chocolate-900 p-6 h-fit">
            <h2 className="font-serif text-lg text-ivory-50 mb-6">Order Summary</h2>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {cart.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <Img thumb src={item.product.images[0]} alt="" className="w-14 h-18 object-cover bg-chocolate-800 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-ivory-100">{item.product.name}</p>
                    <p className="text-[10px] text-ivory-300/50">{item.color} · {item.size} · Qty {item.quantity}</p>
                    <p className="text-xs text-gold mt-1"><Price amount={item.product.price * item.quantity} /></p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-chocolate-700 mt-6 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-ivory-300/60">Subtotal</span>
                <span className="text-ivory-100"><Price amount={cartTotal} /></span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ivory-300/60 flex items-center gap-1"><Truck size={14} /> Shipping</span>
                <span className="text-ivory-100"><Price amount={shippingCost} /></span>
              </div>
              <div className="flex justify-between text-base pt-2 border-t border-chocolate-700">
                <span className="font-serif text-ivory-50">Total</span>
                <span className="font-serif text-gold"><Price amount={grandTotal} /></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
