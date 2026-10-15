import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowUpRight, Linkedin, Instagram } from 'lucide-react';
import { CONSULTANT_INFO } from '../data';
import { BrandMark } from './BrandLogo';

export const Footer: React.FC = () => {
  return (
    <footer id="main-footer" className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand & Overview */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <BrandMark size={40} className="group-hover:scale-105 transition-transform" />
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
              A founder-first strategic business advisory partner helping entrepreneurs, owner-operators, and scaling businesses solve operational friction, establish commercial authority, and deploy resilient managed IT systems.
            </p>
            <div className="text-xs text-slate-500">
              10+ Years Cross-Industry Advisory
            </div>

            {/* Social Channels */}
            <div className="pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Connect Directly
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href={CONSULTANT_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Aniket Dubey on LinkedIn"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-blue-500/50 hover:bg-blue-950/50 text-slate-400 hover:text-blue-400 flex items-center justify-center transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={CONSULTANT_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Aniket Dubey on Instagram"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-pink-500/50 hover:bg-pink-950/30 text-slate-400 hover:text-pink-400 flex items-center justify-center transition-all"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
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
                <Link to="/capabilities" className="hover:text-blue-400 transition-colors">Capabilities & Services</Link>
              </li>
              <li>
                <Link to="/insights" className="hover:text-blue-400 transition-colors">Insights & Case Studies</Link>
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

              {/* Social Channels */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <span className="text-[11px] font-semibold text-slate-300 block">Social Profiles:</span>
                <div className="flex flex-col gap-1.5">
                  <a
                    href={CONSULTANT_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>LinkedIn Profile</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-600 ml-auto" />
                  </a>
                  <a
                    href={CONSULTANT_INFO.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-pink-400 transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                    <span>Instagram Profile</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-600 ml-auto" />
                  </a>
                </div>
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
