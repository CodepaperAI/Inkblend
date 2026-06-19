import type { Metadata } from "next";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { formatPublishDate, listRenderableBlogs } from "@/lib/uplift";

export const revalidate = 300;

const FALLBACK_IMAGES = [
  "/media/placeholders/custom-artwork.jpg",
  "/media/placeholders/art-wall.jpg",
  "/media/placeholders/luxury-feature.jpg",
  "/media/placeholders/restaurant-mural.jpg",
  "/media/placeholders/office-branding.jpg",
  "/media/placeholders/botanical-wall.jpg",
];

function fallbackImage(index: number): string {
  return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
}

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Ink Blend articles about UV wall printing, custom murals, restaurant branding, feature walls, and quote planning.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Ink Blend Blog",
    description:
      "UV wall printing insights, mural planning guides, and interior branding ideas — updated regularly.",
    type: "website",
    url: "/blog",
  },
};

export default async function BlogPage() {
  const posts = await listRenderableBlogs();

  return (
    <>
      <section className="page-hero">
        <div className="absolute inset-0">
          <Image
            src="/media/placeholders/custom-artwork.jpg"
            alt="Artwork and print design"
            fill
            sizes="100vw"
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-black/18 via-ink-black/42 to-ink-black/70" />
        </div>
        <div className="page-shell relative">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-red">
              Journal
            </p>
            <h1 className="mt-5 max-w-5xl font-display text-5xl leading-[0.92] text-balance text-ink-paper sm:text-7xl">
              Fresh thinking on walls, surfaces, and print craft.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-ink-paper/68">
              New articles published daily. UV wall printing insights, mural
              planning guides, and interior branding ideas from the Ink Blend
              studio.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="page-shell">
          {posts.length === 0 ? (
            <Reveal>
              <div className="rounded-[1.5rem] border border-ink-paper/10 bg-ink-paper/[0.04] p-12 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-red">
                  Coming soon
                </p>
                <h2 className="mt-4 font-display text-3xl text-ink-paper sm:text-4xl">
                  First articles publishing this week.
                </h2>
                <p className="mt-4 text-base leading-7 text-ink-paper/64">
                  In the meantime, browse the portfolio or request a quote to
                  start your wall print project.
                </p>
                <Link
                  href="/get-quote"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink-red px-6 py-3 text-sm font-semibold text-ink-paper transition hover:-translate-y-0.5"
                >
                  Get a quote
                  <ArrowRight size={16} />
                </Link>
              </div>
            </Reveal>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => {
                const cover = post.featuredImage?.trim() || fallbackImage(index);
                const formattedDate = formatPublishDate(post);
                const readingTime =
                  typeof post.customFields?.readingTime === "string"
                    ? post.customFields.readingTime
                    : null;
                const category = post.categories?.[0];

                return (
                  <Reveal key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-ink-paper/10 bg-ink-paper/[0.04] transition hover:-translate-y-1 hover:border-ink-gold/40"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-ink-black/40">
                        <Image
                          src={cover}
                          alt={post.title}
                          fill
                          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
                          className="object-cover transition duration-700 group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink-black/65 via-ink-black/10 to-transparent" />
                        {category ? (
                          <span className="absolute left-5 top-5 inline-flex items-center rounded-full bg-ink-paper/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-ink-black">
                            {category}
                          </span>
                        ) : null}
                      </div>
                      <div className="flex flex-1 flex-col p-7">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-paper/70">
                          {formattedDate ? (
                            <span className="inline-flex items-center gap-2">
                              <Calendar size={14} className="text-ink-red" />
                              <time dateTime={post.publishDate}>{formattedDate}</time>
                            </span>
                          ) : null}
                          {readingTime ? (
                            <span className="inline-flex items-center gap-2">
                              <Clock size={14} className="text-ink-red" />
                              {readingTime}
                            </span>
                          ) : null}
                        </div>
                        <h2 className="mt-5 font-display text-[1.75rem] leading-[1.05] text-ink-paper">
                          {post.title}
                        </h2>
                        <p className="mt-4 text-sm leading-7 text-ink-paper/64">
                          {post.excerpt}
                        </p>
                        <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-ink-paper">
                          Read article
                          <ArrowRight
                            size={16}
                            className="transition group-hover:translate-x-1"
                          />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
