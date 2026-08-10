'use client';

/**
 * Full-screen signature intro.
 *
 * On the first page of a session, the ELW quill signature draws itself
 * (spade → feather → script), a tagline fades in, and the overlay lifts to
 * reveal the site. The artwork is the shared Signature (initials) mark.
 *
 * - Once per session: a sessionStorage guard means route changes don't replay it.
 * - prefers-reduced-motion: the composed mark shows briefly with no drawing.
 * - The draw + tagline timing lives in globals.css (.intro-stroke / .intro-tag);
 *   this component owns the session guard, the fade-out, and unmount.
 */

import { useEffect, useState } from 'react';
import { Signature } from '@/components/home/Signature';

const PLAYED_KEY = 'elw-intro-played';

export function IntroSignature() {
  const [phase, setPhase] = useState<'hidden' | 'playing' | 'leaving'>('hidden');

  useEffect(() => {
    let played = false;
    try {
      played = sessionStorage.getItem(PLAYED_KEY) === '1';
    } catch {
      played = false;
    }
    if (played) return;
    try {
      sessionStorage.setItem(PLAYED_KEY, '1');
    } catch {
      /* ignore */
    }

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Intentional: reveal the intro once on mount after reading the sessionStorage
    // guard (which can't run during SSR / in a lazy initializer).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhase('playing');
    // Initials draw in ~3.4s, tagline in at ~3.4s, then ~1.5s of linger so the
    // finished monogram reads before the page reveal, then a 0.9s fade.
    const total = reduced ? 1600 : 5800;
    const leaveAt = total - 900; // begin the opacity fade before unmount

    const t1 = setTimeout(() => setPhase('leaving'), leaveAt);
    const t2 = setTimeout(() => setPhase('hidden'), total);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === 'hidden') return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-soil text-bone transition-opacity duration-[900ms] ease-out ${
        phase === 'leaving' ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center">
        <Signature animated className="h-auto w-[min(460px,82vw)] overflow-visible" />
        <p className="intro-tag mt-6 text-center text-xs uppercase tracking-[0.42em] text-white/60">
          E.L. Westbury&nbsp;&nbsp;·&nbsp;&nbsp;dig in
        </p>
      </div>
    </div>
  );
}
