import React, { useState, useEffect } from 'react';
import { Wand2, Loader2, AlertCircle, CheckCircle, Palette } from 'lucide-react';
import { apiService, GeneratedPalette, PaletteGenerationRequest } from '../../services/apiService';
import { MockService } from '../../services/mockService';
import { IndustryType } from '../../types/theme';
import { ColorSwatch } from './ColorSwatch';
import { AccessibilityBadge } from './AccessibilityBadge';
import { ExportPanel } from './ExportPanel';

export const PaletteGenerator: React.FC = () => {
  const [description, setDescription] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType>('Technology');
  const [accessibilityLevel, setAccessibilityLevel] = useState<'AA' | 'AAA'>('AA');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPalette, setGeneratedPalette] = useState<GeneratedPalette | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [detectedIndustry, setDetectedIndustry] = useState<IndustryType | null>(null);
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  const industries: IndustryType[] = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Retail',
    'Hospitality', 'Entertainment', 'Automotive', 'Non-Profit',
    'Food & Beverage', 'Fashion', 'Real Estate'
  ];

  // Check API health on component mount
  useEffect(() => {
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    try {
      await apiService.checkHealth();
      setApiStatus('online');
    } catch (error) {
      console.error('API health check failed:', error);
      setApiStatus('offline');
    }
  };

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError('Please enter a description for your palette');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setDetectedIndustry(null);

    try {
      const request: PaletteGenerationRequest = {
        description: description.trim(),
        industryTheme: selectedIndustry,
        accessibility: accessibilityLevel,
        colorCount: 5,
      };

      if (apiStatus === 'online') {
        const response = await apiService.generatePalette(request);

        if (response.success) {
          setGeneratedPalette(response.data);
          if (response.detectedIndustry) {
            setDetectedIndustry(response.detectedIndustry);
          }
        } else {
          setError(response.error?.message || 'Failed to generate palette');
        }
      } else {
        // Use mock service as fallback
        console.log('Using mock service for palette generation');
        const detectedIndustry = MockService.detectIndustryFromText(description);
        if (detectedIndustry && detectedIndustry !== selectedIndustry) {
          setDetectedIndustry(detectedIndustry);
          request.industryTheme = detectedIndustry;
        }
        
        const palette = await MockService.generatePalette(request);
        setGeneratedPalette(palette);
      }
    } catch (error) {
      console.error('Palette generation failed:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate palette');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleIndustryChange = (industry: IndustryType) => {
    setSelectedIndustry(industry);
    setDetectedIndustry(null);
  };

  const downloadPalette = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Palette className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Token Generator App</h1>
        </div>
        <p className="text-gray-600">
          Generate accessible, industry-specific color palettes using AI-driven natural language inputs
        </p>
        
        {/* API Status */}
        <div className="flex items-center justify-center gap-2 text-sm">
          {apiStatus === 'checking' && (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
              <span className="text-gray-500">Checking API...</span>
            </>
          )}
          {apiStatus === 'online' && (
            <>
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-green-600">AI Service Online</span>
            </>
          )}
          {apiStatus === 'offline' && (
            <>
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span className="text-red-600">AI Service Offline (Using Mock Data)</span>
            </>
          )}
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Industry Selection */}
          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
              Industry Theme
            </label>
            <select
              id="industry"
              value={selectedIndustry}
              onChange={(e) => handleIndustryChange(e.target.value as IndustryType)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
            {detectedIndustry && (
              <p className="text-xs text-blue-600 mt-1">
                AI detected: {detectedIndustry} (overriding selection)
              </p>
            )}
          </div>

          {/* Accessibility Level */}
          <div>
            <label htmlFor="accessibility" className="block text-sm font-medium text-gray-700 mb-2">
              Accessibility Standard
            </label>
            <select
              id="accessibility"
              value={accessibilityLevel}
              onChange={(e) => setAccessibilityLevel(e.target.value as 'AA' | 'AAA')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="AA">WCAG AA (4.5:1 contrast)</option>
              <option value="AAA">WCAG AAA (7:1 contrast)</option>
            </select>
          </div>
        </div>

        {/* Natural Language Input */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Describe Your Palette
          </label>
          <div className="flex gap-2">
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., vibrant tech theme with earthy undertones, modern healthcare app with calming blues, luxury real estate with sophisticated grays"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
            />
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !description.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 h-fit"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" />
                  Generate
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Describe your desired palette in natural language. The AI will detect the industry theme and generate appropriate colors.
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </div>

      {/* Generated Palette Display */}
      {generatedPalette && (
        <div className="space-y-6">
          {/* Palette Header */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{generatedPalette.theme}</h2>
                <p className="text-gray-600 mt-1">{generatedPalette.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-gray-500">Industry:</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                    {generatedPalette.industry}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <AccessibilityBadge 
                  compliance={generatedPalette.metadata.accessibility.overallCompliance}
                  averageContrast={generatedPalette.metadata.accessibility.averageContrast}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Generated with {generatedPalette.metadata.model}
                </p>
              </div>
            </div>

            {/* Color Swatches */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {generatedPalette.colors.map((color, index) => (
                <ColorSwatch key={index} color={color} />
              ))}
            </div>
          </div>

          {/* Export Panel */}
          <ExportPanel 
            palette={generatedPalette} 
            onDownload={downloadPalette}
          />

          {/* JSON Output */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Raw JSON Output</h3>
            <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-xs font-mono text-gray-700 max-h-96 overflow-y-auto">
              {JSON.stringify(generatedPalette, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Example Prompts */}
      {!generatedPalette && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Example Prompts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Vibrant tech startup with modern blues and energetic accents',
              'Calming healthcare app with medical whites and trustworthy greens',
              'Professional finance platform with deep blues and gold accents',
              'Creative education platform with inspiring purples and warm oranges',
              'Luxury real estate with sophisticated grays and elegant greens',
              'Appetizing food delivery app with warm reds and fresh greens'
            ].map((prompt, index) => (
              <button
                key={index}
                onClick={() => setDescription(prompt)}
                className="text-left p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm text-gray-700"
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};