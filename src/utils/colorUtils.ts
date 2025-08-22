export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export function hexToRgb(hex: string): RGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function rgbToHsl(r: number, g: number, b: number): HSL {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

export function hslToRgb(h: number, s: number, l: number): RGB {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

export function generateTints(hex: string, count: number = 10): string[] {
  const rgb = hexToRgb(hex);
  if (!rgb) return [hex];

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const tints: string[] = [];

  for (let i = 0; i < count; i++) {
    const lightness = 95 - (i * (95 - hsl.l) / (count - 1));
    const tintRgb = hslToRgb(hsl.h, hsl.s, lightness);
    tints.push(rgbToHex(tintRgb.r, tintRgb.g, tintRgb.b));
  }

  return tints;
}

export function generateShades(hex: string, count: number = 10): string[] {
  const rgb = hexToRgb(hex);
  if (!rgb) return [hex];

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const shades: string[] = [];

  for (let i = 0; i < count; i++) {
    const lightness = hsl.l - (i * hsl.l / (count - 1));
    const shadeRgb = hslToRgb(hsl.h, hsl.s, lightness);
    shades.push(rgbToHex(shadeRgb.r, shadeRgb.g, shadeRgb.b));
  }

  return shades;
}

// WCAG contrast ratio calculation
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return 1;

  const luminance = (rgb: RGB) => {
    const { r, g, b } = rgb;
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = luminance(rgb1);
  const l2 = luminance(rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

export function isContrastAccessible(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal'
): boolean {
  const ratio = getContrastRatio(foreground, background);
  
  if (level === 'AA') {
    return size === 'large' ? ratio >= 3 : ratio >= 4.5;
  } else {
    return size === 'large' ? ratio >= 4.5 : ratio >= 7;
  }
}

export function suggestAccessibleColor(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA'
): string {
  if (isContrastAccessible(foreground, background, level)) {
    return foreground;
  }

  const fgRgb = hexToRgb(foreground);
  const bgRgb = hexToRgb(background);
  
  if (!fgRgb || !bgRgb) return foreground;

  const fgHsl = rgbToHsl(fgRgb.r, fgRgb.g, fgRgb.b);
  const bgHsl = rgbToHsl(bgRgb.r, bgRgb.g, bgRgb.b);

  // Determine if we should go lighter or darker
  const shouldDarken = bgHsl.l > 50;
  
  let newLightness = fgHsl.l;
  const step = shouldDarken ? -5 : 5;
  
  // Adjust lightness until we meet contrast requirements
  while (newLightness >= 0 && newLightness <= 100) {
    const newRgb = hslToRgb(fgHsl.h, fgHsl.s, newLightness);
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    
    if (isContrastAccessible(newHex, background, level)) {
      return newHex;
    }
    
    newLightness += step;
  }

  // If we can't find an accessible color, return black or white
  return shouldDarken ? '#000000' : '#ffffff';
}