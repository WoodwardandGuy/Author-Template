import type { Metadata } from 'next';
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
import { getServiceAreaBySlug, getServiceAreaSlugs, getServices, getCompanyInfo } from '@/lib/sanity.fetch';

const BASE_URL = 'https://www.treeprofessionalsofharrisburg.com';

export async function generateStaticParams() {
  const slugs = await getServiceAreaSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = await getServiceAreaBySlug(slug);
  if (!area) return {};

  const title = `Tree Services in ${area.name}, ${area.state} | Tree Professionals of Harrisburg`;
  const description = area.metaDescription || `Professional tree removal, trimming, stump grinding, and emergency tree services in ${area.name}, ${area.state}. Licensed, insured, and available 24/7.`;

  return {
    title,
    description,
    alternates: { canonical: `/areas/${area.slug}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/areas/${area.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

function generateLocalBusinessSchema(area: { name: string; state: string; slug: string; latitude?: number; longitude?: number }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Tree Professionals of Harrisburg',
    url: BASE_URL,
    areaServed: {
      '@type': 'City',
      name: area.name,
      containedInPlace: {
        '@type': 'State',
        name: 'Pennsylvania',
      },
    },
    ...(area.latitude && area.longitude && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: area.latitude,
        longitude: area.longitude,
      },
    }),
  };
}

function generateServiceSchemas(
  area: { name: string; state: string },
  services: { title: string; description: string; slug: string }[],
) {
  return services.map((service) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.title} in ${area.name}, ${area.state}`,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Tree Professionals of Harrisburg',
      url: BASE_URL,
    },
    areaServed: {
      '@type': 'City',
      name: area.name,
      containedInPlace: { '@type': 'State', name: 'Pennsylvania' },
    },
    url: `${BASE_URL}/services/${service.slug}`,
  }));
}

function generateBreadcrumbSchema(area: { name: string; slug: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Service Areas', item: `${BASE_URL}/areas` },
      { '@type': 'ListItem', position: 3, name: area.name, item: `${BASE_URL}/areas/${area.slug}` },
    ],
  };
}

export default async function ServiceAreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [area, services, companyInfo] = await Promise.all([
    getServiceAreaBySlug(slug),
    getServices(),
    getCompanyInfo(),
  ]);

  if (!area) notFound();

  const localBusinessSchema = generateLocalBusinessSchema(area);
  const breadcrumbSchema = generateBreadcrumbSchema(area);
  const serviceSchemas = generateServiceSchemas(area, services);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {serviceSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="bg-tree-green/5 py-4">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/#services">Service Areas</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{area.name}, {area.state}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-tree-green mb-6">
            Tree Services in {area.name}, {area.state}
          </h1>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            {area.description || `Tree Professionals of Harrisburg proudly serves ${area.name}, ${area.state} with professional tree care services. From routine trimming to emergency storm damage cleanup, our licensed and insured team is ready to help.`}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button
              asChild
              className="bg-accent-orange hover:bg-accent-orange-dark text-white h-12 px-8 text-lg"
            >
              <Link href="/#contact">
                Get a Free Quote in {area.name}
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

          {services.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-tree-green mb-6">
                Our Services in {area.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:border-tree-green hover:shadow-md transition-all group"
                  >
                    <h3 className="text-lg font-semibold text-tree-green-dark group-hover:text-tree-green transition-colors mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                    <span className="text-accent-orange text-sm font-medium mt-3 inline-flex items-center">
                      Learn more <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="bg-tree-green text-white rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-3">
              Why Choose Us in {area.name}?
            </h2>
            <ul className="space-y-3 text-gray-100">
              <li className="flex items-start gap-2">
                <span className="text-accent-orange font-bold mt-0.5">&#10003;</span>
                Licensed and fully insured for your protection
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-orange font-bold mt-0.5">&#10003;</span>
                24/7 emergency tree service available
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-orange font-bold mt-0.5">&#10003;</span>
                Free, no-obligation estimates
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-orange font-bold mt-0.5">&#10003;</span>
                Serving {area.name} and the greater Harrisburg area
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-orange font-bold mt-0.5">&#10003;</span>
                Experienced arborists with professional equipment
              </li>
            </ul>
          </div>

          <div className="bg-accent-orange/10 border border-accent-orange/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-tree-green mb-3">
              Need Tree Service in {area.name}?
            </h2>
            <p className="text-gray-600 mb-6">
              Contact us today for a free quote. We serve all of {area.name}, {area.state} and surrounding communities.
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
