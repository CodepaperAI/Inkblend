"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { JsonLd, breadcrumbJsonLd } from "@/components/json-ld";
import { cityNav, industryNav, toolNav } from "@/data/landingPages/nav";
import { services } from "@/lib/site";

const sectionLabels: Record<string, string> = {
  services: "Services",
  portfolio: "Portfolio",
  reviews: "Reviews",
  process: "Process",
  faq: "FAQ",
  blog: "Blog",
  contact: "Contact",
  about: "About",
  "get-quote": "Get a Quote",
  tools: "Free Tools",
  "wall-printing": "Service Areas",
  industries: "Sectors",
};

// Landing pages already emit a fuller BreadcrumbList from their own schema.
const schemaOwnedSections = new Set(["wall-printing", "industries", "tools"]);

function leafLabel(section: string, slug: string, path: string) {
  const nav = [...cityNav, ...industryNav, ...toolNav].find((entry) => entry.href === path);
  if (nav) return nav.label;
  if (section === "services") return services.find((s) => s.slug === slug)?.title;
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  const [section, slug] = segments;
  const crumbs = [{ name: "Home", path: "/" }];
  crumbs.push({ name: sectionLabels[section] ?? leafLabel(section, section, `/${section}`) ?? section, path: `/${section}` });
  if (slug) {
    crumbs.push({ name: leafLabel(section, slug, pathname) ?? slug, path: pathname });
  }

  const emitSchema = !(slug && schemaOwnedSections.has(section));

  return (
    <nav
      aria-label="Breadcrumb"
      className="absolute inset-x-0 top-24 z-10 mx-auto w-[min(100%-2rem,80rem)]"
    >
      {emitSchema && <JsonLd data={breadcrumbJsonLd(crumbs)} />}
      <ol className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-ink-paper/72">
        {crumbs.map((crumb, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="max-w-[16rem] truncate text-ink-paper">
                  {crumb.name}
                </span>
              ) : (
                <Link href={crumb.path} className="hover:text-ink-red hover:underline">
                  {crumb.name}
                </Link>
              )}
              {!last && <ChevronRight size={12} aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
