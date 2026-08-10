import { FooterNewsletter } from '@/components/layout/FooterNewsletter';
import type { AuthorInfo, SiteContent } from '@/lib/types';

interface FooterProps {
  authorInfo: AuthorInfo;
  siteContent?: SiteContent | null;
}

const exploreLinks = [
  { href: '/books', label: 'Books' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/press', label: 'Press' },
  { href: '/book-club', label: 'Book Club' },
  { href: '/#contact', label: 'Contact' },
];

export function Footer({ authorInfo, siteContent }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const s = authorInfo.socials || {};

  const socialLinks: { url?: string; label: string }[] = [
    { url: s.instagram, label: 'Instagram' },
    { url: s.tiktok, label: 'TikTok' },
    { url: s.facebookGroup, label: 'The Buriers' },
    { url: s.facebook, label: 'Facebook' },
    { url: s.goodreads, label: 'Goodreads' },
    { url: s.bookbub, label: 'BookBub' },
  ];
  const activeSocials = socialLinks.filter((l) => l.url);

  return (
    <footer className="bg-deepPlum text-ivory">
      <div className="mx-auto max-w-[1280px] px-12 pb-9 pt-[84px]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] items-start gap-x-16 gap-y-12">
          {/* Column 1 — statement + socials */}
          <div>
            <p className="max-w-[320px] font-display text-[30px] leading-[1.2]">
              Some secrets stay buried. Most don&rsquo;t.
            </p>
            {(siteContent?.footerTagline || authorInfo.tagline) && (
              <p className="mt-5 text-[15px] leading-[1.8] text-ivory/60">
                {siteContent?.footerTagline || authorInfo.tagline}
              </p>
            )}
            {activeSocials.length > 0 && (
              <div className="mt-7 flex flex-wrap gap-[22px]">
                {activeSocials.map(({ url, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] uppercase tracking-[0.14em] text-ivory/70 transition-colors hover:text-brass"
                  >
                    {label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Column 2 — explore nav */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-ivory/45">
              Explore
            </p>
            <ul className="mt-5 flex flex-col gap-[11px]">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[15px] text-ivory/82 transition-colors hover:text-brass"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — mailing list */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-ivory/45">
              Stay in touch
            </p>
            <p className="mt-5 max-w-[300px] text-[15px] leading-[1.8] text-ivory/60">
              Join the Buriers for new releases, event dates, and cover reveals.
            </p>
            <div className="mt-5">
              <FooterNewsletter />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-ivory/15 pt-6 text-[12px] tracking-[0.1em] text-ivory/45">
          <p>
            &copy; {currentYear} {authorInfo.name}. All rights reserved.
          </p>
          <p>elwestbury.com</p>
        </div>
      </div>
    </footer>
  );
}
