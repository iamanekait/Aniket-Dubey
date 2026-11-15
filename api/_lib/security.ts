import crypto from "node:crypto";

/**
 * Approved production origins for cross-origin requests.
 * Arbitrary Origin reflection is strictly disabled.
 */
const PRODUCTION_ALLOWED_ORIGINS = new Set<string>([
  "https://aniketdubey.com",
  "https://www.aniketdubey.com",
]);

function isOriginAllowed(origin: string | undefined): boolean {
  if (!origin) return false;
  if (PRODUCTION_ALLOWED_ORIGINS.has(origin)) return true;

  // Permit local Vite/Express development origins ONLY outside production
  if (process.env.NODE_ENV !== "production") {
    if (
      origin === "http://localhost:3000" ||
      origin === "http://127.0.0.1:3000" ||
      origin === "http://localhost:5173"
    ) {
      return true;
    }
    // Allow AI Studio cloud preview hosts in non-production dev environments
    if (/^https:\/\/ais-[a-z0-9-]+\.[a-z0-9.-]+\.run\.app$/i.test(origin)) {
      return true;
    }
  }
  return false;
}

/**
 * Apply restrictive CORS headers, Vary: Origin, and no-store cache headers.
 * Rejects unapproved cross-origin requests (returns false if caller should abort with 403).
 */
export function applyCorsAndSecurityHeaders(
  req: any,
  res: any,
  allowedMethods: string[]
): { allowed: boolean; isPreflight: boolean } {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  if (process.env.NODE_ENV === "production") {
    res.setHeader("Strict-Transport-Security", "max-age=31536000");
    res.setHeader("X-Frame-Options", "DENY");
  }
  res.setHeader("Vary", "Origin");

  const originHeader = typeof req.headers?.origin === "string" ? req.headers.origin.trim() : undefined;

  if (originHeader) {
    if (!isOriginAllowed(originHeader)) {
      // Unapproved cross-origin caller: do NOT set Allow-Origin or Allow-Credentials
      if (req.method === "OPTIONS") {
        sendJson(res, 403, { success: false, error: "Cross-origin request rejected." });
        return { allowed: false, isPreflight: true };
      }
      sendJson(res, 403, { success: false, error: "Origin not permitted." });
      return { allowed: false, isPreflight: false };
    }

    // Approved origin: echo exact allowlisted origin without wildcard or credentials
    res.setHeader("Access-Control-Allow-Origin", originHeader);
    res.setHeader("Access-Control-Allow-Methods", allowedMethods.join(", "));
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
    res.setHeader("Access-Control-Max-Age", "600");
  }

  if (req.method === "OPTIONS") {
    if (typeof res.status === "function") {
      res.status(204).end();
    } else {
      res.statusCode = 204;
      res.end();
    }
    return { allowed: true, isPreflight: true };
  }

  return { allowed: true, isPreflight: false };
}

/**
 * Universal JSON response helper compatible with Vercel Serverless & Node ServerResponse / Express.
 */
export function sendJson(res: any, status: number, data: Record<string, unknown>) {
  if (typeof res.status === "function" && typeof res.json === "function") {
    return res.status(status).json(data);
  }
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(data));
}

/**
 * Trusted client IP extraction:
 * Prefers Vercel edge-verified headers (`x-vercel-forwarded-for`, `x-real-ip`)
 * and avoids blindly trusting user-spoofable leftmost entries of raw `x-forwarded-for`.
 */
export function getTrustedClientIp(req: any): string {
  const headers = req.headers || {};

  // 1. Vercel edge injects x-vercel-forwarded-for from the actual TLS peer
  const vercelIp = headers["x-vercel-forwarded-for"];
  if (typeof vercelIp === "string" && vercelIp.trim()) {
    const first = vercelIp.split(",")[0]?.trim();
    if (first && first.length <= 64) return first;
  }

  // 2. Vercel/Nginx edge sets x-real-ip directly from socket peer
  const realIp = headers["x-real-ip"];
  if (typeof realIp === "string" && realIp.trim()) {
    const clean = realIp.trim();
    if (clean.length <= 64) return clean;
  }

  // 3. Fallback: direct socket peer address in local Node/Express
  const socketIp = req.socket?.remoteAddress || req.ip;
  if (typeof socketIp === "string" && socketIp.trim()) {
    return socketIp.trim().slice(0, 64);
  }

  // 4. Last resort (rightmost XFF hop appended by nearest reverse proxy, NOT client-supplied leftmost)
  const xff = headers["x-forwarded-for"];
  if (typeof xff === "string" && xff.trim()) {
    const parts = xff.split(",").map((p) => p.trim()).filter(Boolean);
    if (parts.length > 0) {
      return parts[parts.length - 1].slice(0, 64);
    }
  }

  return "unknown";
}

export class PayloadTooLargeError extends Error {
  constructor(message = "Request body exceeds maximum allowed size.") {
    super(message);
    this.name = "PayloadTooLargeError";
  }
}

export class MalformedJsonError extends Error {
  constructor(message = "Malformed JSON request body.") {
    super(message);
    this.name = "MalformedJsonError";
  }
}

/**
 * Parses and validates JSON request bodies with a hard byte-size limit across
 * Express, Vercel Serverless, and raw Node.js streams.
 */
export async function parseJsonBodyStrict(
  req: any,
  maxBytes: number = 16384
): Promise<Record<string, unknown>> {
  const contentLengthHeader = req.headers?.["content-length"];
  if (contentLengthHeader) {
    const declared = Number(contentLengthHeader);
    if (Number.isFinite(declared) && declared > maxBytes) {
      throw new PayloadTooLargeError();
    }
  }

  let parsed: unknown;

  if (req.body !== undefined) {
    if (Buffer.isBuffer(req.body)) {
      if (req.body.byteLength > maxBytes) throw new PayloadTooLargeError();
      const raw = req.body.toString("utf-8");
      if (!raw.trim()) return {};
      try {
        parsed = JSON.parse(raw);
      } catch {
        throw new MalformedJsonError();
      }
    } else if (typeof req.body === "string") {
      if (Buffer.byteLength(req.body, "utf-8") > maxBytes) throw new PayloadTooLargeError();
      if (!req.body.trim()) return {};
      try {
        parsed = JSON.parse(req.body);
      } catch {
        throw new MalformedJsonError();
      }
    } else if (typeof req.body === "object" && req.body !== null) {
      const serialized = JSON.stringify(req.body);
      if (Buffer.byteLength(serialized, "utf-8") > maxBytes) throw new PayloadTooLargeError();
      parsed = req.body;
    } else {
      throw new MalformedJsonError("Invalid request body type.");
    }
  } else {
    if (req.readableEnded || req.complete || typeof req.on !== "function") {
      return {};
    }

    parsed = await new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      let totalBytes = 0;
      let settled = false;

      const timer = setTimeout(() => {
        if (!settled) {
          settled = true;
          reject(new MalformedJsonError("Request body read timed out."));
        }
      }, 2500);

      req.on("data", (chunk: any) => {
        if (settled) return;
        const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk), "utf-8");
        totalBytes += buf.byteLength;
        if (totalBytes > maxBytes) {
          settled = true;
          clearTimeout(timer);
          reject(new PayloadTooLargeError());
          return;
        }
        chunks.push(buf);
      });

      req.on("end", () => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        const raw = Buffer.concat(chunks).toString("utf-8").trim();
        if (!raw) {
          resolve({});
          return;
        }
        try {
          resolve(JSON.parse(raw));
        } catch {
          reject(new MalformedJsonError());
        }
      });

      req.on("error", () => {
        if (!settled) {
          settled = true;
          clearTimeout(timer);
          reject(new MalformedJsonError("Failed to read request stream."));
        }
      });
    });
  }

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new MalformedJsonError("Request payload must be a JSON object.");
  }

  return parsed as Record<string, unknown>;
}

/**
 * Distributed Rate Limiter & Deduplication Store:
 * - Uses Upstash Redis REST API (UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN)
 *   when configured in Vercel so limits apply globally across all serverless instances.
 * - Falls back gracefully to a bounded in-memory sliding window when Redis is not configured
 *   (intended strictly for single-instance/local development; logs a clear non-fatal notice once).
 */
interface MemoryRateEntry {
  count: number;
  resetAt: number;
}

const memoryCounters = new Map<string, MemoryRateEntry>();
const memoryDedup = new Map<string, number>();
let warnedMissingRedis = false;

function getUpstashConfig(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (url && token && url.startsWith("https://")) {
    return { url: url.replace(/\/+$/, ""), token };
  }
  return null;
}

export function hashIdentifier(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex").slice(0, 32);
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
  backend: "upstash-redis" | "in-memory-fallback";
}

export async function checkRateLimit(
  namespace: string,
  identifier: string,
  maxRequests: number,
  windowSeconds: number
): Promise<RateLimitResult> {
  const hashedId = hashIdentifier(identifier);
  const key = `rl:${namespace}:${hashedId}`;
  const upstash = getUpstashConfig();

  if (upstash) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2500);

      // Atomic pipeline: INCR key, TTL key
      const res = await fetch(`${upstash.url}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${upstash.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", key],
          ["TTL", key],
        ]),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (res.ok) {
        const results = (await res.json()) as Array<{ result?: number }>;
        const count = Number(results?.[0]?.result ?? 1);
        let ttl = Number(results?.[1]?.result ?? -1);

        if (count === 1 || ttl < 0) {
          await fetch(`${upstash.url}/expire/${encodeURIComponent(key)}/${windowSeconds}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${upstash.token}` },
          }).catch(() => {});
          ttl = windowSeconds;
        }

        const remaining = Math.max(0, maxRequests - count);
        return {
          allowed: count <= maxRequests,
          remaining,
          retryAfterSeconds: Math.max(1, ttl),
          backend: "upstash-redis",
        };
      }
      console.warn(`[RateLimiter] Upstash REST returned HTTP ${res.status}; falling back to local limiter.`);
    } catch (err: any) {
      console.warn("[RateLimiter] Upstash REST unreachable; falling back to local limiter:", err?.message || "timeout");
    }
  } else if (!warnedMissingRedis && process.env.NODE_ENV === "production") {
    warnedMissingRedis = true;
    console.warn(
      "[RateLimiter] UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN not configured. " +
      "Using per-instance memory limiter (not shared across Vercel serverless isolates)."
    );
  }

  // Bounded in-memory fallback
  const now = Date.now();
  if (memoryCounters.size > 1000) {
    for (const [k, entry] of memoryCounters.entries()) {
      if (now >= entry.resetAt) memoryCounters.delete(k);
    }
  }

  const existing = memoryCounters.get(key);
  if (!existing || now >= existing.resetAt) {
    memoryCounters.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return {
      allowed: true,
      remaining: Math.max(0, maxRequests - 1),
      retryAfterSeconds: windowSeconds,
      backend: "in-memory-fallback",
    };
  }

  existing.count += 1;
  const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
  return {
    allowed: existing.count <= maxRequests,
    remaining: Math.max(0, maxRequests - existing.count),
    retryAfterSeconds,
    backend: "in-memory-fallback",
  };
}

/**
 * Checks and records a submission fingerprint to block duplicate rapid replays.
 * Returns true if the submission is a duplicate within ttlSeconds.
 */
export async function checkAndMarkDuplicate(
  namespace: string,
  fingerprint: string,
  ttlSeconds: number
): Promise<boolean> {
  const key = `dedup:${namespace}:${hashIdentifier(fingerprint)}`;
  const upstash = getUpstashConfig();

  if (upstash) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2500);
      const res = await fetch(`${upstash.url}/set/${encodeURIComponent(key)}/1?NX=true&EX=${ttlSeconds}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${upstash.token}` },
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (res.ok) {
        const data = (await res.json()) as { result?: string | null };
        // Redis SET NX returns "OK" if newly created, null if key already existed (duplicate)
        return data.result === null;
      }
    } catch {
      // Fallback safely to in-memory dedup check below
    }
  }

  const now = Date.now();
  if (memoryDedup.size > 1000) {
    for (const [k, expiresAt] of memoryDedup.entries()) {
      if (now >= expiresAt) memoryDedup.delete(k);
    }
  }
  const expiresAt = memoryDedup.get(key);
  if (expiresAt && now < expiresAt) {
    return true;
  }
  memoryDedup.set(key, now + ttlSeconds * 1000);
  return false;
}
