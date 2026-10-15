import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { CONSULTANT_INFO } from '../data';
import { BrandMark } from './BrandLogo';

interface NavbarProps {
  onBookConsultation?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll on small screens when drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Capabilities', path: '/capabilities' },
    { label: 'Approach', path: '/approach' },
    { label: 'Insights', path: '/insights' },
    { label: 'Why Aniket', path: '/why-aniket' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#08090E]/95 backdrop-blur-md border-b border-amber-500/20 shadow-lg shadow-black/40 py-3'
            : 'bg-[#08090E]/85 backdrop-blur-sm border-b border-amber-500/10 py-3.5 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand */}
            <Link
              to="/"
              id="nav-brand-link"
              onClick={() => setMobileMenuOpen(false)}
              className="group flex items-center gap-2.5 sm:gap-3 focus:outline-none focus:ring-2 focus:ring-amber-500/50 rounded-lg p-1 min-w-0"
            >
              <BrandMark size={36} className="sm:w-10 sm:h-10 group-hover:scale-105 transition-transform shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="text-base sm:text-lg font-bold text-white tracking-tight leading-none group-hover:text-amber-300 transition-colors truncate">
                  Aniket Dubey
                </span>
                <span className="text-[10px] sm:text-xs font-medium text-amber-400/80 tracking-wider uppercase mt-1 truncate">
                  Business Advisory Partner
                </span>
              </div>
            </Link>

            {/* Desktop Navigation with React Router NavLinks - lg breakpoint for optimal spacing */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.path}
                  id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  className={({ isActive }) =>
                    `px-3 xl:px-3.5 py-2 text-xs xl:text-sm font-medium rounded-lg transition-all ${
                      isActive
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/35 font-semibold shadow-sm shadow-amber-500/10'
                        : 'text-slate-300 hover:text-amber-200 hover:bg-[#121520]'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Direct CTA & Contact Action */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={CONSULTANT_INFO.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="nav-book-consultation-btn"
                className="inline-flex items-center justify-center gap-2 px-3.5 xl:px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 hover:brightness-105 active:scale-95 rounded-lg transition-all shadow-md shadow-amber-500/25 hover:shadow-amber-500/35 cursor-pointer"
              >
                <span>Book Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile & Tablet menu button */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href={`tel:${CONSULTANT_INFO.phone}`}
                id="mobile-nav-call-btn"
                className="p-2.5 text-amber-400 hover:text-white bg-[#0E1017] border border-amber-500/20 hover:border-amber-400/50 rounded-lg active:scale-95 transition-all shadow-sm"
                aria-label="Call directly"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                id="nav-mobile-toggle-btn"
                className="p-2.5 text-slate-300 hover:text-white bg-[#0E1017] border border-amber-500/20 hover:border-amber-400/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer active:scale-95 transition-all"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Drawer Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-drawer"
            className="lg:hidden bg-[#08090E]/98 border-b border-amber-500/20 px-4 pt-3 pb-6 mt-3 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-3 duration-200 max-h-[calc(100dvh-4.5rem)] overflow-y-auto"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 text-sm font-medium rounded-xl transition-colors flex items-center justify-between min-h-[44px] ${
                      isActive
                        ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/35'
                        : 'text-slate-300 hover:text-white hover:bg-[#121520]'
                    }`
                  }
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 text-amber-400" />
                </NavLink>
              ))}
            </div>

            <div className="pt-4 mt-2 border-t border-amber-500/15 space-y-3 pb-safe">
              <a
                href={`tel:${CONSULTANT_INFO.phone}`}
                className="flex items-center gap-3 px-4 py-3 text-xs text-slate-300 bg-[#0E1017] rounded-xl border border-amber-500/20 min-h-[44px]"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call: {CONSULTANT_INFO.formattedPhone}</span>
              </a>

              <a
                href={CONSULTANT_INFO.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 hover:brightness-105 active:scale-95 rounded-xl shadow-md shadow-amber-500/25 cursor-pointer min-h-[44px]"
              >
                <span>Book Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop overlay for mobile drawer */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}
    </>
  );
};
