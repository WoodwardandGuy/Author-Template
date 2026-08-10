import type { Metadata } from 'next';
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
    <section className="bg-ivory">
      <div className="mx-auto max-w-[1280px] px-[clamp(20px,4vw,48px)] pb-24 pt-[88px]">
        <h1 className="font-display text-[clamp(40px,7vw,58px)] leading-[1.05] text-ink">
          Press
        </h1>
        <p className="mt-5 mb-[52px] max-w-[520px] text-[17px] leading-[1.85] text-ink/64">
          Interviews, reviews, and features. This page is built to grow.
        </p>

        {press.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[26px]">
            {press.map((item) => {
              const dateLabel = item.date
                ? new Date(item.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : null;
              const Wrapper = (item.url ? 'a' : 'div') as 'a';
              const wrapperProps = item.url
                ? { href: item.url, target: '_blank', rel: 'noopener noreferrer' }
                : {};
              return (
                <Wrapper
                  key={item.id}
                  {...wrapperProps}
                  className="group block border border-ink/[0.16] p-[34px] transition-colors hover:border-brass"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[11px] uppercase tracking-[0.24em] text-brass">
                      {item.outlet}
                    </span>
                    {dateLabel && (
                      <span className="text-[12px] text-ink/45">{dateLabel}</span>
                    )}
                  </div>
                  <p className="mt-4 text-pretty font-display text-[26px] leading-[1.3] text-ink">
                    {item.headline}
                  </p>
                </Wrapper>
              );
            })}
          </div>
        ) : (
          <p className="py-8 text-[16px] text-ink/60">
            Coverage will appear here as it comes in.
          </p>
        )}
      </div>
    </section>
  );
}
