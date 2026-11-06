import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CONSULTANT_INFO } from '../data';
import heroBgPoster from '../assets/images/hero_consulting_bg_1789358194495.jpg';

const HERO_VIDEO_URL = 'https://xd92d5z735f07l9p.public.blob.vercel-storage.com/AD.mp4';

interface HeroProps {
  onBookConsultation?: () => void;
  onGetInTouch: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookConsultation, onGetInTouch }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] min-h-[90dvh] flex items-center pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden bg-[#08090E]"
    >
      {/* Background Video with Layered Gradient Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          src={HERO_VIDEO_URL}
          poster={heroBgPoster}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center opacity-60 scale-105 transition-opacity duration-700"
        />
        {/* Balanced deep obsidian and velvet noir vignette overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090E]/85 via-[#08090E]/55 to-[#08090E]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090E]/75 via-transparent to-[#08090E]/75" />
        <div className="absolute inset-0 bg-grid-pattern opacity-25" />
      </div>


      {/* Subtle blue and sky ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center z-10">
          {/* Main Personal Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.14] mb-6 max-w-4xl drop-shadow-md">
            Helping Founders & Growing Businesses Turn Strategic Vision Into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400">
              Sustainable Reality.
            </span>
          </h1>

          {/* Personal Subtitle / Statement */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed max-w-3xl mb-8 mx-auto drop-shadow-sm">
            I'm <strong className="text-white font-bold">Aniket Dubey</strong>, a founder-first strategic business advisory partner with over 10 years of hands-on experience. I work shoulder-to-shoulder with entrepreneurs and founders to solve operational friction, build high-authority <strong className="text-blue-300 font-semibold">content marketing engines</strong>, and deploy resilient <strong className="text-blue-300 font-semibold">managed IT infrastructure</strong>.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10">
            <a
              href={CONSULTANT_INFO.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="hero-book-consultation-cta"
              onClick={() => onBookConsultation?.()}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-bold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 active:scale-[0.98] rounded-xl transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 cursor-pointer w-full sm:w-auto"
            >
              <span>Book Founder Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onGetInTouch}
              id="hero-get-in-touch-cta"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl transition-all shadow-md shadow-black/40 cursor-pointer w-full sm:w-auto"
            >
              <span>Get in Touch</span>
            </button>
          </div>

          {/* Credibility & Personal Principles */}
          <div className="pt-6 border-t border-slate-800/80 w-full flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-400 mb-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-slate-300">Founder-First Strategic Partnership</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-slate-300">Direct 1-on-1 Principal Advisory</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-slate-300">Zero Canned Corporate Templates</span>
            </div>
          </div>

          {/* Location & Status Pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-4 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-400 mx-auto shadow-sm shadow-blue-500/5">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300">Consultant & Practice Principal</span>
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-300 font-medium">{CONSULTANT_INFO.locationName}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
