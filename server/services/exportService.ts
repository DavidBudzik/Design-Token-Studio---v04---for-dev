import { GeneratedPalette, GeneratedColor } from './aiService.js';

export type ExportFormat = 'json' | 'css' | 'scss' | 'tailwind' | 'figma';

export interface ExportResult {
  content: string;
  filename: string;
  mimeType: string;
}

export class ExportService {
  
  /**
   * Export palette in specified format
   */
  static exportPalette(palette: GeneratedPalette, format: ExportFormat): ExportResult {
    switch (format) {
      case 'json':
        return this.exportAsJSON(palette);
      case 'css':
        return this.exportAsCSS(palette);
      case 'scss':
        return this.exportAsSCSS(palette);
      case 'tailwind':
        return this.exportAsTailwind(palette);
      case 'figma':
        return this.exportAsFigmaTokens(palette);
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }

  /**
   * Export as structured JSON
   */
  private static exportAsJSON(palette: GeneratedPalette): ExportResult {
    const content = JSON.stringify(palette, null, 2);
    
    return {
      content,
      filename: `${palette.industry.toLowerCase().replace(/\s+/g, '-')}-palette.json`,
      mimeType: 'application/json',
    };
  }

  /**
   * Export as CSS custom properties
   */
  private static exportAsCSS(palette: GeneratedPalette): ExportResult {
    const cssVars = palette.colors.map(color => {
      const baseName = `--${color.category.toLowerCase()}-${color.name.toLowerCase().replace(/\s+/g, '-')}`;
      
      let css = `  ${baseName}: ${color.hex};\n`;
      css += `  ${baseName}-oklch: ${color.oklch};\n`;
      
      // Add interactive states
      Object.entries(color.interactive_states).forEach(([state, value]) => {
        css += `  ${baseName}-${state}: ${value};\n`;
      });
      
      return css;
    }).join('\n');

    const content = `:root {\n  /* ${palette.theme} - ${palette.industry} Theme */\n  /* Generated: ${palette.metadata.generatedAt} */\n  /* Accessibility: ${palette.metadata.accessibility.overallCompliance} compliant */\n\n${cssVars}}\n\n/* Usage Examples */\n.primary-button {\n  background-color: var(--primary-${palette.colors.find(c => c.category === 'Primary')?.name.toLowerCase().replace(/\s+/g, '-')});\n  color: var(--text-${palette.colors.find(c => c.category === 'Text')?.name.toLowerCase().replace(/\s+/g, '-')});\n}\n\n.primary-button:hover {\n  background-color: var(--primary-${palette.colors.find(c => c.category === 'Primary')?.name.toLowerCase().replace(/\s+/g, '-')}-hover);\n}`;

    return {
      content,
      filename: `${palette.industry.toLowerCase().replace(/\s+/g, '-')}-palette.css`,
      mimeType: 'text/css',
    };
  }

  /**
   * Export as SCSS variables and maps
   */
  private static exportAsSCSS(palette: GeneratedPalette): ExportResult {
    // SCSS variables
    const scssVars = palette.colors.map(color => {
      const baseName = `$${color.category.toLowerCase()}-${color.name.toLowerCase().replace(/\s+/g, '-')}`;
      
      let scss = `${baseName}: ${color.hex};\n`;
      scss += `${baseName}-oklch: ${color.oklch};\n`;
      
      // Add interactive states
      Object.entries(color.interactive_states).forEach(([state, value]) => {
        scss += `${baseName}-${state}: ${value};\n`;
      });
      
      return scss;
    }).join('\n');

    // SCSS color map
    const colorMap = palette.colors.map(color => {
      const states = Object.entries(color.interactive_states)
        .map(([state, value]) => `    ${state}: ${value}`)
        .join(',\n');
      
      return `  ${color.category.toLowerCase()}-${color.name.toLowerCase().replace(/\s+/g, '-')}: (\n${states}\n  )`;
    }).join(',\n');

    const content = `// ${palette.theme} - ${palette.industry} Theme
// Generated: ${palette.metadata.generatedAt}
// Accessibility: ${palette.metadata.accessibility.overallCompliance} compliant

// SCSS Variables
${scssVars}

// Color Map for easy access
$colors: (
${colorMap}
);

// Helper function to get color states
@function get-color($category, $state: default) {
  @return map-get(map-get($colors, $category), $state);
}

// Usage example:
// .primary-button {
//   background-color: get-color(primary-${palette.colors.find(c => c.category === 'Primary')?.name.toLowerCase().replace(/\s+/g, '-')});
//   &:hover {
//     background-color: get-color(primary-${palette.colors.find(c => c.category === 'Primary')?.name.toLowerCase().replace(/\s+/g, '-')}, hover);
//   }
// }`;

    return {
      content,
      filename: `${palette.industry.toLowerCase().replace(/\s+/g, '-')}-palette.scss`,
      mimeType: 'text/scss',
    };
  }

  /**
   * Export as Tailwind CSS theme extension
   */
  private static exportAsTailwind(palette: GeneratedPalette): ExportResult {
    const colors: Record<string, any> = {};
    
    palette.colors.forEach(color => {
      const colorName = `${color.category.toLowerCase()}-${color.name.toLowerCase().replace(/\s+/g, '-')}`;
      
      colors[colorName] = {
        DEFAULT: color.hex,
        oklch: color.oklch,
        ...color.interactive_states,
      };
    });

    const tailwindConfig = {
      theme: {
        extend: {
          colors,
          // Add custom color utilities
          backgroundColor: Object.keys(colors).reduce((acc, colorName) => {
            acc[`bg-${colorName}`] = colors[colorName].DEFAULT;
            return acc;
          }, {} as Record<string, string>),
          textColor: Object.keys(colors).reduce((acc, colorName) => {
            acc[`text-${colorName}`] = colors[colorName].DEFAULT;
            return acc;
          }, {} as Record<string, string>),
          borderColor: Object.keys(colors).reduce((acc, colorName) => {
            acc[`border-${colorName}`] = colors[colorName].DEFAULT;
            return acc;
          }, {} as Record<string, string>),
        },
      },
      // Add custom utilities for OKLCH
      plugins: [
        `function({ addUtilities, theme }) {
          const oklchColors = ${JSON.stringify(
            Object.entries(colors).reduce((acc, [name, color]) => {
              acc[\`.\${name}-oklch\`] = { color: color.oklch };
              return acc;
            }, {} as Record<string, any>)
          )};
          addUtilities(oklchColors);
        }`
      ],
    };

    const content = `// ${palette.theme} - ${palette.industry} Theme
// Generated: ${palette.metadata.generatedAt}
// Accessibility: ${palette.metadata.accessibility.overallCompliance} compliant

module.exports = ${JSON.stringify(tailwindConfig, null, 2)};

// Usage examples:
// <button className="bg-primary-${palette.colors.find(c => c.category === 'Primary')?.name.toLowerCase().replace(/\s+/g, '-')} text-text-${palette.colors.find(c => c.category === 'Text')?.name.toLowerCase().replace(/\s+/g, '-')} hover:bg-primary-${palette.colors.find(c => c.category === 'Primary')?.name.toLowerCase().replace(/\s+/g, '-')}-hover">
//   Primary Button
// </button>`;

    return {
      content,
      filename: `tailwind.${palette.industry.toLowerCase().replace(/\s+/g, '-')}.config.js`,
      mimeType: 'application/javascript',
    };
  }

  /**
   * Export as Figma Tokens format
   */
  private static exportAsFigmaTokens(palette: GeneratedPalette): ExportResult {
    const tokens: Record<string, any> = {};
    
    // Global tokens
    tokens.global = {
      [palette.industry.toLowerCase().replace(/\s+/g, '-')]: {
        colors: palette.colors.reduce((acc, color) => {
          const colorName = `${color.category.toLowerCase()}-${color.name.toLowerCase().replace(/\s+/g, '-')}`;
          
          acc[colorName] = {
            value: color.hex,
            type: 'color',
            description: color.usage,
            oklch: color.oklch,
            accessibility: {
              contrastRatio: color.accessibility.contrastRatio,
              wcagAA: color.accessibility.wcagAA,
              wcagAAA: color.accessibility.wcagAAA,
            },
            interactive: Object.entries(color.interactive_states).reduce((states, [state, value]) => {
              states[state] = {
                value,
                type: 'color',
              };
              return states;
            }, {} as Record<string, any>),
          };
          
          return acc;
        }, {} as Record<string, any>),
      },
    };

    // Semantic tokens
    tokens.semantic = {
      [palette.industry.toLowerCase().replace(/\s+/g, '-')]: {
        colors: {
          action: {
            primary: {
              value: `{global.${palette.industry.toLowerCase().replace(/\s+/g, '-')}.colors.primary-${palette.colors.find(c => c.category === 'Primary')?.name.toLowerCase().replace(/\s+/g, '-')}}`,
              type: 'color',
            },
            secondary: {
              value: `{global.${palette.industry.toLowerCase().replace(/\s+/g, '-')}.colors.secondary-${palette.colors.find(c => c.category === 'Secondary')?.name.toLowerCase().replace(/\s+/g, '-')}}`,
              type: 'color',
            },
          },
          feedback: {
            success: {
              value: `{global.${palette.industry.toLowerCase().replace(/\s+/g, '-')}.colors.success-${palette.colors.find(c => c.category === 'Functional')?.name.toLowerCase().replace(/\s+/g, '-')}}`,
              type: 'color',
            },
          },
          text: {
            primary: {
              value: `{global.${palette.industry.toLowerCase().replace(/\s+/g, '-')}.colors.text-${palette.colors.find(c => c.category === 'Text')?.name.toLowerCase().replace(/\s+/g, '-')}}`,
              type: 'color',
            },
          },
        },
      },
    };

    const figmaTokens = {
      ...tokens,
      $metadata: {
        tokenSetOrder: [
          `global/${palette.industry.toLowerCase().replace(/\s+/g, '-')}`,
          `semantic/${palette.industry.toLowerCase().replace(/\s+/g, '-')}`,
        ],
        generatedAt: palette.metadata.generatedAt,
        theme: palette.theme,
        industry: palette.industry,
        accessibility: palette.metadata.accessibility,
      },
    };

    const content = JSON.stringify(figmaTokens, null, 2);

    return {
      content,
      filename: `${palette.industry.toLowerCase().replace(/\s+/g, '-')}-figma-tokens.json`,
      mimeType: 'application/json',
    };
  }
}