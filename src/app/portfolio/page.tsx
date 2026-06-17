import type { Metadata } from "next";
import Image from "next/image";

import { CtaBand } from "@/components/cta-band";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse Ink Blend portfolio categories for restaurants, cafes, offices, retail stores, residential projects, cultural artwork, and luxury interiors.",
};

export default function PortfolioPage() {
  return (
    <>
      <section className="page-hero">
        <div className="absolute inset-0">
          <Image
            src="/media/placeholders/botanical-wall.jpg"
            alt="Wall mural portfolio"
            fill
            sizes="100vw"
            className="object-cover opacity-76"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-black/18 via-ink-black/42 to-ink-black/70" />
        </div>
        <div className="page-shell relative">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-red">
              Portfolio
            </p>
            <h1 className="mt-5 max-w-5xl font-display text-5xl leading-[0.92] text-balance text-ink-paper sm:text-7xl">
              A gallery system built for real Ink Blend work.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-ink-paper/68">
              Filter by project type, open larger previews, and replace
              placeholders with completed project photography when ready.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="page-shell">
          <PortfolioGrid />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
