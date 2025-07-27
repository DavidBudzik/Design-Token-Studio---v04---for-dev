import { create } from 'zustand';
import { Theme, ThemeTemplate, IndustryType } from '@/types/theme';

interface ThemeStore {
  currentTheme: Theme | null;
  templates: ThemeTemplate[];
  customThemes: Theme[];
  
  // Actions
  setCurrentTheme: (theme: Theme | null) => void;
  addCustomTheme: (theme: Omit<Theme, 'id' | 'createdAt'>) => void;
  updateCustomTheme: (id: string, updates: Partial<Theme>) => void;
  deleteCustomTheme: (id: string) => void;
  loadTemplates: (templates: ThemeTemplate[]) => void;
  
  // Getters
  getTemplatesByIndustry: (industry: IndustryType) => ThemeTemplate[];
  getCustomThemeById: (id: string) => Theme | undefined;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  currentTheme: null,
  templates: [],
  customThemes: [],

  setCurrentTheme: (theme) => {
    set({ currentTheme: theme });
  },

  addCustomTheme: (themeData) => {
    const newTheme: Theme = {
      ...themeData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      isCustom: true,
    };

    set((state) => ({
      customThemes: [...state.customThemes, newTheme],
    }));
  },

  updateCustomTheme: (id, updates) => {
    set((state) => ({
      customThemes: state.customThemes.map((theme) =>
        theme.id === id ? { ...theme, ...updates } : theme
      ),
    }));
  },

  deleteCustomTheme: (id) => {
    set((state) => ({
      customThemes: state.customThemes.filter((theme) => theme.id !== id),
      currentTheme: state.currentTheme?.id === id ? null : state.currentTheme,
    }));
  },

  loadTemplates: (templates) => {
    set({ templates });
  },

  getTemplatesByIndustry: (industry) => {
    return get().templates.filter((template) => template.industry === industry);
  },

  getCustomThemeById: (id) => {
    return get().customThemes.find((theme) => theme.id === id);
  },
}));