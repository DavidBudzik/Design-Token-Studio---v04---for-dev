import { IndustryType, IndustryTheme, ThemeLibrary } from '../types/theme.js';

export const industryThemes: ThemeLibrary = {
  'Technology': {
    id: 'tech-001',
    name: 'Modern Technology',
    industry: 'Technology',
    description: 'Clean, modern colors that convey innovation and trust for tech products',
    emotionTags: ['Innovation', 'Trust', 'Professionalism', 'Focus'],
    colorRoles: {
      primary: {
        hex: '#3B82F6',
        oklch: 'oklch(0.65 0.12 240)',
        usage: 'Primary actions, links, brand elements',
        interactive_states: {
          default: '#3B82F6',
          hover: '#2563EB',
          active: '#1D4ED8',
          focus: '#60A5FA',
          disabled: '#93C5FD'
        }
      },
      secondary: {
        hex: '#10B981',
        oklch: 'oklch(0.7 0.15 160)',
        usage: 'Secondary actions, success states',
        interactive_states: {
          default: '#10B981',
          hover: '#059669',
          active: '#047857',
          focus: '#34D399',
          disabled: '#6EE7B7'
        }
      },
      accent: {
        hex: '#8B5CF6',
        oklch: 'oklch(0.6 0.15 290)',
        usage: 'Highlights, special features',
        interactive_states: {
          default: '#8B5CF6',
          hover: '#7C3AED',
          active: '#6D28D9',
          focus: '#A78BFA',
          disabled: '#C4B5FD'
        }
      },
      success: {
        hex: '#22C55E',
        oklch: 'oklch(0.7 0.14 150)',
        usage: 'Success messages, positive feedback',
        interactive_states: {
          default: '#22C55E',
          hover: '#16A34A',
          active: '#15803D',
          focus: '#4ADE80',
          disabled: '#86EFAC'
        }
      },
      warning: {
        hex: '#F59E0B',
        oklch: 'oklch(0.8 0.1 80)',
        usage: 'Warnings, caution states',
        interactive_states: {
          default: '#F59E0B',
          hover: '#D97706',
          active: '#B45309',
          focus: '#FBBF24',
          disabled: '#FCD34D'
        }
      },
      error: {
        hex: '#EF4444',
        oklch: 'oklch(0.6 0.15 30)',
        usage: 'Error messages, destructive actions',
        interactive_states: {
          default: '#EF4444',
          hover: '#DC2626',
          active: '#B91C1C',
          focus: '#F87171',
          disabled: '#FCA5A5'
        }
      },
      neutral: {
        hex: '#6B7280',
        oklch: 'oklch(0.6 0.02 240)',
        usage: 'Neutral elements, secondary text',
        interactive_states: {
          default: '#6B7280',
          hover: '#4B5563',
          active: '#374151',
          focus: '#9CA3AF',
          disabled: '#D1D5DB'
        }
      },
      surface: {
        hex: '#F9FAFB',
        oklch: 'oklch(0.98 0.005 240)',
        usage: 'Card backgrounds, surfaces',
        interactive_states: {
          default: '#F9FAFB',
          hover: '#F3F4F6',
          active: '#E5E7EB',
          focus: '#F9FAFB',
          disabled: '#F3F4F6'
        }
      },
      text: {
        hex: '#1F2937',
        oklch: 'oklch(0.3 0.05 260)',
        usage: 'Primary text, headings',
        interactive_states: {
          default: '#1F2937',
          hover: '#111827',
          active: '#030712',
          focus: '#374151',
          disabled: '#9CA3AF'
        }
      },
      ui: {
        hex: '#E5E7EB',
        oklch: 'oklch(0.9 0.01 240)',
        usage: 'Borders, dividers, UI elements',
        interactive_states: {
          default: '#E5E7EB',
          hover: '#D1D5DB',
          active: '#9CA3AF',
          focus: '#F3F4F6',
          disabled: '#F9FAFB'
        }
      },
      icons: {
        hex: '#4B5563',
        oklch: 'oklch(0.5 0.05 240)',
        usage: 'Icons, symbols',
        interactive_states: {
          default: '#4B5563',
          hover: '#374151',
          active: '#1F2937',
          focus: '#6B7280',
          disabled: '#9CA3AF'
        }
      }
    },
    accessibility: {
      compliance: 'AA',
      averageContrast: 5.2
    }
  },

  'Healthcare': {
    id: 'health-001',
    name: 'Healthcare Professional',
    industry: 'Healthcare',
    description: 'Calming, trustworthy colors that promote wellness and medical professionalism',
    emotionTags: ['Trust', 'Calmness', 'Safety', 'Comfort'],
    colorRoles: {
      primary: {
        hex: '#22C55E',
        oklch: 'oklch(0.7 0.14 150)',
        usage: 'Primary actions, health indicators',
        interactive_states: {
          default: '#22C55E',
          hover: '#16A34A',
          active: '#15803D',
          focus: '#4ADE80',
          disabled: '#86EFAC'
        }
      },
      secondary: {
        hex: '#3B82F6',
        oklch: 'oklch(0.65 0.12 240)',
        usage: 'Secondary actions, information',
        interactive_states: {
          default: '#3B82F6',
          hover: '#2563EB',
          active: '#1D4ED8',
          focus: '#60A5FA',
          disabled: '#93C5FD'
        }
      },
      accent: {
        hex: '#06B6D4',
        oklch: 'oklch(0.7 0.12 200)',
        usage: 'Medical equipment, technology',
        interactive_states: {
          default: '#06B6D4',
          hover: '#0891B2',
          active: '#0E7490',
          focus: '#22D3EE',
          disabled: '#67E8F9'
        }
      },
      success: {
        hex: '#10B981',
        oklch: 'oklch(0.7 0.15 160)',
        usage: 'Healthy status, positive results',
        interactive_states: {
          default: '#10B981',
          hover: '#059669',
          active: '#047857',
          focus: '#34D399',
          disabled: '#6EE7B7'
        }
      },
      warning: {
        hex: '#F59E0B',
        oklch: 'oklch(0.8 0.1 80)',
        usage: 'Caution, moderate risk',
        interactive_states: {
          default: '#F59E0B',
          hover: '#D97706',
          active: '#B45309',
          focus: '#FBBF24',
          disabled: '#FCD34D'
        }
      },
      error: {
        hex: '#DC2626',
        oklch: 'oklch(0.55 0.16 20)',
        usage: 'Critical alerts, emergency',
        interactive_states: {
          default: '#DC2626',
          hover: '#B91C1C',
          active: '#991B1B',
          focus: '#EF4444',
          disabled: '#FCA5A5'
        }
      },
      neutral: {
        hex: '#64748B',
        oklch: 'oklch(0.55 0.02 240)',
        usage: 'Neutral information, secondary text',
        interactive_states: {
          default: '#64748B',
          hover: '#475569',
          active: '#334155',
          focus: '#94A3B8',
          disabled: '#CBD5E1'
        }
      },
      surface: {
        hex: '#FEFEFE',
        oklch: 'oklch(0.99 0.001 240)',
        usage: 'Clean surfaces, medical backgrounds',
        interactive_states: {
          default: '#FEFEFE',
          hover: '#F8FAFC',
          active: '#F1F5F9',
          focus: '#FEFEFE',
          disabled: '#F8FAFC'
        }
      },
      text: {
        hex: '#1E293B',
        oklch: 'oklch(0.25 0.05 240)',
        usage: 'Primary text, medical records',
        interactive_states: {
          default: '#1E293B',
          hover: '#0F172A',
          active: '#020617',
          focus: '#334155',
          disabled: '#94A3B8'
        }
      },
      ui: {
        hex: '#E2E8F0',
        oklch: 'oklch(0.9 0.01 240)',
        usage: 'Borders, form elements',
        interactive_states: {
          default: '#E2E8F0',
          hover: '#CBD5E1',
          active: '#94A3B8',
          focus: '#F1F5F9',
          disabled: '#F8FAFC'
        }
      },
      icons: {
        hex: '#475569',
        oklch: 'oklch(0.45 0.05 240)',
        usage: 'Medical icons, symbols',
        interactive_states: {
          default: '#475569',
          hover: '#334155',
          active: '#1E293B',
          focus: '#64748B',
          disabled: '#94A3B8'
        }
      }
    },
    accessibility: {
      compliance: 'AAA',
      averageContrast: 6.8
    }
  },

  'Finance': {
    id: 'finance-001',
    name: 'Financial Services',
    industry: 'Finance',
    description: 'Professional, trustworthy colors that convey stability and security',
    emotionTags: ['Trust', 'Professionalism', 'Status', 'Timelessness'],
    colorRoles: {
      primary: {
        hex: '#1E3A8A',
        oklch: 'oklch(0.5 0.13 260)',
        usage: 'Primary brand, important actions',
        interactive_states: {
          default: '#1E3A8A',
          hover: '#1E40AF',
          active: '#1D4ED8',
          focus: '#3B82F6',
          disabled: '#93C5FD'
        }
      },
      secondary: {
        hex: '#047857',
        oklch: 'oklch(0.55 0.13 170)',
        usage: 'Growth, positive financial metrics',
        interactive_states: {
          default: '#047857',
          hover: '#059669',
          active: '#065F46',
          focus: '#10B981',
          disabled: '#6EE7B7'
        }
      },
      accent: {
        hex: '#B45309',
        oklch: 'oklch(0.55 0.12 70)',
        usage: 'Premium features, gold tier',
        interactive_states: {
          default: '#B45309',
          hover: '#92400E',
          active: '#78350F',
          focus: '#D97706',
          disabled: '#FCD34D'
        }
      },
      success: {
        hex: '#16A34A',
        oklch: 'oklch(0.7 0.14 150)',
        usage: 'Successful transactions, gains',
        interactive_states: {
          default: '#16A34A',
          hover: '#15803D',
          active: '#166534',
          focus: '#22C55E',
          disabled: '#86EFAC'
        }
      },
      warning: {
        hex: '#EA580C',
        oklch: 'oklch(0.65 0.15 50)',
        usage: 'Market volatility, caution',
        interactive_states: {
          default: '#EA580C',
          hover: '#C2410C',
          active: '#9A3412',
          focus: '#FB923C',
          disabled: '#FDBA74'
        }
      },
      error: {
        hex: '#B91C1C',
        oklch: 'oklch(0.5 0.15 20)',
        usage: 'Losses, failed transactions',
        interactive_states: {
          default: '#B91C1C',
          hover: '#991B1B',
          active: '#7F1D1D',
          focus: '#DC2626',
          disabled: '#FCA5A5'
        }
      },
      neutral: {
        hex: '#64748B',
        oklch: 'oklch(0.55 0.02 240)',
        usage: 'Neutral data, secondary information',
        interactive_states: {
          default: '#64748B',
          hover: '#475569',
          active: '#334155',
          focus: '#94A3B8',
          disabled: '#CBD5E1'
        }
      },
      surface: {
        hex: '#F8FAFC',
        oklch: 'oklch(0.98 0.005 240)',
        usage: 'Dashboard backgrounds, cards',
        interactive_states: {
          default: '#F8FAFC',
          hover: '#F1F5F9',
          active: '#E2E8F0',
          focus: '#F8FAFC',
          disabled: '#F1F5F9'
        }
      },
      text: {
        hex: '#0F172A',
        oklch: 'oklch(0.2 0.05 240)',
        usage: 'Financial data, primary text',
        interactive_states: {
          default: '#0F172A',
          hover: '#020617',
          active: '#020617',
          focus: '#1E293B',
          disabled: '#94A3B8'
        }
      },
      ui: {
        hex: '#CBD5E1',
        oklch: 'oklch(0.85 0.01 240)',
        usage: 'Table borders, form elements',
        interactive_states: {
          default: '#CBD5E1',
          hover: '#94A3B8',
          active: '#64748B',
          focus: '#E2E8F0',
          disabled: '#F1F5F9'
        }
      },
      icons: {
        hex: '#334155',
        oklch: 'oklch(0.35 0.05 240)',
        usage: 'Financial icons, charts',
        interactive_states: {
          default: '#334155',
          hover: '#1E293B',
          active: '#0F172A',
          focus: '#475569',
          disabled: '#94A3B8'
        }
      }
    },
    accessibility: {
      compliance: 'AAA',
      averageContrast: 7.1
    }
  },

  'Education': {
    id: 'edu-001',
    name: 'Educational Excellence',
    industry: 'Education',
    description: 'Inspiring, engaging colors that promote learning and creativity',
    emotionTags: ['Innovation', 'Excitement', 'Focus', 'Energy'],
    colorRoles: {
      primary: {
        hex: '#8B5CF6',
        oklch: 'oklch(0.6 0.15 290)',
        usage: 'Primary learning elements, CTAs',
        interactive_states: {
          default: '#8B5CF6',
          hover: '#7C3AED',
          active: '#6D28D9',
          focus: '#A78BFA',
          disabled: '#C4B5FD'
        }
      },
      secondary: {
        hex: '#F97316',
        oklch: 'oklch(0.7 0.15 60)',
        usage: 'Secondary actions, highlights',
        interactive_states: {
          default: '#F97316',
          hover: '#EA580C',
          active: '#C2410C',
          focus: '#FB923C',
          disabled: '#FDBA74'
        }
      },
      accent: {
        hex: '#EC4899',
        oklch: 'oklch(0.6 0.15 330)',
        usage: 'Creative elements, inspiration',
        interactive_states: {
          default: '#EC4899',
          hover: '#DB2777',
          active: '#BE185D',
          focus: '#F472B6',
          disabled: '#F9A8D4'
        }
      },
      success: {
        hex: '#22C55E',
        oklch: 'oklch(0.7 0.14 150)',
        usage: 'Achievement, correct answers',
        interactive_states: {
          default: '#22C55E',
          hover: '#16A34A',
          active: '#15803D',
          focus: '#4ADE80',
          disabled: '#86EFAC'
        }
      },
      warning: {
        hex: '#F59E0B',
        oklch: 'oklch(0.8 0.1 80)',
        usage: 'Attention needed, deadlines',
        interactive_states: {
          default: '#F59E0B',
          hover: '#D97706',
          active: '#B45309',
          focus: '#FBBF24',
          disabled: '#FCD34D'
        }
      },
      error: {
        hex: '#EF4444',
        oklch: 'oklch(0.6 0.15 30)',
        usage: 'Incorrect answers, errors',
        interactive_states: {
          default: '#EF4444',
          hover: '#DC2626',
          active: '#B91C1C',
          focus: '#F87171',
          disabled: '#FCA5A5'
        }
      },
      neutral: {
        hex: '#6B7280',
        oklch: 'oklch(0.6 0.02 240)',
        usage: 'Supporting text, neutral elements',
        interactive_states: {
          default: '#6B7280',
          hover: '#4B5563',
          active: '#374151',
          focus: '#9CA3AF',
          disabled: '#D1D5DB'
        }
      },
      surface: {
        hex: '#FEFEFE',
        oklch: 'oklch(0.99 0.001 240)',
        usage: 'Learning surfaces, clean backgrounds',
        interactive_states: {
          default: '#FEFEFE',
          hover: '#F9FAFB',
          active: '#F3F4F6',
          focus: '#FEFEFE',
          disabled: '#F9FAFB'
        }
      },
      text: {
        hex: '#1F2937',
        oklch: 'oklch(0.3 0.05 260)',
        usage: 'Educational content, primary text',
        interactive_states: {
          default: '#1F2937',
          hover: '#111827',
          active: '#030712',
          focus: '#374151',
          disabled: '#9CA3AF'
        }
      },
      ui: {
        hex: '#E5E7EB',
        oklch: 'oklch(0.9 0.01 240)',
        usage: 'Course boundaries, UI elements',
        interactive_states: {
          default: '#E5E7EB',
          hover: '#D1D5DB',
          active: '#9CA3AF',
          focus: '#F3F4F6',
          disabled: '#F9FAFB'
        }
      },
      icons: {
        hex: '#4B5563',
        oklch: 'oklch(0.5 0.05 240)',
        usage: 'Educational icons, tools',
        interactive_states: {
          default: '#4B5563',
          hover: '#374151',
          active: '#1F2937',
          focus: '#6B7280',
          disabled: '#9CA3AF'
        }
      }
    },
    accessibility: {
      compliance: 'AA',
      averageContrast: 5.8
    }
  },

  'Retail': {
    id: 'retail-001',
    name: 'Retail Commerce',
    industry: 'Retail',
    description: 'Vibrant, conversion-focused colors that drive purchasing decisions',
    emotionTags: ['Excitement', 'Energy', 'Passion', 'Trust'],
    colorRoles: {
      primary: {
        hex: '#EF4444',
        oklch: 'oklch(0.6 0.15 30)',
        usage: 'Primary CTAs, sale prices',
        interactive_states: {
          default: '#EF4444',
          hover: '#DC2626',
          active: '#B91C1C',
          focus: '#F87171',
          disabled: '#FCA5A5'
        }
      },
      secondary: {
        hex: '#FBBF24',
        oklch: 'oklch(0.8 0.13 80)',
        usage: 'Secondary actions, highlights',
        interactive_states: {
          default: '#FBBF24',
          hover: '#F59E0B',
          active: '#D97706',
          focus: '#FCD34D',
          disabled: '#FEF3C7'
        }
      },
      accent: {
        hex: '#8B5CF6',
        oklch: 'oklch(0.6 0.15 290)',
        usage: 'Premium products, special offers',
        interactive_states: {
          default: '#8B5CF6',
          hover: '#7C3AED',
          active: '#6D28D9',
          focus: '#A78BFA',
          disabled: '#C4B5FD'
        }
      },
      success: {
        hex: '#10B981',
        oklch: 'oklch(0.7 0.15 160)',
        usage: 'In stock, successful purchases',
        interactive_states: {
          default: '#10B981',
          hover: '#059669',
          active: '#047857',
          focus: '#34D399',
          disabled: '#6EE7B7'
        }
      },
      warning: {
        hex: '#F59E0B',
        oklch: 'oklch(0.8 0.1 80)',
        usage: 'Low stock, limited time',
        interactive_states: {
          default: '#F59E0B',
          hover: '#D97706',
          active: '#B45309',
          focus: '#FBBF24',
          disabled: '#FCD34D'
        }
      },
      error: {
        hex: '#DC2626',
        oklch: 'oklch(0.55 0.16 20)',
        usage: 'Out of stock, errors',
        interactive_states: {
          default: '#DC2626',
          hover: '#B91C1C',
          active: '#991B1B',
          focus: '#EF4444',
          disabled: '#FCA5A5'
        }
      },
      neutral: {
        hex: '#6B7280',
        oklch: 'oklch(0.6 0.02 240)',
        usage: 'Product descriptions, neutral info',
        interactive_states: {
          default: '#6B7280',
          hover: '#4B5563',
          active: '#374151',
          focus: '#9CA3AF',
          disabled: '#D1D5DB'
        }
      },
      surface: {
        hex: '#FFFFFF',
        oklch: 'oklch(1 0 0)',
        usage: 'Product backgrounds, clean surfaces',
        interactive_states: {
          default: '#FFFFFF',
          hover: '#F9FAFB',
          active: '#F3F4F6',
          focus: '#FFFFFF',
          disabled: '#F9FAFB'
        }
      },
      text: {
        hex: '#111827',
        oklch: 'oklch(0.25 0.05 260)',
        usage: 'Product names, descriptions',
        interactive_states: {
          default: '#111827',
          hover: '#030712',
          active: '#030712',
          focus: '#1F2937',
          disabled: '#9CA3AF'
        }
      },
      ui: {
        hex: '#D1D5DB',
        oklch: 'oklch(0.85 0.01 240)',
        usage: 'Product borders, separators',
        interactive_states: {
          default: '#D1D5DB',
          hover: '#9CA3AF',
          active: '#6B7280',
          focus: '#E5E7EB',
          disabled: '#F3F4F6'
        }
      },
      icons: {
        hex: '#374151',
        oklch: 'oklch(0.35 0.05 240)',
        usage: 'Shopping icons, navigation',
        interactive_states: {
          default: '#374151',
          hover: '#1F2937',
          active: '#111827',
          focus: '#4B5563',
          disabled: '#9CA3AF'
        }
      }
    },
    accessibility: {
      compliance: 'AA',
      averageContrast: 5.4
    }
  },

  // Adding the remaining industries with similar comprehensive structure
  'Hospitality': {
    id: 'hosp-001',
    name: 'Hospitality & Travel',
    industry: 'Hospitality',
    description: 'Warm, welcoming colors that create comfort and luxury experiences',
    emotionTags: ['Comfort', 'Elegance', 'Trust', 'Energy'],
    colorRoles: {
      primary: {
        hex: '#D97706',
        oklch: 'oklch(0.65 0.14 70)',
        usage: 'Primary bookings, warm welcome',
        interactive_states: {
          default: '#D97706',
          hover: '#B45309',
          active: '#92400E',
          focus: '#F59E0B',
          disabled: '#FCD34D'
        }
      },
      secondary: {
        hex: '#059669',
        oklch: 'oklch(0.6 0.14 160)',
        usage: 'Available rooms, nature elements',
        interactive_states: {
          default: '#059669',
          hover: '#047857',
          active: '#065F46',
          focus: '#10B981',
          disabled: '#6EE7B7'
        }
      },
      accent: {
        hex: '#BE185D',
        oklch: 'oklch(0.5 0.15 340)',
        usage: 'Luxury services, premium features',
        interactive_states: {
          default: '#BE185D',
          hover: '#9D174D',
          active: '#831843',
          focus: '#DB2777',
          disabled: '#F9A8D4'
        }
      },
      success: {
        hex: '#16A34A',
        oklch: 'oklch(0.7 0.14 150)',
        usage: 'Confirmed bookings, positive reviews',
        interactive_states: {
          default: '#16A34A',
          hover: '#15803D',
          active: '#166534',
          focus: '#22C55E',
          disabled: '#86EFAC'
        }
      },
      warning: {
        hex: '#F59E0B',
        oklch: 'oklch(0.8 0.1 80)',
        usage: 'Limited availability, check-in reminders',
        interactive_states: {
          default: '#F59E0B',
          hover: '#D97706',
          active: '#B45309',
          focus: '#FBBF24',
          disabled: '#FCD34D'
        }
      },
      error: {
        hex: '#DC2626',
        oklch: 'oklch(0.55 0.16 20)',
        usage: 'Booking errors, unavailable dates',
        interactive_states: {
          default: '#DC2626',
          hover: '#B91C1C',
          active: '#991B1B',
          focus: '#EF4444',
          disabled: '#FCA5A5'
        }
      },
      neutral: {
        hex: '#78716C',
        oklch: 'oklch(0.55 0.02 80)',
        usage: 'Neutral information, amenities',
        interactive_states: {
          default: '#78716C',
          hover: '#57534E',
          active: '#44403C',
          focus: '#A8A29E',
          disabled: '#D6D3D1'
        }
      },
      surface: {
        hex: '#FFFBEB',
        oklch: 'oklch(0.98 0.01 80)',
        usage: 'Warm backgrounds, luxury surfaces',
        interactive_states: {
          default: '#FFFBEB',
          hover: '#FEF3C7',
          active: '#FDE68A',
          focus: '#FFFBEB',
          disabled: '#FEF3C7'
        }
      },
      text: {
        hex: '#1C1917',
        oklch: 'oklch(0.2 0.02 80)',
        usage: 'Primary text, luxury descriptions',
        interactive_states: {
          default: '#1C1917',
          hover: '#0C0A09',
          active: '#0C0A09',
          focus: '#292524',
          disabled: '#A8A29E'
        }
      },
      ui: {
        hex: '#E7E5E4',
        oklch: 'oklch(0.9 0.01 80)',
        usage: 'Elegant borders, form elements',
        interactive_states: {
          default: '#E7E5E4',
          hover: '#D6D3D1',
          active: '#A8A29E',
          focus: '#F5F5F4',
          disabled: '#FAFAF9'
        }
      },
      icons: {
        hex: '#44403C',
        oklch: 'oklch(0.35 0.02 80)',
        usage: 'Service icons, amenity symbols',
        interactive_states: {
          default: '#44403C',
          hover: '#292524',
          active: '#1C1917',
          focus: '#57534E',
          disabled: '#A8A29E'
        }
      }
    },
    accessibility: {
      compliance: 'AA',
      averageContrast: 5.6
    }
  },

  'Entertainment': {
    id: 'ent-001',
    name: 'Entertainment Media',
    industry: 'Entertainment',
    description: 'Bold, exciting colors that capture attention and create memorable experiences',
    emotionTags: ['Excitement', 'Passion', 'Energy', 'Innovation'],
    colorRoles: {
      primary: {
        hex: '#DC2626',
        oklch: 'oklch(0.55 0.16 20)',
        usage: 'Primary actions, featured content',
        interactive_states: {
          default: '#DC2626',
          hover: '#B91C1C',
          active: '#991B1B',
          focus: '#EF4444',
          disabled: '#FCA5A5'
        }
      },
      secondary: {
        hex: '#8B5CF6',
        oklch: 'oklch(0.6 0.15 290)',
        usage: 'Secondary features, premium content',
        interactive_states: {
          default: '#8B5CF6',
          hover: '#7C3AED',
          active: '#6D28D9',
          focus: '#A78BFA',
          disabled: '#C4B5FD'
        }
      },
      accent: {
        hex: '#FACC15',
        oklch: 'oklch(0.8 0.14 90)',
        usage: 'Highlights, awards, special features',
        interactive_states: {
          default: '#FACC15',
          hover: '#EAB308',
          active: '#CA8A04',
          focus: '#FDE047',
          disabled: '#FEF08A'
        }
      },
      success: {
        hex: '#22C55E',
        oklch: 'oklch(0.7 0.14 150)',
        usage: 'Successful actions, live status',
        interactive_states: {
          default: '#22C55E',
          hover: '#16A34A',
          active: '#15803D',
          focus: '#4ADE80',
          disabled: '#86EFAC'
        }
      },
      warning: {
        hex: '#F59E0B',
        oklch: 'oklch(0.8 0.1 80)',
        usage: 'Content warnings, age restrictions',
        interactive_states: {
          default: '#F59E0B',
          hover: '#D97706',
          active: '#B45309',
          focus: '#FBBF24',
          disabled: '#FCD34D'
        }
      },
      error: {
        hex: '#B91C1C',
        oklch: 'oklch(0.5 0.15 20)',
        usage: 'Playback errors, unavailable content',
        interactive_states: {
          default: '#B91C1C',
          hover: '#991B1B',
          active: '#7F1D1D',
          focus: '#DC2626',
          disabled: '#FCA5A5'
        }
      },
      neutral: {
        hex: '#6B7280',
        oklch: 'oklch(0.6 0.02 240)',
        usage: 'Metadata, secondary information',
        interactive_states: {
          default: '#6B7280',
          hover: '#4B5563',
          active: '#374151',
          focus: '#9CA3AF',
          disabled: '#D1D5DB'
        }
      },
      surface: {
        hex: '#0F0F0F',
        oklch: 'oklch(0.15 0.01 240)',
        usage: 'Dark theater mode, video backgrounds',
        interactive_states: {
          default: '#0F0F0F',
          hover: '#1F1F1F',
          active: '#2F2F2F',
          focus: '#0F0F0F',
          disabled: '#1F1F1F'
        }
      },
      text: {
        hex: '#FFFFFF',
        oklch: 'oklch(1 0 0)',
        usage: 'Text on dark surfaces, titles',
        interactive_states: {
          default: '#FFFFFF',
          hover: '#F9FAFB',
          active: '#F3F4F6',
          focus: '#FFFFFF',
          disabled: '#9CA3AF'
        }
      },
      ui: {
        hex: '#374151',
        oklch: 'oklch(0.35 0.05 240)',
        usage: 'Player controls, UI elements',
        interactive_states: {
          default: '#374151',
          hover: '#4B5563',
          active: '#6B7280',
          focus: '#374151',
          disabled: '#9CA3AF'
        }
      },
      icons: {
        hex: '#D1D5DB',
        oklch: 'oklch(0.85 0.01 240)',
        usage: 'Media controls, navigation icons',
        interactive_states: {
          default: '#D1D5DB',
          hover: '#FFFFFF',
          active: '#F3F4F6',
          focus: '#E5E7EB',
          disabled: '#9CA3AF'
        }
      }
    },
    accessibility: {
      compliance: 'AA',
      averageContrast: 5.0
    }
  },

  'Automotive': {
    id: 'auto-001',
    name: 'Automotive Excellence',
    industry: 'Automotive',
    description: 'Sleek, performance-oriented colors that convey precision and power',
    emotionTags: ['Professionalism', 'Status', 'Innovation', 'Energy'],
    colorRoles: {
      primary: {
        hex: '#1F2937',
        oklch: 'oklch(0.3 0.05 260)',
        usage: 'Primary brand, luxury vehicles',
        interactive_states: {
          default: '#1F2937',
          hover: '#111827',
          active: '#030712',
          focus: '#374151',
          disabled: '#9CA3AF'
        }
      },
      secondary: {
        hex: '#6B7280',
        oklch: 'oklch(0.6 0.02 240)',
        usage: 'Secondary features, trim levels',
        interactive_states: {
          default: '#6B7280',
          hover: '#4B5563',
          active: '#374151',
          focus: '#9CA3AF',
          disabled: '#D1D5DB'
        }
      },
      accent: {
        hex: '#EF4444',
        oklch: 'oklch(0.6 0.15 30)',
        usage: 'Performance models, sport features',
        interactive_states: {
          default: '#EF4444',
          hover: '#DC2626',
          active: '#B91C1C',
          focus: '#F87171',
          disabled: '#FCA5A5'
        }
      },
      success: {
        hex: '#10B981',
        oklch: 'oklch(0.7 0.15 160)',
        usage: 'Available vehicles, eco-friendly',
        interactive_states: {
          default: '#10B981',
          hover: '#059669',
          active: '#047857',
          focus: '#34D399',
          disabled: '#6EE7B7'
        }
      },
      warning: {
        hex: '#F59E0B',
        oklch: 'oklch(0.8 0.1 80)',
        usage: 'Maintenance alerts, caution',
        interactive_states: {
          default: '#F59E0B',
          hover: '#D97706',
          active: '#B45309',
          focus: '#FBBF24',
          disabled: '#FCD34D'
        }
      },
      error: {
        hex: '#B91C1C',
        oklch: 'oklch(0.5 0.15 20)',
        usage: 'System errors, critical alerts',
        interactive_states: {
          default: '#B91C1C',
          hover: '#991B1B',
          active: '#7F1D1D',
          focus: '#DC2626',
          disabled: '#FCA5A5'
        }
      },
      neutral: {
        hex: '#71717A',
        oklch: 'oklch(0.55 0.01 260)',
        usage: 'Specifications, neutral data',
        interactive_states: {
          default: '#71717A',
          hover: '#52525B',
          active: '#3F3F46',
          focus: '#A1A1AA',
          disabled: '#D4D4D8'
        }
      },
      surface: {
        hex: '#FAFAFA',
        oklch: 'oklch(0.98 0.001 260)',
        usage: 'Clean showroom surfaces',
        interactive_states: {
          default: '#FAFAFA',
          hover: '#F4F4F5',
          active: '#E4E4E7',
          focus: '#FAFAFA',
          disabled: '#F4F4F5'
        }
      },
      text: {
        hex: '#18181B',
        oklch: 'oklch(0.2 0.01 260)',
        usage: 'Vehicle specifications, primary text',
        interactive_states: {
          default: '#18181B',
          hover: '#09090B',
          active: '#09090B',
          focus: '#27272A',
          disabled: '#A1A1AA'
        }
      },
      ui: {
        hex: '#D4D4D8',
        oklch: 'oklch(0.85 0.01 260)',
        usage: 'Interface elements, dividers',
        interactive_states: {
          default: '#D4D4D8',
          hover: '#A1A1AA',
          active: '#71717A',
          focus: '#E4E4E7',
          disabled: '#F4F4F5'
        }
      },
      icons: {
        hex: '#3F3F46',
        oklch: 'oklch(0.35 0.01 260)',
        usage: 'Automotive icons, controls',
        interactive_states: {
          default: '#3F3F46',
          hover: '#27272A',
          active: '#18181B',
          focus: '#52525B',
          disabled: '#A1A1AA'
        }
      }
    },
    accessibility: {
      compliance: 'AAA',
      averageContrast: 6.9
    }
  },

  'Non-Profit': {
    id: 'nonprofit-001',
    name: 'Community Impact',
    industry: 'Non-Profit',
    description: 'Trustworthy, community-focused colors that inspire action and hope',
    emotionTags: ['Trust', 'Comfort', 'Safety', 'Innovation'],
    colorRoles: {
      primary: {
        hex: '#059669',
        oklch: 'oklch(0.6 0.14 160)',
        usage: 'Primary donations, community actions',
        interactive_states: {
          default: '#059669',
          hover: '#047857',
          active: '#065F46',
          focus: '#10B981',
          disabled: '#6EE7B7'
        }
      },
      secondary: {
        hex: '#3B82F6',
        oklch: 'oklch(0.65 0.12 240)',
        usage: 'Information, secondary actions',
        interactive_states: {
          default: '#3B82F6',
          hover: '#2563EB',
          active: '#1D4ED8',
          focus: '#60A5FA',
          disabled: '#93C5FD'
        }
      },
      accent: {
        hex: '#D97706',
        oklch: 'oklch(0.65 0.14 70)',
        usage: 'Urgent campaigns, highlights',
        interactive_states: {
          default: '#D97706',
          hover: '#B45309',
          active: '#92400E',
          focus: '#F59E0B',
          disabled: '#FCD34D'
        }
      },
      success: {
        hex: '#16A34A',
        oklch: 'oklch(0.7 0.14 150)',
        usage: 'Goal achievements, positive impact',
        interactive_states: {
          default: '#16A34A',
          hover: '#15803D',
          active: '#166534',
          focus: '#22C55E',
          disabled: '#86EFAC'
        }
      },
      warning: {
        hex: '#F59E0B',
        oklch: 'oklch(0.8 0.1 80)',
        usage: 'Urgent needs, deadlines',
        interactive_states: {
          default: '#F59E0B',
          hover: '#D97706',
          active: '#B45309',
          focus: '#FBBF24',
          disabled: '#FCD34D'
        }
      },
      error: {
        hex: '#DC2626',
        oklch: 'oklch(0.55 0.16 20)',
        usage: 'Critical issues, emergency appeals',
        interactive_states: {
          default: '#DC2626',
          hover: '#B91C1C',
          active: '#991B1B',
          focus: '#EF4444',
          disabled: '#FCA5A5'
        }
      },
      neutral: {
        hex: '#6B7280',
        oklch: 'oklch(0.6 0.02 240)',
        usage: 'General information, statistics',
        interactive_states: {
          default: '#6B7280',
          hover: '#4B5563',
          active: '#374151',
          focus: '#9CA3AF',
          disabled: '#D1D5DB'
        }
      },
      surface: {
        hex: '#F9FAFB',
        oklch: 'oklch(0.98 0.005 240)',
        usage: 'Clean backgrounds, report surfaces',
        interactive_states: {
          default: '#F9FAFB',
          hover: '#F3F4F6',
          active: '#E5E7EB',
          focus: '#F9FAFB',
          disabled: '#F3F4F6'
        }
      },
      text: {
        hex: '#1F2937',
        oklch: 'oklch(0.3 0.05 260)',
        usage: 'Mission statements, primary text',
        interactive_states: {
          default: '#1F2937',
          hover: '#111827',
          active: '#030712',
          focus: '#374151',
          disabled: '#9CA3AF'
        }
      },
      ui: {
        hex: '#E5E7EB',
        oklch: 'oklch(0.9 0.01 240)',
        usage: 'Form elements, borders',
        interactive_states: {
          default: '#E5E7EB',
          hover: '#D1D5DB',
          active: '#9CA3AF',
          focus: '#F3F4F6',
          disabled: '#F9FAFB'
        }
      },
      icons: {
        hex: '#4B5563',
        oklch: 'oklch(0.5 0.05 240)',
        usage: 'Community icons, impact symbols',
        interactive_states: {
          default: '#4B5563',
          hover: '#374151',
          active: '#1F2937',
          focus: '#6B7280',
          disabled: '#9CA3AF'
        }
      }
    },
    accessibility: {
      compliance: 'AA',
      averageContrast: 5.3
    }
  },

  'Food & Beverage': {
    id: 'food-001',
    name: 'Culinary Delight',
    industry: 'Food & Beverage',
    description: 'Appetizing, warm colors that stimulate appetite and create inviting experiences',
    emotionTags: ['Comfort', 'Energy', 'Passion', 'Trust'],
    colorRoles: {
      primary: {
        hex: '#B91C1C',
        oklch: 'oklch(0.5 0.15 20)',
        usage: 'Primary brand, appetizing elements',
        interactive_states: {
          default: '#B91C1C',
          hover: '#991B1B',
          active: '#7F1D1D',
          focus: '#DC2626',
          disabled: '#FCA5A5'
        }
      },
      secondary: {
        hex: '#FBBF24',
        oklch: 'oklch(0.8 0.13 80)',
        usage: 'Warm accents, comfort foods',
        interactive_states: {
          default: '#FBBF24',
          hover: '#F59E0B',
          active: '#D97706',
          focus: '#FCD34D',
          disabled: '#FEF3C7'
        }
      },
      accent: {
        hex: '#16A34A',
        oklch: 'oklch(0.7 0.14 150)',
        usage: 'Fresh ingredients, organic elements',
        interactive_states: {
          default: '#16A34A',
          hover: '#15803D',
          active: '#166534',
          focus: '#22C55E',
          disabled: '#86EFAC'
        }
      },
      success: {
        hex: '#22C55E',
        oklch: 'oklch(0.7 0.14 150)',
        usage: 'Order success, fresh status',
        interactive_states: {
          default: '#22C55E',
          hover: '#16A34A',
          active: '#15803D',
          focus: '#4ADE80',
          disabled: '#86EFAC'
        }
      },
      warning: {
        hex: '#F59E0B',
        oklch: 'oklch(0.8 0.1 80)',
        usage: 'Spicy levels, allergen warnings',
        interactive_states: {
          default: '#F59E0B',
          hover: '#D97706',
          active: '#B45309',
          focus: '#FBBF24',
          disabled: '#FCD34D'
        }
      },
      error: {
        hex: '#DC2626',
        oklch: 'oklch(0.55 0.16 20)',
        usage: 'Out of stock, order errors',
        interactive_states: {
          default: '#DC2626',
          hover: '#B91C1C',
          active: '#991B1B',
          focus: '#EF4444',
          disabled: '#FCA5A5'
        }
      },
      neutral: {
        hex: '#78716C',
        oklch: 'oklch(0.55 0.02 80)',
        usage: 'Ingredients, neutral descriptions',
        interactive_states: {
          default: '#78716C',
          hover: '#57534E',
          active: '#44403C',
          focus: '#A8A29E',
          disabled: '#D6D3D1'
        }
      },
      surface: {
        hex: '#FFFBEB',
        oklch: 'oklch(0.98 0.01 80)',
        usage: 'Menu backgrounds, warm surfaces',
        interactive_states: {
          default: '#FFFBEB',
          hover: '#FEF3C7',
          active: '#FDE68A',
          focus: '#FFFBEB',
          disabled: '#FEF3C7'
        }
      },
      text: {
        hex: '#1C1917',
        oklch: 'oklch(0.2 0.02 80)',
        usage: 'Menu items, primary text',
        interactive_states: {
          default: '#1C1917',
          hover: '#0C0A09',
          active: '#0C0A09',
          focus: '#292524',
          disabled: '#A8A29E'
        }
      },
      ui: {
        hex: '#E7E5E4',
        oklch: 'oklch(0.9 0.01 80)',
        usage: 'Menu separators, form elements',
        interactive_states: {
          default: '#E7E5E4',
          hover: '#D6D3D1',
          active: '#A8A29E',
          focus: '#F5F5F4',
          disabled: '#FAFAF9'
        }
      },
      icons: {
        hex: '#44403C',
        oklch: 'oklch(0.35 0.02 80)',
        usage: 'Food icons, dining symbols',
        interactive_states: {
          default: '#44403C',
          hover: '#292524',
          active: '#1C1917',
          focus: '#57534E',
          disabled: '#A8A29E'
        }
      }
    },
    accessibility: {
      compliance: 'AA',
      averageContrast: 5.7
    }
  },

  'Fashion': {
    id: 'fashion-001',
    name: 'Fashion Forward',
    industry: 'Fashion',
    description: 'Trendy, sophisticated colors that reflect style and elegance',
    emotionTags: ['Elegance', 'Innovation', 'Passion', 'Status'],
    colorRoles: {
      primary: {
        hex: '#DB2777',
        oklch: 'oklch(0.55 0.16 330)',
        usage: 'Primary brand, fashion statements',
        interactive_states: {
          default: '#DB2777',
          hover: '#BE185D',
          active: '#9D174D',
          focus: '#EC4899',
          disabled: '#F9A8D4'
        }
      },
      secondary: {
        hex: '#6B7280',
        oklch: 'oklch(0.6 0.02 240)',
        usage: 'Sophisticated neutrals, balance',
        interactive_states: {
          default: '#6B7280',
          hover: '#4B5563',
          active: '#374151',
          focus: '#9CA3AF',
          disabled: '#D1D5DB'
        }
      },
      accent: {
        hex: '#FACC15',
        oklch: 'oklch(0.8 0.14 90)',
        usage: 'Luxury accents, gold details',
        interactive_states: {
          default: '#FACC15',
          hover: '#EAB308',
          active: '#CA8A04',
          focus: '#FDE047',
          disabled: '#FEF08A'
        }
      },
      success: {
        hex: '#10B981',
        oklch: 'oklch(0.7 0.15 160)',
        usage: 'In stock, successful purchases',
        interactive_states: {
          default: '#10B981',
          hover: '#059669',
          active: '#047857',
          focus: '#34D399',
          disabled: '#6EE7B7'
        }
      },
      warning: {
        hex: '#F59E0B',
        oklch: 'oklch(0.8 0.1 80)',
        usage: 'Limited sizes, sale endings',
        interactive_states: {
          default: '#F59E0B',
          hover: '#D97706',
          active: '#B45309',
          focus: '#FBBF24',
          disabled: '#FCD34D'
        }
      },
      error: {
        hex: '#DC2626',
        oklch: 'oklch(0.55 0.16 20)',
        usage: 'Out of stock, sizing errors',
        interactive_states: {
          default: '#DC2626',
          hover: '#B91C1C',
          active: '#991B1B',
          focus: '#EF4444',
          disabled: '#FCA5A5'
        }
      },
      neutral: {
        hex: '#6B7280',
        oklch: 'oklch(0.6 0.02 240)',
        usage: 'Product details, neutral text',
        interactive_states: {
          default: '#6B7280',
          hover: '#4B5563',
          active: '#374151',
          focus: '#9CA3AF',
          disabled: '#D1D5DB'
        }
      },
      surface: {
        hex: '#FEFEFE',
        oklch: 'oklch(0.99 0.001 240)',
        usage: 'Clean product backgrounds',
        interactive_states: {
          default: '#FEFEFE',
          hover: '#F9FAFB',
          active: '#F3F4F6',
          focus: '#FEFEFE',
          disabled: '#F9FAFB'
        }
      },
      text: {
        hex: '#1F2937',
        oklch: 'oklch(0.3 0.05 260)',
        usage: 'Product descriptions, primary text',
        interactive_states: {
          default: '#1F2937',
          hover: '#111827',
          active: '#030712',
          focus: '#374151',
          disabled: '#9CA3AF'
        }
      },
      ui: {
        hex: '#E5E7EB',
        oklch: 'oklch(0.9 0.01 240)',
        usage: 'Elegant borders, UI elements',
        interactive_states: {
          default: '#E5E7EB',
          hover: '#D1D5DB',
          active: '#9CA3AF',
          focus: '#F3F4F6',
          disabled: '#F9FAFB'
        }
      },
      icons: {
        hex: '#4B5563',
        oklch: 'oklch(0.5 0.05 240)',
        usage: 'Fashion icons, style symbols',
        interactive_states: {
          default: '#4B5563',
          hover: '#374151',
          active: '#1F2937',
          focus: '#6B7280',
          disabled: '#9CA3AF'
        }
      }
    },
    accessibility: {
      compliance: 'AA',
      averageContrast: 5.1
    }
  },

  'Real Estate': {
    id: 'realestate-001',
    name: 'Property Excellence',
    industry: 'Real Estate',
    description: 'Stable, trustworthy colors that convey luxury and investment security',
    emotionTags: ['Trust', 'Status', 'Timelessness', 'Professionalism'],
    colorRoles: {
      primary: {
        hex: '#047857',
        oklch: 'oklch(0.55 0.13 170)',
        usage: 'Primary brand, available properties',
        interactive_states: {
          default: '#047857',
          hover: '#065F46',
          active: '#064E3B',
          focus: '#059669',
          disabled: '#6EE7B7'
        }
      },
      secondary: {
        hex: '#6B7280',
        oklch: 'oklch(0.6 0.02 240)',
        usage: 'Professional neutrals, balance',
        interactive_states: {
          default: '#6B7280',
          hover: '#4B5563',
          active: '#374151',
          focus: '#9CA3AF',
          disabled: '#D1D5DB'
        }
      },
      accent: {
        hex: '#D97706',
        oklch: 'oklch(0.65 0.14 70)',
        usage: 'Luxury properties, premium features',
        interactive_states: {
          default: '#D97706',
          hover: '#B45309',
          active: '#92400E',
          focus: '#F59E0B',
          disabled: '#FCD34D'
        }
      },
      success: {
        hex: '#16A34A',
        oklch: 'oklch(0.7 0.14 150)',
        usage: 'Sold properties, successful deals',
        interactive_states: {
          default: '#16A34A',
          hover: '#15803D',
          active: '#166534',
          focus: '#22C55E',
          disabled: '#86EFAC'
        }
      },
      warning: {
        hex: '#F59E0B',
        oklch: 'oklch(0.8 0.1 80)',
        usage: 'Price changes, market alerts',
        interactive_states: {
          default: '#F59E0B',
          hover: '#D97706',
          active: '#B45309',
          focus: '#FBBF24',
          disabled: '#FCD34D'
        }
      },
      error: {
        hex: '#DC2626',
        oklch: 'oklch(0.55 0.16 20)',
        usage: 'Unavailable properties, errors',
        interactive_states: {
          default: '#DC2626',
          hover: '#B91C1C',
          active: '#991B1B',
          focus: '#EF4444',
          disabled: '#FCA5A5'
        }
      },
      neutral: {
        hex: '#64748B',
        oklch: 'oklch(0.55 0.02 240)',
        usage: 'Property details, neutral info',
        interactive_states: {
          default: '#64748B',
          hover: '#475569',
          active: '#334155',
          focus: '#94A3B8',
          disabled: '#CBD5E1'
        }
      },
      surface: {
        hex: '#F8FAFC',
        oklch: 'oklch(0.98 0.005 240)',
        usage: 'Property cards, clean backgrounds',
        interactive_states: {
          default: '#F8FAFC',
          hover: '#F1F5F9',
          active: '#E2E8F0',
          focus: '#F8FAFC',
          disabled: '#F1F5F9'
        }
      },
      text: {
        hex: '#0F172A',
        oklch: 'oklch(0.2 0.05 240)',
        usage: 'Property descriptions, primary text',
        interactive_states: {
          default: '#0F172A',
          hover: '#020617',
          active: '#020617',
          focus: '#1E293B',
          disabled: '#94A3B8'
        }
      },
      ui: {
        hex: '#CBD5E1',
        oklch: 'oklch(0.85 0.01 240)',
        usage: 'Property borders, form elements',
        interactive_states: {
          default: '#CBD5E1',
          hover: '#94A3B8',
          active: '#64748B',
          focus: '#E2E8F0',
          disabled: '#F1F5F9'
        }
      },
      icons: {
        hex: '#334155',
        oklch: 'oklch(0.35 0.05 240)',
        usage: 'Property icons, amenity symbols',
        interactive_states: {
          default: '#334155',
          hover: '#1E293B',
          active: '#0F172A',
          focus: '#475569',
          disabled: '#94A3B8'
        }
      }
    },
    accessibility: {
      compliance: 'AAA',
      averageContrast: 6.5
    }
  }
};