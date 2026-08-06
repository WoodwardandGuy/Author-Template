import type { Metadata } from 'next';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Events } from '@/components/home/Events';
import { getUpcomingEvents, getSiteContent } from '@/lib/sanity.fetch';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Events & Appearances',
  description: 'Upcoming signings, launches, festivals, and appearances.',
  alternates: { canonical: '/events' },
  openGraph: {
    title: 'Events & Appearances',
    description: 'Upcoming signings, launches, festivals, and appearances.',
    url: `${SITE_URL}/events`,
    type: 'website',
  },
};

export default async function EventsPage() {
  const [events, siteContent] = await Promise.all([
    getUpcomingEvents(),
    getSiteContent(),
  ]);

  return (
    <>
      <div className="bg-ink/[0.04] py-4">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Events</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <Events events={events} content={siteContent} showWhenEmpty />
    </>
  );
}
