import { Token } from './token';

export type ExportFormat = 'json' | 'figma-tokens' | 'css-variables' | 'scss-maps';

export interface ExportOptions {
  format: ExportFormat;
  includeMetadata: boolean;
  minify: boolean;
  prefix?: string;
  filename?: string;
}

export interface JSONExport {
  themeName: string;
  description: string;
  version: string;
  exportedAt: string;
  tokens: Token[];
  metadata?: {
    totalTokens: number;
    categories: string[];
    lastModified: string;
  };
}

export interface FigmaTokensExport {
  [category: string]: {
    [tokenName: string]: {
      value: string;
      type: string;
      description?: string;
    };
  };
}

export interface CSSVariablesExport {
  [key: string]: string;
}

export interface SCSSMapsExport {
  [mapName: string]: {
    [tokenName: string]: string;
  };
}

export type ExportResult = JSONExport | FigmaTokensExport | CSSVariablesExport | SCSSMapsExport;