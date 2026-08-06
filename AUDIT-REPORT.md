# E.L. Westbury Site — Brief Compliance Audit

**Repo:** author website (Sanity CMS + Next.js 16), forked from a local-service (trades) agency template.
**Audit date:** 2026-08-05
**Scope:** inspection only — no fixes applied.

## TL;DR

The **de-trades-ification is done well**: no LocalBusiness/geo schema, no `/areas`, no emergency band, no service/quote fields, no trades copy, no ads. Person + Book JSON-LD are in place, the contact form is reframed to Resend, and Events auto-expire.

**However, the repo is currently a _generic author template_, not E.L. Westbury's spec.** Several client-specific, brief-required features **do not exist yet**: the **Book Club Gallery** and **Press** content types/pages, the **newsletter popup** (with her verbatim "Burier" copy), the **shovel→ELW hero animation**, **GA4**, CMS-modeled **bios**, and **genre/series grouping** on Books. The Studio also exposes ~10 document types rather than her intended **four**.

Legend: **PASS** / **FAIL** / **PARTIAL** / **NOT FOUND**

---

## 1. Sanity schema — she edits exactly four things

| Item | Status | Files | Note |
|---|---|---|---|
| **Events** schema (title, date, venue, city/state, link, description) | **PASS** | `sanity/schemas/event.ts` | Fields present (`region` used for state). |
| Events auto-filter past by date (front end / GROQ, not manual) | **PASS** | `lib/sanity.queries.ts` (`upcomingEventsQuery`: `date >= now()`), used by `app/(site)/events/page.tsx` + home | Filtering is in GROQ; she does no cleanup. |
| **Book Club Gallery** schema (image, club, location, date, caption, approved/featured toggle) | **NOT FOUND** | — | No schema, no component, no route. Toggle-gating N/A. |
| **Books** schema (title, cover, genre, series+order, description, pub date, retailer array) | **PARTIAL** | `sanity/schemas/book.ts` | Schema is complete: genre list incl. Thriller/Romance, `series`+`seriesOrder`, `retailers[]` = arbitrary length of `{store,label,url}`, isbn, pub date. **But front-end genre/series _grouping_ is not implemented** (see §3). |
| **Press** schema (outlet, headline/quote, link, date, logo) | **NOT FOUND** | — | No Press schema. `praise` (blurbs) exists but is not Press (no outlet/logo/link/date). |
| Only the four types visible/editable to her role; singletons hidden/read-only | **FAIL** | `sanity/sanity.config.ts` | Studio exposes **4 singletons + 6 collections** (`book, praise, event, brandStatement, faqItem, blogPost`). No role config, no read-only singletons. A non-technical user sees far more than four types, and two of her four don't exist. |
| No leftover trades schemas (service, serviceArea, geo, emergency, quote, hours) | **PASS** | `sanity/schemas/` | All removed: `service`, `serviceArea`, `emergencyCTA`, `companyInfo`, `testimonial`, `whyChooseUsItem` are gone. |

> **Template extras beyond her four (not trades, but scope creep):** `praise`, `faqItem`, `brandStatement`, `blogPost` are registered and editable. These should be hidden/removed for her role or cut.

---

## 2. Trades-template leftovers

| Item | Status | Files | Note |
|---|---|---|---|
| `/services/[slug]` → `/books/[slug]` | **PASS** | `app/(site)/books/[slug]/page.tsx`, `app/(site)/books/page.tsx` | Route repurposed; Books = extended old Services collection. |
| `/areas/[slug]` deleted entirely (not repurposed) | **PASS** | (removed) | Route, schema, sitemap entries, and nav links all gone. No lat/long anywhere. |
| Emergency CTA band removed (not turned into urgency/countdown) | **PASS** | `components/home/FeaturedRelease.tsx` | Replaced by a tasteful featured-book module — no urgency/countdown. |
| Contact reframed (name/email/message + subject), Resend kept | **PASS** | `components/home/ContactForm.tsx`, `app/api/contact/route.ts` | Fields: name, email, subject (General / Book club submission / Media & events), message. No service/address/urgency fields. |
| LocalBusiness JSON-LD → Person + Book | **PASS** | `lib/schema.ts`, `app/(site)/layout.tsx`, `app/(site)/books/[slug]/page.tsx` | `generatePersonSchema` + `generateWebsiteSchema` site-wide; `generateBookSchema` on book pages. No LocalBusiness/geo/opening-hours remain. |
| Trades copy / alt / meta / OG | **PASS** | repo-wide grep | No "tree/harrisburg/arborist/serving the greater…/phone CTA" strings remain; only neutral placeholders. |

---

## 3. The seven pages

| Page | Status | Files | Note |
|---|---|---|---|
| **Home** (hero animation, newsletter, featured Atria release) | **PARTIAL** | `app/(site)/page.tsx`, `components/home/*` | Newsletter section ✔, featured-release module ✔ (tasteful). **Shovel→ELW hero animation NOT FOUND** (`Hero.tsx` is a static image/gradient). |
| **About** (short + long bio) | **PARTIAL** | `app/(site)/about/page.tsx` | Page routes, but the bio is **hard-coded placeholder prose** — not CMS-driven. `authorInfo` has no short/long bio fields. |
| **Books** (grouped by genre/series, retailer links, BookBub follow) | **PARTIAL** | `app/(site)/books/page.tsx`, `components/home/Books.tsx` | Retailer links per title ✔. **No genre/series grouping** (flat list). **No BookBub follow button.** |
| **Events / Appearances** (auto-expire) | **PASS** | `app/(site)/events/page.tsx` | Upcoming-only via GROQ; intentional empty state. |
| **Media / Press** | **NOT FOUND** | — | No route, no schema, no nav link. |
| **Book Club** (gallery + reader submissions) | **NOT FOUND** | — | No gallery route/schema. Submission exists only as a contact-form subject (no photo upload). |
| **Contact** (reframed Resend form) | **PARTIAL** | `components/home/ContactForm.tsx` | The form is correct, but there is **no dedicated `/contact` page** — it's a `#contact` section on the home page; nav points to `/#contact`. |

> **Nav** (`components/layout/Header.tsx`) = Books, About, Events, **Blog**, Contact. Missing **Press** and **Book Club**; includes **Blog**, which is not one of the seven pages.

---

## 4. Newsletter — the launch blocker

| Item | Status | Files | Note |
|---|---|---|---|
| Three signup surfaces (popup, footer, homepage) | **PARTIAL** | `components/home/Newsletter.tsx` (form), `components/layout/Footer.tsx` + `Header.tsx` (links to `/#newsletter`) | Only **one real signup surface** (homepage). Footer & header are links, not fields. **Popup does not exist.** |
| Single, clearly-marked POST target (change in ONE place) | **PASS** | `app/api/newsletter/route.ts`; posted from `Newsletter.tsx` | All signup goes to `/api/newsletter`, a documented stub gated by `NEWSLETTER_API_KEY`. This is the single integration point. ✔ |
| Newsletter NOT wired into the Resend contact form | **PASS** | `Newsletter.tsx` → `/api/newsletter`; `ContactForm.tsx` → `/api/contact` | Flows are fully separate. |
| Popup copy verbatim ("Want to be a Burier?" / "Hand me a shovel." / "Sounds like work.") hardcoded | **NOT FOUND** | — | No popup component exists; copy is nowhere in the repo. |
| Popup behavior (first visit, dismissible, no nag, respects dismissal, decline closes) | **NOT FOUND** | — | N/A until built. |

---

## 5. Contact → her Gmail, address never exposed

| Item | Status | Files | Note |
|---|---|---|---|
| Submits via Resend → `Erikawestbury@gmail.com` | **PARTIAL** | `app/api/contact/route.ts` | Mechanism is correct (`CONTACT_TO_EMAIL` server env). **The value is not yet set to her Gmail** (placeholder in `.env.local`). Config-only fix. |
| Address absent from rendered HTML / client JS / Sanity public data | **PASS** | `app/api/contact/route.ts`, `ContactForm.tsx` | Address lives only in a server-side env var; `ContactForm.tsx` contains no address; not in Sanity. Grep for `Erikawestbury` in source = 0. (No production build available to grep built output, but by construction it is server-only.) |
| Book-club photo submission path works | **PARTIAL** | `ContactForm.tsx` | "Book club submission" subject routes to Resend, but the form has **no file/photo upload** — readers can message, not attach photos. |

---

## 6. Signature animation

| Item | Status | Note |
|---|---|---|
| Shovel→ELW as SVG stroke animation (not GIF/video) | **NOT FOUND** | No SVG animation in the hero or anywhere. |
| Respects `prefers-reduced-motion` (final state, no draw) | **NOT FOUND** | No `prefers-reduced-motion` handling anywhere. |
| Doesn't replay on every route change (once/session) | **NOT FOUND** | N/A until built. |

---

## 7. Publishing pipeline (edits appear in seconds)

| Item | Status | Files | Note |
|---|---|---|---|
| ISR / on-demand revalidation via Sanity webhook, wired to doc types | **PARTIAL / NOT FOUND** | `lib/sanity.live.ts`, `app/(site)/layout.tsx` | **No webhook / `revalidateTag` route exists.** `next-sanity`'s `SanityLive` (Live Content API) is mounted, which delivers near-real-time updates in preview/live mode, but production on-publish revalidation via webhook is **not** configured. Needs confirmation or an explicit `/api/revalidate` webhook. |

---

## 8. Analytics

| Item | Status | Note |
|---|---|---|
| GA4 pageview tracking, measurement ID via env (not hardcoded) | **NOT FOUND** | All analytics were stripped (GTM + Meta Pixel deleted). No GA4/`gtag` anywhere. Needs adding as an env-driven pageview component. |
| No Google Ads / conversion tracking | **PASS** | Correctly absent. |

---

## 9. Scope discipline — confirmed ABSENT (all good)

| Should be absent | Status | Note |
|---|---|---|
| E-commerce / cart / Stripe | **PASS (absent)** | Retailer "buy" links only. |
| Online booking / scheduling widget | **PASS (absent)** | None. |
| Google Ads tags / conversion tracking | **PASS (absent)** | Removed with the marketing components. |
| SEO doorway / bulk landing pages | **PASS (absent)** | `/areas` local-SEO pages deleted. |
| Business email/mailbox on the domain | **PASS (N/A in code)** | Nothing in the codebase implies one. |

---

## 10. Content stubs — graceful vs. would-break-empty

| Pending item | Status | Files | Note |
|---|---|---|---|
| Short + long bio (About) | **FAIL (would ship placeholder)** | `app/(site)/about/page.tsx` | Hard-coded placeholder prose renders to production; not hidden, not CMS-marked. |
| Book descriptions / back-cover copy | **PASS (graceful)** | `book.ts` (`description` required), `Books.tsx` (returns null when empty) | Section hides when there are no books. |
| Social links incl. Facebook group + BookBub | **PARTIAL (graceful hide)** | `Footer.tsx` (filters absent socials), `authorInfo.ts` (`socials` incl. facebook, bookbub, goodreads…) | Absent icons hide cleanly. But no BookBub follow button on Books, and no explicit "FB group vs personal" distinction. |
| Current events list (empty at launch) | **PASS (intentional empty state)** | `Events.tsx` (`showWhenEmpty`), `events/page.tsx` | Empty `/events` reads as intentional (`eventsEmptyText`). |
| Book cover images (~320×500; flag displays >~350px) | **PARTIAL** | `FeaturedRelease.tsx` (w=340 ✔), `Books.tsx` (3-col grid can reach ~350–370px at xl), `books/[slug]/page.tsx` (300px ✔) | Home Books grid can exceed ~350px on wide screens → covers may soften. Recommend capping displayed cover width ≤ ~340px. |

---

# Prioritized punch list

## A. Launch blockers (must fix before any launch), ordered

1. **Newsletter — platform + surfaces + popup.** External dependency (Erika must pick Flodesk or MailerLite) blocks the POST target. Then: build the **popup** with her **verbatim** copy ("Want to be a Burier?" / "Hand me a shovel." / "Sounds like work."), add real signup **fields** to footer (and confirm homepage), and wire all three to the single `/api/newsletter` point. *(Isolation is already correct — good.)*
2. **Book Club Gallery** — create the schema (image, club, location, date, caption, approved/featured toggle), the gated public gallery, and a reader photo-submission path (Resend with attachment, or a mini-form). One of her four core types; currently absent.
3. **Press / Media** — create the schema (outlet, headline/quote, link, date, logo) and the `/press` page + nav link. One of her four core types; currently absent.
4. **Restrict Studio to her four types** — configure desk structure/role so she sees exactly **Events, Book Club Gallery, Books, Press**; make singletons (site settings, homepage, popup copy) hidden/read-only; remove or hide `praise`, `faqItem`, `brandStatement`, `blogPost`.
5. **GA4** — add env-driven (`NEXT_PUBLIC_GA_MEASUREMENT_ID`) pageview tracking. Currently no analytics at all.
6. **Contact destination** — set `CONTACT_TO_EMAIL=Erikawestbury@gmail.com` (+ verified `CONTACT_FROM_EMAIL` domain in Resend). Config-only.
7. **Shovel→ELW hero animation** — build as SVG stroke animation, honor `prefers-reduced-motion` (final composed state), once-per-session.
8. **About bios** — model short + long bio in `authorInfo` (or a singleton) and replace the hard-coded placeholder so nothing ships as junk.
9. **Publishing pipeline** — confirm production on-publish updates; add a Sanity webhook → `/api/revalidate` (tag-based) if `SanityLive` alone doesn't cover production.

## B. Trades-template / template cruft to remove or hide

- **Blog** (page + `blogPost` schema + nav link) — not one of the seven pages.
- **Praise**, **FAQ**, **Brand Statement** home sections + schemas — template extras, not in the brief.
- Nav mismatch: add Press + Book Club; drop Blog.
- (All genuine _trades_ leftovers are already gone — this is generic-template cleanup, not trades cleanup.)

## C. Wired correctly (passed — brief confirmation)

- Full de-trades-ification: no LocalBusiness/geo/hours schema, no `/areas`, no emergency band, no service/quote/address fields, no trades copy, no ads.
- Person + WebSite JSON-LD site-wide; Book JSON-LD on book pages.
- Events auto-expire via GROQ (`date >= now()`).
- Book schema complete: genre list, series + order, **arbitrary-length retailer array** (ready for the incoming Atria title).
- Contact reframed to Resend with correct subjects; destination address is server-env-only (never in HTML/JS/Sanity).
- Newsletter flow isolated from contact; single POST target.
- Out-of-scope items confirmed absent: e-commerce, booking, Google Ads, doorway pages, on-domain mailbox.

## D. Pending client content — graceful vs. breaks-empty

- **Graceful (safe to launch empty):** social links (hidden when blank), events list (intentional empty state), books sections (hide when empty), book descriptions.
- **Breaks / ships placeholder junk:** **About bios** (hard-coded placeholder renders live). Palette is placeholder (`ink`/`brand`) but not broken — swap when final codes arrive.

## E. Recommended next actions (ordered)

1. **TOP EXTERNAL DEPENDENCY:** get Erika's **newsletter platform decision** (Flodesk vs MailerLite). Everything else in the newsletter blocker waits on this.
2. Build the two missing content types + pages: **Book Club Gallery** and **Press/Media**.
3. Lock the **Studio to her four types**; hide/lock singletons; cut Blog/Praise/FAQ/BrandStatement.
4. Add **GA4** (env-driven) and set the **contact Gmail** env value.
5. Build the **newsletter popup** (verbatim copy + sane dismissal) and real footer signup fields.
6. Build the **shovel→ELW SVG animation** (reduced-motion aware).
7. Model **bios** in CMS; add **genre/series grouping** + **BookBub follow** on Books; cap cover display width ≤ ~340px.
8. Confirm/add **on-publish revalidation** for production.
9. Add a dedicated **/contact** page (or confirm the section approach is acceptable).

---

*Report generated for review. No code changes were made in this pass — awaiting prioritization before implementing.*
