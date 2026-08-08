# E.L. Westbury — Website Design Brief

**Purpose:** a single, self-contained starting point for a thorough design session
on the full site. It consolidates the brand, the real content, the current visual
system, and a page-by-page "current state → intended state" map so the design work
starts from context, not reconstruction.

**Status of the live site:** the production site (elwestbury.com, deployed from
`main` on Vercel) is hidden behind a coming-soon gate (`proxy.ts` → `/coming-soon`).
The gate **locks production only** — local dev and Vercel preview deploys (this and
other branches) render the real site, so design/build work is fully visible while the
public stays gated. Nothing public unlocks until `COMING_SOON=false` is set in Vercel
production. Design freely.

**How to use this doc:** Sections 1–4 are the brand and visual starting point.
Section 5 is the content the design must lay out (real, not lorem). Section 6 is
the page inventory. Sections 7–9 are constraints, open decisions, and the gap this
doc *cannot* fill for you — the explicit aesthetic direction, which needs a human
call (see §3).

---

## 1. Who this is for

**E.L. Westbury** (Erika Westbury) — novelist.

- **Tagline:** "Twisty domestic thrillers with a hopeless romantic's heart."
- **Bio (short):** "E.L. Westbury writes twisty domestic thrillers with a hopeless
  romantic's heart. She lives in Texas with her husband, three kids, and two fur
  babies."
- **Genre / mood:** domestic **thriller** as the spine, **romance** as the heart.
  The design has to hold both — unsettling and tender at once. Not cozy, not gory.
  Think dark-academia-adjacent suspense with warmth, aimed at a predominantly female
  book-club readership (BookBub / Goodreads / Facebook-group culture).
- **Catalog (real, in Sanity):**
  - *Agreeable Avery* — Thriller
  - *Drowning in Paper Flowers: A Novel* — Thriller
  - *Heart Roots* — Romance
  - An incoming **Atria** (Simon & Schuster imprint) title is expected — the Books
    model already supports an arbitrary-length retailer array for it.
- **Socials (all live in Sanity):** Instagram `@e.l._westbury`, TikTok
  `@e.l.westbury_`, Facebook (personal + a reader **Group**), Goodreads, BookBub.
- **Fan identity:** her readers are called **"Buriers"** — this is real brand
  language and should surface in the newsletter/community design (see §6 Newsletter).

---

## 2. Brand assets available

| Asset | Status |
|---|---|
| Logo | ✅ uploaded in Sanity (`authorInfo.logo`) |
| Author portrait | ✅ uploaded in Sanity (`authorInfo.portrait`) |
| About image | ❌ not yet |
| Book covers | ❌ none uploaded yet — design around ~320×500 placeholders; cap displayed width ≤ ~340px so covers stay crisp |
| Final palette | ⚠️ current `ink`/`brand` values are placeholders (see §4); treat as directional until she confirms hex codes |

---

## 3. Aesthetic direction — **NEEDS A HUMAN CALL** (the one real gap)

Everything else in this doc is concrete. This is not. The repo has a *functional*
brand system (two tokens, one font) but **no stated visual voice.** A thorough
design session should lock these before generating screens:

- **Reference sites / mood** — 2–4 author or publisher sites whose feel is right
  (e.g. the balance of thriller-dark vs. romantic-warm).
- **Type direction** — Inter alone reads generic. Choose a **display/serif face**
  for headlines to carry the literary tone; keep a clean sans for body. Pair intent
  should be decided here.
- **Palette intent** — confirm final `ink` (dark surface) + `brand` (accent) hex,
  and whether the site leans **light** (romantic, airy) or **dark** (thriller,
  moody) as its dominant mode. Current build is light-body / dark-accent.
- **Imagery treatment** — how covers, the portrait, and any texture/motif (paper
  flowers? shovel/burial motif from "Buriers"?) are handled.
- **Motion** — how far to lean on the signature animation and micro-interactions
  vs. restraint.

> If you have these, paste them in and this section stops being a gap. Until then,
> a design session will be *guessing* the voice — which is fine for exploration but
> should be flagged, not presented as her spec.

---

## 4. Current visual system (the starting point to reshape)

- **Framework/styling:** Next.js 16 (App Router) · Tailwind CSS · **shadcn/ui**
  (full primitive set, ~55 components — see §7) · Lucide icons.
- **Type:** Inter (base, via `next/font`), `app/layout.tsx`. No display face yet.
- **Brand tokens** (`tailwind.config.ts`) — the whole site derives from these two:
  ```ts
  ink:   { DEFAULT: '#2A2733', dark: '#1A1822' }  // primary / dark surfaces
  brand: { DEFAULT: '#9A7B4F', dark: '#7C6340' }  // gold — buttons / highlights
  ```
- **shadcn theme tokens** (`app/globals.css`): a standard neutral light/dark scale
  (`--background`, `--foreground`, `--primary`, `--muted`, `--border`, `--radius:
  0.5rem`, chart colors). Light mode is the shipped default.
- **Current feel:** neutral, tasteful, template-generic. Ink + gold gives a
  restrained "literary" baseline, but nothing yet expresses *thriller* or
  *romance* — that's the design opportunity.
- **Signature animation:** a "shovel → ELW" SVG stroke-draw is scaffolded
  (`components/home/SignatureAnimation.tsx` + `.signature` keyframes in
  `globals.css`), already `prefers-reduced-motion`-aware and once-per-session. The
  visual mark itself is open for design.

---

## 5. Content model & real content

The site is **fully CMS-driven** (Sanity). Design must lay out these types; content
is real, already in the dataset (project `Elwestbury`, dataset `production`).

**Schemas** (`sanity/schemas/`): `authorInfo`, `heroContent`, `featuredRelease`,
`siteContent` (singletons); `book`, `praise`, `event`, `faqItem`, `blogPost`,
`bookClubPhoto`, `press`, `brandStatement` (collections/blocks).

Key shapes for layout:
- **`book`** — title, subtitle, **genre** (incl. Thriller/Romance), **series +
  seriesOrder**, description/back-cover copy, pub date, ISBN, **`retailers[]`**
  (arbitrary `{store, label, url}` — buy links, no cart), cover image.
- **`authorInfo`** — name, tagline, email, shortBio, longBio, `socials{}`, logo,
  portrait, aboutImage.
- **`event`** — title, date, venue, city/`region`(state), link, description;
  **past events auto-hide via GROQ** (`date >= now()`).
- **`press`** — outlet, headline/quote, link, date, logo.
- **`bookClubPhoto`** — image, club, location, date, caption, approved/featured
  toggle (only approved render publicly).

**Real content inventory:** 3 titles (2 thriller, 1 romance) + incoming Atria title;
full social set; logo + portrait present; **no book covers or about-image yet**;
**About bios need CMS modeling** (currently hard-coded placeholder prose).

---

## 6. Pages — current state → intended state

Routes live under `app/(site)/`. "Intended" is drawn from the brief-compliance
audit (`AUDIT-REPORT.md`, 2026-08-05); the repo has since added `/press`,
`/book-club`, and the signature scaffold, so treat the audit as **directional, not
current**.

| Page | Route | Current | Intended / design focus |
|---|---|---|---|
| **Home** | `/` | Hero (static image+gradient), FeaturedRelease, Books, BrandStatement, Praise, Events, FAQ, Newsletter, Contact — stacked sections | Lead with the **signature animation** hero; spotlight the **featured Atria release**; set the thriller/romance tone above the fold. Decide which template sections survive (Praise/FAQ/BrandStatement are template extras, may be cut). |
| **Books** | `/books`, `/books/[slug]` | Flat list of covers + retailer links; detail page with Book JSON-LD | **Group by genre/series**; add a **BookBub "Follow" CTA**; cap cover width ≤340px; design the series/standalone distinction. |
| **About** | `/about` | Hard-coded placeholder bio | Model **short + long bio** in CMS; design a portrait-led author page. |
| **Events** | `/events` | Upcoming-only, intentional empty state | Design the empty state *and* a populated tour/appearance layout. |
| **Press / Media** | `/press` | Route + schema now exist | Design outlet/quote cards with logos + links. |
| **Book Club** | `/book-club` | Route + `bookClubPhoto` schema exist | Design the **gated gallery** (approved photos) + a reader **photo-submission** path. |
| **Blog** | `/blog`, `/blog/[slug]`, `/blog/all` | Full paginated blog | **Not one of her core pages** — decide keep vs. cut with her before designing. |
| **Contact** | `/#contact` (home section) | Resend form (name/email/subject/message) | Decide dedicated `/contact` page vs. section; subjects incl. "Book club submission" + "Media & events". |

**Newsletter / community (cross-cutting):** her readers are **"Buriers."** The
intended popup uses **verbatim** copy — *"Want to be a Burier?" / "Hand me a
shovel." (accept) / "Sounds like work." (decline)* — first-visit, dismissible, no
nag. Three intended surfaces: **popup, footer fields, homepage section** (today only
the homepage section has real fields). All post to a single target,
`/api/newsletter`. Design the popup + footer signup as first-class brand moments,
not afterthoughts. (Platform — Flodesk vs. MailerLite — is an open business
decision; see §8.)

**Primary nav** (`Header.tsx`): Books · About · Events · Press · Book Club ·
Contact, plus a "Mailing list" action.

---

## 7. Component library available

Full **shadcn/ui** primitive set already installed (~55): accordion, alert(-dialog),
avatar, badge, breadcrumb, button, calendar, card, carousel, chart, checkbox,
command, dialog, drawer, dropdown-menu, form, hover-card, input, label, navigation-
menu, pagination, popover, progress, radio-group, scroll-area, select, separator,
sheet, skeleton, slider, sonner/toast, switch, table, tabs, textarea, toggle,
tooltip, and more (`components/ui/`).

Existing composed sections to redesign (`components/`): `home/` (Hero,
FeaturedRelease, Books, BrandStatement, Praise, Events, FAQ, Newsletter,
NewsletterPopup, ContactForm, SignatureAnimation), `layout/` (Header, Footer,
FooterNewsletter), `blog/` (BlogCard, BlogContent, BlogPagination).

The design system's raw materials are all present — the work is **art direction and
composition**, not building primitives from scratch.

---

## 8. Open decisions (block or shape design)

1. **Aesthetic direction** — the §3 gap. Highest priority; everything visual waits
   on it.
2. **Final palette** — confirm `ink`/`brand` hex; light vs. dark dominant mode.
3. **Display typeface** — pick the headline face that carries thriller+romance.
4. **Newsletter platform** — Flodesk vs. MailerLite (business decision; gates the
   signup integration, not the design).
5. **Blog: keep or cut** — not a core page in the brief.
6. **Template sections** — Praise / FAQ / BrandStatement: keep, restyle, or remove.
7. **Assets** — book covers + about-image still pending; design reserves space.

---

## 9. Tech constraints for the design

- **Everything is Sanity-driven** — designs must map to the content model in §5;
  avoid layouts that assume content that isn't modeled (or note the schema change
  needed).
- **Responsive**, mobile-first; existing breakpoints via Tailwind.
- **SEO/SSR** — server components + JSON-LD (Person, WebSite, Book) already wired;
  keep content server-rendered.
- **Accessibility** — honor `prefers-reduced-motion` (already done for the
  signature); maintain contrast against the dark `ink` surfaces.
- **No e-commerce** — retailer "buy" links only; no cart/checkout/booking.

---

## 10. What a design session should produce

- A locked **art direction**: palette (final hex), type pairing (display + body),
  motion language, imagery treatment — resolving §3.
- **Home** hero + section system expressing thriller+romance.
- **Books** layout with genre/series grouping + BookBub follow.
- **About**, **Press**, **Book Club** (gallery + submission), **Events** (empty +
  populated) page designs.
- **Newsletter popup + footer** signup as branded "Burier" moments.
- Updated **`tailwind.config.ts` tokens** + `globals.css` theme + font wiring to
  match the chosen direction.

---

*Sources: repo inspection (branch `design-brief`), live Sanity dataset
`Elwestbury/production`, and `AUDIT-REPORT.md` (2026-08-05). Where the audit and the
current repo disagree, the repo wins — several audit "NOT FOUND" items (Press,
Book Club, signature scaffold) now exist.*
