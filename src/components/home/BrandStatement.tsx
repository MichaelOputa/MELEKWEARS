import { brandStatementImage } from '@/data/products';
import { useReveal } from '@/hooks/useReveal';

export default function BrandStatement() {
  const { ref, visible } = useReveal();

  return (
    <section className="px-6 lg:px-10 py-24 lg:py-32 bg-chocolate-950">
      <div ref={ref} className="mx-auto max-w-[1400px] grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className={`reveal ${visible ? 'is-visible' : ''}`}>
          <div className="aspect-[4/5] overflow-hidden bg-chocolate-800">
            <img
              src={brandStatementImage}
              alt="MelekWears editorial"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className={`${visible ? 'is-visible' : ''} reveal reveal-delay-2`}>
          <p className="text-xs tracking-ultra-wide uppercase text-gold mb-6">The Philosophy</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory-50 leading-[1.15] text-balance">
            Luxury Without Compromise.
          </h2>
          <div className="mt-8 space-y-6">
            <p className="text-base text-ivory-200/80 leading-relaxed">
              MelekWears creates timeless clothing for individuals who value quality, confidence, and understated elegance. Every piece is thoughtfully designed around clean silhouettes, premium fabrics, and meticulous attention to detail.
            </p>
            <p className="text-base text-ivory-200/60 leading-relaxed italic font-serif text-lg">
              Rather than following short-lived trends, we create versatile wardrobe essentials designed to remain relevant across seasons and occasions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
