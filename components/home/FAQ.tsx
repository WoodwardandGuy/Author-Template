'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { FAQItem, SiteContent } from '@/lib/types';

interface FAQProps {
  items: FAQItem[];
  content?: Pick<SiteContent, 'faqHeadline' | 'faqSubtext'> | null;
}

export function FAQ({ items, content }: FAQProps) {
  if (items.length === 0) return null;

  return (
    <section className="py-20 border-t border-line">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-bone mb-3 text-center">
            {content?.faqHeadline || 'Frequently Asked Questions'}
          </h2>
          <p className="text-bone-dim text-center mb-10">
            {content?.faqSubtext || 'Answers to what readers ask most.'}
          </p>

          <Accordion type="single" collapsible className="space-y-3">
            {items.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border border-line rounded-lg px-6 data-[state=open]:border-line/30 transition-colors"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-bone hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-bone-dim leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
