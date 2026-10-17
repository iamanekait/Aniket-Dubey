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
  ExternalLink,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { SEO } from '../components/SEO';
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
      <section className="py-16 sm:py-20 bg-slate-950 relative overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/40 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span>The Founder-First Promise</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              What It Means to Have a Founder-First Advisory Partner.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
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
                  className="bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 sm:p-6 transition-all duration-300 group flex flex-col justify-between shadow-lg hover:shadow-blue-500/10"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-950/50 border border-blue-800/40 flex items-center justify-center text-blue-400 mb-5 group-hover:scale-110 transition-transform">
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

      {/* Personal Advisory Principles / Manifesto */}
      <section className="py-16 sm:py-20 bg-slate-900/60 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2 block">
              Advisory Philosophy
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              How I Think & Advise
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Consulting is only as valuable as its real-world implementation. Here are the core convictions that anchor every client engagement I undertake.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {PERSONAL_MANIFESTO.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 group shadow-lg"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-800/40 flex items-center justify-center text-blue-400 mb-4 font-bold text-sm group-hover:scale-105 transition-transform">
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
        className="py-16 sm:py-24 bg-slate-950 border-b border-slate-800 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/80 border border-blue-800/40 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                <span>Media Gallery & Proof of Work</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Case Studies & Practice Highlights.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl">
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
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 font-bold'
                      : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
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
                className="bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-950/80 border border-blue-800/40 text-blue-400">
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
                  <div className="space-y-1.5 pt-3 border-t border-slate-800/80 mb-4">
                    {project.keyOutcomes.slice(0, 2).map((outcome, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to="/capabilities"
                  className="inline-flex items-center justify-between w-full pt-3 border-t border-slate-800/80 text-xs font-semibold text-blue-400 hover:text-blue-300 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Explore practice capabilities</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/capabilities"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all min-h-[44px]"
            >
              <span>Explore All Advisory Capabilities & Services</span>
              <ArrowRight className="w-4 h-4 text-blue-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* Core Practice Areas Overview */}
      <section className="py-16 sm:py-20 bg-slate-900/60 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2 block">
                Practice Areas
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">How I Can Support Your Business</h2>
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
                className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all shadow-lg"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 px-2 py-0.5 rounded-full bg-blue-950/80 border border-blue-800/40 inline-block mb-3">
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
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 pt-3 border-t border-slate-800/80 min-h-[36px]"
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
      <section className="py-14 sm:py-16 bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border-y border-slate-800 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left relative z-10">
          <div className="max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-400 block mb-1">
              Direct Advisory With Aniket Dubey
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to untangle operational complexity?
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Connect with Aniket for a focused discovery conversation regarding your business growth, content strategy, or IT requirements.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              to="/capabilities"
              className="w-full sm:w-auto px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all border border-slate-800 text-center min-h-[44px] flex items-center justify-center"
            >
              Explore Services
            </Link>
            <a
              href={CONSULTANT_INFO.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 active:scale-95 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-blue-600/25 inline-flex items-center justify-center gap-2 text-center min-h-[44px]"
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
