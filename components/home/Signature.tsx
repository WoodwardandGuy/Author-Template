/**
 * E.L. Westbury initials monogram — the drawn "signature" mark.
 *
 * A single continuous cursive stroke of her initials (elw). Source art:
 * _incoming/brand/elw-initials.svg (stroke-only, currentColor).
 *
 * Used two ways so the two never drift apart:
 *   - animated → the full-screen IntroSignature draws it in one stroke.
 *   - static   → the small mark atop the NewsletterPopup modal and in the footer.
 *
 * Drawing/timing lives in globals.css (.intro-stroke); this owns only the art.
 */

const INITIALS_PATH =
  'M12,62 C30,94 70,82 92,73 C102,69 111,61 114,52 C116,44 106,43 101,52 ' +
  'C95,63 99,75 112,76 C120,77 126,73 130,68 C138,54 143,32 144,20 ' +
  'C145,11 137,11 136,22 C134,42 138,65 146,74 C151,79 157,74 161,68 ' +
  'C165,59 168,53 170,50 C173,48 174,52 174,57 C174,64 175,71 179,74 ' +
  'C184,77 189,71 191,63 C193,56 195,51 197,49 C200,48 201,52 201,57 ' +
  'C201,64 202,71 206,74 C211,77 217,70 219,61 C221,54 224,50 228,50 ' +
  'C232,51 232,57 227,60';

interface SignatureProps {
  animated?: boolean;
  className?: string;
  title?: string;
}

export function Signature({
  animated = false,
  className,
  title = 'E.L. Westbury',
}: SignatureProps) {
  return (
    <svg
      viewBox="0 0 250 110"
      className={className}
      role="img"
      aria-label={title}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {animated ? (
        <path d={INITIALS_PATH} className="intro-stroke" pathLength={1} />
      ) : (
        <path d={INITIALS_PATH} />
      )}
    </svg>
  );
}
