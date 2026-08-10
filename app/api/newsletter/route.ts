import { NextResponse } from 'next/server';

/**
 * Newsletter signup endpoint — Flodesk.
 *
 * Upserts the subscriber via Flodesk's API and, if a segment is configured,
 * adds them to it in the same call. Configure in the environment:
 *
 *   NEWSLETTER_API_KEY   Flodesk API key (Settings → Integrations → API)
 *   NEWSLETTER_LIST_ID   Flodesk segment id to add subscribers to (optional)
 *
 * If the key is absent the route returns 501 so the UI shows a graceful
 * "not connected" state rather than erroring.
 *
 * Flodesk auth is HTTP Basic with the API key as the username and an empty
 * password: Authorization: Basic base64("<key>:"). Docs: developers.flodesk.com
 */

const FLODESK_SUBSCRIBERS_URL = 'https://api.flodesk.com/v1/subscribers';
// Flodesk asks integrations to identify themselves with a descriptive User-Agent.
const USER_AGENT = 'ELWestbury Website (woodwardandguy.com)';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
    }

    const apiKey = process.env.NEWSLETTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Newsletter provider is not configured yet.' },
        { status: 501 },
      );
    }

    const auth = Buffer.from(`${apiKey}:`).toString('base64');
    const segmentId = process.env.NEWSLETTER_LIST_ID;

    // Creating a subscriber upserts by email, and segment_ids adds them to the
    // segment in the same request, so one call handles both new and returning.
    const body: Record<string, unknown> = { email };
    if (segmentId) {
      body.segment_ids = [segmentId];
    }

    const res = await fetch(FLODESK_SUBSCRIBERS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
        'User-Agent': USER_AGENT,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error('Flodesk error:', res.status, detail);
      return NextResponse.json(
        { error: 'Could not complete signup. Please try again later.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Newsletter route error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
