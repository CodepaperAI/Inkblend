"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Grid cells: stretch to the row height and pass it to the card inside, so a row of cards is one height. */
  fill?: boolean;
};

export function Reveal({ children, className, delay = 0, y = 28, fill = false }: RevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={fill ? `h-full [&>*]:h-full ${className ?? ""}` : className}
      initial={reducedMotion ? false : { opacity: 0, y }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : "hidden"}
      whileInView={reducedMotion ? undefined : "show"}
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.09 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`h-full [&>*]:h-full ${className ?? ""}`}
      variants={{
        hidden: reducedMotion ? {} : { opacity: 0, y: 24, scale: 0.98 },
        show: reducedMotion
          ? {}
          : {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
            },
      }}
    >
      {children}
    </motion.div>
  );
}
