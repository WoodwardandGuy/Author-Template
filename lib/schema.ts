import type { CompanyInfo, FAQItem, Service, ServiceArea } from './types';

export function generateLocalBusinessSchema(
  companyInfo: CompanyInfo,
  services: Service[] = [],
  serviceAreas: ServiceArea[] = [],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.treeprofessionalsofharrisburg.com',
    name: companyInfo.name,
    image: 'https://www.treeprofessionalsofharrisburg.com/og-image.jpg',
    url: 'https://www.treeprofessionalsofharrisburg.com',
    telephone: companyInfo.phone,
    email: companyInfo.email,
    ...(companyInfo.address?.street && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: companyInfo.address.street,
        addressLocality: companyInfo.address.city,
        addressRegion: companyInfo.address.state,
        postalCode: companyInfo.address.zip,
        addressCountry: 'US',
      },
    }),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.2732,
      longitude: -76.8867,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
        ],
        opens: '07:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    priceRange: '$$',
    areaServed: serviceAreas.length > 0
      ? serviceAreas.map((area) => ({
          '@type': 'City',
          name: area.name,
          containedInPlace: { '@type': 'State', name: area.state || 'Pennsylvania' },
        }))
      : [
          { '@type': 'City', name: 'Harrisburg', containedInPlace: { '@type': 'State', name: 'Pennsylvania' } },
        ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Tree Services',
      itemListElement: services.length > 0
        ? services.map((service) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service.title,
              description: service.description,
              url: `https://www.treeprofessionalsofharrisburg.com/services/${service.slug}`,
            },
          }))
        : [],
    },
  };
}

export function generateFAQPageSchema(faqItems: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
