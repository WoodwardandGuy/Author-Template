export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  slug: string;
}

export interface ServiceFull extends Service {
  metaDescription?: string;
  longDescription?: string;
  featuredImage?: SanityImage;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
}

export interface ServiceArea {
  id: string;
  name: string;
  state: string;
  slug?: string;
  latitude?: number;
  longitude?: number;
}

export interface ServiceAreaFull extends ServiceArea {
  slug: string;
  metaDescription?: string;
  description?: string;
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface HeroContent {
  headline: string;
  subheadline: string;
  phoneNumber: string;
  ctaText: string;
  backgroundImage?: SanityImage;
}

export interface CompanyInfo {
  name: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  hours: {
    weekday: string;
    weekend: string;
  };
  tagline: string;
  logo?: SanityImage;
  servicesImage?: SanityImage;
  brandImage?: SanityImage;
}

export interface BrandStatementContent {
  tagline: string;
  headline: string;
  body: string;
}

export interface EmergencyCTAContent {
  headline: string;
  subtext: string;
  buttonText: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface SiteContent {
  servicesHeadline: string;
  servicesSubtext: string;
  servicesFooterText: string;
  testimonialsHeadline: string;
  testimonialsRatingText: string;
  faqHeadline: string;
  faqSubtext: string;
  contactHeadline: string;
  contactSubtext: string;
  contactInfoTitle: string;
  contactButtonText: string;
  blogHeadline: string;
  blogSubtext: string;
  blogFeaturedLabel: string;
  blogReadMoreText: string;
  blogMoreArticlesText: string;
  blogViewAllText: string;
  blogEmptyText: string;
  blogBackText: string;
  blogAllArticlesHeadline: string;
  footerEmergencyText: string;
  footerCopyrightText: string;
}

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
