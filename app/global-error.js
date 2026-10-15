"use client";
export default function GlobalError({ reset }) {
  return (<html lang="en"><body style={{ background: "#FAF6EF", color: "#2D2926", fontFamily: "Georgia,serif", textAlign: "center", padding: "6rem 1rem" }}>
    <h1>Something went wrong</h1><button onClick={reset} style={{ padding: "12px 28px", borderRadius: 999, border: 0 }}>Try again</button></body></html>);
}
