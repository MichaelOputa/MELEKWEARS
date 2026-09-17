import { aboutImage } from '@/data/products';
import { useReveal } from '@/hooks/useReveal';

export default function About() {
  const { ref, visible } = useReveal();

  return (
    <section className="px-6 lg:px-10 py-24 lg:py-32 bg-chocolate-900">
      <div ref={ref} className="mx-auto max-w-[1400px] grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className={`${visible ? 'is-visible' : ''} reveal reveal-delay-2 order-2 lg:order-1`}>
          <p className="text-xs tracking-ultra-wide uppercase text-gold mb-6">The Origin</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory-50 leading-[1.15] text-balance">
            Rooted in Nigeria.
            <br />
            <span className="italic text-gold-light">Designed for the World.</span>
          </h2>
          <div className="mt-8 space-y-6">
            <p className="text-base text-ivory-200/80 leading-relaxed">
              Proudly designed and made in Nigeria, MelekWears celebrates modern African craftsmanship while meeting global standards of quality and finish.
            </p>
            <p className="text-base text-ivory-200/60 leading-relaxed">
              Whether dressing for business, leisure, or special moments, MelekWears elevates everyday style with sophistication and lasting value.
            </p>
          </div>
        </div>

        <div className={`reveal ${visible ? 'is-visible' : ''} order-1 lg:order-2`}>
          <div className="aspect-[4/5] overflow-hidden bg-chocolate-800">
            <img
              src={aboutImage}
              alt="Nigerian craftsmanship and contemporary fashion"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
