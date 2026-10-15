import { SITE } from "@/config/site";
const fmt = (n) => `${SITE.currency}${n.toLocaleString("en-IN")}`;
export default function Price({ price, mrp }) {
  return (<span>{fmt(price)}{mrp > price && <s className="ml-2 text-sm opacity-60">{fmt(mrp)}</s>}</span>);
}
