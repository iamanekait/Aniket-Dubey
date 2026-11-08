import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { CONSULTING_APPROACH } from '../data';

export const Approach: React.FC = () => {
  return (
    <section id="approach" className="py-20 lg:py-28 bg-[#080808] border-t border-[#292929] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D15301]/10 border border-[#D15301]/30 text-[#D15301] text-xs font-bold uppercase tracking-wider mb-4">
            Consulting Methodology
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F2ED] tracking-tight leading-tight mb-4">
            A Structured 4-Step Framework for Strategic Results.
          </h2>
          <p className="text-base sm:text-lg text-[#A6A6A6] leading-relaxed">
            Every engagement follows a systematic progression designed to minimize business disruption while maximizing execution clarity.
          </p>
        </div>

        {/* 4-Step Horizontal / Responsive Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {CONSULTING_APPROACH.map((step, index) => (
            <div
              key={step.number}
              className="bg-[#121212] border border-[#292929] hover:border-[#D15301]/40 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-[#D15301]/10 relative overflow-hidden"
            >
              {/* Step Number */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D15301] via-[#FFA86B] to-[#B94700]">
                    {step.number}
                  </span>
                  <span className="text-[11px] font-bold tracking-widest text-[#D15301] uppercase">
                    Stage {index + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#F5F2ED] mb-2.5">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#A6A6A6] leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              {/* Deliverables / Scope list */}
              <div className="pt-5 border-t border-[#292929] space-y-2">
                <p className="text-[10px] uppercase font-bold tracking-wider text-[#D15301]">
                  Key Deliverables:
                </p>
                {step.deliverables.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-xs text-[#F5F2ED]/80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D15301] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
