import { useState } from 'react';
import {
  BedDouble,
  Check,
  Leaf,
  MousePointerClick,
  Recycle,
  ShieldCheck,
  Shirt,
  Sofa,
  Sparkles,
  VolumeX,
  Zap,
} from 'lucide-react';

const SURFACES = [
  {
    id: 'sofa',
    label: 'Sofa',
    icon: Sofa,
    photo: '/images/lifestyle-couch-dark.webp',
    stat: '98% fur lifted in 2 passes',
    note: 'Lifts stubborn Golden Retriever and cat undercoat from leather, linen, velvet, and microfiber couches without sticky residue.',
  },
  {
    id: 'carpet',
    label: 'Carpet',
    icon: Sparkles,
    photo: '/images/lifestyle-carpet.webp',
    stat: 'Deep pile static grip',
    note: 'Electrostatic bristles pull deeply trapped fur from plush rugs and carpeted stairs without dragging out a heavy vacuum.',
  },
  {
    id: 'clothing',
    label: 'Clothing',
    icon: Shirt,
    photo: '/images/lifestyle-clothing.webp',
    stat: 'Zero glue on knitwear',
    note: 'Leaves cozy sweaters, black wool coats, and car seats hair-free before you step out — zero disposable paper sheets.',
  },
  {
    id: 'bedding',
    label: 'Bedding',
    icon: BedDouble,
    photo: '/images/lifestyle-bedding.webp',
    stat: 'Whisper-silent glide',
    note: 'Quietly clears crisp white duvets, throws, and pet beds while keeping sleeping cats and anxious puppies calm.',
  },
];

export function SystemDeepDive() {
  const [activeSurfaceId, setActiveSurfaceId] = useState(SURFACES[0].id);
  const activeSurface = SURFACES.find((s) => s.id === activeSurfaceId) ?? SURFACES[0];

  return (
    <section id="system" className="bg-[#F2EFE7] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* =====================================================================
            SLAB 1: "CARE YOUR WAY" — Dark Charcoal Breakout Card + 3 Bridging Pills
           ===================================================================== */}
        <div className="relative">
          <div className="charcoal-topo-card relative overflow-visible rounded-[2.5rem] px-6 py-10 text-white shadow-[0_28px_70px_rgba(27,23,18,0.18)] sm:px-12 sm:py-14">
            <div className="grid items-center gap-8 md:grid-cols-[0.95fr_1.05fr]">
              {/* Left: Biscuit Pixar Border Collie breaking dynamically past card edge */}
              <div className="relative flex items-end justify-center md:justify-start">
                <img
                  src="/images/biscuit-peek.png"
                  alt="RIZZEXPO mascot Biscuit"
                  className="relative z-10 -mb-6 -mt-12 w-64 max-w-none drop-shadow-[0_22px_32px_rgba(0,0,0,0.48)] sm:-ml-8 sm:-mt-16 sm:w-80 md:-ml-14 md:-mb-12 md:w-[360px]"
                />
                {/* Floating golden mini badge beside Biscuit */}
                <div className="absolute right-2 top-2 z-20 hidden rounded-full border border-[#F5C542]/40 bg-[#1B1712]/85 px-3.5 py-1.5 text-[11px] font-extrabold tracking-wide text-[#FFD866] shadow-lg backdrop-blur-md sm:inline-flex sm:items-center sm:gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  PET CARE SYSTEM
                </div>
              </div>

              {/* Right: Bold Uppercase Headline + Circular Check-Pill Matrix */}
              <div className="relative z-10">
                <h2 className="font-display text-4xl font-extrabold leading-[0.96] tracking-[-0.03em] uppercase sm:text-5xl lg:text-[3.5rem]">
                  <span className="text-[#F5C542]">CARE</span> YOUR
                  <br />
                  WAY
                </h2>

                <div className="mt-7 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                  {[
                    'CLEAN DAILY WALKS',
                    'FUR-FREE SOFAS',
                    'ZERO STICKY REFILLS',
                    'ECO RECYCLED CORES',
                  ].map((label) => (
                    <div key={label} className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[#D69E1F] shadow-sm">
                        <Check className="h-4 w-4 stroke-[3.2]" />
                      </span>
                      <span className="text-xs font-bold tracking-[0.09em] text-white/90 uppercase">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3 Bridging Crisp White Pills (exact reference notched transition rhythm) */}
          <div className="relative z-20 mt-3 grid gap-3 md:grid-cols-3">
            {[
              'Grab a leak-proof bag. Clip the olive dispenser. Go.',
              'Roll back and forth. Lift trapped fur without tape.',
              'One click on the handle empties the full chamber.',
            ].map((text) => (
              <div
                key={text}
                className="flex items-center justify-center rounded-[1.6rem] bg-white px-6 py-5 text-center text-sm font-semibold leading-snug text-[#1D1811] shadow-[0_8px_24px_rgba(27,23,18,0.06)]"
              >
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* =====================================================================
            SLAB 2: RADIAL ANATOMY #1 — RIZZEXPO Electrostatic Pet Hair Remover
           ===================================================================== */}
        <div className="mt-3">
          <div className="charcoal-topo-card-blue relative overflow-hidden rounded-[2.5rem] px-6 py-12 text-white shadow-[0_28px_70px_rgba(27,23,18,0.18)] sm:px-12 sm:py-16">
            {/* Top-Center Radial Callout (matching "Solid molded core" position) */}
            <div className="mx-auto mb-8 flex max-w-xs items-center justify-center gap-3.5 text-left">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#4BA3E3] text-white shadow-[0_0_24px_rgba(75,163,227,0.45)]">
                <Zap className="h-5 w-5 fill-current" />
              </span>
              <div>
                <div className="font-display text-xl font-extrabold leading-tight text-white">
                  Electrostatic
                </div>
                <div className="text-xs font-medium text-white/70">
                  adsorption fur trap
                </div>
              </div>
            </div>

            {/* 3-Column Radial Orbit: Left Callouts | Center Product Hero | Right Callouts */}
            <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.3fr_0.85fr]">
              {/* Left Orbit Callouts */}
              <div className="flex flex-row justify-between gap-4 lg:flex-col lg:gap-12">
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F5C542] text-[#1B1712] shadow-[0_0_20px_rgba(245,197,66,0.35)]">
                    <Recycle className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-display text-2xl font-extrabold leading-none text-white">
                      100%
                    </div>
                    <div className="mt-1 text-xs font-medium text-white/70">
                      reusable — no sticky tape or batteries
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#4BA3E3] text-white shadow-[0_0_20px_rgba(75,163,227,0.35)]">
                    <VolumeX className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-display text-xl font-extrabold leading-tight text-white">
                      More Silent
                    </div>
                    <div className="mt-1 text-xs font-medium text-white/70">
                      whisper-quiet glide pets love
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Hero Product Plate */}
              <div className="relative mx-auto w-full max-w-md">
                <div className="absolute -inset-4 rounded-[2.25rem] bg-gradient-to-tr from-[#4BA3E3]/25 via-[#F5C542]/15 to-transparent blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:p-6">
                  <img
                    src="/images/pet-hair-remover.jpg"
                    alt="RIZZEXPO Electrostatic Pet Hair Remover Roller"
                    className="mx-auto aspect-[4/3] w-full object-contain"
                  />
                  <div className="mt-3 flex items-center justify-between border-t border-[#EEE7D8] pt-3 text-[11px] font-bold text-[#1D4E89]">
                    <span>RIZZEXPO PET CARE SYSTEM</span>
                    <span className="rounded-full bg-[#E6EFF8] px-2.5 py-0.5 text-[#153B68]">
                      NO REFILLS NEEDED
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Orbit Callouts */}
              <div className="flex flex-row justify-between gap-4 lg:flex-col lg:gap-12">
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F5C542] text-[#1B1712] shadow-[0_0_20px_rgba(245,197,66,0.35)]">
                    <MousePointerClick className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-display text-xl font-extrabold leading-tight text-white">
                      One-Click
                    </div>
                    <div className="mt-1 text-xs font-medium text-white/70">
                      handle catch opens &amp; empties hair
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#4BA3E3] text-white shadow-[0_0_20px_rgba(75,163,227,0.35)]">
                    <Sofa className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-display text-xl font-extrabold leading-tight text-white">
                      4 Surfaces
                    </div>
                    <div className="mt-1 text-xs font-medium text-white/70">
                      sofa, carpet, clothing &amp; bedding
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Surface Bar with Live Verified Lifestyle Photo */}
            <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-white/12 bg-white/6 p-4 backdrop-blur-md sm:p-6">
              <div className="flex flex-wrap items-center justify-center gap-2" role="tablist">
                {SURFACES.map((surface) => {
                  const Icon = surface.icon;
                  const active = surface.id === activeSurface.id;
                  return (
                    <button
                      key={surface.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveSurfaceId(surface.id)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition ${
                        active
                          ? 'bg-[#F5C542] text-[#1B1712] shadow-md'
                          : 'bg-white/10 text-white/80 hover:bg-white/18'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{surface.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 grid items-center gap-5 sm:grid-cols-[220px_1fr]">
                <div className="overflow-hidden rounded-2xl border border-white/15 shadow-lg">
                  <img
                    src={activeSurface.photo}
                    alt={`${activeSurface.label} pet hair removal`}
                    className="aspect-[3/2] w-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <div className="inline-block rounded-full bg-[#4BA3E3]/25 px-3 py-0.5 text-[11px] font-extrabold text-[#93CEFA]">
                    {activeSurface.stat}
                  </div>
                  <h4 className="mt-2 font-display text-lg font-extrabold text-white">
                    Built for {activeSurface.label}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-white/80 sm:text-sm">
                    {activeSurface.note}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Bridging Crisp White Pills into Waste Bags Anatomy */}
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {[
              '18 extra-thick green rolls — 270 leak-proof bags.',
              'Packaging & roll cores crafted with recycled materials.',
              'Matte olive capsule dispenser clips cleanly to any leash.',
            ].map((text) => (
              <div
                key={text}
                className="flex items-center justify-center rounded-[1.6rem] bg-white px-6 py-5 text-center text-sm font-semibold leading-snug text-[#1D1811] shadow-[0_8px_24px_rgba(27,23,18,0.06)]"
              >
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* =====================================================================
            SLAB 3: RADIAL ANATOMY #2 — RIZZEXPO Eco-Strong Dog Waste Bags
           ===================================================================== */}
        <div className="mt-3">
          <div className="charcoal-topo-card relative overflow-hidden rounded-[2.5rem] px-6 py-12 text-white shadow-[0_28px_70px_rgba(27,23,18,0.18)] sm:px-12 sm:py-16">
            {/* Top-Center Callout */}
            <div className="mx-auto mb-8 flex max-w-xs items-center justify-center gap-3.5 text-left">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#63BE46] text-white shadow-[0_0_24px_rgba(99,190,70,0.45)]">
                <Leaf className="h-5 w-5" />
              </span>
              <div>
                <div className="font-display text-xl font-extrabold leading-tight text-white">
                  Eco-Strong
                </div>
                <div className="text-xs font-medium text-white/70">
                  recycled cores &amp; box
                </div>
              </div>
            </div>

            <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.3fr_0.85fr]">
              {/* Left Orbit Callouts */}
              <div className="flex flex-row justify-between gap-4 lg:flex-col lg:gap-12">
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#63BE46] text-white shadow-[0_0_20px_rgba(99,190,70,0.35)]">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-display text-2xl font-extrabold leading-none text-white">
                      100%
                    </div>
                    <div className="mt-1 text-xs font-medium text-white/70">
                      completely leak-proof double weld
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F5C542] text-[#1B1712] shadow-[0_0_20px_rgba(245,197,66,0.35)]">
                    <Recycle className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-display text-xl font-extrabold leading-tight text-white">
                      Recycled
                    </div>
                    <div className="mt-1 text-xs font-medium text-white/70">
                      roll cores &amp; yellow carton box
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Hero Waste Bags Cutout Plate */}
              <div className="relative mx-auto w-full max-w-md">
                <div className="absolute -inset-4 rounded-[2.25rem] bg-gradient-to-tr from-[#63BE46]/25 via-[#F5C542]/20 to-transparent blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:p-6">
                  <img
                    src="/images/poop-bags-cutout.png"
                    alt="RIZZEXPO Eco-Strong Dog Waste Bags and Olive Dispenser"
                    className="mx-auto aspect-[16/10] w-full object-contain"
                  />
                  <div className="mt-3 flex items-center justify-between border-t border-[#EEE7D8] pt-3 text-[11px] font-bold text-[#2F6A1E]">
                    <span>18 ROLLS · 270 BAGS</span>
                    <span className="rounded-full bg-[#E8F5E4] px-2.5 py-0.5 text-[#2F6A1E]">
                      DISPENSER INCLUDED
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Orbit Callouts */}
              <div className="flex flex-row justify-between gap-4 lg:flex-col lg:gap-12">
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#63BE46] text-white shadow-[0_0_20px_rgba(99,190,70,0.35)]">
                    <Check className="h-5 w-5 stroke-[3]" />
                  </span>
                  <div>
                    <div className="font-display text-xl font-extrabold leading-tight text-white">
                      Strong
                    </div>
                    <div className="mt-1 text-xs font-medium text-white/70">
                      sturdy film, easy-open perforation
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F5C542] text-[#1B1712] shadow-[0_0_20px_rgba(245,197,66,0.35)]">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-display text-xl font-extrabold leading-tight text-white">
                      Olive Clip
                    </div>
                    <div className="mt-1 text-xs font-medium text-white/70">
                      matte capsule hooks to any leash
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
