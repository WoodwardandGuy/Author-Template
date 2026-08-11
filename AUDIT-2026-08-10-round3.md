# E.L. Westbury Site — Readiness Audit #3 (Final pass, post-launch)

**Date:** 2026-08-10 (third pass)
**Context:** Live at www.elwestbury.com. Re-run after the post-launch feedback rounds: olive **softened** (outline buttons), homepage **genre grouping**, new **tagline**, circular **seal** medallion, Buriers intro, FAQ edit (no em dash), UK publicity, /books order fix.
**Method:** production build, live-site verification, live Sanity query, WCAG math, static analysis.
**Verified:** git tree clean; production confirmed serving today's code (grouped /books + outline buttons + new tagline + seal + UK publicity all live).

Legend: **PASS** / **PARTIAL** / **GAP** / **BLOCKER**

---

## TL;DR

The site is **effectively done from a code/content standpoint** and everything from the three feedback rounds is live. What's left is a **short, purely-operational list**: finish the Resend hookup (in progress), add GA4, and wire the revalidation webhook. No code blockers remain.

**Movement since round 2:** red→olive softened to outline; homepage grouped; tagline/subhead/FAQ/UK-publicity/seal all shipped; Resend key now present (was the #1 blocker — now mid-setup).

---

## 1. Completeness & visibility — PASS

| Area | Status | Note |
|---|---|---|
| Hero + tagline | **PASS** | Live: "Dark secrets. Complicated love." / "And everything buried in between." (drives all meta/OG). |
| Books — grouped + ordered | **PASS** | Homepage **and** /books show **Thrillers** (Drowning → Agreeable Avery) / **Romance** (Heart Roots). New subhead live. |
| FAQ "What is a Burier?" | **PASS** | Rewritten; **no em dash** (verified). |
| Contact — representation | **PASS** | UK Publicity (Orion Books) live; Gmail still absent. |
| Book club / events | **PASS** | 8 approved photos; 1 upcoming event. |
| Press (0) / Praise (0) | **PASS** | Press 404s + out of nav/sitemap (verified live); Praise section hides. |
| Seal | **PASS** | Fixed to a clean circular medallion (footer + newsletter stamp); full ring renders, no clip/box. |
| Images / headings | **PASS** | All `next/image`; one `<h1>` per page. |

---

## 2. Performance — PASS

All content pages **Static/SSG**, only `/api/*` + `/studio` dynamic. Clean build (~27s, 22 pages). Fonts self-hosted, images optimized, dead deps already removed. *(Exact LCP/CLS still un-measured — a Lighthouse pass on the live site is the only outstanding perf item, and it's optional.)*

---

## 3. SEO — PASS

Canonical/OG on **www** (live), new tagline in title/meta, Person/Book/FAQ JSON-LD, sitemap (has /contact, excludes empty /press), robots correct, indexable (200).

---

## 4. Accessibility — PASS (one minor note)

WCAG AA on the dark theme:

| Element | Ratio | Verdict |
|---|---|---|
| body / secondary text | 15.0 / 10.0:1 | **PASS** |
| outline-button label + links (brand-light on soil) | 6.96:1 | **PASS** |
| popup button (bone on olive) | 5.44:1 | **PASS** |
| seal medallion vs ground | 17.7:1 | **PASS** (bright — see note) |
| **outline-button border** (olive on soil) | **2.77:1** | slightly under the 3:1 UI guideline |

- **Minor:** the softened buttons' olive **border** is 2.77:1 — just below the 3:1 for UI boundaries. The buttons are still clearly identifiable (olive-light label + shape + hover-fill), so it's not a real blocker, but if you want it airtight, switch the border to `brand-light` (would jump to ~7:1). Optional.
- Reduced motion honored; alt coverage good; red fully gone (no wine/red anywhere).
- Seal medallion is a warm near-white (`#fbf9f6`) — reads as a bright "stamp." Fine, but if Erika wants it toned to the site's bone/ivory, that needs a recolored seal export.

---

## 5. Integration readiness — Resend in progress; 2 gaps

| Integration | Status | Note |
|---|---|---|
| **Contact form (Resend)** | **PARTIAL — in progress** | `RESEND_API_KEY` now set locally; DNS records being added on Vercel DNS (confirmed Vercel is the authoritative host). **Remaining:** domain shows Verified in Resend → add the key to **Vercel Production** → **redeploy**. Then the live form sends. (Was the #1 blocker in rounds 1–2.) |
| **Newsletter (Flodesk)** | **PASS** | Working (verified by a real subscription). `NEWSLETTER_LIST_ID` empty = no segment (optional). |
| **Analytics (GA4)** | **GAP** | `NEXT_PUBLIC_GA_MEASUREMENT_ID` empty → no pageview tracking on a live site. |
| **Revalidation webhook** | **GAP** | `SANITY_REVALIDATE_SECRET` empty + no webhook → **Erika's Studio edits won't appear live until a redeploy.** Route exists; needs the secret + a Sanity webhook. |
| Sanity read token | **MINOR** | Empty → draft-mode/visual-editing off; public content unaffected. |

---

## Remaining punch list (short)

### To finish launch
1. **Complete Resend** — verify domain → add `RESEND_API_KEY` to **Vercel Production** → redeploy. (Contact form goes live.)
2. **Add GA4** — `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
3. **Revalidation webhook** — `SANITY_REVALIDATE_SECRET` + Sanity webhook → `/api/revalidate`, so her edits publish without a manual redeploy.

### Optional polish
4. Outline-button **border** → `brand-light` for a clean 3:1.
5. Tone the **seal medallion** to bone/ivory (or recolor the mark to brand olive) if Erika wants.
6. Trim **": A Novel"** from the Drowning title.
7. Set a **Flodesk segment** (`NEWSLETTER_LIST_ID`).
8. **Lighthouse** pass for hard LCP/CLS.

---

## Resolved across all three audits
Full de-template + de-red; olive palette (softened); Fraunces/Karla; canonical www; new tagline through meta/OG; genre grouping (home + /books) with correct order; Press/Praise auto-hide; `/events` h1; `/contact` in sitemap; lint (flat config); dead-dep cleanup; initials signature; EL-mark nav; circular seal; UK publicity; FAQ/bio/copy edits; Flodesk live; bigger hero/mark.

*Final review pass — no code changes made here. Git clean, production current.*
