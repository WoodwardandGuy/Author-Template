'use client';

import { Quote } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import type { Praise as PraiseItem, SiteContent } from '@/lib/types';

interface PraiseProps {
  praise: PraiseItem[];
  content?: Pick<SiteContent, 'praiseHeadline'> | null;
}

export function Praise({ praise, content }: PraiseProps) {
  if (praise.length === 0) return null;

  return (
    <section id="praise" className="py-20 bg-soil-2">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-bone tracking-tight">
            {content?.praiseHeadline || 'Praise'}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {praise.map((item) => (
                <CarouselItem key={item.id}>
                  <blockquote className="text-center px-4 md:px-12">
                    <Quote className="h-10 w-10 text-bone/15 mx-auto mb-6" />
                    <p className="text-xl md:text-2xl lg:text-3xl font-medium text-bone italic leading-relaxed mb-8">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    <footer>
                      <p className="font-semibold text-bone text-lg">
                        {item.attribution}
                      </p>
                      {item.source && (
                        <p className="text-sm text-bone-dim">{item.source}</p>
                      )}
                    </footer>
                  </blockquote>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4" />
            <CarouselNext className="hidden md:flex -right-4" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
