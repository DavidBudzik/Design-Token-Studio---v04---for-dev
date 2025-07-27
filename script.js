// Token Generator JavaScript
class TokenGenerator {
    constructor() {
        this.tokens = [];
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadTokensFromStorage();
        this.renderTokens();
        this.updateTokenCount();
    }

    bindEvents() {
        const generateBtn = document.getElementById('generate-token');
        const clearBtn = document.getElementById('clear-form');
        const resetPreviewBtn = document.getElementById('reset-preview');
        const copyBtn = document.getElementById('copy-css');
        const searchInput = document.getElementById('search-tokens');
        const tokenNameInput = document.getElementById('token-name');
        const tokenValueInput = document.getElementById('token-value');
        const tokenTypeSelect = document.getElementById('token-type');
        const tokenDescInput = document.getElementById('token-description');

        // Only bind events if elements exist
        if (!generateBtn || !clearBtn || !tokenNameInput) {
            console.log('TokenGenerator elements not found, skipping initialization');
            return;
        }

        generateBtn.addEventListener('click', () => {
            this.generateToken();
        });

        clearBtn.addEventListener('click', () => {
            this.clearForm();
        });

        resetPreviewBtn.addEventListener('click', () => {
            this.resetPreview();
        });

        copyBtn.addEventListener('click', () => {
            this.copyCSSToClipboard();
        });

        searchInput.addEventListener('input', (e) => {
            this.filterTokens(e.target.value);
        });

        // Allow Enter key to generate token
        [tokenNameInput, tokenValueInput, tokenDescInput].forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && input !== tokenDescInput) {
                    this.generateToken();
                }
            });
        });

        // Live preview updates
        tokenValueInput.addEventListener('input', () => {
            this.updatePreview();
            this.updateInputHelper();
        });

        tokenTypeSelect.addEventListener('change', () => {
            this.updatePreview();
            this.updateInputHelper();
        });

        tokenNameInput.addEventListener('input', () => {
            this.updateCSSOutput();
        });
    }

    generateToken() {
        const name = document.getElementById('token-name').value.trim();
        const value = document.getElementById('token-value').value.trim();
        const type = document.getElementById('token-type').value;
        const description = document.getElementById('token-description').value.trim();

        if (!name || !value || !type) {
            this.showError('Please fill in all required fields (name, value, and type)');
            return;
        }

        // Check for duplicate names
        if (this.tokens.some(token => token.name === name)) {
            this.showError('Token name already exists');
            return;
        }

        // Validate token value based on type
        if (!this.validateTokenValue(value, type)) {
            this.showError(`Invalid ${type} value. Please check the format.`);
            return;
        }

        const token = {
            id: Date.now(),
            name,
            value,
            type,
            description: description || '',
            createdAt: new Date().toISOString()
        };

        this.tokens.push(token);
        this.saveTokensToStorage();
        this.renderTokens();
        this.updateTokenCount();
        this.clearForm();
        this.updatePreview();
        this.updateCSSOutput();
        this.showSuccess(`Token "${name}" created successfully`);
    }

    renderTokens(filteredTokens = null) {
        const tokenList = document.getElementById('token-list');
        if (!tokenList) {
            console.log('token-list element not found, skipping render');
            return;
        }
        const tokensToRender = filteredTokens || this.tokens;
        
        if (tokensToRender.length === 0) {
            tokenList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🎨</div>
                    <p>No tokens found</p>
                    <p class="empty-state-subtitle">${filteredTokens ? 'Try adjusting your search' : 'Create your first token to get started'}</p>
                </div>
            `;
            return;
        }

        tokenList.innerHTML = tokensToRender.map(token => `
            <div class="token-item" data-id="${token.id}">
                <div class="token-info">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                        <div class="token-name">${token.name}</div>
                        <span class="token-type">${this.getTypeIcon(token.type)} ${token.type}</span>
                    </div>
                    <div class="token-value">${token.value}</div>
                    ${token.description ? `<div class="token-description">${token.description}</div>` : ''}
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                    ${token.type === 'color' ? `<div class="color-preview" style="background-color: ${token.value};"></div>` : ''}
                    <button class="btn btn-small copy-token-btn" onclick="tokenGenerator.copyTokenCSS('${token.name}', '${token.value}', '${token.type}')" title="Copy CSS">📋</button>
                    <button class="btn btn-small btn-danger" onclick="tokenGenerator.deleteToken(${token.id})" title="Delete">×</button>
                </div>
            </div>
        `).join('');
    }

    getTypeIcon(type) {
        const icons = {
            'color': '🎨',
            'spacing': '📏',
            'typography': '📝',
            'border-radius': '🔲',
            'shadow': '🌗'
        };
        return icons[type] || '⚪';
    }

    deleteToken(id) {
        this.tokens = this.tokens.filter(token => token.id !== id);
        this.saveTokensToStorage();
        this.renderTokens();
        this.updateTokenCount();
        this.updatePreview();
        this.updateCSSOutput();
        this.showSuccess('Token deleted successfully');
    }

    updateTokenCount() {
        const countElement = document.getElementById('token-count');
        if (!countElement) return;
        const count = this.tokens.length;
        countElement.textContent = `${count} token${count !== 1 ? 's' : ''}`;
    }

    filterTokens(searchTerm) {
        if (!searchTerm.trim()) {
            this.renderTokens();
            return;
        }

        const filtered = this.tokens.filter(token => 
            token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            token.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            token.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (token.description && token.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        this.renderTokens(filtered);
    }

    updatePreview() {
        const valueInput = document.getElementById('token-value');
        const typeSelect = document.getElementById('token-type');
        const previewElement = document.getElementById('preview-element');
        const previewProperties = document.getElementById('preview-properties');
        
        if (!valueInput || !typeSelect || !previewElement || !previewProperties) return;
        
        const value = valueInput.value.trim();
        const type = typeSelect.value;

        if (!value || !type) {
            previewElement.style.cssText = '';
            previewElement.textContent = 'Sample Element';
            previewProperties.textContent = 'No properties applied';
            return;
        }

        let appliedProperties = [];

        switch (type) {
            case 'color':
                if (this.isValidColor(value)) {
                    previewElement.style.backgroundColor = value;
                    previewElement.style.color = this.getContrastColor(value);
                    previewElement.textContent = `Color: ${value}`;
                    appliedProperties.push(`background-color: ${value}`);
                    appliedProperties.push(`color: ${this.getContrastColor(value)}`);
                }
                break;
            
            case 'spacing':
                if (this.isValidSpacing(value)) {
                    previewElement.style.padding = value;
                    previewElement.textContent = `Padding: ${value}`;
                    appliedProperties.push(`padding: ${value}`);
                }
                break;
            
            case 'typography':
                if (this.isValidTypography(value)) {
                    previewElement.style.fontSize = value;
                    previewElement.textContent = `Font Size: ${value}`;
                    appliedProperties.push(`font-size: ${value}`);
                }
                break;
            
            case 'border-radius':
                if (this.isValidBorderRadius(value)) {
                    previewElement.style.borderRadius = value;
                    previewElement.textContent = `Border Radius: ${value}`;
                    appliedProperties.push(`border-radius: ${value}`);
                }
                break;
            
            case 'shadow':
                if (this.isValidShadow(value)) {
                    previewElement.style.boxShadow = value;
                    previewElement.textContent = `Shadow: ${value}`;
                    appliedProperties.push(`box-shadow: ${value}`);
                }
                break;
        }

        previewProperties.innerHTML = appliedProperties.length > 0 
            ? appliedProperties.map(prop => `<div>${prop};</div>`).join('') 
            : 'No valid properties applied';

        this.updateCSSOutput();
    }

    updateInputHelper() {
        const type = document.getElementById('token-type').value;
        const helper = document.getElementById('input-helper');
        
        const examples = {
            'color': 'e.g., #ff0000, rgb(255,0,0)',
            'spacing': 'e.g., 16px, 1rem, 2em',
            'typography': 'e.g., 16px, 1.2rem',
            'border-radius': 'e.g., 8px, 50%',
            'shadow': 'e.g., 0 2px 4px rgba(0,0,0,0.1)'
        };
        
        helper.textContent = examples[type] || '';
    }

    updateCSSOutput() {
        const nameInput = document.getElementById('token-name');
        const valueInput = document.getElementById('token-value');
        const typeSelect = document.getElementById('token-type');
        const cssOutput = document.getElementById('css-output');
        
        if (!nameInput || !valueInput || !typeSelect || !cssOutput) return;
        
        const name = nameInput.value.trim();
        const value = valueInput.value.trim();
        const type = typeSelect.value;

        if (!name || !value || !type) {
            cssOutput.innerHTML = '<code>/* Your CSS will appear here */</code>';
            return;
        }

        const cssProperty = this.getCSSProperty(type);
        const cssCode = `/* CSS Custom Property */\n:root {\n  --${name}: ${value};\n}\n\n/* Usage Example */\n.element {\n  ${cssProperty}: var(--${name});\n}`;
        
        cssOutput.innerHTML = `<code>${cssCode}</code>`;
    }

    getCSSProperty(type) {
        const properties = {
            'color': 'background-color',
            'spacing': 'padding',
            'typography': 'font-size',
            'border-radius': 'border-radius',
            'shadow': 'box-shadow'
        };
        return properties[type] || 'property';
    }

    resetPreview() {
        const previewElement = document.getElementById('preview-element');
        const previewProperties = document.getElementById('preview-properties');
        
        previewElement.style.cssText = '';
        previewElement.textContent = 'Sample Element';
        previewProperties.textContent = 'No properties applied';
        
        document.getElementById('token-value').value = '';
        document.getElementById('token-type').value = '';
        this.updateCSSOutput();
    }

    copyCSSToClipboard() {
        const cssOutput = document.getElementById('css-output');
        const codeElement = cssOutput.querySelector('code');
        
        if (codeElement && codeElement.textContent !== '/* Your CSS will appear here */') {
            navigator.clipboard.writeText(codeElement.textContent).then(() => {
                this.showSuccess('CSS copied to clipboard!');
            }).catch(() => {
                this.showError('Failed to copy CSS');
            });
        } else {
            this.showError('No CSS to copy');
        }
    }

    copyTokenCSS(name, value, type) {
        const cssProperty = this.getCSSProperty(type);
        const css = `--${name}: ${value};\n${cssProperty}: var(--${name});`;
        
        navigator.clipboard.writeText(css).then(() => {
            this.showSuccess(`CSS for "${name}" copied to clipboard!`);
        }).catch(() => {
            this.showError('Failed to copy CSS');
        });
    }

    validateTokenValue(value, type) {
        switch (type) {
            case 'color':
                return this.isValidColor(value);
            case 'spacing':
                return this.isValidSpacing(value);
            case 'typography':
                return this.isValidTypography(value);
            case 'border-radius':
                return this.isValidBorderRadius(value);
            case 'shadow':
                return this.isValidShadow(value);
            default:
                return false;
        }
    }

    // Validation helpers
    isValidColor(value) {
        const tempEl = document.createElement('div');
        tempEl.style.color = value;
        return tempEl.style.color !== '';
    }

    isValidSpacing(value) {
        return /^\d+(\.\d+)?(px|rem|em|%)$/.test(value);
    }

    isValidTypography(value) {
        return /^\d+(\.\d+)?(px|rem|em)$/.test(value);
    }

    isValidBorderRadius(value) {
        return /^\d+(\.\d+)?(px|rem|em|%)$/.test(value);
    }

    isValidShadow(value) {
        // Basic shadow validation
        return value.includes('px') || value === 'none';
    }

    getContrastColor(hexColor) {
        // Simple contrast calculation
        const color = hexColor.replace('#', '');
        const r = parseInt(color.substr(0, 2), 16);
        const g = parseInt(color.substr(2, 2), 16);
        const b = parseInt(color.substr(4, 2), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 125 ? '#000000' : '#ffffff';
    }

    clearForm() {
        document.getElementById('token-name').value = '';
        document.getElementById('token-value').value = '';
        document.getElementById('token-type').value = '';
        document.getElementById('token-description').value = '';
        document.getElementById('input-helper').textContent = '';
        this.updateCSSOutput();
    }

    saveTokensToStorage() {
        localStorage.setItem('design-tokens', JSON.stringify(this.tokens));
    }

    loadTokensFromStorage() {
        const stored = localStorage.getItem('design-tokens');
        if (stored) {
            this.tokens = JSON.parse(stored);
        }
    }

    exportTokens() {
        const data = {
            tokens: this.tokens,
            exportedAt: new Date().toISOString(),
            version: '1.0.0'
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'design-tokens.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    importTokens(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.tokens && Array.isArray(data.tokens)) {
                    this.tokens = [...this.tokens, ...data.tokens];
                    this.saveTokensToStorage();
                    this.renderTokens();
                    this.showSuccess('Tokens imported successfully');
                } else {
                    this.showError('Invalid token file format');
                }
            } catch (error) {
                this.showError('Error reading token file');
            }
        };
        reader.readAsText(file);
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the token generator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing application...');
    
    // Always initialize tab switching first
    initTabSwitching();
    initExportFunctionality();
    
    // Initialize the correct tab state based on HTML
    initializeTabState();
    
    // Only initialize token generator if the old form elements exist
    const generateBtn = document.getElementById('generate-token');
    if (generateBtn) {
        console.log('Old token generator elements found, initializing TokenGenerator');
        window.tokenGenerator = new TokenGenerator();
    } else {
        console.log('New interface detected, skipping TokenGenerator initialization');
    }
});

// Initialize tab state based on HTML
function initializeTabState() {
    const activeTab = document.querySelector('.tab-item.active');
    const exportControls = document.querySelector('.export-controls');
    const inspectorControls = document.querySelector('.inspector-controls');
    
    if (activeTab && activeTab.getAttribute('data-tab') === 'code-export') {
        console.log('Code Export tab is active, showing export controls');
        if (exportControls) exportControls.style.display = 'flex';
        if (inspectorControls) inspectorControls.style.display = 'none';
    } else {
        console.log('Token Inspector tab is active, showing inspector controls');
        if (exportControls) exportControls.style.display = 'none';
        if (inspectorControls) inspectorControls.style.display = 'flex';
    }
}

// Tab switching functionality
function initTabSwitching() {
    console.log('Initializing tab switching...');
    const tabItems = document.querySelectorAll('.tab-item');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const exportControls = document.querySelector('.export-controls');
    const inspectorControls = document.querySelector('.inspector-controls');
    
    console.log('Found elements:', {
        tabItems: tabItems.length,
        tabPanels: tabPanels.length,
        exportControls: !!exportControls,
        inspectorControls: !!inspectorControls
    });

    tabItems.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            console.log('Tab clicked:', targetTab);
            
            // Remove active class from all tabs and panels
            tabItems.forEach(t => t.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding panel
            const targetPanel = document.getElementById(targetTab);
            console.log('Target panel found:', !!targetPanel);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
            
            // Toggle control visibility
            if (targetTab === 'code-export') {
                if (exportControls) exportControls.style.display = 'flex';
                if (inspectorControls) inspectorControls.style.display = 'none';
                console.log('Showing export controls');
            } else {
                if (exportControls) exportControls.style.display = 'none';
                if (inspectorControls) inspectorControls.style.display = 'flex';
                console.log('Showing inspector controls');
            }
        });
    });
}

// Export functionality for Code Export tab
function initExportFunctionality() {
    console.log('Initializing export functionality...');
    const exportBtn = document.querySelector('.export-btn');
    const exportSelect = document.querySelector('.export-select');
    
    console.log('Export elements found:', {
        exportBtn: !!exportBtn,
        exportSelect: !!exportSelect
    });

    if (exportBtn && exportSelect) {
        exportBtn.addEventListener('click', function() {
            console.log('Export button clicked');
            const format = exportSelect.value;
            const filename = `design-tokens.${getFileExtension(format)}`;
            
            console.log('Exporting format:', format, 'filename:', filename);
            
            // Generate content based on format
            const content = generateTokenData(format);
            
            // Create and download file
            downloadFile(content, filename);
        });
    } else {
        console.error('Export functionality not initialized - missing elements');
    }
}

function getFileExtension(format) {
    const extensions = {
        'json': 'json',
        'css': 'css',
        'scss': 'scss',
        'less': 'less',
        'js': 'js',
        'ts': 'ts',
        'figma': 'json',
        'sketch': 'json'
    };
    return extensions[format] || 'json';
}

function generateTokenData(format) {
    const tokens = {
        name: "design-token-studio",
        palette: {
            primary: {
                default: "#4F46E5",
                hover: "#3730A3",
                active: "#4338CA",
                disabled: "#C7D2FE"
            },
            secondary: {
                default: "#a7d2d2",
                hover: "#85c1c1",
                active: "#74b8b8",
                disabled: "#eefff1"
            },
            accent: {
                default: "#0EA5E9",
                hover: "#0E7490",
                active: "#1580CA",
                disabled: "#B3E5FC"
            },
            success: {
                default: "#10B981",
                hover: "#059669",
                active: "#0D9488",
                disabled: "#86EFAC"
            },
            warning: {
                default: "#F59E0B",
                hover: "#D97706",
                active: "#C27803",
                disabled: "#FCD34D"
            },
            danger: {
                default: "#EF4444",
                hover: "#DC2626",
                active: "#CB2323",
                disabled: "#FECACA"
            },
            surface: {
                default: "#F9FAFB",
                muted: "#D97706",
                subtle: "#daefe7",
                elevated: "#FCD34D"
            },
            background: {
                default: "#F3F4F6",
                inverted: "#D1D5DB"
            },
            border: {
                default: "#cbd4dc",
                focus: "#4F46E5"
            },
            text: {
                default: "#1F2937",
                muted: "#9CA3AF",
                subtle: "#728eb0",
                disabled: "#9CA3AF",
                onPrimary: "#FFFFFF",
                onSecondary: "#FFFFFF",
                onAccent: "#FFFFFF",
                onSuccess: "#FFFFFF",
                onWarning: "#FFFFFF",
                onDanger: "#FFFFFF"
            }
        }
    };

    switch (format) {
        case 'css':
            return generateCSSVariables(tokens);
        case 'scss':
            return generateSCSSVariables(tokens);
        case 'less':
            return generateLESSVariables(tokens);
        case 'js':
            return `export const designTokens = ${JSON.stringify(tokens, null, 2)};`;
        case 'ts':
            return generateTypeScriptInterface(tokens);
        case 'figma':
            return generateFigmaTokens(tokens);
        case 'sketch':
            return generateSketchPalette(tokens);
        default:
            return JSON.stringify(tokens, null, 2);
    }
}

function generateCSSVariables(tokens) {
    let css = ':root {\n';
    Object.entries(tokens.palette).forEach(([category, colors]) => {
        Object.entries(colors).forEach(([state, color]) => {
            css += `  --color-${category}-${state}: ${color};\n`;
        });
    });
    css += '}';
    return css;
}

function generateSCSSVariables(tokens) {
    let scss = '';
    Object.entries(tokens.palette).forEach(([category, colors]) => {
        Object.entries(colors).forEach(([state, color]) => {
            scss += `$color-${category}-${state}: ${color};\n`;
        });
    });
    return scss;
}

function generateLESSVariables(tokens) {
    let less = '';
    Object.entries(tokens.palette).forEach(([category, colors]) => {
        Object.entries(colors).forEach(([state, color]) => {
            less += `@color-${category}-${state}: ${color};\n`;
        });
    });
    return less;
}

function generateTypeScriptInterface(tokens) {
    return `interface DesignTokens {
  name: string;
  palette: {
    ${Object.keys(tokens.palette).map(category => 
      `${category}: {
      ${Object.keys(tokens.palette[category]).map(state => 
        `${state}: string;`
      ).join('\n      ')}
    };`
    ).join('\n    ')}
  };
}

export const designTokens: DesignTokens = ${JSON.stringify(tokens, null, 2)};`;
}

function generateFigmaTokens(tokens) {
    const figmaTokens = {};
    Object.entries(tokens.palette).forEach(([category, colors]) => {
        figmaTokens[category] = {};
        Object.entries(colors).forEach(([state, color]) => {
            figmaTokens[category][state] = {
                value: color,
                type: "color"
            };
        });
    });
    return JSON.stringify(figmaTokens, null, 2);
}

function generateSketchPalette(tokens) {
    const colors = [];
    Object.entries(tokens.palette).forEach(([category, colorSet]) => {
        Object.entries(colorSet).forEach(([state, color]) => {
            const hex = color.replace('#', '');
            const r = parseInt(hex.substr(0, 2), 16) / 255;
            const g = parseInt(hex.substr(2, 2), 16) / 255;
            const b = parseInt(hex.substr(4, 2), 16) / 255;
            
            colors.push({
                name: `${category}-${state}`,
                red: r,
                green: g,
                blue: b,
                alpha: 1
            });
        });
    });
    
    return JSON.stringify({
        compatibleVersion: "2.0",
        pluginVersion: "2.22",
        colors: colors
    }, null, 2);
}

function downloadFile(content, filename) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Export functionality (can be called from console or additional UI)
function exportTokens() {
    if (window.tokenGenerator) {
        window.tokenGenerator.exportTokens();
    }
}

// Import functionality (can be called from console or additional UI)
function importTokens(fileInput) {
    if (window.tokenGenerator && fileInput.files.length > 0) {
        window.tokenGenerator.importTokens(fileInput.files[0]);
    }
}
