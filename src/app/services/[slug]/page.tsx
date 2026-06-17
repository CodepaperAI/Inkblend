import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CtaBand } from "@/components/cta-band";
import { QuoteForm } from "@/components/quote-form";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { services } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return {};
  }

  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <>
      <section className="page-hero">
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="100vw"
            className="object-cover opacity-76"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-black/18 via-ink-black/42 to-ink-black/70" />
        </div>
        <div className="page-shell relative grid gap-8 lg:grid-cols-[1fr_0.45fr] lg:items-end">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-red">
              {service.eyebrow}
            </p>
            <h1 className="mt-5 max-w-5xl font-display text-5xl leading-[0.92] text-balance text-ink-paper sm:text-7xl">
              {service.title}
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-ink-paper/68">
              {service.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/get-quote" className="btn-primary justify-center">
                Get a Quote
                <ArrowRight size={18} />
              </Link>
              <Link href="/portfolio" className="btn-secondary justify-center">
                View Examples
              </Link>
            </div>
          </Reveal>
          <Reveal className="rounded-[1.5rem] border border-ink-paper/10 bg-ink-paper/[0.05] p-6 backdrop-blur-xl">
            <span className="grid size-14 place-items-center rounded-2xl bg-ink-paper text-ink-black">
              <Icon size={24} />
            </span>
            <p className="mt-5 text-lg leading-8 text-ink-paper/68">{service.short}</p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="page-shell grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-red">
              Benefits
            </p>
            <h2 className="mt-4 font-display text-5xl leading-none text-ink-paper">
              Why clients choose this service.
            </h2>
          </Reveal>
          <Stagger className="grid gap-4 md:grid-cols-2">
            {service.benefits.map((benefit) => (
              <StaggerItem key={benefit}>
                <div className="flex min-h-[120px] gap-4 rounded-[1.25rem] border border-ink-paper/10 bg-ink-paper/[0.04] p-5">
                  <CheckCircle2 className="mt-1 shrink-0 text-ink-gold" size={20} />
                  <p className="text-base leading-7 text-ink-paper/70">{benefit}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-pad bg-ink-paper/[0.025]">
        <div className="page-shell grid gap-8 lg:grid-cols-4">
          {service.process.map((step, index) => (
            <Reveal key={step}>
              <article className="min-h-[230px] rounded-[1.25rem] border border-ink-paper/10 bg-ink-paper/[0.04] p-6">
                <p className="font-display text-5xl text-ink-paper/12">0{index + 1}</p>
                <h3 className="mt-5 font-display text-3xl text-ink-paper">{step}</h3>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="page-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal className="rounded-[1.5rem] border border-ink-paper/10 bg-ink-paper/[0.04] p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-red">
              FAQs
            </p>
            <h2 className="mt-4 font-display text-5xl leading-none text-ink-paper">
              Service questions
            </h2>
            <p className="mt-5 text-base leading-8 text-ink-paper/62">
              Send photos and details if your surface, project type, or artwork
              needs a more specific answer.
            </p>
          </Reveal>
          <div className="grid gap-4">
            {service.faqs.map((faq) => (
              <Reveal key={faq.question}>
                <article className="rounded-[1.25rem] border border-ink-paper/10 bg-ink-paper/[0.04] p-6">
                  <h3 className="font-display text-3xl text-ink-paper">{faq.question}</h3>
                  <p className="mt-4 text-base leading-8 text-ink-paper/62">
                    {faq.answer}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-ink-paper/[0.025]">
        <div className="page-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-red">
              Quote this service
            </p>
            <h2 className="mt-4 font-display text-5xl leading-none text-ink-paper">
              Share your wall and measurements.
            </h2>
            <p className="mt-5 text-base leading-8 text-ink-paper/62">
              The quote form is built to collect the details Ink Blend needs:
              photos, dimensions, location, budget range, surface type, and
              project notes.
            </p>
          </Reveal>
          <QuoteForm compact />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
