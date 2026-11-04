import type { FormGuardConfig } from "@/lib/form-guard/types";
import { siteConfig } from "@/lib/site";

/**
 * Per-site form guard settings. This is the only file in the guard that differs
 * between client sites — everything under `lib/form-guard/` is byte-identical
 * fleet-wide, which is what makes drift detectable with a checksum.
 */
export const formGuardConfig: FormGuardConfig = {
  canonicalHost: "inkblend.ca",
  honeypotField: "company",
  minElapsedMs: 3000,
  action: "quote",
  // Email as the fallback: a blocked submitter may be a bot, and a written
  // channel keeps the response off the phone line.
  contactLabel: siteConfig.email,
  contactHref: `mailto:${siteConfig.email}`,
};
