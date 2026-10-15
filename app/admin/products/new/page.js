import { requireAdmin } from "@/lib/guard";
import AdminNav from "@/components/AdminNav";
import ProductForm from "@/components/ProductForm";
export default async function NewProduct() {
  await requireAdmin();
  return (<main className="mx-auto max-w-2xl px-4 py-10"><AdminNav /><h1 className="mb-6 font-display text-3xl">List a product</h1><ProductForm /></main>);
}
