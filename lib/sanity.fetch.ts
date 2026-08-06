import { sanityFetch } from './sanity.live';
import { client } from './sanity.client';
import {
  authorInfoQuery,
  homePageQuery,
  siteContentQuery,
  booksQuery,
  bookBySlugQuery,
  bookSlugsQuery,
  praiseQuery,
  upcomingEventsQuery,
  featuredReleaseQuery,
  blogPostsQuery,
  blogPostBySlugQuery,
  blogPostCountQuery,
  blogPostSlugsQuery,
} from './sanity.queries';
import type {
  AuthorInfo,
  HeroContent,
  Book,
  BookFull,
  Praise,
  AppearanceEvent,
  FeaturedRelease,
  BrandStatementContent,
  FAQItem,
  SiteContent,
  BlogPost,
  BlogPostFull,
} from './types';

export async function getAuthorInfo(): Promise<AuthorInfo> {
  const { data } = await sanityFetch({ query: authorInfoQuery });
  return data as AuthorInfo;
}

interface HomePageData {
  authorInfo: AuthorInfo;
  heroContent: HeroContent;
  books: Book[];
  praise: Praise[];
  events: AppearanceEvent[];
  featuredRelease: FeaturedRelease | null;
  brandStatement: BrandStatementContent | null;
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

export async function getBooks(): Promise<Book[]> {
  const { data } = await sanityFetch({ query: booksQuery });
  return data as Book[];
}

export async function getBookBySlug(slug: string): Promise<BookFull | null> {
  const { data } = await sanityFetch({ query: bookBySlugQuery, params: { slug } });
  return data as BookFull | null;
}

export async function getBookSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(bookSlugsQuery);
}

export async function getPraise(): Promise<Praise[]> {
  const { data } = await sanityFetch({ query: praiseQuery });
  return data as Praise[];
}

export async function getUpcomingEvents(): Promise<AppearanceEvent[]> {
  const { data } = await sanityFetch({ query: upcomingEventsQuery });
  return data as AppearanceEvent[];
}

export async function getFeaturedRelease(): Promise<FeaturedRelease | null> {
  const { data } = await sanityFetch({ query: featuredReleaseQuery });
  return data as FeaturedRelease | null;
}
