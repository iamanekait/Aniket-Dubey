import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Approach } from '../components/Approach';
import { StrategicAssessment } from '../components/StrategicAssessment';
import { SEO } from '../components/SEO';
import { CONSULTING_APPROACH } from '../data';
import { ArrowRight } from 'lucide-react';

interface ApproachPageProps {
  onPreFillEnquiry: (service: string, summary: string) => void;
}

export const ApproachPage: React.FC<ApproachPageProps> = ({ onPreFillEnquiry }) => {
  const navigate = useNavigate();

  const handlePreFill = (service: string, summary: string) => {
    onPreFillEnquiry(service, summary);
    navigate('/contact');
  };

  const approachStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Aniket Dubey Consulting Methodology',
    description: 'Disciplined 4-step consulting framework: Understand, Analyze, Strategize, and Scale.',
    itemListElement: CONSULTING_APPROACH.map((step, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `Step ${step.number}: ${step.title}`,
      description: step.description,
    })),
  };

  return (
    <div className="pt-24 pb-20 bg-[#08090E]">
      {/* React Helmet SEO Meta Tags */}
      <SEO
        title="Consulting Methodology & Approach | Aniket Dubey"
        description="Discover our structured 4-step consulting framework: Understand, Analyze, Strategize, and Scale to engineer durable commercial and operational success."
        keywords="Consulting Methodology, Business Advisory Process, Growth Strategy Framework, Workflow Optimization, 4-Step Consulting Approach, Aniket Dubey"
        canonicalPath="/approach"
        ogType="website"
        jsonLd={approachStructuredData}
      />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            Methodology & Framework
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            How Aniket Works With You.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            A disciplined, 4-step framework engineered to ensure clarity, eliminate guesswork, and execute tailored business strategies.
          </p>
        </div>
      </div>

      {/* Main 4-Step Approach Component */}
      <Approach />

      {/* Interactive Growth Diagnostic Tool */}
      <StrategicAssessment onPreFillEnquiry={handlePreFill} />

      {/* Final Action */}
      <section className="py-16 bg-[#0B0D14]/80 border-t border-amber-500/15">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to apply this methodology to your organization?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Schedule an initial discovery call to review your current challenges, timeline, and strategic priorities.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 hover:brightness-105 active:scale-95 text-slate-950 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-500/25 cursor-pointer"
          >
            <span>Initiate Discovery Phase</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
