import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  HeartHandshake,
  Check,
  X,
} from 'lucide-react';
import { WhyWorkWithAniket } from '../components/WhyWorkWithAniket';
import { CrossIndustry } from '../components/CrossIndustry';
import { CallToAction } from '../components/CallToAction';
import { SEO } from '../components/SEO';
import { getRecognitionSchema } from '../utils/seoSchemas';
import { CONSULTANT_INFO } from '../data';
import heroRecognitionBg from '../assets/images/hero_recognition_bg_1794111042462.jpg';

export const RecognitionPage: React.FC = () => {
  const navigate = useNavigate();

  const recognitionStructuredData = getRecognitionSchema();

  return (
    <div className="pb-20 bg-[#080808] text-[#F5F2ED] min-h-screen">
      {/* React Helmet SEO Meta Tags */}
      <SEO
        title="Recognition & Felicitation | Aniket Dubey - Technext Technosoft Pvt. Ltd."
        description="Corporate recognition of Aniket Dubey by Technext Technosoft Pvt. Ltd. for scaling their global brand iWebNext for over 10 years as an Independent IT Contractor & Business Advisory Partner."
        keywords="Recognition, Aniket Dubey, Felicitation, Technext Technosoft Pvt Ltd, iWebNext, Global Brand Scaling, 10 Years Experience, Independent IT Contractor, Business Advisory Partner"
        canonicalPath="/recognition"
        ogType="website"
        jsonLd={recognitionStructuredData}
      />

      {/* Hero Header with Background Image & Layered Overlays */}
      <section className="relative overflow-hidden border-b border-[#292929] bg-[#080808] pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={heroRecognitionBg}
            alt="Corporate Felicitation Ceremony and Global Brand Milestone Stage"
            className="w-full h-full object-cover object-center opacity-60 scale-105 transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/80 via-[#080808]/60 to-[#080808]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/70 via-transparent to-[#080808]/70" />
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        </div>

        {/* Ambient background glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D15301]/10 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute -bottom-10 left-10 w-80 h-80 bg-[#B94700]/10 rounded-full blur-3xl pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D15301]/10 border border-[#D15301]/30 text-[#D15301] text-xs font-bold uppercase tracking-wider mb-5 backdrop-blur-md">
              <Award className="w-3.5 h-3.5 text-[#D15301]" />
              <span>Corporate Recognition & Milestone</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F5F2ED] tracking-tight leading-[1.15] mb-6 drop-shadow-md">
              Recognition & Global Brand Milestone.
            </h1>
            <p className="text-lg sm:text-xl text-[#A6A6A6] leading-relaxed font-normal">
              Felicitated by <span className="text-white font-semibold">Technext Technosoft Pvt. Ltd.</span> in honor of scaling their flagship brand, <span className="text-[#D15301] font-semibold">iWebNext</span>, at a global level for over 10 years.
            </p>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-[#292929] text-left">
              <div className="p-3 rounded-xl bg-[#121212] border border-[#292929]">
                <div className="text-2xl font-black text-[#D15301]">10+ Years</div>
                <div className="text-xs text-[#A6A6A6] mt-0.5">Scaling iWebNext</div>
              </div>
              <div className="p-3 rounded-xl bg-[#121212] border border-[#292929]">
                <div className="text-2xl font-black text-white">Technext</div>
                <div className="text-xs text-[#A6A6A6] mt-0.5">Corporate Felicitation</div>
              </div>
              <div className="p-3 rounded-xl bg-[#121212] border border-[#292929]">
                <div className="text-2xl font-black text-emerald-400">Global</div>
                <div className="text-xs text-[#A6A6A6] mt-0.5">North American Brand</div>
              </div>
              <div className="p-3 rounded-xl bg-[#121212] border border-[#292929]">
                <div className="text-2xl font-black text-[#FFA86B]">Principal</div>
                <div className="text-xs text-[#A6A6A6] mt-0.5">Direct Advisory</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Core Narrative Section: Aniket's Profile + Felicitation Context */}
      <section className="py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column (Sticky Desktop): High-Res Felicitation Card & Milestone Details */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
              <div className="relative rounded-2xl overflow-hidden border border-[#292929] bg-[#030303] shadow-2xl group">
                {/* Visual Ambient Accent */}
                <div className="absolute -top-10 -right-10 w-44 h-44 bg-[#D15301]/20 rounded-full blur-2xl pointer-events-none" />

                <img
                  src="https://xd92d5z735f07l9p.public.blob.vercel-storage.com/IMG-20260715-WA0270.jpg"
                  alt="Aniket Dubey being felicitated by Technext Technosoft Pvt. Ltd. for scaling their brand iWebNext at a global level for over 10 years"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto max-h-[580px] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />

                {/* Overlay Badge Bar */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 bg-gradient-to-t from-[#030303] via-[#030303]/90 to-transparent z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#D15301]/30 border border-[#D15301]/50 text-white text-xs font-bold uppercase tracking-wider mb-2 backdrop-blur-md">
                    <Award className="w-3.5 h-3.5 text-[#FFA86B]" />
                    <span>Corporate Felicitation Ceremony</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F5F2ED] tracking-tight">
                    {CONSULTANT_INFO.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#A6A6A6] mt-1 font-medium">
                    Felicitated by Technext Technosoft Pvt. Ltd. &bull; Scaling iWebNext Globally
                  </p>
                </div>
              </div>

              {/* Formal Felicitation Citation Card */}
              <div className="bg-gradient-to-br from-[#121212] via-[#080808] to-[#121212] border border-[#292929] rounded-2xl p-6 space-y-3.5 shadow-xl">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#D15301]/15 border border-[#D15301]/30 flex items-center justify-center text-[#D15301] shrink-0 mt-0.5">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#D15301]">Official Felicitation</div>
                    <h3 className="text-sm font-bold text-[#F5F2ED] mt-0.5">Technext Technosoft Pvt. Ltd.</h3>
                    <p className="text-xs text-[#A6A6A6]">10+ Years Brand Scaling Milestone</p>
                  </div>
                </div>

                <p className="text-xs text-[#A6A6A6] leading-relaxed">
                  Pictured above: <strong className="text-white">Aniket Dubey</strong> being formally felicitated by the executive leadership of <strong className="text-white">Technext Technosoft Pvt. Ltd.</strong> in honor of his decade-long contribution in scaling and establishing their North American brand, <strong className="text-white">iWebNext</strong>, into an international technology success.
                </p>

                <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                  <span className="px-2.5 py-1 rounded-md bg-[#D15301]/15 border border-[#D15301]/30 text-[#D15301] font-medium">
                    Executive Honor
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#080808] border border-[#292929] text-[#A6A6A6] font-medium">
                    10+ Years Dedication
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#080808] border border-[#292929] text-[#A6A6A6] font-medium">
                    Global Brand Scaling
                  </span>
                </div>
              </div>

              {/* Trust Guarantee Note */}
              <div className="p-4 rounded-xl bg-[#121212] border border-[#292929] text-xs text-[#A6A6A6] flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#F5F2ED]">Zero Junior Delegation:</strong> Every engagement is led directly and personally by Aniket Dubey with transparent communication and tailored strategies.
                </span>
              </div>
            </div>

            {/* Right Column: Narrative & Professional Model */}
            <div className="lg:col-span-7 space-y-12">
              
              {/* Lead Headline */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D15301]/10 border border-[#D15301]/30 text-[#D15301] text-xs font-bold uppercase tracking-wider mb-4">
                  The Foundation & Advisory Philosophy
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F5F2ED] tracking-tight leading-snug">
                  Recognized Leadership Grounded in Practical Execution.
                </h2>
              </div>

              {/* Single Symmetrical Paragraph Narrative */}
              <div className="p-7 sm:p-9 rounded-2xl bg-[#121212] border border-[#292929] hover:border-[#D15301]/40 transition-colors shadow-2xl space-y-6">
                <p className="text-base sm:text-lg text-[#F5F2ED]/90 leading-relaxed">
                  Choosing the right technology and business advisory partner can make all the difference in turning business challenges into opportunities for growth. With over 10 years of professional experience working with <span className="text-white font-medium">iWebNext</span>, the North American brand of <span className="text-white font-medium">Technext Technosoft Pvt. Ltd.</span>, Aniket Dubey brings a wealth of industry experience, technical understanding, and business-oriented thinking to every engagement. As an independent IT contractor and Business Advisory Partner, he combines technology expertise with a practical understanding of business needs to help organizations identify opportunities, overcome challenges, and build strategies aligned with their long-term objectives. Aniket believes that technology should do more than support day-to-day operations; it should create meaningful business value, improve efficiency, and open doors to new possibilities. His approach focuses on understanding each client's unique goals, evaluating their requirements, and identifying practical, scalable solutions that align with their business priorities. By bridging the gap between technical capabilities and strategic decision-making, he helps businesses make more informed choices, optimize their processes, and navigate an increasingly technology-driven marketplace with greater confidence. What sets Aniket apart is his commitment to building relationships based on trust, transparency, and collaboration. He understands that every business has its own challenges, ambitions, and constraints, which is why he values a personalized approach rather than a one-size-fits-all solution.
                </p>

                <div className="pt-2 flex items-center justify-end border-t border-[#292929]">
                  <button
                    onClick={() => navigate('/contact')}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#D15301] hover:text-[#B94700] group cursor-pointer transition-colors"
                  >
                    <span>Connect with Aniket</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Strategic Comparison Table: Recognized Track Record vs Generic Consulting */}
      <section className="py-20 bg-[#080808] border-t border-[#292929]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D15301]/10 border border-[#D15301]/30 text-[#D15301] text-xs font-bold uppercase tracking-wider mb-4">
              The Difference in Approach
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F2ED] tracking-tight">
              A Contrast in Values, Focus, and Execution.
            </h2>
            <p className="text-base text-[#A6A6A6] mt-3 leading-relaxed">
              How partnering with a recognized independent contractor and business advisor creates lasting competitive advantage compared to standard consulting or fragmented vendors.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-[#292929]">
                  <th className="py-4 px-5 text-[#A6A6A6] font-semibold text-xs uppercase tracking-wider w-1/3">
                    Dimension
                  </th>
                  <th className="py-4 px-5 text-[#A6A6A6]/70 font-semibold text-xs uppercase tracking-wider w-1/3">
                    Generic Agency / Big Consulting
                  </th>
                  <th className="py-4 px-5 text-[#D15301] font-bold text-xs uppercase tracking-wider w-1/3 bg-[#D15301]/10 rounded-t-xl border-x border-t border-[#D15301]/30">
                    Aniket Dubey's Recognized Standard
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#292929]">
                <tr>
                  <td className="py-4 px-5 font-medium text-[#F5F2ED]">Role of Technology</td>
                  <td className="py-4 px-5 text-[#A6A6A6]">
                    <span className="flex items-center gap-2 text-rose-400/90">
                      <X className="w-4 h-4 shrink-0" />
                      <span>Treated as an isolated expense or routine support</span>
                    </span>
                  </td>
                  <td className="py-4 px-5 text-[#F5F2ED] bg-[#D15301]/5 border-x border-[#D15301]/20">
                    <span className="flex items-center gap-2 text-emerald-400">
                      <Check className="w-4 h-4 shrink-0" />
                      <span>Drives meaningful business value, efficiency & growth</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-medium text-[#F5F2ED]">Solution Methodology</td>
                  <td className="py-4 px-5 text-[#A6A6A6]">
                    <span className="flex items-center gap-2 text-rose-400/90">
                      <X className="w-4 h-4 shrink-0" />
                      <span>One-size-fits-all playbooks and recycled slide decks</span>
                    </span>
                  </td>
                  <td className="py-4 px-5 text-[#F5F2ED] bg-[#D15301]/5 border-x border-[#D15301]/20">
                    <span className="flex items-center gap-2 text-emerald-400">
                      <Check className="w-4 h-4 shrink-0" />
                      <span>Personalized to your unique constraints and goals</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-medium text-[#F5F2ED]">Accountability & Involvement</td>
                  <td className="py-4 px-5 text-[#A6A6A6]">
                    <span className="flex items-center gap-2 text-rose-400/90">
                      <X className="w-4 h-4 shrink-0" />
                      <span>Delegated to junior account associates after pitch</span>
                    </span>
                  </td>
                  <td className="py-4 px-5 text-[#F5F2ED] bg-[#D15301]/5 border-x border-[#D15301]/20">
                    <span className="flex items-center gap-2 text-emerald-400">
                      <Check className="w-4 h-4 shrink-0" />
                      <span>Direct principal engagement: work directly with Aniket</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-medium text-[#F5F2ED]">Strategic & Technical Synergy</td>
                  <td className="py-4 px-5 text-[#A6A6A6]">
                    <span className="flex items-center gap-2 text-rose-400/90">
                      <X className="w-4 h-4 shrink-0" />
                      <span>IT teams and business advisors operate in disconnected silos</span>
                    </span>
                  </td>
                  <td className="py-4 px-5 text-[#F5F2ED] bg-[#D15301]/5 border-x border-[#D15301]/20">
                    <span className="flex items-center gap-2 text-emerald-400">
                      <Check className="w-4 h-4 shrink-0" />
                      <span>Bridges technical capabilities directly with executive strategy</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-medium text-[#F5F2ED]">Long-Term Orientation</td>
                  <td className="py-4 px-5 text-[#A6A6A6]">
                    <span className="flex items-center gap-2 text-rose-400/90">
                      <X className="w-4 h-4 shrink-0" />
                      <span>Creating dependency-driven, open-ended billing retainers</span>
                    </span>
                  </td>
                  <td className="py-4 px-5 text-[#F5F2ED] bg-[#D15301]/5 border-x border-b border-[#D15301]/20 rounded-b-xl">
                    <span className="flex items-center gap-2 text-emerald-400">
                      <Check className="w-4 h-4 shrink-0" />
                      <span>Sustainable growth, internal capability & lasting progress</span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6 Core Pillars Component */}
      <WhyWorkWithAniket />

      {/* Cross Industry Section */}
      <CrossIndustry onScheduleClick={() => navigate('/contact')} />

      {/* High-Impact CTA */}
      <CallToAction onScheduleClick={() => navigate('/contact')} />
    </div>
  );
};

export const WhyAniketPage = RecognitionPage;
