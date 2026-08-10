import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { getBlogPosts, getBlogPostCount, getSiteContent } from '@/lib/sanity.fetch';
import { urlFor } from '@/lib/sanity.image';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogPagination } from '@/components/blog/BlogPagination';
import type { BlogPost, SiteContent } from '@/lib/types';
import { SITE_URL } from '@/lib/site';

const POSTS_PER_PAGE = 9;

export const metadata: Metadata = {
  title: 'Blog',
  description: 'News, essays, and behind-the-scenes notes from the author.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog',
    description: 'News, essays, and behind-the-scenes notes from the author.',
    type: 'website',
    url: `${SITE_URL}/blog`,
  },
};

function FeaturedPost({ post, content }: { post: BlogPost; content: SiteContent | null }) {
  const hasImage = post.featuredImage?.asset;
  const imageUrl = hasImage
    ? urlFor(post.featuredImage).width(1200).height(675).url()
    : null;

  const formattedDate = new Date(post.publishedDate).toLocaleDateString(
    'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' },
  );

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-soil-2 rounded-2xl shadow-lg overflow-hidden border border-line hover:shadow-xl transition-shadow duration-300">
        <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.featuredImage.alt}
              fill
              priority
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full min-h-[300px] bg-soil-2 text-bone-dim">
              <Calendar className="h-16 w-16" />
            </div>
          )}
        </div>
        <div className="p-8 lg:p-10">
          <span className="inline-block bg-soil-2/10 text-bone text-sm font-semibold px-3 py-1 rounded-full mb-4">
            {content?.blogFeaturedLabel || 'Latest Post'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-bone group-hover:text-bone transition-colors mb-4">
            {post.title}
          </h2>
          <p className="text-bone-dim leading-relaxed mb-6 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-bone-dim mb-6">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readingTime} min read
            </span>
          </div>
          <span className="inline-flex items-center gap-2 text-bone font-semibold group-hover:gap-3 transition-all">
            {content?.blogReadMoreText || 'Read Article'}
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || '1', 10) || 1);

  const [posts, totalCount, siteContent] = await Promise.all([
    getBlogPosts(currentPage, POSTS_PER_PAGE),
    getBlogPostCount(),
    getSiteContent(),
  ]);

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  const isFirstPage = currentPage === 1;
  const featuredPost = isFirstPage && posts.length > 0 ? posts[0] : null;
  const gridPosts = isFirstPage ? posts.slice(1) : posts;

  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-soil-2 via-soil to-soil pt-16 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {siteContent?.blogHeadline || 'Blog'}
          </h1>
          <p className="text-lg text-gray-100 max-w-2xl mx-auto">
            {siteContent?.blogSubtext || 'News, essays, and behind-the-scenes notes from the writing desk.'}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-soil-2 pt-8 pb-20">
        <div className="container mx-auto px-4">
          {posts.length > 0 ? (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <div className="mb-12">
                  <FeaturedPost post={featuredPost} content={siteContent} />
                </div>
              )}

              {/* Post Grid */}
              {gridPosts.length > 0 && (
                <>
                  {featuredPost && (
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-bold text-bone">
                        {siteContent?.blogMoreArticlesText || 'More Articles'}
                      </h2>
                      <Link
                        href="/blog/all"
                        className="inline-flex items-center gap-2 text-bone hover:text-bone font-semibold transition-colors"
                      >
                        {siteContent?.blogViewAllText || 'View All Articles'}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {gridPosts.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                </>
              )}

              <BlogPagination
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </>
          ) : (
            <p className="text-center text-bone-dim text-lg py-20">
              {siteContent?.blogEmptyText || 'No blog posts yet. Check back soon!'}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
