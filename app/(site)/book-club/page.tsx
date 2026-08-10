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
      <div className="bg-white/[0.04] py-4">
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
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-moss mb-3">
              For the Buriers
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-bone mb-4 tracking-tight">
              The Burier Book Club
            </h1>
            <p className="text-xl text-bone-dim leading-relaxed">
              Reading one of my books with your club? I want to see it. Send your
              book club photos and they might land right here — wine glasses,
              snack spreads, and heated theories encouraged.
            </p>
          </div>

          {photos.length > 0 ? (
            <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(220px,1fr))]">
              {photos.map((photo) => {
                const url = photo.image?.asset
                  ? urlFor(photo.image).width(600).height(450).url()
                  : null;
                if (!url) return null;
                const meta = [
                  photo.location,
                  photo.date
                    ? new Date(photo.date).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })
                    : null,
                ]
                  .filter(Boolean)
                  .join(' · ');
                return (
                  <figure
                    key={photo.id}
                    className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-white/[0.04] shadow-sm"
                  >
                    <Image
                      src={url}
                      alt={photo.image?.alt || `${photo.clubName} book club`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8 text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="text-sm font-semibold text-white">{photo.clubName}</p>
                      {meta && <p className="text-xs text-white/70">{meta}</p>}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          ) : (
            <p className="text-bone-dim text-lg py-8">
              No photos yet — be the first to share one.
            </p>
          )}

          {/* Submission path — routes to the contact form's book-club subject. */}
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-line px-6 py-3 font-medium text-bone transition-colors hover:bg-soil-2 hover:text-white"
            >
              Send your book club photos
            </Link>
            <p className="max-w-sm text-sm text-bone-dim leading-relaxed">
              By sending a photo, you&rsquo;re giving E.L. the okay to share it
              here and on her socials.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
