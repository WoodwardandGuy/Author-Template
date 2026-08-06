import Image from 'next/image';
import {
  Instagram,
  Facebook,
  Twitter,
  Music2,
  BookOpen,
  type LucideIcon,
} from 'lucide-react';
import { urlFor } from '@/lib/sanity.image';
import { FooterNewsletter } from '@/components/layout/FooterNewsletter';
import type { AuthorInfo, SiteContent } from '@/lib/types';

interface FooterProps {
  authorInfo: AuthorInfo;
  siteContent?: SiteContent | null;
}

const quickLinks = [
  { href: '/books', label: 'Books' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/press', label: 'Press' },
  { href: '/book-club', label: 'Book Club' },
  { href: '/#contact', label: 'Contact' },
];

export function Footer({ authorInfo, siteContent }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const hasLogo = authorInfo.logo?.asset;
  const s = authorInfo.socials || {};

  const socialLinks: { url?: string; label: string; Icon: LucideIcon }[] = [
    { url: s.instagram, label: 'Instagram', Icon: Instagram },
    { url: s.facebook, label: 'Facebook', Icon: Facebook },
    { url: s.tiktok, label: 'TikTok', Icon: Music2 },
    { url: s.twitter, label: 'X', Icon: Twitter },
    { url: s.goodreads, label: 'Goodreads', Icon: BookOpen },
    { url: s.bookbub, label: 'BookBub', Icon: BookOpen },
  ];
  const activeSocials = socialLinks.filter((l) => l.url);

  return (
    <footer className="bg-ink text-white">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              {hasLogo && (
                <Image
                  src={urlFor(authorInfo.logo).width(96).height(96).url()}
                  alt={authorInfo.logo?.alt || authorInfo.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <span className="text-xl font-bold tracking-tight">{authorInfo.name}</span>
            </div>
            <p className="text-white/70">
              {siteContent?.footerTagline || authorInfo.tagline}
            </p>

            {activeSocials.length > 0 && (
              <div className="flex gap-4 mt-6">
                {activeSocials.map(({ url, label, Icon }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Stay in touch</h3>
            <p className="text-white/70 mb-4">
              Join the mailing list for new releases and events.
            </p>
            <FooterNewsletter />
          </div>
        </div>

        <div className="border-t border-white/15 mt-10 pt-8 text-center text-white/70">
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
