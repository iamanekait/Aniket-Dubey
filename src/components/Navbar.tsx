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

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Approach', path: '/approach' },
    { label: 'Why Aniket', path: '/why-aniket' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/30 py-3.5'
          : 'bg-slate-950/80 backdrop-blur-sm border-b border-slate-900/80 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <Link
            to="/"
            id="nav-brand-link"
            className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
          >
            <BrandMark size={40} className="group-hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white tracking-tight leading-none group-hover:text-blue-400 transition-colors">
                Aniket Dubey
              </span>
              <span className="text-xs font-medium text-slate-400 tracking-wider uppercase mt-1">
                Business Consultant
              </span>
            </div>
          </Link>

          {/* Desktop Navigation with React Router NavLinks */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.path}
                id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                className={({ isActive }) =>
                  `px-3.5 py-2 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
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
              href={`tel:${CONSULTANT_INFO.phone}`}
              id="nav-tel-quick"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-blue-400 transition-colors py-1.5 px-2.5 rounded-md hover:bg-slate-900/40"
              title="Call Aniket Dubey"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>{CONSULTANT_INFO.formattedPhone}</span>
            </a>

            <a
              href={CONSULTANT_INFO.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="nav-book-consultation-btn"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg transition-all shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 cursor-pointer"
            >
              <span>Book Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={`tel:${CONSULTANT_INFO.phone}`}
              id="mobile-nav-call-btn"
              className="p-2 text-blue-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg"
              aria-label="Call directly"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="nav-mobile-toggle-btn"
              className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="md:hidden bg-slate-950/98 border-b border-slate-800 px-4 pt-4 pb-6 mt-3 space-y-3 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-4 duration-200"
        >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 text-sm font-medium rounded-xl transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 font-semibold border border-blue-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`
                }
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </NavLink>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800/80 space-y-3">
            <a
              href={`tel:${CONSULTANT_INFO.phone}`}
              className="flex items-center gap-3 px-4 py-2.5 text-xs text-slate-300 bg-slate-900 rounded-xl border border-slate-800"
            >
              <Phone className="w-4 h-4 text-blue-400" />
              <span>Call: {CONSULTANT_INFO.formattedPhone}</span>
            </a>

            <a
              href={CONSULTANT_INFO.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-xl shadow-md shadow-blue-600/25 cursor-pointer"
            >
              <span>Book Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
