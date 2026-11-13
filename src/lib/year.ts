import { cacheLife } from "next/cache";

/** Current year for the footer, cached so pages stay static. */
export async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
