# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack web application for alamin.rocks:
- **Backend**: Django 3.0 with Django REST Framework (Python 3.8)
- **Frontend**: Vue.js 2.6 with Vue CLI
- **Database**: PostgreSQL 9.6
- **Containerization**: Docker Compose

## Essential Commands

### Development Setup
```bash
# Using Docker (recommended)
docker-compose up

# Services will be available at:
# - Frontend: http://localhost:30003
# - Backend API: http://localhost:30002
# - PostgreSQL: localhost:30001
```

### Frontend Development
```bash
cd frontend/app
npm install          # Install dependencies
npm run serve        # Dev server with hot-reload at localhost:8080
npm run build        # Production build
npm run lint         # Lint and fix files (ESLint with Vue plugin)
```

### Backend Development
```bash
cd backend/src
python manage.py runserver       # Dev server at localhost:8000
python manage.py makemigrations  # Create new migrations
python manage.py migrate         # Apply migrations
python manage.py test            # Run tests (Django test framework)
```

## Architecture

### Directory Structure
- `backend/` - Django REST API
  - `src/api/` - API app (models, views, serializers)
  - `src/core/` - Django project settings
  - Environment variables managed via python-decouple
  - CORS configured for frontend communication
  
- `frontend/app/` - Vue.js SPA
  - `src/components/` - Vue components
  - Standard Vue CLI project structure
  
- `deprecated/` - Old static HTML site (being phased out)

### Key Configuration
- Backend settings: `backend/src/core/settings.py`
- Frontend config: `frontend/app/package.json`
- Docker setup: `docker-compose.yaml`

## Development Notes
- The backend API is minimally implemented - no custom endpoints yet beyond Django defaults
- Frontend uses standard Vue CLI setup with ESLint
- No backend linting tools configured (consider adding flake8/black)
- Test coverage is minimal - only empty test files exist