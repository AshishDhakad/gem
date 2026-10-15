import Link from "next/link";
// Clickable column header: first click sorts asc, second desc. Keeps search/filter params.
export default function SortTh({ label, field, sort, dir, path, params = {} }) {
  const on = sort === field, next = on && dir === "asc" ? "desc" : "asc";
  const q = new URLSearchParams({ ...Object.fromEntries(Object.entries(params).filter(([, v]) => v)), sort: field, dir: next });
  return (<th className="whitespace-nowrap p-2"><Link href={`${path}?${q}`} className={on ? "text-gold" : ""}>{label}{on ? (dir === "asc" ? " ↑" : " ↓") : ""}</Link></th>);
}
