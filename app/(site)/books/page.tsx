import type { Metadata } from 'next';
import Link from 'next/link';
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
import { getServices, getCompanyInfo } from '@/lib/sanity.fetch';

const BASE_URL = 'https://www.treeprofessionalsofharrisburg.com';

export const metadata: Metadata = {
  title: 'Tree Services in Harrisburg, PA | Tree Professionals of Harrisburg',
  description:
    'Professional tree removal, trimming, stump grinding, emergency service, and land clearing in Harrisburg, PA. Licensed, insured, free estimates. Call today.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Tree Services in Harrisburg, PA | Tree Professionals of Harrisburg',
    description:
      'Professional tree removal, trimming, stump grinding, emergency service, and land clearing in Harrisburg, PA.',
    url: `${BASE_URL}/services`,
    type: 'website',
  },
};

export default async function ServicesPage() {
  const [services, companyInfo] = await Promise.all([
    getServices(),
    getCompanyInfo(),
  ]);

  return (
    <>
      <div className="bg-tree-green/5 py-4">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Services</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-tree-green mb-6">
            Tree Care Services in Harrisburg, PA
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-12">
            From a dead limb hanging over your roof to a full property clearing, we handle every type of tree work in the greater Harrisburg area. Every job includes full cleanup and debris removal.
          </p>

          <div className="space-y-6">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="block bg-white border border-gray-200 rounded-xl p-8 hover:border-tree-green hover:shadow-lg transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-tree-green-dark group-hover:text-tree-green transition-colors mb-3">
                      {service.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-gray-300 group-hover:text-accent-orange transition-colors shrink-0 mt-1" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 bg-accent-orange/10 border border-accent-orange/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-tree-green mb-3">
              Not Sure What You Need?
            </h2>
            <p className="text-gray-600 mb-6">
              Call us or send a message. We&apos;ll come take a look at your property and tell you exactly what needs to be done — and what doesn&apos;t.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
          </div>
        </div>
      </section>
    </>
  );
}
