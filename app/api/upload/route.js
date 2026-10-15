import { safe } from "@/lib/api";
import { getServerSession } from "next-auth";
import { v2 as cloudinary } from "cloudinary"; // reads CLOUDINARY_URL automatically
import { authOptions } from "@/lib/auth";

export const POST = safe(async (req) => {
  if ((await getServerSession(authOptions))?.user?.role !== "admin") return Response.json({ error: "Forbidden" }, { status: 403 });
  const file = (await req.formData()).get("file");
  if (!file || !file.type?.startsWith("image/")) return Response.json({ error: "Image required" }, { status: 400 });
  const buf = Buffer.from(await file.arrayBuffer());
  const url = await new Promise((ok, no) => cloudinary.uploader.upload_stream(
    { folder: "gems", transformation: [{ width: 1200, crop: "limit", quality: "auto", fetch_format: "auto" }] },
    (e, r) => (e ? no(e) : ok(r.secure_url))).end(buf));
  return Response.json({ url });
});
