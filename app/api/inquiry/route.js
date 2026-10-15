import mongoose from "mongoose";
import db from "@/lib/db";
import { Inquiry, Product } from "@/models";
import { safe } from "@/lib/api";
import { GEMS } from "@/config/site";
export const POST = safe(async (req) => {
  const b = await req.json().catch(() => ({}));
  const carat = parseFloat(b.carat);
  if (!b.name?.trim() || !b.phone?.trim() || !(carat > 0)) return Response.json({ error: "Name, phone and carat are required" }, { status: 400 });
  if (b.product && !mongoose.isValidObjectId(b.product)) return Response.json({ error: "Bad product" }, { status: 400 });
  await db();
  // Product inquiry: stone and product details come from the product itself (snapshot), so admin always knows what was asked about.
  const p = b.product ? await Product.findById(b.product).select("name slug type price").lean() : null;
  const stone = p?.type || b.stone;
  if (!GEMS.some((g) => g.name === stone)) return Response.json({ error: "Select a stone" }, { status: 400 });
  await Inquiry.create({ product: p?._id, productInfo: p ? { name: p.name, slug: p.slug, type: p.type, price: p.price } : undefined, stone,
    name: b.name.trim().slice(0, 100), phone: b.phone.trim().slice(0, 20), email: (b.email || "").slice(0, 120), carat,
    qty: Math.max(1, +b.qty || 1), message: (b.message || "").slice(0, 1000) });
  return Response.json({ ok: true });
});
