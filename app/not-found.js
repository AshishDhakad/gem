import Link from "next/link";
export const metadata = { title: "Page not found", robots: { index: false } };
export default function NotFound() {
  return (<main className="mx-auto max-w-xl px-4 py-24 text-center"><h1 className="font-display text-6xl">404</h1>
    <p className="mt-4 text-pearl/70">We couldn't find that page. The link may be wrong, or the gem is no longer listed.</p>
    <Link href="/products" className="mt-8 inline-block rounded-full bg-pearl px-8 py-3 text-ink">Browse gems</Link></main>);
}
