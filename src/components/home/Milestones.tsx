import { useReveal } from '@/hooks/useReveal';

const milestones = [
  {
    title: 'Global Expansion',
    description: 'Extended collection availability and international fulfillment into European and American markets.',
  },
  {
    title: 'Signature Releases',
    description: 'Successfully launched the Riviera, Luxe Round Neck, and Atelier lines.',
  },
  {
    title: 'Textile Excellence',
    description: 'Built a reputation for sourcing premium multi-tonal bouclé, slub, and waffle-weave fabrics for luxury resortwear.',
  },
  {
    title: 'Elevated Unboxing',
    description: 'Created a memorable direct-to-consumer experience with personalized handwritten customer appreciation notes.',
  },
];

export default function Milestones() {
  const { ref, visible } = useReveal();

  return (
    <section className="px-6 lg:px-10 py-24 lg:py-32 bg-chocolate-950">
      <div ref={ref} className="mx-auto max-w-[1600px]">
        <div className={`text-center mb-16 reveal ${visible ? 'is-visible' : ''}`}>
          <p className="text-xs tracking-ultra-wide uppercase text-gold mb-4">The Story</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory-50">Our Journey</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative">
          {/* Horizontal line */}
          <div className="hidden lg:block absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

          {milestones.map((m, i) => (
            <div
              key={m.title}
              className={`relative pt-8 reveal ${visible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              {/* Dot */}
              <div className="hidden lg:block absolute top-0 left-0 w-3 h-3 rounded-full bg-gold -translate-y-1.5" />

              <h3 className="font-serif text-xl text-ivory-50 mb-3">{m.title}</h3>
              <p className="text-sm text-ivory-200/60 leading-relaxed">{m.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
