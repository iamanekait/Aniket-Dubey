import React from 'react';
import { ArrowRight, Phone, ShieldCheck } from 'lucide-react';
import { CONSULTANT_INFO } from '../data';

interface CallToActionProps {
  onScheduleClick: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onScheduleClick }) => {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-[#121212] to-[#080808] border-t border-[#292929] relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#D15301]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D15301]/10 border border-[#D15301]/30 text-[#D15301] text-xs font-semibold mb-6">
          <ShieldCheck className="w-4 h-4 text-[#D15301]" />
          <span>Confidential, High-Value Strategic Consultation</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F2ED] tracking-tight leading-tight mb-6">
          Let's Build Your Next Stage of Growth.
        </h2>

        <p className="text-base sm:text-lg text-[#A6A6A6] max-w-2xl mx-auto leading-relaxed mb-10">
          Whether you are facing market headwinds, seeking to professionalize your IT infrastructure, or ready to turn content marketing into a consistent revenue engine, let's discuss your challenges and outline a practical path forward.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 max-w-2xl mx-auto mb-10">
          <button
            onClick={onScheduleClick}
            id="cta-schedule-consultation-btn"
            className="w-full sm:w-auto sm:min-w-[260px] inline-flex items-center justify-center gap-2.5 px-10 py-4 text-sm sm:text-base font-bold text-white bg-[#D15301] hover:bg-[#B94700] active:scale-95 rounded-xl transition-all shadow-xl shadow-[#D15301]/25 cursor-pointer"
          >
            <span>Schedule a Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={`tel:${CONSULTANT_INFO.phone}`}
            id="cta-direct-call-btn"
            className="group w-full sm:w-auto sm:min-w-[260px] inline-flex items-center justify-center gap-2 px-10 py-4 text-sm sm:text-base font-semibold text-[#D15301] hover:text-white bg-transparent hover:bg-[#D15301] border border-[#D15301] rounded-xl transition-all shadow-md shadow-black/40"
          >
            <Phone className="w-4 h-4 text-[#D15301] group-hover:text-white transition-colors" />
            <span>{CONSULTANT_INFO.formattedPhone}</span>
          </a>
        </div>

        <p className="text-xs text-[#A6A6A6]/80">
          Direct consulting by Aniket Dubey • No obligations • All inquiries reviewed personally
        </p>
      </div>
    </section>
  );
};
