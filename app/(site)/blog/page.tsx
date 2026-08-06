import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { getBlogPosts, getBlogPostCount, getSiteContent } from '@/lib/sanity.fetch';
import { urlFor } from '@/lib/sanity.image';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogPagination } from '@/components/blog/BlogPagination';
import type { BlogPost, SiteContent } from '@/lib/types';

const POSTS_PER_PAGE = 9;

export const metadata: Metadata = {
  title: 'Tree Care Blog | Harrisburg Tree Service',
  description:
    'Expert tips, advice, and insights on tree care, removal, trimming, and maintenance from the professionals at Harrisburg Tree Service.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Tree Care Blog | Harrisburg Tree Service',
    description:
      'Expert tips and insights on tree care from Harrisburg Tree Service.',
    type: 'website',
    url: 'https://www.treeprofessionalsofharrisburg.com/blog',
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
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
            <div className="flex items-center justify-center h-full min-h-[300px] bg-gray-100 text-gray-400">
              <Calendar className="h-16 w-16" />
            </div>
          )}
        </div>
        <div className="p-8 lg:p-10">
          <span className="inline-block bg-tree-green/10 text-tree-green text-sm font-semibold px-3 py-1 rounded-full mb-4">
            {content?.blogFeaturedLabel || 'Latest Post'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-tree-green-dark group-hover:text-tree-green transition-colors mb-4">
            {post.title}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
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
          <span className="inline-flex items-center gap-2 text-tree-green font-semibold group-hover:gap-3 transition-all">
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
      <section className="relative bg-gradient-to-br from-tree-green via-tree-green-dark to-tree-brown pt-16 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {siteContent?.blogHeadline || 'Tree Care Blog'}
          </h1>
          <p className="text-lg text-gray-100 max-w-2xl mx-auto">
            {siteContent?.blogSubtext || 'Tips, advice, and insights from our certified arborists to help you care for your trees and property.'}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-gray-50 pt-8 pb-20">
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
                      <h2 className="text-2xl font-bold text-tree-green-dark">
                        {siteContent?.blogMoreArticlesText || 'More Articles'}
                      </h2>
                      <Link
                        href="/blog/all"
                        className="inline-flex items-center gap-2 text-tree-green hover:text-tree-green-dark font-semibold transition-colors"
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
            <p className="text-center text-gray-600 text-lg py-20">
              {siteContent?.blogEmptyText || 'No blog posts yet. Check back soon!'}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
