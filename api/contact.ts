import nodemailer from "nodemailer";

// Target recipient email - solely email@aniketdubey.com
const TARGET_RECIPIENT_EMAILS = [
  "email@aniketdubey.com",
];

interface EnquiryPayload {
  name: string;
  business?: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

// Safely parse request body across Vercel serverless, Express, and raw Node.js runtimes
async function getRequestBody(req: any): Promise<any> {
  // 1. If already parsed as an object
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
  // 4. If req is an IncomingMessage stream, read it chunks-wise
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (chunk: any) => {
      raw += chunk;
    });
    req.on("end", () => {
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
    req.on("error", () => resolve({}));
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

function createEmailTransporter() {
  const user = process.env.SMTP_USER || process.env.GMAIL_USER || process.env.EMAIL_USER;
  const pass =
    process.env.SMTP_PASS ||
    process.env.SMTP_PASSWORD ||
    process.env.GMAIL_APP_PASS ||
    process.env.GMAIL_APP_PASSWORD ||
    process.env.EMAIL_PASS;
  const host =
    process.env.SMTP_HOST ||
    (user?.includes("@gmail.com") || user?.includes("aniketdubey.com") ? "smtp.gmail.com" : undefined);
  const port = Number(process.env.SMTP_PORT) || (process.env.SMTP_SECURE === "true" ? 465 : 587);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  if (user && pass && host) {
    return nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
      tls: { rejectUnauthorized: false },
    });
  }
  if (user && pass) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
  }
  return null;
}

async function sendViaResend(enquiry: any, subject: string, htmlContent: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || "Dubey Conglomerate <onboarding@resend.dev>",
        to: TARGET_RECIPIENT_EMAILS,
        reply_to: enquiry.email,
        subject,
        html: htmlContent,
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("[Resend Error]", err);
    return false;
  }
}

async function sendViaRelay(enquiry: any, subject: string): Promise<{ sent: boolean; needsActivation: boolean }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const relayResponse = await fetch("https://formsubmit.co/ajax/email@aniketdubey.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "https://dubeyconglomerate.vercel.app",
        Referer: "https://dubeyconglomerate.vercel.app/contact",
        "User-Agent": "Dubey-Conglomerate-Portal/1.0",
      },
      body: JSON.stringify({
        _subject: subject,
        _replyto: enquiry.email,
        _captcha: "false",
        _template: "table",
        "Reference Number": enquiry.id,
        "Client Name": enquiry.name,
        "Organization / Company": enquiry.business || "Not specified",
        "Client Email": enquiry.email,
        "Contact Phone": enquiry.phone || "Not provided",
        "Requested Service": enquiry.service,
        "Objectives & Message": enquiry.message,
        "Target Recipient": "email@aniketdubey.com",
        "Date Submitted": new Date(enquiry.submittedAt).toLocaleString(),
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const data: any = await relayResponse.json().catch(() => null);
    const sent = Boolean(data?.success === true || data?.success === "true");
    const needsActivation = Boolean(
      data?.message && typeof data.message === "string" && data.message.toLowerCase().includes("activation")
    );

    return { sent, needsActivation };
  } catch (relayErr: any) {
    console.error("[FormSubmit Relay Error]", relayErr?.message || relayErr);
    return { sent: false, needsActivation: false };
  }
}

export default async function handler(req: any, res: any) {
  // CORS configuration
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    if (typeof res.status === "function") {
      res.status(200).end();
    } else {
      res.statusCode = 200;
      res.end();
    }
    return;
  }

  if (req.method !== "POST") {
    return sendJsonResponse(res, 405, { success: false, error: "Method not allowed. Use POST." });
  }

  try {
    const body: EnquiryPayload = await getRequestBody(req);
    const { name, business, email, phone, service, message } = body;

    if (!name || !email || !message) {
      return sendJsonResponse(res, 400, {
        success: false,
        error: "Please provide your Name, Email, and Message.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(email).trim())) {
      return sendJsonResponse(res, 400, {
        success: false,
        error: "Please provide a valid email address.",
      });
    }

    const id = `ENQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const enquiry = {
      id,
      name: String(name).trim(),
      business: String(business || "Not specified").trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone || "Not provided").trim(),
      service: String(service || "General Strategic Consulting").trim(),
      message: String(message).trim(),
      submittedAt: new Date().toISOString(),
    };

    const subject = `[New Consultation Enquiry] ${enquiry.name} (${enquiry.business}) - ${enquiry.service} [Ref: ${enquiry.id}]`;

    const plainText = `NEW CONSULTATION ENQUIRY
==================================================
Reference ID:    ${enquiry.id}
Date & Time:     ${new Date(enquiry.submittedAt).toUTCString()}

CLIENT DETAILS:
--------------------------------------------------
Full Name:       ${enquiry.name}
Organization:    ${enquiry.business}
Email Address:   ${enquiry.email}
Phone Number:    ${enquiry.phone}

SERVICE REQUESTED:
--------------------------------------------------
Service Category: ${enquiry.service}

BUSINESS OBJECTIVES & MESSAGE:
--------------------------------------------------
${enquiry.message}

==================================================
Routed automatically to: email@aniketdubey.com
Origin: Dubey Conglomerate - Aniket Dubey Advisory Portal (aniketdubey.com)
`;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #020617; color: #f8fafc; margin: 0; padding: 24px; }
    .card { max-width: 620px; margin: 0 auto; background-color: #0f172a; border: 1px solid #1e293b; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #1e40af, #0284c7); padding: 28px; color: #ffffff; }
    .header h1 { margin: 0 0 6px 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em; }
    .header p { margin: 0; font-size: 13px; opacity: 0.95; }
    .badge { display: inline-block; padding: 4px 10px; background-color: rgba(255,255,255,0.22); border-radius: 9999px; font-size: 11px; font-weight: 700; margin-top: 10px; }
    .content { padding: 28px; }
    .row { margin-bottom: 18px; }
    .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #94a3b8; margin-bottom: 4px; }
    .value { font-size: 15px; color: #ffffff; font-weight: 500; }
    .msg-box { background-color: #020617; border: 1px solid #334155; border-radius: 10px; padding: 16px; font-size: 14px; color: #e2e8f0; line-height: 1.65; white-space: pre-wrap; margin-top: 4px; }
    .recipients { background-color: #1e293b; border-left: 3px solid #38bdf8; border-radius: 6px; padding: 12px 14px; font-size: 12px; color: #cbd5e1; margin-top: 20px; }
    .footer { padding: 16px 28px; background-color: #020617; border-top: 1px solid #1e293b; font-size: 12px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>New Consultation Enquiry</h1>
      <p>Dubey Conglomerate — Aniket Dubey Advisory Platform</p>
      <span class="badge">Reference: ${enquiry.id}</span>
    </div>
    <div class="content">
      <div class="row">
        <div class="label">Full Name</div>
        <div class="value">${enquiry.name}</div>
      </div>
      <div class="row">
        <div class="label">Company / Organization</div>
        <div class="value">${enquiry.business || "Not specified"}</div>
      </div>
      <div class="row">
        <div class="label">Client Email</div>
        <div class="value"><a href="mailto:${enquiry.email}" style="color: #38bdf8; text-decoration: none; font-weight: 600;">${enquiry.email}</a></div>
      </div>
      <div class="row">
        <div class="label">Contact Phone</div>
        <div class="value"><a href="tel:${enquiry.phone}" style="color: #38bdf8; text-decoration: none;">${enquiry.phone || "Not provided"}</a></div>
      </div>
      <div class="row">
        <div class="label">Primary Service Required</div>
        <div class="value" style="color: #60a5fa; font-weight: 700;">${enquiry.service}</div>
      </div>
      <div class="row">
        <div class="label">Business Overview & Objectives</div>
        <div class="msg-box">${enquiry.message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
      </div>
      <div class="recipients">
        <strong>Direct Notification Routed to:</strong><br/>
        email@aniketdubey.com
      </div>
    </div>
    <div class="footer">
      Automated consultation delivery service • Dubey Conglomerate
    </div>
  </div>
</body>
</html>
`;

    let smtpSent = false;
    let resendSent = false;
    let relaySent = false;

    // 1. Try SMTP if configured
    const transporter = createEmailTransporter();
    if (transporter) {
      try {
        const fromAddress =
          process.env.SMTP_FROM ||
          process.env.SMTP_USER ||
          process.env.GMAIL_USER ||
          '"Dubey Conglomerate" <noreply@aniketdubey.com>';

        await transporter.sendMail({
          from: fromAddress,
          to: TARGET_RECIPIENT_EMAILS,
          replyTo: enquiry.email,
          subject,
          text: plainText,
          html: htmlContent,
        });
        smtpSent = true;
        console.log(`[SMTP Success] Sent ${enquiry.id} to ${TARGET_RECIPIENT_EMAILS.join(", ")}`);
      } catch (smtpErr) {
        console.error("[SMTP Error]", smtpErr);
      }
    }

    // 2. Try Resend if configured
    if (!smtpSent && process.env.RESEND_API_KEY) {
      resendSent = await sendViaResend(enquiry, subject, htmlContent);
    }

    // 3. Automated Web Relay to email@aniketdubey.com
    const relayResult = await sendViaRelay(enquiry, subject);
    relaySent = relayResult.sent;

    const isDirectlyDelivered = smtpSent || resendSent || relayResult.sent;
    const needsActivation = !smtpSent && !resendSent && relayResult.needsActivation;

    // Build pre-filled mailto backup URL
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
      `Date: ${new Date(enquiry.submittedAt).toLocaleString()}\n\n` +
      `Business Overview & Objectives:\n${enquiry.message}\n` +
      `----------------------------------------\n` +
      `Sent via Dubey Conglomerate Portal`
    );
    const mailtoUrl = `mailto:email@aniketdubey.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    const defaultMsg = `Your consultation request has been received and routed to email@aniketdubey.com. Aniket Dubey will review your details personally.`;
    const activationNotice = `Enquiry recorded. Note: FormSubmit has sent a one-time activation email to email@aniketdubey.com. Please check your inbox (or Spam folder) and click 'Activate Form' once to enable automatic forwarding.`;

    return sendJsonResponse(res, 200, {
      success: true,
      referenceId: enquiry.id,
      recipients: ["email@aniketdubey.com"],
      mailtoUrl,
      enquiry,
      dispatchStatus: {
        smtpSent,
        resendSent,
        relaySent,
        isDirectlyDelivered,
        needsActivation,
      },
      needsActivation,
      message: needsActivation ? activationNotice : defaultMsg,
    });
  } catch (error: any) {
    console.error("Vercel Serverless contact error:", error);
    return sendJsonResponse(res, 500, {
      success: false,
      error: "An error occurred while processing your enquiry. Please reach out directly at email@aniketdubey.com.",
    });
  }
}
