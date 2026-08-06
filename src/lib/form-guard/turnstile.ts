/**
 * Server-side Cloudflare Turnstile verification.
 *
 * This is the primary gate on a public form endpoint. Everything else in the
 * stack raises the cost of spamming; this is the layer a scripted client cannot
 * pass, because it cannot mint a token without solving the challenge in a
 * browser.
 *
 * Ported from Palacio (PalacioNext-Js @ d219482). Changed here: siteverify's
 * `hostname` and `action` are now asserted rather than discarded — see
 * `verifyTurnstileToken` below.
 */

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** Cloudflare's documented always-passes test pair, for local dev and previews. */
export const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";
export const TURNSTILE_TEST_SECRET_KEY = "1x0000000000000000000000000000000AA";

export type TurnstileResult =
  | { ok: true }
  | {
      ok: false;
      reason: "not-configured" | "missing-token" | "rejected" | "wrong-origin" | "unreachable";
      detail?: string;
    };

interface SiteVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
  hostname?: string;
  action?: string;
  metadata?: {
    /** Cloudflare sets this when the request used one of the public test keys. */
    result_with_testing_key?: boolean;
  };
}

export interface TurnstileExpectations {
  /**
   * Hostnames the token may have been solved on, bare (no "www."). A token
   * minted on one site must not verify on another — which matters as soon as
   * two sites share a widget, and costs nothing when they don't.
   */
  expectedHosts: string[];
  /** The `action` the widget was rendered with. */
  expectedAction: string;
}

const bareHost = (host: string) => host.trim().toLowerCase().replace(/^www\./, "");

/**
 * Verifies a Turnstile token.
 *
 * Fails **closed** when the secret is unset: a misconfigured deploy must not
 * silently reopen the endpoint as an unauthenticated email relay, which is the
 * exact state that caused the spam in the first place.
 */
export const verifyTurnstileToken = async (
  token: string,
  remoteIp: string | null,
  expectations: TurnstileExpectations,
  env: NodeJS.ProcessEnv = process.env
): Promise<TurnstileResult> => {
  const secret = env.TURNSTILE_SECRET_KEY?.trim() ?? "";

  if (!secret) {
    console.error("[form-guard] TURNSTILE_SECRET_KEY is not set — rejecting submission.");
    return { ok: false, reason: "not-configured" };
  }

  if (!token) {
    return { ok: false, reason: "missing-token" };
  }

  const body = new URLSearchParams({ secret, response: token });

  // Binds the token to the solver's IP where we have one. Cloudflare ignores it
  // when absent, so it is safe to omit behind proxies that strip the header.
  if (remoteIp) {
    body.set("remoteip", remoteIp);
  }

  let response: Response;

  try {
    response = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(8000),
    });
  } catch (error) {
    console.error("[form-guard] Turnstile verification request failed:", error);
    return { ok: false, reason: "unreachable" };
  }

  if (!response.ok) {
    return { ok: false, reason: "unreachable", detail: `siteverify returned ${response.status}` };
  }

  let result: SiteVerifyResponse;

  try {
    result = (await response.json()) as SiteVerifyResponse;
  } catch {
    return { ok: false, reason: "unreachable", detail: "siteverify returned a non-JSON body" };
  }

  if (!result.success) {
    // Error codes are Cloudflare's own taxonomy (e.g. timeout-or-duplicate); no
    // submitter data is included, so this is safe to log.
    return { ok: false, reason: "rejected", detail: result["error-codes"]?.join(", ") };
  }

  // The public test keys report hostname "example.com" and carry no action, so
  // asserting either against them would reject every preview and local
  // submission. Cloudflare flags those responses itself, which is a far more
  // reliable signal than sniffing the secret string.
  if (result.metadata?.result_with_testing_key) {
    return { ok: true };
  }

  if (result.hostname) {
    const solvedOn = bareHost(result.hostname);
    const allowed = expectations.expectedHosts.map(bareHost);

    // Vercel preview deployments. Cloudflare will not issue a token for a
    // hostname absent from the widget, so this only ever matches when the
    // widget was deliberately configured to cover previews.
    if (!allowed.includes(solvedOn) && !solvedOn.endsWith(".vercel.app")) {
      return { ok: false, reason: "wrong-origin", detail: `solved on ${solvedOn}` };
    }
  }

  if (result.action && result.action !== expectations.expectedAction) {
    return { ok: false, reason: "wrong-origin", detail: `action ${result.action}` };
  }

  return { ok: true };
};
