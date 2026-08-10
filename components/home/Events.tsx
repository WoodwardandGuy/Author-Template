import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import type { AppearanceEvent, SiteContent } from '@/lib/types';

interface EventsProps {
  events: AppearanceEvent[];
  content?: Pick<SiteContent, 'eventsHeadline' | 'eventsSubtext' | 'eventsEmptyText'> | null;
  /** When false (home page), the section is hidden entirely if there are no events. */
  showWhenEmpty?: boolean;
  /** 'h2' as a home section (under the hero h1); 'h1' when it's the /events page. */
  headingAs?: 'h1' | 'h2';
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function Events({
  events,
  content,
  showWhenEmpty = false,
  headingAs: Heading = 'h2',
}: EventsProps) {
  if (events.length === 0 && !showWhenEmpty) return null;

  return (
    <section id="events" className="py-20 border-t border-line">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <Heading className="text-3xl md:text-4xl font-bold text-bone tracking-tight mb-3">
              {content?.eventsHeadline || 'Events & Appearances'}
            </Heading>
            {content?.eventsSubtext && (
              <p className="text-bone-dim text-lg">{content.eventsSubtext}</p>
            )}
          </div>

          {events.length > 0 ? (
            <ul className="divide-y divide-line">
              {events.map((event) => {
                const place = [event.venue, event.city, event.region]
                  .filter(Boolean)
                  .join(', ');
                return (
                  <li key={event.id} className="py-6 flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex items-center gap-2 text-wine-light font-medium shrink-0 sm:w-56">
                      <Calendar className="h-5 w-5" />
                      <time dateTime={event.date}>{formatDate(event.date)}</time>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-bone">
                        {event.title}
                      </h3>
                      {place && (
                        <p className="flex items-center gap-1.5 text-bone-dim text-sm mt-1">
                          <MapPin className="h-4 w-4 shrink-0" />
                          {place}
                        </p>
                      )}
                      {event.description && (
                        <p className="text-bone-dim text-sm mt-2 leading-relaxed">
                          {event.description}
                        </p>
                      )}
                      {event.url && (
                        <a
                          href={event.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-bone font-medium text-sm mt-2 hover:text-wine-light transition-colors"
                        >
                          Details & tickets
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-bone-dim text-lg py-8">
              {content?.eventsEmptyText || 'No upcoming events right now — check back soon.'}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
