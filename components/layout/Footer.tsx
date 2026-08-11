import type { ComponentType } from 'react';
import Image from 'next/image';
import { Instagram, Facebook, Music2, Users, BookOpen } from 'lucide-react';
import { Signature } from '@/components/home/Signature';
import { FooterNewsletter } from '@/components/layout/FooterNewsletter';
import type { AuthorInfo, SiteContent } from '@/lib/types';

interface FooterProps {
  authorInfo: AuthorInfo;
  siteContent?: SiteContent | null;
  /** Press is hidden from the footer nav when there are no press items. */
  hasPress?: boolean;
}

const quickLinks = [
  { href: '/books', label: 'Books' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/press', label: 'Press' },
  { href: '/book-club', label: 'Book Club' },
  { href: '/contact', label: 'Contact' },
];

/** Goodreads "g" brand mark — monochrome (currentColor) to match the other social icons. */
function GoodreadsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M11.43 23.995c-3.608-.208-6.274-2.077-6.448-5.078.695.007 1.375-.013 2.07-.006.224 1.702 1.906 2.93 4.115 3.087 3.018.216 5.078-1.36 5.078-4.868v-1.827h-.043c-.847 1.548-2.507 2.443-4.297 2.443-4.115 0-6.62-3.005-6.62-7.28C5.15 5.048 8.05 2 11.87 2c1.79 0 3.494.826 4.298 2.396h.043V2.383h1.892v14.98c0 3.65-1.98 6.804-6.674 6.632zm.393-19.987c-2.943 0-4.688 2.395-4.688 5.4 0 3.006 1.657 5.4 4.688 5.4 3.018 0 4.774-2.395 4.774-5.4 0-3.005-1.756-5.4-4.774-5.4z" />
    </svg>
  );
}

export function Footer({ authorInfo, siteContent, hasPress = true }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const s = authorInfo.socials || {};
  const links = quickLinks.filter((l) => l.href !== '/press' || hasPress);

  const socialLinks: {
    url?: string;
    label: string;
    Icon: ComponentType<{ className?: string }>;
  }[] = [
    { url: s.instagram, label: 'Instagram', Icon: Instagram },
    { url: s.tiktok, label: 'TikTok', Icon: Music2 },
    { url: s.facebookGroup, label: 'The Buriers (Facebook group)', Icon: Users },
    { url: s.facebook, label: 'Facebook', Icon: Facebook },
    { url: s.goodreads, label: 'Goodreads', Icon: GoodreadsIcon },
    { url: s.bookbub, label: 'BookBub', Icon: BookOpen },
  ];
  const activeSocials = socialLinks.filter((l) => l.url);

  return (
    <footer className="border-t border-line bg-soil text-bone-dim">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Signature className="mb-6 h-10 w-auto text-bone" title={authorInfo.name} />

            {activeSocials.length > 0 && (
              <div className="flex gap-4 mt-6">
                {activeSocials.map(({ url, label, Icon }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-bone-dim hover:text-bone transition-colors"
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4 text-bone">Explore</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-bone-dim hover:text-bone transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-bone">Stay in touch</h3>
            <p className="text-bone-dim mb-4">
              Join the mailing list for new releases and events.
            </p>
            <FooterNewsletter />
          </div>
        </div>

        <div className="border-t border-line mt-10 pt-8 text-center text-bone-dim">
          <Image
            src="/elw-logo-transparent.png"
            alt={`${authorInfo.name} seal`}
            width={200}
            height={200}
            className="mx-auto mb-5 h-24 w-auto object-contain"
          />
          <p>
            &copy; {currentYear} {authorInfo.name}. All rights reserved.
          </p>
          {siteContent?.footerCopyrightText && (
            <p className="mt-2 text-sm">{siteContent.footerCopyrightText}</p>
          )}
        </div>
      </div>
    </footer>
  );
}
