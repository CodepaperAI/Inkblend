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

1. **Placeholder contact details (high):** phone is `+1 (647) 555-0148` (a reserved 555 number), the address is generic, the map link is `maps.google.com/?q=Canada`, and Instagram/TikTok link to the platforms' home pages. Replace with real values in `src/lib/site.ts`, then add `telephone`/`sameAs` to the Organization schema. Needs the client.
2. **Blog pages not verifiable locally:** blog content comes from the Uplift API and needs `UPLIFT_API_TOKEN` (set in Vercel only). Blog title/description clamps are unit-checked but should be spot-checked on the deployed site.
3. **Form delivery not tested end to end:** submitting would send a real email via Resend. Test once on the deployed site with a real inbox.
4. **Analytics / conversion tracking:** only Vercel Analytics and Speed Insights are installed; there is no GA4/GTM, and no conversion events on the quote form or WhatsApp/call CTAs. Needs the client's GA4 or GTM ID.
5. **Portfolio content is placeholder:** project images are stock "placeholders" with generic captions. Replace with real work.
6. **Residual Lighthouse notes:** ~50 KiB unused JS and ~14 KiB legacy JS from framework/framer-motion; low impact.
7. **Mobile LCP** is the hero image (about 3 s in simulated throttling). Serving a smaller, purpose-cropped mobile hero would reduce it further.
