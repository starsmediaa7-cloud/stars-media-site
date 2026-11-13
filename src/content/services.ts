/** Order shown on the site. Names and texts live in /messages. */
export const serviceKeys = [
  "graphics",
  "branding",
  "matchday",
  "video",
  "content",
  "marketing",
  "social",
] as const;

export type ServiceKey = (typeof serviceKeys)[number];

export const platformKeys = [
  "discover",
  "profiles",
  "portfolio",
  "media",
  "dashboard",
] as const;

export type PlatformKey = (typeof platformKeys)[number];

export const mediaCategoryKeys = [
  "branding",
  "marketing",
  "image",
  "social",
  "career",
  "portfolio",
] as const;
