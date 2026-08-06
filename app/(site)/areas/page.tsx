import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getServiceAreasWithSlugs, getCompanyInfo } from '@/lib/sanity.fetch';

const BASE_URL = 'https://www.treeprofessionalsofharrisburg.com';

export const metadata: Metadata = {
  title: 'Service Areas | Tree Professionals of Harrisburg',
  description:
    'Tree Professionals of Harrisburg serves Harrisburg, Mechanicsburg, Camp Hill, Carlisle, Hershey, and communities across Central PA. Licensed, insured, 24/7 emergency service.',
  alternates: { canonical: '/areas' },
  openGraph: {
    title: 'Service Areas | Tree Professionals of Harrisburg',
    description:
      'Professional tree services across Harrisburg, Mechanicsburg, Camp Hill, Carlisle, Hershey, and Central PA.',
    url: `${BASE_URL}/areas`,
    type: 'website',
  },
};

export default async function AreasPage() {
  const [serviceAreas, companyInfo] = await Promise.all([
    getServiceAreasWithSlugs(),
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
                <BreadcrumbPage>Service Areas</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-tree-green mb-6">
            Where We Work in Central Pennsylvania
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-12">
            We provide tree removal, trimming, stump grinding, and emergency services across the greater Harrisburg area. If you&apos;re within about 30 miles of Harrisburg, we can probably help. Not sure if we cover your area? Just call — we&apos;ll let you know.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {serviceAreas.map((area) => (
              <Link
                key={area.id}
                href={area.slug ? `/areas/${area.slug}` : '#'}
                className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-5 hover:border-tree-green hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 bg-tree-green/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-tree-green transition-colors">
                  <MapPin className="h-5 w-5 text-tree-green group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="font-semibold text-tree-green-dark group-hover:text-tree-green transition-colors">
                    {area.name}
                  </span>
                  <span className="text-gray-500 text-sm block">{area.state}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="bg-tree-green text-white rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Don&apos;t See Your Town?
            </h2>
            <p className="text-gray-100 leading-relaxed text-lg">
              The list above covers our most common service areas, but we regularly work in communities throughout Cumberland, Dauphin, Perry, and York counties. If you have a tree problem and you&apos;re in the Central PA region, give us a call. Chances are we&apos;ve already done work in your neighborhood.
            </p>
          </div>

          <div className="bg-accent-orange/10 border border-accent-orange/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-tree-green mb-3">
              Need Tree Service in Your Area?
            </h2>
            <p className="text-gray-600 mb-6">
              Free estimates, no obligation. We&apos;ll come out, assess the job, and give you a straight answer on what it&apos;ll cost.
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
