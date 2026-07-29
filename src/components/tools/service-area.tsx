"use client";

import { CheckCircle2, HelpCircle, MapPin, XCircle } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import {
  ResultInvite,
  ResultPanel,
  ToolPanel,
  useToolCompleted,
  useToolStarted,
} from "@/components/tools/tool-shell";
import { checkCoverage, type CitySlug, type CoverageStatus } from "@/lib/tools/fsa";

/** FSA data and lookup live in src/lib/tools/fsa.ts and are unit-tested. */

const CITY_LABEL: Record<CitySlug, string> = {
  brampton: "Brampton",
  mississauga: "Mississauga",
  toronto: "Toronto",
  vaughan: "Vaughan",
  oakville: "Oakville",
  hamilton: "Hamilton",
};

const STATUS_META: Record<
  CoverageStatus,
  { icon: typeof CheckCircle2; tone: "good" | "caution" | "neutral"; className: string }
> = {
  mapped: { icon: CheckCircle2, tone: "good", className: "text-emerald-400" },
  likely: { icon: HelpCircle, tone: "neutral", className: "text-ink-gold" },
  outside: { icon: MapPin, tone: "neutral", className: "text-ink-gold" },
  invalid: { icon: XCircle, tone: "caution", className: "text-ink-red" },
};

export function ServiceAreaTool({ sourcePage }: { readonly sourcePage: string }) {
  const [code, setCode] = useState("");

  const trimmed = code.trim();
  useToolStarted("service-area", trimmed.length > 0);

  // Only evaluate once there is enough input to form an FSA — otherwise every
  // keystroke would report "invalid" while someone is still typing.
  const result = useMemo(() => {
    const stripped = trimmed.replace(/[^A-Za-z0-9]/g, "");
    if (stripped.length < 3) return null;
    return checkCoverage(trimmed);
  }, [trimmed]);

  useToolCompleted("service-area", result !== null && result.status !== "invalid");

  const meta = result ? STATUS_META[result.status] : null;
  const Icon = meta?.icon;

  const summary = result
    ? `— Sent from the Service Area Checker —\nPostal area: ${result.fsa ?? trimmed}\nResult: ${result.status}${
        result.city ? ` (${CITY_LABEL[result.city]})` : ""
      }`
    : "";

  return (
    <ToolPanel>
      <label className="field">
        <span>Postal code</span>
        <input
          type="text"
          inputMode="text"
          autoComplete="postal-code"
          maxLength={7}
          value={code}
          placeholder="L6P 1A1"
          onChange={(event) => setCode(event.target.value)}
          aria-describedby="service-area-hint"
        />
      </label>
      <p id="service-area-hint" className="mt-2 text-sm text-ink-paper/50">
        The first three characters are enough — there is no reason to ask for a full address to
        answer a coverage question.
      </p>

      {result && meta && Icon ? (
        <>
          {result.status === "mapped" && result.city ? (
            <ResultPanel heading={`Yes — we have ${CITY_LABEL[result.city]} mapped`} tone={meta.tone}>
              <p className="text-base leading-7 text-ink-paper/72">
                {result.fsa} is in {CITY_LABEL[result.city]}. The page for that area covers the local
                building stock, the approvals that usually apply and the access constraints worth
                knowing about before you enquire.
              </p>
              <Link
                href={`/wall-printing/${result.city}`}
                className="btn-secondary mt-5 inline-flex justify-center"
              >
                Read the {CITY_LABEL[result.city]} page
              </Link>
            </ResultPanel>
          ) : null}

          {result.status === "likely" ? (
            <ResultPanel heading="Probably — worth confirming with us" tone={meta.tone}>
              <p className="text-base leading-7 text-ink-paper/72">
                {result.fsa} is an Ontario postal area we have not specifically mapped. That is not a
                no. The map is deliberately incomplete rather than padded with codes we could not
                verify, so an unrecognised Ontario code gets an honest &ldquo;let us check&rdquo;
                rather than a refusal we cannot justify.
              </p>
            </ResultPanel>
          ) : null}

          {result.status === "outside" ? (
            <ResultPanel heading="Outside the areas we have mapped" tone={meta.tone}>
              <p className="text-base leading-7 text-ink-paper/72">
                {result.fsa} looks to be outside Ontario. Direct-to-wall printing means getting
                equipment and an operator into the room, so distance genuinely matters — but scope
                changes the answer. A multi-wall programme justifies travel a single feature wall
                does not, so it is worth asking rather than assuming.
              </p>
            </ResultPanel>
          ) : null}

          {result.status === "invalid" ? (
            <ResultPanel heading="That does not look like a Canadian postal code" tone={meta.tone}>
              <p className="text-base leading-7 text-ink-paper/72">
                Canadian postal codes follow a letter-number-letter pattern, like L6P 1A1. Check the
                first three characters and try again.
              </p>
            </ResultPanel>
          ) : null}

          {result.status !== "invalid" ? (
            <ResultInvite tool="service-area" sourcePage={sourcePage} summary={summary}>
              {result.status === "mapped"
                ? "Coverage settled. The quickest next step is the wall itself — photographs, rough measurements and what the space is used for."
                : "Send the address alongside the wall details and we will give you a straight answer on whether it works."}
            </ResultInvite>
          ) : null}
        </>
      ) : null}
    </ToolPanel>
  );
}
