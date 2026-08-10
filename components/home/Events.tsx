import Link from 'next/link';
import type { AppearanceEvent, SiteContent } from '@/lib/types';

interface EventsProps {
  events: AppearanceEvent[];
  content?: Pick<SiteContent, 'eventsHeadline' | 'eventsSubtext'> | null;
}

function formatDate(iso: string) {
  return new Date(iso)
    .toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
    .toUpperCase();
}

/** Home events teaser — the next three upcoming dates, linking out to /events. */
export function Events({ events, content }: EventsProps) {
  if (events.length === 0) return null;
  const upcoming = events.slice(0, 3);

  return (
    <section id="events" className="bg-ivory">
      <div className="mx-auto max-w-[1280px] px-[clamp(20px,4vw,48px)] pb-[clamp(64px,9vw,96px)]">
        <div className="mb-8 flex items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(30px,5vw,42px)] leading-tight text-ink">
            {content?.eventsHeadline || 'Events & Appearances'}
          </h2>
          <Link
            href="/events"
            className="whitespace-nowrap border-b border-brass pb-[5px] text-[12px] uppercase tracking-[0.18em] text-ink transition-colors hover:text-brass"
          >
            All dates
          </Link>
        </div>

        <ul>
          {upcoming.map((event) => {
            const place = [event.venue, event.city, event.region]
              .filter(Boolean)
              .join(', ');
            return (
              <li
                key={event.id}
                className="grid grid-cols-[repeat(auto-fit,minmax(180px,auto))] items-center gap-x-8 gap-y-6 border-t border-ink/[0.14] py-[26px]"
              >
                <time
                  dateTime={event.date}
                  className="text-[14px] uppercase tracking-[0.12em] text-brass"
                >
                  {formatDate(event.date)}
                </time>
                <div>
                  <h3 className="text-[19px] text-ink">{event.title}</h3>
                  {place && <p className="mt-[5px] text-[14px] text-ink/56">{place}</p>}
                </div>
                {event.url && (
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="justify-self-start text-[11.5px] uppercase tracking-[0.16em] text-ink transition-colors hover:text-brass sm:justify-self-end [border-bottom:1px_solid_rgba(42,39,51,0.3)] hover:[border-color:#9A7B4F]"
                  >
                    Details
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
