import Link from "next/link";
import { SITE } from "@/config/site";
const links = [["Shop", "/products"], ["Gems", "/#gems"]];
export default function Header() {
  const a = "px-3 py-2 rounded hover:text-gold";
  return (<header className="sticky top-0 z-20 border-b border-pearl/15 bg-ink/90 backdrop-blur">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
      <Link href="/" className="font-display text-xl text-gold">{SITE.name}</Link>
      <nav className="hidden gap-2 text-sm md:flex">{links.map(([t, h]) => <Link key={h} href={h} className={a}>{t}</Link>)}</nav>
      <details className="relative md:hidden">
        <summary className="cursor-pointer list-none rounded border border-pearl/25 px-3 py-2 text-sm">Menu</summary>
        <div className="absolute right-0 mt-2 flex w-44 flex-col rounded border border-pearl/15 bg-panel p-2">{links.map(([t, h]) => <Link key={h} href={h} className={a}>{t}</Link>)}</div>
      </details>
    </div></header>);
}
