# Author Website Template

A modern, SEO-optimized website template for authors, built with Next.js, TypeScript, Tailwind CSS, and Sanity CMS. All content is editable from the Sanity Studio at `/studio` — no code changes needed to launch a new author.

## Features

- **Next.js App Router** with server-side rendering for SEO
- **Sanity CMS** with live preview, draft mode, and visual editing
- **Books** collection with covers, blurbs, genre/series grouping, and retailer links
- **Featured Release** module to spotlight a new or upcoming title
- **Events & Appearances** — time-based; past events auto-hide
- **Blog** with pagination, portable-text content, and Article schema
- **Praise / blurbs** carousel and an FAQ accordion
- **Contact form** (via Resend) that forwards to a private inbox
- **Newsletter signup** (provider-agnostic; see launch notes)
- **Schema.org JSON-LD**: Person site-wide, Book on book pages
- **Responsive, theme-neutral design** — swap two brand colors to rebrand

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **CMS**: Sanity
- **Email**: Resend
- **Icons**: Lucide React

## Getting Started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the site and
[http://localhost:3000/studio](http://localhost:3000/studio) for the CMS.

### Environment Variables

See `.env.example`. At minimum you need a Sanity project (`NEXT_PUBLIC_SANITY_PROJECT_ID`)
and `NEXT_PUBLIC_SITE_URL`. Resend and newsletter keys are optional until you wire up
those forms.

## Content Model (Sanity)

Singletons (edited in place): **Author Information**, **Hero Section**,
**Featured Release**, **Site Content**.

Collections: **Book**, **Praise / Blurb**, **Event**, **FAQ Item**, **Blog Post**,
plus the **About Statement** used on the home page.

## Customization

### Brand colors

Edit the two color tokens in `tailwind.config.ts`:

```ts
ink:   { DEFAULT: '#2A2733', dark: '#1A1822' },  // primary / dark surfaces
brand: { DEFAULT: '#9A7B4F', dark: '#7C6340' },  // buttons / highlights
```

Everything else (headings, buttons, footer, hero) derives from these.

### Fonts

The base font is Inter (`app/layout.tsx`). Swap it for a serif display face if the
brand calls for it.

## Launch checklist / known blockers

- **Newsletter signup is a stub.** `/api/newsletter` returns `501` until an email
  provider (Flodesk, MailerLite, Kit, …) is chosen and its keys are set. Implement
  the provider call in `app/api/newsletter/route.ts`.
- **Contact form** needs `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (verified domain),
  and `CONTACT_TO_EMAIL`. The destination inbox is never rendered client-side.
- Replace the favicon set in `public/` and the placeholder About bio.

## Scripts

```bash
npm run dev        # start dev server
npm run build      # production build
npm start          # run production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```
