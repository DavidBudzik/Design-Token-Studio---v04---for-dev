import { IndustryType } from '../types/theme';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface PaletteGenerationRequest {
  description: string;
  industryTheme?: IndustryType;
  accessibility?: 'AA' | 'AAA';
  colorCount?: number;
}

export interface GeneratedColor {
  name: string;
  category: 'Primary' | 'Secondary' | 'Functional' | 'Text' | 'Gradient';
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
  accessibility: {
    contrastRatio: number;
    wcagAA: boolean;
    wcagAAA: boolean;
  };
}

export interface GeneratedPalette {
  theme: string;
  description: string;
  industry: IndustryType;
  colors: GeneratedColor[];
  metadata: {
    generatedAt: string;
    model: string;
    accessibility: {
      overallCompliance: 'AA' | 'AAA' | 'partial';
      averageContrast: number;
    };
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: {
    message: string;
    code: string;
    timestamp: string;
  };
  detectedIndustry?: IndustryType;
}

export interface ExportRequest {
  palette: GeneratedPalette;
  format: 'json' | 'css' | 'scss' | 'tailwind' | 'figma';
}

export interface ExportResult {
  content: string;
  filename: string;
  mimeType: string;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  /**
   * Generate a color palette using AI
   */
  async generatePalette(request: PaletteGenerationRequest): Promise<ApiResponse<GeneratedPalette>> {
    return this.request<GeneratedPalette>('/palette/generate', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  /**
   * Validate accessibility of colors
   */
  async validateAccessibility(
    colors: string[],
    background = '#ffffff',
    standard: 'AA' | 'AAA' = 'AA'
  ): Promise<ApiResponse<any>> {
    return this.request('/palette/validate-accessibility', {
      method: 'POST',
      body: JSON.stringify({ colors, background, standard }),
    });
  }

  /**
   * Generate interactive states for a color
   */
  async generateInteractiveStates(baseColor: string): Promise<ApiResponse<any>> {
    return this.request('/palette/generate-states', {
      method: 'POST',
      body: JSON.stringify({ baseColor }),
    });
  }

  /**
   * Convert between color formats
   */
  async convertColor(
    color: string,
    from: 'hex' | 'oklch',
    to: 'hex' | 'oklch'
  ): Promise<ApiResponse<any>> {
    return this.request('/palette/convert', {
      method: 'POST',
      body: JSON.stringify({ color, from, to }),
    });
  }

  /**
   * Get all industry themes
   */
  async getIndustryThemes(): Promise<ApiResponse<any[]>> {
    return this.request('/theme/industries');
  }

  /**
   * Get specific industry theme
   */
  async getIndustryTheme(industry: IndustryType): Promise<ApiResponse<any>> {
    return this.request(`/theme/industries/${industry}`);
  }

  /**
   * Search themes by emotion
   */
  async getThemesByEmotion(emotion: string): Promise<ApiResponse<any[]>> {
    return this.request(`/theme/emotions/${emotion}`);
  }

  /**
   * Search themes by keywords
   */
  async searchThemes(query: string): Promise<ApiResponse<any[]>> {
    return this.request(`/theme/search?q=${encodeURIComponent(query)}`);
  }

  /**
   * Export palette in specified format
   */
  async exportPalette(request: ExportRequest): Promise<ExportResult> {
    // For now, handle export client-side
    // In a full implementation, this could be a server endpoint
    return this.generateExport(request.palette, request.format);
  }

  /**
   * Client-side export generation
   */
  private generateExport(palette: GeneratedPalette, format: string): ExportResult {
    switch (format) {
      case 'json':
        return {
          content: JSON.stringify(palette, null, 2),
          filename: `${palette.industry.toLowerCase().replace(/\s+/g, '-')}-palette.json`,
          mimeType: 'application/json',
        };
      
      case 'css':
        const cssVars = palette.colors.map(color => {
          const baseName = `--${color.category.toLowerCase()}-${color.name.toLowerCase().replace(/\s+/g, '-')}`;
          return `  ${baseName}: ${color.hex};\n  ${baseName}-oklch: ${color.oklch};`;
        }).join('\n');
        
        return {
          content: `:root {\n${cssVars}\n}`,
          filename: `${palette.industry.toLowerCase().replace(/\s+/g, '-')}-palette.css`,
          mimeType: 'text/css',
        };
      
      case 'figma':
        const figmaTokens = {
          [palette.industry.toLowerCase().replace(/\s+/g, '-')]: {
            colors: palette.colors.reduce((acc, color) => {
              const colorName = `${color.category.toLowerCase()}-${color.name.toLowerCase().replace(/\s+/g, '-')}`;
              acc[colorName] = {
                value: color.hex,
                type: 'color',
                description: color.usage,
                oklch: color.oklch,
                accessibility: color.accessibility,
              };
              return acc;
            }, {} as Record<string, any>),
          },
        };
        
        return {
          content: JSON.stringify(figmaTokens, null, 2),
          filename: `${palette.industry.toLowerCase().replace(/\s+/g, '-')}-figma-tokens.json`,
          mimeType: 'application/json',
        };
      
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }

  /**
   * Check API health
   */
  async checkHealth(): Promise<{ status: string; timestamp: string; version: string }> {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/health`);
    return response.json();
  }
}

export const apiService = new ApiService();