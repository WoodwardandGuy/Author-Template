import type { Metadata } from 'next';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity.image';
import { ContactForm } from '@/components/home/ContactForm';
import { getBookClubPhotos, getSiteContent } from '@/lib/sanity.fetch';
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
  const [photos, siteContent] = await Promise.all([
    getBookClubPhotos(),
    getSiteContent(),
  ]);

  return (
    <>
      {/* Header band */}
      <section className="bg-smokyGreen text-ivory">
        <div className="mx-auto max-w-[1280px] px-[clamp(20px,4vw,48px)] py-[84px]">
          <h1 className="font-display text-[clamp(40px,7vw,58px)] leading-[1.05]">
            Book Club
          </h1>
          <p className="mt-5 max-w-[560px] text-[17px] leading-[1.85] text-ivory/68">
            Send me your photos. If your club read one of mine, I want to see the wine,
            the snacks, and the person who guessed the ending on page nine.
          </p>
          <a
            href="#contact"
            className="mt-8 inline-flex bg-brass px-[30px] py-4 text-[12px] uppercase tracking-[0.16em] text-heroBlack transition-colors hover:bg-brassHover"
          >
            Submit your photos
          </a>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-[1280px] px-[clamp(20px,4vw,48px)] pb-24 pt-[76px]">
          {photos.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[30px]">
              {photos.map((photo) => {
                const url = photo.image?.asset
                  ? urlFor(photo.image).width(640).height(480).url()
                  : null;
                if (!url) return null;
                return (
                  <figure key={photo.id}>
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-warmSand">
                      <Image
                        src={url}
                        alt={photo.image?.alt || `${photo.clubName} book club`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 300px"
                      />
                    </div>
                    <figcaption>
                      <p className="mt-[15px] text-[17px] text-ink">{photo.clubName}</p>
                      {photo.location && (
                        <p className="text-[13.5px] text-ink/55">{photo.location}</p>
                      )}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          ) : (
            <p className="text-[16px] text-ink/60">
              Reader photos will appear here — send yours and it might be featured.
            </p>
          )}
        </div>
      </section>

      {/* Submission form, book-club subject preselected */}
      <ContactForm content={siteContent} defaultSubject="Book club submission" />
    </>
  );
}
