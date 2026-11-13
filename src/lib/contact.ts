import { z } from "zod";
import { serviceKeys } from "@/content/services";

export const contactRoles = ["athlete", "family", "club", "other"] as const;
export const contactInterests = [...serviceKeys, "unsure"] as const;

export const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.email().max(200),
  role: z.enum(contactRoles),
  interest: z.enum(contactInterests),
  message: z.string().min(10).max(4000),
  consent: z.literal("on"),
});

export type ContactField = "name" | "email" | "message" | "consent";

export type ContactValues = {
  name: string;
  email: string;
  role: string;
  interest: string;
  message: string;
};

export type ContactState =
  | { status: "idle" }
  | { status: "invalid"; fields: ContactField[]; values: ContactValues }
  | { status: "unavailable"; values: ContactValues }
  | { status: "sent"; email: string };
