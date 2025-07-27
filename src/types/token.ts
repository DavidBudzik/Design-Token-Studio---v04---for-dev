export type TokenType = 'color' | 'spacing' | 'typography' | 'borderRadius' | 'shadow' | 'gradient';

export type TokenCategory = 'Primary' | 'Secondary' | 'Functional' | 'Text' | 'Gradient' | 'Other';

export type InteractiveState = 'default' | 'hover' | 'active' | 'focus' | 'disabled';

export interface BaseToken {
  id: string;
  name: string;
  value: string;
  type: TokenType;
  category: TokenCategory;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ColorToken extends BaseToken {
  type: 'color';
  hex: string;
  light?: string;
  dark?: string;
  interactive_states: Record<InteractiveState, string>;
  usage?: string;
  tints?: string[];
  contrast?: {
    aa: boolean;
    aaa: boolean;
    ratio: number;
  };
}

export interface SpacingToken extends BaseToken {
  type: 'spacing';
  unit: 'px' | 'rem' | 'em' | '%';
  scale?: number[];
}

export interface TypographyToken extends BaseToken {
  type: 'typography';
  fontSize: string;
  fontWeight?: number;
  lineHeight?: string;
  letterSpacing?: string;
  fontFamily?: string;
}

export interface BorderRadiusToken extends BaseToken {
  type: 'borderRadius';
  unit: 'px' | 'rem' | 'em' | '%';
}

export interface ShadowToken extends BaseToken {
  type: 'shadow';
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  inset?: boolean;
}

export interface GradientToken extends BaseToken {
  type: 'gradient';
  direction: 'linear' | 'radial';
  stops: Array<{
    color: string;
    position: number;
    opacity?: number;
  }>;
}

export type Token = ColorToken | SpacingToken | TypographyToken | BorderRadiusToken | ShadowToken | GradientToken;

export interface TokenGroup {
  id: string;
  name: string;
  category: TokenCategory;
  tokens: Token[];
  collapsed?: boolean;
}