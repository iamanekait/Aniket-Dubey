import React from 'react';
import { ArrowRight, Phone, Mail, ShieldCheck } from 'lucide-react';
import { CONSULTANT_INFO } from '../data';

interface CallToActionProps {
  onScheduleClick: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onScheduleClick }) => {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-slate-950 to-slate-900 border-t border-slate-800/80 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/90 border border-blue-800/60 text-blue-300 text-xs font-semibold mb-6">
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          <span>Confidential, High-Value Strategic Consultation</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
          Let's Build Your Next Stage of Growth.
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
          Whether you are facing market headwinds, seeking to professionalize your IT infrastructure, or ready to turn content marketing into a consistent revenue engine, let's discuss your challenges and outline a practical path forward.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 max-w-2xl mx-auto mb-10">
          <button
            onClick={onScheduleClick}
            id="cta-schedule-consultation-btn"
            className="w-full sm:w-auto sm:min-w-[260px] inline-flex items-center justify-center gap-2.5 px-10 py-4 text-sm sm:text-base font-bold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-xl transition-all shadow-xl shadow-blue-600/25 cursor-pointer"
          >
            <span>Schedule a Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={`tel:${CONSULTANT_INFO.phone}`}
            id="cta-direct-call-btn"
            className="w-full sm:w-auto sm:min-w-[260px] inline-flex items-center justify-center gap-2 px-10 py-4 text-sm sm:text-base font-semibold text-slate-200 hover:text-white bg-slate-900 border border-slate-700/80 rounded-xl transition-all hover:bg-slate-800"
          >
            <Phone className="w-4 h-4 text-blue-400" />
            <span>{CONSULTANT_INFO.formattedPhone}</span>
          </a>
        </div>

        <p className="text-xs text-slate-500">
          Direct consulting by Aniket Dubey • No obligations • All inquiries reviewed personally
        </p>
      </div>
    </section>
  );
};
