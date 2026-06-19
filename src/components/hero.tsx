"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Camera, MessageCircle, Play, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { heroImages, siteConfig, trustStats } from "@/lib/site";

export function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen overflow-hidden pt-28">
      <div className="absolute inset-0">
        <Image
          src={heroImages[0]}
          alt="Luxury printed wall interior"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.86]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(200,47,39,0.12),transparent_34%),linear-gradient(90deg,rgba(239,226,204,0.82)_0%,rgba(239,226,204,0.48)_42%,rgba(239,226,204,0.1)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-ink-black/82 to-transparent" />
        <div className="noise-layer" />
      </div>

      {!reducedMotion && (
        <>
          <motion.div
            aria-hidden
            className="absolute left-[4%] top-[24%] h-40 w-40 rounded-full border border-ink-paper/12"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 26, ease: "linear" }}
          />
          <motion.div
            aria-hidden
            className="absolute bottom-[18%] right-[8%] h-32 w-32 rounded-[2rem] border border-ink-gold/30 bg-ink-gold/5 blur-[1px]"
            animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          />
        </>
      )}

      <div className="relative mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="min-w-0">
          <motion.div
            initial={false}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-ink-paper/16 bg-ink-paper/[0.1] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-ink-paper/78 backdrop-blur-xl"
          >
            <Sparkles size={14} className="text-ink-gold" />
            Premium UV Wall Printing
          </motion.div>

          <motion.h1
            initial={false}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-[21rem] text-balance font-display text-5xl leading-[0.9] tracking-normal text-ink-paper sm:max-w-5xl sm:text-7xl lg:text-8xl"
          >
            Transform Any Surface Into Art
          </motion.h1>

          <motion.p
            initial={false}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-[21rem] text-pretty text-base leading-7 text-ink-paper/82 sm:max-w-2xl sm:text-xl sm:leading-8"
          >
            Ink Blend creates immersive wall murals, commercial branding, and
            large-format surface prints with crisp UV detail and a premium
            studio process.
          </motion.p>

          <motion.div
            initial={false}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 grid w-full max-w-[21rem] gap-3 sm:flex sm:max-w-none sm:flex-row"
          >
            <Link href="/get-quote" className="btn-primary group w-full justify-center sm:w-auto">
              Get Quote
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </Link>
            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary w-full justify-center sm:w-auto"
            >
              <MessageCircle size={18} />
              Book Consultation
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={false}
          animate={reducedMotion ? undefined : { opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block"
        >
          <div className="relative ml-auto aspect-[0.78] max-w-[520px] overflow-hidden rounded-[2rem] border border-ink-paper/12 bg-ink-paper/[0.05] p-3 shadow-[0_50px_120px_rgba(0,0,0,0.55)]">
            <div className="relative h-full overflow-hidden rounded-[1.4rem]">
              <Image
                src={heroImages[1]}
                alt="Printed restaurant wall visual"
                fill
                sizes="520px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-black/38 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-ink-paper/12 bg-ink-black/34 p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-ink-paper/46">
                      Visual Preview
                    </p>
                    <p className="mt-2 font-display text-3xl text-ink-paper">
                      Mural-ready spaces
                    </p>
                  </div>
                  <span className="grid size-12 place-items-center rounded-full bg-ink-paper text-ink-black">
                    <Play size={18} fill="currentColor" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -left-8 top-16 rounded-3xl border border-ink-paper/12 bg-ink-paper/[0.08] p-4 backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-ink-red text-ink-paper">
                <Camera size={19} />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink-paper">Before to wow</p>
                <p className="text-xs text-ink-paper/54">Mockups, approvals, print</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 pb-10 sm:px-6 md:grid-cols-4 lg:px-8">
        {trustStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={false}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 + index * 0.08 }}
            className="border border-ink-paper/10 bg-ink-paper/[0.04] p-5 backdrop-blur"
          >
            <p className="font-display text-3xl text-ink-paper">{stat.value}</p>
            <p className="mt-2 text-sm leading-6 text-ink-paper/54">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
