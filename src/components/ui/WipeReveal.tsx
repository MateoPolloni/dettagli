'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface WipeRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function WipeReveal({ children, delay = 0, className = '' }: WipeRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    const check = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
      if (inView) {
        setTimeout(() => setVisible(true), delay);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(check);
      }
    };

    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [delay, visible]);

  return (
    <div ref={ref} className={visible ? 'wipe-visible' : 'wipe-hidden'}>
      <div className={className}>
        {children}
      </div>
    </div>
  );
}
