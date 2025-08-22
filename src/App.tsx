import React from 'react';
import { TokenList } from './components/token/TokenList';
import { ComponentPreview } from './components/preview/ComponentPreview';
import { useTokenStore } from './stores/tokenStore';

function App() {
  const { tokens, addToken } = useTokenStore();

  // Add sample tokens on first load
  React.useEffect(() => {
    if (tokens.length === 0) {
      // Add some sample tokens
      const sampleTokens = [
        {
          name: 'primary-blue',
          value: '#2563eb',
          type: 'color' as const,
          category: 'Primary' as const,
          description: 'Main brand color',
        },
        {
          name: 'spacing-md',
          value: '16px',
          type: 'spacing' as const,
          category: 'Other' as const,
          description: 'Medium spacing',
        },
        {
          name: 'text-lg',
          value: '1.125rem',
          type: 'typography' as const,
          category: 'Text' as const,
          description: 'Large text size',
        },
      ];

      sampleTokens.forEach(token => addToken(token));
    }
  }, []); // Only run once on mount

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                Design Token Studio
              </h1>
              <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                v4.0
              </span>
            </div>
            <div className="text-sm text-gray-600">
              Visual Token OS with AI Assist
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Token Management Panel */}
          <div className="space-y-6">
            <TokenList />
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <ComponentPreview />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;