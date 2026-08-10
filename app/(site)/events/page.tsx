import type { Metadata } from 'next';
import { NewsletterTrigger } from '@/components/newsletter/NewsletterTrigger';
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

function dateParts(iso: string) {
  const d = new Date(iso);
  return {
    day: d.toLocaleDateString('en-US', { day: 'numeric' }),
    month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
  };
}

export default async function EventsPage() {
  const [events, siteContent] = await Promise.all([
    getUpcomingEvents(),
    getSiteContent(),
  ]);

  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-[1280px] px-[clamp(20px,4vw,48px)] pb-24 pt-[88px]">
        <h1 className="font-display text-[clamp(40px,7vw,58px)] leading-[1.05] text-ink">
          {siteContent?.eventsHeadline || 'Events & Appearances'}
        </h1>
        {siteContent?.eventsSubtext && (
          <p className="mt-5 max-w-[520px] text-[17px] leading-[1.85] text-ink/64">
            {siteContent.eventsSubtext}
          </p>
        )}

        {events.length > 0 ? (
          <ul className="mt-[52px]">
            {events.map((event) => {
              const { day, month } = dateParts(event.date);
              const place = [event.venue, event.city, event.region]
                .filter(Boolean)
                .join(', ');
              return (
                <li
                  key={event.id}
                  className="grid grid-cols-[repeat(auto-fit,minmax(160px,auto))] items-center gap-x-9 gap-y-6 border-t border-ink/[0.14] py-[30px]"
                >
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-[34px] leading-none text-ink">
                      {day}
                    </span>
                    <span className="text-[11.5px] uppercase tracking-[0.2em] text-ink/55">
                      {month}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-[22px] text-ink">{event.title}</h2>
                    {place && (
                      <p className="mt-[5px] text-[14.5px] text-ink/56">{place}</p>
                    )}
                  </div>
                  {event.url && (
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="justify-self-start border border-ink/28 px-[22px] py-[13px] text-[11.5px] uppercase tracking-[0.16em] text-ink transition-colors hover:border-brass hover:text-brass sm:justify-self-end"
                    >
                      Details &amp; tickets
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="mt-[68px] border border-dashed border-ink/28 px-6 py-[52px] text-center">
            <p className="font-display text-[30px] leading-tight text-ink">
              {siteContent?.eventsEmptyText || 'Nothing on the calendar right now.'}
            </p>
            <p className="mx-auto mt-4 max-w-[420px] text-[15.5px] leading-relaxed text-ink/60">
              The Buriers hear first — before the calendar does.
            </p>
            <NewsletterTrigger className="mt-8 inline-flex bg-smokyGreen px-[30px] py-4 text-[12px] uppercase tracking-[0.16em] text-ivory transition-colors hover:bg-ink">
              Join the mailing list
            </NewsletterTrigger>
          </div>
        )}
      </div>
    </section>
  );
}
