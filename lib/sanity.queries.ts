import { groq } from 'next-sanity';

const imageFields = `{ asset->, alt }`;

const bookFields = `
  "id": _id,
  title,
  subtitle,
  "slug": slug.current,
  cover ${imageFields},
  genre,
  series,
  seriesOrder,
  publicationDate,
  description,
  retailers[] { store, label, url }
`;

export const authorInfoQuery = groq`
  *[_type == "authorInfo"][0] {
    name,
    tagline,
    email,
    socials,
    logo ${imageFields}
  }
`;

export const heroContentQuery = groq`
  *[_type == "heroContent"][0] {
    headline,
    subheadline,
    ctaText,
    ctaLink,
    backgroundImage ${imageFields}
  }
`;

export const booksQuery = groq`
  *[_type == "book"] | order(order asc, publicationDate desc) {
    ${bookFields}
  }
`;

export const bookBySlugQuery = groq`
  *[_type == "book" && slug.current == $slug][0] {
    ${bookFields},
    isbn,
    longDescription,
    metaDescription
  }
`;

export const bookSlugsQuery = groq`
  *[_type == "book"] { "slug": slug.current }
`;

export const praiseQuery = groq`
  *[_type == "praise"] | order(order asc) {
    "id": _id,
    quote,
    attribution,
    source
  }
`;

// Only events dated today or later, soonest first.
export const upcomingEventsQuery = groq`
  *[_type == "event" && date >= now()] | order(date asc) {
    "id": _id,
    title,
    date,
    venue,
    city,
    region,
    url,
    description
  }
`;

export const featuredReleaseQuery = groq`
  *[_type == "featuredRelease"][0] {
    enabled,
    label,
    headline,
    ctaText,
    book-> { ${bookFields} }
  }
`;

export const faqQuery = groq`
  *[_type == "faqItem"] | order(order asc) {
    "id": _id, question, answer
  }
`;

export const siteContentQuery = groq`
  *[_type == "siteContent"][0] {
    booksHeadline, booksSubtext, booksFooterText,
    praiseHeadline,
    eventsHeadline, eventsSubtext, eventsEmptyText,
    faqHeadline, faqSubtext,
    contactHeadline, contactSubtext, contactButtonText,
    newsletterHeadline, newsletterSubtext, newsletterButtonText,
    blogHeadline, blogSubtext, blogFeaturedLabel, blogReadMoreText,
    blogMoreArticlesText, blogViewAllText, blogEmptyText, blogBackText,
    blogAllArticlesHeadline,
    footerTagline, footerCopyrightText
  }
`;

export const homePageQuery = groq`{
  "authorInfo": *[_type == "authorInfo"][0] {
    name, tagline, email, socials,
    logo ${imageFields},
    booksImage ${imageFields},
    aboutImage ${imageFields}
  },
  "heroContent": *[_type == "heroContent"][0] {
    headline, subheadline, ctaText, ctaLink,
    backgroundImage ${imageFields}
  },
  "books": *[_type == "book"] | order(order asc, publicationDate desc) {
    ${bookFields}
  },
  "praise": *[_type == "praise"] | order(order asc) {
    "id": _id, quote, attribution, source
  },
  "events": *[_type == "event" && date >= now()] | order(date asc) {
    "id": _id, title, date, venue, city, region, url, description
  },
  "featuredRelease": *[_type == "featuredRelease"][0] {
    enabled, label, headline, ctaText,
    book-> { ${bookFields} }
  },
  "brandStatement": *[_type == "brandStatement"][0] {
    tagline, headline, body
  },
  "faqItems": *[_type == "faqItem"] | order(order asc) {
    "id": _id, question, answer
  },
  "siteContent": *[_type == "siteContent"][0] {
    booksHeadline, booksSubtext, booksFooterText,
    praiseHeadline,
    eventsHeadline, eventsSubtext, eventsEmptyText,
    faqHeadline, faqSubtext,
    contactHeadline, contactSubtext, contactButtonText,
    newsletterHeadline, newsletterSubtext, newsletterButtonText,
    blogHeadline, blogSubtext, blogFeaturedLabel, blogReadMoreText,
    blogMoreArticlesText, blogViewAllText, blogEmptyText, blogBackText,
    blogAllArticlesHeadline,
    footerTagline, footerCopyrightText
  }
}`;

export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedDate desc) [$start...$end] {
    "id": _id,
    title,
    "slug": slug.current,
    publishedDate,
    excerpt,
    featuredImage ${imageFields},
    author,
    readingTime
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    "id": _id,
    title,
    "slug": slug.current,
    publishedDate,
    excerpt,
    featuredImage ${imageFields},
    author,
    readingTime,
    body[] {
      ...,
      _type == "image" => {
        ...,
        asset->
      }
    }
  }
`;

export const blogPostCountQuery = groq`
  count(*[_type == "blogPost"])
`;

export const blogPostSlugsQuery = groq`
  *[_type == "blogPost"] { "slug": slug.current }
`;
