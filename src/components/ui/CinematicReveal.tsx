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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Video plays on every screen size — phones included, for the same
  // cinematic impact as desktop. The only opt-outs are explicit user/system
  // signals: reduced-motion preference or an active Data Saver mode.
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;

    setReducedMotion(motionQuery.matches);
    setShowVideo(!motionQuery.matches && !saveData);

    const onChange = () => {
      setReducedMotion(motionQuery.matches);
      setShowVideo(!motionQuery.matches && !saveData);
    };
    motionQuery.addEventListener('change', onChange);
    return () => motionQuery.removeEventListener('change', onChange);
  }, []);

  // Some mobile browsers won't honor the `autoplay` attribute reliably once
  // the element mounts post-hydration — an explicit play() call covers that.
  // If playback genuinely can't start, fall back to the static poster rather
  // than show a frozen/black video frame.
  useEffect(() => {
    if (!showVideo) return;
    const el = videoRef.current;
    if (!el) return;
    const playPromise = el.play();
    if (playPromise) playPromise.catch(() => setVideoFailed(true));
  }, [showVideo]);

  // The unveiling — a brief, deliberate pause before the cover draws back.
  // This is the only transform animation on the media layer: a single
  // mount-time transition, never re-triggered by scroll (a scroll-linked
  // version of this previously fought its own 2.4s transition on every
  // scroll frame, producing a laggy, jumpy feel — especially on iOS Safari).
  useEffect(() => {
    if (reducedMotion) {
      setRevealed(true);
      return;
    }
    const t = setTimeout(() => setRevealed(true), 400);
    return () => clearTimeout(t);
  }, [reducedMotion]);

  const useVideo = showVideo && !videoFailed;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ isolation: 'isolate', contain: 'paint' }}
    >
      <div
        className="absolute inset-0 transition-transform duration-[2400ms]"
        style={{
          transform: `scale(${revealed ? 1.04 : 1.18})`,
          transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)',
        }}
      >
        {useVideo ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={poster}
            aria-label={alt}
            draggable={false}
            onError={() => setVideoFailed(true)}
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
