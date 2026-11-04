import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function getServiceHref(slug: string) {
  return `/services/${slug}`;
}

function clampAtWord(text: string, max: number) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.\-–—]+$/, "")}…`;
}

// The root title template appends " | Ink Blend" (12 chars), so 52 keeps the
// rendered <title> inside the ~65 characters search results show.
export function fitTitle(title: string, max = 52) {
  return clampAtWord(title, max);
}

export function fitDescription(description: string, max = 158) {
  return clampAtWord(description, max);
}
