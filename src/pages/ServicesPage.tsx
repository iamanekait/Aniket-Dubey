import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Services } from '../components/Services';
import { SEO } from '../components/SEO';
import { getServicesSchema } from '../utils/seoSchemas';
import { ArrowRight } from 'lucide-react';
import heroCapabilitiesBg from '../assets/images/hero_capabilities_bg_1794111040974.jpg';

interface ServicesPageProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onSelectService }) => {
  const navigate = useNavigate();

  const handleSelectService = (serviceName: string) => {
    onSelectService(serviceName);
    navigate('/contact');
  };

  const servicesStructuredData = getServicesSchema();

  return (
    <div className="pb-20 bg-[#080808]">
      {/* React Helmet SEO Meta Tags */}
      <SEO
        title="Capabilities & Services | Aniket Dubey | Founder-First Advisory Partner"
        description="Explore founder-first consulting capabilities: strategic growth planning, content marketing authority engines, managed IT infrastructure, and digital workflow optimization."
        keywords="Founder-First Advisory, Consulting Capabilities, Business Consulting Services, Strategic Content Marketing, Managed IT Services, Technology Strategy, Business Transformation, Durgapur, West Bengal"
        canonicalPath="/services"
        ogType="website"
        jsonLd={servicesStructuredData}
      />

      {/* Hero Header with Background Image & Layered Overlays */}
      <section className="relative overflow-hidden border-b border-[#292929] bg-[#080808] pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 mb-6">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={heroCapabilitiesBg}
            alt="Strategic Technology Operations Center & Infrastructure"
            className="w-full h-full object-cover object-center opacity-40 scale-105 transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/90 via-[#080808]/75 to-[#080808]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/85 via-transparent to-[#080808]/85" />
          <div className="absolute inset-0 bg-grid-pattern opacity-25" />
        </div>

        {/* Ambient Burnt Orange Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#D15301]/10 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-[#B94700]/10 rounded-full blur-3xl pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D15301]/10 border border-[#D15301]/30 text-[#D15301] text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-md">
              Founder-First Practice Areas
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F5F2ED] tracking-tight leading-tight mb-4 drop-shadow-md">
              Strategic Advisory Capabilities Built for Founder Execution and Measurable Impact.
            </h1>
            <p className="text-base sm:text-lg text-[#A6A6A6] leading-relaxed drop-shadow-sm">
              Explore four core practice areas engineered by a founder-first strategic business advisory partner to align commercial strategy, market authority, and resilient technology infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid with Modals */}
      <Services onSelectService={handleSelectService} />

      {/* Cross-Service Advisory Banner */}
      <section className="py-16 bg-[#080808] border-t border-[#292929]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#121212] via-[#642E02]/30 to-[#121212] border border-[#292929] rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 max-w-2xl">
              <h3 className="text-xl sm:text-2xl font-bold text-[#F5F2ED]">
                Need a combination of Business Consulting and Managed IT?
              </h3>
              <p className="text-sm text-[#A6A6A6] leading-relaxed">
                Most growing businesses require integrated advisory where digital infrastructure, content communication, and business planning reinforce one another.
              </p>
            </div>
            <button
              onClick={() => handleSelectService('Integrated Business + IT Advisory')}
              className="px-6 py-3.5 bg-[#D15301] hover:bg-[#B94700] active:scale-95 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#D15301]/25 shrink-0 cursor-pointer inline-flex items-center gap-2"
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
