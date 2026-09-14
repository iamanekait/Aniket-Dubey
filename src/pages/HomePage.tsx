import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Briefcase, Layers, Server, Cpu, Award, Sparkles, UserCheck } from 'lucide-react';
import { Hero } from '../components/Hero';
import { SERVICES, PERSONAL_MANIFESTO, CONSULTANT_INFO } from '../data';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <Hero
        onBookConsultation={() => navigate('/contact')}
        onGetInTouch={() => navigate('/contact')}
      />

      {/* Personal Advisory Principles / Manifesto */}
      <section className="py-20 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2 block">
              Advisory Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              How I Think & Advise
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Consulting is only as valuable as its real-world implementation. Here are the core convictions that anchor every client engagement I undertake.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PERSONAL_MANIFESTO.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-950/80 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400 mb-4 font-bold text-sm group-hover:scale-105 transition-transform">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">{item.principle}</h3>
                  <span className="text-xs font-semibold text-blue-400 block mb-3">{item.tagline}</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Practice Areas Overview */}
      <section className="py-20 bg-slate-900/30 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2 block">
                Practice Areas
              </span>
              <h2 className="text-3xl font-extrabold text-white">How I Can Support Your Business</h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>Explore Detailed Scope & Deliverables</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s) => (
              <div
                key={s.id}
                className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 px-2 py-0.5 rounded-full bg-blue-950/80 border border-blue-800/50 inline-block mb-3">
                    {s.tag}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-1">{s.title}</h3>
                  <p className="text-xs text-slate-400 mb-4">{s.subtitle}</p>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                    {s.description}
                  </p>
                </div>
                <Link
                  to="/services"
                  className="text-xs font-semibold text-blue-400 hover:text-white inline-flex items-center gap-1 pt-3 border-t border-slate-800/60"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Engagement Call to Action Banner */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-200 block mb-1">
              Direct Advisory With Aniket Dubey
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to untangle operational complexity?
            </h2>
            <p className="text-sm text-blue-100 mt-1">
              Connect with Aniket for a focused discovery conversation regarding your business growth, content strategy, or IT requirements.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              to="/services"
              className="px-5 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all border border-blue-500/40"
            >
              Explore Services
            </Link>
            <a
              href={CONSULTANT_INFO.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg inline-flex items-center gap-2"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
