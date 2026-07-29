import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { CtaBand } from "@/components/cta-band";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { tools } from "@/data/landingPages";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Four free tools for planning a printed wall: check whether the surface is ready, whether your artwork is big enough, what will move your quote, and whether we cover you.",
  alternates: { canonical: "/tools" },
};

/**
 * Hub page. Deliberately NOT a landing-page record — its job is to route people
 * onward, and forcing 900 words plus a gallery onto an index would be padding,
 * which is the thing the gate exists to prevent. It is registered explicitly in
 * sitemap.ts instead.
 */
export default function ToolsIndexPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-shell">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-red">
              Free to use, nothing gated
            </p>
            <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.95] text-balance text-ink-paper sm:text-6xl lg:text-7xl">
              Work out the answer before you ask anyone
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-ink-paper/72">
              Four things decide whether a wall printing project goes smoothly: the surface, the
              artwork, the things that move the price, and whether anyone can actually get to you.
              Each tool below answers one of them properly, with no email required and nothing held
              back until you hand over your details.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="page-shell">
          <Stagger className="grid gap-4 md:grid-cols-2">
            {tools.map((tool) => (
              <StaggerItem key={tool.pathname}>
                <Link
                  href={tool.pathname}
                  className="flex h-full flex-col rounded-[1.25rem] border border-ink-paper/10 bg-ink-paper/[0.04] p-7 transition hover:border-ink-gold/40"
                >
                  <h2 className="font-display text-3xl leading-tight text-ink-paper">{tool.title}</h2>
                  <p className="mt-4 flex-1 text-base leading-7 text-ink-paper/64">
                    {tool.metaDescription}
                  </p>
                  <ul className="mt-5 grid gap-2">
                    {tool.useWhen.slice(0, 3).map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-ink-paper/54">
                        <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-ink-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-ink-gold">
                    Open the tool
                    <ArrowRight size={17} />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-10 rounded-[1.25rem] border border-ink-paper/12 bg-ink-black/25 p-6">
            <p className="text-base leading-7 text-ink-paper/68">
              None of these will give you a price. Ink Blend quotes per wall rather than from a rate
              card, and a figure produced by a form that has never seen your surface would be a guess
              dressed up as an answer. The Quote Planner tells you what will move your number
              instead, and its comparison runs on quotes you have already been given.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
