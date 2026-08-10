'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import { useNewsletterModal } from '@/components/newsletter/NewsletterModalProvider';
import type { AuthorInfo } from '@/lib/types';

interface HeaderProps {
  authorInfo: AuthorInfo;
}

const navLinks = [
  { href: '/books', label: 'Books' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/press', label: 'Press' },
  { href: '/book-club', label: 'Book Club' },
  { href: '/#contact', label: 'Contact' },
];

export function Header({ authorInfo }: HeaderProps) {
  const pathname = usePathname();
  const { open } = useNewsletterModal();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href.startsWith('/#') ? false : pathname === href || pathname.startsWith(`${href}/`);

  const Wordmark = (
    <span className="flex items-center gap-[14px]">
      <Image
        src="/elw-icon.png"
        alt=""
        width={37}
        height={46}
        priority
        className="h-[46px] w-auto"
      />
      <span className="flex flex-col gap-2">
        <span className="whitespace-nowrap font-display text-[clamp(18px,1.8vw,22px)] font-medium leading-[1.05] tracking-[0.12em] text-ink">
          {authorInfo.name?.toUpperCase() || 'E. L. WESTBURY'}
        </span>
        <span className="text-[9px] uppercase leading-[1.05] tracking-[0.3em] text-ink/55">
          Author
        </span>
      </span>
    </span>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-ivory/95 backdrop-blur-[10px]">
      <div className="mx-auto flex h-24 max-w-[1280px] flex-nowrap items-center justify-between gap-[clamp(16px,2.4vw,40px)] px-[clamp(20px,3vw,48px)]">
        <Link href="/" aria-label="Home" className="shrink-0">
          {Wordmark}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden min-w-0 items-center gap-[clamp(12px,1.9vw,30px)] lg:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const cls = `whitespace-nowrap border-b pb-1 text-[clamp(11px,1.15vw,12.5px)] uppercase tracking-[clamp(0.1em,0.16vw,0.18em)] transition-colors ${
              active
                ? 'border-brass text-brass'
                : 'border-transparent text-ink hover:text-brass'
            }`;
            return link.href.startsWith('/#') ? (
              <a key={link.href} href={link.href} className={cls}>
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href} className={cls}>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <button
            onClick={open}
            className="hidden bg-smokyGreen px-[clamp(14px,1.8vw,22px)] py-3 text-[clamp(10.5px,1.05vw,11.5px)] uppercase tracking-[0.16em] text-ivory transition-colors hover:bg-ink md:inline-flex"
          >
            Mailing list
          </button>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className="p-1 text-ink transition-colors hover:text-brass lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="right" className="border-l-ink/10 bg-ivory">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="mt-8 flex flex-col gap-6">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  const cls = `text-sm uppercase tracking-[0.16em] transition-colors ${
                    active ? 'text-brass' : 'text-ink hover:text-brass'
                  }`;
                  return link.href.startsWith('/#') ? (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cls}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cls}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    open();
                  }}
                  className="mt-2 bg-smokyGreen px-5 py-3 text-[12px] uppercase tracking-[0.16em] text-ivory transition-colors hover:bg-ink"
                >
                  Mailing list
                </button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
