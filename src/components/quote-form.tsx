"use client";

import { CheckCircle2, Loader2, Upload } from "lucide-react";
import { useState } from "react";

import { siteConfig } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

export function QuoteForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || "Quote request failed.");
      }

      setStatus("success");
      setMessage(payload.message || "Request received. Ink Blend will follow up soon.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try WhatsApp or call directly.",
      );
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[1.5rem] border border-ink-paper/10 bg-ink-paper/[0.045] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.28)] sm:p-7"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Full name" name="name" required />
        <Field label="Phone" name="phone" type="tel" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="City / Province" name="city" required />

        <label className="field">
          <span>Project type</span>
          <select name="projectType" required>
            <option value="">Choose a service</option>
            <option>UV Wall Printing</option>
            <option>Custom Wall Mural</option>
            <option>Restaurant or Cafe Branding</option>
            <option>Retail or Salon Interior</option>
            <option>Office Feature Wall</option>
            <option>Residential Wall Art</option>
            <option>Event Backdrop</option>
          </select>
        </label>

        <label className="field">
          <span>Budget range</span>
          <select name="budget" required>
            <option value="">Select budget</option>
            <option>$1,000 - $2,500</option>
            <option>$2,500 - $5,000</option>
            <option>$5,000 - $10,000</option>
            <option>$10,000+</option>
            <option>Need guidance</option>
          </select>
        </label>

        {!compact ? (
          <>
            <Field label="Approx wall width" name="width" placeholder="Example: 12 ft" />
            <Field label="Approx wall height" name="height" placeholder="Example: 8 ft" />
            <Field label="Timeline" name="timeline" placeholder="Example: 3-4 weeks" />
            <Field label="Surface type" name="surface" placeholder="Painted drywall, panel, glass..." />
          </>
        ) : null}
      </div>

      <label className="field mt-4">
        <span>Project notes</span>
        <textarea
          name="notes"
          rows={compact ? 4 : 5}
          placeholder="Tell us about the wall, business type, design idea, and any artwork you already have."
        />
      </label>

      <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-ink-paper/18 bg-ink-black/20 px-5 py-8 text-center transition hover:border-ink-red/60 hover:bg-ink-red/5">
        <Upload className="text-ink-gold" size={28} />
        <span className="mt-3 text-sm font-semibold text-ink-paper">
          Upload wall photos or measurements
        </span>
        <span className="mt-1 text-xs text-ink-paper/46">
          JPG, PNG, PDF, or HEIC. Add photos, drawings, or measurement notes.
        </span>
        <input
          className="sr-only"
          name="attachments"
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.pdf,.heic,.webp"
        />
      </label>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary justify-center disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <CheckCircle2 size={18} />
          )}
          Send Quote Request
        </button>
        <a
          href={siteConfig.whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="btn-secondary justify-center"
        >
          WhatsApp Instead
        </a>
      </div>

      {message ? (
        <p
          className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${
            status === "success"
              ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"
              : "border-ink-red/30 bg-ink-red/10 text-red-100"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input name={name} type={type} required={required} placeholder={placeholder} />
    </label>
  );
}
