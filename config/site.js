// CHANGE BRAND HERE ONLY. Used by header, footer, SEO metadata, landing page.
export const SITE = {
  name: process.env.NEXT_PUBLIC_BRAND_NAME || "shrigemstone", // brand name used everywhere (or set NEXT_PUBLIC_BRAND_NAME)
  tagline: "Certified natural gemstones, hand-cut and fairly priced.",
  description: "Buy certified natural ruby, emerald, sapphire, pearl, opal, garnet, amethyst, topaz and diamond online in India.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  currency: "₹",
  heroTitle: "Made to Be Worn",
};
// The 9 gems shown on the landing page and used in the admin product form.
export const GEMS = [
  { name: "Ruby", color: "#C2185B" }, { name: "Emerald", color: "#1B9E6B" }, { name: "Sapphire", color: "#2E4FD1" },
  { name: "Pearl", color: "#E8E2D6" }, { name: "Opal", color: "#7FD6D0" }, { name: "Garnet", color: "#8E1B2D" },
  { name: "Amethyst", color: "#8E5BC9" }, { name: "Topaz", color: "#F0A53A" }, { name: "Diamond", color: "#D6ECF7" },
];

// Inquiry status choices (admin can filter and change these).
export const STATUSES = ["New", "Reviewing", "Contacted", "Closed"];

// Certificate fields (match your testing report). Add or rename here; admin form, API and product page follow.
export const CERT_FIELDS = [
  ["lab", "Lab name"], ["refNo", "Reference no."], ["date", "Report date"], ["colour", "Colour"], ["cut", "Type of cut"],
  ["dimension", "Dimension (e.g. 10.1-8.2-4.9)"], ["hardness", "Hardness"], ["refIndex", "R. Index"], ["clarity", "Clarity"],
  ["conclusion", "Conclusion"], ["comments", "Specific comments"],
];
