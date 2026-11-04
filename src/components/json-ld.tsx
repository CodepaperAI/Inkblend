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
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Ink Blend",
      legalName: "Ink Blend Visual Branding",
      url: SITE_URL,
      logo: `${SITE_URL}/brand/logo-web.png`,
      email: "hello@inkblend.ca",
      areaServed: { "@type": "Country", name: "Canada" },
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
