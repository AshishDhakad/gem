import dynamic from "next/dynamic";
import Link from "next/link";
import db from "@/lib/db";
import { Inquiry, User } from "@/models";
import { requireAdmin } from "@/lib/guard";
import AdminNav from "@/components/AdminNav";
const Charts = dynamic(() => import("@/components/Charts")); // chart lib loads only on admin
export default async function Admin() {
  await requireAdmin(); await db();
  const [pie, users, counts] = await Promise.all([
    Inquiry.aggregate([{ $group: { _id: "$product", qty: { $sum: "$qty" } } },
      { $lookup: { from: "products", localField: "_id", foreignField: "_id", as: "p" } },
      { $project: { _id: 0, qty: 1, name: { $ifNull: [{ $first: "$p.name" }, "General"] } } }]),
    User.aggregate([{ $group: { _id: { $dateToString: { format: "%d %b", date: "$createdAt" } }, n: { $sum: 1 } } }, { $project: { _id: 0, day: "$_id", n: 1 } }]),
    Inquiry.aggregate([{ $group: { _id: { $ifNull: ["$status", "New"] }, n: { $sum: 1 } } }]),
  ]);
  const total = counts.reduce((a, c) => a + c.n, 0);
  return (<main className="mx-auto max-w-6xl space-y-6 px-4 py-10"><AdminNav />
    <h1 className="font-display text-3xl">Dashboard</h1>
    <div className="flex flex-wrap gap-3"><div className="rounded-lg bg-panel px-5 py-3">Total inquiries <b className="ml-2 text-gold">{total}</b></div>
      {counts.map((c) => <Link key={c._id} href={`/admin/inquiries?status=${c._id}`} className="rounded-lg bg-panel px-5 py-3">{c._id} <b className="ml-2 text-gold">{c.n}</b></Link>)}</div>
    <Charts pie={pie} users={users} /></main>);
}
