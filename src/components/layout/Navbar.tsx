'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import LanguageToggle from '@/components/ui/LanguageToggle';

export default function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const links = [
    { label: t.nav.links.services, href: '/services' },
    { label: t.nav.links.booking, href: '/booking' },
    { label: t.nav.links.quote, href: '/quote' },
    { label: t.nav.links.about, href: '/about' },
    { label: t.nav.links.contact, href: '/contact' },
  ];

  // The header is a normal in-flow element (no position: fixed/sticky at
  // all) — on this device, both of those broke permanently the moment you
  // scrolled away from the top, only resetting if you scrolled back to
  // scrollY 0. That's the browser's own internal "stuck" tracking failing,
  // not something we can fix by tuning CSS values further. This bypasses
  // that mechanism entirely: a scroll listener explicitly transforms the
  // header by the current scroll distance every frame, so it's never
  // relying on the browser to remember anything — it's recomputed from
  // scratch on every single scroll event.
  useEffect(() => {
    let ticking = false;
    const apply = () => {
      ticking = false;
      const el = headerRef.current;
      if (el) el.style.transform = `translateY(${window.scrollY}px)`;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Lock background scroll while the menu is open. Deliberately NOT using
  // `position: fixed` on body here — per spec, a `position: fixed` ancestor
  // creates a new containing block for ITS OWN fixed-position descendants,
  // which would hijack the menu overlay itself, detaching it from the real
  // viewport. `overflow: hidden` + `overscroll-behavior` achieves the same
  // lock on modern iOS Safari without that hazard.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement.style;
    const body = document.body.style;
    const prevHtmlOverflow = html.overflow;
    const prevBodyOverflow = body.overflow;
    const prevOverscroll = html.overscrollBehaviorY;
    html.overflow = 'hidden';
    body.overflow = 'hidden';
    html.overscrollBehaviorY = 'none';
    return () => {
      html.overflow = prevHtmlOverflow;
      body.overflow = prevBodyOverflow;
      html.overscrollBehaviorY = prevOverscroll;
    };
  }, [open]);

  return (
    <>
      <header
        ref={headerRef}
        className="relative z-50 bg-[#0a0a0c] border-b border-[rgba(255,255,255,0.07)] will-change-transform"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="font-display font-semibold text-2xl tracking-[0.1em] text-[#f2f1ed] hover:text-[#e8c878] transition-colors duration-300"
            onClick={() => setOpen(false)}
          >
            DETTAGLI
          </Link>

          <div className="flex items-center gap-6">
            <LanguageToggle />

            <button
              onClick={() => setOpen(o => !o)}
              className="flex items-center gap-3 text-[#f2f1ed] group"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#9a9a9e] group-hover:text-[#f2f1ed] transition-colors hidden sm:inline">
                {open ? t.nav.close : t.nav.menu}
              </span>
              <span className="relative w-6 h-4 flex flex-col justify-between">
                <span
                  className="block h-px bg-current transition-all duration-300 origin-center"
                  style={{ transform: open ? 'translateY(7.5px) rotate(45deg)' : 'none' }}
                />
                <span
                  className="block h-px bg-current transition-opacity duration-300"
                  style={{ opacity: open ? 0 : 1 }}
                />
                <span
                  className="block h-px bg-current transition-all duration-300 origin-center"
                  style={{ transform: open ? 'translateY(-7.5px) rotate(-45deg)' : 'none' }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu overlay — stays position: fixed. Unlike the
          header, this covers the entire viewport (inset-0) and has never
          shown the detachment bug, so there's no reason to change it. */}
      <div
        className={`fixed inset-0 z-40 bg-[#0a0a0c] overflow-y-auto transition-opacity duration-500 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="min-h-full flex flex-col justify-center px-8 md:px-20 py-28">
          <nav className="flex flex-col gap-2">
            {links.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-6 py-3 border-b border-[rgba(255,255,255,0.06)]"
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.5s ease ${open ? i * 60 : 0}ms, transform 0.5s ease ${open ? i * 60 : 0}ms`,
                }}
              >
                <span className="font-mono text-xs text-[#55555c]">0{i + 1}</span>
                <span className="font-display font-medium text-[#f2f1ed] group-hover:text-[#e8c878] transition-colors duration-300" style={{ fontSize: 'clamp(32px, 6vw, 64px)' }}>
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="mt-16 flex flex-col sm:flex-row sm:items-center gap-8 sm:gap-16 text-[#9a9a9e] text-sm">
            <div>
              <div className="font-sans text-[9px] tracking-[0.28em] uppercase text-[#55555c] mb-2">{t.nav.studio}</div>
              {t.nav.studioValue}
            </div>
            <div>
              <div className="font-sans text-[9px] tracking-[0.28em] uppercase text-[#55555c] mb-2">{t.nav.contact}</div>
              concierge@dettagli.com
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
