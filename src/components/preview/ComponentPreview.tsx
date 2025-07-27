import React from 'react';
import { useTokenStore } from '@/stores/tokenStore';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function ComponentPreview() {
  const { tokens } = useTokenStore();

  // Generate CSS custom properties from tokens
  const tokenStyles = React.useMemo(() => {
    const styles: Record<string, string> = {};
    
    tokens.forEach(token => {
      const cssVarName = `--${token.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      styles[cssVarName] = token.value;
    });
    
    return styles;
  }, [tokens]);

  return (
    <div className="space-y-6" style={tokenStyles}>
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Component Preview</h3>
          <p className="text-sm text-gray-600">
            See your tokens applied to real UI components
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Button Examples */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Buttons</h4>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
            </div>
            <div className="flex flex-wrap gap-3 mt-3">
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </div>
          </div>

          {/* Input Examples */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Inputs</h4>
            <div className="space-y-3 max-w-sm">
              <Input
                label="Default Input"
                placeholder="Enter some text..."
              />
              <Input
                label="Input with Helper"
                placeholder="Enter email..."
                helperText="We'll never share your email"
              />
              <Input
                label="Error State"
                placeholder="Enter something..."
                error="This field is required"
              />
            </div>
          </div>

          {/* Card Examples */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Cards</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <h5 className="font-medium">Simple Card</h5>
                  <p className="text-sm text-gray-600">Basic card with header and content</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">This is the card content area where you can place any information.</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardHeader>
                  <h5 className="font-medium">Gradient Card</h5>
                  <p className="text-sm text-gray-600">Card with gradient background</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">This card demonstrates how gradients can be applied using your tokens.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Color Palette Display */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Color Tokens</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {tokens
                .filter(token => token.type === 'color')
                .slice(0, 8)
                .map(token => (
                  <div key={token.id} className="text-center">
                    <div
                      className="w-full h-16 rounded-lg border border-gray-200 mb-2"
                      style={{ backgroundColor: token.value }}
                    />
                    <p className="text-xs font-medium text-gray-700 truncate">
                      {token.name}
                    </p>
                    <p className="text-xs text-gray-500 font-mono">
                      {token.value}
                    </p>
                  </div>
                ))}
            </div>
            {tokens.filter(token => token.type === 'color').length === 0 && (
              <p className="text-sm text-gray-500 text-center py-8">
                No color tokens to preview. Create some color tokens to see them here.
              </p>
            )}
          </div>

          {/* Typography Examples */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Typography</h4>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-gray-900">Heading 1</h1>
              <h2 className="text-3xl font-semibold text-gray-800">Heading 2</h2>
              <h3 className="text-2xl font-medium text-gray-700">Heading 3</h3>
              <p className="text-base text-gray-600">
                This is body text using the base font size. It demonstrates how typography tokens affect readability and hierarchy.
              </p>
              <p className="text-sm text-gray-500">
                This is small text, often used for captions or helper text.
              </p>
            </div>
          </div>

          {/* Spacing Examples */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Spacing</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-sm">Small spacing (4px)</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm">Medium spacing (16px)</span>
              </div>
              <div className="flex items-center space-x-8">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span className="text-sm">Large spacing (32px)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}