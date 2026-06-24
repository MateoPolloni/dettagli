'use client';

import Link from 'next/link';
import SectionLabel from '@/components/ui/SectionLabel';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function ServicesPage() {
  const { t } = useLanguage();
  const featuredIndex = 1;

  return (
    <div className="pt-40 pb-32">
      <div className="max-w-5xl mx-auto px-8 md:px-14 text-center mb-20">
        <RevealOnScroll className="flex flex-col items-center">
          <SectionLabel index="N° 01">{t.servicesPage.label}</SectionLabel>
          <h1 className="font-display font-medium text-[#f2f1ed]" style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}>
            {t.servicesPage.heading}
          </h1>
          <p className="text-[#9a9a9e] mt-6 max-w-xl">
            {t.servicesPage.subheading}
          </p>
        </RevealOnScroll>
      </div>

      <div className="max-w-6xl mx-auto px-8 md:px-14 grid grid-cols-1 md:grid-cols-3 gap-8">
        {t.servicesPage.tiers.map((tier, i) => (
          <RevealOnScroll key={tier.name} delay={i * 120}>
            <div
              className={`card-surface p-8 flex flex-col h-full ${
                i === featuredIndex ? 'border-[rgba(201,162,76,0.45)]' : ''
              }`}
            >
              <h3 className="font-display font-medium text-2xl text-[#f2f1ed] mb-2">{tier.name}</h3>
              <p className="gradient-gold font-sans font-semibold text-sm tracking-[0.1em] uppercase mb-5">{tier.price}</p>
              <p className="text-[#9a9a9e] text-sm leading-relaxed mb-6">{tier.description}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map(f => (
                  <li key={f} className="text-sm text-[#b8b8be] flex items-start gap-3">
                    <span className="text-[#c9a24c] mt-0.5">—</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/quote" className={i === featuredIndex ? 'btn-primary justify-center' : 'btn-ghost justify-center'}>
                {t.servicesPage.ctaButton}
              </Link>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
