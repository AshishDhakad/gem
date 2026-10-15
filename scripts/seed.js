const m = require("mongoose");
// Keep in sync with GEMS in config/site.js: [name, base price in ₹]
const GEMS = [["Ruby", 60000], ["Emerald", 45000], ["Sapphire", 50000], ["Pearl", 12000], ["Opal", 15000], ["Garnet", 6000], ["Amethyst", 5000], ["Topaz", 7000], ["Diamond", 120000]];
const VARIANTS = ["Classic", "Royal", "Deep", "Premium"];
const items = GEMS.flatMap(([type, base]) => VARIANTS.map((v, i) => {
  const carat = +(1.2 + i * 0.9).toFixed(2), price = Math.round((base * (1 + i * 0.35)) / 100) * 100;
  return { name: `${v} ${type}`, type, slug: `${type.toLowerCase()}-${v.toLowerCase()}`, price, mrp: Math.round((price * 1.25) / 100) * 100, carat, ratti: +(carat * 1.1).toFixed(2),
    image: `https://picsum.photos/seed/${type}${i}/800/800`, isFeatured: i === 0, description: `Natural ${type.toLowerCase()} of ${carat} carat. Dummy product for testing.`,
    reviews: i === 0 ? [{ user: "Riya", rating: 5, text: "Beautiful stone, as described." }] : [], createdAt: new Date(), updatedAt: new Date() };
}));
(async () => {
  await m.connect(process.env.MONGODB_URI);
  const c = m.connection.collection("products");
  await c.createIndex({ name: "text", description: "text" });
  await c.deleteMany({ image: /picsum\.photos/ }); // clears older dummy products only; your real (Cloudinary) products stay
  await c.insertMany(items);
  console.log("Seeded", items.length, "products"); process.exit(0);
})();
