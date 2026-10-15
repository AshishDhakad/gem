import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { Inquiry } from "@/models";
import { safe } from "@/lib/api";
import { STATUSES } from "@/config/site";
export const PATCH = safe(async (req, { params }) => {
  if ((await getServerSession(authOptions))?.user?.role !== "admin") return Response.json({ error: "Forbidden" }, { status: 403 });
  const { status } = await req.json().catch(() => ({}));
  if (!STATUSES.includes(status) || !mongoose.isValidObjectId(params.id)) return Response.json({ error: "Bad request" }, { status: 400 });
  await db(); await Inquiry.updateOne({ _id: params.id }, { status });
  return Response.json({ ok: true });
});
