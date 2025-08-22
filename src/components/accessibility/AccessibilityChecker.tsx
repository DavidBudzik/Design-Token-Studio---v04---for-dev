import { useState, useMemo } from 'react';
import { Shield, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { useTokenStore } from '@/stores/tokenStore';
import { checkContrast, getContrastLevel, validateColorAccessibility } from '@/utils/accessibilityUtils';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export function AccessibilityChecker() {
  const { tokens } = useTokenStore();
  const [selectedBackground, setSelectedBackground] = useState('#ffffff');
  const [showDetails, setShowDetails] = useState(false);

  const colorTokens = tokens.filter(token => token.type === 'color');
  
  const accessibilityResults = useMemo(() => {
    return validateColorAccessibility(tokens);
  }, [tokens]);

  const contrastResults = useMemo(() => {
    return colorTokens.map(token => {
      const contrast = checkContrast(token.value, selectedBackground);
      const level = getContrastLevel(contrast.ratio);
      
      return {
        token,
        contrast,
        level,
      };
    });
  }, [colorTokens, selectedBackground]);

  const backgroundOptions = [
    { value: '#ffffff', label: 'White', color: '#ffffff' },
    { value: '#000000', label: 'Black', color: '#000000' },
    { value: '#f8f9fa', label: 'Light Gray', color: '#f8f9fa' },
    { value: '#212529', label: 'Dark Gray', color: '#212529' },
  ];

  const getStatusIcon = (level: string) => {
    switch (level) {
      case 'aaa':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'aa':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = (level: string) => {
    switch (level) {
      case 'aaa':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'aa':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      default:
        return 'text-red-700 bg-red-50 border-red-200';
    }
  };

  const passedTokens = contrastResults.filter(r => r.level !== 'fail').length;
  const totalTokens = contrastResults.length;
  const complianceScore = totalTokens > 0 ? Math.round((passedTokens / totalTokens) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Accessibility Checker</h3>
        </div>
        <p className="text-sm text-gray-600">
          WCAG 2.1 color contrast validation
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Compliance Score */}
        <div className="text-center">
          <div className="text-2xl font-bold mb-1">
            {complianceScore}%
          </div>
          <p className="text-sm text-gray-600">
            WCAG AA Compliance ({passedTokens}/{totalTokens} tokens)
          </p>
        </div>

        {/* Background Selector */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Test Background</h4>
          <div className="grid grid-cols-2 gap-2">
            {backgroundOptions.map((bg) => (
              <button
                key={bg.value}
                onClick={() => setSelectedBackground(bg.value)}
                className={`p-2 rounded border text-sm transition-colors ${
                  selectedBackground === bg.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded border border-gray-300"
                    style={{ backgroundColor: bg.color }}
                  />
                  {bg.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {colorTokens.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">Contrast Results</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDetails(!showDetails)}
              >
                <Info className="h-4 w-4 mr-1" />
                {showDetails ? 'Hide' : 'Show'} Details
              </Button>
            </div>

            <div className="space-y-2">
              {contrastResults.map(({ token, contrast, level }) => (
                <div
                  key={token.id}
                  className={`p-3 rounded-lg border ${getStatusColor(level)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(level)}
                      <div
                        className="w-4 h-4 rounded border border-gray-300"
                        style={{ backgroundColor: token.value }}
                      />
                      <span className="font-medium text-sm">{token.name}</span>
                    </div>
                    <div className="text-sm">
                      {contrast.ratio}:1 {level.toUpperCase()}
                    </div>
                  </div>
                  
                  {showDetails && (
                    <div className="mt-2 text-xs space-y-1">
                      <div>Color: {token.value}</div>
                      <div>AA Normal: {contrast.aa ? '✓' : '✗'}</div>
                      <div>AAA Normal: {contrast.aaa ? '✓' : '✗'}</div>
                      <div>AA Large: {contrast.aaLarge ? '✓' : '✗'}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Shield className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No color tokens to check</p>
            <p className="text-xs">Create some color tokens to see accessibility results</p>
          </div>
        )}

        {/* General Issues */}
        {accessibilityResults.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Issues Found ({accessibilityResults.length})
            </h4>
            <div className="space-y-2">
              {accessibilityResults.slice(0, 3).map((result) => (
                <div key={result.tokenId} className="p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                  <div className="font-medium">{result.tokenName}</div>
                  <div className="text-yellow-700 text-xs mt-1">
                    {result.issues[0]}
                  </div>
                </div>
              ))}
              {accessibilityResults.length > 3 && (
                <div className="text-xs text-gray-500 text-center">
                  +{accessibilityResults.length - 3} more issues
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}