import { applyCorsAndSecurityHeaders, sendJson } from "./_lib/security";

export default function handler(req: any, res: any) {
  const { allowed, isPreflight } = applyCorsAndSecurityHeaders(req, res, ["GET", "OPTIONS"]);
  if (!allowed || isPreflight) return;

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET, OPTIONS");
    return sendJson(res, 405, { status: "error", error: "Method not allowed. Use GET." });
  }

  return sendJson(res, 200, {
    status: "healthy",
  });
}
