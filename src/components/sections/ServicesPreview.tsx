'use client';

import Link from 'next/link';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import SectionLabel from '@/components/ui/SectionLabel';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function ServicesPreview() {
  const { t } = useLanguage();

  return (
    <section className="relative py-32 bg-[#0a0a0c]">
      <div className="max-w-5xl mx-auto px-8 md:px-14">
        <RevealOnScroll className="mb-16">
          <SectionLabel index="N° 02">{t.servicesPreview.label}</SectionLabel>
          <h2
            className="font-display font-medium text-[#f2f1ed]"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
          >
            {t.servicesPreview.heading}
          </h2>
        </RevealOnScroll>

        <div>
          {t.servicesPreview.items.map((service, i) => (
            <RevealOnScroll key={service.title} delay={i * 90}>
              <Link
                href="/services"
                className="group grid grid-cols-[60px_1fr_auto] md:grid-cols-[80px_1fr_auto] items-center gap-6 py-8 border-t border-[rgba(255,255,255,0.08)] last:border-b"
              >
                <span className="font-mono text-sm text-[#55555c] group-hover:text-[#c9a24c] transition-colors duration-300">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display font-medium text-2xl md:text-3xl text-[#f2f1ed] group-hover:text-[#e8c878] transition-colors duration-300 mb-1">
                    {service.title}
                  </h3>
                  <p className="text-[#9a9a9e] text-sm leading-relaxed max-w-lg hidden md:block">
                    {service.description}
                  </p>
                </div>
                <svg
                  width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                  className="text-[#55555c] group-hover:text-[#e8c878] group-hover:translate-x-1 transition-all duration-300"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={400} className="mt-14 flex justify-center">
          <Link href="/services" className="btn-ghost">
            {t.servicesPreview.cta}
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
