import Image from 'next/image';
import Link from 'next/link';
import {
  Axe,
  Scissors,
  Drill,
  Siren,
  Heart,
  Trash2,
  ChevronRight,
  LucideIcon,
} from 'lucide-react';
import { urlFor } from '@/lib/sanity.image';
import type { Service, SanityImage, SiteContent } from '@/lib/types';

interface ServicesProps {
  services: Service[];
  image?: SanityImage;
  content?: Pick<SiteContent, 'servicesHeadline' | 'servicesSubtext' | 'servicesFooterText'> | null;
}

const iconMap: Record<string, LucideIcon> = {
  Axe,
  Scissors,
  Drill,
  Siren,
  Heart,
  Trash2,
};

export function Services({ services, image, content }: ServicesProps) {
  const imageUrl = image?.asset
    ? urlFor(image).width(800).height(600).url()
    : null;

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {imageUrl && (
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={imageUrl}
                alt={image?.alt || 'Professional tree care services'}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}

          <div className={imageUrl ? '' : 'lg:col-span-2 max-w-3xl mx-auto'}>
            <h2 className="text-3xl md:text-4xl font-bold text-tree-green mb-3">
              {content?.servicesHeadline || 'Our Tree Care Services'}
            </h2>
            <p className="text-gray-600 mb-8">
              {content?.servicesSubtext || 'Professional tree services for residential and commercial properties in Harrisburg and surrounding areas.'}
            </p>

            <div className="space-y-5">
              {services.map((service) => {
                const Icon = iconMap[service.icon] || Axe;

                return (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-11 h-11 rounded-lg bg-tree-green/10 flex items-center justify-center shrink-0 group-hover:bg-tree-green transition-colors">
                      <Icon className="h-5 w-5 text-tree-green group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-tree-green-dark flex items-center gap-1">
                        {service.title}
                        <ChevronRight className="h-4 w-4 opacity-0 -translate-x-1 group-hover:opacity-50 group-hover:translate-x-0 transition-all" />
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {content?.servicesFooterText && (
              <p className="text-gray-600 mt-8 text-sm">
                {content.servicesFooterText}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
