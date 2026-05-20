"use client";

import { ArrowLeftRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function BeforeAfterSlider({
  before = "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1400",
  after = "https://images.pexels.com/photos/10148450/pexels-photo-10148450.jpeg?auto=compress&cs=tinysrgb&w=1400",
}: {
  before?: string;
  after?: string;
}) {
  const [value, setValue] = useState(52);

  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] shadow-[0_40px_100px_rgba(0,0,0,0.35)]">
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
          className="absolute inset-y-0 z-10 w-px bg-white"
          style={{ left: `${value}%` }}
        >
          <span className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/65 text-white shadow-2xl backdrop-blur-xl">
            <ArrowLeftRight size={21} />
          </span>
        </div>
        <div className="absolute left-5 top-5 z-20 rounded-full bg-black/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white backdrop-blur">
          Before
        </div>
        <div className="absolute right-5 top-5 z-20 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-black">
          After
        </div>
        <input
          aria-label="Compare before and after"
          type="range"
          min="12"
          max="88"
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
          className="absolute inset-x-6 bottom-6 z-30 h-2 cursor-ew-resize appearance-none rounded-full bg-white/22 accent-white"
        />
      </div>
    </div>
  );
}
