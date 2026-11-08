import React from 'react';
import { ContactSection } from '../components/ContactSection';
import { SEO } from '../components/SEO';
import { getContactSchema } from '../utils/seoSchemas';
import { ContactFormData } from '../types';
import heroContactBg from '../assets/images/hero_contact_bg_1794111041838.jpg';

interface ContactPageProps {
  formData: ContactFormData;
  setFormData: React.Dispatch<React.SetStateAction<ContactFormData>>;
}

export const ContactPage: React.FC<ContactPageProps> = ({ formData, setFormData }) => {
  const contactStructuredData = getContactSchema();

  return (
    <div className="pb-20 bg-[#080808]">
      {/* React Helmet SEO Meta Tags */}
      <SEO
        title="Contact & Advisory Enquiry | Aniket Dubey | Business Consultant"
        description="Schedule a 1-on-1 strategic consultation with Aniket Dubey in Durgapur, West Bengal. Discuss business growth, content marketing, or managed IT services for your organization."
        keywords="Contact Business Consultant, Book Consultation, Schedule Advisory Session, Aniket Dubey Contact, Durgapur Business Office, Phone +91 9932979875"
        canonicalPath="/contact"
        ogType="website"
        jsonLd={contactStructuredData}
      />

      {/* Hero Header with Background Image & Layered Overlays */}
      <section className="relative overflow-hidden border-b border-[#292929] bg-[#080808] pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={heroContactBg}
            alt="Executive Advisory Lounge & Private Consultation Suite"
            className="w-full h-full object-cover object-center opacity-65 scale-105 transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/80 via-[#080808]/60 to-[#080808]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/70 via-transparent to-[#080808]/70" />
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        </div>

        {/* Ambient Burnt Orange Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#D15301]/10 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-[#B94700]/10 rounded-full blur-3xl pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D15301]/10 border border-[#D15301]/30 text-[#D15301] text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-md">
              Direct Consultation
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F5F2ED] tracking-tight leading-tight mb-4 drop-shadow-md">
              Let's Discuss Your Business Growth.
            </h1>
            <p className="text-base sm:text-lg text-[#A6A6A6] leading-relaxed drop-shadow-sm">
              Reach out directly to Aniket Dubey in Durgapur, West Bengal, or submit your business overview below to schedule an initial advisory discussion.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact and Form Section */}
      <ContactSection formData={formData} setFormData={setFormData} />
    </div>
  );
};
