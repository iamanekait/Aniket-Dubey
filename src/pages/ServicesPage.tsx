import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Services } from '../components/Services';
import { SEO } from '../components/SEO';
import { SERVICES, CONSULTANT_INFO } from '../data';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ServicesPageProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onSelectService }) => {
  const navigate = useNavigate();

  const handleSelectService = (serviceName: string) => {
    onSelectService(serviceName);
    navigate('/contact');
  };

  const servicesStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    provider: {
      '@type': 'Person',
      name: CONSULTANT_INFO.name,
      jobTitle: CONSULTANT_INFO.title,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Consulting Capabilities & Services',
      itemListElement: SERVICES.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
        },
        position: index + 1,
      })),
    },
  };

  return (
    <div className="pt-24 pb-20 bg-[#08090E]">
      {/* React Helmet SEO Meta Tags */}
      <SEO
        title="Capabilities & Services | Aniket Dubey | Founder-First Advisory Partner"
        description="Explore founder-first consulting capabilities: strategic growth planning, content marketing authority engines, managed IT infrastructure, and digital workflow optimization."
        keywords="Founder-First Advisory, Consulting Capabilities, Business Consulting Services, Strategic Content Marketing, Managed IT Services, Technology Strategy, Business Transformation, Durgapur, West Bengal"
        canonicalPath="/services"
        ogType="website"
        jsonLd={servicesStructuredData}
      />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            Founder-First Practice Areas
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Strategic Advisory Capabilities Built for Founder Execution and Measurable Impact.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Explore four core practice areas engineered by a founder-first strategic business advisory partner to align commercial strategy, market authority, and resilient technology infrastructure.
          </p>
        </div>
      </div>

      {/* Services Grid with Modals */}
      <Services onSelectService={handleSelectService} />

      {/* Cross-Service Advisory Banner */}
      <section className="py-16 bg-[#0B0D14]/80 border-t border-amber-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#17140B] via-[#221C0E] to-[#17140B] border border-amber-500/35 rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 max-w-2xl">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Need a combination of Business Consulting and Managed IT?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Most growing businesses require integrated advisory where digital infrastructure, content communication, and business planning reinforce one another.
              </p>
            </div>
            <button
              onClick={() => handleSelectService('Integrated Business + IT Advisory')}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 hover:brightness-105 active:scale-95 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-amber-500/25 shrink-0 cursor-pointer inline-flex items-center gap-2"
            >
              <span>Discuss Integrated Advisory</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
