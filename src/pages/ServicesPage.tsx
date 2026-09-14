import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Services } from '../components/Services';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ServicesPageProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onSelectService }) => {
  const navigate = useNavigate();

  const handleSelectService = (serviceName: string) => {
    onSelectService(serviceName);
    navigate('/contact');
  };

  return (
    <div className="pt-24 pb-20 bg-slate-950">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/80 border border-blue-800/40 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            Specialized Practice Areas
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Tailored Consulting Services Built for Execution and Impact.
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Explore the four core service pillars tailored to your company's stage, challenges, and long-term strategic objectives.
          </p>
        </div>
      </div>

      {/* Services Grid with Modals */}
      <Services onSelectService={handleSelectService} />

      {/* Cross-Service Advisory Banner */}
      <section className="py-16 bg-slate-900/40 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Need a combination of Business Consulting and Managed IT?
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Most growing businesses require integrated advisory where digital infrastructure, content communication, and business planning reinforce one another.
              </p>
            </div>
            <button
              onClick={() => handleSelectService('Integrated Business + IT Advisory')}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-600/20 shrink-0 cursor-pointer inline-flex items-center gap-2"
            >
              <span>Discuss Integrated Advisory</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
