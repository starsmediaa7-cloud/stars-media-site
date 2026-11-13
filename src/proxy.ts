import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Sends "/" to the visitor's language (English by default) and keeps
// /en, /pt-br and /es in sync with the language cookie.
export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
