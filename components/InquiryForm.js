"use client";
import { useState } from "react";
import { GEMS } from "@/config/site";
export default function InquiryForm({ product, productName, title = "Inquire about this gem", defaultCarat, defaultStone }) {
  const [s, setS] = useState("idle");
  async function submit(e) {
    const form = e.target; e.preventDefault(); setS("sending");
    try {
      const body = Object.fromEntries(new FormData(form));
      const r = await fetch("/api/inquiry", { method: "POST", body: JSON.stringify({ ...body, product, productName }) });
      setS(r.ok ? "done" : "error"); if (r.ok) form.reset();
    } catch { setS("error"); }
  }
  const f = "w-full rounded-lg border border-pearl/20 bg-white px-4 py-3 text-pearl placeholder:text-pearl/50";
  return (<form onSubmit={submit} className="space-y-3">
    {title && <h3 className="font-display text-2xl">{title}</h3>}
    {productName && <p className="text-sm opacity-80">Inquiry for: {productName}</p>}
    <div className="grid gap-3 sm:grid-cols-2"><input name="name" required placeholder="Name*" className={f} /><input name="phone" required placeholder="Phone number*" className={f} /></div>
    <input name="email" type="email" placeholder="Email address" className={f} />
    <div className="grid grid-cols-2 gap-3">
      <select name="stone" required defaultValue={defaultStone || ""} aria-label="Stone" className={f}>
        <option value="" disabled>Select stone*</option>{GEMS.map((g) => <option key={g.name}>{g.name}</option>)}</select>
      <input name="carat" type="number" step="any" min="0.01" required defaultValue={defaultCarat} placeholder="Carat*" className={f} /></div>
    {product && <input name="qty" type="number" min="1" defaultValue="1" aria-label="Quantity (pieces)" className={f} />}
    <textarea name="message" rows="3" placeholder="Message" className={f} />
    <button disabled={s === "sending"} className="rounded-full bg-pearl px-8 py-3 text-ink shadow-lg disabled:opacity-60">{s === "sending" ? "Sending…" : "Send"}</button>
    {s === "done" && <p className="text-gold" role="status">Thank you. We'll contact you soon.</p>}
    {s === "error" && <p className="text-red-700" role="alert">Couldn't send. Check your details (stone and carat are required) and try again.</p>}
  </form>);
}
