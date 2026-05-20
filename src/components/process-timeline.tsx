import { ArrowRight } from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { processSteps } from "@/lib/site";

export function ProcessTimeline() {
  return (
    <Stagger className="grid gap-4 lg:grid-cols-4">
      {processSteps.map((step, index) => (
        <StaggerItem key={step.title}>
          <article className="relative min-h-[250px] rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-6">
            <span className="font-display text-6xl text-white/10">0{index + 1}</span>
            <h3 className="mt-5 font-display text-3xl text-white">{step.title}</h3>
            <p className="mt-4 text-sm leading-7 text-white/58">{step.description}</p>
            {index < processSteps.length - 1 ? (
              <ArrowRight
                className="absolute -right-5 top-1/2 hidden text-ink-red lg:block"
                size={28}
              />
            ) : null}
          </article>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export function ProcessIntro() {
  return (
    <Reveal className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-red">
        Quote-ready workflow
      </p>
      <p className="mt-4 text-2xl leading-9 text-white/82">
        Every Ink Blend project starts with the practical details: wall
        condition, size, location, artwork direction, timeline, and budget.
        The design work becomes sharper once the space is understood.
      </p>
    </Reveal>
  );
}
