import { ServiceItem, ApproachStep, PortfolioProject } from './types';

export const CONSULTANT_INFO = {
  name: "Aniket Dubey",
  title: "Founder-First Strategic Business Advisory Partner",
  roleTagline: "A founder-first strategic business advisory partner",
  shortTitle: "Business Advisory Partner",
  experience: "10+ Years",
  address: "Road No. 36, Uttarpally, Benachity, Durgapur, West Bengal, India",
  phone: "9932979875",
  formattedPhone: "+91 99329 79875",
  email: "email@aniketdubey.com",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Road+No.+36,+Uttarpally,+Benachity,+Durgapur,+West+Bengal,+India",
  locationName: "Benachity, Durgapur, West Bengal",
  bookingUrl: "https://scheduler.zoom.us/aniketdubey/consultation",
  bioHeadline: "A founder-first strategic business advisory partner guiding entrepreneurs and scaling enterprises.",
  bioSummary: "Aniket Dubey is a founder-first strategic business advisory partner with over a decade of hands-on experience. He works directly alongside entrepreneurs and founders to eliminate operational friction, build trust-driven content marketing engines, and deploy resilient managed IT infrastructure.",
};

export const FOUNDER_FIRST_ADVANTAGES = [
  {
    icon: "ShieldCheck",
    title: "Founder Bandwidth Protection",
    tagline: "Exit the Firefighting Trap",
    description: "Founders get trapped in day-to-day tactical crises. I re-architect operational workflows and managerial accountability so you can focus on high-leverage growth and vision.",
  },
  {
    icon: "Compass",
    title: "Radical Commercial Candor",
    tagline: "An Objective Co-Pilot, Not a 'Yes-Man'",
    description: "You don't need corporate platitudes or 100-page academic decks. You need an unvarnished audit of where revenue is leaking, which tools are bloat, and how to scale sustainably.",
  },
  {
    icon: "Layers",
    title: "Unified Business & IT Synergy",
    tagline: "Strategy Meets Technical Backbone",
    description: "Most consultants understand business or IT, rarely both. I bridge commercial growth with content positioning and resilient, secure managed IT infrastructure.",
  },
  {
    icon: "Target",
    title: "Durable Founder Independence",
    tagline: "Capability Built Within Your Firm",
    description: "My success is defined by leaving your business self-sustaining and disciplined — not by engineering open-ended, dependency-driven consulting retainers.",
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "business-consulting",
    title: "Founder & Business Advisory",
    subtitle: "Strategic Direction, Operational Flow & Scalable Growth",
    description: "Founder-first business guidance designed to help entrepreneurs untangle operational chaos, clarify business models, and execute high-impact growth roadmaps.",
    tag: "Core Strategic Pillar",
    features: [
      "Founder executive advisory",
      "Operational bottleneck removal",
      "90-day growth sprint planning",
      "Managerial governance & KPI cadences"
    ],
    benefits: [
      "Objective audit of revenue bottlenecks and operational leakage",
      "Pragmatic roadmap prioritizing high-leverage commercial initiatives",
      "Streamlined workflows to free up founder bandwidth and overhead",
      "Strategic accountability tailored directly to founder priorities"
    ]
  },
  {
    id: "content-marketing",
    title: "Strategic Content Marketing",
    subtitle: "Audience-Focused Authority & Organic Lead Generation",
    description: "Structured content positioning that turns your company's subject matter expertise into consistent, trust-driven business inquiries and customer loyalty.",
    tag: "Market Positioning",
    features: [
      "Founder-led content strategy",
      "Brand authority positioning",
      "Inbound consultation funnels",
      "Audience persona architecture",
      "Sustainable editorial workflows"
    ],
    benefits: [
      "Position your brand as an undeniable market authority",
      "Attract qualified decision-makers through value-driven messaging",
      "Systematic editorial workflows that scale with your team",
      "Content assets designed directly for long-term customer acquisition"
    ]
  },
  {
    id: "managed-it",
    title: "Managed IT Services",
    subtitle: "Reliable Infrastructure & Proactive Technology Management",
    description: "Dedicated technology oversight and proactive support tailored to your business needs, ensuring stability, cybersecurity, and zero downtime as you expand.",
    tag: "Technology Infrastructure",
    features: [
      "Proactive 24/7 IT oversight",
      "Automated disaster recovery backups",
      "Cloud infrastructure management",
      "Fast-response technical support",
      "Cybersecurity baseline enforcement"
    ],
    benefits: [
      "Prevent costly outages with continuous monitoring and proactive maintenance",
      "Safe, structured cloud migrations and system backups",
      "Cost-efficient vendor and software stack management",
      "Peace of mind knowing your IT backbone is secured and professionally managed"
    ]
  },
  {
    id: "business-tech-strategy",
    title: "Business & Technology Strategy",
    subtitle: "Harmonizing Business Objectives with Modern Technology",
    description: "Bridging the gap between executive business goals and technical execution to eliminate digital waste, optimize modern tools, and drive scalable efficiency.",
    tag: "Digital Modernization",
    features: [
      "Align business objectives with technology",
      "SaaS stack & subscription audit",
      "Digital workflow automation",
      "Future-proof architecture planning"
    ],
    benefits: [
      "Eliminate software redundancies and reduce recurring SaaS overhead",
      "Select and integrate tools that actually support your revenue pipeline",
      "Automate repetitive operational tasks to free up key personnel",
      "Future-proof technical architecture for multi-year expansion"
    ]
  }
];

export const WHY_WORK_WITH_ANIKET = [
  {
    title: "A Founder-First Advisory Partner",
    description: "Every engagement is anchored in empathy for founder realities: cash-flow discipline, operational speed, and the necessity of high-leverage execution."
  },
  {
    title: "10+ Years of Hands-On Experience",
    description: "A decade of battle-tested advisory experience guiding founders and owner-operators through scaling phases, pivot points, and operational transitions."
  },
  {
    title: "Direct Principal Engagement",
    description: "You work directly with Aniket Dubey. No junior account handlers, no delegation, and zero generic corporate slide decks."
  },
  {
    title: "Business + Technology Synergies",
    description: "A rare combination of commercial acumen, content positioning mastery, and hands-on managed IT infrastructure know-how."
  },
  {
    title: "Practical, Execution-Focused Roadmaps",
    description: "Strategy without execution is useless. Blueprints are grounded in realistic timelines, resource constraints, and measurable milestones."
  },
  {
    title: "Long-Term Client Independence",
    description: "Focused on building durable capability within your business rather than creating dependent, open-ended consulting retainers."
  }
];

export const CONSULTING_APPROACH: ApproachStep[] = [
  {
    number: "01",
    title: "Understand",
    description: "Deep discovery into founder vision, operational bottlenecks, revenue drivers, and current market realities.",
    deliverables: [
      "In-depth founder & executive discovery sessions",
      "Assessment of existing market positioning and customer touchpoints",
      "Audit of operational bottlenecks and technology infrastructure"
    ]
  },
  {
    number: "02",
    title: "Analyze",
    description: "Diagnose friction points, root-cause inefficiencies, and high-impact commercial opportunities.",
    deliverables: [
      "Gap analysis between current performance and target scale",
      "Identification of under-leveraged market or digital opportunities",
      "Risk assessment and resource readiness evaluation"
    ]
  },
  {
    number: "03",
    title: "Strategize",
    description: "Formulate a custom founder-first execution roadmap tailored to your specific commercial objectives.",
    deliverables: [
      "Customized growth blueprint with prioritized milestones",
      "Integrated content marketing & lead generation framework",
      "Tailored technology management and infrastructure roadmap"
    ]
  },
  {
    number: "04",
    title: "Scale",
    description: "Provide hands-on implementation governance and continuous improvement as the business expands.",
    deliverables: [
      "Hands-on execution guidance and phased milestone reviews",
      "Proactive IT support and workflow optimization",
      "Ongoing strategic refinement to adapt to evolving market demands"
    ]
  }
];

export const PERSONAL_MANIFESTO = [
  {
    principle: "Founder-First Strategic Partnership",
    tagline: "Shoulder-to-Shoulder With the Founder",
    description: "I act as an objective strategic co-pilot for founders. Whether tackling cash-flow bottlenecks, commercial positioning, or technology debt, my advice is direct, empathetic, and uncompromised by corporate politics."
  },
  {
    principle: "Direct Principal Engagement",
    tagline: "You Work Directly With Me",
    description: "When you engage my services, you work directly with Aniket Dubey. No junior delegates, no account managers, and no handoffs. Every strategic review and execution blueprint is personally authored."
  },
  {
    principle: "Execution Over Theory",
    tagline: "Actionable Blueprints, Not Fluff",
    description: "I don't deliver 100-page academic slides that collect dust. Every engagement produces clear, pragmatic action items, operational processes, and technology setups your team can implement immediately."
  },
  {
    principle: "Unified Business & IT Synergy",
    tagline: "Technology Built for Commercial Growth",
    description: "Strategy without technical capability creates bottlenecks, and IT without business direction is just overhead. I align your commercial goals with robust technology and high-converting content marketing."
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "founder-strategic-advisory",
    title: "Founder Mentorship & 90-Day Scaling Blueprint",
    category: "Business Consulting",
    clientType: "Early-Stage Venture & Tech Startup",
    tag: "Founder Advisory",
    context: "First-time founders with strong product capabilities struggling to transition from product development to systematic commercial scaling and capital discipline.",
    challenge: "Lack of commercial market validation frameworks, unfocused marketing spending, and uncertainty over prioritization.",
    solution: "Served as an executive sounding board and strategic advisor, establishing unit economic clarity, defining target customer profiles, and orchestrating a focused 90-day execution sprint.",
    keyOutcomes: [
      "Focused founder bandwidth on highest-leverage revenue-generating activities",
      "Clarified go-to-market messaging and customer validation criteria",
      "Instituted disciplined financial tracking and resource allocation protocols"
    ],
    toolsAndFrameworks: ["Unit Economics Audit", "90-Day Execution Sprint", "Founder Sounding Board"]
  },
  {
    id: "b2b-growth-operations",
    title: "Operational Streamlining & Commercial Growth Alignment",
    category: "Business Consulting",
    clientType: "Regional B2B Wholesale & Distribution Business",
    tag: "Strategy & Operations",
    context: "A scaling enterprise struggling with operational bottlenecks between sales, inventory coordination, and executive decision-making during regional expansion.",
    challenge: "Leadership was consumed by day-to-day firefighting, lacking a clear 90-day roadmap and structured accountability for growth milestones.",
    solution: "Conducted an objective operational diagnostic, restructured core workflow handoffs, formulated an executive decision framework, and established quarterly growth targets.",
    keyOutcomes: [
      "Eliminated daily administrative friction and redundant communication loops",
      "Clarified managerial ownership and instituted weekly KPI reviews",
      "Delivered a practical 12-month expansion roadmap adopted by all unit heads"
    ],
    toolsAndFrameworks: ["Workflow Mapping", "Executive Governance Cadence", "Growth Prioritization Matrix"]
  },
  {
    id: "content-authority-funnel",
    title: "Thought Leadership & Strategic Content Marketing Engine",
    category: "Content Marketing",
    clientType: "Professional Consulting & Advisory Practice",
    tag: "Brand Authority & Inbound",
    context: "An established professional practice relying purely on word-of-mouth with zero structured digital presence or inbound client acquisition system.",
    challenge: "High subject-matter expertise was trapped internally, leaving prospective clients unable to discover or validate their specialized knowledge.",
    solution: "Engineered an audience-centric content marketing strategy, developed high-value editorial assets addressing client pain points, and established an ongoing digital distribution workflow.",
    keyOutcomes: [
      "Positioned the principal as the recognized authority in their regional niche",
      "Generated continuous qualified inbound consultation enquiries",
      "Created reusable evergreen content assets that accelerate client trust before the first meeting"
    ],
    toolsAndFrameworks: ["Audience Persona Architecture", "Editorial Publishing Cadence", "Inbound Consultation Funnels"]
  },
  {
    id: "managed-it-cloud-modernization",
    title: "Managed IT Infrastructure Modernization & Reliability Shield",
    category: "Managed IT",
    clientType: "Multi-Location Retail & Service Enterprise",
    tag: "Infrastructure & Security",
    context: "A multi-branch business operating on disjointed on-premise hardware with frequent downtime and unmonitored security vulnerabilities.",
    challenge: "Unplanned server crashes disrupted transactions, staff lacked reliable remote access, and there was no proactive data backup mechanism.",
    solution: "Transitioned core operations to a secure managed cloud environment, implemented 24/7 proactive system monitoring, configured automated offsite backups, and established rapid-response IT support.",
    keyOutcomes: [
      "Drastically minimized unscheduled system downtime across all retail branches",
      "Automated encrypted daily backups with verified disaster recovery protocols",
      "Streamlined IT support tickets under dedicated proactive management"
    ],
    toolsAndFrameworks: ["Proactive Monitoring Protocols", "Automated Cloud Backups", "Centralized IT Governance"]
  },
  {
    id: "tech-workflow-integration",
    title: "Digital Workflow Rationalization & SaaS Stack Optimization",
    category: "Technology Strategy",
    clientType: "Growing Tech-Enabled Service Firm",
    tag: "Digital Workflows",
    context: "A fast-growing firm experiencing software bloat, paying for overlapping SaaS subscriptions, and losing client data in manual spreadsheet handoffs.",
    challenge: "Teams were using disconnected tools, leading to duplicated data entry, inconsistent client tracking, and bloated monthly software expenses.",
    solution: "Audited the complete software ecosystem, eliminated redundant tools, integrated core CRM and project tracking pipelines, and trained staff on cohesive digital workflows.",
    keyOutcomes: [
      "Consolidated fragmented SaaS subscriptions, reducing recurring technology overhead",
      "Automated client data handoffs between marketing, sales, and operations",
      "Accelerated internal task completion speed through synchronized tooling"
    ],
    toolsAndFrameworks: ["SaaS Stack Audit", "CRM Workflow Automation", "Digital SOP Development"]
  }
];

export const TARGET_AUDIENCE_PILLARS = [
  {
    title: "Bootstrapped & Scaling Founders",
    description: "Seeking an experienced strategic co-pilot to navigate operational bottlenecks, clarify capital allocation, and build predictable client acquisition channels."
  },
  {
    title: "Owner-Operators & SME Leaders",
    description: "Trapped in daily business firefighting, looking to institutionalize operational systems and delegate execution without sacrificing quality."
  },
  {
    title: "Firms Building Inbound Authority",
    description: "Frustrated by vanity marketing metrics and seeking content positioning designed to convert executive domain expertise into high-ticket pipeline."
  },
  {
    title: "Enterprises Requiring Managed IT",
    description: "Needing proactive technology maintenance, cloud resilience, and security governance without the exorbitant overhead of an internal IT department."
  }
];
