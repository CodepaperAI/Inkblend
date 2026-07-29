import type { IconKey } from "./iconRegistry";
import type { ImageRef } from "./images";

export type { ImageRef };

export type PageFamily = "city" | "industry" | "tool";

/** Identifies which interactive component a tool record renders. */
export type ToolId = "wall-readiness" | "artwork-resolution" | "quote-planner" | "service-area";

export interface Faq {
  readonly question: string;
  readonly answer: string;
}

/** A row in the page's fact table — the block the peak-intent CTA sits under. */
export interface FactRow {
  readonly label: string;
  readonly value: string;
}

export interface Benefit {
  readonly icon: IconKey;
  readonly title: string;
  readonly description: string;
}

/** A prose section. `body` paragraphs are the bulk of the word count. */
export interface Section {
  readonly heading: string;
  readonly body: readonly string[];
}

export interface LandingPageBase {
  readonly family: PageFamily;
  readonly slug: string;
  /** Absolute path. Must be unique across every family. */
  readonly pathname: string;
  /** <title> without the "| Ink Blend" suffix — the layout template adds it. */
  readonly title: string;
  readonly metaDescription: string;
  readonly h1: string;
  readonly intro: string;
  /** Value written into the quote form's hidden sourcePage field. Unique. */
  readonly formSourceId: string;
  readonly hero: ImageRef;
  readonly benefits: readonly Benefit[];
  readonly factTableHeading: string;
  readonly factRows: readonly FactRow[];
  readonly sections: readonly Section[];
  readonly faqs: readonly Faq[];
  readonly gallery: readonly ImageRef[];
  readonly ctaHeading: string;
  readonly ctaBody: string;
  /** Pathnames of related pages. Drives the inbound-link floor in the gate. */
  readonly related: readonly string[];
  /**
   * One sentence, in this page's own voice, introducing the tool embedded on
   * it. Exists because embedding the same widget across six city pages adds
   * IDENTICAL rendered markup that the data-level similarity check cannot see —
   * the gate measures bodyText built from the record, not the DOM. A unique
   * line per page keeps the rendered pages apart. Required on city and
   * industry records; tool records do not embed anything.
   */
  readonly toolPrompt?: string;
}

export interface CityRecord extends LandingPageBase {
  readonly family: "city";
  readonly city: string;
  readonly province: string;
  /**
   * Named commercial districts and corridors in this city. These must be real,
   * checkable places. NOTE: population figures are deliberately absent from this
   * model — see the allowed/banned facts block in cities.ts.
   */
  readonly districts: readonly string[];
}

export interface IndustryRecord extends LandingPageBase {
  readonly family: "industry";
  readonly industry: string;
  /** Room and space types this buyer actually has. */
  readonly spaceTypes: readonly string[];
}

export interface ToolRecord extends LandingPageBase {
  readonly family: "tool";
  /** Which interactive component the route renders. */
  readonly toolId: ToolId;
  /** Heading shown directly above the widget. */
  readonly toolHeading: string;
  /** When this tool is the right one to reach for. */
  readonly useWhen: readonly string[];
}

export type LandingPage = CityRecord | IndustryRecord | ToolRecord;

/** Lightweight shape passed to templates for related-page cards. */
export interface LandingPageSummary {
  readonly pathname: string;
  readonly family: PageFamily;
  readonly label: string;
  readonly blurb: string;
}
