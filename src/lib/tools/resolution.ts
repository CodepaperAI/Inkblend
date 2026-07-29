/**
 * Artwork resolution maths for wall-scale printing.
 *
 * Pure functions, no React, no I/O — these produce numbers a visitor will act
 * on, so they are unit-tested in src/lib/tools/tools.test.ts.
 *
 * The target PPI figures below come from published large-format guidance, not
 * from us: roughly 300 PPI for handheld viewing, 200–240 for wall art seen at
 * 2–3 ft, and 100–150 for large pieces seen from 4–6 ft. Viewing distance is
 * the variable that actually matters at wall scale — a 24×36 poster viewed
 * from 6 ft cannot be told apart at 150 vs 300 PPI. Anyone quoting a single
 * universal DPI number for murals is over-simplifying.
 */

export type ViewingDistance = "arms-length" | "close" | "room" | "far";

export interface DistanceTarget {
  readonly key: ViewingDistance;
  readonly label: string;
  readonly detail: string;
  /** Target pixels-per-inch at final printed size. */
  readonly targetPpi: number;
}

export const distanceTargets: readonly DistanceTarget[] = [
  {
    key: "arms-length",
    label: "Arm's length",
    detail: "Reception desk edge, a wall beside a seat, anything read close up",
    targetPpi: 300,
  },
  {
    key: "close",
    label: "Two to three feet",
    detail: "A corridor wall, a booth or banquette back, a small room",
    targetPpi: 220,
  },
  {
    key: "room",
    label: "Four to six feet",
    detail: "A feature wall in a dining room, office or living space",
    targetPpi: 150,
  },
  {
    key: "far",
    label: "Across the room",
    detail: "A hall wall, a lobby, a large venue seen from a distance",
    targetPpi: 100,
  },
];

export type ResolutionVerdict = "comfortable" | "marginal" | "below";

export interface ResolutionInput {
  /** Finished wall size in inches. */
  readonly wallWidthIn: number;
  readonly wallHeightIn: number;
  /** Source image pixel dimensions. */
  readonly imageWidthPx: number;
  readonly imageHeightPx: number;
  readonly distance: ViewingDistance;
}

export interface ResolutionResult {
  readonly verdict: ResolutionVerdict;
  /** Effective PPI once the image is scaled to cover the wall. */
  readonly effectivePpi: number;
  readonly targetPpi: number;
  /** Pixel dimensions needed to hit the target at this wall size. */
  readonly requiredWidthPx: number;
  readonly requiredHeightPx: number;
  /** Fraction of the image lost to crop, 0–1, on the overflowing axis. */
  readonly cropFraction: number;
  readonly cropAxis: "width" | "height" | "none";
  /** How much bigger the file needs to be, e.g. 1.8 means 1.8× the pixels. */
  readonly shortfallFactor: number;
}

/** Below this fraction of target we call it marginal rather than a pass. */
const MARGINAL_RATIO = 0.7;

export function feetInchesToInches(feet: number, inches = 0): number {
  return feet * 12 + inches;
}

export function metresToInches(metres: number): number {
  return metres * 39.3700787;
}

export function targetFor(distance: ViewingDistance): DistanceTarget {
  const found = distanceTargets.find((entry) => entry.key === distance);
  if (!found) throw new Error(`Unknown viewing distance: ${distance}`);
  return found;
}

export function calculateResolution(input: ResolutionInput): ResolutionResult {
  const { wallWidthIn, wallHeightIn, imageWidthPx, imageHeightPx, distance } = input;

  if (wallWidthIn <= 0 || wallHeightIn <= 0 || imageWidthPx <= 0 || imageHeightPx <= 0) {
    throw new Error("Wall dimensions and image dimensions must all be greater than zero");
  }

  const { targetPpi } = targetFor(distance);

  // Scaling the image to COVER the wall (preserving aspect ratio) means the
  // limiting axis is whichever gives the smaller pixels-per-inch. The other
  // axis overflows and gets cropped.
  const ppiIfWidthLimited = imageWidthPx / wallWidthIn;
  const ppiIfHeightLimited = imageHeightPx / wallHeightIn;
  const effectivePpi = Math.min(ppiIfWidthLimited, ppiIfHeightLimited);

  const printedWidthIn = imageWidthPx / effectivePpi;
  const printedHeightIn = imageHeightPx / effectivePpi;

  const overflowX = printedWidthIn - wallWidthIn;
  const overflowY = printedHeightIn - wallHeightIn;

  let cropAxis: ResolutionResult["cropAxis"] = "none";
  let cropFraction = 0;
  // Sub-pixel overflow is rounding noise, not a real crop.
  if (overflowX > 0.01 && overflowX >= overflowY) {
    cropAxis = "width";
    cropFraction = overflowX / printedWidthIn;
  } else if (overflowY > 0.01) {
    cropAxis = "height";
    cropFraction = overflowY / printedHeightIn;
  }

  const ratio = effectivePpi / targetPpi;
  const verdict: ResolutionVerdict =
    ratio >= 1 ? "comfortable" : ratio >= MARGINAL_RATIO ? "marginal" : "below";

  return {
    verdict,
    effectivePpi,
    targetPpi,
    requiredWidthPx: Math.ceil(wallWidthIn * targetPpi),
    requiredHeightPx: Math.ceil(wallHeightIn * targetPpi),
    cropFraction,
    cropAxis,
    shortfallFactor: ratio >= 1 ? 1 : 1 / ratio,
  };
}
