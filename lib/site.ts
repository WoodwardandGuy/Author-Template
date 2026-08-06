/**
 * Canonical site URL, used for metadata, sitemaps, and JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL in your environment (no trailing slash).
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://example.com';
