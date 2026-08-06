import { NextResponse } from "next/server";

import { formGuardConfig } from "@/lib/form-guard.config";
import { runGuards, verificationFailedMessage } from "@/lib/form-guard/guard";
import { hasAcceptableOrigin } from "@/lib/form-guard/origin";

const requiredFields = ["name", "phone", "email", "city", "projectType", "budget"];
const maxAttachmentBytes = 15 * 1024 * 1024;
/**
 * Total bytes was the only cap, so a request could carry thousands of tiny
 * files and still pass. Each one is base64-encoded into the outbound email.
 */
const maxAttachmentCount = 10;
/** Mirrors the `accept` list on the file input in quote-form.tsx. */
const allowedAttachmentTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/pdf",
]);

/** The success body, and the one a silent drop has to be indistinguishable from. */
const SUCCESS_MESSAGE = "Quote request sent. Ink Blend will follow up soon.";

/**
 * No CORS headers are emitted, so browsers reject cross-origin calls outright.
 * The form is same-origin and needs no preflight; anything that does is not us.
 */
export async function OPTIONS() {
  return new NextResponse(null, { status: 405, headers: { Allow: "POST" } });
}

export async function POST(request: Request) {
  // Origin is checked BEFORE the body is read. It is the only guard that needs
  // headers alone, and request.formData() buffers the entire upload — up to
  // 15 MB — so running it first would make an attacker's wrong Origin cost us
  // the full transfer before we could reject it.
  if (!hasAcceptableOrigin(request.headers, formGuardConfig)) {
    console.warn("[form-guard] blocked layer=origin");
    return NextResponse.json(
      { message: verificationFailedMessage(formGuardConfig) },
      { status: 403 },
    );
  }

  // request.formData() throws when the body is not form-encoded, and that threw
  // uncaught: any junk POST — a bot probing with JSON, say — returned a 500
  // framework error page rather than a controlled response.
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ message: "Could not read the submitted form." }, { status: 400 });
  }

  // honeypot -> timing -> Turnstile. FormData values arrive as strings; the
  // envelope reader coerces elapsedMs rather than failing the parse.
  const verdict = await runGuards({
    headers: request.headers,
    fields: formData,
    config: formGuardConfig,
  });

  if (verdict.outcome === "reject") {
    return NextResponse.json({ message: verdict.message }, { status: verdict.status });
  }

  // Honeypot or impossible submit speed: mirror the real success response and
  // send nothing, so a spammer learns nothing about which filter caught them.
  if (verdict.outcome === "silent-drop") {
    return NextResponse.json({ message: SUCCESS_MESSAGE });
  }

  const missing = requiredFields.filter((field) => !String(formData.get(field) || "").trim());

  if (missing.length > 0) {
    return NextResponse.json(
      { message: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 },
    );
  }

  const lead = Object.fromEntries(
    [
      "name",
      "phone",
      "email",
      "city",
      "projectType",
      "budget",
      "width",
      "height",
      "timeline",
      "surface",
      "notes",
      // Which page produced this lead. An open array rather than a closed enum,
      // so a new landing page can never be silently rejected — but the field
      // still has to be listed here or the value is dropped on the floor.
      "sourcePage",
    ].map((field) => [field, String(formData.get(field) || "").trim()]),
  );

  const attachments = formData
    .getAll("attachments")
    .filter((item): item is File => item instanceof File && item.size > 0)
    .map((file) => ({
      file,
      name: file.name,
      size: file.size,
      type: file.type || "unknown",
    }));

  const totalAttachmentBytes = attachments.reduce((sum, file) => sum + file.size, 0);

  if (totalAttachmentBytes > maxAttachmentBytes) {
    return NextResponse.json(
      { message: "Uploads are too large. Please keep files under 15 MB total." },
      { status: 413 },
    );
  }

  if (attachments.length > maxAttachmentCount) {
    return NextResponse.json(
      { message: `Please attach no more than ${maxAttachmentCount} files.` },
      { status: 413 },
    );
  }

  // The form's `accept` list is a hint the browser enforces and a scripted
  // client ignores, so the same restriction has to hold here. Without it any
  // file type at all was base64-encoded straight into the outbound email.
  const rejected = attachments.filter((file) => !allowedAttachmentTypes.has(file.type));

  if (rejected.length > 0) {
    return NextResponse.json(
      { message: "Attachments must be JPG, PNG, WEBP, HEIC, or PDF." },
      { status: 415 },
    );
  }

  const subject = `Ink Blend quote request from ${lead.name}`;
  const text = [
    subject,
    "",
    // First line of the email, deliberately. This is the number that tells you
    // which pages are actually earning their keep.
    `Source page: ${lead.sourcePage || "not recorded"}`,
    "",
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    `City: ${lead.city}`,
    `Project type: ${lead.projectType}`,
    `Budget: ${lead.budget}`,
    `Wall width: ${lead.width || "Not provided"}`,
    `Wall height: ${lead.height || "Not provided"}`,
    `Timeline: ${lead.timeline || "Not provided"}`,
    `Surface: ${lead.surface || "Not provided"}`,
    "",
    "Notes:",
    lead.notes || "Not provided",
    "",
    `Attachments: ${
      attachments.length
        ? JSON.stringify(
            attachments.map(({ name, size, type }) => ({ name, size, type })),
            null,
            2,
          )
        : "None"
    }`,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL || "hello@inkblend.ca";
  const from = process.env.QUOTE_FROM_EMAIL || "Ink Blend <onboarding@resend.dev>";

  if (!apiKey) {
    // Do NOT log the lead body. It contains a name, phone number and email
    // address, and this previously wrote all of it to the server console.
    // Log only what is needed to diagnose the misconfiguration.
    console.error(
      `Quote submission could not be delivered: RESEND_API_KEY is not set. ` +
        `Source page: ${lead.sourcePage || "not recorded"}, ` +
        `${attachments.length} attachment(s).`,
    );

    // Previously this returned a success message, so the visitor was told their
    // request had been received while it was silently discarded. Tell the truth
    // and give them a route that works.
    return NextResponse.json(
      {
        message:
          "We could not deliver your request just now. Please email hello@inkblend.ca or use WhatsApp and we will pick it up.",
      },
      { status: 503 },
    );
  }

  const emailAttachments = await Promise.all(
    attachments.map(async ({ file, name }) => ({
      filename: name,
      content: Buffer.from(await file.arrayBuffer()).toString("base64"),
    })),
  );

  let response: Response;

  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        text,
        reply_to: lead.email,
        attachments: emailAttachments.length ? emailAttachments : undefined,
      }),
    });
  } catch (error) {
    console.error("Resend delivery failed:", error);
    return NextResponse.json(
      {
        message:
          "The request was valid, but email delivery failed. Please use WhatsApp or call directly.",
      },
      { status: 502 },
    );
  }

  if (!response.ok) {
    return NextResponse.json(
      {
        message:
          "The request was valid, but email delivery failed. Please use WhatsApp or call directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: SUCCESS_MESSAGE });
}
