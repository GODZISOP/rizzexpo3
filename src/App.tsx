import { useEffect, useState } from 'react';
import { AdminPanel, useActiveSiteConfig } from './admin';
import { BrandStorySections } from './components/BrandStorySections';
import { CartDrawer, type CartItem } from './components/CartDrawer';
import { ContactSection } from './components/ContactSection';
import { HeroSection } from './components/HeroSection';
import { ProductShowcase, type AddToCartPayload } from './components/ProductShowcase';
import { Footer, ReviewsAndFaq } from './components/ReviewsAndFaq';
import { SystemDeepDive } from './components/SystemDeepDive';

function isAdminHostname() {
  if (typeof window === 'undefined') return false;
  const host = window.location.hostname.toLowerCase();
  return (
    host.startsWith('admin.') ||
    host.includes('-admin.') ||
    host.includes('admin-') ||
    import.meta.env.VITE_ADMIN_ONLY === 'true'
  );
}

function checkIsAdminRoute() {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  const cleanPath = window.location.pathname.replace(/\/+$/, '').toLowerCase();
  const cleanHash = window.location.hash.toLowerCase();
  if (
    cleanPath.endsWith('/admin') ||
    cleanHash.startsWith('#admin') ||
    cleanHash.startsWith('#/admin') ||
    params.has('admin')
  ) {
    return true;
  }
  if (isAdminHostname() && !params.has('preview')) {
    return true;
  }
  return false;
}

export default function App() {
  const { config: siteConfig, refresh: refreshActiveSite } = useActiveSiteConfig();
  const [isAdminMode, setIsAdminMode] = useState(checkIsAdminRoute);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const onRouteChange = () => setIsAdminMode(checkIsAdminRoute());
    window.addEventListener('hashchange', onRouteChange);
    window.addEventListener('popstate', onRouteChange);
    return () => {
      window.removeEventListener('hashchange', onRouteChange);
      window.removeEventListener('popstate', onRouteChange);
    };
  }, []);

  useEffect(() => {
    if (isAdminMode) {
      document.title = 'Control Panel | Multi-Website Admin';
      return;
    }
    if (siteConfig.companyName) {
      document.title = `${siteConfig.companyName} — ${siteConfig.tagline || 'Pet Care System'}`;
    }
  }, [siteConfig, isAdminMode]);

  const exitAdmin = (targetSlug: string | null = null) => {
    const params = new URLSearchParams();
    if (targetSlug) params.set('site', targetSlug);
    if (isAdminHostname()) params.set('preview', '1');
    const qs = params.toString();
    const nextUrl = qs ? `/?${qs}` : '/';
    window.history.pushState({}, '', nextUrl);
    setIsAdminMode(false);
    refreshActiveSite();
    window.scrollTo({ top: 0 });
  };

  if (isAdminMode) {
    return <AdminPanel onExitAdmin={exitAdmin} />;
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (payload: AddToCartPayload) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.variantId === payload.variantId);
      if (existing) {
        return prev.map((i) =>
          i.variantId === payload.variantId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...payload, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const handleUpdateQty = (variantId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((i) => (i.variantId === variantId ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const handleRemove = (variantId: string) => {
    setCartItems((prev) => prev.filter((i) => i.variantId !== variantId));
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  return (
    <div className="min-h-screen bg-[#FBF7EE] text-[#1B1712]">
      <HeroSection
        cartCount={cartCount}
        wishlistCount={wishlistIds.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCart={() => setCartOpen(true)}
        siteConfig={siteConfig}
      />

      <main>
        <BrandStorySections onAddToCart={handleAddToCart} />
        <SystemDeepDive />
        <ProductShowcase
          searchQuery={searchQuery}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onClearSearch={() => setSearchQuery('')}
        />
        <ReviewsAndFaq />
        <ContactSection siteConfig={siteConfig} />
      </main>

      <Footer siteConfig={siteConfig} />

      <CartDrawer
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemove}
        onClearCart={() => setCartItems([])}
      />
    </div>
  );
}
