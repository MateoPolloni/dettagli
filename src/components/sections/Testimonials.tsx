'use client';

import Image from 'next/image';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import WipeReveal from '@/components/ui/WipeReveal';
import SectionLabel from '@/components/ui/SectionLabel';
import StarRating from '@/components/ui/StarRating';
import { testimonialMeta } from '@/lib/data/placeholderImages';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section className="relative py-32 pb-40 bg-[#0a0a0c]">
      <div className="max-w-7xl mx-auto px-8 md:px-14">
        <RevealOnScroll className="mb-16 flex flex-col items-center text-center">
          <SectionLabel index="N° 04">{t.testimonials.label}</SectionLabel>
          <h2
            className="font-display font-medium text-[#f2f1ed]"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
          >
            {t.testimonials.heading}
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.testimonials.items.map((item, i) => {
            const meta = testimonialMeta[i];
            return (
              <RevealOnScroll key={item.name} delay={i * 120}>
                <div className="card-surface overflow-hidden">
                  <WipeReveal delay={i * 120} className="relative w-full aspect-[16/10] overflow-hidden block">
                    <Image
                      src={meta.image}
                      alt={item.vehicle}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      draggable={false}
                      className="object-cover pointer-events-none select-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/95 via-[#0a0a0c]/10 to-transparent" />
                    <span className="absolute bottom-5 left-6 font-sans text-[10px] tracking-[0.28em] uppercase text-[#e8c878]">
                      {item.vehicle}
                    </span>
                  </WipeReveal>
                  <div className="p-8">
                    <p className="font-display font-light text-lg text-[#f2f1ed] leading-relaxed mb-5">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="font-sans text-xs tracking-[0.15em] uppercase text-[#9a9a9e]">
                        {item.name}
                      </p>
                      <StarRating rating={meta.rating} />
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
