import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface CrossIndustryProps {
  onScheduleClick: () => void;
}

export const CrossIndustry: React.FC<CrossIndustryProps> = ({ onScheduleClick }) => {
  return (
    <section className="py-20 lg:py-24 bg-[#080808] border-t border-[#292929] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#121212] via-[#080808] to-[#121212] border border-[#292929] rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          {/* Subtle accent glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D15301]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D15301]/10 border border-[#D15301]/30 text-[#D15301] text-xs font-bold uppercase tracking-wider">
                Cross-Industry Expertise
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F5F2ED] tracking-tight leading-tight">
                Experience across industries. Strategies tailored to your business.
              </h2>

              <p className="text-base sm:text-lg text-[#A6A6A6] leading-relaxed max-w-3xl">
                Because Aniket works across multiple industries and verticals, the consulting approach never relies on rigid industry clichés. Rather, it adapts directly to each client's specific market dynamics, customer acquisition cycles, organizational structure, and technological maturity.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-4 text-sm text-[#F5F2ED]/90">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#D15301] shrink-0 mt-1" />
                  <span>Objective evaluation of your competitive landscape</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#D15301] shrink-0 mt-1" />
                  <span>Adaptable frameworks tuned to B2B and B2C sales cycles</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#D15301] shrink-0 mt-1" />
                  <span>Cross-pollination of tested growth and operational models</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#D15301] shrink-0 mt-1" />
                  <span>Custom IT & content workflows designed around your team</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:items-start lg:items-end justify-center">
              <div className="bg-[#080808] border border-[#292929] p-6 rounded-2xl w-full text-center sm:text-left space-y-4 shadow-xl">
                <p className="text-xs font-bold uppercase tracking-wider text-[#D15301]">
                  Tailored Discovery
                </p>
                <p className="text-sm text-[#A6A6A6]">
                  Curious how Aniket's approach applies to your specific sector or operating model?
                </p>
                <button
                  onClick={onScheduleClick}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#D15301] hover:bg-[#B94700] active:scale-95 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#D15301]/25 cursor-pointer"
                >
                  <span>Discuss Your Sector Needs</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
