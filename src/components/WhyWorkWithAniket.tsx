import React from 'react';
import { Award, Globe2, Sliders, Cpu, CheckSquare, HeartHandshake } from 'lucide-react';
import { WHY_WORK_WITH_ANIKET } from '../data';

export const WhyWorkWithAniket: React.FC = () => {
  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Award className="w-6 h-6 text-amber-400" />;
      case 1:
        return <Globe2 className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Sliders className="w-6 h-6 text-amber-300" />;
      case 3:
        return <Cpu className="w-6 h-6 text-yellow-300" />;
      case 4:
        return <CheckSquare className="w-6 h-6 text-amber-400" />;
      case 5:
        return <HeartHandshake className="w-6 h-6 text-amber-300" />;
      default:
        return <Award className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <section id="why-aniket" className="py-20 lg:py-28 bg-[#08090E]/80 border-t border-amber-500/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            Core Pillars of Partnership
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            The Strategic Advantage of Direct, High-Competence Advisory.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Combining technical expertise with a practical understanding of business needs to help organizations identify opportunities, overcome challenges, and build strategies aligned with long-term objectives.
          </p>
        </div>

        {/* 6 Key Pillars Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {WHY_WORK_WITH_ANIKET.map((item, idx) => (
            <div
              key={item.title}
              className="group bg-[#0E1017]/90 border border-amber-500/20 hover:border-amber-400/40 rounded-2xl p-6 sm:p-7 flex flex-col justify-start transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-950/20"
            >
              <div className="w-12 h-12 rounded-xl bg-[#151824] border border-amber-500/20 group-hover:border-amber-400/40 group-hover:bg-amber-950/40 flex items-center justify-center mb-5 transition-colors">
                {getIcon(idx)}
              </div>
              {'subtitle' in item && item.subtitle && (
                <div className="text-[11px] font-semibold text-amber-400/90 tracking-wide uppercase mb-1.5">
                  {item.subtitle}
                </div>
              )}
              <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-amber-200 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
