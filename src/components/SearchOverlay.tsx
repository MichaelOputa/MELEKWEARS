import { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { products } from '@/data/products';
import Price from '@/components/Price';

interface SearchOverlayProps {
  onNavigate: (page: string) => void;
  onProductSelect: (productId: string) => void;
}

export default function SearchOverlay({ onNavigate, onProductSelect }: SearchOverlayProps) {
  const { isSearchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!isSearchOpen) setQuery('');
  }, [isSearchOpen]);

  const results = query
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.collection.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  return (
    <div
      className={`fixed inset-0 z-[70] transition-all duration-500 ${
        isSearchOpen ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-chocolate-950/90 backdrop-blur-md"
        onClick={() => setSearchOpen(false)}
      />
      <div className="relative mx-auto max-w-3xl pt-24 px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl text-ivory-50">Search</h2>
          <button
            onClick={() => setSearchOpen(false)}
            className="text-ivory-100 hover:text-gold transition-colors"
            aria-label="Close search"
          >
            <X size={24} />
          </button>
        </div>
        <div className="relative">
          <Search
            size={18}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-ivory-300/50"
          />
          <input
            autoFocus={isSearchOpen}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for pieces, collections..."
            className="w-full bg-transparent border-b border-chocolate-600 pl-8 pr-4 py-3 text-ivory-100 placeholder:text-ivory-300/40 focus:outline-none focus:border-gold transition-colors text-lg"
          />
        </div>

        {results.length > 0 && (
          <div className="mt-8 space-y-4">
            {results.map((product) => (
              <button
                key={product.id}
                onClick={() => {
                  onProductSelect(product.id);
                  setSearchOpen(false);
                }}
                className="flex items-center gap-4 w-full text-left group hover:bg-chocolate-800/50 p-2 transition-colors"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-16 h-20 object-cover bg-chocolate-800"
                />
                <div>
                  <h3 className="font-serif text-base text-ivory-50 group-hover:text-gold transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-ivory-300/60">{product.collection}</p>
                  <p className="text-sm text-gold mt-1"><Price amount={product.price} /></p>
                </div>
              </button>
            ))}
          </div>
        )}

        {query && results.length === 0 && (
          <p className="mt-8 text-ivory-300/50 text-center">No results found for "{query}"</p>
        )}

        {!query && (
          <div className="mt-8">
            <p className="text-xs tracking-wider-2 uppercase text-ivory-300/50 mb-4">Popular</p>
            <div className="flex flex-wrap gap-3">
              {['Riviera', 'Polo', 'Luxe', 'Atelier', 'Sets'].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="text-xs tracking-wider uppercase border border-chocolate-600 text-ivory-200 px-4 py-2 hover:border-gold hover:text-gold transition-all"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
