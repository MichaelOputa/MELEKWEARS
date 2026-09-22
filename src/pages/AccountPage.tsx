import { useState, useEffect, useCallback } from 'react';
import { Mail, Lock, Heart, Package, Eye, EyeOff, User, MapPin, Phone, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useStore } from '@/store/StoreContext';
import { products } from '@/data/products';
import Price from '@/components/Price';
import type { Product, Order, UserProfile } from '@/types';
import Img from '@/components/Img';

interface AccountPageProps {
  onNavigate: (page: string) => void;
  onQuickView: (product: Product) => void;
}

type TabType = 'orders' | 'profile' | 'wishlist';

export default function AccountPage({ onNavigate, onQuickView }: AccountPageProps) {
  const { wishlist, toggleWishlist } = useStore();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [activeTab, setActiveTab] = useState<TabType>('orders');

  // Auth Inputs
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);

  // Session & User State
  const [sessionUser, setSessionUser] = useState<{ id: string; email: string } | null>(null);

  // Profile Form State
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileName, setProfileName] = useState('');
  const [profilePhone, setProfilePhone] = useState('');
  const [profileAddress, setProfileAddress] = useState('');
  const [profileCity, setProfileCity] = useState('');
  const [profileState, setProfileState] = useState('');
  const [profilePostalCode, setProfilePostalCode] = useState('');
  const [profileCountry, setProfileCountry] = useState('Nigeria');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMessage, setProfileMessage] = useState('');
  const [profileError, setProfileError] = useState('');

  // Orders State
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const fetchProfile = useCallback(async (userId: string) => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (!error && data) {
        setProfile(data);
        setProfileName(data.full_name || '');
        setProfilePhone(data.phone || '');
        setProfileAddress(data.address || '');
        setProfileCity(data.city || '');
        setProfileState(data.state || '');
        setProfilePostalCode(data.postal_code || '');
        setProfileCountry(data.country || 'Nigeria');
      }
    } catch {
      // Profiles table might not be created yet
    }
  }, []);

  const fetchOrders = useCallback(async (userId: string, userEmail: string) => {
    if (!supabase) return;
    setOrdersLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .or(`user_id.eq.${userId},customer_email.eq.${userEmail}`)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setOrders(data as Order[]);
      }
    } catch {
      // Orders table might not be created yet
    } finally {
      setOrdersLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        const u = { id: data.session.user.id, email: data.session.user.email ?? '' };
        setSessionUser(u);
        fetchProfile(u.id);
        fetchOrders(u.id, u.email);
      }
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      if (sess?.user) {
        const u = { id: sess.user.id, email: sess.user.email ?? '' };
        setSessionUser(u);
        fetchProfile(u.id);
        fetchOrders(u.id, u.email);
      } else {
        setSessionUser(null);
        setProfile(null);
        setOrders([]);
      }
    });

    return () => sub.subscription.unsubscribe();
  }, [fetchProfile, fetchOrders]);

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
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName.trim(),
            },
          },
        });
        if (error) setError(error.message);
        else {
          setMode('signin');
          setMessage('Account created successfully. You may now sign in to your Melek account.');
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

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address to receive password reset instructions.');
      return;
    }
    if (!supabase) return;
    setForgotPasswordLoading(true);
    setError('');
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin,
      });
      if (error) {
        setError(error.message);
      } else {
        setMessage('A password reset link has been dispatched to your email.');
      }
    } catch {
      setError('Unable to send password reset email.');
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase || !sessionUser) return;
    setProfileSaving(true);
    setProfileMessage('');
    setProfileError('');

    try {
      const payload: Partial<UserProfile> = {
        id: sessionUser.id,
        email: sessionUser.email,
        full_name: profileName,
        phone: profilePhone,
        address: profileAddress,
        city: profileCity,
        state: profileState,
        postal_code: profilePostalCode,
        country: profileCountry,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(payload, { onConflict: 'id' });

      if (error) {
        setProfileError(error.message);
      } else {
        setProfile((prev) => ({ ...(prev || {}), ...payload } as UserProfile));
        setProfileMessage('Your profile and delivery details have been updated.');
        setTimeout(() => setProfileMessage(''), 4000);
      }
    } catch {
      setProfileError('Failed to save profile. Please verify your connection.');
    } finally {
      setProfileSaving(false);
    }
  };

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSessionUser(null);
  };

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  // Authenticated View
  if (sessionUser) {
    return (
      <div className="pt-24 lg:pt-28 min-h-screen bg-chocolate-950">
        <div className="px-6 lg:px-10 py-10">
          <div className="mx-auto max-w-[1200px]">
            {/* Account Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-chocolate-800 pb-8 mb-8 gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold font-mono">Melek Client Portal</span>
                <h1 className="font-serif text-3xl sm:text-4xl text-ivory-50 mt-1">
                  {profileName ? `Welcome, ${profileName}` : 'My Account'}
                </h1>
                <p className="text-sm text-ivory-200/60 mt-1">{sessionUser.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="self-start sm:self-auto text-xs tracking-wider-2 uppercase border border-chocolate-700 px-5 py-2.5 text-ivory-300/70 hover:border-gold hover:text-gold transition-colors"
              >
                Sign Out
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-chocolate-800 mb-10 overflow-x-auto gap-8">
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-2 pb-4 text-xs tracking-wider-2 uppercase transition-colors whitespace-nowrap border-b-2 ${
                  activeTab === 'orders'
                    ? 'border-gold text-gold font-medium'
                    : 'border-transparent text-ivory-300/60 hover:text-ivory-100'
                }`}
              >
                <Package size={16} />
                Orders {orders.length > 0 && `(${orders.length})`}
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-2 pb-4 text-xs tracking-wider-2 uppercase transition-colors whitespace-nowrap border-b-2 ${
                  activeTab === 'profile'
                    ? 'border-gold text-gold font-medium'
                    : 'border-transparent text-ivory-300/60 hover:text-ivory-100'
                }`}
              >
                <User size={16} />
                Profile & Address
              </button>
              <button
                onClick={() => setActiveTab('wishlist')}
                className={`flex items-center gap-2 pb-4 text-xs tracking-wider-2 uppercase transition-colors whitespace-nowrap border-b-2 ${
                  activeTab === 'wishlist'
                    ? 'border-gold text-gold font-medium'
                    : 'border-transparent text-ivory-300/60 hover:text-ivory-100'
                }`}
              >
                <Heart size={16} />
                Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
              </button>
            </div>

            {/* Tab: Orders */}
            {activeTab === 'orders' && (
              <div>
                {ordersLoading ? (
                  <div className="flex items-center justify-center py-20 text-ivory-300/60">
                    <Loader2 size={24} className="animate-spin text-gold mr-3" />
                    <span>Loading your orders...</span>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-16 border border-chocolate-800 bg-chocolate-900/40 p-8">
                    <Package size={36} className="text-gold/60 mx-auto mb-4" />
                    <h3 className="font-serif text-xl text-ivory-100">No Orders Found</h3>
                    <p className="text-sm text-ivory-200/50 mt-2 max-w-md mx-auto">
                      You haven't placed any orders yet. When you acquire pieces from MelekWears, their status and tracking will be updated here.
                    </p>
                    <button
                      onClick={() => onNavigate('shop')}
                      className="mt-6 bg-gold text-chocolate-950 text-xs tracking-wider-2 uppercase px-8 py-3.5 hover:bg-gold-light transition-colors"
                    >
                      Explore Collections
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-chocolate-800 bg-chocolate-900 p-6 sm:p-8 transition-colors hover:border-chocolate-700"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-chocolate-800 gap-4">
                          <div>
                            <span className="text-[11px] font-mono text-gold uppercase tracking-wider">
                              Order #{order.order_number}
                            </span>
                            <p className="text-xs text-ivory-300/60 mt-1">
                              Placed on {new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-xs uppercase tracking-wider px-3 py-1 border border-gold/40 text-gold bg-gold/5">
                              {order.status}
                            </span>
                            <div className="text-right">
                              <span className="text-xs text-ivory-300/50 block">Total</span>
                              <span className="text-sm font-serif text-ivory-50"><Price amount={order.total} /></span>
                            </div>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="mt-6 space-y-4">
                          {order.order_items && order.order_items.length > 0 ? (
                            order.order_items.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-4">
                                {item.product_image && (
                                  <img
                                    src={item.product_image}
                                    alt={item.product_name}
                                    className="w-14 h-16 object-cover bg-chocolate-800 border border-chocolate-700 flex-shrink-0"
                                  />
                                )}
                                <div className="flex-1">
                                  <p className="text-sm text-ivory-100 font-medium">{item.product_name}</p>
                                  <p className="text-xs text-ivory-300/60 mt-0.5">
                                    {item.color} · Size {item.size} · Qty {item.quantity}
                                  </p>
                                </div>
                                <p className="text-sm text-gold font-serif">
                                  <Price amount={item.price * item.quantity} />
                                </p>
                              </div>
                            ))
                          ) : (
                            <p className="text-xs text-ivory-300/50">Items information recorded.</p>
                          )}
                        </div>

                        <div className="mt-6 pt-4 border-t border-chocolate-800 flex flex-col sm:flex-row justify-between text-xs text-ivory-300/50 gap-2">
                          <div>
                            <span className="text-ivory-200/70">Shipping to: </span>
                            {order.shipping_address}, {order.shipping_city}, {order.shipping_country}
                          </div>
                          <div>
                            <span className="text-ivory-200/70">Payment: </span>
                            {order.payment_method.toUpperCase()} ({order.payment_status})
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab: Profile & Address */}
            {activeTab === 'profile' && (
              <div className="max-w-2xl bg-chocolate-900 border border-chocolate-800 p-6 sm:p-10">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-chocolate-800">
                  <MapPin size={20} className="text-gold" />
                  <div>
                    <h2 className="font-serif text-xl text-ivory-50">Delivery & Contact Information</h2>
                    <p className="text-xs text-ivory-300/60 mt-0.5">
                      Your saved details are automatically applied during checkout.
                    </p>
                  </div>
                </div>

                {profileMessage && (
                  <div className="mb-6 p-4 border border-gold/40 bg-gold/10 text-gold text-xs flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    <span>{profileMessage}</span>
                  </div>
                )}

                {profileError && (
                  <div className="mb-6 p-4 border border-red-500/40 bg-red-950/30 text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle size={16} />
                    <span>{profileError}</span>
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs tracking-wider-2 uppercase text-ivory-300/70 block mb-2">Full Name</label>
                      <input
                        type="text"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        placeholder="e.g. Adebayo Adeleke"
                        className="w-full bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs tracking-wider-2 uppercase text-ivory-300/70 block mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={profilePhone}
                        onChange={(e) => setProfilePhone(e.target.value)}
                        placeholder="+234 ..."
                        className="w-full bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs tracking-wider-2 uppercase text-ivory-300/70 block mb-2">Account Email</label>
                    <input
                      type="email"
                      value={sessionUser.email}
                      disabled
                      className="w-full bg-chocolate-950/60 border border-chocolate-700/60 px-4 py-3 text-sm text-ivory-300/50 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="text-xs tracking-wider-2 uppercase text-ivory-300/70 block mb-2">Street Address</label>
                    <input
                      type="text"
                      value={profileAddress}
                      onChange={(e) => setProfileAddress(e.target.value)}
                      placeholder="e.g. 14 Victoria Island Boulevard"
                      className="w-full bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs tracking-wider-2 uppercase text-ivory-300/70 block mb-2">City</label>
                      <input
                        type="text"
                        value={profileCity}
                        onChange={(e) => setProfileCity(e.target.value)}
                        placeholder="Lagos"
                        className="w-full bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs tracking-wider-2 uppercase text-ivory-300/70 block mb-2">State / Province</label>
                      <input
                        type="text"
                        value={profileState}
                        onChange={(e) => setProfileState(e.target.value)}
                        placeholder="Lagos"
                        className="w-full bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs tracking-wider-2 uppercase text-ivory-300/70 block mb-2">Postal Code</label>
                      <input
                        type="text"
                        value={profilePostalCode}
                        onChange={(e) => setProfilePostalCode(e.target.value)}
                        placeholder="101241"
                        className="w-full bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs tracking-wider-2 uppercase text-ivory-300/70 block mb-2">Country / Region</label>
                    <select
                      value={profileCountry}
                      onChange={(e) => setProfileCountry(e.target.value)}
                      className="w-full bg-chocolate-900 border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors"
                    >
                      <option value="Nigeria">Nigeria</option>
                      <option value="Europe">Europe</option>
                      <option value="Americas">Americas</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={profileSaving}
                    className="w-full bg-gold text-chocolate-950 text-xs tracking-wider-2 uppercase py-4 hover:bg-gold-light transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
                  >
                    {profileSaving && <Loader2 size={16} className="animate-spin" />}
                    {profileSaving ? 'Saving Changes...' : 'Save Profile Changes'}
                  </button>
                </form>
              </div>
            )}

            {/* Tab: Wishlist */}
            {activeTab === 'wishlist' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Heart size={18} className="text-gold" />
                    <h2 className="font-serif text-xl text-ivory-50">Saved Pieces</h2>
                  </div>
                  <span className="text-xs text-ivory-300/50">{wishlistProducts.length} items</span>
                </div>

                {wishlistProducts.length === 0 ? (
                  <div className="text-center py-16 border border-chocolate-800 bg-chocolate-900/40 p-8">
                    <Heart size={36} className="text-gold/40 mx-auto mb-4" />
                    <h3 className="font-serif text-xl text-ivory-100">Your Wishlist is Empty</h3>
                    <p className="text-sm text-ivory-200/50 mt-2 max-w-md mx-auto">
                      Save your favorite Melek creations by clicking the heart icon on any product page.
                    </p>
                    <button
                      onClick={() => onNavigate('shop')}
                      className="mt-6 bg-gold text-chocolate-950 text-xs tracking-wider-2 uppercase px-8 py-3.5 hover:bg-gold-light transition-colors"
                    >
                      Browse Collections
                    </button>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistProducts.map((p) => (
                      <div key={p.id} className="border border-chocolate-800 bg-chocolate-900 p-4 flex gap-4">
                        <Img thumb src={p.images[0]} alt={p.name} className="w-20 h-26 object-cover bg-chocolate-800 flex-shrink-0" />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <button
                              onClick={() => onQuickView(p)}
                              className="font-serif text-sm text-ivory-50 hover:text-gold transition-colors text-left line-clamp-1"
                            >
                              {p.name}
                            </button>
                            <p className="text-xs text-ivory-300/50 mt-0.5">{p.collection}</p>
                            <p className="text-sm text-gold mt-1.5"><Price amount={p.price} /></p>
                          </div>
                          <div className="flex items-center gap-3 pt-2">
                            <button
                              onClick={() => onQuickView(p)}
                              className="text-[11px] uppercase tracking-wider text-gold hover:underline"
                            >
                              Quick View
                            </button>
                            <span className="text-chocolate-700">·</span>
                            <button
                              onClick={() => toggleWishlist(p.id)}
                              className="text-[11px] uppercase tracking-wider text-ivory-300/40 hover:text-red-400 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Unauthenticated View
  return (
    <div className="pt-24 lg:pt-28 min-h-screen flex items-center justify-center px-6 bg-chocolate-950">
      <div className="w-full max-w-md bg-chocolate-900/60 border border-chocolate-800 p-8 sm:p-10">
        <div className="text-center mb-8">
          <img src="/images/Melek.JPG" alt="MELEK" className="h-14 w-auto object-contain mx-auto mb-6" />
          <h1 className="font-serif text-3xl text-ivory-50">
            {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-sm text-ivory-200/60 mt-2">
            {mode === 'signin' ? 'Sign in to access your orders and profile' : 'Join the world of Melek luxury'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {mode === 'signup' && (
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ivory-300/40" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                required
                className="w-full bg-transparent border border-chocolate-600 pl-10 pr-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold transition-colors"
              />
            </div>
          )}

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

          {mode === 'signin' && (
            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={forgotPasswordLoading}
                className="text-xs text-ivory-300/60 hover:text-gold transition-colors disabled:opacity-50"
              >
                {forgotPasswordLoading ? 'Sending link...' : 'Forgot password?'}
              </button>
            </div>
          )}

          {error && (
            <div className="p-3 border border-red-500/40 bg-red-950/20 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {message && (
            <div className="p-3 border border-gold/40 bg-gold/10 text-gold text-xs flex items-center gap-2">
              <CheckCircle2 size={16} />
              <span>{message}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-chocolate-950 text-xs tracking-wider-2 uppercase py-4 hover:bg-gold-light transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-6 pt-6 border-t border-chocolate-800">
          <button
            onClick={() => {
              setMode(mode === 'signin' ? 'signup' : 'signin');
              setError('');
              setMessage('');
            }}
            className="text-xs tracking-wider text-ivory-300/60 hover:text-gold transition-colors"
          >
            {mode === 'signin' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}
