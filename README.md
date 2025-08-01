# Alamin.rocks

Modern portfolio website built with Next.js and FastAPI, featuring a clean, elegant design with light theme.

## Tech Stack

### Frontend
- **Next.js 14** with TypeScript
- **TailwindCSS** for styling
- **Lucide React** for icons
- Responsive design with modern animations

### Backend
- **FastAPI** with Python 3.11
- **Pydantic** for data validation
- RESTful API architecture
- PostgreSQL database
- Redis for caching

## Features

- <� Modern, clean design with light theme
- =� Fully responsive across all devices
- � Fast loading with optimized performance
- =' Contact form with backend API
- =� Project showcase with dynamic content
- =� Docker containerization for easy deployment

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- Docker & Docker Compose (optional)

### Development Setup

#### Option 1: Docker (Recommended)
```bash
# Clone and start all services
docker-compose up --build

# Services will be available at:
# - Frontend: http://localhost:3000
# - Backend API: http://localhost:8000
# - PostgreSQL: localhost:5432
# - Redis: localhost:6379
```

#### Option 2: Manual Setup

**Frontend:**
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

**Backend:**
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your database credentials
uvicorn app.main:app --reload
# Runs on http://localhost:8000
```

### Environment Variables

Create a `.env` file in the backend directory:
```env
DATABASE_URL=postgresql://user:password@localhost/alamin_rocks
REDIS_URL=redis://localhost:6379
SECRET_KEY=your-secret-key-here
FRONTEND_URL=http://localhost:3000
```

## API Endpoints

- `GET /` - API health check
- `GET /health` - Health status
- `GET /api/portfolio/projects` - Get all projects
- `GET /api/portfolio/projects/{id}` - Get specific project
- `POST /api/contact` - Submit contact form

## Deployment

The application is containerized and ready for deployment on any platform supporting Docker:

- **Frontend**: Static build optimized for production
- **Backend**: ASGI server ready for production
- **Database**: PostgreSQL with persistent volumes
- **Caching**: Redis for improved performance

## Development Commands

**Frontend:**
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

**Backend:**
```bash
uvicorn app.main:app --reload    # Development server
pytest                           # Run tests
```

## Project Structure

```
alamin.rocks/
   frontend/               # Next.js application
      src/
         app/           # App router pages
         components/    # React components
         lib/          # Utilities
      public/           # Static assets
      package.json
   backend/              # FastAPI application
      app/
         api/          # API routes
         core/         # Configuration
         models/       # Database models
         schemas/      # Pydantic schemas
      requirements.txt
   docker-compose.yml    # Docker orchestration
   README.md
```

## License

MIT License - feel free to use this as a template for your own portfolio!