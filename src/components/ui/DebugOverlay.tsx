'use client';

import { useEffect, useState } from 'react';

export default function DebugOverlay() {
  const [stats, setStats] = useState<Record<string, string>>({});

  useEffect(() => {
    let frame = 0;
    let raf: number;

    const tick = () => {
      frame++;
      // Sample every few frames — enough to be live, not enough to thrash.
      if (frame % 4 === 0) {
        const vv = window.visualViewport;
        const header = document.querySelector('header');
        const rect = header?.getBoundingClientRect();
        const computedTransform = header ? getComputedStyle(header).transform : 'n/a';
        setStats({
          scrollY: String(Math.round(window.scrollY)),
          innerHeight: String(window.innerHeight),
          vvHeight: vv ? String(Math.round(vv.height)) : 'n/a',
          vvOffsetTop: vv ? String(Math.round(vv.offsetTop)) : 'n/a',
          vvScale: vv ? vv.scale.toFixed(3) : 'n/a',
          headerTop: rect ? rect.top.toFixed(1) : 'n/a',
          headerBottom: rect ? rect.bottom.toFixed(1) : 'n/a',
          headerTransform: computedTransform,
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="fixed top-0 right-0 z-[10000] pointer-events-none font-mono text-[9px] leading-tight text-lime-300 bg-black/85 p-2"
      style={{ maxWidth: '180px' }}
    >
      {Object.entries(stats).map(([k, v]) => (
        <div key={k}>{k}: {v}</div>
      ))}
    </div>
  );
}
