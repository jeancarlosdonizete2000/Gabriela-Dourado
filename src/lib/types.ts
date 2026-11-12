export interface SiteSettings {
  brandName: string;
  subBrandName: string;
  slogan: string;
  whatsappNumber: string;
  whatsappDefaultMessage: string;
  instagramHandle: string;
  instagramUrl: string;
  email: string;
  location: string;
  addressDetails: string;
  businessHours: string;
  crbm: string;
  googleAnalyticsId?: string;
}

export interface HomeContent {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
  };
  goldenEssenceSection: {
    signature: string;
    title: string;
    subtitle: string;
    description: string;
    secondParagraph: string;
    imageUrl: string;
    imageAlt: string;
    ctaText: string;
    ctaLink: string;
  };
  proceduresSection: {
    eyebrow: string;
    title: string;
    description: string;
    ctaText: string;
  };
  beautyEditSection: {
    eyebrow: string;
    title: string;
    description: string;
    ctaText: string;
  };
  aboutSection: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    imageUrl: string;
    imageAlt: string;
    ctaText: string;
    ctaLink: string;
  };
  contactBanner: {
    eyebrow: string;
    title: string;
    description: string;
    ctaText: string;
  };
}

export interface TimelineItem {
  yearOrPeriod: string;
  title: string;
  institution?: string;
  description: string;
}

export interface AboutPageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string;
  heroImageAlt: string;
  personalIntro: string[];
  biomedicineRelationTitle: string;
  biomedicineRelationText: string[];
  visionTitle: string;
  visionQuote: string;
  visionText: string[];
  timelineTitle: string;
  timelineSubtitle: string;
  educationTimeline: TimelineItem[];
  qualificationsTitle: string;
  qualifications: string[];
  goldenEssenceCalloutTitle: string;
  goldenEssenceCalloutText: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface GoldenEssenceProtocol {
  id: string;
  slug: string;
  order: number;
  published: boolean;
  commercialName: string;
  technicalCategory: string; // Ex: Limpeza de Pele, Peeling Químico, Microagulhamento
  tagline: string;
  imageUrl: string;
  imageAlt: string;
  shortDescription: string;
  fullDescription: string;
  objective: string;
  skinNeeds: string[];
  howItWorks: string;
  steps: {
    stepNumber: string;
    title: string;
    description: string;
  }[];
  expectedBenefits: string[];
  preCare: string[];
  postCare: string[];
  contraindicationsAndLimitations: string[];
  individualEvaluationNote: string;
  faqs: FAQItem[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface GoldenEssencePageContent {
  heroTitle: string;
  heroSignature: string;
  heroConceptParagraphs: string[];
  heroImageUrl: string;
  evaluationSectionTitle: string;
  evaluationSectionText: string[];
  evaluationCtaText: string;
}

export interface Procedure {
  id: string;
  slug: string;
  order: number;
  published: boolean;
  featuredOnHome: boolean;
  name: string;
  category: string;
  shortDescription: string;
  imageUrl: string;
  imageAlt: string;
  presentation: string;
  whatIsIt: string;
  howItWorks: string;
  indications: string[];
  expectedBenefits: string[];
  howItIsPerformed: string;
  preCare: string[];
  postCare: string[];
  contraindications: string[];
  faqs: FAQItem[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface ArticleCategory {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
}

export interface ScientificReference {
  authors: string;
  title: string;
  journal: string;
  year: string;
  doiOrUrl?: string;
}

export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
  highlightBox?: {
    title: string;
    text: string;
  };
  bulletList?: string[];
  imageUrl?: string;
  imageCaption?: string;
}

export interface Article {
  id: string;
  slug: string;
  status: "published" | "draft" | "scheduled";
  featured: boolean;
  title: string;
  subtitle: string;
  categorySlug: string;
  coverImageUrl: string;
  coverImageAlt: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes: number;
  sections: ArticleSection[];
  conclusion: string;
  references: ScientificReference[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  whatsappOrEmail: string;
  interest: string;
  message: string;
  consentGiven: boolean;
  createdAt: string;
  read: boolean;
}

export interface DatabaseSchema {
  settings: SiteSettings;
  home: HomeContent;
  about: AboutPageContent;
  goldenEssencePage: GoldenEssencePageContent;
  goldenEssenceProtocols: GoldenEssenceProtocol[];
  procedures: Procedure[];
  articleCategories: ArticleCategory[];
  articles: Article[];
  contactSubmissions: ContactSubmission[];
}
