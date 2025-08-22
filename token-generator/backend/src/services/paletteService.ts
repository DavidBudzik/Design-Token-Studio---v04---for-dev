import OpenAI from 'openai';
import {
  GenerateRequest,
  GenerateResponse,
  ColorPalette,
  Color,
  INDUSTRY_THEMES,
  IndustryTheme,
  oklchToHex,
  formatOKLCH,
  getContrastRatio,
  adjustForContrast,
  generateComplementaryColors
} from '@token-generator/shared';
import { logger } from '../utils/logger';
import { AppError } from '../middleware/errorHandler';

export class PaletteService {
  private openai: OpenAI | null = null;
  private useAI: boolean = false;

  constructor() {
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
      this.useAI = true;
      logger.info('OpenAI integration enabled');
    } else {
      logger.warn('OpenAI API key not found, using fallback color generation');
    }
  }

  async generatePalette(request: GenerateRequest): Promise<GenerateResponse> {
    try {
      // Find matching theme from description
      const detectedTheme = this.detectTheme(request.description);
      const selectedTheme = request.theme || detectedTheme || 'technology';
      const theme = INDUSTRY_THEMES[selectedTheme];

      let palette: ColorPalette;

      if (this.useAI && this.openai) {
        palette = await this.generateWithAI(request.description, theme);
      } else {
        palette = this.generateFallbackPalette(theme, request.description);
      }

      // Ensure accessibility
      if (request.enforceAccessibility) {
        palette = this.enforceAccessibility(palette, request.accessibilityLevel || 'AA');
      }

      // Calculate contrast ratios
      const accessibility = this.calculateAccessibility(palette);

      return {
        theme: selectedTheme,
        palette,
        accessibility,
        metadata: {
          generatedAt: new Date().toISOString(),
          model: this.useAI ? process.env.MODEL : 'fallback',
          description: request.description
        }
      };
    } catch (error) {
      logger.error('Palette generation failed', error);
      throw new AppError(500, 'Failed to generate palette');
    }
  }

  private detectTheme(description: string): string | null {
    const lowercaseDesc = description.toLowerCase();
    
    for (const [themeId, theme] of Object.entries(INDUSTRY_THEMES)) {
      for (const keyword of theme.keywords) {
        if (lowercaseDesc.includes(keyword)) {
          return themeId;
        }
      }
    }
    
    return null;
  }

  private async generateWithAI(description: string, theme: IndustryTheme): Promise<ColorPalette> {
    if (!this.openai) throw new Error('OpenAI not initialized');

    const systemPrompt = `You are a color palette generator that creates accessible, industry-specific color palettes.
    Output ONLY valid JSON matching this exact structure:
    {
      "primary": { "lightness": 0.65, "chroma": 0.12, "hue": 240 },
      "secondary": { "lightness": 0.7, "chroma": 0.1, "hue": 180 },
      "functional": { "lightness": 0.75, "chroma": 0.08, "hue": 60 },
      "text": { "lightness": 0.2, "chroma": 0.02, "hue": 240 },
      "gradient": { "lightness": 0.85, "chroma": 0.06, "hue": 220 }
    }
    
    Use OKLCH color space where:
    - lightness: 0-1 (0=black, 1=white)
    - chroma: 0-0.4 (0=gray, higher=more colorful)
    - hue: 0-360 degrees
    
    Base your palette on the ${theme.name} industry theme.`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: process.env.MODEL || 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate a color palette for: "${description}"` }
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' }
      });

      const aiResponse = JSON.parse(completion.choices[0]?.message?.content || '{}');
      
      // Convert AI response to ColorPalette
      const palette: ColorPalette = {} as ColorPalette;
      
      for (const [key, values] of Object.entries(aiResponse)) {
        if (typeof values === 'object' && values !== null) {
          const oklchValues = values as any;
          const hex = oklchToHex(oklchValues);
          const color: Color = {
            name: key.charAt(0).toUpperCase() + key.slice(1),
            hex,
            oklch: formatOKLCH(oklchValues),
            oklchValues
          };
          (palette as any)[key] = color;
        }
      }

      return palette;
    } catch (error) {
      logger.error('AI generation failed, using fallback', error);
      return this.generateFallbackPalette(theme, description);
    }
  }

  private generateFallbackPalette(theme: IndustryTheme, description: string): ColorPalette {
    // Start with theme's base primary color or default
    const basePrimary = theme.baseColors.primary?.oklchValues || {
      lightness: 0.65,
      chroma: 0.12,
      hue: 240
    };

    // Generate complementary colors
    const colors = generateComplementaryColors(basePrimary, theme.id);

    // Create Color objects
    const createColor = (name: string, oklch: any): Color => ({
      name,
      hex: oklchToHex(oklch),
      oklch: formatOKLCH(oklch),
      oklchValues: oklch
    });

    return {
      primary: createColor('Primary', basePrimary),
      secondary: createColor('Secondary', colors.secondary),
      functional: createColor('Functional', colors.functional),
      text: createColor('Text', colors.text),
      gradient: createColor('Gradient', colors.gradient)
    };
  }

  private enforceAccessibility(palette: ColorPalette, level: 'AA' | 'AAA'): ColorPalette {
    const backgroundColor = '#FFFFFF';
    const targetRatio = level === 'AA' ? 4.5 : 7;
    
    const adjustedPalette = { ...palette };

    // Adjust text color first as it's most critical
    const textRatio = getContrastRatio(palette.text.hex, backgroundColor);
    if (textRatio < targetRatio) {
      const adjustedOklch = adjustForContrast(palette.text.oklchValues, backgroundColor, targetRatio);
      adjustedPalette.text = {
        ...palette.text,
        oklchValues: adjustedOklch,
        hex: oklchToHex(adjustedOklch),
        oklch: formatOKLCH(adjustedOklch)
      };
    }

    // Check and adjust other colors for minimum readability
    const minRatio = level === 'AA' ? 3 : 4.5; // For larger text
    
    for (const key of ['primary', 'secondary', 'functional'] as const) {
      const ratio = getContrastRatio(palette[key].hex, backgroundColor);
      if (ratio < minRatio) {
        const adjustedOklch = adjustForContrast(palette[key].oklchValues, backgroundColor, minRatio);
        adjustedPalette[key] = {
          ...palette[key],
          oklchValues: adjustedOklch,
          hex: oklchToHex(adjustedOklch),
          oklch: formatOKLCH(adjustedOklch)
        };
      }
    }

    return adjustedPalette;
  }

  private calculateAccessibility(palette: ColorPalette): any {
    const backgroundColor = '#FFFFFF';
    
    const primaryRatio = getContrastRatio(palette.primary.hex, backgroundColor);
    const secondaryRatio = getContrastRatio(palette.secondary.hex, backgroundColor);
    const textRatio = getContrastRatio(palette.text.hex, backgroundColor);

    const meetsAA = textRatio >= 4.5 && primaryRatio >= 3 && secondaryRatio >= 3;
    const meetsAAA = textRatio >= 7 && primaryRatio >= 4.5 && secondaryRatio >= 4.5;

    return {
      wcagCompliance: meetsAAA ? 'AAA' : meetsAA ? 'AA' : 'AA',
      contrastRatios: {
        primaryToBackground: Math.round(primaryRatio * 10) / 10,
        secondaryToBackground: Math.round(secondaryRatio * 10) / 10,
        textToBackground: Math.round(textRatio * 10) / 10
      }
    };
  }

  async exportPalette(palette: ColorPalette, format: string): Promise<string> {
    switch (format) {
      case 'css':
        return this.exportAsCSS(palette);
      case 'tailwind':
        return this.exportAsTailwind(palette);
      case 'figma':
        return this.exportAsFigma(palette);
      default:
        return JSON.stringify(palette, null, 2);
    }
  }

  private exportAsCSS(palette: ColorPalette): string {
    let css = ':root {\n';
    
    for (const [key, color] of Object.entries(palette)) {
      css += `  --color-${key.toLowerCase()}: ${color.hex};\n`;
      css += `  --color-${key.toLowerCase()}-oklch: ${color.oklch};\n`;
    }
    
    css += '}\n\n';
    css += '/* Usage: color: var(--color-primary); */\n';
    css += '/* Modern browsers: color: var(--color-primary-oklch); */';
    
    return css;
  }

  private exportAsTailwind(palette: ColorPalette): string {
    const config = {
      theme: {
        extend: {
          colors: Object.entries(palette).reduce((acc, [key, color]) => ({
            ...acc,
            [key.toLowerCase()]: {
              DEFAULT: color.hex,
              oklch: color.oklch
            }
          }), {})
        }
      }
    };
    
    return `// Add to tailwind.config.js\n${JSON.stringify(config, null, 2)}`;
  }

  private exportAsFigma(palette: ColorPalette): string {
    const tokens = {
      colors: Object.entries(palette).reduce((acc, [key, color]) => ({
        ...acc,
        [key.toLowerCase()]: {
          value: color.hex,
          type: 'color',
          description: `${color.name} color - ${color.oklch}`,
          extensions: {
            'com.figma': {
              styleId: `S:${key.toLowerCase()}`,
            }
          }
        }
      }), {})
    };
    
    return JSON.stringify(tokens, null, 2);
  }
}