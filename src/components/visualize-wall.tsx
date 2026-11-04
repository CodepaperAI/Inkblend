"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Camera, Layers3, WandSparkles } from "lucide-react";
import Image from "next/image";

const previewStyles = ["Botanical", "Luxury", "Brand", "Cultural"];

export function VisualizeWall() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
      <div className="rounded-[1.5rem] border border-ink-paper/10 bg-ink-paper/[0.04] p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-red">
          Visualize your wall
        </p>
        <h3 className="mt-4 font-display text-5xl leading-none text-ink-paper">
          Preview the idea before print day.
        </h3>
        <p className="mt-5 text-base leading-8 text-ink-paper/70">
          Upload a wall photo and share references. Ink Blend can turn that
          into a concept direction, layout mockup, and quote-ready plan.
        </p>
        <div className="mt-7 grid gap-3">
          {[
            { label: "Wall photo", Icon: Camera },
            { label: "Artwork direction", Icon: WandSparkles },
            { label: "Print zone", Icon: Layers3 },
          ].map(({ label, Icon }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-2xl border border-ink-paper/10 bg-ink-black/24 p-3 text-ink-paper/74"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-ink-paper text-ink-black">
                <Icon size={18} />
              </span>
              <span className="text-sm font-semibold">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid place-items-center rounded-[1.5rem] border border-ink-paper/10 bg-ink-graphite/70 p-4">
        {/*
          The box is locked to the photo's crop (1125 x 1400 of the 1125 x 2000
          original, top-aligned) so the percentages below land on the blank wall
          at every width. The artwork is a framed print mounted on that wall,
          not a translucent overlay.
        */}
        <div className="relative aspect-[1125/1400] w-full max-w-[560px] overflow-hidden rounded-[1.1rem]">
          <Image
            src="/media/placeholders/cgi-styled-living-room-blank-wall.jpg"
            alt="Living room with a large blank wall ready for a printed mural"
            fill
            sizes="(min-width:1024px) 560px, 100vw"
            className="object-cover object-top"
          />
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute left-[24%] top-[9%] h-[36%] w-[56%] overflow-hidden rounded-[2px] border-[6px] border-[#fbf7ef] shadow-[0_18px_40px_rgba(23,18,15,0.35),0_2px_4px_rgba(23,18,15,0.25)]"
          >
            <Image
              src="/media/placeholders/abstract-acrylic-painting-macro.jpg"
              alt="Sample artwork mounted on the wall"
              fill
              sizes="320px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-black/12" />
          </motion.div>
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
            {previewStyles.map((style) => (
              <span
                key={style}
                className="rounded-full bg-ink-black/90 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-paper shadow-sm"
              >
                {style}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
