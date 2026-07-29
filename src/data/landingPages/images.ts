/**
 * VERIFIED IMAGE INVENTORY — single source of truth for landing-page imagery.
 *
 * Every entry below was confirmed by OPENING the file. Nothing here was written
 * from a filename, an existing caption, or a variable name.
 *
 * Audit of 2026-07-29: all 12 originals in public/media/placeholders/ were opened.
 * 12 of 12 contradicted their previous filename, alt text or caption. Examples:
 *   - "botanical-wall.jpg"    was the hero of the UV *printing* service page but
 *                             shows a HAND-PAINTED mural.
 *   - "office-branding.jpg"   was captioned "Executive Office Culture Wall" but
 *                             shows a corridor with no graphics on any wall.
 *   - "blank-wall-before.jpg" was the "before / blank wall" half of the
 *                             before-after slider but is a CGI render of a
 *                             furnished room with art already hung.
 * The files were renamed to describe what they actually show, because misleading
 * names propagate the error to whoever touches this next.
 *
 * ── RULES ──────────────────────────────────────────────────────────────────────
 * 1. NONE of these show Ink Blend's own work. They are stock or CGI context
 *    images. Alt text must describe the photograph and must NEVER imply the
 *    pictured wall was printed by Ink Blend.
 * 2. Images marked `handPainted: true` show brushwork, not printing. Never use
 *    one to illustrate print quality or as a "what we produce" example.
 * 3. Images marked `render: true` are CGI, not photographs of real rooms.
 * 4. Replace this entire module with real project photography before launch.
 */

export interface StockImage {
  /** Path under /media/placeholders, without extension. */
  readonly base: string;
  /** Literal description of what is visible. Used as alt text. */
  readonly alt: string;
  /** True when the pictured artwork is hand-painted rather than printed. */
  readonly handPainted?: boolean;
  /** True when the image is a CGI render rather than a photograph. */
  readonly render?: boolean;
  /** True when every wall in frame is bare — useful as a "candidate wall". */
  readonly blankWall?: boolean;
}

export const stockImages = {
  abstractPaintingMacro: {
    base: "abstract-acrylic-painting-macro",
    alt: "Close-up of an abstract acrylic painting on canvas in red, yellow, orange and teal, with visible canvas weave, thick brushstrokes and paint drips",
    handPainted: true,
  },
  cgiFurnishedLivingRoom: {
    base: "cgi-render-furnished-living-room",
    alt: "Computer-generated render of a furnished living room with framed artwork already hung, a wall-mounted television, bookshelves and a patterned rug",
    render: true,
  },
  handPaintedCraneMural: {
    base: "handpainted-crane-mural-restaurant",
    alt: "Hand-painted crane and cherry-blossom mural on textured plaster in a restaurant, lit by rattan pendant lamps above a wooden counter",
    handPainted: true,
  },
  curvedBuildingExterior: {
    base: "curved-modern-building-exterior",
    alt: "Exterior of a curved contemporary building photographed from below against a clear blue sky",
  },
  banquetTableSetting: {
    base: "banquet-table-setting",
    alt: "Close-up of a long banquet table set with wine glasses, plates and a bright floral centrepiece",
  },
  livingRoomBlankWalls: {
    base: "modern-living-room-blank-walls",
    alt: "Bright modern living room with a pale sectional sofa, an open staircase and blank white walls",
    blankWall: true,
  },
  panelledHallwayFramedArt: {
    base: "wood-panelled-hallway-framed-art",
    alt: "Wood-panelled hallway with a cluster of framed black-and-white prints, a round mirror and a dark storage unit",
  },
  concreteFeatureWall: {
    base: "concrete-feature-wall-dining-room",
    alt: "Modern dining room with a board-formed concrete feature wall and a black steel open-tread staircase",
  },
  cgiBlankFeatureWall: {
    base: "cgi-styled-living-room-blank-wall",
    alt: "Computer-generated render of a styled living room with a large bare cream wall above a mustard sideboard, an orange armchair and potted plants",
    render: true,
    blankWall: true,
  },
  glassOfficeCorridor: {
    base: "glass-partition-office-corridor",
    alt: "Office corridor lined with black-framed glass partitions, with no graphics applied to any wall",
    blankWall: true,
  },
  handPaintedBrickMural: {
    base: "handpainted-brick-mural-bar",
    alt: "Dimly lit bar with a faded hand-painted mural on whitewashed exposed brick behind the counter",
    handPainted: true,
  },
  spaTreatment: {
    base: "spa-facial-treatment",
    alt: "Close-up of a person receiving a facial massage on a treatment table with patterned blue cushions",
  },
} as const satisfies Record<string, StockImage>;

export type StockImageKey = keyof typeof stockImages;

export interface ImageRef {
  readonly src: string;
  readonly alt: string;
}

/**
 * Resolve a stock image to a WebP `src` plus its verified alt text.
 * Optionally append a page-specific qualifier so the same photo does not carry
 * byte-identical alt text on every page it appears.
 */
export function image(key: StockImageKey, context?: string): ImageRef {
  const entry = stockImages[key];
  return {
    src: `/media/placeholders/${entry.base}.webp`,
    alt: context ? `${entry.alt} — ${context}` : entry.alt,
  };
}
