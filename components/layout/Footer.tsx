import Image from 'next/image';
import {
  Instagram,
  Facebook,
  Music2,
  Users,
  BookOpen,
  type LucideIcon,
} from 'lucide-react';
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

export function Footer({ authorInfo, siteContent, hasPress = true }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const s = authorInfo.socials || {};
  const links = quickLinks.filter((l) => l.href !== '/press' || hasPress);

  const socialLinks: { url?: string; label: string; Icon: LucideIcon }[] = [
    { url: s.instagram, label: 'Instagram', Icon: Instagram },
    { url: s.tiktok, label: 'TikTok', Icon: Music2 },
    { url: s.facebookGroup, label: 'The Buriers (Facebook group)', Icon: Users },
    { url: s.facebook, label: 'Facebook', Icon: Facebook },
    { url: s.goodreads, label: 'Goodreads', Icon: BookOpen },
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

          <div>
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
