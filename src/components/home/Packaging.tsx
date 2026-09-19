import { packagingImage } from '@/data/products';
import { useReveal } from '@/hooks/useReveal';
import Img from '@/components/Img';

export default function Packaging() {
  const { ref, visible } = useReveal();

  return (
    <section className="px-6 lg:px-10 py-24 lg:py-32 bg-chocolate-900">
      <div ref={ref} className="mx-auto max-w-[1600px] grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className={`reveal ${visible ? 'is-visible' : ''}`}>
          <div className="aspect-[16/10] overflow-hidden bg-chocolate-800">
            <Img
              src={packagingImage}
              alt="MelekWears packaging and unboxing experience"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className={`${visible ? 'is-visible' : ''} reveal reveal-delay-2`}>
          <p className="text-xs tracking-ultra-wide uppercase text-gold mb-6">The Experience</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory-50 leading-[1.15] text-balance">
            The Art of Arrival.
          </h2>
          <p className="text-base text-ivory-200/80 leading-relaxed mt-8">
            Your MelekWears experience begins before you put it on.
          </p>
          <p className="text-base text-ivory-200/60 leading-relaxed mt-4">
            Each piece is presented in elevated packaging — from garment boxes and tissue paper to tags and personalized handwritten customer appreciation notes on premium heavy cardstock. Every detail of the unboxing is designed to reflect the care and intention behind the garment within.
          </p>
        </div>
      </div>
    </section>
  );
}
