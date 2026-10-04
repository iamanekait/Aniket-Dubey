import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Briefcase,
  Layers,
  Server,
  Cpu,
  Award,
  Sparkles,
  UserCheck,
  Compass,
  Target,
  Zap,
  MousePointer,
  RotateCw,
  ExternalLink,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { SEO } from '../components/SEO';
import { ThreeCanvas } from '../components/ThreeCanvas';
import {
  SERVICES,
  PERSONAL_MANIFESTO,
  CONSULTANT_INFO,
  FOUNDER_FIRST_ADVANTAGES,
  PORTFOLIO_PROJECTS,
} from '../data';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>('All');

  const galleryCategories = [
    'All',
    'Business Consulting',
    'Content Marketing',
    'Managed IT',
  ];

  const filteredProjects =
    selectedGalleryCategory === 'All'
      ? PORTFOLIO_PROJECTS.slice(0, 4)
      : PORTFOLIO_PROJECTS.filter((p) => p.category === selectedGalleryCategory);

  const homeStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Aniket Dubey | Founder-First Strategic Business Advisory Partner',
    description:
      'A founder-first strategic business advisory partner with 10+ years of experience helping founders and growing businesses through strategic guidance, content marketing, and managed IT.',
    url: typeof window !== 'undefined' ? window.location.origin : 'https://aniketdubey.com',
    telephone: CONSULTANT_INFO.phone,
    email: CONSULTANT_INFO.email,
    founder: {
      '@type': 'Person',
      name: CONSULTANT_INFO.name,
      jobTitle: CONSULTANT_INFO.title,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Road No. 36, Uttarpally, Benachity',
      addressLocality: 'Durgapur',
      addressRegion: 'West Bengal',
      addressCountry: 'IN',
    },
    areaServed: ['India', 'Global'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Advisory and Technology Services',
      itemListElement: SERVICES.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
        },
        position: index + 1,
      })),
    },
  };

  return (
    <div className="space-y-0 overflow-x-hidden">
      {/* React Helmet SEO Meta Tags */}
      <SEO
        title="Aniket Dubey | Founder-First Strategic Business Advisory Partner"
        description="A founder-first strategic business advisory partner with 10+ years of hands-on experience helping founders, owner-operators, and scaling businesses solve operational friction, establish commercial authority through strategic content marketing, and deploy resilient managed IT systems."
        keywords="Founder-First Business Advisory, Strategic Business Advisory Partner, Business Consultant, Strategic Content Marketing, Managed IT Services, Technology Strategy, Durgapur, West Bengal, SME Growth, Aniket Dubey"
        canonicalPath="/"
        ogType="website"
        jsonLd={homeStructuredData}
      />

      {/* Hero Section */}
      <Hero
        onBookConsultation={() => navigate('/contact')}
        onGetInTouch={() => navigate('/contact')}
      />

      {/* Founder-First Strategic Advantage Section */}
      <section className="py-16 sm:py-20 bg-slate-950 relative overflow-hidden border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/50 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>The Founder-First Promise</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              What It Means to Have a Founder-First Advisory Partner.
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Traditional consultancies sell hourly retainers and academic slides. A founder-first partner sits in your corner — protecting your bandwidth, aligning commercial strategy with technical capability, and providing radical operational candor.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {FOUNDER_FIRST_ADVANTAGES.map((adv, idx) => {
              const icons = [ShieldCheck, Compass, Layers, Target];
              const IconComp = icons[idx % icons.length];
              return (
                <div
                  key={idx}
                  className="bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-5 sm:p-6 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400 mb-5 group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold text-blue-400 block mb-1">
                      {adv.tagline}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                      {adv.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {adv.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive 3D Strategic Section */}
      <section
        id="interactive-3d"
        className="py-16 sm:py-24 bg-gradient-to-b from-slate-950 via-slate-900/40 to-slate-950 border-b border-slate-800/80 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: 3D Interactive Canvas */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="relative w-full aspect-square max-w-[500px] bg-slate-950/80 border border-slate-800 rounded-3xl p-4 shadow-2xl shadow-blue-950/20 backdrop-blur-xl overflow-hidden group">
                {/* 3D Canvas */}
                <ThreeCanvas className="w-full h-full rounded-2xl" />

                {/* Floating Interactive Badge / Hint */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-[11px] font-medium text-slate-300 shadow-md backdrop-blur-md">
                  <RotateCw className="w-3.5 h-3.5 text-blue-400 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>Interactive 3D Engine</span>
                </div>

                <div className="absolute bottom-4 inset-x-4 flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 backdrop-blur-md">
                  <span className="flex items-center gap-1.5">
                    <MousePointer className="w-3.5 h-3.5 text-blue-400" />
                    <span>Drag or touch to rotate</span>
                  </span>
                  <span className="text-blue-400 font-semibold text-[10px]">Real-time WebGL</span>
                </div>
              </div>
            </div>

            {/* Right Column: Architectural Explanation */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/80 border border-blue-800/40 text-blue-400 text-xs font-bold uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5" />
                <span>Strategic Alignment Model</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Tri-Pillar Synergy: Strategy, Content & Technology.
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Most businesses treat consulting, content marketing, and IT infrastructure as separate silos. When they fail to communicate, founders suffer from operational friction, inconsistent market positioning, and tech downtime.
              </p>

              {/* Three Interactive Feature Pillars */}
              <div className="space-y-3.5 pt-2">
                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-blue-500/40 transition-colors">
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-950 border border-blue-700/60 flex items-center justify-center text-blue-400 shrink-0 text-xs font-bold">
                      01
                    </div>
                    <h4 className="text-sm font-bold text-white">Central Core: Strategic Clarity & Unit Economics</h4>
                  </div>
                  <p className="text-xs text-slate-400 pl-10 leading-relaxed">
                    Diagnosing true operational constraints, defining growth blueprints, and ensuring founder bandwidth is preserved for high-leverage decisions.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-blue-500/40 transition-colors">
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className="w-7 h-7 rounded-lg bg-sky-950 border border-sky-700/60 flex items-center justify-center text-sky-400 shrink-0 text-xs font-bold">
                      02
                    </div>
                    <h4 className="text-sm font-bold text-white">Outer Shell: High-Converting Content Marketing</h4>
                  </div>
                  <p className="text-xs text-slate-400 pl-10 leading-relaxed">
                    Engineering authoritative thought leadership that establishes market dominance, generates qualified pipeline, and builds organic trust.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-blue-500/40 transition-colors">
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className="w-7 h-7 rounded-lg bg-indigo-950 border border-indigo-700/60 flex items-center justify-center text-indigo-400 shrink-0 text-xs font-bold">
                      03
                    </div>
                    <h4 className="text-sm font-bold text-white">Orbital Rings: Resilient Managed IT Backbone</h4>
                  </div>
                  <p className="text-xs text-slate-400 pl-10 leading-relaxed">
                    Deploying cloud architecture, cybersecurity hygiene, and zero-downtime managed IT systems that allow your organization to scale without disruption.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  to="/approach"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-600/20 cursor-pointer min-h-[44px]"
                >
                  <span>Explore Consulting Approach</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/insights"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer min-h-[44px]"
                >
                  <span>View Case Studies</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Advisory Principles / Manifesto */}
      <section className="py-16 sm:py-20 bg-slate-900/60 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2 block">
              Advisory Philosophy
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              How I Think & Advise
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Consulting is only as valuable as its real-world implementation. Here are the core convictions that anchor every client engagement I undertake.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {PERSONAL_MANIFESTO.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-950/80 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400 mb-4 font-bold text-sm group-hover:scale-105 transition-transform">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">{item.principle}</h3>
                  <span className="text-xs font-semibold text-blue-400 block mb-3">{item.tagline}</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Gallery & Case Study Spotlight Section */}
      <section
        id="media-gallery"
        className="py-16 sm:py-24 bg-slate-950 border-b border-slate-800/80 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/80 border border-blue-800/40 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Media Gallery & Proof of Work</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Case Studies & Practice Highlights.
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl">
                Explore real-world advisory engagements spanning founder coaching, operational restructuring, content engines, and enterprise IT migrations.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {galleryCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedGalleryCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer min-h-[36px] ${
                    selectedGalleryCategory === cat
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-850'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-slate-900/50 hover:bg-slate-900/90 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-950/90 border border-blue-800/50 text-blue-400">
                      {project.tag}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs font-medium text-slate-400 mb-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>Client: {project.clientType}</span>
                  </p>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                    {project.solution}
                  </p>

                  {/* Key outcomes bullets */}
                  <div className="space-y-1.5 pt-3 border-t border-slate-800/70 mb-4">
                    {project.keyOutcomes.slice(0, 2).map((outcome, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to="/insights"
                  className="inline-flex items-center justify-between w-full pt-3 border-t border-slate-800/80 text-xs font-semibold text-blue-400 hover:text-white group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Read full case study</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-white border border-slate-800 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all min-h-[44px]"
            >
              <span>Explore All Insights & In-Depth Case Studies</span>
              <ArrowRight className="w-4 h-4 text-blue-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* Core Practice Areas Overview */}
      <section className="py-16 sm:py-20 bg-slate-900/30 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2 block">
                Practice Areas
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">How I Can Support Your Business</h2>
            </div>
            <Link
              to="/capabilities"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>Explore Detailed Scope & Deliverables</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {SERVICES.map((s) => (
              <div
                key={s.id}
                className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:border-slate-700 transition-all"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 px-2 py-0.5 rounded-full bg-blue-950/80 border border-blue-800/50 inline-block mb-3">
                    {s.tag}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1">{s.title}</h3>
                  <p className="text-xs text-slate-400 mb-4">{s.subtitle}</p>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                    {s.description}
                  </p>
                </div>
                <Link
                  to="/capabilities"
                  className="text-xs font-semibold text-blue-400 hover:text-white inline-flex items-center gap-1 pt-3 border-t border-slate-800/60 min-h-[36px]"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Engagement Call to Action Banner */}
      <section className="py-14 sm:py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-200 block mb-1">
              Direct Advisory With Aniket Dubey
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to untangle operational complexity?
            </h2>
            <p className="text-sm text-blue-100 mt-1">
              Connect with Aniket for a focused discovery conversation regarding your business growth, content strategy, or IT requirements.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              to="/capabilities"
              className="w-full sm:w-auto px-5 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all border border-blue-500/40 text-center min-h-[44px] flex items-center justify-center"
            >
              Explore Services
            </Link>
            <a
              href={CONSULTANT_INFO.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg inline-flex items-center justify-center gap-2 text-center min-h-[44px]"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
