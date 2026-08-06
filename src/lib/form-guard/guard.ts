/**
 * The guard pipeline, ordered cheapest-first so an unsophisticated flood is
 * rejected on CPU alone before any outbound HTTPS call to Cloudflare:
 *
 *   origin -> honeypot -> timing -> Turnstile
 *
 * Ported from Palacio (PalacioNext-Js @ d219482), minus the Upstash rate limiter
 * and the scored content heuristics. Those two are the only layers that can
 * reject a payload a real browser produced, so leaving them out means this guard
 * has no false-positive surface — and needs no new npm dependency on any site.
 *
 * The pipeline does not own field validation or sending. It answers one
 * question — may this submission proceed — and the route does the rest.
 */

import { readAntiAbuseEnvelope, type FieldSource } from "./anti-abuse";
import { allowedHosts, getClientIp, hasAcceptableOrigin } from "./origin";
import { verifyTurnstileToken, type TurnstileResult } from "./turnstile";
import type { FormGuardConfig } from "./types";

/**
 * Narrowing a discriminated union on `!result.ok` needs strictNullChecks, and
 * this core is vendored into repos that do not all enable it — Falcon Pest
 * Control has `strict: false`, where TypeScript cannot see past `ok: true` and
 * the build fails on `result.reason`. An explicit cast reads the same in both.
 */
type TurnstileFailure = Extract<TurnstileResult, { ok: false }>;

export type GuardLayer = "origin" | "honeypot" | "timing" | "turnstile";

export type GuardVerdict =
  /**
   * Proceed. `verified` is false only on an `allowUnverified` site that took a
   * submission with no token — the caller should mark that lead accordingly.
   */
  | { outcome: "pass"; verified: boolean }
  /**
   * Drop silently: the caller must return its NORMAL success response and send
   * nothing. Used only where a human cannot plausibly land, so mirroring
   * success denies spammers the feedback they need to tune around the filter.
   */
  | { outcome: "silent-drop"; layer: GuardLayer }
  /** Tell the visitor. Every one of these is recoverable by a real person. */
  | { outcome: "reject"; status: number; message: string; layer: GuardLayer };

export interface RunGuardsInput {
  /** Request headers. Omit only in tests. */
  headers: Headers | undefined;
  /** Parsed JSON body, FormData, or URLSearchParams — all three work. */
  fields: FieldSource;
  config: FormGuardConfig;
  env?: NodeJS.ProcessEnv;
}

export const verificationFailedMessage = (config: FormGuardConfig) =>
  `We couldn't verify that submission. Please refresh the page and try again, or reach us at ${config.contactLabel}.`;

export const runGuards = async ({
  headers,
  fields,
  config,
  env = process.env,
}: RunGuardsInput): Promise<GuardVerdict> => {
  // 1. Origin ---------------------------------------------------------------
  if (!hasAcceptableOrigin(headers, config, env)) {
    console.warn("[form-guard] blocked layer=origin");
    return {
      outcome: "reject",
      status: 403,
      message: verificationFailedMessage(config),
      layer: "origin",
    };
  }

  const envelope = readAntiAbuseEnvelope(fields, config.honeypotField);

  // 2. Honeypot -------------------------------------------------------------
  if (envelope.honeypot.trim() !== "") {
    console.warn("[form-guard] blocked layer=honeypot");
    return { outcome: "silent-drop", layer: "honeypot" };
  }

  // 3. Timing ---------------------------------------------------------------
  // Absent elapsedMs is not a rejection: a real visitor whose JS partly failed
  // still deserves to reach Turnstile and get a visible error.
  if (envelope.elapsedMs !== null && envelope.elapsedMs < config.minElapsedMs) {
    console.warn("[form-guard] blocked layer=timing");
    return { outcome: "silent-drop", layer: "timing" };
  }

  // 4. Turnstile ------------------------------------------------------------
  if (!envelope.turnstileToken && config.allowUnverified) {
    // Progressive-enhancement sites only. Everything above still ran.
    console.warn("[form-guard] passed layer=turnstile unverified=true");
    return { outcome: "pass", verified: false };
  }

  const turnstile = await verifyTurnstileToken(
    envelope.turnstileToken,
    getClientIp(headers),
    { expectedHosts: allowedHosts(config), expectedAction: config.action },
    env
  );

  if (!turnstile.ok) {
    const failure = turnstile as TurnstileFailure;
    // Reason codes are Cloudflare's taxonomy plus our own; no submitter data.
    console.warn(`[form-guard] blocked layer=turnstile reason=${failure.reason}`, failure.detail ?? "");
    return {
      outcome: "reject",
      status: 403,
      message: verificationFailedMessage(config),
      layer: "turnstile",
    };
  }

  return { outcome: "pass", verified: true };
};
