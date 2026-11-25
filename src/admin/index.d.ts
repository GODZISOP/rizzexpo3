import type { ComponentType } from 'react';

export interface SiteConfig {
  companyName: string;
  shortName: string;
  legalName: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  eyebrowStandard: string;
  phonePrimary: string;
  phonePrimaryTel: string;
  phoneDirect: string;
  phoneDirectTel: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  email: string;
  emailSecondary?: string;
  ownerFullName?: string;
  ownerName?: string;
  website: string;
  address: {
    line1: string;
    line2: string;
    full: string;
    cityStateZip: string;
    jurisdiction: string;
  };
  hubs: {
    originText: string;
    dispatchNote: string;
  };
  about: {
    mission: string;
    b2bNote: string;
    sourcingNote: string;
    cards: Array<{ title: string; description: string }>;
    ctaButton: string;
  };
  contact: {
    sectionTag: string;
    tagline: string;
    cardTitle: string;
    formTitle: string;
    formSuccess: string;
    labels: {
      email: string;
      phone: string;
      hub: string;
      whatsapp: string;
      management: string;
    };
  };
  footer: {
    description: string;
    operationsLabel: string;
    newsletterTagline: string;
    newsletterSuccess: string;
    copyrightSuffix: string;
    managedByLabel: string;
    websiteUrl: string;
    domain: string;
    socials: Array<{ label: string; url: string }>;
    menu: Array<{ label: string; tab?: string; scrollTo?: string }>;
  };
  testimonial: {
    quote: string;
    author: string;
  };
  currencySymbol: string;
  logo: string;
  theme: {
    primaryNavy: string;
    secondaryTeal: string;
    accentTeal: string;
    accentHover: string;
    accentGold: string;
    bgLight: string;
  };
}

export interface AdminPanelProps {
  onExitAdmin?: (targetSlug?: string | null) => void;
}

export const AdminPanel: ComponentType<AdminPanelProps>;

export function useActiveSiteConfig(): {
  website: unknown;
  config: SiteConfig;
  slug: string;
  loading: boolean;
  refresh: () => Promise<void>;
};
