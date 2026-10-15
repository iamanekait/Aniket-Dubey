import React from 'react';
import { Layers, Shuffle, CheckCircle, ArrowRight } from 'lucide-react';

interface CrossIndustryProps {
  onScheduleClick: () => void;
}

export const CrossIndustry: React.FC<CrossIndustryProps> = ({ onScheduleClick }) => {
  return (
    <section className="py-20 lg:py-24 bg-[#0B0D14]/80 border-t border-amber-500/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#121520] via-[#08090E] to-[#121520] border border-amber-500/30 rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          {/* Subtle accent glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
                Cross-Industry Expertise
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Experience across industries. Strategies tailored to your business.
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
                Because Aniket works across multiple industries and verticals, the consulting approach never relies on rigid industry clichés. Rather, it adapts directly to each client's specific market dynamics, customer acquisition cycles, organizational structure, and technological maturity.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-4 text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <span>Objective evaluation of your competitive landscape</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <span>Adaptable frameworks tuned to B2B and B2C sales cycles</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <span>Cross-pollination of tested growth and operational models</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <span>Custom IT & content workflows designed around your team</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:items-start lg:items-end justify-center">
              <div className="bg-[#08090E] border border-amber-500/25 p-6 rounded-2xl w-full text-center sm:text-left space-y-4 shadow-xl">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-400/90">
                  Tailored Discovery
                </p>
                <p className="text-sm text-slate-300">
                  Curious how Aniket's approach applies to your specific sector or operating model?
                </p>
                <button
                  onClick={onScheduleClick}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 hover:brightness-105 active:scale-95 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-amber-500/25 cursor-pointer"
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
