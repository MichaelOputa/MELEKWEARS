import { useState } from 'react';
import type { Collection } from '@/types';
import { Instagram, Facebook } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface FooterProps {
  onNavigate: (page: string, collection?: Collection) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      if (!supabase) {
        setStatus('error');
        return;
      }
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email });
      if (error) {
        if (error.code === '23505') {
          setStatus('success');
          setEmail('');
        } else {
          setStatus('error');
        }
      } else {
        setStatus('success');
        setEmail('');
      }
    } catch {
      setStatus('error');
    }
  };

  const footerLinks = {
    Shop: ['Shop All', 'Riviera', 'Luxe Round Neck', 'Atelier', 'Polos', 'Tops', 'Sets'],
    Brand: ['About', 'Collections', 'Craftsmanship', 'Journal', 'Contact'],
    Support: ['Shipping & Returns', 'Privacy Policy', 'Terms & Conditions'],
  };

  const collectionForLink: Record<string, Collection> = {
    Riviera: 'Riviera',
    'Luxe Round Neck': 'Melek Luxe Round Neck',
    Atelier: 'Atelier',
  };

  const mapLinkToPage = (link: string): string => {
    const map: Record<string, string> = {
      'Shop All': 'shop',
      Riviera: 'shop',
      'Luxe Round Neck': 'shop',
      Atelier: 'shop',
      Polos: 'shop',
      Tops: 'shop',
      Sets: 'shop',
      About: 'about',
      Collections: 'collections',
      Craftsmanship: 'craftsmanship',
      Journal: 'journal',
      Contact: 'contact',
    };
    return map[link] ?? 'home';
  };

  return (
    <footer className="bg-chocolate-950 border-t border-chocolate-800">
      {/* Newsletter */}
      <div className="border-b border-chocolate-800 px-6 lg:px-10 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl lg:text-4xl text-ivory-50">Enter the World of Melek</h2>
          <p className="text-sm text-ivory-200/70 mt-4 leading-relaxed">
            Be the first to discover new collections, exclusive drops, and stories from MelekWears.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 mt-8 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 bg-transparent border border-chocolate-600 px-4 py-3 text-sm text-ivory-100 placeholder:text-ivory-300/40 focus:outline-none focus:border-gold transition-colors"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-gold text-chocolate-950 text-xs tracking-wider-2 uppercase px-8 py-3 hover:bg-gold-light transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {status === 'success' && (
            <p className="text-sm text-gold mt-4 animate-fade-in">Thank you for joining the MelekWears world.</p>
          )}
          {status === 'error' && (
            <p className="text-sm text-red-400 mt-4">Something went wrong. Please try again.</p>
          )}
        </div>
      </div>

      {/* Main footer */}
      <div className="px-6 lg:px-10 py-16">
        <div className="mx-auto max-w-[1600px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img src="/images/Melek.png" alt="MELEK" className="h-24 w-auto object-contain" />
            <p className="font-serif text-lg text-ivory-200/80 mt-4 italic">
              Crafted with Precision. Designed for Distinction.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="Instagram" className="text-ivory-200 hover:text-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="TikTok" className="text-ivory-200 hover:text-gold transition-colors text-sm font-semibold">
                TikTok
              </a>
              <a href="#" aria-label="Facebook" className="text-ivory-200 hover:text-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Pinterest" className="text-ivory-200 hover:text-gold transition-colors text-sm font-semibold">
                Pinterest
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-xs tracking-wider-2 uppercase text-gold mb-4">{section}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => onNavigate(mapLinkToPage(link), collectionForLink[link])}
                      className="text-sm text-ivory-200/70 hover:text-ivory-50 transition-colors text-left"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-chocolate-800 px-6 lg:px-10 py-6">
        <div className="mx-auto max-w-[1600px] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-ivory-300/50 tracking-wider">
            © 2026 MelekWears. All Rights Reserved.
          </p>
          <p className="text-xs text-ivory-300/50 tracking-wider">
            Proudly designed and made in Nigeria.
          </p>
        </div>
      </div>
    </footer>
  );
}