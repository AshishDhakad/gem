import mongoose from "mongoose";
import db from "@/lib/db";
import { Product } from "@/models";
import { safe } from "@/lib/api";
import { isAdmin } from "@/lib/guard";
import { fromBody, valid } from "@/lib/product";
import { revalidatePath } from "next/cache";
export const PATCH = safe(async (req, { params }) => {
  if (!(await isAdmin())) return Response.json({ error: "Forbidden" }, { status: 403 });
  if (!mongoose.isValidObjectId(params.id)) return Response.json({ error: "Bad id" }, { status: 400 });
  const d = fromBody(await req.json());
  if (!valid(d)) return Response.json({ error: "Missing or invalid fields" }, { status: 400 });
  await db();
  const p = await Product.findByIdAndUpdate(params.id, d).select("slug");
  if (!p) return Response.json({ error: "Not found" }, { status: 404 });
  revalidatePath("/"); revalidatePath("/products"); revalidatePath(`/products/${p.slug}`);
  return Response.json({ ok: true });
});
