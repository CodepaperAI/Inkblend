import { Star } from "lucide-react";

import type { reviews } from "@/lib/site";

type Review = (typeof reviews)[number];

export function ReviewCard({
  review,
  className = "",
  plain = false,
}: {
  review: Review;
  className?: string;
  /** No border/background/padding, for use inside a parent box. */
  plain?: boolean;
}) {
  return (
    <figure
      className={`flex flex-col ${
        plain ? "" : "rounded-[1.5rem] border border-ink-paper/10 bg-ink-paper/[0.04] p-6 sm:p-7"
      } ${className}`}
    >
      <div className="flex items-center gap-2">
        <span className="flex gap-0.5 text-ink-gold" role="img" aria-label={`${review.rating} out of 5 stars`}>
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} size={16} fill="currentColor" aria-hidden />
          ))}
        </span>
        <span className="text-sm font-bold text-ink-paper">{review.rating.toFixed(1)}</span>
      </div>
      <blockquote className="mt-4 flex-1 text-base leading-7 text-ink-paper/80">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 text-sm font-bold text-ink-paper">{review.name}</figcaption>
    </figure>
  );
}
