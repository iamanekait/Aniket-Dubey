import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AIChatbot } from './components/AIChatbot';
import { ScrollToTop } from './components/ScrollToTop';
import { ScrollToTopOnRouteChange } from './components/ScrollToTopOnRouteChange';
import { ReadingProgressBar } from './components/ReadingProgressBar';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ApproachPage } from './pages/ApproachPage';
import { WhyAniketPage } from './pages/WhyAniketPage';
import { ContactPage } from './pages/ContactPage';
import { ContactFormData } from './types';

function AppContent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    business: '',
    email: '',
    phone: '',
    service: 'General Strategic Consulting',
    message: '',
  });

  const handleSelectService = (serviceName: string) => {
    setFormData((prev) => ({
      ...prev,
      service: serviceName,
    }));
  };

  const handlePreFillEnquiry = (service: string, summary: string) => {
    setFormData((prev) => ({
      ...prev,
      service: service,
      message: summary + (prev.message ? `\n\nAdditional notes: ${prev.message}` : ''),
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Resets window scroll position on page transition */}
      <ScrollToTopOnRouteChange />

      {/* Smooth, thin reading progress bar for long-form content pages */}
      <ReadingProgressBar />

      {/* Persistent Navigation Bar */}
      <Navbar />

      {/* Multi-Page Routes */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/services"
            element={<ServicesPage onSelectService={handleSelectService} />}
          />
          <Route
            path="/approach"
            element={<ApproachPage onPreFillEnquiry={handlePreFillEnquiry} />}
          />
          <Route path="/why-aniket" element={<WhyAniketPage />} />
          <Route
            path="/contact"
            element={<ContactPage formData={formData} setFormData={setFormData} />}
          />
          {/* Catch-all redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Persistent Global Footer */}
      <Footer />

      {/* Floating Interactive Elements */}
      <AIChatbot onOpenConsultationForm={() => navigate('/contact')} />
      <ScrollToTop />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
