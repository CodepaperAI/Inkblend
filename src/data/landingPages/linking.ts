import { THRESHOLDS } from "./validate";

/**
 * Contextual in-copy linking.
 *
 * Sitewide nav and footer links are boilerplate and heavily discounted. Links
 * inside body copy are the ones that carry weight — which is why this exists.
 *
 * ⚠️ HYDRATION HAZARD — READ BEFORE CHANGING.
 * The obvious implementation is to thread a mutable "already linked" set through
 * the component tree and let each paragraph mutate it as it renders. Do not do
 * that. React re-renders subtrees (StrictMode double-render, concurrent render),
 * so the client starts with a partly-populated set and produces different markup
 * from the server. The result is a hydration mismatch that discards the whole
 * tree — and a production build passes while it happens. Only a browser catches
 * it.
 *
 * Instead `linkDocument` takes EVERY paragraph on the page at once and resolves
 * all linking in a single pure pass before anything renders. Same input, same
 * output, every time.
 *
 * Rules enforced here:
 *   • first mention of an entity per page only, then that entity is done
 *   • longest phrase wins, so "custom wall murals" beats "wall murals"
 *   • never self-link
 *   • hard cap of THRESHOLDS.maxInCopyLinks per page — linking every mention is
 *     textbook over-optimisation
 */

export interface Entity {
  readonly phrase: string;
  readonly href: string;
}

/**
 * Ordered longest-first at module load so matching is greedy by phrase length
 * rather than by declaration order.
 */
export const entities: readonly Entity[] = [
  // Services
  { phrase: "direct-to-wall UV printing", href: "/services/uv-wall-printing" },
  { phrase: "direct-to-wall printing", href: "/services/uv-wall-printing" },
  { phrase: "UV wall printing", href: "/services/uv-wall-printing" },
  { phrase: "custom wall murals", href: "/services/wall-murals" },
  { phrase: "wall murals", href: "/services/wall-murals" },
  { phrase: "commercial branding", href: "/services/commercial-branding" },
  { phrase: "surface printing", href: "/services/surface-printing" },
  { phrase: "interior design graphics", href: "/services/interior-design-graphics" },
  { phrase: "luxury feature walls", href: "/services/luxury-feature-walls" },
  { phrase: "feature wall", href: "/services/luxury-feature-walls" },
  { phrase: "custom artwork printing", href: "/services/custom-artwork-printing" },

  // Cities
  { phrase: "Brampton", href: "/wall-printing/brampton" },
  { phrase: "Mississauga", href: "/wall-printing/mississauga" },
  { phrase: "Toronto", href: "/wall-printing/toronto" },
  { phrase: "Vaughan", href: "/wall-printing/vaughan" },
  { phrase: "Oakville", href: "/wall-printing/oakville" },
  { phrase: "Hamilton", href: "/wall-printing/hamilton" },

  // Industries
  { phrase: "religious or cultural", href: "/industries/religious-and-cultural-spaces" },
  { phrase: "hotel and condominium", href: "/industries/hotels-and-condos" },
  { phrase: "condominium", href: "/industries/hotels-and-condos" },
  { phrase: "restaurants and cafés", href: "/industries/restaurants-and-cafes" },
  { phrase: "salon", href: "/industries/retail-and-salons" },
  { phrase: "workplace", href: "/industries/offices-and-corporate" },
].sort((a, b) => b.phrase.length - a.phrase.length);

export interface Segment {
  readonly text: string;
  readonly href?: string;
}

/** Escape a phrase for safe use inside a RegExp. */
function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Resolve in-copy links across a whole document in one pure pass.
 *
 * @param paragraphs every paragraph on the page, in render order
 * @param selfPathname the current page, so it is never linked to itself
 * @returns one Segment[] per input paragraph, ready to render directly
 */
export function linkDocument(
  paragraphs: readonly string[],
  selfPathname: string,
): Segment[][] {
  const used = new Set<string>();
  let budget = THRESHOLDS.maxInCopyLinks;

  return paragraphs.map((paragraph) => {
    if (budget <= 0) return [{ text: paragraph }];

    // Find the earliest unused, non-self match in this paragraph, repeatedly.
    const segments: Segment[] = [];
    let rest = paragraph;

    for (;;) {
      if (budget <= 0) break;

      let best: { index: number; length: number; href: string } | null = null;

      for (const entity of entities) {
        if (used.has(entity.href)) continue;
        if (entity.href === selfPathname) continue;

        // \b on both sides: "deli" must not match inside "chandeliers".
        const pattern = new RegExp(`\\b${escapeRegExp(entity.phrase)}\\b`, "i");
        const match = pattern.exec(rest);
        if (!match) continue;

        // Earliest position wins; on a tie the longer phrase wins, which is why
        // `entities` is pre-sorted longest-first.
        if (!best || match.index < best.index) {
          best = { index: match.index, length: match[0].length, href: entity.href };
        }
      }

      if (!best) break;

      if (best.index > 0) segments.push({ text: rest.slice(0, best.index) });
      segments.push({
        text: rest.slice(best.index, best.index + best.length),
        href: best.href,
      });

      used.add(best.href);
      budget -= 1;
      rest = rest.slice(best.index + best.length);
    }

    if (rest) segments.push({ text: rest });
    return segments.length ? segments : [{ text: paragraph }];
  });
}

/**
 * Same single pure pass as `linkDocument`, but preserving section structure.
 * The whole page is still processed at once, so the first-mention-per-page rule
 * and the link budget hold across section boundaries.
 */
export function linkSections(
  sections: readonly { readonly body: readonly string[] }[],
  selfPathname: string,
): Segment[][][] {
  const flat = sections.flatMap((section) => [...section.body]);
  const linked = linkDocument(flat, selfPathname);

  const out: Segment[][][] = [];
  let cursor = 0;
  for (const section of sections) {
    out.push(linked.slice(cursor, cursor + section.body.length));
    cursor += section.body.length;
  }
  return out;
}

/** Count resolved links — used by the verification sweep. */
export function countLinks(document: readonly Segment[][]): number {
  return document.reduce(
    (total, paragraph) => total + paragraph.filter((segment) => segment.href).length,
    0,
  );
}
