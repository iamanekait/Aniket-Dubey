import React, { useState } from 'react';
import { MapPin, Phone, Mail, Navigation, Send, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { CONSULTANT_INFO, SERVICES } from '../data';
import { ContactFormData } from '../types';

interface ContactSectionProps {
  formData: ContactFormData;
  setFormData: React.Dispatch<React.SetStateAction<ContactFormData>>;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ formData, setFormData }) => {
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    referenceId?: string;
    message: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Client-side validation
    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMsg('Please provide details about your business objectives or challenges.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitResult({
          success: true,
          referenceId: data.referenceId,
          message: data.message || 'Your enquiry has been received successfully.',
        });
        // Reset form
        setFormData({
          name: '',
          business: '',
          email: '',
          phone: '',
          service: 'General Strategic Consulting',
          message: '',
        });
      } else {
        setErrorMsg(data.error || 'Failed to submit enquiry. Please email email@aniketdubey.com directly.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMsg('Network error while transmitting enquiry. Please call or email directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-slate-950 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/80 border border-blue-800/40 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            Contact & Consultation
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Connect Directly with Aniket Dubey.
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Schedule an initial consultation to discuss your business strategy, content marketing initiatives, or managed IT requirements.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Business Contact Information & Map Directions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{CONSULTANT_INFO.name}</h3>
                <p className="text-sm font-semibold text-blue-400 mb-4">{CONSULTANT_INFO.title}</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Available for in-person advisory in Durgapur and across West Bengal, as well as comprehensive remote strategic consulting pan-India.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-800">
                {/* Address with Map Directions */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Office Location</p>
                    <p className="text-sm text-slate-200 mt-0.5 leading-snug">
                      {CONSULTANT_INFO.address}
                    </p>
                    <a
                      href={CONSULTANT_INFO.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 mt-2 transition-colors"
                      id="contact-get-directions-btn"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>Get Directions on Google Maps</span>
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Direct Phone</p>
                    <a
                      href={`tel:${CONSULTANT_INFO.phone}`}
                      className="text-sm font-semibold text-slate-200 hover:text-blue-400 transition-colors mt-0.5 block"
                      id="contact-phone-link"
                    >
                      {CONSULTANT_INFO.formattedPhone}
                    </a>
                    <span className="text-[11px] text-slate-500">Mon – Sat for business inquiries</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Direct Email</p>
                    <a
                      href={`mailto:${CONSULTANT_INFO.email}`}
                      className="text-sm font-semibold text-slate-200 hover:text-blue-400 transition-colors mt-0.5 block"
                      id="contact-email-link"
                    >
                      {CONSULTANT_INFO.email}
                    </a>
                    <span className="text-[11px] text-slate-500">Responses within 1-2 business days</span>
                  </div>
                </div>
              </div>

              {/* Local Durgapur badge */}
              <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800/80 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Local Presence in Durgapur:</span>{' '}
                Situated in Uttarpally, Benachity, providing local businesses and founders direct access to experienced strategic advisory.
              </div>
            </div>
          </div>

          {/* Right Column: Professional Enquiry / Consultation Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative">
              <h3 className="text-xl font-bold text-white mb-2">Schedule a Consultation</h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Fill out the form below with your requirements. Aniket will review your details personally before scheduling an initial exploratory call.
              </p>

              {submitResult ? (
                <div className="p-6 bg-slate-950 border border-emerald-500/40 rounded-xl space-y-3">
                  <div className="flex items-center gap-3 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-6 h-6 shrink-0" />
                    <span>Enquiry Received Successfully</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {submitResult.message}
                  </p>
                  {submitResult.referenceId && (
                    <p className="text-xs font-mono text-slate-400">
                      Reference Number: <span className="text-blue-400 font-bold">{submitResult.referenceId}</span>
                    </p>
                  )}
                  <button
                    onClick={() => setSubmitResult(null)}
                    className="mt-4 text-xs font-semibold text-blue-400 hover:text-blue-300 underline cursor-pointer"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" id="consultation-enquiry-form">
                  {errorMsg && (
                    <div className="p-3 rounded-lg bg-red-950/50 border border-red-800/50 text-red-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="form-name" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="form-name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>

                    {/* Business/Company */}
                    <div>
                      <label htmlFor="form-business" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Business / Company
                      </label>
                      <input
                        type="text"
                        id="form-business"
                        name="business"
                        value={formData.business}
                        onChange={handleChange}
                        placeholder="e.g. Apex Tech Solutions"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label htmlFor="form-email" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        id="form-email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="form-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        id="form-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Service Required */}
                  <div>
                    <label htmlFor="form-service" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Primary Service Required
                    </label>
                    <select
                      id="form-service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    >
                      <option value="General Strategic Consulting">General Strategic Consulting / Exploratory</option>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title} ({s.subtitle})
                        </option>
                      ))}
                      <option value="Integrated Business + IT Advisory">Integrated Business Strategy + Managed IT</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="form-message" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Business Overview & Key Objectives *
                    </label>
                    <textarea
                      id="form-message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Briefly describe your company, your key growth challenges, and what you hope to achieve through consulting..."
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      id="form-submit-btn"
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-blue-600/20 disabled:opacity-60 cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Transmitting Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Consultation Request</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-slate-500 text-center mt-2.5">
                      Strict confidentiality assured. Information is never shared with third parties.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
