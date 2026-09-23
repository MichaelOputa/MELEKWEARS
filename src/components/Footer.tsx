import { Instagram, Twitter, Mail, MessageCircle } from 'lucide-react';
import type { Collection } from '@/types';

interface FooterProps {
  onNavigate: (page: string, collection?: Collection) => void;
}

// Simple Pinterest SVG
function PinterestIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

export default function Footer({ onNavigate }: FooterProps) {
  const footerLinks = {
    Shop: ['Shop All', 'Riviera', 'Melek Luxe Collections', 'Atelier', 'Melek Essentials'],
    Brand: ['About', 'Collections', 'Craftsmanship', 'Journal', 'Contact'],
    Support: ['Shipping & Returns', 'Privacy Policy', 'Terms & Conditions'],
  };

  const collectionForLink: Record<string, Collection> = {
    Riviera: 'Riviera',
    'Melek Luxe Collections': 'Melek Luxe Collections',
    Atelier: 'Atelier',
    'Melek Essentials': 'Melek Essentials',
  };

  const mapLinkToPage = (link: string): string => {
    const map: Record<string, string> = {
      'Shop All': 'shop',
      Riviera: 'shop',
      'Melek Luxe Collections': 'shop',
      Atelier: 'shop',
      'Melek Essentials': 'shop',

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
      {/* Social / Connect banner */}
      <div className="border-b border-chocolate-800 px-6 lg:px-10 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl lg:text-4xl text-ivory-50">Follow the World of Melek</h2>
          <p className="text-sm text-ivory-200/70 mt-4 leading-relaxed">
            Stay connected for new collections, exclusive drops, and stories from MelekWears.
          </p>

          {/* Social icons row */}
          <div className="flex items-center justify-center gap-6 mt-10 flex-wrap">
            <a
              href="https://instagram.com/melekwears"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex flex-col items-center gap-2 text-ivory-200/70 hover:text-pink-400 transition-colors group"
            >
              <Instagram size={22} />
              <span className="text-[10px] tracking-wider-2 uppercase">Instagram</span>
            </a>

            <a
              href="https://twitter.com/melekwears"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X"
              className="flex flex-col items-center gap-2 text-ivory-200/70 hover:text-sky-400 transition-colors group"
            >
              <Twitter size={22} />
              <span className="text-[10px] tracking-wider-2 uppercase">Twitter</span>
            </a>

            <a
              href="https://pinterest.com/melekwears"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest"
              className="flex flex-col items-center gap-2 text-ivory-200/70 hover:text-red-400 transition-colors group"
            >
              <PinterestIcon size={22} />
              <span className="text-[10px] tracking-wider-2 uppercase">Pinterest</span>
            </a>

            <a
              href="mailto:Melekwears@gmail.com"
              aria-label="Email"
              className="flex flex-col items-center gap-2 text-ivory-200/70 hover:text-gold transition-colors group"
            >
              <Mail size={22} />
              <span className="text-[10px] tracking-wider-2 uppercase">Email</span>
            </a>

            <a
              href="https://wa.me/2348134525822"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex flex-col items-center gap-2 text-ivory-200/70 hover:text-green-400 transition-colors group"
            >
              <MessageCircle size={22} />
              <span className="text-[10px] tracking-wider-2 uppercase">WhatsApp</span>
            </a>
          </div>

          {/* Handles */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-ivory-300/50">
            <span>@melekwears</span>
            <span className="hidden sm:block">·</span>
            <a href="mailto:Melekwears@gmail.com" className="hover:text-gold transition-colors">
              Melekwears@gmail.com
            </a>
            <span className="hidden sm:block">·</span>
            <a
              href="https://wa.me/2348134525822"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition-colors"
            >
              +234 813 452 5822
            </a>
          </div>
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
            <div className="flex gap-5 mt-6">
              <a
                href="https://instagram.com/melekwears"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-ivory-200/60 hover:text-pink-400 transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://twitter.com/melekwears"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-ivory-200/60 hover:text-sky-400 transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://pinterest.com/melekwears"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="text-ivory-200/60 hover:text-red-400 transition-colors"
              >
                <PinterestIcon size={18} />
              </a>
              <a
                href="https://wa.me/2348134525822"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-ivory-200/60 hover:text-green-400 transition-colors"
              >
                <MessageCircle size={18} />
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