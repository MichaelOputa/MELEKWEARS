import { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { useStore } from '@/store/StoreContext';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const { setCartOpen, setSearchOpen, cartCount, isMenuOpen, setMenuOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Home', page: 'home' },
    { label: 'Shop', page: 'shop' },
    { label: 'Collections', page: 'collections' },
    { label: 'About', page: 'about' },
    { label: 'Craftsmanship', page: 'craftsmanship' },
    { label: 'Journal', page: 'journal' },
  ];

  const handleNav = (page: string) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-chocolate-950/95 backdrop-blur-md py-3 shadow-lg shadow-black/30'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 lg:px-10">
          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!isMenuOpen)}
            className="lg:hidden text-ivory-100 hover:text-gold transition-colors"
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center"
            aria-label="MelekWears Home"
          >
            <img
              src="/images/Melek.png"
              alt="MELEK"
              className={`w-auto object-contain transition-all duration-500 ${
                scrolled
                  ? 'h-10 lg:h-12'
                  : 'h-12 lg:h-14 drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]'
              }`}
            />
          </button>

          {/* Center navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNav(link.page)}
                className={`text-xs tracking-wider-2 uppercase transition-colors duration-300 relative group ${
                  currentPage === link.page
                    ? 'text-gold'
                    : 'text-ivory-100 hover:text-gold'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                    currentPage === link.page ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-4 lg:gap-5">
            <button
              onClick={() => setSearchOpen(true)}
              className="text-ivory-100 hover:text-gold transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => onNavigate('account')}
              className="hidden sm:block text-ivory-100 hover:text-gold transition-colors"
              aria-label="Account"
            >
              <User size={20} />
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-ivory-100 hover:text-gold transition-colors"
              aria-label="Shopping bag"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-chocolate-950 text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center animate-fade-in">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-chocolate-950/80 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute top-0 left-0 h-full w-[80%] max-w-sm bg-chocolate-900 px-8 py-24 transition-transform duration-500 ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNav(link.page)}
                className={`text-sm tracking-wider-2 uppercase text-left transition-colors ${
                  currentPage === link.page
                    ? 'text-gold'
                    : 'text-ivory-100 hover:text-gold'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav('account')}
              className="text-sm tracking-wider-2 uppercase text-left text-ivory-100 hover:text-gold transition-colors"
            >
              Account
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}