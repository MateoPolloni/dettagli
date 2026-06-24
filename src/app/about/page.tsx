'use client';

import Image from 'next/image';
import SectionLabel from '@/components/ui/SectionLabel';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import WipeReveal from '@/components/ui/WipeReveal';
import { aboutImage } from '@/lib/data/placeholderImages';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="pt-40 pb-32">
      <div className="max-w-4xl mx-auto px-8 md:px-14 text-center mb-20">
        <RevealOnScroll className="flex flex-col items-center">
          <SectionLabel index="N° 01">{t.aboutPage.label}</SectionLabel>
          <h1 className="font-display font-medium text-[#f2f1ed]" style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}>
            {t.aboutPage.heading}
          </h1>
        </RevealOnScroll>
      </div>

      <div className="max-w-6xl mx-auto px-8 md:px-14 grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
        <WipeReveal className="relative w-full aspect-[4/3] overflow-hidden block">
          <Image
            src={aboutImage}
            alt="Dettagli studio"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            draggable={false}
            className="object-cover pointer-events-none select-none"
          />
        </WipeReveal>
        <RevealOnScroll delay={120}>
          <p className="text-[#9a9a9e] leading-relaxed mb-6">
            {t.aboutPage.paragraph1}
          </p>
          <p className="text-[#9a9a9e] leading-relaxed">
            {t.aboutPage.paragraph2}
          </p>
        </RevealOnScroll>
      </div>

      <div className="max-w-6xl mx-auto px-8 md:px-14 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {t.aboutPage.credentials.map((c, i) => (
          <RevealOnScroll key={c.label} delay={i * 100}>
            <div className="font-display font-medium gradient-gold" style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}>
              {c.value}
            </div>
            <div className="font-sans text-[9px] tracking-[0.24em] uppercase text-[#9a9a9e] mt-2">
              {c.label}
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
