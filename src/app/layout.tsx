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

export const viewport: Viewport = {
  themeColor: '#0a0a0c',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} ${geistMono.variable}`}>
      <body className="min-h-dvh flex flex-col bg-[#0a0a0c] text-[#f2f1ed] antialiased">
        <LanguageProvider>
          <PrecisionCursor />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
