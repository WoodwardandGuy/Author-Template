import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { urlFor } from '@/lib/sanity.image';
import { getBookClubPhotos } from '@/lib/sanity.fetch';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Book Club',
  description: 'Reader and book-club photos from the community.',
  alternates: { canonical: '/book-club' },
  openGraph: {
    title: 'Book Club',
    description: 'Reader and book-club photos from the community.',
    url: `${SITE_URL}/book-club`,
    type: 'website',
  },
};

export default async function BookClubPage() {
  const photos = await getBookClubPhotos();

  return (
    <>
      <div className="bg-ink/[0.04] py-4">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Book Club</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-2xl mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink mb-4 tracking-tight">
              Book Club
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Read with your club? Share a photo and it might land here.
            </p>
          </div>

          {photos.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
              {photos.map((photo) => {
                const url = photo.image?.asset
                  ? urlFor(photo.image).width(700).url()
                  : null;
                if (!url) return null;
                const meta = [photo.location, photo.date
                  ? new Date(photo.date).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })
                  : null]
                  .filter(Boolean)
                  .join(' · ');
                return (
                  <figure
                    key={photo.id}
                    className="mb-6 break-inside-avoid rounded-lg overflow-hidden shadow-md bg-white"
                  >
                    <Image
                      src={url}
                      alt={photo.image?.alt || `${photo.clubName} book club`}
                      width={700}
                      height={525}
                      className="w-full h-auto"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <figcaption className="p-4">
                      <p className="font-semibold text-ink-dark">{photo.clubName}</p>
                      {meta && <p className="text-sm text-gray-500">{meta}</p>}
                      {photo.caption && (
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                          {photo.caption}
                        </p>
                      )}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-600 text-lg py-8">
              No photos yet — be the first to share one.
            </p>
          )}

          {/* Submission path — routes to the Resend contact form's book-club subject. */}
          <div className="mt-16 bg-ink/[0.03] rounded-2xl p-8 md:p-10 text-center">
            <h2 className="text-2xl font-bold text-ink mb-3 tracking-tight">
              Share your book club photo
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Send your photo through the contact form — choose{' '}
              <span className="font-medium">“Book club submission”</span> as the subject
              and attach your image. With your OK, it may be featured here.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center bg-brand hover:bg-brand-dark text-white font-medium px-7 py-3 rounded-lg transition-colors"
            >
              Submit a photo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
