# Build stage for shared module
FROM node:18-alpine AS shared-builder
WORKDIR /app
COPY shared/package*.json ./shared/
COPY shared/tsconfig.json ./shared/
COPY shared/src ./shared/src
WORKDIR /app/shared
RUN npm ci
RUN npm run build

# Build stage for backend
FROM node:18-alpine AS backend-builder
WORKDIR /app
COPY backend/package*.json ./backend/
COPY backend/tsconfig.json ./backend/
COPY --from=shared-builder /app/shared ./shared
WORKDIR /app/backend
RUN npm ci
COPY backend/src ./src
RUN npm run build

# Build stage for frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app
COPY frontend/package*.json ./frontend/
COPY frontend/tsconfig*.json ./frontend/
COPY frontend/vite.config.ts ./frontend/
COPY frontend/tailwind.config.js ./frontend/
COPY frontend/postcss.config.js ./frontend/
COPY frontend/index.html ./frontend/
COPY --from=shared-builder /app/shared ./shared
WORKDIR /app/frontend
RUN npm ci
COPY frontend/src ./src
COPY frontend/public ./public 2>/dev/null || true
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Install production dependencies for backend
COPY backend/package*.json ./
RUN npm ci --only=production

# Copy built backend
COPY --from=backend-builder /app/backend/dist ./dist
COPY --from=shared-builder /app/shared/dist ./node_modules/@token-generator/shared/dist
COPY --from=shared-builder /app/shared/package.json ./node_modules/@token-generator/shared/

# Copy built frontend to be served by backend
COPY --from=frontend-builder /app/frontend/dist ./public

# Environment variables
ENV NODE_ENV=production
ENV PORT=3001

# Expose port
EXPOSE 3001

# Start the server
CMD ["node", "dist/index.js"]