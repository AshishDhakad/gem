import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import db from "@/lib/db";
import { Product } from "@/models";
import Search from "@/components/Search";
import ProductCard from "@/components/ProductCard";
import { GEMS } from "@/config/site";

const PER = 12;
export async function generateMetadata({ searchParams }) {
  const t = searchParams.type;
  return { title: t ? `Buy Natural ${t} Gemstones Online` : "Shop Certified Gemstones", description: `Browse certified natural ${t || "ruby, emerald, sapphire and pearl"} gemstones with photos, carat and price.`,
    alternates: { canonical: t ? `/products?type=${t}` : "/products" }, robots: searchParams.q ? { index: false } : undefined };
}
export default async function Products({ searchParams }) {
  const q = String(searchParams.q || "").slice(0, 80), type = String(searchParams.type || ""), page = Math.max(1, parseInt(searchParams.page) || 1);
  if (type && !GEMS.some((g) => g.name === type)) notFound(); // bad ?type= -> 404
  await db();
  const filter = { ...(q && { $text: { $search: q } }), ...(type && { type }) };
  const items = await Product.find(filter).select("name slug price mrp image type").skip((page - 1) * PER).limit(PER).lean();
  const chip = "whitespace-nowrap rounded-full border px-4 py-1.5 text-sm";
  return (<main className="mx-auto max-w-6xl px-4 py-8">
    <Suspense><Search /></Suspense>
    <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
      <Link href="/products" className={`${chip} ${!type ? "border-gold text-gold" : "border-pearl/25"}`}>All</Link>
      {GEMS.map((g) => <Link key={g.name} href={`/products?type=${g.name}`} className={`${chip} ${type === g.name ? "border-gold text-gold" : "border-pearl/25"}`}>{g.name}</Link>)}
    </div>
    <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">{items.map((p, i) => <ProductCard key={p.slug} p={p} priority={i < 4} />)}</div>
    {!items.length && <p className="mt-10 text-pearl/60">No gems match that search. Try a different name or type.</p>}
  </main>);
}
