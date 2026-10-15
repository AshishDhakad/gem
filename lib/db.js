import mongoose from "mongoose";
let c = global._m || (global._m = { conn: null, p: null });
export default async function db() {
  if (c.conn) return c.conn;
  c.p ||= mongoose.connect(process.env.MONGODB_URI, { maxPoolSize: 10 }).catch((e) => { c.p = null; throw e; }); // retry next request after a failure
  return (c.conn = await c.p);
}
