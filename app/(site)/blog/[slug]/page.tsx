import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { getBlogPostBySlug, getBlogPostSlugs, getSiteContent } from '@/lib/sanity.fetch';
import { urlFor } from '@/lib/sanity.image';
import { BlogContent } from '@/components/blog/BlogContent';
import { SITE_URL } from '@/lib/site';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getBlogPostSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const imageUrl = post.featuredImage?.asset
    ? urlFor(post.featuredImage).width(1200).height(630).url()
    : null;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedDate,
      authors: [post.author],
      url: `${SITE_URL}/blog/${post.slug}`,
      ...(imageUrl && {
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: post.featuredImage.alt,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}

const BASE_URL = SITE_URL;

function generateBreadcrumbSchema(post: { title: string; slug: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${BASE_URL}/blog/${post.slug}` },
    ],
  };
}

function generateArticleSchema(
  post: { title: string; excerpt: string; publishedDate: string; author: string; slug: string },
  imageUrl: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: imageUrl,
    datePublished: post.publishedDate,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Person',
      name: post.author,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post, siteContent] = await Promise.all([
    getBlogPostBySlug(slug),
    getSiteContent(),
  ]);

  if (!post) {
    notFound();
  }

  const hasImage = post.featuredImage?.asset;
  const imageUrl = hasImage
    ? urlFor(post.featuredImage).width(1200).height(675).url()
    : null;
  const articleSchema = generateArticleSchema(post, imageUrl || '');
  const breadcrumbSchema = generateBreadcrumbSchema(post);

  const formattedDate = new Date(post.publishedDate).toLocaleDateString(
    'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' },
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="pt-16 pb-20">
        <div className="container mx-auto px-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-bone hover:text-bone font-medium transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            {siteContent?.blogBackText || 'Back to Blog'}
          </Link>

          <header className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-bone mb-6">
              {post.title}
            </h1>

            <div className="flex items-center justify-center gap-6 text-bone-dim">
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
          </header>

          {imageUrl && (
            <div className="max-w-4xl mx-auto mb-12">
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={post.featuredImage.alt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 900px"
                />
              </div>
            </div>
          )}

          <div className="max-w-3xl mx-auto">
            <BlogContent body={post.body} />
          </div>

          <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-line">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-bone hover:text-bone font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {siteContent?.blogBackText || 'Back to Blog'}
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
