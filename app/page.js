import Link from "next/link";
import db from "@/lib/db";
import { Product } from "@/models";
import Carousel from "@/components/Carousel";
import ProductCard from "@/components/ProductCard";
import InquiryForm from "@/components/InquiryForm";
import { SITE, GEMS } from "@/config/site";
export const revalidate = 3600;
export default async function Home() {
  await db();
  const sel = "name slug price mrp image type";
  let items = await Product.find({ isFeatured: true }).select(sel).sort({ updatedAt: -1 }).limit(12).lean();
  if (!items.length) items = await Product.find().select(sel).sort({ createdAt: -1 }).limit(12).lean();
  return (<main>
    <section className="px-4 py-20 text-center md:py-36" style={{ background: "var(--hero)" }}>
      <h1 className="font-display text-5xl text-gold md:text-8xl">{SITE.heroTitle}</h1>
      <p className="mx-auto mt-8 max-w-3xl text-lg md:text-2xl">Explore our <span className="text-gold">handcrafted collection</span> of rare and precious <span className="text-gold">gemstones</span>.</p>
      <a href="#commission" className="mt-10 inline-block rounded-full bg-pearl px-10 py-4 text-ink shadow-lg">INQUIRE NOW</a>
    </section>
    <section id="gems" className="mx-auto max-w-6xl px-4 py-14"><h2 className="mb-6 font-display text-3xl">Shop by gemstone</h2>
      <div className="grid grid-cols-3 gap-3 md:grid-cols-9">
        {GEMS.map((g) => (<Link key={g.name} href={`/products?type=${g.name}`} className="flex flex-col items-center gap-2 rounded-lg border border-pearl/15 bg-panel p-3 text-sm transition-colors hover:border-gold">
          <span className="size-12 rounded-full ring-1 ring-pearl/20" style={{ background: `radial-gradient(circle at 30% 30%, #fff9, ${g.color})` }} />{g.name}</Link>))}
      </div></section>
    <section className="bg-panel px-4 py-16"><div className="mx-auto max-w-6xl">
      <h2 className="mb-10 text-center font-display text-4xl md:text-5xl">Our Collection</h2>
      <Carousel>{items.map((p, i) => <div key={p.slug} className="w-[46%] shrink-0 snap-start md:w-[23%]"><ProductCard p={p} priority={i < 4} /></div>)}</Carousel>
      <p className="mt-10 text-center"><Link href="/products" className="inline-block rounded-full bg-pearl px-8 py-3 text-ink">View all</Link></p></div></section>
    <section id="commission" className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2">
      <div><h2 className="font-display text-4xl md:text-5xl">Commission a Piece</h2><p className="mt-6 text-xl">Contact our master bench jewelers to book a private design consultation.</p></div>
      <InquiryForm title="" /></section>
  </main>);
}
