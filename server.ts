import express, { NextFunction, Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import contactHandler from "./api/contact";
import chatHandler from "./api/chat";
import healthHandler from "./api/health";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Remove framework fingerprint header
app.disable("x-powered-by");

// Apply consistent baseline HTTP security headers
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  if (process.env.NODE_ENV === "production") {
    res.setHeader("Strict-Transport-Security", "max-age=31536000");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; style-src-elem 'self' https://fonts.googleapis.com 'unsafe-inline'; style-src-attr 'unsafe-inline'; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' https://xd92d5z735f07l9p.public.blob.vercel-storage.com data: blob:; media-src 'self' https://xd92d5z735f07l9p.public.blob.vercel-storage.com; connect-src 'self' https://aniketdubey.com https://www.aniketdubey.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'"
    );
  }
  next();
});

// Strict request body cap for API JSON parsing
app.use(express.json({ limit: "32kb" }));

// Handle Express JSON syntax / entity-too-large errors without exposing stack traces
app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
  if (err?.type === "entity.too.large") {
    return res.status(413).json({ success: false, error: "Request body exceeds maximum allowed size." });
  }
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ success: false, error: "Malformed JSON request body." });
  }
  return next(err);
});

// Robots and Sitemap routes
const ROBOTS_CONTENT = `User-agent: *

# Allow crawling of all public website pages
Allow: /

# Sitemap location
Sitemap: https://aniketdubey.com/sitemap.xml
Sitemap: https://www.aniketdubey.com/sitemap.xml
`;

app.get(["/robots.txt", "/robots.text"], (_req, res) => {
  res.type("text/plain");
  res.send(ROBOTS_CONTENT);
});

app.get("/sitemap.xml", (_req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "sitemap.xml"));
});

// Unified API handlers (shared identically with Vercel serverless functions)
app.all("/api/health", (req, res) => healthHandler(req, res));
app.all("/api/contact", (req, res) => contactHandler(req, res));
app.all("/api/chat", (req, res) => chatHandler(req, res));

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Express 5 compatible SPA catch-all middleware (avoids path-to-regexp '*' PathError)
    app.use((_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Aniket Dubey Consulting website server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
