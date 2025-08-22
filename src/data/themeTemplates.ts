export interface SimpleTheme {
  id: string;
  name: string;
  industry: string;
  emotions: string[];
  description: string;
  colors: Array<{
    role: string;
    value: string;
    name: string;
  }>;
}

export const themeTemplates: SimpleTheme[] = [
  {
    id: 'education-trust',
    name: 'Education Trust',
    industry: 'Education',
    emotions: ['Trust', 'Calmness', 'Focus'],
    description: 'A calming, trustworthy palette perfect for educational platforms',
    colors: [
      { role: 'primary', value: '#2563eb', name: 'Primary Blue' },
      { role: 'secondary', value: '#7c3aed', name: 'Secondary Purple' },
      { role: 'accent', value: '#059669', name: 'Accent Green' },
      { role: 'success', value: '#10b981', name: 'Success Green' },
      { role: 'warning', value: '#f59e0b', name: 'Warning Amber' },
      { role: 'error', value: '#ef4444', name: 'Error Red' },
      { role: 'neutral', value: '#6b7280', name: 'Neutral Gray' },
      { role: 'surface', value: '#f8fafc', name: 'Surface Light' },
      { role: 'text', value: '#1f2937', name: 'Text Dark' },
      { role: 'ui', value: '#e5e7eb', name: 'UI Border' },
      { role: 'icons', value: '#4b5563', name: 'Icon Gray' },
    ],
  },
  {
    id: 'tech-innovation',
    name: 'Tech Innovation',
    industry: 'Technology',
    emotions: ['Innovation', 'Energy', 'Professionalism'],
    description: 'A modern, high-energy palette for tech companies and startups',
    colors: [
      { role: 'primary', value: '#3b82f6', name: 'Primary Blue' },
      { role: 'secondary', value: '#8b5cf6', name: 'Secondary Purple' },
      { role: 'accent', value: '#06b6d4', name: 'Accent Cyan' },
      { role: 'success', value: '#22c55e', name: 'Success Green' },
      { role: 'warning', value: '#eab308', name: 'Warning Yellow' },
      { role: 'error', value: '#f97316', name: 'Error Orange' },
      { role: 'neutral', value: '#64748b', name: 'Neutral Slate' },
      { role: 'surface', value: '#0f172a', name: 'Surface Dark' },
      { role: 'text', value: '#f1f5f9', name: 'Text Light' },
      { role: 'ui', value: '#334155', name: 'UI Border' },
      { role: 'icons', value: '#94a3b8', name: 'Icon Light' },
    ],
  },
  {
    id: 'healthcare-safety',
    name: 'Healthcare Safety',
    industry: 'Healthcare',
    emotions: ['Safety', 'Comfort', 'Trust'],
    description: 'A clean, safe palette designed for healthcare applications',
    colors: [
      { role: 'primary', value: '#0ea5e9', name: 'Primary Sky' },
      { role: 'secondary', value: '#84cc16', name: 'Secondary Lime' },
      { role: 'accent', value: '#06b6d4', name: 'Accent Cyan' },
      { role: 'success', value: '#16a34a', name: 'Success Green' },
      { role: 'warning', value: '#ca8a04', name: 'Warning Gold' },
      { role: 'error', value: '#dc2626', name: 'Error Red' },
      { role: 'neutral', value: '#71717a', name: 'Neutral Zinc' },
      { role: 'surface', value: '#fefefe', name: 'Surface White' },
      { role: 'text', value: '#18181b', name: 'Text Black' },
      { role: 'ui', value: '#d4d4d8', name: 'UI Light' },
      { role: 'icons', value: '#52525b', name: 'Icon Dark' },
    ],
  },
  {
    id: 'fashion-elegance',
    name: 'Fashion Elegance',
    industry: 'Fashion',
    emotions: ['Elegance', 'Status', 'Innovation'],
    description: 'An elegant, sophisticated palette for fashion and luxury brands',
    colors: [
      { role: 'primary', value: '#1f2937', name: 'Primary Charcoal' },
      { role: 'secondary', value: '#be123c', name: 'Secondary Rose' },
      { role: 'accent', value: '#d97706', name: 'Accent Amber' },
      { role: 'success', value: '#059669', name: 'Success Emerald' },
      { role: 'warning', value: '#dc2626', name: 'Warning Red' },
      { role: 'error', value: '#991b1b', name: 'Error Dark Red' },
      { role: 'neutral', value: '#78716c', name: 'Neutral Stone' },
      { role: 'surface', value: '#fafaf9', name: 'Surface Warm' },
      { role: 'text', value: '#292524', name: 'Text Warm' },
      { role: 'ui', value: '#e7e5e4', name: 'UI Warm' },
      { role: 'icons', value: '#57534e', name: 'Icon Warm' },
    ],
  },
];