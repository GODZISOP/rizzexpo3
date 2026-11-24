import { useState } from 'react';
import { Heart, Menu, PawPrint, Search, ShoppingBag, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onOpenCart: () => void;
}

export function Navbar({
  cartCount,
  wishlistCount,
  searchQuery,
  onSearchChange,
  onOpenCart,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Products', href: '#products' },
    { label: 'How It Works', href: '#system' },
    { label: 'Bundle', href: '#bundle' },
    { label: 'FAQs', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="relative z-30 w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        {/* Brandmark */}
        <a
          href="#"
          className="group inline-flex items-center gap-2.5 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD866] rounded-full"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5C542] text-[#1B1712] shadow-md transition-transform duration-200 group-hover:scale-105">
            <PawPrint className="h-5 w-5 fill-current" />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight text-white">
            RIZZEXPO
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/85 transition-colors hover:text-[#FFD866]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Search + Right Controls */}
        <div className="flex items-center gap-2.5">
          {/* Pill Search */}
          <label className="relative hidden md:block">
            <span className="sr-only">Search RIZZEXPO products</span>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (e.target.value.trim()) {
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              placeholder="Search products..."
              className="w-48 rounded-full border border-white/20 bg-white/12 py-2 pl-9 pr-4 text-sm text-white placeholder:text-white/60 backdrop-blur-md transition-all focus:w-56 focus:border-[#FFD866] focus:bg-white/20 focus:outline-none"
            />
          </label>

          {/* Wishlist indicator */}
          <a
            href="#products"
            aria-label={`Saved items: ${wishlistCount}`}
            className="relative hidden h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/12 text-white backdrop-blur-md transition hover:bg-white/20 sm:inline-flex"
          >
            <Heart className={`h-4 w-4 ${wishlistCount > 0 ? 'fill-[#FFD866] text-[#FFD866]' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FFD866] px-1 text-[10px] font-bold text-[#1B1712]">
                {wishlistCount}
              </span>
            )}
          </a>

          {/* Golden Cart Button (PAWZO signature) */}
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-2 rounded-full bg-[#F5C542] px-4 py-2.5 text-sm font-bold text-[#1B1712] shadow-[0_8px_20px_rgba(61,40,8,0.28)] transition hover:bg-[#FFD561] active:scale-95"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#1B1712] px-1.5 text-xs font-bold text-[#F5C542]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/12 text-white backdrop-blur-md lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="mx-5 rounded-2xl border border-white/20 bg-[#2C1F0A]/95 p-5 text-white shadow-2xl backdrop-blur-xl lg:hidden">
          <div className="mb-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search RIZZEXPO..."
                className="w-full rounded-full border border-white/20 bg-white/10 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/60 focus:border-[#FFD866] focus:outline-none"
              />
            </div>
          </div>
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2 text-base font-semibold text-white/90 hover:bg-white/10 hover:text-[#FFD866]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
