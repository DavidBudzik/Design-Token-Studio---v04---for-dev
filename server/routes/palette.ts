import { Router, Request, Response } from 'express';
import { AIService, PaletteRequest } from '../services/aiService.js';
import { detectIndustryFromText } from '../utils/colorUtils.js';
import { IndustryType } from '../types/theme.js';

const router = Router();
const aiService = new AIService();

// Generate palette from natural language description
router.post('/generate', async (req: Request, res: Response) => {
  try {
    const { description, industryTheme, accessibility, colorCount } = req.body;

    if (!description || typeof description !== 'string') {
      return res.status(400).json({
        error: {
          message: 'Description is required and must be a string',
          code: 'INVALID_DESCRIPTION',
        },
      });
    }

    // Auto-detect industry if not provided
    let detectedIndustry: IndustryType = industryTheme;
    if (!detectedIndustry) {
      const detected = detectIndustryFromText(description);
      detectedIndustry = (detected as IndustryType) || 'Technology';
    }

    const request: PaletteRequest = {
      description: description.trim(),
      industryTheme: detectedIndustry,
      accessibility: accessibility || 'AA',
      colorCount: colorCount || 5,
    };

    console.log('Generating palette:', request);

    const palette = await aiService.generatePalette(request);

    res.json({
      success: true,
      data: palette,
      detectedIndustry: detectedIndustry !== industryTheme ? detectedIndustry : null,
    });

  } catch (error) {
    console.error('Palette generation error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to generate palette',
        code: 'GENERATION_FAILED',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
    });
  }
});

// Validate accessibility of existing colors
router.post('/validate-accessibility', async (req: Request, res: Response) => {
  try {
    const { colors, background = '#ffffff', standard = 'AA' } = req.body;

    if (!Array.isArray(colors)) {
      return res.status(400).json({
        error: {
          message: 'Colors must be an array',
          code: 'INVALID_COLORS',
        },
      });
    }

    const { checkAccessibility } = await import('../utils/colorUtils.js');
    
    const results = colors.map((color: string) => ({
      color,
      accessibility: checkAccessibility(color, background),
      compliant: standard === 'AAA' 
        ? checkAccessibility(color, background).wcagAAA
        : checkAccessibility(color, background).wcagAA,
    }));

    const overallCompliant = results.every(r => r.compliant);
    const averageContrast = results.reduce((sum, r) => sum + r.accessibility.contrastRatio, 0) / results.length;

    res.json({
      success: true,
      data: {
        results,
        summary: {
          overallCompliant,
          averageContrast: Math.round(averageContrast * 100) / 100,
          standard,
        },
      },
    });

  } catch (error) {
    console.error('Accessibility validation error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to validate accessibility',
        code: 'VALIDATION_FAILED',
      },
    });
  }
});

// Generate interactive states for a color
router.post('/generate-states', async (req: Request, res: Response) => {
  try {
    const { baseColor } = req.body;

    if (!baseColor || typeof baseColor !== 'string') {
      return res.status(400).json({
        error: {
          message: 'Base color is required',
          code: 'INVALID_COLOR',
        },
      });
    }

    const { generateInteractiveStates } = await import('../utils/colorUtils.js');
    const states = generateInteractiveStates(baseColor);

    res.json({
      success: true,
      data: {
        baseColor,
        states,
      },
    });

  } catch (error) {
    console.error('State generation error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to generate interactive states',
        code: 'STATE_GENERATION_FAILED',
      },
    });
  }
});

// Convert between color formats
router.post('/convert', async (req: Request, res: Response) => {
  try {
    const { color, from, to } = req.body;

    if (!color || !from || !to) {
      return res.status(400).json({
        error: {
          message: 'Color, from, and to formats are required',
          code: 'INVALID_CONVERSION_REQUEST',
        },
      });
    }

    const { convertHexToOklch, convertOklchToHex } = await import('../utils/colorUtils.js');
    
    let result: string | null = null;

    if (from === 'hex' && to === 'oklch') {
      result = convertHexToOklch(color);
    } else if (from === 'oklch' && to === 'hex') {
      result = convertOklchToHex(color);
    }

    if (!result) {
      return res.status(400).json({
        error: {
          message: 'Invalid color format or conversion not supported',
          code: 'CONVERSION_FAILED',
        },
      });
    }

    res.json({
      success: true,
      data: {
        original: color,
        converted: result,
        from,
        to,
      },
    });

  } catch (error) {
    console.error('Color conversion error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to convert color',
        code: 'CONVERSION_ERROR',
      },
    });
  }
});

export { router as paletteRouter };