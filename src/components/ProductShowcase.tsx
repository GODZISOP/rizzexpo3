import { useState } from 'react';
import { Check, Heart, Leaf, ShieldCheck, ShoppingBag, Sparkles, Star, Truck } from 'lucide-react';
import { BUNDLE_PRODUCT, PRODUCTS, type Product, type ProductVariant } from '../data/products';

export interface AddToCartPayload {
  id: string;
  variantId: string;
  name: string;
  variantLabel: string;
  price: number;
  image: string;
}

interface ProductShowcaseProps {
  searchQuery: string;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (item: AddToCartPayload) => void;
  onClearSearch: () => void;
}

export function ProductShowcase({
  searchQuery,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onClearSearch,
}: ProductShowcaseProps) {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({
    'rizzexpo-waste-bags': 'bags-18',
    'rizzexpo-hair-remover': 'roller-single',
  });
  const [justAddedKey, setJustAddedKey] = useState<string | null>(null);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const visibleProducts = normalizedQuery
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(normalizedQuery) ||
          p.tagline.toLowerCase().includes(normalizedQuery) ||
          p.category.toLowerCase().includes(normalizedQuery) ||
          p.highlights.some((h) => h.toLowerCase().includes(normalizedQuery))
      )
    : PRODUCTS;

  const triggerAddedFeedback = (key: string) => {
    setJustAddedKey(key);
    window.setTimeout(() => {
      setJustAddedKey((curr) => (curr === key ? null : curr));
    }, 1500);
  };

  const handleAddProduct = (product: Product, variant: ProductVariant) => {
    onAddToCart({
      id: product.id,
      variantId: variant.id,
      name: product.shortName,
      variantLabel: variant.label,
      price: variant.price,
      image: product.image,
    });
    triggerAddedFeedback(variant.id);
  };

  const handleAddBundle = () => {
    onAddToCart({
      id: BUNDLE_PRODUCT.id,
      variantId: BUNDLE_PRODUCT.variantId,
      name: BUNDLE_PRODUCT.name,
      variantLabel: '18 Rolls + Dispenser + Hair Remover',
      price: BUNDLE_PRODUCT.price,
      image: BUNDLE_PRODUCT.image,
    });
    triggerAddedFeedback(BUNDLE_PRODUCT.variantId);
  };

  return (
    <section id="products" className="relative bg-[#F2EFE7] pb-16 pt-20 sm:pb-20 sm:pt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Bold Editorial Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#24221F] px-3.5 py-1.5 text-[11px] font-bold tracking-[0.14em] text-[#F5C542] uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              Shop RIZZEXPO
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-[-0.03em] text-[#1B1712] sm:text-5xl">
              Pick your pack.
              <br />
              Ready in 24 hours.
            </h2>
          </div>

          <div className="flex flex-wrap gap-2.5 text-xs font-bold text-[#1D1811]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 shadow-sm">
              <Truck className="h-3.5 w-3.5 text-[#D69E1F]" />
              Free shipping $30+
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-[#63BE46]" />
              30-day guarantee
            </span>
          </div>
        </div>

        {/* Empty Search State */}
        {visibleProducts.length === 0 ? (
          <div className="rounded-[2.25rem] bg-white p-12 text-center shadow-sm">
            <p className="font-display text-xl font-bold text-[#1B1712]">
              No products matched “{searchQuery}”
            </p>
            <p className="mt-2 text-sm text-[#5C5346]">
              Try searching for waste bags, dispenser, hair remover, or electrostatic roller.
            </p>
            <button
              type="button"
              onClick={onClearSearch}
              className="mt-5 rounded-full bg-[#24221F] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#383530]"
            >
              Show all RIZZEXPO products
            </button>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {visibleProducts.map((product) => {
              const activeVariant =
                product.variants.find((v) => v.id === selectedVariants[product.id]) ??
                product.variants[0];
              const isWishlisted = wishlistIds.includes(product.id);
              const isJustAdded = justAddedKey === activeVariant.id;
              const isLeaf = product.accentColor === 'leaf';

              return (
                <article
                  key={product.id}
                  className="group flex flex-col overflow-hidden rounded-[2.25rem] bg-white p-5 shadow-[0_14px_40px_rgba(27,23,18,0.06)] transition-shadow duration-300 hover:shadow-[0_22px_55px_rgba(27,23,18,0.11)] sm:p-6"
                >
                  {/* Dark Charcoal Framed Product Stage */}
                  <div
                    className={`relative overflow-hidden rounded-[1.8rem] p-5 ${
                      isLeaf ? 'charcoal-topo-card' : 'charcoal-topo-card-blue'
                    }`}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-extrabold tracking-wide uppercase ${
                          isLeaf
                            ? 'bg-[#63BE46] text-[#11240B]'
                            : 'bg-[#4BA3E3] text-white'
                        }`}
                      >
                        {isLeaf ? (
                          <Leaf className="h-3 w-3" />
                        ) : (
                          <Sparkles className="h-3 w-3" />
                        )}
                        {product.category}
                      </span>

                      <button
                        type="button"
                        onClick={() => onToggleWishlist(product.id)}
                        aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/12 text-white backdrop-blur-md transition hover:scale-105 hover:bg-white/20"
                      >
                        <Heart
                          className={`h-4 w-4 transition ${
                            isWishlisted ? 'fill-[#F5C542] text-[#F5C542]' : 'text-white'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-4 shadow-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="eager"
                      />
                    </div>
                  </div>

                  {/* Product Info + Circular Check Badges */}
                  <div className="flex flex-1 flex-col px-1 pt-6">
                    <div className="flex items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-1 text-xs font-bold text-[#1B1712]">
                        <Star className="h-3.5 w-3.5 fill-[#F5C542] text-[#F5C542]" />
                        <span>{product.rating.toFixed(1)}</span>
                        <span className="font-medium text-[#7A7060]">
                          ({product.reviewCount} reviews)
                        </span>
                      </div>
                      <span className="rounded-full bg-[#E9F5E5] px-2.5 py-0.5 text-[11px] font-bold text-[#2F6A1E]">
                        In stock
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-[#1B1712]">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5C5346]">
                      {product.description}
                    </p>

                    <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                      {product.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-xs font-semibold text-[#2A2621]"
                        >
                          <span
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white ${
                              isLeaf ? 'bg-[#63BE46]' : 'bg-[#4BA3E3]'
                            }`}
                          >
                            <Check className="h-3 w-3 stroke-[3]" />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Pack Selector Pills */}
                    <div className="mt-6 grid grid-cols-2 gap-2.5">
                      {product.variants.map((variant) => {
                        const selected = variant.id === activeVariant.id;
                        return (
                          <button
                            key={variant.id}
                            type="button"
                            onClick={() =>
                              setSelectedVariants((prev) => ({
                                ...prev,
                                [product.id]: variant.id,
                              }))
                            }
                            className={`rounded-2xl border p-3.5 text-left transition ${
                              selected
                                ? 'border-[#24221F] bg-[#24221F] text-white shadow-md'
                                : 'border-[#E6E0D3] bg-[#F7F4ED] text-[#1B1712] hover:border-[#C7BEA8]'
                            }`}
                          >
                            {variant.badge && (
                              <span
                                className={`mb-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase ${
                                  selected
                                    ? 'bg-[#F5C542] text-[#1B1712]'
                                    : 'bg-white text-[#5C5346]'
                                }`}
                              >
                                {variant.badge}
                              </span>
                            )}
                            <div className="font-display text-sm font-extrabold">
                              {variant.label}
                            </div>
                            <div
                              className={`mt-0.5 text-[11px] ${
                                selected ? 'text-white/70' : 'text-[#6B6152]'
                              }`}
                            >
                              {variant.subtitle}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Price + Buy CTA */}
                    <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#EFECE4] pt-5">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-display text-3xl font-extrabold tracking-tight text-[#1B1712]">
                            ${activeVariant.price.toFixed(2)}
                          </span>
                          {activeVariant.compareAtPrice && (
                            <span className="text-sm font-medium text-[#9A8F7D] line-through">
                              ${activeVariant.compareAtPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] font-semibold text-[#6B6152]">
                          Ships within 24 hours
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddProduct(product, activeVariant)}
                        className={`inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-extrabold transition active:scale-95 ${
                          isJustAdded
                            ? 'bg-[#63BE46] text-white'
                            : 'bg-[#F5C542] text-[#1B1712] shadow-md hover:bg-[#FFD866]'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="h-4 w-4 stroke-[3]" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="h-4 w-4" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Complete RIZZEXPO Duo Dark Charcoal Slab + 3 Bridging Pills */}
        <div id="bundle" className="mt-12">
          <div className="charcoal-topo-card overflow-hidden rounded-[2.5rem] p-7 text-white shadow-[0_28px_70px_rgba(27,23,18,0.2)] sm:p-11">
            <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#F5C542] px-3.5 py-1 text-[11px] font-extrabold tracking-wider text-[#1B1712] uppercase">
                  Best Value · Save ${BUNDLE_PRODUCT.savings.toFixed(2)} + Free Shipping
                </span>
                <h3 className="mt-4 font-display text-3xl font-extrabold tracking-tight uppercase sm:text-4xl">
                  THE COMPLETE <span className="text-[#F5C542]">RIZZEXPO</span> DUO
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
                  Everything for spotless sofas and leak-proof daily walks in one box: 18 green
                  eco-strong waste bag rolls + olive clip-on dispenser + our reusable electrostatic
                  pet hair remover.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-5">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-display text-4xl font-extrabold text-[#F5C542]">
                      ${BUNDLE_PRODUCT.price.toFixed(2)}
                    </span>
                    <span className="text-base text-white/45 line-through">
                      ${BUNDLE_PRODUCT.compareAtPrice.toFixed(2)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddBundle}
                    className={`inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-sm font-extrabold transition active:scale-95 ${
                      justAddedKey === BUNDLE_PRODUCT.variantId
                        ? 'bg-[#63BE46] text-white'
                        : 'bg-[#F5C542] text-[#1B1712] hover:bg-[#FFD866]'
                    }`}
                  >
                    {justAddedKey === BUNDLE_PRODUCT.variantId ? (
                      <>
                        <Check className="h-4 w-4 stroke-[3]" />
                        <span>Complete Duo Added!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-4 w-4" />
                        <span>Add Complete Duo</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="overflow-hidden rounded-[1.5rem] bg-white p-3.5 shadow-xl">
                  <img
                    src="/images/poop-bags-cutout.png"
                    alt="RIZZEXPO Waste Bags and Dispenser"
                    className="aspect-[4/3] w-full object-contain"
                  />
                  <div className="mt-2.5 border-t border-[#EFECE4] pt-2 text-center text-xs font-extrabold text-[#1B1712]">
                    270 Bags + Dispenser
                  </div>
                </div>
                <div className="overflow-hidden rounded-[1.5rem] bg-white p-3.5 shadow-xl">
                  <img
                    src="/images/pet-hair-remover.jpg"
                    alt="RIZZEXPO Electrostatic Pet Hair Remover"
                    className="aspect-[4/3] w-full object-contain"
                  />
                  <div className="mt-2.5 border-t border-[#EFECE4] pt-2 text-center text-xs font-extrabold text-[#1B1712]">
                    Static Hair Remover
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {[
              'Free Express 24h shipping unlocked automatically.',
              'Replaces 50+ disposable sticky lint rolls per year.',
              'Backed by our 30-day spotless home guarantee.',
            ].map((pill) => (
              <div
                key={pill}
                className="flex items-center justify-center rounded-[1.6rem] bg-white px-6 py-4 text-center text-xs font-bold text-[#1D1811] shadow-sm sm:text-sm"
              >
                {pill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
