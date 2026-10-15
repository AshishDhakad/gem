"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
export default function Search() {
  const r = useRouter(), sp = useSearchParams(), [q, setQ] = useState(sp.get("q") || ""), first = useRef(true);
  useEffect(() => { // debounce: one request per pause, not per keystroke
    if (first.current) { first.current = false; return; }
    const t = setTimeout(() => { const p = new URLSearchParams(sp); q ? p.set("q", q) : p.delete("q"); p.delete("page"); r.replace(`/products?${p}`); }, 350);
    return () => clearTimeout(t);
  }, [q]);
  return <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search gemstones" aria-label="Search"
    className="w-full md:w-96 rounded bg-panel border border-pearl/15 px-4 py-2" />;
}
