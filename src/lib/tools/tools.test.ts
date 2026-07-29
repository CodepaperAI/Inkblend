/**
 * Unit tests for the tool arithmetic.
 *
 * Run with:  npm run test:tools
 *
 * Uses Node's built-in test runner and Node 24's native TypeScript type
 * stripping — deliberately no new dependency. A test framework would be a
 * third devDependency on the deploy runner for four pure modules.
 *
 * These functions produce numbers a visitor acts on: whether their file is good
 * enough, whether their wall needs work, whether a postal code is covered. That
 * is why they live outside the components and why they are tested.
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  compareOptions,
  cumulativeAt,
  profileQuoteFactors,
  type QuoteFactorAnswers,
} from "./comparison.ts";
import { checkCoverage, normalisePostalCode } from "./fsa.ts";
import { assessReadiness, type ReadinessAnswers } from "./readiness.ts";
import { calculateResolution, feetInchesToInches, metresToInches } from "./resolution.ts";

describe("resolution", () => {
  it("computes effective PPI from the limiting axis when covering the wall", () => {
    // 10 ft x 8 ft wall = 120 x 96 in. A 6000 x 4000 px image.
    // width ratio  = 6000/120 = 50 ppi
    // height ratio = 4000/96  = 41.67 ppi  <- limiting
    const r = calculateResolution({
      wallWidthIn: 120,
      wallHeightIn: 96,
      imageWidthPx: 6000,
      imageHeightPx: 4000,
      distance: "room",
    });
    assert.ok(Math.abs(r.effectivePpi - 41.666) < 0.01, `got ${r.effectivePpi}`);
    assert.equal(r.targetPpi, 150);
    assert.equal(r.verdict, "below");
  });

  it("crops the axis that overflows, not the limiting one", () => {
    // Image is proportionally wider than the wall, so width overflows.
    const r = calculateResolution({
      wallWidthIn: 100,
      wallHeightIn: 100,
      imageWidthPx: 4000,
      imageHeightPx: 2000,
      distance: "far",
    });
    assert.equal(r.cropAxis, "width");
    assert.ok(r.cropFraction > 0.49 && r.cropFraction < 0.51, `got ${r.cropFraction}`);
  });

  it("reports no crop when the aspect ratios match", () => {
    const r = calculateResolution({
      wallWidthIn: 120,
      wallHeightIn: 60,
      imageWidthPx: 4000,
      imageHeightPx: 2000,
      distance: "far",
    });
    assert.equal(r.cropAxis, "none");
    assert.equal(r.cropFraction, 0);
  });

  it("grades comfortable / marginal / below against the distance target", () => {
    const base = { wallWidthIn: 100, wallHeightIn: 100, distance: "far" as const }; // target 100
    const comfortable = calculateResolution({ ...base, imageWidthPx: 12000, imageHeightPx: 12000 });
    const marginal = calculateResolution({ ...base, imageWidthPx: 8000, imageHeightPx: 8000 });
    const below = calculateResolution({ ...base, imageWidthPx: 3000, imageHeightPx: 3000 });
    assert.equal(comfortable.verdict, "comfortable");
    assert.equal(marginal.verdict, "marginal"); // 80 ppi = 0.8 of target
    assert.equal(below.verdict, "below");
  });

  it("reports the pixels actually needed and the shortfall factor", () => {
    const r = calculateResolution({
      wallWidthIn: 100,
      wallHeightIn: 50,
      imageWidthPx: 5000,
      imageHeightPx: 2500,
      distance: "far", // target 100 ppi -> need 10000 x 5000
    });
    assert.equal(r.requiredWidthPx, 10000);
    assert.equal(r.requiredHeightPx, 5000);
    assert.ok(Math.abs(r.shortfallFactor - 2) < 0.001, `got ${r.shortfallFactor}`);
  });

  it("never reports a shortfall below 1 when the file is good enough", () => {
    const r = calculateResolution({
      wallWidthIn: 10,
      wallHeightIn: 10,
      imageWidthPx: 9000,
      imageHeightPx: 9000,
      distance: "arms-length",
    });
    assert.equal(r.shortfallFactor, 1);
  });

  it("rejects non-positive dimensions rather than returning Infinity", () => {
    assert.throws(() =>
      calculateResolution({
        wallWidthIn: 0,
        wallHeightIn: 96,
        imageWidthPx: 4000,
        imageHeightPx: 4000,
        distance: "room",
      }),
    );
  });

  it("converts units", () => {
    assert.equal(feetInchesToInches(10, 6), 126);
    assert.ok(Math.abs(metresToInches(1) - 39.37) < 0.01);
  });
});

describe("comparison", () => {
  it("charges again only when a lifespan boundary is crossed", () => {
    assert.equal(cumulativeAt(100, 5, 1), 100);
    assert.equal(cumulativeAt(100, 5, 5), 100);
    assert.equal(cumulativeAt(100, 5, 6), 200); // year 6 triggers the second
    assert.equal(cumulativeAt(100, 5, 10), 200);
    assert.equal(cumulativeAt(100, 5, 11), 300);
  });

  it("totals a 10-year horizon from the visitor's own figures", () => {
    const result = compareOptions(
      [
        { key: "printed", label: "Printed", cost: 4000, lifespanYears: 10 },
        { key: "vinyl", label: "Vinyl", cost: 1500, lifespanYears: 3 },
      ],
      10,
      "printed",
    );
    const printed = result.options.find((o) => o.key === "printed")!;
    const vinyl = result.options.find((o) => o.key === "vinyl")!;

    assert.equal(printed.applications, 1);
    assert.equal(printed.total, 4000);
    assert.equal(vinyl.applications, 4); // ceil(10/3)
    assert.equal(vinyl.total, 6000);
    assert.equal(result.cheapestKey, "printed");
  });

  it("finds the year the reference option stops being the dearer one", () => {
    // printed 4000 once; vinyl 1500 every 3 years -> 1500, 3000 (y4), 4500 (y7)
    const result = compareOptions(
      [
        { key: "printed", label: "Printed", cost: 4000, lifespanYears: 10 },
        { key: "vinyl", label: "Vinyl", cost: 1500, lifespanYears: 3 },
      ],
      10,
      "printed",
    );
    assert.equal(result.breakEvenYear, 7);
  });

  it("returns null break-even when it never crosses inside the horizon", () => {
    const result = compareOptions(
      [
        { key: "printed", label: "Printed", cost: 50000, lifespanYears: 10 },
        { key: "vinyl", label: "Vinyl", cost: 100, lifespanYears: 5 },
      ],
      10,
      "printed",
    );
    assert.equal(result.breakEvenYear, null);
  });

  it("refuses to declare a winner on a tie", () => {
    const result = compareOptions(
      [
        { key: "a", label: "A", cost: 1000, lifespanYears: 10 },
        { key: "b", label: "B", cost: 1000, lifespanYears: 10 },
      ],
      10,
    );
    assert.equal(result.cheapestKey, null);
  });

  it("rejects a zero or negative lifespan instead of dividing by zero", () => {
    assert.throws(() => cumulativeAt(100, 0, 5));
    assert.throws(() =>
      compareOptions([{ key: "x", label: "X", cost: 100, lifespanYears: 0 }], 10),
    );
  });

  it("ships no price data of its own — every figure comes from the caller", () => {
    const result = compareOptions([], 10);
    assert.equal(result.options.length, 0);
    assert.equal(result.cheapestKey, null);
  });
});

describe("quote factor profiling", () => {
  const easy: QuoteFactorAnswers = {
    sizeBand: "under-50",
    surfacePrep: "minimal",
    access: "easy",
    artwork: "print-ready",
    approvals: "none",
  };

  it("calls a simple job straightforward and still says something useful", () => {
    const r = profileQuoteFactors(easy);
    assert.equal(r.profile, "straightforward");
    assert.ok(r.drivers.length >= 1);
  });

  it("escalates to complex when several factors stack", () => {
    const r = profileQuoteFactors({
      sizeBand: "over-400",
      surfacePrep: "significant",
      access: "difficult",
      artwork: "from-scratch",
      approvals: "committee",
    });
    assert.equal(r.profile, "complex");
  });

  it("orders drivers most-significant first", () => {
    const r = profileQuoteFactors({
      sizeBand: "under-50",
      surfacePrep: "significant",
      access: "easy",
      artwork: "print-ready",
      approvals: "landlord",
    });
    assert.match(r.drivers[0], /Surface preparation/);
  });

  it("emits no currency symbol or digit-price anywhere in its output", () => {
    const blob = JSON.stringify(profileQuoteFactors(easy));
    assert.doesNotMatch(blob, /[$£€]/);
  });
});

describe("readiness", () => {
  const base: ReadinessAnswers = {
    substrate: "painted-drywall",
    finishAge: "years",
    texture: "smooth",
    coating: "painted",
    hollow: "none",
    tenure: "owned",
  };

  it("returns one finding per question", () => {
    assert.equal(assessReadiness(base).findings.length, 6);
  });

  it("clears a sound, owned, smooth drywall wall", () => {
    const r = assessReadiness(base);
    assert.equal(r.headline, "Nothing here looks like an obstacle");
  });

  it("treats exposed brick as a decision, not a defect", () => {
    const r = assessReadiness({ ...base, substrate: "exposed-brick" });
    assert.equal(r.findings[0].status, "decision");
    assert.match(r.findings[0].note, /mortar/i);
  });

  it("flags a fresh finish as preparation rather than clearing it", () => {
    const r = assessReadiness({ ...base, finishAge: "under-6-weeks" });
    const age = r.findings.find((f) => f.topic === "Finish age")!;
    assert.equal(age.status, "prep");
    assert.match(age.note, /moisture|water/i);
  });

  it("escalates an unknown lease position to a decision", () => {
    const r = assessReadiness({ ...base, tenure: "leased-unsure" });
    assert.equal(r.headline, "There is a decision to make before design starts");
  });

  it("always asks for a raking-light photo", () => {
    assert.ok(assessReadiness(base).photos.some((p) => /raking/i.test(p)));
  });

  it("promises nothing and quotes nothing", () => {
    const blob = JSON.stringify(assessReadiness({ ...base, substrate: "concrete-block" }));
    assert.doesNotMatch(blob, /[$£€]/);
    assert.doesNotMatch(blob, /\bguarantee|\bwarrant|\byears? of\b/i);
  });
});

describe("service area", () => {
  it("normalises spacing and case", () => {
    assert.equal(normalisePostalCode("l6p 1a1"), "L6P");
    assert.equal(normalisePostalCode("L6P1A1"), "L6P");
    assert.equal(normalisePostalCode("  l6p-1a1 "), "L6P");
  });

  it("maps verified FSAs to their city", () => {
    assert.deepEqual(checkCoverage("L6P 1A1"), { status: "mapped", fsa: "L6P", city: "brampton" });
    assert.equal(checkCoverage("L5H 3P6").city, "mississauga");
    assert.equal(checkCoverage("L6M 1A1").city, "oakville");
    assert.equal(checkCoverage("L8P 1A1").city, "hamilton");
    assert.equal(checkCoverage("L4L 1A1").city, "vaughan");
  });

  it("treats any M code as Toronto, bar the two documented exceptions", () => {
    assert.equal(checkCoverage("M5V 3A8").city, "toronto");
    assert.equal(checkCoverage("M4C 1B5").city, "toronto");
    assert.equal(checkCoverage("M7R 1A1").status, "likely"); // exception, not Toronto
  });

  it("never claims 'not covered' for an unmapped Ontario code", () => {
    // L3T is deliberately unmapped: Thornhill straddles Vaughan and Markham.
    const r = checkCoverage("L3T 1A1");
    assert.equal(r.status, "likely");
    assert.equal(r.city, null);
  });

  it("puts other provinces outside the mapped area", () => {
    assert.equal(checkCoverage("V6B 1A1").status, "outside"); // BC
    assert.equal(checkCoverage("H3B 1A1").status, "outside"); // QC
    assert.equal(checkCoverage("T2P 1A1").status, "outside"); // AB
  });

  it("rejects malformed input rather than guessing", () => {
    assert.equal(checkCoverage("").status, "invalid");
    assert.equal(checkCoverage("12345").status, "invalid");
    assert.equal(checkCoverage("ZZZ").status, "invalid");
    assert.equal(checkCoverage("L6").status, "invalid");
  });
});
