# Harrisburg Tree Service Website

A modern, SEO-optimized website for a local tree service company built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Server-Side Rendering (SSR)** for optimal SEO performance
- **Responsive Design** that works perfectly on all devices
- **Schema.org JSON-LD** structured data for enhanced search visibility
- **Google Analytics 4** and **Meta Pixel** integration
- **Headless CMS Ready** - structured to easily integrate with Sanity CMS
- **Professional Design** with tree service color palette (forest green, earth brown, accent orange)
- **Lead Capture Form** for free quote requests
- **Mobile-First** approach for local service traffic

## Pages & Sections

### Home Page
- Hero section with clear call-to-action
- Services showcase (Tree Removal, Trimming, Stump Grinding, Emergency Service, etc.)
- Why Choose Us section (Licensed & Insured, 24/7 Emergency, Experience, Equipment)
- Service Areas (Harrisburg and surrounding Pennsylvania communities)
- Customer Testimonials with 5-star ratings
- Contact Form for free quotes

### Global Components
- Sticky header with click-to-call phone number
- Footer with NAP data (Name, Address, Phone), business hours, and quick links

## Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Analytics**: Google Analytics 4, Meta Pixel

## Getting Started

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Meta Pixel
NEXT_PUBLIC_META_PIXEL_ID=123456789012345
```

See `.env.example` for reference.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## CMS Integration (Future)

The project is structured to easily integrate with Sanity CMS:

1. **Mock Data Location**: `lib/sanity-mocks.ts`
2. **Data Types**: Defined interfaces for all content (Services, Testimonials, Service Areas, etc.)
3. **Component Props**: All components accept data via props for easy swapping

### To integrate Sanity CMS:

1. Install Sanity client: `npm install @sanity/client`
2. Create `lib/sanity.ts` with your Sanity configuration
3. Write GROQ queries to fetch data
4. Replace mock data imports in `app/page.tsx` with real Sanity queries

Example:
```typescript
// Replace this:
import { services } from '@/lib/sanity-mocks';

// With this:
import { getServices } from '@/lib/sanity';
const services = await getServices();
```

## SEO Features

- **Semantic HTML5**: Proper use of header, main, section, article, footer tags
- **Meta Tags**: Comprehensive title, description, and Open Graph tags
- **Schema.org**: LocalBusiness structured data with services, hours, and ratings
- **Image Optimization**: Using next/image for Core Web Vitals
- **Mobile Responsive**: Perfect mobile experience for local search traffic

## Customization

### Company Information

Update company details in `lib/sanity-mocks.ts`:
- Company name, phone, email, address
- Business hours
- Service areas

### Colors

The color palette is defined in:
- `tailwind.config.ts` - Theme configuration
- `app/globals.css` - Custom utility classes

Default colors:
- Tree Green: `#2D5016`
- Tree Brown: `#8B4513`
- Accent Orange: `#FF8C00`

### Content

All content is centralized in `lib/sanity-mocks.ts` for easy editing:
- Hero content
- Services list
- Why Choose Us items
- Service areas
- Testimonials

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with SEO & marketing scripts
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles & custom colors
├── components/
│   ├── home/               # Home page sections
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── ServiceAreas.tsx
│   │   ├── Testimonials.tsx
│   │   └── ContactForm.tsx
│   ├── layout/             # Global layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── marketing/          # Marketing technology
│   │   ├── GoogleAnalytics.tsx
│   │   └── MetaPixel.tsx
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── sanity-mocks.ts     # Mock CMS data (replace with Sanity later)
│   ├── schema.ts           # Schema.org structured data
│   └── utils.ts            # Utility functions
└── tailwind.config.ts      # Tailwind configuration
```

## Marketing Technology

The site includes infrastructure for:

1. **Google Analytics 4**: Tracks page views, user behavior, and conversions
2. **Meta Pixel**: Tracks Facebook/Instagram ad performance and retargeting

Both are implemented using environment variables and will only load when IDs are provided.

## Performance

- Static generation for fast page loads
- Image optimization with next/image
- Minimal JavaScript bundle size
- Lighthouse score optimized for SEO and performance

## License

All rights reserved.
