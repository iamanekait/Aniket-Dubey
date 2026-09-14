import React, { useState } from 'react';

export const USER_LOGO_URL =
  'https://xd92d5z735f07l9p.public.blob.vercel-storage.com/Create_logo_for_business_consultant_2K_20260914094451.jpeg';

export const LOCAL_LOGO_URL = '/logo-original.jpeg';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textColor?: 'light' | 'dark';
}

export const BrandMark: React.FC<{ size?: number; className?: string }> = ({
  size = 40,
  className = '',
}) => {
  const [useFallback, setUseFallback] = useState(false);

  if (!useFallback) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`relative shrink-0 rounded-xl overflow-hidden bg-white p-0.5 border border-slate-700/50 shadow-sm shadow-blue-500/10 flex items-center justify-center ${className}`}
      >
        <img
          src={USER_LOGO_URL}
          alt="Aniket Dubey Logo"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Try local copy first
            const target = e.currentTarget;
            if (target.src !== window.location.origin + LOCAL_LOGO_URL) {
              target.src = LOCAL_LOGO_URL;
            } else {
              setUseFallback(true);
            }
          }}
          className="w-full h-full object-contain rounded-lg"
        />
      </div>
    );
  }

  // Precision vector SVG monogram fallback
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="Aniket Dubey Monogram Logo"
    >
      <defs>
        <linearGradient id="markNavy" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="50%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#0F2B59" />
        </linearGradient>
        <linearGradient id="markGold" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="40%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
        <filter id="markGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.3" />
        </filter>
      </defs>

      <g filter="url(#markGlow)">
        <path d="M 46 14 L 56 14 L 20 84 L 8 84 Z" fill="url(#markNavy)" />
        <path d="M 48 14 L 55 14 L 66 38 L 57 41 Z" fill="#1E40AF" />
        <path d="M 52 54 L 68 84 L 56 84 L 46 64 Z" fill="#172554" />
        <path
          d="M 56 46 C 72 46, 84 54, 84 66 C 84 76, 73 84, 58 84 C 54 84, 51 83, 48 81 L 52 73 C 54 75, 56 76, 59 76 C 68 76, 74 71, 74 65 C 74 58, 66 53, 55 53 Z"
          fill="url(#markGold)"
        />
        <path
          d="M 12 56 C 24 57, 36 53, 46 44 C 54 36, 62 26, 72 16 L 68 12 L 88 12 L 88 32 L 83 27 C 74 37, 65 48, 54 55 C 41 64, 27 67, 12 63 Z"
          fill="url(#markGold)"
        />
      </g>
    </svg>
  );
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  textColor = 'light',
}) => {
  const markSizes = {
    sm: 32,
    md: 42,
    lg: 52,
    xl: 64,
  };

  const markPx = markSizes[size];

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <BrandMark size={markPx} />

      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-extrabold tracking-tight leading-none text-base sm:text-lg ${
              textColor === 'light' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Aniket Dubey
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
            <span
              className={`text-[10px] sm:text-xs font-semibold tracking-wider uppercase ${
                textColor === 'light' ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Business Consultant
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
