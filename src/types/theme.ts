import { Token, TokenCategory } from './token';

export type IndustryType = 'Education' | 'Technology' | 'Healthcare' | 'Fashion' | 'Entertainment' | 'Finance' | 'Food' | 'Travel' | 'Sports' | 'Gaming';

export type ColorRole = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'neutral' | 'surface' | 'text' | 'ui' | 'icons';

export type EmotionTag = 'Trust' | 'Calmness' | 'Focus' | 'Excitement' | 'Passion' | 'Energy' | 'Safety' | 'Comfort' | 'Professionalism' | 'Innovation' | 'Elegance' | 'Timelessness' | 'Status';

export interface ThemeColor {
  role: ColorRole;
  hex: string;
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
}

export interface ThemeLibrary {
  templates: ThemeTemplate[];
  custom: Theme[];
}