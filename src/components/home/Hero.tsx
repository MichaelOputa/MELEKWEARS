import { useStore } from '@/store/StoreContext';
import { heroImage } from '@/data/products';
import Img from '@/components/Img';

interface HeroProps {
  onNavigate: (page: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const { setSearchOpen } = useStore();

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background image with slow zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <Img
          priority
          fade={false}
          src={heroImage}
          alt="MelekWears model in resort-inspired luxury clothing"
          className="w-full h-full object-cover animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-chocolate-950/40 via-chocolate-950/20 to-chocolate-950/80" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <div className="animate-fade-up">
          <p className="text-xs tracking-ultra-wide uppercase text-ivory-200/90 mb-6">
            MelekWears
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-ivory-50 leading-[1.1] max-w-4xl text-balance">
            Crafted with Precision.
            <br />
            <span className="italic text-gold-light">Designed for Distinction.</span>
          </h1>
          <p className="text-sm md:text-base text-ivory-200/80 mt-8 tracking-wide max-w-xl mx-auto">
            Timeless luxury, thoughtfully made in Nigeria.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-12 animate-fade-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          <button
            onClick={() => onNavigate('shop')}
            className="bg-ivory-50 text-chocolate-950 text-xs tracking-wider-2 uppercase px-10 py-4 hover:bg-gold transition-all duration-300"
          >
            Shop the Collection
          </button>
          <button
            onClick={() => onNavigate('about')}
            className="border border-ivory-200/40 text-ivory-50 text-xs tracking-wider-2 uppercase px-10 py-4 hover:border-gold hover:text-gold transition-all duration-300"
          >
            Discover Melek
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'both' }}>
        <span className="text-[10px] tracking-wider-2 uppercase text-ivory-200/60">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-ivory-200/60 to-transparent" />
      </div>
    </section>
  );
}
