import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { Services } from '@/components/home/Services';
import { BrandStatement } from '@/components/home/BrandStatement';
import { EmergencyCTA } from '@/components/home/EmergencyCTA';
import { Testimonials } from '@/components/home/Testimonials';
import { FAQ } from '@/components/home/FAQ';
import { ContactForm } from '@/components/home/ContactForm';
import { getHomePageData, getCompanyInfo } from '@/lib/sanity.fetch';
import { generateFAQPageSchema } from '@/lib/schema';

export async function generateMetadata(): Promise<Metadata> {
  const companyInfo = await getCompanyInfo();

  return {
    title: `Tree Service Harrisburg PA | Tree Removal & Trimming | ${companyInfo.name}`,
    description:
      'Top-rated tree service in Harrisburg, PA. Professional tree removal, trimming, stump grinding, and 24/7 emergency service. Licensed & insured. Free estimates — call today!',
    alternates: { canonical: '/' },
  };
}

export default async function Home() {
  const {
    companyInfo,
    heroContent,
    services,
    testimonials,
    brandStatement,
    emergencyCTA,
    faqItems,
    siteContent,
  } = await getHomePageData();

  const faqSchema = faqItems.length > 0 ? generateFAQPageSchema(faqItems) : null;

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Hero content={heroContent} />
      <Services services={services} image={companyInfo.servicesImage} content={siteContent} />
      {brandStatement && (
        <BrandStatement
          content={brandStatement}
          image={companyInfo.brandImage}
        />
      )}
      {emergencyCTA && (
        <EmergencyCTA content={emergencyCTA} phone={companyInfo.phone} />
      )}
      <Testimonials testimonials={testimonials} content={siteContent} />
      <FAQ items={faqItems} content={siteContent} />
      <ContactForm companyInfo={companyInfo} content={siteContent} />
    </>
  );
}
