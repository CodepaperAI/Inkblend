const SITE_URL = "https://www.inkblend.ca";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // "<" is escaped so content can never close the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      // Service-area business: no storefront address is published, so none is
      // invented. Add `address`, `geo` and `sameAs` once real values exist.
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": `${SITE_URL}/#organization`,
      name: "Ink Blend",
      legalName: "Ink Blend Visual Branding",
      url: SITE_URL,
      logo: `${SITE_URL}/brand/logo-web.png`,
      image: `${SITE_URL}/brand/logo-web.png`,
      description:
        "Direct-to-wall UV printing, custom murals and large-format surface graphics for commercial and residential interiors across Ontario and Canada.",
      telephone: "+1-647-915-8722",
      email: "hello@inkblend.ca",
      knowsAbout: ["UV wall printing", "Custom wall murals", "Commercial wall branding", "Large-format surface printing"],
      areaServed: [
        ...["Brampton", "Mississauga", "Toronto", "Vaughan", "Oakville", "Hamilton", "Markham", "Kitchener", "Waterloo", "Ottawa"].map((name) => ({
          "@type": "City",
          name,
        })),
        { "@type": "Country", name: "Canada" },
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: "+1-647-915-8722",
        email: "hello@inkblend.ca",
        areaServed: "CA",
        availableLanguage: ["English"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Ink Blend",
      inLanguage: "en-CA",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function serviceJsonLd(service: { slug: string; title: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: `${SITE_URL}/services/${service.slug}`,
    areaServed: { "@type": "Country", name: "Canada" },
    provider: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
