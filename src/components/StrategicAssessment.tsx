import React, { useState } from 'react';
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

interface StrategicAssessmentProps {
  onPreFillEnquiry: (service: string, summary: string) => void;
}

export const StrategicAssessment: React.FC<StrategicAssessmentProps> = ({ onPreFillEnquiry }) => {
  const [stage, setStage] = useState<'early' | 'growth' | 'mature'>('growth');
  const [priority, setPriority] = useState<'marketing' | 'it' | 'operations' | 'strategy'>('strategy');

  const getRecommendation = () => {
    switch (priority) {
      case 'marketing':
        return {
          service: 'Strategic Content Marketing',
          diagnosis: 'Your organization has valuable subject matter expertise, but your current marketing isn’t effectively communicating that value to qualified decision-makers.',
          focus: [
            'Architecting audience-first editorial positioning',
            'Developing thought leadership content assets for B2B/B2C trust',
            'Establishing structured distribution to generate inbound customer inquiries'
          ]
        };
      case 'it':
        return {
          service: 'Managed IT Services',
          diagnosis: 'Your technology setup may be reactive, creating operational friction, downtime vulnerabilities, or software sprawl that hinders growth.',
          focus: [
            'Comprehensive audit of current infrastructure and security safeguards',
            'Transition to proactive monitoring, scheduled backups, and vendor optimization',
            'Implementing reliable ongoing support without high in-house IT overhead'
          ]
        };
      case 'operations':
        return {
          service: 'Business & Technology Strategy',
          diagnosis: 'Disconnection between team workflows and digital tools is causing manual duplication, delayed handoffs, and resource waste.',
          focus: [
            'Mapping core operational workflows to identify digital bottlenecks',
            'Rationalizing software subscriptions to eliminate digital redundancies',
            'Deploying modern, scalable workflow automations'
          ]
        };
      case 'strategy':
      default:
        return {
          service: 'Business Consulting',
          diagnosis: 'Your business has established traction, but lacks a cohesive multi-quarter strategic roadmap to scale predictably.',
          focus: [
            'Objective audit of business unit economics and growth constraints',
            'Formulating a prioritized 90-day and 12-month strategic execution blueprint',
            'Executive decision frameworks to focus capital and team energy'
          ]
        };
    }
  };

  const rec = getRecommendation();

  return (
    <section className="py-20 bg-[#080808] border-t border-[#292929] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D15301]/10 border border-[#D15301]/30 text-[#D15301] text-xs font-bold uppercase tracking-wider mb-4">
            Interactive Diagnostic
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F2ED] tracking-tight leading-tight mb-4">
            Identify Your Highest-Leverage Growth Priority.
          </h2>
          <p className="text-base text-[#A6A6A6]">
            Select your current business stage and primary operational focus to view the recommended consulting framework.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-6 bg-[#121212] border border-[#292929] rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#F5F2ED] mb-3">
                1. What is your current business stage?
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  { key: 'early', label: 'Startup / Early', sub: 'Refining Model' },
                  { key: 'growth', label: 'Scaling SMB', sub: 'Growing Revenue' },
                  { key: 'mature', label: 'Established', sub: 'Modernizing Operations' },
                ].map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setStage(s.key as any)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      stage === s.key
                        ? 'bg-[#D15301]/15 border-[#D15301] text-[#F5F2ED] shadow-sm shadow-[#D15301]/10 font-semibold'
                        : 'bg-[#080808] border-[#292929] text-[#A6A6A6] hover:border-[#D15301]/30'
                    }`}
                  >
                    <div className="text-xs font-bold leading-tight">{s.label}</div>
                    <div className="text-[10px] text-[#A6A6A6]/80 mt-1">{s.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#F5F2ED] mb-3">
                2. Where is your biggest current bottleneck or priority?
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  {
                    key: 'strategy',
                    title: 'Strategic Direction',
                    desc: 'Need clarity on scaling, positioning & priorities',
                  },
                  {
                    key: 'marketing',
                    title: 'Marketing & Content',
                    desc: 'Content not converting or generating qualified leads',
                  },
                  {
                    key: 'it',
                    title: 'Managed IT Systems',
                    desc: 'Downtime, tech issues, lack of proactive IT support',
                  },
                  {
                    key: 'operations',
                    title: 'Workflow & Tech Strategy',
                    desc: 'Disconnected software, manual tasks, slow execution',
                  },
                ].map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => setPriority(p.key as any)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      priority === p.key
                        ? 'bg-[#D15301]/15 border-[#D15301] text-white ring-1 ring-[#D15301]/50 shadow-sm shadow-[#D15301]/10'
                        : 'bg-[#080808] border-[#292929] text-[#A6A6A6] hover:border-[#D15301]/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#F5F2ED]">{p.title}</span>
                      {priority === p.key && <CheckCircle className="w-3.5 h-3.5 text-[#D15301]" />}
                    </div>
                    <span className="text-[11px] text-[#A6A6A6]">{p.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Diagnostic Result Card */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#121212] to-[#080808] border border-[#292929] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#292929] pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#D15301]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#D15301]">
                  Recommended Consulting Alignment
                </span>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#080808] text-[#D15301] border border-[#292929] font-semibold">
                Stage: {stage.toUpperCase()}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#F5F2ED] mb-2">{rec.service}</h3>
              <p className="text-sm text-[#A6A6A6] leading-relaxed">{rec.diagnosis}</p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#D15301] mb-3">
                Key Strategic Focus in Engagement:
              </h4>
              <ul className="space-y-2.5">
                {rec.focus.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F5F2ED]/90">
                    <CheckCircle className="w-4 h-4 text-[#D15301] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[#292929]">
              <button
                type="button"
                onClick={() => {
                  const summary = `Priority: ${priority.toUpperCase()} at ${stage} stage. Interested in discussing ${rec.service}.`;
                  onPreFillEnquiry(rec.service, summary);
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#D15301] hover:bg-[#B94700] active:scale-95 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#D15301]/25 cursor-pointer"
              >
                <span>Discuss This Priority With Aniket</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
