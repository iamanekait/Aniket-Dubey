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
import { WHY_WORK_WITH_ANIKET, WHY_ANIKET_CONTENT, CONSULTANT_INFO } from '../data';

export const RecognitionPage: React.FC = () => {
  const navigate = useNavigate();

  const recognitionStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Recognition | Aniket Dubey Felicitated by Technext Technosoft Pvt. Ltd.',
    description:
      'Corporate recognition of Aniket Dubey by Technext Technosoft Pvt. Ltd. for scaling their global brand iWebNext for over 10 years. Independent IT Contractor & Business Advisory Partner.',
    mainEntity: {
      '@type': 'Person',
      name: 'Aniket Dubey',
      jobTitle: 'Independent IT Contractor & Business Advisory Partner',
      worksFor: {
        '@type': 'Organization',
        name: 'iWebNext (North American brand of Technext Technosoft Pvt. Ltd.)',
      },
      description: WHY_ANIKET_CONTENT.paragraphs[0],
    },
    itemListElement: WHY_WORK_WITH_ANIKET.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.title,
      description: item.description,
    })),
  };

  return (
    <div className="pt-24 pb-20 bg-slate-950 text-slate-100 min-h-screen">
      {/* React Helmet SEO Meta Tags */}
      <SEO
        title="Recognition | Aniket Dubey - Felicitated by Technext Technosoft Pvt. Ltd."
        description="Corporate recognition of Aniket Dubey by Technext Technosoft Pvt. Ltd. for scaling their global brand iWebNext for over 10 years. Independent IT Contractor & Business Advisory Partner."
        keywords="Recognition, Aniket Dubey, Felicitation, Technext Technosoft Pvt Ltd, iWebNext, Global Brand Scaling, 10 Years Experience, Independent IT Contractor, Business Advisory Partner"
        canonicalPath="/recognition"
        ogType="website"
        jsonLd={recognitionStructuredData}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-950 py-16 sm:py-24">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/50 text-blue-400 text-xs font-bold uppercase tracking-wider mb-5 backdrop-blur-sm">
              <Award className="w-3.5 h-3.5 text-blue-400" />
              <span>Corporate Recognition & Milestone</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
              Recognition & Global Brand Milestone.
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
              Felicitated by <span className="text-white font-semibold">Technext Technosoft Pvt. Ltd.</span> in honor of scaling their flagship brand, <span className="text-blue-400 font-semibold">iWebNext</span>, at a global level for over 10 years.
            </p>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800/80 text-left">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="text-2xl font-black text-blue-400">10+ Years</div>
                <div className="text-xs text-slate-400 mt-0.5">Scaling iWebNext</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="text-2xl font-black text-white">Technext</div>
                <div className="text-xs text-slate-400 mt-0.5">Corporate Felicitation</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="text-2xl font-black text-emerald-400">Global</div>
                <div className="text-xs text-slate-400 mt-0.5">North American Brand</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="text-2xl font-black text-sky-400">Principal</div>
                <div className="text-xs text-slate-400 mt-0.5">Direct Advisory</div>
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
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl group">
                {/* Visual Ambient Accent */}
                <div className="absolute -top-10 -right-10 w-44 h-44 bg-blue-600/20 rounded-full blur-2xl pointer-events-none" />

                <img
                  src="https://xd92d5z735f07l9p.public.blob.vercel-storage.com/IMG-20260715-WA0270.jpg"
                  alt="Aniket Dubey being felicitated by Technext Technosoft Pvt. Ltd. for scaling their brand iWebNext at a global level for over 10 years"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto max-h-[580px] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />

                {/* Overlay Badge Bar */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-600/40 border border-blue-400/50 text-blue-200 text-xs font-bold uppercase tracking-wider mb-2 backdrop-blur-md">
                    <Award className="w-3.5 h-3.5 text-blue-300" />
                    <span>Corporate Felicitation Ceremony</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {CONSULTANT_INFO.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-200 mt-1 font-medium">
                    Felicitated by Technext Technosoft Pvt. Ltd. &bull; Scaling iWebNext Globally
                  </p>
                </div>
              </div>

              {/* Formal Felicitation Citation Card */}
              <div className="bg-gradient-to-br from-blue-950/40 via-slate-900/80 to-slate-950 border border-blue-800/40 rounded-2xl p-6 space-y-3.5 shadow-xl">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-blue-400">Official Felicitation</div>
                    <h3 className="text-sm font-bold text-white mt-0.5">Technext Technosoft Pvt. Ltd.</h3>
                    <p className="text-xs text-slate-400">10+ Years Brand Scaling Milestone</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Pictured above: <strong>Aniket Dubey</strong> being formally felicitated by the executive leadership of <strong>Technext Technosoft Pvt. Ltd.</strong> in honor of his decade-long contribution in scaling and establishing their North American brand, <strong>iWebNext</strong>, into an international technology success.
                </p>

                <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                  <span className="px-2.5 py-1 rounded-md bg-blue-950/80 border border-blue-800/60 text-blue-300 font-medium">
                    Executive Honor
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 font-medium">
                    10+ Years Dedication
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 font-medium">
                    Global Brand Scaling
                  </span>
                </div>
              </div>


              {/* Trust Guarantee Note */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Zero Junior Delegation:</strong> Every engagement is led directly and personally by Aniket Dubey with transparent communication and tailored strategies.
                </span>
              </div>
            </div>

            {/* Right Column: Narrative & Professional Model */}
            <div className="lg:col-span-7 space-y-12">
              
              {/* Lead Headline */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/80 border border-blue-800/40 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
                  The Foundation & Advisory Philosophy
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
                  Recognized Leadership Grounded in Practical Execution.
                </h2>
              </div>

              {/* Single Symmetrical Paragraph Narrative */}
              <div className="p-7 sm:p-9 rounded-2xl bg-slate-950/90 border border-slate-800/90 hover:border-slate-700/80 transition-colors shadow-2xl space-y-6">
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                  Choosing the right technology and business advisory partner can make all the difference in turning business challenges into opportunities for growth. With over 10 years of professional experience working with <span className="text-white font-medium">iWebNext</span>, the North American brand of <span className="text-white font-medium">Technext Technosoft Pvt. Ltd.</span>, Aniket Dubey brings a wealth of industry experience, technical understanding, and business-oriented thinking to every engagement. As an independent IT contractor and Business Advisory Partner, he combines technology expertise with a practical understanding of business needs to help organizations identify opportunities, overcome challenges, and build strategies aligned with their long-term objectives. Aniket believes that technology should do more than support day-to-day operations; it should create meaningful business value, improve efficiency, and open doors to new possibilities. His approach focuses on understanding each client's unique goals, evaluating their requirements, and identifying practical, scalable solutions that align with their business priorities. By bridging the gap between technical capabilities and strategic decision-making, he helps businesses make more informed choices, optimize their processes, and navigate an increasingly technology-driven marketplace with greater confidence. What sets Aniket apart is his commitment to building relationships based on trust, transparency, and collaboration. He understands that every business has its own challenges, ambitions, and constraints, which is why he values a personalized approach rather than a one-size-fits-all solution.
                </p>

                <div className="pt-2 flex items-center justify-end border-t border-slate-800/80">
                  <button
                    onClick={() => navigate('/contact')}
                    className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 group cursor-pointer transition-colors"
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
      <section className="py-20 bg-slate-900/30 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/80 border border-blue-800/40 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
              The Difference in Approach
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              A Contrast in Values, Focus, and Execution.
            </h2>
            <p className="text-base text-slate-400 mt-3 leading-relaxed">
              How partnering with a recognized independent contractor and business advisor creates lasting competitive advantage compared to standard consulting or fragmented vendors.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="py-4 px-5 text-slate-400 font-semibold text-xs uppercase tracking-wider w-1/3">
                    Dimension
                  </th>
                  <th className="py-4 px-5 text-slate-500 font-semibold text-xs uppercase tracking-wider w-1/3">
                    Generic Agency / Big Consulting
                  </th>
                  <th className="py-4 px-5 text-blue-400 font-bold text-xs uppercase tracking-wider w-1/3 bg-blue-950/30 rounded-t-xl border-x border-t border-blue-900/40">
                    Aniket Dubey's Recognized Standard
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="py-4 px-5 font-medium text-white">Role of Technology</td>
                  <td className="py-4 px-5 text-slate-400">
                    <span className="flex items-center gap-2 text-rose-400/90">
                      <X className="w-4 h-4 shrink-0" />
                      <span>Treated as an isolated expense or routine support</span>
                    </span>
                  </td>
                  <td className="py-4 px-5 text-slate-200 bg-blue-950/20 border-x border-blue-900/40">
                    <span className="flex items-center gap-2 text-emerald-400">
                      <Check className="w-4 h-4 shrink-0" />
                      <span>Drives meaningful business value, efficiency & growth</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-medium text-white">Solution Methodology</td>
                  <td className="py-4 px-5 text-slate-400">
                    <span className="flex items-center gap-2 text-rose-400/90">
                      <X className="w-4 h-4 shrink-0" />
                      <span>One-size-fits-all playbooks and recycled slide decks</span>
                    </span>
                  </td>
                  <td className="py-4 px-5 text-slate-200 bg-blue-950/20 border-x border-blue-900/40">
                    <span className="flex items-center gap-2 text-emerald-400">
                      <Check className="w-4 h-4 shrink-0" />
                      <span>Personalized to your unique constraints and goals</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-medium text-white">Accountability & Involvement</td>
                  <td className="py-4 px-5 text-slate-400">
                    <span className="flex items-center gap-2 text-rose-400/90">
                      <X className="w-4 h-4 shrink-0" />
                      <span>Delegated to junior account associates after pitch</span>
                    </span>
                  </td>
                  <td className="py-4 px-5 text-slate-200 bg-blue-950/20 border-x border-blue-900/40">
                    <span className="flex items-center gap-2 text-emerald-400">
                      <Check className="w-4 h-4 shrink-0" />
                      <span>Direct principal engagement: work directly with Aniket</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-medium text-white">Strategic & Technical Synergy</td>
                  <td className="py-4 px-5 text-slate-400">
                    <span className="flex items-center gap-2 text-rose-400/90">
                      <X className="w-4 h-4 shrink-0" />
                      <span>IT teams and business advisors operate in disconnected silos</span>
                    </span>
                  </td>
                  <td className="py-4 px-5 text-slate-200 bg-blue-950/20 border-x border-blue-900/40">
                    <span className="flex items-center gap-2 text-emerald-400">
                      <Check className="w-4 h-4 shrink-0" />
                      <span>Bridges technical capabilities directly with executive strategy</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-medium text-white">Long-Term Orientation</td>
                  <td className="py-4 px-5 text-slate-400">
                    <span className="flex items-center gap-2 text-rose-400/90">
                      <X className="w-4 h-4 shrink-0" />
                      <span>Creating dependency-driven, open-ended billing retainers</span>
                    </span>
                  </td>
                  <td className="py-4 px-5 text-slate-200 bg-blue-950/20 border-x border-b border-blue-900/40 rounded-b-xl">
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
