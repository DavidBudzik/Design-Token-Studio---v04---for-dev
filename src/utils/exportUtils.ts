import { Token } from '@/types/token';
import { ExportFormat, JSONExport, FigmaTokensExport } from '@/types/export';

export function exportTokens(tokens: Token[], format: ExportFormat, options?: { prefix?: string; filename?: string }): string {
  switch (format) {
    case 'json':
      return exportAsJSON(tokens);
    case 'figma-tokens':
      return exportAsFigmaTokens(tokens);
    case 'css-variables':
      return exportAsCSSVariables(tokens, options?.prefix);
    case 'scss-maps':
      return exportAsSCSSMaps(tokens);
    default:
      throw new Error(`Unsupported export format: ${format}`);
  }
}

function exportAsJSON(tokens: Token[]): string {
  const exportData: JSONExport = {
    themeName: 'Design Token Studio Export',
    description: 'Design tokens exported from Design Token Studio',
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    tokens,
    metadata: {
      totalTokens: tokens.length,
      categories: [...new Set(tokens.map(t => t.category))],
      lastModified: new Date().toISOString(),
    },
  };

  return JSON.stringify(exportData, null, 2);
}

function exportAsFigmaTokens(tokens: Token[]): string {
  const figmaTokens: FigmaTokensExport = {};

  tokens.forEach(token => {
    if (!figmaTokens[token.category]) {
      figmaTokens[token.category] = {};
    }

    figmaTokens[token.category][token.name] = {
      value: token.value,
      type: token.type,
      description: token.description,
    };
  });

  return JSON.stringify(figmaTokens, null, 2);
}

function exportAsCSSVariables(tokens: Token[], prefix: string = ''): string {
  const cssVariables = tokens.map(token => {
    const varName = `--${prefix}${token.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    return `  ${varName}: ${token.value};`;
  }).join('\n');

  return `:root {\n${cssVariables}\n}`;
}

function exportAsSCSSMaps(tokens: Token[]): string {
  const maps: Record<string, string[]> = {};

  tokens.forEach(token => {
    const mapName = `$${token.type}-tokens`;
    if (!maps[mapName]) {
      maps[mapName] = [];
    }
    
    const tokenName = token.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    maps[mapName].push(`  '${tokenName}': ${token.value}`);
  });

  return Object.entries(maps)
    .map(([mapName, values]) => `${mapName}: (\n${values.join(',\n')}\n);`)
    .join('\n\n');
}

export function downloadFile(content: string, filename: string, mimeType: string = 'application/json'): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

export function importTokensFromJSON(jsonString: string): Token[] {
  try {
    const data = JSON.parse(jsonString);
    
    // Handle different JSON formats
    if (data.tokens && Array.isArray(data.tokens)) {
      // Our export format
      return data.tokens;
    } else if (Array.isArray(data)) {
      // Simple array format
      return data;
    } else {
      // Figma tokens format - convert to our format
      const tokens: Token[] = [];
      Object.entries(data).forEach(([category, categoryTokens]) => {
        if (typeof categoryTokens === 'object' && categoryTokens !== null) {
          Object.entries(categoryTokens as Record<string, any>).forEach(([name, tokenData]) => {
            if (tokenData.value && tokenData.type) {
              tokens.push({
                id: crypto.randomUUID(),
                name,
                value: tokenData.value,
                type: tokenData.type,
                category: category as any,
                description: tokenData.description,
                createdAt: new Date(),
                updatedAt: new Date(),
              } as Token);
            }
          });
        }
      });
      return tokens;
    }
  } catch (error) {
    throw new Error('Invalid JSON format');
  }
}