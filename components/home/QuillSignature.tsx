/**
 * The ELW quill signature — the single source for the drawn "signature" mark.
 *
 * One continuous line: a shovel blade (spade) that becomes a feather quill,
 * trailing off into the "elw" script. Source art: _incoming/brand/
 * elw-quill-logo-staggered.svg (stroke-only, currentColor).
 *
 * Used two ways so the two never drift apart:
 *   - animated  → the full-screen IntroSignature draws it, segment by segment.
 *   - static    → the small mark atop the NewsletterPopup modal.
 *
 * Drawing/timing lives in globals.css (.intro-stroke); this owns only the art
 * and the per-segment stagger (duration + delay). Not a client component — it
 * has no state, so it renders fine inside server or client trees.
 */

// Draw order: spade, then feather, then script. Each starts where the last ends,
// so the staggered delays read as one unbroken stroke.
const SEGMENTS = [
  {
    id: 'spade',
    duration: '0.9s',
    delay: '0s',
    d: 'M36,104 C52,78 88,66 122,79 C139,87 139,118 119,125 C87,135 51,124 36,104 L122,102 L200,102',
  },
  {
    id: 'feather',
    duration: '1.4s',
    delay: '0.75s',
    d: 'M200,102 C218,114 240,118 258,112 C254,118 257,122 265,119 C288,112 306,106 322,98 C318,104 321,108 330,104 C352,93 374,80 390,60 C356,44 296,46 248,68 C224,78 206,92 200,102 C248,94 322,82 390,60 C397,78 396,94 402,102',
  },
  {
    id: 'script',
    duration: '1.9s',
    delay: '1.95s',
    d: 'M402,102 C420,134 460,122 482,113 C492,109 501,101 504,92 C506,84 496,83 491,92 C485,103 489,115 502,116 C510,117 516,113 520,108 C528,94 533,72 534,60 C535,51 527,51 526,62 C524,82 528,105 536,114 C541,119 547,114 551,108 C555,99 558,93 560,90 C563,88 564,92 564,97 C564,104 565,111 569,114 C574,117 579,111 581,103 C583,96 585,91 587,89 C590,88 591,92 591,97 C591,104 592,111 596,114 C601,117 607,110 609,101 C611,94 614,90 618,90 C622,91 622,97 617,100',
  },
];

interface QuillSignatureProps {
  animated?: boolean;
  className?: string;
  title?: string;
}

export function QuillSignature({
  animated = false,
  className,
  title = 'E.L. Westbury',
}: QuillSignatureProps) {
  return (
    <svg
      viewBox="0 0 660 190"
      className={className}
      role="img"
      aria-label={title}
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {SEGMENTS.map((seg) =>
        animated ? (
          <path
            key={seg.id}
            d={seg.d}
            className="intro-stroke"
            pathLength={1}
            style={{ animationDuration: seg.duration, animationDelay: seg.delay }}
          />
        ) : (
          <path key={seg.id} d={seg.d} />
        ),
      )}
    </svg>
  );
}
