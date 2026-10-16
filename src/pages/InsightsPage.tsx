import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  FileText,
  CheckCircle2,
  ArrowRight,
  Filter,
  Sparkles,
  BookOpen,
  Calendar,
  Clock,
  ArrowUpRight,
  Building2,
  Cpu,
  Layers,
  Search,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { PORTFOLIO_PROJECTS, CONSULTANT_INFO } from '../data';

interface InsightsPageProps {
  onOpenConsultation?: () => void;
}

const STRATEGIC_ARTICLES = [
  {
    id: 'sme-business-it-synergy',
    category: 'Executive Strategy',
    title: 'Bridging Commercial Strategy and Scalable IT: The Growth Architecture for Modern SMEs',
    readTime: '6 min read',
    publishDate: 'September 2026',
    author: 'Aniket Dubey',
    summary:
      'Why isolated technology investments fail to drive top-line revenue, and how founders can align infrastructure with measurable commercial milestones.',
    takeaways: [
      'Avoid software bloat by auditing the single source of truth across sales and operations',
      'Deploy managed IT as a revenue protector rather than a reactive cost center',
      'Define quarterly technology ROI reviews linked to operational velocity',
    ],
  },
  {
    id: 'b2b-authority-funnels',
    category: 'Content Marketing',
    title: 'Beyond Vanity Metrics: How B2B Leaders Turn Subject-Matter Expertise into Inbound Pipelines',
    readTime: '8 min read',
    publishDate: 'August 2026',
    author: 'Aniket Dubey',
    summary:
      'A practical framework for founders with immense domain knowledge to craft high-conversion editorial assets that pre-sell advisory engagements.',
    takeaways: [
      'Stop producing generic educational content; address the specific risk calculus of buyers',
      'Structure authority pillars around customer friction points and operational bottlenecks',
      'Measure engagement by consultation discovery quality rather than raw page views',
    ],
  },
  {
    id: 'founder-bottleneck-elimination',
    category: 'Operations',
    title: 'The 90-Day Operational Diagnostic: Eliminating Founder Bottlenecks in Scaling Firms',
    readTime: '7 min read',
    publishDate: 'July 2026',
    author: 'Aniket Dubey',
    summary:
      'When the founder is involved in every decision, the business ceases to grow. Here is the exact audit protocol used to delegate and institutionalize governance.',
    takeaways: [
      'Identify decision nodes that take 80% of leadership bandwidth with <20% financial impact',
      'Institute weekly async operational reporting cadences',
      'Create standard operating procedures (SOPs) that empower mid-level managers to execute safely',
    ],
  },
  {
    id: 'zero-downtime-it-governance',
    category: 'Managed IT',
    title: 'Zero-Downtime Governance: Proactive IT Infrastructure Protocols for Expanding Enterprises',
    readTime: '5 min read',
    publishDate: 'June 2026',
    author: 'Aniket Dubey',
    summary:
      'A non-technical executive guide to disaster recovery, automated cloud backups, and proactive monitoring that protects customer trust and daily revenue.',
    takeaways: [
      'Why daily unverified backups are an illusion of safety and how to audit recovery speeds',
      'Cost-benefit analysis of 24/7 proactive monitoring versus emergency break-fix response',
      'Compliance and cybersecurity baselines every SME should enforce across employee endpoints',
    ],
  },
];

export const InsightsPage: React.FC<InsightsPageProps> = ({ onOpenConsultation }) => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'case-studies' | 'articles'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleBooking = () => {
    if (onOpenConsultation) {
      onOpenConsultation();
    } else {
      navigate('/contact');
    }
  };

  const filteredProjects = PORTFOLIO_PROJECTS.filter((p) => {
    if (selectedFilter === 'articles') return false;
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.clientType.toLowerCase().includes(query) ||
      p.solution.toLowerCase().includes(query)
    );
  });

  const filteredArticles = STRATEGIC_ARTICLES.filter((a) => {
    if (selectedFilter === 'case-studies') return false;
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      a.title.toLowerCase().includes(query) ||
      a.category.toLowerCase().includes(query) ||
      a.summary.toLowerCase().includes(query)
    );
  });

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Strategic Insights & Case Studies | Aniket Dubey',
    description:
      'Actionable business frameworks, executive strategy playbooks, and verified client case studies from 10+ years of hands-on advisory experience.',
    author: {
      '@type': 'Person',
      name: CONSULTANT_INFO.name,
      jobTitle: CONSULTANT_INFO.title,
    },
    hasPart: PORTFOLIO_PROJECTS.map((p) => ({
      '@type': 'CreativeWork',
      name: p.title,
      description: p.context,
      creator: {
        '@type': 'Person',
        name: CONSULTANT_INFO.name,
      },
    })),
  };

  return (
    <div className="py-12 sm:py-16">
      {/* React Helmet SEO Meta Tags */}
      <SEO
        title="Strategic Insights & Case Studies | Aniket Dubey | Founder-First Advisory Partner"
        description="Explore in-depth case studies, strategic advisory frameworks, and business-IT modernization insights from Aniket Dubey, a founder-first strategic business advisory partner."
        keywords="Founder-First Insights, Business Case Studies, Strategic Insights, SME Growth Frameworks, IT Modernization, Content Strategy Playbooks, Aniket Dubey Insights, Durgapur Business Consultant"
        canonicalPath="/insights"
        ogType="website"
        jsonLd={structuredData}
      />

      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/40 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Founder-First Field Notes & Proven Results</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Strategic Insights & Founder Case Studies
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Real-world transformations, pragmatic frameworks, and field-tested blueprints from a founder-first strategic business advisory partner with 10+ years of proven impact.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 p-3 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
          {/* Tabs */}
          <div className="overflow-x-auto no-scrollbar flex items-center gap-2 w-full md:w-auto pb-1 md:pb-0 shrink-0">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap min-h-[40px] shrink-0 ${
                selectedFilter === 'all'
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              All Content ({PORTFOLIO_PROJECTS.length + STRATEGIC_ARTICLES.length})
            </button>
            <button
              onClick={() => setSelectedFilter('case-studies')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap min-h-[40px] shrink-0 ${
                selectedFilter === 'case-studies'
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Case Studies ({PORTFOLIO_PROJECTS.length})
            </button>
            <button
              onClick={() => setSelectedFilter('articles')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap min-h-[40px] shrink-0 ${
                selectedFilter === 'articles'
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Executive Insights ({STRATEGIC_ARTICLES.length})
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topics, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-base sm:text-sm text-white placeholder-slate-500 pl-9 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[40px]"
            />
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Case Studies Section */}
        {filteredProjects.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Verified Case Studies</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Detailed transformation breakdowns across enterprise operations, content authority, and IT systems.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-blue-950/20 group"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-950/70 text-blue-300 border border-blue-800/40">
                        {project.category}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{project.clientType}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                      {project.context}
                    </p>

                    <div className="space-y-4 mb-6">
                      <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800">
                        <span className="text-xs font-bold text-blue-400 block mb-1 uppercase tracking-wider">
                          The Challenge
                        </span>
                        <p className="text-xs sm:text-sm text-slate-300">{project.challenge}</p>
                      </div>

                      <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800">
                        <span className="text-xs font-bold text-sky-400 block mb-1 uppercase tracking-wider">
                          The Strategic Intervention
                        </span>
                        <p className="text-xs sm:text-sm text-slate-300">{project.solution}</p>
                      </div>
                    </div>

                    {/* Key Outcomes */}
                    <div className="mb-6">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                        Measurable Outcomes
                      </span>
                      <ul className="space-y-2">
                        {project.keyOutcomes.map((outcome, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footing Tools */}
                  <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.toolsAndFrameworks.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-blue-200 border border-slate-700"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={handleBooking}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                    >
                      <span>Discuss Similar Case</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Executive Articles / Thought Leadership Section */}
        {filteredArticles.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Executive Advisory Briefs</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Pragmatic essays and blueprints tackling real commercial bottlenecks and technical scaling friction.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-blue-950/20 group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4 text-xs">
                      <span className="px-3 py-1 rounded-full font-semibold bg-blue-950/70 text-blue-300 border border-blue-800/40">
                        {article.category}
                      </span>
                      <div className="flex items-center gap-3 text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-blue-400/80" />
                          {article.publishDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-blue-400/80" />
                          {article.readTime}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                      {article.summary}
                    </p>

                    <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 mb-6">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block mb-2">
                        Core Takeaways
                      </span>
                      <ul className="space-y-2">
                        {article.takeaways.map((takeaway, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                            <span>{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs text-slate-400">By {article.author}</span>
                    <button
                      onClick={handleBooking}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                    >
                      <span>Explore Advisory Engagement</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom CTA Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-blue-950/40 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
            Need a Tailored Strategy for Your Enterprise?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8">
            Every business has unique operational dynamics and market opportunities. Book a confidential 1-on-1 discovery consultation directly with Aniket Dubey.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleBooking}
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 active:scale-95 rounded-xl transition-all shadow-lg shadow-blue-600/25 cursor-pointer"
            >
              Book Strategic Consultation
            </button>
            <Link
              to="/services"
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl transition-all"
            >
              View Full Capabilities
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
