import { TokenList } from './components/token/TokenList';
import { ComponentPreview } from './components/preview/ComponentPreview';
import { ExportImport } from './components/export/ExportImport';
import { ThemeLibrary } from './components/theme/ThemeLibrary';
import { AccessibilityChecker } from './components/accessibility/AccessibilityChecker';

function App() {
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
        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-2 gap-6">
          {/* Token Management Panel */}
          <div className="xl:col-span-2 space-y-6">
            <TokenList />
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <ComponentPreview />
          </div>

          {/* Tools Panel */}
          <div className="space-y-6">
            <ThemeLibrary />
            <ExportImport />
            <AccessibilityChecker />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;