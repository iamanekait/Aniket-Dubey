import { GoogleGenAI } from "@google/genai";

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

// Safely parse request body across Vercel serverless and Node.js runtimes without hanging
async function getRequestBody(req: any): Promise<any> {
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) {
    return req.body;
  }
  if (typeof req.body === "string" && req.body.trim().length > 0) {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  if (Buffer.isBuffer(req.body)) {
    try {
      return JSON.parse(req.body.toString("utf-8"));
    } catch {
      return {};
    }
  }
  if (req.readableEnded || req.complete || typeof req.on !== "function") {
    return {};
  }
  return new Promise((resolve) => {
    let raw = "";
    const timer = setTimeout(() => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    }, 1500);

    req.on("data", (chunk: any) => {
      raw += chunk;
    });
    req.on("end", () => {
      clearTimeout(timer);
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
      clearTimeout(timer);
      resolve({});
    });
  });
}

function sendJsonResponse(res: any, status: number, data: any) {
  if (typeof res.status === "function" && typeof res.json === "function") {
    return res.status(status).json(data);
  }
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(data));
}

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
- Industry Recognition & Felicitation: Aniket Dubey was formally felicitated by Technext Technosoft Pvt. Ltd. in honor of over 10 years of dedication and leadership in scaling their flagship North American brand, iWebNext, at a global level. He operates as an Independent IT Contractor and Business Advisory Partner.
- Approach: 4-Step Methodology (01 Understand -> 02 Analyze -> 03 Strategize -> 04 Scale).
- Target Audience: Small and medium business owners, startup founders, entrepreneurs, growing companies, businesses looking to modernize marketing or stabilize IT systems.

Tone & Rules:
- Professional, consultative, articulate, warm, and strategic.
- Do NOT invent awards, named clients, or exaggerated metrics.
- Encourage the user to schedule a direct consultation with Aniket via his Zoom Scheduler (https://scheduler.zoom.us/aniketdubey/consultation), leave their details via the contact form on the page, or reach out directly at email@aniketdubey.com / +91 9932979875.
- Keep responses concise (2-4 paragraphs maximum, clear and easy to read).`;

function generateConsultantKnowledgeReply(message: string): string {
  const queryLower = (message || "").toLowerCase().trim();

  if (queryLower.includes("book") || queryLower.includes("schedule") || queryLower.includes("consultation") || queryLower.includes("call") || queryLower.includes("meeting") || queryLower.includes("zoom")) {
    return `You can schedule a direct 1-on-1 consultation with Aniket Dubey:\n\n- **Online Zoom Scheduler**: [Click to schedule a 1-on-1 meeting](https://scheduler.zoom.us/aniketdubey/consultation)\n- **Direct Phone**: +91 9932979875\n- **Direct Email**: email@aniketdubey.com\n\nYou can also submit an enquiry through the contact form on this website and Aniket will review your requirements personally.`;
  }

  if (queryLower.includes("service") || queryLower.includes("what do you do") || queryLower.includes("offer") || queryLower.includes("help") || queryLower.includes("capability") || queryLower.includes("capabilities")) {
    return `Aniket Dubey provides four core advisory pillars tailored to growing businesses:\n\n1. **Business Consulting**: Growth roadmaps, strategic decision frameworks, unit economic clarity, and operational de-bottlenecking.\n2. **Strategic Content Marketing**: High-authority brand positioning, editorial strategy, and inbound audience-focused content engines.\n3. **Managed IT Services**: Reliable infrastructure guidance, cloud modernization, ongoing tech support, and digital security management.\n4. **Business & Technology Strategy**: Bridging commercial objectives with modern digital workflows and scalable systems.\n\nWould you like to discuss how these services can be tailored to your business? You can book a direct consultation anytime at: https://scheduler.zoom.us/aniketdubey/consultation`;
  }

  if (queryLower.includes("contact") || queryLower.includes("email") || queryLower.includes("phone") || queryLower.includes("address") || queryLower.includes("location") || queryLower.includes("durgapur") || queryLower.includes("reach") || queryLower.includes("office")) {
    return `You can connect directly with Aniket Dubey:\n\n- **Zoom Scheduler**: https://scheduler.zoom.us/aniketdubey/consultation\n- **Office Location**: Road No. 36, Uttarpally, Benachity, Durgapur, West Bengal, India\n- **Phone**: +91 9932979875\n- **Email**: email@aniketdubey.com\n\nYou can also use the enquiry form on this page to request an initial consultation!`;
  }

  if (queryLower.includes("recognition") || queryLower.includes("felicitat") || queryLower.includes("award") || queryLower.includes("technext") || queryLower.includes("iwebnext") || queryLower.includes("why aniket") || queryLower.includes("credential")) {
    return `Aniket Dubey was formally felicitated by **Technext Technosoft Pvt. Ltd.** in recognition of over 10 years of dedicated leadership in scaling their flagship North American brand, **iWebNext**, at a global level.\n\nHe operates as an Independent IT Contractor and Business Advisory Partner. You can explore the full story, felicitation photo, and credential milestones on the **Recognition** page on this website!`;
  }

  if (queryLower.includes("experience") || queryLower.includes("about") || queryLower.includes("who is") || queryLower.includes("background") || queryLower.includes("bio")) {
    return `Aniket Dubey brings over 10 years of cross-industry consulting experience. His philosophy is strictly consultative and execution-focused: first understanding your unique operating model and challenges, then formulating pragmatic strategies combining business acumen, content marketing, and managed IT systems. He operates on a 4-step methodology: 01 Understand -> 02 Analyze -> 03 Strategize -> 04 Scale.`;
  }

  if (queryLower.includes("cost") || queryLower.includes("pricing") || queryLower.includes("fee") || queryLower.includes("rate") || queryLower.includes("retainer") || queryLower.includes("charge")) {
    return `Because Aniket's consulting engagements are strictly customized to the scope, industry, and specific operational needs of each client, pricing is determined after an initial exploratory discussion.\n\nYou can book an introductory discovery consultation directly via Zoom: https://scheduler.zoom.us/aniketdubey/consultation or email email@aniketdubey.com to receive a tailored advisory proposal.`;
  }

  return `Thank you for your interest in strategic consulting with Aniket Dubey. With 10+ years of experience in business growth, strategic content marketing, and managed IT infrastructure, Aniket works closely with founders and business owners to build resilient, scalable operations.\n\nFeel free to ask about specific services, Aniket's 4-step consulting approach, or book a consultation directly at https://scheduler.zoom.us/aniketdubey/consultation.`;
}

export default async function handler(req: any, res: any) {
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
    const body = await getRequestBody(req);
    const { message } = body;

    if (!message || typeof message !== "string") {
      return sendJsonResponse(res, 400, { success: false, error: "Message is required." });
    }

    const ai = getAIClient();
    let reply = "";

    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: message,
          config: {
            systemInstruction,
          },
        });
        reply = response.text || "";
      } catch (geminiErr: any) {
        const errMsg = geminiErr?.message || String(geminiErr);
        // Gracefully handle free tier disabled / 403 / billing permission errors
        if (errMsg.includes("403") || errMsg.includes("PERMISSION_DENIED") || errMsg.includes("free tier") || errMsg.includes("billing")) {
          console.warn("[Chat Advisory] Gemini API project quota/billing not active; serving curated advisory response.");
        } else {
          console.warn("[Chat Advisory] Gemini API request error:", errMsg);
        }
      }
    }

    if (!reply) {
      reply = generateConsultantKnowledgeReply(message);
    }

    return sendJsonResponse(res, 200, { success: true, reply });
  } catch (err: any) {
    return sendJsonResponse(res, 200, {
      success: true,
      reply: generateConsultantKnowledgeReply(""),
    });
  }
}
