# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Modern full-stack portfolio website for alamin.rocks:
- **Backend**: FastAPI with Python 3.11
- **Frontend**: Next.js 14 with TypeScript
- **Admin Dashboard**: Next.js 14 with TypeScript
- **Database**: PostgreSQL 15
- **Styling**: TailwindCSS
- **Containerization**: Docker Compose

## Essential Commands

### Development Setup
```bash
# Using Docker (recommended)
docker-compose up --build

# Services will be available at:
# - Frontend: http://localhost:3081
# - Admin Dashboard: http://localhost:3082
# - Backend API: http://localhost:8081
# - PostgreSQL: localhost:5443
# - Redis: localhost:6390
```

### Frontend Development
```bash
cd frontend
npm install          # Install dependencies
npm run dev          # Dev server with hot-reload at localhost:3000
npm run build        # Production build
npm run lint         # Run ESLint
```

### Admin Dashboard Development
```bash
cd admin
npm install          # Install dependencies
npm run dev          # Dev server with hot-reload at localhost:3001
npm run build        # Production build
npm run lint         # Run ESLint
```

### Backend Development
```bash
cd backend
pip install -r requirements.txt    # Install dependencies
uvicorn app.main:app --reload      # Dev server at localhost:8000
pytest                             # Run tests
```

## Architecture

### Directory Structure
- `backend/` - FastAPI REST API
  - `app/api/` - API routes (contact, portfolio, resume)
  - `app/core/` - Configuration and settings
  - `app/models/` - Database models
  - `app/schemas/` - Pydantic request/response schemas
  - `app/services/` - Business logic layer
  - `app/utils/` - Utilities and exceptions
  - Environment variables managed via pydantic-settings
  
- `frontend/` - Next.js 14 App Router
  - `src/app/` - App router pages and layouts
  - `src/components/` - React components
  - TypeScript throughout
  
- `admin/` - Next.js 14 Admin Dashboard
  - `src/app/` - App router pages (login, dashboard, management)
  - `src/components/` - Admin UI components
  - `src/contexts/` - Theme and auth contexts
  - `src/lib/` - API client and utilities
  - `src/types/` - TypeScript type definitions
  - Login: admin/admin123
  
### Key Configuration
- Backend settings: `backend/app/core/config.py`
- Frontend config: `frontend/next.config.js`
- Styling: `frontend/tailwind.config.ts`
- Docker setup: `docker-compose.yml`

## Development Notes
- Clean, modern design with light theme
- Fully responsive with TailwindCSS
- TypeScript for type safety
- FastAPI with automatic API documentation
- Docker containerization for easy deployment