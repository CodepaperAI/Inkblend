import { image } from "./images";
import type { IndustryRecord } from "./types";

/* ═══════════════════════════════════════════════════════════════════════════
   The ALLOWED FACTS / BANNED CLAIMS rules at the top of ./cities.ts apply to
   this file in full. Read them before editing anything here.

   Additional rule for this family: city pages own place, logistics and
   substrate. Industry pages own the BUYER'S OPERATIONAL PROBLEM — what the
   room has to survive, who signs it off, and how it is lived with afterwards.
   If an industry page starts explaining loading access or wall build-up, it is
   drifting into city-page territory and will push pairwise similarity up.
   ═══════════════════════════════════════════════════════════════════════════ */

export const industries: readonly IndustryRecord[] = [
  /* ─────────────────────── RESTAURANTS & CAFES ─────────────────────── */
  {
    family: "industry",
    slug: "restaurants-and-cafes",
    pathname: "/industries/restaurants-and-cafes",
    industry: "Restaurants and cafés",
    spaceTypes: [
      "Dining rooms and banquettes",
      "The wall behind the pass",
      "Bar backs and service counters",
      "Waiting areas and entrance vestibules",
      "Private dining and function rooms",
    ],
    title: "Wall Printing for Restaurants and Cafés",
    metaDescription:
      "Printed walls built for kitchens and dining rooms: grease, heat, daily cleaning, and the one wall every diner photographs. What to plan for before you commit.",
    h1: "Printed walls that survive a working restaurant",
    intro:
      "A restaurant wall has two jobs and they pull in opposite directions. It has to look like the reason someone chose the room, and it has to survive a kitchen environment, a cleaning regime and several hundred people a week making contact with it. Most wall-graphic disappointments in hospitality are not design failures. They are placement failures — the right image in a spot that was always going to take grease, heat or a chair back.",
    formSourceId: "industry-restaurants",
    toolPrompt:
      "Menu photography and food shots are the artwork operators reach for first, and they are frequently the files least able to survive wall scale. Check yours before it becomes a print-day problem.",
    hero: image("handPaintedCraneMural", "a restaurant mural — this one hand-painted, shown as context"),
    benefits: [
      {
        icon: "droplets",
        title: "Planned around the cleaning regime",
        description:
          "Tell us what the wall gets wiped with and how often. A surface cleaned nightly with a degreaser is a different brief from one dusted weekly.",
      },
      {
        icon: "utensils",
        title: "Heat and grease zones mapped",
        description:
          "Anything near a pass, a grill line or a coffee machine lives in a different environment from the far wall of the dining room. Say which zone the wall is in.",
      },
      {
        icon: "camera",
        title: "Composed for the photograph",
        description:
          "Diners photograph one wall and it is rarely the biggest. It is usually the one behind the best-lit seats. Tell us where people actually sit.",
      },
      {
        icon: "ruler",
        title: "Kept above the contact line",
        description:
          "Chair backs, trays, service trolleys and shoulders all hit at predictable heights. Detail that matters should live above them, not behind them.",
      },
    ],
    factTableHeading: "What we need to know about the room",
    factRows: [
      {
        label: "Zone",
        value:
          "Dining room, bar back, behind the pass, waiting area, private room, or a corridor to the washrooms.",
      },
      {
        label: "Cleaning",
        value:
          "What the wall is cleaned with and how often. Degreasers and sanitisers are harsher than most people assume.",
      },
      {
        label: "Heat and moisture",
        value:
          "Proximity to a grill line, a pass, a dishwasher, a coffee station or an extraction unit.",
      },
      {
        label: "Contact",
        value:
          "Whether seating backs onto the wall, and whether trolleys, high chairs or trays pass along it.",
      },
      {
        label: "Seating plan",
        value:
          "Where people actually sit, which tables get requested, and which seats are best lit at service time.",
      },
      {
        label: "Fixtures",
        value:
          "Shelving, taps, menu boards, service points and lighting currently fixed to the wall.",
      },
    ],
    sections: [
      {
        heading: "The cleaning conversation nobody starts",
        body: [
          "Ask a restaurateur what happens to their walls and the answer is usually 'we wipe them'. Ask what with, and you find out the dining room gets a mild detergent while the wall by the pass gets hit with a degreaser every close. Those are not the same environment and they should not carry the same brief. It is a five-second question that changes the recommendation, and it is almost never asked before a wall is designed.",
          "The honest position is that any finish in a food environment has a working life shaped by what it is subjected to. Ink Blend publishes that UV printing is designed for long-lasting visual impact and that durability depends on surface preparation, traffic, light exposure and maintenance. That last word is the one hospitality operators should focus on. Tell us the regime and the placement advice becomes specific instead of generic.",
          "Where the wall genuinely cannot escape the harshest zone — directly behind a pass, for instance — that is worth knowing before design rather than after. Sometimes the right answer is a different wall.",
        ],
      },
      {
        heading: "The wall people actually photograph",
        body: [
          "Every restaurant has one wall that ends up in photographs — most obviously in the dense dining strips of Toronto, though it holds anywhere — and it is very rarely the largest one. It is the wall behind the best-lit seats, at the distance a phone camera naturally frames, in the part of the room people are seated in longest. Operators tend to nominate their biggest wall for a feature treatment and then wonder why the room's social presence did not change.",
          "So the useful information is not the floor plan. It is which tables get requested by name, where the light is good at seven in the evening, and where people sit when they are staying for three hours rather than forty minutes. Composition can then be built to work at that specific distance and that specific eye height, rather than centred and hoped over.",
          "It also matters what is in frame alongside the wall. A composition that reads beautifully flat-on but is half-obscured by a banquette back, a coat hook rail or a row of pendant lights has not been designed for the room it is in. Photographs from the seats, not from the doorway, tell us the most.",
        ],
      },
      {
        heading: "Contact height and the things bolted to the wall",
        body: [
          "Restaurant walls take more physical contact than almost any other commercial interior. Chair backs knock at a consistent height, trolleys and high chairs run along at another, shoulders and bags at a third. None of this is avoidable and all of it is predictable, which makes it a design input rather than a risk. Keeping the detail that carries the image above the contact zone is the single most effective thing that can be decided at concept stage.",
          "Then there is everything already fixed to the wall. Bar backs are the extreme case — bottle shelving, glass racks, taps, under-shelf lighting — but dining rooms have their share too: menu boards, service stations, coat rails, wall lights, and the occasional piece of equipment nobody mentions until the day. All of it has to come off and go back, and it is worth agreeing whose job that is early rather than assuming.",
          "Private and function rooms are usually the easiest wall in a restaurant, because they can be taken out of service on a specific date without losing a trading night. If a feature wall is wanted and the schedule is tight, that is often the sensible place to start.",
        ],
      },
    ],
    faqs: [
      {
        question: "Will a printed wall survive being cleaned every night?",
        answer:
          "It depends on what it is cleaned with and where it sits. A dining-room wall wiped with a mild detergent is a very different proposition from one hit with a degreaser at close every night. Tell us the actual regime and the zone, and the advice becomes specific — including, sometimes, a recommendation to use a different wall.",
      },
      {
        question: "Can we print the wall directly behind the pass?",
        answer:
          "It is the harshest environment in the building — heat, grease and the most aggressive cleaning in the room — so it deserves a direct conversation rather than an assumption. Tell us how close the wall is to the grill line and extraction, and we will give you a straight answer about whether it is the right wall for the treatment you want.",
      },
      {
        question: "Which wall should we actually feature?",
        answer:
          "Usually not the biggest one. It is the wall behind the best-lit seats, in the part of the room people linger in, at the distance a phone naturally frames. Send photographs taken from the seats rather than the doorway, and tell us which tables get requested by name — that is the information that decides it.",
      },
      {
        question: "Our seating backs right onto the wall. Does that rule it out?",
        answer:
          "No, it just sets a height. Chair backs make contact at a predictable line, and the detail carrying the image should sit above it. Deciding that at concept stage is far more effective than trying to protect a design afterwards. Tell us the seating layout and whether trolleys or high chairs run along the wall.",
      },
      {
        question: "Do we have to close the restaurant?",
        answer:
          "Not usually, and private or function rooms are often the easiest place to start because they can be taken out of service on a chosen date without losing a trading night. For a main dining room the practical questions are which night the room genuinely empties and how soon after last service it is clear.",
      },
      {
        question: "We have menu boards and lighting fixed to that wall. What happens to them?",
        answer:
          "They come off and go back, and it is worth agreeing whose responsibility that is before the schedule is set. Bar backs are the biggest version of this — shelving, glass racks, taps and under-shelf lighting all have to be removed and reinstated, which affects how long the room is out of action.",
      },
    ],
    gallery: [
      image("handPaintedBrickMural", "a bar wall in an older building, hand-painted rather than printed"),
      image("banquetTableSetting", "a set table at the distance a diner actually sees the wall from"),
      image("concreteFeatureWall", "a hard-surfaced feature wall in a dining setting"),
      image("panelledHallwayFramedArt", "a circulation route to washrooms, often an overlooked wall"),
      image("cgiBlankFeatureWall", "a bare feature wall, shown as a starting point"),
    ],
    ctaHeading: "Tell us the zone and the cleaning regime",
    ctaBody:
      "Which wall, how close it sits to heat and extraction, what it gets cleaned with and how often, and where people actually sit. Photographs from the seats rather than the doorway. That combination gets you a specific answer instead of a generic one.",
    related: [
      "/industries/hotels-and-condos",
      "/industries/retail-and-salons",
      "/wall-printing/toronto",
      "/wall-printing/hamilton",
      "/wall-printing/vaughan",
      "/tools/artwork-resolution",
    ],
  },

  /* ───────────────────────── RETAIL & SALONS ───────────────────────── */
  {
    family: "industry",
    slug: "retail-and-salons",
    pathname: "/industries/retail-and-salons",
    industry: "Retail and salons",
    spaceTypes: [
      "Shop floors and feature walls",
      "Salon styling stations and backwash areas",
      "Fitting-room corridors",
      "Till points and counters",
      "Window-adjacent display walls",
    ],
    title: "Wall Printing for Retail Stores and Salons",
    metaDescription:
      "Printed walls for shops and salons: what the mirror shows, how retail lighting shifts colour, chemical splash zones, and designing around fixtures.",
    h1: "Printed walls for shop floors and salon interiors",
    intro:
      "Retail and salon walls are seen differently from any other commercial interior, and the reason is mirrors and fixtures. In a salon the client spends an hour looking at a mirror, which means the wall behind them is the wall they actually study — reversed. In retail the wall is almost never seen whole, because rails, shelving and display units stand in front of it. Designing for either without accounting for that produces something that looks right in a drawing and wrong in the room.",
    formSourceId: "industry-retail-salons",
    toolPrompt:
      "Brand assets supplied by a head office are often sized for print collateral rather than for a wall. Check what you have been given before you build a fit-out around it.",
    hero: image("spaTreatment", "a treatment setting of the kind these walls sit within"),
    benefits: [
      {
        icon: "scan",
        title: "Designed for the mirror view",
        description:
          "Salon clients study the wall behind them in reflection for an hour. Text reads backwards and composition flips. It is worth designing for the view they actually get.",
      },
      {
        icon: "store",
        title: "Fixtures accounted for",
        description:
          "Rails, gondolas, shelving and counters cover much of a retail wall. Send the fixture plan so the visible strips are the ones carrying the design.",
      },
      {
        icon: "palette",
        title: "Colour checked under retail lighting",
        description:
          "Shop and salon lighting is deliberately unusual — bright, cool, sometimes highly directional. Colour that behaves in daylight can shift noticeably under it.",
      },
      {
        icon: "droplets",
        title: "Splash zones flagged",
        description:
          "Colour bars, backwash areas and nail stations meet chemicals a shop floor never sees. Tell us which stations sit against the wall.",
      },
    ],
    factTableHeading: "What we need to know about the space",
    factRows: [
      {
        label: "Business type",
        value:
          "Fashion or homeware retail, hair salon, barbershop, nail bar, beauty or treatment room, or a mixed retail and service space.",
      },
      {
        label: "Fixture plan",
        value:
          "What stands in front of the wall — rails, gondolas, shelving, counters, mirrors, backwash units — and how much wall stays visible.",
      },
      {
        label: "Mirror positions",
        value:
          "For a salon, which mirrors face the wall, since that determines what clients see reflected while they are seated.",
      },
      {
        label: "Lighting",
        value:
          "Colour temperature and whether it is directional. Salon and retail lighting is rarely neutral and it changes how colour reads.",
      },
      {
        label: "Chemical exposure",
        value:
          "Whether colour mixing, backwash, nail or treatment stations sit against or near the wall.",
      },
      {
        label: "Change frequency",
        value:
          "Whether the space is reset seasonally. A permanent printed finish and a seasonal campaign graphic are different tools.",
      },
    ],
    sections: [
      {
        heading: "What the mirror shows",
        body: [
          "A salon client sits facing a mirror for the better part of an hour. What they look at is not the wall in front of them — it is the wall behind them, reversed, framed by the mirror. That single fact should change how a salon feature wall is designed and it very rarely does. Text reads backwards. An asymmetric composition leans the other way. A detail placed thoughtfully behind the styling chair may sit exactly where the client's own head blocks it.",
          "The practical step is to photograph the wall as seen in the mirror from a seated position at each station, not from standing in the middle of the room. It takes two minutes and it is the single most useful thing a salon can send. What comes back is often surprising even to the owner.",
          "Barbershops have a variation on this: the mirrors are usually closer, the seated position is lower, and clients face the wall directly more often. Worth saying which you are, because the design answers differ.",
        ],
      },
      {
        heading: "Retail walls are mostly hidden",
        body: [
          "The awkward truth about a retail feature wall — and it is most obvious in the compact village units around Oakville — is that customers rarely see much of it. Rails hang in front of it, gondolas sit against it, shelving covers the middle band, and a counter takes a section out entirely. What is actually visible is often a strip above the fixtures and a few gaps between them — and that is what the design has to work with.",
          "This is why the fixture plan matters more than the wall dimensions. A composition designed for a clean rectangle and then installed behind a full-height rail has lost its subject. A composition designed knowing the visible band sits between roughly shoulder height and the ceiling can put everything that matters exactly where it will be seen.",
          "It also affects whether a printed wall is the right tool at all. If a space is reset seasonally with new campaign imagery, a permanent printed finish is the wrong choice for that layer — though it can work very well as the fixed backdrop those seasonal elements sit against. Being clear about which layer you are buying prevents an expensive mismatch.",
        ],
      },
      {
        heading: "Lighting and chemistry",
        body: [
          "Retail and salon lighting is deliberately not neutral. Shops light merchandise to make it look its best, salons light faces to make colour work assessable, and both tend toward brighter and cooler than a domestic or office setting. A colour that behaves predictably in daylight can shift visibly under a bank of cool directional downlights, and a wall that sits under a lighting track will read differently along its length.",
          "Send the colour temperature if you know it, and photograph the wall under the lighting you actually trade with rather than during a daytime visit with the blinds open. If an exact colour match matters — to a brand, a product line or an existing scheme — say so plainly at enquiry so it can be treated as a requirement to prove rather than a hope.",
          "Chemistry is the salon-specific one. Colour bars, backwash areas and nail stations meet bleaches, developers, acetone and solvents that a shop floor never encounters, both as splash and as airborne residue settling on nearby surfaces. If any of those stations sits against or near the wall in question, tell us which, because it directly affects whether that wall is the right candidate.",
        ],
      },
    ],
    faqs: [
      {
        question: "How should we photograph a salon wall for a quote?",
        answer:
          "Sit in each styling chair and photograph what you see in the mirror. That reflected view is what your client studies for an hour, and it is almost never the same as the view from standing in the middle of the room. Send those alongside a straight-on shot of the wall itself.",
      },
      {
        question: "Most of our wall is covered by rails and shelving. Is it still worth it?",
        answer:
          "Yes, but the fixture plan matters more than the wall dimensions. Send what stands in front of the wall and how much stays visible. A design built knowing the visible band sits above the fixtures puts its subject where customers will actually see it, rather than behind a full-height rail.",
      },
      {
        question: "We change our displays every season. Should we print a wall?",
        answer:
          "Possibly, but be clear which layer you are buying. A permanent printed finish is the wrong tool for imagery you intend to swap seasonally. It works well as the fixed backdrop those seasonal elements sit against. Confusing the two is how businesses end up paying for permanence they did not want.",
      },
      {
        question: "Our colour bar is against that wall. Does that matter?",
        answer:
          "It does, so tell us. Colour bars, backwash areas and nail stations meet bleaches, developers, acetone and solvents both as splash and as airborne residue settling nearby. That is a materially different exposure from a shop floor, and it affects whether the wall you have in mind is the right candidate.",
      },
      {
        question: "Will the colours look the same under our shop lighting?",
        answer:
          "Not necessarily, which is why it is worth checking. Retail and salon lighting is deliberately bright, often cool and frequently directional, and colour that behaves in daylight can shift under it. Photograph the wall under the lighting you actually trade with, and tell us the colour temperature if you know it.",
      },
      {
        question: "We're a barbershop, not a salon. Is the advice different?",
        answer:
          "Slightly. Barbershop mirrors are usually closer, seated positions are lower, and clients face the wall directly more often than in a salon where the reflected view dominates. Say which you are at enquiry, because it changes where the composition should put its weight.",
      },
    ],
    gallery: [
      image("panelledHallwayFramedArt", "a retail-style interior using framed prints rather than a printed wall"),
      image("cgiBlankFeatureWall", "a bare wall above a low unit — the visible band a fixture plan leaves"),
      image("livingRoomBlankWalls", "blank walls of the kind a fit-out starts from"),
      image("concreteFeatureWall", "a textured feature wall within a designed interior"),
      image("abstractPaintingMacro", "colour and texture at close range"),
    ],
    ctaHeading: "Send the mirror view and the fixture plan",
    ctaBody:
      "For a salon, photographs taken from each chair showing the wall reflected. For retail, what stands in front of the wall and how much stays visible. Add the lighting you actually trade under and flag any chemical stations nearby.",
    related: [
      "/industries/restaurants-and-cafes",
      "/industries/homes-and-luxury-interiors",
      "/wall-printing/oakville",
      "/wall-printing/mississauga",
      "/wall-printing/toronto",
      "/tools/artwork-resolution",
    ],
  },

  /* ─────────────────────── OFFICES & CORPORATE ─────────────────────── */
  {
    family: "industry",
    slug: "offices-and-corporate",
    pathname: "/industries/offices-and-corporate",
    industry: "Offices and corporate workplaces",
    spaceTypes: [
      "Reception and arrival walls",
      "Boardrooms and meeting rooms",
      "Video-call and broadcast backgrounds",
      "Culture, values and recognition walls",
      "Circulation and wayfinding routes",
    ],
    title: "Wall Printing for Offices and Corporate Workplaces",
    metaDescription:
      "Printed walls for workplaces: video-call backgrounds, culture walls that age well, honest limits on acoustics, and getting brand sign-off before design starts.",
    h1: "Workplace walls, including the one on every video call",
    intro:
      "The workplace wall brief changed and a lot of specifications have not caught up. A meeting-room wall is no longer only seen by the people in the room — it is the background on every call that happens there, compressed by a webcam, viewed by clients who will never visit the building. That is a genuinely different design problem from a reception feature wall, and it is worth treating as one. This page covers that, what a culture wall needs in order to age well, and one thing a printed wall honestly cannot do.",
    formSourceId: "industry-offices",
    toolPrompt:
      "A logo lifted from a website will not survive a reception wall, and it is the most common file we are sent. Check what you have, and note that a vector version removes the problem entirely.",
    hero: image("glassOfficeCorridor", "a workplace corridor with no graphics applied"),
    benefits: [
      {
        icon: "camera",
        title: "Designed for the webcam",
        description:
          "Meeting-room walls are backgrounds on every call. Webcams compress detail, blow out contrast and sit at a fixed height. Fine patterning rarely survives it.",
      },
      {
        icon: "clipboard",
        title: "Content that ages",
        description:
          "Values change, teams change and figures date. We will push you toward wording that does not need reprinting in eighteen months.",
      },
      {
        icon: "shield",
        title: "Honest about acoustics",
        description:
          "A printed wall is a finish, not an acoustic treatment. If a room echoes, printing it will not help — and we would rather say so than let you discover it.",
      },
      {
        icon: "building",
        title: "Brand governance planned for",
        description:
          "Larger organisations have brand approvers, and they are not always the facilities team commissioning the work. Find out who signs off before design starts.",
      },
    ],
    factTableHeading: "What we need to know about the workplace",
    factRows: [
      {
        label: "Room purpose",
        value:
          "Reception, boardroom, a room used mainly for video calls, a culture or recognition wall, or a circulation route.",
      },
      {
        label: "Video use",
        value:
          "Whether the wall appears on calls, where the camera sits, and roughly what height people's heads are at when seated.",
      },
      {
        label: "Brand approval",
        value:
          "Who has final sign-off on brand application, and whether that is the same team commissioning the work.",
      },
      {
        label: "Content lifespan",
        value:
          "Whether the wording includes values, figures, team names or dates that will need revisiting.",
      },
      {
        label: "Acoustic expectations",
        value:
          "Whether anyone is hoping this will help with echo. It will not, and that is better established now.",
      },
      {
        label: "Wall contents",
        value:
          "Screens, whiteboards, switch plates, sensors, and anything else already fixed to the surface.",
      },
    ],
    sections: [
      {
        heading: "The wall on every call",
        body: [
          "A meeting room built five years ago — in any of the office clusters around Mississauga, say — was designed for the people sitting in it. The same room today is seen far more often through a webcam by people who are not in the building at all, and a webcam is an unforgiving viewer. It compresses fine detail into mush, struggles with high contrast, applies aggressive automatic exposure, and frequently sits at a fixed height that crops the wall in a way no one anticipated.",
          "What survives that treatment is different from what looks good in the room. Larger forms hold up; fine patterning turns to noise. Moderate contrast survives; a bright white area next to a dark one causes the camera to hunt for exposure and everyone's face pays for it. Busy detail directly behind a seated head is distracting on a call in a way it never is in person.",
          "The useful thing to send is a screenshot from an actual call in that room. Not a photograph — a screenshot, showing what participants really see, with the camera in its real position and the lighting as it really is. It answers more questions than a description ever will, and almost nobody thinks to provide it.",
        ],
      },
      {
        heading: "Culture walls that do not date",
        body: [
          "Culture, values and recognition walls are the most commonly reprinted workplace graphic, and the reason is almost always the content rather than the finish. A wall listing a leadership team is wrong within two years. A wall carrying a figure — headcount, years in business, a milestone — starts ageing the moment it goes up. A wall built around a values framework becomes awkward the moment the framework is refreshed, which for most organisations is more often than anyone plans for.",
          "The finish is permanent, so the content should be chosen to match that. Wording that describes what the organisation does and how it behaves tends to survive; wording that captures a moment in time does not. This is a conversation worth having at concept stage, because it is much cheaper than having it at reprint stage.",
          "Where something genuinely does need updating periodically — a recognition list, an awards wall — the sensible pattern is a permanent printed backdrop with a changeable element in front of it, rather than committing the changing content to the wall itself.",
        ],
      },
      {
        heading: "What a printed wall will not do",
        body: [
          "It is worth stating plainly: printing a wall does not improve the acoustics of a room. It is a finish applied to the surface, not an absorptive treatment, and a meeting room that echoes will echo exactly as much afterwards. This comes up often enough — usually as an assumption rather than a question — that it is better addressed here than discovered after installation.",
          "If acoustic performance is part of what you are trying to solve, that is a different specification involving absorptive panels or applied acoustic materials, and it should be handled as its own piece of work. A printed wall can sit alongside that, but it cannot substitute for it.",
          "The related point is screens and whiteboards. Anything already fixed to the wall has to be removed and reinstated, and in a workplace that usually means coordinating with IT rather than with facilities. Sensors, access points and cable routes behind a screen are worth flagging at enquiry, because they are the items most likely to turn a simple wall into a scheduling problem.",
        ],
      },
    ],
    faqs: [
      {
        question: "Our meeting room is used mostly for video calls. What should we do differently?",
        answer:
          "Design for the webcam rather than the room. Larger forms survive compression where fine patterning turns to noise, and moderate contrast avoids the exposure hunting that a bright-white-next-to-dark wall causes. The most useful thing you can send is a screenshot from a real call in that room, not a photograph.",
      },
      {
        question: "Will printing the wall help with echo in the room?",
        answer:
          "No. A printed wall is a finish applied to the surface, not an acoustic treatment, and a room that echoes will echo just as much afterwards. If acoustics are part of what you are solving, that needs absorptive panels or applied acoustic materials as a separate specification. We would rather say this now than after installation.",
      },
      {
        question: "We want a values wall. Any advice before we commit?",
        answer:
          "Choose wording that will still be true in five years. Leadership names date within two, figures start ageing immediately, and values frameworks get refreshed more often than anyone plans for. The finish is permanent, so the content should be chosen to match. For anything genuinely changeable, use a printed backdrop with a swappable element in front.",
      },
      {
        question: "Who needs to approve the design?",
        answer:
          "Find out early, because in larger organisations the brand approver is often not the facilities team commissioning the work. Discovering a separate brand governance step after a concept has been developed is one of the more common ways these projects stall. Ask who has final say on brand application before design work starts.",
      },
      {
        question: "There's a screen mounted on the wall we want printed. What happens?",
        answer:
          "It comes off and goes back, and in a workplace that usually means coordinating with IT rather than facilities. Flag any sensors, access points or cable routes running behind it at the enquiry stage — those are the items most likely to turn a straightforward wall into a scheduling problem.",
      },
      {
        question: "Can you use our brand colours exactly?",
        answer:
          "Send your brand guidelines with the specified colour values rather than a colour sampled from a screenshot, and tell us if an exact match is a hard requirement rather than a preference. Screens emit light and walls reflect it, so where precision genuinely matters we would rather agree a proof than assume a result.",
      },
    ],
    gallery: [
      image("curvedBuildingExterior", "the corporate building stock this work sits inside"),
      image("concreteFeatureWall", "a hard-surfaced feature wall in a contemporary interior"),
      image("cgiBlankFeatureWall", "a bare feature wall, shown as a starting point"),
      image("livingRoomBlankWalls", "blank walls before any finish is applied"),
      image("panelledHallwayFramedArt", "a circulation route using framed prints instead of a printed wall"),
    ],
    ctaHeading: "Send a screenshot from a real call",
    ctaBody:
      "For a meeting room, a screenshot from an actual video call in that space tells us more than any photograph. Add who signs off on brand, whether the wording contains anything that will date, and what is already fixed to the wall.",
    related: [
      "/industries/hotels-and-condos",
      "/industries/religious-and-cultural-spaces",
      "/wall-printing/mississauga",
      "/wall-printing/brampton",
      "/wall-printing/vaughan",
      "/tools/artwork-resolution",
      "/tools/quote-planner",
    ],
  },

  /* ──────────────────────── HOTELS & CONDOS ──────────────────────── */
  {
    family: "industry",
    slug: "hotels-and-condos",
    pathname: "/industries/hotels-and-condos",
    industry: "Hotels and condominiums",
    spaceTypes: [
      "Lobbies and arrival sequences",
      "Corridors and lift lobbies",
      "Amenity and party rooms",
      "Gyms and wellness suites",
      "Guest rooms and suites",
    ],
    title: "Wall Printing for Hotels and Condominiums",
    metaDescription:
      "Printed walls for lobbies, corridors and amenity rooms: designing for people who pass daily, housekeeping regimes, egress clearances and committee sign-off.",
    h1: "Walls for spaces people walk past every single day",
    intro:
      "Hotel and condominium walls face a problem no other interior has: repeat exposure. A resident walks the same corridor twice a day for years, and a design that is striking on the first pass can become tiring by the hundredth. A hotel guest sees the lobby wall once and needs it to land immediately. Those are opposite briefs in the same building, and treating them the same way is the most common mistake in this sector.",
    formSourceId: "industry-hotels-condos",
    toolPrompt:
      "Corridor walls are long, which means artwork gets stretched further here than almost anywhere else. Work out what your file can actually carry across that run before it goes to a board.",
    hero: image("banquetTableSetting", "the amenity and function settings these walls surround"),
    benefits: [
      {
        icon: "hotel",
        title: "Corridors designed for the hundredth pass",
        description:
          "Residents walk it daily for years. Quieter, more textural work wears far better over time than a bold statement that demands attention every trip.",
      },
      {
        icon: "sparkles",
        title: "Lobbies designed for the first",
        description:
          "Arrival walls get one chance with a guest carrying a bag. They can carry weight that a corridor cannot, because nobody has to live with them.",
      },
      {
        icon: "shield",
        title: "Egress and signage clearances respected",
        description:
          "Exit signs, pull stations, extinguisher cabinets and fire doors have clearance requirements. Artwork must not obscure or compete with any of them.",
      },
      {
        icon: "clipboard",
        title: "Committee timelines planned around",
        description:
          "Common-element work runs on a board or ownership schedule. That schedule is the project timeline, and no supplier can compress it.",
      },
    ],
    factTableHeading: "What we need to know about the property",
    factRows: [
      {
        label: "Space",
        value:
          "Lobby, corridor, lift lobby, amenity or party room, gym, or guest room. Each has a different exposure pattern.",
      },
      {
        label: "Exposure",
        value:
          "Whether people see this wall once, occasionally, or twice daily for years. This is the single biggest design input.",
      },
      {
        label: "Life-safety items",
        value:
          "Exit signage, pull stations, extinguisher cabinets, fire doors and any required clearances on or near the wall.",
      },
      {
        label: "Housekeeping",
        value:
          "What the wall is cleaned with and how often, and whether trolleys or luggage run along it.",
      },
      {
        label: "Approvals",
        value:
          "Property manager, board or ownership group, and when the relevant committee next meets.",
      },
      {
        label: "Wayfinding",
        value:
          "Whether the wall carries or sits near unit numbering, directional signage or floor identification.",
      },
    ],
    sections: [
      {
        heading: "Once, or two thousand times",
        body: [
          "This is the distinction that should drive every decision in a residential or hospitality building, and it is routinely skipped. A hotel lobby wall is seen once by a given guest, for a few seconds, while they are carrying a bag and looking for reception. It has one opportunity and it can afford to be emphatic. A condominium corridor wall is seen by the same forty people twice a day for as long as they live there.",
          "Work that demands attention performs badly under repeat exposure. What survives is quieter and more textural — something with enough depth to reward a second look but not so much personality that it insists on one. Residents rarely complain that a corridor is too subtle. They complain, eventually and vocally, that a bold graphic they did not choose is still there.",
          "Amenity rooms sit between the two. A party room or a gym is visited regularly but not passed daily, and it is generally the safest place in a residential building to do something with more character. If a board wants impact somewhere, that is usually the room to suggest.",
        ],
      },
      {
        heading: "Life safety comes first, always",
        body: [
          "Corridors and lobbies are egress routes, and that imposes constraints that are not negotiable. Exit signage must remain clearly visible and must not have to compete with a busy background. Pull stations, extinguisher cabinets and hose reels have clearance and visibility requirements. Fire doors and their hardware cannot be obscured or visually disguised, however tempting it is to make a door disappear into a design.",
          "The practical version of this at enquiry stage is simple: photograph the wall with everything on it, including the items you were mentally editing out. The exit sign, the pull station, the little red box, the door closer. Those items are the constraints the design has to work with, and a concept developed from a photograph that cropped them out will have to be redone.",
          "Where a design does need to work around signage, the honest approach is to make the signage read more clearly rather than less. Artwork that quietens down around an exit sign looks considered. Artwork that fights it creates a problem for the building.",
        ],
      },
      {
        heading: "Housekeeping, trolleys and the committee",
        body: [
          "Hotel corridors — and the towers going up around Toronto are full of them — meet housekeeping trolleys, luggage and cleaning regimes on a schedule far more intense than most commercial interiors. Trolley contact happens at a consistent height along the entire run, which makes it a predictable design input rather than a risk — keep what matters above it. Ask housekeeping what the walls actually get cleaned with, because the answer is often more aggressive than management assumes.",
          "Condominium common elements bring the approval question instead. A lobby, corridor, party room or gym is shared property, which means the decision usually needs the board rather than the property manager alone. Boards meet on their own schedule, and that schedule is genuinely the project timeline. Anyone quoting you a completion date before the board has met is guessing.",
          "What helps a committee decide is specificity: this wall, this image, this finish, and a plain answer to the question they will certainly ask about reversibility. A printed wall is repainted like any other wall finish if a future board wants it gone. Saying that clearly and early tends to move things along more than any amount of visual persuasion.",
        ],
      },
    ],
    faqs: [
      {
        question: "What works in a corridor that residents walk twice a day?",
        answer:
          "Something quieter than you would put in a lobby. Work that demands attention wears badly under repeat exposure, while quieter, more textural pieces reward a second look without insisting on one. Residents rarely complain a corridor is too subtle; they complain about a bold graphic they did not choose still being there years later.",
      },
      {
        question: "Can artwork go around our exit signs and fire equipment?",
        answer:
          "It has to, and the constraint is not negotiable. Exit signage must stay clearly visible without competing with a busy background, and pull stations, extinguisher cabinets and fire doors have clearance and visibility requirements. Photograph the wall with everything on it, including the items you were mentally editing out.",
      },
      {
        question: "How long will board approval take?",
        answer:
          "As long as your board's meeting schedule takes — that is the real timeline and no supplier can compress it. What helps is giving them something specific to approve: this wall, this image, this finish, plus a plain answer on reversibility. A printed wall is repainted like any other wall finish if a future board wants it changed.",
      },
      {
        question: "Our housekeeping trolleys run the length of the corridor. Is that an issue?",
        answer:
          "It is a design input rather than a risk, because trolley contact happens at a consistent height along the whole run. Keep the detail that carries the image above it. It is also worth asking housekeeping directly what the walls get cleaned with — the answer is frequently more aggressive than management expects.",
      },
      {
        question: "Where in a condominium is the safest place to do something bolder?",
        answer:
          "An amenity room — a party room or gym. Those spaces are visited regularly but not passed daily, so they tolerate more character than a corridor without creating the repeat-exposure fatigue that leads to complaints. If a board wants impact somewhere, that is usually the room to suggest.",
      },
      {
        question: "Can a printed wall carry our unit numbering or wayfinding?",
        answer:
          "Tell us if the wall carries or sits near unit numbering, directional signage or floor identification, because that changes the brief considerably. Wayfinding has to stay legible and consistent floor to floor, so the artwork generally needs to quieten around it rather than incorporate it decoratively.",
      },
    ],
    gallery: [
      image("curvedBuildingExterior", "the multi-residential and hospitality building stock this work sits in"),
      image("panelledHallwayFramedArt", "a corridor treatment using framed prints"),
      image("glassOfficeCorridor", "a circulation route with no graphics applied"),
      image("cgiFurnishedLivingRoom", "a rendered residential interior, shown as a visualisation example"),
      image("concreteFeatureWall", "a hard-surfaced feature wall in a shared space"),
    ],
    ctaHeading: "Tell us whether people see it once or every day",
    ctaBody:
      "That answer shapes everything else. Add photographs showing the wall with all its signage and equipment in place, what housekeeping cleans it with, and when the board or ownership group next meets.",
    related: [
      "/industries/offices-and-corporate",
      "/industries/homes-and-luxury-interiors",
      "/wall-printing/toronto",
      "/wall-printing/vaughan",
      "/wall-printing/brampton",
      "/tools/artwork-resolution",
      "/tools/quote-planner",
    ],
  },

  /* ─────────────── HOMES & LUXURY INTERIORS ─────────────── */
  {
    family: "industry",
    slug: "homes-and-luxury-interiors",
    pathname: "/industries/homes-and-luxury-interiors",
    industry: "Homes and luxury interiors",
    spaceTypes: [
      "Principal bedrooms and dressing rooms",
      "Stairwells and double-height voids",
      "Dining rooms and formal reception rooms",
      "Children's rooms and playrooms",
      "Home cinemas, bars and games rooms",
    ],
    title: "Wall Printing for Homes and Luxury Interiors",
    metaDescription:
      "Printed walls at home: living with a permanent finish, rooms children outgrow, how daylight changes an image hour by hour, and what resale actually means.",
    h1: "A wall you will look at every day for years",
    intro:
      "Domestic wall printing has one characteristic that separates it from every commercial application: you have to live with it. A restaurant wall is experienced for ninety minutes, an office wall during working hours, a hotel corridor in passing. A wall in your own home is seen first thing every morning, in changing light, for as long as you own the house. That is a much higher bar than 'do I like this image', and it deserves a more careful conversation than it usually gets.",
    formSourceId: "industry-homes",
    toolPrompt:
      "A family photograph you love is the most common domestic brief and the one most likely to be too small. Find out before you commit to the wall, not after.",
    hero: image("cgiFurnishedLivingRoom", "a rendered domestic interior, shown as a visualisation example"),
    benefits: [
      {
        icon: "house",
        title: "Chosen to live with, not just to like",
        description:
          "Liking an image and wanting to see it every morning for years are different tests. We will encourage you to apply the second one before committing.",
      },
      {
        icon: "sparkles",
        title: "Daylight tracked through the day",
        description:
          "A domestic wall is seen in every light there is — early, midday, lamplight. An image that sings at noon can fall flat at eight in the evening.",
      },
      {
        icon: "ruler",
        title: "Rooms that change use planned for",
        description:
          "Children's rooms get outgrown on a predictable schedule. Worth deciding up front whether you are committing for three years or fifteen.",
      },
      {
        icon: "brush",
        title: "Built into the existing scheme",
        description:
          "A domestic wall sits among finishes you already chose. Send the room in context so the result belongs there rather than arriving on top of it.",
      },
    ],
    factTableHeading: "What we need to know about the room",
    factRows: [
      {
        label: "Room",
        value:
          "Principal bedroom, stairwell or void, dining room, child's room, home cinema, bar, games room or study.",
      },
      {
        label: "Daily view",
        value:
          "Where you actually see the wall from — the doorway, the bed, the sofa, the top of the stairs — and at what times of day.",
      },
      {
        label: "Light",
        value:
          "Window orientation, how the room is lit after dark, and whether the wall gets direct sun at any point.",
      },
      {
        label: "Expected lifespan",
        value:
          "Whether this is a long-term finish or something for a phase, particularly for a child's room.",
      },
      {
        label: "Existing scheme",
        value:
          "Flooring, trim, millwork and paint colours already in place, plus anything a designer has specified.",
      },
      {
        label: "Occupancy",
        value:
          "Who is living in the house during the work, plus pets, young children and any room that must stay usable.",
      },
    ],
    sections: [
      {
        heading: "Liking it and living with it",
        body: [
          "There is a test worth applying before committing to any custom wall murals at home — a test we end up describing on most Oakville enquiries — and it is not whether you like the image. It is whether you want to see it at seven on a Tuesday morning, in February, when you are not in the mood to be impressed. Images that pass that test tend to be quieter than the ones people choose from a mood board, and they tend to have depth that reveals itself slowly rather than impact that lands immediately and then stops giving.",
          "This is where domestic work differs sharply from hospitality. A restaurant wants a wall that lands in the first ten seconds because that is all it gets. A home has the opposite problem: the first ten seconds are the easy part, and the next ten thousand viewings are the actual brief.",
          "The practical suggestion is unglamorous but effective. Live with a large printed version of the candidate image taped to the wall for a week before committing. Most people either stop noticing it in a good way, or find it grating by day four. Both are extremely useful answers and both are far cheaper to discover in advance.",
        ],
      },
      {
        heading: "Light changes everything, hour by hour",
        body: [
          "A domestic wall is seen in more lighting conditions than any commercial one. Early morning, flat midday, low evening sun, lamplight, a single reading light, complete darkness with a hallway spill. A commercial interior mostly has one lighting state and holds it. A home cycles through all of them every day, and an image can behave very differently at each point.",
          "Direct sun is the specific thing to raise. A wall that catches hard afternoon sun through a south or west window is in a materially different situation from one on a north wall, both in how the image reads and in what any finish is subjected to over time. Ink Blend's published position is that durability depends on preparation, traffic, light exposure and maintenance — light exposure is the relevant one here, and it is worth being straightforward about which wall you are considering.",
          "The most useful thing you can send costs nothing: photograph the wall three times in one day. Morning, mid-afternoon and after dark with the lamps on. It shows us the range the image has to work across, and it frequently changes which wall in the room is the right candidate.",
        ],
      },
      {
        heading: "Children's rooms, and the resale question",
        body: [
          "Children's rooms are the most requested domestic wall and the one most likely to be regretted, for a straightforward reason: the brief has a known expiry date. A five-year-old's favourite thing is not a nine-year-old's, and a printed wall is a permanent finish rather than a poster. That does not make it a bad idea — plenty of people are entirely happy to redecorate a room in five years, and a child having a wall they love is worth something real. It just wants deciding consciously rather than by default.",
          "Where there is doubt, the more durable choice is usually a treatment tied to the room rather than to a current interest: landscape, sky, pattern, colour and texture, rather than a specific character or franchise. Those tend to survive a change of taste and hold up considerably better if the room later becomes a guest room or a study.",
          "On resale, the honest answer is that it depends entirely on the wall. A considered, neutral treatment in a stairwell or dining room generally reads as a finish, like a good floor or decent joinery. A highly specific image in a principal bedroom reads as a taste decision a buyer has to undo. Either is fine — but if resale is a factor for you, say so, because it should influence the design rather than be discovered afterwards.",
        ],
      },
    ],
    faqs: [
      {
        question: "How do I know I won't get sick of it?",
        answer:
          "Apply a harder test than whether you like it: do you want to see it at seven on a Tuesday morning in February? Then tape a large printed version to the wall and live with it for a week. Most people either stop noticing it in a good way or find it grating by day four. Both answers are worth having in advance.",
      },
      {
        question: "Does it matter which wall in the room we choose?",
        answer:
          "Often more than the image does. Photograph the wall three times in one day — morning, mid-afternoon, and after dark with the lamps on. A home cycles through more lighting states than any commercial interior, and seeing the range frequently changes which wall turns out to be the right candidate.",
      },
      {
        question: "The wall gets direct afternoon sun. Should we avoid it?",
        answer:
          "Raise it rather than avoid it outright, because it genuinely changes the situation. The published position is that durability depends on surface preparation, traffic, light exposure and maintenance, and a wall catching hard west sun is in a different position from a north-facing one. Tell us the orientation and we will be straightforward with you.",
      },
      {
        question: "Is a printed wall a good idea in a child's room?",
        answer:
          "It can be, as long as the decision is conscious. The brief has a known expiry date — a five-year-old's favourite thing is not a nine-year-old's — and this is a permanent finish, not a poster. If there is doubt, something tied to the room rather than a current interest, like landscape, sky, pattern or texture, survives a change of taste far better.",
      },
      {
        question: "Will this affect resale?",
        answer:
          "It depends on the wall. A considered, restrained treatment in a stairwell or dining room reads like a finish, the way good flooring or joinery does. A highly specific image in a principal bedroom reads as a taste decision a buyer has to undo. Neither is wrong, but if resale matters to you, say so, so it can shape the design.",
      },
      {
        question: "Can you work with our interior designer's scheme?",
        answer:
          "Gladly, and it produces a better result. A domestic wall sits among flooring, trim, millwork and paint you already chose and paid for. Send the room in context rather than the wall alone, plus any mood board, fabric selection or palette already agreed, and we will work inside it rather than against it.",
      },
    ],
    gallery: [
      image("livingRoomBlankWalls", "blank domestic walls of the kind a project starts from"),
      image("cgiBlankFeatureWall", "a bare feature wall above a sideboard"),
      image("panelledHallwayFramedArt", "a hallway using framed prints, one alternative to a printed wall"),
      image("abstractPaintingMacro", "a painted canvas close up — texture and depth at scale"),
      image("concreteFeatureWall", "a textured feature wall within a considered domestic scheme"),
    ],
    ctaHeading: "Photograph the wall three times in one day",
    ctaBody:
      "Morning, mid-afternoon, and after dark with the lamps on. Add where you actually see the wall from, the window orientation, and any scheme your designer has agreed. If it is a child's room, tell us how long you expect it to last.",
    related: [
      "/industries/religious-and-cultural-spaces",
      "/industries/offices-and-corporate",
      "/wall-printing/oakville",
      "/wall-printing/hamilton",
      "/wall-printing/mississauga",
      "/tools/artwork-resolution",
    ],
  },

  /* ───────────── RELIGIOUS & CULTURAL SPACES ───────────── */
  {
    family: "industry",
    slug: "religious-and-cultural-spaces",
    pathname: "/industries/religious-and-cultural-spaces",
    industry: "Religious and cultural spaces",
    spaceTypes: [
      "Prayer and worship halls",
      "Community and multipurpose rooms",
      "Entrance and welcome areas",
      "Donor and dedication walls",
      "Classrooms and study rooms",
    ],
    title: "Wall Printing for Religious and Cultural Spaces",
    metaDescription:
      "Printed walls for faith and community buildings: committee decisions, donor recognition that stays accurate, depiction conventions, and getting it right first time.",
    h1: "Faith and community walls, decided by more than one person",
    intro:
      "Work for a religious or cultural organisation differs from commercial work in a way that has nothing to do with the printing. The decision is almost never one person's. It moves through a committee, a board of trustees, an elders' group or a building fund, and often through the congregation itself. That changes what a supplier should be doing at the start: not presenting a concept, but making sure the group has something concrete enough to actually decide on.",
    formSourceId: "industry-religious-cultural",
    toolPrompt:
      "Donated artwork often arrives as a photograph of the original rather than a reproduction file. Check what you have — and note that script and calligraphy should start from vector outlines, where this question does not apply at all.",
    hero: image("cgiBlankFeatureWall", "a large bare wall of the kind these projects begin with"),
    benefits: [
      {
        icon: "church",
        title: "Depiction conventions asked about first",
        description:
          "What may be shown, what must not be cropped, and what should not adjoin certain spaces varies by tradition. We ask rather than assume.",
      },
      {
        icon: "clipboard",
        title: "Built for committee decisions",
        description:
          "Groups need something specific to approve, not a mood board. Being concrete early prevents the cycle of revisions that stalls these projects.",
      },
      {
        icon: "scan",
        title: "Names and dedications checked twice",
        description:
          "A donor wall with a misspelled name is a serious problem, not a typo. Spelling, diacritics and honorifics need signing off by someone accountable.",
      },
      {
        icon: "layers",
        title: "Recognition that can still grow",
        description:
          "Donor lists change. Committing a list to a permanent finish is a decision worth making deliberately, because adding to it later is not simple.",
      },
    ],
    factTableHeading: "What we need to know about the project",
    factRows: [
      {
        label: "Organisation and space",
        value:
          "Tradition or community, and whether the wall is in a worship hall, community room, entrance, classroom or dedication area.",
      },
      {
        label: "Who decides",
        value:
          "The committee, board, trustees or group with final say, and when they next meet.",
      },
      {
        label: "Depiction guidance",
        value:
          "What may and may not be represented, any placement conventions, and who in your organisation rules on this.",
      },
      {
        label: "Language and script",
        value:
          "Any script other than English, the exact wording as live text, and who authored or translated it.",
      },
      {
        label: "Names and dedications",
        value:
          "For donor or memorial walls: the full list, with spellings, diacritics and honorifics confirmed by a named person.",
      },
      {
        label: "Rights",
        value:
          "For any supplied artwork or calligraphy, confirmation that your organisation holds the right to reproduce it at scale.",
      },
    ],
    sections: [
      {
        heading: "Designing for a group decision",
        body: [
          "The single biggest difference in this sector is that no one person signs off. A proposal has to survive a committee, and committees do not respond to the same material an individual client does. A mood board invites opinion and produces a long, inconclusive discussion. A specific proposal — this wall, this image, this wording, at this size — invites a decision.",
          "That means being concrete earlier than a commercial project would require, and it means accepting that the group's meeting schedule is the actual timeline. There is no way around that and it is better acknowledged than worked against. What can be compressed is the number of cycles, and the way to compress it is to make each round specific enough to be resolved.",
          "It also helps to know who in the organisation rules on questions of appropriateness, as distinct from questions of taste. Those are frequently different people, and sending an aesthetic proposal to someone whose actual authority is doctrinal wastes a round for everybody.",
        ],
      },
      {
        heading: "Depiction, placement and asking first",
        body: [
          "Traditions differ substantially on what may be represented and how, and in a city like Brampton a single building may host several of them. Some prohibit figurative depiction entirely, some restrict it in particular spaces, and many have conventions about what may sit above a doorway, what must never be cropped or truncated, and what should not share a wall with seating, storage or a washroom entrance. None of that is something an outside supplier should be deciding on your behalf.",
          "The approach here is straightforward: tell us the tradition and how the space is used, and we will raise anything that looks like it requires a ruling from your organisation rather than a design judgement from us. It is a great deal better to ask an obvious question early than to produce something that has to be withdrawn.",
          "Script is the technical half of this. Gurmukhi, Devanagari, Urdu, Arabic, Hebrew, Amharic and others all behave differently at wall scale — conjuncts and ligatures that read perfectly at text size can collide or break when they are metres tall, right-to-left setting must be built that way rather than mirrored afterwards, and a font licensed for print may not be licensed for large-format reproduction. Send the exact wording as live text rather than only as an image of it, and tell us who authored or translated it.",
        ],
      },
      {
        heading: "Donor walls, names, and the problem with lists",
        body: [
          "Recognition and dedication walls carry a risk ordinary decorative work does not: a misspelled name is not a typographical error, it is a failure in front of the person it was meant to honour and their family. Spellings, diacritics, honorifics, maiden names and the order of a list all need to be confirmed by a named person in your organisation who is accountable for them — not by whoever forwarded the spreadsheet.",
          "The structural issue with donor walls is growth. A list committed to a permanent printed finish is fixed, and campaigns rarely stop the day the wall goes up. If further names are expected, that should shape the design from the outset — a printed backdrop with a changeable element for names generally serves better than committing the full list to the wall, even though it is less immediately satisfying.",
          "Memorial and dedication walls carry the same care requirement with more weight attached. Where there is any uncertainty about a name, a date or a form of words, the right answer is always to stop and confirm rather than to proceed on a reasonable assumption. It is the one category of work where being slow is unambiguously better than being wrong.",
        ],
      },
    ],
    faqs: [
      {
        question: "Our committee has to approve this. How should we start?",
        answer:
          "Ask us for something specific rather than a mood board. Groups decide well on a concrete proposal — this wall, this image, this wording, at this size — and badly on open-ended options, which tend to produce long inconclusive discussions. Being specific early is what reduces the number of approval rounds.",
      },
      {
        question: "How do you handle rules about what can be depicted?",
        answer:
          "By asking rather than assuming. Tell us the tradition and how the space is used, and we will flag anything that looks like it needs a ruling from your organisation rather than a design judgement from us. It is far better to ask an obvious question early than to produce something that has to be withdrawn.",
      },
      {
        question: "Can you set text in Gurmukhi, Arabic, Hebrew or Devanagari?",
        answer:
          "Yes, and the file matters more than the printing. Send the exact wording as live text rather than only as an image, name the font, and confirm it is licensed for large-format reproduction. Conjuncts and ligatures that work at text size can collide at wall height, and right-to-left setting must be built that way from the start.",
      },
      {
        question: "We're planning a donor wall. Anything to decide before design?",
        answer:
          "Whether the list will grow. A list committed to a permanent finish is fixed, and campaigns rarely stop when the wall goes up. If more names are expected, a printed backdrop with a changeable element for names usually serves better than committing the whole list, even though it is less immediately satisfying.",
      },
      {
        question: "Who should confirm the spelling of names?",
        answer:
          "A named person in your organisation who is accountable for the list, not whoever forwarded the spreadsheet. Spellings, diacritics, honorifics, maiden names and ordering all need checking. A misspelled name on a recognition wall is not a typo — it is a failure in front of the person it was meant to honour.",
      },
      {
        question: "We were given artwork by an artist in our community. Can you use it?",
        answer:
          "Very likely, once the rights are clear. Confirm that your organisation holds the right to reproduce the work at architectural scale, since permission to display an original is not the same as permission to reproduce it. Send the highest-resolution version that exists and we will tell you what it can support.",
      },
    ],
    gallery: [
      image("banquetTableSetting", "a community gathering setting of the kind these halls host"),
      image("handPaintedCraneMural", "a hand-painted mural, shown as context rather than as printed work"),
      image("abstractPaintingMacro", "artwork at close range, showing how texture reads at scale"),
      image("panelledHallwayFramedArt", "an entrance area using framed work"),
      image("livingRoomBlankWalls", "blank walls before any treatment is applied"),
    ],
    ctaHeading: "Tell us who decides, and when they meet",
    ctaBody:
      "The tradition, how the space is used, who rules on appropriateness, and when your committee next sits. If a donor or memorial wall is involved, send the list with spellings confirmed by someone accountable for them.",
    related: [
      "/industries/homes-and-luxury-interiors",
      "/industries/restaurants-and-cafes",
      "/wall-printing/brampton",
      "/wall-printing/hamilton",
      "/wall-printing/oakville",
      "/tools/artwork-resolution",
    ],
  },
];
