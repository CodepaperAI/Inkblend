import type { Metadata } from "next";

import { LandingHub } from "@/components/landing/landing-hub";
import { cities } from "@/data/landingPages";

export const metadata: Metadata = {
  title: "UV Wall Printing Service Areas in Ontario",
  description:
    "Ink Blend prints directly onto walls in Brampton, Mississauga, Toronto, Vaughan, Oakville and Hamilton. Pick your city for local details and a quote.",
  alternates: { canonical: "/wall-printing" },
};

export default function WallPrintingHub() {
  return (
    <LandingHub
      eyebrow="Service areas"
      h1="UV wall printing across the Greater Toronto and Hamilton area"
      answer="Ink Blend prints directly onto interior walls and surfaces in Brampton, Mississauga, Toronto, Vaughan, Oakville and Hamilton, and quotes custom projects elsewhere in Ontario and Canada. Choose your city for local details, or send wall photos for a quote."
      records={cities}
      labelFor={(record) => (record.family === "city" ? `${record.city}, ${record.province}` : record.h1)}
    />
  );
}
