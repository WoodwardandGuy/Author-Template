'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { QuillSignature } from '@/components/home/QuillSignature';
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
  { href: '/contact', label: 'Contact' },
];

export function Header({ authorInfo }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            className="shrink-0 text-bone transition-opacity hover:opacity-80"
          >
            <QuillSignature className="h-9 w-auto" title={authorInfo.name} />
          </Link>

          <div className="hidden items-center gap-[clamp(0.9rem,2.5vw,1.8rem)] lg:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}
            <a
              href="/#newsletter"
              className="rounded-full border border-wine px-4 py-2 text-[0.78rem] uppercase tracking-[0.18em] text-bone transition-colors hover:bg-wine"
            >
              Mailing list
            </a>
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm uppercase tracking-[0.18em] text-bone-dim transition-colors hover:text-bone"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="/#newsletter"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 inline-flex rounded-full border border-wine px-4 py-2 text-sm uppercase tracking-[0.18em] text-bone transition-colors hover:bg-wine"
            >
              Mailing list
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
