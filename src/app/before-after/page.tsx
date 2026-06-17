import type { Metadata } from "next";
import Image from "next/image";

import { BeforeAfterSlider } from "@/components/before-after-slider";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Before & After",
  description:
    "Compare blank walls and finished visual branding concepts with Ink Blend before and after project sliders.",
};

export default function BeforeAfterPage() {
  return (
    <>
      <section className="page-hero">
        <div className="absolute inset-0">
          <Image
            src="/media/placeholders/luxury-feature.jpg"
            alt="Before and after feature wall"
            fill
            sizes="100vw"
            className="object-cover opacity-74"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-black/18 via-ink-black/42 to-ink-black/70" />
        </div>
        <div className="page-shell relative">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-red">
              Before & After
            </p>
            <h1 className="mt-5 max-w-5xl font-display text-5xl leading-[0.92] text-balance text-ink-paper sm:text-7xl">
              Show the transformation before clients ask.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-ink-paper/68">
              These sliders are ready for real site photos, renovation reveals,
              branded room upgrades, and mural installation comparisons.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Interactive comparison"
            title="Move the slider to reveal the finished wall."
            align="center"
          />
          <div className="mt-12">
            <BeforeAfterSlider />
          </div>
        </div>
      </section>

      <section className="section-pad bg-ink-paper/[0.025]">
        <div className="page-shell grid gap-6 lg:grid-cols-3">
          {[
            [
              "Residential mural",
              "Turn a plain bedroom, media room, or entry wall into a custom art moment.",
            ],
            [
              "Commercial brand wall",
              "Show a business interior moving from generic to memorable.",
            ],
            [
              "Hospitality feature",
              "Document restaurant, cafe, lounge, and hotel spaces before and after print.",
            ],
          ].map(([title, body]) => (
            <Reveal key={title}>
              <article className="min-h-[230px] rounded-[1.25rem] border border-ink-paper/10 bg-ink-paper/[0.04] p-6">
                <h2 className="font-display text-4xl text-ink-paper">{title}</h2>
                <p className="mt-5 text-base leading-8 text-ink-paper/62">{body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
