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
  bookClubQuery,
  pressQuery,
  pressCountQuery,
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
  BookClubPhoto,
  PressItem,
  BrandStatementContent,
  FAQItem,
  SiteContent,
  BlogPost,
  BlogPostFull,
} from './types';
import { FALLBACK_AUTHOR, FALLBACK_HERO } from './placeholders';

export async function getAuthorInfo(): Promise<AuthorInfo> {
  const { data } = await sanityFetch({ query: authorInfoQuery });
  // Fall back to a neutral placeholder when the CMS is empty so pages don't crash.
  return (data as AuthorInfo | null) ?? FALLBACK_AUTHOR;
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
  const d = (data ?? {}) as Partial<HomePageData>;
  // Singletons can be null on an empty dataset — coalesce the ones pages read directly.
  return {
    authorInfo: d.authorInfo ?? FALLBACK_AUTHOR,
    heroContent: d.heroContent ?? FALLBACK_HERO,
    books: d.books ?? [],
    praise: d.praise ?? [],
    events: d.events ?? [],
    featuredRelease: d.featuredRelease ?? null,
    brandStatement: d.brandStatement ?? null,
    faqItems: d.faqItems ?? [],
    siteContent: d.siteContent ?? null,
  };
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

export async function getBookClubPhotos(): Promise<BookClubPhoto[]> {
  const { data } = await sanityFetch({ query: bookClubQuery });
  return data as BookClubPhoto[];
}

export async function getPress(): Promise<PressItem[]> {
  const { data } = await sanityFetch({ query: pressQuery });
  return data as PressItem[];
}

export async function getPressCount(): Promise<number> {
  const { data } = await sanityFetch({ query: pressCountQuery });
  return (data as number) ?? 0;
}
