import type { Metadata, Viewport } from 'next';
import { Cormorant, Manrope, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PrecisionCursor from '@/components/ui/PrecisionCursor';
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

// Required for env(safe-area-inset-*) to resolve to non-zero values on
// notched/Dynamic-Island devices — without it those always evaluate to 0,
// which is also why it has zero effect on devices without a cutout.
export const viewport: Viewport = {
  themeColor: '#0a0a0c',
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} ${geistMono.variable}`}>
      <head>
        {/* Cuts DNS/TLS handshake time off the hero video/poster fetch */}
        <link rel="preconnect" href="https://videos.pexels.com" />
        <link rel="preconnect" href="https://images.pexels.com" />
      </head>
      <body className="min-h-dvh flex flex-col bg-[#0a0a0c] text-[#f2f1ed] antialiased">
        <LanguageProvider>
          <PrecisionCursor />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          {/* Temporary cache-verification marker — remove once confirmed fresh */}
          <div className="fixed bottom-1 left-1 z-[9999] pointer-events-none font-mono text-[8px] text-[#3a3a40]">
            build-r3-envstrip
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
