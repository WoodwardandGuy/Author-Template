import Image from 'next/image';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { urlFor } from '@/lib/sanity.image';
import { HeroContent } from '@/lib/types';

interface HeroProps {
  content: HeroContent;
}

export function Hero({ content }: HeroProps) {
  const hasImage = content.backgroundImage?.asset;
  const imageUrl = hasImage
    ? urlFor(content.backgroundImage).width(1920).height(1080).url()
    : null;

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
      {imageUrl ? (
        <>
          <Image
            src={imageUrl}
            alt={content.backgroundImage?.alt || 'Professional tree service'}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/25" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-tree-green via-tree-green-dark to-tree-brown" />
      )}

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {content.headline}
          </h1>

          <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed">
            {content.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Button
              asChild
              size="lg"
              className="bg-accent-orange hover:bg-accent-orange-dark text-white text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all"
            >
              <a href="#contact">{content.ctaText}</a>
            </Button>

            <Button
              asChild
              size="lg"
              className="bg-white text-tree-green hover:bg-gray-100 text-lg px-8 py-6 h-auto shadow-lg transition-all"
            >
              <a href={`tel:${content.phoneNumber.replace(/\D/g, '')}`}>
                <Phone className="mr-2 h-5 w-5" />
                {content.phoneNumber}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
