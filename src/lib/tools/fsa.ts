/**
 * Canadian Forward Sortation Area (FSA) → mapped service city.
 *
 * ── SOURCING ──────────────────────────────────────────────────────────────
 * Every code below was verified against published sources during authoring,
 * NOT written from memory. Estimating a postal boundary is exactly the class
 * of mistake the project rules forbid — it is the one fact a visitor checks
 * against their own address immediately.
 *
 *   • Canada Post's published FSA listing (Brampton LCD assignments)
 *   • Wikipedia "List of postal codes of Canada: L", which enumerates each L
 *     FSA against its municipality
 *   • Toronto is the only city in Canada with an exclusive first letter: all
 *     M FSAs are Toronto, except M0R and M7R.
 *
 * ── DELIBERATE OMISSIONS ──────────────────────────────────────────────────
 * This map is intentionally incomplete rather than padded with guesses.
 *   • L3T (Thornhill) is split between Vaughan and Markham. Markham was a
 *     deliberate coverage cut, so routing an L3T visitor to the Vaughan page
 *     would be wrong for half of them. Left unmapped.
 *   • L5S and L5T are believed to be Mississauga but were not confirmed in a
 *     source during authoring, so they are omitted.
 *
 * Unmapped codes degrade safely: an Ontario code we do not recognise returns
 * "likely" and invites contact. It never returns "not covered", because we
 * cannot prove a negative from an incomplete map.
 */

export type CitySlug =
  | "brampton"
  | "mississauga"
  | "toronto"
  | "vaughan"
  | "oakville"
  | "hamilton";

export const fsaToCity: Readonly<Record<string, CitySlug>> = {
  // Brampton
  L6P: "brampton", L6R: "brampton", L6S: "brampton", L6T: "brampton",
  L6V: "brampton", L6W: "brampton", L6X: "brampton", L6Y: "brampton",
  L6Z: "brampton", L7A: "brampton",

  // Mississauga
  L4T: "mississauga", L4V: "mississauga", L4W: "mississauga", L4X: "mississauga",
  L4Y: "mississauga", L4Z: "mississauga", L5A: "mississauga", L5B: "mississauga",
  L5C: "mississauga", L5E: "mississauga", L5G: "mississauga", L5H: "mississauga",
  L5J: "mississauga", L5K: "mississauga", L5L: "mississauga", L5M: "mississauga",
  L5N: "mississauga", L5P: "mississauga", L5R: "mississauga", L5V: "mississauga",
  L5W: "mississauga",

  // Vaughan — Woodbridge, Maple, Concord
  L3L: "vaughan", L4H: "vaughan", L4J: "vaughan", L4K: "vaughan",
  L4L: "vaughan", L6A: "vaughan",

  // Oakville
  L6H: "oakville", L6J: "oakville", L6K: "oakville", L6L: "oakville",
  L6M: "oakville",

  // Hamilton — incl. Stoney Creek, Dundas, Ancaster
  L8A: "hamilton", L8B: "hamilton", L8E: "hamilton", L8G: "hamilton",
  L8H: "hamilton", L8J: "hamilton", L8K: "hamilton", L8L: "hamilton",
  L8M: "hamilton", L8N: "hamilton", L8P: "hamilton", L8R: "hamilton",
  L8S: "hamilton", L8T: "hamilton", L8V: "hamilton", L8W: "hamilton",
  L9A: "hamilton", L9B: "hamilton", L9C: "hamilton", L9G: "hamilton",
  L9H: "hamilton", L9K: "hamilton",
};

/** M is Toronto's exclusive prefix, with two documented exceptions. */
const TORONTO_EXCEPTIONS = new Set(["M0R", "M7R"]);

export type CoverageStatus = "mapped" | "likely" | "outside" | "invalid";

export interface CoverageResult {
  readonly status: CoverageStatus;
  readonly fsa: string | null;
  /** Set only when status is "mapped". */
  readonly city: CitySlug | null;
}

const FSA_PATTERN = /^[ABCEGHJ-NPRSTVXY]\d[A-CEGHJ-NPRSTV-Z]$/i;

/** Strip spaces/punctuation and take the first three characters. */
export function normalisePostalCode(raw: string): string {
  return raw.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 3);
}

export function checkCoverage(raw: string): CoverageResult {
  const fsa = normalisePostalCode(raw);

  if (fsa.length < 3 || !FSA_PATTERN.test(fsa)) {
    return { status: "invalid", fsa: null, city: null };
  }

  const mapped = fsaToCity[fsa];
  if (mapped) return { status: "mapped", fsa, city: mapped };

  if (fsa.startsWith("M") && !TORONTO_EXCEPTIONS.has(fsa)) {
    return { status: "mapped", fsa, city: "toronto" };
  }

  // Other Ontario codes: K, L (GTA/Golden Horseshoe), M, N, P. We serve the GTA
  // broadly, so an unrecognised Ontario code is "ask us", not "no".
  //
  // M belongs here as well as above: the two M exceptions (M0R, M7R) fall
  // through to this branch, and they are still Ontario — M7R is the Canada Post
  // Gateway facility in Mississauga. Omitting M sent them to "outside", which
  // told an Ontario visitor we do not serve their province.
  if (/^[KLMNP]/.test(fsa)) {
    return { status: "likely", fsa, city: null };
  }

  return { status: "outside", fsa, city: null };
}
