import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { GenerateResponse, IndustryTheme } from '@token-generator/shared';
import Header from './components/Header';
import ThemeSelector from './components/ThemeSelector';
import DescriptionInput from './components/DescriptionInput';
import PaletteDisplay from './components/PaletteDisplay';
import ExportSection from './components/ExportSection';
import AccessibilityInfo from './components/AccessibilityInfo';
import { api } from './services/api';

function App() {
  const [themes, setThemes] = useState<IndustryTheme[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<string>('technology');
  const [description, setDescription] = useState<string>('');
  const [palette, setPalette] = useState<GenerateResponse | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Load available themes
    api.getThemes().then(setThemes).catch(console.error);
  }, []);

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast.error('Please enter a description for your palette');
      return;
    }

    setIsGenerating(true);
    try {
      const result = await api.generatePalette({
        description,
        theme: selectedTheme,
        enforceAccessibility: true,
        accessibilityLevel: 'AA'
      });
      
      setPalette(result);
      toast.success('Palette generated successfully!');
      
      // Update selected theme if AI detected a different one
      if (result.theme !== selectedTheme) {
        setSelectedTheme(result.theme);
        toast.info(`Theme detected: ${result.theme}`);
      }
    } catch (error) {
      toast.error('Failed to generate palette. Please try again.');
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = async (format: string) => {
    if (!palette) return;

    try {
      const result = await api.exportPalette(palette.palette, format);
      
      // Create download
      const blob = new Blob([result.content], { 
        type: format === 'css' ? 'text/css' : 'application/json' 
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = result.filename;
      a.click();
      URL.revokeObjectURL(url);
      
      toast.success(`Exported as ${format.toUpperCase()}`);
    } catch (error) {
      toast.error('Export failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Input Controls */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <ThemeSelector
                themes={themes}
                selectedTheme={selectedTheme}
                onThemeChange={setSelectedTheme}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <DescriptionInput
                description={description}
                onDescriptionChange={setDescription}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
              />
            </motion.div>

            {palette && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <AccessibilityInfo accessibility={palette.accessibility} />
              </motion.div>
            )}
          </div>

          {/* Right Column - Palette Display */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {palette ? (
                <motion.div
                  key="palette"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-6"
                >
                  <PaletteDisplay palette={palette.palette} />
                  <ExportSection onExport={handleExport} />
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-xl shadow-sm p-12 text-center"
                >
                  <div className="text-gray-400 mb-4">
                    <svg className="w-24 h-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-600 mb-2">
                    No palette generated yet
                  </h3>
                  <p className="text-gray-500">
                    Describe your ideal color palette and click generate to get started
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;