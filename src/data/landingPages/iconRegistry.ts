import {
  Brush,
  Building2,
  Church,
  Camera,
  ClipboardCheck,
  Droplets,
  Hotel,
  House,
  Layers3,
  Palette,
  Printer,
  Ruler,
  ScanLine,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Store,
  Utensils,
} from "lucide-react";

/**
 * Icons are referenced from landing-page data by STRING KEY, never by importing
 * the component into the data file.
 *
 * Why: the data modules are imported by `next.config.ts` (the quality gate),
 * by route `generateMetadata`, and by `sitemap.ts` — all server contexts. A data
 * file that pulls in React components cannot be loaded from those places.
 * `src/lib/site.ts` does embed components directly (`icon: Printer`); do not
 * copy that pattern here.
 *
 * Typing icon fields as `IconKey` makes a typo a compile error rather than an
 * undefined component at render time.
 */
export const iconRegistry = {
  brush: Brush,
  building: Building2,
  camera: Camera,
  church: Church,
  clipboard: ClipboardCheck,
  droplets: Droplets,
  hotel: Hotel,
  house: House,
  layers: Layers3,
  palette: Palette,
  printer: Printer,
  ruler: Ruler,
  scan: ScanLine,
  shield: ShieldCheck,
  sparkles: Sparkles,
  spray: SprayCan,
  store: Store,
  utensils: Utensils,
} as const;

export type IconKey = keyof typeof iconRegistry;
