import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";

import { SiteShell } from "@/components/site-shell";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  // MUST be the www host. inkblend.ca 308-redirects to www.inkblend.ca, so
  // canonicalising to the apex points every page at a redirect — the single
  // most common way a site quietly undermines its own indexing.
  metadataBase: new URL("https://www.inkblend.ca"),
  title: {
    default: "Ink Blend | Premium UV Wall Printing Across Canada",
    template: "%s | Ink Blend",
  },
  description: siteConfig.description,
  keywords: [
    "UV wall printing Canada",
    "custom wall murals",
    "commercial wall branding",
    "large format surface printing",
    "restaurant wall mural",
    "office feature wall",
  ],
  openGraph: {
    title: "Ink Blend | Transform Any Surface Into Art",
    description: siteConfig.description,
    url: "https://www.inkblend.ca",
    siteName: "Ink Blend",
    images: [
      {
        url: "/brand/logo-web.png",
        width: 1280,
        height: 1024,
        alt: "Ink Blend logo",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${instrumentSerif.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full">
        <SiteShell>{children}</SiteShell>
        {/*
          The site previously had no analytics of any kind — no GA4, no gtag, no
          dataLayer — so no page could be shown to have produced anything.
          Speed Insights matters here specifically because media is served
          unoptimised (next.config.ts sets images.unoptimized), which is a real
          Core Web Vitals exposure worth measuring rather than assuming.
        */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
