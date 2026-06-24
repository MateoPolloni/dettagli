'use client';

import SectionLabel from '@/components/ui/SectionLabel';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import ContactForm from '@/components/ui/ContactForm';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <div className="pt-40 pb-32">
      <div className="max-w-6xl mx-auto px-8 md:px-14 grid grid-cols-1 md:grid-cols-2 gap-16">
        <RevealOnScroll>
          <SectionLabel index="N° 01">{t.contactPage.label}</SectionLabel>
          <h1 className="font-display font-medium text-[#f2f1ed] mb-8" style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}>
            {t.contactPage.heading}
          </h1>
          <p className="text-[#9a9a9e] mb-10 max-w-md">
            {t.contactPage.subheading}
          </p>

          <div className="space-y-6 mb-10">
            {t.contactPage.details.map(d => (
              <div key={d.label}>
                <div className="font-sans text-[9px] tracking-[0.28em] uppercase text-[#9a9a9e] mb-1">{d.label}</div>
                <div className="text-[#f2f1ed]">{d.value}</div>
              </div>
            ))}
          </div>

          <div className="w-full aspect-[16/9] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#55555c] text-sm">
            {t.contactPage.mapPlaceholder}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={150}>
          <ContactForm />
        </RevealOnScroll>
      </div>
    </div>
  );
}
