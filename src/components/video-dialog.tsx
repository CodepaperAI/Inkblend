"use client";

import { track } from "@vercel/analytics";
import { Play, X } from "lucide-react";
import { useRef } from "react";

/**
 * A play button that opens the video in a native <dialog>: focus is trapped,
 * Esc closes it, and the file is not requested until it is opened
 * (preload="none"), so it costs nothing on first paint.
 */
export function VideoDialogButton({
  src,
  poster,
  label,
  className,
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const open = () => {
    track("video_play", { video: src });
    dialogRef.current?.showModal();
    void videoRef.current?.play().catch(() => {});
  };

  const close = () => {
    videoRef.current?.pause();
    dialogRef.current?.close();
  };

  return (
    <>
      <button type="button" onClick={open} aria-label={label} className={className}>
        <Play size={18} fill="currentColor" aria-hidden />
      </button>
      <dialog
        ref={dialogRef}
        aria-label={label}
        onClose={() => videoRef.current?.pause()}
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
        className="m-auto w-[min(92vw,420px)] overflow-hidden rounded-3xl border-0 bg-black p-0 backdrop:bg-black/70"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close video"
          className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full bg-black/60 text-white"
        >
          <X size={20} aria-hidden />
        </button>
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls
          playsInline
          preload="none"
          className="block max-h-[85vh] w-full"
        />
      </dialog>
    </>
  );
}
