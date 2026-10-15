import { CERT_FIELDS, GEMS } from "@/config/site";
export function fromBody(b) {
  const cert = Object.fromEntries(CERT_FIELDS.map(([k]) => [k, String(b[`cert_${k}`] || "").trim().slice(0, 200)]));
  cert.image = b.certImage || null;
  return { name: String(b.name || "").trim(), type: b.type, description: b.description, image: b.image, price: +b.price,
    mrp: +b.mrp || null, carat: +b.carat || null, ratti: +b.ratti || null, isFeatured: !!b.isFeatured, cert,
    extras: (Array.isArray(b.extras) ? b.extras : []).map((e) => ({ label: String(e.label || "").trim().slice(0, 60), value: String(e.value || "").trim().slice(0, 200) })).filter((e) => e.label && e.value).slice(0, 20) };
}
export const valid = (d) => d.name && GEMS.some((g) => g.name === d.type) && d.price > 0 && d.image;
