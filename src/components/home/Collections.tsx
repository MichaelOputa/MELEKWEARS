import { collectionImages } from '@/data/products';
import { useReveal } from '@/hooks/useReveal';
import type { Collection } from '@/types';

interface CollectionsProps {
  onNavigate: (page: string, collection?: Collection) => void;
}

const collections: {
  name: Collection;
  description: string;
  cta: string;
  image: string;
}[] = [
  {
    name: 'Riviera',
    description: 'Resort-inspired tailored leisurewear featuring open-collar silhouettes.',
    cta: 'Explore Riviera',
    image: collectionImages.Riviera,
  },
  {
    name: 'Melek Luxe Round Neck',
    description: 'Elevated premium essentials designed for effortless everyday luxury.',
    cta: 'Explore Luxe',
    image: collectionImages['Melek Luxe Round Neck'],
  },
  {
    name: 'Atelier',
    description: 'Structured drops defined by refined tailoring and specialized fabric blends.',
    cta: 'Explore Atelier',
    image: collectionImages.Atelier,
  },
];

export default function Collections({ onNavigate }: CollectionsProps) {
  const { ref, visible } = useReveal();

  return (
    <section className="px-6 lg:px-10 py-24 lg:py-32 bg-chocolate-900">
      <div ref={ref} className="mx-auto max-w-[1600px]">
        <div className={`text-center mb-16 reveal ${visible ? 'is-visible' : ''}`}>
          <p className="text-xs tracking-ultra-wide uppercase text-gold mb-4">Curated</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory-50">The Collections</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {collections.map((col, i) => (
            <div
              key={col.name}
              className={`group relative overflow-hidden aspect-[3/4] cursor-pointer reveal ${visible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 0.15}s` }}
              onClick={() => onNavigate('shop', col.name)}
            >
              <img
                src={col.image}
                alt={col.name}
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-chocolate-950 via-chocolate-950/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                <h3 className="font-serif text-2xl lg:text-3xl text-ivory-50 mb-2">{col.name}</h3>
                <p className="text-sm text-ivory-200/70 leading-relaxed max-w-xs mb-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {col.description}
                </p>
                <span className="inline-block text-xs tracking-wider-2 uppercase text-gold border-b border-gold/50 pb-1 group-hover:border-gold transition-colors">
                  {col.cta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
