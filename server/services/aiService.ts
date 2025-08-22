import OpenAI from 'openai';
import { convertHexToOklch, validateOklchColor } from '../utils/colorUtils.js';
import { IndustryType } from '../types/theme.js';

let openai: OpenAI | null = null;

// Only initialize OpenAI if API key is provided
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export interface PaletteRequest {
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

const SYSTEM_PROMPT = `You are an expert color designer specializing in accessible, industry-specific color palettes. Generate color palettes that:

1. Use OKLCH color space for perceptual uniformity
2. Meet WCAG AA/AAA accessibility standards
3. Align with industry-specific design conventions
4. Include proper interactive states (hover, active, focus, disabled)
5. Follow the M-Design System categories: Primary, Secondary, Functional, Text, Gradient

Industry Characteristics:
- Technology: Modern blues, teals, clean grays
- Healthcare: Calming greens, blues, medical whites
- Finance: Professional blues, grays, trust-building colors
- Education: Inspiring purples, oranges, engaging colors
- Retail: Vibrant reds, yellows, conversion-focused
- Hospitality: Warm oranges, browns, welcoming tones
- Entertainment: Bold reds, purples, exciting colors
- Automotive: Sleek blacks, grays, performance reds
- Non-Profit: Trustworthy greens, blues, community colors
- Food & Beverage: Appetizing reds, yellows, natural greens
- Fashion: Trendy pinks, sophisticated grays, seasonal colors
- Real Estate: Stable greens, grays, luxury accents

Always ensure:
- Minimum 4.5:1 contrast ratio for AA compliance
- 7:1 for AAA when specified
- Proper color relationships and harmony
- Meaningful color names and usage descriptions`;

export class AIService {
  private model: string;
  private fallbackModel: string;
  private timeout: number;

  constructor() {
    this.model = process.env.MODEL || 'gpt-4o';
    this.fallbackModel = process.env.FALLBACK_MODEL || 'gpt-3.5-turbo';
    this.timeout = parseInt(process.env.TIMEOUT_MS || '45000');
  }

  async generatePalette(request: PaletteRequest): Promise<GeneratedPalette> {
    const { description, industryTheme = 'Technology', accessibility = 'AA', colorCount = 5 } = request;

    // Check if OpenAI is available
    if (!openai) {
      throw new Error('OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.');
    }

    const prompt = `Generate a ${colorCount}-color palette for: "${description}"
    
Industry: ${industryTheme}
Accessibility: WCAG ${accessibility}
Color Categories: Primary (1), Secondary (1), Functional (1), Text (1), Gradient (1)

Return a JSON object with the exact structure specified in the schema.`;

    try {
      const completion = await openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt }
        ],
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'color_palette',
            strict: true,
            schema: {
              type: 'object',
              properties: {
                theme: { type: 'string' },
                description: { type: 'string' },
                industry: { 
                  type: 'string',
                  enum: ['Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 'Hospitality', 'Entertainment', 'Automotive', 'Non-Profit', 'Food & Beverage', 'Fashion', 'Real Estate']
                },
                colors: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      name: { type: 'string' },
                      category: { 
                        type: 'string',
                        enum: ['Primary', 'Secondary', 'Functional', 'Text', 'Gradient']
                      },
                      hex: { type: 'string' },
                      oklch: { type: 'string' },
                      usage: { type: 'string' },
                      interactive_states: {
                        type: 'object',
                        properties: {
                          default: { type: 'string' },
                          hover: { type: 'string' },
                          active: { type: 'string' },
                          focus: { type: 'string' },
                          disabled: { type: 'string' }
                        },
                        required: ['default', 'hover', 'active', 'focus', 'disabled'],
                        additionalProperties: false
                      },
                      accessibility: {
                        type: 'object',
                        properties: {
                          contrastRatio: { type: 'number' },
                          wcagAA: { type: 'boolean' },
                          wcagAAA: { type: 'boolean' }
                        },
                        required: ['contrastRatio', 'wcagAA', 'wcagAAA'],
                        additionalProperties: false
                      }
                    },
                    required: ['name', 'category', 'hex', 'oklch', 'usage', 'interactive_states', 'accessibility'],
                    additionalProperties: false
                  }
                }
              },
              required: ['theme', 'description', 'industry', 'colors'],
              additionalProperties: false
            }
          }
        },
        temperature: 0.7,
        max_tokens: 2000,
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from AI model');
      }

      const palette = JSON.parse(content) as Omit<GeneratedPalette, 'metadata'>;
      
      // Validate and enhance the palette
      const enhancedPalette = await this.enhancePalette(palette);
      
      return {
        ...enhancedPalette,
        metadata: {
          generatedAt: new Date().toISOString(),
          model: this.model,
          accessibility: this.calculateAccessibilityMetrics(enhancedPalette.colors),
        },
      };

    } catch (error) {
      console.error('AI palette generation failed:', error);
      
      // Try fallback model
      if (this.model !== this.fallbackModel) {
        console.log('Trying fallback model...');
        const fallbackService = new AIService();
        fallbackService.model = this.fallbackModel;
        return fallbackService.generatePalette(request);
      }
      
      throw error;
    }
  }

  private async enhancePalette(palette: Omit<GeneratedPalette, 'metadata'>): Promise<Omit<GeneratedPalette, 'metadata'>> {
    // Validate and convert OKLCH values
    const enhancedColors = palette.colors.map(color => {
      const oklch = convertHexToOklch(color.hex);
      return {
        ...color,
        oklch: oklch || color.oklch, // Use generated OKLCH or fallback to AI-provided
      };
    });

    return {
      ...palette,
      colors: enhancedColors,
    };
  }

  private calculateAccessibilityMetrics(colors: GeneratedColor[]) {
    const aaCompliant = colors.filter(c => c.accessibility.wcagAA).length;
    const aaaCompliant = colors.filter(c => c.accessibility.wcagAAA).length;
    const totalColors = colors.length;
    
    const averageContrast = colors.reduce((sum, c) => sum + c.accessibility.contrastRatio, 0) / totalColors;
    
    let overallCompliance: 'AA' | 'AAA' | 'partial';
    if (aaaCompliant === totalColors) {
      overallCompliance = 'AAA';
    } else if (aaCompliant === totalColors) {
      overallCompliance = 'AA';
    } else {
      overallCompliance = 'partial';
    }

    return {
      overallCompliance,
      averageContrast: Math.round(averageContrast * 100) / 100,
    };
  }
}