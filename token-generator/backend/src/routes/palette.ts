import { Router } from 'express';
import { z } from 'zod';
import { GenerateRequest, INDUSTRY_THEMES } from '@token-generator/shared';
import { PaletteService } from '../services/paletteService';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

const router = Router();
const paletteService = new PaletteService();

// Validation schemas
const generateSchema = z.object({
  description: z.string().min(1).max(500),
  theme: z.string().optional(),
  enforceAccessibility: z.boolean().optional().default(true),
  accessibilityLevel: z.enum(['AA', 'AAA']).optional().default('AA')
});

// Generate palette endpoint
router.post('/generate', async (req, res, next) => {
  try {
    const validatedData = generateSchema.parse(req.body);
    
    logger.info('Generating palette', { 
      description: validatedData.description.substring(0, 50) + '...',
      theme: validatedData.theme 
    });

    const result = await paletteService.generatePalette(validatedData);
    
    res.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError(400, 'Invalid request data'));
    }
    next(error);
  }
});

// Get available themes
router.get('/themes', (req, res) => {
  const themes = Object.values(INDUSTRY_THEMES).map(theme => ({
    id: theme.id,
    name: theme.name,
    description: theme.description,
    keywords: theme.keywords
  }));
  
  res.json({ themes });
});

// Export palette in different formats
router.post('/export', async (req, res, next) => {
  try {
    const { palette, format } = req.body;
    
    if (!palette || !format) {
      return next(new AppError(400, 'Palette and format are required'));
    }

    const exported = await paletteService.exportPalette(palette, format);
    
    res.json({ 
      format,
      content: exported,
      filename: `palette-${Date.now()}.${format === 'css' ? 'css' : 'json'}`
    });
  } catch (error) {
    next(error);
  }
});

export default router;