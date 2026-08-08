import { NextResponse, type NextRequest } from 'next/server';

/**
 * Coming-soon gate.
 *
 * While active, every public request is rewritten to `/coming-soon`. The site is
 * still fully built and deployed — it's just hidden behind this one page.
 *
 * When it's active:
 *   - LOCKS PRODUCTION ONLY by default. The public production site (main → Vercel
 *     production) is gated; local dev and Vercel *preview* deploys (feature/design
 *     branches) stay open, so we can build and preview in peace.
 *   - `COMING_SOON=true`  → force the gate on everywhere (e.g. to test it locally).
 *   - `COMING_SOON=false` → force the gate off everywhere (set this in Vercel
 *     production when we're ready to actually launch).
 *
 * Previewing the locked production site:
 *   - Set `COMING_SOON_BYPASS=<some-secret>` in Vercel, then visit any URL with
 *     `?preview=<some-secret>`. That drops a cookie so you browse the real site
 *     normally. Clear the cookie (or use a private window) to see the gate again.
 *
 * Always allowed through, even while locked:
 *   - `/studio`  — the Sanity CMS, so content can still be edited.
 *   - `/api/*`   — revalidation webhooks and draft-mode still function.
 *   - `/coming-soon` and static assets.
 */

const BYPASS_COOKIE = 'coming-soon-bypass';

function isGateActive(): boolean {
  // Explicit switch wins in either direction.
  if (process.env.COMING_SOON === 'false') return false;
  if (process.env.COMING_SOON === 'true') return true;
  // Default: only the public production deployment is gated.
  return process.env.VERCEL_ENV === 'production';
}

export function proxy(request: NextRequest) {
  if (!isGateActive()) {
    return NextResponse.next();
  }

  const { pathname, searchParams } = request.nextUrl;

  // Never gate the CMS, API routes, the gate page itself, or Next internals/assets.
  if (
    pathname === '/coming-soon' ||
    pathname.startsWith('/studio') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.') // files: favicon.ico, robots.txt, images, etc.
  ) {
    return NextResponse.next();
  }

  const bypassToken = process.env.COMING_SOON_BYPASS;

  // A matching `?preview=` token drops the bypass cookie and continues.
  if (bypassToken && searchParams.get('preview') === bypassToken) {
    const url = request.nextUrl.clone();
    url.searchParams.delete('preview');
    const response = NextResponse.redirect(url);
    response.cookies.set(BYPASS_COOKIE, bypassToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return response;
  }

  // Anyone holding a valid bypass cookie sees the real site.
  if (bypassToken && request.cookies.get(BYPASS_COOKIE)?.value === bypassToken) {
    return NextResponse.next();
  }

  // Otherwise, show the coming-soon page (URL is preserved via rewrite).
  const url = request.nextUrl.clone();
  url.pathname = '/coming-soon';
  return NextResponse.rewrite(url, { status: 503 });
}

export const config = {
  // Run on everything except Next's static asset pipeline; finer filtering is
  // handled in the function body above.
  matcher: ['/((?!_next/static|_next/image).*)'],
};
