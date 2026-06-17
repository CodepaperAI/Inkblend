import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Tag, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/lib/site";
import {
  formatPublishDate,
  getBlog,
  listBlogs,
  sanitizeBlogHtml,
} from "@/lib/uplift";

export const revalidate = 300;

type Props = {
  params: Promise<{ slug: string }>;
};

const FALLBACK_HERO = "/media/placeholders/custom-artwork.jpg";

export async function generateStaticParams() {
  const posts = await listBlogs();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlog(slug);

  if (!post) {
    return { title: "Blog post not found" };
  }

  const title = post.meta?.seoTitle || post.title;
  const description = post.meta?.seoDescription || post.excerpt;
  const ogImage = post.featuredImage?.trim() || FALLBACK_HERO;
  const ogUrl = post.meta?.ogUrl || `/blog/${post.slug}`;

  return {
    title,
    description,
    keywords: post.meta?.keywords || post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.meta?.ogTitle || title,
      description: post.meta?.ogDescription || description,
      type: "article",
      url: ogUrl,
      siteName: post.meta?.ogSiteName || siteConfig.name,
      locale: post.meta?.ogLocale || "en_CA",
      publishedTime: post.publishDate,
      modifiedTime: post.updatedAt,
      authors: post.authorName ? [post.authorName] : undefined,
      tags: post.meta?.articleTags || post.tags,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta?.ogTitle || title,
      description: post.meta?.ogDescription || description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlog(slug);

  if (!post) {
    notFound();
  }

  const heroImage = post.featuredImage?.trim() || FALLBACK_HERO;
  const formattedDate = formatPublishDate(post);
  const readingTime =
    typeof post.customFields?.readingTime === "string"
      ? post.customFields.readingTime
      : null;
  const category = post.categories?.[0];
  const safeContent = sanitizeBlogHtml(post.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: heroImage.startsWith("http") ? heroImage : `https://www.inkblend.ca${heroImage}`,
    datePublished: post.publishDate,
    dateModified: post.updatedAt,
    author: post.authorName
      ? {
          "@type": "Person",
          name: post.authorName,
          url: post.authorUrl || undefined,
        }
      : {
          "@type": "Organization",
          name: siteConfig.name,
        },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: "https://www.inkblend.ca/favicon.ico",
      },
    },
    articleSection: post.meta?.articleSection || category,
    keywords: (post.meta?.keywords || post.tags || []).join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.meta?.ogUrl || `https://www.inkblend.ca/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <section className="page-hero">
          <div className="absolute inset-0">
            <Image
              src={heroImage}
              alt={post.title}
              fill
              sizes="100vw"
              className="object-cover opacity-70"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink-black/22 via-ink-black/50 to-ink-black/82" />
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

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-bold uppercase tracking-[0.24em] text-ink-paper/80">
                {category ? (
                  <span className="rounded-full bg-ink-red px-3 py-1 text-ink-paper">
                    {category}
                  </span>
                ) : null}
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
                {post.authorName ? (
                  <span className="inline-flex items-center gap-2">
                    <User size={14} className="text-ink-red" />
                    {post.authorUrl ? (
                      <a
                        href={post.authorUrl}
                        className="hover:text-ink-paper"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {post.authorName}
                      </a>
                    ) : (
                      post.authorName
                    )}
                  </span>
                ) : null}
              </div>

              <h1 className="mt-6 max-w-5xl font-display text-5xl leading-[0.95] text-balance text-ink-paper sm:text-7xl">
                {post.title}
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-ink-paper/72">
                {post.excerpt}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section-pad">
          <div className="page-shell grid gap-12 lg:grid-cols-[1fr_18rem] lg:items-start">
            <Reveal className="prose-content">
              <div dangerouslySetInnerHTML={{ __html: safeContent }} />
            </Reveal>

            <aside className="space-y-8 lg:sticky lg:top-28">
              {post.tags && post.tags.length > 0 ? (
                <Reveal>
                  <div className="rounded-[1.25rem] border border-ink-paper/10 bg-ink-paper/[0.04] p-6">
                    <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-ink-red">
                      <Tag size={14} />
                      Tags
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-ink-paper/15 bg-ink-paper/[0.04] px-3 py-1 text-xs font-medium text-ink-paper/75"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ) : null}

              <Reveal>
                <div className="rounded-[1.25rem] border border-ink-red/40 bg-ink-red/10 p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-ink-red">
                    Ready to print?
                  </p>
                  <h3 className="mt-3 font-display text-2xl leading-tight text-ink-paper">
                    Get a quote for your wall in 24 hours.
                  </h3>
                  <Link
                    href="/get-quote"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink-red px-5 py-3 text-sm font-semibold text-ink-paper transition hover:-translate-y-0.5"
                  >
                    Start a quote
                  </Link>
                </div>
              </Reveal>
            </aside>
          </div>
        </section>
      </article>

      <CtaBand />
    </>
  );
}
