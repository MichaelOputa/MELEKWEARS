import { useState } from 'react';
import { ChevronLeft, Check, Phone } from 'lucide-react';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';
import { useStore } from '@/store/StoreContext';
import Price from '@/components/Price';
import Img from '@/components/Img';

interface CheckoutPageProps {
  onNavigate: (page: string) => void;
}

const WHATSAPP_NUMBER = '2348134525821';

function formatWhatsAppMessage(
  cart: { product: { name: string; price: number }; size: string; color: string; quantity: number }[],
  name: string,
  phone: string,
  address: string,
  city: string,
  notes: string,
  cartTotal: number,
) {
  const itemLines = cart
    .map(
      (item) =>
        `• ${item.product.name} (Size: ${item.size}, Colour: ${item.color}) × ${item.quantity} — ₦${(item.product.price * item.quantity).toLocaleString()}`,
    )
    .join('\n');

  const lines = [
    'Hello MelekWears! 🛍️ I would like to place an order:',
    '',
    '*Items:*',
    itemLines,
    '',
    `*Order Total:* ₦${cartTotal.toLocaleString()} (+ shipping)`,
    '',
    '*My Details:*',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Address: ${address}${city ? `, ${city}` : ''}`,
    notes ? `Notes: ${notes}` : '',
    '',
    'Kindly confirm availability and shipping. Thank you! 🙏',
  ]
    .filter((l) => l !== undefined)
    .join('\n');

  return encodeURIComponent(lines);
}

export default function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { cart, cartTotal, clearCart } = useStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');
  const [sent, setSent] = useState(false);

  if (cart.length === 0 && !sent) {
    return (
      <div className="min-h-screen bg-chocolate-950 flex items-center justify-center px-6">
        <div className="text-center">
          <p className="font-serif text-2xl text-ivory-100 mb-4">Your bag is empty</p>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs tracking-wider-2 uppercase text-gold hover:text-gold-light transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-chocolate-950 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-green-600/20 flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-green-400" />
          </div>
          <h1 className="font-serif text-3xl text-ivory-50 mb-3">Order Sent!</h1>
          <p className="text-sm text-ivory-200/70 leading-relaxed mb-8">
            Your order details have been sent to MelekWears on WhatsApp. We will get back to you
            shortly to confirm your order and arrange delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('shop')}
              className="bg-gold text-chocolate-950 text-xs tracking-wider-2 uppercase px-8 py-3 hover:bg-gold-light transition-colors"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="border border-chocolate-600 text-ivory-200 text-xs tracking-wider-2 uppercase px-8 py-3 hover:border-gold transition-colors"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleOrder = () => {
    if (!name.trim() || !phone.trim() || !address.trim()) return;
    const msg = formatWhatsAppMessage(cart, name, phone, address, city, notes, cartTotal);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
    clearCart();
    setSent(true);
  };

  const isValid = name.trim() && phone.trim() && address.trim();

  return (
    <div className="min-h-screen bg-chocolate-950 pt-28 pb-24 px-6 lg:px-10">
      <div className="mx-auto max-w-[1100px]">
        {/* Back */}
        <button
          onClick={() => onNavigate('shop')}
          className="flex items-center gap-2 text-xs tracking-wider-2 uppercase text-ivory-200/60 hover:text-ivory-100 transition-colors mb-12"
        >
          <ChevronLeft size={16} />
          Back to Shop
        </button>

        <div className="grid lg:grid-cols-[1fr_400px] gap-16">
          {/* Left — form */}
          <div>
            <h1 className="font-serif text-3xl text-ivory-50 mb-2">Complete Your Order</h1>
            <p className="text-sm text-ivory-200/60 mb-10">
              Fill in your details and we'll send your order directly to our WhatsApp. A team member
              will confirm and arrange delivery.
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-xs tracking-wider-2 uppercase text-gold mb-2">
                  Full Name *
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 placeholder:text-ivory-300/40 focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs tracking-wider-2 uppercase text-gold mb-2">
                  Phone Number *
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+234 000 000 0000"
                  type="tel"
                  className="w-full bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 placeholder:text-ivory-300/40 focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs tracking-wider-2 uppercase text-gold mb-2">
                  Delivery Address *
                </label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street address"
                  className="w-full bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 placeholder:text-ivory-300/40 focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs tracking-wider-2 uppercase text-gold mb-2">
                  City / State
                </label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Lagos, Abuja, Port Harcourt…"
                  className="w-full bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 placeholder:text-ivory-300/40 focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs tracking-wider-2 uppercase text-gold mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Colour preferences, special requests…"
                  rows={3}
                  className="w-full bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 placeholder:text-ivory-300/40 focus:outline-none focus:border-gold transition-colors resize-none"
                />
              </div>
            </div>

            <button
              onClick={handleOrder}
              disabled={!isValid}
              className="mt-10 w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm tracking-wider-2 uppercase py-4 transition-colors"
            >
              <WhatsAppIcon size={18} />
              Order via WhatsApp
            </button>

            <p className="text-xs text-ivory-300/50 text-center mt-4 leading-relaxed">
              Clicking the button opens WhatsApp with your order pre-filled. Your cart will be
              cleared once sent.
            </p>
          </div>

          {/* Right — order summary */}
          <div>
            <h2 className="text-xs tracking-wider-2 uppercase text-gold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-8">
              {cart.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-16 h-16 bg-chocolate-800 overflow-hidden flex-shrink-0">
                    <Img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-ivory-100 truncate">{item.product.name}</p>
                    <p className="text-xs text-ivory-300/60 mt-1">
                      {item.size} · {item.color} · ×{item.quantity}
                    </p>
                  </div>
                  <span className="text-sm text-ivory-100 flex-shrink-0">
                    <Price amount={item.product.price * item.quantity} />
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-chocolate-700 pt-4 space-y-3">
              <div className="flex justify-between text-sm text-ivory-200/70">
                <span>Subtotal</span>
                <Price amount={cartTotal} />
              </div>
              <div className="flex justify-between text-xs text-ivory-300/50">
                <span>Shipping</span>
                <span>Confirmed via WhatsApp</span>
              </div>
              <div className="flex justify-between text-base text-ivory-50 font-medium pt-2 border-t border-chocolate-700">
                <span>Total</span>
                <Price amount={cartTotal} />
              </div>
            </div>

            {/* WhatsApp contact info */}
            <div className="mt-8 bg-chocolate-900 border border-chocolate-700 p-5">
              <p className="text-xs tracking-wider-2 uppercase text-gold mb-2">Contact Us Directly</p>
              <a
                href="https://wa.me/2348134525821"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
              >
                <WhatsAppIcon size={16} />
                +234 813 452 5821
              </a>
              <a
                href="tel:+2348134525821"
                className="flex items-center gap-2 text-sm text-ivory-300/60 hover:text-gold transition-colors mt-2"
              >
                <Phone size={16} />
                +234 813 452 5821
              </a>
              <a
                href="mailto:Melekwears@gmail.com"
                className="text-sm text-ivory-300/60 hover:text-ivory-100 transition-colors mt-2 block"
              >
                Melekwears@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
