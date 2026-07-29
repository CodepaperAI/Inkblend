import { image } from "./images";
import type { ToolRecord } from "./types";

/* ═══════════════════════════════════════════════════════════════════════════
   The ALLOWED FACTS / BANNED CLAIMS rules at the top of ./cities.ts apply here
   in full. Two additions specific to this family:

   ✗ NO PRICES ANYWHERE. Not ours, not market ranges, not "typical" figures,
     not seeded defaults in a calculator. The comparison tool works entirely on
     figures the visitor types in. There is a verification step that greps the
     built HTML under /tools for currency figures; seeding a default price here
     will fail it.

   ✗ NO PROMISED OUTCOMES. These tools advise. They never say a wall can
     definitely be printed, how long anything takes, or how long it lasts.
     Every result that depends on seeing the wall says so.

   Supporting content is not optional garnish. A thin page wrapped around a
   widget is precisely what Google devalues, which is why these records run
   through the same 900-word / 5-FAQ / similarity gate as every other page.
   ═══════════════════════════════════════════════════════════════════════════ */

export const tools: readonly ToolRecord[] = [
  /* ────────────────────── WALL READINESS CHECK ────────────────────── */
  {
    family: "tool",
    slug: "wall-readiness",
    pathname: "/tools/wall-readiness",
    toolId: "wall-readiness",
    title: "Wall Readiness Check",
    metaDescription:
      "Six questions about your wall — substrate, age, texture, coatings, hollow spots, tenure — and a straight answer on what it needs before anything is printed.",
    h1: "Can your wall actually be printed?",
    intro:
      "Almost every disappointing wall-printing job traces back to the surface rather than the artwork. A wall that looked fine head-on turned out to be textured, or hollow in places, or freshly plastered and still drying, or wallpapered a decade ago with the adhesive never fully removed. None of that is exotic and all of it is knowable in advance. Six questions below, and you get a straight read on what your wall needs — including the answers that are honestly \"we would need to see it\".",
    formSourceId: "tool-wall-readiness",
    toolHeading: "Answer six questions about the wall",
    useWhen: [
      "You have a wall in mind but do not know whether it is suitable",
      "The building is older and the surface is uneven or unknown",
      "The space was recently built, plastered or decorated",
      "You lease the unit and have not checked what the lease allows",
      "You want to know what to photograph before getting in touch",
    ],
    hero: image("concreteFeatureWall", "a textured feature wall — the kind of surface this check is for"),
    benefits: [
      {
        icon: "scan",
        title: "It tells you when the answer is no",
        description:
          "A tool that says yes to everything is worthless. This one flags decisions you have to make and surfaces we would need to see before saying anything useful.",
      },
      {
        icon: "droplets",
        title: "It catches the moisture problem",
        description:
          "Freshly finished walls hold water from the build. It is the single most common avoidable mistake on new construction, and nobody asks about it.",
      },
      {
        icon: "camera",
        title: "It tells you what to photograph",
        description:
          "Including the raking-light shot almost nobody takes — a phone light held flat against the wall, which reveals what a straight-on photo completely hides.",
      },
      {
        icon: "clipboard",
        title: "It flags approvals before design",
        description:
          "If you lease, there are two things to check before anyone designs anything. Discovering them later is one of the most common reasons a project stalls.",
      },
    ],
    factTableHeading: "What the check asks, and why each question matters",
    factRows: [
      {
        label: "Substrate",
        value:
          "Brick, block, plaster and drywall behave completely differently. Brick and board-formed concrete are a design decision before they are a preparation question.",
      },
      {
        label: "How recent the finish is",
        value:
          "Drywall compound, plaster and skim coats carry water when they go on and release it over time. A new wall is often less ready than an old one.",
      },
      {
        label: "Texture",
        value:
          "A heavy texture roll finish reads through artwork. Fine detail and small text are the first casualties; bolder compositions are far more forgiving.",
      },
      {
        label: "Previous coatings",
        value:
          "Anything previously wallpapered needs the adhesive residue properly dealt with. Sealed and limewashed surfaces are not the same as bare ones.",
      },
      {
        label: "Hollow or patched areas",
        value:
          "Old plaster sometimes parts from the lath behind it. Tap along the wall and listen for where the sound changes — two minutes now saves a discovery on site.",
      },
      {
        label: "Owned or leased",
        value:
          "A printed wall is a permanent finish, not a peel-off graphic. Landlord consent and any reinstatement clause both want checking before design work.",
      },
    ],
    sections: [
      {
        heading: "The surface is most of the job",
        body: [
          "There is a persistent assumption that printing onto a wall is mostly about the printing. In practice the image is the last and most predictable stage, and everything interesting happens before it. Ink Blend's published requirement is a surface that is smooth, clean, dry and properly prepared — four words that between them cover filling, sealing, flattening, making good and simply waiting.",
          "This matters commercially as well as technically, because surface preparation is the single most common reason two quotes for the same wall come back at different numbers. One supplier has looked at the wall and priced the work it needs; the other has priced the printing and will raise the rest later. Knowing what your own wall needs makes you a much harder person to quote badly.",
          "The check deliberately returns \"we would need to see it\" where that is the honest answer. Any tool that produces a confident verdict on a surface it has never seen is selling certainty it does not have.",
        ],
      },
      {
        heading: "Texture is a decision, not a defect",
        body: [
          "Brick, board-formed concrete and deep-relief plaster all have a face that an image will follow. That is frequently the reason people want those walls in the first place, and letting the texture read through the artwork can look genuinely excellent — a lot of the appeal of a converted-warehouse interior comes from exactly that honesty about the building's fabric.",
          "What it will not do is hold fine detail. Small text, thin linework and delicate gradients disappear into a mortar line. So a textured wall pushes you toward bolder compositions with larger forms, and that is a creative constraint worth knowing before a designer starts rather than after.",
          "The alternative is filling and levelling for a flat face. It works, it is real work, and it permanently changes the character of the wall. Neither answer is wrong. What causes disappointment is not choosing, and then discovering which way it went after the fact.",
        ],
      },
      {
        heading: "What to send once you have your result",
        body: [
          "The single most useful photograph is the one almost nobody takes. Hold a phone light flat against the wall so it shines along the surface rather than at it, then photograph. Every ripple, patch, hollow and texture change appears immediately. On an older wall it tells us more in one image than a dozen straight-on shots.",
          "Alongside that, send the wall square-on with everything still fixed to it — the shelving, the screen, the switch plates, the exit sign. Photographs that mentally edit those out produce concepts that have to be redone once the real constraints appear. If the wall is long, tall or turns a corner, send overlapping sections rather than one attempt at the whole thing. Stairwells in particular are almost never captured in a single frame.",
          "The check writes your answers into a summary you can send with the enquiry. That is the point of it — a wall description with substrate, age, texture, coatings and tenure already answered is worth considerably more than a message saying you have a wall and would like a price.",
        ],
      },
    ],
    faqs: [
      {
        question: "I answered 'not sure' to most of it. Is the result still useful?",
        answer:
          "Yes, and not knowing is a completely normal answer in an older building. The check will tell you which unknowns actually matter and how to resolve them — usually with a torch, a knuckle and two minutes. It is designed to turn vague uncertainty into a specific short list rather than to punish you for not being a surveyor.",
      },
      {
        question: "Why does it care how recently the wall was finished?",
        answer:
          "Because a brand-new wall is often less ready than a twenty-year-old one. Drywall compound, plaster and skim coats all carry water when they go on and release it over time, and printing onto a surface still doing that introduces a variable nobody wants. It is the most common avoidable mistake on new construction.",
      },
      {
        question: "Does a 'needs preparation' result mean you cannot do it?",
        answer:
          "No. It means there is a stage before the printing that has to be planned and paid for rather than discovered. Filling, sealing, flattening a texture or making good a hollow section is ordinary work. The point of flagging it is that it should be in the quote from the start.",
      },
      {
        question: "Will this give me a price?",
        answer:
          "No, and deliberately so. Ink Blend quotes per wall rather than from a rate card, and a number produced by a form that has never seen your surface would be a guess dressed up as an answer. The Quote Planner will tell you what moves the number, which is more useful than a figure you cannot rely on.",
      },
      {
        question: "How do I tell if the wall is hollow?",
        answer:
          "Tap along it with a knuckle and listen for anywhere the sound changes from solid to drummy. Old plaster sometimes parts from the lath behind it, and those sections need making good whatever finish goes on top. Note roughly where it happens and mention it — it is far better as a known item than as a surprise on the day.",
      },
      {
        question: "I rent the space. What exactly should I ask my landlord?",
        answer:
          "Two things. Whether they need to approve a permanent finish to a base-building wall, and whether your lease carries a reinstatement or make-good clause requiring the wall be returned to plain paint at the end of term. Both are free to ask and both are common reasons these projects stall halfway.",
      },
    ],
    gallery: [
      image("handPaintedBrickMural", "exposed brick — a substrate where texture is a decision, not a defect"),
      image("livingRoomBlankWalls", "smooth blank walls, the most straightforward case"),
      image("cgiBlankFeatureWall", "a bare feature wall of the kind these checks start from"),
    ],
    ctaHeading: "Send us the wall with your answers attached",
    ctaBody:
      "The check writes your answers into a summary. Add a square-on photo, a raking-light shot and rough measurements, and you will get a specific reply rather than a request for more information.",
    related: [
      "/tools/artwork-resolution",
      "/tools/quote-planner",
      "/tools/service-area",
      "/wall-printing/hamilton",
      "/wall-printing/vaughan",
    ],
  },

  /* ──────────────────── ARTWORK RESOLUTION CHECKER ──────────────────── */
  {
    family: "tool",
    slug: "artwork-resolution",
    pathname: "/tools/artwork-resolution",
    toolId: "artwork-resolution",
    title: "Artwork Resolution Checker",
    metaDescription:
      "Enter your wall size and your image's pixel dimensions. Get the effective PPI at print size, whether it holds up at your viewing distance, and what you would need.",
    h1: "Is your image big enough for that wall?",
    intro:
      "This is the question that stalls more projects than any other, and it is nearly always discovered too late — after the concept is approved, after the date is booked, when the file finally arrives and turns out to be a logo pulled off a website at nine hundred pixels wide. Enter your wall size and your image's pixel dimensions below and you will get the effective resolution at print size, an honest verdict against how far away people will actually stand, and the file size you would need instead.",
    formSourceId: "tool-artwork-resolution",
    toolHeading: "Enter the wall and the image",
    useWhen: [
      "You have artwork and want to know if it will hold up at wall scale",
      "Someone has sent you a file and you are not sure it is usable",
      "You are commissioning artwork and need to specify a size",
      "You want to know how much of an image gets cropped to fit a wall",
      "You are deciding between a photograph and a vector illustration",
    ],
    hero: image("abstractPaintingMacro", "artwork at close range, showing how detail reads at scale"),
    benefits: [
      {
        icon: "ruler",
        title: "Viewing distance, not a single DPI number",
        description:
          "The honest answer depends on how far away people stand. A wall seen from six feet does not need what a wall seen from arm's length needs.",
      },
      {
        icon: "scan",
        title: "It shows the crop, not just the resolution",
        description:
          "Your image and your wall rarely share an aspect ratio. The tool tells you which edge overflows and how much of the picture you lose.",
      },
      {
        icon: "layers",
        title: "It says when to use vector instead",
        description:
          "For logos, lettering and script the resolution question does not apply at all. Vector artwork scales to any size without losing anything.",
      },
      {
        icon: "clipboard",
        title: "It gives you a number to ask for",
        description:
          "If the file is short, you get the exact pixel dimensions to request — far more useful to a photographer or designer than 'as big as possible'.",
      },
    ],
    factTableHeading: "How the verdict is worked out",
    factRows: [
      {
        label: "Effective PPI",
        value:
          "Your image's pixels divided by the finished print size in inches, using whichever axis is the limiting one once the image is scaled to cover the wall.",
      },
      {
        label: "Arm's length",
        value:
          "Around 300 PPI. Anything read close up — a reception desk edge, a wall beside a seat, lettering people stand next to.",
      },
      {
        label: "Two to three feet",
        value:
          "Around 220 PPI. Corridor walls, booth and banquette backs, smaller rooms where people pass close to the surface.",
      },
      {
        label: "Four to six feet",
        value:
          "Around 150 PPI. The common case: a feature wall in a dining room, office or living space, seen from across furniture.",
      },
      {
        label: "Across the room",
        value:
          "Around 100 PPI. Hall walls, lobbies and large venues, where nobody gets close enough for finer detail to register.",
      },
      {
        label: "Crop",
        value:
          "Where your image and the wall have different proportions, one axis overflows. The tool reports which, and what fraction of the image is lost.",
      },
    ],
    sections: [
      {
        heading: "Why there is no single right DPI",
        body: [
          "Ask what resolution a mural needs and you will usually be told 300 DPI, which is the correct answer for something held in your hands and a wasteful one for something on a wall. The variable that actually decides it is viewing distance. Published large-format guidance is consistent on this: roughly 300 PPI for handheld viewing, around 200 to 240 for wall art seen at two to three feet, and 100 to 150 for large pieces seen from four to six feet.",
          "The reason is simply that human vision has limits. A poster viewed from six feet cannot be told apart at 150 PPI versus 300 — the extra detail is genuinely invisible, and insisting on it means a file four times larger for no visible gain. This matters at wall scale more than anywhere else, because a demand for 300 PPI across twelve feet produces a file that is difficult to produce, slow to handle and no better to look at.",
          "So the tool asks how far away people will stand, and grades against that. Where a file is close but not quite there it says marginal rather than failing it, because marginal is often perfectly acceptable and worth a conversation rather than an automatic rejection.",
        ],
      },
      {
        heading: "Vector artwork does not have this problem",
        body: [
          "If your artwork is a logo, lettering, a diagram or an illustration built from shapes, the entire resolution question falls away. Vector files describe geometry rather than pixels, so they scale to any size with no loss whatsoever. A vector logo works identically on a business card and on a twelve-foot wall.",
          "This is particularly relevant to script and calligraphic work. Setting Gurmukhi, Devanagari, Urdu, Arabic, Hebrew or any other script at architectural scale should always start from live text converted to clean vector outlines, never from a photograph or screenshot of the text. Conjuncts and ligatures that read perfectly at body size can collide or break apart when they are metres tall, and that is a problem to solve in the outlines rather than in the pixels.",
          "The practical implication: if you are commissioning artwork and it could plausibly be built as vector, ask for it that way. It removes an entire category of problem before it exists.",
        ],
      },
      {
        heading: "What to do when the file is short",
        body: [
          "A shortfall is not automatically fatal. The first question is whether the viewing distance you selected is genuinely right — people often pick a stricter one than the room warrants, and a hall wall really is seen from across a room. Re-running with an honest distance sometimes resolves it entirely.",
          "If it is genuinely short, the tool gives you the pixel dimensions you would need. That number is worth having, because \"send me a bigger file\" is an unhelpful request and \"I need at least 7,200 by 4,800 pixels\" is one a photographer or stock library can act on immediately. If the image came from a camera, the original raw or full-size export is frequently several times larger than whatever has been passed around by email.",
          "What does not work is upscaling a small file and hoping. Enlargement software can invent plausible detail, but at wall scale, across a surface someone will stand in front of for years, invented detail tends to look exactly like what it is. It is better to change the image, change the crop, or change the composition to suit what you actually have.",
        ],
      },
    ],
    faqs: [
      {
        question: "My file is 'marginal'. Should I use it or not?",
        answer:
          "Marginal means it sits between about 70 per cent of the target and the target itself, which is frequently fine in practice and worth a conversation rather than an automatic no. Two things shift it: whether the viewing distance you chose is genuinely honest, and how much fine detail the image carries. Bold compositions tolerate lower resolution far better than delicate ones.",
      },
      {
        question: "Why does the tool say part of my image will be cropped?",
        answer:
          "Because your image and your wall almost certainly have different proportions. Scaling the picture to cover the wall means one axis overflows the edges. The tool tells you which axis and what fraction is lost, so you can decide whether the important part of the picture survives — or whether the composition needs rethinking rather than the file replacing.",
      },
      {
        question: "Can you not just enlarge the file for me?",
        answer:
          "Upscaling invents detail rather than recovering it, and at wall scale invented detail generally looks like exactly that. It is a reasonable last resort for a soft background and a poor idea for anything with edges, text or faces. Changing the image, the crop or the composition usually produces a better wall than enlarging a small file does.",
      },
      {
        question: "What about a logo — does the same apply?",
        answer:
          "Not if you have it as vector, which for a logo you usually should. Vector files describe shapes rather than pixels and scale to any size with no loss at all. If all you have is a PNG or JPEG of the logo, it is nearly always worth having it redrawn as vector rather than trying to make the bitmap work at wall size.",
      },
      {
        question: "Which viewing distance should I pick if I am unsure?",
        answer:
          "Stand where people will actually be — seated at the nearest table, walking the corridor, waiting at the desk — and be honest about it rather than cautious. Picking a closer distance than reality means demanding a much bigger file for detail nobody will ever see. If two options seem plausible, run both and see whether the verdict even changes.",
      },
      {
        question: "Does a higher-resolution file always give a better result?",
        answer:
          "Only up to the point where your eyes stop being able to tell. Beyond the target for a given viewing distance, extra pixels add file size and handling difficulty without adding anything visible. Composition, colour and how the artwork suits the room matter far more to how a finished wall reads than resolution beyond the threshold does.",
      },
    ],
    gallery: [
      image("abstractPaintingMacro", "fine detail and texture at close range"),
      image("curvedBuildingExterior", "a photographic subject of the kind often proposed for a large wall"),
      image("cgiFurnishedLivingRoom", "a rendered interior, shown as a visualisation example"),
    ],
    ctaHeading: "Send the wall size and the file you have",
    ctaBody:
      "If the checker says your file is short, send it anyway along with the wall measurements. There is often a larger original, a better crop, or a vector version that solves it outright.",
    related: [
      "/tools/wall-readiness",
      "/tools/quote-planner",
      "/tools/service-area",
      "/industries/religious-and-cultural-spaces",
      "/industries/offices-and-corporate",
    ],
  },

  /* ─────────────────────────── QUOTE PLANNER ─────────────────────────── */
  {
    family: "tool",
    slug: "quote-planner",
    pathname: "/tools/quote-planner",
    toolId: "quote-planner",
    title: "Quote Planner",
    metaDescription:
      "What actually moves the price of a printed wall — and a ten-year comparison that runs on the quotes you have already been given, not on numbers we made up.",
    h1: "What will actually move your quote",
    intro:
      "You will not find a price on this page, and it is worth saying why up front. Ink Blend quotes per wall rather than from a rate card, and a figure produced by a form that has never seen your surface would be a guess wearing a suit. What this page does instead is more useful: it tells you which specific things about your project will push the number up or down, and it lets you run a ten-year comparison using the quotes you have actually been given.",
    formSourceId: "tool-quote-planner",
    toolHeading: "Profile your project, then compare your own quotes",
    useWhen: [
      "You are trying to budget and want to know what drives the number",
      "You have quotes from more than one supplier and they differ wildly",
      "You are weighing a printed wall against vinyl or repainting",
      "You want to know what to sort out before asking for a price",
      "You need to justify the decision to someone else",
    ],
    hero: image("glassOfficeCorridor", "a commercial interior of the kind these quotes cover"),
    benefits: [
      {
        icon: "clipboard",
        title: "It explains why two quotes differ",
        description:
          "Usually surface preparation. One supplier has priced the work the wall needs; the other has priced the printing and will raise the rest later.",
      },
      {
        icon: "layers",
        title: "It runs on your numbers, not ours",
        description:
          "The comparison takes the figures you have been quoted. We supply the arithmetic and nothing else, which is why you can trust the output.",
      },
      {
        icon: "ruler",
        title: "It finds the break-even year",
        description:
          "A cheaper option reapplied every few years stops being cheaper at some point. The tool tells you which year that happens in your case.",
      },
      {
        icon: "shield",
        title: "It tells you what to fix first",
        description:
          "The drivers come back ordered by how much they matter, so you know which conversation to have before you ask anyone for a number.",
      },
    ],
    factTableHeading: "The things that genuinely move a wall printing quote",
    factRows: [
      {
        label: "Surface preparation",
        value:
          "The biggest single variable, and the most common reason two quotes for the same wall differ. Filling, sealing, flattening a texture or making good a hollow section all happen before any printing.",
      },
      {
        label: "Wall area",
        value:
          "Beyond a certain width a job stops being a single session, and access equipment and working time both scale. Measure rather than pace it out — walls are routinely larger than described.",
      },
      {
        label: "Access",
        value:
          "No loading bay, a shared lift, stairs, restricted hours or an overnight-only window all change how the work has to be organised. Downtown this shapes a schedule more than the wall does.",
      },
      {
        label: "Artwork readiness",
        value:
          "A print-ready file and a rough idea are very different starting points. Origination — concept, design, production files — is a distinct piece of work from printing.",
      },
      {
        label: "Approvals",
        value:
          "A landlord has a timetable. A board or committee meets on its own schedule and that schedule becomes the project timeline. Neither can be compressed by a supplier.",
      },
      {
        label: "What does not move it much",
        value:
          "Number of colours, and complexity of the image in itself. This is not screen printing — a photograph and a flat graphic of the same size are much closer than people assume.",
      },
    ],
    sections: [
      {
        heading: "Why there is no price on this page",
        body: [
          "Plenty of competitors publish a per-square-foot figure, and it is a fair question why this page does not. The straightforward answer is that Ink Blend has not published rates, and inventing a number to fill the gap would be worse than leaving it empty. A range presented on a supplier's own site reads as that supplier's price, whatever the small print says, and a visitor who anchors on a figure we made up is being misled even if every word around it is hedged.",
          "The second reason is that per-square-foot pricing describes the printing and not the job. Two identical walls where one needs filling and sealing and the other does not are genuinely different pieces of work, and any rate quoted before someone has looked at the surface is going to be revised. Where a supplier's headline rate is very low, the preparation is usually where the difference reappears.",
          "So this page does the thing that is actually useful without a number attached: it tells you what will move yours, in order, so you can sort out the expensive unknowns before you ask anyone for a figure.",
        ],
      },
      {
        heading: "Comparing over ten years, with your own figures",
        body: [
          "The comparison is where a printed wall either justifies itself or does not, and it depends entirely on numbers only you have. So the tool asks for them. Enter what you have been quoted for each option you are weighing, along with how long you expect each to last before it needs doing again, and it works out the cumulative position across a decade.",
          "The mechanic that matters is repetition. An option that costs less up front but has to be redone every few years accumulates, and at some point the cumulative lines cross. The tool reports that year explicitly, because \"cheaper\" and \"cheaper over the period you will own the space\" are frequently different answers — and which one applies depends on your lease, your plans and how long you intend to look at the wall.",
          "We supply no figures at all here, including no default lifespans. How long any finish lasts depends on preparation, traffic, light exposure and maintenance, and a supplier asserting a number for a wall they have not seen is guessing. Use your own quotes and your own honest expectations, and the arithmetic will be sound because the inputs are yours.",
        ],
      },
      {
        heading: "What to sort out before you ask for a price",
        body: [
          "Three things make the difference between a quote you can rely on and a number that moves later. First, measure the wall properly — full width and height, and everything interrupting the face: recesses, returns, switch plates, thermostats, existing signage. Second, establish the surface, ideally by running the Wall Readiness Check, because preparation is the variable most likely to change a figure after the fact.",
          "Third, sort out the approvals. If you lease, find out whether the landlord has to consent and what the reinstatement clause requires. If a board or committee decides, find out when they next meet. Neither of these changes the price directly, but both routinely turn a straightforward project into a stalled one, and starting them early costs nothing.",
          "Do those three and the quote you get back will be specific rather than provisional. It also makes you much harder to quote badly, because a supplier can see you already know what the job involves.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why will you not just publish a price range?",
        answer:
          "Because Ink Blend has not published rates, and a range on a supplier's own site reads as that supplier's price no matter how it is captioned. A visitor anchoring on a number we invented is being misled even if every word around it is hedged. The honest version of this page is one that tells you what moves your number instead.",
      },
      {
        question: "Two suppliers quoted me very different amounts. Why?",
        answer:
          "Most often surface preparation. One has looked at the wall and priced the filling, sealing or flattening it needs; the other has priced the printing and will raise the preparation later. Ask both explicitly what surface work is included. Where a headline rate is unusually low, that is normally where the difference reappears.",
      },
      {
        question: "What figures should I put into the comparison?",
        answer:
          "Whatever you have actually been quoted, and your own honest expectation of how long each option lasts before it needs redoing. Do not use figures from the internet — the whole value of the comparison is that the inputs are real and specific to your wall, your building and your quotes.",
      },
      {
        question: "Does a more complex image cost more to print?",
        answer:
          "Far less than people expect. This is not screen printing, so the number of colours is not the driver it would be there, and a photograph and a flat graphic of the same size are much closer than most assume. What does cost more is artwork origination — if the image has to be created rather than supplied, that is a distinct piece of work.",
      },
      {
        question: "Is the break-even year a prediction?",
        answer:
          "No. It is arithmetic on the numbers you entered, including the lifespans you supplied. If your assumption about how long something lasts is wrong, the break-even year moves with it. Treat it as a way of testing your own assumptions rather than as a forecast of what will happen.",
      },
      {
        question: "How do I get an actual quote from this?",
        answer:
          "Run the profile, then send it with your wall photographs and measurements. A message that already answers the surface, access, artwork and approvals questions gets a specific reply. One that says you have a wall and would like a price gets a request for exactly that information first.",
      },
    ],
    gallery: [
      image("concreteFeatureWall", "a wall whose surface condition drives the number more than its size"),
      image("banquetTableSetting", "a venue setting where wall area is usually underestimated"),
      image("panelledHallwayFramedArt", "framed prints, one of the alternatives worth comparing against"),
    ],
    ctaHeading: "Send the profile with your photographs",
    ctaBody:
      "The planner writes your answers into a summary. Attach it to your enquiry with wall photographs and measurements and you will get a specific answer rather than a request for more detail.",
    related: [
      "/tools/wall-readiness",
      "/tools/artwork-resolution",
      "/tools/service-area",
      "/industries/hotels-and-condos",
      "/wall-printing/mississauga",
    ],
  },

  /* ────────────────────── SERVICE AREA CHECKER ────────────────────── */
  {
    family: "tool",
    slug: "service-area",
    pathname: "/tools/service-area",
    toolId: "service-area",
    title: "Service Area Checker",
    metaDescription:
      "Enter a Canadian postal code and find out whether we have your area mapped, which local page applies, and what happens if you are outside it.",
    h1: "Do we cover where you are?",
    intro:
      "Direct-to-wall printing means putting equipment and an operator in the room, so unlike a product that ships, it has a geography. This page answers the question directly. Enter a postal code and you will get one of three honest answers: yes and here is the page for your area, probably and let us confirm, or you are outside what we have mapped and here is what to do about it. It will never tell you no on the basis of a code it does not recognise.",
    formSourceId: "tool-service-area",
    toolHeading: "Enter a Canadian postal code",
    useWhen: [
      "You are outside the obvious core of the Greater Toronto Area",
      "You want to know before spending time on a detailed enquiry",
      "You are a designer or contractor working across several sites",
      "You want the page that covers your specific city",
      "You are not sure whether your area counts as the GTA",
    ],
    hero: image("curvedBuildingExterior", "the urban building stock across the mapped service area"),
    benefits: [
      {
        icon: "scan",
        title: "Verified postal data, not guesswork",
        description:
          "Every mapped code was checked against Canada Post's published listing and the municipal FSA index. A wrong coverage answer is the one thing a visitor checks immediately.",
      },
      {
        icon: "shield",
        title: "It never says no on incomplete data",
        description:
          "An Ontario code we do not recognise returns 'probably, let us confirm'. You cannot prove a negative from an incomplete map, so it does not pretend to.",
      },
      {
        icon: "building",
        title: "It routes you to your own page",
        description:
          "A match takes you to the page for your city, where the local building stock, approvals and access constraints are already covered.",
      },
      {
        icon: "clipboard",
        title: "It saves the phone call",
        description:
          "'Do you come out this far' is the most common first question and the least useful one. Answer it in three seconds and get to the actual project.",
      },
    ],
    factTableHeading: "How coverage is worked out",
    factRows: [
      {
        label: "What is checked",
        value:
          "The first three characters of a Canadian postal code — the Forward Sortation Area, or FSA. That is enough to identify the municipality without asking for your full address.",
      },
      {
        label: "Mapped areas",
        value:
          "Brampton, Mississauga, Toronto, Vaughan, Oakville and Hamilton, including Stoney Creek, Dundas, Ancaster, Woodbridge, Maple and Concord.",
      },
      {
        label: "Toronto",
        value:
          "Toronto is the only city in Canada with an exclusive first letter. Any code beginning with M is Toronto, with two documented facility exceptions.",
      },
      {
        label: "Unmapped Ontario codes",
        value:
          "Returned as 'probably' rather than 'no'. We serve the Greater Toronto Area broadly, and the map is deliberately incomplete rather than padded with guesses.",
      },
      {
        label: "Deliberately unmapped",
        value:
          "L3T, covering Thornhill, straddles Vaughan and Markham. Routing everyone there to the Vaughan page would be wrong for half of them, so it is left to a conversation.",
      },
      {
        label: "Other provinces",
        value:
          "Outside the mapped area. Getting equipment and an operator to another province is a different conversation, not an automatic no — but it is one to have directly.",
      },
    ],
    sections: [
      {
        heading: "Why on-site printing has a geography",
        body: [
          "A printed wall is not a product that arrives in a box. The image goes onto the prepared surface in the room itself, which means equipment, an operator and a working window all have to reach your building. That is the whole reason direct-to-wall printing produces a seamless result — and it is also why, unlike ordering wallpaper, there is a practical radius.",
          "This is worth being straightforward about because the alternative is wasting your time. A supplier who takes a detailed enquiry from four hours away and then discovers the travel makes it unworkable has cost you a week. Three seconds and a postal code is a better opening move for everyone.",
          "Being outside the mapped area is not automatically a no. Larger projects justify travel that smaller ones do not, and a run of several walls in one building is a different proposition from a single feature wall. The honest answer is that it depends on scope, which is a conversation rather than a form field.",
        ],
      },
      {
        heading: "How the map is built, and where it stops",
        body: [
          "Coverage is worked out from the Forward Sortation Area — the first three characters of a Canadian postal code, which identify the delivery area. Every code in the map was verified against Canada Post's published FSA listing and the municipal index rather than written from memory. That distinction matters: a wrong coverage answer is the single fact a visitor checks against their own address within seconds, and getting it wrong costs more credibility than having no tool at all.",
          "Where the sources did not confirm something, it is left out rather than guessed at. A handful of Mississauga codes and the Thornhill area are deliberately unmapped — Thornhill in particular straddles Vaughan and Markham, and since Markham is not currently a mapped area, sending every Thornhill visitor to the Vaughan page would be wrong for around half of them.",
          "The consequence is that the map is incomplete by design, and the tool behaves accordingly. An Ontario code it does not recognise comes back as probably rather than no, because an incomplete map cannot prove a negative. Only a code from another province is reported as outside the mapped area, and even then the message is to ask rather than to give up.",
        ],
      },
      {
        heading: "If you are a designer or contractor",
        body: [
          "Multi-site work behaves differently from a single wall, and it is worth saying so at the enquiry rather than checking each address individually. A design practice specifying the same treatment across several locations, or a contractor coordinating a rollout, is a different scheduling problem — and frequently a more workable one, because several walls in one visit justify travel that one wall would not.",
          "The same applies to a single building with multiple walls. A lobby, a corridor and an amenity room in one property is one mobilisation rather than three, which changes what is practical.",
          "If your sites span the mapped area and beyond, send the full list. It is much easier to give a useful answer about the whole programme than to respond to six separate enquiries that each look marginal in isolation.",
        ],
      },
    ],
    faqs: [
      {
        question: "My postal code came back as 'probably'. What does that actually mean?",
        answer:
          "It means your code is in Ontario but not one of the specific areas mapped so far. The map is deliberately incomplete rather than padded with codes we could not verify, so an unrecognised Ontario code gets an honest 'let us confirm' instead of a no we cannot justify. In practice most of the Greater Toronto Area is workable.",
      },
      {
        question: "I am outside Ontario. Is that a definite no?",
        answer:
          "Not automatically, but it is a real conversation rather than a form answer. Direct-to-wall printing means transporting equipment and an operator, so distance genuinely matters. Larger projects and multi-wall programmes justify travel that a single feature wall does not, so tell us the scope rather than assuming.",
      },
      {
        question: "Why do you only ask for the first part of the postal code?",
        answer:
          "Because that is all that is needed. The first three characters identify the delivery area, which is enough to work out the municipality. There is no reason to ask for a full address to answer a coverage question, so the tool does not.",
      },
      {
        question: "Thornhill did not match. Is that a mistake?",
        answer:
          "No, it is deliberate. The Thornhill FSA straddles Vaughan and Markham, and Markham is not currently one of the mapped areas. Routing every Thornhill visitor to the Vaughan page would be wrong for roughly half of them, so it returns 'probably' and invites a conversation instead of guessing.",
      },
      {
        question: "Do you charge more further out?",
        answer:
          "There is no published pricing on this site at all, including travel, so the honest answer is that it is part of the quote rather than a separate published figure. What is worth knowing is that scope affects it — several walls in one visit spread any travel across the whole job in a way a single wall does not.",
      },
      {
        question: "I have sites in several cities. How should I ask?",
        answer:
          "Send the full list in one enquiry rather than checking each address separately. A programme across multiple locations is a different scheduling problem from a single wall, and often a more workable one. Six separate enquiries each look marginal in isolation; one list of six sites usually does not.",
      },
    ],
    gallery: [
      image("glassOfficeCorridor", "commercial interiors across the mapped area"),
      image("handPaintedBrickMural", "older building stock of the kind found across the region"),
      image("livingRoomBlankWalls", "residential interiors within the service area"),
    ],
    ctaHeading: "Tell us the address and the wall",
    ctaBody:
      "Whether the checker matched your area or not, the useful next step is the same: send the wall photographs, rough measurements and what the space is used for. Coverage questions are quickest to settle alongside a real project.",
    related: [
      "/tools/wall-readiness",
      "/tools/artwork-resolution",
      "/tools/quote-planner",
      "/wall-printing/brampton",
      "/wall-printing/oakville",
    ],
  },
];
