"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { services } from "@/lib/site";
import { getServiceHref } from "@/lib/utils";

export function ServiceShowcase({ compact = false }: { compact?: boolean }) {
  const reducedMotion = useReducedMotion();
  const visibleServices = compact ? services.slice(0, 4) : services;

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {visibleServices.map((service, index) => {
        const Icon = service.icon;
        return (
          <motion.article
            key={service.slug}
            initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.65,
              delay: index * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={reducedMotion ? undefined : { y: -8 }}
            className="group relative min-h-[390px] overflow-hidden rounded-[1.35rem] border border-ink-paper/10 bg-ink-paper/[0.04] shadow-[0_25px_70px_rgba(0,0,0,0.28)]"
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(min-width:1280px) 25vw, (min-width:768px) 50vw, 100vw"
              className="object-cover opacity-62 transition duration-700 group-hover:scale-105 group-hover:opacity-72"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-black/88 via-ink-black/52 to-transparent" />
            <div className="absolute inset-0 border border-ink-paper/0 transition group-hover:border-ink-red/40" />
            <div className="relative flex h-full flex-col justify-between p-6">
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl border border-ink-paper/12 bg-ink-paper/[0.08] text-ink-gold">
                    <Icon size={21} />
                  </span>
                  <span className="text-xs uppercase tracking-[0.24em] text-ink-paper/44">
                    0{index + 1}
                  </span>
                </div>
                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.26em] text-ink-red">
                  {service.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-3xl leading-none text-ink-paper">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-ink-paper/62">
                  {service.short}
                </p>
              </div>
              <Link
                href={getServiceHref(service.slug)}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink-paper transition group-hover:text-ink-gold"
              >
                Explore service
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
