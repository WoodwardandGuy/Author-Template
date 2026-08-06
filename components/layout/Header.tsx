'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { urlFor } from '@/lib/sanity.image';
import type { CompanyInfo } from '@/lib/types';

interface HeaderProps {
  companyInfo: CompanyInfo;
}

export function Header({ companyInfo }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About Us' },
    { href: '/#testimonials', label: 'Testimonials' },
    { href: '/areas', label: 'Service Areas' },
    { href: '/blog', label: 'Blog' },
    { href: '/#contact', label: 'Contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg py-3'
          : 'bg-white/95 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between flex-nowrap">
          <Link href="/" className="flex items-center space-x-2 group shrink-0">
            <Image
              src={urlFor(companyInfo.logo).width(128).height(128).url()}
              alt={companyInfo.logo?.alt || companyInfo.name}
              width={56}
              height={56}
              className="rounded-full lg:w-10 lg:h-10 xl:w-14 xl:h-14"
            />
            <span className="text-xl font-bold text-tree-green group-hover:text-tree-green-dark transition-colors hidden xl:inline whitespace-nowrap">
              {companyInfo.name}
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-3 xl:gap-6">
            {navLinks.map((link) =>
              link.href.startsWith('/') ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-tree-green font-medium transition-colors text-xs xl:text-sm whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-tree-green font-medium transition-colors text-xs xl:text-sm whitespace-nowrap"
                >
                  {link.label}
                </a>
              ),
            )}
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <a
              href={`tel:${companyInfo.phone.replace(/\D/g, '')}`}
              className="hidden md:flex items-center space-x-2 text-tree-green hover:text-tree-green-dark font-semibold transition-colors whitespace-nowrap"
              title={companyInfo.phone}
            >
              <Phone className="h-5 w-5 shrink-0" />
              <span className="hidden xl:inline text-sm">{companyInfo.phone}</span>
            </a>

            <Button
              asChild
              className="hidden md:inline-flex bg-accent-orange hover:bg-accent-orange-dark text-white text-sm px-3 xl:px-4"
            >
              <a href="#contact">Free Quote</a>
            </Button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-tree-green transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4 space-y-3">
            {navLinks.map((link) =>
              link.href.startsWith('/') ? (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-700 hover:text-tree-green font-medium py-2 transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-700 hover:text-tree-green font-medium py-2 transition-colors"
                >
                  {link.label}
                </a>
              ),
            )}
            <a
              href={`tel:${companyInfo.phone.replace(/\D/g, '')}`}
              className="flex items-center space-x-2 text-tree-green hover:text-tree-green-dark font-semibold py-2 transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span>{companyInfo.phone}</span>
            </a>
            <Button
              asChild
              className="w-full bg-accent-orange hover:bg-accent-orange-dark text-white"
            >
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                Get Free Quote
              </a>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
