import type { Metadata } from "next";
import Image from "next/image";

import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq-list";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common Ink Blend questions about UV wall printing, quotes, artwork, durability, and project fit.",
};

export default function FaqPage() {
  return (
    <>
      <section className="page-hero">
        <div className="absolute inset-0">
          <Image
            src="/media/placeholders/art-wall.jpg"
            alt="Custom wall art"
            fill
            sizes="100vw"
            className="object-cover opacity-72"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-black/18 via-ink-black/42 to-ink-black/70" />
        </div>
        <div className="page-shell relative">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-red">
              FAQ
            </p>
            <h1 className="mt-5 max-w-5xl font-display text-5xl leading-[0.92] text-balance text-ink-paper sm:text-7xl">
              Questions before you print.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-ink-paper/68">
              Quick answers for project planning, quoting, artwork preparation,
              durability, and whether your wall is a fit.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="page-shell max-w-4xl">
          <FaqList />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
