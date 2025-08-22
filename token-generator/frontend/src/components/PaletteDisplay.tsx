import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCopy, FaCheck } from 'react-icons/fa';
import { ColorPalette, Color } from '@token-generator/shared';
import toast from 'react-hot-toast';

interface PaletteDisplayProps {
  palette: ColorPalette;
}

export default function PaletteDisplay({ palette }: PaletteDisplayProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleCopyColor = async (color: Color, format: 'hex' | 'oklch') => {
    const value = format === 'hex' ? color.hex : color.oklch;
    try {
      await navigator.clipboard.writeText(value);
      setCopiedColor(`${color.name}-${format}`);
      toast.success(`Copied ${value}`);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (error) {
      toast.error('Failed to copy');
    }
  };

  const colorOrder = ['primary', 'secondary', 'functional', 'text', 'gradient'] as const;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Generated Palette</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {colorOrder.map((key, index) => {
          const color = palette[key];
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div
                className="h-32 rounded-lg shadow-md transition-all duration-200 group-hover:shadow-xl"
                style={{ backgroundColor: color.hex }}
              />
              
              <div className="mt-3 space-y-1">
                <h3 className="font-medium text-gray-900">{color.name}</h3>
                
                {/* Hex value */}
                <button
                  onClick={() => handleCopyColor(color, 'hex')}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <span className="font-mono">{color.hex}</span>
                  {copiedColor === `${color.name}-hex` ? (
                    <FaCheck className="w-3 h-3 text-green-600" />
                  ) : (
                    <FaCopy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </button>

                {/* OKLCH value */}
                <button
                  onClick={() => handleCopyColor(color, 'oklch')}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <span className="font-mono text-xs">{color.oklch}</span>
                  {copiedColor === `${color.name}-oklch` ? (
                    <FaCheck className="w-3 h-3 text-green-600" />
                  ) : (
                    <FaCopy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </button>

                {/* Contrast ratio if available */}
                {color.contrastRatio && (
                  <p className="text-xs text-gray-500">
                    Contrast: {color.contrastRatio.toFixed(1)}:1
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Color Harmony Preview */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Color Harmony</h3>
        <div className="flex gap-1 h-16 rounded-lg overflow-hidden shadow-sm">
          {colorOrder.map(key => (
            <div
              key={key}
              className="flex-1 transition-all duration-200 hover:flex-[2]"
              style={{ backgroundColor: palette[key].hex }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}