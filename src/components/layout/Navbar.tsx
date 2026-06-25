'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import LanguageToggle from '@/components/ui/LanguageToggle';

// Confirmed via WebKit Bugzilla #297779 and independently reported against
// other major sites (e.g. LinkedIn, via the Mastodon project's issue
// tracker, github.com/mastodon/mastodon/issues/36144): iOS 26 Safari has a
// system-level bug where window.visualViewport.offsetTop loses sync with
// the actual viewport during scroll/keyboard-dismissal, causing fixed and
// sticky elements to render away from their correctly-measured position by
// up to a full scroll's distance. Apple's own engineers have only
// partially fixed this as of iOS 26.1, with reports of it reappearing.
//
// Tried gating this fallback to "iOS 26+" specifically by reading the OS
// version out of the User-Agent string, but on-device testing showed it
// never matches even on a confirmed iOS 26 device — Safari has been
// freezing/reducing the OS version it reports in the UA string for
// fingerprinting-resistance, so version-sniffing isn't reliable here. The
// device type token (iPhone/iPad) isn't subject to that freezing, so we
// fall back for all iOS Safari rather than try to pinpoint a version.
function isIOSSafari(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  return /iP(hone|ad|od)/.test(ua) || (/Macintosh/.test(ua) && 'ontouchend' in document);
}

export default function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [staticHeader, setStaticHeader] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const links = [
    { label: t.nav.links.services, href: '/services' },
    { label: t.nav.links.booking, href: '/booking' },
    { label: t.nav.links.quote, href: '/quote' },
    { label: t.nav.links.about, href: '/about' },
    { label: t.nav.links.contact, href: '/contact' },
  ];

  useEffect(() => {
    const affected = isIOSSafari();
    setStaticHeader(affected);
    (window as typeof window & { __staticHeaderMode?: boolean }).__staticHeaderMode = affected;
  }, []);

  // Transparent-over-hero until scrolled, then solid + blurred — the
  // original premium look. This is purely a background-color/blur
  // transition on whichever positioning mode is active above; it doesn't
  // touch position/transform at all, so it's safe to use unconditionally
  // on both the JS-pinned header and the iOS Safari static fallback.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-driven "stays pinned to top" behavior — skipped entirely on iOS
  // Safari (see isIOSSafari above).
  useEffect(() => {
    if (staticHeader) return;
    let ticking = false;
    let lastGood = window.scrollY;
    let lowStreak = 0;

    const apply = () => {
      ticking = false;
      const current = window.scrollY;
      const looksGlitched = current <= 2 && lastGood > 40;

      if (looksGlitched) {
        lowStreak++;
        if (lowStreak < 4) {
          const el = headerRef.current;
          if (el) el.style.transform = `translate3d(0, ${lastGood}px, 0)`;
          (window as typeof window & { __headerAppliedY?: number }).__headerAppliedY = lastGood;
          return;
        }
      } else {
        lowStreak = 0;
      }

      lastGood = current;
      const el = headerRef.current;
      if (el) el.style.transform = `translate3d(0, ${current}px, 0)`;
      (window as typeof window & { __headerAppliedY?: number }).__headerAppliedY = current;
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
  }, [staticHeader]);

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
        className={`relative z-50 will-change-transform ${scrolled || open ? 'backdrop-blur-2xl' : ''}`}
        style={{
          ...(staticHeader ? {} : { transform: 'translate3d(0, 0, 0)' }),
          backgroundColor: scrolled || open ? 'rgba(10,10,12,0.98)' : 'transparent',
          borderBottom: scrolled || open ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
          transition: 'background-color 500ms ease, border-color 500ms ease',
        }}
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
