"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GEMS, CERT_FIELDS } from "@/config/site";
const upload = async (file) => {
  if (!file?.size) return null;
  const fd = new FormData(); fd.set("file", file);
  const r = await fetch("/api/upload", { method: "POST", body: fd });
  if (!r.ok) throw new Error("upload");
  return (await r.json()).url;
};
const NUM = [["mrp", "Original price (₹)"], ["price", "Offer price (₹)*"], ["carat", "Carat*"]];
export default function ProductForm({ product }) {
  const r = useRouter(), [msg, setMsg] = useState(""), [extras, setExtras] = useState(product?.extras || []), c = product?.cert || {};
  const set = (i, k, v) => setExtras(extras.map((y, j) => (j === i ? { ...y, [k]: v } : y)));
  async function submit(e) {
    e.preventDefault(); setMsg("Saving…");
    try {
      const fd = new FormData(e.target), b = Object.fromEntries(fd);
      const image = (await upload(fd.get("file"))) || product?.image;
      if (!image) return setMsg("Product image is required.");
      const certImage = (await upload(fd.get("certFile"))) || c.image;
      delete b.file; delete b.certFile;
      const res = await fetch(product ? `/api/products/${product._id}` : "/api/products", { method: product ? "PATCH" : "POST",
        body: JSON.stringify({ ...b, isFeatured: fd.has("isFeatured"), image, certImage, extras }) });
      if (!res.ok) throw new Error();
      r.push("/admin/products"); r.refresh();
    } catch { setMsg("Could not save. Check the fields and Cloudinary keys."); }
  }
  const f = "w-full rounded bg-panel border border-pearl/15 px-3 py-2";
  return (<form onSubmit={submit} className="space-y-3">
    <input name="name" required defaultValue={product?.name} placeholder="Name*" className={f} />
    <select name="type" defaultValue={product?.type} className={f}>{GEMS.map((g) => <option key={g.name}>{g.name}</option>)}</select>
    <div className="grid grid-cols-2 gap-3">{NUM.map(([k, ph]) => <input key={k} name={k} type="number" step="any" min="0" required={k === "price" || k === "carat"} defaultValue={product?.[k] ?? ""} placeholder={ph} className={f} />)}</div>
    <textarea name="description" rows="3" defaultValue={product?.description} placeholder="Description" className={f} />
    <label className="block text-sm">Product image{product ? " (leave empty to keep current)" : "*"}<input name="file" type="file" accept="image/*" required={!product} className={f} /></label>
    <h2 className="pt-4 font-display text-xl">Certificate details</h2>
    <div className="grid grid-cols-2 gap-3">{CERT_FIELDS.map(([k, ph]) => <input key={k} name={`cert_${k}`} defaultValue={c[k] || ""} placeholder={ph} className={f} />)}</div>
    <label className="block text-sm">Certificate image (optional){c.image && " - one is saved; choose a file to replace it"}<input name="certFile" type="file" accept="image/*" className={f} /></label>
    <h2 className="pt-4 font-display text-xl">Extra details</h2>
    <p className="text-sm opacity-70">Add any field you need (Origin, Treatment, Planet…). Remove with ✕. Empty rows are ignored.</p>
    {extras.map((x, i) => (<div key={i} className="flex gap-2">
      <input value={x.label} onChange={(e) => set(i, "label", e.target.value)} placeholder="Label (e.g. Origin)" className={f} />
      <input value={x.value} onChange={(e) => set(i, "value", e.target.value)} placeholder="Value (e.g. Sri Lanka)" className={f} />
      <button type="button" onClick={() => setExtras(extras.filter((_, j) => j !== i))} aria-label="Remove field" className="px-3">✕</button></div>))}
    <button type="button" onClick={() => setExtras([...extras, { label: "", value: "" }])} className="text-sm underline">+ Add field</button>
    <label className="flex items-center gap-2"><input type="checkbox" name="isFeatured" defaultChecked={product?.isFeatured} /> Show on landing page</label>
    <button className="rounded-full bg-pearl px-8 py-3 text-ink">{product ? "Save changes" : "Save product"}</button>
    {msg && <p role="status" className="text-gold">{msg}</p>}
  </form>);
}
