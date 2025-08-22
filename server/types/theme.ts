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

export interface IndustryTheme {
  id: string;
  name: string;
  industry: IndustryType;
  description: string;
  emotionTags: EmotionTag[];
  colorRoles: {
    [K in ColorRole]: {
      hex: string;
      oklch: string;
      usage: string;
      interactive_states: {
        default: string;
        hover: string;
        active: string;
        focus: string;
        disabled: string;
      };
    };
  };
  accessibility: {
    compliance: 'AA' | 'AAA';
    averageContrast: number;
  };
}

export interface ThemeLibrary {
  [K in IndustryType]: IndustryTheme;
}