'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function LanguageToggle({ className = '' }: { className?: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div className={`flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase ${className}`}>
      <button
        onClick={() => setLocale('en')}
        className={locale === 'en' ? 'text-[#e8c878]' : 'text-[#55555c] hover:text-[#9a9a9e] transition-colors'}
      >
        EN
      </button>
      <span className="text-[#2a2a2f]">/</span>
      <button
        onClick={() => setLocale('es')}
        className={locale === 'es' ? 'text-[#e8c878]' : 'text-[#55555c] hover:text-[#9a9a9e] transition-colors'}
      >
        ES
      </button>
    </div>
  );
}
