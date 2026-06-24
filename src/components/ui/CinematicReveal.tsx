'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface CinematicRevealProps {
  videoSrc: string;
  poster: string;
  alt: string;
  className?: string;
}

export default function CinematicReveal({ videoSrc, poster, alt, className = '' }: CinematicRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [offset, setOffset] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Video only loads on larger screens with motion enabled — phones and
  // data-saver / reduced-motion visitors get the static poster instead.
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sizeQuery = window.matchMedia('(min-width: 768px)');
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;

    setReducedMotion(motionQuery.matches);
    setShowVideo(sizeQuery.matches && !motionQuery.matches && !saveData);

    const onChange = () => {
      setReducedMotion(motionQuery.matches);
      setShowVideo(sizeQuery.matches && !motionQuery.matches && !saveData);
    };
    motionQuery.addEventListener('change', onChange);
    sizeQuery.addEventListener('change', onChange);
    return () => {
      motionQuery.removeEventListener('change', onChange);
      sizeQuery.removeEventListener('change', onChange);
    };
  }, []);

  // The unveiling — a brief, deliberate pause before the cover draws back.
  useEffect(() => {
    if (reducedMotion) {
      setRevealed(true);
      return;
    }
    const t = setTimeout(() => setRevealed(true), 400);
    return () => clearTimeout(t);
  }, [reducedMotion]);

  // Slow parallax drift while the stage is in view.
  useEffect(() => {
    if (reducedMotion) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const el = rootRef.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.bottom > 0 && rect.top < window.innerHeight) {
            setOffset(window.scrollY * 0.12);
          }
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 transition-transform duration-[2400ms]"
        style={{
          transform: `scale(${revealed ? 1.04 : 1.18}) translateY(${offset}px)`,
          transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)',
        }}
      >
        {showVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={poster}
            aria-label={alt}
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={poster}
            alt={alt}
            fill
            priority
            sizes="100vw"
            draggable={false}
            className="object-cover pointer-events-none select-none"
          />
        )}
      </div>

      {/* Dark veil, drawn back like a cover removed at a private unveiling */}
      <div
        className="absolute inset-0 bg-[#0a0a0c] pointer-events-none"
        style={{
          opacity: revealed ? 0 : 1,
          transition: 'opacity 2200ms cubic-bezier(0.19, 1, 0.22, 1) 200ms',
        }}
      />

      {/* A single light sweep crossing once as the cover lifts */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          background: 'linear-gradient(100deg, transparent 35%, rgba(255,255,255,0.5) 50%, transparent 65%)',
          transform: revealed ? 'translateX(60%)' : 'translateX(-60%)',
          opacity: revealed ? 0 : 0.9,
          transition: 'transform 1800ms cubic-bezier(0.19, 1, 0.22, 1) 300ms, opacity 1800ms ease 300ms',
        }}
      />
    </div>
  );
}
