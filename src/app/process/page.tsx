import type { Metadata } from "next";
import Image from "next/image";

import { CtaBand } from "@/components/cta-band";
import { ProcessTimeline } from "@/components/process-timeline";
import { QuoteForm } from "@/components/quote-form";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Process",
  description:
    "See Ink Blend's process for quote requests, mockups, artwork approval, UV wall printing, and final installation.",
};

export default function ProcessPage() {
  return (
    <>
      <section className="page-hero">
        <div className="absolute inset-0">
          <Image
            src="/media/placeholders/office-branding.jpg"
            alt="Office wall printing process"
            fill
            sizes="100vw"
            className="object-cover opacity-38"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/58 via-ink-black/80 to-ink-black" />
        </div>
        <div className="page-shell relative">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-red">
              Process
            </p>
            <h1 className="mt-5 max-w-5xl font-display text-6xl leading-[0.9] text-white sm:text-7xl">
              A clear path from wall photo to finished print.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/68">
              The workflow is built to reduce uncertainty: photos,
              measurements, concept direction, approvals, and production.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="page-shell">
          <ProcessTimeline />
        </div>
      </section>

      <section className="section-pad bg-white/[0.025]">
        <div className="page-shell grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <SectionHeading eyebrow="Start here" title="The better the input, the sharper the quote.">
            Upload photos, rough measurements, surface notes, timeline, and
            any design references you already like.
          </SectionHeading>
          <QuoteForm compact />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
