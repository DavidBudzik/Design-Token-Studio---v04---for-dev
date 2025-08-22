import React, { useState } from 'react';
import { X, Download, FileJson, Code, Hash } from 'lucide-react';
import { useTokenStore } from '@/stores/tokenStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { ExportFormat, ExportOptions } from '@/types/export';
import { exportTokens, downloadFile, getFileExtension, getMimeType } from '@/utils/exportUtils';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportDialog({ isOpen, onClose }: ExportDialogProps) {
  const { tokens, groups } = useTokenStore();
  
  const [options, setOptions] = useState<ExportOptions>({
    format: 'json',
    includeMetadata: true,
    minify: false,
    prefix: '',
    filename: 'design-tokens',
  });

  if (!isOpen) return null;

  const handleExport = () => {
    try {
      const content = exportTokens(tokens, groups, options);
      const extension = getFileExtension(options.format);
      const mimeType = getMimeType(options.format);
      const filename = `${options.filename || 'design-tokens'}${extension}`;
      
      downloadFile(content, filename, mimeType);
      onClose();
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    }
  };

  const exportFormats: { value: ExportFormat; label: string; icon: React.ReactNode }[] = [
    { value: 'json', label: 'JSON', icon: <FileJson className="h-4 w-4" /> },
    { value: 'figma-tokens', label: 'Figma Tokens', icon: <FileJson className="h-4 w-4" /> },
    { value: 'css-variables', label: 'CSS Variables', icon: <Code className="h-4 w-4" /> },
    { value: 'scss-maps', label: 'SCSS Maps', icon: <Hash className="h-4 w-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
        
        <Card className="relative z-10 w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Export Tokens</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Export Format Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Export Format</label>
              <div className="grid grid-cols-2 gap-2">
                {exportFormats.map(format => (
                  <button
                    key={format.value}
                    onClick={() => setOptions(prev => ({ ...prev, format: format.value }))}
                    className={`
                      flex items-center space-x-2 p-3 rounded-lg border transition-colors
                      ${options.format === format.value 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:bg-gray-50'
                      }
                    `}
                  >
                    {format.icon}
                    <span className="text-sm font-medium">{format.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Filename Input */}
            <div>
              <label className="block text-sm font-medium mb-2">Filename</label>
              <Input
                value={options.filename}
                onChange={(e) => setOptions(prev => ({ ...prev, filename: e.target.value }))}
                placeholder="design-tokens"
              />
            </div>

            {/* Prefix Input (for CSS/SCSS) */}
            {(options.format === 'css-variables' || options.format === 'scss-maps') && (
              <div>
                <label className="block text-sm font-medium mb-2">Variable Prefix</label>
                <Input
                  value={options.prefix}
                  onChange={(e) => setOptions(prev => ({ ...prev, prefix: e.target.value }))}
                  placeholder="app"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Example: {options.prefix || 'app'}-primary-color
                </p>
              </div>
            )}

            {/* Options */}
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={options.includeMetadata}
                  onChange={(e) => setOptions(prev => ({ ...prev, includeMetadata: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">Include metadata</span>
              </label>

              {(options.format === 'json' || options.format === 'figma-tokens') && (
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={options.minify}
                    onChange={(e) => setOptions(prev => ({ ...prev, minify: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">Minify output</span>
                </label>
              )}
            </div>

            {/* Token Summary */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">
                Exporting <span className="font-semibold">{tokens.length}</span> tokens
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3">
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                variant="primary" 
                onClick={handleExport}
                disabled={tokens.length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}