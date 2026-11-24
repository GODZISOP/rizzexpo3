import { useRef, useState } from 'react';
import { ArrowRight, Mouse, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { BoneCursor } from './BoneCursor';
import { DogFrameStage } from './DogFrameStage';
import { Navbar } from './Navbar';

interface HeroSectionProps {
  cartCount: number;
  wishlistCount: number;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onOpenCart: () => void;
}

export function HeroSection({
  cartCount,
  wishlistCount,
  searchQuery,
  onSearchChange,
  onOpenCart,
}: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [cursorInHero, setCursorInHero] = useState(false);

  return (
    <section
      ref={heroRef}
      onPointerEnter={() => setCursorInHero(true)}
      onPointerLeave={() => setCursorInHero(false)}
      className="bone-cursor-zone hero-golden-backdrop relative flex min-h-[min(100vh,860px)] flex-col overflow-hidden text-white"
    >
      {/* Custom Bone Cursor (active inside Hero on pointer devices) */}
      <BoneCursor active={cursorInHero} />

      {/* Live Cursor-Tracked Dog Stage (16:9 Frame Scrubber OR 2.5D Interactive Biscuit Fallback) */}
      <DogFrameStage heroRef={heroRef} />

      {/* Top Navigation */}
      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onOpenCart={onOpenCart}
      />

      {/* Hero Main Grid */}
      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between px-5 pb-10 pt-6 sm:px-8 lg:pb-12 lg:pt-10">
        <div className="max-w-[470px] pb-72 sm:pb-80 lg:pb-0">
          {/* Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#2C1F0A]/45 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.14em] text-[#FFE596] uppercase backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#FFD866] shadow-[0_0_8px_#FFD866]" />
            Ships within 24 hours
          </motion.div>

          {/* Bold PAWZO-style Display Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="font-display text-[clamp(2.55rem,4.9vw,4.25rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-white drop-shadow-[0_6px_24px_rgba(61,39,7,0.28)]"
          >
            Happiness on{' '}
            <span className="text-[#FFD966]">four paws</span>
            <br />— clean home
            <br />
            at your door
          </motion.h1>

          {/* RIZZEXPO Brand Value Subcopy */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.14 }}
            className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/90 sm:text-base"
          >
            Leak-proof eco waste bags with recycled cores and reusable electrostatic hair removers
            — the RIZZEXPO Pet Care System built to keep walks clean and sofas spotless.
          </motion.p>

          {/* Primary & Secondary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center gap-3.5"
          >
            <a
              href="#products"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#F5C542] px-7 py-4 text-sm font-extrabold text-[#1B1712] shadow-[0_14px_30px_rgba(61,39,7,0.3)] transition hover:bg-[#FFD866] active:scale-[0.98]"
            >
              <span>Shop now</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#bundle"
              className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur-md transition hover:border-white/60 hover:bg-white/20"
            >
              Save with the Duo
            </a>
          </motion.div>

          {/* Trust Metrics Strip (matching PAWZO rhythm) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28 }}
            className="mt-10 flex flex-wrap items-center gap-x-9 gap-y-4 border-t border-white/15 pt-7"
          >
            <div>
              <div className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                270+
              </div>
              <div className="mt-0.5 text-xs font-medium text-white/75">
                leak-proof bags per box
              </div>
            </div>
            <div>
              <div className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                96 000+
              </div>
              <div className="mt-0.5 text-xs font-medium text-white/75">
                spotless homes &amp; walks
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                <span>4.9</span>
                <Star className="h-5 w-5 fill-[#FFD866] text-[#FFD866]" />
              </div>
              <div className="mt-0.5 text-xs font-medium text-white/75">
                average pet-parent rating
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom-left Interactive Hint (PAWZO signature detail) */}
        <div className="mt-8 hidden items-center gap-2.5 text-xs font-medium text-white/75 lg:flex">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/25 bg-white/10">
            <Mouse className="h-3.5 w-3.5 text-[#FFD866]" />
          </span>
          <span>Move your mouse — Biscuit follows your bone</span>
        </div>
      </div>
    </section>
  );
}
