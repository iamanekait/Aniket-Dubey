import nodemailer from "nodemailer";

// Target primary recipient — exclusively email@aniketdubey.com
const TARGET_RECIPIENT_EMAIL = "email@aniketdubey.com";

interface EnquiryPayload {
  name: string;
  business?: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  // Anti-spam fields
  website_hp?: string; // Honeypot field (must be empty)
  _rendered_at?: number; // Form render timestamp (ms)
}

// In-memory rate limiting and deduplication
interface SubmissionRecord {
  timestamp: number;
  hash: string;
}
const recentSubmissions = new Map<string, SubmissionRecord>();

// Helper to mask sensitive credentials in server logs
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

function maskKey(key?: string): string {
  if (!key) return "[NOT SET]";
  if (key.length <= 6) return "***";
  return `${key.slice(0, 4)}...${key.slice(-3)}`;
}

// Safely parse request body across Vercel serverless, Express, and raw Node.js runtimes without hanging
async function getRequestBody(req: any): Promise<any> {
  // 1. If already parsed as an object (standard Express / Vercel with json body)
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) {
    return req.body;
  }
  // 2. If body is a string
  if (typeof req.body === "string" && req.body.trim().length > 0) {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  // 3. If body is a Buffer
  if (Buffer.isBuffer(req.body)) {
    try {
      return JSON.parse(req.body.toString("utf-8"));
    } catch {
      return {};
    }
  }
  // 4. If stream has already ended or not readable, do not wait
  if (req.readableEnded || req.complete || typeof req.on !== "function") {
    return {};
  }
  // 5. If stream is readable, read chunks with a safety timeout
  return new Promise((resolve) => {
    let raw = "";
    const timeout = setTimeout(() => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    }, 2000);

    req.on("data", (chunk: any) => {
      raw += chunk;
    });
    req.on("end", () => {
      clearTimeout(timeout);
      if (!raw || !raw.trim()) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch {
        resolve({});
      }
    });
    req.on("error", () => {
      clearTimeout(timeout);
      resolve({});
    });
  });
}

// Universal response helper compatible with both Vercel helper and raw Node ServerResponse
function sendJsonResponse(res: any, status: number, data: any) {
  if (typeof res.status === "function" && typeof res.json === "function") {
    return res.status(status).json(data);
  }
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(data));
}

// Sanitize string to prevent email injection / header tampering
function sanitize(str?: string): string {
  if (!str) return "";
  return String(str).replace(/[\r\n]/g, " ").trim();
}

/**
 * Strict parser for exact SMTP environment variables:
 * - SMTP_HOST
 * - SMTP_PORT
 * - SMTP_SECURE
 * - SMTP_USER
 * - SMTP_PASS
 * - SMTP_FROM
 */
function getSmtpConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const portRaw = process.env.SMTP_PORT?.trim();
  const secureRaw = process.env.SMTP_SECURE?.trim().toLowerCase();
  const user = (process.env.SMTP_USER || process.env.GMAIL_USER || process.env.EMAIL_USER)?.trim();
  const rawPass = (
    process.env.SMTP_PASS ||
    process.env.SMTP_PASSWORD ||
    process.env.GMAIL_APP_PASS ||
    process.env.GMAIL_APP_PASSWORD ||
    process.env.EMAIL_PASS
  )?.trim();
  const from = (process.env.SMTP_FROM || process.env.EMAIL_FROM)?.trim();

  if (!host || !user || !rawPass) {
    return null;
  }

  const port = portRaw ? parseInt(portRaw, 10) : 587;
  // If explicitly 'true'/'false', respect it; otherwise default: true if 465, false if 587
  const secure = secureRaw === "true" ? true : secureRaw === "false" ? false : port === 465;

  // Sanitize password (strips accidental spaces from Google 16-character App Passwords "xxxx xxxx xxxx xxxx")
  const pass = (host.includes("gmail.com") || user.includes("@gmail.com"))
    ? rawPass.replace(/\s+/g, "")
    : rawPass;

  return {
    host,
    port,
    secure,
    user,
    pass,
    from: from || `"Aniket Dubey Business Advisory" <${user}>`,
  };
}

/**
 * 1. Primary SMTP Dispatcher via Nodemailer
 */
async function sendViaSmtp(
  enquiry: any,
  subject: string,
  htmlContent: string,
  plainText: string
): Promise<{ success: boolean; messageId?: string; error?: string; errorCode?: string }> {
  const config = getSmtpConfig();

  if (!config) {
    return {
      success: false,
      error: "SMTP credentials not configured (requires SMTP_HOST, SMTP_USER, and SMTP_PASS)",
      errorCode: "CONFIG_MISSING",
    };
  }

  // Safe server-side diagnostic logging (no passwords exposed)
  console.log(
    `[SMTP Dispatch] Connecting to ${config.host}:${config.port} | Secure: ${config.secure} | User: ${maskUser(config.user)} | From: ${config.from}`
  );

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    // Serverless-optimized connection timeouts to prevent hanging lambdas
    connectionTimeout: 8000,
    greetingTimeout: 5000,
    socketTimeout: 10000,
    tls: {
      rejectUnauthorized: false,
      minVersion: "TLSv1.2",
    },
  });

  try {
    // Explicitly await dispatch
    const info = await transporter.sendMail({
      from: config.from,
      to: TARGET_RECIPIENT_EMAIL,
      replyTo: enquiry.email,
      subject,
      text: plainText,
      html: htmlContent,
    });

    console.log(`[SMTP Success] Email accepted by ${config.host}. Message-ID: ${info.messageId}`);
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (smtpErr: any) {
    const code = smtpErr.code || "SMTP_SEND_FAILED";
    const msg = smtpErr.message || String(smtpErr);
    console.error(`[SMTP Failure] Host: ${config.host}:${config.port} | Code: ${code} | Error: ${msg}`);

    return {
      success: false,
      error: msg,
      errorCode: code,
    };
  }
}

/**
 * 2. Secondary Provider: Resend API (HTTP Port 443)
 */
async function sendViaResend(
  enquiry: any,
  subject: string,
  htmlContent: string,
  plainText: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return { success: false, error: "RESEND_API_KEY is not configured" };

  try {
    const from = process.env.RESEND_FROM?.trim() || "Aniket Dubey Advisory <onboarding@resend.dev>";
    console.log(`[Resend Dispatch] Sending email via Resend API to ${TARGET_RECIPIENT_EMAIL} (From: ${from})`);

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
    });

    const resData: any = await res.json().catch(() => ({}));
    if (res.ok) {
      console.log(`[Resend Success] Email delivered. ID: ${resData.id || "ok"}`);
      return { success: true, messageId: resData.id };
    }
    const errDetail = resData.message || resData.error || `HTTP ${res.status}`;
    console.error(`[Resend Error] API responded with error: ${errDetail}`);
    return { success: false, error: errDetail };
  } catch (err: any) {
    console.error("[Resend Error] Network/fetch failure:", err.message || err);
    return { success: false, error: err.message || "Network failure" };
  }
}

/**
 * 3. Secondary Provider: Brevo / Sendinblue API (HTTP Port 443)
 */
async function sendViaBrevo(
  enquiry: any,
  subject: string,
  htmlContent: string,
  plainText: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const apiKey = process.env.BREVO_API_KEY?.trim();
  if (!apiKey) return { success: false, error: "BREVO_API_KEY is not configured" };

  try {
    const senderEmail = process.env.BREVO_SENDER?.trim() || TARGET_RECIPIENT_EMAIL;
    console.log(`[Brevo Dispatch] Sending email via Brevo API to ${TARGET_RECIPIENT_EMAIL} (Sender: ${senderEmail})`);

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
    });

    const resData: any = await res.json().catch(() => ({}));
    if (res.ok) {
      console.log(`[Brevo Success] Email delivered. MessageId: ${resData.messageId || "ok"}`);
      return { success: true, messageId: resData.messageId };
    }
    const errDetail = resData.message || `HTTP ${res.status}`;
    console.error(`[Brevo Error] API responded with error: ${errDetail}`);
    return { success: false, error: errDetail };
  } catch (err: any) {
    console.error("[Brevo Error] Network/fetch failure:", err.message || err);
    return { success: false, error: err.message || "Network failure" };
  }
}

/**
 * 4. Automated Server-Side Web Relay Fallback
 */
async function sendViaRelay(
  enquiry: any,
  subject: string
): Promise<{ success: boolean; needsActivation: boolean; message: string }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const relayResponse = await fetch(`https://formsubmit.co/ajax/${TARGET_RECIPIENT_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Referer: "https://aniketdubey.com/contact",
        Origin: "https://aniketdubey.com",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({
        _subject: subject,
        _replyto: enquiry.email,
        _captcha: "false",
        _template: "table",
        "Reference ID": enquiry.id,
        "Client Name": enquiry.name,
        "Company / Organization": enquiry.business || "Individual",
        "Client Email": enquiry.email,
        "Contact Phone": enquiry.phone || "Not provided",
        "Service Required": enquiry.service,
        "Objectives & Message": enquiry.message,
        "Destination Inbox": TARGET_RECIPIENT_EMAIL,
        "Submission Time (UTC)": new Date(enquiry.submittedAt).toUTCString(),
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const rawText = await relayResponse.text().catch(() => "");
    let data: any = null;
    try {
      data = JSON.parse(rawText);
    } catch {
      // Body may be plain text or HTML
    }

    const needsActivation = Boolean(
      (data?.message && typeof data.message === "string" && data.message.toLowerCase().includes("activation")) ||
      rawText.toLowerCase().includes("needs activation") ||
      rawText.toLowerCase().includes("activate your form") ||
      rawText.toLowerCase().includes("activate form")
    );

    const success = Boolean(
      (data?.success === true || data?.success === "true") && !needsActivation
    );

    console.log(
      `[Relay Dispatch] Response: success=${success}, needsActivation=${needsActivation}, text=${rawText.slice(0, 100)}`
    );

    return {
      success,
      needsActivation,
      message: data?.message || rawText.slice(0, 200) || "",
    };
  } catch (relayErr: any) {
    console.error("[Relay Error] Failed:", relayErr?.message || relayErr);
    return { success: false, needsActivation: false, message: relayErr?.message || "Relay error" };
  }
}

export default async function handler(req: any, res: any) {
  // Safe CORS configuration for custom domains & previews
  const incomingOrigin = req.headers?.origin || "*";
  res.setHeader("Access-Control-Allow-Origin", incomingOrigin);
  if (incomingOrigin !== "*") {
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    if (typeof res.status === "function") {
      return res.status(200).end();
    }
    res.statusCode = 200;
    return res.end();
  }

  if (req.method !== "POST") {
    return sendJsonResponse(res, 405, { success: false, error: "Method not allowed. Use POST." });
  }

  try {
    const body: EnquiryPayload = await getRequestBody(req);
    const { name, business, email, phone, service, message, website_hp, _rendered_at } = body;

    // 1. Anti-spam: Honeypot check
    if (website_hp && String(website_hp).trim().length > 0) {
      console.warn(`[Anti-Spam] Honeypot triggered from IP: ${req.headers["x-forwarded-for"] || req.socket?.remoteAddress}`);
      // Silent rejection to trick spam bots without dispatching email
      return sendJsonResponse(res, 200, {
        success: true,
        referenceId: `SPM-${Date.now()}`,
        message: "Enquiry received.",
      });
    }

    // 2. Anti-spam: Submission speed check (bots submit in under 1.2 seconds)
    if (_rendered_at && typeof _rendered_at === "number") {
      const elapsed = Date.now() - _rendered_at;
      if (elapsed > 0 && elapsed < 1200) {
        console.warn(`[Anti-Spam] Submission too fast (${elapsed}ms). Suspected bot.`);
        return sendJsonResponse(res, 400, {
          success: false,
          error: "Form submitted unnaturally quickly. Please try again.",
        });
      }
    }

    // 3. Validation
    if (!name || !name.trim()) {
      return sendJsonResponse(res, 400, {
        success: false,
        error: "Please provide your Full Name.",
      });
    }

    if (!email || !email.trim()) {
      return sendJsonResponse(res, 400, {
        success: false,
        error: "Please provide your Email Address.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanEmail = String(email).trim().toLowerCase();
    if (!emailRegex.test(cleanEmail) || cleanEmail.length > 100) {
      return sendJsonResponse(res, 400, {
        success: false,
        error: "Please provide a valid email address.",
      });
    }

    if (!message || !message.trim() || message.trim().length < 10) {
      return sendJsonResponse(res, 400, {
        success: false,
        error: "Please provide a brief message describing your business objectives (at least 10 characters).",
      });
    }

    // 4. Rate Limiting & Duplicate Submission Prevention
    const clientIp = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown").split(",")[0].trim();
    const submissionHash = `${cleanEmail}|${message.trim().slice(0, 60)}`;
    const now = Date.now();

    const previousSubmission = recentSubmissions.get(clientIp);
    if (previousSubmission) {
      // Cooldown: prevent multiple submissions within 8 seconds from same IP
      if (now - previousSubmission.timestamp < 8000) {
        return sendJsonResponse(res, 429, {
          success: false,
          error: "Please wait a moment before submitting another request.",
        });
      }
      // Deduplication: prevent identical message resubmission within 60 seconds
      if (previousSubmission.hash === submissionHash && now - previousSubmission.timestamp < 60000) {
        return sendJsonResponse(res, 409, {
          success: false,
          error: "Duplicate submission detected. Your enquiry has already been transmitted.",
        });
      }
    }
    recentSubmissions.set(clientIp, { timestamp: now, hash: submissionHash });

    // Clean up old rate limit records
    if (recentSubmissions.size > 200) {
      for (const [key, val] of recentSubmissions.entries()) {
        if (now - val.timestamp > 300000) {
          recentSubmissions.delete(key);
        }
      }
    }

    const id = `ENQ-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
    const enquiry = {
      id,
      name: sanitize(name),
      business: sanitize(business) || "Individual",
      email: cleanEmail,
      phone: sanitize(phone) || "Not provided",
      service: sanitize(service) || "General Strategic Consulting",
      message: String(message).trim().slice(0, 4000),
      submittedAt: new Date().toISOString(),
    };

    const subject = `[New Consultation Enquiry] ${enquiry.name} (${enquiry.business}) - ${enquiry.service} [Ref: ${enquiry.id}]`;

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

    const htmlContent = `
<!DOCTYPE html>
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
      <span class="badge">REF: ${enquiry.id}</span>
    </div>
    <div class="content">
      <div class="row">
        <div class="label">Client Name</div>
        <div class="value">${enquiry.name}</div>
      </div>
      <div class="row">
        <div class="label">Company / Organization</div>
        <div class="value">${enquiry.business}</div>
      </div>
      <div class="row">
        <div class="label">Client Email</div>
        <div class="value"><a href="mailto:${enquiry.email}" style="color: #D15301; text-decoration: none; font-weight: 600;">${enquiry.email}</a></div>
      </div>
      <div class="row">
        <div class="label">Contact Phone</div>
        <div class="value"><a href="tel:${enquiry.phone}" style="color: #D15301; text-decoration: none;">${enquiry.phone}</a></div>
      </div>
      <div class="row">
        <div class="label">Primary Service Required</div>
        <div class="value" style="color: #FFA86B; font-weight: 700;">${enquiry.service}</div>
      </div>
      <div class="row">
        <div class="label">Business Overview & Objectives</div>
        <div class="msg-box">${enquiry.message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
      </div>
      <div class="recipients">
        <strong style="color: #F5F2ED;">Direct Notification Destination:</strong><br/>
        ${TARGET_RECIPIENT_EMAIL}
      </div>
    </div>
    <div class="footer">
      Automated consultation delivery service • Dubey Conglomerate (aniketdubey.com)
    </div>
  </div>
</body>
</html>
`;

    // Prepare direct mailto backup URL
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

    // Diagnostic logging without exposing secrets
    const smtpCfg = getSmtpConfig();
    console.log(
      `[Email Config Check] SMTP_HOST: ${smtpCfg?.host || "[NOT SET]"} | ` +
      `SMTP_PORT: ${smtpCfg?.port || "[NOT SET]"} | ` +
      `SMTP_SECURE: ${smtpCfg ? smtpCfg.secure : "[NOT SET]"} | ` +
      `SMTP_USER: ${maskUser(smtpCfg?.user)} | ` +
      `RESEND_API_KEY: ${maskKey(process.env.RESEND_API_KEY)} | ` +
      `BREVO_API_KEY: ${maskKey(process.env.BREVO_API_KEY)}`
    );

    let delivered = false;
    let providerUsed = "";
    let lastError = "";
    let lastErrorCode = "";

    // PRIORITY 1: SMTP via Nodemailer (Matches user's Vercel production env vars)
    if (smtpCfg) {
      const smtpRes = await sendViaSmtp(enquiry, subject, htmlContent, plainText);
      if (smtpRes.success) {
        delivered = true;
        providerUsed = "smtp";
        console.log(`[Enquiry Delivered] Successfully delivered ${enquiry.id} via SMTP to ${TARGET_RECIPIENT_EMAIL}`);
        return sendJsonResponse(res, 200, {
          success: true,
          delivered: true,
          provider: "smtp",
          messageId: smtpRes.messageId,
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
      } else {
        lastError = smtpRes.error || "SMTP delivery failure";
        lastErrorCode = smtpRes.errorCode || "SMTP_ERROR";
      }
    }

    // PRIORITY 2: Resend API (if configured)
    if (!delivered && process.env.RESEND_API_KEY) {
      const resendRes = await sendViaResend(enquiry, subject, htmlContent, plainText);
      if (resendRes.success) {
        delivered = true;
        providerUsed = "resend";
        return sendJsonResponse(res, 200, {
          success: true,
          delivered: true,
          provider: "resend",
          messageId: resendRes.messageId,
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
      } else {
        lastError = resendRes.error || "Resend delivery failure";
        lastErrorCode = "RESEND_ERROR";
      }
    }

    // PRIORITY 3: Brevo API (if configured)
    if (!delivered && process.env.BREVO_API_KEY) {
      const brevoRes = await sendViaBrevo(enquiry, subject, htmlContent, plainText);
      if (brevoRes.success) {
        delivered = true;
        providerUsed = "brevo";
        return sendJsonResponse(res, 200, {
          success: true,
          delivered: true,
          provider: "brevo",
          messageId: brevoRes.messageId,
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
      } else {
        lastError = brevoRes.error || "Brevo delivery failure";
        lastErrorCode = "BREVO_ERROR";
      }
    }

    // PRIORITY 4: Relay Fallback (FormSubmit with browser headers)
    if (!delivered && !smtpCfg) {
      console.log(`[Relay Fallback] No SMTP or API keys configured. Attempting server relay to ${TARGET_RECIPIENT_EMAIL}...`);
      const relayRes = await sendViaRelay(enquiry, subject);
      if (relayRes.success) {
        return sendJsonResponse(res, 200, {
          success: true,
          delivered: true,
          provider: "relay",
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
      } else if (relayRes.needsActivation) {
        return sendJsonResponse(res, 202, {
          success: true,
          delivered: false,
          needsActivation: true,
          referenceId: enquiry.id,
          recipient: TARGET_RECIPIENT_EMAIL,
          mailtoUrl,
          message: `Enquiry recorded! FormSubmit has sent a one-time activation confirmation email to ${TARGET_RECIPIENT_EMAIL}. Please check your inbox and click 'Activate Form' once to enable automatic forwarding.`,
        });
      } else {
        lastError = relayRes.message || "Relay failure";
        lastErrorCode = "RELAY_ERROR";
      }
    }

    // STRICT HONESTY: If email was NOT delivered, NEVER return HTTP 200
    console.error(
      `[Enquiry Delivery Failed] Could not deliver ${enquiry.id} to ${TARGET_RECIPIENT_EMAIL}. Reason: [${lastErrorCode}] ${lastError}`
    );

    const isSmtpFailure = Boolean(smtpCfg);
    const statusCode = isSmtpFailure ? 502 : 503;
    const userErrorMessage = isSmtpFailure
      ? `SMTP delivery to ${TARGET_RECIPIENT_EMAIL} failed (${lastErrorCode}): ${lastError}. Please check your Vercel SMTP credentials.`
      : `Email delivery service is currently unconfigured or unavailable. Please configure SMTP or Resend credentials in Vercel.`;

    return sendJsonResponse(res, statusCode, {
      success: false,
      delivered: false,
      referenceId: enquiry.id,
      recipient: TARGET_RECIPIENT_EMAIL,
      errorCode: lastErrorCode,
      error: userErrorMessage,
      smtpConfig: smtpCfg
        ? {
            host: smtpCfg.host,
            port: smtpCfg.port,
            secure: smtpCfg.secure,
            user: maskUser(smtpCfg.user),
            from: smtpCfg.from,
          }
        : undefined,
      mailtoUrl,
      hint: `You can deliver this enquiry immediately by clicking 'Send Copy via Email Client' below or contacting email@aniketdubey.com directly.`,
    });
  } catch (error: any) {
    console.error("[Fatal Server Error in /api/contact]:", error);
    return sendJsonResponse(res, 500, {
      success: false,
      error: "An internal server error occurred while processing your enquiry. Please reach out directly at email@aniketdubey.com or +91 9932979875.",
    });
  }
}
