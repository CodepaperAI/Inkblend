import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

import { QuoteForm } from "@/components/quote-form";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Request an Ink Blend quote by uploading wall photos, measurements, budget range, timeline, and project notes.",
};

export default function GetQuotePage() {
  return (
    <>
      <section className="page-hero">
        <div className="absolute inset-0">
          <Image
            src="/media/placeholders/botanical-wall.jpg"
            alt="Request a wall printing quote"
            fill
            sizes="100vw"
            className="object-cover opacity-76"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-black/18 via-ink-black/42 to-ink-black/70" />
        </div>
        <div className="page-shell relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-red">
              Get a Quote
            </p>
            <h1 className="mt-5 max-w-5xl font-display text-5xl leading-[0.92] text-balance text-ink-paper sm:text-7xl">
              Upload the wall. Ink Blend maps the next step.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-ink-paper/68">
              Share photos, measurements, budget range, and project notes so the
              quote conversation can start with real context.
            </p>
          </Reveal>
          <Reveal className="rounded-[1.5rem] border border-ink-paper/10 bg-ink-paper/[0.05] p-6 backdrop-blur-xl">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-ink-gold">
              Helpful details
            </p>
            <div className="mt-5 grid gap-3">
              {[
                "Clear wall photos",
                "Rough width and height",
                "City and timeline",
                "Budget range",
                "Artwork or brand references",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-ink-paper/70">
                  <CheckCircle2 size={18} className="text-ink-gold" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="page-shell">
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
