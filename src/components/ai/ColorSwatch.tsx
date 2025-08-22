import React, { useState } from 'react';
import { Copy, Check, Eye } from 'lucide-react';
import { GeneratedColor } from '../../services/apiService';
import clsx from 'clsx';

interface ColorSwatchProps {
  color: GeneratedColor;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({ color }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showStates, setShowStates] = useState(false);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const getContrastColor = (hex: string) => {
    // Simple contrast calculation for text visibility
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Primary: 'bg-blue-100 text-blue-800',
      Secondary: 'bg-green-100 text-green-800',
      Functional: 'bg-orange-100 text-orange-800',
      Text: 'bg-gray-100 text-gray-800',
      Gradient: 'bg-purple-100 text-purple-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      {/* Main Color Display */}
      <div 
        className="h-24 relative group cursor-pointer"
        style={{ backgroundColor: color.hex }}
        onClick={() => copyToClipboard(color.hex, 'hex')}
      >
        <div 
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-20"
          style={{ color: getContrastColor(color.hex) }}
        >
          {copiedField === 'hex' ? (
            <Check className="h-5 w-5" />
          ) : (
            <Copy className="h-5 w-5" />
          )}
        </div>
      </div>

      {/* Color Information */}
      <div className="p-4 space-y-3">
        {/* Name and Category */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-gray-900">{color.name}</h3>
            <span className={clsx('inline-block px-2 py-1 rounded text-xs font-medium', getCategoryColor(color.category))}>
              {color.category}
            </span>
          </div>
        </div>

        {/* Usage */}
        <p className="text-xs text-gray-600">{color.usage}</p>

        {/* Color Values */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-gray-500">HEX</span>
            <button
              onClick={() => copyToClipboard(color.hex, 'hex')}
              className="text-xs font-mono text-gray-700 hover:text-gray-900 flex items-center gap-1"
            >
              {color.hex}
              {copiedField === 'hex' ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-gray-500">OKLCH</span>
            <button
              onClick={() => copyToClipboard(color.oklch, 'oklch')}
              className="text-xs font-mono text-gray-700 hover:text-gray-900 flex items-center gap-1 max-w-32 truncate"
            >
              {color.oklch}
              {copiedField === 'oklch' ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </button>
          </div>
        </div>

        {/* Accessibility Info */}
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Contrast</span>
            <span className="font-medium">{color.accessibility.contrastRatio}:1</span>
          </div>
          <div className="flex gap-2 mt-1">
            <span className={clsx(
              'px-1.5 py-0.5 rounded text-xs font-medium',
              color.accessibility.wcagAA 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            )}>
              {color.accessibility.wcagAA ? '✓' : '✗'} AA
            </span>
            <span className={clsx(
              'px-1.5 py-0.5 rounded text-xs font-medium',
              color.accessibility.wcagAAA 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-600'
            )}>
              {color.accessibility.wcagAAA ? '✓' : '✗'} AAA
            </span>
          </div>
        </div>

        {/* Interactive States Toggle */}
        <button
          onClick={() => setShowStates(!showStates)}
          className="w-full flex items-center justify-center gap-2 py-2 text-xs text-gray-600 hover:text-gray-800 border-t border-gray-100"
        >
          <Eye className="h-3 w-3" />
          {showStates ? 'Hide' : 'Show'} Interactive States
        </button>

        {/* Interactive States */}
        {showStates && (
          <div className="space-y-2 pt-2 border-t border-gray-100">
            {Object.entries(color.interactive_states).map(([state, value]) => (
              <div key={state} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded border border-gray-200"
                  style={{ backgroundColor: value }}
                />
                <span className="text-xs text-gray-600 capitalize flex-1">{state}</span>
                <button
                  onClick={() => copyToClipboard(value, `${state}-state`)}
                  className="text-xs font-mono text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                  {value}
                  {copiedField === `${state}-state` ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};