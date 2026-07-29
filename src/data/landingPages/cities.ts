import { image } from "./images";
import type { CityRecord } from "./types";

/* ═══════════════════════════════════════════════════════════════════════════
   ALLOWED FACTS — nothing outside this list may appear in the copy below.

   • Anything Ink Blend already publishes on inkblend.ca: the service list, the
     four-step Discover → Concept → Approve → Print process, the existing FAQ
     answers, and the surface-preparation language ("smooth, clean, dry, and
     properly prepared").
   • Named commercial districts and corridors that are real, checkable places.
   • General, non-proprietary trade knowledge about printing onto surfaces
     (that texture affects ink lay-down, that fresh drywall and new plaster
     hold moisture, that leases contain reinstatement clauses) — framed as
     things to CHECK, never as a promise about what Ink Blend will do.
   • Derivable arithmetic.

   BANNED CLAIMS — none of these are published by Ink Blend and none can be
   verified. Do not write them, and do not let a rewrite sneak them back in.

   ✗ Any price, rate, quote range or per-square-foot figure. The budget bands
     in the quote form are input options, not a price list.
   ✗ Any turnaround, lead time, install duration or drive time. There is no
     published business address, so no origin exists for a routing lookup.
   ✗ Machine specs, printer model, ink brand, DPI, coverage rates.
   ✗ Durability in years, warranty terms, washability ratings. The published
     line is "designed for long-lasting visual impact" — do not sharpen it.
   ✗ Project counts, years in business, named clients, "trusted by N brands".
   ✗ Superlatives: largest, fastest, only, first, #1, leading, best.
   ✗ Certifications, licences, insurance or trade memberships. Competitors
     advertise "3M certified"; Ink Blend must not imply an equivalent.
   ✗ Anything asserted only by a third-party directory.
   ✗ Population figures. StatCan could not be read directly during authoring,
     and a half-verified number is worse than none. Districts carry the local
     signal instead, and they are checkable.

   Where a page wants a banned fact, write around it — "ask the team what your
   surface needs" — rather than inventing one.
   ═══════════════════════════════════════════════════════════════════════════ */

export const cities: readonly CityRecord[] = [
  /* ───────────────────────────── BRAMPTON ───────────────────────────── */
  {
    family: "city",
    slug: "brampton",
    pathname: "/wall-printing/brampton",
    city: "Brampton",
    province: "Ontario",
    districts: [
      "Downtown Brampton and the Main Street strip",
      "Bramalea City Centre",
      "The Queen Street East corridor",
      "Steeles Avenue industrial and showroom units",
      "Gore Meadows and the east-end community blocks",
    ],
    title: "Wall Printing in Brampton",
    metaDescription:
      "Direct-to-wall UV printing for Brampton banquet halls, faith spaces, showrooms and storefronts. Multilingual artwork, large uninterrupted walls, no vinyl seams.",
    h1: "Wall printing in Brampton, without the vinyl seams",
    intro:
      "Brampton asks more of a printed wall than most cities do. The banquet halls along Queen Street East run rooms wide enough that a vinyl panel job shows every join. Faith and community spaces want artwork in Gurmukhi, Devanagari, Urdu or Arabic set at architectural scale, where a stretched letterform is not a small mistake. Showroom units off Steeles need a wall that survives forklift traffic and still photographs cleanly. Direct-to-wall UV printing puts the image onto the prepared surface itself, so there is no seam, no lifting edge and no repeated pattern to line up.",
    formSourceId: "city-brampton",
    toolPrompt:
      "Hall walls and community rooms in Brampton are usually block, plaster or a panelled system rather than plain drywall. Run the six questions below and you will know which of those you are dealing with before you ask anyone for a number.",
    hero: image("cgiBlankFeatureWall", "the kind of bare feature wall a Brampton quote usually starts from"),
    benefits: [
      {
        icon: "layers",
        title: "No seams across a wide hall wall",
        description:
          "Banquet and community-hall walls are often wider than any single roll of material. Printing onto the wall removes the panel joins that catch light down a long room.",
      },
      {
        icon: "scan",
        title: "Script and letterform handled as artwork",
        description:
          "Gurmukhi, Devanagari, Urdu and Arabic need the right font licence and clean vector outlines before anything is scaled. Send the text and we will tell you what the file needs.",
      },
      {
        icon: "church",
        title: "Cultural and devotional work treated carefully",
        description:
          "Religious imagery has rules about placement, cropping and adjacency that a generic sign shop will not ask about. We would rather ask first than reprint.",
      },
      {
        icon: "clipboard",
        title: "Booked rooms planned around",
        description:
          "Halls and community spaces are reserved months out. Tell us the dates that are already sold and we will work the schedule around your calendar, not ours.",
      },
    ],
    factTableHeading: "What a Brampton enquiry should include",
    factRows: [
      {
        label: "Room or unit type",
        value:
          "Banquet hall, prayer or community room, showroom, retail unit, restaurant, office reception or a room in a home.",
      },
      {
        label: "The wall itself",
        value:
          "Photograph the whole wall square-on plus one raking shot along it, so we can see texture, patching and any bow in the surface.",
      },
      {
        label: "Surface build-up",
        value:
          "Painted drywall, skim-coated plaster, block, or a panelled system. Say if it has ever been wallpapered or has a heavy texture roll finish.",
      },
      {
        label: "Artwork and language",
        value:
          "Any script other than English, plus who supplies the text. Confirm you hold the right to reproduce the wording and any imagery.",
      },
      {
        label: "Access and dates",
        value:
          "Bookings already in the calendar, the loading door you have, and whether the room can be emptied of furniture and staging.",
      },
      {
        label: "Approvals",
        value:
          "For a leased unit, whether the landlord has to sign off, and whether the lease requires the wall be returned to plain paint at the end of term.",
      },
    ],
    sections: [
      {
        heading: "Banquet and community halls",
        body: [
          "The wide, uninterrupted wall is the whole reason direct-to-wall printing exists. On a hall wall the eye travels the full length of the room, and anything applied in panels gives itself away: a hairline join, a slight sheen difference between rolls, an edge that has begun to lift where a chair back has knocked it a hundred times. Printing onto the prepared surface leaves nothing to lift, which is why custom wall murals at this width are usually printed rather than papered.",
          "The practical constraint in Brampton is rarely the wall. It is the calendar. Halls along Queen Street East and around the Gore Meadows blocks are reserved a long way ahead, and a room that is earning on Friday and Saturday cannot be handed over for an open-ended period. The useful thing you can do at enquiry stage is tell us which dates are already sold. Everything else — surface prep, artwork approval, file preparation — can be arranged around a fixed window once we know where the window is.",
          "Furniture and staging matter more than people expect. Round tables, stacked chairs, a portable stage and a dance floor all have to move far enough back for the surface to be worked on and reached. If the room has a permanent head-table riser against the feature wall, say so early, because it changes what is reachable.",
        ],
      },
      {
        heading: "Faith, cultural and community spaces",
        body: [
          "Devotional and cultural artwork is where a generic sign shop tends to come unstuck, and it is where asking questions first pays off. Placement conventions differ between traditions: what may sit above a doorway, what must not be cropped, what should not share a wall with seating or with a washroom entrance. None of that is guesswork we want to do on your behalf. Tell us the tradition and the room's use and we will raise anything that looks like it needs a decision from you rather than from us.",
          "Script is the other half of it. Gurmukhi, Devanagari, Urdu and Arabic all behave differently when scaled to wall height. Conjuncts and ligatures that read perfectly at body size can break apart or collide once they are metres tall, and a font that is fine for a printed invitation may not be licensed for large-format reproduction. Right-to-left setting needs the layout built that way from the start rather than mirrored afterwards.",
          "Send the exact wording as text, not only as a picture of it, and tell us who wrote it. If the artwork or the calligraphy came from a named artist, we need to know that the reproduction rights sit with you before anything goes onto a wall.",
        ],
      },
      {
        heading: "Showrooms, storefronts and industrial units",
        body: [
          "The Steeles Avenue units and the smaller storefront runs are a different problem again. These walls take contact — trolleys, stock, shoulders, forklift tines that pass closer than anyone admits. A wall graphic that looks immaculate on handover and scuffed by month three is a false economy, and for commercial branding in a working unit the honest answer is that placement matters as much as the printing does. A design that sits above the working zone survives a warehouse in a way that a floor-to-ceiling image does not.",
          "Block and painted concrete are common in these units and they are not the same job as drywall. Ink Blend's published position is that a surface has to be smooth, clean, dry and properly prepared, and on block that usually means a filling and sealing stage before anything else happens. That is a real cost and a real part of the schedule, so it is better raised at enquiry than discovered on site. Photograph the wall in raking light — a torch or a phone light held flat against the surface — and the texture will show up in a way a straight-on photo hides completely.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can you print artwork in Punjabi, Hindi, Urdu or Arabic?",
        answer:
          "Yes, and the thing to get right is the file rather than the printing. Send the exact wording as live text plus the font you want, and confirm the font is licensed for large-format reproduction. We will convert to clean vector outlines and check that conjuncts, ligatures and right-to-left setting still hold together at wall height before anything is approved.",
      },
      {
        question: "Our banquet hall is booked most weekends. Does that rule us out?",
        answer:
          "No, but it shapes the plan. Tell us which dates are already sold at the enquiry stage. Surface preparation, artwork approval and file production all happen before anyone needs the room, so the part that requires the space can be fitted to a window you choose rather than one we assume.",
      },
      {
        question: "Can you print onto painted concrete block in a Steeles Avenue unit?",
        answer:
          "Often, but block usually needs filling and sealing first. The published requirement is a surface that is smooth, clean, dry and properly prepared, and raw block is none of the first two. Send a raking-light photo — phone light held flat against the wall — and we can tell you what the preparation stage looks like before you commit to anything.",
      },
      {
        question: "We lease our unit. Is there anything we should check first?",
        answer:
          "Two things. Whether your landlord needs to approve a permanent finish, and whether your lease has a reinstatement or make-good clause requiring the wall be returned to plain paint at the end of term. A printed wall is a permanent finish, not a peel-off graphic, so it is worth reading that clause before design work starts.",
      },
      {
        question: "Do you handle religious imagery, and how do you decide placement?",
        answer:
          "We do, and we treat placement as your decision rather than ours. Traditions differ on what may sit above a doorway, what must not be cropped, and what should not share a wall with seating or a washroom entrance. Tell us the tradition and how the room is used, and we will flag anything that looks like it needs your ruling.",
      },
      {
        question: "Is this better than wallpaper for a wide hall wall?",
        answer:
          "For a custom image across a wide wall it usually is, because the artwork goes onto the wall itself rather than arriving in panels that have to be joined. There is no seam to line up and no edge to lift. Wallpaper still makes sense when you want a repeating pattern or expect to change the look often.",
      },
    ],
    gallery: [
      image("handPaintedCraneMural", "a hand-painted mural, shown for contrast: brushwork, not print"),
      image("banquetTableSetting", "the kind of hall setting a feature wall sits behind"),
      image("glassOfficeCorridor", "a Brampton-style office corridor with no graphics applied"),
      image("concreteFeatureWall", "a textured feature wall of the sort that needs preparation before printing"),
      image("panelledHallwayFramedArt", "a panelled circulation space, an alternative to framed prints"),
    ],
    ctaHeading: "Send us the wall and we will tell you what it needs",
    ctaBody:
      "Photos square-on and in raking light, rough measurements, the room's use, and any dates already in the calendar. If a script other than English is involved, send the wording as text. We will come back with what the surface needs and what the artwork needs, in that order.",
    related: [
      "/wall-printing/vaughan",
      "/wall-printing/mississauga",
      "/industries/religious-and-cultural-spaces",
      "/industries/hotels-and-condos",
      "/industries/offices-and-corporate",
      "/tools/wall-readiness",
      "/tools/service-area",
    ],
  },

  /* ──────────────────────────── MISSISSAUGA ──────────────────────────── */
  {
    family: "city",
    slug: "mississauga",
    pathname: "/wall-printing/mississauga",
    city: "Mississauga",
    province: "Ontario",
    districts: [
      "Square One and the City Centre office cluster",
      "The Airport Corporate Centre",
      "Heartland Town Centre",
      "Port Credit and Lakeshore Road East",
      "Streetsville village",
    ],
    title: "Wall Printing in Mississauga",
    metaDescription:
      "Direct-to-wall UV printing for Mississauga offices, receptions and retail. Brand colour matching, landlord approvals, and working around an occupied floor.",
    h1: "Wall printing for Mississauga offices and workplaces",
    intro:
      "Mississauga's wall printing enquiries come mostly from leased office space, and leased office space brings its own set of questions before anyone talks about artwork. Who approves a permanent finish — you, or the building? What does the lease say has to happen to that wall when you leave? Can the floor stay occupied while the work happens, and if not, which evenings are actually available? The printing is the straightforward part. This page is mostly about the questions worth answering first.",
    formSourceId: "city-mississauga",
    toolPrompt:
      "Most Mississauga enquiries are leased office space, and the question that stalls them is not the wall — it is the lease. The last question below is the one worth answering before anything else happens.",
    hero: image("glassOfficeCorridor", "a Mississauga-style office corridor before any graphics are applied"),
    benefits: [
      {
        icon: "building",
        title: "Built for a leased floor",
        description:
          "We will ask about landlord consent and reinstatement clauses before design starts, because a printed wall is a permanent finish rather than a graphic you peel off at the end of term.",
      },
      {
        icon: "palette",
        title: "Brand colour taken seriously",
        description:
          "Send your brand guidelines with the actual colour values. Screen colour and printed colour are different things, and it is better to agree a proof than to discover a mismatch on the wall.",
      },
      {
        icon: "shield",
        title: "Occupied floors planned around",
        description:
          "Tell us whether staff stay in place. Access control, escort requirements and evening-only windows all change the plan and all get missed when nobody asks.",
      },
      {
        icon: "ruler",
        title: "Reception walls measured properly",
        description:
          "Feature walls behind a desk are rarely a plain rectangle. Recesses, returns, switch plates and a logo already fixed to the wall all need to be in the measurements.",
      },
    ],
    factTableHeading: "What a Mississauga office enquiry should include",
    factRows: [
      {
        label: "Space and floor",
        value:
          "Reception, boardroom, corridor, café or collaboration zone — and which floor, since that drives lift and loading access.",
      },
      {
        label: "Tenure",
        value:
          "Owned or leased. If leased, whether the landlord approves alterations and what the reinstatement clause requires at end of term.",
      },
      {
        label: "Wall measurements",
        value:
          "Width and height plus anything interrupting the face: switch plates, thermostats, recesses, returns, and any existing fixed signage.",
      },
      {
        label: "Brand assets",
        value:
          "Vector logo files, brand guidelines, and the specified colour values rather than a colour picked off a screenshot.",
      },
      {
        label: "Building access",
        value:
          "Security escort requirements, loading bay and lift booking, permitted working hours, and whether the floor stays occupied.",
      },
      {
        label: "Existing finish",
        value:
          "Current paint finish and sheen, whether the wall has been wallpapered before, and whether it has been patched recently.",
      },
    ],
    sections: [
      {
        heading: "The lease question, first",
        body: [
          "A printed wall is a finish, not a fixing. That is the appeal — nothing to lift, nothing to peel, no edge that catches — and it is also the thing that makes the lease worth reading before anyone designs anything. Most commercial leases contain a reinstatement or make-good clause setting out the condition the space must be returned in. Plenty of them require plain painted walls. That does not stop the work, but it does mean the end-of-term repaint should be a known cost from the beginning rather than a surprise several years later.",
          "Landlord consent is the other half. In multi-tenant buildings around the City Centre cluster and the Airport Corporate Centre, alterations to base-building finishes usually need written approval, and the approval process has its own timetable. Starting that conversation at enquiry stage costs nothing and removes the most common cause of a stalled project.",
          "None of this is specific to printing — the same questions arise in any workplace fit-out involving a permanent finish. If you own the space, they mostly fall away and the conversation gets a great deal shorter.",
        ],
      },
      {
        heading: "Getting brand colour to behave",
        body: [
          "Colour is where office projects most often go sideways, and the reason is mundane: a screen emits light and a wall reflects it. A brand blue that looks right on a monitor in a bright meeting room can read differently under the warm downlights above a reception desk. Sending brand guidelines with actual specified colour values, rather than a colour sampled from a screenshot or a website, removes most of the problem before it starts.",
          "The rest is lighting. If the wall sits under warm downlights, or beside a full-height window that swings from grey morning to hard afternoon sun, that is worth telling us. Photograph the wall at two different times of day if you can. It takes a minute and it tells us more about how the finished wall will read than any amount of description.",
          "Where an exact corporate colour is critical — and for some brands it genuinely is — say so explicitly at the enquiry stage so it can be treated as a requirement to prove rather than an assumption to hope about.",
        ],
      },
      {
        heading: "Working around people",
        body: [
          "Very few Mississauga offices can empty a floor. Most projects happen around staff, which makes the practical constraints the ones that decide the schedule: what hours the building permits work, whether a security escort is required for contractors, how the lift and loading bay are booked, and whether there is a route to the wall that does not cross a live working area.",
          "A reception feature wall is the hardest of these, because it is the one space that cannot look like a building site during business hours and also cannot be closed. Corridors are usually easier than they look. Boardrooms are easiest of all, because they can be blocked out in a calendar like any other booking.",
          "None of this is exotic — it is the same coordination any fit-out trade needs. It is worth setting out at enquiry because it is the part that most often turns a straightforward job into a stalled one.",
        ],
      },
    ],
    faqs: [
      {
        question: "We lease our floor. Do we need the landlord's permission?",
        answer:
          "Almost certainly, and it is worth confirming before design work starts. In multi-tenant buildings, alterations to base-building finishes normally require written consent, and that approval has its own timetable. Ask your property manager early — it costs nothing and it removes the most common reason these projects stall.",
      },
      {
        question: "What happens to the wall when our lease ends?",
        answer:
          "That depends on your reinstatement or make-good clause. Many commercial leases require walls be returned to plain paint. A printed wall is a permanent finish, so the end-of-term repaint should be treated as a known future cost rather than a surprise. Read the clause, or ask your property manager to confirm, before you commit.",
      },
      {
        question: "Can you match our exact brand colour?",
        answer:
          "Send your brand guidelines with the specified colour values rather than a colour sampled from a screenshot, and tell us if an exact match is a hard requirement. Screens emit light and walls reflect it, so the two never behave identically. Where colour is critical we would rather agree a proof than assume.",
      },
      {
        question: "Does our office need to close?",
        answer:
          "Usually not, but tell us whether the floor stays occupied. Permitted working hours, security escort requirements, lift and loading bay booking, and whether there is a route to the wall that avoids live working areas all shape the plan. Boardrooms are straightforward to block out. Reception takes the most planning.",
      },
      {
        question: "Our reception wall has a recess and an existing logo. Is that a problem?",
        answer:
          "It is normal, it just needs to be in the measurements. Send width and height plus anything interrupting the face — recesses, returns, switch plates, thermostats, and any signage already fixed to the wall. A square-on photo and one raking-light shot along the surface will show us most of what the tape measure misses.",
      },
      {
        question: "How is this different from the vinyl wall graphics most sign companies offer?",
        answer:
          "Vinyl is a printed film applied to the wall; direct-to-wall printing puts the image onto the prepared surface itself. That means no seams between panels and no edges to lift. The trade-off is permanence: vinyl suits graphics you expect to change, and a printed wall suits a finish you intend to keep.",
      },
    ],
    gallery: [
      image("livingRoomBlankWalls", "blank walls of the kind a workplace project starts from"),
      image("concreteFeatureWall", "a board-formed concrete wall — a textured substrate needing preparation"),
      image("curvedBuildingExterior", "the commercial building stock this work sits inside"),
      image("panelledHallwayFramedArt", "a panelled corridor using framed prints instead of a printed wall"),
      image("cgiBlankFeatureWall", "a bare feature wall above a sideboard, shown as a candidate surface"),
    ],
    ctaHeading: "Start with the lease, the wall and the lighting",
    ctaBody:
      "Send photographs square-on and along the wall, rough measurements including anything interrupting the face, your brand guidelines with real colour values, and a note on whether the space is leased. We will come back with what needs approving and what needs proving.",
    related: [
      "/wall-printing/brampton",
      "/wall-printing/oakville",
      "/industries/offices-and-corporate",
      "/industries/retail-and-salons",
      "/industries/hotels-and-condos",
      "/tools/wall-readiness",
    ],
  },

  /* ───────────────────────────── TORONTO ───────────────────────────── */
  {
    family: "city",
    slug: "toronto",
    pathname: "/wall-printing/toronto",
    city: "Toronto",
    province: "Ontario",
    districts: [
      "Queen Street West and Ossington",
      "King Street West and the entertainment district",
      "Liberty Village",
      "The Distillery District",
      "Leslieville and Riverside",
    ],
    title: "Wall Printing in Toronto",
    metaDescription:
      "Direct-to-wall UV printing for Toronto restaurants, bars and condo common areas. Overnight working, heritage buildings, and no loading bay to speak of.",
    h1: "Wall printing in Toronto, planned around the building",
    intro:
      "Downtown Toronto is the hardest logistics problem on this list and the easiest creative one. The rooms are good, the ceilings are interesting, and the buildings along Queen West, Ossington and the Distillery District have character worth printing against. What they do not have is parking, a loading bay, a lift you can just use, or in many cases the freedom to alter a façade or a protected interior without asking. Almost every Toronto conversation starts with access and permissions rather than artwork.",
    formSourceId: "city-toronto",
    toolPrompt:
      "Downtown rooms are frequently the oldest ones, and original plaster and exposed brick behave nothing like drywall. The questions below will tell you which conversation you are about to have.",
    hero: image("curvedBuildingExterior", "the dense downtown building stock this work sits inside"),
    benefits: [
      {
        icon: "clipboard",
        title: "Access worked out before anything else",
        description:
          "Loading restrictions, no on-site parking, a lift shared with residents and a service door onto a laneway. These decide the schedule far more than the wall does.",
      },
      {
        icon: "utensils",
        title: "Overnight and closed-day working",
        description:
          "Restaurants and bars rarely close. Tell us your quietest day and whether the room can be handed over after last service, and we will plan to that.",
      },
      {
        icon: "building",
        title: "Condo common areas understood",
        description:
          "Lobby and amenity walls are common elements. That means property manager sign-off and often a board decision, on the board's timetable rather than yours.",
      },
      {
        icon: "shield",
        title: "Heritage constraints flagged early",
        description:
          "Parts of Queen West, the Distillery District and King West sit under heritage designation. We will tell you when something looks like it needs a permission we cannot grant.",
      },
    ],
    factTableHeading: "What a Toronto enquiry should include",
    factRows: [
      {
        label: "Venue type",
        value:
          "Restaurant, bar, café, retail unit, condo lobby or amenity room, studio, or an office in a converted building.",
      },
      {
        label: "Access route",
        value:
          "Front door onto the street or a rear laneway, stairs or lift, and whether there is anywhere at all to stop a vehicle.",
      },
      {
        label: "Available hours",
        value:
          "Quietest day of the week, whether the room can be handed over after last service, and any noise restrictions from residents above.",
      },
      {
        label: "Building status",
        value:
          "Whether the property is heritage-designated or in a heritage conservation district, and whether the wall is interior or visible from the street.",
      },
      {
        label: "Approvals",
        value:
          "For a condo, the property manager and board. For a leased unit, the landlord. For a heritage property, whatever the designation requires.",
      },
      {
        label: "Wall condition",
        value:
          "Original plaster, exposed brick, drywall or a later stud partition. Older buildings are rarely as flat as they look.",
      },
    ],
    sections: [
      {
        heading: "Hospitality rooms that never close",
        body: [
          "The Queen West and King West rooms are the ones people want printed, and they are also the ones that cannot lose a service. Everything that shapes work for restaurants and cafés applies here with less room to manoeuvre than anywhere else in the region. A restaurant closing for a week is a serious cost, so the realistic plan is almost always overnight work, or a single quiet day, or both in sequence. The useful information at enquiry is not when you would like it done — it is which night the room genuinely empties and how long after last service the space is actually clear.",
          "Bars bring an extra consideration that catches people out: the wall behind the back bar is usually the one you want printed, and it is also the one with bottles, glass shelving, taps and lighting fixed to it. Everything on that wall has to come off and go back. That is somebody's job, and it is worth deciding whose before the schedule is set.",
          "Residents above are the other constraint. In mixed-use buildings along Ossington and Queen there are almost always apartments over the ground floor, and there are limits on what can happen at three in the morning. If your building has a noise clause or an active residents' association, tell us — it is better to design the plan around it than to discover it on the night.",
        ],
      },
      {
        heading: "Condo lobbies and amenity rooms",
        body: [
          "Condominium work runs on a different clock. A lobby wall, a party room, a gym or a corridor is a common element, which means the decision is not the property manager's alone. It typically needs board approval, boards meet on a schedule, and that schedule is the real timeline of the project. Anyone promising you a date before the board has met is guessing.",
          "What speeds it up is giving the board something to approve. A specific wall, a specific image, a clear statement that the finish is printed onto the prepared surface rather than applied as a film, and an honest answer to the question they will certainly ask — what happens if a future board wants it gone. The answer is that it is repainted like any other wall finish, and saying so plainly tends to help.",
          "Practical access in condos is its own small negotiation. Service lift booking, protective coverings in the lobby, restricted hours, and a route that does not run through a residents' entrance during the evening. None of it is difficult, but all of it takes longer than people expect if it starts late.",
        ],
      },
      {
        heading: "Old buildings, uneven walls",
        body: [
          "Toronto's best interiors are frequently its oldest, and old walls are not flat. This is where UV wall printing needs the most honest survey work before anything is promised. Original plaster undulates. Exposed brick has a deep, irregular face and a mortar line every few inches. A stud partition added in the 1980s may be flat but hollow and patched. All of these can be worked with, and all of them change what the surface needs beforehand.",
          "Ink Blend's published position is that a surface must be smooth, clean, dry and properly prepared. On original plaster that can mean making good and skimming. On exposed brick, the honest conversation is about whether you want the texture to read through the image — which can look genuinely good and is a deliberate choice — or whether you want a flat face, which means a different preparation entirely.",
          "The photograph that tells us most is the one nobody takes: a phone light held flat against the wall, shining along it rather than at it. Every ripple, patch and hollow shows up immediately. Send that alongside the straight-on shot and the first answer you get back will be a great deal more useful.",
        ],
      },
    ],
    faqs: [
      {
        question: "Our restaurant can't close. How does that work?",
        answer:
          "Overnight or on your quietest day, usually. What we need at enquiry is not your preferred date but the practical one: which night the room genuinely empties, how long after last service it is actually clear, and whether residents above the unit impose any noise restriction. The plan gets built around that.",
      },
      {
        question: "We want the wall behind our back bar printed. Anything we should know?",
        answer:
          "Mostly that everything fixed to it has to come off and go back — bottle shelving, glass racks, taps, lighting. That is a real piece of work and it is worth deciding early whose responsibility it is. It also affects how long the room is out of action, which for a bar is usually the number that matters most.",
      },
      {
        question: "Our building is heritage-designated. Can you still print a wall?",
        answer:
          "Often yes for interior walls, but it depends on what the designation covers and whether the wall is a protected interior feature. We are not able to grant or interpret that permission. Tell us the property's status at enquiry and we will flag anything that looks like it needs an approval before design work is worth starting.",
      },
      {
        question: "How long does condo board approval take?",
        answer:
          "As long as the board's meeting schedule takes — that is genuinely the timeline, and we cannot compress it. What helps is giving them something concrete to approve: the specific wall, the specific image, and a plain statement that the finish is printed onto the prepared surface and can be repainted by a future board like any other wall.",
      },
      {
        question: "Can you print onto exposed brick?",
        answer:
          "It can be done, and the first question is whether you want the brick texture to read through the image or not. Letting it show can look genuinely good and is a deliberate design choice; a flat result means a different and more involved preparation. Send a raking-light photo — phone light held flat against the wall — and we can tell you what you are dealing with.",
      },
      {
        question: "There is nowhere to park outside our unit. Is that a problem?",
        answer:
          "It is normal downtown and it is worth saying up front. Tell us whether there is a rear laneway, a service door, stairs or a lift, and any loading restrictions on your street. Access shapes a Toronto schedule more than the wall does, and it is much easier to plan for than to discover on the day.",
      },
    ],
    gallery: [
      image("handPaintedBrickMural", "hand-painted work on exposed brick — brushwork, shown for contrast"),
      image("banquetTableSetting", "the hospitality settings these walls sit behind"),
      image("glassOfficeCorridor", "a converted-building corridor with no graphics applied"),
      image("cgiFurnishedLivingRoom", "a rendered interior, shown as a visualisation example rather than a photograph"),
      image("concreteFeatureWall", "a hard-surfaced feature wall of the kind found in converted buildings"),
    ],
    ctaHeading: "Tell us about the access before the artwork",
    ctaBody:
      "Which night the room empties, how you get in, whether the building is heritage-designated, and who has to approve it. Add a square-on photo and a raking-light shot of the wall. Access answers shape a Toronto project more than anything else does.",
    related: [
      "/wall-printing/hamilton",
      "/wall-printing/mississauga",
      "/industries/restaurants-and-cafes",
      "/industries/hotels-and-condos",
      "/industries/retail-and-salons",
      "/tools/wall-readiness",
    ],
  },

  /* ───────────────────────────── VAUGHAN ───────────────────────────── */
  {
    family: "city",
    slug: "vaughan",
    pathname: "/wall-printing/vaughan",
    city: "Vaughan",
    province: "Ontario",
    districts: [
      "The Vaughan Metropolitan Centre",
      "The Highway 7 corridor",
      "Woodbridge",
      "Concord and the Keele Street employment lands",
      "Maple and Vaughan Mills",
    ],
    title: "Wall Printing in Vaughan",
    metaDescription:
      "Direct-to-wall UV printing for Vaughan event venues and new-build interiors. Fresh drywall, trade sequencing, and very large uninterrupted walls.",
    h1: "Wall printing for Vaughan venues and new builds",
    intro:
      "More of Vaughan's walls are new than anywhere else on this list. The Vaughan Metropolitan Centre towers, the Highway 7 event venues and the Woodbridge and Concord commercial units include a lot of recently finished space, and new construction brings a specific technical issue that older buildings do not: fresh drywall, new plaster and new screed all hold moisture, and moisture is the enemy of anything applied to a surface. Timing matters here in a way it does not elsewhere.",
    formSourceId: "city-vaughan",
    toolPrompt:
      "More walls here are new than anywhere else on this list, which makes the second question below the important one. A freshly finished wall is often less ready than a twenty-year-old one.",
    hero: image("banquetTableSetting", "the event-venue settings these Vaughan walls sit behind"),
    benefits: [
      {
        icon: "droplets",
        title: "New construction timed properly",
        description:
          "Freshly finished walls hold moisture. Rushing a print onto a wall that has not dried out is the one avoidable mistake on a new-build project, so we will ask when it went up.",
      },
      {
        icon: "ruler",
        title: "Very large walls without joins",
        description:
          "Event venues along Highway 7 have some of the widest uninterrupted walls in the region. Printing onto the surface removes the panel joins a wide wall would otherwise show.",
      },
      {
        icon: "clipboard",
        title: "Sequenced with the other trades",
        description:
          "On a live fit-out we need to land after the wall is finished and before furniture, lighting and flooring protection come out. That slot needs booking, not assuming.",
      },
      {
        icon: "sparkles",
        title: "Designed for the camera",
        description:
          "Event walls exist to be photographed. Where the light falls and where guests actually stand matter as much as the artwork itself.",
      },
    ],
    factTableHeading: "What a Vaughan enquiry should include",
    factRows: [
      {
        label: "Property type",
        value:
          "Event or banquet venue, office suite in a new tower, showroom, retail unit, restaurant, or a room in a new home.",
      },
      {
        label: "Build stage",
        value:
          "Complete and occupied, in fit-out, or still under construction. If under construction, when the wall was finished.",
      },
      {
        label: "Wall age",
        value:
          "How recently the drywall, plaster or skim coat went up, and whether the space has been heated and ventilated since.",
      },
      {
        label: "Wall size",
        value:
          "Full width and height. Venue walls are often wider than people estimate, so measure rather than pace it out.",
      },
      {
        label: "Programme",
        value:
          "On a live fit-out, who is coordinating trades and what is scheduled either side of us.",
      },
      {
        label: "Lighting design",
        value:
          "Whether lighting is already specified, and where it falls on the wall. This changes how the finished image reads.",
      },
    ],
    sections: [
      {
        heading: "Why new walls need a pause",
        body: [
          "It is counterintuitive, but a brand-new wall is often less ready than a twenty-year-old one. Drywall compound, plaster and skim coats all carry water when they go on, and that water leaves over time. Print onto a surface that is still releasing moisture and you have introduced a variable nobody wanted. Ink Blend's published requirement is a surface that is smooth, clean, dry and properly prepared, and on a new build the word doing the work in that sentence is dry.",
          "So the question we will ask on any Vaughan new-build enquiry is simple: when did that wall go up, and has the space been heated and ventilated since? A shell that has stood open through a cold month behaves very differently from one that has been closed and warm. We would rather establish that at enquiry than build a schedule that has to move.",
          "None of this is a reason to wait until a building is finished before getting in touch. The opposite, in fact — early contact is what lets the print slot be scheduled sensibly rather than squeezed in.",
        ],
      },
      {
        heading: "Event venues and the width problem",
        body: [
          "The Highway 7 venues and the larger Woodbridge halls have walls that are genuinely wide — wider than most people estimate when they describe them, which is why measuring beats pacing. That width is exactly where direct-to-wall printing earns its place. Any material-based approach arrives in rolls, and rolls have to be joined. Across a long wall under raking event lighting, joins announce themselves.",
          "An event feature wall also has a purpose beyond decoration: it is a backdrop. People stand in front of them and photograph each other, which means the design decisions that matter are not only aesthetic. Where does the light actually fall? At what height do heads sit in a group photo? Is the most-photographed part of the wall the part the design treats as important, or is the good bit hidden behind the top table?",
          "Tell us how the room is used and where people gather, and the composition can be built around that rather than centred by default.",
        ],
      },
      {
        heading: "Landing in a live fit-out",
        body: [
          "On a workplace or venue still in construction, the printing has a fairly narrow correct slot: after the wall is finished and decorated, and before furniture, loose fittings and floor protection are removed. Land too early and the surface is not ready. Land too late and you are working around finished joinery and a floor everyone is now protective of.",
          "That means the person we most need to talk to early is whoever is coordinating trades. Not to add complexity, but because a slot booked into the programme is worth considerably more than a slot requested afterwards. Tell us who is running the sequence and what is scheduled either side of us and it usually resolves itself.",
          "Lighting is worth raising in the same conversation. On a new fit-out the lighting is frequently still being specified when the wall is being discussed, which is a rare opportunity — the image and the light that falls on it can actually be designed together rather than one arriving to find the other already fixed.",
        ],
      },
    ],
    faqs: [
      {
        question: "Our building is brand new. Can you print straight away?",
        answer:
          "Not necessarily, and this is the main thing to raise early. Fresh drywall, plaster and skim coats hold moisture as they cure, and printing onto a surface still releasing it introduces a problem nobody needs. Tell us when the wall went up and whether the space has been heated and ventilated since, and we can advise on timing.",
      },
      {
        question: "Our venue wall is very wide. Is there a limit?",
        answer:
          "Width is the situation direct-to-wall printing suits best, because the image goes onto the wall rather than arriving in rolls that have to be joined. Please measure rather than estimate — venue walls are routinely wider than described — and send the full width and height along with photographs of the whole run.",
      },
      {
        question: "We're mid fit-out. When should you come in?",
        answer:
          "After the wall is finished and decorated, and before furniture and floor protection come out. That is a narrower window than it sounds, so the useful step is putting us in touch with whoever is coordinating trades. A slot booked into the programme works far better than one requested once the sequence is already running.",
      },
      {
        question: "Can the artwork be designed around where people stand for photos?",
        answer:
          "Yes, and it is worth doing for an event wall. Tell us how the room is used, where guests gather, where the top table or stage sits, and where the lighting falls. Composing around those points is more useful than centring the image and hoping the good part is not behind someone's head.",
      },
      {
        question: "The lighting isn't finalised yet. Is that a problem?",
        answer:
          "It is an opportunity, actually. Most projects arrive with lighting already fixed and the artwork has to work around it. On a fit-out where both are still open, the image and the light that falls on it can be considered together. Tell us what is specified so far and where the fittings are intended to go.",
      },
      {
        question: "Is a printed wall suitable for a venue that gets a lot of contact?",
        answer:
          "Placement does most of the work here. Chair backs, trolleys and guests all make contact at predictable heights, so a design that keeps its important detail above the contact zone will hold up better than one that runs to the skirting. Tell us how the room is laid out and we will raise it during the concept stage.",
      },
    ],
    gallery: [
      image("cgiBlankFeatureWall", "a bare feature wall of the kind a new-build project starts from"),
      image("glassOfficeCorridor", "a newly finished office corridor before any graphics"),
      image("concreteFeatureWall", "a modern hard-surface feature wall"),
      image("curvedBuildingExterior", "contemporary commercial construction of the sort going up locally"),
      image("livingRoomBlankWalls", "blank interior walls awaiting a finish"),
    ],
    ctaHeading: "Tell us when the wall went up",
    ctaBody:
      "For a new build, the date the wall was finished and whether the space has been heated since. For a venue, the measured width and how the room is used. Add photographs of the full run and we will tell you what the timing should be.",
    related: [
      "/wall-printing/toronto",
      "/wall-printing/brampton",
      "/industries/hotels-and-condos",
      "/industries/restaurants-and-cafes",
      "/industries/offices-and-corporate",
      "/tools/wall-readiness",
    ],
  },

  /* ───────────────────────────── OAKVILLE ───────────────────────────── */
  {
    family: "city",
    slug: "oakville",
    pathname: "/wall-printing/oakville",
    city: "Oakville",
    province: "Ontario",
    districts: [
      "Downtown Oakville and Lakeshore Road East",
      "Bronte Village",
      "Kerr Village",
      "The Uptown Core",
      "Winston Park and the Speers Road commercial strip",
    ],
    title: "Wall Printing in Oakville",
    metaDescription:
      "Direct-to-wall UV printing for Oakville homes and boutique retail. Working in occupied houses, matching existing finishes, and shops where one wall carries it.",
    h1: "Wall printing in Oakville homes and boutique retail",
    intro:
      "Oakville splits fairly cleanly into two kinds of enquiry. One is residential: a hallway, a stairwell, a dining room or a principal bedroom in a house somebody is living in, often with a designer or decorator already involved. The other is small retail along Lakeshore Road East, in Bronte Village and Kerr Village, where the unit is compact enough that the feature wall is effectively the whole interior. Both are careful, close-quarters work, and both are more about protecting what is already there than about the printing itself.",
    formSourceId: "city-oakville",
    toolPrompt:
      "In an occupied house the surface questions matter as much as the design ones, and a recently decorated room is its own case. Six questions, and you will know what to photograph before anyone visits.",
    hero: image("livingRoomBlankWalls", "the blank interior walls an Oakville residential enquiry typically starts from"),
    benefits: [
      {
        icon: "house",
        title: "Occupied homes treated as homes",
        description:
          "Floor protection, dust control and a clear route in and out. Somebody lives there, and the standard for leaving a house is not the standard for leaving a site.",
      },
      {
        icon: "brush",
        title: "Existing finishes matched into",
        description:
          "A printed wall has to sit beside millwork, trim and paint that already exist. Send photographs of what surrounds it, not only the wall itself.",
      },
      {
        icon: "store",
        title: "Small retail where the wall is the shop",
        description:
          "In a compact unit the feature wall is most of what a customer sees. Scale and sightline from the doorway matter more than they would in a larger space.",
      },
      {
        icon: "palette",
        title: "Designers and decorators worked with",
        description:
          "If there is already a scheme, we would rather receive it and work inside it than propose something that fights the finishes you have chosen.",
      },
    ],
    factTableHeading: "What an Oakville enquiry should include",
    factRows: [
      {
        label: "Property type",
        value:
          "Owner-occupied home, rental, boutique retail unit, salon or studio, or a professional office in a converted house.",
      },
      {
        label: "Room and wall",
        value:
          "Which room, which wall, and what is on the adjacent walls. Hallways and stairwells need the whole run photographed, not one section.",
      },
      {
        label: "Surrounding finishes",
        value:
          "Trim, millwork, flooring and current paint colours. Photograph the wall together with what sits next to it.",
      },
      {
        label: "Occupancy",
        value:
          "Whether anyone is living in the space during the work, and whether there are pets or young children to plan around.",
      },
      {
        label: "Access",
        value:
          "Stairs, tight landings, doorways, and whether furniture can be moved out or only moved back.",
      },
      {
        label: "Existing scheme",
        value:
          "Any designer or decorator involved, plus mood boards, fabric samples or a colour scheme already agreed.",
      },
    ],
    sections: [
      {
        heading: "Working inside somebody's house",
        body: [
          "Custom wall murals in a home are judged on things that have nothing to do with printing. Whether the floor was protected properly. Whether the dust was contained rather than spread. Whether furniture went back where it came from. Whether the house was left in a state you would be happy to walk into that evening. The image on the wall is what you paid for, but the experience of the week is what you will remember.",
          "Practically, that means the enquiry should mention the things that shape a domestic job: stairs and tight landings, whether a hallway can actually be cleared, pets that should not meet an open doorway, young children, and any room that has to stay usable throughout. Stairwells are the classic Oakville request and the classic underestimate — a stairwell wall is tall, awkward to reach and impossible to photograph in one shot, so send several overlapping images up the run rather than one attempt at the whole thing.",
          "If the room has been recently decorated, say when. Fresh paint and fresh filler behave like any other new finish and want time before anything goes over them.",
        ],
      },
      {
        heading: "Matching what is already there",
        body: [
          "Almost no Oakville residential wall is a blank canvas in the true sense. It sits next to trim in a particular white, millwork in a particular stain, a floor with a particular warmth, and a scheme somebody has already spent time on. A printed wall that ignores all of that reads as an intrusion regardless of how good the image is.",
          "So the most useful photographs are not close-ups of the wall. They are wider shots showing the wall in context with the floor, the trim, the adjacent rooms visible through the doorway, and the light as it actually falls. If a designer or decorator is involved, their scheme is the best possible starting point, and we would far rather work inside it than propose something that fights it.",
          "Where a colour has to relate to something physical — a fabric, a stone, a stained timber — say so, and be specific about which item is the reference. Matching to a described colour and matching to an object in a room are different exercises.",
        ],
      },
      {
        heading: "Boutique retail on Lakeshore and in the villages",
        body: [
          "The small units along Lakeshore Road East, in Bronte Village and in Kerr Village — shops, studios and the occasional salon — have a particular quality: they are small enough that one wall carries the whole impression. A customer takes in the space in a single glance from the doorway, so the wall's job is not decoration in the background — it is most of the interior identity.",
          "That changes the design conversation. The first question is what the wall looks like from the entrance, at the distance a customer actually stands, rather than what it looks like flat-on in a drawing. The second is what will sit in front of it: rails, shelving, a counter, a mirror. A composition that is beautiful on paper and half-obscured by a display unit has not done its job.",
          "The retail constraint that catches people out is trading hours. A small independent shop losing several trading days is a real cost, and it is worth being direct about that at enquiry so the plan can be built around your quietest period rather than an assumed one.",
        ],
      },
    ],
    faqs: [
      {
        question: "We're living in the house. How disruptive is this?",
        answer:
          "It is close-quarters work in an occupied home, so the practical details matter: floor protection, dust containment, a clear route in and out, and furniture that goes back where it came from. Tell us about stairs, tight landings, pets, young children and any room that has to stay usable, and the plan can be built around them.",
      },
      {
        question: "How do I photograph a stairwell wall?",
        answer:
          "In sections rather than in one attempt. Take several overlapping shots up the run, plus one from the bottom looking up and one from the landing looking down. Add a raking-light shot with a phone light held flat against the surface. Stairwells are the most commonly underestimated residential wall, and one photograph never captures one.",
      },
      {
        question: "We have a designer. Will you work with their scheme?",
        answer:
          "Gladly, and it makes for a better result. If there is already a scheme, mood board, fabric selection or agreed colour palette, send it. We would much rather work inside a considered scheme than propose something that competes with finishes you have already chosen and paid for.",
      },
      {
        question: "Can the artwork be matched to a fabric or a stone we already have?",
        answer:
          "Tell us which specific object is the reference and treat it as a requirement rather than a preference. Matching to a physical item is a different exercise from matching to a described colour, and the honest approach is to agree what is being matched to before design work rather than after.",
      },
      {
        question: "Our shop is small. Does a printed wall make sense?",
        answer:
          "Often more so than in a large space, because in a compact unit one wall carries most of the interior identity. The design questions shift, though: what it looks like from the doorway at the distance a customer stands, and what will sit in front of it. Tell us where rails, shelving and the counter go.",
      },
      {
        question: "We had the room repainted recently. Does that matter?",
        answer:
          "It can, so mention when. Fresh paint and fresh filler hold moisture as they cure, in the same way any new finish does. The published requirement is a surface that is smooth, clean, dry and properly prepared, and recently decorated walls sometimes want a little time before anything goes over them.",
      },
    ],
    gallery: [
      image("panelledHallwayFramedArt", "a panelled hallway using framed prints — one alternative to a printed wall"),
      image("spaTreatment", "the close-contact retail and treatment settings common in the villages"),
      image("concreteFeatureWall", "a feature wall sitting within a considered interior scheme"),
      image("cgiFurnishedLivingRoom", "a rendered room, shown as a visualisation example rather than a photograph"),
      image("abstractPaintingMacro", "a painted canvas at close range, showing texture at scale"),
    ],
    ctaHeading: "Send the room, not just the wall",
    ctaBody:
      "Wider shots showing the wall with its floor, trim and adjacent rooms tell us far more than a close-up. Add overlapping photographs for a stairwell, a note on who is living there during the work, and any scheme your designer has already agreed.",
    related: [
      "/wall-printing/mississauga",
      "/wall-printing/toronto",
      "/industries/homes-and-luxury-interiors",
      "/industries/retail-and-salons",
      "/industries/restaurants-and-cafes",
      "/tools/wall-readiness",
    ],
  },

  /* ───────────────────────────── HAMILTON ───────────────────────────── */
  {
    family: "city",
    slug: "hamilton",
    pathname: "/wall-printing/hamilton",
    city: "Hamilton",
    province: "Ontario",
    districts: [
      "James Street North",
      "Locke Street South",
      "Ottawa Street North",
      "The downtown core and Gore Park",
      "Westdale and the Dundas edge",
    ],
    title: "Wall Printing in Hamilton",
    metaDescription:
      "Direct-to-wall UV printing for Hamilton's converted industrial spaces. Exposed brick, old plaster, uneven surfaces — and an honest read on what each one needs.",
    h1: "Wall printing on Hamilton's older, harder walls",
    intro:
      "Hamilton's best rooms tend to be its most awkward ones. The converted warehouses and older commercial buildings around James Street North, Ottawa Street North and the downtown core have brick, board-formed concrete, original plaster and every kind of later patch, which is a good deal more interesting to print onto than fresh drywall and a good deal less predictable. Most Hamilton enquiries turn into a conversation about the substrate before they turn into one about artwork, and that is the right order.",
    formSourceId: "city-hamilton",
    toolPrompt:
      "Brick, old plaster and board-formed concrete each need a different answer, and one long run here is often more than one of them. Start with the substrate question below.",
    hero: image("handPaintedBrickMural", "hand-painted work on exposed brick — the substrate, not our method"),
    benefits: [
      {
        icon: "scan",
        title: "An honest read on the substrate",
        description:
          "Brick, old plaster and board-formed concrete each behave differently. We would rather tell you a wall needs work than pretend it does not and disappoint you later.",
      },
      {
        icon: "layers",
        title: "Texture as a choice, not an accident",
        description:
          "On brick you can let the texture read through the image or fill for a flat face. Both are valid, they look completely different, and the decision should be deliberate.",
      },
      {
        icon: "shield",
        title: "Old buildings respected",
        description:
          "Heritage designation, original features and previous coatings all constrain what should happen to a wall. We flag what looks like it needs a permission we cannot give.",
      },
      {
        icon: "camera",
        title: "Raking light before anything else",
        description:
          "A phone light held flat against an old wall reveals what a straight-on photograph completely hides. It is the single most useful thing you can send us.",
      },
    ],
    factTableHeading: "What a Hamilton enquiry should include",
    factRows: [
      {
        label: "Building and use",
        value:
          "Converted warehouse, older commercial unit, storefront, studio, restaurant, gallery, or a room in a period house.",
      },
      {
        label: "Wall build-up",
        value:
          "Exposed brick, original plaster, board-formed concrete, later drywall over studs, or some combination across one run.",
      },
      {
        label: "Raking-light photo",
        value:
          "A phone light held flat against the surface, shining along it. This shows undulation, patching and hollows that a straight-on shot hides.",
      },
      {
        label: "Existing coatings",
        value:
          "Whether the wall has been painted, limewashed, sealed or previously wallpapered, and roughly when if you know.",
      },
      {
        label: "Texture intent",
        value:
          "Whether you want the surface texture to read through the finished image or want a flat face. These are very different jobs.",
      },
      {
        label: "Building status",
        value:
          "Any heritage designation, and whether the wall is an original feature of the building or a later addition.",
      },
    ],
    sections: [
      {
        heading: "Brick is a decision, not a problem",
        body: [
          "Exposed brick is the most common Hamilton enquiry and the one with the most interesting answer. Brick has a deep, irregular face and a recessed mortar line every few inches, and an image printed across it will follow that relief. That is not a failure — it can look genuinely excellent, and a lot of the appeal of a converted-warehouse interior comes from exactly that honesty about the building's fabric.",
          "But it has to be a decision. An image with fine detail or small text will lose that detail into the mortar lines, so brick suits bolder compositions with larger forms. If you want a flat, uninterrupted face instead, the brick has to be filled and levelled first, which is real work and changes the character of the wall permanently. Neither answer is wrong. What causes disappointment is not choosing.",
          "Previous coatings matter here too. Brick that was painted decades ago, or limewashed, or sealed at some point nobody remembers, is not the same surface as bare brick. If you know the history, tell us. If you do not, say that too — it is a normal answer for a building of that age.",
        ],
      },
      {
        heading: "Plaster, concrete and everything in between",
        body: [
          "Original plaster in the older commercial stock here is rarely flat, and it is the substrate where UV wall printing most rewards a proper survey. It undulates gently across a run, it has been patched at various points by various people to various standards, and it sometimes sits hollow where it has parted from the lath behind it. A hollow section is worth knowing about before rather than after, because it needs making good regardless of what goes on top.",
          "Board-formed concrete brings its own character — the timber grain and the board lines are part of why people like it, and like brick, an image will follow that relief. Later stud partitions added during a previous conversion are usually the flattest surface in the building and often the easiest wall in the room, which is worth knowing if you are choosing between walls.",
          "It is common for a single long run to be more than one of these. A wall that starts as original brick, becomes plaster halfway along and finishes as newer drywall is completely normal in a converted building. Photograph the whole run rather than the section you like best, because the changeover points are exactly where the preparation conversation lives.",
        ],
      },
      {
        heading: "Storefronts and studios",
        body: [
          "The James Street North and Ottawa Street North units are mostly small, independent and open to the street, and they share a constraint with small retail anywhere: closing costs money. What is specific here is that these buildings frequently have a single access route through the shopfront itself, no rear laneway, and stairs to anything above ground level — less forgiving than the equivalent stock in Toronto, which at least tends to have a service door onto a laneway. That is worth describing accurately at enquiry rather than being discovered.",
          "Studios and galleries along these strips tend to want something different from a retail feature wall — often a surface that works as a backdrop for changing work rather than competing with it. That is a legitimate brief and a considerably better one to state up front than to arrive at after a concept has been designed in the opposite direction.",
          "The other thing worth saying plainly: if you are in a heritage-designated building or a conservation district, tell us. We cannot interpret or grant that permission, and it is far better to establish what is allowed before design work starts than to design something that turns out not to be.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can you print directly onto exposed brick?",
        answer:
          "Yes, and the real question is whether you want the texture to show. An image printed across brick follows the relief and the mortar lines, which can look excellent with bolder compositions but will swallow fine detail and small text. The alternative is filling and levelling for a flat face, which is real work and permanently changes the wall.",
      },
      {
        question: "What is a raking-light photo and why do you keep asking for one?",
        answer:
          "Hold a phone light flat against the wall so it shines along the surface rather than at it, then photograph. Every ripple, patch, hollow and texture change appears immediately. On an old Hamilton wall it tells us more in one image than a dozen straight-on shots, and it is the difference between a useful first answer and a vague one.",
      },
      {
        question: "Our wall changes from brick to plaster halfway along. Is that a problem?",
        answer:
          "It is completely normal in a converted building and it is exactly why we ask for the whole run photographed rather than the best-looking section. The changeover points are where the preparation conversation actually lives, and knowing where they fall lets us give you a straight answer about what the wall needs.",
      },
      {
        question: "The plaster sounds hollow in places. Does that rule it out?",
        answer:
          "No, but it needs making good first, and that is true whatever finish goes on top. Old plaster sometimes parts from the lath behind it. Tap along the wall, note roughly where it sounds hollow, and mention it at enquiry — it is much better as a known item in the plan than as a discovery on site.",
      },
      {
        question: "Our building is heritage-designated. What should we do first?",
        answer:
          "Tell us at the enquiry, and check what the designation actually covers. We cannot interpret or grant that permission. Interior walls are often workable while original features and street-visible elements may not be, so establishing what is permitted before any design work starts saves everyone the effort of designing something that cannot happen.",
      },
      {
        question: "We want a backdrop for changing artwork, not a statement wall. Is that a normal request?",
        answer:
          "It is a good brief and worth stating early. A surface designed to sit behind rotating work is a genuinely different exercise from a feature wall meant to be the focus, and it is far easier to design toward from the start than to walk back a concept that was built to dominate the room.",
      },
    ],
    gallery: [
      image("abstractPaintingMacro", "paint texture at close range, showing how relief reads at scale"),
      image("concreteFeatureWall", "board-formed concrete — a textured substrate with its own character"),
      image("panelledHallwayFramedArt", "a panelled interior in an older building"),
      image("livingRoomBlankWalls", "flat modern walls, shown for contrast with older substrates"),
      image("cgiBlankFeatureWall", "a rendered bare wall, shown as a visualisation rather than a photograph"),
    ],
    ctaHeading: "Send a raking-light photo of the whole run",
    ctaBody:
      "Phone light held flat against the wall, shining along it, photographed in overlapping sections across the full run. Tell us what the wall is made of where you know, say so where you do not, and let us know whether you want the texture to show.",
    related: [
      "/wall-printing/toronto",
      "/wall-printing/oakville",
      "/industries/restaurants-and-cafes",
      "/industries/homes-and-luxury-interiors",
      "/industries/religious-and-cultural-spaces",
      "/tools/wall-readiness",
      "/tools/service-area",
    ],
  },
];
