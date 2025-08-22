import { useState, useRef, ChangeEvent } from 'react';
import { Download, Upload, FileText, Code, Palette, FileCode } from 'lucide-react';
import { useTokenStore } from '@/stores/tokenStore';
import { exportTokens, downloadFile, importTokensFromJSON } from '@/utils/exportUtils';
import { ExportFormat } from '@/types/export';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';

export function ExportImport() {
  const { tokens, importTokens } = useTokenStore();
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('json');
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const exportFormats = [
    { value: 'json', label: 'JSON', icon: FileText, description: 'Standard JSON format' },
    { value: 'figma-tokens', label: 'Figma Tokens', icon: Palette, description: 'Figma Tokens plugin format' },
    { value: 'css-variables', label: 'CSS Variables', icon: Code, description: 'CSS custom properties' },
    { value: 'scss-maps', label: 'SCSS Maps', icon: FileCode, description: 'Sass variable maps' },
  ] as const;

  const handleExport = async () => {
    if (tokens.length === 0) {
      alert('No tokens to export');
      return;
    }

    setIsExporting(true);
    try {
      const content = exportTokens(tokens, selectedFormat);
      const timestamp = new Date().toISOString().split('T')[0];
      const extensions = {
        'json': 'json',
        'figma-tokens': 'json',
        'css-variables': 'css',
        'scss-maps': 'scss',
      };
      
      const filename = `design-tokens-${timestamp}.${extensions[selectedFormat]}`;
      const mimeTypes = {
        'json': 'application/json',
        'figma-tokens': 'application/json',
        'css-variables': 'text/css',
        'scss-maps': 'text/scss',
      };

      downloadFile(content, filename, mimeTypes[selectedFormat]);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const content = await file.text();
      const importedTokens = importTokensFromJSON(content);
      
      if (importedTokens.length === 0) {
        alert('No valid tokens found in the file');
        return;
      }

      const confirmed = confirm(
        `Import ${importedTokens.length} tokens? This will add them to your current collection.`
      );
      
      if (confirmed) {
        importTokens(importedTokens);
        alert(`Successfully imported ${importedTokens.length} tokens`);
      }
    } catch (error) {
      console.error('Import failed:', error);
      alert('Import failed. Please check the file format and try again.');
    } finally {
      setIsImporting(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Export & Import</h3>
        <p className="text-sm text-gray-600">
          Export your tokens or import existing token files
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Export Section */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Export Tokens</h4>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {exportFormats.map((format) => {
                const Icon = format.icon;
                return (
                  <button
                    key={format.value}
                    onClick={() => setSelectedFormat(format.value)}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      selectedFormat === format.value
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="h-4 w-4" />
                      <span className="font-medium text-sm">{format.label}</span>
                    </div>
                    <p className="text-xs text-gray-600">{format.description}</p>
                  </button>
                );
              })}
            </div>
            
            <Button 
              onClick={handleExport}
              disabled={isExporting || tokens.length === 0}
              className="w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? 'Exporting...' : `Export as ${exportFormats.find(f => f.value === selectedFormat)?.label}`}
            </Button>
            
            {tokens.length === 0 && (
              <p className="text-sm text-gray-500 text-center">
                Create some tokens first to enable export
              </p>
            )}
          </div>
        </div>

        {/* Import Section */}
        <div className="border-t pt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Import Tokens</h4>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Import tokens from JSON files (supports our format, Figma Tokens, and simple arrays)
            </p>
            
            <Button 
              onClick={handleImport}
              disabled={isImporting}
              variant="outline"
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              {isImporting ? 'Importing...' : 'Import Token File'}
            </Button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}