/**
 * Reads the anti-abuse envelope off a submission.
 *
 * Deliberately zod-free, for two reasons.
 *
 * 1. zod cannot be relied on across the fleet. Honeybloom and Inkblend carry
 *    zod only transitively (it is absent from their package.json), Falcon
 *    declares v3, Devarshi uses v4-only APIs, and Btown has none at all. A
 *    lockfile change could remove it from two live sites.
 *
 * 2. The reference implementation parsed this envelope with
 *    `antiAbuseSchema.safeParse` where `elapsedMs` was `z.number()`. FormData
 *    delivers every value as a string, so on a multipart form "45000" fails the
 *    check, the whole envelope parse fails, and the pipeline returns its
 *    silent-success branch: HTTP 200, no email, no error logged anywhere. Every
 *    lead on Inkblend and Devarshi would have vanished with no trace. This
 *    reader coerces instead, and cannot fail.
 *
 * Nothing here rejects. It reads three values and clamps them; the decisions
 * live in `guard.ts`.
 */

/** Anything a route can hand us: parsed JSON, FormData, or URLSearchParams. */
export type FieldSource = FormData | URLSearchParams | Record<string, unknown>;

export interface AntiAbuseEnvelope {
  /** Honeypot value. Always "" for a real visitor. */
  honeypot: string;
  /** Milliseconds between form mount and submit; null when absent or unreadable. */
  elapsedMs: number | null;
  /** May legitimately be "" — see `guard.ts`. */
  turnstileToken: string;
}

const MAX_HONEYPOT_LENGTH = 200;
const MAX_TOKEN_LENGTH = 2048;
/** One day. Anything beyond this is a clock problem, not a submission. */
const MAX_ELAPSED_MS = 86_400_000;

/** Reads one field from any of the three shapes a route might hold. */
export const readField = (source: FieldSource, name: string): unknown => {
  if (typeof FormData !== "undefined" && source instanceof FormData) return source.get(name);
  if (typeof URLSearchParams !== "undefined" && source instanceof URLSearchParams) {
    return source.get(name);
  }
  return (source as Record<string, unknown>)[name];
};

const readString = (value: unknown, maxLength: number): string => {
  if (typeof value !== "string") return "";
  return value.slice(0, maxLength);
};

const readElapsedMs = (value: unknown): number | null => {
  const numeric =
    typeof value === "number"
      ? value
      : typeof value === "string" && value.trim() !== ""
        ? Number(value)
        : Number.NaN;

  if (!Number.isFinite(numeric) || numeric < 0 || numeric > MAX_ELAPSED_MS) return null;

  return numeric;
};

export const readAntiAbuseEnvelope = (
  source: FieldSource,
  honeypotField: string
): AntiAbuseEnvelope => ({
  honeypot: readString(readField(source, honeypotField), MAX_HONEYPOT_LENGTH),
  elapsedMs: readElapsedMs(readField(source, "elapsedMs")),
  turnstileToken: readString(readField(source, "turnstileToken"), MAX_TOKEN_LENGTH),
});
