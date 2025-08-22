import { oklch, formatHex, wcagContrast, displayable } from 'culori';
import chroma from 'chroma-js';

export interface OklchColor {
  l: number; // lightness (0-1)
  c: number; // chroma (0-0.4)
  h: number; // hue (0-360)
  alpha?: number;
}

export interface AccessibilityResult {
  contrastRatio: number;
  wcagAA: boolean;
  wcagAAA: boolean;
  largeTextAA: boolean;
  largeTextAAA: boolean;
}

/**
 * Convert hex color to OKLCH string format
 */
export function convertHexToOklch(hex: string): string | null {
  try {
    const color = oklch(hex);
    if (!color || !displayable(color)) {
      return null;
    }
    
    const l = Math.round(color.l * 1000) / 1000;
    const c = Math.round(color.c * 1000) / 1000;
    const h = color.h ? Math.round(color.h * 10) / 10 : 0;
    
    return `oklch(${l} ${c} ${h})`;
  } catch (error) {
    console.error('Error converting hex to OKLCH:', error);
    return null;
  }
}

/**
 * Convert OKLCH to hex color
 */
export function convertOklchToHex(oklchString: string): string | null {
  try {
    // Parse OKLCH string like "oklch(0.65 0.12 240)"
    const match = oklchString.match(/oklch\(([^)]+)\)/);
    if (!match) return null;
    
    const [l, c, h] = match[1].split(/\s+/).map(Number);
    const color = { mode: 'oklch', l, c, h };
    
    return formatHex(color);
  } catch (error) {
    console.error('Error converting OKLCH to hex:', error);
    return null;
  }
}

/**
 * Validate OKLCH color values
 */
export function validateOklchColor(oklchString: string): boolean {
  try {
    const match = oklchString.match(/oklch\(([^)]+)\)/);
    if (!match) return false;
    
    const [l, c, h] = match[1].split(/\s+/).map(Number);
    
    return (
      l >= 0 && l <= 1 &&
      c >= 0 && c <= 0.4 &&
      h >= 0 && h <= 360
    );
  } catch {
    return false;
  }
}

/**
 * Calculate contrast ratio and accessibility compliance
 */
export function checkAccessibility(foreground: string, background: string = '#ffffff'): AccessibilityResult {
  try {
    const contrastRatio = wcagContrast(foreground, background);
    
    return {
      contrastRatio: Math.round(contrastRatio * 100) / 100,
      wcagAA: contrastRatio >= 4.5,
      wcagAAA: contrastRatio >= 7,
      largeTextAA: contrastRatio >= 3,
      largeTextAAA: contrastRatio >= 4.5,
    };
  } catch (error) {
    console.error('Error checking accessibility:', error);
    return {
      contrastRatio: 1,
      wcagAA: false,
      wcagAAA: false,
      largeTextAA: false,
      largeTextAAA: false,
    };
  }
}

/**
 * Generate interactive states for a base color
 */
export function generateInteractiveStates(baseHex: string): Record<string, string> {
  try {
    const base = chroma(baseHex);
    
    return {
      default: baseHex,
      hover: base.brighten(0.2).hex(),
      active: base.darken(0.2).hex(),
      focus: base.brighten(0.1).hex(),
      disabled: base.desaturate(0.5).alpha(0.6).css(),
    };
  } catch (error) {
    console.error('Error generating interactive states:', error);
    return {
      default: baseHex,
      hover: baseHex,
      active: baseHex,
      focus: baseHex,
      disabled: baseHex,
    };
  }
}

/**
 * Generate tints and shades for a base color
 */
export function generateColorScale(baseHex: string, steps: number = 10): string[] {
  try {
    const base = chroma(baseHex);
    const scale: string[] = [];
    
    for (let i = 0; i < steps; i++) {
      const factor = i / (steps - 1);
      if (factor < 0.5) {
        // Lighter tints
        const lightness = 0.95 - (factor * 0.4);
        scale.push(base.luminance(lightness).hex());
      } else {
        // Darker shades
        const lightness = 0.55 - ((factor - 0.5) * 0.5);
        scale.push(base.luminance(lightness).hex());
      }
    }
    
    return scale;
  } catch (error) {
    console.error('Error generating color scale:', error);
    return [baseHex];
  }
}

/**
 * Adjust color to meet accessibility requirements
 */
export function adjustForAccessibility(
  color: string, 
  background: string = '#ffffff', 
  targetRatio: number = 4.5
): string {
  try {
    let adjustedColor = chroma(color);
    let currentRatio = wcagContrast(adjustedColor.hex(), background);
    
    // If already compliant, return as-is
    if (currentRatio >= targetRatio) {
      return adjustedColor.hex();
    }
    
    // Try darkening first
    let attempts = 0;
    while (currentRatio < targetRatio && attempts < 50) {
      adjustedColor = adjustedColor.darken(0.1);
      currentRatio = wcagContrast(adjustedColor.hex(), background);
      attempts++;
    }
    
    // If darkening didn't work, try lightening
    if (currentRatio < targetRatio) {
      adjustedColor = chroma(color);
      attempts = 0;
      while (currentRatio < targetRatio && attempts < 50) {
        adjustedColor = adjustedColor.brighten(0.1);
        currentRatio = wcagContrast(adjustedColor.hex(), background);
        attempts++;
      }
    }
    
    return adjustedColor.hex();
  } catch (error) {
    console.error('Error adjusting color for accessibility:', error);
    return color;
  }
}

/**
 * Detect industry theme from natural language input
 */
export function detectIndustryFromText(text: string): string | null {
  const industryKeywords = {
    'Technology': ['tech', 'technology', 'startup', 'digital', 'modern', 'software', 'app'],
    'Healthcare': ['health', 'healthcare', 'medical', 'hospital', 'wellness', 'doctor', 'medicine'],
    'Finance': ['finance', 'financial', 'banking', 'investment', 'money', 'wealth', 'trading'],
    'Education': ['education', 'school', 'university', 'learning', 'academic', 'student', 'teaching'],
    'Retail': ['retail', 'shop', 'store', 'commerce', 'shopping', 'ecommerce', 'sales'],
    'Hospitality': ['hospitality', 'hotel', 'travel', 'tourism', 'resort', 'restaurant', 'vacation'],
    'Entertainment': ['entertainment', 'media', 'film', 'music', 'show', 'gaming', 'fun'],
    'Automotive': ['automotive', 'car', 'vehicle', 'auto', 'drive', 'transport', 'motor'],
    'Non-Profit': ['nonprofit', 'non-profit', 'charity', 'community', 'social', 'volunteer'],
    'Food & Beverage': ['food', 'beverage', 'restaurant', 'culinary', 'cafe', 'drink', 'cooking'],
    'Fashion': ['fashion', 'style', 'apparel', 'clothing', 'trend', 'design', 'beauty'],
    'Real Estate': ['real estate', 'property', 'home', 'realty', 'housing', 'apartment', 'building']
  };

  const lowercaseText = text.toLowerCase();
  
  for (const [industry, keywords] of Object.entries(industryKeywords)) {
    for (const keyword of keywords) {
      if (lowercaseText.includes(keyword)) {
        return industry;
      }
    }
  }
  
  return null;
}