import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { blogPosts } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Ink Blend articles about UV wall printing, custom murals, restaurant branding, feature walls, and quote planning.",
};

export default function BlogPage() {
  return (
    <>
      <section className="page-hero">
        <div className="absolute inset-0">
          <Image
            src="/media/placeholders/custom-artwork.jpg"
            alt="Artwork and print design"
            fill
            sizes="100vw"
            className="object-cover opacity-36"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/58 via-ink-black/80 to-ink-black" />
        </div>
        <div className="page-shell relative">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-red">
              Blog
            </p>
            <h1 className="mt-5 max-w-5xl font-display text-6xl leading-[0.9] text-white sm:text-7xl">
              Search-friendly content for visual branding clients.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/68">
              Educational articles that help potential clients understand UV
              wall printing, mural planning, and quote preparation.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="page-shell grid gap-5 md:grid-cols-3">
          {blogPosts.map((post) => (
            <Reveal key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block min-h-[320px] rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-7 transition hover:-translate-y-1 hover:border-ink-gold/40"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-ink-red">
                  {post.category}
                </p>
                <h2 className="mt-5 font-display text-4xl leading-none text-white">
                  {post.title}
                </h2>
                <p className="mt-5 text-sm leading-7 text-white/58">
                  {post.excerpt}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  Read article
                  <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
