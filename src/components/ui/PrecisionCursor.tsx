'use client';

import { useEffect, useRef, useState } from 'react';

export default function PrecisionCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none)').matches) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest('a, button, [role="button"], input, textarea, select');
      setHovering(!!el);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });

    const tick = () => {
      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;
      current.current.x += dx * 0.22;
      current.current.y += dy * 0.22;

      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${current.current.x}px, ${current.current.y}px) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform hidden md:block"
    >
      <div
        className="rounded-full border transition-all duration-200 ease-out"
        style={{
          width: hovering ? 44 : 22,
          height: hovering ? 44 : 22,
          borderColor: 'rgba(201,162,76,0.7)',
          borderWidth: 1,
          background: hovering ? 'rgba(201,162,76,0.08)' : 'transparent',
        }}
      />
      <div
        className="absolute rounded-full bg-[#e8c878] transition-opacity duration-200"
        style={{
          width: 3,
          height: 3,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: hovering ? 0 : 1,
        }}
      />
    </div>
  );
}
