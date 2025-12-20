export interface Startup {
  id: string;
  name: string;
  studio: string;
  category: string;
  year: number;
  funding: number; // 億円
  stage: 'Seed' | 'Pre-Series A' | 'Series A' | 'Series B' | 'Series C+' | 'IPO' | 'M&A';
  description: string;
  exit?: 'IPO' | 'M&A' | null;
}

export interface Studio {
  id: string;
  name: string;
  type: '独立系' | '大企業系' | 'VC系' | '大学系';
  startupCount: number;
  exitCount: number;
  totalFunding: number; // 億円
  description: string;
}

export interface Report {
  id: string;
  title: string;
  date: string;
  description: string;
  pdfUrl: string;
}

export interface Statistics {
  startupCount: number;
  studioCount: number;
  totalFunding: number; // 億円
  exitCount: number;
}
