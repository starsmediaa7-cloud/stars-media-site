/**
 * Single place for the facts the site prints about Stars Media.
 * Change a value here and it updates everywhere.
 */
function resolveUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export const site = {
  name: "Stars Media",
  url: resolveUrl().replace(/\/$/, ""),
  contact: {
    email: "starsmediaa7@gmail.com",
    whatsappDisplay: "+55 62 98111-2025",
    whatsappNumber: "5562981112025",
    instagram: "starsmediaa_",
  },
} as const;

export const links = {
  email: `mailto:${site.contact.email}`,
  whatsapp: `https://wa.me/${site.contact.whatsappNumber}`,
  instagram: `https://www.instagram.com/${site.contact.instagram}/`,
};
