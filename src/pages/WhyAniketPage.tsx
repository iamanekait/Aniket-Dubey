import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WhyWorkWithAniket } from '../components/WhyWorkWithAniket';
import { CrossIndustry } from '../components/CrossIndustry';
import { CallToAction } from '../components/CallToAction';
import { SEO } from '../components/SEO';
import { WHY_WORK_WITH_ANIKET, CONSULTANT_INFO } from '../data';

export const WhyAniketPage: React.FC = () => {
  const navigate = useNavigate();

  const whyStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Why Work With Aniket Dubey',
    description: 'Core advantages and value proposition of engaging Aniket Dubey for business advisory.',
    itemListElement: WHY_WORK_WITH_ANIKET.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.title,
      description: item.description,
    })),
  };

  return (
    <div className="pt-24 pb-20 bg-slate-950">
      {/* React Helmet SEO Meta Tags */}
      <SEO
        title="Why Choose Aniket Dubey | Founder-First Strategic Business Advisory Partner"
        description="Why founders and entrepreneurs choose Aniket Dubey: a founder-first strategic business advisory partner with 10+ years hands-on experience, direct principal involvement, and combined commercial-IT mastery."
        keywords="Why Choose Aniket Dubey, Founder-First Business Advisory, Strategic Business Advisory Partner, Principal-Led Advisory, Cross-Industry Business Consultant, West Bengal"
        canonicalPath="/why-aniket"
        ogType="website"
        jsonLd={whyStructuredData}
      />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/80 border border-blue-800/40 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            Founder-First Advisory Partnership
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Why Founders Choose Aniket Dubey as Their Strategic Advisory Partner.
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            A founder-first strategic business advisory partner delivering direct personal attention, 10+ years of cross-industry insight, and practical solutions tailored to your commercial reality.
          </p>
        </div>
      </div>

      {/* 6 Core Pillars Component */}
      <WhyWorkWithAniket />

      {/* Cross Industry Section */}
      <CrossIndustry onScheduleClick={() => navigate('/contact')} />

      {/* High-Impact CTA */}
      <CallToAction onScheduleClick={() => navigate('/contact')} />
    </div>
  );
};
