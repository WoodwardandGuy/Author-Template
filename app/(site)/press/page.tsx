import type { Metadata } from 'next';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { urlFor } from '@/lib/sanity.image';
import { getPress } from '@/lib/sanity.fetch';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Press',
  description: 'Media coverage, interviews, and features.',
  alternates: { canonical: '/press' },
  openGraph: {
    title: 'Press',
    description: 'Media coverage, interviews, and features.',
    url: `${SITE_URL}/press`,
    type: 'website',
  },
};

export default async function PressPage() {
  const press = await getPress();

  return (
    <>
      <div className="bg-white/[0.04] py-4">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Press</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-bone mb-4 tracking-tight">
            Press
          </h1>
          <p className="text-xl text-bone-dim leading-relaxed mb-12">
            Interviews, features, and coverage.
          </p>

          {press.length > 0 ? (
            <ul className="divide-y divide-line">
              {press.map((item) => {
                const logoUrl = item.logo?.asset
                  ? urlFor(item.logo).width(240).url()
                  : null;
                const dateLabel = item.date
                  ? new Date(item.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : null;
                const Wrapper: any = item.url ? 'a' : 'div';
                const wrapperProps = item.url
                  ? { href: item.url, target: '_blank', rel: 'noopener noreferrer' }
                  : {};
                return (
                  <li key={item.id} className="py-8">
                    <Wrapper {...wrapperProps} className="group block">
                      {logoUrl ? (
                        <Image
                          src={logoUrl}
                          alt={item.logo?.alt || item.outlet}
                          width={120}
                          height={40}
                          className="h-8 w-auto object-contain mb-3 opacity-80"
                        />
                      ) : (
                        <p className="text-sm font-semibold uppercase tracking-wide text-moss mb-2">
                          {item.outlet}
                        </p>
                      )}
                      <p className="text-lg md:text-xl text-bone leading-relaxed group-hover:text-bone">
                        {item.headline}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-bone-dim mt-2">
                        {dateLabel && <span>{dateLabel}</span>}
                        {item.url && (
                          <span className="inline-flex items-center gap-1 text-bone font-medium group-hover:text-wine-light transition-colors">
                            Read
                            <ExternalLink className="h-3.5 w-3.5" />
                          </span>
                        )}
                      </div>
                    </Wrapper>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-bone-dim text-lg py-8">
              Coverage will appear here as it comes in.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
