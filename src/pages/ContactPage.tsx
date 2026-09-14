import React from 'react';
import { ContactSection } from '../components/ContactSection';
import { ContactFormData } from '../types';

interface ContactPageProps {
  formData: ContactFormData;
  setFormData: React.Dispatch<React.SetStateAction<ContactFormData>>;
}

export const ContactPage: React.FC<ContactPageProps> = ({ formData, setFormData }) => {
  return (
    <div className="pt-24 pb-20 bg-slate-950">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/80 border border-blue-800/40 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            Direct Consultation
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Let's Discuss Your Business Growth.
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Reach out directly to Aniket Dubey in Durgapur, West Bengal, or submit your business overview below to schedule an initial advisory discussion.
          </p>
        </div>
      </div>

      {/* Main Contact and Form Section */}
      <ContactSection formData={formData} setFormData={setFormData} />
    </div>
  );
};
