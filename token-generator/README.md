# Token Generator App

An AI-powered color palette generator that enables users to create accessible, industry-specific color palettes using natural language descriptions. Built with the M-Design System principles and supporting WCAG AA/AAA compliance.

![Token Generator Screenshot](screenshot.png)

## Features

- 🎨 **AI-Powered Generation**: Generate color palettes using natural language descriptions
- 🏭 **Industry Themes**: 12 pre-configured industry themes (Technology, Healthcare, Finance, etc.)
- ♿ **Accessibility First**: Automatic WCAG AA/AAA compliance checking and enforcement
- 🎯 **OKLCH Color Space**: Modern perceptually-uniform color space for better color accuracy
- 📤 **Multiple Export Formats**: JSON, CSS, Tailwind, and Figma Tokens
- 🚀 **Real-time Preview**: Instant palette visualization with interactive color swatches
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **Frontend**: React, Vite, Tailwind CSS
- **AI Integration**: OpenAI API (GPT-4/GPT-3.5)
- **Color Science**: OKLCH color space
- **Deployment**: Docker, Docker Compose

## Prerequisites

- Node.js 18+ or Docker
- OpenAI API key (for AI features)
- npm or yarn

## Quick Start

### Using Docker (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/yourusername/token-generator.git
cd token-generator
```

2. Create a `.env` file:
```bash
cp backend/.env.example .env
# Edit .env and add your OpenAI API key
```

3. Run with Docker Compose:
```bash
# Production mode
docker-compose up

# Development mode
docker-compose --profile dev up
```

The app will be available at `http://localhost:3001`

### Manual Installation

1. Clone and install dependencies:
```bash
git clone https://github.com/yourusername/token-generator.git
cd token-generator
npm install
```

2. Set up environment variables:
```bash
cp backend/.env.example backend/.env
# Edit backend/.env and add your OpenAI API key
```

3. Build shared types:
```bash
npm run build:shared
```

4. Run in development:
```bash
npm run dev
```

The backend will run on `http://localhost:3001` and frontend on `http://localhost:5173`

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key | Required for AI features |
| `MODEL` | Primary AI model | `gpt-4-turbo-preview` |
| `FALLBACK_MODEL` | Fallback AI model | `gpt-3.5-turbo` |
| `PORT` | Server port | `3001` |
| `NODE_ENV` | Environment mode | `development` |
| `ALLOWED_ORIGINS` | CORS allowed origins | `http://localhost:5173` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | `60000` |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` |

## Usage

1. **Select an Industry Theme**: Choose from 12 pre-configured themes or let the AI detect from your description

2. **Describe Your Palette**: Enter a natural language description like:
   - "Vibrant tech theme with earthy undertones"
   - "Professional finance app with trustworthy blues"
   - "Energetic fitness brand with motivating colors"

3. **Generate**: Click generate to create your palette

4. **Review Accessibility**: Check the WCAG compliance status and contrast ratios

5. **Export**: Download in your preferred format:
   - **JSON**: For custom implementations
   - **CSS**: As CSS custom properties
   - **Tailwind**: For Tailwind config
   - **Figma**: For Figma Tokens plugin

## API Endpoints

### Generate Palette
```http
POST /api/palette/generate
Content-Type: application/json

{
  "description": "modern tech startup with vibrant colors",
  "theme": "technology",
  "enforceAccessibility": true,
  "accessibilityLevel": "AA"
}
```

### Get Themes
```http
GET /api/palette/themes
```

### Export Palette
```http
POST /api/palette/export
Content-Type: application/json

{
  "palette": { ... },
  "format": "json|css|tailwind|figma"
}
```

## Development

### Project Structure
```
token-generator/
├── backend/          # Express API server
├── frontend/         # React application
├── shared/           # Shared TypeScript types
├── docker-compose.yml
└── Dockerfile
```

### Running Tests
```bash
# Run all tests
npm test

# Run backend tests
cd backend && npm test

# Run frontend tests
cd frontend && npm test
```

### Building for Production
```bash
# Build all packages
npm run build

# Build Docker image
docker build -t token-generator .
```

## Deployment

### Using Docker

1. Build the image:
```bash
docker build -t token-generator .
```

2. Run the container:
```bash
docker run -p 3001:3001 --env-file .env token-generator
```

### Using PM2

```bash
npm run build
pm2 start ecosystem.config.js
```

### Cloud Deployment

The app is configured for easy deployment to:
- AWS ECS/Fargate
- Google Cloud Run
- Azure Container Instances
- Heroku (with container runtime)
- DigitalOcean App Platform

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with the M-Design System principles
- Uses OKLCH color space for perceptually uniform colors
- Powered by OpenAI for intelligent palette generation
- Inspired by modern design systems and accessibility standards

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.