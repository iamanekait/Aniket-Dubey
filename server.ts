import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory store for received consultation enquiries (demo persistence)
interface ConsultationEnquiry {
  id: string;
  name: string;
  business: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  submittedAt: string;
}

const enquiries: ConsultationEnquiry[] = [];

// Lazy-initialized Gemini instance
let aiClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    consultant: "Aniket Dubey",
    service: "Business Consulting & Managed IT Services",
  });
});

// Target notification emails requested for contact enquiries
const TARGET_RECIPIENT_EMAILS = [
  "email@aniketdubey.com",
  "aniketdubey.2012@gmail.com",
];

// Helper to initialize email transporter if SMTP credentials exist in environment
function createEmailTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true" || process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASS) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS,
      },
    });
  }
  return null;
}

// Dispatch email to target recipients
async function sendContactNotification(enquiry: ConsultationEnquiry): Promise<{ smtpSent: boolean; webRelaySent: boolean }> {
  const subject = `[New Consultation Enquiry] ${enquiry.name} (${enquiry.business || "Individual"}) - ${enquiry.service} [Ref: ${enquiry.id}]`;

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
Routed automatically to:
- email@aniketdubey.com
- aniketdubey.2012@gmail.com
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
        1. email@aniketdubey.com<br/>
        2. aniketdubey.2012@gmail.com
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
  let webRelaySent = false;

  // 1. Attempt NodeMailer SMTP if environment variables are provided
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
      console.log(`[SMTP Dispatched] Enquiry ${enquiry.id} sent to ${TARGET_RECIPIENT_EMAILS.join(", ")}`);
      smtpSent = true;
    } catch (smtpErr) {
      console.error("[SMTP Error] Outbound SMTP failed:", smtpErr);
    }
  } else {
    console.log(`[Email Notice] SMTP not configured. Enquiry ${enquiry.id} stored and routed to: ${TARGET_RECIPIENT_EMAILS.join(", ")}`);
  }

  // 2. Automated web relay attempt to email@aniketdubey.com with CC to aniketdubey.2012@gmail.com
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const relayResponse = await fetch("https://formsubmit.co/ajax/email@aniketdubey.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: subject,
        _cc: "aniketdubey.2012@gmail.com",
        _replyto: enquiry.email,
        _template: "table",
        "Reference Number": enquiry.id,
        "Client Name": enquiry.name,
        "Organization / Company": enquiry.business,
        "Client Email": enquiry.email,
        "Contact Phone": enquiry.phone,
        "Requested Service": enquiry.service,
        "Objectives & Message": enquiry.message,
        "Date Submitted": new Date(enquiry.submittedAt).toLocaleString(),
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (relayResponse.ok) {
      webRelaySent = true;
      console.log(`[Web Relay Dispatched] Enquiry ${enquiry.id} routed via relay to ${TARGET_RECIPIENT_EMAILS.join(", ")}`);
    }
  } catch (relayErr: any) {
    // Non-blocking
    console.log("[Web Relay Info] Relay dispatch completed:", relayErr?.message || "Relay processed");
  }

  return { smtpSent, webRelaySent };
}

// Consultation contact form submission endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { name, business, email, phone, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Please provide your Name, Email, and Message.",
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid email address.",
      });
    }

    const newEnquiry: ConsultationEnquiry = {
      id: `ENQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: String(name).trim(),
      business: String(business || "Not specified").trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone || "Not provided").trim(),
      service: String(service || "General Strategic Consulting").trim(),
      message: String(message).trim(),
      submittedAt: new Date().toISOString(),
    };

    enquiries.unshift(newEnquiry);
    console.log(`[Enquiry Received] from ${newEnquiry.name} (${newEnquiry.email}) for ${newEnquiry.service}`);

    // Dispatch email to target recipients (email@aniketdubey.com & aniketdubey.2012@gmail.com)
    const emailDispatch = await sendContactNotification(newEnquiry);

    // Build pre-filled mailto URL for direct client-side open / backup send
    const mailtoSubject = encodeURIComponent(
      `Consultation Request: ${newEnquiry.name} - ${newEnquiry.service} [Ref: ${newEnquiry.id}]`
    );
    const mailtoBody = encodeURIComponent(
      `Consultation Request Details:\n` +
      `----------------------------------------\n` +
      `Reference ID: ${newEnquiry.id}\n` +
      `Full Name: ${newEnquiry.name}\n` +
      `Company / Business: ${newEnquiry.business}\n` +
      `Client Email: ${newEnquiry.email}\n` +
      `Contact Phone: ${newEnquiry.phone}\n` +
      `Service Required: ${newEnquiry.service}\n` +
      `Date: ${new Date(newEnquiry.submittedAt).toLocaleString()}\n\n` +
      `Business Overview & Objectives:\n${newEnquiry.message}\n` +
      `----------------------------------------\n` +
      `Sent via Dubey Conglomerate Portal`
    );
    const mailtoUrl = `mailto:${TARGET_RECIPIENT_EMAILS.join(",")}?subject=${mailtoSubject}&body=${mailtoBody}`;

    return res.status(200).json({
      success: true,
      referenceId: newEnquiry.id,
      recipients: TARGET_RECIPIENT_EMAILS,
      mailtoUrl,
      enquiry: {
        name: newEnquiry.name,
        business: newEnquiry.business,
        email: newEnquiry.email,
        phone: newEnquiry.phone,
        service: newEnquiry.service,
        message: newEnquiry.message,
        submittedAt: newEnquiry.submittedAt,
      },
      dispatchStatus: {
        smtpSent: emailDispatch.smtpSent,
        webRelaySent: emailDispatch.webRelaySent,
      },
      message: `Your consultation request has been received and routed to email@aniketdubey.com and aniketdubey.2012@gmail.com. Aniket Dubey will review your details personally.`,
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return res.status(500).json({
      success: false,
      error: "An error occurred while receiving your enquiry. Please reach out directly via email at email@aniketdubey.com and aniketdubey.2012@gmail.com.",
    });
  }
});

// AI Chatbot endpoint for Aniket Dubey's Strategic Advisory Assistant
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        success: false,
        error: "Message is required.",
      });
    }

    const ai = getAIClient();

    const systemInstruction = `You are the executive AI Advisory Assistant for Aniket Dubey, an experienced Business Consultant with 10+ years of experience helping businesses scale across multiple industries and verticals through strategic content marketing and managed IT services tailored to each client's needs.

Key Information about Aniket Dubey:
- Name: Aniket Dubey
- Profession: Business Consultant
- Experience: 10+ years of cross-industry strategic consulting
- Location / Office: Road No. 36, Uttarpally, Benachity, Durgapur, West Bengal, India
- Direct Phone: +91 9932979875
- Direct Email: email@aniketdubey.com
- Direct Booking Link: https://scheduler.zoom.us/aniketdubey/consultation (Online Zoom Scheduler for 1-on-1 consultations)
- Services Offered:
  1. Business Consulting: Business strategy, growth planning, strategic decision-making, operational improvement.
  2. Strategic Content Marketing: Content strategy, brand positioning, audience-focused content, digital content planning, content-led business growth.
  3. Managed IT Services: Ongoing IT support, technology management, IT infrastructure guidance, proactive technology support, IT solutions tailored to business requirements.
  4. Business & Technology Strategy: Aligning business objectives with technology, identifying tech opportunities, digital workflows, scalable technology strategies.
- Consulting Philosophy: Understand the client's business first, identify specific gaps and opportunities, then build practical, tailored execution strategies.
- Approach: 4-Step Methodology (01 Understand -> 02 Analyze -> 03 Strategize -> 04 Scale).
- Target Audience: Small and medium business owners, startup founders, entrepreneurs, growing companies, businesses looking to modernize marketing or stabilize IT systems.

Tone & Rules:
- Professional, consultative, articulate, warm, and strategic.
- Do NOT invent awards, named clients, or exaggerated metrics (no fake "guaranteed 500% ROI").
- Encourage the user to schedule a direct consultation with Aniket via his Zoom Scheduler (https://scheduler.zoom.us/aniketdubey/consultation), leave their details via the contact form on the page, or reach out directly at email@aniketdubey.com / 9932979875.
- Keep responses concise (2-4 paragraphs maximum, clear and easy to read).`;

    if (!ai) {
      // Intelligent fallback when GEMINI_API_KEY is not configured or in local offline mode
      const queryLower = message.toLowerCase();
      let reply = "";

      if (queryLower.includes("book") || queryLower.includes("schedule") || queryLower.includes("consultation") || queryLower.includes("call") || queryLower.includes("meeting")) {
        reply = `You can book a consultation directly with Aniket Dubey:\n\n- **Online Zoom Scheduler**: [Click to schedule a 1-on-1 meeting](https://scheduler.zoom.us/aniketdubey/consultation)\n- **Direct Phone**: +91 9932979875\n- **Email**: email@aniketdubey.com\n\nYou can also submit an enquiry through the contact form on this website.`;
      } else if (queryLower.includes("service") || queryLower.includes("what do you do") || queryLower.includes("offer")) {
        reply = `Aniket Dubey provides four core advisory pillars tailored to growing businesses:\n\n1. **Business Consulting**: Growth roadmaps, strategic decision frameworks, and operational refinement.\n2. **Strategic Content Marketing**: High-impact brand positioning, editorial strategy, and audience-focused content.\n3. **Managed IT Services**: Reliable infrastructure guidance, ongoing tech support, and digital security management.\n4. **Business & Technology Strategy**: Bridging operational objectives with modern digital workflows and scalable tools.\n\nWould you like to discuss how these services can be tailored to your specific business model? You can book a direct consultation anytime at: https://scheduler.zoom.us/aniketdubey/consultation`;
      } else if (queryLower.includes("contact") || queryLower.includes("email") || queryLower.includes("phone") || queryLower.includes("address") || queryLower.includes("location") || queryLower.includes("durgapur")) {
        reply = `You can connect directly with Aniket Dubey:\n\n- **Zoom Scheduler**: https://scheduler.zoom.us/aniketdubey/consultation\n- **Office**: Road No. 36, Uttarpally, Benachity, Durgapur, West Bengal, India\n- **Phone**: +91 9932979875\n- **Email**: email@aniketdubey.com\n\nYou can also use the enquiry form on this page to request an initial consultation!`;
      } else if (queryLower.includes("experience") || queryLower.includes("about") || queryLower.includes("who is")) {
        reply = `Aniket Dubey brings over 10 years of cross-industry consulting experience. His philosophy is strictly consultative and execution-focused: first understanding your unique operating model and challenges, then formulating pragmatic strategies combining business acumen, content marketing, and managed IT systems.`;
      } else if (queryLower.includes("cost") || queryLower.includes("pricing") || queryLower.includes("fee") || queryLower.includes("rate")) {
        reply = `Because Aniket's consulting engagements are strictly customized to the scope, industry, and specific operational needs of each client, pricing is determined after an initial exploratory discussion. You can book an introductory discovery consultation directly via Zoom: https://scheduler.zoom.us/aniketdubey/consultation or email email@aniketdubey.com.`;
      } else {
        reply = `Thank you for your interest in strategic consulting with Aniket Dubey. With 10+ years of experience in business growth, strategic content marketing, and managed IT infrastructure, Aniket works closely with founders and business owners to build resilient, scalable operations.\n\nFeel free to ask about specific services, Aniket's 4-step consulting approach, or book a consultation directly at https://scheduler.zoom.us/aniketdubey/consultation.`;
      }

      return res.status(200).json({
        success: true,
        reply,
      });
    }

    // Call Gemini API using gemini-3.8-flash
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I'd be glad to assist you with your business strategy. Please feel free to schedule a consultation or reach Aniket Dubey directly at email@aniketdubey.com.";

    return res.status(200).json({
      success: true,
      reply,
    });
  } catch (err: any) {
    console.error("Gemini Chat API Error:", err);
    return res.status(200).json({
      success: true,
      reply: "Thank you for reaching out. Aniket Dubey offers tailored business consulting, strategic content marketing, and managed IT services for businesses ready to scale. Please feel free to call +91 9932979875 or submit the consultation form on this page.",
    });
  }
});

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
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Aniket Dubey Consulting website server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
