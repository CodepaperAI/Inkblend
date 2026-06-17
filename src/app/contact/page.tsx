import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";

import { QuoteForm } from "@/components/quote-form";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Ink Blend for premium UV wall printing, commercial visual branding, custom murals, and quote requests across Canada.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="absolute inset-0">
          <Image
            src="/media/placeholders/interior-preview.jpg"
            alt="Contact Ink Blend"
            fill
            sizes="100vw"
            className="object-cover opacity-72"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-black/18 via-ink-black/42 to-ink-black/70" />
        </div>
        <div className="page-shell relative">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-red">
              Contact
            </p>
            <h1 className="mt-5 max-w-5xl font-display text-5xl leading-[0.92] text-balance text-ink-paper sm:text-7xl">
              Talk to Ink Blend about your wall.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-ink-paper/68">
              Send project details, ask a question, or start fast through phone
              and WhatsApp.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="page-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="grid gap-4">
            {[
              { Icon: Phone, label: "Call", value: siteConfig.phone, href: siteConfig.phoneHref },
              {
                Icon: MessageCircle,
                label: "WhatsApp",
                value: "Start instant chat",
                href: siteConfig.whatsappHref,
              },
              { Icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
              { Icon: MapPin, label: "Service Area", value: siteConfig.address, href: siteConfig.mapHref },
              { Icon: Clock, label: "Hours", value: siteConfig.hours, href: "#" },
            ].map(({ Icon, label, value, href }) => (
              <Reveal key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex gap-4 rounded-[1.25rem] border border-ink-paper/10 bg-ink-paper/[0.04] p-5 transition hover:-translate-y-1 hover:border-ink-paper/25"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-ink-paper text-ink-black">
                    <Icon size={20} />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-[0.22em] text-ink-red">
                      {label}
                    </span>
                    <span className="mt-2 block text-base leading-7 text-ink-paper/70">
                      {value}
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
