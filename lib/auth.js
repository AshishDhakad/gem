import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import db from "@/lib/db";
import { User } from "@/models";

const same = (a = "", b = "") => { const x = Buffer.from(a), y = Buffer.from(b); return x.length === y.length && crypto.timingSafeEqual(x, y); };
export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    Google({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET }),
    Credentials({
      credentials: { email: {}, password: {}, name: {} },
      async authorize(c) {
        const admin = process.env.ADMIN_EMAIL;
        if (c.email === admin) return process.env.ADMIN_PASSWORD && same(c.password, process.env.ADMIN_PASSWORD) ? { id: "admin", email: admin, name: "Admin" } : null;
        await db();
        let u = await User.findOne({ email: c.email });
        if (!u && c.name) u = await User.create({ name: c.name, email: c.email, password: await bcrypt.hash(c.password, 10) });
        return u?.password && (await bcrypt.compare(c.password, u.password)) ? { id: u.id, email: u.email, name: u.name } : null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) { await db(); await User.updateOne({ email: user.email }, { $setOnInsert: { name: user.name } }, { upsert: true }); return true; },
    async jwt({ token }) { token.role = token.email === process.env.ADMIN_EMAIL ? "admin" : "user"; return token; },
    async session({ session, token }) { session.user.role = token.role; return session; },
  },
};
