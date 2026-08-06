# Google Ads Launch Checklist — {{CLIENT_NAME}}

> Woodward & Guy — Google Ads onboarding template
> Copy this file into the client's project repo and fill in the `{{PLACEHOLDERS}}` as you go.

---

## Client Details

| Field | Value |
|-------|-------|
| Client name | {{CLIENT_NAME}} |
| Website | {{CLIENT_DOMAIN}} |
| Client contact | {{CLIENT_CONTACT_NAME}} (`{{CLIENT_EMAIL}}`) |
| Client phone | {{CLIENT_PHONE}} |
| Industry / vertical | {{INDUSTRY}} |
| Service areas | {{SERVICE_AREAS}} |
| W&G MCC ID | `432-245-4246` |
| Client Google Ads ID | {{ADS_ACCOUNT_ID}} |
| GTM Container ID | {{GTM_CONTAINER_PUBLIC_ID}} |
| GA4 Measurement ID | {{GA4_MEASUREMENT_ID}} |
| Tier selected | {{TIER}} |
| Monthly ad spend budget | {{AD_SPEND}} |

---

## Phase 1: Website & Tracking Foundation

### 1.1 Deploy Website
- [ ] Site live at `{{CLIENT_DOMAIN}}`
- [ ] Mobile-responsive and fast-loading
- [ ] Dedicated landing pages for each core service
- [ ] Dedicated pages for each service area (if applicable)
- [ ] Contact/lead form functional with email notifications
- [ ] Phone number click-to-call links (`tel:`) on all pages
- [ ] OG image set (`/public/og-image.jpg`, 1200x630)
- [ ] Favicon and web manifest configured

### 1.2 Google Tag Manager
- [ ] GTM container created and installed
- [ ] Container ID: `{{GTM_CONTAINER_PUBLIC_ID}}`
- [ ] Account ID: {{GTM_ACCOUNT_ID}}
- [ ] Container ID (numeric): {{GTM_CONTAINER_ID}}
- [ ] Workspace published
- [ ] Triggers configured:
  - [ ] All Pages
  - [ ] Phone Click (tel: link clicks)
  - [ ] Form Submission (dataLayer event)

### 1.3 Google Analytics 4
- [ ] GA4 property created
- [ ] GA4 config tag firing via GTM on all pages
- [ ] Realtime verified: `page_view` events appearing
- [ ] `form_submission` marked as key event (once per session)
- [ ] `phone_click` marked as key event (once per session)

### 1.4 Lead Notifications
- [ ] Email service configured (Resend / SendGrid / etc.)
- [ ] Sending domain verified: `{{CLIENT_DOMAIN}}`
- [ ] Lead notification email sent to: `{{CLIENT_EMAIL}}`
- [ ] Customer confirmation email sent to submitter
- [ ] UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid`) captured in form and included in lead notification

### 1.5 Search Console
- [ ] Property verified (via GA4 or DNS)
- [ ] Sitemap submitted: `https://{{CLIENT_DOMAIN}}/sitemap.xml`

### 1.6 Google Business Profile
- [ ] Client has active GBP listing
- [ ] NAP (name, address, phone) matches website exactly
- [ ] Website URL set to `https://{{CLIENT_DOMAIN}}`
- [ ] Link GBP to Google Ads account once active

---

## Phase 2: Content & SEO

### 2.1 Service Pages
For each service page:
- [ ] Meta description (160 chars, keyword-rich)
- [ ] Long description (500+ words of unique content)
- [ ] Featured image with descriptive alt text
- [ ] Clear H1, CTA, and conversion path

### 2.2 Service Area Pages (if applicable)
For each area page:
- [ ] Meta description (160 chars, city-specific)
- [ ] Area description (500+ words, city-specific content)
- [ ] Geo coordinates for schema markup (latitude/longitude)

### 2.3 Schema Markup
- [ ] LocalBusiness JSON-LD with NAP, geo, hours
- [ ] Service JSON-LD for each service
- [ ] BreadcrumbList JSON-LD
- [ ] FAQPage JSON-LD (if FAQ content exists)

---

## Phase 3: Google Ads Account Setup

### 3.1 Create Account
- [ ] Account created under W&G MCC (`432-245-4246`)
- [ ] Client Ads account ID: `{{ADS_ACCOUNT_ID}}`
- [ ] Client invited as Admin user: `{{CLIENT_EMAIL}}`
- [ ] No campaigns created during setup (skip campaign wizard)
- [ ] **Status: DRAFT — awaiting client billing info**

### 3.2 Activate Account
- [ ] Client provides credit card on kickoff call
- [ ] Billing setup completed in Google Ads UI
- [ ] Account transitions DRAFT → ENABLED
- [ ] Verify via MCP: `list_accessible_customers` returns client account
- [ ] Verify time zone is correct (Admin → Account settings — cannot be changed after creation)
- [ ] Payments profile set to client's organization (not personal)

### 3.3 Link GA4 to Google Ads
- [ ] GA4 Admin → Google Ads Links → Link to `{{ADS_ACCOUNT_ID}}`
- [ ] Confirm audiences and conversions are sharing

---

## Phase 4: Conversion Tracking

### 4.1 Import Conversions from GA4
- [ ] Google Ads → Tools → Conversions → Import → Google Analytics (GA4)
- [ ] `form_submission` imported as **primary** conversion (optimize bidding)
- [ ] `phone_click` imported as **secondary** conversion (track, don't optimize)
- [ ] Set conversion values if applicable

### 4.2 Google Ads Tags in GTM
- [ ] **Remarketing tag** — fires on All Pages trigger
  - Conversion ID: {{ADS_CONVERSION_ID}}
- [ ] **Conversion Tracking tag** (if not using GA4 import)
  - Fires on form_submission and phone_click triggers
  - Conversion ID: {{ADS_CONVERSION_ID}}
  - Conversion Label: {{ADS_CONVERSION_LABEL}}
- [ ] Publish new GTM workspace version after adding tags

---

## Phase 5: Campaign Build

### 5.1 Search Campaigns
- [ ] Campaign structure planned (services × areas or consolidated)
- [ ] Ad groups mapped to landing pages
- [ ] Keywords researched and organized:
  - High-intent service keywords ("{{INDUSTRY}} {{PRIMARY_CITY}}")
  - Service-specific keywords per ad group
  - Negative keyword list (DIY, jobs, salary, free, etc.)
- [ ] Landing page URLs: `/services/{{service-slug}}` or `/areas/{{area-slug}}`

### 5.2 Ad Copy
- [ ] Responsive search ads (minimum 2 per ad group)
  - 15 headlines (include keywords, location, CTAs, differentiators)
  - 4 descriptions (value props, trust signals, CTAs)
- [ ] Pin critical headlines to positions 1-2 if needed

### 5.3 Call-Only Ads (if applicable)
- [ ] Mobile-only call ads for high-urgency services (e.g., emergency)
- [ ] Phone number verified in Google Ads
- [ ] `phone_click` conversion tracking confirmed

### 5.4 Ad Extensions
- [ ] **Call extension**: business phone number
- [ ] **Sitelink extensions**: 4+ (Services, About, Areas, Contact)
- [ ] **Callout extensions**: 4+ (Licensed & Insured, Free Estimates, etc.)
- [ ] **Location extension**: linked to GBP
- [ ] **Structured snippets**: service types

### 5.5 Targeting
- [ ] Geographic targeting: {{PRIMARY_CITY}} + {{RADIUS}} mile radius, or specific service area cities
- [ ] Location options: "Presence" only (not "Presence or interest")
- [ ] Ad schedule: aligned with business hours (or 24/7 if applicable)
- [ ] Device bid adjustments: consider mobile boost for call-heavy verticals

### 5.6 Bidding & Budget
- [ ] Bidding strategy: Maximize Conversions (or Target CPA after 30+ conversions)
- [ ] Daily budget set: ${{DAILY_BUDGET}} (monthly ÷ 30.4)
- [ ] Budget alerts configured

---

## Phase 6: Launch & Monitor

### 6.1 Pre-Launch Checks
- [ ] All conversion actions verified firing in Google Ads (test form submit + phone click)
- [ ] Landing pages load fast (<3s) on mobile
- [ ] Tracking confirmed in GA4 Realtime during test
- [ ] Lead notification email received with correct UTM/gclid attribution
- [ ] Ad preview reviewed for each ad group (no truncation, correct landing page)

### 6.2 Launch
- [ ] Campaigns set to ENABLED
- [ ] Notify client that ads are live
- [ ] Monitor Search Terms report daily for first 3 days — add negatives aggressively

### 6.3 Ongoing Optimization Cadence
- [ ] **Daily (first week)**: Search terms, spend pacing, conversion verification
- [ ] **Weekly**: Bid adjustments, negative keywords, ad performance review
- [ ] **Bi-weekly**: Landing page performance, Quality Score review
- [ ] **Monthly**: Performance report to client, budget review, strategy adjustments
- [ ] **Quarterly**: Full strategy review, tier reassessment, new campaign opportunities

---

## Phase 7: Proposal & Agreement

### 7.1 Proposal
- [ ] Proposal generated from template (HTML → PDF via WeasyPrint)
- [ ] Tier selection field included (Entry / Growth / Premium)
- [ ] Signature blocks for client and agency
- [ ] Sent to client for review

### 7.2 Signed Agreement
- [ ] Client selects tier: {{TIER}}
- [ ] Monthly ad spend confirmed: ${{AD_SPEND}}
- [ ] Setup fee: ${{SETUP_FEE}} (or waived with 90-day commitment)
- [ ] Proposal signed and dated by both parties

---

## Optional

### Social Media
- [ ] Client Facebook/Instagram business pages linked
- [ ] Social links added to website footer
- [ ] `sameAs` URLs added to LocalBusiness schema

### Meta Pixel (Facebook)
- [ ] Meta Pixel installed via GTM
- [ ] Lead event firing on form submission

---

## Notes

{{NOTES}}
