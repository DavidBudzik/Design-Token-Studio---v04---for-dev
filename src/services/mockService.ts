import { GeneratedPalette, GeneratedColor, PaletteGenerationRequest } from './apiService';
import { IndustryType } from '../types/theme';

// Mock palettes for each industry when API is offline
const mockPalettes: Record<IndustryType, GeneratedColor[]> = {
  'Technology': [
    {
      name: 'Tech Blue',
      category: 'Primary',
      hex: '#3B82F6',
      oklch: 'oklch(0.65 0.12 240)',
      usage: 'Primary actions, links, brand elements',
      interactive_states: {
        default: '#3B82F6',
        hover: '#2563EB',
        active: '#1D4ED8',
        focus: '#60A5FA',
        disabled: '#93C5FD'
      },
      accessibility: {
        contrastRatio: 5.2,
        wcagAA: true,
        wcagAAA: false
      }
    },
    {
      name: 'Success Green',
      category: 'Secondary',
      hex: '#10B981',
      oklch: 'oklch(0.7 0.15 160)',
      usage: 'Success states, positive feedback',
      interactive_states: {
        default: '#10B981',
        hover: '#059669',
        active: '#047857',
        focus: '#34D399',
        disabled: '#6EE7B7'
      },
      accessibility: {
        contrastRatio: 4.8,
        wcagAA: true,
        wcagAAA: false
      }
    },
    {
      name: 'Warning Orange',
      category: 'Functional',
      hex: '#F59E0B',
      oklch: 'oklch(0.8 0.1 80)',
      usage: 'Warnings, caution states',
      interactive_states: {
        default: '#F59E0B',
        hover: '#D97706',
        active: '#B45309',
        focus: '#FBBF24',
        disabled: '#FCD34D'
      },
      accessibility: {
        contrastRatio: 4.5,
        wcagAA: true,
        wcagAAA: false
      }
    },
    {
      name: 'Text Dark',
      category: 'Text',
      hex: '#1F2937',
      oklch: 'oklch(0.3 0.05 260)',
      usage: 'Primary text, headings',
      interactive_states: {
        default: '#1F2937',
        hover: '#111827',
        active: '#030712',
        focus: '#374151',
        disabled: '#9CA3AF'
      },
      accessibility: {
        contrastRatio: 12.5,
        wcagAA: true,
        wcagAAA: true
      }
    },
    {
      name: 'Gradient Teal',
      category: 'Gradient',
      hex: '#6EE7B7',
      oklch: 'oklch(0.85 0.13 140)',
      usage: 'Gradient elements, highlights',
      interactive_states: {
        default: '#6EE7B7',
        hover: '#34D399',
        active: '#10B981',
        focus: '#86EFAC',
        disabled: '#D1FAE5'
      },
      accessibility: {
        contrastRatio: 3.2,
        wcagAA: false,
        wcagAAA: false
      }
    }
  ],

  'Healthcare': [
    {
      name: 'Medical Green',
      category: 'Primary',
      hex: '#22C55E',
      oklch: 'oklch(0.7 0.14 150)',
      usage: 'Primary health indicators, positive status',
      interactive_states: {
        default: '#22C55E',
        hover: '#16A34A',
        active: '#15803D',
        focus: '#4ADE80',
        disabled: '#86EFAC'
      },
      accessibility: {
        contrastRatio: 4.7,
        wcagAA: true,
        wcagAAA: false
      }
    },
    {
      name: 'Trust Blue',
      category: 'Secondary',
      hex: '#3B82F6',
      oklch: 'oklch(0.65 0.12 240)',
      usage: 'Information, secondary actions',
      interactive_states: {
        default: '#3B82F6',
        hover: '#2563EB',
        active: '#1D4ED8',
        focus: '#60A5FA',
        disabled: '#93C5FD'
      },
      accessibility: {
        contrastRatio: 5.2,
        wcagAA: true,
        wcagAAA: false
      }
    },
    {
      name: 'Alert Red',
      category: 'Functional',
      hex: '#DC2626',
      oklch: 'oklch(0.55 0.16 20)',
      usage: 'Critical alerts, emergency',
      interactive_states: {
        default: '#DC2626',
        hover: '#B91C1C',
        active: '#991B1B',
        focus: '#EF4444',
        disabled: '#FCA5A5'
      },
      accessibility: {
        contrastRatio: 6.1,
        wcagAA: true,
        wcagAAA: false
      }
    },
    {
      name: 'Medical Text',
      category: 'Text',
      hex: '#1E293B',
      oklch: 'oklch(0.25 0.05 240)',
      usage: 'Medical records, primary text',
      interactive_states: {
        default: '#1E293B',
        hover: '#0F172A',
        active: '#020617',
        focus: '#334155',
        disabled: '#94A3B8'
      },
      accessibility: {
        contrastRatio: 13.2,
        wcagAA: true,
        wcagAAA: true
      }
    },
    {
      name: 'Calm Gradient',
      category: 'Gradient',
      hex: '#A5B4FC',
      oklch: 'oklch(0.8 0.1 270)',
      usage: 'Calming gradients, wellness elements',
      interactive_states: {
        default: '#A5B4FC',
        hover: '#8B5CF6',
        active: '#7C3AED',
        focus: '#C4B5FD',
        disabled: '#E0E7FF'
      },
      accessibility: {
        contrastRatio: 3.8,
        wcagAA: false,
        wcagAAA: false
      }
    }
  ],

  // Add more industry mock data...
  'Finance': [
    {
      name: 'Finance Blue',
      category: 'Primary',
      hex: '#1E3A8A',
      oklch: 'oklch(0.5 0.13 260)',
      usage: 'Primary brand, important actions',
      interactive_states: {
        default: '#1E3A8A',
        hover: '#1E40AF',
        active: '#1D4ED8',
        focus: '#3B82F6',
        disabled: '#93C5FD'
      },
      accessibility: {
        contrastRatio: 7.8,
        wcagAA: true,
        wcagAAA: true
      }
    },
    {
      name: 'Growth Green',
      category: 'Secondary',
      hex: '#047857',
      oklch: 'oklch(0.55 0.13 170)',
      usage: 'Growth, positive financial metrics',
      interactive_states: {
        default: '#047857',
        hover: '#059669',
        active: '#065F46',
        focus: '#10B981',
        disabled: '#6EE7B7'
      },
      accessibility: {
        contrastRatio: 6.2,
        wcagAA: true,
        wcagAAA: false
      }
    },
    {
      name: 'Loss Red',
      category: 'Functional',
      hex: '#B91C1C',
      oklch: 'oklch(0.5 0.15 20)',
      usage: 'Losses, failed transactions',
      interactive_states: {
        default: '#B91C1C',
        hover: '#991B1B',
        active: '#7F1D1D',
        focus: '#DC2626',
        disabled: '#FCA5A5'
      },
      accessibility: {
        contrastRatio: 7.1,
        wcagAA: true,
        wcagAAA: true
      }
    },
    {
      name: 'Financial Text',
      category: 'Text',
      hex: '#0F172A',
      oklch: 'oklch(0.2 0.05 240)',
      usage: 'Financial data, primary text',
      interactive_states: {
        default: '#0F172A',
        hover: '#020617',
        active: '#020617',
        focus: '#1E293B',
        disabled: '#94A3B8'
      },
      accessibility: {
        contrastRatio: 15.2,
        wcagAA: true,
        wcagAAA: true
      }
    },
    {
      name: 'Premium Gold',
      category: 'Gradient',
      hex: '#FCD34D',
      oklch: 'oklch(0.85 0.12 90)',
      usage: 'Premium features, highlights',
      interactive_states: {
        default: '#FCD34D',
        hover: '#FBBF24',
        active: '#F59E0B',
        focus: '#FDE047',
        disabled: '#FEF3C7'
      },
      accessibility: {
        contrastRatio: 2.1,
        wcagAA: false,
        wcagAAA: false
      }
    }
  ],

  // Simplified versions for other industries
  'Education': [
    { name: 'Education Purple', category: 'Primary', hex: '#8B5CF6', oklch: 'oklch(0.6 0.15 290)', usage: 'Primary learning elements', interactive_states: { default: '#8B5CF6', hover: '#7C3AED', active: '#6D28D9', focus: '#A78BFA', disabled: '#C4B5FD' }, accessibility: { contrastRatio: 4.9, wcagAA: true, wcagAAA: false } },
    { name: 'Creative Orange', category: 'Secondary', hex: '#F97316', oklch: 'oklch(0.7 0.15 60)', usage: 'Creative highlights', interactive_states: { default: '#F97316', hover: '#EA580C', active: '#C2410C', focus: '#FB923C', disabled: '#FDBA74' }, accessibility: { contrastRatio: 4.6, wcagAA: true, wcagAAA: false } },
    { name: 'Success Green', category: 'Functional', hex: '#22C55E', oklch: 'oklch(0.7 0.14 150)', usage: 'Achievement, correct answers', interactive_states: { default: '#22C55E', hover: '#16A34A', active: '#15803D', focus: '#4ADE80', disabled: '#86EFAC' }, accessibility: { contrastRatio: 4.7, wcagAA: true, wcagAAA: false } },
    { name: 'Education Text', category: 'Text', hex: '#1F2937', oklch: 'oklch(0.3 0.05 260)', usage: 'Educational content', interactive_states: { default: '#1F2937', hover: '#111827', active: '#030712', focus: '#374151', disabled: '#9CA3AF' }, accessibility: { contrastRatio: 12.5, wcagAA: true, wcagAAA: true } },
    { name: 'Inspiration Pink', category: 'Gradient', hex: '#F9A8D4', oklch: 'oklch(0.8 0.1 320)', usage: 'Inspiration elements', interactive_states: { default: '#F9A8D4', hover: '#EC4899', active: '#DB2777', focus: '#FBCFE8', disabled: '#FCE7F3' }, accessibility: { contrastRatio: 2.8, wcagAA: false, wcagAAA: false } }
  ],

  'Retail': [
    { name: 'Sale Red', category: 'Primary', hex: '#EF4444', oklch: 'oklch(0.6 0.15 30)', usage: 'Sale prices, primary CTAs', interactive_states: { default: '#EF4444', hover: '#DC2626', active: '#B91C1C', focus: '#F87171', disabled: '#FCA5A5' }, accessibility: { contrastRatio: 5.8, wcagAA: true, wcagAAA: false } },
    { name: 'Highlight Yellow', category: 'Secondary', hex: '#FBBF24', oklch: 'oklch(0.8 0.13 80)', usage: 'Highlights, special offers', interactive_states: { default: '#FBBF24', hover: '#F59E0B', active: '#D97706', focus: '#FCD34D', disabled: '#FEF3C7' }, accessibility: { contrastRatio: 3.1, wcagAA: false, wcagAAA: false } },
    { name: 'Stock Green', category: 'Functional', hex: '#10B981', oklch: 'oklch(0.7 0.15 160)', usage: 'In stock, success', interactive_states: { default: '#10B981', hover: '#059669', active: '#047857', focus: '#34D399', disabled: '#6EE7B7' }, accessibility: { contrastRatio: 4.8, wcagAA: true, wcagAAA: false } },
    { name: 'Product Text', category: 'Text', hex: '#111827', oklch: 'oklch(0.25 0.05 260)', usage: 'Product descriptions', interactive_states: { default: '#111827', hover: '#030712', active: '#030712', focus: '#1F2937', disabled: '#9CA3AF' }, accessibility: { contrastRatio: 14.1, wcagAA: true, wcagAAA: true } },
    { name: 'Premium Purple', category: 'Gradient', hex: '#C4B5FD', oklch: 'oklch(0.8 0.1 270)', usage: 'Premium products', interactive_states: { default: '#C4B5FD', hover: '#A78BFA', active: '#8B5CF6', focus: '#DDD6FE', disabled: '#EDE9FE' }, accessibility: { contrastRatio: 2.9, wcagAA: false, wcagAAA: false } }
  ],

  'Hospitality': [
    { name: 'Warm Orange', category: 'Primary', hex: '#D97706', oklch: 'oklch(0.65 0.14 70)', usage: 'Warm welcome, bookings', interactive_states: { default: '#D97706', hover: '#B45309', active: '#92400E', focus: '#F59E0B', disabled: '#FCD34D' }, accessibility: { contrastRatio: 5.5, wcagAA: true, wcagAAA: false } },
    { name: 'Nature Green', category: 'Secondary', hex: '#059669', oklch: 'oklch(0.6 0.14 160)', usage: 'Nature, available rooms', interactive_states: { default: '#059669', hover: '#047857', active: '#065F46', focus: '#10B981', disabled: '#6EE7B7' }, accessibility: { contrastRatio: 6.2, wcagAA: true, wcagAAA: false } },
    { name: 'Luxury Pink', category: 'Functional', hex: '#BE185D', oklch: 'oklch(0.5 0.15 340)', usage: 'Luxury services', interactive_states: { default: '#BE185D', hover: '#9D174D', active: '#831843', focus: '#DB2777', disabled: '#F9A8D4' }, accessibility: { contrastRatio: 6.8, wcagAA: true, wcagAAA: false } },
    { name: 'Elegant Text', category: 'Text', hex: '#1C1917', oklch: 'oklch(0.2 0.02 80)', usage: 'Luxury descriptions', interactive_states: { default: '#1C1917', hover: '#0C0A09', active: '#0C0A09', focus: '#292524', disabled: '#A8A29E' }, accessibility: { contrastRatio: 14.8, wcagAA: true, wcagAAA: true } },
    { name: 'Sunset Gradient', category: 'Gradient', hex: '#FED7AA', oklch: 'oklch(0.85 0.1 60)', usage: 'Warm backgrounds', interactive_states: { default: '#FED7AA', hover: '#FDBA74', active: '#F59E0B', focus: '#FEE2B3', disabled: '#FEF3C7' }, accessibility: { contrastRatio: 2.3, wcagAA: false, wcagAAA: false } }
  ],

  'Entertainment': [
    { name: 'Show Red', category: 'Primary', hex: '#DC2626', oklch: 'oklch(0.55 0.16 20)', usage: 'Featured content, primary actions', interactive_states: { default: '#DC2626', hover: '#B91C1C', active: '#991B1B', focus: '#EF4444', disabled: '#FCA5A5' }, accessibility: { contrastRatio: 6.5, wcagAA: true, wcagAAA: false } },
    { name: 'Premium Purple', category: 'Secondary', hex: '#8B5CF6', oklch: 'oklch(0.6 0.15 290)', usage: 'Premium content', interactive_states: { default: '#8B5CF6', hover: '#7C3AED', active: '#6D28D9', focus: '#A78BFA', disabled: '#C4B5FD' }, accessibility: { contrastRatio: 4.9, wcagAA: true, wcagAAA: false } },
    { name: 'Award Gold', category: 'Functional', hex: '#FACC15', oklch: 'oklch(0.8 0.14 90)', usage: 'Awards, highlights', interactive_states: { default: '#FACC15', hover: '#EAB308', active: '#CA8A04', focus: '#FDE047', disabled: '#FEF08A' }, accessibility: { contrastRatio: 2.8, wcagAA: false, wcagAAA: false } },
    { name: 'Media Text', category: 'Text', hex: '#FFFFFF', oklch: 'oklch(1 0 0)', usage: 'Text on dark surfaces', interactive_states: { default: '#FFFFFF', hover: '#F9FAFB', active: '#F3F4F6', focus: '#FFFFFF', disabled: '#9CA3AF' }, accessibility: { contrastRatio: 21, wcagAA: true, wcagAAA: true } },
    { name: 'Electric Gradient', category: 'Gradient', hex: '#FCA5A5', oklch: 'oklch(0.8 0.1 10)', usage: 'Electric elements', interactive_states: { default: '#FCA5A5', hover: '#F87171', active: '#EF4444', focus: '#FECACA', disabled: '#FEE2E2' }, accessibility: { contrastRatio: 2.5, wcagAA: false, wcagAAA: false } }
  ],

  'Automotive': [
    { name: 'Luxury Black', category: 'Primary', hex: '#1F2937', oklch: 'oklch(0.3 0.05 260)', usage: 'Luxury vehicles, primary brand', interactive_states: { default: '#1F2937', hover: '#111827', active: '#030712', focus: '#374151', disabled: '#9CA3AF' }, accessibility: { contrastRatio: 12.5, wcagAA: true, wcagAAA: true } },
    { name: 'Steel Gray', category: 'Secondary', hex: '#6B7280', oklch: 'oklch(0.6 0.02 240)', usage: 'Secondary features', interactive_states: { default: '#6B7280', hover: '#4B5563', active: '#374151', focus: '#9CA3AF', disabled: '#D1D5DB' }, accessibility: { contrastRatio: 4.6, wcagAA: true, wcagAAA: false } },
    { name: 'Performance Red', category: 'Functional', hex: '#EF4444', oklch: 'oklch(0.6 0.15 30)', usage: 'Performance, sport features', interactive_states: { default: '#EF4444', hover: '#DC2626', active: '#B91C1C', focus: '#F87171', disabled: '#FCA5A5' }, accessibility: { contrastRatio: 5.8, wcagAA: true, wcagAAA: false } },
    { name: 'Spec Text', category: 'Text', hex: '#18181B', oklch: 'oklch(0.2 0.01 260)', usage: 'Vehicle specifications', interactive_states: { default: '#18181B', hover: '#09090B', active: '#09090B', focus: '#27272A', disabled: '#A1A1AA' }, accessibility: { contrastRatio: 15.1, wcagAA: true, wcagAAA: true } },
    { name: 'Chrome Gradient', category: 'Gradient', hex: '#9CA3AF', oklch: 'oklch(0.7 0.05 240)', usage: 'Chrome details', interactive_states: { default: '#9CA3AF', hover: '#6B7280', active: '#4B5563', focus: '#D1D5DB', disabled: '#F3F4F6' }, accessibility: { contrastRatio: 3.5, wcagAA: false, wcagAAA: false } }
  ],

  'Non-Profit': [
    { name: 'Community Green', category: 'Primary', hex: '#059669', oklch: 'oklch(0.6 0.14 160)', usage: 'Community actions, donations', interactive_states: { default: '#059669', hover: '#047857', active: '#065F46', focus: '#10B981', disabled: '#6EE7B7' }, accessibility: { contrastRatio: 6.2, wcagAA: true, wcagAAA: false } },
    { name: 'Trust Blue', category: 'Secondary', hex: '#3B82F6', oklch: 'oklch(0.65 0.12 240)', usage: 'Information, trust', interactive_states: { default: '#3B82F6', hover: '#2563EB', active: '#1D4ED8', focus: '#60A5FA', disabled: '#93C5FD' }, accessibility: { contrastRatio: 5.2, wcagAA: true, wcagAAA: false } },
    { name: 'Urgent Orange', category: 'Functional', hex: '#D97706', oklch: 'oklch(0.65 0.14 70)', usage: 'Urgent campaigns', interactive_states: { default: '#D97706', hover: '#B45309', active: '#92400E', focus: '#F59E0B', disabled: '#FCD34D' }, accessibility: { contrastRatio: 5.5, wcagAA: true, wcagAAA: false } },
    { name: 'Mission Text', category: 'Text', hex: '#1F2937', oklch: 'oklch(0.3 0.05 260)', usage: 'Mission statements', interactive_states: { default: '#1F2937', hover: '#111827', active: '#030712', focus: '#374151', disabled: '#9CA3AF' }, accessibility: { contrastRatio: 12.5, wcagAA: true, wcagAAA: true } },
    { name: 'Hope Gradient', category: 'Gradient', hex: '#6EE7B7', oklch: 'oklch(0.85 0.13 140)', usage: 'Hope, positive impact', interactive_states: { default: '#6EE7B7', hover: '#34D399', active: '#10B981', focus: '#86EFAC', disabled: '#D1FAE5' }, accessibility: { contrastRatio: 3.2, wcagAA: false, wcagAAA: false } }
  ],

  'Food & Beverage': [
    { name: 'Appetizing Red', category: 'Primary', hex: '#B91C1C', oklch: 'oklch(0.5 0.15 20)', usage: 'Appetizing elements, brand', interactive_states: { default: '#B91C1C', hover: '#991B1B', active: '#7F1D1D', focus: '#DC2626', disabled: '#FCA5A5' }, accessibility: { contrastRatio: 7.1, wcagAA: true, wcagAAA: true } },
    { name: 'Comfort Yellow', category: 'Secondary', hex: '#FBBF24', oklch: 'oklch(0.8 0.13 80)', usage: 'Comfort foods, warmth', interactive_states: { default: '#FBBF24', hover: '#F59E0B', active: '#D97706', focus: '#FCD34D', disabled: '#FEF3C7' }, accessibility: { contrastRatio: 3.1, wcagAA: false, wcagAAA: false } },
    { name: 'Fresh Green', category: 'Functional', hex: '#16A34A', oklch: 'oklch(0.7 0.14 150)', usage: 'Fresh ingredients, organic', interactive_states: { default: '#16A34A', hover: '#15803D', active: '#166534', focus: '#22C55E', disabled: '#86EFAC' }, accessibility: { contrastRatio: 5.1, wcagAA: true, wcagAAA: false } },
    { name: 'Menu Text', category: 'Text', hex: '#1C1917', oklch: 'oklch(0.2 0.02 80)', usage: 'Menu items, descriptions', interactive_states: { default: '#1C1917', hover: '#0C0A09', active: '#0C0A09', focus: '#292524', disabled: '#A8A29E' }, accessibility: { contrastRatio: 14.8, wcagAA: true, wcagAAA: true } },
    { name: 'Spice Gradient', category: 'Gradient', hex: '#FECACA', oklch: 'oklch(0.85 0.1 20)', usage: 'Spice levels, warmth', interactive_states: { default: '#FECACA', hover: '#FCA5A5', active: '#F87171', focus: '#FEE2E2', disabled: '#FEF2F2' }, accessibility: { contrastRatio: 2.1, wcagAA: false, wcagAAA: false } }
  ],

  'Fashion': [
    { name: 'Fashion Pink', category: 'Primary', hex: '#DB2777', oklch: 'oklch(0.55 0.16 330)', usage: 'Fashion statements, brand', interactive_states: { default: '#DB2777', hover: '#BE185D', active: '#9D174D', focus: '#EC4899', disabled: '#F9A8D4' }, accessibility: { contrastRatio: 6.2, wcagAA: true, wcagAAA: false } },
    { name: 'Sophisticated Gray', category: 'Secondary', hex: '#6B7280', oklch: 'oklch(0.6 0.02 240)', usage: 'Sophisticated balance', interactive_states: { default: '#6B7280', hover: '#4B5563', active: '#374151', focus: '#9CA3AF', disabled: '#D1D5DB' }, accessibility: { contrastRatio: 4.6, wcagAA: true, wcagAAA: false } },
    { name: 'Luxury Gold', category: 'Functional', hex: '#FACC15', oklch: 'oklch(0.8 0.14 90)', usage: 'Luxury accents', interactive_states: { default: '#FACC15', hover: '#EAB308', active: '#CA8A04', focus: '#FDE047', disabled: '#FEF08A' }, accessibility: { contrastRatio: 2.8, wcagAA: false, wcagAAA: false } },
    { name: 'Style Text', category: 'Text', hex: '#1F2937', oklch: 'oklch(0.3 0.05 260)', usage: 'Product descriptions', interactive_states: { default: '#1F2937', hover: '#111827', active: '#030712', focus: '#374151', disabled: '#9CA3AF' }, accessibility: { contrastRatio: 12.5, wcagAA: true, wcagAAA: true } },
    { name: 'Trend Gradient', category: 'Gradient', hex: '#F9A8D4', oklch: 'oklch(0.8 0.1 320)', usage: 'Trendy elements', interactive_states: { default: '#F9A8D4', hover: '#EC4899', active: '#DB2777', focus: '#FBCFE8', disabled: '#FCE7F3' }, accessibility: { contrastRatio: 2.8, wcagAA: false, wcagAAA: false } }
  ],

  'Real Estate': [
    { name: 'Property Green', category: 'Primary', hex: '#047857', oklch: 'oklch(0.55 0.13 170)', usage: 'Available properties, brand', interactive_states: { default: '#047857', hover: '#065F46', active: '#064E3B', focus: '#059669', disabled: '#6EE7B7' }, accessibility: { contrastRatio: 6.8, wcagAA: true, wcagAAA: false } },
    { name: 'Professional Gray', category: 'Secondary', hex: '#6B7280', oklch: 'oklch(0.6 0.02 240)', usage: 'Professional balance', interactive_states: { default: '#6B7280', hover: '#4B5563', active: '#374151', focus: '#9CA3AF', disabled: '#D1D5DB' }, accessibility: { contrastRatio: 4.6, wcagAA: true, wcagAAA: false } },
    { name: 'Luxury Gold', category: 'Functional', hex: '#D97706', oklch: 'oklch(0.65 0.14 70)', usage: 'Luxury properties', interactive_states: { default: '#D97706', hover: '#B45309', active: '#92400E', focus: '#F59E0B', disabled: '#FCD34D' }, accessibility: { contrastRatio: 5.5, wcagAA: true, wcagAAA: false } },
    { name: 'Property Text', category: 'Text', hex: '#0F172A', oklch: 'oklch(0.2 0.05 240)', usage: 'Property descriptions', interactive_states: { default: '#0F172A', hover: '#020617', active: '#020617', focus: '#1E293B', disabled: '#94A3B8' }, accessibility: { contrastRatio: 15.2, wcagAA: true, wcagAAA: true } },
    { name: 'Investment Gradient', category: 'Gradient', hex: '#6EE7B7', oklch: 'oklch(0.85 0.13 140)', usage: 'Investment growth', interactive_states: { default: '#6EE7B7', hover: '#34D399', active: '#10B981', focus: '#86EFAC', disabled: '#D1FAE5' }, accessibility: { contrastRatio: 3.2, wcagAA: false, wcagAAA: false } }
  ]
};

// All industries have mock data above

export class MockService {
  static generatePalette(request: PaletteGenerationRequest): Promise<GeneratedPalette> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const industry = request.industryTheme || 'Technology';
        const colors = mockPalettes[industry] || mockPalettes['Technology'];
        
        const palette: GeneratedPalette = {
          theme: `${industry} Theme`,
          description: request.description,
          industry,
          colors,
          metadata: {
            generatedAt: new Date().toISOString(),
            model: 'mock-service',
            accessibility: {
              overallCompliance: 'AA',
              averageContrast: 5.2,
            },
          },
        };
        
        resolve(palette);
      }, 1500); // Simulate API delay
    });
  }

  static detectIndustryFromText(text: string): IndustryType | null {
    const industryKeywords = {
      'Technology': ['tech', 'technology', 'startup', 'digital', 'modern', 'software', 'app'],
      'Healthcare': ['health', 'healthcare', 'medical', 'hospital', 'wellness', 'doctor'],
      'Finance': ['finance', 'financial', 'banking', 'investment', 'money', 'wealth'],
      'Education': ['education', 'school', 'university', 'learning', 'academic', 'student'],
      'Retail': ['retail', 'shop', 'store', 'commerce', 'shopping', 'ecommerce'],
      'Hospitality': ['hospitality', 'hotel', 'travel', 'tourism', 'resort', 'restaurant'],
      'Entertainment': ['entertainment', 'media', 'film', 'music', 'show', 'gaming'],
      'Automotive': ['automotive', 'car', 'vehicle', 'auto', 'drive', 'transport'],
      'Non-Profit': ['nonprofit', 'non-profit', 'charity', 'community', 'social'],
      'Food & Beverage': ['food', 'beverage', 'restaurant', 'culinary', 'cafe', 'drink'],
      'Fashion': ['fashion', 'style', 'apparel', 'clothing', 'trend', 'design'],
      'Real Estate': ['real estate', 'property', 'home', 'realty', 'housing', 'apartment']
    };

    const lowercaseText = text.toLowerCase();
    
    for (const [industry, keywords] of Object.entries(industryKeywords)) {
      for (const keyword of keywords) {
        if (lowercaseText.includes(keyword)) {
          return industry as IndustryType;
        }
      }
    }
    
    return null;
  }
}