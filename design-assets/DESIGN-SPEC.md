# Handoff: E. L. Westbury Author Site — Design Overhaul

## Overview

A full visual overhaul of the E. L. Westbury author site, built on top of the existing
`Author-Template` Next.js + Sanity codebase. The overhaul keeps the current information
architecture, routes, component boundaries, and Sanity schema intact — it changes the
art direction (typography, palette, section rhythm, imagery treatment) and adds two new
things: a **cinematic hero** and a **book detail page with an animated page-turn**.

The client is a published thriller/romance author with an established following, so the
site has to carry a real brand rather than read as a template. The design targets that:
editorial serif display type, an ivory/ink/brass palette, alternating light and dark
sections, and full-bleed photography.

Nothing in this bundle requires a schema migration except **one new field** (`themeWords`
on `book`) — documented under "Sanity changes" below.

## About the Design Files

The files in this bundle are **design references authored in HTML**. They are prototypes
that show intended look, layout, and behavior. They are **not production code to copy
directly** — the markup uses a lightweight in-house template runtime (`support.js`,
`<sc-for>`, `<sc-if>`, `{{ }}` holes, inline styles), which has nothing to do with the
target stack.

The task is to **recreate these designs inside the existing `Author-Template`
environment**: Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, and Sanity. Use
the codebase's established patterns — `next/image` for imagery, `urlFor()` for Sanity
assets, the existing `components/ui/*` primitives, Tailwind tokens in
`tailwind.config.ts`, server components for data fetching.

Concretely: read the HTML for exact values (hex codes, type sizes, spacing, easing), then
write idiomatic Tailwind/React in the existing component files. Do not port inline styles
verbatim, and do not introduce a second styling system.

## Fidelity

**High-fidelity.** Colors, typography, spacing, copy, and interaction timings are final
and specified exactly below. Recreate the UI to match. Two caveats:

1. **Copy marked with a dotted field path** (e.g. `book.description — the back-cover
   hook…`, `praise.quote — …`, `siteContent.footerTagline`) is deliberate placeholder
   text naming the Sanity field that fills it. Wire the field; don't ship the placeholder
   string. Real copy that *is* final is unmarked and verbatim from the client — see
   "Verbatim copy" below.
2. **Book club photos, press items, FAQ items, and events** use placeholder records. The
   layouts are final; the content comes from Sanity.

## Typography

Two faces, loaded from Google Fonts:

| Role | Family | Weights | Usage |
|---|---|---|---|
| Display | **Bodoni Moda** (serif) | 400, 500, 400 italic | All headings, book titles, pull quotes, the wordmark, page-turn words |
| Body / UI | **Jost** (sans) | 300, 400, 500 | Body copy, nav, buttons, labels, form fields |

```
https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=Jost:wght@300;400;500&display=swap
```

Load these with `next/font/google` rather than a `<link>`, and expose them as CSS
variables so Tailwind can reference them (`font-display`, `font-body`).

> ⚠️ **Known inconsistency to resolve.** Four elements in the prototype carry
> `font-family: Georgia` from in-editor edits: the header wordmark, the hero `<h1>`, the
> hero gold subline, and the featured-release `<h2>`. Every other heading uses Bodoni
> Moda. **Bodoni Moda is the intended face everywhere** — treat the Georgia instances as
> artifacts and use Bodoni Moda. Those same elements also carry hard-coded pixel
> `width`/`height` values (e.g. `width: 626px; height: 101px` on the hero subline) from
> drag-resizing; ignore those and let the type flow.

Bodoni is a high-contrast face with thin hairlines. At small sizes (the wordmark, the
`AUTHOR` caption) use weight 500, not 400, or it disappears.

### Type scale as used

| Element | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|
| Hero h1 | `clamp(30px, 7.4vw, 92px)` | 400 | 0.98 | -0.01em |
| Hero subline (gold, italic in spec) | `clamp(16px, 3vw, 34px)` | 400 | 1.3 | — |
| Page h1 (Books/Events/Press/Book Club) | 58px | 400 | — | — |
| Book detail h1 | `clamp(34px, 5vw, 58px)` | 400 | 1.08 | — |
| Section h2 | 42–44px | 400 | 1.08–1.15 | — |
| Featured release h2 | `clamp(34px, 4.4vw, 54px)` | 400 | 1.08 | — |
| Books-page book h2 | 36px | 400 | 1.15 | — |
| Card title | 24–26px | 400 | 1.2 | — |
| Pull quote | 34px (`clamp(22px, 2.8vw, 32px)` on book page) | 400 italic | 1.45 / 1.5 | — |
| Body copy | 16–17px | 400 | 1.85–1.95 | — |
| Small body / captions | 13–15px | 400 | 1.8 | — |
| Eyebrow / label (uppercase) | 11–12px | 400 | — | 0.2–0.26em |
| Button / nav (uppercase) | 11.5–12.5px | 400 | — | 0.16–0.2em |
| Wordmark | `clamp(18px, 1.8vw, 22px)` | 500 | 1.05 | 0.12em |
| Wordmark caption `AUTHOR` | 9px | 400 | 1.05 | 0.3em |

The client explicitly **rejected small uppercase eyebrow subheadings** above section
headlines. Several were removed during design (`featuredRelease.label`,
`brandStatement.tagline`, a `Newsletter` label, a `Praise` label, the genre line on home
book cards, `siteContent.booksSubtext`). Headlines lead their sections directly. The
eyebrows that remain are functional labels, not decoration: `Buy now`, `Explore`, `Stay
in touch`, `About`, `The Buriers`, the genre rule on the Books page, `Empty state`, and
press outlet names. **Do not reintroduce decorative eyebrows.**

## Design Tokens

### Colors

| Token | Hex | Usage |
|---|---|---|
| Ivory (paper) | `#F6F2EA` | Default page background, text on dark |
| Ink | `#2A2733` | Default body text, dark button hover |
| Hero black | `#0A0A0B` | Hero section background + scrim |
| Aubergine | `#22202B` | Featured release + book detail hero background |
| Deep plum | `#1A1822` | Footer, newsletter band |
| Smoky green | `#3E4A42` | Brand statement, book club header, praise band, primary buttons |
| Brass | `#9A7B4F` | Primary accent: links, rules, CTA fill, active nav |
| Brass hover | `#B08D5C` | CTA hover fill |
| Gold | `#C9A227` | Hero subline, edition note, dark-section accents |
| Warm sand | `#E9E2D4` | Photo placeholder fill |

Alpha variants in use, all derived from Ink on light and Ivory on dark:

```
rgba(42,39,51, .10 .14 .16 .18 .22 .25 .28 .30 .35 .42 .45 .50 .55 .56 .60 .62 .64 .68 .70 .72 .74 .78 .82)
rgba(246,242,234, .15 .18 .28 .35 .45 .50 .60 .62 .64 .68 .70 .72 .80 .82 .85)
rgba(201,162,39, .08 .35)   /* gold tint + frame */
rgba(154,123,79, .08)       /* brass tint on hover */
```

Two dark backgrounds and one light is the whole system. **Do not add a third dark tone.**

### Paper tones (page-turn only)

| Purpose | Value |
|---|---|
| Page face, spine → fore-edge | `linear-gradient(90deg, #F4EEE2 0%, #EFE8DA 80%, #E2D7C1 100%)` |
| Left leaf (gutter dark at spine) | `linear-gradient(90deg, #DCD0B4 0%, #EDE5D5 18%, #F4EEE2 100%)` |
| Right leaf | `linear-gradient(90deg, #F4EEE2 0%, #EDE5D5 82%, #DCD0B4 100%)` |
| Curve shading ink | `rgba(24,18,8, α)` where α = `0.42 × (1 − |cos θ|)` |

### Spacing

Section vertical rhythm, in px, all responsive via `clamp()` where noted:

- Section padding: `92–104px` vertical on desktop, `clamp(36px, 4.5vw, 60px)` on the
  book-detail hero, `clamp(60px, 8vw, 100px)` on book-detail bands
- Horizontal gutter: `48px` desktop, `clamp(20px, 4vw, 48px)` responsive
- Content max-widths: `1280px` (page shell), `1180px` (book detail), `1160px` (featured
  release), `1000px` (praise, FAQ), `900px` (book praise band), `760px` (book prose)
- Grid gaps: `26px` (press), `30–40px` (card grids), `48px 64px` (footer), `48px 80px`
  (two-column bands), `clamp(44px, 6vw, 84px)` (featured release)
- Header height: `96px`

### Borders, radius, shadows

- **Border radius: 0 everywhere.** The design is entirely square-cornered. This is
  deliberate and central to the editorial feel — do not apply the codebase's default
  `rounded-*` utilities to buttons, cards, inputs, or images.
- Hairline rules: `1px solid rgba(42,39,51,0.10–0.18)` on light,
  `rgba(246,242,234,0.15–0.35)` on dark
- Dashed border (Events empty state): `1px dashed rgba(42,39,51,0.28)`
- Cover shadow, light bg: `0 16px 40px rgba(42,39,51,0.22)`
- Cover shadow, dark bg: `0 40px 90px rgba(0,0,0,0.7)`
- Book-detail thumbnail: `0 18px 44px rgba(0,0,0,0.55)`
- Header: `backdrop-filter: blur(10px)` over `rgba(246,242,234,0.94)`

### Animation

| Name | Keyframes | Duration / easing |
|---|---|---|
| `elwRise` | `opacity 0→1`, `translateY(14px)→0` | `0.8s ease both` (hero), `0.4s` (modal) |
| `elwVeil` | `opacity 0→1` | `0.3s ease both` (modal backdrop) |
| FAQ expand | `max-height 0→200px`, `opacity 0→1`, `margin-top 0→16px` | `0.3s ease` |
| Page turn | see "The page-turn" below | `900ms` per sheet, `520ms` initial hold |

---

## Global Chrome

### Header — `components/layout/Header.tsx`

Sticky, `z-index: 40`, `96px` tall, `rgba(246,242,234,0.94)` + `blur(10px)`, bottom
hairline `rgba(42,39,51,0.1)`. Inner container `max-width: 1280px`, padding
`0 clamp(20px, 3vw, 48px)`, `display:flex`, `justify-content: space-between`, gap
`clamp(16px, 2.4vw, 40px)`, `flex-wrap: nowrap`.

Three groups, left to right:

1. **Logo lockup** (`flex`, gap `14px`, `flex-shrink: 0`, cursor pointer, → home):
   - `assets/elw-icon.png` at `height: 46px`, width auto
   - A column (gap `8px`) with the wordmark `E. L. WESTBURY` (Bodoni Moda 500,
     `clamp(18px, 1.8vw, 22px)`, `0.12em`, `line-height: 1.05`, `white-space: nowrap`)
     and the caption `AUTHOR` (9px, `0.3em`, uppercase, `rgba(42,39,51,0.55)`,
     `line-height: 1.05`)

   The `8px` gap and `1.05` line-height matter: tighter values made the caption crowd the
   descenders of "E. L." and read as a shaded block.

2. **Nav** (`flex`, gap `clamp(12px, 1.9vw, 30px)`, `flex-wrap: nowrap`, `min-width: 0`):
   Books · About · Events · Press · Book Club · Contact.
   Each: `clamp(11px, 1.15vw, 12.5px)`, uppercase, letter-spacing
   `clamp(0.1em, 0.16vw, 0.18em)`, `padding-bottom: 4px`, `white-space: nowrap`.
   Default `#2A2733` with `border-bottom: 1px solid transparent`; **active page** is
   `#9A7B4F` with a `#9A7B4F` bottom border; hover `#9A7B4F`.

3. **Mailing list button** — `#3E4A42` fill, `#F6F2EA` text,
   `clamp(10.5px, 1.05vw, 11.5px)`, `0.16em`, uppercase, padding
   `12px clamp(14px, 1.8vw, 22px)`, `flex-shrink: 0`, hover `#2A2733`. Opens the
   newsletter modal.

**Mobile:** the prototype squeezes the nav via clamps rather than collapsing it. The
production build should add a hamburger + sheet below `md` using the existing
`components/ui/sheet.tsx`. This is the one place the prototype is deliberately incomplete.

### Logo assets — a note on provenance

The client supplied only a **photograph** of her circular shovel-and-quill seal
(`assets/elw-seal.png` → background-removed as `assets/elw-seal-cutout.png`). The full
badge is illegible at header scale and its ring type can't be read, so:

- **`assets/elw-icon.png`** is the shovel-and-quill mark **extracted** from the seal.
  This was done with connected-component analysis on the alpha channel — the mark is a
  genuinely separate shape from the two rings (the quill breaks the circle where it
  crosses), so it's a true extraction, not a rectangular crop. Source: 929×975 seal →
  490×610 icon.
- The **full badge appears nowhere on the site** by client decision. Keep it for social
  avatars, print, and merch.
- **The icon is raster, from a ~1024px photo, so it softens above about 120px.** Get a
  vector (SVG/AI) from her designer before using it larger. The hero watermark below is
  the one place it's scaled up, and it's at 5.5% opacity where softness doesn't read.

### Footer — `components/layout/Footer.tsx`

`#1A1822` background, `#F6F2EA` text, padding `84px 48px 36px`. Grid
`repeat(auto-fit, minmax(260px, 1fr))`, gap `48px 64px`, `align-items: start`. Three
columns:

1. Bodoni Moda 30px `line-height: 1.2`, `max-width: 320px` — **"Some secrets stay buried.
   Most don't."** Below it `siteContent.footerTagline` (15px, `line-height: 1.8`,
   `rgba(246,242,234,0.6)`). Then a social row (`flex`, gap `22px`, wrap): Instagram,
   TikTok, The Buriers, Facebook, Goodreads, BookBub — 12px, `0.14em`, uppercase,
   `rgba(246,242,234,0.7)`, hover `#9A7B4F`.
2. `Explore` label (11px, `0.22em`, `rgba(246,242,234,0.45)`) + the nav list as a column,
   gap `11px`, 15px links at `rgba(246,242,234,0.82)`.
3. `Stay in touch` label + copy + inline email capture (input `flex: 1`,
   `min-width: 170px`, transparent with `rgba(246,242,234,0.28)` border, focus border
   `#9A7B4F`; `Join` button in brass with `#1A1822` text).

Bottom bar: `margin: 48px auto 0`, `padding-top: 24px`, top border
`rgba(246,242,234,0.15)`, `flex` space-between, 12px `0.1em`
`rgba(246,242,234,0.45)` — `© 2026 E.L. Westbury. All rights reserved.` and
`elwestbury.com`.

### Newsletter modal — `components/home/NewsletterPopup.tsx`

Fixed overlay, `z-index: 90`, backdrop `rgba(26,24,34,0.72)` with `elwVeil`. Panel
`max-width: 900px`, `#F6F2EA`, grid `repeat(auto-fit, minmax(300px, 1fr))`, animated in
with `elwRise`.

- **Left:** `assets/elw-portrait.jpg` full-bleed `object-fit: cover`, `min-height: 400px`,
  over `#3E4A42`, with a `linear-gradient(0deg, rgba(62,74,66,0.75), rgba(62,74,66,0.15))`
  wash so the panel reads as brand rather than a bare photo.
- **Right:** padding `52px 48px`. `The Buriers` label (11px, `0.24em`, `#9A7B4F`) →
  h2 `Want to be a Burier?` (Bodoni Moda 44px, `line-height: 1.1`) → 15px body
  (`line-height: 1.8`, `rgba(42,39,51,0.68)`, `max-width: 380px`) → email input →
  primary `#3E4A42` button → text-underline dismiss button.

**Copy here is client-verbatim and character-exact. Do not rewrite:**
- Heading: `Want to be a Burier?`
- Body: `Cover reveals, event dates, and the occasional thing I probably shouldn't tell you.`
- Submit: `Hand me a shovel.`
- Dismiss: `Sounds like work.`

---

## Screens / Views

Routes map 1:1 onto the existing App Router tree. The prototype is a single file with an
internal `page` state switch purely so it can be clicked through in a browser — in
production these stay separate routes.

### 1. Home — `app/(site)/page.tsx`

Section order (unchanged from the current build, which is why this is an overhaul and not
a rebuild):

#### 1a. Hero — `components/home/Hero.tsx`

The signature moment. Full-bleed portrait, dark, with type held in the left third.

- Section: `position: relative`, `background: #0A0A0B`, `min-height: min(860px, 88vh)`,
  `display: flex; align-items: center`, `overflow: hidden`
- **Portrait:** `assets/elw-hero-portrait.jpg`, absolutely positioned right, `top: 0`,
  `height: 100%`, `width: clamp(210px, 58vw, 760px)`, `object-fit: cover`,
  `object-position: 56% 20%`
- **Scrim** (the key to legibility — a horizontal gradient with viewport-aware stops so
  the mask covers proportionally more as the screen narrows):
  ```css
  linear-gradient(90deg,
    #0A0A0B 0%,
    #0A0A0B clamp(180px, 38vw, 480px),
    rgba(10,10,11,0.88) clamp(300px, 56vw, 700px),
    rgba(10,10,11,0.45) clamp(380px, 72vw, 900px),
    rgba(10,10,11,0.12) 94%)
  ```
- **Bottom fade:** absolute, `height: 22%`,
  `linear-gradient(0deg, #0A0A0B, transparent)` — carries the hero into the next section
  so the photo's own background never has to match the section color. (The client asked
  for the photo's background to feel seamless with the section; the answer was to fade
  the photo out rather than try to color-match it.)
- **Watermark:** `assets/elw-icon.png`, absolute `left: -63px; top: 239px`,
  `height: 122%`, `transform: translateY(-50%) rotate(-12deg)`, `opacity: 0.055`,
  `pointer-events: none`. Bleeds off the left edge so it reads as texture, not a pasted
  logo.
- **Content:** `z-index: 2`, `max-width: 1280px`, padding `0 clamp(24px, 4vw, 64px)`,
  `animation: elwRise 0.8s ease both`
  - h1 **`Twisty domestic thrillers`** — Bodoni Moda 400, `clamp(30px, 7.4vw, 92px)`,
    `line-height: 0.98`, `letter-spacing: -0.01em`, `max-width: min(14ch, 62vw)`,
    `text-wrap: balance`, `text-shadow: 0 2px 26px rgba(10,10,11,0.85)`
  - Subline **`with a hopeless romantic's heart.`** — Bodoni Moda *italic*,
    `clamp(16px, 3vw, 34px)`, `line-height: 1.3`, `#C9A227`, `margin-top: 18px`,
    `max-width: min(22ch, 60vw)`, `text-shadow: 0 2px 22px rgba(10,10,11,0.9)`
  - CTA row (`flex`, gap `14px`, wrap, `margin-top: clamp(30px, 4vw, 48px)`):
    `Explore the books` (brass fill `#9A7B4F`, `#0A0A0B` text, padding `17px 32px`,
    12.5px `0.2em` uppercase, hover `#B08D5C`) → /books;
    `Become a Burier` (ghost, `1px solid rgba(246,242,234,0.35)`, hover border
    `#9A7B4F`) → newsletter modal

Both text sizes scale on viewport units and carry shadows because at phone widths the
headline otherwise overlapped her face. Keep the `min()` max-widths — they're what stop
the type from running under the portrait.

The existing `components/home/SignatureAnimation.tsx` (a scroll-drawn shovel→ELW mark) is
**not used**. The client already has a logo and asked only that it be larger; the
scroll-draw idea was dropped. Delete or leave dormant.

#### 1b. Featured release — `components/home/FeaturedRelease.tsx`

`#22202B` background, `overflow: hidden`. Container `max-width: 1160px`, padding
`clamp(72px, 9vw, 116px) clamp(24px, 4vw, 48px)`, grid
`repeat(auto-fit, minmax(280px, 1fr))`, gap `clamp(44px, 6vw, 84px)`, centered.

- **Cover:** wrapper `max-width: 340px`, `justify-self: center`. A rotated frame sits
  behind it — `position: absolute; inset: -14px`, `1px solid rgba(201,162,39,0.35)`,
  `transform: rotate(-2.5deg)`. The cover itself is `aspect-ratio: 2/3`,
  `object-fit: cover`, `box-shadow: 0 40px 90px rgba(0,0,0,0.7)`.
- **Text:** h2 (Bodoni Moda, `clamp(34px, 4.4vw, 54px)`, `line-height: 1.08`) → jacket
  copy (16.5px, `line-height: 1.9`, `rgba(246,242,234,0.72)`, `max-width: 46ch`) →
  `Learn more` brass button (12px, `0.18em`, padding `16px 30px`) → **buy group**.
- **Buy group** — this replaced a row of four competing links. `margin-top: 38px`,
  `padding-top: 26px`, top border `rgba(246,242,234,0.18)`. Label `Buy now` (11px,
  `0.26em`, `rgba(246,242,234,0.5)`, `margin-bottom: 16px`), then outlined buttons
  (`flex`, gap `12px`, wrap): `1px solid rgba(246,242,234,0.35)`, padding `15px 24px`,
  12px `0.16em` uppercase; hover border+text `#C9A227` with `rgba(201,162,39,0.08)` fill.
  Retailers: **Amazon**, **Barnes & Noble**, **Bookshop.org**.

Two distinct jobs, visually separated: *learn* (primary, filled) vs *buy* (a labelled
set). There is deliberately **no radial glow** behind the cover — one was tried and
removed at client request; the cover's own shadow and the gold frame do the work.

`Learn more` → the book detail page for that title.

#### 1c. The Books — `components/home/Books.tsx`

Ivory. `max-width: 1280px`, padding `96px 48px`. Header row: h2 `The Books` (42px) with
`All titles` link right-aligned (12px `0.18em` uppercase, `border-bottom: 1px solid
#9A7B4F`, `padding-bottom: 5px`, `white-space: nowrap`), `margin-bottom: 48px`.

Grid `repeat(auto-fit, minmax(240px, 1fr))`, gap `40px`. Each card: cover
(`aspect-ratio: 2/3`, `box-shadow: 0 16px 40px rgba(42,39,51,0.22)`) → title (Bodoni Moda
26px, `line-height: 1.2`, `margin-top: 20px`) → description (14.5px, `line-height: 1.8`,
`rgba(42,39,51,0.6)`, `margin-top: 10px`).

Order is **Drowning in Paper Flowers**, **Agreeable Avery**, **Heart Roots** — the client
asked for *Drowning* first, and this must match the Books page shelf order. Drive it from
`book.order` in Sanity, not a hard-coded array.

No genre eyebrow on these cards (removed at client request).

#### 1d. Brand statement — `components/home/BrandStatement.tsx`

`#3E4A42`. `max-width: 1280px`, padding `100px 48px`, grid
`repeat(auto-fit, minmax(300px, 1fr))`, gap `80px`, centered.

Left: h2 (Bodoni Moda 44px, `line-height: 1.15`, `max-width: 600px`, `text-wrap: pretty`)
— **"A reader group with shovels, good manners, and no intention of leaving anything
buried."** → `brandStatement.body` (16.5px, `line-height: 1.9`,
`rgba(246,242,234,0.68)`, `max-width: 520px`) → `See the book clubs` link (12px `0.2em`
uppercase, `border-bottom: 1px solid #9A7B4F`, `padding-bottom: 6px`).

Right: `assets/elw-couch-lifestyle.jpg`, `aspect-ratio: 1/1`, `object-fit: cover`.

#### 1e. Praise — `components/home/Praise.tsx`

Ivory with top hairline `rgba(42,39,51,0.1)`. `max-width: 1000px`, padding `92px 48px`,
centered. One quote at a time: Bodoni Moda *italic* 34px, `line-height: 1.45`,
`text-wrap: pretty`, wrapped in typographic quotes. Attribution below (12px `0.2em`
uppercase, `rgba(42,39,51,0.55)`, `margin-top: 28px`). Then dots (`flex`, gap `10px`,
`margin-top: 34px`): `7px` circles, active `#9A7B4F`, inactive `rgba(42,39,51,0.22)`.

The dots are static in the prototype — wire them to a real carousel over the `praise`
documents (the existing `components/ui/carousel.tsx` is available).

#### 1f. Events — `components/home/Events.tsx`

Ivory, `max-width: 1280px`, padding `0 48px 96px`. Header row: h2 `Events &
Appearances` + `All dates` link. Rows are a grid
`repeat(auto-fit, minmax(180px, auto))`, gap `24px 32px`, `padding: 26px 0`, top border
`rgba(42,39,51,0.14)`:

- Date — 14px `0.12em` uppercase `#9A7B4F`
- Title 19px + venue 14px `rgba(42,39,51,0.56)` `margin-top: 5px`
- `Details` link, `justify-self: end`, 11.5px `0.16em` uppercase, bottom border
  `rgba(42,39,51,0.3)` → `#9A7B4F` on hover

Show the next three upcoming events.

#### 1g. FAQ — `components/home/FAQ.tsx`

Ivory, top hairline. `max-width: 1000px`, padding `92px 48px`. h2 `Questions`
(42px, `margin-bottom: 40px`). Each item: top border `rgba(42,39,51,0.14)`,
`padding: 26px 0`, `cursor: pointer`, whole row toggles. Question 20px; sign is Bodoni
Moda 24px `#9A7B4F` — `+` closed, `–` open. Answer 16px, `line-height: 1.9`,
`rgba(42,39,51,0.68)`, `max-width: 660px`, animating `max-height 0→200px`,
`opacity 0→1`, `margin-top 0→16px` over `0.3s ease`.

First item open by default; only one open at a time (clicking the open one closes all).
Prefer the existing `components/ui/accordion.tsx` — match these values.

#### 1h. Newsletter band — `components/home/Newsletter.tsx`

`#1A1822`. `max-width: 1280px`, padding `92px 48px`, grid
`repeat(auto-fit, minmax(300px, 1fr))`, gap `48px 80px`, centered. Left: h2 `Want to be a
Burier?` (Bodoni Moda 44px, `line-height: 1.14`) + `siteContent.newsletterSubtext` (16px,
`line-height: 1.85`, `rgba(246,242,234,0.64)`, `max-width: 420px`). Right: column, gap
`14px` — email input (16px, padding `17px 18px`, transparent,
`1px solid rgba(246,242,234,0.28)`, focus border `#9A7B4F`) + brass submit button
**`Hand me a shovel.`** (12px `0.2em` uppercase, `#1A1822` text, padding `17px`).

#### 1i. Contact — `components/home/ContactForm.tsx`

Ivory. `max-width: 1280px`, padding `92px 48px`, grid
`repeat(auto-fit, minmax(300px, 1fr))`, gap `48px 80px`, `align-items: start`.

Left: h2 `Get in touch` (42px, `line-height: 1.1`) + copy (16.5px, `line-height: 1.9`,
`rgba(42,39,51,0.68)`, `max-width: 380px`) — *"Book club photos, media requests, event
invitations, or just to tell me who you suspected first."*

Right: column, gap `16px`. Name + Email side by side (`1fr 1fr`, gap `16px`), then a
subject `<select>`, then a 6-row textarea (`resize: vertical`), then a `#3E4A42` Send
button (`align-self: flex-start`, padding `16px 32px`).

All fields: 15px Jost, padding `16px`, transparent background,
`1px solid rgba(42,39,51,0.25)`, no radius, `outline: none`, focus border `#3E4A42`.
Subject options: `General`, `Book club submission`, `Media & events`, `Something else`.

Posts to the existing `app/api/contact/route.ts`. Add the validation, loading, and
success/error states the prototype doesn't show — use `components/ui/form.tsx` +
`sonner`.

---

### 2. Book detail — `app/(site)/books/[slug]/page.tsx`

**The new page, and the centerpiece of the overhaul.** Reached from `Learn more` on the
featured release, from any title on the Books page, and from the "More from" grid on
another book page.

#### 2a. The page-turn

A book opens itself on load: the cover lifts, then sheets turn one by one, each carrying
a single word that names what that spread is about. The words come from Sanity
(`themeWords`), so the client controls them per book.

**Geometry.** Modelled in a fixed design space and scaled to fit, so the math never
depends on viewport size:

```
PAGE_W = 300   // one leaf, px
PAGE_H = 380
SEGS   = 10    // slices per sheet while turning
```

Stage: outer `div` `height = round(PAGE_H × scale)`; inner `div` with
`perspective: 1700px`, `perspective-origin: 50% 44%`, `transform: scale(scale)`,
`transform-origin: top center`. Book: `width: 600px`, `height: 380px`,
`transform-style: preserve-3d`, `transform: rotateX(6deg)`.

`scale = clamp(min(innerWidth − 56, 620) / 600, 0.42, 1.02)`, recomputed on resize.

**Why sliced.** A sheet rendered as one plane on a `rotateY` hinge reads as cardboard —
this was tried and rejected repeatedly. Real paper bends. So a turning sheet is cut into
10 vertical strips; each strip takes a slightly different angle following a cosine
profile, and each strip's position is accumulated from the previous one, so the surface
genuinely bows — the spine end leads, the fore-edge trails:

```js
for (j = 0; j < N; j++) {
  u     = (j + 0.5) / N
  theta = phi + bend * cos(PI * u)      // phi = -ease * PI, bend = -0.42 * arc
  x    += (PAGE_W / N) * cos(theta)
  z    -= (PAGE_W / N) * sin(theta)
}
```

Each strip renders as `translate3d(x − j·W, 0, z + baseZ) rotateY(theta)` with
`transform-origin: left center` and `transform-style: preserve-3d`.

**Three bugs worth not repeating** — each of these made it look fake:

1. **Do not shade per strip.** Independent per-strip brightness produces visible
   corrugation. Sample the shading per strip, then paint it as **one page-wide gradient**
   (`linear-gradient(90deg, …)` built from all 10 stops) positioned behind the strip's
   clip window. The surface then reads as a smooth curve even though the geometry is
   faceted.
2. **Never put a `filter` on an ancestor of a 3D-transformed child.** It flattens the 3D
   context and silently kills `backface-visibility`, so the cover stays visible after
   passing 90°. Drop shadows on the sheet wrapper caused exactly this.
3. **The back face is already mirrored twice** — once by its own `rotateY(180deg)`, once
   by the sheet's turn. A third `scaleX(-1)` produces mirrored text. Instead, offset the
   back face's strips in reverse order: `backLeft = −(N − 1 − j) · W`.

**Layers, bottom to top:** contact shadow (absolute, `left: 50%`, `top: 100%`,
`width: 112%`, `height: 26px`, `radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.55),
transparent 68%)`, `blur(7px)`) → left leaf → right leaf → sheets.

The **left leaf is the inside of the front cover**, so it must not exist until the cover
lifts: `opacity = clamp(flip × 2.4, 0, 1)`. At rest the reader sees a closed book — cover
on the right, nothing on the left. Getting this wrong (a visible blank left page before
the cover moves) was a specific client complaint.

Each leaf carries gutter shading via `box-shadow: inset ±30px 0 50px -32px
rgba(0,0,0,0.65–0.8)`, darkest at the spine. The left leaf also takes a cast shadow from
the sheet above it: `linear-gradient(270deg, rgba(0,0,0, 0.34 × inFlight), transparent
58%)`.

**Timing.** `520ms` hold, then `900ms` per sheet, driven by one `requestAnimationFrame`
loop over a single `flip` float. Sheets = `themeWords.length` (deliberately one short of
the sheet count, so the **final word stays face-up** — running the full count left the
reader on two blank pages, another specific complaint). Per-sheet progress
`t = clamp(flip − i, 0, 1)`, eased with a cubic in-out; `arc = sin(PI · t)` drives
everything that should peak mid-turn.

`prefers-reduced-motion: reduce` → jump straight to the open spread, no animation.

**Performance.** A sheet lying flat has no curve to describe, so it costs exactly one
element (`N = 1`); only the sheet in flight pays for 10. That's 5 elements at rest vs 50.
Guard with `Math.abs(bend) < 1e-4`, not `bend === 0` — `Math.sin(Math.PI)` returns
`1.2e-16`, not zero.

Stacking: a sheet in flight is `z-index: 12 + (n − i)`; once landed it drops to `0`,
beneath the spread. Sheets also carry real thickness via `translateZ` (`1.5px` per sheet).
Only the top sheet of each pile shows its word — otherwise type bleeds through the paper.

**In production**, consider building this as a small client component with the geometry in
a `useMemo` and the clock in a `useRef`+`rAF`, mounted below the fold guard so it doesn't
block hydration. It's pure CSS 3D — no three.js, no library. (A WebGL version was
explored and rejected as unnecessary weight.)

#### 2b. Rest of the book page

`#22202B` hero holding the book stage, `max-width: 1180px`, padding
`clamp(36px, 4.5vw, 60px) clamp(24px, 4vw, 48px) clamp(52px, 6vw, 80px)`.

Below the stage, a **title lockup** (`flex`, centered, gap `clamp(20px, 3vw, 40px)`,
`margin-top: clamp(26px, 3.4vw, 44px)`, wrap): the cover at
`width: clamp(96px, 12vw, 140px)`, `aspect-ratio: 2/3`, `box-shadow: 0 18px 44px
rgba(0,0,0,0.55)`, beside the h1 (Bodoni Moda `clamp(34px, 5vw, 58px)`,
`line-height: 1.08`, `max-width: 16ch`). The persistent cover means a reader always knows
which book they're on, whatever the animation is doing.

Then centered: edition note (12px `0.24em` uppercase `#C9A227`, `margin-top: 14px`) and
hook (Bodoni Moda italic `clamp(19px, 2.2vw, 26px)`, `line-height: 1.5`,
`rgba(246,242,234,0.8)`, `max-width: 42ch`).

Then, in order:

1. **Prose** — ivory, `max-width: 760px`, padding `clamp(64px, 8vw, 100px) clamp(24px,
   4vw, 48px)`. Paragraphs 17px, `line-height: 1.95`, `rgba(42,39,51,0.82)`,
   `margin-bottom: 24px`. Optional **beats** (Bodoni Moda 23px, `line-height: 1.5`,
   `margin-bottom: 8px`) and a **closer** (Bodoni Moda italic 27px, `#9A7B4F`,
   `margin-top: 22px`). Used for *Agreeable Avery*'s three "Someone…" lines and its
   closing question.
2. **Praise band** — `#3E4A42`, `max-width: 900px`, padding `clamp(60px, 7vw, 88px)`,
   centered, Bodoni Moda italic `clamp(22px, 2.8vw, 32px)` + attribution.
3. **Get your copy** — ivory. Bordered panel (`1px solid rgba(42,39,51,0.18)`, padding
   `clamp(32px, 4vw, 48px)`, centered): Bodoni Moda `clamp(26px, 3vw, 34px)` heading +
   retailer buttons (`1px solid rgba(42,39,51,0.35)`, padding `15px 26px`, hover
   `#9A7B4F` + `rgba(154,123,79,0.08)`).
4. **More from E. L. Westbury** — h2 `clamp(28px, 3.4vw, 40px)`,
   `margin: clamp(64px, 8vw, 92px) 0 36px`. Grid `repeat(auto-fit, minmax(220px, 1fr))`,
   gap `36px`. Cards: cover → title (Bodoni Moda 24px) → genre (12px `0.2em` uppercase
   `#9A7B4F`). Excludes the current book.

---

### 3. Books — `app/(site)/books/page.tsx`

Ivory throughout. Intro: `max-width: 1280px`, padding `88px 48px 0`, h1 `Books` (58px) +
copy (17px, `line-height: 1.85`, `rgba(42,39,51,0.64)`, `max-width: 520px`) — *"Grouped
by genre — thrillers on one side, romance on the other. Both are hers."*

Then one section per genre shelf, padding `68px 48px 0`. Shelf header: genre label (11px
`0.26em` uppercase `#9A7B4F`) beside a `flex: 1` hairline rule
(`rgba(42,39,51,0.16)`), gap `16px`, `margin-bottom: 40px`.

Books stack with gap `52px`. Each is a grid `repeat(auto-fit, minmax(240px, 1fr))`, gap
`48px`, `align-items: start`: cover (`aspect-ratio: 2/3`, shadow `0 16px 40px
rgba(42,39,51,0.22)`) beside h2 (Bodoni Moda 36px, `line-height: 1.15`, **clickable**,
hover `#9A7B4F`) → note (12.5px `0.14em` uppercase `rgba(42,39,51,0.5)`,
`margin-top: 12px`) → description (16px, `line-height: 1.9`, `max-width: 540px`) →
retailer buttons (11.5px, padding `12px 18px`).

Shelves: **Thriller** (Drowning in Paper Flowers, Agreeable Avery), then **Romance**
(Heart Roots).

Footer CTA: padding `84px 48px 96px`, bordered panel (`1px solid rgba(42,39,51,0.16)`,
padding `40px 44px`, `flex` space-between, wrap): Bodoni Moda 28px `Never miss a release`
+ 15px subcopy, and a `#3E4A42` `Follow on BookBub` button.

### 4. About — `app/(site)/about/page.tsx`

Ivory. `max-width: 1280px`, padding `88px 48px 96px`, grid
`repeat(auto-fit, minmax(300px, 1fr))`, gap `56px 80px`, `align-items: start`.

Left: `assets/elw-headshot.jpg`, `aspect-ratio: 4/5`, `object-fit: cover`,
`position: sticky; top: 120px`. Right: `About` label → h1 `E.L. Westbury` (54px,
`line-height: 1.1`) → short bio as a Bodoni Moda *italic* lede (23px, `line-height: 1.6`,
`rgba(42,39,51,0.78)`, `max-width: 560px`) → a `54px × 1px` `#9A7B4F` divider
(`margin: 36px 0`) → long-bio paragraphs (16.5px, `line-height: 1.95`,
`rgba(42,39,51,0.74)`, `max-width: 600px`).

The italic lede is client-verbatim: *"E.L. Westbury writes twisty domestic thrillers with
a hopeless romantic's heart. She lives in Texas with her husband, three kids, and two fur
babies."*

**Note:** `authorInfo.longBio` exists in the schema but the current route renders
hard-coded prose. Wire it.

### 5. Events — `app/(site)/events/page.tsx`

Ivory, `max-width: 1280px`, padding `88px 48px 96px`. h1 `Events & Appearances` (58px) +
copy — *"Signings, festivals, book club visits. Past dates drop off on their own."*
(`margin-bottom: 52px`).

Rows: grid `repeat(auto-fit, minmax(160px, auto))`, gap `24px 36px`, `padding: 30px 0`,
top border `rgba(42,39,51,0.14)`:

- Date block — day in Bodoni Moda 34px `line-height: 1`, month below in 11.5px `0.2em`
  uppercase `rgba(42,39,51,0.55)`
- Title 22px + venue 14.5px `rgba(42,39,51,0.56)`
- `Details & tickets` button, `justify-self: end`, `1px solid rgba(42,39,51,0.28)`,
  padding `13px 22px`, hover `#9A7B4F`

**Empty state** (`margin-top: 68px`, `1px dashed rgba(42,39,51,0.28)`, padding `52px`,
centered): `Empty state` label → Bodoni Moda 30px *"Nothing on the calendar right now."* →
15.5px *"The Buriers hear first — before the calendar does."* → `#3E4A42` `Join the
mailing list` button. Render this whenever there are no upcoming events. (The `Empty
state` label itself is a spec annotation — drop it in production.)

### 6. Press — `app/(site)/press/page.tsx`

Ivory, `max-width: 1280px`, padding `88px 48px 96px`. h1 `Press` (58px) + copy —
*"Interviews, reviews, and features. This page is built to grow."*
(`margin-bottom: 52px`).

Grid `repeat(auto-fit, minmax(300px, 1fr))`, gap `26px`. Each card is a link:
`1px solid rgba(42,39,51,0.16)`, padding `34px`, hover border `#9A7B4F`. Inside: a row
with outlet (11px `0.24em` uppercase `#9A7B4F`) and date (12px `rgba(42,39,51,0.45)`),
then the headline (Bodoni Moda 26px, `line-height: 1.3`, `margin-top: 16px`,
`text-wrap: pretty`).

### 7. Book Club — `app/(site)/book-club/page.tsx`

Header band: `#3E4A42`, `max-width: 1280px`, padding `84px 48px`. h1 `Book Club` (58px) +
copy (17px, `line-height: 1.85`, `rgba(246,242,234,0.68)`, `max-width: 560px`) —
client-verbatim: *"Send me your photos. If your club read one of mine, I want to see the
wine, the snacks, and the person who guessed the ending on page nine."* Then a brass
`Submit your photos` button (padding `16px 30px`) → contact form with the book-club
subject preselected.

Gallery: ivory, padding `76px 48px 96px`, grid `repeat(auto-fit, minmax(240px, 1fr))`,
gap `30px`. Each: `aspect-ratio: 4/3` image → club name (17px, `margin-top: 15px`) →
location (13.5px `rgba(42,39,51,0.55)`).

Only photos with `approved: true` render. The prototype shows placeholder tiles
(`#E9E2D4` fill, `1px solid rgba(42,39,51,0.14)`) because no real photos were supplied.

---

## Interactions & Behavior

| Trigger | Behavior |
|---|---|
| Nav item click | Route change; active item turns `#9A7B4F` with a bottom border |
| Logo click | → home |
| `Mailing list` / `Become a Burier` / `Join the mailing list` | Open newsletter modal |
| Modal `Hand me a shovel.` | Submit → `app/api/newsletter/route.ts`, then close |
| Modal `Sounds like work.` | Close, no submit |
| `Learn more` / book title / "More from" card | → `/books/[slug]`, scroll to top, page-turn plays once |
| `Explore the books` / `All titles` | → `/books` |
| `All dates` | → `/events` |
| `See the book clubs` | → `/book-club` |
| FAQ row click | Toggle that item; clicking the open one closes all |
| Retailer button | External link, new tab |
| Contact `Send` | POST `app/api/contact/route.ts` |

**Hover states**, consistently: brass fills lighten to `#B08D5C`; green fills darken to
`#2A2733`; outlined buttons take a `#9A7B4F` (light) or `#C9A227` (dark) border and text
plus an 8%-alpha tint; text links go `#9A7B4F`; underlined links swap their border color.

**Focus states:** every input's border goes to `#3E4A42` on light backgrounds, `#9A7B4F`
on dark. Add proper visible focus rings for keyboard users — the prototype only styles
`:focus` borders, which is not sufficient for accessibility.

**Missing states to add in production** (the prototype doesn't model them): form
validation, submit loading, success/error toasts, image loading placeholders, and 404 for
an unknown book slug.

### Responsive

The prototype is fluid rather than breakpoint-driven: `clamp()` on type and padding,
`repeat(auto-fit, minmax(…))` on every grid, `min()` on text max-widths. It reflows
correctly from ~360px up. Two production additions:

1. A real mobile nav (hamburger + sheet) below `md`.
2. Verify the page-turn at 360px — `scale` bottoms out at `0.42`, which yields a 252px
   book. Consider skipping the animation entirely below ~480px and rendering the open
   spread directly.

---

## State Management

Per-page local state only; no global store needed.

| State | Where | Purpose |
|---|---|---|
| `popup: boolean` | Layout | Newsletter modal visibility |
| `openFaq: number` | FAQ | Index of the open item, `-1` for none. Starts at `0` |
| `flip: number` | Book detail | Float, `0 → themeWords.length`. Drives the whole turn |
| `scale: number` | Book detail | Book fit scale, recomputed on resize |
| Praise index | Praise | Active blurb (carousel — not implemented in the prototype) |

Data fetching stays as-is: server components query Sanity with GROQ, `next/image` +
`urlFor()` for imagery. The page-turn component must be a client component
(`'use client'`); everything else can stay server-rendered.

---

## Sanity changes

Only one new field is required.

**`sanity/schemas/book.ts`** — add:

```ts
defineField({
  name: 'themeWords',
  title: 'Page-Turn Words',
  type: 'array',
  of: [{ type: 'string' }],
  description:
    'One short word or phrase per page of the opening animation on the book page, ' +
    'in order. 3–5 works best. e.g. "THE LIE", "THE TRUTH", "THE NIGHTMARE", "THE BODY". ' +
    'Set in caps.',
  validation: (Rule) => Rule.max(6),
}),
```

Also worth doing while in there — all existing fields, nothing to add:

- **`book.longDescription`** exists but is never rendered. The book detail page's prose
  section should use it, falling back to `description`.
- **`authorInfo.longBio`** exists but the About route renders hard-coded prose. Wire it.
- **`book.order`** should drive both the home Books grid and the Books page shelves so
  *Drowning in Paper Flowers* leads without a hard-coded array.

Everything else in the design maps to fields that already exist: `heroContent`,
`featuredRelease`, `brandStatement`, `praise`, `event`, `faqItem`, `press`,
`bookClubPhoto`, `siteContent`, `authorInfo`, `book.retailers`, `book.editionNote`.

---

## Verbatim copy

**Do not rewrite any of the following.** It is the client's own wording, and the
newsletter strings are character-exact per her request.

- Hero: `Twisty domestic thrillers` / `with a hopeless romantic's heart.`
- Footer: `Some secrets stay buried. Most don't.`
- Newsletter: `Want to be a Burier?` · `Cover reveals, event dates, and the occasional
  thing I probably shouldn't tell you.` · `Hand me a shovel.` · `Sounds like work.`
- Buriers statement: `A reader group with shovels, good manners, and no intention of
  leaving anything buried.`
- About lede: `E.L. Westbury writes twisty domestic thrillers with a hopeless romantic's
  heart. She lives in Texas with her husband, three kids, and two fur babies.`
- Book club: `Send me your photos. If your club read one of mine, I want to see the wine,
  the snacks, and the person who guessed the ending on page nine.`
- Contact: `Book club photos, media requests, event invitations, or just to tell me who
  you suspected first.`
- Events: `Signings, festivals, book club visits. Past dates drop off on their own.` ·
  `Nothing on the calendar right now.` · `The Buriers hear first — before the calendar
  does.`
- Books: `Grouped by genre — thrillers on one side, romance on the other. Both are hers.`
- Press: `Interviews, reviews, and features. This page is built to grow.`

**Book jacket copy** for all three titles is the client's, reproduced in full in the
prototype's `TITLES` object (`Erika Westbury Site.dc.html`, in the `<script data-dc-script>`
block). Use it as the seed content when populating Sanity. The theme words per book:

| Book | Words |
|---|---|
| Drowning in Paper Flowers | THE LIE · THE TRUTH · THE NIGHTMARE · THE BODY |
| Agreeable Avery | THE PERFECT LIFE · THE STRANGER · THE BETRAYAL · WHO? |
| Heart Roots | THIRTEEN DAYS · TEN SUMMERS · THE BOY SHE LOST · THE ROOTS |

The first two words for *Drowning* are the client's own framing from her jacket copy. The
rest were drawn from the blurbs and are open to her revision — they're CMS-controlled for
exactly that reason.

---

## Assets

All in `assets/`, all supplied by the client except where noted.

| File | Size | Use |
|---|---|---|
| `elw-hero-portrait.jpg` | — | Home hero, full-bleed right |
| `elw-headshot.jpg` | — | About page portrait |
| `elw-portrait.jpg` | — | Newsletter modal left panel |
| `elw-couch-lifestyle.jpg` | — | Brand statement / Buriers section |
| `drowning-in-paper-flowers.jpg` | — | Cover |
| `agreeable-avery.jpg` | — | Cover |
| `heart-roots.jpg` | — | Cover |
| `drowning-promo.jpg` | — | Unused; available for press/social |
| `elw-seal.png` | 1024px-ish | Original logo photograph |
| `elw-seal-cutout.png` | 929×975 | Seal, background removed **(derived)** |
| `elw-icon.png` | 490×610 | Shovel-and-quill mark, extracted **(derived)** |

In production, covers and photography should come from Sanity via `urlFor()` rather than
`/public`. The **logo files belong in `/public`** — they're brand chrome, not content.

**Outstanding asset request:** a **vector** version of the seal and the shovel-and-quill
mark. Everything here is derived from a single raster photo and won't hold up in print,
at large display sizes, or on high-DPI screens above ~120px.

---

## Files in this bundle

| File | What it is |
|---|---|
| `Erika Westbury Site.dc.html` | **The main design.** All pages, the hero, the book detail page, the page-turn. Open in a browser; nav switches pages |
| `Concept A - The Dig.dc.html` | Rejected hero concept — scroll-driven parting strata revealing a cover |
| `Concept B - The Evidence Board.dc.html` | Rejected hero concept |
| `Concept C - Redacted.dc.html` | Rejected hero concept |
| `Concept D - The Flipping Book.dc.html` | Standalone flipping-book study. The client liked this; its realism approach fed the book detail page. Kept for reference |
| `assets/` | All imagery and logo files |
| `support.js` | Runtime for the `.dc.html` prototypes. Needed to open them locally; **not** part of the implementation |

The four concept files are **history, not spec**. Only `Erika Westbury Site.dc.html` is
the design to build.

---

## Suggested order of work

1. Fonts + Tailwind tokens (colors, the two families, `borderRadius: 0` on the
   components used here). Everything else depends on this.
2. Header lockup and footer — visible on every page, and they set the tone.
3. Home sections top to bottom, reusing the existing component files.
4. `themeWords` in the schema, then populate the three books in Sanity.
5. The book detail page, static first — get the layout, prose, and buy panel right before
   touching the animation.
6. The page-turn, as an isolated client component. Build it against one book, then
   generalize.
7. Mobile nav, form states, empty states, focus rings.
