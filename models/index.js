import mongoose, { Schema, models, model } from "mongoose";
export const Product = models.Product || model("Product", new Schema({
  name: String, slug: { type: String, unique: true }, type: { type: String, index: true },
  price: Number, isFeatured: { type: Boolean, index: true }, mrp: Number, ratti: Number, extras: [{ _id: false, label: String, value: String }], cert: { lab: String, refNo: String, date: String, colour: String, cut: String, dimension: String, hardness: String, refIndex: String, clarity: String, conclusion: String, comments: String, image: String }, image: String, description: String, carat: Number,
  reviews: [{ user: String, rating: Number, text: String }],
}, { timestamps: true }).index({ name: "text", description: "text" }));
export const Inquiry = models.Inquiry || model("Inquiry", new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", index: true },
  name: String, phone: String, email: String, stone: { type: String, index: true }, carat: Number, productInfo: { name: String, slug: String, type: String, price: Number }, qty: Number, message: String,
  status: { type: String, default: "New", index: true },
}, { timestamps: true }));
export const User = models.User || model("User", new Schema({
  name: String, email: { type: String, unique: true }, password: String, role: { type: String, default: "user" },
}, { timestamps: true }));
