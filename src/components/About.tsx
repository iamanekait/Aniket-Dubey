import React from 'react';
import { UserCheck, Compass, Target, CheckCircle2, Shield, ArrowRight } from 'lucide-react';
import { CONSULTANT_INFO, TARGET_AUDIENCE_PILLARS } from '../data';

interface AboutProps {
  onScheduleClick: () => void;
}

export const About: React.FC<AboutProps> = ({ onScheduleClick }) => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-slate-900/60 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/80 border border-blue-800/40 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            About Aniket Dubey
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            A Strategic Partner for Businesses Seeking Sustainable Growth.
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Visual Profile Card & Core Credibility Highlights */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
              {/* Background gradient element */}
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

              {/* Consultant Emblem */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-blue-600/30">
                  AD
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white leading-tight">{CONSULTANT_INFO.name}</h3>
                  <p className="text-sm font-medium text-blue-400">{CONSULTANT_INFO.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{CONSULTANT_INFO.experience} Cross-Industry Advisory</p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-5">
                <div className="flex items-start gap-3">
                  <UserCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Direct Principal Attention</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Engagements are led directly by Aniket Dubey — no handoffs to junior account handlers or automated ticket queues.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Compass className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Cross-Vertical Perspective</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Over a decade of working alongside companies across varied sectors, unlocking unique cross-pollinated insights.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Commercial + Technical Literacy</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      A cohesive bridge uniting business strategy, revenue-generating content marketing, and resilient IT infrastructure.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Action Button */}
              <div className="mt-8 pt-6 border-t border-slate-800/80">
                <button
                  onClick={onScheduleClick}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 hover:bg-slate-850 border border-slate-700 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  <span>Request an Exploratory Call</span>
                  <ArrowRight className="w-4 h-4 text-blue-400" />
                </button>
              </div>
            </div>

            {/* Location & Practice Base */}
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 text-xs text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span>Operating from Durgapur, West Bengal</span>
              </span>
              <span className="text-slate-300 font-medium">Pan-India & Remote</span>
            </div>
          </div>

          {/* Right Column: Consulting Philosophy & Who We Serve */}
          <div className="lg:col-span-7 space-y-8">
            {/* The Consulting Philosophy */}
            <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Consulting Built Around Understanding First, Executing Second.
              </h3>
              <p>
                Aniket Dubey is an experienced Business Consultant with more than a decade of experience working across multiple industries and verticals. Rather than applying pre-packaged templates or superficial advice, Aniket practices a strictly personalized consulting philosophy.
              </p>
              <p className="text-slate-400 text-base">
                Every business possesses distinct operational dynamics, team capabilities, and market friction points. Aniket works intimately with business leaders to understand their operating realities, diagnose root opportunities and challenges, and architect practical strategies aligned directly to their specific revenue and organizational objectives.
              </p>
            </div>

            {/* Target Audience Breakdown */}
            <div className="pt-6 border-t border-slate-800/80">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
                Who We Primarily Advise
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                {TARGET_AUDIENCE_PILLARS.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/70 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                      <h5 className="text-sm font-bold text-white">{pillar.title}</h5>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
