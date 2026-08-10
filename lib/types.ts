export interface SanityImage {
  asset: {
    _id: string;
    url: string;
    metadata?: {
      dimensions: {
        width: number;
        height: number;
      };
    };
  };
  alt: string;
}

export interface Socials {
  instagram?: string;
  tiktok?: string;
  facebookGroup?: string;
  facebook?: string;
  twitter?: string;
  goodreads?: string;
  bookbub?: string;
  newsletter?: string;
}

export interface AuthorInfo {
  name: string;
  tagline: string;
  email: string;
  shortBio?: string;
  longBio?: string;
  socials?: Socials;
  logo?: SanityImage;
  portrait?: SanityImage;
  booksImage?: SanityImage;
  aboutImage?: SanityImage;
}

export interface BookClubPhoto {
  id: string;
  image: SanityImage;
  clubName: string;
  location?: string;
  date?: string;
  caption?: string;
}

export interface PressItem {
  id: string;
  outlet: string;
  headline: string;
  url?: string;
  date?: string;
  logo?: SanityImage;
}

export interface HeroContent {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink?: string;
  backgroundImage?: SanityImage;
}

export interface Retailer {
  store: string;
  label?: string;
  url: string;
}

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  editionNote?: string;
  slug: string;
  cover?: SanityImage;
  order?: number;
  genre?: string;
  series?: string;
  seriesOrder?: number;
  publicationDate?: string;
  description: string;
  retailers?: Retailer[];
}

export interface BookFull extends Book {
  isbn?: string;
  longDescription?: string;
  metaDescription?: string;
}

export interface Praise {
  id: string;
  quote: string;
  attribution: string;
  source?: string;
}

export interface AppearanceEvent {
  id: string;
  title: string;
  date: string;
  venue?: string;
  city?: string;
  region?: string;
  url?: string;
  description?: string;
}

export interface FeaturedRelease {
  enabled: boolean;
  label?: string;
  headline?: string;
  ctaText?: string;
  book: Book | null;
}

export interface BrandStatementContent {
  tagline: string;
  headline: string;
  body: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface SiteContent {
  booksHeadline: string;
  booksSubtext: string;
  booksFooterText: string;
  praiseHeadline: string;
  eventsHeadline: string;
  eventsSubtext: string;
  eventsEmptyText: string;
  faqHeadline: string;
  faqSubtext: string;
  contactHeadline: string;
  contactSubtext: string;
  contactButtonText: string;
  newsletterHeadline: string;
  newsletterSubtext: string;
  newsletterButtonText: string;
  blogHeadline: string;
  blogSubtext: string;
  blogFeaturedLabel: string;
  blogReadMoreText: string;
  blogMoreArticlesText: string;
  blogViewAllText: string;
  blogEmptyText: string;
  blogBackText: string;
  blogAllArticlesHeadline: string;
  footerTagline: string;
  footerCopyrightText: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  publishedDate: string;
  excerpt: string;
  featuredImage: SanityImage;
  author: string;
  readingTime: number;
}

export interface BlogPostFull extends BlogPost {
  body: any[];
}
