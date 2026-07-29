"use client";

import { track } from "@vercel/analytics";
import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Every CTA on a landing page fires exactly one event with a CLOSED UNION
 * location label. Pageviews alone cannot tell you which surface converts, and
 * an open string field turns into a mess of near-duplicate labels within a
 * month.
 */
export type CtaLocation =
  | "hero"
  | "fact-table"
  | "sticky"
  | "related"
  | "form-inline"
  | "footer-band";

interface CtaLinkProps {
  readonly href: string;
  readonly location: CtaLocation;
  readonly page: string;
  readonly className?: string;
  readonly children: ReactNode;
}

export function CtaLink({ href, location, page, className, children }: CtaLinkProps) {
  const onClick = () => track("cta_click", { location, page, href });

  // Anchors and tel: links must not go through the client router.
  if (href.startsWith("#") || href.startsWith("tel:") || href.startsWith("http")) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
