import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getBlogPosts, getBlogPostCount, getSiteContent } from '@/lib/sanity.fetch';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogPagination } from '@/components/blog/BlogPagination';

const POSTS_PER_PAGE = 12;

export const metadata: Metadata = {
  title: 'All Articles',
  description: 'Browse every article, essay, and update from the author.',
};

interface AllArticlesPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function AllArticlesPage({
  searchParams,
}: AllArticlesPageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || '1', 10) || 1);

  const [posts, totalCount, siteContent] = await Promise.all([
    getBlogPosts(currentPage, POSTS_PER_PAGE),
    getBlogPostCount(),
    getSiteContent(),
  ]);

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-ink via-ink-dark to-ink-dark pt-16 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            {siteContent?.blogBackText || 'Back to Blog'}
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            {siteContent?.blogAllArticlesHeadline || 'All Articles'}
          </h1>
          <p className="text-lg text-gray-100">
            {totalCount} article{totalCount !== 1 ? 's' : ''} and counting.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-gray-50 pt-10 pb-20">
        <div className="container mx-auto px-4">
          {posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              <BlogPagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath="/blog/all"
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
