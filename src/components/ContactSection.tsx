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
  ArrowRight,
  ExternalLink,
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
    <section id="contact" className="py-20 lg:py-28 bg-[#0B0D14]/90 border-t border-amber-500/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            Contact & Consultation
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Connect Directly with Aniket Dubey.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Schedule an initial consultation to discuss your business strategy, content marketing initiatives, or managed IT requirements.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Business Contact Information & Map Directions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0E1017]/90 border border-amber-500/20 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{CONSULTANT_INFO.name}</h3>
                <p className="text-sm font-semibold text-amber-400 mb-4">{CONSULTANT_INFO.title}</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Available for in-person advisory in Durgapur and across West Bengal, as well as comprehensive remote strategic consulting pan-India.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-amber-500/15">
                {/* Address with Map Directions */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#151824] border border-amber-500/25 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-400/90">Office Location</p>
                    <p className="text-sm text-slate-200 mt-0.5 leading-snug">
                      {CONSULTANT_INFO.address}
                    </p>
                    <a
                      href={CONSULTANT_INFO.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 mt-2 transition-colors"
                      id="contact-get-directions-btn"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>Get Directions on Google Maps</span>
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#151824] border border-amber-500/25 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-400/90">Direct Phone</p>
                    <a
                      href={`tel:${CONSULTANT_INFO.phone}`}
                      className="text-sm font-semibold text-slate-200 hover:text-amber-400 transition-colors mt-0.5 block"
                      id="contact-phone-link"
                    >
                      {CONSULTANT_INFO.formattedPhone}
                    </a>
                    <span className="text-[11px] text-slate-500">Mon – Sat for business inquiries</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#151824] border border-amber-500/25 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-400/90">Direct Email</p>
                    <a
                      href={`mailto:${CONSULTANT_INFO.email}`}
                      className="text-sm font-semibold text-slate-200 hover:text-amber-400 transition-colors mt-0.5 block"
                      id="contact-email-link"
                    >
                      {CONSULTANT_INFO.email}
                    </a>
                    <span className="text-[11px] text-slate-500">Responses within 1-2 business days</span>
                  </div>
                </div>
              </div>

              {/* Local Durgapur badge */}
              <div className="p-3.5 bg-[#08090E]/90 rounded-xl border border-amber-500/20 text-xs text-slate-400">
                <span className="font-semibold text-amber-200">Local Presence in Durgapur:</span>{' '}
                Situated in Uttarpally, Benachity, providing local businesses and founders direct access to experienced strategic advisory.
              </div>

              {/* Instant Zoom Scheduler Card */}
              <div className="p-5 bg-gradient-to-br from-[#1A150A] via-[#12141D] to-[#0E1017] border border-amber-500/35 rounded-xl space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">Direct Calendar</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30 font-semibold">Live Calendar</span>
                </div>
                <h4 className="text-sm font-bold text-white">Book Your 1-on-1 Video Consultation</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Select an available date and time that fits your schedule directly via Aniket Dubey's Zoom scheduler.
                </p>
                <a
                  href={CONSULTANT_INFO.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-zoom-scheduler-cta"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 hover:brightness-105 active:scale-95 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-amber-500/25 cursor-pointer"
                >
                  <span>Book Consultation via Zoom</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Professional Enquiry / Consultation Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0E1017] border border-amber-500/25 rounded-2xl p-6 sm:p-8 shadow-xl relative">
              <h3 className="text-xl font-bold text-white mb-2">Schedule a Consultation</h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6">
                Fill out the form below with your requirements. Aniket will review your details personally before scheduling an initial exploratory call.
              </p>

              {submitResult ? (
                <div className="p-6 sm:p-7 bg-[#08090E] border border-amber-500/40 rounded-xl space-y-5 shadow-2xl">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/35 flex items-center justify-center shrink-0 text-amber-400">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white">
                        Enquiry Transmitted & Routed Successfully
                      </h4>
                      <p className="text-xs text-amber-300 font-medium mt-0.5">
                        Information sent to email@aniketdubey.com & aniketdubey.2012@gmail.com
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#151824] p-3.5 rounded-lg border border-amber-500/20">
                    {submitResult.message}
                  </p>

                  {/* Summary receipt box */}
                  {submitResult.submittedData && (
                    <div className="p-4 rounded-xl bg-[#0E1017] border border-amber-500/25 text-xs space-y-2">
                      <div className="flex items-center justify-between pb-2 border-b border-amber-500/15">
                        <span className="font-bold text-amber-400/90 uppercase tracking-wider text-[10px]">Reference ID</span>
                        <span className="font-mono text-amber-300 font-semibold">{submitResult.referenceId}</span>
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
                          <span className="font-medium text-amber-300">{submitResult.submittedData.service}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Recipient verification badges */}
                  <div className="p-3 bg-amber-950/30 border border-amber-500/30 rounded-lg text-xs space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                      Target Destination Inboxes
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#08090E] border border-amber-500/30 text-amber-200 text-xs font-mono">
                        <Mail className="w-3 h-3 text-amber-400" />
                        email@aniketdubey.com
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#08090E] border border-amber-500/30 text-amber-200 text-xs font-mono">
                        <Mail className="w-3 h-3 text-amber-400" />
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
                        className="inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 hover:brightness-105 active:scale-95 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-amber-500/25 cursor-pointer min-h-[44px]"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send Copy via Email Client</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setSubmitResult(null)}
                      className="inline-flex items-center justify-center py-2.5 px-4 bg-[#151824] hover:bg-slate-800 text-amber-200 hover:text-white border border-amber-500/30 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer min-h-[44px]"
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
                          className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 underline font-semibold mt-1"
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
                      <label htmlFor="form-name" className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1.5">
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
                        className="w-full px-3.5 py-2.5 bg-[#08090E] border border-amber-500/25 rounded-lg text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400 transition-all min-h-[44px]"
                      />
                    </div>

                    {/* Business/Company */}
                    <div>
                      <label htmlFor="form-business" className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1.5">
                        Business / Company
                      </label>
                      <input
                        type="text"
                        id="form-business"
                        name="business"
                        value={formData.business}
                        onChange={handleChange}
                        placeholder="e.g. Apex Tech Solutions"
                        className="w-full px-3.5 py-2.5 bg-[#08090E] border border-amber-500/25 rounded-lg text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400 transition-all min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label htmlFor="form-email" className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1.5">
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
                        className="w-full px-3.5 py-2.5 bg-[#08090E] border border-amber-500/25 rounded-lg text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400 transition-all min-h-[44px]"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="form-phone" className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1.5">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        id="form-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 bg-[#08090E] border border-amber-500/25 rounded-lg text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400 transition-all min-h-[44px]"
                      />
                    </div>
                  </div>

                  {/* Service Required */}
                  <div>
                    <label htmlFor="form-service" className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1.5">
                      Primary Service Required
                    </label>
                    <select
                      id="form-service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-[#08090E] border border-amber-500/25 rounded-lg text-base sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400 transition-all min-h-[44px]"
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
                    <label htmlFor="form-message" className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1.5">
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
                      className="w-full px-3.5 py-2.5 bg-[#08090E] border border-amber-500/25 rounded-lg text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400 transition-all resize-y"
                    />
                  </div>

                  {/* Email Routing Assurance Banner */}
                  <div className="p-3.5 rounded-xl bg-[#08090E] border border-amber-500/25 text-[11px] text-slate-300 flex items-start gap-2.5">
                    <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="leading-relaxed">
                      <span>Upon submission, your enquiry is instantly routed to </span>
                      <strong className="text-amber-200">email@aniketdubey.com</strong>
                      <span> and </span>
                      <strong className="text-amber-200">aniketdubey.2012@gmail.com</strong>
                      <span> for direct review by Aniket Dubey.</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={submitting}
                      id="form-submit-btn"
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 hover:brightness-105 active:scale-95 text-slate-950 text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-500/25 disabled:opacity-60 cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                          <span>Transmitting Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Consultation Request</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-slate-400 text-center mt-2.5">
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
