'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { urlFor } from '@/lib/sanity.image';
import type { AuthorInfo } from '@/lib/types';

interface HeaderProps {
  authorInfo: AuthorInfo;
}

const navLinks = [
  { href: '/books', label: 'Books' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/blog', label: 'Blog' },
  { href: '/#contact', label: 'Contact' },
];

export function Header({ authorInfo }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hasLogo = authorInfo.logo?.asset;

  const renderLink = (link: { href: string; label: string }, onClick?: () => void) =>
    link.href.startsWith('/#') ? (
      <a
        key={link.href}
        href={link.href}
        onClick={onClick}
        className="text-gray-700 hover:text-ink font-medium transition-colors text-sm whitespace-nowrap"
      >
        {link.label}
      </a>
    ) : (
      <Link
        key={link.href}
        href={link.href}
        onClick={onClick}
        className="text-gray-700 hover:text-ink font-medium transition-colors text-sm whitespace-nowrap"
      >
        {link.label}
      </Link>
    );

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between flex-nowrap">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            {hasLogo ? (
              <Image
                src={urlFor(authorInfo.logo).width(160).height(160).url()}
                alt={authorInfo.logo?.alt || authorInfo.name}
                width={44}
                height={44}
                className="rounded-full"
              />
            ) : null}
            <span className="text-xl font-bold text-ink group-hover:text-ink-dark transition-colors tracking-tight whitespace-nowrap">
              {authorInfo.name}
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => renderLink(link))}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              asChild
              className="hidden md:inline-flex bg-brand hover:bg-brand-dark text-white text-sm px-4"
            >
              <a href="/#newsletter">Mailing list</a>
            </Button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-ink transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4 space-y-3">
            {navLinks.map((link) =>
              renderLink(link, () => setIsMobileMenuOpen(false)),
            )}
            <Button
              asChild
              className="w-full bg-brand hover:bg-brand-dark text-white"
            >
              <a href="/#newsletter" onClick={() => setIsMobileMenuOpen(false)}>
                Join the mailing list
              </a>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
