import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CONSULTANT_INFO } from '../data';
import { BASE_URL, LOGO_URL } from '../utils/seoSchemas';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article' | 'profile';
  ogImage?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const DEFAULT_KEYWORDS =
  'Aniket Dubey, Business Consultant, Business Strategy, Strategic Content Marketing, Managed IT Services, Technology Strategy, Durgapur, West Bengal, SME Growth, Operational Optimization, Tech Modernization';

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = DEFAULT_KEYWORDS,
  canonicalPath = '/',
  ogType = 'website',
  ogImage = LOGO_URL,
  jsonLd,
}) => {
  // Production canonical URL strictly rooted on aniketdubey.com
  const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
  const canonicalUrl = cleanPath === '/' ? `${BASE_URL}/` : `${BASE_URL}${cleanPath}`;

  return (
    <Helmet>
      {/* HTML Document Head Title & Standard Meta */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={CONSULTANT_INFO.name} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Meta Tags for Social Sharing */}
      <meta property="og:site_name" content="Aniket Dubey | Founder-First Strategic Business Advisory Partner" />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content="Aniket Dubey - Business Advisory Partner Logo" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter / X Social Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content="Aniket Dubey - Business Advisory Partner Logo" />

      {/* Structured Data (Schema.org JSON-LD) */}
      {jsonLd && (
        <script id="schema-jsonld" type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};
