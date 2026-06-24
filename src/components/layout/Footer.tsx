'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0a0a0c]">
      {/* CTA strip */}
      <div className="border-t border-[rgba(255,255,255,0.07)]">
        <div className="max-w-5xl mx-auto px-8 md:px-14 py-24 text-center">
          <p className="font-sans text-[10px] tracking-[0.34em] uppercase text-[#c9a24c] mb-6">
            {t.footer.ctaLabel}
          </p>
          <h2 className="font-display font-medium text-[#f2f1ed] mb-10" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
            {t.footer.ctaHeadingLine1}<br />{t.footer.ctaHeadingLine2}
          </h2>
          <Link href="/booking" className="btn-primary">
            {t.footer.ctaButton}
          </Link>
        </div>
      </div>

      {/* Slim bar */}
      <div className="border-t border-[rgba(255,255,255,0.07)]">
        <div className="max-w-7xl mx-auto px-8 md:px-14 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="font-display font-semibold text-lg tracking-[0.1em] text-[#f2f1ed]">
            DETTAGLI
          </Link>

          <nav className="flex items-center gap-6">
            {[
              { label: t.footer.services, href: '/services' },
              { label: t.footer.about, href: '/about' },
              { label: t.footer.contact, href: '/contact' },
            ].map(item => (
              <Link key={item.label} href={item.href} className="text-xs text-[#55555c] hover:text-[#e8c878] transition-colors duration-300">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col items-center sm:items-end gap-1">
            <p className="font-sans text-[9px] text-[#55555c] tracking-[0.15em] uppercase">
              {t.footer.copyright}
            </p>
            <p className="font-sans text-[9px] text-[#3a3a40] tracking-[0.1em]">
              Designed &amp; Developed by{' '}
              <span className="text-[#55555c]">Mateo Polloni</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
