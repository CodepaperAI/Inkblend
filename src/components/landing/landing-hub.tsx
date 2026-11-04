import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CtaBand } from "@/components/cta-band";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import type { LandingPage } from "@/data/landingPages/types";

interface LandingHubProps {
  readonly eyebrow: string;
  readonly h1: string;
  readonly answer: string;
  readonly records: readonly LandingPage[];
  readonly labelFor: (record: LandingPage) => string;
}

/** Hub page for a spoke family: one answer-first paragraph, then every spoke. */
export function LandingHub({ eyebrow, h1, answer, records, labelFor }: LandingHubProps) {
  return (
    <>
      <section className="page-hero">
        <div className="page-shell relative">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-red">{eyebrow}</p>
            <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.95] text-balance text-ink-paper sm:text-7xl">
              {h1}
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-ink-paper/72">{answer}</p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="page-shell">
          <Stagger className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {records.map((record) => (
              <StaggerItem key={record.pathname}>
                <Link
                  href={record.pathname}
                  className="group block overflow-hidden rounded-[1.5rem] border border-ink-paper/10 bg-ink-paper/[0.04] transition hover:-translate-y-1 hover:border-ink-paper/25"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={record.hero.src}
                      alt={record.hero.alt}
                      fill
                      sizes="(min-width:1280px) 33vw, (min-width:768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="font-display text-3xl leading-tight text-ink-paper">{labelFor(record)}</h2>
                    <p className="mt-3 text-sm leading-7 text-ink-paper/70">{record.metaDescription}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-ink-red">
                      View page
                      <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
