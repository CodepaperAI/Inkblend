import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ServiceShowcase } from "@/components/service-showcase";
import { services } from "@/lib/site";
import { getServiceHref } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Ink Blend services including UV wall printing, custom murals, commercial branding, surface printing, and luxury feature walls.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="absolute inset-0">
          <Image
            src="/media/placeholders/restaurant-mural.jpg"
            alt="Commercial wall branding"
            fill
            sizes="100vw"
            className="object-cover opacity-76"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-black/18 via-ink-black/42 to-ink-black/70" />
        </div>
        <div className="page-shell relative">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-red">
              Services
            </p>
            <h1 className="mt-5 max-w-5xl font-display text-5xl leading-[0.92] text-balance text-ink-paper sm:text-7xl">
              Surface printing services for premium visual spaces.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-ink-paper/68">
              Choose a service, send photos and measurements, and Ink Blend can
              shape the right print direction for your space.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="page-shell">
          <ServiceShowcase />
        </div>
      </section>

      <section className="section-pad bg-ink-paper/[0.025]">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Service detail"
            title="Each service page is quote-focused and conversion-ready."
            align="center"
          >
            Benefits, process, durability context, FAQs, and project photos are
            structured to help visitors decide quickly.
          </SectionHeading>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <Reveal key={service.slug}>
                <Link
                  href={getServiceHref(service.slug)}
                  className="group flex min-h-[220px] flex-col justify-between rounded-[1.25rem] border border-ink-paper/10 bg-ink-paper/[0.04] p-6 transition hover:-translate-y-1 hover:border-ink-red/40"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-ink-gold">
                      {service.eyebrow}
                    </p>
                    <h2 className="mt-4 font-display text-4xl text-ink-paper">
                      {service.title}
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-ink-paper/58">
                      {service.description}
                    </p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink-paper">
                    Open service
                    <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
