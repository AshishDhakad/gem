import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
export async function requireAdmin() {
  if ((await getServerSession(authOptions))?.user?.role !== "admin") redirect("/admin/login");
}
export const isAdmin = async () => (await getServerSession(authOptions))?.user?.role === "admin";
