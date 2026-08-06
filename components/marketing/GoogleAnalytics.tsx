import Script from 'next/script';

/**
 * GA4 pageview tracking. Renders nothing unless NEXT_PUBLIC_GA_MEASUREMENT_ID is set.
 * The measurement ID lives in the client's own Google Analytics account (per SOP).
 * No Google Ads / conversion tags — MVP author site, basic pageviews only.
 */
export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
