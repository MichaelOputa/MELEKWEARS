import { useState, useMemo, useEffect, useCallback } from 'react';
import { SlidersHorizontal, X, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { products, heroImage, getCollectionImages } from '@/data/products';
import { useStore } from '@/store/StoreContext';
import { useReveal } from '@/hooks/useReveal';
import ProductCard from '@/components/ProductCard';
import { formatPrice } from '@/lib/format';
import type { Product, Collection, Size } from '@/types';

interface ShopPageProps {
  /** Collection to open on (e.g. from a footer or collection-card link). Omit or null for all. */
  initialCollection?: Collection | null;
  onQuickView: (product: Product) => void;
  onNavigate: (page: string, collection?: Collection) => void;
}

const allCollections: Collection[] = ['Riviera', 'Melek Luxe Round Neck', 'Atelier'];
const allSizes: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const allColors = [
  { name: 'Ivory', hex: '#f0e6d9' },
  { name: 'Cream', hex: '#f9f4ed' },
  { name: 'Stone', hex: '#c2ab87' },
  { name: 'Cocoa', hex: '#6f4a36' },
  { name: 'Chocolate', hex: '#553828' },
  { name: 'Espresso', hex: '#3d2820' },
  { name: 'Black', hex: '#1a1a1a' },
];

const MAX_PRICE = 100000;

type SortOption = 'featured' | 'price-low' | 'price-high' | 'name';

export default function ShopPage({ initialCollection = null, onQuickView, onNavigate }: ShopPageProps) {
  const { wishlist } = useStore();
  const { ref, visible } = useReveal();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [selectedCollections, setSelectedCollections] = useState<Set<Collection>>(
    new Set(initialCollection ? [initialCollection] : [])
  );
  const [selectedSizes, setSelectedSizes] = useState<Set<Size>>(new Set());
  const [selectedColors, setSelectedColors] = useState<Set<string>>(new Set());
  const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_PRICE]);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const [selectedLookImage, setSelectedLookImage] = useState<string | null>(null);

  const toggleSet = <T,>(set: Set<T>, value: T, setter: (s: Set<T>) => void) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setter(next);
  };

  const filtered = useMemo(() => {
    let result = [...products];

    if (showWishlistOnly) {
      result = result.filter((p) => wishlist.includes(p.id));
    }
    if (selectedCollections.size > 0) {
      result = result.filter((p) => selectedCollections.has(p.collection));
    }
    if (selectedSizes.size > 0) {
      result = result.filter((p) => p.sizes.some((s) => selectedSizes.has(s)));
    }
    if (selectedColors.size > 0) {
      result = result.filter((p) => p.colors.some((c) => selectedColors.has(c.name)));
    }
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [selectedCollections, selectedSizes, selectedColors, priceRange, sortBy, showWishlistOnly, wishlist]);

  const clearFilters = () => {
    setSelectedCollections(new Set());
    setSelectedSizes(new Set());
    setSelectedColors(new Set());
    setPriceRange([0, MAX_PRICE]);
    setShowWishlistOnly(false);
  };

  const activeFilterCount =
    selectedCollections.size + selectedSizes.size + selectedColors.size +
    (priceRange[0] !== 0 || priceRange[1] !== MAX_PRICE ? 1 : 0) + (showWishlistOnly ? 1 : 0);

  // Lookbook = every image in the folder of each selected collection
  // (atelier / melekluxe / rivieracollection); with none selected, all three.
  const selectedList = allCollections.filter((c) => selectedCollections.has(c));
  const lookbookImages = getCollectionImages(selectedList);
  const lookbookTitle = selectedList.length === 0 ? 'Lookbook' : `${selectedList.join(' · ')} Lookbook`;

  const stepLook = useCallback(
    (delta: number) => {
      setSelectedLookImage((current) => {
        if (!current) return current;
        const i = lookbookImages.indexOf(current);
        if (i === -1) return current;
        return lookbookImages[(i + delta + lookbookImages.length) % lookbookImages.length];
      });
    },
    [lookbookImages]
  );

  useEffect(() => {
    if (!selectedLookImage) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedLookImage(null);
      if (e.key === 'ArrowLeft') stepLook(-1);
      if (e.key === 'ArrowRight') stepLook(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedLookImage, stepLook]);

  return (
    <div className="pt-24 lg:pt-28">
      {/* Header */}
      <div
        className="relative px-6 lg:px-10 py-12 text-center bg-chocolate-950 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-chocolate-950/70" />
        <div className="relative">
          <h1 className="font-serif text-4xl md:text-5xl text-ivory-50">The Shop</h1>
          <p className="text-sm text-ivory-200/60 mt-4">Explore the full MelekWears collection</p>
        </div>
      </div>

      <div className="px-6 lg:px-10 py-8 bg-chocolate-950">
        <div className="mx-auto max-w-[1600px] flex items-center justify-between flex-wrap gap-4">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 text-xs tracking-wider-2 uppercase text-ivory-100 hover:text-gold transition-colors"
          >
            <SlidersHorizontal size={16} />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-gold text-chocolate-950 text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowWishlistOnly(!showWishlistOnly)}
              className={`flex items-center gap-2 text-xs tracking-wider-2 uppercase transition-colors ${
                showWishlistOnly ? 'text-gold' : 'text-ivory-100 hover:text-gold'
              }`}
            >
              <Heart size={16} className={showWishlistOnly ? 'fill-gold' : ''} />
              Wishlist
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs tracking-wider-2 uppercase text-ivory-300/50">Sort</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent border border-chocolate-600 text-ivory-100 text-xs px-3 py-2 focus:outline-none focus:border-gold transition-colors cursor-pointer"
              >
                <option value="featured" className="bg-chocolate-900">Featured</option>
                <option value="price-low" className="bg-chocolate-900">Price: Low to High</option>
                <option value="price-high" className="bg-chocolate-900">Price: High to Low</option>
                <option value="name" className="bg-chocolate-900">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick category links */}
        <div className="mx-auto max-w-[1600px] flex flex-wrap gap-2 mt-6">
          {['All Products', ...allCollections].map((cat) => {
            const isActive =
              cat === 'All Products'
                ? selectedCollections.size === 0
                : selectedCollections.size === 1 && selectedCollections.has(cat as Collection);
            return (
              <button
                key={cat}
                onClick={() => {
                  if (cat === 'All Products') {
                    clearFilters();
                  } else {
                    // Show just this collection (click it again to go back to all)
                    setSelectedCollections(isActive ? new Set() : new Set([cat as Collection]));
                  }
                }}
                className={`text-xs tracking-wider uppercase px-4 py-2 border transition-all ${
                  isActive
                    ? 'border-gold text-gold'
                    : 'border-chocolate-600 text-ivory-200/60 hover:border-ivory-300/40 hover:text-ivory-100'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter panel */}
      {filtersOpen && (
        <div className="px-6 lg:px-10 py-8 bg-chocolate-900 border-y border-chocolate-800 animate-fade-in">
          <div className="mx-auto max-w-[1600px] grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Collections */}
            <div>
              <h3 className="text-xs tracking-wider-2 uppercase text-gold mb-4">Collections</h3>
              <div className="space-y-2">
                {allCollections.map((col) => (
                  <label key={col} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCollections.has(col)}
                      onChange={() => toggleSet(selectedCollections, col, setSelectedCollections)}
                      className="accent-gold"
                    />
                    <span className="text-sm text-ivory-200/80">{col}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="text-xs tracking-wider-2 uppercase text-gold mb-4">Sizes</h3>
              <div className="flex flex-wrap gap-2">
                {allSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleSet(selectedSizes, size, setSelectedSizes)}
                    className={`min-w-[2.5rem] px-3 py-1.5 text-xs tracking-wider uppercase border transition-all ${
                      selectedSizes.has(size)
                        ? 'border-gold bg-gold text-chocolate-950'
                        : 'border-chocolate-600 text-ivory-200/70 hover:border-ivory-300/40'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors & Price */}
            <div>
              <h3 className="text-xs tracking-wider-2 uppercase text-gold mb-4">Colors</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {allColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => toggleSet(selectedColors, color.name, setSelectedColors)}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${
                      selectedColors.has(color.name) ? 'border-gold scale-110' : 'border-chocolate-600'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>

              <h3 className="text-xs tracking-wider-2 uppercase text-gold mb-4">Price Range</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min={0}
                  max={MAX_PRICE}
                  step={5000}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full accent-gold"
                />
                <div className="flex justify-between text-xs text-ivory-200/60">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </div>
            </div>
          </div>

          {activeFilterCount > 0 && (
            <div className="mx-auto max-w-[1600px] mt-6">
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 text-xs tracking-wider-2 uppercase text-ivory-300/60 hover:text-gold transition-colors"
              >
                <X size={14} /> Clear all filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Products grid */}
      <div className="px-6 lg:px-10 py-12 bg-chocolate-950">
        <div ref={ref} className="mx-auto max-w-[1600px]">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-serif text-xl text-ivory-200/60">No pieces match your selection.</p>
              <button
                onClick={clearFilters}
                className="mt-6 text-xs tracking-wider-2 uppercase text-gold border border-gold/50 px-6 py-3 hover:bg-gold hover:text-chocolate-950 transition-all"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <p className="text-xs text-ivory-300/50 mb-8">{filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}</p>
              <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 reveal ${visible ? 'is-visible' : ''}`}>
                {filtered.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={onQuickView}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      {/* Lookbook — every image from the selected collection's folder */}
      <div className="px-6 lg:px-10 py-12 bg-chocolate-900 border-t border-chocolate-800">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-serif text-2xl md:text-3xl text-ivory-50">{lookbookTitle}</h2>
            <p className="text-xs text-ivory-300/50">{lookbookImages.length} images</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {lookbookImages.map((src) => (
              <button
                key={src}
                onClick={() => setSelectedLookImage(src)}
                className={`aspect-[3/4] overflow-hidden bg-chocolate-800 border-2 transition-colors ${
                  selectedLookImage === src ? 'border-gold' : 'border-transparent hover:border-ivory-300/40'
                }`}
              >
                <img src={src} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lookbook lightbox */}
      {selectedLookImage && (
        <div
          className="fixed inset-0 z-50 bg-chocolate-950/90 flex items-center justify-center p-6"
          onClick={() => setSelectedLookImage(null)}
        >
          <button
            onClick={() => setSelectedLookImage(null)}
            className="absolute top-6 right-6 text-ivory-100 hover:text-gold transition-colors"
          >
            <X size={28} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); stepLook(-1); }}
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 text-ivory-100 hover:text-gold transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={36} />
          </button>
          <img
            src={selectedLookImage}
            alt=""
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => { e.stopPropagation(); stepLook(1); }}
            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 text-ivory-100 hover:text-gold transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </div>
  );
}