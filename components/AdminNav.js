import Link from "next/link";
const L = [["Dashboard", "/admin"], ["Products", "/admin/products"], ["Inquiries", "/admin/inquiries"], ["List product", "/admin/products/new"]];
export default function AdminNav() {
  return (<nav className="mb-6 flex gap-2 overflow-x-auto border-b border-pearl/15 pb-3 text-sm">
    {L.map(([t, h]) => <Link key={h} href={h} className="whitespace-nowrap rounded-full border border-pearl/25 px-4 py-1.5 hover:border-gold">{t}</Link>)}</nav>);
}
