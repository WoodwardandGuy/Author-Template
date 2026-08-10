'use client';

import { useState } from 'react';
import type { Praise as PraiseItem, SiteContent } from '@/lib/types';

interface PraiseProps {
  praise: PraiseItem[];
  content?: Pick<SiteContent, 'praiseHeadline'> | null;
}

export function Praise({ praise }: PraiseProps) {
  const [active, setActive] = useState(0);
  if (praise.length === 0) return null;

  const item = praise[Math.min(active, praise.length - 1)];

  return (
    <section className="border-t border-ink/10 bg-ivory">
      <div className="mx-auto max-w-[1000px] px-[clamp(20px,4vw,48px)] py-[clamp(64px,8vw,92px)] text-center">
        <blockquote>
          <p className="text-pretty font-display text-[clamp(22px,2.8vw,34px)] italic leading-[1.45] text-ink">
            &ldquo;{item.quote}&rdquo;
          </p>
          <footer className="mt-7 text-[12px] uppercase tracking-[0.2em] text-ink/55">
            {item.attribution}
            {item.source ? ` · ${item.source}` : ''}
          </footer>
        </blockquote>

        {praise.length > 1 && (
          <div className="mt-[34px] flex justify-center gap-[10px]">
            {praise.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                aria-label={`Show praise ${i + 1}`}
                aria-current={i === active}
                className={`h-[7px] w-[7px] rounded-full transition-colors ${
                  i === active ? 'bg-brass' : 'bg-ink/20 hover:bg-ink/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
