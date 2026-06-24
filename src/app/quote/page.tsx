'use client';

import SectionLabel from '@/components/ui/SectionLabel';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import QuoteForm from '@/components/ui/QuoteForm';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function QuotePage() {
  const { t } = useLanguage();

  return (
    <div className="pt-40 pb-32">
      <div className="max-w-2xl mx-auto px-8 md:px-14 text-center mb-16">
        <RevealOnScroll className="flex flex-col items-center">
          <SectionLabel index="N° 01">{t.quotePage.label}</SectionLabel>
          <h1 className="font-display font-medium text-[#f2f1ed]" style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}>
            {t.quotePage.heading}
          </h1>
          <p className="text-[#9a9a9e] mt-6">
            {t.quotePage.subheading}
          </p>
        </RevealOnScroll>
      </div>

      <div className="max-w-xl mx-auto px-8 md:px-14">
        <RevealOnScroll delay={120}>
          <QuoteForm />
        </RevealOnScroll>
      </div>
    </div>
  );
}
