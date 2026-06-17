import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { blogPosts } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <article>
        <section className="page-hero">
          <div className="absolute inset-0">
            <Image
              src="/media/placeholders/custom-artwork.jpg"
              alt={post.title}
              fill
              sizes="100vw"
              className="object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink-black/18 via-ink-black/42 to-ink-black/70" />
          </div>
          <div className="page-shell relative">
            <Reveal>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink-paper/66 hover:text-ink-paper"
              >
                <ArrowLeft size={16} />
                Back to Blog
              </Link>
              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.28em] text-ink-red">
                {post.category} / {post.date}
              </p>
              <h1 className="mt-5 max-w-5xl font-display text-5xl leading-[0.92] text-balance text-ink-paper sm:text-7xl">
                {post.title}
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-ink-paper/68">
                {post.excerpt}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section-pad">
          <div className="page-shell max-w-3xl">
            <Reveal className="prose-content">
              <p>
                Premium wall printing starts with context. The size of the wall,
                lighting, surface texture, viewing distance, brand style, and
                customer journey all shape what the final artwork should become.
              </p>
              <p>
                For commercial spaces, the most effective print concepts do
                more than decorate. They support the business identity, create a
                memorable backdrop, and give customers a reason to photograph
                the environment.
              </p>
              <p>
                For residential spaces, the strongest projects feel personal.
                A good mural or feature wall should match the room, the owner,
                the scale of the furniture, and the mood the space needs.
              </p>
              <h2>What to prepare before requesting a quote</h2>
              <p>
                Send clear wall photos, rough width and height, the city, the
                surface type, a desired timeline, and a few references for the
                visual direction. That information helps Ink Blend respond with
                a better first recommendation.
              </p>
              <h2>Why mockups matter</h2>
              <p>
                Mockups reduce guesswork. They help show scale, contrast,
                artwork placement, and how a wall will feel before the final
                print is produced.
              </p>
            </Reveal>
          </div>
        </section>
      </article>

      <CtaBand />
    </>
  );
}
