import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Leaf,
  MousePointerClick,
  PawPrint,
  Play,
  Recycle,
  ShieldCheck,
  Sparkles,
  Star,
  VolumeX,
  Zap,
} from 'lucide-react';
import type { AddToCartPayload } from './ProductShowcase';
import { BUNDLE_PRODUCT } from '../data/products';

interface BrandStorySectionsProps {
  onAddToCart: (item: AddToCartPayload) => void;
}

const LEFT_RADIAL_FEATURES = [
  {
    title: 'Electrostatic Fur Grip',
    desc: 'Micro-bristles generate natural static charge as you roll, lifting embedded dog & cat undercoat without sticky tape.',
    icon: Zap,
  },
  {
    title: 'One-Click Chamber Catch',
    desc: 'Press the thumb button on the RIZZEXPO handle to pop open the chamber and dump collected hair cleanly into the bin.',
    icon: MousePointerClick,
  },
  {
    title: 'Whisper-Silent Glide',
    desc: 'Zero motor noise keeps skittish cats and puppies relaxed while you refresh sofas, rugs, coats, and bedding.',
    icon: VolumeX,
  },
];

const RIGHT_RADIAL_FEATURES = [
  {
    title: '100% Leak-Proof Weld',
    desc: 'Reinforced double-sealed bottom seams prevent rips and leaks across all 270 bags — even for large breeds.',
    icon: ShieldCheck,
  },
  {
    title: 'Recycled Cores & Carton',
    desc: 'Every inner roll core across all 18 green rolls plus the outer RIZZEXPO box uses recycled materials.',
    icon: Recycle,
  },
  {
    title: 'Clip-On Olive Dispenser',
    desc: 'Lightweight matte olive capsule hooks securely onto any standard, rope, or retractable leash for effortless pulls.',
    icon: Leaf,
  },
];

const WHY_CHOOSE_STEPS = [
  {
    num: '01',
    indent: false,
    title: 'Zero Sticky Tape Refills or Batteries',
    detail: 'One RIZZEXPO electrostatic roller replaces 50+ disposable paper lint rolls every single year.',
  },
  {
    num: '02',
    indent: true,
    title: '270 Extra-Thick Bags + Leash Dispenser',
    detail: '18 smooth-tear green rolls packed with a matching olive carabiner capsule for 3 months of clean walks.',
  },
  {
    num: '03',
    indent: true,
    title: 'Safe Across 4 Everyday Home Surfaces',
    detail: 'Engineered for sofas, carpets, wool coats, and crisp white bedding without pulling threads or leaving glue.',
  },
  {
    num: '04',
    indent: false,
    title: '24-Hour Dispatch & 30-Day Guarantee',
    detail: 'Fast tracked shipping from our warehouse backed by a 30-day spotless home replacement promise.',
  },
];

export function BrandStorySections({ onAddToCart }: BrandStorySectionsProps) {
  const handleQuickAddBags = () => {
    onAddToCart({
      id: 'rizzexpo-waste-bags',
      variantId: 'bags-18',
      name: 'Eco-Strong Waste Bags',
      variantLabel: '18 Rolls (270 Bags)',
      price: 16.99,
      image: '/images/poop-bags.jpg',
    });
  };

  const handleQuickAddDuo = () => {
    onAddToCart({
      id: BUNDLE_PRODUCT.id,
      variantId: BUNDLE_PRODUCT.variantId,
      name: BUNDLE_PRODUCT.name,
      variantLabel: '18 Rolls + Dispenser + Hair Remover',
      price: BUNDLE_PRODUCT.price,
      image: BUNDLE_PRODUCT.image,
    });
  };

  return (
    <div className="bg-[#FBF8F1]">
      {/* =====================================================================
          SECTION A: "Everything Your Pets & Home Love" Trio Mascot + 3-Block Ledge
         ===================================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF5E6] to-[#F3EDE0] pt-16 sm:pt-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Top Row: Floating Mini Product Left | Giant Display Title | Floating Action Card Right */}
          <div className="relative grid items-start gap-8 lg:grid-cols-[210px_1fr_210px]">
            {/* Left Floating Product Callout (Ref: Cozy Cat House $49.99) */}
            <div className="mx-auto flex max-w-[210px] flex-col items-center text-center lg:mx-0 lg:pt-2">
              <div className="relative rounded-3xl bg-white p-4 shadow-[0_16px_38px_rgba(27,23,18,0.08)]">
                <img
                  src="/images/poop-bags-cutout.png"
                  alt="RIZZEXPO 18 Rolls Eco Waste Bags"
                  className="h-28 w-36 object-contain"
                />
                <button
                  type="button"
                  onClick={handleQuickAddBags}
                  aria-label="Quick add RIZZEXPO Waste Bags to cart"
                  className=" -bottom-3 -right-3 absolute flex h-10 w-10 items-center justify-center rounded-full bg-[#24221F] text-[#F5C542] shadow-lg transition hover:scale-105 hover:bg-[#3A3630]"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-4 text-xs font-bold text-[#5C5346]">
                18 Rolls + Olive Dispenser
              </div>
              <div className="mt-0.5 font-display text-2xl font-extrabold text-[#1B1712]">
                $16.99
              </div>
            </div>

            {/* Center Massive Editorial Headline + Rising Biscuit Mascot */}
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#24221F]/8 px-3.5 py-1 text-[11px] font-extrabold tracking-[0.15em] text-[#7B5819] uppercase">
                <Sparkles className="h-3.5 w-3.5 text-[#D69E1F]" />
                RIZZEXPO Pet Care System
              </span>
              <h2 className="mt-3 font-display text-[clamp(2.4rem,5.4vw,4.35rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-[#1B1712]">
                Everything Your
                <br />
                Pets &amp; Home <span className="text-[#B8821D]">Love</span>
              </h2>
            </div>

            {/* Right Floating Lifestyle Action Card (Ref: Watch Product Reviews Card) */}
            <a
              href="#system"
              className="group mx-auto flex max-w-[205px] flex-col items-center rounded-3xl bg-white p-3 text-center shadow-[0_16px_38px_rgba(27,23,18,0.08)] transition hover:-translate-y-1 lg:mx-0 lg:mt-2"
            >
              <div className="relative w-full overflow-hidden rounded-2xl">
                <img
                  src="/images/lifestyle-couch-dark.webp"
                  alt="Golden retriever sleeping on dark couch"
                  className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="-bottom-4 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-[#24221F] text-[#F5C542] shadow-md">
                  <Play className="ml-0.5 h-4 w-4 fill-current" />
                </span>
              </div>
              <div className="mt-5 px-2 pb-1 text-xs font-bold leading-snug text-[#1B1712]">
                See 1-Click Static Fur Removal on 4 Surfaces
              </div>
            </a>
          </div>

          {/* Trio Pets Rising Above the 3-Block Ledge Bar */}
          <div className="relative mt-6 grid items-end gap-4 md:grid-cols-3">
            {/* Left Pet Frame (Outdoor Walk Dog) */}
            <div className="hidden justify-center md:flex">
              <div className="h-44 w-56 overflow-hidden rounded-t-[3rem] border-4 border-white bg-white shadow-md">
                <img
                  src="/images/lifestyle-walk.webp"
                  alt="Happy dog on park walk with leash"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Center Star Mascot: Biscuit Front Cutout Rising Over Center Dark Ledge */}
            <div className="relative z-20 -mb-6 flex justify-center sm:-mb-8">
              <img
                src="/images/biscuit-front.png"
                alt="Biscuit Border Collie mascot"
                className="h-64 w-auto object-contain drop-shadow-[0_20px_30px_rgba(27,23,18,0.22)] sm:h-72"
              />
            </div>

            {/* Right Pet Frame (Cozy Cat on Crisp White Bedding) */}
            <div className="hidden justify-center md:flex">
              <div className="h-44 w-56 overflow-hidden rounded-t-[3rem] border-4 border-white bg-white shadow-md">
                <img
                  src="/images/lifestyle-bedding.webp"
                  alt="Cat sleeping peacefully in clean white bedding"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3-Column Bottom Ledge Bar (Ref: 98K+ | Best Products Explore | 4.6★) */}
        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-[2.25rem] shadow-[0_22px_55px_rgba(27,23,18,0.12)] md:grid-cols-3">
            {/* Left Stat Block */}
            <div className="flex flex-col items-center justify-center bg-[#F4DF9E] px-6 py-9 text-center text-[#1B1712]">
              <div className="flex items-center gap-3">
                <span className="font-display text-4xl font-extrabold tracking-tight">96K+</span>
                <div className="flex -space-x-2">
                  <img
                    src="/images/lifestyle-walk.webp"
                    alt=""
                    className="h-9 w-9 rounded-full border-2 border-[#F4DF9E] object-cover"
                  />
                  <img
                    src="/images/lifestyle-bedding.webp"
                    alt=""
                    className="h-9 w-9 rounded-full border-2 border-[#F4DF9E] object-cover"
                  />
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#F4DF9E] bg-[#24221F] text-xs font-extrabold text-[#F5C542]">
                    +
                  </span>
                </div>
              </div>
              <p className="mt-2.5 max-w-[230px] text-xs font-semibold leading-relaxed text-[#4A3B18]">
                Happy Pet Parents &amp; Spotless Homes Using RIZZEXPO Daily
              </p>
            </div>

            {/* Center Dark Showcase CTA Block */}
            <div className="charcoal-topo-card flex flex-col items-center justify-center px-6 py-10 text-center text-white">
              <div className="font-display text-xl font-extrabold leading-snug">
                Complete Care System
                <br />
                for Dogs &amp; Cats
              </div>
              <a
                href="#products"
                className="mt-5 inline-flex items-center gap-3 rounded-full bg-[#F5C542] py-2.5 pl-6 pr-2.5 text-xs font-extrabold text-[#1B1712] shadow-lg transition hover:bg-[#FFD866]"
              >
                <span>Explore Products</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#1B1712]">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            </div>

            {/* Right Rating Block */}
            <div className="flex flex-col items-center justify-center bg-[#E5F2DF] px-6 py-9 text-center text-[#162912]">
              <div className="flex items-center gap-1.5 font-display text-4xl font-extrabold tracking-tight">
                <span>4.9</span>
                <Star className="h-7 w-7 fill-[#E89B15] text-[#E89B15]" />
              </div>
              <p className="mt-2.5 max-w-[230px] text-xs font-semibold leading-relaxed text-[#2F4F28]">
                Based on 980+ Verified Reviews from Dog &amp; Cat Owners
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION B: 6-Point Radial Engineering Hub Around Central Lifestyle Image
         ===================================================================== */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF4CC] px-3.5 py-1 text-[11px] font-extrabold tracking-[0.14em] text-[#8A6112] uppercase">
              <PawPrint className="h-3.5 w-3.5" />
              Engineered Around Real Pet Life
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.03em] text-[#1B1712] sm:text-5xl">
              Six smart details behind every walk &amp; cuddle.
            </h2>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_340px_1fr]">
            {/* Left 3 Feature Callouts (Right-aligned on desktop like Reference 2 top) */}
            <div className="space-y-9">
              {LEFT_RADIAL_FEATURES.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className={`flex items-start gap-4 lg:flex-row-reverse lg:text-right ${
                      idx === 1 ? 'lg:pr-5' : ''
                    }`}
                  >
                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
                      <span className="absolute inset-0 rounded-full bg-[#F5C542] shadow-[0_8px_20px_rgba(245,197,66,0.38)]" />
                      <Icon className="relative z-10 h-6 w-6 text-[#1B1712]" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-extrabold text-[#1B1712]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-[#5C5346] sm:text-sm">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Center Lifestyle Portrait Pillar + Dual Product Mini Badges */}
            <div className="relative mx-auto w-full max-w-[330px]">
              <div className="absolute -inset-3 rounded-[3rem] bg-gradient-to-b from-[#F5C542]/35 via-[#63BE46]/20 to-transparent blur-xl" />
              <div className="relative overflow-hidden rounded-[2.75rem] border-4 border-[#FAF5E6] bg-[#24221F] shadow-2xl">
                <img
                  src="/images/lifestyle-clothing.webp"
                  alt="Pet parent hugging fluffy dog in clean knit sweater"
                  className="aspect-[3/4] w-full object-cover"
                />
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-2xl bg-[#1B1712]/90 px-4 py-3 text-white backdrop-blur-md">
                  <div>
                    <div className="text-[10px] font-extrabold tracking-widest text-[#F5C542] uppercase">
                      Fur-Free Sweaters &amp; Walks
                    </div>
                    <div className="font-display text-xs font-bold">
                      RIZZEXPO Dual Pet Care System
                    </div>
                  </div>
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#63BE46]" />
                </div>
              </div>
            </div>

            {/* Right 3 Feature Callouts */}
            <div className="space-y-9">
              {RIGHT_RADIAL_FEATURES.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className={`flex items-start gap-4 ${idx === 1 ? 'lg:pl-5' : ''}`}
                  >
                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
                      <span className="absolute inset-0 rounded-full bg-[#F5C542] shadow-[0_8px_20px_rgba(245,197,66,0.38)]" />
                      <Icon className="relative z-10 h-6 w-6 text-[#1B1712]" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-extrabold text-[#1B1712]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-[#5C5346] sm:text-sm">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION C: Organic Blob Mascot + Staggered 01–04 "Why Choose RIZZEXPO"
                     + Bottom "Ready to Transform" CTA Banner (Ref 2 Bottom!)
         ===================================================================== */}
      <section className="relative overflow-hidden bg-[#FAF7EF] py-20 sm:py-24">
        {/* Subtle Decorative Watermark Paw Print on Right */}
        <PawPrint
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 top-16 h-72 w-72 rotate-[-18deg] text-[#1B1712]/[0.03]"
        />

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
            {/* Left: Organic Blob Backdrop + Mascot & Floating Real Product Pill */}
            <div className="relative mx-auto flex w-full max-w-md items-center justify-center">
              {/* Asymmetric Organic Dark Forest/Charcoal Blob SVG (matching Ref 2!) */}
              <svg
                viewBox="0 0 460 440"
                className="w-full max-w-[410px]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M214 34C296 26 392 98 418 186C444 274 398 378 308 406C218 434 94 398 52 314C10 230 58 112 134 62C160 45 186 37 214 34Z"
                  fill="#1E3F35"
                />
                <circle cx="366" cy="96" r="34" fill="#F5C542" fillOpacity="0.9" />
              </svg>

              {/* Mascot Sitting Proudly Over Organic Blob */}
              <img
                src="/images/biscuit-front.png"
                alt="RIZZEXPO Border Collie"
                className="absolute bottom-2 h-[88%] w-auto object-contain drop-shadow-[0_22px_32px_rgba(0,0,0,0.28)]"
              />

              {/* Floating Verified Product Tag */}
              <div className="absolute -bottom-3 left-4 flex items-center gap-3 rounded-2xl border border-[#E7DEC9] bg-white px-4 py-2.5 shadow-lg sm:left-8">
                <img
                  src="/images/poop-bags-cutout.png"
                  alt=""
                  className="h-10 w-12 object-contain"
                />
                <div>
                  <div className="font-display text-xs font-extrabold text-[#1B1712]">
                    Eco-Strong + Static Duo
                  </div>
                  <div className="text-[11px] font-semibold text-[#3E8227]">
                    ● Tested for Dogs &amp; Cats
                  </div>
                </div>
              </div>
            </div>

            {/* Right: "Why Choose RIZZEXPO" + Staggered 01 / 02 / 03 / 04 List */}
            <div>
              <div className="relative inline-block">
                <span
                  aria-hidden="true"
                  className="absolute -left-3 -top-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#F5C542]/45"
                >
                  <PawPrint className="h-4 w-4 -rotate-12 text-[#8F6512]" />
                </span>
                <h2 className="relative font-display text-3xl font-extrabold tracking-[-0.03em] text-[#1B1712] sm:text-4xl">
                  Why Choose RIZZEXPO
                </h2>
              </div>

              <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#5C5346] sm:text-base">
                We replaced flimsy supermarket waste bags and wasteful sticky lint tape with two
                durable, thoughtfully engineered tools built for real shedding and daily walks.
              </p>

              {/* Staggered Numbered Steps (02 & 03 indented right just like Ref 2!) */}
              <div className="mt-8 space-y-5">
                {WHY_CHOOSE_STEPS.map((step) => (
                  <div
                    key={step.num}
                    className={`flex items-start gap-4 ${step.indent ? 'sm:pl-8' : ''}`}
                  >
                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
                      <span className="absolute inset-0 rounded-[1.1rem] rotate-6 bg-[#F5C542] shadow-sm" />
                      <span className="relative z-10 font-display text-lg font-extrabold text-[#1B1712]">
                        {step.num}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display text-base font-extrabold text-[#1B1712]">
                        {step.title}
                      </h3>
                      <p className="mt-0.5 text-xs leading-relaxed text-[#5C5346] sm:text-sm">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <a
                  href="#products"
                  className="inline-flex items-center gap-2 rounded-full bg-[#F5C542] px-7 py-3.5 text-sm font-extrabold text-[#1B1712] shadow-md transition hover:bg-[#FFD866]"
                >
                  <span>Shop RIZZEXPO</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={handleQuickAddDuo}
                  className="inline-flex items-center gap-2 rounded-full border border-[#D8CEB8] bg-white px-6 py-3.5 text-xs font-extrabold text-[#1B1712] transition hover:border-[#1B1712]"
                >
                  <span>Quick-Add Complete Duo · ${BUNDLE_PRODUCT.price.toFixed(2)}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Full-Width Transform Banner with Large Golden Circle Accent (Ref 2 bottom!) */}
          <div className="relative mt-20 overflow-hidden rounded-[2.25rem] bg-[#1E3F35] px-7 py-10 text-white shadow-[0_24px_60px_rgba(22,45,38,0.22)] sm:px-12 sm:py-12">
            {/* Signature bold golden sun circle overlapping bottom-right */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 -right-12 h-64 w-64 rounded-full bg-[#F5C542]"
            />
            <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-xl">
                <span className="text-xs font-extrabold tracking-[0.15em] text-[#F5C542] uppercase">
                  30-Day Spotless Home &amp; Walk Promise
                </span>
                <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight sm:text-4xl">
                  Ready to Transform Your Couch &amp; Daily Dog Walks?
                </h3>
              </div>

              <button
                type="button"
                onClick={handleQuickAddDuo}
                className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-[#24221F] px-7 py-4 text-sm font-extrabold text-[#F5C542] shadow-xl transition hover:bg-[#141311] active:scale-95"
              >
                <span>Get the Complete Duo · ${BUNDLE_PRODUCT.price.toFixed(2)}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
