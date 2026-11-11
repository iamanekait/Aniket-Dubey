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
  Copy,
  Check,
} from 'lucide-react';
import { CONSULTANT_INFO, SERVICES } from '../data';
import { ContactFormData } from '../types';

interface ContactSectionProps {
  formData: ContactFormData;
  setFormData: React.Dispatch<React.SetStateAction<ContactFormData>>;
}

// Ensure aniketdubey.2012@gmail.com is never displayed or exposed after form submission
const scrubSecondaryEmail = (text?: string): string => {
  if (!text) return '';
  return text.replace(/aniketdubey\.?2012@gmail\.com/gi, 'email@aniketdubey.com');
};

export const ContactSection: React.FC<ContactSectionProps> = ({ formData, setFormData }) => {
  const [submitting, setSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const renderTimeRef = React.useRef<number>(Date.now());
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    referenceId?: string;
    message: string;
    recipients?: string[];
    mailtoUrl?: string;
    submittedData?: ContactFormData;
    needsActivation?: boolean;
    delivered?: boolean;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fallbackMailtoUrl, setFallbackMailtoUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyDetails = () => {
    const text =
      `Consultation Request for Aniket Dubey\n` +
      `----------------------------------------\n` +
      `Client Name: ${formData.name || 'Not provided'}\n` +
      `Company: ${formData.business || 'Individual'}\n` +
      `Email: ${formData.email || 'Not provided'}\n` +
      `Phone: ${formData.phone || 'Not provided'}\n` +
      `Service: ${formData.service}\n` +
      `Message & Objectives:\n${formData.message}\n` +
      `----------------------------------------\n` +
      `Target: email@aniketdubey.com | Direct Phone: +91 9932979875`;

    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }).catch(() => {});
  };

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
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setErrorMsg('Please provide details about your business objectives or challenges (at least 10 characters).');
      return;
    }

    const snapshot: ContactFormData = { ...formData };
    setSubmitting(true);

    const safeSnapshotEmail = /aniketdubey\.?2012@gmail\.com/i.test(snapshot.email)
      ? 'email@aniketdubey.com'
      : snapshot.email;

    const mailtoSubject = encodeURIComponent(`Consultation Request: ${snapshot.name} - ${snapshot.service}`);
    const mailtoBody = encodeURIComponent(
      `Consultation Request Details:\n\n` +
        `Full Name: ${snapshot.name}\n` +
        `Company: ${snapshot.business || 'Not specified'}\n` +
        `Email: ${safeSnapshotEmail}\n` +
        `Phone: ${snapshot.phone || 'Not provided'}\n` +
        `Service Required: ${snapshot.service}\n\n` +
        `Message & Objectives:\n${snapshot.message}\n\n` +
        `Target Destination: email@aniketdubey.com\n` +
        `Sent via Dubey Conglomerate Portal (aniketdubey.com)`
    );
    const backupMailtoUrl = `mailto:email@aniketdubey.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    // Payload routed exclusively through secure server endpoint
    const payload = {
      ...formData,
      website_hp: honeypot, // Honeypot field for spam prevention
      _rendered_at: renderTimeRef.current, // Form load timestamp for bot detection
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      let data: any = null;
      try {
        data = await response.json();
      } catch {
        // Non-JSON response
      }

      // CASE 1: 200 OK — Email was verified delivered via configured provider
      if (response.ok && data?.success && data?.delivered) {
        setSubmitResult({
          success: true,
          delivered: true,
          referenceId: data.referenceId,
          needsActivation: false,
          message:
            data.message ||
            'Your consultation request has been delivered to email@aniketdubey.com. Aniket Dubey will review your business requirements personally.',
          recipients: ['email@aniketdubey.com'],
          mailtoUrl: data.mailtoUrl || backupMailtoUrl,
          submittedData: snapshot,
        });

        // Reset form on verified delivery
        setFormData({
          name: '',
          business: '',
          email: '',
          phone: '',
          service: 'General Strategic Consulting',
          message: '',
        });
        setHoneypot('');
        renderTimeRef.current = Date.now();
      }
      // CASE 2: 202 Accepted — Pending one-time inbox activation
      else if (response.status === 202 || data?.needsActivation) {
        setSubmitResult({
          success: true,
          delivered: false,
          referenceId: data?.referenceId || `ENQ-${Date.now()}`,
          needsActivation: true,
          message:
            data?.message ||
            'Enquiry recorded! A one-time activation confirmation email was sent to email@aniketdubey.com. Please check your inbox and click "Activate Form" once to enable automatic forwarding.',
          recipients: ['email@aniketdubey.com'],
          mailtoUrl: data?.mailtoUrl || backupMailtoUrl,
          submittedData: snapshot,
        });
        // Clear form
        setFormData({
          name: '',
          business: '',
          email: '',
          phone: '',
          service: 'General Strategic Consulting',
          message: '',
        });
      }
      // CASE 3: 429 Rate Limit
      else if (response.status === 429) {
        setErrorMsg(data?.error || 'Please wait a few seconds before submitting another request.');
      }
      // CASE 4: 409 Duplicate
      else if (response.status === 409) {
        setErrorMsg(data?.error || 'Duplicate submission detected. Your enquiry has already been transmitted.');
      }
      // CASE 5: 503 / 500 / Delivery failure
      else {
        const errorDetail =
          data?.error ||
          'Automated email dispatch is currently unconfigured on the server. Please launch your email client with all details pre-filled or contact email@aniketdubey.com directly.';
        setErrorMsg(errorDetail);
        setFallbackMailtoUrl(data?.mailtoUrl || backupMailtoUrl);
      }
    } catch (networkErr: any) {
      console.error('Contact API network error:', networkErr);
      setErrorMsg(
        'Unable to connect to the consultation server. Please click below to send your enquiry directly via your email client, or copy the details.'
      );
      setFallbackMailtoUrl(backupMailtoUrl);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#080808] border-t border-[#292929] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D15301]/10 border border-[#D15301]/30 text-[#D15301] text-xs font-bold uppercase tracking-wider mb-4">
            Contact & Consultation
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F2ED] tracking-tight leading-tight mb-4">
            Connect Directly with Aniket Dubey.
          </h2>
          <p className="text-base sm:text-lg text-[#A6A6A6] leading-relaxed">
            Schedule an initial consultation to discuss your business strategy, content marketing initiatives, or managed IT requirements.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Business Contact Information & Map Directions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#121212] border border-[#292929] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <h3 className="text-xl font-bold text-[#F5F2ED] mb-1">{CONSULTANT_INFO.name}</h3>
                <p className="text-sm font-semibold text-[#D15301] mb-4">{CONSULTANT_INFO.title}</p>
                <p className="text-xs text-[#A6A6A6] leading-relaxed">
                  Available for in-person advisory in Durgapur and across West Bengal, as well as comprehensive remote strategic consulting pan-India.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#292929]">
                {/* Address with Map Directions */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#080808] border border-[#292929] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-[#D15301]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#A6A6A6]">Office Location</p>
                    <p className="text-sm text-[#F5F2ED] mt-0.5 leading-snug">
                      {CONSULTANT_INFO.address}
                    </p>
                    <a
                      href={CONSULTANT_INFO.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D15301] hover:text-[#B94700] mt-2 transition-colors"
                      id="contact-get-directions-btn"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>Get Directions on Google Maps</span>
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#080808] border border-[#292929] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-[#D15301]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#A6A6A6]">Direct Phone</p>
                    <a
                      href={`tel:${CONSULTANT_INFO.phone}`}
                      className="text-sm font-semibold text-[#F5F2ED] hover:text-[#D15301] transition-colors mt-0.5 block"
                      id="contact-phone-link"
                    >
                      {CONSULTANT_INFO.formattedPhone}
                    </a>
                    <span className="text-[11px] text-[#A6A6A6]/70">Mon – Sat for business inquiries</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#080808] border border-[#292929] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-[#D15301]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#A6A6A6]">Direct Email</p>
                    <a
                      href={`mailto:${CONSULTANT_INFO.email}`}
                      className="text-sm font-semibold text-[#F5F2ED] hover:text-[#D15301] transition-colors mt-0.5 block"
                      id="contact-email-link"
                    >
                      {CONSULTANT_INFO.email}
                    </a>
                    <span className="text-[11px] text-[#A6A6A6]/70">Responses within 1-2 business days</span>
                  </div>
                </div>
              </div>

              {/* Local Durgapur badge */}
              <div className="p-3.5 bg-[#080808] rounded-xl border border-[#292929] text-xs text-[#A6A6A6]">
                <span className="font-semibold text-[#F5F2ED]">Local Presence in Durgapur:</span>{' '}
                Situated in Uttarpally, Benachity, providing local businesses and founders direct access to experienced strategic advisory.
              </div>

              {/* Direct Social Media Channels */}
              <div className="p-4 bg-[#080808] rounded-xl border border-[#292929] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#A6A6A6]">Social & Professional Channels</span>
                  <span className="text-[10px] text-[#D15301] font-medium">Direct Profiles</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={CONSULTANT_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-[#121212] border border-[#292929] hover:border-[#D15301]/50 hover:bg-[#D15301]/10 text-[#F5F2ED] flex flex-col gap-1 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <Linkedin className="w-4 h-4 text-[#D15301]" />
                      <ExternalLink className="w-3 h-3 text-[#A6A6A6] group-hover:text-[#D15301] transition-colors" />
                    </div>
                    <span className="text-xs font-bold text-[#F5F2ED] mt-1">LinkedIn</span>
                    <span className="text-[10px] text-[#A6A6A6] truncate">aniketdubey1996</span>
                  </a>

                  <a
                    href={CONSULTANT_INFO.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-[#121212] border border-[#292929] hover:border-[#D15301]/50 hover:bg-[#D15301]/10 text-[#F5F2ED] flex flex-col gap-1 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <Instagram className="w-4 h-4 text-[#D15301]" />
                      <ExternalLink className="w-3 h-3 text-[#A6A6A6] group-hover:text-[#D15301] transition-colors" />
                    </div>
                    <span className="text-xs font-bold text-[#F5F2ED] mt-1">Instagram</span>
                    <span className="text-[10px] text-[#A6A6A6] truncate">@iamaniketdubey</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Professional Enquiry / Consultation Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#121212] border border-[#292929] rounded-2xl p-6 sm:p-8 shadow-xl relative">
              <h3 className="text-xl font-bold text-[#F5F2ED] mb-2">Schedule a Consultation</h3>
              <p className="text-xs sm:text-sm text-[#A6A6A6] mb-6">
                Fill out the form below with your requirements. Aniket will review your details personally before scheduling an initial exploratory call.
              </p>

              {submitResult ? (
                <div className="p-6 sm:p-7 bg-[#080808] border border-emerald-500/40 rounded-xl space-y-5 shadow-2xl">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-[#F5F2ED]">
                        Enquiry Transmitted & Routed Successfully
                      </h4>
                      <p className="text-xs text-emerald-400 font-medium mt-0.5">
                        Information sent to email@aniketdubey.com
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#F5F2ED]/90 leading-relaxed bg-[#121212] p-3.5 rounded-lg border border-[#292929]">
                    {scrubSecondaryEmail(submitResult.message)}
                  </p>

                  {submitResult.needsActivation && (
                    <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/50 text-amber-200 text-xs space-y-2.5 shadow-lg">
                      <div className="flex items-center gap-2 font-bold text-amber-300">
                        <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
                        <span>One-Time Form Activation Required in Inbox</span>
                      </div>
                      <p className="leading-relaxed text-amber-100/95 text-xs">
                        FormSubmit sent a one-time activation email to <strong>email@aniketdubey.com</strong>. Please check your Inbox and Spam/Junk folder for an email from <em>FormSubmit</em> and click <strong>"Activate Form"</strong>. After clicking it once, all future submissions will reach your inbox automatically.
                      </p>
                      <p className="leading-relaxed text-amber-200/90 text-[11px] pt-1 border-t border-amber-500/20">
                        To deliver this enquiry right now, you can also click <strong>"Send Copy via Email Client"</strong> below to open your mail app with all details pre-filled.
                      </p>
                    </div>
                  )}

                  {/* Summary receipt box */}
                  {submitResult.submittedData && (
                    <div className="p-4 rounded-xl bg-[#121212] border border-[#292929] text-xs space-y-2">
                      <div className="flex items-center justify-between pb-2 border-b border-[#292929]">
                        <span className="font-bold text-[#A6A6A6] uppercase tracking-wider text-[10px]">Reference ID</span>
                        <span className="font-mono text-[#D15301] font-semibold">{submitResult.referenceId}</span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2 pt-1 text-[#F5F2ED]/90">
                        <div>
                          <span className="text-[#A6A6A6] block text-[10px] uppercase">Client Name</span>
                          <span className="font-medium text-white">{submitResult.submittedData.name}</span>
                        </div>
                        <div>
                          <span className="text-[#A6A6A6] block text-[10px] uppercase">Organization</span>
                          <span className="font-medium text-white">{submitResult.submittedData.business || 'Individual'}</span>
                        </div>
                        <div>
                          <span className="text-[#A6A6A6] block text-[10px] uppercase">Email</span>
                          <span className="font-medium text-white">
                            {/aniketdubey\.?2012@gmail\.com/i.test(submitResult.submittedData.email)
                              ? 'email@aniketdubey.com'
                              : scrubSecondaryEmail(submitResult.submittedData.email)}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#A6A6A6] block text-[10px] uppercase">Service</span>
                          <span className="font-medium text-[#D15301]">{submitResult.submittedData.service}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Recipient verification badge */}
                  <div className="p-3 bg-[#D15301]/10 border border-[#D15301]/30 rounded-lg text-xs space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D15301] block">
                      Target Destination Inbox
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#080808] border border-[#292929] text-[#F5F2ED] text-xs font-mono">
                        <Mail className="w-3 h-3 text-[#D15301]" />
                        email@aniketdubey.com
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
                        className="inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#D15301] hover:bg-[#B94700] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#D15301]/20 cursor-pointer min-h-[44px]"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send Copy via Email Client</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setSubmitResult(null)}
                      className="inline-flex items-center justify-center py-2.5 px-4 bg-[#121212] hover:bg-[#171717] text-[#A6A6A6] hover:text-white border border-[#292929] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer min-h-[44px]"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" id="consultation-enquiry-form">
                  {/* Invisible Honeypot anti-spam field */}
                  <input
                    type="text"
                    name="website_hp"
                    id="website_hp"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="sr-only absolute -left-[9999px] -top-[9999px] w-0 h-0 opacity-0 pointer-events-none"
                  />
                  {errorMsg && (
                    <div className="p-4 rounded-xl bg-red-950/70 border border-red-700/60 text-red-200 text-xs space-y-3 shadow-lg">
                      <div className="flex items-start gap-2.5 font-medium text-red-300">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                        <span className="leading-relaxed">{errorMsg}</span>
                      </div>
                      <div className="pt-2 border-t border-red-900/50 flex flex-wrap gap-2.5">
                        {fallbackMailtoUrl && (
                          <a
                            href={fallbackMailtoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#D15301] hover:bg-[#B94700] text-white font-semibold transition-all shadow text-xs min-h-[38px]"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Launch Email App (Pre-filled)</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={handleCopyDetails}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#080808] hover:bg-[#121212] border border-[#292929] text-[#F5F2ED] font-medium transition-all text-xs min-h-[38px] cursor-pointer"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-300">Copied to Clipboard!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-[#A6A6A6]" />
                              <span>Copy Enquiry Details</span>
                            </>
                          )}
                        </button>
                        <a
                          href="tel:+919932979875"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#080808] hover:bg-[#121212] border border-[#292929] text-[#F5F2ED] font-medium transition-all text-xs min-h-[38px]"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#D15301]" />
                          <span>Call +91 9932979875</span>
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="form-name" className="block text-xs font-bold uppercase tracking-wider text-[#F5F2ED] mb-1.5">
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
                        className="w-full px-3.5 py-2.5 bg-[#080808] border border-[#292929] rounded-lg text-base sm:text-sm text-[#F5F2ED] placeholder-[#A6A6A6]/60 focus:outline-none focus:ring-2 focus:ring-[#D15301] focus:border-[#D15301] transition-all min-h-[44px]"
                      />
                    </div>

                    {/* Business/Company */}
                    <div>
                      <label htmlFor="form-business" className="block text-xs font-bold uppercase tracking-wider text-[#F5F2ED] mb-1.5">
                        Business / Company
                      </label>
                      <input
                        type="text"
                        id="form-business"
                        name="business"
                        value={formData.business}
                        onChange={handleChange}
                        placeholder="e.g. Apex Tech Solutions"
                        className="w-full px-3.5 py-2.5 bg-[#080808] border border-[#292929] rounded-lg text-base sm:text-sm text-[#F5F2ED] placeholder-[#A6A6A6]/60 focus:outline-none focus:ring-2 focus:ring-[#D15301] focus:border-[#D15301] transition-all min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label htmlFor="form-email" className="block text-xs font-bold uppercase tracking-wider text-[#F5F2ED] mb-1.5">
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
                        className="w-full px-3.5 py-2.5 bg-[#080808] border border-[#292929] rounded-lg text-base sm:text-sm text-[#F5F2ED] placeholder-[#A6A6A6]/60 focus:outline-none focus:ring-2 focus:ring-[#D15301] focus:border-[#D15301] transition-all min-h-[44px]"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="form-phone" className="block text-xs font-bold uppercase tracking-wider text-[#F5F2ED] mb-1.5">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        id="form-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 bg-[#080808] border border-[#292929] rounded-lg text-base sm:text-sm text-[#F5F2ED] placeholder-[#A6A6A6]/60 focus:outline-none focus:ring-2 focus:ring-[#D15301] focus:border-[#D15301] transition-all min-h-[44px]"
                      />
                    </div>
                  </div>

                  {/* Service Required */}
                  <div>
                    <label htmlFor="form-service" className="block text-xs font-bold uppercase tracking-wider text-[#F5F2ED] mb-1.5">
                      Primary Service Required
                    </label>
                    <select
                      id="form-service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-[#080808] border border-[#292929] rounded-lg text-base sm:text-sm text-[#F5F2ED] focus:outline-none focus:ring-2 focus:ring-[#D15301] focus:border-[#D15301] transition-all min-h-[44px]"
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
                    <label htmlFor="form-message" className="block text-xs font-bold uppercase tracking-wider text-[#F5F2ED] mb-1.5">
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
                      className="w-full px-3.5 py-2.5 bg-[#080808] border border-[#292929] rounded-lg text-base sm:text-sm text-[#F5F2ED] placeholder-[#A6A6A6]/60 focus:outline-none focus:ring-2 focus:ring-[#D15301] focus:border-[#D15301] transition-all resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={submitting}
                      id="form-submit-btn"
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-[#D15301] hover:bg-[#B94700] active:scale-95 text-white text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#D15301]/20 disabled:opacity-60 cursor-pointer"
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
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2.5 border-t border-[#292929] text-[11px] text-[#A6A6A6]">
                      <span className="flex items-center gap-1.5 text-[#A6A6A6]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        Direct Destination: <span className="font-mono text-[#F5F2ED]">email@aniketdubey.com</span>
                      </span>
                      <a
                        href="mailto:email@aniketdubey.com?subject=Direct%20Consultation%20Enquiry%20-%20Dubey%20Conglomerate"
                        className="text-[#D15301] hover:text-[#B94700] font-semibold inline-flex items-center gap-1 transition-colors"
                      >
                        <Mail className="w-3 h-3" />
                        <span>Prefer direct email? Click here</span>
                      </a>
                    </div>
                    <p className="text-[11px] text-[#A6A6A6]/60 text-center mt-2">
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
