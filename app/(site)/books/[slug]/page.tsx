import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { urlFor } from '@/lib/sanity.image';
import { getServiceBySlug, getServiceSlugs, getCompanyInfo, getServiceAreasWithSlugs } from '@/lib/sanity.fetch';

const BASE_URL = 'https://www.treeprofessionalsofharrisburg.com';

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};

  const title = `${service.title} in Harrisburg, PA | Tree Professionals of Harrisburg`;
  const description = service.metaDescription || `Professional ${service.title.toLowerCase()} services in Harrisburg, PA and surrounding areas. Licensed, insured, and available 24/7. Get your free quote today.`;

  return {
    title,
    description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/services/${service.slug}`,
      type: 'website',
      ...(service.featuredImage?.asset && {
        images: [{
          url: urlFor(service.featuredImage).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: service.featuredImage.alt,
        }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

function generateServiceSchema(
  service: { title: string; description: string; slug: string },
  serviceAreas: { name: string; state: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Tree Professionals of Harrisburg',
      url: BASE_URL,
    },
    areaServed: serviceAreas.map((area) => ({
      '@type': 'City',
      name: area.name,
      containedInPlace: { '@type': 'State', name: area.state || 'Pennsylvania' },
    })),
    url: `${BASE_URL}/services/${service.slug}`,
  };
}

function generateBreadcrumbSchema(service: { title: string; slug: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${BASE_URL}/services` },
      { '@type': 'ListItem', position: 3, name: service.title, item: `${BASE_URL}/services/${service.slug}` },
    ],
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [service, companyInfo, serviceAreas] = await Promise.all([
    getServiceBySlug(slug),
    getCompanyInfo(),
    getServiceAreasWithSlugs(),
  ]);

  if (!service) notFound();

  const imageUrl = service.featuredImage?.asset
    ? urlFor(service.featuredImage).width(1200).height(675).url()
    : null;

  const serviceSchema = generateServiceSchema(service, serviceAreas);
  const breadcrumbSchema = generateBreadcrumbSchema(service);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="bg-tree-green/5 py-4">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/#services">Services</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{service.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-tree-green mb-6">
            Professional {service.title} in Harrisburg, PA
          </h1>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            {service.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button
              asChild
              className="bg-accent-orange hover:bg-accent-orange-dark text-white h-12 px-8 text-lg"
            >
              <Link href="/#contact">
                Get a Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 px-8 text-lg border-tree-green text-tree-green hover:bg-tree-green hover:text-white"
            >
              <a href={`tel:${companyInfo.phone.replace(/\D/g, '')}`}>
                <Phone className="mr-2 h-5 w-5" />
                {companyInfo.phone}
              </a>
            </Button>
          </div>

          {imageUrl && (
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg mb-12">
              <Image
                src={imageUrl}
                alt={service.featuredImage?.alt || `${service.title} in Harrisburg, PA`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
                priority
              />
            </div>
          )}

          {service.longDescription && (
            <div className="prose prose-lg max-w-none mb-12">
              {service.longDescription.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-gray-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {serviceAreas.length > 0 && (
            <div className="bg-tree-green/5 rounded-2xl p-8 mb-12">
              <h2 className="text-2xl font-bold text-tree-green mb-4">
                {service.title} Service Areas
              </h2>
              <p className="text-gray-600 mb-6">
                We provide professional {service.title.toLowerCase()} services across the greater Harrisburg area:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {serviceAreas.map((area) => (
                  <Link
                    key={area.id}
                    href={area.slug ? `/areas/${area.slug}` : '#'}
                    className="bg-white rounded-lg px-4 py-3 text-center text-tree-green font-medium hover:bg-tree-green hover:text-white transition-colors shadow-sm"
                  >
                    {area.name}, {area.state}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="bg-accent-orange/10 border border-accent-orange/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-tree-green mb-3">
              Need {service.title}?
            </h2>
            <p className="text-gray-600 mb-6">
              Get a free, no-obligation quote from our licensed and insured team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-accent-orange hover:bg-accent-orange-dark text-white h-12 px-8 text-lg"
              >
                <Link href="/#contact">Request Free Quote</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 px-8 text-lg border-tree-green text-tree-green hover:bg-tree-green hover:text-white"
              >
                <a href={`tel:${companyInfo.phone.replace(/\D/g, '')}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
