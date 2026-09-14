import React, { useState, useRef } from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, Briefcase, Sparkles, UserCheck, Volume2, VolumeX } from 'lucide-react';
import { CONSULTANT_INFO } from '../data';
import heroBgPoster from '../assets/images/hero_consulting_bg_1789358194495.jpg';

const HERO_VIDEO_URL = 'https://xd92d5z735f07l9p.public.blob.vercel-storage.com/AD.mp4';

interface HeroProps {
  onBookConsultation?: () => void;
  onGetInTouch: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookConsultation, onGetInTouch }) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted) {
        videoRef.current.play().catch(() => {});
      }
    } else {
      setIsMuted((prev) => !prev);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-slate-950"
    >
      {/* Background Video with Layered Gradient Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src={HERO_VIDEO_URL}
          poster={heroBgPoster}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover object-center opacity-65 scale-105 transition-opacity duration-700"
        />
        {/* Balanced deep navy and dark slate vignette overlays for 50% more video visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/45 to-slate-950/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/60" />
        <div className="absolute inset-0 bg-grid-pattern opacity-15" />
      </div>

      {/* Floating Audio Control Widget */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20">
        <button
          onClick={toggleMute}
          id="hero-audio-toggle-btn"
          aria-label={isMuted ? "Unmute hero video audio" : "Mute hero video audio"}
          className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all shadow-xl backdrop-blur-md cursor-pointer ${
            isMuted
              ? 'bg-slate-900/85 hover:bg-slate-850 text-slate-300 border-slate-700/80 hover:border-slate-600 hover:text-white shadow-black/40'
              : 'bg-blue-600/90 hover:bg-blue-500 text-white border-blue-400/60 shadow-blue-600/25 ring-2 ring-blue-500/20'
          }`}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold">Unmute Video</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-white animate-pulse" />
              <span className="text-xs font-semibold">Sound Active</span>
            </>
          )}
        </button>
      </div>

      {/* Subtle ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center z-10">
          {/* Personal Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-blue-500/30 text-blue-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm shadow-blue-500/10">
            <UserCheck className="w-4 h-4 text-blue-400" />
            <span>Strategic Business Advisory • Aniket Dubey</span>
          </div>

          {/* Main Personal Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.14] mb-6 max-w-4xl drop-shadow-md">
            Helping Founders & Growing Businesses Turn Strategic Vision Into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
              Sustainable Reality.
            </span>
          </h1>

          {/* Personal Subtitle / Statement */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed max-w-3xl mb-8 mx-auto drop-shadow-sm">
            I'm <strong className="text-white font-bold">Aniket Dubey</strong>, a Business Consultant with over 10 years of experience. I work directly with entrepreneurs and executives to solve operational friction, build high-authority <strong className="text-white font-semibold">content marketing engines</strong>, and deploy resilient <strong className="text-white font-semibold">managed IT infrastructure</strong>.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10">
            <a
              href={CONSULTANT_INFO.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="hero-book-consultation-cta"
              onClick={() => onBookConsultation?.()}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-xl transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 cursor-pointer w-full sm:w-auto"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onGetInTouch}
              id="hero-get-in-touch-cta"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-300 hover:text-white bg-transparent hover:bg-slate-900 border border-slate-800 rounded-xl transition-all cursor-pointer w-full sm:w-auto"
            >
              <span>Get in Touch</span>
            </button>
          </div>

          {/* Credibility & Personal Principles */}
          <div className="pt-6 border-t border-slate-800/80 w-full flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-400 mb-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-slate-300">10+ Years Hands-On Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-slate-300">Direct 1-on-1 Advisory (No Junior Staff)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-slate-300">Zero Canned Corporate Templates</span>
            </div>
          </div>

          {/* Location & Status Pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-4 py-2 bg-slate-900/80 border border-slate-800/80 rounded-xl text-xs text-slate-400 mx-auto">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300">Consultant & Practice Principal</span>
            </span>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <span className="text-blue-400 font-medium">{CONSULTANT_INFO.locationName}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
