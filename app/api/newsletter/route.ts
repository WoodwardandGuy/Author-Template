import { NextResponse } from 'next/server';

/**
 * Newsletter signup endpoint — STUB.
 *
 * ⚠️ LAUNCH BLOCKER: this is intentionally not wired to a provider yet.
 * Once an email platform is chosen (Flodesk, MailerLite, Kit/ConvertKit,
 * Mailchimp, …), implement the POST to that provider's API here using its
 * key + list/audience id from the environment, e.g.:
 *
 *   NEWSLETTER_API_KEY=...
 *   NEWSLETTER_LIST_ID=...
 *
 * Until then this returns 501 so the UI shows a graceful "not connected" state.
 */

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

    // TODO: forward `email` to the chosen provider's subscribe endpoint.
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
