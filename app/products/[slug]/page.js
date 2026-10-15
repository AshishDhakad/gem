import Image from "next/image";
import { cache } from "react";
import { notFound } from "next/navigation";
import db from "@/lib/db";
import { Product } from "@/models";
import InquiryForm from "@/components/InquiryForm";
import ProductCard from "@/components/ProductCard";
import Price from "@/components/Price";

const get = cache(async (slug) => { await db(); return Product.findOne({ slug }).lean(); }); // one DB hit for metadata + page
export async function generateMetadata({ params }) {
  const p = await get(params.slug); if (!p) return {};
  const t = `${p.name} - Buy Certified ${p.type} Online`;
  return { title: t, description: (p.description || "").slice(0, 155), alternates: { canonical: `/products/${p.slug}` }, openGraph: { title: t, images: [p.image] } };
}
export const revalidate = 600;
export default async function Detail({ params }) {
  const p = await get(params.slug);
  if (!p) notFound();
  const c = p.cert || {};
  const rows = [["Reference no.", c.refNo], ["Report date", c.date], ["Weight", p.carat && `${p.carat} carat`], ["Ratti", p.ratti], ["Colour", c.colour], ["Cut", c.cut],
    ["Dimension", c.dimension], ["Hardness", c.hardness], ["Refractive index", c.refIndex], ["Clarity", c.clarity], ["Conclusion", c.conclusion], ["Comments", c.comments], ...(p.extras || []).map((e) => [e.label, e.value])].filter((r) => r[1]);
  const related = await Product.find({ type: p.type, slug: { $ne: p.slug } }).select("name slug price mrp image type").limit(4).lean();
  return (<main className="mx-auto max-w-6xl px-4 py-10">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Product", name: p.name, image: p.image, description: p.description,
      offers: { "@type": "Offer", priceCurrency: "INR", price: p.price, availability: "https://schema.org/InStock" } }) }} />
    <div className="grid gap-10 md:grid-cols-2">
      <Image src={p.image} alt={p.name} width={700} height={700} priority className="w-full rounded-lg object-cover" />
      <div className="space-y-5"><h1 className="font-display text-4xl">{p.name}</h1>
        <p className="text-2xl text-gold"><Price price={p.price} mrp={p.mrp} /></p><p className="text-pearl/80">{p.description}</p>
        <InquiryForm product={String(p._id)} productName={p.name} defaultCarat={p.carat} defaultStone={p.type} /></div>
    </div>
    {rows.length > 0 && <section className="mt-16"><h2 className="mb-4 font-display text-2xl">Details{c.lab && <span className="ml-3 font-body text-base text-pearl/70">Certified by {c.lab}</span>}</h2>
      <div className="grid gap-8 md:grid-cols-2"><table className="w-full text-left"><tbody>{rows.map(([k, v]) => (<tr key={k} className="border-b border-pearl/15"><th className="w-1/2 py-2 font-normal text-pearl/70">{k}</th><td>{v}</td></tr>))}</tbody></table>
        {c.image && <a href={c.image} target="_blank" rel="noopener"><Image src={c.image} alt={`Certificate for ${p.name}`} width={800} height={600} loading="lazy" className="h-auto w-full rounded-lg" /></a>}</div></section>}
    <section className="mt-16"><h2 className="mb-4 font-display text-2xl">Reviews</h2>
      {p.reviews?.length ? p.reviews.map((r, i) => (<div key={i} className="border-b border-pearl/15 py-3"><p className="text-gold">{"★".repeat(r.rating)}</p><p>{r.text}</p><p className="text-sm text-pearl/50">{r.user}</p></div>)) : <p className="text-pearl/60">No reviews yet.</p>}</section>
    {related.length > 0 && <section className="mt-16"><h2 className="mb-6 font-display text-2xl">Related gems</h2>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">{related.map((r) => <ProductCard key={r.slug} p={r} />)}</div></section>}
  </main>);
}
