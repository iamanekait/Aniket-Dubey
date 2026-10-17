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
import { RecognitionPage } from './pages/RecognitionPage';
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
            path="/capabilities"
            element={<ServicesPage onSelectService={handleSelectService} />}
          />
          {/* Legacy redirects */}
          <Route path="/insights" element={<Navigate to="/capabilities" replace />} />
          <Route path="/approach" element={<Navigate to="/capabilities" replace />} />
          <Route path="/recognition" element={<RecognitionPage />} />
          <Route path="/why-aniket" element={<Navigate to="/recognition" replace />} />
          <Route path="/why" element={<Navigate to="/recognition" replace />} />
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
