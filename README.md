# Token Generator App

A full-stack AI-powered application that enables users, especially non-coders, to generate and fine-tune accessible, industry-specific color palettes using natural language inputs, aligned with the M-Design System and 12 industry themes.

## 🚀 Features

### 🎨 AI-Powered Palette Generation
- **Natural Language Input**: Describe your palette in plain English (e.g., "vibrant tech theme with earthy undertones")
- **Industry Theme Detection**: Automatically detects industry context from descriptions
- **OKLCH Color Space**: Uses perceptually uniform OKLCH for better color relationships
- **Interactive States**: Generates hover, active, focus, and disabled states for each color

### 🏢 12 Industry Themes
- Technology, Healthcare, Finance, Education
- Retail, Hospitality, Entertainment, Automotive
- Non-Profit, Food & Beverage, Fashion, Real Estate

### ♿ Accessibility First
- **WCAG AA/AAA Compliance**: Automatic contrast validation
- **Real-time Accessibility Checking**: Live contrast ratio calculations
- **Accessibility Metadata**: Detailed compliance information in exports

### 📦 Multiple Export Formats
- **JSON**: Structured data with full metadata
- **CSS Variables**: Custom properties for web development
- **SCSS**: Sass variables and maps
- **Tailwind Config**: Ready-to-use Tailwind theme extension
- **Figma Tokens**: Compatible with Figma Tokens plugin

### 🎯 User-Friendly Interface
- **No-Code Friendly**: Simple interface for non-technical users
- **Real-time Preview**: Live palette updates and theme switching
- **Example Prompts**: Guided palette creation with suggested inputs
- **Copy to Clipboard**: Easy color value copying

## 🛠 Tech Stack

### Backend
- **Node.js + Express**: RESTful API server
- **TypeScript**: Type-safe backend development
- **OpenAI API**: AI-powered palette generation
- **Culori**: Advanced color manipulation and OKLCH support
- **Chroma.js**: Color utilities and accessibility calculations

### Frontend
- **React 19**: Modern React with hooks
- **TypeScript**: Type-safe frontend development
- **Tailwind CSS**: Utility-first styling
- **Zustand**: Lightweight state management
- **Lucide React**: Beautiful icons
- **Vite**: Fast development and building

### Color Science
- **OKLCH Color Space**: Perceptually uniform color representation
- **WCAG Compliance**: Automated accessibility validation
- **Interactive States**: Programmatic color state generation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key (for AI features)

### Installation

1. **Clone and install dependencies**:
```bash
git clone <repository-url>
cd token-generator-app
npm install
```

2. **Set up environment variables**:
```bash
cp .env.example .env
# Edit .env and add your OpenAI API key
```

3. **Start the development servers**:
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

### Environment Variables

```env
# Required for AI features
OPENAI_API_KEY=sk-your-openai-api-key-here

# Optional configurations
MODEL=gpt-4o                    # Primary AI model
FALLBACK_MODEL=gpt-3.5-turbo    # Fallback model
PORT=3001                       # Backend port
TIMEOUT_MS=45000               # AI request timeout
```

## 📖 Usage

### 1. AI Palette Generation

1. **Navigate to "AI Palette Generator" tab**
2. **Select an industry theme** (or let AI detect it)
3. **Choose accessibility level** (AA or AAA)
4. **Describe your palette** in natural language:
   - "Vibrant tech startup with modern blues and energetic accents"
   - "Calming healthcare app with medical whites and trustworthy greens"
   - "Professional finance platform with deep blues and gold accents"
5. **Click Generate** and watch AI create your palette
6. **Export in your preferred format**

### 2. Manual Token Management

1. **Navigate to "Token Management" tab**
2. **Create custom tokens** using the visual editor
3. **Organize tokens** into categories and groups
4. **Preview tokens** in real UI components

### 3. Live Preview

1. **Navigate to "Live Preview" tab**
2. **See your palettes** applied to real UI components
3. **Test accessibility** with different color combinations

## 🎨 Color Categories

The app follows the M-Design System with these categories:

- **Primary**: Main brand colors and primary actions
- **Secondary**: Supporting colors and secondary actions  
- **Functional**: Success, warning, and error states
- **Text**: Text colors with proper contrast
- **Gradient**: Gradient colors for visual interest

## 🏢 Industry Themes

Each industry theme includes:
- **11 Color Roles**: primary, secondary, accent, success, warning, error, neutral, surface, text, ui, icons
- **Interactive States**: default, hover, active, focus, disabled
- **Emotion Tags**: Trust, Innovation, Elegance, etc.
- **WCAG Compliance**: AA or AAA accessibility standards

## 🔌 API Endpoints

### Palette Generation
```
POST /api/palette/generate
{
  "description": "vibrant tech theme",
  "industryTheme": "Technology",
  "accessibility": "AA",
  "colorCount": 5
}
```

### Accessibility Validation
```
POST /api/palette/validate-accessibility
{
  "colors": ["#3B82F6", "#10B981"],
  "background": "#ffffff",
  "standard": "AA"
}
```

### Theme Management
```
GET /api/theme/industries           # Get all industry themes
GET /api/theme/industries/:industry # Get specific industry theme
GET /api/theme/search?q=modern      # Search themes by keywords
```

## 📊 Export Formats

### JSON Export
```json
{
  "theme": "Modern Technology",
  "industry": "Technology",
  "colors": [...],
  "metadata": {
    "accessibility": {
      "overallCompliance": "AA",
      "averageContrast": 5.2
    }
  }
}
```

### CSS Variables Export
```css
:root {
  --primary-blue: #3B82F6;
  --primary-blue-oklch: oklch(0.65 0.12 240);
  --primary-blue-hover: #2563EB;
  --primary-blue-active: #1D4ED8;
}
```

### Tailwind Config Export
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'primary-blue': {
          DEFAULT: '#3B82F6',
          oklch: 'oklch(0.65 0.12 240)',
          hover: '#2563EB',
          active: '#1D4ED8'
        }
      }
    }
  }
};
```

## 🔧 Development

### Project Structure
```
├── server/                 # Backend API
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── utils/             # Utilities
│   ├── middleware/        # Express middleware
│   ├── types/             # TypeScript types
│   └── data/              # Static data
├── src/                   # Frontend React app
│   ├── components/        # React components
│   ├── services/          # API clients
│   ├── stores/            # State management
│   ├── types/             # TypeScript types
│   └── utils/             # Utilities
└── dist/                  # Built files
```

### Available Scripts

```bash
npm run dev              # Start both frontend and backend
npm run dev:client       # Start frontend only
npm run dev:server       # Start backend only
npm run build           # Build both frontend and backend
npm run build:client    # Build frontend only
npm run build:server    # Build backend only
npm start               # Start production server
```

### Development Workflow

1. **Backend Development**: Edit files in `server/`
2. **Frontend Development**: Edit files in `src/`
3. **Type Safety**: Shared types ensure consistency
4. **Hot Reload**: Both servers support hot reload

## 🌟 Key Features Explained

### Natural Language Processing
The AI service processes natural language descriptions and:
- Detects industry themes from keywords
- Generates appropriate color palettes
- Ensures accessibility compliance
- Creates meaningful color names and usage descriptions

### Accessibility-First Design
- Automatic contrast ratio calculations
- WCAG AA/AAA compliance checking
- Color adjustment for accessibility requirements
- Detailed accessibility metadata in exports

### Industry-Specific Intelligence
Each industry theme includes:
- Carefully curated color palettes
- Industry-appropriate emotion tags
- Professional color usage guidelines
- Accessibility-optimized color relationships

## 🚀 Deployment

### Environment Setup
1. Set up environment variables in production
2. Configure CORS origins for your domain
3. Set up rate limiting for API protection

### Production Build
```bash
npm run build
npm start
```

### Docker Deployment (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/ ./dist/
EXPOSE 3001
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

ISC License - see LICENSE file for details

## 🆘 Support

- **API Issues**: Check server logs and environment variables
- **Color Issues**: Verify OKLCH color space support in your browser
- **Export Issues**: Ensure proper format selection and valid palette data

## 🎯 Roadmap

- [ ] Additional color spaces (HSL, RGB)
- [ ] Advanced AI features (image-to-palette)
- [ ] Team collaboration features
- [ ] Version control for palettes
- [ ] Mobile app
- [ ] Figma plugin integration

---

Built with ❤️ for designers and developers who want accessible, beautiful color palettes without the complexity.
