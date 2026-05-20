import { NextResponse } from "next/server";

const requiredFields = ["name", "phone", "email", "city", "projectType", "budget"];
const maxAttachmentBytes = 15 * 1024 * 1024;

export async function POST(request: Request) {
  const formData = await request.formData();

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

  const subject = `Ink Blend quote request from ${lead.name}`;
  const text = [
    subject,
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
    console.info("Ink Blend quote lead received without RESEND_API_KEY:", {
      ...lead,
      attachments: attachments.map(({ name, size, type }) => ({ name, size, type })),
    });

    return NextResponse.json({
      message: "Quote request received. Ink Blend will follow up soon.",
    });
  }

  const emailAttachments = await Promise.all(
    attachments.map(async ({ file, name }) => ({
      filename: name,
      content: Buffer.from(await file.arrayBuffer()).toString("base64"),
    })),
  );

  const response = await fetch("https://api.resend.com/emails", {
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

  if (!response.ok) {
    return NextResponse.json(
      {
        message:
          "The request was valid, but email delivery failed. Please use WhatsApp or call directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: "Quote request sent. Ink Blend will follow up soon.",
  });
}
