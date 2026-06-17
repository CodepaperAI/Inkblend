import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-ink-paper/10 bg-[linear-gradient(135deg,rgba(247,39,39,0.26),rgba(249,167,43,0.1),rgba(44,56,146,0.22))] p-1">
        <div className="relative overflow-hidden rounded-[1.8rem] bg-ink-black/76 px-6 py-14 backdrop-blur-xl sm:px-10 lg:px-14">
          <div className="absolute -right-24 -top-24 size-72 rounded-full bg-ink-red/20 blur-3xl" />
          <div className="absolute -bottom-28 left-12 size-80 rounded-full bg-ink-blue/20 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-gold">
                Start with a wall photo
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-5xl leading-[0.92] text-ink-paper sm:text-6xl">
                Ready to turn a blank surface into the room&apos;s main event?
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-paper/64">
                Send photos, measurements, and a rough idea. Ink Blend will map
                the fastest path from concept to quote.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href="/get-quote" className="btn-primary justify-center">
                Request Quote
                <ArrowRight size={18} />
              </Link>
              <a
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary justify-center"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
