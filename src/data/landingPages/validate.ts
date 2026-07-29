import { cityNav, industryNav, toolNav } from "./nav";
import type { ImageRef, LandingPage, PageFamily } from "./types";

/**
 * Per-family image minimum.
 *
 * Tool pages carry 3 rather than 6. Six gallery images on a calculator page is
 * padding, and padding is the thing this gate exists to prevent — the point is
 * data density, not filler. Every other threshold (words, FAQs, similarity,
 * inbound links) is identical across families and is NOT relaxed here.
 *
 * This is a calibration per page type, not a weakening to get a page to pass.
 * If a tool page cannot reach 900 words of genuinely useful supporting content,
 * it should not ship — a thin page wrapped around a widget is exactly what
 * Google devalues.
 */
const FAMILY_MIN_IMAGES: Record<PageFamily, number> = {
  city: 6,
  industry: 6,
  tool: 3,
};

/**
 * THE QUALITY GATE.
 *
 * This runs from next.config.ts and THROWS, failing the build. That is the
 * point: a lint warning or a checklist gets ignored, a red build does not.
 *
 * It is the entire defence against these pages being treated as a doorway
 * cluster under Google's scaled-content policy. Page count is not the lever —
 * data density per page is, and this is what enforces it.
 *
 * DO NOT weaken a threshold to get a page to pass. If a page trips the gate,
 * rewrite the page.
 *
 * Reference point: the 7 existing /services/* pages measured 39.1% max pairwise
 * similarity against the 0.30 ceiling below — every pair over the line. A
 * genuinely differentiated set measures ~1–3%.
 */
export const THRESHOLDS = {
  minWords: 900,
  minFaqs: 5,
  /**
   * Unique *within* a page. Reuse across pages is fine.
   * Per-family override below — see FAMILY_MIN_IMAGES.
   */
  minImages: 6,
  /** 8-word shingle Jaccard, every pair. */
  maxSimilarity: 0.3,
  /** Inbound links from other records' `related` lists. Prevents orphans. */
  minInboundLinks: 3,
  /** Contextual in-copy links. Over-linking is textbook over-optimisation. */
  maxInCopyLinks: 10,
  shingleSize: 8,
} as const;

export interface Issue {
  readonly slug: string;
  readonly rule: string;
  readonly detail: string;
}

const TODO_PATTERN = /\b(TODO|FIXME|TBD|XXX|LOREM IPSUM|PLACEHOLDER TEXT)\b/i;

/**
 * Assemble the prose a visitor actually reads, in render order.
 *
 * Word count and similarity must measure the same text the page displays —
 * not the record's JSON. Nav, footer and other boilerplate are excluded because
 * they are identical on every page and would mask real duplication.
 */
export function buildBodyText(page: LandingPage): string {
  const parts: string[] = [page.h1, page.intro];

  for (const benefit of page.benefits) {
    parts.push(benefit.title, benefit.description);
  }

  parts.push(page.factTableHeading);
  for (const row of page.factRows) {
    parts.push(row.label, row.value);
  }

  for (const section of page.sections) {
    parts.push(section.heading, ...section.body);
  }

  for (const faq of page.faqs) {
    parts.push(faq.question, faq.answer);
  }

  if (page.family === "tool") {
    parts.push(page.toolHeading, ...page.useWhen);
  } else if (page.toolPrompt) {
    parts.push(page.toolPrompt);
  }

  parts.push(page.ctaHeading, page.ctaBody);

  return parts.join(" ");
}

export function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function shingles(text: string, size = THRESHOLDS.shingleSize): Set<string> {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  const out = new Set<string>();
  for (let i = 0; i + size <= words.length; i++) {
    out.add(words.slice(i, i + size).join(" "));
  }
  return out;
}

function similarity(a: Set<string>, b: Set<string>): number {
  if (!a.size || !b.size) return 0;
  let shared = 0;
  for (const s of a) if (b.has(s)) shared++;
  return shared / (a.size + b.size - shared);
}

function collectImages(page: LandingPage): ImageRef[] {
  return [page.hero, ...page.gallery];
}

function pushDuplicates(
  issues: Issue[],
  pages: readonly LandingPage[],
  rule: string,
  pick: (page: LandingPage) => string,
): void {
  const seen = new Map<string, string[]>();
  for (const page of pages) {
    const key = pick(page).trim().toLowerCase();
    const bucket = seen.get(key);
    if (bucket) bucket.push(page.slug);
    else seen.set(key, [page.slug]);
  }
  for (const [value, slugs] of seen) {
    if (slugs.length > 1) {
      issues.push({
        slug: slugs.join(", "),
        rule,
        detail: `shared value: "${value.slice(0, 80)}"`,
      });
    }
  }
}

export function validateLandingPages(pages: readonly LandingPage[]): Issue[] {
  const issues: Issue[] = [];
  const pathnames = new Set(pages.map((page) => page.pathname));

  // Inbound link counts, derived from every record's `related` list.
  const inbound = new Map<string, number>();
  for (const page of pages) inbound.set(page.pathname, 0);
  for (const page of pages) {
    for (const target of page.related) {
      if (target === page.pathname) {
        issues.push({ slug: page.slug, rule: "self-link", detail: `related includes its own pathname ${target}` });
        continue;
      }
      if (!pathnames.has(target)) {
        issues.push({ slug: page.slug, rule: "broken-related-link", detail: `no page with pathname ${target}` });
        continue;
      }
      inbound.set(target, (inbound.get(target) ?? 0) + 1);
    }
  }

  for (const page of pages) {
    const body = buildBodyText(page);
    const words = countWords(body);

    if (words < THRESHOLDS.minWords) {
      issues.push({
        slug: page.slug,
        rule: "minWords",
        detail: `${words} words, need ${THRESHOLDS.minWords} (short by ${THRESHOLDS.minWords - words})`,
      });
    }

    if (page.faqs.length < THRESHOLDS.minFaqs) {
      issues.push({
        slug: page.slug,
        rule: "minFaqs",
        detail: `${page.faqs.length} FAQs, need ${THRESHOLDS.minFaqs}`,
      });
    }

    const images = collectImages(page);
    const uniqueSrcs = new Set(images.map((img) => img.src));
    const minImages = FAMILY_MIN_IMAGES[page.family];
    if (uniqueSrcs.size < minImages) {
      issues.push({
        slug: page.slug,
        rule: "minImages",
        detail: `${uniqueSrcs.size} unique images, need ${minImages} for a ${page.family} page`,
      });
    }

    // Embedded tools add identical markup across a family. A unique per-page
    // line keeps the rendered pages apart; the bodyText-level similarity check
    // cannot see this on its own.
    if (page.family !== "tool" && !page.toolPrompt?.trim()) {
      issues.push({
        slug: page.slug,
        rule: "missingToolPrompt",
        detail: "embeds a tool but has no toolPrompt, so its rendered markup duplicates its siblings",
      });
    }

    for (const img of images) {
      if (!img.alt || img.alt.trim().length < 15) {
        issues.push({
          slug: page.slug,
          rule: "altText",
          detail: `missing or too-short alt for ${img.src}`,
        });
      }
    }

    if (page.factRows.length < 4) {
      issues.push({
        slug: page.slug,
        rule: "minFactRows",
        detail: `${page.factRows.length} fact rows, need 4`,
      });
    }

    const inboundCount = inbound.get(page.pathname) ?? 0;
    if (inboundCount < THRESHOLDS.minInboundLinks) {
      issues.push({
        slug: page.slug,
        rule: "minInboundLinks",
        detail: `${inboundCount} inbound, need ${THRESHOLDS.minInboundLinks} — page would ship orphaned`,
      });
    }

    if (TODO_PATTERN.test(body) || TODO_PATTERN.test(page.metaDescription) || TODO_PATTERN.test(page.title)) {
      issues.push({ slug: page.slug, rule: "unresolvedMarker", detail: "TODO/FIXME/TBD found in copy" });
    }

    if (page.metaDescription.length > 165) {
      issues.push({
        slug: page.slug,
        rule: "metaDescriptionLength",
        detail: `${page.metaDescription.length} chars, keep under 165`,
      });
    }

    if (!page.pathname.startsWith("/")) {
      issues.push({ slug: page.slug, rule: "pathname", detail: `must start with "/", got ${page.pathname}` });
    }
  }

  // nav.ts is maintained by hand so it can stay out of client bundles. Catch drift.
  const allNav = [...cityNav, ...industryNav, ...toolNav];
  for (const entry of allNav) {
    if (!pathnames.has(entry.href)) {
      issues.push({
        slug: entry.label,
        rule: "navDrift",
        detail: `nav.ts points at ${entry.href}, which matches no record`,
      });
    }
  }
  for (const page of pages) {
    const inNav = allNav.some((entry) => entry.href === page.pathname);
    if (!inNav) {
      issues.push({
        slug: page.slug,
        rule: "navDrift",
        detail: `${page.pathname} exists but is missing from nav.ts, so nothing links to it sitewide`,
      });
    }
  }

  pushDuplicates(issues, pages, "duplicateSlug", (p) => p.slug);
  pushDuplicates(issues, pages, "duplicatePathname", (p) => p.pathname);
  pushDuplicates(issues, pages, "duplicateTitle", (p) => p.title);
  pushDuplicates(issues, pages, "duplicateH1", (p) => p.h1);
  pushDuplicates(issues, pages, "duplicateMetaDescription", (p) => p.metaDescription);
  pushDuplicates(issues, pages, "duplicateFormSourceId", (p) => p.formSourceId);

  // The anti-doorway check. This is the one that matters.
  const fingerprints = pages.map((page) => ({ page, set: shingles(buildBodyText(page)) }));
  for (let i = 0; i < fingerprints.length; i++) {
    for (let j = i + 1; j < fingerprints.length; j++) {
      const score = similarity(fingerprints[i].set, fingerprints[j].set);
      if (score > THRESHOLDS.maxSimilarity) {
        issues.push({
          slug: `${fingerprints[i].page.slug} ↔ ${fingerprints[j].page.slug}`,
          rule: "maxSimilarity",
          detail: `${(score * 100).toFixed(1)}% shared 8-word shingles, ceiling ${(THRESHOLDS.maxSimilarity * 100).toFixed(0)}% — rewrite, do not raise the limit`,
        });
      }
    }
  }

  return issues;
}

export function formatIssues(issues: readonly Issue[]): string {
  return issues.map((issue) => `  [${issue.rule}] ${issue.slug}: ${issue.detail}`).join("\n");
}

/** Max pairwise similarity across the set — reported on a successful build. */
export function maxPairwiseSimilarity(pages: readonly LandingPage[]): number {
  const fingerprints = pages.map((page) => shingles(buildBodyText(page)));
  let max = 0;
  for (let i = 0; i < fingerprints.length; i++) {
    for (let j = i + 1; j < fingerprints.length; j++) {
      max = Math.max(max, similarity(fingerprints[i], fingerprints[j]));
    }
  }
  return max;
}
