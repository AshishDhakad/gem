const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export default () => ({ rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] }, sitemap: `${site}/sitemap.xml` });
