'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function ContactForm() {
  const { t } = useLanguage();
  const f = t.contactPage.form;
  const s = t.contactPage.success;
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="card-surface p-10 text-center animate-fade-in">
        <div className="font-display font-medium gradient-gold text-2xl mb-3">{s.heading}</div>
        <p className="text-sm text-[#9a9a9e]">
          {s.body(name.split(' ')[0] || s.fallbackName)}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          required
          placeholder={f.name}
          value={name}
          onChange={e => setName(e.target.value)}
          className="form-input"
        />
        <input
          type="email"
          required
          placeholder={f.email}
          className="form-input"
        />
      </div>

      <select defaultValue={f.subjectOptions[0]} className="form-input cursor-pointer">
        {f.subjectOptions.map(opt => <option key={opt}>{opt}</option>)}
      </select>

      <textarea
        required
        rows={5}
        placeholder={f.message}
        className="form-input resize-none"
      />

      <button type="submit" className="btn-primary w-full justify-center">
        {f.submit}
      </button>
    </form>
  );
}
