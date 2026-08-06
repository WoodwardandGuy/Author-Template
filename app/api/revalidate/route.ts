import { revalidatePath } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

/**
 * On-publish revalidation.
 *
 * Wire a Sanity webhook (sanity.io/manage → API → Webhooks) to POST here on
 * create/update/delete, with a secret matching SANITY_REVALIDATE_SECRET and a
 * projection that includes `_type` and `slug`. Published edits then appear on the
 * live site within seconds — no manual redeploy. (SanityLive covers preview mode;
 * this covers production.)
 */

type WebhookBody = {
  _type?: string;
  slug?: { current?: string };
};

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookBody>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return new Response('Invalid signature', { status: 401 });
    }
    if (!body?._type) {
      return NextResponse.json({ message: 'Missing _type' }, { status: 400 });
    }

    const slug = body.slug?.current;
    const paths = new Set<string>();

    switch (body._type) {
      case 'book':
        paths.add('/books');
        if (slug) paths.add(`/books/${slug}`);
        break;
      case 'event':
        paths.add('/events');
        break;
      case 'press':
        paths.add('/press');
        break;
      case 'bookClubPhoto':
        paths.add('/book-club');
        break;
      case 'blogPost':
        paths.add('/blog');
        if (slug) paths.add(`/blog/${slug}`);
        break;
      default:
        // singletons (authorInfo, heroContent, featuredRelease, siteContent,
        // brandStatement, praise, faqItem) affect shared layout/home.
        break;
    }

    // Site-wide singletons live in the shared layout — revalidate it every time.
    revalidatePath('/', 'layout');
    const pathList = Array.from(paths);
    pathList.forEach((path) => revalidatePath(path));

    return NextResponse.json({
      revalidated: true,
      type: body._type,
      paths: ['/'].concat(pathList),
    });
  } catch (err) {
    return NextResponse.json({ message: String(err) }, { status: 500 });
  }
}
