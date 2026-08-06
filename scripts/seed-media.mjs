/**
 * One-off media seeder. Uploads staged masters from _incoming/ into Sanity and
 * wires them onto documents. Idempotent-ish: Sanity dedupes identical assets by
 * content hash, and documents use fixed _ids with createIfNotExists so re-runs
 * don't clobber copy edited in Studio.
 *
 * Run:  SANITY_WRITE_TOKEN='...' node scripts/seed-media.mjs
 * Token is read from the environment only — never hardcoded or written to disk.
 */
import { createClient } from '@sanity/client';
import { createReadStream } from 'node:fs';

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error('Missing SANITY_WRITE_TOKEN in environment.');
  process.exit(1);
}

const client = createClient({
  projectId: '7jvlqlok',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

async function uploadImage(path, filename) {
  const asset = await client.assets.upload('image', createReadStream(path), { filename });
  console.log(`  uploaded ${filename} -> ${asset._id}`);
  return asset._id;
}

function imageRef(assetId, alt) {
  return { _type: 'image', asset: { _type: 'reference', _ref: assetId }, alt };
}

// Titles are DERIVED from filenames — confirm/correct in Studio.
const books = [
  { slug: 'agreeable-avery', title: 'Agreeable Avery', file: '_incoming/book-covers/agreeable-avery-1600.jpg' },
  { slug: 'drowning-in-paper-flowers', title: 'Drowning in Paper Flowers', file: '_incoming/book-covers/drowning-in-paper-flowers-1594.jpg', genre: 'Thriller' },
  { slug: 'heart-roots', title: 'Heart & Roots', file: '_incoming/book-covers/heart-roots-960.jpg' },
];

async function main() {
  console.log('Uploading author assets…');
  const logoId = await uploadImage('_incoming/brand/elw-seal-logo-1024.png', 'elw-seal-logo.png');
  const portraitId = await uploadImage('_incoming/author-photos/elw-headshot-cream-1600.jpg', 'elw-portrait.jpg');

  console.log('Seeding Author Information…');
  await client.createIfNotExists({
    _id: 'authorInfo',
    _type: 'authorInfo',
    name: 'E.L. Westbury',
    tagline: 'Author', // PLACEHOLDER — replace with her real tagline
    email: 'Erikawestbury@gmail.com',
  });
  await client
    .patch('authorInfo')
    .set({
      logo: imageRef(logoId, 'E.L. Westbury'),
      portrait: imageRef(portraitId, 'E.L. Westbury'),
    })
    .commit();

  console.log('Uploading + creating books…');
  let order = 0;
  for (const book of books) {
    const coverId = await uploadImage(book.file, `${book.slug}.jpg`);
    await client.createIfNotExists({
      _id: `book-${book.slug}`,
      _type: 'book',
      title: book.title,
      slug: { _type: 'slug', current: book.slug },
      description: 'Jacket copy coming soon.', // PLACEHOLDER
      cover: imageRef(coverId, `${book.title} cover`),
      ...(book.genre ? { genre: book.genre } : {}),
      order: order++,
    });
    console.log(`  book: ${book.title}`);
  }

  console.log('Uploading extra assets to the library (not attached)…');
  await uploadImage('_incoming/author-photos/elw-headshot-square-800.jpg', 'elw-headshot-square.jpg');
  await uploadImage('_incoming/book-club-gallery/elw-couch-lifestyle-2400.jpg', 'elw-couch-lifestyle.jpg');
  await uploadImage('_incoming/book-covers/drowning-in-paper-flowers-promo-1080.jpg', 'drowning-promo.jpg');

  console.log('\nDone.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
