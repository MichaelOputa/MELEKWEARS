import { useReveal } from '@/hooks/useReveal';

const principles = [
  { title: 'Precision', description: 'Every detail is considered.' },
  { title: 'Comfort', description: 'Luxury should feel as good as it looks.' },
  { title: 'Durability', description: 'Designed to remain relevant beyond seasons.' },
  { title: 'Distinction', description: 'Quietly confident. Intentionally different.' },
];

export default function MelekStandard() {
  const { ref, visible } = useReveal();

  return (
    <section className="px-6 lg:px-10 py-24 lg:py-32 bg-chocolate-950 relative overflow-hidden">
      {/* Subtle gold accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-gold/40 to-transparent" />

      <div ref={ref} className="mx-auto max-w-[1400px]">
        <div className={`text-center mb-20 reveal ${visible ? 'is-visible' : ''}`}>
          <p className="text-xs tracking-ultra-wide uppercase text-gold mb-4">The Promise</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory-50">The Melek Standard</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-chocolate-700/30">
          {principles.map((p, i) => (
            <div
              key={p.title}
              className={`bg-chocolate-950 p-10 lg:p-12 text-center reveal ${visible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="font-serif text-5xl text-gold/30 mb-6">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-serif text-2xl text-ivory-50 mb-3">{p.title}</h3>
              <p className="text-sm text-ivory-200/60 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
