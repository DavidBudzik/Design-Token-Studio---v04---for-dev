import React, { useState, useRef } from 'react';
import { X, Upload, FileJson } from 'lucide-react';
import { useTokenStore } from '@/stores/tokenStore';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Token } from '@/types/token';

interface ImportDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ImportDialog({ isOpen, onClose }: ImportDialogProps) {
  const { importTokens } = useTokenStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<any>(null);

  if (!isOpen) return null;

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        
        // Handle different import formats
        let tokensToImport: Token[] = [];
        
        if (data.tokens && Array.isArray(data.tokens)) {
          // Our format
          tokensToImport = data.tokens;
        } else if (data.themeName) {
          // Legacy format with themeName
          tokensToImport = data.tokens || [];
        } else {
          // Try to extract tokens from nested structure
          const extractedTokens: Token[] = [];
          Object.entries(data).forEach(([category, tokens]) => {
            if (typeof tokens === 'object') {
              Object.entries(tokens as any).forEach(([name, token]: [string, any]) => {
                extractedTokens.push({
                  id: crypto.randomUUID(),
                  name,
                  value: token.value || token,
                  type: token.type || 'color',
                  category: 'Other',
                  description: token.description || '',
                  createdAt: new Date(),
                  updatedAt: new Date(),
                } as Token);
              });
            }
          });
          tokensToImport = extractedTokens;
        }

        setPreview({
          filename: file.name,
          tokenCount: tokensToImport.length,
          tokens: tokensToImport, // Store all tokens for import
          previewTokens: tokensToImport.slice(0, 5), // Show first 5 tokens
        });
        setError(null);
      } catch (err) {
        setError('Invalid JSON file. Please check the format.');
        setPreview(null);
      }
    };
    reader.readAsText(file);
  };

  const handleImport = () => {
    if (!preview) return;

    try {
      importTokens(preview.tokens);
      onClose();
    } catch (err) {
      setError('Failed to import tokens. Please try again.');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/json') {
      const event = {
        target: { files: [file] }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileSelect(event);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
        
        <Card className="relative z-10 w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Import Tokens</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* File Upload Area */}
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
            >
              <FileJson className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                Drag and drop your JSON file here, or
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Choose File
              </Button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Preview */}
            {preview && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Preview</h3>
                <p className="text-sm text-gray-600 mb-3">
                  File: {preview.filename}<br />
                  Tokens found: {preview.tokenCount}
                </p>
                <div className="space-y-2">
                  {preview.previewTokens.slice(0, 3).map((token: Token, index: number) => (
                    <div key={index} className="text-xs bg-white p-2 rounded border border-gray-200">
                      <span className="font-medium">{token.name}</span>: {token.value}
                    </div>
                  ))}
                  {preview.tokenCount > 3 && (
                    <p className="text-xs text-gray-500">
                      ...and {preview.tokenCount - 3} more
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end space-x-3">
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                variant="primary" 
                onClick={handleImport}
                disabled={!preview}
              >
                <Upload className="h-4 w-4 mr-2" />
                Import {preview?.tokenCount || 0} Tokens
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}