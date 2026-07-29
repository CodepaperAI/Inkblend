"use client";

import { AlertTriangle, Camera, CheckCircle2, HelpCircle, Wrench } from "lucide-react";
import { useMemo, useState } from "react";

import {
  ChoiceGroup,
  Fieldset,
  ResetButton,
  ResultInvite,
  ResultPanel,
  ToolPanel,
  useToolCompleted,
  useToolStarted,
} from "@/components/tools/tool-shell";
import {
  assessReadiness,
  type Coating,
  type FindingStatus,
  type FinishAge,
  type Hollow,
  type ReadinessAnswers,
  type Substrate,
  type Tenure,
  type Texture,
} from "@/lib/tools/readiness";

/**
 * All assessment logic lives in src/lib/tools/readiness.ts and is unit-tested.
 * This component only collects answers and renders them.
 */

const SUBSTRATES: { value: Substrate; label: string }[] = [
  { value: "painted-drywall", label: "Painted drywall" },
  { value: "skim-plaster", label: "Skim-coated plaster" },
  { value: "original-plaster", label: "Original plaster" },
  { value: "exposed-brick", label: "Exposed brick" },
  { value: "concrete-block", label: "Concrete block" },
  { value: "board-formed-concrete", label: "Board-formed concrete" },
  { value: "panelled", label: "Panelled system" },
  { value: "unsure", label: "Not sure" },
];

const AGES: { value: FinishAge; label: string }[] = [
  { value: "under-6-weeks", label: "Under 6 weeks" },
  { value: "6-weeks-to-6-months", label: "6 weeks – 6 months" },
  { value: "over-6-months", label: "Over 6 months" },
  { value: "years", label: "Years" },
  { value: "unsure", label: "Not sure" },
];

const TEXTURES: { value: Texture; label: string }[] = [
  { value: "smooth", label: "Smooth" },
  { value: "light", label: "Light orange peel" },
  { value: "heavy", label: "Heavy texture roll" },
  { value: "deep-relief", label: "Deep relief" },
  { value: "unsure", label: "Not sure" },
];

const COATINGS: { value: Coating; label: string }[] = [
  { value: "never-painted", label: "Never painted" },
  { value: "painted", label: "Painted" },
  { value: "wallpapered", label: "Wallpapered before" },
  { value: "sealed-limewashed", label: "Sealed or limewashed" },
  { value: "unsure", label: "Not sure" },
];

const HOLLOWS: { value: Hollow; label: string }[] = [
  { value: "none", label: "Sounds solid throughout" },
  { value: "some", label: "Some hollow or patched spots" },
  { value: "unsure", label: "Have not checked" },
];

const TENURES: { value: Tenure; label: string }[] = [
  { value: "owned", label: "We own it" },
  { value: "leased-known", label: "Leased, clause checked" },
  { value: "leased-unsure", label: "Leased, not checked" },
];

const STATUS_META: Record<FindingStatus, { icon: typeof CheckCircle2; className: string; label: string }> = {
  ready: { icon: CheckCircle2, className: "text-emerald-400", label: "Looks fine" },
  ask: { icon: HelpCircle, className: "text-ink-gold", label: "Worth confirming" },
  prep: { icon: Wrench, className: "text-ink-gold", label: "Preparation likely" },
  decision: { icon: AlertTriangle, className: "text-ink-red", label: "Decision needed" },
};

const TONE: Record<FindingStatus, "good" | "caution" | "neutral"> = {
  ready: "good",
  ask: "neutral",
  prep: "neutral",
  decision: "caution",
};

export function WallReadinessTool({
  sourcePage,
  compact = false,
}: {
  readonly sourcePage: string;
  readonly compact?: boolean;
}) {
  const [substrate, setSubstrate] = useState<Substrate | null>(null);
  const [finishAge, setFinishAge] = useState<FinishAge | null>(null);
  const [texture, setTexture] = useState<Texture | null>(null);
  const [coating, setCoating] = useState<Coating | null>(null);
  const [hollow, setHollow] = useState<Hollow | null>(null);
  const [tenure, setTenure] = useState<Tenure | null>(null);

  const answered = [substrate, finishAge, texture, coating, hollow, tenure].filter(Boolean).length;
  useToolStarted("wall-readiness", answered > 0);

  const complete =
    substrate !== null &&
    finishAge !== null &&
    texture !== null &&
    coating !== null &&
    hollow !== null &&
    tenure !== null;

  // Pure derivation only — the completion event fires from an effect below.
  const result = useMemo(() => {
    if (!complete) return null;
    const answers: ReadinessAnswers = { substrate, finishAge, texture, coating, hollow, tenure };
    return assessReadiness(answers);
  }, [complete, substrate, finishAge, texture, coating, hollow, tenure]);

  useToolCompleted("wall-readiness", complete);

  const worst =
    result?.findings.reduce<FindingStatus>(
      (acc, f) =>
        ({ decision: 3, prep: 2, ask: 1, ready: 0 })[f.status] >
        ({ decision: 3, prep: 2, ask: 1, ready: 0 })[acc]
          ? f.status
          : acc,
      "ready",
    ) ?? "ready";

  const reset = () => {
    setSubstrate(null);
    setFinishAge(null);
    setTexture(null);
    setCoating(null);
    setHollow(null);
    setTenure(null);
  };

  return (
    <ToolPanel>
      <div className="grid gap-6">
        <Fieldset legend="1. What is the wall made of?">
          <ChoiceGroup name="substrate" value={substrate} options={SUBSTRATES} onChange={setSubstrate} />
        </Fieldset>

        <Fieldset
          legend="2. How recently was the surface finished?"
          hint="New plaster, drywall compound and skim coats hold water as they cure."
        >
          <ChoiceGroup name="finishAge" value={finishAge} options={AGES} onChange={setFinishAge} />
        </Fieldset>

        <Fieldset
          legend="3. How textured is it?"
          hint="Hold a phone light flat against the wall and look along the surface."
        >
          <ChoiceGroup name="texture" value={texture} options={TEXTURES} onChange={setTexture} />
        </Fieldset>

        <Fieldset legend="4. What has been on it before?">
          <ChoiceGroup name="coating" value={coating} options={COATINGS} onChange={setCoating} />
        </Fieldset>

        <Fieldset legend="5. Any hollow or patched areas?" hint="Tap along it and listen for where the sound changes.">
          <ChoiceGroup name="hollow" value={hollow} options={HOLLOWS} onChange={setHollow} />
        </Fieldset>

        <Fieldset legend="6. Do you own or lease the space?">
          <ChoiceGroup name="tenure" value={tenure} options={TENURES} onChange={setTenure} />
        </Fieldset>
      </div>

      {!complete ? (
        <p className="mt-6 text-sm text-ink-paper/50">
          {answered} of 6 answered — the result appears once all six are in.
        </p>
      ) : null}

      {result ? (
        <>
          <ResultPanel heading={result.headline} tone={TONE[worst]}>
            <ul className="grid gap-4">
              {result.findings.map((finding) => {
                const meta = STATUS_META[finding.status];
                const Icon = meta.icon;
                return (
                  <li key={finding.topic} className="flex gap-3">
                    <Icon size={18} className={`mt-1 shrink-0 ${meta.className}`} />
                    <div>
                      <p className="text-sm font-semibold text-ink-paper">
                        {finding.topic}
                        <span className={`ml-2 font-normal ${meta.className}`}>{meta.label}</span>
                      </p>
                      <p className="mt-1 text-base leading-7 text-ink-paper/68">{finding.note}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            {!compact ? (
              <div className="mt-6 rounded-[1rem] border border-ink-paper/12 bg-ink-black/25 p-5">
                <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-ink-gold">
                  <Camera size={16} />
                  What to photograph
                </p>
                <ul className="mt-3 grid gap-2">
                  {result.photos.map((photo) => (
                    <li key={photo} className="flex gap-3 text-base leading-7 text-ink-paper/68">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-ink-gold" />
                      {photo}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </ResultPanel>

          <ResultInvite tool="wall-readiness" sourcePage={sourcePage} summary={result.summary}>
            Your six answers are ready to attach. Add photographs and rough measurements and we can
            give you a specific reply rather than a request for more detail.
          </ResultInvite>
          <ResetButton tool="wall-readiness" onReset={reset} />
        </>
      ) : null}
    </ToolPanel>
  );
}
