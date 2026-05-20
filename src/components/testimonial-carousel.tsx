"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useState } from "react";

import { testimonials } from "@/lib/site";

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const item = testimonials[index];

  const go = (direction: number) => {
    setIndex((current) => (current + direction + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6 sm:p-9">
      <div className="absolute right-8 top-8 text-white/8">
        <Quote size={96} />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={item.name}
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -18 }}
          transition={{ duration: 0.45 }}
        >
          <p className="max-w-3xl font-display text-4xl leading-[1.05] text-white sm:text-5xl">
            &ldquo;{item.quote}&rdquo;
          </p>
          <div className="mt-8">
            <p className="font-semibold text-white">{item.name}</p>
            <p className="mt-1 text-sm text-white/48">{item.company}</p>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="mt-8 flex gap-3">
        <button
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className="grid size-11 place-items-center rounded-full border border-white/12 text-white/70 transition hover:bg-white hover:text-black"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next testimonial"
          className="grid size-11 place-items-center rounded-full border border-white/12 text-white/70 transition hover:bg-white hover:text-black"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
