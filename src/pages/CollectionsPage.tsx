import { collectionImages } from '@/data/products';
import { useReveal } from '@/hooks/useReveal';
import type { Collection } from '@/types';

interface CollectionsPageProps {
  onNavigate: (page: string, collection?: Collection) => void;
}

const collections: {
  name: Collection;
  description: string;
  cta: string;
  image: string;
  longDescription: string;
}[] = [
  {
    name: 'Riviera',
    description: 'Resort-inspired tailored leisurewear featuring open-collar silhouettes.',
    cta: 'Explore Riviera',
    image: collectionImages.Riviera,
    longDescription: 'The Riviera line embodies the spirit of resort leisure — short-sleeve, open-collar Melek polos cut from breathable cotton with contrast ribbed tipping. Each shirt is designed for casual elegance and styled with the trousers of your choice.',
  },
  {
    name: 'Melek Luxe Round Neck',
    description: 'Elevated premium essentials designed for effortless everyday luxury.',
    cta: 'Explore Luxe',
    image: collectionImages['Melek Luxe Round Neck'],
    longDescription: 'The Melek Luxe Round Neck collection is built on minimalist, high-fit crew necks in premium slub knit. These are the wardrobe essentials — the round-neck tee, its matching two-piece set, and the short nicker — refined, versatile, and designed for effortless everyday dressing.',
  },
  {
    name: 'Atelier',
    description: 'Structured drops defined by refined tailoring and specialized fabric blends.',
    cta: 'Explore Atelier',
    image: collectionImages.Atelier,
    longDescription: 'The Atelier line represents our most structured work — heavy-gauge textured knits, waffle weaves, and tailored resort fits, from the long-sleeve collared shirt to the matching two-piece set. Each drop is a study in precision construction and tactile fabric.',
  },
];

export default function CollectionsPage({ onNavigate }: CollectionsPageProps) {
  const { ref, visible } = useReveal();

  return (
    <div className="pt-24 lg:pt-28">
      <div className="px-6 lg:px-10 py-12 text-center bg-chocolate-950">
        <h1 className="font-serif text-4xl md:text-5xl text-ivory-50">Collections</h1>
        <p className="text-sm text-ivory-200/60 mt-4">Three lines. One standard of distinction.</p>
      </div>

      <div ref={ref} className="bg-chocolate-950">
        {collections.map((col, i) => (
          <div
            key={col.name}
            className={`px-6 lg:px-10 py-16 lg:py-24 ${i % 2 === 1 ? 'bg-chocolate-900' : ''}`}
          >
            <div className={`mx-auto max-w-[1400px] grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              <div className={`reveal ${visible ? 'is-visible' : ''}`}>
                <div className="aspect-[4/5] overflow-hidden bg-chocolate-800">
                  <img src={col.image} alt={col.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className={`reveal ${visible ? 'is-visible' : ''} reveal-delay-2`}>
                <p className="text-xs tracking-ultra-wide uppercase text-gold mb-4">
                  Collection {String(i + 1).padStart(2, '0')}
                </p>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ivory-50">{col.name}</h2>
                <p className="text-sm text-ivory-200/80 leading-relaxed mt-6">{col.longDescription}</p>
                <button
                  onClick={() => onNavigate('shop', col.name)}
                  className="mt-8 text-xs tracking-wider-2 uppercase text-gold border border-gold/50 px-8 py-4 hover:bg-gold hover:text-chocolate-950 transition-all duration-300"
                >
                  {col.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
