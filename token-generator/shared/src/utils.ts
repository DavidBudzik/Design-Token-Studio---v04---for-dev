import { OKLCHColor, Color } from './types';

// Convert OKLCH to hex
export function oklchToHex(oklch: OKLCHColor): string {
  // This is a simplified conversion - in production you'd use a proper color library
  const { lightness, chroma, hue } = oklch;
  
  // Convert to RGB (simplified)
  const a = chroma * Math.cos(hue * Math.PI / 180);
  const b = chroma * Math.sin(hue * Math.PI / 180);
  
  // Approximate conversion to sRGB
  const l = lightness;
  const r = l + 0.3963377774 * a + 0.2158037573 * b;
  const g = l - 0.1055613458 * a - 0.0638541728 * b;
  const b_srgb = l - 0.0894841775 * a - 1.2914855480 * b;
  
  // Convert to 0-255 range
  const toHex = (n: number) => {
    const val = Math.round(Math.max(0, Math.min(1, n)) * 255);
    return val.toString(16).padStart(2, '0');
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b_srgb)}`;
}

// Convert hex to OKLCH
export function hexToOKLCH(hex: string): OKLCHColor {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  // Simplified conversion to OKLCH
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
  
  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);
  
  const lightness = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
  const b_val = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;
  
  const chroma = Math.sqrt(a * a + b_val * b_val);
  const hue = Math.atan2(b_val, a) * 180 / Math.PI;
  
  return {
    lightness: Math.max(0, Math.min(1, lightness)),
    chroma: Math.max(0, Math.min(0.4, chroma)),
    hue: hue < 0 ? hue + 360 : hue
  };
}

// Calculate contrast ratio between two colors
export function getContrastRatio(color1: string, color2: string): number {
  const getLuminance = (hex: string): number => {
    const rgb = hex.match(/[A-Za-z0-9]{2}/g)?.map(v => parseInt(v, 16) / 255) || [0, 0, 0];
    const [r, g, b] = rgb.map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  
  const l1 = getLuminance(color1.replace('#', ''));
  const l2 = getLuminance(color2.replace('#', ''));
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

// Check if contrast meets WCAG requirements
export function meetsWCAG(contrastRatio: number, level: 'AA' | 'AAA', isLargeText: boolean = false): boolean {
  if (level === 'AA') {
    return isLargeText ? contrastRatio >= 3 : contrastRatio >= 4.5;
  } else {
    return isLargeText ? contrastRatio >= 4.5 : contrastRatio >= 7;
  }
}

// Format OKLCH values to CSS string
export function formatOKLCH(oklch: OKLCHColor): string {
  return `oklch(${oklch.lightness.toFixed(2)} ${oklch.chroma.toFixed(2)} ${oklch.hue.toFixed(0)})`;
}

// Adjust color lightness to meet contrast requirements
export function adjustForContrast(
  color: OKLCHColor,
  backgroundColor: string,
  targetRatio: number = 4.5
): OKLCHColor {
  let adjusted = { ...color };
  let currentHex = oklchToHex(adjusted);
  let currentRatio = getContrastRatio(currentHex, backgroundColor);
  
  // Binary search for the right lightness
  let minL = 0;
  let maxL = 1;
  let iterations = 0;
  
  while (Math.abs(currentRatio - targetRatio) > 0.1 && iterations < 20) {
    if (currentRatio < targetRatio) {
      // Need more contrast
      if (adjusted.lightness > 0.5) {
        // Make lighter
        minL = adjusted.lightness;
        adjusted.lightness = (adjusted.lightness + maxL) / 2;
      } else {
        // Make darker
        maxL = adjusted.lightness;
        adjusted.lightness = (minL + adjusted.lightness) / 2;
      }
    } else {
      // Too much contrast, move back
      if (adjusted.lightness > 0.5) {
        maxL = adjusted.lightness;
        adjusted.lightness = (minL + adjusted.lightness) / 2;
      } else {
        minL = adjusted.lightness;
        adjusted.lightness = (adjusted.lightness + maxL) / 2;
      }
    }
    
    currentHex = oklchToHex(adjusted);
    currentRatio = getContrastRatio(currentHex, backgroundColor);
    iterations++;
  }
  
  return adjusted;
}

// Generate complementary colors based on primary
export function generateComplementaryColors(primary: OKLCHColor, theme: string): {
  secondary: OKLCHColor;
  functional: OKLCHColor;
  text: OKLCHColor;
  gradient: OKLCHColor;
} {
  // Generate colors based on color theory and theme
  const secondary: OKLCHColor = {
    lightness: primary.lightness * 0.9,
    chroma: primary.chroma * 0.8,
    hue: (primary.hue + 120) % 360 // Triadic
  };
  
  const functional: OKLCHColor = {
    lightness: 0.7,
    chroma: 0.12,
    hue: (primary.hue + 60) % 360 // Split complementary
  };
  
  const text: OKLCHColor = {
    lightness: 0.2,
    chroma: 0.02,
    hue: primary.hue
  };
  
  const gradient: OKLCHColor = {
    lightness: Math.min(0.9, primary.lightness + 0.2),
    chroma: primary.chroma * 0.5,
    hue: primary.hue
  };
  
  return { secondary, functional, text, gradient };
}