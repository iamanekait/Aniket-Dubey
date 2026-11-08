import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { About } from '../components/About';
import { SEO } from '../components/SEO';
import { getAboutSchema } from '../utils/seoSchemas';
import { Award, ArrowRight, BookOpen } from 'lucide-react';
import { PERSONAL_MANIFESTO } from '../data';
import heroAboutBg from '../assets/images/hero_about_bg_1794111040219.jpg';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  const aboutStructuredData = getAboutSchema();

  return (
    <div className="pb-20 bg-[#080808]">
      {/* React Helmet SEO Meta Tags */}
      <SEO
        title="About Aniket Dubey | Founder-First Strategic Business Advisory Partner"
        description="Meet Aniket Dubey: a founder-first strategic business advisory partner with 10+ years of experience helping founders untangle operational friction and build resilient, scalable businesses."
        keywords="About Aniket Dubey, Founder-First Advisory Partner, Business Consultant Biography, Advisory Philosophy, Strategic Business Advisor, Durgapur, West Bengal"
        canonicalPath="/about"
        ogType="profile"
        jsonLd={aboutStructuredData}
      />

      {/* Hero Header with Background Image & Layered Overlays */}
      <section className="relative overflow-hidden border-b border-[#292929] bg-[#080808] pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={heroAboutBg}
            alt="Executive Advisory Office & Strategy Boardroom"
            className="w-full h-full object-cover object-center opacity-40 scale-105 transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/90 via-[#080808]/75 to-[#080808]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/85 via-transparent to-[#080808]/85" />
          <div className="absolute inset-0 bg-grid-pattern opacity-25" />
        </div>

        {/* Ambient Burnt Orange Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#D15301]/10 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-[#B94700]/10 rounded-full blur-3xl pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D15301]/10 border border-[#D15301]/30 text-[#D15301] text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-md">
              Founder-First Advisory Partner
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F5F2ED] tracking-tight leading-tight mb-4 drop-shadow-md">
              Hi, I'm Aniket Dubey.
            </h1>
            <p className="text-base sm:text-xl font-medium text-[#D15301] mb-4">
              A founder-first strategic business advisory partner.
            </p>
            <p className="text-base sm:text-lg text-[#A6A6A6] leading-relaxed drop-shadow-sm">
              I help business owners, founders, and growing enterprises untangle operational chaos, establish market authority through strategic content marketing, and build resilient managed IT systems.
            </p>
          </div>
        </div>
      </section>

      {/* Main About Component */}
      <About onScheduleClick={() => navigate('/contact')} />

      {/* Personal Manifesto Section */}
      <section className="py-16 bg-[#080808] border-t border-[#292929]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D15301] mb-2 block">
              Core Convictions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F2ED]">
              My Personal Advisory Manifesto
            </h2>
            <p className="text-sm text-[#A6A6A6] mt-2">
              The values that dictate every advisory relationship and ensure client growth is genuine and long-lasting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {PERSONAL_MANIFESTO.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#121212] border border-[#292929] hover:border-[#D15301]/40 rounded-2xl p-6 sm:p-7 space-y-3 transition-all shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#D15301] uppercase tracking-wider">
                    Principle 0{idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-[#F5F2ED] px-2 py-0.5 rounded bg-[#080808] border border-[#292929]">
                    {item.tagline}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#F5F2ED]">{item.principle}</h3>
                <p className="text-xs sm:text-sm text-[#A6A6A6] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Dive on Experience & Audience */}
      <section className="py-16 bg-[#080808] border-t border-[#292929]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F2ED]">
                Who I Typically Partner With
              </h2>
              <p className="text-sm text-[#A6A6A6] leading-relaxed">
                Consulting engagements are designed for decision-makers who value direct, transparent advice and tangible execution rather than prolonged academic studies:
              </p>
              <ul className="space-y-3 text-sm text-[#F5F2ED]/90">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#D15301]/15 border border-[#D15301]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#D15301] text-xs">✓</div>
                  <span><strong className="text-white">SMB Owners & Entrepreneurs:</strong> Needing structured strategic direction, revenue systems, or operational sanity as they scale.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#D15301]/15 border border-[#D15301]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#D15301] text-xs">✓</div>
                  <span><strong className="text-white">Early-Stage & Growth Startups:</strong> Seeking clear market positioning, sustainable unit economics, and reliable digital infrastructure.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#D15301]/15 border border-[#D15301]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#D15301] text-xs">✓</div>
                  <span><strong className="text-white">Companies Modernizing IT & Marketing:</strong> Transitioning away from fragmented software tools to cohesive managed IT systems and content marketing engines.</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#121212] border border-[#292929] rounded-2xl p-8 space-y-6 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#D15301]/15 border border-[#D15301]/40 rounded-xl text-[#D15301]">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#F5F2ED]">Direct Principal Advisory</h3>
                  <p className="text-xs text-[#D15301]">10+ Years Consulting Background</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#A6A6A6] leading-relaxed italic">
                "My commitment is straightforward: understand your business context deeply, analyze reality objectively, build strategies tailored specifically to your needs, and support execution till completion."
              </p>
              <div className="pt-4 border-t border-[#292929] flex items-center justify-between">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A6A6A6] hover:text-[#F5F2ED]"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#D15301]" />
                  <span>Explore Services</span>
                </Link>
                <button
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D15301] hover:text-[#B94700] cursor-pointer"
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
