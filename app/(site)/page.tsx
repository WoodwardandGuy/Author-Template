import { AuthorBanner } from '@/components/home/AuthorBanner';
import { Hero } from '@/components/home/Hero';
import { FeaturedRelease } from '@/components/home/FeaturedRelease';
import { Books } from '@/components/home/Books';
import { BrandStatement } from '@/components/home/BrandStatement';
import { Praise } from '@/components/home/Praise';
import { Events } from '@/components/home/Events';
import { FAQ } from '@/components/home/FAQ';
import { Newsletter } from '@/components/home/Newsletter';
import { ContactForm } from '@/components/home/ContactForm';
import { getHomePageData } from '@/lib/sanity.fetch';
import { generateFAQPageSchema } from '@/lib/schema';

export default async function Home() {
  const {
    authorInfo,
    heroContent,
    books,
    praise,
    events,
    featuredRelease,
    brandStatement,
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
      <AuthorBanner name={authorInfo.name} />
      <Hero content={heroContent} />
      {featuredRelease && <FeaturedRelease content={featuredRelease} />}
      <Books books={books} content={siteContent} />
      {brandStatement && (
        <BrandStatement content={brandStatement} image={authorInfo.aboutImage} />
      )}
      <Praise praise={praise} content={siteContent} />
      <Events events={events} content={siteContent} />
      <FAQ items={faqItems} content={siteContent} />
      <Newsletter content={siteContent} />
      <ContactForm content={siteContent} />
    </>
  );
}
