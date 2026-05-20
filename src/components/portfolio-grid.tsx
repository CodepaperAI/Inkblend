"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

import { categories, portfolioProjects, type PortfolioProject } from "@/lib/site";
import { cn } from "@/lib/utils";

export function PortfolioGrid({ limit }: { limit?: number }) {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState<PortfolioProject | null>(null);
  const reducedMotion = useReducedMotion();

  const projects = useMemo(() => {
    const filtered =
      active === "All"
        ? portfolioProjects
        : portfolioProjects.filter((project) => project.category === active);
    return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
  }, [active, limit]);

  return (
    <div>
      {!limit ? (
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActive(category)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm transition",
                active === category
                  ? "border-white bg-white text-black"
                  : "border-white/10 bg-white/[0.04] text-white/62 hover:border-white/24 hover:text-white",
              )}
            >
              {category}
            </button>
          ))}
        </div>
      ) : null}

      <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {projects.map((project, index) => (
            <motion.article
              layout
              key={`${project.title}-${project.category}`}
              initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.45, delay: index * 0.03 }}
              className="group relative min-h-[360px] overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.04]"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(min-width:1024px) 25vw, (min-width:768px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/36 to-transparent" />
              <button
                onClick={() => setSelected(project)}
                aria-label={`Open ${project.title}`}
                className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-white/14 bg-black/35 text-white opacity-0 backdrop-blur-xl transition group-hover:opacity-100"
              >
                <Maximize2 size={17} />
              </button>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-ink-gold">
                  {project.category}
                </p>
                <h3 className="mt-2 font-display text-3xl leading-none text-white">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm text-white/56">{project.location}</p>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected ? (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-black/84 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 30, scale: 0.98 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: 20, scale: 0.98 }}
              className="relative max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-[1.5rem] border border-white/12 bg-[#080808]"
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Close project"
                className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full bg-white text-black"
              >
                <X size={18} />
              </button>
              <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
                <div className="relative min-h-[420px]">
                  <Image
                    src={selected.image}
                    alt={selected.title}
                    fill
                    sizes="(min-width:1024px) 55vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-7 lg:p-10">
                  <p className="text-xs uppercase tracking-[0.26em] text-ink-red">
                    {selected.category}
                  </p>
                  <h3 className="mt-4 font-display text-5xl leading-none text-white">
                    {selected.title}
                  </h3>
                  <p className="mt-4 text-white/52">{selected.location}</p>
                  <p className="mt-7 text-lg leading-8 text-white/68">
                    {selected.summary}
                  </p>
                  <p className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm leading-7 text-white/58">
                    Placeholder visual. Replace with real Ink Blend project
                    media once available.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
