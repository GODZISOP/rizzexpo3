import { useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, Mail, PawPrint, Star } from 'lucide-react';
import type { SiteConfig } from '../admin';
import { FAQS, REVIEWS, type FaqCategory } from '../data/products';

const FAQ_TABS: Array<'All' | FaqCategory> = [
  'All',
  'Waste Bags',
  'Hair Remover',
  'Shipping & Orders',
];

export function ReviewsAndFaq() {
  const [activeCategory, setActiveCategory] = useState<'All' | FaqCategory>('All');
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS[0].id);

  const visibleFaqs =
    activeCategory === 'All'
      ? FAQS
      : FAQS.filter((item) => item.category === activeCategory);

  return (
    <>
      {/* Verified Pet-Parent Reviews */}
      <section id="reviews" className="bg-[#F2EFE7] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="charcoal-topo-card rounded-[2.5rem] px-6 py-10 text-white shadow-[0_24px_60px_rgba(27,23,18,0.16)] sm:px-11 sm:py-12">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold tracking-[0.16em] text-[#F5C542] uppercase">
                  Verified Pet Parents
                </p>
                <h2 className="mt-2 font-display text-3xl font-extrabold tracking-[-0.03em] uppercase sm:text-4xl">
                  LOVED BY <span className="text-[#F5C542]">96,000+</span> HAPPY TAILS
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-md">
                <div className="flex items-center gap-0.5 text-[#F5C542]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span>4.9 / 5 average</span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {REVIEWS.map((review) => (
                <article
                  key={review.id}
                  className="flex flex-col justify-between rounded-[1.8rem] bg-white p-6 text-[#1B1712] shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-0.5 text-[#F5C542]">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="rounded-full bg-[#F2EFE7] px-2.5 py-1 text-[10px] font-extrabold text-[#5C5346] uppercase">
                        {review.productTag}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-base font-extrabold leading-snug text-[#1B1712]">
                      “{review.title}”
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#5C5346] sm:text-sm">
                      {review.body}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-[#EFECE4] pt-4">
                    <div>
                      <div className="text-xs font-extrabold text-[#1B1712]">{review.author}</div>
                      <div className="text-[11px] font-medium text-[#7A7060]">{review.petBadge}</div>
                    </div>
                    {review.verified && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#E9F5E5] px-2.5 py-0.5 text-[10px] font-bold text-[#2F6A1E]">
                        <CheckCircle2 className="h-3 w-3" />
                        Verified
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categorized FAQ Center */}
      <section id="faq" className="bg-[#F2EFE7] pb-14 pt-4 sm:pb-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <div className="flex flex-col justify-between rounded-[2.25rem] bg-white p-7 shadow-sm sm:p-9">
            <div>
              <span className="inline-block rounded-full bg-[#24221F] px-3.5 py-1 text-[11px] font-bold tracking-[0.14em] text-[#F5C542] uppercase">
                RIZZEXPO FAQs
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-[-0.03em] text-[#1B1712]">
                Got questions? We have clear answers.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#5C5346]">
                Filter by product or shipping to see exact details about our leak-proof bags,
                reusable electrostatic roller, and 30-day guarantee.
              </p>

              {/* Category Filter Pills */}
              <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="FAQ categories">
                {FAQ_TABS.map((tab) => {
                  const active = activeCategory === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => {
                        setActiveCategory(tab);
                        const first =
                          tab === 'All' ? FAQS[0] : FAQS.find((f) => f.category === tab);
                        setOpenFaqId(first?.id ?? null);
                      }}
                      className={`rounded-full px-4 py-2 text-xs font-extrabold transition ${
                        active
                          ? 'bg-[#24221F] text-[#F5C542] shadow-sm'
                          : 'bg-[#F2EFE7] text-[#3A352E] hover:bg-[#E7E1D2]'
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 border-t border-[#EFECE4] pt-6">
              <p className="text-xs font-semibold text-[#5C5346]">
                Still need help with your order or breed?
              </p>
              <a
                href="#contact"
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#F5C542] px-5 py-3 text-xs font-extrabold text-[#1B1712] transition hover:bg-[#FFD866]"
              >
                <span>Message our team</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            {visibleFaqs.map((item) => {
              const isOpen = openFaqId === item.id;
              return (
                <div
                  key={item.id}
                  className={`overflow-hidden rounded-[1.6rem] transition ${
                    isOpen ? 'bg-[#24221F] text-white shadow-lg' : 'bg-white text-[#1B1712] shadow-sm'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display text-sm font-extrabold sm:text-base"
                  >
                    <div>
                      <span
                        className={`mb-1 block text-[10px] font-extrabold tracking-widest uppercase ${
                          isOpen ? 'text-[#F5C542]' : 'text-[#8A7F6E]'
                        }`}
                      >
                        {item.category}
                      </span>
                      <span>{item.q}</span>
                    </div>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition ${
                        isOpen ? 'bg-[#F5C542] text-[#1B1712]' : 'bg-[#F2EFE7] text-[#1B1712]'
                      }`}
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="border-t border-white/10 px-6 pb-5 pt-3.5 text-sm leading-relaxed text-white/80">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export function Footer({ siteConfig }: { siteConfig?: SiteConfig }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const brandName = siteConfig?.shortName || siteConfig?.companyName || 'RIZZEXPO';
  const contactEmail = siteConfig?.email || 'info@rizzexpo.com';
  const secondaryEmail = siteConfig?.emailSecondary || '';
  const phoneDisplay = siteConfig?.phonePrimary || '';
  const phoneTel = siteConfig?.phonePrimaryTel || phoneDisplay.replace(/\D/g, '');
  const whatsappDisplay = siteConfig?.whatsappDisplay || '';
  const whatsappDigits = siteConfig?.whatsappNumber || whatsappDisplay.replace(/\D/g, '');
  const addressFull =
    siteConfig?.address?.full ||
    [siteConfig?.address?.line1, siteConfig?.address?.line2].filter(Boolean).join(', ');
  const ownerName = siteConfig?.ownerFullName || siteConfig?.ownerName || '';
  const socials = siteConfig?.footer?.socials || [];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="charcoal-topo-card text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <a href="#" className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5C542] text-[#1B1712]">
                <PawPrint className="h-5 w-5 fill-current" />
              </span>
              <span className="font-display text-xl font-extrabold tracking-tight">{brandName}</span>
            </a>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
              {siteConfig?.footer?.description ||
                'Smart, reusable, eco-conscious pet care essentials engineered for spotless homes and stress-free walks.'}
            </p>

            <div className="mt-7 flex flex-wrap gap-5 text-sm font-medium text-white/75">
              <a href="#system" className="hover:text-[#F5C542]">
                How It Works
              </a>
              <a href="#products" className="hover:text-[#F5C542]">
                Products
              </a>
              <a href="#bundle" className="hover:text-[#F5C542]">
                Complete Duo
              </a>
              <a href="#faq" className="hover:text-[#F5C542]">
                FAQs
              </a>
              <a href="#contact" className="hover:text-[#F5C542]">
                Contact
              </a>
            </div>

            {(phoneDisplay || whatsappDisplay || addressFull || ownerName || socials.length > 0) && (
              <div className="mt-6 space-y-1.5 text-xs text-white/65">
                {ownerName && (
                  <p>
                    <span className="font-semibold text-white/85">Contact Person:</span> {ownerName}
                  </p>
                )}
                {phoneDisplay && (
                  <p>
                    <span className="font-semibold text-white/85">Phone:</span>{' '}
                    <a href={`tel:${phoneTel}`} className="hover:text-[#F5C542]">
                      {phoneDisplay}
                    </a>
                  </p>
                )}
                {(whatsappDisplay || whatsappDigits) && (
                  <p>
                    <span className="font-semibold text-white/85">WhatsApp:</span>{' '}
                    <a
                      href={`https://wa.me/${whatsappDigits}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#F5C542]"
                    >
                      {whatsappDisplay || `+${whatsappDigits}`}
                    </a>
                  </p>
                )}
                {secondaryEmail && (
                  <p>
                    <span className="font-semibold text-white/85">Alt Email:</span>{' '}
                    <a href={`mailto:${secondaryEmail}`} className="hover:text-[#F5C542]">
                      {secondaryEmail}
                    </a>
                  </p>
                )}
                {addressFull && (
                  <p>
                    <span className="font-semibold text-white/85">Address:</span> {addressFull}
                  </p>
                )}
                {socials.length > 0 && (
                  <div className="flex flex-wrap gap-3 pt-2">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-semibold text-white/80 transition hover:border-[#F5C542] hover:text-[#F5C542]"
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="rounded-[1.8rem] border border-white/12 bg-white/6 p-6 backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs font-extrabold tracking-wider text-[#F5C542] uppercase">
              <Mail className="h-4 w-4" />
              Get 15% off your first RIZZEXPO pack
            </div>
            <p className="mt-2 text-xs leading-relaxed text-white/75 sm:text-sm">
              {siteConfig?.footer?.newsletterTagline ||
                'Join our pack for new pet care drops and clean-home tips. Zero spam.'}
            </p>
            {subscribed ? (
              <div className="mt-4 flex items-center gap-2 rounded-2xl bg-[#63BE46]/25 px-4 py-3 text-xs font-bold text-[#C7F5B6] sm:text-sm">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>
                  {siteConfig?.footer?.newsletterSuccess ||
                    'Welcome! Use code PAWS15 at checkout for 15% off.'}
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 rounded-full border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-[#F5C542] focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#F5C542] px-6 py-3 text-sm font-extrabold text-[#1B1712] transition hover:bg-[#FFD866]"
                >
                  <span>Join</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-white/50 sm:flex-row">
            <p>
              © {new Date().getFullYear()} {siteConfig?.legalName || 'RIZZEXPO Pet Care System'}.{' '}
              {siteConfig?.footer?.copyrightSuffix || 'All rights reserved.'}
            </p>
            <p>
              <a href={`mailto:${contactEmail}`} className="text-white/75 hover:text-[#F5C542]">
                {contactEmail}
              </a>{' '}
              · Ships within 24 hours · 30-day spotless home guarantee
            </p>
          </div>
      </div>
    </footer>
  );
}
