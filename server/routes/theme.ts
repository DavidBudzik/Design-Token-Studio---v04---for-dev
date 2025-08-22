import { Router, Request, Response } from 'express';
import { IndustryType, IndustryTheme } from '../types/theme.js';
import { industryThemes } from '../data/industryThemes.js';

const router = Router();

// Get all industry themes
router.get('/industries', (req: Request, res: Response) => {
  try {
    const themes = Object.values(industryThemes).map(theme => ({
      id: theme.id,
      name: theme.name,
      industry: theme.industry,
      description: theme.description,
      emotionTags: theme.emotionTags,
      preview: {
        primary: theme.colorRoles.primary.hex,
        secondary: theme.colorRoles.secondary.hex,
        accent: theme.colorRoles.accent.hex,
      },
      accessibility: theme.accessibility,
    }));

    res.json({
      success: true,
      data: themes,
    });
  } catch (error) {
    console.error('Error fetching industry themes:', error);
    res.status(500).json({
      error: {
        message: 'Failed to fetch industry themes',
        code: 'FETCH_THEMES_FAILED',
      },
    });
  }
});

// Get specific industry theme
router.get('/industries/:industry', (req: Request, res: Response) => {
  try {
    const { industry } = req.params;
    const theme = industryThemes[industry as IndustryType];

    if (!theme) {
      return res.status(404).json({
        error: {
          message: 'Industry theme not found',
          code: 'THEME_NOT_FOUND',
        },
      });
    }

    res.json({
      success: true,
      data: theme,
    });
  } catch (error) {
    console.error('Error fetching industry theme:', error);
    res.status(500).json({
      error: {
        message: 'Failed to fetch industry theme',
        code: 'FETCH_THEME_FAILED',
      },
    });
  }
});

// Get themes by emotion tags
router.get('/emotions/:emotion', (req: Request, res: Response) => {
  try {
    const { emotion } = req.params;
    
    const matchingThemes = Object.values(industryThemes).filter(theme =>
      theme.emotionTags.some(tag => 
        tag.toLowerCase() === emotion.toLowerCase()
      )
    );

    res.json({
      success: true,
      data: matchingThemes.map(theme => ({
        id: theme.id,
        name: theme.name,
        industry: theme.industry,
        description: theme.description,
        emotionTags: theme.emotionTags,
        preview: {
          primary: theme.colorRoles.primary.hex,
          secondary: theme.colorRoles.secondary.hex,
          accent: theme.colorRoles.accent.hex,
        },
      })),
    });
  } catch (error) {
    console.error('Error fetching themes by emotion:', error);
    res.status(500).json({
      error: {
        message: 'Failed to fetch themes by emotion',
        code: 'FETCH_EMOTION_THEMES_FAILED',
      },
    });
  }
});

// Search themes by keywords
router.get('/search', (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    
    if (!q || typeof q !== 'string') {
      return res.status(400).json({
        error: {
          message: 'Search query is required',
          code: 'INVALID_SEARCH_QUERY',
        },
      });
    }

    const query = q.toLowerCase();
    const matchingThemes = Object.values(industryThemes).filter(theme =>
      theme.name.toLowerCase().includes(query) ||
      theme.description.toLowerCase().includes(query) ||
      theme.industry.toLowerCase().includes(query) ||
      theme.emotionTags.some(tag => tag.toLowerCase().includes(query))
    );

    res.json({
      success: true,
      data: matchingThemes.map(theme => ({
        id: theme.id,
        name: theme.name,
        industry: theme.industry,
        description: theme.description,
        emotionTags: theme.emotionTags,
        preview: {
          primary: theme.colorRoles.primary.hex,
          secondary: theme.colorRoles.secondary.hex,
          accent: theme.colorRoles.accent.hex,
        },
        relevanceScore: calculateRelevance(theme, query),
      })).sort((a, b) => b.relevanceScore - a.relevanceScore),
    });
  } catch (error) {
    console.error('Error searching themes:', error);
    res.status(500).json({
      error: {
        message: 'Failed to search themes',
        code: 'SEARCH_FAILED',
      },
    });
  }
});

// Helper function to calculate search relevance
function calculateRelevance(theme: IndustryTheme, query: string): number {
  let score = 0;
  
  if (theme.name.toLowerCase().includes(query)) score += 10;
  if (theme.industry.toLowerCase().includes(query)) score += 8;
  if (theme.description.toLowerCase().includes(query)) score += 5;
  
  theme.emotionTags.forEach(tag => {
    if (tag.toLowerCase().includes(query)) score += 3;
  });
  
  return score;
}

export { router as themeRouter };