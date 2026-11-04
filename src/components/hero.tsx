"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { heroImages, siteConfig, trustStats } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reducedMotion = useReducedMotion();
  const fade = (delay: number) => ({
    initial: false as const,
    animate: reducedMotion ? undefined : { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 lg:px-8 lg:pb-20">
        <div className="min-w-0">
          <motion.p
            {...fade(0)}
            className="inline-flex items-center gap-2 rounded-full border border-ink-paper/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-ink-red"
          >
            <span className="size-1.5 rounded-full bg-ink-red" aria-hidden />
            UV wall printing · Ontario &amp; Canada
          </motion.p>

          <motion.h1
            {...fade(0.06)}
            className="mt-6 text-balance font-display text-[3.4rem] leading-[0.92] text-ink-paper sm:text-7xl lg:text-[5.4rem]"
          >
            Transform any surface into art
          </motion.h1>

          {/* Answer-first: what we do, where, and how to get a price. */}
          <motion.p
            {...fade(0.14)}
            className="mt-6 max-w-xl text-pretty text-lg leading-8 text-ink-paper/78"
          >
            Ink Blend prints artwork directly onto interior walls and surfaces with
            durable UV ink, no seams and no wallpaper. Send a photo and the wall
            size and you get a quote built around your space.
          </motion.p>

          <motion.div {...fade(0.22)} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/get-quote" className="btn-primary group justify-center">
              Get a free quote
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </Link>
            <a href={siteConfig.phoneHref} className="btn-secondary justify-center">
              <Phone size={17} />
              Call {siteConfig.phone}
            </a>
          </motion.div>

          <motion.p {...fade(0.3)} className="mt-5 text-sm text-ink-paper/70">
            {siteConfig.hours} · Replies by email or WhatsApp
          </motion.p>
        </div>

        <motion.div {...fade(0.12)} className="relative">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-ink-paper/10 shadow-[0_40px_90px_rgba(23,18,15,0.22)] lg:aspect-[4/5]">
            <Image
              src={heroImages[0]}
              alt="Hand-painted crane mural on a restaurant wall"
              fill
              priority
              sizes="(min-width:1024px) 46vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-4 hidden w-52 overflow-hidden rounded-3xl border-4 border-ink-black shadow-xl sm:block lg:-left-8">
            <div className="relative aspect-[4/3]">
              <Image
                src={heroImages[1]}
                alt="Painted brick mural in a bar"
                fill
                loading="eager"
                sizes="208px"
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="border-y border-ink-paper/10 bg-ink-graphite/60">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 py-2 sm:px-6 md:grid-cols-4 lg:px-8">
          {trustStats.map((stat) => (
            <div key={stat.label} className="py-4 pr-4">
              <dt className="font-display text-3xl text-ink-paper">{stat.value}</dt>
              <dd className="mt-1 text-sm leading-6 text-ink-paper/72">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
