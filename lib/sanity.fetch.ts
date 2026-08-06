import { sanityFetch } from './sanity.live';
import { client } from './sanity.client';
import {
  companyInfoQuery,
  homePageQuery,
  siteContentQuery,
  servicesQuery,
  serviceBySlugQuery,
  serviceSlugsQuery,
  serviceAreaBySlugQuery,
  serviceAreaSlugsQuery,
  serviceAreasWithSlugsQuery,
  blogPostsQuery,
  blogPostBySlugQuery,
  blogPostCountQuery,
  blogPostSlugsQuery,
} from './sanity.queries';
import type {
  CompanyInfo,
  HeroContent,
  Service,
  ServiceFull,
  ServiceArea,
  ServiceAreaFull,
  Testimonial,
  BrandStatementContent,
  EmergencyCTAContent,
  FAQItem,
  SiteContent,
  BlogPost,
  BlogPostFull,
} from './types';

export async function getCompanyInfo(): Promise<CompanyInfo> {
  const { data } = await sanityFetch({ query: companyInfoQuery });
  return data as CompanyInfo;
}

interface HomePageData {
  companyInfo: CompanyInfo;
  heroContent: HeroContent;
  services: Service[];
  testimonials: Testimonial[];
  brandStatement: BrandStatementContent | null;
  emergencyCTA: EmergencyCTAContent | null;
  faqItems: FAQItem[];
  siteContent: SiteContent | null;
}

export async function getHomePageData(): Promise<HomePageData> {
  const { data } = await sanityFetch({ query: homePageQuery });
  return data as HomePageData;
}

const POSTS_PER_PAGE = 9;

export async function getBlogPosts(
  page: number = 1,
  perPage: number = POSTS_PER_PAGE,
): Promise<BlogPost[]> {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const { data } = await sanityFetch({
    query: blogPostsQuery,
    params: { start, end },
  });
  return data as BlogPost[];
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPostFull | null> {
  const { data } = await sanityFetch({
    query: blogPostBySlugQuery,
    params: { slug },
  });
  return data as BlogPostFull | null;
}

export async function getBlogPostCount(): Promise<number> {
  const { data } = await sanityFetch({ query: blogPostCountQuery });
  return data as number;
}

export async function getSiteContent(): Promise<SiteContent | null> {
  const { data } = await sanityFetch({ query: siteContentQuery });
  return data as SiteContent | null;
}

export async function getBlogPostSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(blogPostSlugsQuery);
}

export async function getServices(): Promise<Service[]> {
  const { data } = await sanityFetch({ query: servicesQuery });
  return data as Service[];
}

export async function getServiceBySlug(slug: string): Promise<ServiceFull | null> {
  const { data } = await sanityFetch({ query: serviceBySlugQuery, params: { slug } });
  return data as ServiceFull | null;
}

export async function getServiceSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(serviceSlugsQuery);
}

export async function getServiceAreaBySlug(slug: string): Promise<ServiceAreaFull | null> {
  const { data } = await sanityFetch({ query: serviceAreaBySlugQuery, params: { slug } });
  return data as ServiceAreaFull | null;
}

export async function getServiceAreaSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(serviceAreaSlugsQuery);
}

export async function getServiceAreasWithSlugs(): Promise<ServiceArea[]> {
  const { data } = await sanityFetch({ query: serviceAreasWithSlugsQuery });
  return data as ServiceArea[];
}
