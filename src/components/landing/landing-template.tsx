"use client";

import { ArrowRight, CheckCircle2, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { CtaLink } from "@/components/landing/cta-link";
import { StickyCta } from "@/components/landing/sticky-cta";
import { QuoteForm } from "@/components/quote-form";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { iconRegistry } from "@/data/landingPages/iconRegistry";
import type { Segment } from "@/data/landingPages/linking";
import type { LandingPage, LandingPageSummary } from "@/data/landingPages/types";

/**
 * The single landing-page template, shared by the city and industry families.
 *
 * TWO INVARIANTS — both have bitten real builds:
 *
 * 1. This file must NEVER import `@/data/landingPages` (the registry). Doing so
 *    ships every record — sections, FAQs, galleries — into this component's
 *    bundle, and therefore into every landing page. The route resolves one
 *    record server-side and passes it in as a prop.
 *
 * 2. This file must NEVER render a client-side SEO/head component. The route
 *    owns `generateMetadata` and the JSON-LD. Head output written from a client
 *    effect is invisible to crawlers that do not execute JavaScript.
 *
 * The families share a layout because the differentiation that matters is in
 * the DATA, not the markup — measured pairwise similarity across the 12 pages
 * is 0.90% against a 30% ceiling. Shared layout is not what a doorway penalty
 * targets; shared copy is.
 *
 * FAQs use native <details>/<summary> rather than an accordion library.
 * Radix-style accordions unmount closed content, which would leave the answers
 * absent from the server-rendered HTML — fatal on a page whose whole purpose is
 * answering those questions.
 */
interface LandingTemplateProps {
  readonly record: LandingPage;
  readonly related: readonly LandingPageSummary[];
  /** Resolved server-side in one pure pass. See linking.ts for why. */
  readonly linkedSections: readonly Segment[][][];
  /**
   * The interactive widget. On a tool page it sits directly under the hero,
   * because it is the point of the page. On a city or industry page it is a
   * compact embed placed after the fact table, introduced by that record's own
   * `toolPrompt` — see the note on that field in types.ts for why the prompt
   * has to be unique per page.
   */
  readonly tool?: ReactNode;
}

function Paragraph({ segments }: { readonly segments: readonly Segment[] }) {
  return (
    <p className="text-base leading-8 text-ink-paper/68">
      {segments.map((segment, index) =>
        segment.href ? (
          <Link
            key={index}
            href={segment.href}
            className="text-ink-gold underline decoration-ink-gold/35 underline-offset-4 transition hover:decoration-ink-gold"
          >
            {segment.text}
          </Link>
        ) : (
          <span key={index}>{segment.text}</span>
        ),
      )}
    </p>
  );
}

export function LandingTemplate({
  record,
  related,
  linkedSections,
  tool,
}: LandingTemplateProps) {
  const eyebrow =
    record.family === "city"
      ? `${record.city}, ${record.province}`
      : record.family === "industry"
        ? record.industry
        : "Interactive tool";

  const listHeading =
    record.family === "city"
      ? "Areas we get asked about"
      : record.family === "industry"
        ? "Spaces this covers"
        : "When to reach for this";

  const listItems: readonly string[] =
    record.family === "city"
      ? record.districts
      : record.family === "industry"
        ? record.spaceTypes
        : record.useWhen;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="absolute inset-0">
          <Image
            src={record.hero.src}
            alt={record.hero.alt}
            fill
            sizes="100vw"
            className="object-cover opacity-[0.86]"
            priority
          />
          {/*
            NOTE ON THE COLOUR TOKENS: the beige refresh inverted these without
            renaming them. --ink-black is CREAM (#efe2cc) and --ink-paper is
            DARK BROWN (#241812). So this is a *lightening* scrim behind dark
            text, not a darkening one.

            Weighted to the left because the copy is left-aligned — matching
            src/components/hero.tsx. A uniform low-opacity wash (which is what
            /services/[slug] uses) leaves a long intro paragraph unreadable over
            a bright image, and several of these heroes are bright.
          */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(239,226,204,0.95)_0%,rgba(239,226,204,0.84)_46%,rgba(239,226,204,0.38)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-black to-transparent" />
        </div>
        <div className="page-shell relative">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-red">
              {eyebrow}
            </p>
            <h1 className="mt-5 max-w-5xl font-display text-5xl leading-[0.95] text-balance text-ink-paper sm:text-6xl lg:text-7xl">
              {record.h1}
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-ink-paper/72">{record.intro}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CtaLink
                href="#quote"
                location="hero"
                page={record.formSourceId}
                className="btn-primary justify-center"
              >
                Get a Quote
                <ArrowRight size={18} />
              </CtaLink>
              {/*
                Deliberately NOT a tel: link. siteConfig.phone is currently
                (647) 555-0148, which sits inside the NANP block reserved for
                fictional numbers. It is already live in the header, footer and
                contact page; these 12 new pages must not spread it further.
                Swap this for a click-to-call once a real number exists —
                in-content click-to-call converts well and should be here.
              */}
              <CtaLink
                href="/contact"
                location="hero"
                page={record.formSourceId}
                className="btn-secondary justify-center"
              >
                <MessageSquare size={18} />
                Talk to the team
              </CtaLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── The widget, when this IS a tool page ─────────────────────────── */}
      {tool && record.family === "tool" ? (
        <section className="section-pad">
          <div className="page-shell">
            <Reveal>
              <h2 className="max-w-3xl font-display text-4xl leading-none text-ink-paper sm:text-5xl">
                {record.toolHeading}
              </h2>
            </Reveal>
            <div className="mt-8">{tool}</div>
          </div>
        </section>
      ) : null}

      {/* ── Benefits ─────────────────────────────────────────────────────── */}
      <section className="section-pad">
        <div className="page-shell grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-red">
              What this means in practice
            </p>
            <h2 className="mt-4 font-display text-4xl leading-none text-ink-paper sm:text-5xl">
              {listHeading}
            </h2>
            <ul className="mt-6 space-y-2">
              {listItems.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-7 text-ink-paper/62">
                  <CheckCircle2 className="mt-1 shrink-0 text-ink-gold" size={16} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Stagger className="grid gap-4 md:grid-cols-2">
            {record.benefits.map((benefit) => {
              const Icon = iconRegistry[benefit.icon];
              return (
                <StaggerItem key={benefit.title}>
                  <article className="h-full rounded-[1.25rem] border border-ink-paper/10 bg-ink-paper/[0.04] p-6">
                    <span className="grid size-11 place-items-center rounded-xl bg-ink-paper text-ink-black">
                      <Icon size={20} />
                    </span>
                    <h3 className="mt-5 font-display text-2xl leading-tight text-ink-paper">
                      {benefit.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-ink-paper/64">
                      {benefit.description}
                    </p>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ── Fact table + peak-intent CTA ─────────────────────────────────── */}
      <section className="section-pad bg-ink-paper/[0.025]">
        <div className="page-shell">
          <Reveal>
            <h2 className="max-w-3xl font-display text-4xl leading-none text-ink-paper sm:text-5xl">
              {record.factTableHeading}
            </h2>
          </Reveal>
          <div className="mt-9 overflow-hidden rounded-[1.25rem] border border-ink-paper/10">
            <dl>
              {record.factRows.map((row, index) => (
                <div
                  key={row.label}
                  className={`grid gap-2 px-6 py-5 sm:grid-cols-[0.32fr_1fr] sm:gap-6 ${
                    index % 2 ? "bg-ink-paper/[0.03]" : ""
                  }`}
                >
                  <dt className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-gold">
                    {row.label}
                  </dt>
                  <dd className="text-base leading-7 text-ink-paper/68">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* The moment of peak intent: they have just read exactly what to send. */}
          <Reveal className="mt-8 flex flex-col items-start gap-4 rounded-[1.25rem] border border-ink-gold/25 bg-ink-gold/[0.06] p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-base leading-7 text-ink-paper/78">
              Have those details to hand? That is everything we need to give you a real answer.
            </p>
            <CtaLink
              href="#quote"
              location="fact-table"
              page={record.formSourceId}
              className="btn-primary shrink-0 justify-center"
            >
              Send them now
              <ArrowRight size={18} />
            </CtaLink>
          </Reveal>
        </div>
      </section>

      {/* ── Compact embed, when this is a city or industry page ──────────── */}
      {tool && record.family !== "tool" ? (
        <section className="section-pad">
          <div className="page-shell">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-red">
                Before you enquire
              </p>
              {/* Unique per page — see types.ts on toolPrompt. */}
              <p className="mt-4 max-w-3xl text-lg leading-8 text-ink-paper/72">
                {record.toolPrompt}
              </p>
            </Reveal>
            <div className="mt-8">{tool}</div>
          </div>
        </section>
      ) : null}

      {/* ── Long-form sections, with in-copy links resolved server-side ──── */}
      <section className="section-pad">
        <div className="page-shell grid gap-14">
          {record.sections.map((section, sectionIndex) => (
            <Reveal key={section.heading}>
              <article className="grid gap-6 lg:grid-cols-[0.42fr_1fr] lg:gap-10">
                <h2 className="font-display text-4xl leading-[0.95] text-ink-paper sm:text-5xl">
                  {section.heading}
                </h2>
                <div className="space-y-5">
                  {(linkedSections[sectionIndex] ?? []).map((segments, paragraphIndex) => (
                    <Paragraph key={paragraphIndex} segments={segments} />
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Gallery ──────────────────────────────────────────────────────── */}
      <section className="section-pad bg-ink-paper/[0.025]">
        <div className="page-shell">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-red">
              Context
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl leading-none text-ink-paper sm:text-5xl">
              Spaces of this kind
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-ink-paper/58">
              Reference imagery showing the sorts of rooms and surfaces this work sits in. These
              are not Ink Blend projects — each caption describes what the photograph actually
              shows.
            </p>
          </Reveal>
          <Stagger className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {record.gallery.map((img) => (
              <StaggerItem key={img.src}>
                <figure className="overflow-hidden rounded-[1.25rem] border border-ink-paper/10">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── FAQs — native <details> so answers are in the server HTML ────── */}
      <section className="section-pad">
        <div className="page-shell grid gap-8 lg:grid-cols-[0.42fr_1fr] lg:gap-10">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-red">FAQs</p>
            <h2 className="mt-4 font-display text-4xl leading-none text-ink-paper sm:text-5xl">
              Questions worth asking first
            </h2>
          </Reveal>
          <div className="grid gap-3">
            {record.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-[1.25rem] border border-ink-paper/10 bg-ink-paper/[0.04] p-6 open:bg-ink-paper/[0.06]"
              >
                <summary className="cursor-pointer list-none font-display text-2xl leading-tight text-ink-paper marker:hidden">
                  {faq.question}
                </summary>
                <p className="mt-4 text-base leading-8 text-ink-paper/64">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related pages ────────────────────────────────────────────────── */}
      {related.length > 0 ? (
        <section className="section-pad bg-ink-paper/[0.025]">
          <div className="page-shell">
            <Reveal>
              <h2 className="font-display text-4xl leading-none text-ink-paper sm:text-5xl">
                Related pages
              </h2>
            </Reveal>
            <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <StaggerItem key={item.pathname}>
                  <CtaLink
                    href={item.pathname}
                    location="related"
                    page={record.formSourceId}
                    className="flex h-full flex-col rounded-[1.25rem] border border-ink-paper/10 bg-ink-paper/[0.04] p-6 transition hover:border-ink-gold/40"
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-gold">
                      {item.family === "city" ? "Location" : "Sector"}
                    </span>
                    <span className="mt-3 font-display text-2xl leading-tight text-ink-paper">
                      {item.label}
                    </span>
                    <span className="mt-3 text-sm leading-6 text-ink-paper/58">{item.blurb}</span>
                  </CtaLink>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      ) : null}

      {/* ── Quote form. The anchor every in-page CTA points at. ──────────── */}
      <section id="quote" className="section-pad scroll-mt-24">
        <div className="page-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-red">
              Get a quote
            </p>
            <h2 className="mt-4 font-display text-4xl leading-none text-ink-paper sm:text-5xl">
              {record.ctaHeading}
            </h2>
            <p className="mt-5 text-base leading-8 text-ink-paper/62">{record.ctaBody}</p>
            {/* See the note in the hero: no tel: link until the number is real. */}
            <CtaLink
              href="/contact"
              location="form-inline"
              page={record.formSourceId}
              className="mt-7 inline-flex items-center gap-2 text-base font-semibold text-ink-gold"
            >
              <MessageSquare size={18} />
              Or reach us another way
            </CtaLink>
          </Reveal>
          <QuoteForm sourcePage={record.formSourceId} />
        </div>
      </section>

      <StickyCta page={record.formSourceId} />
    </>
  );
}
