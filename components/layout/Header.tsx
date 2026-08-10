'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import type { AuthorInfo } from '@/lib/types';

interface HeaderProps {
  authorInfo: AuthorInfo;
  /** Press is hidden from the nav when there are no press items. */
  hasPress?: boolean;
}

const navLinks = [
  { href: '/books', label: 'Books' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/press', label: 'Press' },
  { href: '/book-club', label: 'Book Club' },
  { href: '/contact', label: 'Contact' },
];

export function Header({ authorInfo, hasPress = true }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const links = navLinks.filter((l) => l.href !== '/press' || hasPress);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkClass =
    'text-[0.78rem] uppercase tracking-[0.18em] text-bone-dim transition-colors hover:text-bone whitespace-nowrap';

  return (
    <header
      className={`sticky top-0 z-50 border-b border-line bg-soil/90 backdrop-blur-md transition-all ${
        isScrolled ? 'py-2' : 'py-3'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex flex-nowrap items-center justify-between">
          <Link
            href="/"
            aria-label={`${authorInfo.name} — home`}
            className="flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-80 sm:gap-3"
          >
            <Image
              src="/elw-mark.png"
              alt=""
              width={208}
              height={256}
              priority
              className="h-9 w-auto sm:h-10"
            />
            <span className="flex flex-col leading-none">
              <span className="font-serif text-base tracking-tight text-bone sm:text-lg">
                {authorInfo.name}
              </span>
              <span className="mt-1 text-[0.6rem] uppercase tracking-[0.3em] text-moss">
                Author
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-[clamp(0.9rem,2.5vw,1.8rem)] lg:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}
            <Link
              href="/#newsletter"
              className="rounded-full border border-wine px-4 py-2 text-[0.78rem] uppercase tracking-[0.18em] text-bone transition-colors hover:bg-wine"
            >
              Mailing list
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-bone-dim transition-colors hover:text-bone lg:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {isMobileMenuOpen && (
          <div className="mt-4 space-y-3 border-t border-line pt-4 lg:hidden">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm uppercase tracking-[0.18em] text-bone-dim transition-colors hover:text-bone"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#newsletter"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 inline-flex rounded-full border border-wine px-4 py-2 text-sm uppercase tracking-[0.18em] text-bone transition-colors hover:bg-wine"
            >
              Mailing list
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
