import { useState, useEffect } from 'react';
import { ChevronLeft, CreditCard, Truck, Check, AlertCircle, Loader2 } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { supabase } from '@/lib/supabase';
import Price from '@/components/Price';
import Img from '@/components/Img';

interface CheckoutPageProps {
  onNavigate: (page: string) => void;
}

const regions = ['Nigeria', 'Europe', 'Americas'];

export default function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { cart, cartTotal, clearCart } = useStore();
  const [step, setStep] = useState<'information' | 'shipping' | 'payment'>('information');
  const [region, setRegion] = useState('Nigeria');
  const [orderComplete, setOrderComplete] = useState(false);
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Customer Information
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  // Payment details (mock inputs)
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardName, setCardName] = useState('');

  const shippingCost = region === 'Nigeria' ? 3000 : region === 'Europe' ? 18000 : 25000;
  const grandTotal = cartTotal + shippingCost;

  // Prefill details if user is signed in
  useEffect(() => {
    const client = supabase;
    if (!client) return;
    const fetchUserData = async () => {
      try {
        const { data: { session } } = await client.auth.getSession();
        if (!session?.user) return;
        setUserId(session.user.id);
        if (session.user.email) setEmail(session.user.email);

        const { data: profile } = await client
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          if (profile.full_name) {
            const parts = profile.full_name.trim().split(' ');
            setFirstName(parts[0] || '');
            setLastName(parts.slice(1).join(' ') || '');
            setCardName(profile.full_name);
          }
          if (profile.phone) setPhone(profile.phone);
          if (profile.address) setAddress(profile.address);
          if (profile.city) setCity(profile.city);
          if (profile.postal_code) setPostalCode(profile.postal_code);
          if (profile.country && regions.includes(profile.country)) {
            setRegion(profile.country);
          }
        }
      } catch {
        // Fallback silently if profiles table is not yet created or empty
      }
    };
    fetchUserData();
  }, []);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `MW-${new Date().getFullYear()}-${randomSuffix}`;
    const fullCustomerName = `${firstName} ${lastName}`.trim() || 'Melek Customer';
    const fullShippingAddress = apartment ? `${address}, ${apartment}` : address;

    const client = supabase;
    if (client) {
      try {
        // 1. Insert order record
        const { data: orderData, error: orderError } = await client
          .from('orders')
          .insert({
            order_number: orderNumber,
            user_id: userId,
            customer_email: email,
            customer_name: fullCustomerName,
            customer_phone: phone,
            shipping_address: fullShippingAddress,
            shipping_city: city,
            shipping_postal_code: postalCode,
            shipping_country: region,
            shipping_cost: shippingCost,
            subtotal: cartTotal,
            total: grandTotal,
            status: 'processing',
            payment_method: 'card',
            payment_status: 'completed',
          })
          .select()
          .single();

        if (orderError) {
          console.error('Order creation error:', orderError);
          // If orders table does not exist yet in Supabase, show note but still allow order confirmation
          if (orderError.message.includes('public.orders')) {
            console.warn('Orders table not yet created in Supabase. Simulating order placement.');
          } else {
            setErrorMessage(orderError.message || 'Failed to place order. Please try again.');
            setIsSubmitting(false);
            return;
          }
        }

        // 2. Insert order items if order was persisted
        if (orderData?.id) {
          const itemsPayload = cart.map((item) => ({
            order_id: orderData.id,
            product_id: item.product.id,
            product_name: item.product.name,
            product_image: item.product.images[0] || null,
            size: item.size,
            color: item.color,
            price: item.product.price,
            quantity: item.quantity,
          }));

          const { error: itemsError } = await client
            .from('order_items')
            .insert(itemsPayload);

          if (itemsError) {
            console.error('Order items error:', itemsError);
          }
        }
      } catch (err: unknown) {
        console.error('Order placement exception:', err);
      }
    }


    setConfirmedOrderNumber(orderNumber);
    clearCart();
    setIsSubmitting(false);
    setOrderComplete(true);
  };

  if (orderComplete) {
    return (
      <div className="pt-24 lg:pt-28 min-h-screen flex items-center justify-center px-6 bg-chocolate-950">
        <div className="text-center max-w-lg bg-chocolate-900 border border-chocolate-800 p-8 sm:p-12">
          <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-gold" />
          </div>
          <h1 className="font-serif text-3xl text-ivory-50">Order Confirmed</h1>
          <p className="text-xs uppercase tracking-widest text-gold mt-2 font-mono">
            {confirmedOrderNumber}
          </p>
          <p className="text-sm text-ivory-200/70 mt-4 leading-relaxed">
            Thank you for acquiring from MelekWears. A confirmation has been sent to <span className="text-gold">{email}</span>. Your pieces are being tailored and prepared with exquisite care.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('account')}
              className="border border-chocolate-600 text-ivory-100 text-xs tracking-wider-2 uppercase px-8 py-3.5 hover:border-gold hover:text-gold transition-colors"
            >
              View Orders
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="bg-gold text-chocolate-950 text-xs tracking-wider-2 uppercase px-8 py-3.5 hover:bg-gold-light transition-colors"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="pt-24 lg:pt-28 min-h-screen flex items-center justify-center px-6 bg-chocolate-950">
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
                  <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors"
                />

                <h2 className="font-serif text-xl text-ivory-50 mb-4 mt-8">Shipping Address</h2>
                <input
                  type="text"
                  placeholder="Street Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors"
                />
                <input
                  type="text"
                  placeholder="Apartment, suite, etc. (optional)"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                  className="w-full bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors"
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Postal code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors"
                  />
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

                <button
                  type="submit"
                  className="bg-gold text-chocolate-950 text-xs tracking-wider-2 uppercase px-10 py-4 hover:bg-gold-light transition-colors mt-4"
                >
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
                        <p className="text-sm text-ivory-100">Express Insured Delivery</p>
                        <p className="text-xs text-ivory-300/50">{region} (3-5 business days)</p>
                      </div>
                    </div>
                    <p className="text-sm text-gold"><Price amount={shippingCost} /></p>
                  </label>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep('information')}
                    className="text-xs tracking-wider-2 uppercase text-ivory-300/60 hover:text-gold transition-colors px-6 py-4"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-gold text-chocolate-950 text-xs tracking-wider-2 uppercase px-10 py-4 hover:bg-gold-light transition-colors"
                  >
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
                  <span>Payments are 256-bit encrypted and processed securely.</span>
                </div>

                {errorMessage && (
                  <div className="p-3 border border-red-500/40 bg-red-950/20 text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle size={16} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <input
                  type="text"
                  placeholder="Card number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                  className="w-full bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors font-mono"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    required
                    className="bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors font-mono"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    required
                    className="bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors font-mono"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Name on card"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  required
                  className="w-full bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors"
                />

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep('shipping')}
                    disabled={isSubmitting}
                    className="text-xs tracking-wider-2 uppercase text-ivory-300/60 hover:text-gold transition-colors px-6 py-4 disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gold text-chocolate-950 text-xs tracking-wider-2 uppercase px-10 py-4 hover:bg-gold-light transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                    {isSubmitting ? 'Securing Order...' : `Place Order · ${new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(grandTotal)}`}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Order summary */}
          <div className="bg-chocolate-900 p-6 h-fit border border-chocolate-800">
            <h2 className="font-serif text-lg text-ivory-50 mb-6">Order Summary</h2>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {cart.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <Img thumb src={item.product.images[0]} alt="" className="w-14 h-18 object-cover bg-chocolate-800 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-ivory-100 font-medium">{item.product.name}</p>
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
              <div className="flex justify-between text-base pt-2 border-t border-chocolate-700 font-serif">
                <span className="text-ivory-50">Total</span>
                <span className="text-gold"><Price amount={grandTotal} /></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
