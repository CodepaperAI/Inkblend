import { cities } from "./cities";
import { industries } from "./industries";
import { tools } from "./tools";
import type {
  CityRecord,
  IndustryRecord,
  LandingPage,
  LandingPageSummary,
  ToolRecord,
} from "./types";

export type { CityRecord, IndustryRecord, LandingPage, LandingPageSummary, ToolRecord };
export { cities, industries, tools };

/**
 * The registry.
 *
 * ⚠️ Client components must NOT import this module. Pulling it in ships every
 * record — long-form sections, FAQs, galleries — into that component's bundle,
 * and therefore into every page that renders it. The nav and footer are the
 * usual offenders.
 *
 * Routes resolve a single record server-side and pass it to the template as a
 * prop. `src/data/landingPages/nav.ts` holds a label/href-only list for
 * navigation, which is safe to import anywhere.
 */
export const landingPages: readonly LandingPage[] = [...cities, ...industries, ...tools];

export function getCity(slug: string): CityRecord | undefined {
  return cities.find((record) => record.slug === slug);
}

export function getIndustry(slug: string): IndustryRecord | undefined {
  return industries.find((record) => record.slug === slug);
}

export function getTool(slug: string): ToolRecord | undefined {
  return tools.find((record) => record.slug === slug);
}

export function getByPathname(pathname: string): LandingPage | undefined {
  return landingPages.find((record) => record.pathname === pathname);
}

function toSummary(record: LandingPage): LandingPageSummary {
  return {
    pathname: record.pathname,
    family: record.family,
    label:
      record.family === "city"
        ? `${record.city}, ${record.province}`
        : record.family === "industry"
          ? record.industry
          : record.title,
    blurb: record.metaDescription,
  };
}

/** Resolve a record's `related` pathnames into summaries, server-side. */
export function relatedSummaries(record: LandingPage): LandingPageSummary[] {
  return record.related
    .map((pathname) => landingPages.find((candidate) => candidate.pathname === pathname))
    .filter((candidate): candidate is LandingPage => Boolean(candidate))
    .map(toSummary);
}

/** Every landing-page route, for sitemap.ts. */
export function landingPagePathnames(): string[] {
  return landingPages.map((record) => record.pathname);
}
