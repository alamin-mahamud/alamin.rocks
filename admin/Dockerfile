# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci && npm cache clean --force

# Copy source code and build
COPY . .
RUN npm run build

# Production stage - serve static files
FROM nginx:alpine AS runner

# Copy custom nginx config
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf

# Copy static files
COPY --from=builder /app/out /usr/share/nginx/html

# Set up nginx directories and permissions
RUN mkdir -p /var/cache/nginx/client_temp && \
  mkdir -p /var/cache/nginx/proxy_temp && \
  mkdir -p /var/cache/nginx/fastcgi_temp && \
  mkdir -p /var/cache/nginx/uwsgi_temp && \
  mkdir -p /var/cache/nginx/scgi_temp && \
  chown -R nginx:nginx /var/cache/nginx && \
  chown -R nginx:nginx /var/log/nginx && \
  chown -R nginx:nginx /etc/nginx/conf.d && \
  touch /var/run/nginx.pid && \
  chown -R nginx:nginx /var/run/nginx.pid

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
