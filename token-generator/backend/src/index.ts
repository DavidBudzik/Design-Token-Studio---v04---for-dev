import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import { rateLimiter } from './middleware/rateLimiter';
import paletteRoutes from './routes/palette';
import healthRoutes from './routes/health';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';

// Middleware
app.use(helmet({
  contentSecurityPolicy: isProduction ? undefined : false
}));
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'],
  credentials: true
}));
app.use(express.json());
app.use(rateLimiter);

// API Routes
app.use('/api/health', healthRoutes);
app.use('/api/palette', paletteRoutes);

// Serve static files in production
if (isProduction) {
  const publicPath = path.join(__dirname, '..', 'public');
  app.use(express.static(publicPath));
  
  // Handle client-side routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });
}

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});