import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { ContactSection } from '../components/ContactSection';
import { SEO } from '../components/SEO';
import { getContactSchema } from '../utils/seoSchemas';
import { CONTACT_FAQS } from '../data';
import { ContactFormData } from '../types';
import heroContactBg from '../assets/images/hero_contact_bg_1794111041838.jpg';

interface ContactPageProps {
  formData: ContactFormData;
  setFormData: React.Dispatch<React.SetStateAction<ContactFormData>>;
}

export const ContactPage: React.FC<ContactPageProps> = ({ formData, setFormData }) => {
  const contactStructuredData = getContactSchema();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="pb-20 bg-[#080808]">
      {/* React Helmet SEO Meta Tags (includes ContactPage + FAQPage JSON-LD schema) */}
      <SEO
        title="Contact & Advisory Enquiry | Aniket Dubey | Business Consultant"
        description="Schedule a 1-on-1 strategic consultation with Aniket Dubey in Durgapur, West Bengal. Discuss business growth, content marketing, or managed IT services for your organization."
        keywords="Contact Business Consultant, Book Consultation, Schedule Advisory Session, Consulting FAQ, Aniket Dubey Contact, Durgapur Business Office, Phone +91 9932979875"
        canonicalPath="/contact"
        ogType="website"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact & Advisory Enquiry', path: '/contact' },
        ]}
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

      {/* Consulting Inquiries FAQ Section (mirrors FAQPage Schema.org markup) */}
      <section id="consulting-faq" className="py-16 lg:py-24 bg-[#080808] border-t border-[#292929]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D15301]/10 border border-[#D15301]/30 text-[#D15301] text-xs font-bold uppercase tracking-wider mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Consultation FAQ</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F5F2ED] tracking-tight mb-3">
              Common Consulting Inquiries
            </h2>
            <p className="text-sm sm:text-base text-[#A6A6A6] leading-relaxed">
              Clear answers on how initial discovery sessions, advisory engagements, and managed IT consultations work.
            </p>
          </div>

          <div className="space-y-3.5">
            {CONTACT_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              const panelId = `contact-faq-panel-${index}`;
              const headingId = `contact-faq-trigger-${index}`;

              return (
                <div
                  key={faq.question}
                  className={`rounded-2xl border transition-colors ${
                    isOpen
                      ? 'bg-[#121212] border-[#D15301]/40 shadow-lg shadow-[#D15301]/5'
                      : 'bg-[#121212] border-[#292929] hover:border-[#D15301]/30'
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      id={headingId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleFaq(index)}
                      className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="text-sm sm:text-base font-bold text-[#F5F2ED] leading-snug">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 text-[#D15301] transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headingId}
                    hidden={!isOpen}
                    className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#A6A6A6] leading-relaxed border-t border-[#292929]/70"
                  >
                    {faq.answer}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
