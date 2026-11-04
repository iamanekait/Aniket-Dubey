import { CONSULTANT_INFO, SERVICES, WHY_ANIKET_CONTENT, WHY_WORK_WITH_ANIKET } from '../data';

export const BASE_URL = 'https://aniketdubey.com';
export const LOGO_URL =
  'https://xd92d5z735f07l9p.public.blob.vercel-storage.com/Create_logo_for_business_consultant_2K_20260914094451.jpeg';

/**
 * Verified Person Schema representing Aniket Dubey.
 * Uses only authentic information from visible site content.
 */
export const PERSON_SCHEMA = {
  '@type': 'Person',
  '@id': `${BASE_URL}/#person`,
  name: CONSULTANT_INFO.name,
  alternateName: ['Aniket Dubey Consulting', 'Dubey Conglomerate'],
  jobTitle: 'Founder-First Strategic Business Advisory Partner & Independent IT Contractor',
  description:
    'A founder-first strategic business advisory partner with 10+ years of experience helping founders and growing businesses with business consulting, strategic content marketing, and managed IT services.',
  url: BASE_URL,
  image: LOGO_URL,
  telephone: CONSULTANT_INFO.phone,
  email: CONSULTANT_INFO.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Road No. 36, Uttarpally, Benachity',
    addressLocality: 'Durgapur',
    addressRegion: 'West Bengal',
    postalCode: '713213',
    addressCountry: 'IN',
  },
  sameAs: [
    CONSULTANT_INFO.linkedin,
    CONSULTANT_INFO.instagram,
  ],
  knowsAbout: [
    'Founder-First Business Advisory',
    'Strategic Business Consulting',
    'Strategic Content Marketing',
    'Managed IT Services',
    'Business & Technology Strategy',
    'Operational Bottleneck Removal',
    'Global Brand Scaling',
  ],
  award:
    'Felicitated by Technext Technosoft Pvt. Ltd. for scaling global brand iWebNext across North America and international markets for over 10 years',
};

/**
 * WebSite Schema for AniketDubey.com
 */
export const WEBSITE_SCHEMA = {
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  url: BASE_URL,
  name: 'Aniket Dubey',
  alternateName: 'Dubey Conglomerate',
  description:
    'Official website and advisory platform of Aniket Dubey, a founder-first strategic business advisory partner and independent IT contractor.',
  publisher: {
    '@id': `${BASE_URL}/#person`,
  },
  inLanguage: 'en-IN',
};

/**
 * Homepage Schema:
 * Combines WebSite, Person, and ProfilePage in a unified @graph.
 */
export const getHomeSchema = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    WEBSITE_SCHEMA,
    PERSON_SCHEMA,
    {
      '@type': 'ProfilePage',
      '@id': `${BASE_URL}/#profilepage`,
      url: BASE_URL,
      name: 'Aniket Dubey | Founder-First Strategic Business Advisory Partner',
      description:
        'Founder-first strategic business advisory partner with 10+ years of experience helping founders and growing businesses with strategic consulting, content marketing, and managed IT services.',
      isPartOf: {
        '@id': `${BASE_URL}/#website`,
      },
      about: {
        '@id': `${BASE_URL}/#person`,
      },
      mainEntity: {
        '@id': `${BASE_URL}/#person`,
      },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${BASE_URL}/#business`,
      name: 'Aniket Dubey - Strategic Business Advisory',
      url: BASE_URL,
      image: LOGO_URL,
      telephone: CONSULTANT_INFO.phone,
      email: CONSULTANT_INFO.email,
      founder: {
        '@id': `${BASE_URL}/#person`,
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Road No. 36, Uttarpally, Benachity',
        addressLocality: 'Durgapur',
        addressRegion: 'West Bengal',
        postalCode: '713213',
        addressCountry: 'IN',
      },
      priceRange: '$$$',
    },
  ],
});

/**
 * About Page Schema
 */
export const getAboutSchema = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    PERSON_SCHEMA,
    {
      '@type': 'AboutPage',
      '@id': `${BASE_URL}/about#aboutpage`,
      url: `${BASE_URL}/about`,
      name: 'About Aniket Dubey | Founder-First Strategic Business Advisory Partner',
      description:
        'Meet Aniket Dubey: a founder-first strategic business advisory partner with 10+ years of experience helping founders untangle operational friction and build resilient, scalable businesses.',
      isPartOf: {
        '@id': `${BASE_URL}/#website`,
      },
      mainEntity: {
        '@id': `${BASE_URL}/#person`,
      },
      inLanguage: 'en-IN',
    },
  ],
});

/**
 * Services / Capabilities Page Schema
 */
export const getServicesSchema = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ItemPage',
      '@id': `${BASE_URL}/services#itempage`,
      url: `${BASE_URL}/services`,
      name: 'Capabilities & Services | Aniket Dubey | Founder-First Advisory Partner',
      description:
        'Explore founder-first consulting capabilities: strategic growth planning, content marketing authority engines, managed IT infrastructure, and digital workflow optimization.',
      isPartOf: {
        '@id': `${BASE_URL}/#website`,
      },
      about: {
        '@id': `${BASE_URL}/#person`,
      },
      mainEntity: {
        '@type': 'Service',
        '@id': `${BASE_URL}/services#service`,
        name: 'Strategic Business Advisory & Managed IT Services',
        provider: {
          '@id': `${BASE_URL}/#person`,
        },
        serviceType: 'Business Advisory & Managed IT',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Consulting Capabilities & Services',
          itemListElement: SERVICES.map((service, index) => ({
            '@type': 'Offer',
            position: index + 1,
            itemOffered: {
              '@type': 'Service',
              name: service.title,
              description: service.description,
            },
          })),
        },
      },
      inLanguage: 'en-IN',
    },
  ],
});

/**
 * Recognition Page Schema
 */
export const getRecognitionSchema = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    PERSON_SCHEMA,
    {
      '@type': 'ItemPage',
      '@id': `${BASE_URL}/recognition#itempage`,
      url: `${BASE_URL}/recognition`,
      name: 'Recognition & Felicitation | Aniket Dubey - Technext Technosoft Pvt. Ltd.',
      description:
        'Corporate recognition of Aniket Dubey by Technext Technosoft Pvt. Ltd. for scaling their global brand iWebNext for over 10 years as an Independent IT Contractor & Business Advisory Partner.',
      isPartOf: {
        '@id': `${BASE_URL}/#website`,
      },
      about: {
        '@id': `${BASE_URL}/#person`,
      },
      mainEntity: {
        '@type': 'CreativeWork',
        '@id': `${BASE_URL}/recognition#citation`,
        name: 'Corporate Felicitation & Recognition for Global Brand Scaling',
        headline:
          'Felicitated by Technext Technosoft Pvt. Ltd. for Scaling iWebNext at a Global Level for Over 10 Years',
        description:
          'Felicitated in recognition of over 10 years of exceptional leadership, dedication, and strategic contribution in establishing, expanding, and scaling iWebNext across the North American and global IT landscape.',
        author: {
          '@type': 'Organization',
          name: 'Technext Technosoft Pvt. Ltd.',
        },
        recipient: {
          '@id': `${BASE_URL}/#person`,
        },
      },
      itemListElement: WHY_WORK_WITH_ANIKET.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.title,
        description: item.description,
      })),
      inLanguage: 'en-IN',
    },
  ],
});

/**
 * Contact Page Schema
 */
export const getContactSchema = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    PERSON_SCHEMA,
    {
      '@type': 'ContactPage',
      '@id': `${BASE_URL}/contact#contactpage`,
      url: `${BASE_URL}/contact`,
      name: 'Contact & Advisory Enquiry | Aniket Dubey | Business Consultant',
      description:
        'Schedule a 1-on-1 strategic consultation with Aniket Dubey in Durgapur, West Bengal. Discuss business growth, content marketing, or managed IT services for your organization.',
      isPartOf: {
        '@id': `${BASE_URL}/#website`,
      },
      mainEntity: {
        '@type': 'ProfessionalService',
        '@id': `${BASE_URL}/contact#business`,
        name: 'Aniket Dubey - Business Advisory',
        url: `${BASE_URL}/contact`,
        telephone: CONSULTANT_INFO.phone,
        email: CONSULTANT_INFO.email,
        founder: {
          '@id': `${BASE_URL}/#person`,
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Road No. 36, Uttarpally, Benachity',
          addressLocality: 'Durgapur',
          addressRegion: 'West Bengal',
          postalCode: '713213',
          addressCountry: 'IN',
        },
      },
      inLanguage: 'en-IN',
    },
  ],
});
