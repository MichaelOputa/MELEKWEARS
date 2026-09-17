import { useReveal } from '@/hooks/useReveal';

const regions = ['Nigeria', 'Europe', 'Americas'];

export default function GlobalShipping() {
  const { ref, visible } = useReveal();

  return (
    <section className="px-6 lg:px-10 py-24 lg:py-32 bg-chocolate-900">
      <div ref={ref} className={`mx-auto max-w-[1200px] text-center reveal ${visible ? 'is-visible' : ''}`}>
        <p className="text-xs tracking-ultra-wide uppercase text-gold mb-6">Worldwide</p>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory-50 leading-[1.15] text-balance">
          Melek, Wherever You Are.
        </h2>
        <p className="text-base text-ivory-200/70 mt-8 max-w-2xl mx-auto leading-relaxed">
          We deliver across Nigeria, Europe, and the Americas, bringing the MelekWears experience to customers around the world.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-8 mt-12">
          {regions.map((region, i) => (
            <div
              key={region}
              className={`reveal ${visible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <h3 className="font-serif text-2xl text-ivory-50">{region}</h3>
              <div className="w-12 h-px bg-gold/40 mx-auto mt-3" />
            </div>
          ))}
        </div>

        <p className="text-xs text-ivory-300/50 mt-12 tracking-wide">
          Shipping information is displayed at checkout based on your destination.
        </p>
      </div>
    </section>
  );
}
