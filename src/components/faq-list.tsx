"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

import { faqs } from "@/lib/site";

export function FaqList() {
  const [open, setOpen] = useState(0);
  const reducedMotion = useReducedMotion();

  return (
    <div className="grid gap-3">
      {faqs.map((faq, index) => (
        <div
          key={faq.question}
          className="overflow-hidden rounded-3xl border border-ink-paper/10 bg-ink-paper/[0.04]"
        >
          <button
            onClick={() => setOpen(open === index ? -1 : index)}
            className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-7"
          >
            <span className="font-display text-2xl text-ink-paper">{faq.question}</span>
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-ink-paper/12 text-ink-paper/70">
              <Plus
                size={18}
                className={open === index ? "rotate-45 transition" : "transition"}
              />
            </span>
          </button>
          <AnimatePresence initial={false}>
            {open === index ? (
              <motion.div
                initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                animate={reducedMotion ? undefined : { height: "auto", opacity: 1 }}
                exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <p className="px-5 pb-6 text-base leading-8 text-ink-paper/62 sm:px-7">
                  {faq.answer}
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
