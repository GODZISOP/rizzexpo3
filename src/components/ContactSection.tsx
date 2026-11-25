import { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Package,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Store,
  User,
} from 'lucide-react';
import type { SiteConfig } from '../admin';

const TOPICS = [
  { id: 'order', label: 'Order Help', icon: Package },
  { id: 'product', label: 'Product Question', icon: Sparkles },
  { id: 'wholesale', label: 'Bulk / Wholesale', icon: Store },
  { id: 'guarantee', label: '30-Day Guarantee', icon: ShieldCheck },
] as const;

type TopicId = (typeof TOPICS)[number]['id'];

export function ContactSection({ siteConfig }: { siteConfig?: SiteConfig }) {
  const contactEmail = siteConfig?.email || 'info@rizzexpo.com';
  const secondaryEmail = siteConfig?.emailSecondary || '';
  const brandName = siteConfig?.shortName || siteConfig?.companyName || 'RIZZEXPO';
  const ownerName = siteConfig?.ownerFullName || siteConfig?.ownerName || '';
  const phoneDisplay = siteConfig?.phonePrimary || '';
  const phoneTel = siteConfig?.phonePrimaryTel || phoneDisplay.replace(/\D/g, '');
  const whatsappDisplay = siteConfig?.whatsappDisplay || '';
  const whatsappDigits = siteConfig?.whatsappNumber || whatsappDisplay.replace(/\D/g, '');
  const addressLine1 = siteConfig?.address?.line1 || '';
  const addressLine2 = siteConfig?.address?.line2 || '';
  const websiteDisplay = siteConfig?.website || '';
  const [topic, setTopic] = useState<TopicId>('product');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orderRef, setOrderRef] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitting(true);
    window.setTimeout(() => {
      const code = `RZ-${Math.floor(1000 + Math.random() * 9000)}`;
      setTicketId(code);
      setSubmitting(false);
    }, 350);
  };

  const resetForm = () => {
    setTicketId(null);
    setName('');
    setEmail('');
    setOrderRef('');
    setMessage('');
  };

  return (
    <section id="contact" className="bg-[#F2EFE7] pb-20 pt-4 sm:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Dark Charcoal Topographic Contact Hub */}
        <div className="charcoal-topo-card overflow-hidden rounded-[2.5rem] p-6 text-white shadow-[0_28px_70px_rgba(27,23,18,0.2)] sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            {/* Left: Brand Support Details */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#F5C542] px-3.5 py-1 text-[11px] font-extrabold tracking-[0.14em] text-[#1B1712] uppercase">
                  <MessageSquare className="h-3.5 w-3.5" />
                  {siteConfig?.contact?.sectionTag || 'Pet Care Support'}
                </span>

                <h2 className="mt-4 font-display text-4xl font-extrabold leading-[0.98] tracking-[-0.03em] uppercase sm:text-5xl">
                  CONTACT <span className="text-[#F5C542]">THE PACK</span>
                </h2>

                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
                  {siteConfig?.contact?.tagline ||
                    'Questions about our leak-proof waste bags, electrostatic roller surfaces, or wholesale stock for your store? Real pet-care specialists reply fast.'}
                </p>

                {/* Circular Icon Contact Channels (matching radial callout badges) */}
                <div className="mt-8 space-y-5">
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F5C542] text-[#1B1712] shadow-md">
                      <Mail className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-[11px] font-bold tracking-wider text-white/55 uppercase">
                        Customer Care &amp; Orders
                      </div>
                      <a
                        href={`mailto:${contactEmail}`}
                        className="font-display text-base font-extrabold text-white transition hover:text-[#F5C542]"
                      >
                        {contactEmail}
                      </a>
                      {secondaryEmail && (
                        <div>
                          <a
                            href={`mailto:${secondaryEmail}`}
                            className="text-xs font-semibold text-white/75 transition hover:text-[#F5C542]"
                          >
                            {secondaryEmail}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {phoneDisplay && (
                    <div className="flex items-center gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F5C542]/90 text-[#1B1712] shadow-md">
                        <Phone className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="text-[11px] font-bold tracking-wider text-white/55 uppercase">
                          {siteConfig?.contact?.labels?.phone || 'Phone Number'}
                        </div>
                        <a
                          href={`tel:${phoneTel}`}
                          className="font-display text-base font-extrabold text-white transition hover:text-[#F5C542]"
                        >
                          {phoneDisplay}
                        </a>
                      </div>
                    </div>
                  )}

                  {(whatsappDisplay || whatsappDigits) && (
                    <div className="flex items-center gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-[#11240B] shadow-md">
                        <MessageCircle className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="text-[11px] font-bold tracking-wider text-white/55 uppercase">
                          {siteConfig?.contact?.labels?.whatsapp || 'WhatsApp Chat'}
                        </div>
                        <a
                          href={`https://wa.me/${whatsappDigits}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-display text-base font-extrabold text-white transition hover:text-[#25D366]"
                        >
                          {whatsappDisplay || `+${whatsappDigits}`}
                        </a>
                      </div>
                    </div>
                  )}

                  {(addressLine1 || addressLine2) && (
                    <div className="flex items-center gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-[#F5C542] shadow-md">
                        <MapPin className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="text-[11px] font-bold tracking-wider text-white/55 uppercase">
                          {siteConfig?.contact?.labels?.hub || 'Operating Hub'}
                        </div>
                        <div className="font-display text-sm font-extrabold text-white">
                          {addressLine1}
                        </div>
                        {addressLine2 && (
                          <div className="text-xs text-white/70">{addressLine2}</div>
                        )}
                      </div>
                    </div>
                  )}

                  {(ownerName || websiteDisplay) && (
                    <div className="flex items-center gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/12 text-white shadow-md">
                        {ownerName ? <User className="h-5 w-5" /> : <Globe className="h-5 w-5" />}
                      </span>
                      <div>
                        <div className="text-[11px] font-bold tracking-wider text-white/55 uppercase">
                          {siteConfig?.contact?.labels?.management || 'Management'}
                        </div>
                        <div className="font-display text-sm font-extrabold text-white">
                          {ownerName ? `${brandName} · ${ownerName}` : brandName}
                        </div>
                        {websiteDisplay && (
                          <a
                            href={
                              websiteDisplay.startsWith('http')
                                ? websiteDisplay
                                : `https://${websiteDisplay}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-[#F5C542] hover:underline"
                          >
                            {websiteDisplay}
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#63BE46] text-[#11240B] shadow-md">
                      <Store className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-[11px] font-bold tracking-wider text-white/55 uppercase">
                        Wholesale &amp; Pet Boutiques
                      </div>
                      <a
                        href={`mailto:${contactEmail}?subject=${encodeURIComponent(brandName + ' Wholesale Inquiry')}`}
                        className="font-display text-base font-extrabold text-white transition hover:text-[#63BE46]"
                      >
                        {contactEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#4BA3E3] text-white shadow-md">
                      <Clock className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-[11px] font-bold tracking-wider text-white/55 uppercase">
                        Response &amp; Dispatch Hours
                      </div>
                      <div className="font-display text-sm font-extrabold text-white">
                        {siteConfig?.footer?.operationsLabel ||
                          'Mon – Sat · 9 AM – 7 PM · Avg reply under 2 hrs'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mascot Sign-off Card */}
              <div className="mt-9 flex items-center gap-4 rounded-[1.6rem] border border-white/12 bg-white/6 p-4 backdrop-blur-md">
                <img
                  src="/images/biscuit-peek.png"
                  alt="Biscuit mascot"
                  className="h-16 w-16 shrink-0 rounded-2xl bg-[#D9A73B] object-contain p-1"
                />
                <div className="text-xs leading-relaxed text-white/80">
                  <strong className="block font-display text-sm text-[#F5C542]">
                    30-Day Spotless Home Promise
                  </strong>
                  Issue with a roll or roller? Drop your order number and we ship a free
                  replacement within 24 hours.
                </div>
              </div>
            </div>

            {/* Right: Crisp White Interactive Contact Form Card */}
            <div className="rounded-[2rem] bg-white p-6 text-[#1B1712] shadow-2xl sm:p-8">
              {ticketId ? (
                <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E9F5E5] text-[#3E8227]">
                    <CheckCircle2 className="h-9 w-9" />
                  </span>
                  <span className="mt-4 rounded-full bg-[#24221F] px-3.5 py-1 text-xs font-extrabold tracking-wider text-[#F5C542]">
                    TICKET #{ticketId}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-extrabold text-[#1B1712]">
                    Message received!
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#5C5346]">
                    Thanks, <strong>{name}</strong>. Our RIZZEXPO support pack will reply to{' '}
                    <strong>{email}</strong> within 2 hours during support hours.
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="mt-7 rounded-full bg-[#24221F] px-7 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#3A3630]"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <span className="mb-2.5 block text-[11px] font-extrabold tracking-[0.12em] text-[#7A7060] uppercase">
                      What can we help with?
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {TOPICS.map((item) => {
                        const Icon = item.icon;
                        const active = topic === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setTopic(item.id)}
                            className={`flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 text-left text-xs font-extrabold transition ${
                              active
                                ? 'border-[#24221F] bg-[#24221F] text-[#F5C542] shadow-sm'
                                : 'border-[#E6E0D3] bg-[#F7F4ED] text-[#2A2621] hover:border-[#C7BEA8]'
                            }`}
                          >
                            <Icon className="h-3.5 w-3.5 shrink-0" />
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-bold text-[#2A2621]">
                        Full Name *
                      </span>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full rounded-2xl border border-[#E4DEC9] bg-[#FAF8F3] px-4 py-3 text-sm text-[#1B1712] placeholder:text-[#9A8F7D] focus:border-[#24221F] focus:bg-white focus:outline-none"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block text-xs font-bold text-[#2A2621]">
                        Email Address *
                      </span>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@example.com"
                        className="w-full rounded-2xl border border-[#E4DEC9] bg-[#FAF8F3] px-4 py-3 text-sm text-[#1B1712] placeholder:text-[#9A8F7D] focus:border-[#24221F] focus:bg-white focus:outline-none"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-1.5 block text-xs font-bold text-[#2A2621]">
                      Order Number <span className="font-medium text-[#8A7F6E]">(optional)</span>
                    </span>
                    <input
                      type="text"
                      value={orderRef}
                      onChange={(e) => setOrderRef(e.target.value)}
                      placeholder="e.g. #RIZZ-10492"
                      className="w-full rounded-2xl border border-[#E4DEC9] bg-[#FAF8F3] px-4 py-3 text-sm text-[#1B1712] placeholder:text-[#9A8F7D] focus:border-[#24221F] focus:bg-white focus:outline-none"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-xs font-bold text-[#2A2621]">
                      Your Message *
                    </span>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your dog/cat, product question, or order..."
                      className="w-full resize-none rounded-2xl border border-[#E4DEC9] bg-[#FAF8F3] px-4 py-3 text-sm text-[#1B1712] placeholder:text-[#9A8F7D] focus:border-[#24221F] focus:bg-white focus:outline-none"
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F5C542] py-4 text-sm font-extrabold text-[#1B1712] shadow-md transition hover:bg-[#FFD866] active:scale-[0.99] disabled:opacity-60"
                  >
                    <Send className="h-4 w-4" />
                    <span>{submitting ? 'Sending to RIZZEXPO...' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 3 Bridging Crisp White Pills directly below Contact Card */}
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {[
            '24-hour tracked dispatch on every in-stock order.',
            'Real human support — average response under 2 hours.',
            'Wholesale packs available for pet shops & groomers.',
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
    </section>
  );
}
