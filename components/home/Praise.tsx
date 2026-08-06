'use client';

import { Star, Quote } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import type { Testimonial, SiteContent } from '@/lib/types';

interface TestimonialsProps {
  testimonials: Testimonial[];
  content?: Pick<SiteContent, 'testimonialsHeadline' | 'testimonialsRatingText'> | null;
}

export function Testimonials({ testimonials, content }: TestimonialsProps) {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-tree-green mb-4">
            {content?.testimonialsHeadline || 'What Our Customers Say'}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id}>
                  <blockquote className="text-center px-4 md:px-12">
                    <Quote className="h-10 w-10 text-tree-green/20 mx-auto mb-6" />
                    <p className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-800 italic leading-relaxed mb-8">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
                    <footer>
                      <div className="flex justify-center mb-3">
                        {Array.from({ length: testimonial.rating }).map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="h-5 w-5 text-accent-orange fill-current"
                            />
                          ),
                        )}
                      </div>
                      <p className="font-semibold text-tree-green-dark text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.location}
                      </p>
                    </footer>
                  </blockquote>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4" />
            <CarouselNext className="hidden md:flex -right-4" />
          </Carousel>
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-tree-green/10 rounded-full px-6 py-3">
            <Star className="h-6 w-6 text-accent-orange fill-current" />
            <span className="text-gray-700">
              {content?.testimonialsRatingText || '5.0 Average Rating \u2022 127 Reviews'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
