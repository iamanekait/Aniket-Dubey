import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { CONSULTANT_INFO } from '../data';
import {
  BASE_URL,
  LOGO_URL,
  getServiceDetailSchema,
  getCaseStudyDetailSchema,
  createServiceSEOProps,
  createCaseStudySEOProps,
  injectDynamicSEOData,
} from '../utils/seoSchemas';

export {
  getServiceDetailSchema,
  getCaseStudyDetailSchema,
  createServiceSEOProps,
  createCaseStudySEOProps,
  injectDynamicSEOData,
};

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface SEOProps {
  /** Page title shown in search result snippets and browser tabs (30-60 chars recommended) */
  title: string;
  /** Primary meta description summarizing page value proposition (120-160 chars recommended) */
  description: string;
  /** Comma-separated list of targeted search keywords */
  keywords?: string;
  /** Relative path for canonical URL (e.g. '/about', '/services'). Defaults to current router pathname. */
  canonicalPath?: string;
  /** Full absolute canonical URL if overriding standard base domain */
  canonicalUrl?: string;
  /** OpenGraph content type ('website', 'article', 'profile') */
  ogType?: 'website' | 'article' | 'profile';
  /** High-resolution image URL for social media share previews (recommended 1200x630) */
  ogImage?: string;
  /** Accessible alternative description for social share image */
  ogImageAlt?: string;
  /** Image width in pixels for OpenGraph (defaults to 1200) */
  ogImageWidth?: number;
  /** Image height in pixels for OpenGraph (defaults to 630) */
  ogImageHeight?: number;
  /** Twitter / X summary card style ('summary_large_image' or 'summary') */
  twitterCard?: 'summary' | 'summary_large_image';
  /** Page author credit */
  author?: string;
  /** Set to true to prevent search engines from indexing the page (e.g. for preview/error routes) */
  noindex?: boolean;
  /** Schema.org structured data object or array of objects for JSON-LD rich snippets */
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  /** Breadcrumb navigation items to automatically generate Schema.org BreadcrumbList JSON-LD */
  breadcrumbs?: BreadcrumbItem[];
  /** ISO date string for published time (for articles/case studies) */
  publishedTime?: string;
  /** ISO date string for modified/updated time */
  modifiedTime?: string;
}

const DEFAULT_KEYWORDS =
  'Founder-First Business Advisory, Strategic Business Advisory Partner, Business Consultant in Durgapur, Business Consulting, Business Growth Consultant, Strategic Content Marketing, Managed IT Services, Technology Strategy, SME Growth, Operational Optimization, Tech Modernization, West Bengal, Aniket Dubey, Dubey Conglomerate';

/**
 * Builds Schema.org BreadcrumbList JSON-LD structure from breadcrumb items.
 */
export function buildBreadcrumbSchema(breadcrumbs: BreadcrumbItem[], baseUrl: string = BASE_URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => {
      const cleanPath = crumb.path.startsWith('/') ? crumb.path : `/${crumb.path}`;
      const itemUrl = cleanPath === '/' ? `${baseUrl}/` : `${baseUrl}${cleanPath}`;
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: itemUrl,
      };
    }),
  };
}

/**
 * Reusable SEO Component powered by react-helmet-async.
 *
 * Manages:
 * - Dynamic document title and meta description
 * - Production-safe canonical URL calculation with query-string stripping
 * - Full Open Graph social sharing tags (Facebook, LinkedIn, Slack, WhatsApp)
 * - Twitter / X Summary Large Image cards
 * - Crawler directives (robots, googlebot, max-snippet, max-image-preview)
 * - Schema.org JSON-LD structured data and automatic BreadcrumbList generation
 * - Regional and geo-targeting signals
 */
export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = DEFAULT_KEYWORDS,
  canonicalPath,
  canonicalUrl,
  ogType = 'website',
  ogImage = LOGO_URL,
  ogImageAlt = 'Aniket Dubey - Business Advisory Partner Logo',
  ogImageWidth = 1200,
  ogImageHeight = 630,
  twitterCard = 'summary_large_image',
  author = CONSULTANT_INFO.name,
  noindex = false,
  jsonLd,
  breadcrumbs,
  publishedTime,
  modifiedTime,
}) => {
  // Safely resolve active router pathname when available
  let activePathname = '/';
  try {
    const location = useLocation();
    activePathname = location.pathname || '/';
  } catch {
    if (typeof window !== 'undefined' && window.location) {
      activePathname = window.location.pathname || '/';
    }
  }

  // Calculate canonical URL:
  // 1. Explicit canonicalUrl takes precedence.
  // 2. Otherwise canonicalPath if supplied.
  // 3. Fallback to active router pathname (stripping queries and fragments for clean indexation).
  let targetCanonicalUrl = '';
  if (canonicalUrl) {
    targetCanonicalUrl = canonicalUrl;
  } else {
    const targetPath = canonicalPath !== undefined ? canonicalPath : activePathname;
    const cleanPath = targetPath.startsWith('/') ? targetPath : `/${targetPath}`;
    targetCanonicalUrl = cleanPath === '/' ? `${BASE_URL}/` : `${BASE_URL}${cleanPath}`;
  }

  const robotsDirectives = noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  const breadcrumbSchema =
    breadcrumbs && breadcrumbs.length > 0 ? buildBreadcrumbSchema(breadcrumbs) : null;

  return (
    <Helmet>
      {/* Document Title */}
      <title>{title}</title>

      {/* Standard Meta Tags */}
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      <meta name="robots" content={robotsDirectives} />
      <meta name="googlebot" content={robotsDirectives} />

      {/* Canonical URL */}
      <link rel="canonical" href={targetCanonicalUrl} />

      {/* Open Graph Meta Tags (Facebook, LinkedIn, Slack, WhatsApp) */}
      <meta property="og:site_name" content="Aniket Dubey | Founder-First Strategic Business Advisory Partner" />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={targetCanonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:image:width" content={String(ogImageWidth)} />
      <meta property="og:image:height" content={String(ogImageHeight)} />
      <meta property="og:locale" content="en_IN" />

      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter / X Social Cards */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content="@iamaniketdubey" />
      <meta name="twitter:creator" content="@iamaniketdubey" />
      <meta name="twitter:url" content={targetCanonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />

      {/* Regional & Geo-Targeting */}
      <meta name="geo.region" content="IN-WB" />
      <meta name="geo.placename" content="Durgapur, West Bengal" />
      <meta name="geo.position" content="23.5204;87.3119" />
      <meta name="ICBM" content="23.5204, 87.3119" />

      {/* Structured Data: Automatic BreadcrumbList JSON-LD */}
      {breadcrumbSchema && (
        <script id="schema-breadcrumbs" type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

      {/* Structured Data: Page-Specific Schema.org JSON-LD */}
      {jsonLd && (
        <script id="schema-jsonld" type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};
