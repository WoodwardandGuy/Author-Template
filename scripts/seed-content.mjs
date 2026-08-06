/**
 * Content seeder — patches the existing book docs + Author Info with client-supplied,
 * ship-ready copy, sets the Featured Release, and creates the launch event.
 * Verbatim descriptions/bio are preserved exactly as provided.
 *
 * Run:  SANITY_WRITE_TOKEN='...' node scripts/seed-content.mjs
 */
import { createClient } from '@sanity/client';

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

const r = (key, store, label, url) => ({ _key: key, store, label, url });

const DROWNING_DESC = `A twisty psychological thriller that asks the question: What happens when you can no longer separate the truth from the lie?

THE LIE: Ruby Powell is perfect. She lives in her dream home in the most affluent neighborhood in Dallas. She's a doting mother, a devoted wife, and a respected member of her community. She takes pride in serving as the president of both her son's elementary school PTA and her daughter's high school soccer Booster Club. Her kids adore her, and her husband is still her best friend after eighteen years of marriage.

THE TRUTH: Ruby Powell is a full-figured, middle-aged housewife, living in a house she's grown to despise. She detests her husband, who is engaged in a long and ongoing affair. Her teenage daughter loathes her, and her sweet, gentle six-year-old son suffers from PTSD after being the victim of a kidnapping as a toddler. And she's addicted to anti-anxiety pills due to a recurring nightmare that has started to blur the distinction between fact and fiction.

As Ruby's carefully crafted facade begins to crumble, the discovery of a body threatens to bring a terrible, long-held secret to light.`;

const AVERY_DESC = `Avery Knox has the ideal life—the perfect house, the perfect career, and the perfect husband. Still hopelessly in love after decades of marriage, she and Grady are the envy of everyone around them. But when Grady unexpectedly passes away, Avery's perfect world is shattered.

In the wake of Grady's death, Avery does her best to pick up the pieces and move on with her life. But after eighteen months, she realizes that the only way to move forward is to stop living in the past. Eager for a fresh start, Avery makes the gut-wrenching decision to pack up and move out of the home where she and Grady spent decades building their perfect life together.

Within an hour of moving into her new home, she meets two strangers who will change the trajectory of her life forever: Callum, the mysterious, gorgeous next-door neighbor, whose presence alone leaves Avery tongue-tied. And Mettie, the spunky, southern spitfire who makes Avery feel alive again for the first time since Grady's death.

But just as she's settling into her new life, Avery's world comes crashing down around her... again. She quickly finds herself trapped in a nightmare she can't wake up from. When it comes to light that everything she believed to be true about her marriage—everything she thought she knew about her husband—was a lie, Avery is forced to face the truth. Perfect doesn't exist.

Was Grady's death a tragic accident, or cold blooded murder?

Someone has been watching her.
Someone will betray her.
Someone wants her dead.

The question is… who?`;

const HEARTROOTS_DESC = `Every summer since she was a kid, Wilder lived for just thirteen days. Thirteen days of whispered promises, of shared secrets under the aspens, of feelings too big for such a small window of time. Ten summers, that's all she got with Foster—the boy who made her feel like her bones were made of light.

Then the summer came when the light vanished. The summer Foster died.

Now twenty-four, Wilder is suffocating in a life that doesn't feel like hers. A marriage built on lies. A future she never chose. But when a box of forgotten memories pulls her back to the place where it all began, she finds herself chasing ghosts: the boy she lost, the truths buried beneath his absence, and the version of herself she left in the trees.

As past and present bleed together, Wilder must confront the love that never let her go, and decide whether some roots are meant to stay tangled, no matter how deep the scars.

Poetic, aching, and wildly romantic, Heart Roots is a story of first love, last chances, and the kind of heartbreak that reshapes a soul.`;

const books = [
  {
    id: 'book-drowning-in-paper-flowers',
    set: {
      title: 'Drowning in Paper Flowers: A Novel',
      editionNote: 'Now with a new bonus chapter!',
      genre: 'Thriller',
      isbn: '9781668270769',
      publicationDate: '2026-08-11',
      description: DROWNING_DESC,
      retailers: [
        r('ss', 'Other', 'Simon & Schuster', 'https://www.simonandschuster.com/books/Drowning-in-Paper-Flowers/E-L-Westbury/9781668270769'),
        r('amz-pb', 'Amazon', 'Amazon (Paperback)', 'https://www.amazon.com/Drowning-Paper-Flowers-L-Westbury/dp/1668270765'),
        r('amz-kdl', 'Amazon', 'Amazon (Kindle)', 'https://us.amazon.com/Drowning-Paper-Flowers-L-Westbury-ebook/dp/B0H2FCS3WT'),
        r('bam', 'Other', 'Books-A-Million', 'https://www.booksamillion.com/p/Drowning-Paper-Flowers/E-L-Westbury/9781668270769'),
        r('interabang', 'Other', 'Interabang Books', 'https://interabangbooks.com/book/9781668270769'),
        r('apple-audio', 'Apple Books', 'Apple Books (Audio)', 'https://books.apple.com/us/audiobook/drowning-in-paper-flowers-unabridged/id1818621846'),
      ],
    },
  },
  {
    id: 'book-agreeable-avery',
    set: {
      title: 'Agreeable Avery',
      genre: 'Thriller', // FLAG: romantic suspense — confirm placement with Erika
      isbn: '9798218340490',
      publicationDate: '2023-12-24',
      description: AVERY_DESC,
      retailers: [
        r('amz-pb', 'Amazon', 'Amazon (Paperback)', 'https://us.amazon.com/Agreeable-Avery-L-Westbury/dp/B0CQLRJD4P'),
        r('amz-kdl', 'Amazon', 'Amazon (Kindle)', 'https://us.amazon.com/Agreeable-Avery-L-Westbury-ebook/dp/B0CP7266BT'),
      ],
    },
  },
  {
    id: 'book-heart-roots',
    set: {
      title: 'Heart Roots',
      genre: 'Romance',
      isbn: '9798218716493',
      publicationDate: '2025-07-31',
      description: HEARTROOTS_DESC,
      retailers: [
        r('amz-pb', 'Amazon', 'Amazon (Paperback)', 'https://www.amazon.com/Heart-Roots-L-Westbury/dp/B0FK2WTJ6N'),
        r('amz-kdl', 'Amazon', 'Amazon (Kindle)', 'https://www.amazon.com/Heart-Roots-L-Westbury-ebook/dp/B0FJZNHXTK'),
        r('audible', 'Audible', 'Audible', 'https://us.amazon.com/Audible-Heart-Roots/dp/B0H5RHMJQD'),
      ],
    },
  },
];

async function main() {
  console.log('Patching books…');
  for (const b of books) {
    await client.patch(b.id).set(b.set).commit();
    console.log(`  ${b.set.title}`);
  }

  console.log('Patching Author Information…');
  await client
    .patch('authorInfo')
    .set({
      // FLAG: tagline + shortBio are agency drafts pending Erika's approval.
      tagline: "Twisty domestic thrillers with a hopeless romantic's heart",
      shortBio:
        "E.L. Westbury writes twisty domestic thrillers with a hopeless romantic's heart. She lives in Texas with her husband, three kids, and two fur babies.",
      longBio:
        "E.L. Westbury is a wife, mother of five (three humans and two fur babies), and coffee enthusiast. Even though her writing is full of snaps, crackles, and pops, she's a hopeless romantic at heart. When she isn't writing, she's trying to convince her husband to watch The Notebook for the hundredth time, laughing at her kids' attempts to teach her Gen Z slang, or curled up on the couch covered in dog kisses. She lives in Texas but often escapes to Colorado, where she finds peace in wildflowers, red wine, and mountain air.",
      socials: {
        instagram: 'https://www.instagram.com/e.l._westbury',
        tiktok: 'https://www.tiktok.com/@e.l.westbury_',
        facebookGroup: 'https://www.facebook.com/groups/1252976883625203',
        facebook: 'https://www.facebook.com/erika.westbury',
        goodreads: 'https://www.goodreads.com/author/show/47120122.E_L_Westbury',
        bookbub: 'https://www.bookbub.com/profile/e-l-westbury',
      },
    })
    .commit();
  console.log('  done');

  console.log('Setting Featured Release (Drowning in Paper Flowers)…');
  await client.createIfNotExists({
    _id: 'featuredRelease',
    _type: 'featuredRelease',
    enabled: true,
    label: 'New from Atria Books',
    headline: 'What happens when you can no longer separate the truth from the lie?',
    ctaText: 'Pre-order',
    book: { _type: 'reference', _ref: 'book-drowning-in-paper-flowers' },
  });
  console.log('  done');

  console.log('Creating launch event…');
  await client.createIfNotExists({
    _id: 'event-interabang-2026-08-21',
    _type: 'event',
    title: 'Drowning in Paper Flowers — Discussion & Book Signing',
    date: '2026-08-21T23:00:00.000Z', // 6:00 PM CDT
    venue: 'Interabang Books',
    city: 'Dallas',
    region: 'TX',
    url: 'https://interabangbooks.com/event/2026-08-21/drowning-paper-flowers-e-l-westbury',
    description: '5600 W Lovers Ln, Ste 142, Dallas, TX 75209. Discussion and book signing with E.L. Westbury.',
  });
  console.log('  done');

  console.log('\nAll content seeded.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
