import { aboutImage, brandStatementImage } from '@/data/products';
import { useReveal } from '@/hooks/useReveal';

export default function AboutPage() {
  const { ref, visible } = useReveal();

  return (
    <div className="pt-24 lg:pt-28">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src={aboutImage} alt="MelekWears" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-chocolate-950/50 to-chocolate-950/90" />
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory-50">
            Rooted in Nigeria.
            <br />
            <span className="italic text-gold-light">Designed for the World.</span>
          </h1>
        </div>
      </div>

      {/* Content */}
      <div ref={ref} className="px-6 lg:px-10 py-24 lg:py-32 bg-chocolate-950">
        <div className="mx-auto max-w-[1000px] text-center">
          <p className={`text-base text-ivory-200/80 leading-relaxed reveal ${visible ? 'is-visible' : ''}`}>
            Proudly designed and made in Nigeria, MelekWears celebrates modern African craftsmanship while meeting global standards of quality and finish.
          </p>
          <p className={`text-base text-ivory-200/60 leading-relaxed mt-6 reveal ${visible ? 'is-visible' : ''} reveal-delay-2`}>
            Whether dressing for business, leisure, or special moments, MelekWears elevates everyday style with sophistication and lasting value. Our pieces are created for individuals who value quality, confidence, and understated elegance — designed to remain relevant across seasons and occasions.
          </p>
        </div>
      </div>

      {/* Image */}
      <div className="px-6 lg:px-10 pb-24 lg:pb-32 bg-chocolate-950">
        <div className="mx-auto max-w-[1400px] aspect-[16/9] overflow-hidden bg-chocolate-800">
          <img src={brandStatementImage} alt="MelekWears editorial" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
