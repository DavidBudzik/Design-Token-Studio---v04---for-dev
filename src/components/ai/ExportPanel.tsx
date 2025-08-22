import React, { useState } from 'react';
import { Download, FileText, Code, Palette, FileCode } from 'lucide-react';
import { GeneratedPalette } from '../../services/apiService';
import clsx from 'clsx';

interface ExportPanelProps {
  palette: GeneratedPalette;
  onDownload: (content: string, filename: string, mimeType: string) => void;
}

type ExportFormat = 'json' | 'css' | 'scss' | 'tailwind' | 'figma';

export const ExportPanel: React.FC<ExportPanelProps> = ({ palette, onDownload }) => {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('json');
  const [isExporting, setIsExporting] = useState(false);

  const exportFormats = [
    {
      id: 'json' as ExportFormat,
      name: 'JSON',
      description: 'Structured data format',
      icon: FileText,
      extension: '.json',
    },
    {
      id: 'css' as ExportFormat,
      name: 'CSS Variables',
      description: 'CSS custom properties',
      icon: Code,
      extension: '.css',
    },
    {
      id: 'scss' as ExportFormat,
      name: 'SCSS',
      description: 'Sass variables and maps',
      icon: FileCode,
      extension: '.scss',
    },
    {
      id: 'tailwind' as ExportFormat,
      name: 'Tailwind Config',
      description: 'Tailwind theme extension',
      icon: Code,
      extension: '.js',
    },
    {
      id: 'figma' as ExportFormat,
      name: 'Figma Tokens',
      description: 'Figma Tokens plugin format',
      icon: Palette,
      extension: '.json',
    },
  ];

  const generateExport = (format: ExportFormat) => {
    const industrySlug = palette.industry.toLowerCase().replace(/\s+/g, '-');
    
    switch (format) {
      case 'json':
        return {
          content: JSON.stringify(palette, null, 2),
          filename: `${industrySlug}-palette.json`,
          mimeType: 'application/json',
        };
      
      case 'css':
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
        
        const cssContent = `:root {\n  /* ${palette.theme} - ${palette.industry} Theme */\n  /* Generated: ${palette.metadata.generatedAt} */\n  /* Accessibility: ${palette.metadata.accessibility.overallCompliance} compliant */\n\n${cssVars}}\n\n/* Usage Examples */\n.btn-primary {\n  background-color: var(--primary-${palette.colors.find(c => c.category === 'Primary')?.name.toLowerCase().replace(/\s+/g, '-')});\n  color: var(--text-${palette.colors.find(c => c.category === 'Text')?.name.toLowerCase().replace(/\s+/g, '-')});\n}\n\n.btn-primary:hover {\n  background-color: var(--primary-${palette.colors.find(c => c.category === 'Primary')?.name.toLowerCase().replace(/\s+/g, '-')}-hover);\n}`;
        
        return {
          content: cssContent,
          filename: `${industrySlug}-palette.css`,
          mimeType: 'text/css',
        };
      
      case 'scss':
        const scssVars = palette.colors.map(color => {
          const baseName = `$${color.category.toLowerCase()}-${color.name.toLowerCase().replace(/\s+/g, '-')}`;
          let scss = `${baseName}: ${color.hex};\n`;
          scss += `${baseName}-oklch: ${color.oklch};\n`;
          
          Object.entries(color.interactive_states).forEach(([state, value]) => {
            scss += `${baseName}-${state}: ${value};\n`;
          });
          
          return scss;
        }).join('\n');

        const colorMap = palette.colors.map(color => {
          const states = Object.entries(color.interactive_states)
            .map(([state, value]) => `    ${state}: ${value}`)
            .join(',\n');
          
          return `  ${color.category.toLowerCase()}-${color.name.toLowerCase().replace(/\s+/g, '-')}: (\n${states}\n  )`;
        }).join(',\n');

        const scssContent = `// ${palette.theme} - ${palette.industry} Theme\n// Generated: ${palette.metadata.generatedAt}\n\n// Variables\n${scssVars}\n// Color Map\n$colors: (\n${colorMap}\n);\n\n// Helper function\n@function get-color($category, $state: default) {\n  @return map-get(map-get($colors, $category), $state);\n}`;
        
        return {
          content: scssContent,
          filename: `${industrySlug}-palette.scss`,
          mimeType: 'text/scss',
        };
      
      case 'tailwind':
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
            },
          },
        };

        const tailwindContent = `// ${palette.theme} - ${palette.industry} Theme\n// Generated: ${palette.metadata.generatedAt}\n\nmodule.exports = ${JSON.stringify(tailwindConfig, null, 2)};\n\n// Usage examples:\n// <button className="bg-primary-${palette.colors.find(c => c.category === 'Primary')?.name.toLowerCase().replace(/\s+/g, '-')} text-text-${palette.colors.find(c => c.category === 'Text')?.name.toLowerCase().replace(/\s+/g, '-')} hover:bg-primary-${palette.colors.find(c => c.category === 'Primary')?.name.toLowerCase().replace(/\s+/g, '-')}-hover">\n//   Primary Button\n// </button>`;
        
        return {
          content: tailwindContent,
          filename: `tailwind.${industrySlug}.config.js`,
          mimeType: 'application/javascript',
        };
      
      case 'figma':
        const figmaTokens = {
          [industrySlug]: {
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
          $metadata: {
            tokenSetOrder: [industrySlug],
            generatedAt: palette.metadata.generatedAt,
            theme: palette.theme,
            industry: palette.industry,
            accessibility: palette.metadata.accessibility,
          },
        };
        
        return {
          content: JSON.stringify(figmaTokens, null, 2),
          filename: `${industrySlug}-figma-tokens.json`,
          mimeType: 'application/json',
        };
      
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      const exportResult = generateExport(selectedFormat);
      onDownload(exportResult.content, exportResult.filename, exportResult.mimeType);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const previewContent = () => {
    try {
      const exportResult = generateExport(selectedFormat);
      return exportResult.content.slice(0, 500) + (exportResult.content.length > 500 ? '...' : '');
    } catch {
      return 'Preview not available';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Export Palette</h3>
      
      {/* Format Selection */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
        {exportFormats.map((format) => {
          const Icon = format.icon;
          return (
            <button
              key={format.id}
              onClick={() => setSelectedFormat(format.id)}
              className={clsx(
                'p-3 border rounded-lg text-center transition-colors',
                selectedFormat === format.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              )}
            >
              <Icon className="h-5 w-5 mx-auto mb-1" />
              <div className="text-xs font-medium">{format.name}</div>
              <div className="text-xs text-gray-500">{format.extension}</div>
            </button>
          );
        })}
      </div>

      {/* Format Description */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          {exportFormats.find(f => f.id === selectedFormat)?.description}
        </p>
      </div>

      {/* Preview */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
        <pre className="bg-gray-50 p-3 rounded-lg text-xs font-mono text-gray-700 max-h-32 overflow-y-auto">
          {previewContent()}
        </pre>
      </div>

      {/* Export Button */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {palette.colors.length} colors • {palette.metadata.accessibility.overallCompliance} compliant
        </div>
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          {isExporting ? 'Exporting...' : `Export ${selectedFormat.toUpperCase()}`}
        </button>
      </div>
    </div>
  );
};