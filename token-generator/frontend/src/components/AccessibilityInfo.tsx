import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { AccessibilityMetadata } from '@token-generator/shared';
import clsx from 'clsx';

interface AccessibilityInfoProps {
  accessibility: AccessibilityMetadata;
}

export default function AccessibilityInfo({ accessibility }: AccessibilityInfoProps) {
  const isAAA = accessibility.wcagCompliance === 'AAA';
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Accessibility</h2>
      
      <div className="space-y-4">
        {/* WCAG Compliance Badge */}
        <div className={clsx(
          'flex items-center gap-3 p-4 rounded-lg',
          isAAA ? 'bg-green-50' : 'bg-blue-50'
        )}>
          {isAAA ? (
            <FaCheckCircle className="w-6 h-6 text-green-600" />
          ) : (
            <FaCheckCircle className="w-6 h-6 text-blue-600" />
          )}
          <div>
            <h3 className={clsx(
              'font-semibold',
              isAAA ? 'text-green-900' : 'text-blue-900'
            )}>
              WCAG {accessibility.wcagCompliance} Compliant
            </h3>
            <p className={clsx(
              'text-sm',
              isAAA ? 'text-green-700' : 'text-blue-700'
            )}>
              {isAAA 
                ? 'Meets highest accessibility standards'
                : 'Meets standard accessibility requirements'
              }
            </p>
          </div>
        </div>

        {/* Contrast Ratios */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">Contrast Ratios</h3>
          
          {Object.entries(accessibility.contrastRatios).map(([key, ratio]) => {
            const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            const meetsAA = ratio >= 4.5;
            const meetsAAA = ratio >= 7;
            
            return (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{label}</span>
                <div className="flex items-center gap-2">
                  <span className={clsx(
                    'font-mono text-sm',
                    meetsAAA ? 'text-green-600' : meetsAA ? 'text-blue-600' : 'text-amber-600'
                  )}>
                    {ratio}:1
                  </span>
                  {meetsAAA ? (
                    <span className="text-xs text-green-600 font-medium">AAA</span>
                  ) : meetsAA ? (
                    <span className="text-xs text-blue-600 font-medium">AA</span>
                  ) : (
                    <FaExclamationCircle className="w-4 h-4 text-amber-600" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Guidelines */}
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Guidelines</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">•</span>
              Text should have a contrast ratio of at least 4.5:1 (AA) or 7:1 (AAA)
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">•</span>
              Large text (18pt+) can have lower contrast: 3:1 (AA) or 4.5:1 (AAA)
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">•</span>
              UI components need at least 3:1 contrast against backgrounds
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}