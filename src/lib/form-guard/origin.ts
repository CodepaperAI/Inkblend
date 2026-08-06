/**
 * Origin allowlist and client-IP resolution.
 *
 * A determined attacker can forge an Origin header, so this is a cheap filter
 * rather than a real gate — Turnstile is the gate. It costs nothing and removes
 * the large class of scripts that post without setting any browser headers.
 *
 * Ported from Palacio (PalacioNext-Js @ d219482), with the hardcoded
 * "palacioeventcentre.com" replaced by config.
 */

import type { FormGuardConfig } from "./types";

const bareHost = (host: string) => host.trim().toLowerCase().replace(/^www\./, "");

/** Every hostname permitted to post to this site's endpoints, bare. */
export const allowedHosts = (config: FormGuardConfig): string[] =>
  [config.canonicalHost, ...(config.additionalHosts ?? [])].filter(Boolean).map(bareHost);

const isAllowedOrigin = (
  rawUrl: string,
  config: FormGuardConfig,
  env: NodeJS.ProcessEnv
): boolean => {
  let host: string;

  try {
    host = new URL(rawUrl).hostname.toLowerCase();
  } catch {
    return false;
  }

  const bare = bareHost(host);

  if (allowedHosts(config).includes(bare)) return true;
  // Vercel preview deployments.
  if (host.endsWith(".vercel.app")) return true;
  if (env.NODE_ENV !== "production" && (host === "localhost" || host === "127.0.0.1")) return true;

  return false;
};

/**
 * Deliberately lenient: only rejects when a header is present *and* wrong.
 * When neither header exists we fall through to Turnstile rather than risk
 * blocking a real visitor behind a privacy proxy that strips them.
 *
 * Reads headers only, never the body — so a route handling large multipart
 * uploads can call this *before* buffering the request, and refuse a wrong
 * origin without paying for the bytes.
 */
export const hasAcceptableOrigin = (
  headers: Headers | undefined,
  config: FormGuardConfig,
  env: NodeJS.ProcessEnv = process.env
): boolean => {
  if (!headers) return true;

  const origin = headers.get("origin");
  if (origin) return isAllowedOrigin(origin, config, env);

  const referer = headers.get("referer");
  if (referer) return isAllowedOrigin(referer, config, env);

  return true;
};

/**
 * Resolves the client IP from proxy headers.
 *
 * `NextRequest.ip` was removed in Next 15, and this needs to work on Astro's
 * plain `Request` too, so both read the forwarded headers directly.
 */
export const getClientIp = (headers: Headers | undefined): string | null => {
  if (!headers) return null;

  const forwardedFor = headers.get("x-forwarded-for");

  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }

  return headers.get("x-real-ip")?.trim() || null;
};
