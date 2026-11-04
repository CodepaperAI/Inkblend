import type { Metadata } from "next";

import { LandingHub } from "@/components/landing/landing-hub";
import { industries } from "@/data/landingPages";

export const metadata: Metadata = {
  title: "Wall Printing for Restaurants, Retail, Offices & Homes",
  description:
    "UV wall printing and murals tailored to restaurants, retail, offices, hotels, homes and cultural spaces. Find your sector and request a quote.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesHub() {
  return (
    <LandingHub
      eyebrow="Sectors"
      h1="Wall printing and murals for every kind of space"
      answer="Ink Blend designs and prints feature walls, murals and branded graphics for restaurants and cafés, retail and salons, offices, hotels and condos, homes, and religious or cultural spaces. Each sector page explains what suits that space."
      records={industries}
      labelFor={(record) => (record.family === "industry" ? record.industry : record.h1)}
    />
  );
}
