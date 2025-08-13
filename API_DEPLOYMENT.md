# API Server Deployment Guide

This guide explains how to deploy only the API server (api.alamin.rocks) with nginx and SSL, while the frontend and admin panel are hosted on Vercel.

## Architecture Overview

- **Frontend** (alamin.rocks) → Hosted on Vercel
- **Admin Panel** (admin.alamin.rocks) → Hosted on Vercel  
- **API Server** (api.alamin.rocks) → Self-hosted with Docker

## Prerequisites

1. Server with Docker and Docker Compose installed
2. Domain configured: `api.alamin.rocks` → Your server IP (103.198.137.95)
3. Ports 80 and 443 open in firewall

## Quick Start

### 1. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/alamin.rocks.git
cd alamin.rocks

# Copy production environment file
cp .env.production.example .env.production

# Edit with your actual values
nano .env.production
```

### 2. Configure DNS

Add an A record in your DNS provider:
```
Type: A
Name: api
Value: 103.198.137.95
TTL: 3600
```

Wait for DNS propagation (verify with `nslookup api.alamin.rocks`)

### 3. Deploy Without SSL (Testing)

```bash
# Start services without SSL first
docker-compose -f docker-compose.prod.yml up -d

# Check if API is accessible
curl http://your-server-ip/api/health
```

### 4. Setup SSL with Let's Encrypt

```bash
# Edit the init script with your email
nano init-letsencrypt.sh
# Change: email="your-email@example.com"

# Run the SSL initialization script
./init-letsencrypt.sh

# The script will:
# 1. Download SSL parameters
# 2. Create dummy certificates
# 3. Start nginx
# 4. Request real certificates from Let's Encrypt
# 5. Reload nginx with valid certificates
```

### 5. Start Production Services

```bash
# Stop any running containers
docker-compose -f docker-compose.prod.yml down

# Start all services with SSL enabled
docker-compose -f docker-compose.prod.yml up -d

# Check logs
docker-compose -f docker-compose.prod.yml logs -f
```

## Service Management

### Check Status
```bash
# View running containers
docker-compose -f docker-compose.prod.yml ps

# Check service logs
docker-compose -f docker-compose.prod.yml logs backend
docker-compose -f docker-compose.prod.yml logs nginx
```

### Restart Services
```bash
# Restart specific service
docker-compose -f docker-compose.prod.yml restart backend

# Restart all services
docker-compose -f docker-compose.prod.yml restart
```

### Update and Deploy
```bash
# Pull latest changes
git pull

# Rebuild and restart
docker-compose -f docker-compose.prod.yml up -d --build
```

## SSL Certificate Management

### Auto-renewal
The certbot container automatically renews certificates every 12 hours. No manual intervention needed.

### Manual Renewal
```bash
# Force renewal
docker-compose -f docker-compose.prod.yml run --rm certbot renew --force-renewal

# Reload nginx
docker-compose -f docker-compose.prod.yml exec nginx nginx -s reload
```

### Check Certificate Status
```bash
# View certificate details
docker-compose -f docker-compose.prod.yml run --rm certbot certificates
```

## Database Management

### Backup Database
```bash
# Create backup
docker-compose -f docker-compose.prod.yml exec db pg_dump -U postgres alamin_rocks > backup_$(date +%Y%m%d).sql

# Compress backup
gzip backup_$(date +%Y%m%d).sql
```

### Restore Database
```bash
# Restore from backup
gunzip backup_20240101.sql.gz
docker-compose -f docker-compose.prod.yml exec -T db psql -U postgres alamin_rocks < backup_20240101.sql
```

### Access Database
```bash
# Connect to PostgreSQL
docker-compose -f docker-compose.prod.yml exec db psql -U postgres -d alamin_rocks
```

## Monitoring

### Health Checks
```bash
# API health
curl https://api.alamin.rocks/health

# Detailed health check
curl https://api.alamin.rocks/api/health
```

### Resource Usage
```bash
# Check container resources
docker stats

# Check disk usage
df -h

# Check memory
free -h
```

### Logs
```bash
# Backend logs
docker-compose -f docker-compose.prod.yml logs -f backend

# Nginx access logs
docker-compose -f docker-compose.prod.yml exec nginx tail -f /var/log/nginx/access.log

# Nginx error logs
docker-compose -f docker-compose.prod.yml exec nginx tail -f /var/log/nginx/error.log
```

## Troubleshooting

### Mixed Content Issues
If admin panel can't reach API:
1. Verify SSL certificate is valid: `curl -I https://api.alamin.rocks`
2. Check CORS settings in backend
3. Verify admin panel is using `https://api.alamin.rocks` URL

### Certificate Issues
```bash
# Check certificate validity
openssl s_client -connect api.alamin.rocks:443 -servername api.alamin.rocks

# Recreate certificates
./init-letsencrypt.sh
```

### Connection Issues
```bash
# Test backend directly
docker-compose -f docker-compose.prod.yml exec backend curl http://localhost:8000/health

# Test nginx proxy
curl http://localhost/api/health

# Check firewall
sudo ufw status
```

### Database Connection Issues
```bash
# Check if database is running
docker-compose -f docker-compose.prod.yml ps db

# Check database logs
docker-compose -f docker-compose.prod.yml logs db

# Test connection
docker-compose -f docker-compose.prod.yml exec backend python -c "from app.database import engine; print('DB connected')"
```

## Security Considerations

1. **Environment Variables**: Never commit `.env.production` to git
2. **Firewall**: Only allow ports 80, 443, and SSH
3. **Updates**: Regularly update Docker images and system packages
4. **Backups**: Set up automated daily database backups
5. **Monitoring**: Use tools like Datadog or New Relic for production monitoring

## File Structure

```
alamin.rocks/
├── backend/           # FastAPI backend (deployed)
├── frontend/          # Next.js frontend (Vercel)
├── admin/            # Admin panel (Vercel)
├── nginx/            # Nginx configuration
│   ├── nginx.conf    # Main nginx config
│   ├── conf.d/       # SSL configurations
│   │   └── ssl-api.conf      # API SSL config
│   ├── Dockerfile    # Nginx Docker image
│   └── certbot/      # SSL certificates (auto-generated)
├── docker-compose.yml        # Development compose
├── docker-compose.prod.yml   # Production compose
├── init-letsencrypt.sh      # SSL setup script
└── .env.production          # Production environment (create this)
```

## Support

For issues or questions:
1. Check logs: `docker-compose -f docker-compose.prod.yml logs`
2. Review this guide
3. Check nginx configuration: `docker-compose -f docker-compose.prod.yml exec nginx nginx -t`