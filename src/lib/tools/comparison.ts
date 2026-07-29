/**
 * Ten-year cost-of-ownership comparison.
 *
 * ── THE RULE THAT SHAPES THIS ENTIRE FILE ─────────────────────────────────
 * Ink Blend publishes no pricing, so this module contains NO price data of any
 * kind — not ours, not market ranges, not "typical" figures, not defaults.
 * Every number comes from the visitor: the quotes they have been given and the
 * intervals they expect. We supply only the arithmetic.
 *
 * That constraint is also why the tool works. A visitor comparing a printed
 * wall against a vinyl quote is doing the exact comparison that decides the
 * sale, and doing it with their real numbers is far more persuasive than any
 * range we could publish.
 *
 * There is a build-time assertion in the verification sweep that greps the
 * built HTML for currency figures under /tools. If anyone later seeds a
 * default price here, that check fails.
 *
 * Costs are unitless — whatever currency the visitor typed. We never label a
 * currency, because we never supply a figure.
 */

export interface OptionInput {
  readonly key: string;
  readonly label: string;
  /** The visitor's own quoted figure. */
  readonly cost: number;
  /** How many years they expect before it needs doing again. */
  readonly lifespanYears: number;
}

export interface OptionResult extends OptionInput {
  /** Times the work is paid for across the horizon. */
  readonly applications: number;
  readonly total: number;
  /** Cumulative spend at the end of each year, index 0 = year 1. */
  readonly cumulative: readonly number[];
}

export interface ComparisonResult {
  readonly horizonYears: number;
  readonly options: readonly OptionResult[];
  /** Cheapest option over the full horizon, or null if inputs tie or are empty. */
  readonly cheapestKey: string | null;
  /**
   * First year the reference option's cumulative spend stops being the higher
   * of the pair, or null if it never does inside the horizon.
   */
  readonly breakEvenYear: number | null;
}

export const DEFAULT_HORIZON_YEARS = 10;

/**
 * Cumulative spend at the end of `year`, assuming the work is paid for up
 * front and repeated every `lifespanYears`.
 */
export function cumulativeAt(cost: number, lifespanYears: number, year: number): number {
  if (lifespanYears <= 0) throw new Error("lifespanYears must be greater than zero");
  if (year <= 0) return 0;
  return cost * Math.ceil(year / lifespanYears);
}

export function compareOptions(
  inputs: readonly OptionInput[],
  horizonYears: number = DEFAULT_HORIZON_YEARS,
  referenceKey?: string,
): ComparisonResult {
  if (horizonYears <= 0) throw new Error("horizonYears must be greater than zero");

  const options: OptionResult[] = inputs.map((input) => {
    if (input.cost < 0) throw new Error(`Cost for "${input.key}" cannot be negative`);
    if (input.lifespanYears <= 0) throw new Error(`Lifespan for "${input.key}" must be greater than zero`);

    const cumulative: number[] = [];
    for (let year = 1; year <= horizonYears; year++) {
      cumulative.push(cumulativeAt(input.cost, input.lifespanYears, year));
    }
    return {
      ...input,
      applications: Math.ceil(horizonYears / input.lifespanYears),
      total: cumulative[cumulative.length - 1],
      cumulative,
    };
  });

  let cheapestKey: string | null = null;
  if (options.length > 0) {
    const min = Math.min(...options.map((o) => o.total));
    const winners = options.filter((o) => o.total === min);
    // A tie is not a winner — saying so is more honest than picking one.
    cheapestKey = winners.length === 1 ? winners[0].key : null;
  }

  let breakEvenYear: number | null = null;
  const reference = referenceKey ? options.find((o) => o.key === referenceKey) : options[0];
  const others = options.filter((o) => o !== reference);

  if (reference && others.length > 0) {
    for (let index = 0; index < horizonYears; index++) {
      const refSpend = reference.cumulative[index];
      const cheapestOther = Math.min(...others.map((o) => o.cumulative[index]));
      if (refSpend <= cheapestOther) {
        breakEvenYear = index + 1;
        break;
      }
    }
  }

  return { horizonYears, options, cheapestKey, breakEvenYear };
}

/* ────────────────────────────────────────────────────────────────────────────
   Quote factor profiling — the "what moves your number" half of the tool.
   Returns a complexity profile and an ordered list of drivers. No figures.
   ──────────────────────────────────────────────────────────────────────────── */

export type SizeBand = "under-50" | "50-150" | "150-400" | "over-400";
export type AccessDifficulty = "easy" | "restricted" | "difficult";
export type ArtworkReadiness = "print-ready" | "needs-work" | "from-scratch";
export type ApprovalPath = "none" | "landlord" | "committee";

export interface QuoteFactorAnswers {
  readonly sizeBand: SizeBand;
  readonly surfacePrep: "minimal" | "some" | "significant";
  readonly access: AccessDifficulty;
  readonly artwork: ArtworkReadiness;
  readonly approvals: ApprovalPath;
}

export type ComplexityProfile = "straightforward" | "some-prep" | "complex";

export interface QuoteFactorResult {
  readonly profile: ComplexityProfile;
  readonly headline: string;
  /** Ordered most-significant first. */
  readonly drivers: readonly string[];
  readonly summary: string;
}

const PROFILE_HEADLINES: Record<ComplexityProfile, string> = {
  straightforward: "This looks like a straightforward job to quote",
  "some-prep": "Quotable, with preparation and coordination in the number",
  complex: "Several things here will move the number — worth a conversation",
};

export function profileQuoteFactors(answers: QuoteFactorAnswers): QuoteFactorResult {
  const drivers: { weight: number; text: string }[] = [];

  const sizeWeight = { "under-50": 0, "50-150": 1, "150-400": 2, "over-400": 3 }[answers.sizeBand];
  if (sizeWeight >= 2) {
    drivers.push({
      weight: sizeWeight,
      text: "Wall area. Beyond a certain width the job stops being a single session, and access equipment and working time both scale with it. Measure rather than estimate — walls are routinely larger than described.",
    });
  }

  const prepWeight = { minimal: 0, some: 2, significant: 3 }[answers.surfacePrep];
  if (prepWeight > 0) {
    drivers.push({
      weight: prepWeight + 1,
      text: "Surface preparation. This is the single most common reason two quotes for the same wall differ. Filling, sealing, flattening a texture or making good a hollow section is real work that has to happen before any printing.",
    });
  }

  const accessWeight = { easy: 0, restricted: 2, difficult: 3 }[answers.access];
  if (accessWeight > 0) {
    drivers.push({
      weight: accessWeight,
      text: "Access. No loading bay, a shared lift, stairs, restricted hours or an overnight-only window all change how the work has to be organised — and downtown that shapes a schedule more than the wall does.",
    });
  }

  const artworkWeight = { "print-ready": 0, "needs-work": 2, "from-scratch": 3 }[answers.artwork];
  if (artworkWeight > 0) {
    drivers.push({
      weight: artworkWeight,
      text:
        answers.artwork === "from-scratch"
          ? "Artwork origination. Concept, design and production files are a distinct piece of work from printing, and it is usually the part people forget to budget for."
          : "Artwork preparation. Supplied files often need rebuilding for scale — resolution, colour, vector outlines and bleed. Run the Artwork Resolution Checker before you send anything.",
    });
  }

  const approvalWeight = { none: 0, landlord: 1, committee: 2 }[answers.approvals];
  if (approvalWeight > 0) {
    drivers.push({
      weight: approvalWeight,
      text:
        answers.approvals === "committee"
          ? "Approval route. A board or committee meets on its own schedule, and that schedule is the real timeline. No supplier can compress it, so start it early."
          : "Landlord consent. Alterations to base-building finishes normally need written approval, and it has its own timetable. Worth starting before design work.",
    });
  }

  const score = sizeWeight + prepWeight + accessWeight + artworkWeight + approvalWeight;
  const profile: ComplexityProfile = score <= 2 ? "straightforward" : score <= 7 ? "some-prep" : "complex";

  if (drivers.length === 0) {
    drivers.push({
      weight: 0,
      text: "Nothing you have described stands out as a complication. The number will come down mostly to wall area and the artwork itself.",
    });
  }

  const ordered = drivers.sort((a, b) => b.weight - a.weight).map((d) => d.text);

  return {
    profile,
    headline: PROFILE_HEADLINES[profile],
    drivers: ordered,
    summary: [
      "— Sent from the Quote Planner —",
      `Wall area band: ${answers.sizeBand}`,
      `Surface preparation expected: ${answers.surfacePrep}`,
      `Access: ${answers.access}`,
      `Artwork: ${answers.artwork}`,
      `Approvals: ${answers.approvals}`,
      `Profile: ${PROFILE_HEADLINES[profile]}`,
    ].join("\n"),
  };
}
