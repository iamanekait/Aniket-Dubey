import React from 'react';
import { ArrowRight, Phone, Mail, ShieldCheck } from 'lucide-react';
import { CONSULTANT_INFO } from '../data';

interface CallToActionProps {
  onScheduleClick: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onScheduleClick }) => {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-[#08090E] to-[#0E1017] border-t border-amber-500/15 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/35 text-amber-300 text-xs font-semibold mb-6">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
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
            className="w-full sm:w-auto sm:min-w-[260px] inline-flex items-center justify-center gap-2.5 px-10 py-4 text-sm sm:text-base font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 hover:brightness-105 active:scale-95 rounded-xl transition-all shadow-xl shadow-amber-500/25 cursor-pointer"
          >
            <span>Schedule a Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={`tel:${CONSULTANT_INFO.phone}`}
            id="cta-direct-call-btn"
            className="w-full sm:w-auto sm:min-w-[260px] inline-flex items-center justify-center gap-2 px-10 py-4 text-sm sm:text-base font-semibold text-amber-200 hover:text-white bg-[#0E1017] border border-amber-500/30 hover:border-amber-400/60 rounded-xl transition-all hover:bg-amber-950/30"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>{CONSULTANT_INFO.formattedPhone}</span>
          </a>
        </div>

        <p className="text-xs text-slate-400">
          Direct consulting by Aniket Dubey • No obligations • All inquiries reviewed personally
        </p>
      </div>
    </section>
  );
};
