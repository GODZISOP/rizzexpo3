export interface ProductVariant {
  id: string;
  label: string;
  subtitle: string;
  price: number;
  compareAtPrice?: number;
  badge?: string;
}

export interface Product {
  id: string;
  slug: string;
  category: 'Walk Essentials' | 'Home Grooming' | 'Complete System';
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  image: string;
  accentColor: 'leaf' | 'navy' | 'gold';
  rating: number;
  reviewCount: number;
  inStock: boolean;
  highlights: string[];
  specs: { label: string; value: string }[];
  variants: ProductVariant[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'rizzexpo-waste-bags',
    slug: 'eco-strong-dog-waste-bags',
    category: 'Walk Essentials',
    name: 'RIZZEXPO Eco-Strong Dog Waste Bags + Dispenser',
    shortName: 'Eco-Strong Waste Bags',
    tagline: 'Completely leak-proof. Recycled cores. Built for stress-free daily walks.',
    description:
      'Engineered with extra-thick, tear-resistant seams so your hands stay clean on every walk. Each box packs 18 crisp green rolls paired with a matte olive clip-on leash dispenser — plus roll cores and packaging crafted from recycled materials.',
    image: '/images/poop-bags.jpg',
    accentColor: 'leaf',
    rating: 4.9,
    reviewCount: 418,
    inStock: true,
    highlights: [
      '100% Leak-Proof Double-Sealed Bottom',
      'Packaging & Roll Cores Made with Recycled Materials',
      'Extra-Thick, Strong & Sturdy Tear-Line',
      'Includes Matte Olive Clip-On Leash Dispenser',
    ],
    specs: [
      { label: 'Rolls Included', value: '18 Rolls (270 Bags)' },
      { label: 'Dispenser', value: 'Clip-On Olive Capsule Included' },
      { label: 'Sustainability', value: 'Recycled Cores & Box' },
      { label: 'Leak Rating', value: 'Completely Leak-Proof' },
    ],
    variants: [
      {
        id: 'bags-18',
        label: '18 Rolls (270 Bags)',
        subtitle: '3-month supply + Free Dispenser',
        price: 16.99,
        compareAtPrice: 21.99,
        badge: 'Most Popular',
      },
      {
        id: 'bags-36',
        label: '36 Rolls (540 Bags)',
        subtitle: '6-month supply + 2 Dispensers',
        price: 28.99,
        compareAtPrice: 39.99,
        badge: 'Save 27%',
      },
    ],
  },
  {
    id: 'rizzexpo-hair-remover',
    slug: 'electrostatic-pet-hair-remover',
    category: 'Home Grooming',
    name: 'RIZZEXPO Electrostatic Pet Hair Remover Roller',
    shortName: 'Electrostatic Hair Remover',
    tagline: 'Zero sticky tape. Zero batteries. One-click chamber cleaning across every fabric.',
    description:
      'Roll back and forth over sofas, carpets, bedding, or coats and watch electrostatic adsorption lift deeply embedded dog and cat hair in seconds. Whisper-quiet operation keeps skittish pets calm, and a single press of the handle catch empties the trapped fur chamber.',
    image: '/images/pet-hair-remover.jpg',
    accentColor: 'navy',
    rating: 4.9,
    reviewCount: 562,
    inStock: true,
    highlights: [
      'Electrostatic Adsorption — No Refills, Tape, or Batteries',
      'One-Click Cleaning Chamber Release Catch',
      'Ultra-Silent Bi-Directional Roller Mechanism',
      'Multi-Surface: Sofa, Carpet, Clothing & Bedding',
    ],
    specs: [
      { label: 'Technology', value: 'Static Adsorption Micro-Bristles' },
      { label: 'Emptying', value: 'One-Click Catch Chamber' },
      { label: 'Power Needed', value: '100% Reusable / No Batteries' },
      { label: 'Safe Surfaces', value: 'Sofa, Carpet, Clothing, Bedding' },
    ],
    variants: [
      {
        id: 'roller-single',
        label: 'Single Roller',
        subtitle: 'RIZZEXPO Pet Care System',
        price: 21.99,
        compareAtPrice: 27.99,
        badge: 'Bestseller',
      },
      {
        id: 'roller-duo',
        label: 'Home + Car 2-Pack',
        subtitle: 'Keep one on the couch, one in the trunk',
        price: 36.99,
        compareAtPrice: 49.99,
        badge: 'Save 26%',
      },
    ],
  },
];

export const BUNDLE_PRODUCT = {
  id: 'rizzexpo-complete-duo',
  variantId: 'bundle-complete-duo',
  name: 'The Complete RIZZEXPO Pet Care Duo',
  subtitle: '18 Rolls Leak-Proof Waste Bags + Olive Dispenser + Electrostatic Hair Remover',
  price: 32.99,
  compareAtPrice: 38.98,
  savings: 5.99,
  image: '/images/poop-bags.jpg',
};

export interface CustomerReview {
  id: string;
  author: string;
  petBadge: string;
  productTag: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
}

export const REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Hannah M.',
    petBadge: 'Golden Retriever Mom',
    productTag: 'Electrostatic Hair Remover',
    rating: 5,
    title: 'Pulled a whole second dog off our velvet couch',
    body: 'I used to burn through two sticky lint rolls every week. Two minutes with the RIZZEXPO roller cleared our entire sectional silently — and pressing the one-click button to dump the chamber is ridiculously satisfying.',
    verified: true,
  },
  {
    id: 'rev-2',
    author: 'Daniel K.',
    petBadge: 'Border Collie Dad',
    productTag: 'Eco-Strong Waste Bags',
    rating: 5,
    title: 'Finally bags that open effortlessly on cold mornings',
    body: 'Zero rips, zero leaks, and the olive dispenser clips tight to our leash without bouncing around. Knowing the roll cores and box use recycled materials makes it an easy repeat buy.',
    verified: true,
  },
  {
    id: 'rev-3',
    author: 'Aisha R.',
    petBadge: '2 Ragdolls + Husky',
    productTag: 'Complete Pet Care Duo',
    rating: 5,
    title: 'Bought the Duo — worth every single dollar',
    body: 'Between Husky shedding season on the rugs and twice-daily park walks, RIZZEXPO replaced both cheap supermarket bags and noisy handheld vacuums in one box.',
    verified: true,
  },
];

export type FaqCategory = 'Waste Bags' | 'Hair Remover' | 'Shipping & Orders';

export interface FaqItem {
  id: string;
  category: FaqCategory;
  q: string;
  a: string;
}

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Hair Remover',
    q: 'Does the RIZZEXPO Pet Hair Remover need sticky tape refills or batteries?',
    a: 'Never. It works purely through electrostatic adsorption created by quick back-and-forth rolling strokes. When full, press the handle catch for one-click emptying and keep reusing it for years.',
  },
  {
    id: 'faq-2',
    category: 'Hair Remover',
    q: 'What surfaces can I safely use the Pet Hair Remover on?',
    a: 'It is engineered for sofas, upholstered chairs, carpets, area rugs, car seats, bedding, and wool or fleece clothing. Avoid using it directly on wet fabrics or hard bare floors.',
  },
  {
    id: 'faq-3',
    category: 'Hair Remover',
    q: 'How do I clean the electrostatic roller after emptying the chamber?',
    a: 'Press the one-click release catch on the handle to open the rear chamber and tip the trapped fur into the bin. If needed, lightly wipe the bristle surface with a damp cloth — never submerge the roller in water.',
  },
  {
    id: 'faq-4',
    category: 'Waste Bags',
    q: 'Are the RIZZEXPO waste bags thick enough for large breeds?',
    a: 'Yes — every green roll is double-sealed at the base and tested to be completely leak-proof and tear-resistant, comfortably handling large-breed cleanups without stretching thin.',
  },
  {
    id: 'faq-5',
    category: 'Waste Bags',
    q: 'Will the matte olive dispenser clip onto my existing leash or harness?',
    a: 'Yes. The lightweight olive capsule includes a sturdy metal carabiner clip that latches cleanly onto standard nylon, rope, leather, or retractable leash handles without rattling.',
  },
  {
    id: 'faq-6',
    category: 'Waste Bags',
    q: 'What parts of the waste bag kit use recycled materials?',
    a: 'Both the outer RIZZEXPO yellow packaging box and every inner roll core across all 18 rolls are manufactured using recycled materials to cut single-use plastic waste.',
  },
  {
    id: 'faq-7',
    category: 'Shipping & Orders',
    q: 'How fast do RIZZEXPO orders ship?',
    a: 'All orders placed before 3 PM ship within 24 hours with full tracking. Orders over $30 (including the Complete Pet Care Duo) automatically unlock free express shipping.',
  },
  {
    id: 'faq-8',
    category: 'Shipping & Orders',
    q: 'What is covered under the 30-Day Spotless Home Guarantee?',
    a: 'Try the RIZZEXPO Pet Care System on your daily walks and furniture for 30 days. If you are not genuinely thrilled, contact our support team below for a hassle-free replacement or full refund.',
  },
  {
    id: 'faq-9',
    category: 'Shipping & Orders',
    q: 'Do you offer bulk or wholesale pricing for pet shops and groomers?',
    a: 'Yes! Pet boutiques, grooming salons, and veterinary clinics can request tiered wholesale packs directly using the Bulk / Wholesale option in our Contact form below.',
  },
];
