import type { Metadata } from "next";
import Image from "next/image";

import { CtaBand } from "@/components/cta-band";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { audienceSegments, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Ink Blend, a premium UV wall printing and visual branding studio serving commercial and residential spaces across Canada.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1800&q=85"
            alt="Premium interior wall"
            fill
            sizes="100vw"
            className="object-cover opacity-38"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-ink-black/82 to-ink-black" />
        </div>
        <div className="page-shell relative">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-red">
              About Ink Blend
            </p>
            <h1 className="mt-5 max-w-5xl font-display text-6xl leading-[0.9] text-white sm:text-7xl">
              A print studio for walls that need presence.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/68">
              {siteConfig.description}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="page-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeading eyebrow="Point of view" title="Premium visuals with practical production thinking.">
            Ink Blend works with businesses, designers, and homeowners to make
            interiors feel intentional, branded, and visually memorable.
          </SectionHeading>
          <Reveal className="grid gap-5 text-lg leading-9 text-white/66">
            <p>
              We specialize in UV wall printing and large-format surface
              printing for restaurants, cafes, retail stores, offices, hotels,
              condos, religious spaces, events, and residential interiors.
            </p>
            <p>
              The goal is simple: take a blank surface and turn it into a
              high-impact visual experience that lasts longer, feels more
              custom, and photographs better than a generic wall finish.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-white/[0.025]">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Who we serve"
            title="Built for every space where visuals shape the experience."
            align="center"
          />
          <Stagger className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {audienceSegments.map((segment) => {
              const Icon = segment.icon;
              return (
                <StaggerItem key={segment.title}>
                  <article className="min-h-[230px] rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-6">
                    <span className="grid size-12 place-items-center rounded-2xl bg-white text-black">
                      <Icon size={20} />
                    </span>
                    <h2 className="mt-6 font-display text-3xl text-white">
                      {segment.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-white/58">
                      {segment.description}
                    </p>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="section-pad">
        <div className="page-shell grid gap-6 md:grid-cols-3">
          {[
            ["Premium Quality", "Crisp artwork, strong color, and careful preparation."],
            ["Creative Direction", "Mockups and concepts that match the brand and room."],
            ["Modern Printing", "Durable UV printing as a custom alternative to wallpaper."],
          ].map(([title, body]) => (
            <Reveal key={title}>
              <article className="min-h-[260px] rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-7">
                <p className="font-display text-4xl text-white">{title}</p>
                <p className="mt-5 text-base leading-8 text-white/62">{body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
