'use client';

import RevealOnScroll from '@/components/ui/RevealOnScroll';
import SectionLabel from '@/components/ui/SectionLabel';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Philosophy() {
  const { t } = useLanguage();

  return (
    <section className="relative py-36 md:py-48 bg-[#0a0a0c]">
      <div className="max-w-4xl mx-auto px-8 md:px-14 text-center">
        <RevealOnScroll className="flex flex-col items-center">
          <SectionLabel index="N° 01">{t.philosophy.label}</SectionLabel>
          <p
            className="font-display font-light text-[#f2f1ed] leading-[1.25]"
            style={{ fontSize: 'clamp(28px, 4.2vw, 48px)' }}
          >
            {t.philosophy.heading}{' '}
            <span className="gradient-gold font-medium">{t.philosophy.headingEmphasis}</span>.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={150} className="mt-12">
          <p className="text-[#9a9a9e] text-base leading-relaxed max-w-xl mx-auto">
            {t.philosophy.body}
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
