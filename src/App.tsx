import React, { useState } from 'react';
import { TokenList } from './components/token/TokenList';
import { ComponentPreview } from './components/preview/ComponentPreview';
import { PaletteGenerator } from './components/ai/PaletteGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/Tabs';

function App() {
  const [activeTab, setActiveTab] = useState('generator');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                Token Generator App
              </h1>
              <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                AI-Powered v1.0
              </span>
            </div>
            <div className="text-sm text-gray-600">
              AI-Driven Color Palette Generation
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="generator">AI Palette Generator</TabsTrigger>
              <TabsTrigger value="tokens">Token Management</TabsTrigger>
              <TabsTrigger value="preview">Live Preview</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* AI Palette Generator Tab */}
          <TabsContent value="generator" className="space-y-6">
            <PaletteGenerator />
          </TabsContent>

          {/* Token Management Tab */}
          <TabsContent value="tokens" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Token Management Panel */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Design Token Management
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Manage your design tokens manually or import generated palettes from the AI Generator tab.
                  </p>
                  <TokenList />
                </div>
              </div>

              {/* Component Preview Panel */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Token Preview
                  </h2>
                  <ComponentPreview />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Live Preview Tab */}
          <TabsContent value="preview" className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Live Component Preview
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                See how your generated palettes look in real UI components.
              </p>
              <ComponentPreview />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div>
              Token Generator App - AI-powered design token creation
            </div>
            <div className="flex items-center gap-4">
              <span>WCAG AA/AAA Compliant</span>
              <span>•</span>
              <span>OKLCH Color Space</span>
              <span>•</span>
              <span>12 Industry Themes</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;