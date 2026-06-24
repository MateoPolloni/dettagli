'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function BookingForm() {
  const { t } = useLanguage();
  const f = t.bookingPage.form;
  const s = t.bookingPage.success;
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [service, setService] = useState<string>(f.serviceOptions[0]);
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="card-surface p-10 text-center animate-fade-in">
        <div className="font-display font-medium gradient-gold text-2xl mb-3">{s.heading}</div>
        <p className="text-sm text-[#9a9a9e]">
          {s.body(name.split(' ')[0] || s.fallbackName, date || s.fallbackDate)}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          required
          placeholder={f.vehicle}
          className="form-input"
        />
        <input
          type="tel"
          placeholder={f.phone}
          className="form-input"
        />
      </div>

      <select
        value={service}
        onChange={e => setService(e.target.value)}
        className="form-input cursor-pointer"
      >
        {f.serviceOptions.map(opt => <option key={opt}>{opt}</option>)}
      </select>

      <input
        type="date"
        required
        value={date}
        onChange={e => setDate(e.target.value)}
        className="form-input"
      />

      <textarea
        rows={4}
        placeholder={f.notes}
        className="form-input resize-none"
      />

      <button type="submit" className="btn-primary w-full justify-center">
        {f.submit}
      </button>
    </form>
  );
}
