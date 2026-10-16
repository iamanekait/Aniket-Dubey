import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      id="scroll-to-top-btn"
      aria-label="Scroll back to top of page"
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 p-2.5 sm:p-3 rounded-full bg-slate-900/90 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-700 hover:border-blue-500 shadow-xl shadow-black/50 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center backdrop-blur-md"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};
