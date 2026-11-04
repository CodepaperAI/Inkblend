import { ReviewCard } from "@/components/review-card";
import { reviews } from "@/lib/site";

/**
 * One row of reviews sliding left, forever. The list is rendered twice and the
 * track moves by exactly half its width, so the loop has no visible seam. The
 * second copy is aria-hidden so screen readers hear each review once. Pure CSS:
 * no JS runs, and it pauses on hover/focus and under prefers-reduced-motion
 * (where the row becomes a normal horizontal scroller).
 */
export function ReviewsMarquee() {
  return (
    <div className="marquee-viewport" role="region" aria-label="Customer reviews" tabIndex={0}>
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-5 pr-5" aria-hidden={copy === 1 || undefined}>
            {reviews.map((review) => (
              <ReviewCard key={review.name} review={review} className="w-[320px] sm:w-[380px]" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
