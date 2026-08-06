import { groq } from 'next-sanity';

export const companyInfoQuery = groq`
  *[_type == "companyInfo"][0] {
    name,
    phone,
    email,
    address {
      street,
      city,
      state,
      zip
    },
    hours {
      weekday,
      weekend
    },
    tagline,
    logo { asset->, alt }
  }
`;

export const heroContentQuery = groq`
  *[_type == "heroContent"][0] {
    headline,
    subheadline,
    phoneNumber,
    ctaText
  }
`;

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    "id": _id,
    title,
    description,
    icon,
    "slug": slug.current
  }
`;

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc, date desc) {
    "id": _id,
    name,
    location,
    rating,
    text,
    date
  }
`;

export const serviceAreasQuery = groq`
  *[_type == "serviceArea"] | order(order asc, name asc) {
    "id": _id,
    name,
    state
  }
`;

export const whyChooseUsQuery = groq`
  *[_type == "whyChooseUsItem"] | order(order asc) {
    "id": _id,
    title,
    description,
    icon
  }
`;

export const homePageQuery = groq`{
  "companyInfo": *[_type == "companyInfo"][0] {
    name, phone, email,
    address { street, city, state, zip },
    hours { weekday, weekend },
    tagline,
    logo { asset->, alt },
    servicesImage { asset->, alt },
    brandImage { asset->, alt }
  },
  "heroContent": *[_type == "heroContent"][0] {
    headline, subheadline, phoneNumber, ctaText,
    backgroundImage { asset->, alt }
  },
  "services": *[_type == "service"] | order(order asc) {
    "id": _id, title, description, icon, "slug": slug.current
  },
  "testimonials": *[_type == "testimonial"] | order(order asc, date desc) {
    "id": _id, name, location, rating, text, date
  },
  "brandStatement": *[_type == "brandStatement"][0] {
    tagline, headline, body
  },
  "emergencyCTA": *[_type == "emergencyCTA"][0] {
    headline, subtext, buttonText
  },
  "faqItems": *[_type == "faqItem"] | order(order asc) {
    "id": _id, question, answer
  },
  "siteContent": *[_type == "siteContent"][0] {
    servicesHeadline, servicesSubtext, servicesFooterText,
    testimonialsHeadline, testimonialsRatingText,
    faqHeadline, faqSubtext,
    contactHeadline, contactSubtext, contactInfoTitle, contactButtonText,
    blogHeadline, blogSubtext, blogFeaturedLabel, blogReadMoreText,
    blogMoreArticlesText, blogViewAllText, blogEmptyText, blogBackText,
    blogAllArticlesHeadline,
    footerEmergencyText, footerCopyrightText
  }
}`;

export const siteContentQuery = groq`
  *[_type == "siteContent"][0] {
    servicesHeadline, servicesSubtext, servicesFooterText,
    testimonialsHeadline, testimonialsRatingText,
    faqHeadline, faqSubtext,
    contactHeadline, contactSubtext, contactInfoTitle, contactButtonText,
    blogHeadline, blogSubtext, blogFeaturedLabel, blogReadMoreText,
    blogMoreArticlesText, blogViewAllText, blogEmptyText, blogBackText,
    blogAllArticlesHeadline,
    footerEmergencyText, footerCopyrightText
  }
`;

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    "id": _id,
    title,
    description,
    icon,
    "slug": slug.current,
    metaDescription,
    longDescription,
    featuredImage { asset->, alt }
  }
`;

export const serviceSlugsQuery = groq`
  *[_type == "service"] { "slug": slug.current }
`;

export const serviceAreaBySlugQuery = groq`
  *[_type == "serviceArea" && slug.current == $slug][0] {
    "id": _id,
    name,
    state,
    "slug": slug.current,
    metaDescription,
    description,
    latitude,
    longitude
  }
`;

export const serviceAreaSlugsQuery = groq`
  *[_type == "serviceArea"] { "slug": slug.current }
`;

export const serviceAreasWithSlugsQuery = groq`
  *[_type == "serviceArea"] | order(order asc, name asc) {
    "id": _id,
    name,
    state,
    "slug": slug.current,
    latitude,
    longitude
  }
`;

export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedDate desc) [$start...$end] {
    "id": _id,
    title,
    "slug": slug.current,
    publishedDate,
    excerpt,
    featuredImage {
      asset->,
      alt
    },
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
    featuredImage {
      asset->,
      alt
    },
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
