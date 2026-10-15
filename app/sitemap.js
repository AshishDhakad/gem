import db from "@/lib/db";
import { Product } from "@/models";
const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export default async function sitemap() {
  await db();
  const ps = await Product.find().select("slug updatedAt").lean();
  return [{ url: site, changeFrequency: "daily", priority: 1 }, { url: `${site}/products`, changeFrequency: "daily", priority: 0.9 },
    ...ps.map((p) => ({ url: `${site}/products/${p.slug}`, lastModified: p.updatedAt, priority: 0.8 }))];
}
