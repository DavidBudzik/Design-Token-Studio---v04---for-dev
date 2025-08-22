export interface OKLCHColor {
  lightness: number; // 0-1
  chroma: number; // 0-0.4 (typically)
  hue: number; // 0-360
}

export interface Color {
  name: string;
  hex: string;
  oklch: string;
  oklchValues: OKLCHColor;
  contrastRatio?: number;
}

export interface ColorPalette {
  primary: Color;
  secondary: Color;
  functional: Color;
  text: Color;
  gradient: Color;
}

export interface AccessibilityMetadata {
  wcagCompliance: 'AA' | 'AAA';
  contrastRatios: {
    primaryToBackground: number;
    secondaryToBackground: number;
    textToBackground: number;
  };
}

export interface IndustryTheme {
  id: string;
  name: string;
  keywords: string[];
  baseColors: Partial<ColorPalette>;
  description: string;
}

export interface GenerateRequest {
  description: string;
  theme?: string;
  enforceAccessibility?: boolean;
  accessibilityLevel?: 'AA' | 'AAA';
}

export interface GenerateResponse {
  theme: string;
  palette: ColorPalette;
  accessibility: AccessibilityMetadata;
  metadata: {
    generatedAt: string;
    model?: string;
    description: string;
  };
}

export interface ExportFormat {
  type: 'json' | 'css' | 'figma' | 'tailwind';
  includeMetadata?: boolean;
}

export const INDUSTRY_THEMES: Record<string, IndustryTheme> = {
  technology: {
    id: 'technology',
    name: 'Technology',
    keywords: ['tech', 'technology', 'startup', 'digital', 'modern', 'innovative'],
    baseColors: {
      primary: { name: 'Primary', hex: '#3B82F6', oklch: 'oklch(0.65 0.12 240)', oklchValues: { lightness: 0.65, chroma: 0.12, hue: 240 } }
    },
    description: 'Modern, clean palette for tech companies and startups'
  },
  healthcare: {
    id: 'healthcare',
    name: 'Healthcare',
    keywords: ['health', 'healthcare', 'medical', 'hospital', 'wellness', 'care'],
    baseColors: {
      primary: { name: 'Primary', hex: '#22C55E', oklch: 'oklch(0.7 0.14 150)', oklchValues: { lightness: 0.7, chroma: 0.14, hue: 150 } }
    },
    description: 'Calming, trustworthy palette for healthcare organizations'
  },
  finance: {
    id: 'finance',
    name: 'Finance',
    keywords: ['finance', 'financial', 'banking', 'investment', 'money', 'wealth'],
    baseColors: {
      primary: { name: 'Primary', hex: '#1E3A8A', oklch: 'oklch(0.5 0.13 260)', oklchValues: { lightness: 0.5, chroma: 0.13, hue: 260 } }
    },
    description: 'Professional, trustworthy palette for financial services'
  },
  education: {
    id: 'education',
    name: 'Education',
    keywords: ['education', 'school', 'university', 'learning', 'academic', 'study'],
    baseColors: {
      primary: { name: 'Primary', hex: '#8B5CF6', oklch: 'oklch(0.6 0.15 290)', oklchValues: { lightness: 0.6, chroma: 0.15, hue: 290 } }
    },
    description: 'Inspiring, approachable palette for educational institutions'
  },
  retail: {
    id: 'retail',
    name: 'Retail',
    keywords: ['retail', 'shop', 'store', 'commerce', 'shopping', 'ecommerce'],
    baseColors: {
      primary: { name: 'Primary', hex: '#EF4444', oklch: 'oklch(0.6 0.15 30)', oklchValues: { lightness: 0.6, chroma: 0.15, hue: 30 } }
    },
    description: 'Vibrant, engaging palette for retail businesses'
  },
  hospitality: {
    id: 'hospitality',
    name: 'Hospitality',
    keywords: ['hospitality', 'hotel', 'travel', 'tourism', 'resort', 'restaurant'],
    baseColors: {
      primary: { name: 'Primary', hex: '#D97706', oklch: 'oklch(0.65 0.14 70)', oklchValues: { lightness: 0.65, chroma: 0.14, hue: 70 } }
    },
    description: 'Warm, welcoming palette for hospitality businesses'
  },
  entertainment: {
    id: 'entertainment',
    name: 'Entertainment',
    keywords: ['entertainment', 'media', 'film', 'music', 'show', 'gaming'],
    baseColors: {
      primary: { name: 'Primary', hex: '#DC2626', oklch: 'oklch(0.55 0.16 20)', oklchValues: { lightness: 0.55, chroma: 0.16, hue: 20 } }
    },
    description: 'Bold, dynamic palette for entertainment industry'
  },
  automotive: {
    id: 'automotive',
    name: 'Automotive',
    keywords: ['automotive', 'car', 'vehicle', 'auto', 'drive', 'motor'],
    baseColors: {
      primary: { name: 'Primary', hex: '#1F2937', oklch: 'oklch(0.3 0.05 260)', oklchValues: { lightness: 0.3, chroma: 0.05, hue: 260 } }
    },
    description: 'Sleek, professional palette for automotive industry'
  },
  'non-profit': {
    id: 'non-profit',
    name: 'Non-Profit',
    keywords: ['nonprofit', 'non-profit', 'charity', 'community', 'social', 'cause'],
    baseColors: {
      primary: { name: 'Primary', hex: '#059669', oklch: 'oklch(0.6 0.14 160)', oklchValues: { lightness: 0.6, chroma: 0.14, hue: 160 } }
    },
    description: 'Compassionate, trustworthy palette for non-profit organizations'
  },
  'food-beverage': {
    id: 'food-beverage',
    name: 'Food & Beverage',
    keywords: ['food', 'beverage', 'restaurant', 'culinary', 'cafe', 'dining'],
    baseColors: {
      primary: { name: 'Primary', hex: '#B91C1C', oklch: 'oklch(0.5 0.15 20)', oklchValues: { lightness: 0.5, chroma: 0.15, hue: 20 } }
    },
    description: 'Appetizing, warm palette for food and beverage businesses'
  },
  fashion: {
    id: 'fashion',
    name: 'Fashion',
    keywords: ['fashion', 'style', 'apparel', 'clothing', 'trend', 'design'],
    baseColors: {
      primary: { name: 'Primary', hex: '#DB2777', oklch: 'oklch(0.55 0.16 330)', oklchValues: { lightness: 0.55, chroma: 0.16, hue: 330 } }
    },
    description: 'Stylish, sophisticated palette for fashion brands'
  },
  'real-estate': {
    id: 'real-estate',
    name: 'Real Estate',
    keywords: ['real estate', 'property', 'home', 'realty', 'housing', 'estate'],
    baseColors: {
      primary: { name: 'Primary', hex: '#047857', oklch: 'oklch(0.55 0.13 170)', oklchValues: { lightness: 0.55, chroma: 0.13, hue: 170 } }
    },
    description: 'Professional, trustworthy palette for real estate'
  }
};