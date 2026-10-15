// Wrap API handlers so a failure returns JSON 500 instead of crashing the request.
export const safe = (fn) => async (req, ctx) => {
  try { return await fn(req, ctx); } catch (e) { console.error(e); return Response.json({ error: "Server error" }, { status: 500 }); }
};
