/**
 * Absolute URL of the site, used to build the Open Graph and canonical URLs.
 * NEXT_PUBLIC_SITE_URL wins; on Vercel the production domain is detected
 * automatically; locally it falls back to the dev server.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
