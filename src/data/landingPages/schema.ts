import type { LandingPage } from "./types";

/**
 * JSON-LD for the landing pages.
 *
 * This is emitted from the ROUTE as a <script type="application/ld+json"> in
 * the server-rendered HTML — never written into document.head from a client
 * effect. Client-injected schema is invisible to crawlers that do not execute
 * JavaScript, which is how a site ends up with structured data that only exists
 * in the browser. (Before this change, 17 of the 19 existing pages had none at
 * all.)
 *
 * DELIBERATE OMISSIONS — do not "fix" these by inventing values:
 *
 *  • `telephone` — siteConfig.phone is (647) 555-0148, inside the NANP block
 *    reserved for fictional numbers. Putting a fake number into structured data
 *    feeds it directly to Google's entity systems, which is materially worse
 *    than merely displaying it. Add it here once a real number exists.
 *  • `address` / LocalBusiness — Ink Blend publishes no street address. A
 *    LocalBusiness node without a real PostalAddress is not useful, and
 *    inventing one would be worse. Switch Organization → LocalBusiness and add
 *    the address at the same time as the phone.
 *  • `priceRange` / `offers` — no pricing is published. The quote form's budget
 *    bands are input options, not a price list.
 *  • `aggregateRating` / `review` — the three on-site testimonials are
 *    anonymous archetypes, not attributable reviews.
 */

const SITE_URL = "https://www.inkblend.ca";

function organization() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Ink Blend",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo-web.png`,
    description:
      "Direct-to-wall UV printing and surface graphics for commercial and residential interiors.",
  };
}

export function landingPageJsonLd(record: LandingPage) {
  const url = `${SITE_URL}${record.pathname}`;

  const areaServed =
    record.family === "city"
      ? { "@type": "City", name: record.city, address: { "@type": "PostalAddress", addressRegion: "ON", addressCountry: "CA" } }
      : { "@type": "AdministrativeArea", name: "Ontario, Canada" };

  // Tool pages describe a free browser utility, not a service on offer.
  // WebApplication is the accurate type; calling a calculator a Service would
  // be describing the page as something it is not.
  const primary =
    record.family === "tool"
      ? {
          "@type": "WebApplication",
          "@id": `${url}#app`,
          name: record.title,
          description: record.metaDescription,
          url,
          applicationCategory: "UtilitiesApplication",
          browserRequirements: "Requires JavaScript",
          operatingSystem: "Any",
          publisher: organization(),
          // Free to use. This is the one place a price is permitted, because
          // "zero" is a fact about the tool rather than a claim about the work.
          offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
        }
      : {
          "@type": "Service",
          "@id": `${url}#service`,
          name: record.title,
          description: record.metaDescription,
          serviceType: "Direct-to-wall UV printing",
          provider: organization(),
          areaServed,
          url,
        };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: record.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: record.family === "city" ? "Locations" : record.family === "industry" ? "Sectors" : "Tools",
        item: `${SITE_URL}${
          record.family === "city" ? "/wall-printing" : record.family === "industry" ? "/industries" : "/tools"
        }`,
      },
      { "@type": "ListItem", position: 3, name: record.h1, item: url },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [primary, faqPage, breadcrumb],
  };
}
