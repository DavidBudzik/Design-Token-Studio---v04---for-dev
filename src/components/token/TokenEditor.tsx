import React, { useState, useEffect } from 'react';
import { X, Save, Palette } from 'lucide-react';
import { Token, TokenType, TokenCategory } from '@/types/token';
import { useTokenStore } from '@/stores/tokenStore';
import { validateToken } from '@/utils/tokenValidation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';

interface TokenEditorProps {
  token?: Token | null;
  onClose: () => void;
}

export function TokenEditor({ token, onClose }: TokenEditorProps) {
  const { addToken, updateToken } = useTokenStore();
  
  const [formData, setFormData] = useState({
    name: '',
    value: '',
    type: 'color' as TokenType,
    category: 'Primary' as TokenCategory,
    description: '',
  });
  
  const [errors, setErrors] = useState<string[]>([]);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  useEffect(() => {
    if (token) {
      setFormData({
        name: token.name,
        value: token.value,
        type: token.type,
        category: token.category,
        description: token.description || '',
      });
    } else {
      setFormData({
        name: '',
        value: '',
        type: 'color',
        category: 'Primary',
        description: '',
      });
    }
  }, [token]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateToken(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors([]);

    if (token) {
      updateToken(token.id, formData);
    } else {
      addToken(formData);
    }

    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors([]);
  };

  const tokenTypes: { value: TokenType; label: string }[] = [
    { value: 'color', label: 'Color' },
    { value: 'spacing', label: 'Spacing' },
    { value: 'typography', label: 'Typography' },
    { value: 'borderRadius', label: 'Border Radius' },
    { value: 'shadow', label: 'Shadow' },
    { value: 'gradient', label: 'Gradient' },
  ];

  const tokenCategories: { value: TokenCategory; label: string }[] = [
    { value: 'Primary', label: 'Primary' },
    { value: 'Secondary', label: 'Secondary' },
    { value: 'Functional', label: 'Functional' },
    { value: 'Text', label: 'Text' },
    { value: 'Gradient', label: 'Gradient' },
    { value: 'Other', label: 'Other' },
  ];

  const renderValueInput = () => {
    switch (formData.type) {
      case 'color':
        return (
          <div className="space-y-2">
            <div className="flex space-x-2">
              <Input
                label="Color Value"
                value={formData.value}
                onChange={(e) => handleInputChange('value', e.target.value)}
                placeholder="#000000, rgb(0,0,0), hsl(0,0%,0%)"
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                className="mt-auto h-10 w-10 p-0"
              >
                <Palette className="h-4 w-4" />
              </Button>
            </div>
            {formData.value && (
              <div
                className="w-full h-12 rounded border-2 border-gray-200"
                style={{ backgroundColor: formData.value }}
              />
            )}
          </div>
        );
      case 'spacing':
        return (
          <Input
            label="Spacing Value"
            value={formData.value}
            onChange={(e) => handleInputChange('value', e.target.value)}
            placeholder="16px, 1rem, 2em, 10%"
            helperText="Use px, rem, em, or % units"
          />
        );
      case 'typography':
        return (
          <Input
            label="Font Size"
            value={formData.value}
            onChange={(e) => handleInputChange('value', e.target.value)}
            placeholder="16px, 1.2rem, 1.5em"
            helperText="Use px, rem, or em units"
          />
        );
      case 'borderRadius':
        return (
          <Input
            label="Border Radius"
            value={formData.value}
            onChange={(e) => handleInputChange('value', e.target.value)}
            placeholder="4px, 0.5rem, 50%"
            helperText="Use px, rem, em, or % units"
          />
        );
      case 'shadow':
        return (
          <Input
            label="Box Shadow"
            value={formData.value}
            onChange={(e) => handleInputChange('value', e.target.value)}
            placeholder="2px 4px 8px #000000"
            helperText="CSS box-shadow syntax"
          />
        );
      case 'gradient':
        return (
          <Input
            label="Gradient"
            value={formData.value}
            onChange={(e) => handleInputChange('value', e.target.value)}
            placeholder="linear-gradient(90deg, #000 0%, #fff 100%)"
            helperText="CSS gradient syntax"
          />
        );
      default:
        return (
          <Input
            label="Value"
            value={formData.value}
            onChange={(e) => handleInputChange('value', e.target.value)}
            placeholder="Enter token value"
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {token ? 'Edit Token' : 'Create Token'}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <ul className="text-sm text-red-600 space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}

            <Input
              label="Token Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="primary-blue, spacing-lg, etc."
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Token Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {tokenTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {tokenCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {renderValueInput()}

            <Input
              label="Description (Optional)"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Brief description of token usage"
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                {token ? 'Update' : 'Create'} Token
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}