import { products } from '@/data/products';
import { useReveal } from '@/hooks/useReveal';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/types';

interface SignaturePiecesProps {
  onQuickView: (product: Product) => void;
  onNavigate: (page: string) => void;
}

const signatureGroups = [
  { label: 'Open-Collar Johnny Polos', description: 'Placket-less, buttonless collars designed for casual elegance.' },
  { label: 'Luxe Round-Neck Tops', description: 'Minimalist, high-fit crew necks made for refined everyday dressing.' },
  { label: 'Waffle-Knit Long-Sleeve Polos', description: 'Structured, tactile long-sleeve pieces crafted for texture and comfort.' },
  { label: 'Two-Piece Sets & Lounge Trousers', description: 'Relaxed-fit tailored trousers and coordinated sets designed for effortless style.' },
];

export default function SignaturePieces({ onQuickView, onNavigate }: SignaturePiecesProps) {
  const { ref, visible } = useReveal();

  const featured = products.filter((p) => p.signatureLabel).slice(0, 4);

  return (
    <section className="px-6 lg:px-10 py-24 lg:py-32 bg-chocolate-950">
      <div ref={ref} className="mx-auto max-w-[1600px]">
        <div className={`text-center mb-16 reveal ${visible ? 'is-visible' : ''}`}>
          <p className="text-xs tracking-ultra-wide uppercase text-gold mb-4">The Wardrobe</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory-50">Signature Pieces</h2>
        </div>

        {/* Signature categories */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {signatureGroups.map((group, i) => (
            <div
              key={group.label}
              className={`text-center reveal ${visible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <h3 className="font-serif text-lg text-ivory-50 mb-2">{group.label}</h3>
              <p className="text-xs text-ivory-200/60 leading-relaxed">{group.description}</p>
            </div>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onNavigate={onNavigate}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate('shop')}
            className="border border-gold/50 text-gold text-xs tracking-wider-2 uppercase px-10 py-4 hover:bg-gold hover:text-chocolate-950 transition-all duration-300"
          >
            View All Pieces
          </button>
        </div>
      </div>
    </section>
  );
}
