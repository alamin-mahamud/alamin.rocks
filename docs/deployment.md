# Deployment Guide

## Overview

This guide covers deployment strategies for the alamin.rocks portfolio website, from development to production environments. The application is designed for modern cloud platforms with CI/CD integration.

## Quick Deployment Options

### 1. Vercel (Recommended for Frontend)

**Why Vercel:**
- Optimized for Next.js applications
- Automatic deployments from Git
- Edge network with global CDN
- Zero-config setup

**Setup:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from root directory
cd frontend
vercel

# Follow interactive setup:
# Project name: alamin-rocks
# Directory: ./
# Override settings: No
```

**Environment Variables:**
```bash
# Add via Vercel dashboard or CLI
vercel env add NEXT_PUBLIC_API_URL production
# Value: https://api.alamin.rocks
```

**Custom Domain:**
```bash
vercel domains add alamin.rocks
vercel domains add www.alamin.rocks
```

### 2. Railway (Full-Stack Deployment)

**Why Railway:**
- Simple full-stack deployments
- Built-in PostgreSQL and Redis
- Automatic HTTPS certificates
- Git-based deployments

**Setup:**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and initialize
railway login
railway init

# Deploy services
railway add postgresql
railway add redis
railway deploy
```

**Environment Variables:**
```bash
# Railway automatically provides:
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
PORT=3000
```

### 3. Docker Compose Production

**Production Docker Compose:**
```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  frontend:
    build: 
      context: ./frontend
      dockerfile: Dockerfile.prod
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=https://api.alamin.rocks
    restart: unless-stopped

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.prod
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:password@postgres:5432/portfolio
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis
    restart: unless-stopped

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=portfolio
      - POSTGRES_USER=portfolio_user
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backend/sql/init.sql:/docker-entrypoint-initdb.d/init.sql
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend
    restart: unless-stopped

volumes:
  postgres_data:
```

**Production Dockerfile (Frontend):**
```dockerfile
# frontend/Dockerfile.prod
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

## CI/CD Pipeline

### GitHub Actions

**Frontend Deployment:**
```yaml
# .github/workflows/deploy-frontend.yml
name: Deploy Frontend

on:
  push:
    branches: [main]
    paths: ['frontend/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json
          
      - name: Install dependencies
        run: |
          cd frontend
          npm ci
          
      - name: Run tests
        run: |
          cd frontend
          npm run test
          
      - name: Build application
        run: |
          cd frontend
          npm run build
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./frontend
```

**Backend Deployment:**
```yaml
# .github/workflows/deploy-backend.yml
name: Deploy Backend

on:
  push:
    branches: [main]
    paths: ['backend/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
          
      - name: Install dependencies
        run: |
          cd backend
          pip install -r requirements.txt
          
      - name: Run tests
        run: |
          cd backend
          pytest
          
      - name: Deploy to Railway
        run: |
          npm install -g @railway/cli
          railway login --token ${{ secrets.RAILWAY_TOKEN }}
          railway up --service backend
```

## Environment Configuration

### Development Environment
```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_ENVIRONMENT=development

# backend/.env
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio_dev
REDIS_URL=redis://localhost:6379
CORS_ORIGINS=http://localhost:3000
DEBUG=true
```

### Staging Environment
```bash
# frontend/.env.staging
NEXT_PUBLIC_API_URL=https://api-staging.alamin.rocks
NEXT_PUBLIC_ENVIRONMENT=staging

# backend/.env.staging
DATABASE_URL=postgresql://user:password@staging-db:5432/portfolio_staging
REDIS_URL=redis://staging-redis:6379
CORS_ORIGINS=https://staging.alamin.rocks
DEBUG=false
```

### Production Environment
```bash
# frontend/.env.production
NEXT_PUBLIC_API_URL=https://api.alamin.rocks
NEXT_PUBLIC_ENVIRONMENT=production

# backend/.env.production
DATABASE_URL=postgresql://user:password@prod-db:5432/portfolio_prod
REDIS_URL=redis://prod-redis:6379
CORS_ORIGINS=https://alamin.rocks,https://www.alamin.rocks
DEBUG=false
```

## SSL/TLS Configuration

### Nginx SSL Configuration
```nginx
# nginx.conf
events {
    worker_connections 1024;
}

http {
    upstream frontend {
        server frontend:3000;
    }
    
    upstream backend {
        server backend:8000;
    }

    # Redirect HTTP to HTTPS
    server {
        listen 80;
        server_name alamin.rocks www.alamin.rocks;
        return 301 https://$server_name$request_uri;
    }

    # HTTPS Configuration
    server {
        listen 443 ssl http2;
        server_name alamin.rocks www.alamin.rocks;

        ssl_certificate /etc/nginx/ssl/alamin.rocks.crt;
        ssl_certificate_key /etc/nginx/ssl/alamin.rocks.key;
        
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers on;

        # Frontend
        location / {
            proxy_pass http://frontend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Backend API
        location /api/ {
            proxy_pass http://backend/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

### Let's Encrypt SSL (Certbot)
```bash
# Install Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Obtain SSL certificates
sudo certbot --nginx -d alamin.rocks -d www.alamin.rocks

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## Database Migration

### Production Database Setup
```sql
-- backend/sql/init.sql
CREATE DATABASE portfolio_prod;
CREATE USER portfolio_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE portfolio_prod TO portfolio_user;

-- Connect to portfolio_prod database
\c portfolio_prod;

-- Create tables
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_contacts_created_at ON contacts(created_at);
CREATE INDEX idx_users_email ON users(email);
```

### Migration Script
```python
# backend/migrations/migrate.py
import asyncio
import asyncpg
import os

async def migrate_database():
    database_url = os.getenv('DATABASE_URL')
    conn = await asyncpg.connect(database_url)
    
    # Read and execute SQL files
    with open('sql/init.sql', 'r') as f:
        sql_content = f.read()
        await conn.execute(sql_content)
    
    await conn.close()
    print("Database migration completed successfully!")

if __name__ == "__main__":
    asyncio.run(migrate_database())
```

## Monitoring and Health Checks

### Health Check Endpoints
```python
# backend/app/api/health.py
from fastapi import APIRouter
import psutil
import asyncpg
import redis

router = APIRouter()

@router.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow(),
        "version": "1.0.0"
    }

@router.get("/health/detailed")
async def detailed_health_check():
    # Database connectivity
    try:
        conn = await asyncpg.connect(DATABASE_URL)
        await conn.execute("SELECT 1")
        await conn.close()
        db_status = "healthy"
    except Exception as e:
        db_status = f"unhealthy: {str(e)}"
    
    # Redis connectivity  
    try:
        r = redis.Redis.from_url(REDIS_URL)
        r.ping()
        redis_status = "healthy"
    except Exception as e:
        redis_status = f"unhealthy: {str(e)}"
    
    # System resources
    cpu_percent = psutil.cpu_percent(interval=1)
    memory = psutil.virtual_memory()
    
    return {
        "status": "healthy" if db_status == "healthy" and redis_status == "healthy" else "degraded",
        "services": {
            "database": db_status,
            "redis": redis_status
        },
        "system": {
            "cpu_percent": cpu_percent,
            "memory_percent": memory.percent,
            "memory_available": memory.available
        },
        "timestamp": datetime.utcnow()
    }
```

### Docker Health Checks
```dockerfile
# Add to backend Dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1

# Add to frontend Dockerfile  
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1
```

## Performance Optimization

### CDN Configuration
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['cdn.alamin.rocks'],
    loader: 'custom',
    loaderFile: './image-loader.js'
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}
```

### Caching Strategy
```nginx
# Add to nginx.conf
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, no-transform";
}

location ~* \.(woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, no-transform";
    add_header Access-Control-Allow-Origin "*";
}
```

## Backup Strategy

### Database Backup
```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio_prod"

# Create backup directory
mkdir -p $BACKUP_DIR

# Database backup
pg_dump $DATABASE_URL > $BACKUP_DIR/portfolio_backup_$DATE.sql

# Compress backup
gzip $BACKUP_DIR/portfolio_backup_$DATE.sql

# Upload to S3 (optional)
aws s3 cp $BACKUP_DIR/portfolio_backup_$DATE.sql.gz s3://backups/database/

# Clean old backups (keep last 7 days)
find $BACKUP_DIR -name "portfolio_backup_*.sql.gz" -mtime +7 -delete

echo "Backup completed: portfolio_backup_$DATE.sql.gz"
```

### Automated Backup with Cron
```bash
# Add to crontab
0 2 * * * /usr/local/bin/backup.sh >> /var/log/backup.log 2>&1
```

## Rollback Strategy

### Blue-Green Deployment
```bash
#!/bin/bash
# deploy.sh

ENVIRONMENT=$1  # blue or green
NEW_IMAGE="alamin/portfolio:$BUILD_NUMBER"

# Update the inactive environment
docker-compose -f docker-compose.$ENVIRONMENT.yml pull
docker-compose -f docker-compose.$ENVIRONMENT.yml up -d

# Health check
sleep 30
if curl -f http://localhost:300$([[ $ENVIRONMENT == "blue" ]] && echo "1" || echo "2")/health; then
    echo "Health check passed, switching traffic"
    # Update load balancer configuration
    ./switch-traffic.sh $ENVIRONMENT
else
    echo "Health check failed, rolling back"
    docker-compose -f docker-compose.$ENVIRONMENT.yml down
    exit 1
fi
```

## Troubleshooting

### Common Issues

**1. Build Failures:**
```bash
# Clear Next.js cache
rm -rf .next
npm run build

# Clear node_modules
rm -rf node_modules package-lock.json
npm install
```

**2. Database Connection Issues:**
```bash
# Check database connectivity
pg_isready -h hostname -p 5432

# Test connection
psql $DATABASE_URL -c "SELECT version();"
```

**3. SSL Certificate Issues:**
```bash
# Check certificate validity
openssl x509 -in certificate.crt -text -noout

# Renew Let's Encrypt certificate
sudo certbot renew --dry-run
```

**4. Performance Issues:**
```bash
# Check system resources
htop
iostat -x 1

# Monitor application
docker stats
```

### Logs and Debugging

**Application Logs:**
```bash
# Frontend logs
docker-compose logs -f frontend

# Backend logs  
docker-compose logs -f backend

# All services
docker-compose logs -f
```

**System Logs:**
```bash
# Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# System logs
journalctl -u docker -f
```

This comprehensive deployment guide ensures reliable, scalable, and maintainable deployment of the alamin.rocks portfolio website across different environments and platforms.