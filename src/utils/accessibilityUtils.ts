export interface ContrastResult {
  ratio: number;
  aa: boolean;
  aaa: boolean;
  aaLarge: boolean;
  aaaLarge: boolean;
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return 0;
  
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

export function checkContrast(foreground: string, background: string): ContrastResult {
  const ratio = getContrastRatio(foreground, background);
  
  return {
    ratio: Math.round(ratio * 100) / 100,
    aa: ratio >= 4.5,
    aaa: ratio >= 7,
    aaLarge: ratio >= 3,
    aaaLarge: ratio >= 4.5,
  };
}

export function getContrastLevel(ratio: number): 'fail' | 'aa' | 'aaa' {
  if (ratio >= 7) return 'aaa';
  if (ratio >= 4.5) return 'aa';
  return 'fail';
}

export function suggestContrastFix(foreground: string, background: string): string[] {
  const suggestions: string[] = [];
  const ratio = getContrastRatio(foreground, background);
  
  if (ratio < 4.5) {
    suggestions.push('Consider darkening the text color or lightening the background');
    suggestions.push('Use a different color combination with higher contrast');
    suggestions.push('Add a semi-transparent overlay to improve readability');
  }
  
  return suggestions;
}

export function validateColorAccessibility(tokens: any[]): Array<{
  tokenId: string;
  tokenName: string;
  issues: string[];
  suggestions: string[];
}> {
  const colorTokens = tokens.filter(token => token.type === 'color');
  const results: Array<{
    tokenId: string;
    tokenName: string;
    issues: string[];
    suggestions: string[];
  }> = [];
  
  // Check each color token against common backgrounds
  const commonBackgrounds = ['#ffffff', '#000000', '#f8f9fa', '#212529'];
  
  colorTokens.forEach(token => {
    const issues: string[] = [];
    const suggestions: string[] = [];
    
    commonBackgrounds.forEach(bg => {
      const contrast = checkContrast(token.value, bg);
      if (!contrast.aa) {
        issues.push(`Low contrast (${contrast.ratio}:1) against ${bg === '#ffffff' ? 'white' : bg === '#000000' ? 'black' : 'gray'} background`);
      }
    });
    
    if (issues.length > 0) {
      suggestions.push(...suggestContrastFix(token.value, '#ffffff'));
      results.push({
        tokenId: token.id,
        tokenName: token.name,
        issues,
        suggestions,
      });
    }
  });
  
  return results;
}