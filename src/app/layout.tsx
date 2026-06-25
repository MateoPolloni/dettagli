import type { Metadata, Viewport } from 'next';
import { Cormorant, Manrope, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PrecisionCursor from '@/components/ui/PrecisionCursor';
import DebugOverlay from '@/components/ui/DebugOverlay';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';

const cormorant = Cormorant({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-mono-label',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dettagli — Esclusivo Detailing per Auto da Collezione',
  description:
    'Premium detailing for exotic and high-end vehicles. Paint correction, ceramic coating, and concours-level care for the world\'s finest automobiles.',
};

// theme-color removed as a test — it tints Safari's own UI chrome
// (including its collapsed address-bar pill), which is a candidate for
// the unexplained dark/blank pill the user spotted next to the clock.
export const viewport: Viewport = {};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} ${geistMono.variable}`}>
      <head>
        {/* Cuts DNS/TLS handshake time off the hero video/poster fetch */}
        <link rel="preconnect" href="https://videos.pexels.com" />
        <link rel="preconnect" href="https://images.pexels.com" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#0a0a0c] text-[#f2f1ed] antialiased">
        <LanguageProvider>
          <PrecisionCursor />
          <Navbar />
          {/*
            The header's own position is now confirmed correct via the
            debug overlay (build-r11). The remaining bug is separate: stale
            content from sections already scrolled past stays painted,
            frozen, at the very top of the screen overlapping the status
            bar/navbar — a WebKit compositing bug, not a layout bug. Forcing
            `main` onto its own promoted GPU layer is the standard fix for
            this exact class of stale-paint-during-scroll bug.
          */}
          <main className="flex-1" style={{ transform: 'translateZ(0)' }}>{children}</main>
          <Footer />
          {/* Temporary cache-verification marker — remove once confirmed fresh */}
          <div className="fixed bottom-1 left-1 z-[9999] pointer-events-none font-mono text-[8px] text-[#3a3a40]">
            build-r14-alliosfallback
          </div>
          {/* Temporary diagnostic overlay — remove once the gap bug is fixed */}
          <DebugOverlay />
        </LanguageProvider>
      </body>
    </html>
  );
}
