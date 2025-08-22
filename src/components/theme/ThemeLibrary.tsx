import { useState } from 'react';
import { Palette, Sparkles, Check } from 'lucide-react';
import { useTokenStore } from '@/stores/tokenStore';
import { useThemeStore } from '@/stores/themeStore';
import { themeTemplates, SimpleTheme } from '@/data/themeTemplates';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';

export function ThemeLibrary() {
  const { addToken, clearAllTokens } = useTokenStore();
  const { currentTheme } = useThemeStore();
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [isApplying, setIsApplying] = useState<string | null>(null);

  const industries = ['all', 'Education', 'Technology', 'Healthcare', 'Fashion'];

  const filteredTemplates = selectedIndustry === 'all' 
    ? themeTemplates 
    : themeTemplates.filter(template => template.industry === selectedIndustry);

  const applyTheme = async (template: SimpleTheme) => {
    setIsApplying(template.id);
    
    try {
      const confirmed = confirm(
        `Apply "${template.name}" theme? This will replace all current tokens with ${template.colors.length} new color tokens.`
      );
      
      if (!confirmed) {
        setIsApplying(null);
        return;
      }

      // Clear existing tokens
      clearAllTokens();

             // Add theme colors as tokens
       template.colors.forEach((color) => {
         addToken({
           name: color.name,
           value: color.value,
           type: 'color',
           category: color.role === 'primary' ? 'Primary' : 
                    color.role === 'secondary' ? 'Secondary' : 
                    'Functional',
           description: `${template.name} - ${color.role} color`,
         });
       });

      alert(`Successfully applied "${template.name}" theme with ${template.colors.length} tokens!`);
    } catch (error) {
      console.error('Failed to apply theme:', error);
      alert('Failed to apply theme. Please try again.');
    } finally {
      setIsApplying(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Theme Library</h3>
        <p className="text-sm text-gray-600">
          Choose from industry-specific color palettes
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Industry Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Industry</h4>
          <div className="flex flex-wrap gap-2">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setSelectedIndustry(industry)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedIndustry === industry
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {industry === 'all' ? 'All' : industry}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Templates */}
        <div className="space-y-4">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className={`border rounded-lg p-4 transition-colors ${
                currentTheme?.id === template.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="font-medium">{template.name}</h5>
                    {currentTheme?.id === template.id && (
                      <Check className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                                     <div className="flex flex-wrap gap-1">
                     {template.emotions.map((emotion: string) => (
                       <span
                         key={emotion}
                         className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                       >
                         {emotion}
                       </span>
                     ))}
                   </div>
                </div>
              </div>

                             {/* Color Preview */}
               <div className="flex gap-1 mb-3">
                 {template.colors.slice(0, 8).map((color: any, index: number) => (
                   <div
                     key={index}
                     className="w-6 h-6 rounded border border-gray-200"
                     style={{ backgroundColor: color.value }}
                     title={`${color.name}: ${color.value}`}
                   />
                 ))}
                 {template.colors.length > 8 && (
                   <div className="w-6 h-6 rounded border border-gray-200 bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                     +{template.colors.length - 8}
                   </div>
                 )}
               </div>

                             <Button
                 onClick={() => applyTheme(template)}
                 disabled={isApplying === template.id}
                 variant="outline"
                 size="sm"
                 className="w-full"
               >
                 <Sparkles className="h-4 w-4 mr-2" />
                 {isApplying === template.id 
                   ? 'Applying...' 
                   : 'Apply Theme'
                 }
               </Button>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Palette className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No themes found for this industry</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}