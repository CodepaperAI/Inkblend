# Ink Blend site optimization report — 2026-11-04

Site: https://www.inkblend.ca (Next.js 16 on Vercel). Note: the audit workbook referenced in the brief was not attached, so this audit follows the per-site checklist directly.

## Before / after (homepage, Lighthouse 12)

| | Before (live, mobile) | After (local prod build, mobile) | Before (live, desktop) | After (local prod build, desktop) |
|---|---|---|---|---|
| Performance | 87 | 89–95 (varies run to run) | 98 | 100 |
| Accessibility | 96 | 100 | 96 | 100 |
| Best practices | 100 | 96* | 100 | 96* |
| SEO | 100 | 100 | 100 | 100 |
| LCP | 4.1 s | 2.9–3.8 s | 1.1 s | 0.6–0.7 s |
| Page weight | 2,651 KiB | 692 KiB | 3,266 KiB | 1,143 KiB |

*Best-practices dips are console 404s for the Vercel Analytics/Speed Insights scripts, which only exist on Vercel, so they appear on localhost only. Re-measure the live site after deploy. The PageSpeed Insights API quota was exhausted, so local Lighthouse was used for both runs' methodology; "before" was measured against the live site, "after" against a local production build (no CDN), so live numbers should be equal or better.

## Fixed

- **Images (biggest win):** `images.unoptimized` was on, so 1.2 MB JPEGs shipped raw. Re-enabled the Next/Vercel optimizer with AVIF/WebP and a 1-year cache TTL (~75% less page weight). Desktop hero side image no longer lazy-loads (was flagged as LCP lazy-loaded).
- **Canonical tags:** 16 pages had none (home, about, services, portfolio, before-after, process, faq, contact, get-quote, 7 service pages). All added.
- **og:url:** the root layout hard-coded the homepage as `og:url` for every page that did not override it. Removed. Added Twitter card tags.
- **Structured data:** Organization + WebSite on every page, FAQPage on /faq, Service on each service page. No phone number is published in schema (see remaining issues).
- **Sitemap:** `lastmod` was `new Date()` (changes every 5 minutes, so crawlers learn to ignore it). Now a fixed date, and blog entries use their real `updatedAt`. Removed `changefreq`/`priority`, which Google ignores. All 83 sitemap URLs verified 200; apex and http redirect with 308 to https://www; unknown paths return 404; robots.txt points to the www sitemap.
- **Titles/descriptions:** 26 blog titles exceeded ~65 chars once the " | Ink Blend" suffix was added, and a few descriptions exceeded 165. Added `fitTitle`/`fitDescription` helpers (word-boundary clamp) for blog and tool pages; shortened the /tools description.
- **Accessibility:** contrast failures (text at 38–69% opacity, red and gold accents, form labels, footer) fixed; skip-to-content link; visible focus ring; `aria-expanded` on the mobile menu; removed a non-functional Search button; heading order on /services; form error/success messages were near-white on cream (unreadable) and are now legible.

## Remaining issues / next actions

1. **Placeholder contact details (high):** phone is now the real 647-915-8722 (done 2026-11-05). Still placeholder: the address is generic, the map link is `maps.google.com/?q=Canada`, and Instagram/TikTok link to the platforms' home pages. Replace with real values in `src/lib/site.ts`, then add `telephone`/`sameAs` to the Organization schema. Needs the client.
2. **Blog pages not verifiable locally:** blog content comes from the Uplift API and needs `UPLIFT_API_TOKEN` (set in Vercel only). Blog title/description clamps are unit-checked but should be spot-checked on the deployed site.
3. **Form delivery not tested end to end:** submitting would send a real email via Resend. Test once on the deployed site with a real inbox.
4. **Analytics / conversion tracking:** only Vercel Analytics and Speed Insights are installed; there is no GA4/GTM, and no conversion events on the quote form or WhatsApp/call CTAs. Needs the client's GA4 or GTM ID.
5. **Portfolio content is placeholder:** project images are stock "placeholders" with generic captions. Replace with real work.
6. **Residual Lighthouse notes:** ~50 KiB unused JS and ~14 KiB legacy JS from framework/framer-motion; low impact.
7. **Mobile LCP** is the hero image (about 3 s in simulated throttling). Serving a smaller, purpose-cropped mobile hero would reduce it further.


## 2026-11-05 — Revamp + "Client Website Ranking Checklist" pass

Done in code:
- Phone replaced everywhere with 647-915-8722 (header, hero, footer, contact, floating button, WhatsApp link, schema, llms.txt). Click-to-call in the mobile header and in every landing-page hero.
- Design revamp: new paper/ink/vermilion palette, solid buttons, split hero with an answer-first intro, real image-first layout, mobile call button.
- Phase 2: hub pages `/wall-printing` and `/industries` (previously breadcrumb schema pointed at 404s); visible breadcrumbs + BreadcrumbList on every page.
- Phase 5/6: LocalBusiness/ProfessionalService schema sitewide with phone, hours, areaServed (no invented address); FAQPage on service pages; robots.txt explicitly allows GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended; `/llms.txt`; sitemap includes new hubs.
- Phase 8: call, WhatsApp and email clicks tracked site-wide (Vercel Analytics events); existing CTA/tool events kept.

Needs the client or a person (not fabricated):
- **Proof assets (Phase 1.1/3):** licences, insurance, certifications, years in business, named team with photos, real review counts. None exist on the site yet.
- **Real job photography:** images are still stock placeholders; checklist calls this a trust and conversion tax.
- **Pricing ranges and first-party stats (Phase 3/7):** no price guidance is published; do not invent. Add real ranges and job data for quotable blocks.
- **Google Business Profile, citations, reviews (Phase 5):** GBP, Bing/Apple/Yelp/BBB listings must use the same name and phone 647-915-8722; then add `address`, `geo`, `sameAs` and AggregateRating (only with visible reviews) to the schema.
- **GA4 + call tracking (Phase 8):** needs a GA4/GTM ID. Search Console is verified; submit the sitemap.
- **Keyword-to-URL map and competitor audit (Phase 1.2/1.3):** research deliverable, not code.
- **City pages (Phase 2.2):** six exist; each needs real local jobs/reviews before adding more.
- **GEO tracking (Phase 7):** set up UpliftAI baseline after launch.

## Image credits
- `public/media/placeholders/reception-watercolour-mural.jpg`: Pexels, "Modern Reception Area with Artistic Wall Design" (https://www.pexels.com/photo/modern-reception-area-with-artistic-wall-design-39492293/), cropped. Pexels licence, no attribution required. Replace with a real Ink Blend job photo when available.
- `public/media/video/mural-painting.mp4` + `-poster.jpg`: Pexels, "Artist Painting Colorful Mural Indoors" (https://www.pexels.com/video/artist-painting-colorful-mural-indoors-32316899/), re-encoded to 720p. Pexels licence, no attribution required. Replace with a real Ink Blend install video when available.
