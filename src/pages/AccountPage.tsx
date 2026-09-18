import { useState, useEffect } from 'react';
import { Mail, Lock, Heart, Package, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useStore } from '@/store/StoreContext';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/format';
import type { Product } from '@/types';

interface AccountPageProps {
  onNavigate: (page: string) => void;
  onQuickView: (product: Product) => void;
}

export default function AccountPage({ onNavigate, onQuickView }: AccountPageProps) {
  const { wishlist } = useStore();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [session, setSession] = useState<{ user: { email: string } } | null>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setSession({ user: { email: data.session.user.email ?? '' } });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess ? { user: { email: sess.user?.email ?? '' } } : null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setError('Account services are currently unavailable. Please try again later.');
      return;
    }
    setLoading(true);
    setError('');
    setMessage('');
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) setError(error.message);
        else {
          setMode('signin');
          setMessage('Account created. Check your email to confirm your account before signing in.');
          setPassword('');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setError(error.message);
      }
    } catch {
      setError('Something went wrong.');
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSession(null);
  };

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  if (session) {
    return (
      <div className="pt-24 lg:pt-28 min-h-screen bg-chocolate-950">
        <div className="px-6 lg:px-10 py-12">
          <div className="mx-auto max-w-[1200px]">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="font-serif text-3xl text-ivory-50">My Account</h1>
                <p className="text-sm text-ivory-200/60 mt-2">{session.user.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="text-xs tracking-wider-2 uppercase text-ivory-300/60 hover:text-gold transition-colors"
              >
                Sign Out
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Wishlist */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Heart size={18} className="text-gold" />
                  <h2 className="font-serif text-xl text-ivory-50">Wishlist</h2>
                </div>
                {wishlistProducts.length === 0 ? (
                  <p className="text-sm text-ivory-200/50">Your wishlist is empty.</p>
                ) : (
                  <div className="space-y-4">
                    {wishlistProducts.map((p) => (
                      <div key={p.id} className="flex gap-4">
                        <img src={p.images[0]} alt="" className="w-16 h-20 object-cover bg-chocolate-800" />
                        <div>
                          <button onClick={() => onQuickView(p)} className="font-serif text-sm text-ivory-50 hover:text-gold transition-colors text-left">
                            {p.name}
                          </button>
                          <p className="text-xs text-ivory-300/50">{p.collection}</p>
                          <p className="text-sm text-gold mt-1">{formatPrice(p.price)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Orders placeholder */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Package size={18} className="text-gold" />
                  <h2 className="font-serif text-xl text-ivory-50">Orders</h2>
                </div>
                <p className="text-sm text-ivory-200/50">Your order history will appear here.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 lg:pt-28 min-h-screen flex items-center justify-center px-6 bg-chocolate-950">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <img src="/images/Melek.JPG" alt="MELEK" className="h-14 w-auto object-contain mx-auto mb-6" />
          <h1 className="font-serif text-3xl text-ivory-50">
            {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-sm text-ivory-200/60 mt-2">
            {mode === 'signin' ? 'Sign in to your MelekWears account' : 'Join the world of Melek'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-5">
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ivory-300/40" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="w-full bg-transparent border border-chocolate-600 pl-10 pr-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ivory-300/40" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              minLength={6}
              className="w-full bg-transparent border border-chocolate-600 pl-10 pr-12 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ivory-300/40 hover:text-gold transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}
          {message && <p className="text-sm text-gold">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-chocolate-950 text-xs tracking-wider-2 uppercase py-4 hover:bg-gold-light transition-colors disabled:opacity-50"
          >
            {loading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); setMessage(''); }}
            className="text-xs tracking-wider text-ivory-300/60 hover:text-gold transition-colors"
          >
            {mode === 'signin' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}
