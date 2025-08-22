import { Token } from './token';

export type IndustryType = 
  | 'Technology' 
  | 'Healthcare' 
  | 'Finance' 
  | 'Education' 
  | 'Retail' 
  | 'Hospitality' 
  | 'Entertainment' 
  | 'Automotive' 
  | 'Non-Profit' 
  | 'Food & Beverage' 
  | 'Fashion' 
  | 'Real Estate';

export type ColorRole = 
  | 'primary' 
  | 'secondary' 
  | 'accent' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'neutral' 
  | 'surface' 
  | 'text' 
  | 'ui' 
  | 'icons';

export type EmotionTag = 
  | 'Trust' 
  | 'Calmness' 
  | 'Focus' 
  | 'Excitement' 
  | 'Passion' 
  | 'Energy' 
  | 'Safety' 
  | 'Comfort' 
  | 'Professionalism' 
  | 'Innovation' 
  | 'Elegance' 
  | 'Timelessness' 
  | 'Status';

export interface ThemeColor {
  role: ColorRole;
  hex: string;
  oklch: string;
  light: string;
  dark: string;
  interactive_states: {
    default: string;
    hover: string;
    active: string;
    focused: string;
    disabled: string;
  };
  usage: string;
  accessibility: {
    contrastRatio: number;
    wcagAA: boolean;
    wcagAAA: boolean;
  };
}

export interface Theme {
  id: string;
  name: string;
  industry: IndustryType;
  description: string;
  colors: ThemeColor[];
  emotionTags: EmotionTag[];
  createdAt: Date;
  isCustom?: boolean;
  accessibility: {
    compliance: 'AA' | 'AAA' | 'partial';
    averageContrast: number;
  };
}

export interface ThemeTemplate {
  id: string;
  name: string;
  industry: IndustryType;
  description: string;
  preview: {
    primary: string;
    secondary: string;
    accent: string;
  };
  emotionTags: EmotionTag[];
  tokens: Token[];
  accessibility: {
    compliance: 'AA' | 'AAA';
    averageContrast: number;
  };
}

export interface ThemeLibrary {
  templates: ThemeTemplate[];
  custom: Theme[];
}

export interface IndustryThemePreview {
  id: string;
  name: string;
  industry: IndustryType;
  description: string;
  emotionTags: EmotionTag[];
  preview: {
    primary: string;
    secondary: string;
    accent: string;
  };
  accessibility: {
    compliance: 'AA' | 'AAA';
    averageContrast: number;
  };
}