'use client';

import RevealOnScroll from '@/components/ui/RevealOnScroll';
import SectionLabel from '@/components/ui/SectionLabel';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Process() {
  const { t } = useLanguage();

  return (
    <section className="relative py-32 bg-[#0c0c0e]">
      <div className="max-w-6xl mx-auto px-8 md:px-14">
        <RevealOnScroll className="mb-20 flex flex-col items-center text-center">
          <SectionLabel index="N° 03">{t.process.label}</SectionLabel>
          <h2
            className="font-display font-medium text-[#f2f1ed]"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
          >
            {t.process.heading}
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
          {t.process.steps.map((step, i) => (
            <RevealOnScroll key={step.title} delay={i * 120}>
              <div className="relative">
                <span className="font-display font-light text-[#2a2a2f] text-[64px] leading-none block mb-4">
                  0{i + 1}
                </span>
                <h3 className="font-display font-medium text-xl text-[#f2f1ed] mb-3">
                  {step.title}
                </h3>
                <p className="text-[#9a9a9e] text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
