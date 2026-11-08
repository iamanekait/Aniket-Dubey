import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowUpRight, Linkedin, Instagram } from 'lucide-react';
import { CONSULTANT_INFO } from '../data';
import { BrandMark } from './BrandLogo';

export const Footer: React.FC = () => {
  return (
    <footer id="main-footer" className="bg-[#030303] border-t border-[#292929] pt-16 pb-12 text-[#A6A6A6] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand & Overview */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <BrandMark size={40} className="group-hover:scale-105 transition-transform" />
              <div>
                <span className="text-base font-bold text-[#F5F2ED] tracking-tight block group-hover:text-[#D15301] transition-colors">
                  {CONSULTANT_INFO.name}
                </span>
                <span className="text-xs text-[#D15301] font-medium block">
                  {CONSULTANT_INFO.title}
                </span>
              </div>
            </Link>
            <p className="text-xs text-[#A6A6A6] leading-relaxed">
              A founder-first strategic business advisory partner helping entrepreneurs, owner-operators, and scaling businesses solve operational friction, establish commercial authority, and deploy resilient managed IT systems.
            </p>
            <div className="text-xs text-[#A6A6A6]/80">
              10+ Years Cross-Industry Advisory
            </div>

            {/* Social Channels */}
            <div className="pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5F2ED] block mb-2">
                Connect Directly
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href={CONSULTANT_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Aniket Dubey on LinkedIn"
                  className="w-8 h-8 rounded-lg bg-[#121212] border border-[#292929] hover:border-[#D15301]/50 hover:bg-[#D15301]/10 text-[#A6A6A6] hover:text-[#D15301] flex items-center justify-center transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={CONSULTANT_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Aniket Dubey on Instagram"
                  className="w-8 h-8 rounded-lg bg-[#121212] border border-[#292929] hover:border-[#D15301]/50 hover:bg-[#D15301]/10 text-[#A6A6A6] hover:text-[#D15301] flex items-center justify-center transition-all"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5F2ED] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="text-[#A6A6A6] hover:text-[#D15301] transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-[#A6A6A6] hover:text-[#D15301] transition-colors">About Aniket</Link>
              </li>
              <li>
                <Link to="/capabilities" className="text-[#A6A6A6] hover:text-[#D15301] transition-colors">Capabilities & Services</Link>
              </li>
              <li>
                <Link to="/recognition" className="text-[#A6A6A6] hover:text-[#D15301] transition-colors">Recognition</Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#A6A6A6] hover:text-[#D15301] transition-colors">Contact & Location</Link>
              </li>
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5F2ED] mb-4">
              Advisory Pillars
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-[#F5F2ED]">Business Consulting</span>
                <span className="block text-[11px] text-[#A6A6A6]/80">Growth planning & strategy</span>
              </li>
              <li>
                <span className="text-[#F5F2ED]">Strategic Content Marketing</span>
                <span className="block text-[11px] text-[#A6A6A6]/80">Audience positioning & reach</span>
              </li>
              <li>
                <span className="text-[#F5F2ED]">Managed IT Services</span>
                <span className="block text-[11px] text-[#A6A6A6]/80">Ongoing IT & infrastructure</span>
              </li>
              <li>
                <span className="text-[#F5F2ED]">Business & Technology Strategy</span>
                <span className="block text-[11px] text-[#A6A6A6]/80">Digital workflows & efficiency</span>
              </li>
            </ul>
          </div>

          {/* Direct Office & Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5F2ED] mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D15301] shrink-0 mt-0.5" />
                <span>{CONSULTANT_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D15301] shrink-0" />
                <a href={`tel:${CONSULTANT_INFO.phone}`} className="text-[#A6A6A6] hover:text-[#D15301] transition-colors">
                  {CONSULTANT_INFO.formattedPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D15301] shrink-0" />
                <a href={`mailto:${CONSULTANT_INFO.email}`} className="text-[#A6A6A6] hover:text-[#D15301] transition-colors">
                  {CONSULTANT_INFO.email}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={CONSULTANT_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#D15301] hover:text-[#B94700]"
                >
                  <span>Google Maps Directions</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              {/* Social Channels */}
              <div className="pt-3 border-t border-[#292929] space-y-2">
                <span className="text-[11px] font-semibold text-[#F5F2ED] block">Social Profiles:</span>
                <div className="flex flex-col gap-1.5">
                  <a
                    href={CONSULTANT_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-[#A6A6A6] hover:text-[#D15301] transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#D15301] shrink-0" />
                    <span>LinkedIn Profile</span>
                    <ArrowUpRight className="w-3 h-3 text-[#A6A6A6]/60 ml-auto" />
                  </a>
                  <a
                    href={CONSULTANT_INFO.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-[#A6A6A6] hover:text-[#D15301] transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5 text-[#D15301] shrink-0" />
                    <span>Instagram Profile</span>
                    <ArrowUpRight className="w-3 h-3 text-[#A6A6A6]/60 ml-auto" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom divider and center-aligned credit */}
        <div className="pt-8 border-t border-[#292929] text-center space-y-3">
          <p className="text-xs text-[#A6A6A6]">
            Developed by{' '}
            <a
              href="https://dubeyconglomerate.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D15301] hover:text-[#B94700] font-semibold underline underline-offset-4 decoration-[#D15301]/40 hover:decoration-[#D15301] transition-colors"
            >
              Dubey Conglomerate
            </a>
          </p>

          <p className="text-[11px] text-[#A6A6A6]/70 max-w-2xl mx-auto">
            © {new Date().getFullYear()} Aniket Dubey. All rights reserved. Professional business consulting, content marketing, and managed IT services in Durgapur, West Bengal, India.
          </p>
        </div>
      </div>
    </footer>
  );
};
