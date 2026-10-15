import Link from "next/link";
import db from "@/lib/db";
import { Inquiry } from "@/models";
import { requireAdmin } from "@/lib/guard";
import AdminNav from "@/components/AdminNav";
import StatusSelect from "@/components/StatusSelect";
import SortTh from "@/components/SortTh";
import { STATUSES } from "@/config/site";
const SORTS = { date: "createdAt", product: "productInfo.name", stone: "stone", name: "name", phone: "phone", email: "email", carat: "carat", qty: "qty", message: "message", status: "status" };
export default async function Inquiries({ searchParams }) {
  await requireAdmin(); await db();
  const status = STATUSES.includes(searchParams.status) ? searchParams.status : "";
  const q = String(searchParams.q || "").slice(0, 60), safeQ = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const sort = SORTS[searchParams.sort] ? searchParams.sort : "date", dir = searchParams.dir === "asc" ? "asc" : "desc";
  const filter = { ...(status && { status: status === "New" ? { $in: ["New", null] } : status }),
    ...(q && { $or: [{ name: { $regex: safeQ, $options: "i" } }, { phone: { $regex: safeQ } }, { email: { $regex: safeQ, $options: "i" } }, { "productInfo.name": { $regex: safeQ, $options: "i" } }] }) };
  const rows = await Inquiry.find(filter).sort({ [SORTS[sort]]: dir === "asc" ? 1 : -1, _id: 1 }).collation({ locale: "en", strength: 2 }).limit(100).populate("product", "name").lean();
  const chip = (on) => `whitespace-nowrap rounded-full border px-4 py-1.5 text-sm ${on ? "border-gold text-gold" : "border-pearl/25"}`;
  const h = { sort, dir, path: "/admin/inquiries", params: { status, q } };
  return (<main className="mx-auto max-w-6xl px-4 py-10"><AdminNav />
    <h1 className="mb-4 font-display text-3xl">Inquiries ({rows.length})</h1>
    <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
      <Link href="/admin/inquiries" className={chip(!status)}>All</Link>
      {STATUSES.map((s) => <Link key={s} href={`/admin/inquiries?status=${s}`} className={chip(status === s)}>{s}</Link>)}</div>
    <form className="mb-5"><input type="hidden" name="status" value={status} /><input type="hidden" name="sort" value={sort} /><input type="hidden" name="dir" value={dir} />
      <input name="q" defaultValue={q} placeholder="Search name, phone, email or product" className="w-full rounded-lg border border-pearl/20 bg-white px-4 py-3 text-pearl md:w-96" /></form>
    <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-pearl/60"><tr>
      <SortTh label="Date" field="date" {...h} /><SortTh label="Product" field="product" {...h} /><SortTh label="Stone" field="stone" {...h} /><SortTh label="Name" field="name" {...h} />
      <SortTh label="Phone" field="phone" {...h} /><SortTh label="Email" field="email" {...h} /><SortTh label="Carat" field="carat" {...h} /><SortTh label="Qty" field="qty" {...h} />
      <SortTh label="Message" field="message" {...h} /><SortTh label="Status" field="status" {...h} /></tr></thead>
      <tbody>{rows.map((r) => (<tr key={String(r._id)} className="border-t border-pearl/15 align-top"><td className="whitespace-nowrap p-2">{new Date(r.createdAt).toLocaleDateString("en-IN")}</td>
        <td>{r.productInfo?.slug ? <Link href={`/products/${r.productInfo.slug}`} className="underline">{r.productInfo.name}</Link> : r.product?.name || "General"}{r.productInfo?.price && <span className="block text-xs text-pearl/60">₹{r.productInfo.price}</span>}</td>
        <td>{r.stone || r.productInfo?.type || "-"}</td><td>{r.name}</td><td>{r.phone}</td><td>{r.email}</td><td>{r.carat}</td><td>{r.qty}</td><td className="max-w-xs">{r.message}</td>
        <td><StatusSelect id={String(r._id)} value={r.status} /></td></tr>))}</tbody></table></div>
    {!rows.length && <p className="mt-6 text-pearl/60">No inquiries match.</p>}</main>);
}
