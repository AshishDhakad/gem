import mongoose from "mongoose";
import { notFound } from "next/navigation";
import db from "@/lib/db";
import { Product } from "@/models";
import { requireAdmin } from "@/lib/guard";
import AdminNav from "@/components/AdminNav";
import ProductForm from "@/components/ProductForm";
export default async function EditProduct({ params }) {
  await requireAdmin();
  if (!mongoose.isValidObjectId(params.id)) notFound();
  await db();
  const p = await Product.findById(params.id).lean();
  if (!p) notFound();
  return (<main className="mx-auto max-w-2xl px-4 py-10"><AdminNav /><h1 className="mb-6 font-display text-3xl">Edit product</h1>
    <ProductForm product={JSON.parse(JSON.stringify(p))} /></main>);
}
