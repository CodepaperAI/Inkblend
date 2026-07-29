import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

import { QuoteForm } from "@/components/quote-form";
import { Reveal } from "@/components/reveal";
import { RenderTool } from "@/components/tools/render-tool";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Request an Ink Blend quote by uploading wall photos, measurements, budget range, timeline, and project notes.",
};

/**
 * `searchParams` is read here, on the server, and passed down as props. The
 * tools link in with ?source=&notes= so a visitor arrives with their result
 * already in the form. Reading the params inside QuoteForm instead would force
 * every page rendering that form into client rendering.
 */
export default async function GetQuotePage({
  searchParams,
}: {
  searchParams: Promise<{ source?: string; notes?: string }>;
}) {
  const { source, notes } = await searchParams;

  return (
    <>
      <section className="page-hero">
        <div className="absolute inset-0">
          <Image
            src="/media/placeholders/handpainted-crane-mural-restaurant.jpg"
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
          <QuoteForm sourcePage={source} prefillNotes={notes} />
        </div>
      </section>

      {/* Not everyone arrives from a tool. Give them the planner here. */}
      <section className="section-pad bg-ink-paper/[0.025]">
        <div className="page-shell">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-red">
              Not sure what to put in the budget field?
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl leading-none text-ink-paper sm:text-5xl">
              Work out what will move your number first
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-ink-paper/62">
              Five questions, and you will know which parts of your project actually drive the price
              — plus a comparison that runs on quotes you have already been given.
            </p>
          </Reveal>
          <div className="mt-8">
            <RenderTool toolId="quote-planner" sourcePage="get-quote" compact />
          </div>
        </div>
      </section>
    </>
  );
}
