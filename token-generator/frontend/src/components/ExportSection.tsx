import { FaDownload, FaCss3Alt, FaFigma } from 'react-icons/fa';
import { SiTailwindcss, SiJson } from 'react-icons/si';
import clsx from 'clsx';

interface ExportSectionProps {
  onExport: (format: string) => void;
}

const exportOptions = [
  { 
    id: 'json', 
    name: 'JSON', 
    icon: SiJson,
    description: 'Standard JSON format',
    color: 'bg-gray-100 hover:bg-gray-200 text-gray-700'
  },
  { 
    id: 'css', 
    name: 'CSS', 
    icon: FaCss3Alt,
    description: 'CSS custom properties',
    color: 'bg-blue-100 hover:bg-blue-200 text-blue-700'
  },
  { 
    id: 'tailwind', 
    name: 'Tailwind', 
    icon: SiTailwindcss,
    description: 'Tailwind config format',
    color: 'bg-cyan-100 hover:bg-cyan-200 text-cyan-700'
  },
  { 
    id: 'figma', 
    name: 'Figma Tokens', 
    icon: FaFigma,
    description: 'Figma Tokens plugin',
    color: 'bg-purple-100 hover:bg-purple-200 text-purple-700'
  },
];

export default function ExportSection({ onExport }: ExportSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Export Palette</h2>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {exportOptions.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.id}
              onClick={() => onExport(option.id)}
              className={clsx(
                'group relative flex flex-col items-center gap-2 p-4 rounded-lg transition-all',
                option.color
              )}
            >
              <Icon className="w-8 h-8" />
              <span className="font-medium text-sm">{option.name}</span>
              <span className="text-xs opacity-75">{option.description}</span>
              
              {/* Download icon on hover */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <FaDownload className="w-3 h-3" />
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Integration Guide</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li className="flex items-start">
            <span className="text-indigo-500 mr-2">•</span>
            <span><strong>JSON:</strong> Use for custom implementations or API integration</span>
          </li>
          <li className="flex items-start">
            <span className="text-indigo-500 mr-2">•</span>
            <span><strong>CSS:</strong> Copy into your stylesheet as CSS custom properties</span>
          </li>
          <li className="flex items-start">
            <span className="text-indigo-500 mr-2">•</span>
            <span><strong>Tailwind:</strong> Add to your tailwind.config.js file</span>
          </li>
          <li className="flex items-start">
            <span className="text-indigo-500 mr-2">•</span>
            <span><strong>Figma:</strong> Import using the Figma Tokens plugin</span>
          </li>
        </ul>
      </div>
    </div>
  );
}