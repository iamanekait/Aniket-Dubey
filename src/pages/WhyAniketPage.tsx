import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WhyWorkWithAniket } from '../components/WhyWorkWithAniket';
import { CrossIndustry } from '../components/CrossIndustry';
import { CallToAction } from '../components/CallToAction';

export const WhyAniketPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-24 pb-20 bg-slate-950">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/80 border border-blue-800/40 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            Consultant Value & Distinctives
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Why Business Leaders Choose to Work with Aniket Dubey.
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Personal attention, 10+ years of cross-industry insight, and practical solutions tailored specifically to your business reality.
          </p>
        </div>
      </div>

      {/* 6 Core Pillars Component */}
      <WhyWorkWithAniket />

      {/* Cross Industry Section */}
      <CrossIndustry onScheduleClick={() => navigate('/contact')} />

      {/* High-Impact CTA */}
      <CallToAction onScheduleClick={() => navigate('/contact')} />
    </div>
  );
};
