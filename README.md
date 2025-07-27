# Design Token Studio

A modern, interactive web application for creating and managing design tokens. This project provides a clean interface for generating, previewing, and exporting design tokens for your design system.

## Features

- **Token Generation**: Create design tokens for colors, spacing, typography, border radius, and shadows
- **Live Preview**: See your tokens applied in real-time
- **Export/Import**: Save and load token collections as JSON files
- **Local Storage**: Automatically saves your tokens locally
- **Responsive Design**: Works on desktop and mobile devices
- **Accessibility**: Built with accessibility best practices

## Token Types Supported

1. **Color**: CSS color values (hex, rgb, hsl, named colors)
2. **Spacing**: Padding and margin values (px, rem, em, %)
3. **Typography**: Font sizes (px, rem, em)
4. **Border Radius**: Corner radius values (px, rem, em, %)
5. **Shadow**: CSS box-shadow values

## Usage

1. Open `index.html` in your web browser
2. Fill in the token details:
   - **Token Name**: A unique identifier for your token
   - **Token Value**: The CSS value for the token
   - **Token Type**: Select the appropriate type from the dropdown
3. Click "Generate Token" to create the token
4. View the live preview in the right panel
5. Export your tokens as JSON for use in other tools
6. Import previously exported token files

## File Structure

```
design-token-studio-v-04-UI/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and design system
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Technical Details

### HTML Structure
- Semantic HTML5 markup
- Accessible form controls
- Progressive enhancement

### CSS Features
- CSS Grid and Flexbox layouts
- CSS Custom Properties (CSS Variables)
- Responsive design with mobile-first approach
- Modern gradients and animations
- High contrast and reduced motion support

### JavaScript Functionality
- ES6+ modern JavaScript
- Local storage for persistence
- File import/export capabilities
- Input validation
- Live preview updates

## Browser Support

This application works in all modern browsers that support:
- ES6+ JavaScript features
- CSS Grid and Flexbox
- Local Storage API
- File API

## Customization

### Adding New Token Types
To add a new token type, modify:

1. **HTML**: Add option to the select dropdown
2. **JavaScript**: Add validation and preview logic in `TokenGenerator` class
3. **CSS**: Add any specific styling for the new token type

### Styling Customization
The design uses CSS custom properties for easy theming. Key variables include:
- Primary colors and gradients
- Spacing values
- Typography scales
- Border radius values

## Examples

### Color Token
- Name: `primary-blue`
- Value: `#667eea`
- Type: `color`

### Spacing Token
- Name: `spacing-lg`
- Value: `24px`
- Type: `spacing`

### Typography Token
- Name: `heading-xl`
- Value: `2.5rem`
- Type: `typography`

## Export Format

Exported tokens follow this JSON structure:

```json
{
  "tokens": [
    {
      "id": 1640995200000,
      "name": "primary-blue",
      "value": "#667eea",
      "type": "color",
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ],
  "exportedAt": "2025-01-01T00:00:00.000Z",
  "version": "1.0.0"
}
```

## Contributing

Feel free to contribute by:
- Adding new token types
- Improving the validation logic
- Enhancing the preview functionality
- Adding more export formats

## License

This project is open source and available under the MIT License.
