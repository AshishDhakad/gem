import Link from "next/link";
import Image from "next/image";
import Price from "@/components/Price";
export default function ProductCard({ p, priority }) {
  return (<Link href={`/products/${p.slug}`} className="group flex flex-col items-center text-center">
    <Image src={p.image} alt={p.name} width={400} height={400} priority={priority} sizes="(max-width:768px) 45vw, 22vw"
      className="aspect-square w-full rounded-full object-cover transition-transform group-hover:scale-[1.03]" />
    <h3 className="mt-4 text-lg">{p.name}</h3><p className="opacity-90"><Price price={p.price} mrp={p.mrp} /></p></Link>);
}
