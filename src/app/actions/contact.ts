"use server";

import { site } from "@/config/site";
import {
  contactSchema,
  type ContactField,
  type ContactState,
  type ContactValues,
} from "@/lib/contact";

const text = (data: FormData, key: string) =>
  String(data.get(key) ?? "").trim();

/**
 * Receives the contact form. Validates on the server, then sends the
 * message by email through Resend (https://resend.com).
 *
 * Environment variables:
 *   RESEND_API_KEY      required to send
 *   CONTACT_TO_EMAIL    where messages arrive (defaults to the site email)
 *   CONTACT_FROM_EMAIL  verified sender, e.g. "Stars Media <site@yourdomain>"
 */
export async function sendContact(
  _previous: ContactState,
  data: FormData,
): Promise<ContactState> {
  const values: ContactValues = {
    name: text(data, "name"),
    email: text(data, "email"),
    role: text(data, "role"),
    interest: text(data, "interest"),
    message: text(data, "message"),
  };

  // Hidden field that people never see; bots fill it in.
  if (text(data, "company")) return { status: "sent", email: values.email };

  const parsed = contactSchema.safeParse({
    ...values,
    consent: data.get("consent"),
  });

  if (!parsed.success) {
    const known: ContactField[] = ["name", "email", "message", "consent"];
    const fields = [
      ...new Set(parsed.error.issues.map((issue) => String(issue.path[0]))),
    ].filter((field): field is ContactField =>
      known.includes(field as ContactField),
    );
    // role/interest come from fixed lists; a bad value means a tampered form
    if (fields.length === 0) return { status: "unavailable", values };
    return { status: "invalid", fields, values };
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] RESEND_API_KEY not set — message not sent:", values);
      return { status: "sent", email: values.email };
    }
    return { status: "unavailable", values };
  }

  const locale = text(data, "locale") || "en";
  const body = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Who: ${values.role}`,
    `Looking for: ${values.interest}`,
    `Site language: ${locale}`,
    "",
    values.message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.CONTACT_FROM_EMAIL ?? "Stars Media <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO_EMAIL ?? site.contact.email],
        reply_to: values.email,
        subject: `Site contact — ${values.name}`,
        text: body,
      }),
    });

    if (!response.ok) {
      console.error("[contact] Resend answered", response.status);
      return { status: "unavailable", values };
    }
  } catch (error) {
    console.error("[contact] could not reach Resend", error);
    return { status: "unavailable", values };
  }

  return { status: "sent", email: values.email };
}
