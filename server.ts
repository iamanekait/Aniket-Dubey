import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

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

// Consultation contact form submission endpoint
app.post("/api/contact", (req, res) => {
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

    return res.status(200).json({
      success: true,
      referenceId: newEnquiry.id,
      message: "Your enquiry has been received. Aniket Dubey will review your details and respond within 1-2 business days.",
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return res.status(500).json({
      success: false,
      error: "An error occurred while receiving your enquiry. Please reach out directly via email at email@aniketdubey.com.",
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
