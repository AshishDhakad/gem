"use client";
import { useRef } from "react";
export default function Carousel({ children }) {
  const r = useRef(null);
  const go = (d) => r.current?.scrollBy({ left: d * r.current.clientWidth * 0.8, behavior: "smooth" });
  const b = "absolute top-1/3 hidden size-10 rounded-full bg-ink text-xl text-pearl shadow md:block";
  return (<div className="relative">
    <div ref={r} className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none]">{children}</div>
    <button onClick={() => go(-1)} aria-label="Previous" className={`${b} -left-4`}>‹</button>
    <button onClick={() => go(1)} aria-label="Next" className={`${b} -right-4`}>›</button></div>);
}
