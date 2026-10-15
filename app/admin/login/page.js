"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { SITE } from "@/config/site";
import { useRouter } from "next/navigation";
export default function AdminLogin() {
  const r = useRouter(), [err, setErr] = useState("");
  async function submit(e) {
    e.preventDefault(); setErr("");
    const { email, password } = Object.fromEntries(new FormData(e.target));
    const res = await signIn("credentials", { email, password, redirect: false });
    res?.ok ? r.push("/admin") : setErr("Wrong email or password.");
  }
  const f = "w-full rounded bg-panel border border-pearl/15 px-3 py-3";
  return (<main className="mx-auto max-w-sm px-4 py-16"><h1 className="font-display text-3xl mb-6">{SITE.name} admin</h1>
    <form onSubmit={submit} className="space-y-3">
      <input name="email" type="email" required placeholder="Email" className={f} />
      <input name="password" type="password" required placeholder="Password" className={f} />
      <button className="w-full rounded bg-gold px-5 py-3 font-medium text-ink">Sign in</button>
      {err && <p role="alert" className="text-red-700">{err}</p>}
    </form>
    {/* <button onClick={() => signIn("google", { callbackUrl: "/admin" })} className="mt-3 w-full rounded border border-pearl/25 px-5 py-3">Continue with Google</button> */}
  </main>);
}
