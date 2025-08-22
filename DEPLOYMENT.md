# Token Generator App - Deployment Guide

## 🚀 Quick Start (Development)

### Prerequisites
- Node.js 18+
- npm or yarn
- OpenAI API key (optional - app works with mock data)

### Development Setup

1. **Install dependencies**:
```bash
npm install
```

2. **Set up environment variables**:
```bash
cp .env.example .env
# Edit .env and add your OpenAI API key (optional)
```

3. **Start development servers**:
```bash
npm run dev
```

This starts:
- 🎨 Frontend: http://localhost:5173
- 🔧 Backend API: http://localhost:3001
- 📖 Health Check: http://localhost:3001/health

## 🌐 Production Deployment

### Environment Variables

Create a `.env` file with:

```env
# Required for AI features (optional - falls back to mock data)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Server Configuration
PORT=3001
NODE_ENV=production
TIMEOUT_MS=45000

# CORS Configuration (update with your domain)
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Frontend Configuration
VITE_API_URL=https://your-api-domain.com/api
```

### Build and Deploy

1. **Build the application**:
```bash
npm run build
```

2. **Start production server**:
```bash
npm start
```

### Docker Deployment

1. **Create Dockerfile**:
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy built application
COPY dist/ ./dist/
COPY server/ ./server/

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

# Start application
CMD ["npm", "start"]
```

2. **Build and run container**:
```bash
docker build -t token-generator-app .
docker run -p 3001:3001 --env-file .env token-generator-app
```

### Vercel Deployment

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Create vercel.json**:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/server/index.js",
      "use": "@vercel/node"
    },
    {
      "src": "dist/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/dist/server/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/dist/$1"
    }
  ],
  "env": {
    "OPENAI_API_KEY": "@openai-api-key",
    "NODE_ENV": "production"
  }
}
```

3. **Deploy**:
```bash
vercel --prod
```

### Railway Deployment

1. **Connect GitHub repository** to Railway
2. **Set environment variables** in Railway dashboard
3. **Deploy automatically** on git push

### Heroku Deployment

1. **Create Procfile**:
```
web: npm start
```

2. **Deploy**:
```bash
heroku create your-app-name
heroku config:set OPENAI_API_KEY=your-key
heroku config:set NODE_ENV=production
git push heroku main
```

## 🔧 Configuration

### API Configuration

The backend API can be configured via environment variables:

- `OPENAI_API_KEY`: Your OpenAI API key (optional)
- `MODEL`: Primary AI model (default: gpt-4o)
- `FALLBACK_MODEL`: Fallback model (default: gpt-3.5-turbo)
- `TIMEOUT_MS`: Request timeout (default: 45000ms)

### Frontend Configuration

The frontend can be configured via Vite environment variables:

- `VITE_API_URL`: Backend API URL (default: http://localhost:3001/api)

### CORS Configuration

Update `ALLOWED_ORIGINS` in your environment to include your production domains:

```env
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

## 📊 Monitoring

### Health Checks

The app provides a health check endpoint:

```bash
curl http://localhost:3001/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2025-01-15T10:00:00.000Z",
  "version": "1.0.0"
}
```

### Logging

The backend logs important events:
- API requests and responses
- AI service calls
- Error details
- Rate limiting events

### Performance Monitoring

Monitor these metrics:
- API response times (target: <5s for palette generation)
- Memory usage
- Rate limiting effectiveness
- AI service availability

## 🔒 Security

### API Security

- **Rate Limiting**: Prevents API abuse
- **CORS**: Restricts cross-origin requests
- **Helmet**: Security headers
- **Input Validation**: Validates all API inputs

### Environment Security

- **API Keys**: Store securely in environment variables
- **HTTPS**: Use HTTPS in production
- **Error Handling**: Don't expose sensitive information

## 🐛 Troubleshooting

### Common Issues

1. **API Key Issues**:
   - Verify OpenAI API key is valid
   - Check rate limits on OpenAI account
   - App falls back to mock data if API unavailable

2. **CORS Issues**:
   - Update ALLOWED_ORIGINS in environment
   - Check frontend API URL configuration

3. **Build Issues**:
   - Clear node_modules and reinstall
   - Check TypeScript configuration
   - Verify all dependencies are installed

4. **Color Issues**:
   - Verify browser supports OKLCH color space
   - Check color format validation
   - Ensure proper contrast calculations

### Debug Mode

Enable debug logging:
```env
NODE_ENV=development
```

## 📈 Scaling

### Performance Optimization

1. **Caching**: Implement Redis for AI response caching
2. **CDN**: Use CDN for static assets
3. **Load Balancing**: Multiple server instances
4. **Database**: Move from memory to persistent storage

### AI Service Optimization

1. **Response Caching**: Cache similar palette requests
2. **Model Selection**: Use appropriate models for different requests
3. **Batch Processing**: Group similar requests
4. **Fallback Strategy**: Multiple AI providers

## 🔄 Updates

### Updating Dependencies

```bash
npm update
npm audit fix
```

### Updating AI Models

Update the model configuration in environment variables:
```env
MODEL=gpt-4o-mini        # For cost optimization
FALLBACK_MODEL=gpt-3.5-turbo
```

## 📞 Support

### Getting Help

1. Check the health endpoint: `/health`
2. Review server logs for errors
3. Test with mock data first
4. Verify environment configuration

### Backup Strategy

The app is stateless, but consider backing up:
- Environment configuration
- Custom theme definitions
- Usage analytics (if implemented)

---

For additional support, check the main README.md file or create an issue in the repository.