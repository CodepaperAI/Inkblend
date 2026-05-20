import type { ReactNode } from "react";

import { Reveal } from "@/components/reveal";

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={
        align === "center"
          ? "mx-auto max-w-3xl text-center"
          : "max-w-3xl text-left"
      }
    >
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-red">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-5xl leading-[0.92] text-white sm:text-6xl">
        {title}
      </h2>
      {children ? (
        <p className="mt-6 text-base leading-8 text-white/62 sm:text-lg">
          {children}
        </p>
      ) : null}
    </Reveal>
  );
}
