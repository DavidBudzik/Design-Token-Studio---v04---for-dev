import React from 'react';
import { Shield, ShieldCheck, ShieldAlert } from 'lucide-react';
import clsx from 'clsx';

interface AccessibilityBadgeProps {
  compliance: 'AA' | 'AAA' | 'partial';
  averageContrast: number;
  className?: string;
}

export const AccessibilityBadge: React.FC<AccessibilityBadgeProps> = ({
  compliance,
  averageContrast,
  className
}) => {
  const getComplianceConfig = (level: string) => {
    switch (level) {
      case 'AAA':
        return {
          icon: ShieldCheck,
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          borderColor: 'border-green-200',
          label: 'WCAG AAA',
          description: 'Highest accessibility standard'
        };
      case 'AA':
        return {
          icon: Shield,
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          borderColor: 'border-blue-200',
          label: 'WCAG AA',
          description: 'Standard accessibility compliance'
        };
      case 'partial':
        return {
          icon: ShieldAlert,
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          borderColor: 'border-yellow-200',
          label: 'Partial',
          description: 'Some colors may not meet standards'
        };
      default:
        return {
          icon: ShieldAlert,
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          borderColor: 'border-gray-200',
          label: 'Unknown',
          description: 'Accessibility not verified'
        };
    }
  };

  const config = getComplianceConfig(compliance);
  const Icon = config.icon;

  return (
    <div className={clsx(
      'inline-flex items-center gap-2 px-3 py-2 rounded-lg border',
      config.bgColor,
      config.textColor,
      config.borderColor,
      className
    )}>
      <Icon className="h-4 w-4" />
      <div className="text-sm">
        <div className="font-medium">{config.label}</div>
        <div className="text-xs opacity-75">
          Avg: {averageContrast}:1
        </div>
      </div>
    </div>
  );
};