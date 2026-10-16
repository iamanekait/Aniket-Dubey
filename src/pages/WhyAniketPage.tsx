import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowRight,
  Shield,
  Award,
  Sparkles,
  TrendingUp,
  Cpu,
  HeartHandshake,
  Mail,
  Calendar,
  Building2,
  Check,
  X,
  Linkedin,
  Instagram,
} from 'lucide-react';
import { WhyWorkWithAniket } from '../components/WhyWorkWithAniket';
import { CrossIndustry } from '../components/CrossIndustry';
import { CallToAction } from '../components/CallToAction';
import { SEO } from '../components/SEO';
import { WHY_WORK_WITH_ANIKET, WHY_ANIKET_CONTENT, CONSULTANT_INFO } from '../data';

export const WhyAniketPage: React.FC = () => {
  const navigate = useNavigate();

  const whyStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Why Choose Aniket Dubey | Technology & Business Advisory Partner',
    description:
      'With over 10 years of professional experience with iWebNext (North American brand of Technext Technosoft Pvt. Ltd.), Aniket Dubey provides independent IT contracting and business advisory services.',
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
        title="Why Choose Aniket Dubey | Technology & Business Advisory Partner"
        description="With over 10 years of professional experience with iWebNext, North American brand of Technext Technosoft Pvt. Ltd., Aniket Dubey turns business challenges into opportunities for growth."
        keywords="Why Choose Aniket Dubey, iWebNext, Technext Technosoft Pvt Ltd, Independent IT Contractor, Business Advisory Partner, Technology Strategy, Durgapur, Kolkata, Pan-India"
        canonicalPath="/why-aniket"
        ogType="website"
        jsonLd={whyStructuredData}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-950 py-16 sm:py-24">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/50 text-blue-400 text-xs font-bold uppercase tracking-wider mb-5 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Technology & Business Advisory Partner</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
              Turning Business Challenges Into Opportunities For Growth.
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
              With over 10 years of professional experience with{' '}
              <span className="text-blue-400 font-medium">iWebNext</span>, the North American brand of{' '}
              <span className="text-slate-100 font-medium">Technext Technosoft Pvt. Ltd.</span>, Aniket Dubey bridges the gap between technical capabilities and strategic decision-making.
            </p>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800/80">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="text-2xl font-black text-blue-400">10+ Years</div>
                <div className="text-xs text-slate-400 mt-0.5">Industry Experience</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="text-2xl font-black text-white">iWebNext</div>
                <div className="text-xs text-slate-400 mt-0.5">North American Brand</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="text-2xl font-black text-emerald-400">1-on-1</div>
                <div className="text-xs text-slate-400 mt-0.5">Principal Advisory</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="text-2xl font-black text-sky-400">100%</div>
                <div className="text-xs text-slate-400 mt-0.5">Tailored Solutions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Core Narrative Section: Aniket's Profile + Full 4-Paragraph Narrative */}
      <section className="py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column (Sticky Desktop): High-Res Profile Card & Credential Snapshot */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl group">
                {/* Visual Ambient Accent */}
                <div className="absolute -top-10 -right-10 w-44 h-44 bg-blue-600/20 rounded-full blur-2xl pointer-events-none" />

                <img
                  src="https://xd92d5z735f07l9p.public.blob.vercel-storage.com/IMG-20260715-WA0270.jpg"
                  alt="Aniket Dubey - Independent IT Contractor & Business Advisory Partner"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto max-h-[580px] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />

                {/* Overlay Badge Bar */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-600/30 border border-blue-500/50 text-blue-300 text-xs font-bold uppercase tracking-wider mb-2 backdrop-blur-md">
                    <Shield className="w-3.5 h-3.5 text-blue-400" />
                    <span>Independent IT Contractor & Business Advisory Partner</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {CONSULTANT_INFO.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
                    10+ Years Professional Track Record &bull; iWebNext
                  </p>
                </div>
              </div>

              {/* Fast Action Card */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-800/40 flex items-center justify-center text-blue-400">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Technext Technosoft Pvt. Ltd.</h3>
                    <p className="text-xs text-slate-400">iWebNext North American Brand</p>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Available for strategic advisory engagements, enterprise IT contractor mandates, and technology modernization initiatives across India and internationally.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => navigate('/contact')}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/25 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Schedule an Exploratory Call</span>
                  </button>
                  <a
                    href="mailto:email@aniketdubey.com?cc=aniketdubey.2012@gmail.com"
                    className="inline-flex items-center justify-center gap-2 py-3 px-4 bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs sm:text-sm font-semibold rounded-xl border border-slate-800 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </a>
                </div>

                {/* Direct Social Channels */}
                <div className="pt-3 border-t border-slate-800/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Social & Professional Connect
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={CONSULTANT_INFO.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 hover:bg-blue-950/40 text-slate-300 hover:text-white flex items-center justify-center gap-2 text-xs font-semibold transition-all group"
                    >
                      <Linkedin className="w-4 h-4 text-blue-400 shrink-0" />
                      <span className="truncate">LinkedIn</span>
                    </a>
                    <a
                      href={CONSULTANT_INFO.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-pink-500/50 hover:bg-pink-950/30 text-slate-300 hover:text-white flex items-center justify-center gap-2 text-xs font-semibold transition-all group"
                    >
                      <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                      <span className="truncate">Instagram</span>
                    </a>
                  </div>
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

            {/* Right Column: The Complete 4-Paragraph Narrative, Structured by Theme */}
            <div className="lg:col-span-7 space-y-12">
              
              {/* Lead Headline */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/80 border border-blue-800/40 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
                  The Philosophy & Engagement Model
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
                  A Practical Blend of Experience, Personalized Attention, and Results-Oriented Execution.
                </h2>
              </div>

              {/* Single Symmetrical Paragraph Narrative */}
              <div className="p-7 sm:p-9 rounded-2xl bg-slate-950/90 border border-slate-800/90 hover:border-slate-700/80 transition-colors shadow-2xl space-y-6">
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                  Choosing the right technology and business advisory partner can make all the difference in turning business challenges into opportunities for growth. With over 10 years of professional experience working with <span className="text-white font-medium">iWebNext</span>, the North American brand of <span className="text-white font-medium">Technext Technosoft Pvt. Ltd.</span>, Aniket Dubey brings a wealth of industry experience, technical understanding, and business-oriented thinking to every engagement. As an independent IT contractor and Business Advisory Partner, he combines technology expertise with a practical understanding of business needs to help organizations identify opportunities, overcome challenges, and build strategies aligned with their long-term objectives. Aniket believes that technology should do more than support day-to-day operations; it should create meaningful business value, improve efficiency, and open doors to new possibilities. His approach focuses on understanding each client's unique goals, evaluating their requirements, and identifying practical, scalable solutions that align with their business priorities. By bridging the gap between technical capabilities and strategic decision-making, he helps businesses make more informed choices, optimize their processes, and navigate an increasingly technology-driven marketplace with greater confidence. What sets Aniket apart is his commitment to building relationships based on trust, transparency, and collaboration. He understands that every business has its own challenges, ambitions, and constraints, which is why he values a personalized approach rather than a one-size-fits-all solution. Whether supporting IT initiatives, advising on business direction, or helping organizations evaluate opportunities for improvement, Aniket strives to deliver thoughtful guidance and solutions that address real-world needs, with an emphasis on clear communication, dependable collaboration, and long-term value to ensure that the focus remains on outcomes that matter to each client. With a strong foundation built through more than a decade of professional experience, Aniket is committed to helping businesses connect their vision with the right technology and strategic direction, serving as a trusted partner who understands the bigger picture, recognizes the importance of sustainable growth, and offers an unmatched blend of experience, personalized attention, and a results-oriented mindset.
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80">
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                      10+ Years Professional Experience
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-blue-400">
                      iWebNext & Technext Technosoft
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-400">
                      Direct Advisory
                    </span>
                  </div>

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

      {/* Strategic Comparison Table: Why Aniket vs Generic Consulting */}
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
              How partnering with an independent contractor and business advisor creates lasting competitive advantage compared to standard consulting or fragmented vendors.
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
                    Partnering With Aniket Dubey
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
