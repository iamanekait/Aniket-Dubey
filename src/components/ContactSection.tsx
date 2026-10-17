import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Navigation,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  Linkedin,
  Instagram,
} from 'lucide-react';
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
    recipients?: string[];
    mailtoUrl?: string;
    submittedData?: ContactFormData;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fallbackMailtoUrl, setFallbackMailtoUrl] = useState<string | null>(null);

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
    setFallbackMailtoUrl(null);

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

    const snapshot: ContactFormData = { ...formData };
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
          message:
            data.message ||
            'Your enquiry has been received and routed to email@aniketdubey.com and aniketdubey.2012@gmail.com.',
          recipients: data.recipients || [
            'email@aniketdubey.com',
            'aniketdubey.2012@gmail.com',
          ],
          mailtoUrl: data.mailtoUrl,
          submittedData: snapshot,
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
        setErrorMsg(
          data.error ||
            'Failed to transmit enquiry to server. You can dispatch directly via your email app.'
        );
        const subject = encodeURIComponent(
          `Consultation Request: ${snapshot.name} - ${snapshot.service}`
        );
        const body = encodeURIComponent(
          `Consultation Request Details:\n\n` +
            `Full Name: ${snapshot.name}\n` +
            `Company: ${snapshot.business}\n` +
            `Email: ${snapshot.email}\n` +
            `Phone: ${snapshot.phone}\n` +
            `Service Required: ${snapshot.service}\n\n` +
            `Message & Objectives:\n${snapshot.message}`
        );
        setFallbackMailtoUrl(
          `mailto:email@aniketdubey.com,aniketdubey.2012@gmail.com?subject=${subject}&body=${body}`
        );
      }
    } catch (err) {
      console.error('Submission error:', err);
      const subject = encodeURIComponent(
        `Consultation Request: ${snapshot.name} - ${snapshot.service}`
      );
      const body = encodeURIComponent(
        `Consultation Request Details:\n\n` +
          `Full Name: ${snapshot.name}\n` +
          `Company: ${snapshot.business}\n` +
          `Email: ${snapshot.email}\n` +
          `Phone: ${snapshot.phone}\n` +
          `Service Required: ${snapshot.service}\n\n` +
          `Message & Objectives:\n${snapshot.message}`
      );
      setFallbackMailtoUrl(
        `mailto:email@aniketdubey.com,aniketdubey.2012@gmail.com?subject=${subject}&body=${body}`
      );
      setErrorMsg(
        'Network error transmitting to server. Please click below to send directly to email@aniketdubey.com and aniketdubey.2012@gmail.com via your email app.'
      );
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

              {/* Direct Social Media Channels */}
              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Social & Professional Channels</span>
                  <span className="text-[10px] text-blue-400 font-medium">Direct Profiles</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={CONSULTANT_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 hover:bg-blue-950/40 text-slate-300 hover:text-white flex flex-col gap-1 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <Linkedin className="w-4 h-4 text-blue-400" />
                      <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <span className="text-xs font-bold text-white mt-1">LinkedIn</span>
                    <span className="text-[10px] text-slate-400 truncate">aniketdubey1996</span>
                  </a>

                  <a
                    href={CONSULTANT_INFO.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-pink-500/50 hover:bg-pink-950/30 text-slate-300 hover:text-white flex flex-col gap-1 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <Instagram className="w-4 h-4 text-pink-400" />
                      <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-pink-400 transition-colors" />
                    </div>
                    <span className="text-xs font-bold text-white mt-1">Instagram</span>
                    <span className="text-[10px] text-slate-400 truncate">@iamaniketdubey</span>
                  </a>
                </div>
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
                <div className="p-6 sm:p-7 bg-slate-950 border border-emerald-500/40 rounded-xl space-y-5 shadow-2xl">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white">
                        Enquiry Transmitted & Routed Successfully
                      </h4>
                      <p className="text-xs text-emerald-400 font-medium mt-0.5">
                        Information sent to email@aniketdubey.com & aniketdubey.2012@gmail.com
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-lg border border-slate-800">
                    {submitResult.message}
                  </p>

                  {/* Summary receipt box */}
                  {submitResult.submittedData && (
                    <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-2">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Reference ID</span>
                        <span className="font-mono text-blue-400 font-semibold">{submitResult.referenceId}</span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2 pt-1 text-slate-300">
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase">Client Name</span>
                          <span className="font-medium text-white">{submitResult.submittedData.name}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase">Organization</span>
                          <span className="font-medium text-white">{submitResult.submittedData.business || 'Individual'}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase">Email</span>
                          <span className="font-medium text-white">{submitResult.submittedData.email}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase">Service</span>
                          <span className="font-medium text-blue-400">{submitResult.submittedData.service}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Recipient verification badges */}
                  <div className="p-3 bg-blue-950/40 border border-blue-800/40 rounded-lg text-xs space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block">
                      Target Destination Inboxes
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono">
                        <Mail className="w-3 h-3 text-blue-400" />
                        email@aniketdubey.com
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono">
                        <Mail className="w-3 h-3 text-blue-400" />
                        aniketdubey.2012@gmail.com
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    {submitResult.mailtoUrl && (
                      <a
                        href={submitResult.mailtoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-600/20 cursor-pointer min-h-[44px]"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send Copy via Email Client</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setSubmitResult(null)}
                      className="inline-flex items-center justify-center py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer min-h-[44px]"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" id="consultation-enquiry-form">
                  {errorMsg && (
                    <div className="p-3.5 rounded-lg bg-red-950/60 border border-red-800/60 text-red-300 text-xs space-y-2">
                      <div className="flex items-center gap-2 font-medium">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                        <span>{errorMsg}</span>
                      </div>
                      {fallbackMailtoUrl && (
                        <a
                          href={fallbackMailtoUrl}
                          className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 underline font-semibold mt-1"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Click here to send directly to email@aniketdubey.com & aniketdubey.2012@gmail.com</span>
                        </a>
                      )}
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
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[44px]"
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
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[44px]"
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
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[44px]"
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
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[44px]"
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
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-base sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[44px]"
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
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-y"
                    />
                  </div>

                  {/* Email Routing Assurance Banner */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2.5">
                    <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div className="leading-relaxed">
                      <span>Upon submission, your enquiry is instantly routed to </span>
                      <strong className="text-slate-200">email@aniketdubey.com</strong>
                      <span> and </span>
                      <strong className="text-slate-200">aniketdubey.2012@gmail.com</strong>
                      <span> for direct review by Aniket Dubey.</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1">
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
