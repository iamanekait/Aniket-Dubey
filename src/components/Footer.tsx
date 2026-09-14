import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { CONSULTANT_INFO } from '../data';

export const Footer: React.FC = () => {
  return (
    <footer id="main-footer" className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand & Overview */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-sm group-hover:scale-105 transition-transform">
                AD
              </div>
              <div>
                <span className="text-base font-bold text-white tracking-tight block group-hover:text-blue-400 transition-colors">
                  {CONSULTANT_INFO.name}
                </span>
                <span className="text-xs text-blue-400 font-medium block">
                  {CONSULTANT_INFO.title}
                </span>
              </div>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Strategic consulting, content marketing, and managed IT services tailored to small and medium businesses, startups, and growing enterprises.
            </p>
            <div className="text-xs text-slate-500">
              10+ Years Cross-Industry Advisory
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors">About Aniket</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-400 transition-colors">Core Services</Link>
              </li>
              <li>
                <Link to="/approach" className="hover:text-blue-400 transition-colors">Consulting Approach</Link>
              </li>
              <li>
                <Link to="/why-aniket" className="hover:text-blue-400 transition-colors">Why Work With Aniket</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors">Contact & Location</Link>
              </li>
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Advisory Pillars
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-slate-300">Business Consulting</span>
                <span className="block text-[11px] text-slate-500">Growth planning & strategy</span>
              </li>
              <li>
                <span className="text-slate-300">Strategic Content Marketing</span>
                <span className="block text-[11px] text-slate-500">Audience positioning & reach</span>
              </li>
              <li>
                <span className="text-slate-300">Managed IT Services</span>
                <span className="block text-[11px] text-slate-500">Ongoing IT & infrastructure</span>
              </li>
              <li>
                <span className="text-slate-300">Business & Technology Strategy</span>
                <span className="block text-[11px] text-slate-500">Digital workflows & efficiency</span>
              </li>
            </ul>
          </div>

          {/* Direct Office & Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{CONSULTANT_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`tel:${CONSULTANT_INFO.phone}`} className="hover:text-blue-400 transition-colors">
                  {CONSULTANT_INFO.formattedPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${CONSULTANT_INFO.email}`} className="hover:text-blue-400 transition-colors">
                  {CONSULTANT_INFO.email}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={CONSULTANT_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
                >
                  <span>Google Maps Directions</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom divider and center-aligned credit */}
        <div className="pt-8 border-t border-slate-800/80 text-center space-y-3">
          <p className="text-xs text-slate-400">
            Developed by{' '}
            <a
              href="https://dubeyconglomerate.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-4 decoration-blue-500/40 hover:decoration-blue-400 transition-colors"
            >
              Dubey Conglomerate
            </a>
          </p>

          <p className="text-[11px] text-slate-500 max-w-2xl mx-auto">
            © {new Date().getFullYear()} Aniket Dubey. All rights reserved. Professional business consulting, content marketing, and managed IT services in Durgapur, West Bengal, India.
          </p>
        </div>
      </div>
    </footer>
  );
};
