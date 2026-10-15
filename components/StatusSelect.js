"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { STATUSES } from "@/config/site";
export default function StatusSelect({ id, value }) {
  const r = useRouter(), [v, setV] = useState(value || "New"), [err, setErr] = useState(false);
  async function change(e) {
    const prev = v, n = e.target.value; setV(n); setErr(false);
    try { const res = await fetch(`/api/inquiries/${id}`, { method: "PATCH", body: JSON.stringify({ status: n }) }); if (!res.ok) throw 0; r.refresh(); }
    catch { setV(prev); setErr(true); }
  }
  return (<><select value={v} onChange={change} aria-label="Status" className="rounded border border-pearl/25 bg-ink px-2 py-1">{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
    {err && <span role="alert" className="ml-2 text-xs text-red-700">Failed</span>}</>);
}
