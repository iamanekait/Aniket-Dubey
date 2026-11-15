import nodemailer from "nodemailer";
import {
  applyCorsAndSecurityHeaders,
  checkAndMarkDuplicate,
  checkRateLimit,
  getTrustedClientIp,
  MalformedJsonError,
  parseJsonBodyStrict,
  PayloadTooLargeError,
  sendJson,
} from "./_lib/security.js";

// Target primary recipient — exclusively email@aniketdubey.com
const TARGET_RECIPIENT_EMAIL = "email@aniketdubey.com";
const MAX_CONTACT_BODY_BYTES = 16384;

const ALLOWED_CONTACT_FIELDS = new Set([
  "name",
  "business",
  "email",
  "phone",
  "service",
  "message",
  "website_hp",
  "_rendered_at",
]);

export interface SanitizedEnquiry {
  id: string;
  name: string;
  business: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  submittedAt: string;
}

// Mask sensitive identifiers in server-side logs (never expose secrets or raw passwords)
function maskUser(user?: string): string {
  if (!user) return "[NOT SET]";
  const parts = user.split("@");
  if (parts.length === 2) {
    const name = parts[0];
    const domain = parts[1];
    const maskedName = name.length > 2 ? `${name.slice(0, 2)}***` : `${name}***`;
    return `${maskedName}@${domain}`;
  }
  return user.length > 4 ? `${user.slice(0, 3)}***` : "***";
}

// Strip balanced outer quotes and surrounding whitespace safely
function cleanVal(val?: string): string | undefined {
  if (!val) return undefined;
  let trimmed = val.trim();
  while (
    (trimmed.startsWith('"') && trimmed.endsWith('"') && trimmed.length >= 2) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'") && trimmed.length >= 2)
  ) {
    trimmed = trimmed.slice(1, -1).trim();
  }
  return trimmed.length > 0 ? trimmed : undefined;
}

/**
 * Resolve ONLY private server-side environment variables.
 * Strictly ignores VITE_* and NEXT_PUBLIC_* prefixes so server secrets
 * are never read from client-exposed variable namespaces.
 */
function resolveServerEnv(...candidates: string[]): string | undefined {
  const envKeys = Object.keys(process.env);
  for (const name of candidates) {
    if (process.env[name]) {
      const v = cleanVal(process.env[name]);
      if (v) return v;
    }
    const lowerName = name.toLowerCase();
    const foundKey = envKeys.find(
      (k) =>
        k.toLowerCase() === lowerName &&
        !k.toUpperCase().startsWith("VITE_") &&
        !k.toUpperCase().startsWith("NEXT_PUBLIC_")
    );
    if (foundKey && process.env[foundKey]) {
      const v = cleanVal(process.env[foundKey]);
      if (v) return v;
    }
  }
  return undefined;
}

// Normalize From header to guaranteed valid RFC 5322 format owned by application
function normalizeFrom(rawFrom?: string, defaultUser?: string): string {
  if (!rawFrom) {
    return `"Aniket Dubey Business Advisory" <${defaultUser || TARGET_RECIPIENT_EMAIL}>`;
  }
  const cleaned = rawFrom.replace(/[\r\n\0]/g, " ").trim();
  const match = cleaned.match(/^(.*?)\s*<([^>]+)>/);
  if (match) {
    const rawName = match[1].replace(/["'\\]/g, "").trim();
    const emailAddr = match[2].replace(/["'\s\\]/g, "").trim();
    const displayName = rawName || "Aniket Dubey Business Advisory";
    return `"${displayName}" <${emailAddr}>`;
  }
  const bareEmail = cleaned.replace(/["'\s\\]/g, "");
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bareEmail)) {
    return `"Aniket Dubey Business Advisory" <${bareEmail}>`;
  }
  return `"Aniket Dubey Business Advisory" <${defaultUser || TARGET_RECIPIENT_EMAIL}>`;
}

/**
 * Reusable HTML & attribute escaping utilities to prevent HTML injection in emails.
 */
export function escapeHtml(input: string): string {
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function escapeHtmlAttr(input: string): string {
  return escapeHtml(input).replace(/`/g, "&#96;");
}

// Sanitize header-bound single-line fields (eliminates CRLF / null-byte injection)
export function sanitizeHeaderText(str: string, maxLen: number): string {
  return str.replace(/[\r\n\0\t]+/g, " ").replace(/\s{2,}/g, " ").trim().slice(0, maxLen);
}

// Strict email format validation preventing header injection and angle-bracket spoofing
const STRICT_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
const PHONE_ALLOWED_REGEX = /^[+0-9()\-\s.]{6,30}$/;

function isSafeTelValue(phone: string): boolean {
  return PHONE_ALLOWED_REGEX.test(phone);
}

function formatSafeTelHref(phone: string): string | null {
  if (!isSafeTelValue(phone)) return null;
  const normalized = phone.replace(/[^+0-9]/g, "");
  if (normalized.length < 6) return null;
  return `tel:${normalized}`;
}

/**
 * Builds plain-text and HTML email bodies with complete HTML escaping and
 * validated href URI schemes (`mailto:` and `tel:` only).
 */
export function buildContactEmailTemplates(
  enquiry: SanitizedEnquiry,
  clientIp: string
): { subject: string; plainText: string; htmlContent: string; mailtoUrl: string } {
  const subject = sanitizeHeaderText(
    `[New Consultation Enquiry] ${enquiry.name} (${enquiry.business}) - ${enquiry.service} [Ref: ${enquiry.id}]`,
    220
  );

  const plainText = `NEW CONSULTATION ENQUIRY — DUBEY CONGLOMERATE
============================================================
Reference ID:    ${enquiry.id}
Date & Time:     ${new Date(enquiry.submittedAt).toUTCString()}
Client IP:       ${clientIp}

CLIENT CONTACT DETAILS:
------------------------------------------------------------
Full Name:       ${enquiry.name}
Organization:    ${enquiry.business}
Client Email:    ${enquiry.email}
Contact Phone:   ${enquiry.phone}

SERVICE REQUESTED:
------------------------------------------------------------
Service Pillar:  ${enquiry.service}

BUSINESS OVERVIEW & OBJECTIVES:
------------------------------------------------------------
${enquiry.message}

============================================================
Target Destination: ${TARGET_RECIPIENT_EMAIL}
Website: aniketdubey.com (Dubey Conglomerate)
Direct reply to this email will respond to: ${enquiry.email}
`;

  const escId = escapeHtml(enquiry.id);
  const escName = escapeHtml(enquiry.name);
  const escBusiness = escapeHtml(enquiry.business);
  const escEmail = escapeHtml(enquiry.email);
  const escPhone = escapeHtml(enquiry.phone);
  const escService = escapeHtml(enquiry.service);
  const escMessage = escapeHtml(enquiry.message);
  const escRecipient = escapeHtml(TARGET_RECIPIENT_EMAIL);

  const safeMailtoHref = STRICT_EMAIL_REGEX.test(enquiry.email)
    ? `mailto:${escapeHtmlAttr(encodeURIComponent(enquiry.email).replace(/%40/g, "@"))}`
    : null;
  const safeTelHref = formatSafeTelHref(enquiry.phone);

  const emailCellHtml = safeMailtoHref
    ? `<a href="${safeMailtoHref}" style="color: #D15301; text-decoration: none; font-weight: 600;">${escEmail}</a>`
    : `<span style="color: #F5F2ED;">${escEmail}</span>`;

  const phoneCellHtml = safeTelHref
    ? `<a href="${escapeHtmlAttr(safeTelHref)}" style="color: #D15301; text-decoration: none;">${escPhone}</a>`
    : `<span style="color: #F5F2ED;">${escPhone}</span>`;

  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Consultation Enquiry</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #080808; color: #F5F2ED; margin: 0; padding: 24px; }
    .card { max-width: 620px; margin: 0 auto; background-color: #121212; border: 1px solid #292929; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.8); }
    .header { background: linear-gradient(135deg, #642E02 0%, #D15301 50%, #B94700 100%); padding: 26px 28px; color: #ffffff; }
    .header h1 { margin: 0 0 4px 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em; }
    .header p { margin: 0; font-size: 13px; opacity: 0.95; }
    .badge { display: inline-block; padding: 4px 10px; background-color: rgba(0,0,0,0.3); border-radius: 6px; font-size: 11px; font-weight: 700; margin-top: 10px; font-family: monospace; letter-spacing: 0.05em; }
    .content { padding: 28px; }
    .row { margin-bottom: 18px; }
    .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #A6A6A6; margin-bottom: 4px; }
    .value { font-size: 15px; color: #F5F2ED; font-weight: 500; }
    .msg-box { background-color: #080808; border: 1px solid #292929; border-radius: 10px; padding: 16px; font-size: 14px; color: #F5F2ED; line-height: 1.65; white-space: pre-wrap; margin-top: 4px; }
    .recipients { background-color: #080808; border-left: 3px solid #D15301; border-radius: 6px; padding: 12px 14px; font-size: 12px; color: #A6A6A6; margin-top: 20px; }
    .footer { padding: 16px 28px; background-color: #030303; border-top: 1px solid #292929; font-size: 12px; color: #A6A6A6; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>New Consultation Enquiry</h1>
      <p>Dubey Conglomerate — Aniket Dubey Advisory Platform</p>
      <span class="badge">REF: ${escId}</span>
    </div>
    <div class="content">
      <div class="row">
        <div class="label">Client Name</div>
        <div class="value">${escName}</div>
      </div>
      <div class="row">
        <div class="label">Company / Organization</div>
        <div class="value">${escBusiness}</div>
      </div>
      <div class="row">
        <div class="label">Client Email</div>
        <div class="value">${emailCellHtml}</div>
      </div>
      <div class="row">
        <div class="label">Contact Phone</div>
        <div class="value">${phoneCellHtml}</div>
      </div>
      <div class="row">
        <div class="label">Primary Service Required</div>
        <div class="value" style="color: #FFA86B; font-weight: 700;">${escService}</div>
      </div>
      <div class="row">
        <div class="label">Business Overview &amp; Objectives</div>
        <div class="msg-box">${escMessage}</div>
      </div>
      <div class="recipients">
        <strong style="color: #F5F2ED;">Direct Notification Destination:</strong><br/>
        ${escRecipient}
      </div>
    </div>
    <div class="footer">
      Automated consultation delivery service • Dubey Conglomerate (aniketdubey.com)
    </div>
  </div>
</body>
</html>
`;

  const mailtoSubject = encodeURIComponent(
    `Consultation Request: ${enquiry.name} - ${enquiry.service} [Ref: ${enquiry.id}]`
  );
  const mailtoBody = encodeURIComponent(
    `Consultation Request Details:\n` +
      `----------------------------------------\n` +
      `Reference ID: ${enquiry.id}\n` +
      `Full Name: ${enquiry.name}\n` +
      `Company / Business: ${enquiry.business}\n` +
      `Client Email: ${enquiry.email}\n` +
      `Contact Phone: ${enquiry.phone}\n` +
      `Service Required: ${enquiry.service}\n` +
      `Date: ${new Date(enquiry.submittedAt).toUTCString()}\n\n` +
      `Business Overview & Objectives:\n${enquiry.message}\n` +
      `----------------------------------------\n` +
      `Sent via Dubey Conglomerate Portal (aniketdubey.com)`
  );
  const mailtoUrl = `mailto:${TARGET_RECIPIENT_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`;

  return { subject, plainText, htmlContent, mailtoUrl };
}

function getSmtpConfig() {
  const host = resolveServerEnv("SMTP_HOST", "SMTP_SERVER", "MAIL_HOST", "MAIL_SERVER", "EMAIL_HOST");
  const portRaw = resolveServerEnv("SMTP_PORT", "MAIL_PORT", "EMAIL_PORT");
  const secureRaw = resolveServerEnv("SMTP_SECURE", "MAIL_SECURE", "EMAIL_SECURE")?.toLowerCase();
  const rawUser = resolveServerEnv(
    "SMTP_USER",
    "SMTP_USERNAME",
    "MAIL_USER",
    "MAIL_USERNAME",
    "EMAIL_USER",
    "GMAIL_USER"
  );
  const rawPass = resolveServerEnv(
    "SMTP_PASS",
    "SMTP_PASSWORD",
    "MAIL_PASS",
    "MAIL_PASSWORD",
    "EMAIL_PASS",
    "GMAIL_APP_PASS",
    "GMAIL_APP_PASSWORD"
  );
  const fromRaw = resolveServerEnv("SMTP_FROM", "MAIL_FROM", "EMAIL_FROM");

  if (!host || !rawUser || !rawPass) {
    return null;
  }

  const portDigits = portRaw ? portRaw.replace(/[^0-9]/g, "") : "";
  const parsedPort = portDigits ? parseInt(portDigits, 10) : NaN;
  const secure = secureRaw === "true" ? true : secureRaw === "false" ? false : parsedPort === 465;
  const port = !isNaN(parsedPort) && parsedPort > 0 && parsedPort <= 65535 ? parsedPort : secure ? 465 : 587;

  const user = rawUser.replace(/[\s"'\\]+/g, "");
  const isGoogle = host.includes("gmail.com") || user.includes("@gmail.com");
  const pass = isGoogle
    ? rawPass.replace(/[\s"'\\]+/g, "")
    : rawPass.replace(/^["']+|["']+$/g, "").trim();

  const from = normalizeFrom(fromRaw, user);

  return { host, port, secure, user, pass, from };
}

/**
 * 1. Primary SMTP Dispatcher via Nodemailer (with strict TLS certificate verification)
 */
async function sendViaSmtp(
  enquiry: SanitizedEnquiry,
  subject: string,
  htmlContent: string,
  plainText: string
): Promise<{ success: boolean; messageId?: string; errorCode?: string }> {
  const config = getSmtpConfig();
  if (!config) {
    return { success: false, errorCode: "CONFIG_MISSING" };
  }

  console.log(
    `[SMTP Dispatch] Connecting to ${config.host}:${config.port} | Secure: ${config.secure} | User: ${maskUser(config.user)}`
  );

  const isGmail = config.host.includes("gmail.com") || config.user.includes("@gmail.com");

  const transporter = nodemailer.createTransport(
    isGmail
      ? {
          service: "gmail",
          auth: {
            user: config.user,
            pass: config.pass,
          },
          connectionTimeout: 10000,
          greetingTimeout: 6000,
          socketTimeout: 15000,
          tls: {
            rejectUnauthorized: true,
            minVersion: "TLSv1.2",
          },
        }
      : {
          host: config.host,
          port: config.port,
          secure: config.secure,
          auth: {
            user: config.user,
            pass: config.pass,
          },
          connectionTimeout: 10000,
          greetingTimeout: 6000,
          socketTimeout: 15000,
          tls: {
            rejectUnauthorized: true,
            minVersion: "TLSv1.2",
          },
        }
  );

  try {
    const info = await transporter.sendMail({
      from: config.from,
      to: TARGET_RECIPIENT_EMAIL,
      replyTo: enquiry.email,
      subject,
      text: plainText,
      html: htmlContent,
    });

    console.log(`[SMTP Success] Accepted by ${config.host}. Message-ID: ${info.messageId || "ok"}`);
    return { success: true, messageId: info.messageId };
  } catch (smtpErr: any) {
    const code = String(smtpErr?.code || "SMTP_SEND_FAILED");
    const msg = String(smtpErr?.message || "Unknown SMTP error").slice(0, 180);
    console.error(`[SMTP Failure] Host: ${config.host}:${config.port} | Code: ${code} | Msg: ${msg}`);
    return { success: false, errorCode: code };
  }
}

/**
 * 2. Secondary Provider: Resend API (HTTPS)
 */
async function sendViaResend(
  enquiry: SanitizedEnquiry,
  subject: string,
  htmlContent: string,
  plainText: string
): Promise<{ success: boolean; messageId?: string; errorCode?: string }> {
  const apiKey = resolveServerEnv("RESEND_API_KEY");
  if (!apiKey) return { success: false, errorCode: "RESEND_NOT_CONFIGURED" };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const from = resolveServerEnv("RESEND_FROM") || "Aniket Dubey Advisory <onboarding@resend.dev>";
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: [TARGET_RECIPIENT_EMAIL],
        reply_to: enquiry.email,
        subject,
        text: plainText,
        html: htmlContent,
      }),
      signal: controller.signal,
    });

    const resData: any = await res.json().catch(() => ({}));
    if (res.ok) {
      console.log(`[Resend Success] Delivered ID: ${resData.id || "ok"}`);
      return { success: true, messageId: resData.id };
    }
    console.error(`[Resend Failure] HTTP ${res.status}`);
    return { success: false, errorCode: "RESEND_ERROR" };
  } catch (err: any) {
    console.error("[Resend Error] Network/timeout:", err?.name || "Error");
    return { success: false, errorCode: "RESEND_NETWORK" };
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * 3. Secondary Provider: Brevo API (HTTPS)
 */
async function sendViaBrevo(
  enquiry: SanitizedEnquiry,
  subject: string,
  htmlContent: string,
  plainText: string
): Promise<{ success: boolean; messageId?: string; errorCode?: string }> {
  const apiKey = resolveServerEnv("BREVO_API_KEY");
  if (!apiKey) return { success: false, errorCode: "BREVO_NOT_CONFIGURED" };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const senderEmail = resolveServerEnv("BREVO_SENDER") || TARGET_RECIPIENT_EMAIL;
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: { name: "Aniket Dubey Advisory Portal", email: senderEmail },
        to: [{ email: TARGET_RECIPIENT_EMAIL, name: "Aniket Dubey" }],
        replyTo: { email: enquiry.email, name: enquiry.name },
        subject,
        htmlContent,
        textContent: plainText,
      }),
      signal: controller.signal,
    });

    const resData: any = await res.json().catch(() => ({}));
    if (res.ok) {
      console.log(`[Brevo Success] Delivered MessageId: ${resData.messageId || "ok"}`);
      return { success: true, messageId: resData.messageId };
    }
    console.error(`[Brevo Failure] HTTP ${res.status}`);
    return { success: false, errorCode: "BREVO_ERROR" };
  } catch (err: any) {
    console.error("[Brevo Error] Network/timeout:", err?.name || "Error");
    return { success: false, errorCode: "BREVO_NETWORK" };
  } finally {
    clearTimeout(timeout);
  }
}

export default async function handler(req: any, res: any) {
  // 1. Strict allowlisted CORS & security headers
  const { allowed, isPreflight } = applyCorsAndSecurityHeaders(req, res, ["POST", "OPTIONS"]);
  if (!allowed || isPreflight) return;

  // Public GET diagnostics strictly removed; only POST is supported
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return sendJson(res, 405, { success: false, error: "Method not allowed. Use POST." });
  }

  try {
    // 2. Strict JSON parsing & size limit (16 KB)
    let body: Record<string, unknown>;
    try {
      body = await parseJsonBodyStrict(req, MAX_CONTACT_BODY_BYTES);
    } catch (err) {
      if (err instanceof PayloadTooLargeError) {
        return sendJson(res, 413, { success: false, error: "Request body exceeds maximum allowed size." });
      }
      if (err instanceof MalformedJsonError) {
        return sendJson(res, 400, { success: false, error: "Malformed JSON request body." });
      }
      throw err;
    }

    // Reject unexpected payload fields
    for (const key of Object.keys(body)) {
      if (!ALLOWED_CONTACT_FIELDS.has(key)) {
        return sendJson(res, 400, { success: false, error: "Unexpected field in contact request." });
      }
    }

    const { name, business, email, phone, service, message, website_hp, _rendered_at } = body;

    // Type checks for all supplied fields
    if (
      (name !== undefined && typeof name !== "string") ||
      (business !== undefined && typeof business !== "string") ||
      (email !== undefined && typeof email !== "string") ||
      (phone !== undefined && typeof phone !== "string") ||
      (service !== undefined && typeof service !== "string") ||
      (message !== undefined && typeof message !== "string") ||
      (website_hp !== undefined && typeof website_hp !== "string") ||
      (_rendered_at !== undefined && typeof _rendered_at !== "number")
    ) {
      return sendJson(res, 400, { success: false, error: "Invalid field data type in submission." });
    }

    const clientIp = getTrustedClientIp(req);

    // 3. Anti-spam: Honeypot check
    if (typeof website_hp === "string" && website_hp.trim().length > 0) {
      console.warn(`[Anti-Spam] Honeypot triggered from IP hash`);
      return sendJson(res, 200, {
        success: true,
        referenceId: `SPM-${Date.now()}`,
        message: "Enquiry received.",
      });
    }

    // 4. Anti-spam: Minimum form render delay check (1.2s)
    if (typeof _rendered_at === "number" && Number.isFinite(_rendered_at)) {
      const elapsed = Date.now() - _rendered_at;
      if (elapsed >= 0 && elapsed < 1200) {
        console.warn(`[Anti-Spam] Submission too fast (${elapsed}ms).`);
        return sendJson(res, 400, {
          success: false,
          error: "Form submitted too quickly. Please wait a moment and try again.",
        });
      }
    }

    // 5. Server-side validation & length caps
    const cleanName = typeof name === "string" ? sanitizeHeaderText(name, 100) : "";
    if (cleanName.length < 2 || cleanName.length > 100) {
      return sendJson(res, 400, {
        success: false,
        error: "Please provide your Full Name (2 to 100 characters).",
      });
    }

    const rawBusiness = typeof business === "string" ? sanitizeHeaderText(business, 120) : "";
    if (typeof business === "string" && business.trim().length > 120) {
      return sendJson(res, 400, {
        success: false,
        error: "Business or Company name must not exceed 120 characters.",
      });
    }

    const cleanEmail = typeof email === "string" ? sanitizeHeaderText(email, 100).toLowerCase() : "";
    if (!cleanEmail || cleanEmail.length > 100 || !STRICT_EMAIL_REGEX.test(cleanEmail)) {
      return sendJson(res, 400, {
        success: false,
        error: "Please provide a valid email address.",
      });
    }

    const rawPhone = typeof phone === "string" ? sanitizeHeaderText(phone, 30) : "";
    if (rawPhone && !isSafeTelValue(rawPhone)) {
      return sendJson(res, 400, {
        success: false,
        error: "Please provide a valid contact phone number (digits, spaces, +, -, parentheses).",
      });
    }

    const cleanService = typeof service === "string" && service.trim()
      ? sanitizeHeaderText(service, 120)
      : "General Strategic Consulting";
    if (typeof service === "string" && service.trim().length > 120) {
      return sendJson(res, 400, {
        success: false,
        error: "Service selection must not exceed 120 characters.",
      });
    }

    const cleanMessage = typeof message === "string" ? message.replace(/\0/g, "").trim() : "";
    if (cleanMessage.length < 10) {
      return sendJson(res, 400, {
        success: false,
        error: "Please provide a brief message describing your business objectives (at least 10 characters).",
      });
    }
    if (cleanMessage.length > 4000) {
      return sendJson(res, 400, {
        success: false,
        error: "Message must not exceed 4000 characters.",
      });
    }

    // 6. Distributed Rate Limiting (max 5 requests / 60s per trusted IP) & Duplicate Check (60s TTL)
    const rate = await checkRateLimit("contact", clientIp, 5, 60);
    if (!rate.allowed) {
      res.setHeader("Retry-After", String(rate.retryAfterSeconds));
      return sendJson(res, 429, {
        success: false,
        error: "Too many consultation requests sent recently. Please wait a minute before trying again.",
      });
    }

    const duplicateFingerprint = `${cleanEmail}|${cleanMessage.slice(0, 120)}`;
    const isDuplicate = await checkAndMarkDuplicate("contact", duplicateFingerprint, 60);
    if (isDuplicate) {
      return sendJson(res, 409, {
        success: false,
        error: "Duplicate submission detected. Your enquiry has already been transmitted.",
      });
    }

    // 7. Build escaped email templates
    const id = `ENQ-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
    const enquiry: SanitizedEnquiry = {
      id,
      name: cleanName,
      business: rawBusiness || "Individual",
      email: cleanEmail,
      phone: rawPhone || "Not provided",
      service: cleanService,
      message: cleanMessage,
      submittedAt: new Date().toISOString(),
    };

    const { subject, plainText, htmlContent, mailtoUrl } = buildContactEmailTemplates(
      enquiry,
      clientIp
    );

    const smtpCfg = getSmtpConfig();

    // 8. Email delivery via server-side providers only (SMTP -> Resend -> Brevo)
    if (smtpCfg) {
      const smtpRes = await sendViaSmtp(enquiry, subject, htmlContent, plainText);
      if (smtpRes.success) {
        return sendJson(res, 200, {
          success: true,
          delivered: true,
          referenceId: enquiry.id,
          recipient: TARGET_RECIPIENT_EMAIL,
          mailtoUrl,
          enquiry: {
            id: enquiry.id,
            name: enquiry.name,
            business: enquiry.business,
            email: enquiry.email,
            phone: enquiry.phone,
            service: enquiry.service,
            submittedAt: enquiry.submittedAt,
          },
          message: `Your consultation request has been delivered to ${TARGET_RECIPIENT_EMAIL}. Aniket Dubey will review your business requirements personally.`,
        });
      }
    }

    if (resolveServerEnv("RESEND_API_KEY")) {
      const resendRes = await sendViaResend(enquiry, subject, htmlContent, plainText);
      if (resendRes.success) {
        return sendJson(res, 200, {
          success: true,
          delivered: true,
          referenceId: enquiry.id,
          recipient: TARGET_RECIPIENT_EMAIL,
          mailtoUrl,
          enquiry: {
            id: enquiry.id,
            name: enquiry.name,
            business: enquiry.business,
            email: enquiry.email,
            phone: enquiry.phone,
            service: enquiry.service,
            submittedAt: enquiry.submittedAt,
          },
          message: `Your consultation request has been delivered to ${TARGET_RECIPIENT_EMAIL}. Aniket Dubey will review your business requirements personally.`,
        });
      }
    }

    if (resolveServerEnv("BREVO_API_KEY")) {
      const brevoRes = await sendViaBrevo(enquiry, subject, htmlContent, plainText);
      if (brevoRes.success) {
        return sendJson(res, 200, {
          success: true,
          delivered: true,
          referenceId: enquiry.id,
          recipient: TARGET_RECIPIENT_EMAIL,
          mailtoUrl,
          enquiry: {
            id: enquiry.id,
            name: enquiry.name,
            business: enquiry.business,
            email: enquiry.email,
            phone: enquiry.phone,
            service: enquiry.service,
            submittedAt: enquiry.submittedAt,
          },
          message: `Your consultation request has been delivered to ${TARGET_RECIPIENT_EMAIL}. Aniket Dubey will review your business requirements personally.`,
        });
      }
    }

    // 9. Delivery failed or no mail provider configured: never return HTTP 200 and never expose internal infra details
    console.error(`[Enquiry Delivery Failed] Reference ${enquiry.id} could not be dispatched.`);
    return sendJson(res, 503, {
      success: false,
      delivered: false,
      referenceId: enquiry.id,
      recipient: TARGET_RECIPIENT_EMAIL,
      error: `We could not automatically dispatch your request right now. Please click 'Launch Email App' below or email ${TARGET_RECIPIENT_EMAIL} directly.`,
      mailtoUrl,
    });
  } catch (error) {
    console.error("[Server Error in /api/contact]:", error instanceof Error ? error.name : "Error");
    return sendJson(res, 500, {
      success: false,
      error:
        "An internal server error occurred while processing your enquiry. Please reach out directly at email@aniketdubey.com or +91 9932979875.",
    });
  }
}
