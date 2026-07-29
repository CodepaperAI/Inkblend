"use client";

import { Crop, Info } from "lucide-react";
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
  calculateResolution,
  distanceTargets,
  feetInchesToInches,
  metresToInches,
  type ResolutionVerdict,
  type ViewingDistance,
} from "@/lib/tools/resolution";

/** All arithmetic lives in src/lib/tools/resolution.ts and is unit-tested. */

type Units = "imperial" | "metric";

const VERDICT_COPY: Record<ResolutionVerdict, { heading: string; tone: "good" | "caution" | "neutral" }> = {
  comfortable: { heading: "That file is comfortable at this size", tone: "good" },
  marginal: { heading: "Marginal — usable, but worth a conversation", tone: "neutral" },
  below: { heading: "That file is short for a wall this size", tone: "caution" },
};

const DISTANCE_OPTIONS = distanceTargets.map((t) => ({ value: t.key, label: t.label }));

function toNumber(value: string): number {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function ArtworkResolutionTool({
  sourcePage,
  compact = false,
}: {
  readonly sourcePage: string;
  readonly compact?: boolean;
}) {
  const [units, setUnits] = useState<Units>("imperial");
  const [wallW, setWallW] = useState("");
  const [wallH, setWallH] = useState("");
  const [pxW, setPxW] = useState("");
  const [pxH, setPxH] = useState("");
  const [distance, setDistance] = useState<ViewingDistance>("room");

  const touched = [wallW, wallH, pxW, pxH].some((v) => v !== "");
  useToolStarted("artwork-resolution", touched);

  const wallWidthIn = units === "imperial" ? feetInchesToInches(toNumber(wallW)) : metresToInches(toNumber(wallW));
  const wallHeightIn = units === "imperial" ? feetInchesToInches(toNumber(wallH)) : metresToInches(toNumber(wallH));
  const imageWidthPx = Math.round(toNumber(pxW));
  const imageHeightPx = Math.round(toNumber(pxH));

  const complete = wallWidthIn > 0 && wallHeightIn > 0 && imageWidthPx > 0 && imageHeightPx > 0;
  useToolCompleted("artwork-resolution", complete);

  const result = useMemo(() => {
    if (!complete) return null;
    return calculateResolution({ wallWidthIn, wallHeightIn, imageWidthPx, imageHeightPx, distance });
  }, [complete, wallWidthIn, wallHeightIn, imageWidthPx, imageHeightPx, distance]);

  const activeTarget = distanceTargets.find((t) => t.key === distance)!;

  const summary = result
    ? [
        "— Sent from the Artwork Resolution Checker —",
        `Wall: ${wallW} ${units === "imperial" ? "ft" : "m"} wide x ${wallH} ${units === "imperial" ? "ft" : "m"} high`,
        `Image: ${imageWidthPx} x ${imageHeightPx} px`,
        `Viewing distance: ${activeTarget.label}`,
        `Effective resolution at print size: ${result.effectivePpi.toFixed(0)} PPI (target ${result.targetPpi})`,
        `Verdict: ${VERDICT_COPY[result.verdict].heading}`,
        result.verdict !== "comfortable"
          ? `Would need roughly ${result.requiredWidthPx} x ${result.requiredHeightPx} px`
          : "",
        result.cropAxis !== "none"
          ? `Note: about ${(result.cropFraction * 100).toFixed(0)}% of the image ${result.cropAxis} is cropped to fit`
          : "",
      ]
        .filter(Boolean)
        .join("\n")
    : "";

  const reset = () => {
    setWallW("");
    setWallH("");
    setPxW("");
    setPxH("");
    setDistance("room");
  };

  return (
    <ToolPanel>
      <div className="grid gap-6">
        <Fieldset legend="Units">
          <ChoiceGroup
            name="units"
            value={units}
            options={[
              { value: "imperial" as Units, label: "Feet" },
              { value: "metric" as Units, label: "Metres" },
            ]}
            onChange={setUnits}
          />
        </Fieldset>

        <Fieldset legend="The wall" hint="Finished printed area, not the whole room.">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberField
              label="Width"
              value={wallW}
              onChange={setWallW}
              placeholder={units === "imperial" ? "12" : "3.6"}
              suffix={units === "imperial" ? "ft" : "m"}
            />
            <NumberField
              label="Height"
              value={wallH}
              onChange={setWallH}
              placeholder={units === "imperial" ? "8" : "2.4"}
              suffix={units === "imperial" ? "ft" : "m"}
            />
          </div>
        </Fieldset>

        <Fieldset
          legend="The image"
          hint="Pixel dimensions of the original file — check the file's properties, not what it looks like on screen."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberField label="Width" value={pxW} onChange={setPxW} placeholder="6000" suffix="px" />
            <NumberField label="Height" value={pxH} onChange={setPxH} placeholder="4000" suffix="px" />
          </div>
        </Fieldset>

        <Fieldset
          legend="How far away will people stand?"
          hint="Be honest rather than cautious — picking closer than reality demands a much larger file for detail nobody will see."
        >
          <ChoiceGroup name="distance" value={distance} options={DISTANCE_OPTIONS} onChange={setDistance} />
          <p className="mt-3 text-sm leading-6 text-ink-paper/58">
            {activeTarget.detail} — target around {activeTarget.targetPpi} PPI.
          </p>
        </Fieldset>
      </div>

      {result ? (
        <>
          <ResultPanel heading={VERDICT_COPY[result.verdict].heading} tone={VERDICT_COPY[result.verdict].tone}>
            <dl className="grid gap-4 sm:grid-cols-3">
              <div>
                <dt className="text-sm text-ink-paper/58">At print size</dt>
                <dd className="mt-1 font-display text-4xl text-ink-paper">
                  {result.effectivePpi.toFixed(0)}
                  <span className="ml-1 text-lg text-ink-paper/58">PPI</span>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-ink-paper/58">Target at this distance</dt>
                <dd className="mt-1 font-display text-4xl text-ink-paper/70">
                  {result.targetPpi}
                  <span className="ml-1 text-lg text-ink-paper/50">PPI</span>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-ink-paper/58">Pixels needed</dt>
                <dd className="mt-1 font-display text-2xl leading-tight text-ink-paper/70">
                  {result.requiredWidthPx.toLocaleString()} × {result.requiredHeightPx.toLocaleString()}
                </dd>
              </div>
            </dl>

            {result.verdict !== "comfortable" ? (
              <p className="mt-5 text-base leading-7 text-ink-paper/72">
                Your file is about {result.shortfallFactor.toFixed(1)}× short of the target for this
                viewing distance. Before replacing it, check whether the distance you picked is
                genuinely right — and if the image came from a camera, the original export is often
                several times larger than the copy that has been emailed around.
              </p>
            ) : (
              <p className="mt-5 text-base leading-7 text-ink-paper/72">
                Beyond this point extra pixels add file size without adding anything your eye can
                resolve at that distance. Composition and colour will matter far more to how the
                finished wall reads.
              </p>
            )}

            {result.cropAxis !== "none" ? (
              <p className="mt-4 flex gap-3 text-base leading-7 text-ink-paper/72">
                <Crop size={18} className="mt-1 shrink-0 text-ink-gold" />
                Your image and the wall have different proportions, so roughly{" "}
                <strong className="font-semibold text-ink-paper">
                  {(result.cropFraction * 100).toFixed(0)}% of the image {result.cropAxis}
                </strong>{" "}
                is cropped to fit. Worth checking the important part of the picture survives.
              </p>
            ) : null}

            {!compact ? (
              <p className="mt-4 flex gap-3 text-base leading-7 text-ink-paper/72">
                <Info size={18} className="mt-1 shrink-0 text-ink-gold" />
                If your artwork is a logo, lettering or an illustration built from shapes, none of
                this applies — vector files scale to any size with no loss at all. For script and
                calligraphy, always start from live text converted to outlines rather than a
                photograph of it.
              </p>
            ) : null}
          </ResultPanel>

          <ResultInvite tool="artwork-resolution" sourcePage={sourcePage} summary={summary}>
            {result.verdict === "comfortable"
              ? "Send the wall measurements and the file and we can talk about the wall itself."
              : "Send it anyway — there is often a larger original, a better crop, or a vector version that solves it outright."}
          </ResultInvite>
          <ResetButton tool="artwork-resolution" onReset={reset} />
        </>
      ) : (
        <p className="mt-6 text-sm text-ink-paper/50">
          Fill in the wall size and the image dimensions to see the result.
        </p>
      )}
    </ToolPanel>
  );
}
