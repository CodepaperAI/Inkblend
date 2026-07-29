/**
 * Label + href only. Safe to import from client components such as the footer.
 *
 * Deliberately NOT derived from ./index — importing the registry into a client
 * component would ship every landing-page record (sections, FAQs, galleries)
 * into every page's bundle. The tradeoff is that this list must be kept in step
 * by hand; the quality gate checks that each href resolves to a real record.
 */
export interface NavEntry {
  readonly label: string;
  readonly href: string;
}

export const cityNav: readonly NavEntry[] = [
  { label: "Brampton", href: "/wall-printing/brampton" },
  { label: "Mississauga", href: "/wall-printing/mississauga" },
  { label: "Toronto", href: "/wall-printing/toronto" },
  { label: "Vaughan", href: "/wall-printing/vaughan" },
  { label: "Oakville", href: "/wall-printing/oakville" },
  { label: "Hamilton", href: "/wall-printing/hamilton" },
];

export const toolNav: readonly NavEntry[] = [
  { label: "Wall readiness check", href: "/tools/wall-readiness" },
  { label: "Artwork resolution checker", href: "/tools/artwork-resolution" },
  { label: "Quote planner", href: "/tools/quote-planner" },
  { label: "Service area checker", href: "/tools/service-area" },
];

export const industryNav: readonly NavEntry[] = [
  { label: "Restaurants & cafés", href: "/industries/restaurants-and-cafes" },
  { label: "Retail & salons", href: "/industries/retail-and-salons" },
  { label: "Offices & corporate", href: "/industries/offices-and-corporate" },
  { label: "Hotels & condos", href: "/industries/hotels-and-condos" },
  { label: "Homes & luxury interiors", href: "/industries/homes-and-luxury-interiors" },
  { label: "Religious & cultural", href: "/industries/religious-and-cultural-spaces" },
];
