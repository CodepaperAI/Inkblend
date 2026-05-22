import {
  BadgeCheck,
  Building2,
  Church,
  GalleryHorizontalEnd,
  Hotel,
  House,
  Layers3,
  Palette,
  PanelTop,
  Printer,
  Sparkles,
  Store,
  Utensils,
} from "lucide-react";

export const siteConfig = {
  name: "Ink Blend",
  legalName: "Ink Blend Visual Branding",
  tagline: "Premium UV wall printing and surface branding across Canada.",
  description:
    "Ink Blend transforms walls and surfaces into ultra-detailed branded environments with durable UV printing, custom murals, and large-format surface graphics.",
  email: "hello@inkblend.ca",
  phone: "+1 (647) 555-0148",
  phoneHref: "tel:+16475550148",
  whatsappHref:
    "https://wa.me/16475550148?text=Hi%20Ink%20Blend%2C%20I%20would%20like%20a%20quote%20for%20a%20wall%20printing%20project.",
  address: "Serving Ontario and custom projects across Canada",
  hours: "Mon - Sat, 9:00 AM - 6:00 PM",
  mapHref: "https://maps.google.com/?q=Canada",
  instagramHref: "https://www.instagram.com/",
  tiktokHref: "https://www.tiktok.com/",
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Before & After", href: "/before-after" },
  { label: "Process", href: "/process" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const heroImages = [
  "/media/placeholders/botanical-wall.jpg",
  "/media/placeholders/restaurant-mural.jpg",
  "/media/placeholders/luxury-room.jpg",
];

export const trustStats = [
  { value: "UV", label: "direct-to-surface print technology" },
  { value: "4K", label: "artwork detail and color-led production" },
  { value: "Canada", label: "commercial and residential projects" },
  { value: "Quote", label: "photo and measurement based estimates" },
];

export const audienceSegments = [
  {
    title: "Restaurants & Cafes",
    description:
      "Feature walls, branded dining rooms, menu moments, and social-first interiors.",
    icon: Utensils,
  },
  {
    title: "Retail & Salons",
    description:
      "Boutiques, beauty spaces, barbershops, and retail environments with premium visual identity.",
    icon: Store,
  },
  {
    title: "Offices & Corporate",
    description:
      "Reception statements, culture walls, meeting room graphics, and workplace branding.",
    icon: Building2,
  },
  {
    title: "Homes & Luxury Interiors",
    description:
      "Personalized murals, kids rooms, bedrooms, entertainment spaces, and custom artwork.",
    icon: House,
  },
  {
    title: "Hotels & Condos",
    description:
      "Large-scale decorative walls for developers, property managers, and interior designers.",
    icon: Hotel,
  },
  {
    title: "Religious & Cultural Spaces",
    description:
      "High-resolution spiritual, cultural, and community artwork printed with care.",
    icon: Church,
  },
];

export const services = [
  {
    slug: "uv-wall-printing",
    title: "UV Wall Printing",
    eyebrow: "Direct-to-wall detail",
    short:
      "Advanced UV printing that applies artwork directly onto prepared interior surfaces.",
    description:
      "High-detail wall printing for commercial and residential interiors that need a permanent, vivid alternative to wallpaper or vinyl.",
    image:
      "/media/placeholders/botanical-wall.jpg",
    icon: Printer,
    benefits: [
      "Vibrant color with crisp line detail",
      "Durable finish for high-traffic spaces",
      "Works for custom artwork, logos, graphics, and murals",
      "Designed around your wall size, surface, lighting, and brand tone",
    ],
    process: [
      "Share wall photos and measurements",
      "Approve concept direction and artwork scale",
      "Prepare files and confirm surface readiness",
      "Print on site with a clean reveal",
    ],
    faqs: [
      {
        question: "Is UV wall printing better than wallpaper?",
        answer:
          "It can be a stronger choice for custom visuals because the artwork is printed directly to the wall and avoids seams, peeling edges, and repeated patterns.",
      },
      {
        question: "Can you print on painted walls?",
        answer:
          "Yes, many painted walls can work if the surface is smooth, clean, dry, and properly prepared before production.",
      },
    ],
  },
  {
    slug: "commercial-branding",
    title: "Commercial Branding",
    eyebrow: "Built for businesses",
    short:
      "Restaurant, retail, office, hotel, and event graphics that turn interiors into brand assets.",
    description:
      "Visual branding systems for customer-facing spaces that need to feel memorable, intentional, and photo-worthy.",
    image:
      "/media/placeholders/restaurant-mural.jpg",
    icon: BadgeCheck,
    benefits: [
      "Branded spaces that photograph well",
      "Consistent visuals across walls, counters, signs, and backdrops",
      "Ideal for launches, renovations, and new locations",
      "Designed for business goals, not just decoration",
    ],
    process: [
      "Define customer journey and brand moments",
      "Map walls, zones, and high-impact camera angles",
      "Design concepts for approval",
      "Print, install, and document the result",
    ],
    faqs: [
      {
        question: "Do you work with existing brand guidelines?",
        answer:
          "Yes. Ink Blend can follow your existing logo, colors, typography, and campaign direction, or help create a visual concept from scratch.",
      },
    ],
  },
  {
    slug: "wall-murals",
    title: "Custom Wall Murals",
    eyebrow: "Art-scale impact",
    short:
      "Bespoke mural concepts for homes, restaurants, cultural spaces, lounges, and showrooms.",
    description:
      "Custom murals designed to match the room, audience, story, and mood of the space.",
    image:
      "/media/placeholders/art-wall.jpg",
    icon: Palette,
    benefits: [
      "Made-to-measure artwork",
      "No repeated wallpaper pattern",
      "Great for statement walls and immersive interiors",
      "Concepts can be modern, luxury, cultural, playful, or editorial",
    ],
    process: [
      "Choose style direction and wall location",
      "Create mural concept and preview",
      "Finalize scale, colors, and artwork",
      "Print directly onto the wall or selected surface",
    ],
    faqs: [
      {
        question: "Can you create artwork for us?",
        answer:
          "Yes. The process can include creative direction, concept design, mockups, and print-ready artwork preparation.",
      },
    ],
  },
  {
    slug: "surface-printing",
    title: "Large-Format Surface Printing",
    eyebrow: "Beyond walls",
    short:
      "Large-format graphics for panels, signage surfaces, decorative features, and branded installations.",
    description:
      "Surface printing options for projects that need durable high-resolution graphics across more than a standard wall.",
    image:
      "/media/placeholders/office-branding.jpg",
    icon: Layers3,
    benefits: [
      "Flexible applications for multiple materials",
      "High-resolution brand graphics",
      "Useful for interiors, displays, signs, and events",
      "Premium alternative to temporary-looking graphics",
    ],
    process: [
      "Confirm material and usage",
      "Review print scale and durability requirements",
      "Prepare artwork and production file",
      "Print and finish for the intended surface",
    ],
    faqs: [
      {
        question: "Can you print for events?",
        answer:
          "Yes. Ink Blend can support promotional backdrops, launch graphics, feature walls, and branded photo moments.",
      },
    ],
  },
  {
    slug: "interior-design-graphics",
    title: "Interior Design Graphics",
    eyebrow: "Design-led environments",
    short:
      "Visual systems for interior designers, architects, builders, and property developers.",
    description:
      "Graphics that integrate with finishes, lighting, furniture, and the overall interior story.",
    image:
      "/media/placeholders/interior-preview.jpg",
    icon: GalleryHorizontalEnd,
    benefits: [
      "Supports design presentations and approvals",
      "Works for model homes, condos, offices, and hospitality",
      "Custom visual direction by room and audience",
      "Premium finishing touch for high-value spaces",
    ],
    process: [
      "Review interior concept and finishes",
      "Select visual zones and artwork style",
      "Produce mockups for approval",
      "Coordinate production with site readiness",
    ],
    faqs: [
      {
        question: "Can you work with designers and architects?",
        answer:
          "Yes. Ink Blend can collaborate from concept through production, including mockups and artwork preparation.",
      },
    ],
  },
  {
    slug: "luxury-feature-walls",
    title: "Luxury Feature Walls",
    eyebrow: "Statement surfaces",
    short:
      "High-impact walls for lounges, boutiques, homes, hotel lobbies, reception areas, and studios.",
    description:
      "Premium visual statements that make the main wall of a space feel custom, memorable, and finished.",
    image:
      "/media/placeholders/luxury-feature.jpg",
    icon: Sparkles,
    benefits: [
      "Creates a clear first impression",
      "Ideal for premium customer experiences",
      "Designed to match the surrounding materials",
      "Strong photo and video presence",
    ],
    process: [
      "Identify the hero wall",
      "Design visual concepts around the room",
      "Preview scale and lighting",
      "Print and reveal the final feature",
    ],
    faqs: [
      {
        question: "Can the design feel subtle and luxury, not loud?",
        answer:
          "Yes. Feature walls can be quiet, textured, editorial, bold, or cinematic depending on the room and brand.",
      },
    ],
  },
  {
    slug: "custom-artwork-printing",
    title: "Custom Artwork Printing",
    eyebrow: "Personalized print work",
    short:
      "Artwork, logos, cultural visuals, illustrations, and personal concepts prepared for premium surface printing.",
    description:
      "From brand logos to personalized home art, Ink Blend prepares visuals for high-resolution, large-format production.",
    image:
      "/media/placeholders/custom-artwork.jpg",
    icon: PanelTop,
    benefits: [
      "Turns personal or business ideas into print-ready artwork",
      "Useful for cultural, religious, residential, and branded spaces",
      "Creative direction available",
      "Designed for scale, color, and surface constraints",
    ],
    process: [
      "Share concept, references, logo, or artwork",
      "Refine composition and scale",
      "Prepare high-resolution production files",
      "Print on the selected wall or material",
    ],
    faqs: [
      {
        question: "Can I provide my own art?",
        answer:
          "Yes. Ink Blend can review supplied artwork and guide what is needed for a crisp large-format result.",
      },
    ],
  },
];

export const portfolioProjects = [
  {
    title: "Botanical Cafe Feature Wall",
    category: "Cafes",
    location: "Toronto, ON",
    image:
      "/media/placeholders/botanical-wall.jpg",
    summary: "A warm dining wall concept with layered botanical artwork.",
  },
  {
    title: "Night Lounge Brand Mural",
    category: "Restaurants",
    location: "Mississauga, ON",
    image:
      "/media/placeholders/restaurant-mural.jpg",
    summary: "A dramatic hospitality wall designed for social content.",
  },
  {
    title: "Executive Office Culture Wall",
    category: "Offices",
    location: "Brampton, ON",
    image:
      "/media/placeholders/office-branding.jpg",
    summary: "Reception and meeting-zone graphics for a modern workplace.",
  },
  {
    title: "Luxury Salon Backdrop",
    category: "Retail Stores",
    location: "Vaughan, ON",
    image:
      "/media/placeholders/salon-backdrop.jpg",
    summary: "A polished beauty-space print wall for client photos.",
  },
  {
    title: "Residential Kids Room Mural",
    category: "Residential Projects",
    location: "Oakville, ON",
    image:
      "/media/placeholders/kids-room.jpg",
    summary: "Personalized home mural artwork for a playful bedroom wall.",
  },
  {
    title: "Cultural Artwork Installation",
    category: "Religious Art",
    location: "Hamilton, ON",
    image:
      "/media/placeholders/custom-artwork.jpg",
    summary: "A respectful cultural art concept prepared for large scale.",
  },
  {
    title: "Hotel Corridor Story Wall",
    category: "Luxury Interiors",
    location: "Niagara, ON",
    image:
      "/media/placeholders/luxury-feature.jpg",
    summary: "A high-impact corridor wall with premium hospitality energy.",
  },
  {
    title: "Launch Event Photo Backdrop",
    category: "Event Branding",
    location: "Canada",
    image:
      "/media/placeholders/event-backdrop.jpg",
    summary: "A branded surface concept for campaign photos and guest content.",
  },
];

export const categories = [
  "All",
  "Restaurants",
  "Cafes",
  "Retail Stores",
  "Offices",
  "Religious Art",
  "Residential Projects",
  "Luxury Interiors",
  "Event Branding",
];

export const processSteps = [
  {
    title: "Discover",
    description:
      "We review your space, wall photos, measurements, audience, brand, and the feeling the final wall needs to create.",
  },
  {
    title: "Concept",
    description:
      "Ink Blend develops a visual direction with mockups, scale notes, artwork style, and material considerations.",
  },
  {
    title: "Approve",
    description:
      "You review the quote, artwork, print zones, timeline, and final production details before anything is printed.",
  },
  {
    title: "Print",
    description:
      "The surface is prepared and the final artwork is printed with clean site coordination and a polished reveal.",
  },
];

export const testimonials = [
  {
    name: "Restaurant Owner",
    company: "Hospitality Client",
    quote:
      "The wall became the most photographed part of the room. It changed the way customers remembered the space.",
  },
  {
    name: "Interior Designer",
    company: "Commercial Studio",
    quote:
      "Ink Blend gave the design concept a custom finish without the flat feeling of standard wallpaper.",
  },
  {
    name: "Homeowner",
    company: "Residential Project",
    quote:
      "The mockup helped us feel confident, and the final mural made the room feel completely personal.",
  },
];

export const faqs = [
  {
    question: "What areas do you serve?",
    answer:
      "Ink Blend serves Ontario projects and can quote custom commercial and residential work across Canada depending on scope.",
  },
  {
    question: "What do you need for a quote?",
    answer:
      "Photos of the wall or surface, rough measurements, city, project type, timeline, and any artwork or references you already have.",
  },
  {
    question: "Can Ink Blend design the artwork?",
    answer:
      "Yes. The project can include creative direction, design mockups, artwork preparation, and print production.",
  },
  {
    question: "Is wall printing durable?",
    answer:
      "UV printing is designed for long-lasting visual impact. Exact durability depends on surface prep, traffic, light exposure, and maintenance.",
  },
  {
    question: "Do you print for businesses and homes?",
    answer:
      "Yes. Ink Blend works with restaurants, cafes, retail stores, offices, hotels, condos, religious spaces, designers, agencies, and homeowners.",
  },
];

export const blogPosts = [
  {
    slug: "uv-wall-printing-vs-wallpaper",
    title: "UV Wall Printing vs Wallpaper: Which Looks More Premium?",
    date: "May 17, 2026",
    category: "UV Printing",
    excerpt:
      "A practical guide to choosing direct-to-wall printing when your space needs custom artwork, scale, and long-term visual impact.",
  },
  {
    slug: "restaurant-wall-branding-ideas",
    title: "Restaurant Wall Branding Ideas That Customers Actually Photograph",
    date: "May 17, 2026",
    category: "Hospitality",
    excerpt:
      "How feature walls, dining murals, and branded backdrops can turn a restaurant interior into a marketing asset.",
  },
  {
    slug: "what-to-send-for-a-wall-printing-quote",
    title: "What to Send for a Fast Wall Printing Quote",
    date: "May 17, 2026",
    category: "Planning",
    excerpt:
      "Photos, measurements, budget range, surface details, and inspiration references make quote requests faster and more accurate.",
  },
];

export const citiesServed = [
  "Toronto",
  "Mississauga",
  "Brampton",
  "Vaughan",
  "Markham",
  "Oakville",
  "Hamilton",
  "Kitchener",
  "Waterloo",
  "Ottawa",
  "Calgary",
  "Vancouver",
  "Montreal",
];

export type Service = (typeof services)[number];
export type PortfolioProject = (typeof portfolioProjects)[number];
