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
  // Email rather than `siteConfig.phone`, which is +1 (647) 555-0148 — inside
  // the 555-01XX range reserved for fiction. Sending a blocked customer to a
  // number that cannot ring is worse than giving them no fallback at all.
  contactLabel: siteConfig.email,
  contactHref: `mailto:${siteConfig.email}`,
};
