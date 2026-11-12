import React, { useState } from 'react';
import { Briefcase, Layers, Server, Cpu, ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { SERVICES } from '../data';
import { ServiceItem } from '../types';
import { SEO, createServiceSEOProps } from './SEO';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceItem | null>(null);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'business-consulting':
        return <Briefcase className="w-6 h-6 text-[#D15301]" />;
      case 'content-marketing':
        return <Layers className="w-6 h-6 text-[#D15301]" />;
      case 'managed-it':
        return <Server className="w-6 h-6 text-[#D15301]" />;
      case 'business-tech-strategy':
        return <Cpu className="w-6 h-6 text-[#D15301]" />;
      default:
        return <Briefcase className="w-6 h-6 text-[#D15301]" />;
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#080808] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D15301]/10 border border-[#D15301]/30 text-[#D15301] text-xs font-bold uppercase tracking-wider mb-4">
            Core Service Offerings
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F2ED] tracking-tight leading-tight mb-4">
            Tailored Consulting Services Built for Execution and Impact.
          </h2>
          <p className="text-base sm:text-lg text-[#A6A6A6] leading-relaxed">
            Every engagement is structured around your specific business reality — combining high-level strategic advisory with hands-on content marketing and managed IT infrastructure support.
          </p>
        </div>

        {/* Services Grid (4 Visually Distinct Cards) */}
        <div className="grid md:grid-cols-2 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="group relative bg-[#121212] hover:bg-[#171717] border border-[#292929] hover:border-[#D15301]/40 rounded-2xl p-7 sm:p-8 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-[#D15301]/10"
            >
              {/* Top Row: Icon & Tag */}
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#080808] border border-[#292929] flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getServiceIcon(service.id)}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#080808] text-[#D15301] border border-[#292929]">
                    {service.tag}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#F5F2ED] mb-1 group-hover:text-[#D15301] transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-[#D15301] mb-4">
                  {service.subtitle}
                </p>

                {/* Short Benefit Description */}
                <p className="text-sm text-[#A6A6A6] leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Core Capabilities / Features Checklist */}
                <div className="space-y-2 mb-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#D15301] mb-2">
                    Key Focus Areas:
                  </p>
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#F5F2ED]/90">
                      <div className="w-4 h-4 rounded-full bg-[#D15301]/15 border border-[#D15301]/30 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-[#D15301]" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 border-t border-[#292929] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedServiceModal(service)}
                  className="text-xs font-semibold text-[#A6A6A6] hover:text-[#D15301] transition-colors flex items-center gap-1.5 py-2 cursor-pointer"
                >
                  <span>View Benefits & Scope</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#D15301]" />
                </button>

                <button
                  onClick={() => onSelectService(service.title)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#D15301] hover:bg-[#B94700] active:scale-95 rounded-lg transition-all shadow-sm shadow-[#D15301]/25 cursor-pointer"
                >
                  <span>Enquire About This Service</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Service Scope Modal */}
        {selectedServiceModal && (
          <>
            {/* Dynamic Service-Specific JSON-LD Schema & Metadata Injection */}
            <SEO {...createServiceSEOProps(selectedServiceModal, { pagePath: '/capabilities' })} />

            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
              role="dialog"
              aria-modal="true"
            >
            <div className="bg-[#080808] border border-[#292929] rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#121212] rounded-xl border border-[#292929]">
                    {getServiceIcon(selectedServiceModal.id)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#F5F2ED]">{selectedServiceModal.title}</h3>
                    <p className="text-xs text-[#D15301] font-medium">{selectedServiceModal.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedServiceModal(null)}
                  className="text-[#A6A6A6] hover:text-white p-1 rounded-lg bg-[#121212] border border-[#292929] hover:bg-[#171717] text-sm cursor-pointer"
                  aria-label="Close dialog"
                >
                  ✕
                </button>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#D15301] mb-2">Overview</h4>
                <p className="text-sm text-[#A6A6A6] leading-relaxed">
                  {selectedServiceModal.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#D15301] mb-3">
                  Measurable Benefits to Your Business
                </h4>
                <ul className="space-y-2">
                  {selectedServiceModal.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F5F2ED]/90">
                      <Sparkles className="w-4 h-4 text-[#D15301] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#292929] flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedServiceModal(null)}
                  className="px-4 py-2 text-xs font-medium text-[#A6A6A6] hover:text-[#F5F2ED] bg-[#121212] border border-[#292929] hover:bg-[#171717] rounded-lg cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const title = selectedServiceModal.title;
                    setSelectedServiceModal(null);
                    onSelectService(title);
                  }}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#D15301] hover:bg-[#B94700] active:scale-95 rounded-lg cursor-pointer shadow-md shadow-[#D15301]/25"
                >
                  Book Consultation for This Service
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      </div>
    </section>
  );
};
