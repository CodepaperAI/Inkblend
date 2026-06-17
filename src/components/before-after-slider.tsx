"use client";

import { ArrowLeftRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function BeforeAfterSlider({
  before = "/media/placeholders/blank-wall-before.jpg",
  after = "/media/placeholders/botanical-wall.jpg",
}: {
  before?: string;
  after?: string;
}) {
  const [value, setValue] = useState(52);

  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-ink-paper/10 bg-ink-paper/[0.04] shadow-[0_40px_100px_rgba(0,0,0,0.35)]">
      <div className="relative aspect-[16/10] min-h-[360px]">
        <Image
          src={after}
          alt="After mural printing"
          fill
          sizes="(min-width:1024px) 70vw, 100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${value}%` }}
        >
          <div className="relative h-full" style={{ width: `${10000 / value}%` }}>
            <Image
              src={before}
              alt="Before wall printing"
              fill
              sizes="(min-width:1024px) 70vw, 100vw"
              className="object-cover grayscale"
            />
          </div>
        </div>
        <div
          className="absolute inset-y-0 z-10 w-px bg-ink-paper"
          style={{ left: `${value}%` }}
        >
          <span className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-ink-paper/30 bg-ink-black/65 text-ink-paper shadow-2xl backdrop-blur-xl">
            <ArrowLeftRight size={21} />
          </span>
        </div>
        <div className="absolute left-5 top-5 z-20 rounded-full bg-ink-black/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-ink-paper backdrop-blur">
          Before
        </div>
        <div className="absolute right-5 top-5 z-20 rounded-full bg-ink-paper px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-ink-black">
          After
        </div>
        <input
          aria-label="Compare before and after"
          type="range"
          min="12"
          max="88"
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
          className="absolute inset-x-6 bottom-6 z-30 h-2 cursor-ew-resize appearance-none rounded-full bg-ink-paper/22 accent-ink-paper"
        />
      </div>
    </div>
  );
}
