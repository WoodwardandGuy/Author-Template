import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
} from 'lucide-react';
import { urlFor } from '@/lib/sanity.image';
import type { CompanyInfo, SiteContent } from '@/lib/types';

interface FooterProps {
  companyInfo: CompanyInfo;
  siteContent?: SiteContent | null;
}

export function Footer({ companyInfo, siteContent }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-tree-green text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src={urlFor(companyInfo.logo).width(128).height(128).url()}
                alt={companyInfo.logo?.alt || companyInfo.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <span className="text-xl font-bold">{companyInfo.name}</span>
            </div>
            <p className="text-gray-300 mb-4">{companyInfo.tagline}</p>
            {/* Social links — uncomment and add real URLs when client has business pages
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/REAL-PAGE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com/REAL-PAGE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
            */}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${companyInfo.phone.replace(/\D/g, '')}`}
                  className="flex items-start space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>{companyInfo.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="flex items-start space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>{companyInfo.email}</span>
                </a>
              </li>
              {companyInfo.address?.street && (
                <li className="flex items-start space-x-2 text-gray-300">
                  <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>
                    {companyInfo.address.street}
                    <br />
                    {companyInfo.address.city}, {companyInfo.address.state}{' '}
                    {companyInfo.address.zip}
                  </span>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start space-x-2">
                <Clock className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p>{companyInfo.hours.weekday}</p>
                  <p className="mt-1">{companyInfo.hours.weekend}</p>
                  <p className="mt-2 text-accent-orange font-semibold">
                    {siteContent?.footerEmergencyText || '24/7 Emergency Service'}
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/services"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Our Services
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="/areas"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Service Areas
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>
            &copy; {currentYear} {companyInfo.name}. All rights reserved.
          </p>
          <p className="mt-2 text-sm">
            {siteContent?.footerCopyrightText || 'Licensed and Insured Tree Service Professionals'}
          </p>
        </div>
      </div>
    </footer>
  );
}
