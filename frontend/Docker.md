# Frontend Docker Setup

This frontend is configured for static export using Next.js and served with nginx.

## Files

- `Dockerfile` - Production build for static export (current setup)
- `Dockerfile.server` - Alternative for Next.js server mode
- `nginx.conf` - Nginx configuration for serving static files
- `.dockerignore` - Files to exclude from Docker build

## Build and Run

### Production (Static Export)
```bash
# Build the image
docker build -t alamin-rocks-frontend .

# Run the container
docker run -p 3000:3000 alamin-rocks-frontend
```

### With Docker Compose
```bash
# Production build
docker-compose up --build

# Development with hot reload
docker-compose -f docker-compose.dev.yml up --build
```

## Configuration

### Current Setup (Static Export)
- Uses nginx to serve static files from `/app/out`
- Optimized for production with gzip compression
- Security headers included
- Health check endpoint at `/health`

### Alternative Setup (Server Mode)
- If you want to use Next.js server mode:
  1. Remove `output: 'export'` from `next.config.js`
  2. Rename `Dockerfile.server` to `Dockerfile`
  3. Update `docker-compose.yml` to use server dockerfile

## Port Mapping
- Container: Port 3000
- Host: Port 3000 (configurable in docker-compose.yml)

## Environment Variables
- `NEXT_PUBLIC_API_URL` - Backend API URL (set in docker-compose.yml)

## Health Check
Visit `http://localhost:3000/health` to verify the service is running.