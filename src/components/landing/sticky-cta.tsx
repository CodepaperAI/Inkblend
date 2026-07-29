"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { CtaLink } from "./cta-link";

/**
 * Appears once the visitor is ~35% down the page, and is dismissible.
 * Rendered at both breakpoints — mobile is where most of these leads arrive.
 *
 * Mounted state gates the scroll listener so the server and first client render
 * agree (both render nothing), which keeps this out of hydration's way.
 */
export function StickyCta({ page }: { readonly page: string }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      setVisible(window.scrollY / scrollable > 0.35);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  if (dismissed || !visible) return null;

  return (
    // z-30 keeps this UNDER SiteShell's FloatingContact buttons (z-40, fixed
    // bottom-5 right-5), and the right padding reserves the strip they occupy
    // so nothing here ends up underneath them. Without both, the dismiss button
    // sits directly beneath the WhatsApp bubble at every breakpoint.
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink-paper/12 bg-ink-black/92 px-4 py-3 backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center gap-3 pr-[4.5rem] sm:pr-[5rem]">
        <p className="hidden flex-1 text-sm text-ink-paper/70 sm:block">
          Send a photo of the wall and we will tell you what it needs.
        </p>
        <CtaLink
          href="#quote"
          location="sticky"
          page={page}
          className="btn-primary flex-1 justify-center py-3 text-sm sm:flex-none"
        >
          Get a Quote
        </CtaLink>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="grid size-9 shrink-0 place-items-center rounded-full border border-ink-paper/15 text-ink-paper/60 transition hover:text-ink-paper"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
