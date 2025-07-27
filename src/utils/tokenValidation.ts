import { TokenCategory, TokenType, Token } from '@/types/token';

export function generateTokenName(category: TokenCategory, type: TokenType, value: string): string {
  const sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, '');
  return `${category}/${type}/${sanitizedValue || 'Default'}`;
}

export function validateTokenName(name: string): { isValid: boolean; error?: string } {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: 'Token name is required' };
  }

  if (name.length > 100) {
    return { isValid: false, error: 'Token name must be less than 100 characters' };
  }

  if (!/^[a-zA-Z0-9/_-]+$/.test(name)) {
    return { isValid: false, error: 'Token name can only contain letters, numbers, slashes, hyphens, and underscores' };
  }

  return { isValid: true };
}

export function validateColorToken(value: string): { isValid: boolean; error?: string } {
  // Hex color validation
  if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)) {
    return { isValid: true };
  }

  // RGB/RGBA validation
  if (/^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+)?\s*\)$/i.test(value)) {
    return { isValid: true };
  }

  // HSL/HSLA validation
  if (/^hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*(,\s*[\d.]+)?\s*\)$/i.test(value)) {
    return { isValid: true };
  }

  // Named colors (basic validation)
  const namedColors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'black', 'white', 'gray', 'grey'];
  if (namedColors.includes(value.toLowerCase())) {
    return { isValid: true };
  }

  return { isValid: false, error: 'Invalid color format. Use hex (#000000), rgb(), hsl(), or named colors.' };
}

export function validateSpacingToken(value: string): { isValid: boolean; error?: string } {
  if (/^\d+(\.\d+)?(px|rem|em|%)$/.test(value)) {
    return { isValid: true };
  }

  return { isValid: false, error: 'Invalid spacing format. Use px, rem, em, or % units (e.g., 16px, 1rem).' };
}

export function validateTypographyToken(value: string): { isValid: boolean; error?: string } {
  if (/^\d+(\.\d+)?(px|rem|em)$/.test(value)) {
    return { isValid: true };
  }

  return { isValid: false, error: 'Invalid typography format. Use px, rem, or em units (e.g., 16px, 1.2rem).' };
}

export function validateBorderRadiusToken(value: string): { isValid: boolean; error?: string } {
  if (/^\d+(\.\d+)?(px|rem|em|%)$/.test(value)) {
    return { isValid: true };
  }

  return { isValid: false, error: 'Invalid border radius format. Use px, rem, em, or % units (e.g., 4px, 0.5rem).' };
}

export function validateShadowToken(value: string): { isValid: boolean; error?: string } {
  // Basic shadow validation (simplified)
  if (/^(\d+(\.\d+)?px\s+){2,4}(#[A-Fa-f0-9]{6}|#[A-Fa-f0-9]{3}|rgba?\([^)]+\))(\s+inset)?$/.test(value)) {
    return { isValid: true };
  }

  return { isValid: false, error: 'Invalid shadow format. Use CSS box-shadow syntax (e.g., 2px 4px 8px #000000).' };
}

export function validateToken(token: Partial<Token>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Name validation
  const nameValidation = validateTokenName(token.name || '');
  if (!nameValidation.isValid) {
    errors.push(nameValidation.error!);
  }

  // Value validation based on type
  if (token.value) {
    switch (token.type) {
      case 'color':
        const colorValidation = validateColorToken(token.value);
        if (!colorValidation.isValid) {
          errors.push(colorValidation.error!);
        }
        break;
      case 'spacing':
        const spacingValidation = validateSpacingToken(token.value);
        if (!spacingValidation.isValid) {
          errors.push(spacingValidation.error!);
        }
        break;
      case 'typography':
        const typographyValidation = validateTypographyToken(token.value);
        if (!typographyValidation.isValid) {
          errors.push(typographyValidation.error!);
        }
        break;
      case 'borderRadius':
        const borderRadiusValidation = validateBorderRadiusToken(token.value);
        if (!borderRadiusValidation.isValid) {
          errors.push(borderRadiusValidation.error!);
        }
        break;
      case 'shadow':
        const shadowValidation = validateShadowToken(token.value);
        if (!shadowValidation.isValid) {
          errors.push(shadowValidation.error!);
        }
        break;
    }
  } else {
    errors.push('Token value is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function enforceMinimumTints(baseColor: string, minTints: number = 4): string[] {
  // Generate tints for a base color
  const tints: string[] = [baseColor];
  
  // This is a simplified implementation
  // In a real app, you'd use a proper color manipulation library
  for (let i = 1; i < minTints; i++) {
    const lightness = Math.min(100, 20 + (i * 20));
    tints.push(`hsl(from ${baseColor} h s ${lightness}%)`);
  }
  
  return tints;
}