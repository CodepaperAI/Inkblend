import type { Metadata } from "next";

import { CtaBand } from "@/components/cta-band";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { ReviewCard } from "@/components/review-card";
import { reviews } from "@/lib/site";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description:
    "Read what homeowners, restaurants and offices say about Ink Blend's UV wall printing, custom murals and branded feature walls.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-shell relative">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-red">Reviews</p>
            <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.95] text-balance text-ink-paper sm:text-7xl">
              What clients say about Ink Blend
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-ink-paper/72">
              Homes, offices and restaurants across Ontario, in their own words.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="page-shell">
          <Stagger className="grid gap-5 md:grid-cols-2">
            {reviews.map((review) => (
              <StaggerItem key={review.name} className="h-full">
                <ReviewCard review={review} className="h-full" />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
