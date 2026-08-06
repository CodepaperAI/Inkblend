"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

/**
 * Cloudflare Turnstile widget.
 *
 * Rendered explicitly rather than via the auto-scanning `cf-turnstile` class so
 * that two instances on one page cannot collide, and so the script is fetched
 * exactly once no matter how many forms mount.
 *
 * Ported from Palacio (PalacioNext-Js @ d219482). Changed here: the fallback
 * contact and the `action` label are props rather than hardcoded, and a failed
 * or expired challenge says so instead of silently disabling the submit button.
 *
 * No npm package — this is ~170 lines against Cloudflare's own script, which is
 * why adding the guard to a site costs zero new dependencies.
 */

interface TurnstileRenderOptions {
  sitekey: string;
  callback: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
  "timeout-callback"?: () => void;
  theme?: "light" | "dark" | "auto";
  action?: string;
}

interface TurnstileApi {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

/** Module-level so the script is requested once per page, not once per widget. */
let scriptPromise: Promise<void> | null = null;

const loadTurnstileScript = (): Promise<void> => {
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    if (window.turnstile) {
      resolve();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);

    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Turnstile script failed to load")));
      return;
    }

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", () => resolve());
    script.addEventListener("error", () => {
      // Let a later mount retry rather than caching the failure forever.
      scriptPromise = null;
      reject(new Error("Turnstile script failed to load"));
    });
    document.head.appendChild(script);
  });

  return scriptPromise;
};

export interface TurnstileHandle {
  /** Tokens are single-use, so the widget must be reset after every submit attempt. */
  reset: () => void;
}

interface TurnstileWidgetProps {
  siteKey: string;
  /** Must match the `action` in the site's form-guard config — it is asserted server-side. */
  action: string;
  /**
   * Shown in the fallback copy so a blocked visitor still has a way to reach
   * the business. Not assumed to be a phone number — some sites' only
   * monitored channel is email.
   */
  contactLabel: string;
  contactHref: string;
  onVerify: (token: string) => void;
  /** Fired when the challenge errors, expires, or the script cannot load. */
  onUnavailable: () => void;
  theme?: "light" | "dark" | "auto";
  className?: string;
}

const TurnstileWidget = forwardRef<TurnstileHandle, TurnstileWidgetProps>(
  (
    { siteKey, action, contactLabel, contactHref, onVerify, onUnavailable, theme = "light", className },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    /**
     * "errored" covers the case that actually bit us in production: a widget
     * whose hostname list does not include the site's domain fails with
     * Cloudflare error 110200. The challenge never renders, so the token stays
     * empty and the submit button stays disabled — previously with nothing on
     * screen to explain why. A misconfigured widget must not read as a dead
     * button; the visitor gets a reason and a way to reach the business.
     */
    const [status, setStatus] = useState<"ok" | "load-failed" | "errored" | "expired">("ok");

    // Held in refs so re-renders never force the widget to tear down and
    // re-render, which would discard a token the visitor already solved.
    const onVerifyRef = useRef(onVerify);
    const onUnavailableRef = useRef(onUnavailable);
    onVerifyRef.current = onVerify;
    onUnavailableRef.current = onUnavailable;

    const resetWidget = () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
      setStatus("ok");
    };

    useImperativeHandle(ref, () => ({ reset: resetWidget }));

    useEffect(() => {
      let cancelled = false;

      loadTurnstileScript()
        .then(() => {
          if (cancelled || !containerRef.current || !window.turnstile) return;
          // Guard against React's double-invoked effects in development.
          if (widgetIdRef.current) return;

          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            action,
            // Pinned rather than left on Cloudflare's "auto", which follows the
            // visitor's OS dark-mode setting and can render a black box on a
            // light-coloured site.
            theme,
            callback: (token) => {
              setStatus("ok");
              onVerifyRef.current(token);
            },
            // Fires on a misconfigured widget (wrong hostname), a blocked
            // challenges.cloudflare.com, or a network fault. Nothing the visitor
            // can retry their way out of, so say so and give them a way through.
            "error-callback": () => {
              setStatus("errored");
              onUnavailableRef.current();
            },
            // Tokens expire after ~5 minutes. A form left open — a modal, a long
            // page — hits this, and without the visible notice below the submit
            // button just goes dead with no explanation.
            "expired-callback": () => {
              setStatus("expired");
              onUnavailableRef.current();
            },
            "timeout-callback": () => {
              setStatus("expired");
              onUnavailableRef.current();
            },
          });
        })
        .catch(() => {
          if (cancelled) return;
          setStatus("load-failed");
          onUnavailableRef.current();
        });

      return () => {
        cancelled = true;

        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }
      };
    }, [siteKey, action, theme]);

    const reachUs = (
      <>
        or reach us at{" "}
        <a href={contactHref} className="underline">
          {contactLabel}
        </a>
      </>
    );

    // The script never loaded, so the container would stay empty forever.
    if (status === "load-failed") {
      return (
        <p className="form-guard-error">
          The security check could not load. Please refresh the page, {reachUs}.
        </p>
      );
    }

    return (
      <div className={className}>
        {/* Kept mounted on error so a transient fault can still recover. */}
        <div ref={containerRef} />
        {status === "errored" ? (
          <p className="form-guard-error">
            The security check is unavailable, so this form can&rsquo;t be submitted right now.
            Please try refreshing, {reachUs}.
          </p>
        ) : null}
        {status === "expired" ? (
          <p className="form-guard-error">
            The security check expired.{" "}
            <button type="button" onClick={resetWidget} className="underline">
              Tap to verify again
            </button>
            .
          </p>
        ) : null}
      </div>
    );
  }
);

TurnstileWidget.displayName = "TurnstileWidget";

export default TurnstileWidget;
