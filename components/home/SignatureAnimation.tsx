'use client';

/**
 * Signature "shovel → ELW" hero mark.
 *
 * This is the CONCEPT-INDEPENDENT scaffolding: SVG stroke-draw (stroke-dashoffset),
 * staggered timing, reduced-motion fallback, and once-per-session playback.
 * Swap the <path> data below for the chosen monogram (e.g. concept-3-seal.svg) —
 * keep `pathLength="1"` and the `signature-stroke` class and the animation just works.
 *
 * - prefers-reduced-motion: users see the final composed mark, no drawing (see globals.css).
 * - once per session: sessionStorage guard means route changes don't replay it.
 */

import { useEffect, useState } from 'react';

export function SignatureAnimation({ className = '' }: { className?: string }) {
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('elw-signature-played') === '1') {
        setAlreadyPlayed(true);
      } else {
        sessionStorage.setItem('elw-signature-played', '1');
      }
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <svg
      viewBox="0 0 300 130"
      role="img"
      aria-label="E L W"
      className={`signature ${alreadyPlayed ? 'is-static' : ''} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Shovel (draws first) — placeholder glyph, swap with the real source path */}
      <path
        className="signature-stroke"
        style={{ animationDelay: '0ms' }}
        pathLength={1}
        d="M150 8 v34 M138 42 h24 M141 42 c-2 12 3 20 9 20 s11 -8 9 -20"
      />
      {/* E */}
      <path
        className="signature-stroke"
        style={{ animationDelay: '500ms' }}
        pathLength={1}
        d="M70 78 H44 V122 H70 M44 100 H64"
      />
      {/* L */}
      <path
        className="signature-stroke"
        style={{ animationDelay: '750ms' }}
        pathLength={1}
        d="M118 78 V122 H146"
      />
      {/* W */}
      <path
        className="signature-stroke"
        style={{ animationDelay: '1000ms' }}
        pathLength={1}
        d="M176 78 L190 122 L204 92 L218 122 L232 78"
      />
    </svg>
  );
}
