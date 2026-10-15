import "./globals.css";
import { Playfair_Display_SC, Lora } from "next/font/google";
import Header from "@/components/Header";
import { SITE } from "@/config/site";
import { THEMES, THEME } from "@/config/theme";
const display = Playfair_Display_SC({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-display", display: "swap" });
const body = Lora({ subsets: ["latin"], variable: "--font-body", display: "swap" });
export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `Buy Certified Natural Gemstones Online | ${SITE.name}`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  openGraph: { type: "website", siteName: SITE.name, locale: "en_IN" },
  alternates: { canonical: "/" },
};
export default function Root({ children }) {
  return (<html lang="en" className={`${display.variable} ${body.variable}`} style={THEMES[THEME]}><body className="font-body"><Header />{children}
    <footer className="border-t border-pearl/30 px-4 py-8 text-center text-pearl/80">All Rights Reserved. © {new Date().getFullYear()} {SITE.name}</footer>
  </body></html>);
}
