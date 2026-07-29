"use client";

import { track } from "@vercel/analytics";
import { ArrowRight, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Shared chrome for the interactive tools.
 *
 * ── RESULT FIRST, INVITE SECOND ───────────────────────────────────────────
 * Nothing here is gated. The full result is always visible, and the quote form
 * sits below it. Gating a calculator behind an email costs the SEO value
 * entirely — crawlers never reach the payoff — and this site is not indexed
 * yet, so it would be trading the whole point of the exercise for a few
 * addresses.
 *
 * ── NO PRICES ─────────────────────────────────────────────────────────────
 * No component under src/components/tools may render a currency figure that
 * did not come from the visitor's own input. There is a verification step that
 * greps the built HTML under /tools for currency patterns.
 */

export type ToolId = "wall-readiness" | "artwork-resolution" | "quote-planner" | "service-area";

/** Fire-and-forget analytics. `track` is a no-op when Analytics is absent. */
export function trackTool(event: "tool_started" | "tool_completed" | "tool_reset", tool: ToolId) {
  track(event, { tool });
}

/**
 * Fires `tool_started` once, the first time the visitor actually touches the
 * tool. Deliberately not on mount — a pageview is not an interaction, and
 * conflating them makes the completion rate meaningless.
 */
export function useToolStarted(tool: ToolId, active: boolean) {
  const fired = useRef(false);
  useEffect(() => {
    if (active && !fired.current) {
      fired.current = true;
      trackTool("tool_started", tool);
    }
  }, [active, tool]);
}

/**
 * Fires `tool_completed` once, when the tool first has enough input to produce
 * a result.
 *
 * This belongs in an effect, not in the render path. Calling track() from
 * inside a useMemo means it fires during render — which StrictMode runs twice,
 * and concurrent React may run and discard entirely. That produces phantom
 * conversions in the analytics and is the same class of bug as mutating shared
 * state during render.
 */
export function useToolCompleted(tool: ToolId, complete: boolean) {
  const fired = useRef(false);
  useEffect(() => {
    if (complete && !fired.current) {
      fired.current = true;
      trackTool("tool_completed", tool);
    }
    if (!complete) fired.current = false;
  }, [complete, tool]);
}

export function Fieldset({
  legend,
  hint,
  children,
}: {
  readonly legend: string;
  readonly hint?: string;
  readonly children: ReactNode;
}) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-gold">
        {legend}
      </legend>
      {hint ? <p className="mt-2 text-sm leading-6 text-ink-paper/58">{hint}</p> : null}
      <div className="mt-3">{children}</div>
    </fieldset>
  );
}

/** Radio group rendered as buttons. Real inputs underneath, for keyboard + a11y. */
export function ChoiceGroup<T extends string>({
  name,
  value,
  options,
  onChange,
}: {
  readonly name: string;
  readonly value: T | null;
  readonly options: readonly { readonly value: T; readonly label: string }[];
  readonly onChange: (next: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <label
            key={option.value}
            className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition ${
              selected
                ? "border-ink-gold bg-ink-gold/15 font-semibold text-ink-paper"
                : "border-ink-paper/15 text-ink-paper/68 hover:border-ink-paper/35"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selected}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        );
      })}
    </div>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  placeholder,
  suffix,
  min = 0,
}: {
  readonly label: string;
  readonly value: string;
  readonly onChange: (next: string) => void;
  readonly placeholder?: string;
  readonly suffix?: string;
  readonly min?: number;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <span className="relative block">
        <input
          type="number"
          inputMode="decimal"
          min={min}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
        {suffix ? (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-ink-paper/45">
            {suffix}
          </span>
        ) : null}
      </span>
    </label>
  );
}

export function ToolPanel({ children }: { readonly children: ReactNode }) {
  return (
    <div className="rounded-[1.5rem] border border-ink-paper/10 bg-ink-paper/[0.045] p-5 sm:p-7">
      {children}
    </div>
  );
}

export function ResultPanel({
  heading,
  tone = "neutral",
  children,
}: {
  readonly heading: string;
  readonly tone?: "good" | "caution" | "neutral";
  readonly children: ReactNode;
}) {
  const border =
    tone === "good"
      ? "border-emerald-500/35 bg-emerald-500/[0.06]"
      : tone === "caution"
        ? "border-ink-red/35 bg-ink-red/[0.06]"
        : "border-ink-gold/30 bg-ink-gold/[0.06]";

  return (
    <div
      className={`mt-6 rounded-[1.25rem] border p-5 sm:p-6 ${border}`}
      role="status"
      aria-live="polite"
    >
      <h3 className="font-display text-2xl leading-tight text-ink-paper sm:text-3xl">{heading}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

/**
 * The invite that follows every result. Carries the tool's own summary into the
 * quote form so the enquiry arrives with the answers already attached — which
 * is what makes these leads materially better than a bare "I have a wall".
 */
export function ResultInvite({
  tool,
  sourcePage,
  summary,
  children,
}: {
  readonly tool: ToolId;
  readonly sourcePage: string;
  readonly summary: string;
  readonly children?: ReactNode;
}) {
  const href = `/get-quote?source=${encodeURIComponent(sourcePage)}&notes=${encodeURIComponent(summary)}`;

  return (
    <div className="mt-6 flex flex-col gap-4 rounded-[1.25rem] border border-ink-paper/12 bg-ink-black/25 p-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-base leading-7 text-ink-paper/72">
        {children ?? "Send these answers with your enquiry and you will get a specific reply."}
      </p>
      <Link
        href={href}
        onClick={() => track("tool_to_form", { tool, sourcePage })}
        className="btn-primary shrink-0 justify-center"
      >
        Continue to a quote
        <ArrowRight size={18} />
      </Link>
    </div>
  );
}

export function ResetButton({ tool, onReset }: { readonly tool: ToolId; readonly onReset: () => void }) {
  return (
    <button
      type="button"
      onClick={() => {
        onReset();
        trackTool("tool_reset", tool);
      }}
      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink-paper/58 transition hover:text-ink-paper"
    >
      <RotateCcw size={15} />
      Start again
    </button>
  );
}
