"use client";
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
const C = ["#C9A24B", "#2F7D5B", "#7A5C9E", "#B5483E", "#3E6FB5"];
export default function Charts({ pie, users }) {
  return (<div className="grid md:grid-cols-2 gap-6">
    <div className="h-72 rounded-lg bg-panel p-4"><p className="mb-2">Inquiries by product (qty)</p>
      <ResponsiveContainer><PieChart><Pie data={pie} dataKey="qty" nameKey="name" outerRadius={90}>{pie.map((_, i) => <Cell key={i} fill={C[i % C.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>
    <div className="h-72 rounded-lg bg-panel p-4"><p className="mb-2">New users per day</p>
      <ResponsiveContainer><LineChart data={users}><XAxis dataKey="day" stroke="#999" /><YAxis allowDecimals={false} stroke="#999" /><Tooltip /><Line dataKey="n" stroke="#C9A24B" /></LineChart></ResponsiveContainer></div>
  </div>);
}
