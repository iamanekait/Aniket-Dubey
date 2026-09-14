import { ServiceItem, ApproachStep } from './types';

export const CONSULTANT_INFO = {
  name: "Aniket Dubey",
  title: "Business Consultant",
  experience: "10+ Years",
  address: "Road No. 36, Uttarpally, Benachity, Durgapur, West Bengal, India",
  phone: "9932979875",
  formattedPhone: "+91 99329 79875",
  email: "email@aniketdubey.com",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Road+No.+36,+Uttarpally,+Benachity,+Durgapur,+West+Bengal,+India",
  locationName: "Benachity, Durgapur, West Bengal",
};

export const SERVICES: ServiceItem[] = [
  {
    id: "business-consulting",
    title: "Business Consulting",
    subtitle: "Strategic Direction & Sustainable Growth",
    description: "Holistic business guidance designed to help entrepreneurs and business owners clarify their vision, overcome operational friction, and build resilient growth models.",
    tag: "Core Strategic Pillar",
    features: [
      "Business strategy",
      "Growth planning",
      "Strategic decision-making",
      "Operational improvement"
    ],
    benefits: [
      "Objective analysis of business models and revenue bottlenecks",
      "Pragmatic roadmap prioritizing high-impact growth initiatives",
      "Streamlined workflows to reduce overhead and improve execution",
      "Strategic accountability tailored to founder and executive priorities"
    ]
  },
  {
    id: "content-marketing",
    title: "Strategic Content Marketing",
    subtitle: "Audience-Focused Authority & Organic Lead Generation",
    description: "Structured content positioning that turns your company's subject matter expertise into consistent, trust-driven business inquiries and customer loyalty.",
    tag: "Market Positioning",
    features: [
      "Content strategy",
      "Brand positioning",
      "Audience-focused content",
      "Digital content planning",
      "Content-led business growth"
    ],
    benefits: [
      "Position your brand as an undeniable market authority",
      "Attract qualified decision-makers through tailored value-driven messaging",
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
      "Ongoing IT support",
      "Technology management",
      "IT infrastructure guidance",
      "Proactive technology support",
      "IT solutions tailored to business requirements"
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
      "Identify technology opportunities",
      "Improve digital workflows",
      "Build scalable technology strategies"
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
    title: "10+ Years of Experience",
    description: "A decade of hands-on advisory experience guiding businesses through growth phases, market shifts, and operational transitions."
  },
  {
    title: "Cross-Industry Perspective",
    description: "Breadth of exposure across varied business models and verticals allows cross-pollination of tested strategies and fresh insights."
  },
  {
    title: "Customized Strategies",
    description: "Zero generic templates or canned playbooks. Every engagement begins with an objective assessment of your unique situation and objectives."
  },
  {
    title: "Business + Technology Expertise",
    description: "A rare combination of commercial acumen, content positioning mastery, and hands-on managed IT infrastructure know-how."
  },
  {
    title: "Practical, Execution-Focused Approach",
    description: "Strategy is useless without implementation. Recommendations are grounded in realistic timelines, resource constraints, and measurable checkpoints."
  },
  {
    title: "Long-Term Client-Oriented Thinking",
    description: "Focused on building durable capability within your business rather than creating dependent, open-ended consulting retainers."
  }
];

export const CONSULTING_APPROACH: ApproachStep[] = [
  {
    number: "01",
    title: "Understand",
    description: "Understand the business, objectives, challenges, and current situation.",
    deliverables: [
      "In-depth stakeholder discovery sessions",
      "Assessment of existing market positioning and customer touchpoints",
      "Audit of operational bottlenecks and technology infrastructure"
    ]
  },
  {
    number: "02",
    title: "Analyze",
    description: "Identify gaps, opportunities, priorities, and potential growth areas.",
    deliverables: [
      "Gap analysis between current performance and target scale",
      "Identification of under-leveraged market or digital opportunities",
      "Risk assessment and resource readiness evaluation"
    ]
  },
  {
    number: "03",
    title: "Strategize",
    description: "Develop a practical strategy tailored to the client's specific requirements.",
    deliverables: [
      "Customized growth blueprint with prioritized milestones",
      "Integrated content marketing & lead generation framework",
      "Tailored technology management and infrastructure roadmap"
    ]
  },
  {
    number: "04",
    title: "Scale",
    description: "Support implementation and continuous improvement as the business grows.",
    deliverables: [
      "Hands-on execution guidance and phased milestone reviews",
      "Proactive IT support and workflow optimization",
      "Ongoing strategic refinement to adapt to evolving market demands"
    ]
  }
];

export const PERSONAL_MANIFESTO = [
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
  },
  {
    principle: "Durable Client Independence",
    tagline: "Building Your Internal Capability",
    description: "My success is defined by leaving your business stronger, more disciplined, and capable of operating smoothly without perpetual reliance on outside advisors."
  }
];

export const PORTFOLIO_PROJECTS: import('./types').PortfolioProject[] = [
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
  },
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
  }
];

export const TARGET_AUDIENCE_PILLARS = [
  {
    title: "Small & Medium Business Owners",
    description: "Seeking to untangle daily operational firefighting, professionalize internal systems, and build predictable client acquisition channels."
  },
  {
    title: "Startup Founders & Entrepreneurs",
    description: "Needing structured strategic direction, early-stage brand authority, and dependable technology infrastructure that scales smoothly."
  },
  {
    title: "Companies Improving Marketing",
    description: "Frustrated by vanity metrics and seeking content strategies designed to build authentic market trust and direct revenue impact."
  },
  {
    title: "Businesses Requiring Managed IT",
    description: "Requiring proactive technical maintenance, security guidance, and reliable support without the overhead of an in-house IT department."
  }
];
