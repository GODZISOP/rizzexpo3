import { useState } from 'react';
import { CartDrawer, type CartItem } from './components/CartDrawer';
import { ContactSection } from './components/ContactSection';
import { HeroSection } from './components/HeroSection';
import { ProductShowcase, type AddToCartPayload } from './components/ProductShowcase';
import { Footer, ReviewsAndFaq } from './components/ReviewsAndFaq';
import { SystemDeepDive } from './components/SystemDeepDive';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

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
      />

      <main>
        <SystemDeepDive />
        <ProductShowcase
          searchQuery={searchQuery}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onClearSearch={() => setSearchQuery('')}
        />
        <ReviewsAndFaq />
        <ContactSection />
      </main>

      <Footer />

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
