/**
 * Per-site configuration for the form guard.
 *
 * Every value that differs between client sites lives here and nowhere else.
 * That is the whole point of this file: the other modules in this directory are
 * byte-identical across every site, so `sha256sum lib/form-guard/*.ts` is the
 * drift detector for the fleet.
 */
export interface FormGuardConfig {
  /**
   * Canonical production hostname, e.g. "honeybloombeauty.com".
   * A leading "www." is implied and does not need listing.
   */
  canonicalHost: string;

  /**
   * Any other hostname allowed to post to this endpoint — an alternate domain,
   * a migrated-from domain. "www." is implied on each.
   */
  additionalHosts?: string[];

  /**
   * Name of the honeypot input. Palacio uses "company"; Devarshi's existing
   * field is "companyUrl". Kept configurable so a site's current markup does
   * not have to change.
   */
  honeypotField: string;

  /** Minimum milliseconds between form mount and submit for a plausible human. */
  minElapsedMs: number;

  /**
   * Turnstile action label. Asserted against what siteverify reports, so a
   * token minted for one form cannot be replayed against another.
   */
  action: string;

  /**
   * A way to reach the business, surfaced whenever a check fails so a real
   * person blocked by the guard is never left at a dead end.
   *
   * Not necessarily a phone number: Inkblend's site config carries a
   * placeholder in the reserved 555-01XX fictional range, so pointing blocked
   * customers at it would be worse than useless. Each site supplies whatever
   * channel is actually monitored.
   */
  contactLabel: string;
  /** `tel:`, `mailto:`, or an https link — whatever `contactLabel` refers to. */
  contactHref: string;

  /**
   * Accept submissions carrying no Turnstile token.
   *
   * Only for progressive-enhancement forms that must keep working without
   * JavaScript (Devarshi's Astro form). This IS a bypass — a scripted POST with
   * a correct Origin gets through — so everything else still runs and the caller
   * is told the submission was unverified. Off everywhere else.
   */
  allowUnverified?: boolean;
}
