import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Approach } from '../components/Approach';
import { StrategicAssessment } from '../components/StrategicAssessment';
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

  return (
    <div className="pt-24 pb-20 bg-slate-950">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/80 border border-blue-800/40 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            Methodology & Framework
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            How Aniket Works With You.
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            A disciplined, 4-step framework engineered to ensure clarity, eliminate guesswork, and execute tailored business strategies.
          </p>
        </div>
      </div>

      {/* Main 4-Step Approach Component */}
      <Approach />

      {/* Interactive Growth Diagnostic Tool */}
      <StrategicAssessment onPreFillEnquiry={handlePreFill} />

      {/* Final Action */}
      <section className="py-16 bg-slate-900/50 border-t border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to apply this methodology to your organization?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Schedule an initial discovery call to review your current challenges, timeline, and strategic priorities.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-blue-600/25 cursor-pointer"
          >
            <span>Initiate Discovery Phase</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
