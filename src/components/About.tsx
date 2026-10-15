import React from 'react';
import { CheckCircle2, Shield, ArrowRight } from 'lucide-react';
import { CONSULTANT_INFO, TARGET_AUDIENCE_PILLARS } from '../data';

interface AboutProps {
  onScheduleClick: () => void;
}

export const About: React.FC<AboutProps> = ({ onScheduleClick }) => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#0B0D14]/80 border-t border-amber-500/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            Founder-First Advisory Partnership
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            A Founder-First Strategic Business Advisory Partner.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed">
            Navigating the intersection of founder vision, commercial revenue, and technical capability with radical candor and execution discipline.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Visual Profile Card & Core Credibility Highlights */}
          <div className="lg:col-span-5 space-y-6">
            {/* Picture of Aniket Dubey */}
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/25 bg-[#08090E] shadow-2xl group">
              {/* Subtle top ambient glow */}
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

              <img
                src="https://xd92d5z735f07l9p.public.blob.vercel-storage.com/1.jpg"
                alt="Aniket Dubey - Founder-First Business Advisory Partner"
                loading="lazy"
                decoding="async"
                className="w-full h-auto max-h-[580px] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />

              {/* Bottom gradient overlay with consultant identity */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 bg-gradient-to-t from-[#08090E] via-[#08090E]/90 to-transparent z-10">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2 backdrop-blur-md">
                  <span>Founder-First Partner</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                  {CONSULTANT_INFO.name}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-amber-100/90 mt-1">
                  Business Advisory Partner &bull; {CONSULTANT_INFO.experience} Experience
                </p>
              </div>
            </div>

            {/* Exploratory Call Quick Action */}
            <button
              onClick={onScheduleClick}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 hover:brightness-105 active:scale-[0.98] text-slate-950 text-sm font-bold rounded-xl transition-all shadow-lg shadow-amber-500/25 cursor-pointer"
            >
              <span>Request an Exploratory Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Location & Practice Base */}
            <div className="bg-[#08090E]/90 border border-amber-500/20 rounded-xl p-4 text-xs text-slate-300 flex items-center justify-between shadow-sm">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400" />
                <span>Operating from Durgapur, West Bengal</span>
              </span>
              <span className="text-amber-300 font-semibold">Pan-India & Remote</span>
            </div>
          </div>

          {/* Right Column: Consulting Philosophy & Who We Serve */}
          <div className="lg:col-span-7 space-y-8">
            {/* The Consulting Philosophy */}
            <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                An Advisory Partnership Built Around the Founder's Reality.
              </h3>
              <p>
                Aniket Dubey is a founder-first strategic business advisory partner with more than a decade of experience guiding entrepreneurs, scaling enterprises, and owner-operators. Rather than imposing detached academic theories or generic slides, Aniket steps into the founder's corner as an experienced, pragmatic co-pilot.
              </p>
              <p className="text-slate-400 text-base">
                Every business possesses distinct founder dynamics, team capabilities, and operational bottlenecks. Aniket works shoulder-to-shoulder with leadership to diagnose core constraints, protect founder bandwidth from endless firefighting, and architect practical roadmaps uniting strategic direction, content marketing authority, and secure managed IT infrastructure.
              </p>
            </div>

            {/* Target Audience Breakdown */}
            <div className="pt-6 border-t border-amber-500/15">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400/90 mb-4">
                Who We Primarily Advise
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                {TARGET_AUDIENCE_PILLARS.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="p-4 rounded-xl bg-[#0E1017]/90 border border-amber-500/20 hover:border-amber-400/40 transition-all hover:shadow-[0_4px_20px_rgba(212,175,55,0.06)]"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
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
