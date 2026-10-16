import React from 'react';
import { ContactSection } from '../components/ContactSection';
import { SEO } from '../components/SEO';
import { CONSULTANT_INFO } from '../data';
import { ContactFormData } from '../types';

interface ContactPageProps {
  formData: ContactFormData;
  setFormData: React.Dispatch<React.SetStateAction<ContactFormData>>;
}

export const ContactPage: React.FC<ContactPageProps> = ({ formData, setFormData }) => {
  const contactStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    mainEntity: {
      '@type': 'LocalBusiness',
      name: 'Aniket Dubey - Business Consultant',
      telephone: CONSULTANT_INFO.phone,
      email: CONSULTANT_INFO.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Road No. 36, Uttarpally, Benachity',
        addressLocality: 'Durgapur',
        addressRegion: 'West Bengal',
        postalCode: '713213',
        addressCountry: 'IN',
      },
    },
  };

  return (
    <div className="pt-24 pb-20 bg-slate-950">
      {/* React Helmet SEO Meta Tags */}
      <SEO
        title="Book a Consultation | Contact Aniket Dubey | Business Consultant"
        description="Schedule a 1-on-1 strategic consultation with Aniket Dubey. Discuss business growth, content marketing, or managed IT services for your organization."
        keywords="Contact Business Consultant, Book Consultation, Schedule Advisory Session, Aniket Dubey Contact, Durgapur Business Office, Phone 9932979875"
        canonicalPath="/contact"
        ogType="website"
        jsonLd={contactStructuredData}
      />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/80 border border-blue-800/40 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            Direct Consultation
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Let's Discuss Your Business Growth.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Reach out directly to Aniket Dubey in Durgapur, West Bengal, or submit your business overview below to schedule an initial advisory discussion.
          </p>
        </div>
      </div>

      {/* Main Contact and Form Section */}
      <ContactSection formData={formData} setFormData={setFormData} />
    </div>
  );
};
