"use client";

import {
  ArrowRight,
  Camera,
  Menu,
  MessageCircle,
  Phone,
  Search,
  Send,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

import { navItems, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-hidden bg-ink-black text-ink-paper">
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingContact />
    </div>
  );
}

function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-white/10 bg-black/78 shadow-2xl shadow-black/30 backdrop-blur-2xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] shadow-[0_0_45px_rgba(249,39,39,0.2)]">
            <Image
              src="/brand/icon-web.png"
              alt="Ink Blend icon"
              width={42}
              height={42}
              className="h-9 w-9 object-contain transition duration-500 group-hover:scale-110"
              priority
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-2xl tracking-wide text-white">
              Ink Blend
            </span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.32em] text-white/46">
              UV Print Studio
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 text-sm text-white/70 backdrop-blur-xl lg:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 transition duration-300 hover:bg-white/10 hover:text-white",
                  active && "bg-white text-black shadow-lg shadow-white/10",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            aria-label="Search"
            className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition hover:border-white/25 hover:text-white"
          >
            <Search size={18} />
          </button>
          <Link href="/get-quote" className="btn-primary group">
            Get Quote
            <ArrowRight size={17} className="transition group-hover:translate-x-1" />
          </Link>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="grid size-12 place-items-center rounded-full border border-white/12 bg-white/[0.06] text-white lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={cn(
          "grid overflow-hidden border-t border-white/10 bg-black/94 px-4 backdrop-blur-2xl transition-all duration-500 lg:hidden",
          open ? "max-h-[560px] py-4" : "max-h-0 py-0",
        )}
      >
        <div className="grid gap-2">
          {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3 text-white/78"
              >
              {item.label}
            </Link>
          ))}
            <Link
              href="/get-quote"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 justify-center"
            >
            Get Quote
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </header>
  );
}

function FloatingContact() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href={siteConfig.whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="group grid size-14 place-items-center rounded-full bg-[#25d366] text-black shadow-[0_0_45px_rgba(37,211,102,0.45)] transition hover:-translate-y-1"
      >
        <MessageCircle size={23} />
      </a>
      <a
        href={siteConfig.phoneHref}
        aria-label="Call Ink Blend"
        className="group grid size-14 place-items-center rounded-full border border-white/12 bg-white/[0.08] text-white shadow-[0_0_45px_rgba(255,255,255,0.12)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white hover:text-black"
      >
        <Phone size={21} />
      </a>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#050505]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink-red to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="grid size-12 place-items-center overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04]">
              <Image
                src="/brand/icon-web.png"
                alt="Ink Blend icon"
                width={42}
                height={42}
                className="h-9 w-9 object-contain"
              />
            </span>
            <span className="font-display text-3xl text-white">Ink Blend</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/58">
            Premium UV wall printing, custom murals, and surface graphics for
            businesses, designers, and homeowners across Canada.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={siteConfig.instagramHref}
              aria-label="Instagram"
              className="grid size-11 place-items-center rounded-full border border-white/12 text-white/72 transition hover:bg-white hover:text-black"
            >
              <Camera size={18} />
            </a>
            <a
              href={siteConfig.tiktokHref}
              aria-label="TikTok"
              className="grid size-11 place-items-center rounded-full border border-white/12 text-white/72 transition hover:bg-white hover:text-black"
            >
              <Send size={17} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="footer-title">Pages</h3>
          <div className="mt-5 grid gap-3 text-sm text-white/58">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
            <Link href="/blog" className="hover:text-white">
              Blog
            </Link>
          </div>
        </div>

        <div>
          <h3 className="footer-title">Lead Actions</h3>
          <div className="mt-5 grid gap-3 text-sm text-white/58">
            <Link href="/get-quote" className="hover:text-white">
              Request a Quote
            </Link>
            <a href={siteConfig.whatsappHref} className="hover:text-white">
              WhatsApp Chat
            </a>
            <a href={siteConfig.phoneHref} className="hover:text-white">
              Call Now
            </a>
            <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
              Email Inquiry
            </a>
          </div>
        </div>

        <div>
          <h3 className="footer-title">Contact</h3>
          <div className="mt-5 grid gap-3 text-sm leading-7 text-white/58">
            <span>{siteConfig.address}</span>
            <a href={siteConfig.phoneHref} className="hover:text-white">
              {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
              {siteConfig.email}
            </a>
            <span>{siteConfig.hours}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-6 text-center text-xs uppercase tracking-[0.28em] text-white/38">
        Designed for premium visual environments.
      </div>
    </footer>
  );
}
