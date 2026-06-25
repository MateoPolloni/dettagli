'use client';

import CinematicReveal from '@/components/ui/CinematicReveal';
import { heroVehicle } from '@/lib/data/placeholderImages';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Hero360() {
  const { t } = useLanguage();

  return (
    <section className="relative flex items-center overflow-hidden bg-[#0a0a0c]" style={{ minHeight: 'calc(100vh - 5rem)' }}>

      {/* The featured vehicle, unveiled */}
      <div className="absolute inset-0">
        <CinematicReveal
          videoSrc={heroVehicle.video}
          poster={heroVehicle.poster}
          alt={heroVehicle.name}
          className="w-full h-full"
        />
      </div>

      {/* Vignette for legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,10,12,0.92) 0%, rgba(10,10,12,0.35) 14%, rgba(10,10,12,0.1) 30%, rgba(10,10,12,0.1) 68%, rgba(10,10,12,0.85) 100%)',
        }}
      />

      {/* Top label — museum-placard style vehicle credit */}
      <div
        className="absolute top-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none animate-fade-in"
        style={{ animationDelay: '2.1s', opacity: 0 }}
      >
        <span className="font-sans text-[9px] tracking-[0.38em] uppercase text-[#55555c]">
          {t.hero.featuredVehicle}
        </span>
        <span className="font-display text-base text-[#e8c878]">
          {heroVehicle.name}
        </span>
      </div>

      {/* Wordmark + tagline */}
      <div
        className="absolute inset-x-0 bottom-28 flex flex-col items-center gap-6 pointer-events-none px-6 text-center animate-fade-in"
        style={{ animationDelay: '1.7s', opacity: 0 }}
      >
        <h1 className="font-display font-medium tracking-[0.06em] text-[#f2f1ed]"
          style={{ fontSize: 'clamp(48px, 9vw, 120px)', lineHeight: 1 }}
        >
          DETTAGLI
        </h1>
        <p className="font-sans text-sm md:text-base text-[#b8b8be] max-w-md">
          {t.hero.tagline}
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-50 pointer-events-none animate-fade-in"
        style={{ animationDelay: '2.4s', opacity: 0 }}
      >
        <span className="font-sans text-[9px] tracking-[0.35em] text-[#9a9a9e] uppercase">{t.hero.scroll}</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#c9a24c] to-transparent" />
      </div>
    </section>
  );
}
