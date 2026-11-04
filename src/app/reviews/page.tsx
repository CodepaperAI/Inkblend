import type { Metadata } from "next";
import Image from "next/image";

import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
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
        <div className="absolute inset-0">
          <Image
            src="/media/placeholders/handpainted-crane-mural-restaurant.jpg"
            alt="Hand-painted crane mural on a restaurant wall"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Cream wash on the left keeps the heading readable; the photo shows at full strength on the right. */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink-black/92 via-ink-black/60 to-ink-black/0" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-black to-transparent" />
        </div>
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

      <section className="section-pad">
        <div className="page-shell grid gap-6 md:grid-cols-2">
          {[reviews.slice(0, 3), reviews.slice(3)].map((column, i) => (
            <Reveal key={i}>
              <div className="h-full divide-y divide-ink-paper/10 rounded-[1.5rem] border border-ink-paper/10 bg-ink-paper/[0.04] px-6 sm:px-8">
                {column.map((review) => (
                  <ReviewCard key={review.name} review={review} plain className="py-7" />
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
