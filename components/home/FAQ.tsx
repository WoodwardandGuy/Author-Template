'use client';

import { useState } from 'react';
import type { FAQItem, SiteContent } from '@/lib/types';

interface FAQProps {
  items: FAQItem[];
  content?: Pick<SiteContent, 'faqHeadline' | 'faqSubtext'> | null;
}

export function FAQ({ items, content }: FAQProps) {
  // First item open by default; only one open at a time. -1 = all closed.
  const [open, setOpen] = useState(0);
  if (items.length === 0) return null;

  return (
    <section className="border-t border-ink/10 bg-ivory">
      <div className="mx-auto max-w-[1000px] px-[clamp(20px,4vw,48px)] py-[clamp(64px,8vw,92px)]">
        <h2 className="mb-10 font-display text-[clamp(30px,5vw,42px)] leading-tight text-ink">
          {content?.faqHeadline || 'Questions'}
        </h2>

        <div>
          {items.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.id} className="border-t border-ink/[0.14]">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-[26px] text-left"
                >
                  <span className="text-[20px] text-ink">{faq.question}</span>
                  <span
                    aria-hidden
                    className="shrink-0 font-display text-[24px] leading-none text-brass"
                  >
                    {isOpen ? '–' : '+'}
                  </span>
                </button>
                <div
                  className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen
                      ? 'grid-rows-[1fr] pb-[26px] opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="min-h-0">
                    <p className="max-w-[660px] text-[16px] leading-[1.9] text-ink/68">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
