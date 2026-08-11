# E.L. Westbury Site — Readiness Audit #2 (Post-Launch)

**Date:** 2026-08-10 (second pass)
**Context:** Site is **live** at www.elwestbury.com. This audit re-runs the round-1 checks (`AUDIT-2026-08-10.md`) after the post-launch work: olive palette, bigger hero/mark, initials signature, EL-mark nav, new tagline, Press/Praise auto-hide, book-order fix, UK publicity, dead-dep cleanup, lint fix.
**Method:** production `next build`, live-site checks, live Sanity query, WCAG math, static analysis.

Legend: **PASS** / **FAIL** / **PARTIAL** / **BLOCKER**

---

## TL;DR

The site is in **strong shape and materially better than round 1**. Nearly every round-1 item is resolved: canonical is on `www`, the new tagline flows through all meta/OG, the red palette is gone (olive throughout, all AA-contrast), Press/Praise hide cleanly, the /books order bug is fixed, lint runs, dead deps are gone. Working tree is clean and **production is current** (verified live: new tagline, DIPF-first order, www canonical).

**The one launch-critical hole is unchanged: the contact form is dead until Resend is configured.** Analytics and the on-publish revalidation webhook are the remaining gaps.

---

## 1. Completeness & visibility — PASS

| Area | Status | Note |
|---|---|---|
| Content populated (bio, portrait, logo, tagline, hero, FAQ, book club, event) | **PASS** | authorInfo complete; new tagline live; 8 approved book-club photos; 1 upcoming event. |
| Books order | **PASS** ✅ | Fixed: query now projects `order`, and /books sorts by it within genre → **Drowning → Agreeable Avery** (Thrillers), **Heart Roots** (Romance). Verified in live render. |
| Books subhead | **PASS** ✅ | New voice-based copy: "Choose your adventure: Trust absolutely no one or fall in love." |
| Press (0 items) | **PASS** ✅ | Auto-hidden — `/press` 404s (verified) and is dropped from nav + sitemap until content exists. |
| Praise (0 items) | **PASS** ✅ | Home section returns null. |
| Contact — representation | **PASS** ✅ | UK Publicity (Orion Books) added; name field made optional so it renders cleanly. Gmail still absent sitewide. |
| Images / headings | **PASS** | All `next/image`, no raw `<img>`, decorative nav mark `alt=""` (name provides the label); one `<h1>` per page (home via Hero). |

Minor: the Drowning title still carries the **": A Novel"** suffix (shows in listings) — cosmetic, pending your call.

---

## 2. Performance — PASS

| Item | Status | Note |
|---|---|---|
| Rendering | **PASS** | All content pages **Static (○)** or **SSG (●)**; only `/api/*` + `/studio` dynamic. Same static-first strength. |
| Fonts / images | **PASS** | `next/font` (self-hosted, no CLS); `next/image` + Sanity CDN. |
| Bundle hygiene | **PASS** ✅ | Round-1 dead deps removed (8 packages + 5 orphan ui files). |
| Build | **PASS** | Compiles clean (~33s); 22 static pages. |
| Exact LCP/CLS | **NOT MEASURED** | Turbopack build still omits per-route JS size. Recommend a **Lighthouse run against the live site** for hard numbers (it's public now, so easy). |

---

## 3. SEO & author optimization — PASS

| Item | Status | Note |
|---|---|---|
| Canonical / OG host (#7) | **RESOLVED** ✅ | Live `og:url` = `https://www.elwestbury.com` — bare→www is reconciled. |
| Tagline in metadata | **PASS** ✅ | Live `<title>` and OG carry the new tagline via `authorInfo.tagline`. |
| Structured data | **PASS** | Person + WebSite site-wide, Book (w/ offers) on book pages, FAQ on home. |
| Sitemap / robots | **PASS** | Sitemap has `/contact`, excludes `/press` while empty; robots disallows `/studio` + `/api`. |
| Indexing | **PASS** | Gate is off — live returns 200 (`X-Matched-Path: /`), site is crawlable. |

---

## 4. Accessibility — PASS (olive palette verified)

WCAG AA (4.5:1 normal / 3:1 large-UI) on the dark theme:

| Pair | Ratio | Verdict |
|---|---|---|
| bone on soil (body) | 15.03:1 | **PASS** |
| bone-dim on soil (secondary) | 10.05:1 | **PASS** |
| brand-light `#98a37a` on soil (links/accents) | 6.96:1 | **PASS** |
| moss `#8a9472` on soil (eyebrows) | 5.81:1 | **PASS** |
| bone on olive `#595E48` (button label) | 5.44:1 | **PASS** |

- **Red fully removed** — zero wine/red class or hex leftovers; olive family is AA everywhere it's used as text vs. buttons.
- Reduced motion honored (intro). Alt coverage good.
- **Minor:** custom nav links / the mailing-list pill rely on the browser default focus outline; the shadcn buttons/inputs have proper focus rings. Consider explicit `focus-visible` styling on the nav for keyboard users. Not blocking.

---

## 5. Integration readiness — 1 blocker, 2 gaps

| Integration | Status | Note |
|---|---|---|
| **Contact form (Resend)** | **BLOCKER** | `RESEND_API_KEY` still not set up (confirmed by owner). The live contact form fails on submit. Highest-priority fix — needs a Resend key + verified `contact@elwestbury.com` domain, then set in Vercel. |
| **Newsletter (Flodesk)** | **PASS** ✅ | Working — verified by a real test subscription. `NEWSLETTER_LIST_ID` empty (optional segment; set if she wants subscribers tagged). |
| **Analytics (GA4)** | **GAP** | `NEXT_PUBLIC_GA_MEASUREMENT_ID` empty → no pageview tracking on a live launch. Component is ready; just needs the ID. |
| **On-publish revalidation** | **GAP** | `SANITY_REVALIDATE_SECRET` empty + no Sanity webhook. Consequence: Erika's future Studio edits won't appear live until someone **redeploys**. Route exists — set the secret + add the webhook so her edits go live in seconds. |
| Sanity read token | **MINOR** | Empty → draft-mode/visual-editing off; public content is unaffected. |

---

## Prioritized punch list

### Launch-critical
1. **Set up Resend** (`RESEND_API_KEY` + verify from-domain, add to Vercel) — the contact form is currently dead.

### Should-fix
2. **Add GA4** (`NEXT_PUBLIC_GA_MEASUREMENT_ID`) — you're live with no analytics.
3. **Revalidation webhook** (`SANITY_REVALIDATE_SECRET` + Sanity webhook → `/api/revalidate`) — so Erika's edits publish without a manual redeploy.

### Polish (optional)
4. Run **Lighthouse** on the live site for real LCP/CLS/TBT.
5. Explicit **focus-visible** styles on nav links / pill.
6. Trim **": A Novel"** from the Drowning title (Sanity) if you want cleaner listings.
7. Set a **Flodesk segment** (`NEWSLETTER_LIST_ID`) if subscribers should be tagged.

---

## Resolved since round 1 (no action)
Canonical www · new tagline in meta/OG · red→olive (all AA) · bigger hero + mark · initials signature · EL-mark nav · Press/Praise auto-hide · /books order bug · `/events` h1 · `/contact` in sitemap · lint (flat config) · dead-dependency cleanup · book-club/press/bio content.

*Working tree clean; production verified current. Second-pass audit — no code changes made in this pass.*
