import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';

// Long-form pages where reading progress is most valuable
const LONG_FORM_ROUTES = ['/about', '/services', '/approach', '/why-aniket'];

export const ReadingProgressBar: React.FC = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [readPercent, setReadPercent] = useState(0);

  // Hook directly into scroll progress via motion
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const isLongFormPage = LONG_FORM_ROUTES.includes(location.pathname);

  useEffect(() => {
    if (!isLongFormPage) {
      setIsVisible(false);
      return;
    }

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setReadPercent(Math.round(latest * 100));
      // Show progress bar once user begins scrolling (e.g., > 1%)
      setIsVisible(latest > 0.01);
    });

    return () => unsubscribe();
  }, [scrollYProgress, isLongFormPage]);

  if (!isLongFormPage) return null;

  return (
    <div
      id="reading-progress-container"
      aria-hidden="true"
      className={`fixed top-0 left-0 right-0 z-[60] pointer-events-none transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Background track (subtle translucent guide) */}
      <div className="w-full h-[3px] bg-slate-900/60 backdrop-blur-xs relative overflow-hidden">
        {/* Animated Reading Progress Bar */}
        <motion.div
          id="reading-progress-bar"
          style={{ scaleX, transformOrigin: '0%' }}
          className="h-full w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
        />
      </div>

      {/* Optional micro indicator badge that appears when reading deep into long content */}
      {readPercent > 5 && readPercent < 98 && (
        <div className="hidden sm:flex absolute top-2 right-4 items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-800 text-[10px] font-semibold text-slate-300 shadow-md backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>{readPercent}% read</span>
        </div>
      )}
    </div>
  );
};
