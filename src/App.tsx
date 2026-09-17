import { useState, useEffect, useCallback } from 'react';
import { StoreProvider } from '@/store/StoreContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import SearchOverlay from '@/components/SearchOverlay';
import QuickViewModal from '@/components/QuickViewModal';
import HomePage from '@/pages/HomePage';
import ShopPage from '@/pages/ShopPage';
import ProductPage from '@/pages/ProductPage';
import CollectionsPage from '@/pages/CollectionsPage';
import AboutPage from '@/pages/AboutPage';
import CraftsmanshipPage from '@/pages/CraftsmanshipPage';
import JournalPage from '@/pages/JournalPage';
import ContactPage from '@/pages/ContactPage';
import CheckoutPage from '@/pages/CheckoutPage';
import AccountPage from '@/pages/AccountPage';
import { products } from '@/data/products';
import type { Product } from '@/types';

function AppContent() {
  const [page, setPage] = useState('home');
  const [selectedProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [productPageItem, setProductPageItem] = useState<Product | null>(null);

  const handleNavigate = useCallback((newPage: string) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleProductSelect = useCallback((productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setProductPageItem(product);
      setPage('product');
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  const handleQuickView = useCallback((product: Product) => {
    setQuickViewProduct(product);
  }, []);

  // When navigating to shop from a product page, clear the product item
  useEffect(() => {
    if (page !== 'product') setProductPageItem(null);
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} onQuickView={handleQuickView} />;
      case 'shop':
        return <ShopPage onQuickView={handleQuickView} onNavigate={handleNavigate} />;
      case 'product':
        return productPageItem ? (
          <ProductPage
            product={productPageItem}
            onNavigate={handleNavigate}
            onQuickView={(p) => {
              setProductPageItem(p);
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
          />
        ) : (
          <ShopPage onQuickView={handleQuickView} onNavigate={handleNavigate} />
        );
      case 'collections':
        return <CollectionsPage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage />;
      case 'craftsmanship':
        return <CraftsmanshipPage />;
      case 'journal':
        return <JournalPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage />;
      case 'checkout':
        return <CheckoutPage onNavigate={handleNavigate} />;
      case 'account':
        return <AccountPage onNavigate={handleNavigate} onQuickView={handleQuickView} />;
      default:
        return <HomePage onNavigate={handleNavigate} onQuickView={handleQuickView} />;
    }
  };

  return (
    <div className="min-h-screen bg-chocolate-950">
      <Navbar onNavigate={handleNavigate} currentPage={page} />
      {renderPage()}
      <Footer onNavigate={handleNavigate} />
      <CartDrawer onNavigate={handleNavigate} onCheckout={() => handleNavigate('checkout')} />
      <SearchOverlay onNavigate={handleNavigate} onProductSelect={handleProductSelect} />
      <QuickViewModal product={selectedProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
