import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BeforeAfterSlider } from "@/components/before-after-slider";
import { CtaBand } from "@/components/cta-band";
import { Hero } from "@/components/hero";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { ProcessTimeline } from "@/components/process-timeline";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ServiceShowcase } from "@/components/service-showcase";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { VisualizeWall } from "@/components/visualize-wall";
import {
  audienceSegments,
  blogPosts,
  citiesServed,
  siteConfig,
} from "@/lib/site";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="section-pad">
        <div className="page-shell">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <SectionHeading
              eyebrow="What Ink Blend creates"
              title="Visual environments built to be remembered."
            >
              Custom UV wall printing, murals, surface graphics, and commercial
              branding for spaces where the walls need to do more than sit in
              the background.
            </SectionHeading>
            <Reveal className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  "Wallpaper alternative",
                  "Restaurant-ready visuals",
                  "Quote from photos",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-white/72">
                    <CheckCircle2 size={18} className="text-ink-gold" />
                    <span className="text-sm font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <div className="mt-12">
            <ServiceShowcase compact />
          </div>
        </div>
      </section>

      <section className="section-pad bg-white/[0.025]">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Portfolio energy"
            title="Gallery-first layouts for the clients who need proof fast."
            align="center"
          >
            Real project media can be swapped in later. The structure is ready
            for restaurants, cafes, offices, retail spaces, homes, and luxury
            interiors.
          </SectionHeading>
          <div className="mt-12">
            <PortfolioGrid limit={4} />
          </div>
          <Reveal className="mt-8 text-center">
            <Link href="/portfolio" className="btn-secondary">
              View Portfolio
              <ArrowRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="page-shell">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <SectionHeading
              eyebrow="Before and after"
              title="Blank walls become high-impact brand moments."
            >
              The comparison slider is built for real project transformations,
              renovation reveals, and social proof once finished work is ready.
            </SectionHeading>
            <Reveal>
              <BeforeAfterSlider />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white/[0.025]">
        <div className="page-shell">
          <VisualizeWall />
        </div>
      </section>

      <section className="section-pad">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Who it is for"
            title="Designed for businesses, homes, and cultural spaces."
            align="center"
          />
          <Stagger className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {audienceSegments.map((segment) => {
              const Icon = segment.icon;
              return (
                <StaggerItem key={segment.title}>
                  <article className="min-h-[230px] rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-ink-red/35 hover:bg-white/[0.065]">
                    <span className="grid size-12 place-items-center rounded-2xl bg-white text-black">
                      <Icon size={20} />
                    </span>
                    <h3 className="mt-6 font-display text-3xl text-white">
                      {segment.title}
                    </h3>
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

      <section className="section-pad bg-white/[0.025]">
        <div className="page-shell">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Process"
                title="A polished workflow from photo to print."
              >
                Ink Blend keeps projects quote-ready, visual, and organized from
                the first wall photo through final production.
              </SectionHeading>
              <Reveal className="mt-8">
                <Link href="/process" className="btn-primary">
                  See Process
                  <ArrowRight size={18} />
                </Link>
              </Reveal>
            </div>
            <ProcessTimeline />
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="page-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading eyebrow="Trust" title="Premium detail without the generic print-shop feeling.">
              Clear creative direction, high-resolution production, and a site
              flow focused on getting clients to inquire quickly.
            </SectionHeading>
            <Reveal className="mt-8 grid grid-cols-2 gap-3">
              {citiesServed.slice(0, 8).map((city) => (
                <span
                  key={city}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-center text-sm text-white/62"
                >
                  {city}
                </span>
              ))}
            </Reveal>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      <section className="section-pad bg-white/[0.025]">
        <div className="page-shell">
          <SectionHeading
            eyebrow="SEO Blog"
            title="Articles built for clients searching before they are ready to call."
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {blogPosts.map((post) => (
              <Reveal key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block min-h-[260px] rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-ink-gold/40"
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-ink-red">
                    {post.category}
                  </p>
                  <h3 className="mt-5 font-display text-3xl leading-none text-white">
                    {post.title}
                  </h3>
                  <p className="mt-5 text-sm leading-7 text-white/58">
                    {post.excerpt}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white">
                    Read article
                    <ArrowRight size={15} className="transition group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="page-shell grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal className="relative min-h-[430px] overflow-hidden rounded-[1.5rem] border border-white/10">
            <Image
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85"
              alt="Luxury interior feature wall"
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/76 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-black">
                <Sparkles size={14} />
                Premium visual finish
              </p>
            </div>
          </Reveal>
          <Reveal className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-7 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-red">
              Fast contact
            </p>
            <h2 className="mt-4 font-display text-5xl leading-none text-white">
              Send your wall. Get the next step.
            </h2>
            <p className="mt-5 text-base leading-8 text-white/62">
              Start with a few photos, measurements, project type, and budget
              range. Ink Blend can respond with practical guidance and quote
              direction.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/get-quote" className="btn-primary justify-center">
                Upload Project Details
                <ArrowRight size={18} />
              </Link>
              <a href={siteConfig.phoneHref} className="btn-secondary justify-center">
                Call Now
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
