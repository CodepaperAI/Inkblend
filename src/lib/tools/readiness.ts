/**
 * Wall readiness assessment.
 *
 * Every rule here traces to something already published on the site or already
 * written into the landing-page content — principally Ink Blend's own line that
 * a surface must be "smooth, clean, dry, and properly prepared".
 *
 * ── WHAT THIS MUST NOT DO ─────────────────────────────────────────────────
 * It advises. It never promises. No prices, no timescales, no durability
 * claims, no "we can definitely print this". Every outcome that depends on
 * seeing the wall says so. See the banned-claims block in
 * src/data/landingPages/cities.ts — it applies here in full.
 */

export type Substrate =
  | "painted-drywall"
  | "skim-plaster"
  | "original-plaster"
  | "exposed-brick"
  | "concrete-block"
  | "board-formed-concrete"
  | "panelled"
  | "unsure";

export type FinishAge = "under-6-weeks" | "6-weeks-to-6-months" | "over-6-months" | "years" | "unsure";
export type Texture = "smooth" | "light" | "heavy" | "deep-relief" | "unsure";
export type Coating = "never-painted" | "painted" | "wallpapered" | "sealed-limewashed" | "unsure";
export type Hollow = "none" | "some" | "unsure";
export type Tenure = "owned" | "leased-known" | "leased-unsure";

export interface ReadinessAnswers {
  readonly substrate: Substrate;
  readonly finishAge: FinishAge;
  readonly texture: Texture;
  readonly coating: Coating;
  readonly hollow: Hollow;
  readonly tenure: Tenure;
}

/** Ordered worst-first so the summary can take the highest severity. */
export type FindingStatus = "decision" | "prep" | "ask" | "ready";

export interface Finding {
  readonly topic: string;
  readonly status: FindingStatus;
  readonly note: string;
}

export interface ReadinessResult {
  readonly findings: readonly Finding[];
  readonly headline: string;
  readonly photos: readonly string[];
  /** Plain-text summary written into the quote form's notes field. */
  readonly summary: string;
}

const SEVERITY: Record<FindingStatus, number> = { decision: 3, prep: 2, ask: 1, ready: 0 };

function substrateFinding(substrate: Substrate, texture: Texture): Finding {
  switch (substrate) {
    case "exposed-brick":
      return {
        topic: "Substrate",
        status: "decision",
        note: "Brick has a deep, irregular face and a mortar line every few inches. An image printed across it follows that relief — which can look genuinely good, and swallows fine detail and small text. The alternative is filling and levelling for a flat face, which permanently changes the wall. Neither is wrong; the decision is yours and it should be deliberate.",
      };
    case "board-formed-concrete":
      return {
        topic: "Substrate",
        status: "decision",
        note: "Board-formed concrete carries timber grain and board lines, and an image will follow that relief in the same way brick does. Worth deciding up front whether you want the texture reading through the artwork or a flat face.",
      };
    case "concrete-block":
      return {
        topic: "Substrate",
        status: "prep",
        note: "Block usually needs filling and sealing before anything else happens. The published requirement is a surface that is smooth, clean, dry and properly prepared, and raw block is none of the first two. That is a real stage in the work, not a formality.",
      };
    case "original-plaster":
      return {
        topic: "Substrate",
        status: "prep",
        note: "Original plaster is rarely flat. It undulates across a run, it has been patched by various people to various standards, and it is the substrate that most rewards a proper survey before anything is agreed.",
      };
    case "panelled":
      return {
        topic: "Substrate",
        status: "ask",
        note: "Panelled systems vary enormously — material, joint detail and how they are fixed all change the answer. Send photographs of a joint close up as well as the whole run.",
      };
    case "painted-drywall":
    case "skim-plaster":
      return {
        topic: "Substrate",
        status: texture === "heavy" || texture === "deep-relief" ? "prep" : "ready",
        note:
          texture === "heavy" || texture === "deep-relief"
            ? "Drywall and skim coat are the most straightforward substrates, but a heavy texture finish still has to be flattened first if you want the artwork to read cleanly."
            : "Drywall and skim coat are the most straightforward substrates to work with, provided the surface is sound and properly prepared.",
      };
    case "unsure":
    default:
      return {
        topic: "Substrate",
        status: "ask",
        note: "Not knowing is a completely normal answer, especially in an older building. A photograph taken with a phone light held flat against the wall usually tells us more than a description would.",
      };
  }
}

function ageFinding(age: FinishAge): Finding {
  switch (age) {
    case "under-6-weeks":
      return {
        topic: "Finish age",
        status: "prep",
        note: "A newly finished wall is often less ready than an old one. Drywall compound, plaster and skim coats carry water when they go on and release it over time, and printing onto a surface still doing that introduces a variable nobody wants. Tell us the date it went up and whether the space has been heated and ventilated since.",
      };
    case "6-weeks-to-6-months":
      return {
        topic: "Finish age",
        status: "ask",
        note: "Probably fine, but worth confirming. How quickly a new finish dries depends heavily on whether the space has been heated and ventilated — a shell left open through a cold month behaves very differently from one closed and warm.",
      };
    case "over-6-months":
    case "years":
      return {
        topic: "Finish age",
        status: "ready",
        note: "An established finish has had time to dry out, so moisture from the build is unlikely to be the issue here.",
      };
    case "unsure":
    default:
      return {
        topic: "Finish age",
        status: "ask",
        note: "If the building or the fit-out is recent, try to find out roughly when the wall was finished. On a new build it is the single most useful thing to establish early.",
      };
  }
}

function textureFinding(texture: Texture): Finding {
  switch (texture) {
    case "smooth":
      return { topic: "Texture", status: "ready", note: "A smooth face is what you want. Fine detail and small text hold up best on it." };
    case "light":
      return {
        topic: "Texture",
        status: "ask",
        note: "A light orange-peel finish is usually workable. How much it shows through depends on the artwork — bold compositions are far more forgiving than fine detail.",
      };
    case "heavy":
      return {
        topic: "Texture",
        status: "prep",
        note: "A heavy texture roll finish will read through the artwork. If you want a clean result the surface needs flattening first, which is real work and should be priced and scheduled as such.",
      };
    case "deep-relief":
      return {
        topic: "Texture",
        status: "decision",
        note: "Deep relief is a design decision before it is a preparation question. Letting it show can look excellent with bolder work; a flat result means filling and levelling, which changes the character of the wall for good.",
      };
    case "unsure":
    default:
      return {
        topic: "Texture",
        status: "ask",
        note: "Hold a phone light flat against the wall so it shines along the surface rather than at it, then photograph. Texture that is invisible head-on shows up immediately.",
      };
  }
}

function coatingFinding(coating: Coating): Finding {
  switch (coating) {
    case "never-painted":
      return { topic: "Existing coatings", status: "ask", note: "A bare surface is straightforward to assess, though it may still need sealing depending on what it is made of." };
    case "painted":
      return { topic: "Existing coatings", status: "ready", note: "Painted walls are common and frequently workable, provided the existing paint is sound and properly prepared. Tell us the finish and sheen if you know them." };
    case "wallpapered":
      return {
        topic: "Existing coatings",
        status: "prep",
        note: "Anything previously wallpapered needs the old covering and its adhesive residue dealt with properly. Residual adhesive is a common cause of a surface that looks fine and behaves badly.",
      };
    case "sealed-limewashed":
      return {
        topic: "Existing coatings",
        status: "ask",
        note: "Sealed or limewashed surfaces are not the same as bare ones, and older buildings often carry coatings nobody remembers applying. Tell us what you know and say plainly where you do not — that is a normal answer for a building of that age.",
      };
    case "unsure":
    default:
      return { topic: "Existing coatings", status: "ask", note: "Unknown coating history is normal in an older building. Worth flagging so it can be checked rather than assumed." };
  }
}

function hollowFinding(hollow: Hollow): Finding {
  switch (hollow) {
    case "some":
      return {
        topic: "Hollow or patched areas",
        status: "prep",
        note: "Hollow sections need making good first, and that is true whatever finish goes on top — old plaster sometimes parts from the lath behind it. Note roughly where it sounds hollow and mention it at enquiry rather than leaving it to be found on site.",
      };
    case "none":
      return { topic: "Hollow or patched areas", status: "ready", note: "A wall that sounds solid throughout removes one of the more common causes of unplanned preparation work." };
    case "unsure":
    default:
      return {
        topic: "Hollow or patched areas",
        status: "ask",
        note: "Worth two minutes: tap along the wall with a knuckle and listen for anywhere the sound changes. It is much better as a known item in the plan than as a discovery on the day.",
      };
  }
}

function tenureFinding(tenure: Tenure): Finding {
  switch (tenure) {
    case "owned":
      return { topic: "Approvals", status: "ready", note: "Owning the space removes the approval question entirely and makes the conversation considerably shorter." };
    case "leased-known":
      return {
        topic: "Approvals",
        status: "ask",
        note: "Good that you have checked. A printed wall is a permanent finish rather than a graphic you peel off, so the end-of-term position should be a known cost from the start rather than a surprise later.",
      };
    case "leased-unsure":
    default:
      return {
        topic: "Approvals",
        status: "decision",
        note: "Two things to confirm before design work starts: whether your landlord has to approve a permanent finish, and whether the lease carries a reinstatement or make-good clause requiring the wall be returned to plain paint. Both are free to check and both are common reasons these projects stall.",
      };
  }
}

const HEADLINES: Record<FindingStatus, string> = {
  decision: "There is a decision to make before design starts",
  prep: "Workable, with preparation to plan for",
  ask: "Looks reasonable — a few things to confirm",
  ready: "Nothing here looks like an obstacle",
};

export function assessReadiness(answers: ReadinessAnswers): ReadinessResult {
  const findings: Finding[] = [
    substrateFinding(answers.substrate, answers.texture),
    ageFinding(answers.finishAge),
    textureFinding(answers.texture),
    coatingFinding(answers.coating),
    hollowFinding(answers.hollow),
    tenureFinding(answers.tenure),
  ];

  const worst = findings.reduce<FindingStatus>(
    (acc, f) => (SEVERITY[f.status] > SEVERITY[acc] ? f.status : acc),
    "ready",
  );

  const photos = [
    "The whole wall square-on, with everything that is fixed to it still in shot",
    "A raking-light shot — phone light held flat against the surface, shining along it",
    "The full run in overlapping sections if the wall is long, tall or turns a corner",
  ];
  if (answers.substrate === "exposed-brick" || answers.texture === "deep-relief") {
    photos.push("One close-up of the surface texture so the relief is readable");
  }
  if (answers.hollow !== "none") {
    photos.push("A note or marked photo showing roughly where the wall sounds hollow");
  }

  const summary = [
    "— Sent from the Wall Readiness Check —",
    `Substrate: ${answers.substrate}`,
    `Finish age: ${answers.finishAge}`,
    `Texture: ${answers.texture}`,
    `Existing coatings: ${answers.coating}`,
    `Hollow or patched areas: ${answers.hollow}`,
    `Tenure: ${answers.tenure}`,
    `Overall: ${HEADLINES[worst]}`,
  ].join("\n");

  return { findings, headline: HEADLINES[worst], photos, summary };
}
