import type { Metadata } from 'next';
import { Mail, MapPin } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ContactForm } from '@/components/home/ContactForm';
import { getSiteContent } from '@/lib/sanity.fetch';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Representation, publicity, and general inquiries.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact',
    description: 'Representation, publicity, and general inquiries.',
    url: `${SITE_URL}/contact`,
    type: 'website',
  },
};

/**
 * Professional representation directory. Static per the author — these are
 * agency/publicity contacts, not CMS content, so they live in the page.
 */
const REPRESENTATION: { category: string; name: string; org: string; email: string }[] = [
  {
    category: 'US Literary Agent',
    name: 'Haley Heidemann',
    org: 'WME',
    email: 'HHeidemann@wmeagency.com',
  },
  {
    category: 'UK Literary Agent',
    name: 'Kimberley Atkins',
    org: 'WME',
    email: 'KAtkins@wmeagency.com',
  },
  {
    category: 'Foreign Rights',
    name: 'Tracy Fisher',
    org: 'WME',
    email: 'TFisher@wmeagency.com',
  },
  {
    category: 'TV & Film Agent',
    name: 'Sanjana Seelam',
    org: 'WME',
    email: 'sseelam@wmeagency.com',
  },
  {
    category: 'US Publicity',
    name: 'Gena Lanzi',
    org: 'Publicity Manager, Atria Books',
    email: 'AtriaPublicity@simonandschuster.com',
  },
];

export default async function ContactPage() {
  const siteContent = await getSiteContent();

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
                <BreadcrumbPage>Contact</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-bone mb-4 tracking-tight">
            Contact
          </h1>
          <p className="text-xl text-bone-dim leading-relaxed mb-12">
            For rights, publicity, and press inquiries, please reach the
            appropriate representative below.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {REPRESENTATION.map((contact) => (
              <div
                key={contact.category}
                className="rounded-lg border border-line p-6"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-moss mb-3">
                  {contact.category}
                </p>
                <p className="text-lg font-semibold text-bone">{contact.name}</p>
                <p className="text-bone-dim">{contact.org}</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-3 inline-flex items-center gap-2 text-bone font-medium hover:text-wine-light transition-colors break-all"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {contact.email}
                </a>
              </div>
            ))}

            <div className="rounded-lg border border-line p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-moss mb-3">
                Snail Mail for E.L.
              </p>
              <div className="flex items-start gap-2 text-bone">
                <MapPin className="h-4 w-4 shrink-0 mt-1 text-bone-dim" />
                <address className="not-italic leading-relaxed">
                  P.O. Box 6125
                  <br />
                  McKinney, TX 75071
                </address>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactForm content={siteContent} />
    </>
  );
}
