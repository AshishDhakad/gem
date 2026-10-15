"use client";
export default function Error({ error, reset }) {
  console.error(error);
  return (<main className="mx-auto max-w-xl px-4 py-24 text-center"><h1 className="font-display text-4xl">Something went wrong</h1>
    <p className="mt-4 text-pearl/70">The page failed to load. Try again in a moment.</p>
    <button onClick={reset} className="mt-8 rounded-full bg-pearl px-8 py-3 text-ink">Try again</button></main>);
}
