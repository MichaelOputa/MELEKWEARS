import { aboutImage, brandStatementImage } from '@/data/products';
import { useReveal } from '@/hooks/useReveal';
import Img from '@/components/Img';

/**
 * Both About photos are portrait shots (the Melek bag, the folded-tee stack), so
 * they sit in portrait frames at a capped width instead of being cropped into a
 * full-width landscape banner. To resize them, change the `max-w-[...]` on the
 * two image frames below.
 */
export default function AboutPage() {
  const { ref, visible } = useReveal();

  return (
    <div className="pt-24 lg:pt-28">
      {/* Hero */}
      <section className="px-6 lg:px-10 py-14 lg:py-24 bg-chocolate-950">
        <div className="mx-auto max-w-[1200px] grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div className="text-center lg:text-left">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory-50">
              Rooted in Nigeria.
              <br />
              <span className="italic text-gold-light">Designed for the World.</span>
            </h1>
            <p className="text-base text-ivory-200/80 leading-relaxed mt-8">
              Proudly designed and made in Nigeria, MelekWears celebrates modern African craftsmanship while meeting global standards of quality and finish.
            </p>
          </div>

          {/* Image frame: portrait 3:4, capped width */}
          <div className="mx-auto w-full max-w-[380px] lg:max-w-[440px] aspect-[3/4] overflow-hidden bg-chocolate-800">
            <Img thumb priority src={aboutImage} alt="MelekWears" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Content */}
      <section ref={ref} className="px-6 lg:px-10 pb-24 lg:pb-32 bg-chocolate-950">
        <div className="mx-auto max-w-[1200px] grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Image frame: portrait 2:3, capped width */}
          <div
            className={`mx-auto w-full max-w-[340px] lg:max-w-[400px] aspect-[2/3] overflow-hidden bg-chocolate-800 reveal ${visible ? 'is-visible' : ''}`}
          >
            <Img thumb src={brandStatementImage} alt="MelekWears editorial" className="w-full h-full object-cover" />
          </div>

          <p
            className={`text-base text-ivory-200/60 leading-relaxed text-center lg:text-left reveal ${visible ? 'is-visible' : ''} reveal-delay-2`}
          >
            Whether dressing for business, leisure, or special moments, MelekWears elevates everyday style with sophistication and lasting value. Our pieces are created for individuals who value quality, confidence, and understated elegance — designed to remain relevant across seasons and occasions.
          </p>
        </div>
      </section>
    </div>
  );
}
