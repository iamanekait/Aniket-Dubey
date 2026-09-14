export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  features: string[];
  tag: string;
}

export interface ApproachStep {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface ContactFormData {
  name: string;
  business: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'Business Consulting' | 'Content Marketing' | 'Managed IT' | 'Technology Strategy';
  clientType: string;
  context: string;
  challenge: string;
  solution: string;
  keyOutcomes: string[];
  toolsAndFrameworks: string[];
  tag: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
