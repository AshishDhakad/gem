import Link from "next/link";
import Image from "next/image";
import db from "@/lib/db";
import { Product } from "@/models";
import { requireAdmin } from "@/lib/guard";
import AdminNav from "@/components/AdminNav";
import SortTh from "@/components/SortTh";
import { SITE } from "@/config/site";
const SORTS = { name: "name", type: "type", price: "price", mrp: "mrp", carat: "carat", ratti: "ratti", featured: "isFeatured", added: "createdAt" };
const money = (n) => (n ? `${SITE.currency}${n.toLocaleString("en-IN")}` : "-");
export default async function AdminProducts({ searchParams }) {
  await requireAdmin(); await db();
  const q = String(searchParams.q || "").slice(0, 60), safeQ = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const sort = SORTS[searchParams.sort] ? searchParams.sort : "added", dir = searchParams.dir === "asc" ? "asc" : "desc";
  const rows = await Product.find(q ? { name: { $regex: safeQ, $options: "i" } } : {}).select("name slug type price mrp carat ratti image isFeatured createdAt")
    .sort({ [SORTS[sort]]: dir === "asc" ? 1 : -1, _id: 1 }).collation({ locale: "en", strength: 2 }).limit(200).lean();
  const h = { sort, dir, path: "/admin/products", params: { q } };
  return (<main className="mx-auto max-w-6xl px-4 py-10"><AdminNav />
    <h1 className="mb-4 font-display text-3xl">Products ({rows.length})</h1>
    <form className="mb-5"><input type="hidden" name="sort" value={sort} /><input type="hidden" name="dir" value={dir} />
      <input name="q" defaultValue={q} placeholder="Search products" className="w-full rounded-lg border border-pearl/20 bg-white px-4 py-3 text-pearl md:w-96" /></form>
    <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-pearl/60"><tr><th className="p-2"></th>
      <SortTh label="Name" field="name" {...h} /><SortTh label="Stone" field="type" {...h} /><SortTh label="Offer price" field="price" {...h} /><SortTh label="Original" field="mrp" {...h} />
      <SortTh label="Carat" field="carat" {...h} /><SortTh label="Ratti" field="ratti" {...h} /><SortTh label="Featured" field="featured" {...h} /><SortTh label="Added" field="added" {...h} /><th></th></tr></thead>
      <tbody>{rows.map((p) => (<tr key={String(p._id)} className="border-t border-pearl/15"><td className="p-2"><Image src={p.image} alt="" width={48} height={48} className="size-12 rounded-full object-cover" /></td>
        <td><Link href={`/admin/products/${p._id}/edit`} className="underline">{p.name}</Link></td><td>{p.type}</td><td>{money(p.price)}</td><td>{money(p.mrp)}</td><td>{p.carat || "-"}</td><td>{p.ratti || "-"}</td>
        <td>{p.isFeatured ? "Yes" : "-"}</td><td className="whitespace-nowrap">{new Date(p.createdAt).toLocaleDateString("en-IN")}</td>
        <td className="space-x-3 whitespace-nowrap"><Link href={`/admin/products/${p._id}/edit`} className="text-gold">Edit</Link><Link href={`/products/${p.slug}`}>View</Link></td></tr>))}</tbody></table></div>
    {!rows.length && <p className="mt-6 text-pearl/60">No products found.</p>}</main>);
}
