import db from "@/lib/db";
import { Product } from "@/models";
import { safe } from "@/lib/api";
import { isAdmin } from "@/lib/guard";
import { fromBody, valid } from "@/lib/product";
import { revalidatePath } from "next/cache";
export const POST = safe(async (req) => {
  if (!(await isAdmin())) return Response.json({ error: "Forbidden" }, { status: 403 });
  const d = fromBody(await req.json());
  if (!valid(d)) return Response.json({ error: "Missing or invalid fields" }, { status: 400 });
  await db();
  const slug = d.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Math.random().toString(36).slice(2, 6);
  const p = await Product.create({ ...d, slug });
  revalidatePath("/products"); revalidatePath("/");
  return Response.json({ slug: p.slug });
});
