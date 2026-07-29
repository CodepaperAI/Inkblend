"use client";

import { Plus, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";

import {
  ChoiceGroup,
  Fieldset,
  NumberField,
  ResetButton,
  ResultInvite,
  ResultPanel,
  ToolPanel,
  useToolCompleted,
  useToolStarted,
} from "@/components/tools/tool-shell";
import {
  compareOptions,
  DEFAULT_HORIZON_YEARS,
  profileQuoteFactors,
  type AccessDifficulty,
  type ApprovalPath,
  type ArtworkReadiness,
  type ComplexityProfile,
  type QuoteFactorAnswers,
  type SizeBand,
} from "@/lib/tools/comparison";

/**
 * ── NO PRICES ─────────────────────────────────────────────────────────────
 * Part B below has NO seeded figures, no placeholder amounts and no currency
 * label. Every number comes from the visitor. Part A returns no figures at all.
 *
 * There is a verification step that greps the built HTML under /tools for
 * currency patterns. Adding a default price here will fail it — which is the
 * point.
 */

const SIZE_BANDS: { value: SizeBand; label: string }[] = [
  { value: "under-50", label: "Under 50 sq ft" },
  { value: "50-150", label: "50 – 150" },
  { value: "150-400", label: "150 – 400" },
  { value: "over-400", label: "Over 400" },
];

const PREP: { value: QuoteFactorAnswers["surfacePrep"]; label: string }[] = [
  { value: "minimal", label: "Sound and smooth" },
  { value: "some", label: "Some making good" },
  { value: "significant", label: "Significant work" },
];

const ACCESS: { value: AccessDifficulty; label: string }[] = [
  { value: "easy", label: "Straightforward" },
  { value: "restricted", label: "Restricted hours or lift" },
  { value: "difficult", label: "Difficult — no loading, stairs" },
];

const ARTWORK: { value: ArtworkReadiness; label: string }[] = [
  { value: "print-ready", label: "Print-ready file" },
  { value: "needs-work", label: "Have something, needs work" },
  { value: "from-scratch", label: "Starting from an idea" },
];

const APPROVALS: { value: ApprovalPath; label: string }[] = [
  { value: "none", label: "Just us" },
  { value: "landlord", label: "Landlord consent" },
  { value: "committee", label: "Board or committee" },
];

const PROFILE_TONE: Record<ComplexityProfile, "good" | "caution" | "neutral"> = {
  straightforward: "good",
  "some-prep": "neutral",
  complex: "caution",
};

function toNumber(value: string): number {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

/** Formats a visitor-supplied figure. No currency symbol — we never label one. */
function fmt(value: number): string {
  return value.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

export function QuotePlannerTool({
  sourcePage,
  compact = false,
}: {
  readonly sourcePage: string;
  readonly compact?: boolean;
}) {
  // Part A — factor profile
  const [sizeBand, setSizeBand] = useState<SizeBand | null>(null);
  const [surfacePrep, setSurfacePrep] = useState<QuoteFactorAnswers["surfacePrep"] | null>(null);
  const [access, setAccess] = useState<AccessDifficulty | null>(null);
  const [artwork, setArtwork] = useState<ArtworkReadiness | null>(null);
  const [approvals, setApprovals] = useState<ApprovalPath | null>(null);

  // Part B — the visitor's own quotes
  const [printedCost, setPrintedCost] = useState("");
  const [printedLife, setPrintedLife] = useState("");
  const [altCost, setAltCost] = useState("");
  const [altLife, setAltLife] = useState("");

  const profileComplete =
    sizeBand !== null && surfacePrep !== null && access !== null && artwork !== null && approvals !== null;

  useToolStarted("quote-planner", sizeBand !== null || printedCost !== "");
  useToolCompleted("quote-planner", profileComplete);

  const profile = useMemo(() => {
    if (!profileComplete) return null;
    return profileQuoteFactors({ sizeBand, surfacePrep, access, artwork, approvals });
  }, [profileComplete, sizeBand, surfacePrep, access, artwork, approvals]);

  const comparison = useMemo(() => {
    const pc = toNumber(printedCost);
    const pl = toNumber(printedLife);
    const ac = toNumber(altCost);
    const al = toNumber(altLife);
    // Renders nothing until the visitor has supplied all four of their own numbers.
    if (!pc || !pl || !ac || !al) return null;
    return compareOptions(
      [
        { key: "printed", label: "Printed wall", cost: pc, lifespanYears: pl },
        { key: "alternative", label: "The alternative", cost: ac, lifespanYears: al },
      ],
      DEFAULT_HORIZON_YEARS,
      "printed",
    );
  }, [printedCost, printedLife, altCost, altLife]);

  const reset = () => {
    setSizeBand(null);
    setSurfacePrep(null);
    setAccess(null);
    setArtwork(null);
    setApprovals(null);
    setPrintedCost("");
    setPrintedLife("");
    setAltCost("");
    setAltLife("");
  };

  return (
    <ToolPanel>
      <div className="grid gap-6">
        <Fieldset legend="Roughly how big is the wall?" hint="Printed area, measured rather than paced out.">
          <ChoiceGroup name="sizeBand" value={sizeBand} options={SIZE_BANDS} onChange={setSizeBand} />
        </Fieldset>
        <Fieldset legend="What state is the surface in?" hint="Unsure? Run the Wall Readiness Check first.">
          <ChoiceGroup name="surfacePrep" value={surfacePrep} options={PREP} onChange={setSurfacePrep} />
        </Fieldset>
        <Fieldset legend="How easy is it to get to?">
          <ChoiceGroup name="access" value={access} options={ACCESS} onChange={setAccess} />
        </Fieldset>
        <Fieldset legend="Where is the artwork up to?">
          <ChoiceGroup name="artwork" value={artwork} options={ARTWORK} onChange={setArtwork} />
        </Fieldset>
        <Fieldset legend="Who has to approve it?">
          <ChoiceGroup name="approvals" value={approvals} options={APPROVALS} onChange={setApprovals} />
        </Fieldset>
      </div>

      {profile ? (
        <ResultPanel heading={profile.headline} tone={PROFILE_TONE[profile.profile]}>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-gold">
            What will move your number, in order
          </p>
          <ol className="mt-4 grid gap-4">
            {profile.drivers.map((driver, index) => (
              <li key={driver} className="flex gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-ink-gold/20 text-xs font-bold text-ink-gold">
                  {index + 1}
                </span>
                <p className="text-base leading-7 text-ink-paper/72">{driver}</p>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm leading-6 text-ink-paper/50">
            No figures here, deliberately. Ink Blend quotes per wall rather than from a rate card, and
            a number from a form that has never seen your surface would be a guess.
          </p>
        </ResultPanel>
      ) : (
        <p className="mt-6 text-sm text-ink-paper/50">Answer all five to see what drives your quote.</p>
      )}

      {!compact ? (
        <div className="mt-10 border-t border-ink-paper/10 pt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-red">
            Optional — compare over {DEFAULT_HORIZON_YEARS} years
          </p>
          <h3 className="mt-3 font-display text-3xl leading-tight text-ink-paper">
            Using the quotes you have already been given
          </h3>
          <p className="mt-3 max-w-2xl text-base leading-7 text-ink-paper/62">
            Enter what you have actually been quoted and how long you expect each option to last.
            We supply the arithmetic and nothing else — there are no figures of ours in here, which
            is exactly why you can trust the output. Use whatever currency you were quoted in.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-[1.25rem] border border-ink-paper/12 p-5">
              <p className="font-display text-2xl text-ink-paper">A printed wall</p>
              <div className="mt-4 grid gap-4">
                <NumberField label="Quoted amount" value={printedCost} onChange={setPrintedCost} placeholder="Your quote" />
                <NumberField
                  label="Years before redoing"
                  value={printedLife}
                  onChange={setPrintedLife}
                  placeholder="Your expectation"
                  suffix="yrs"
                />
              </div>
            </div>
            <div className="rounded-[1.25rem] border border-ink-paper/12 p-5">
              <p className="font-display text-2xl text-ink-paper">The alternative</p>
              <p className="mt-1 text-sm text-ink-paper/50">Vinyl, wallpaper, repainting — whatever you are weighing it against.</p>
              <div className="mt-4 grid gap-4">
                <NumberField label="Quoted amount" value={altCost} onChange={setAltCost} placeholder="Your quote" />
                <NumberField
                  label="Years before redoing"
                  value={altLife}
                  onChange={setAltLife}
                  placeholder="Your expectation"
                  suffix="yrs"
                />
              </div>
            </div>
          </div>

          {comparison ? (
            <ResultPanel
              heading={
                comparison.cheapestKey === "printed"
                  ? `Over ${comparison.horizonYears} years, the printed wall comes out lower`
                  : comparison.cheapestKey === "alternative"
                    ? `Over ${comparison.horizonYears} years, the alternative comes out lower`
                    : `Over ${comparison.horizonYears} years, they come out level`
              }
              tone="neutral"
            >
              <dl className="grid gap-4 sm:grid-cols-2">
                {comparison.options.map((option) => (
                  <div key={option.key} className="rounded-[1rem] border border-ink-paper/12 p-4">
                    <dt className="text-sm text-ink-paper/58">{option.label}</dt>
                    <dd className="mt-1 font-display text-3xl text-ink-paper">{fmt(option.total)}</dd>
                    <p className="mt-1 text-sm text-ink-paper/50">
                      paid {option.applications} {option.applications === 1 ? "time" : "times"} across{" "}
                      {comparison.horizonYears} years
                    </p>
                  </div>
                ))}
              </dl>

              <p className="mt-5 flex gap-3 text-base leading-7 text-ink-paper/72">
                <TrendingUp size={18} className="mt-1 shrink-0 text-ink-gold" />
                {comparison.breakEvenYear
                  ? `On your numbers, the printed wall stops being the dearer option in year ${comparison.breakEvenYear}.`
                  : `On your numbers, the printed wall does not overtake the alternative inside ${comparison.horizonYears} years. Whether that settles it depends on how long you expect to be in the space.`}
              </p>
              <p className="mt-4 text-sm leading-6 text-ink-paper/50">
                This is arithmetic on what you entered, including the lifespans you supplied — not a
                prediction. Change an assumption and the answer moves with it.
              </p>
            </ResultPanel>
          ) : (
            <p className="mt-6 flex items-center gap-2 text-sm text-ink-paper/50">
              <Plus size={15} />
              Fill in all four fields to see the comparison.
            </p>
          )}
        </div>
      ) : null}

      {profile ? (
        <>
          <ResultInvite tool="quote-planner" sourcePage={sourcePage} summary={profile.summary}>
            Send this profile with your wall photographs and measurements and you will get a specific
            answer rather than a request for more detail.
          </ResultInvite>
          <ResetButton tool="quote-planner" onReset={reset} />
        </>
      ) : null}
    </ToolPanel>
  );
}
