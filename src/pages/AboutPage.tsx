import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { About } from '../components/About';
import { SEO } from '../components/SEO';
import { Award, Target, Users, ArrowRight, BookOpen, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';
import { CONSULTANT_INFO, PERSONAL_MANIFESTO } from '../data';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  const aboutStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Person',
      name: CONSULTANT_INFO.name,
      jobTitle: CONSULTANT_INFO.title,
      description:
        'Business consultant with 10+ years of advisory experience helping founders and enterprises scale through strategic consulting, content marketing, and managed IT.',
      telephone: CONSULTANT_INFO.phone,
      email: CONSULTANT_INFO.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Road No. 36, Uttarpally, Benachity',
        addressLocality: 'Durgapur',
        addressRegion: 'West Bengal',
        addressCountry: 'IN',
      },
    },
  };

  return (
    <div className="pt-24 pb-20 bg-[#08090E]">
      {/* React Helmet SEO Meta Tags */}
      <SEO
        title="About Aniket Dubey | Founder-First Strategic Business Advisory Partner"
        description="Meet Aniket Dubey: a founder-first strategic business advisory partner with 10+ years of experience helping founders untangle operational friction and build resilient, scalable businesses."
        keywords="About Aniket Dubey, Founder-First Advisory Partner, Business Consultant Biography, Advisory Philosophy, Strategic Business Advisor, Durgapur, West Bengal"
        canonicalPath="/about"
        ogType="profile"
        jsonLd={aboutStructuredData}
      />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            Founder-First Advisory Partner
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Hi, I'm Aniket Dubey.
          </h1>
          <p className="text-base sm:text-xl font-medium text-amber-300 mb-4">
            A founder-first strategic business advisory partner.
          </p>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            I help business owners, founders, and growing enterprises untangle operational chaos, establish market authority through strategic content marketing, and build resilient managed IT systems.
          </p>
        </div>
      </div>

      {/* Main About Component */}
      <About onScheduleClick={() => navigate('/contact')} />

      {/* Personal Manifesto Section */}
      <section className="py-16 bg-[#0B0D14]/80 border-t border-amber-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 block">
              Core Convictions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              My Personal Advisory Manifesto
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              The values that dictate every advisory relationship and ensure client growth is genuine and long-lasting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {PERSONAL_MANIFESTO.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#08090E] border border-amber-500/20 hover:border-amber-400/40 rounded-2xl p-6 sm:p-7 space-y-3 transition-all shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Principle 0{idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-amber-200 px-2 py-0.5 rounded bg-[#151824] border border-amber-500/25">
                    {item.tagline}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{item.principle}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Dive on Experience & Audience */}
      <section className="py-16 bg-[#08090E] border-t border-amber-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Who I Typically Partner With
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Consulting engagements are designed for decision-makers who value direct, transparent advice and tangible execution rather than prolonged academic studies:
              </p>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-950/80 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5 text-amber-400 text-xs">✓</div>
                  <span><strong>SMB Owners & Entrepreneurs:</strong> Needing structured strategic direction, revenue systems, or operational sanity as they scale.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-950/80 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5 text-amber-400 text-xs">✓</div>
                  <span><strong>Early-Stage & Growth Startups:</strong> Seeking clear market positioning, sustainable unit economics, and reliable digital infrastructure.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-950/80 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5 text-amber-400 text-xs">✓</div>
                  <span><strong>Companies Modernizing IT & Marketing:</strong> Transitioning away from fragmented software tools to cohesive managed IT systems and content marketing engines.</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#0E1017] border border-amber-500/25 rounded-2xl p-8 space-y-6 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-500/15 border border-amber-500/35 rounded-xl text-amber-400">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Direct Principal Advisory</h3>
                  <p className="text-xs text-amber-400/90">10+ Years Consulting Background</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                "My commitment is straightforward: understand your business context deeply, analyze reality objectively, build strategies tailored specifically to your needs, and support execution till completion."
              </p>
              <div className="pt-4 border-t border-amber-500/15 flex items-center justify-between">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>Explore Services</span>
                </Link>
                <button
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 cursor-pointer"
                >
                  <span>Connect With Aniket</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
