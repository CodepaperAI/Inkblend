"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Camera, Layers3, WandSparkles } from "lucide-react";
import Image from "next/image";

const previewStyles = ["Botanical", "Luxury", "Brand", "Cultural"];

export function VisualizeWall() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-red">
          Visualize your wall
        </p>
        <h3 className="mt-4 font-display text-5xl leading-none text-white">
          Preview the idea before print day.
        </h3>
        <p className="mt-5 text-base leading-8 text-white/62">
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
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/24 p-3 text-white/74"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-white text-black">
                <Icon size={18} />
              </span>
              <span className="text-sm font-semibold">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative min-h-[520px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#101010] p-4">
        <div className="relative h-full min-h-[490px] overflow-hidden rounded-[1.1rem]">
          <Image
            src="/media/placeholders/interior-preview.jpg"
            alt="Interior wall mockup preview"
            fill
            sizes="(min-width:1024px) 55vw, 100vw"
            className="object-cover opacity-74"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 28 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute left-[12%] top-[18%] h-[42%] w-[54%] overflow-hidden rounded-[1rem] border border-white/24 shadow-[0_30px_80px_rgba(0,0,0,0.38)]"
          >
            <Image
              src="/media/placeholders/art-wall.jpg"
              alt="Preview artwork overlay"
              fill
              sizes="500px"
              className="object-cover mix-blend-screen"
            />
          </motion.div>
          <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
            {previewStyles.map((style) => (
              <span
                key={style}
                className="rounded-full border border-white/12 bg-black/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/68 backdrop-blur"
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
