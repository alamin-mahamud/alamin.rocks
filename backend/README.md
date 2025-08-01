# Backend API - alamin.rocks

Refactored FastAPI backend with modern architecture patterns.

## Architecture Overview

### Key Improvements

1. **Service Layer Pattern**
   - Separated business logic from API routes
   - Services handle all data operations
   - Easy to test and maintain

2. **Schema Separation**
   - Request/Response models in `schemas/`
   - Database models in `models/`
   - Clear separation of concerns

3. **Dependency Injection**
   - Services injected via FastAPI's DI system
   - Singleton pattern for service instances
   - Better testability

4. **Error Handling**
   - Custom exception classes
   - Middleware for consistent error responses
   - Proper HTTP status codes

5. **Logging & Monitoring**
   - Structured logging configuration
   - Request/Response logging middleware
   - Performance tracking

6. **API Versioning**
   - All endpoints under `/api/v1/`
   - Easy to add new versions
   - Backward compatibility

## Project Structure

```
backend/
├── app/
│   ├── api/            # API route handlers
│   │   ├── contact.py
│   │   ├── portfolio.py
│   │   └── resume.py
│   ├── core/           # Core configuration
│   │   ├── config.py   # Settings management
│   │   ├── dependencies.py # DI setup
│   │   ├── logging.py  # Logging config
│   │   └── middleware.py # Custom middleware
│   ├── models/         # Database models
│   │   └── resume.py
│   ├── schemas/        # Pydantic schemas
│   │   ├── contact.py
│   │   ├── portfolio.py
│   │   └── resume.py
│   ├── services/       # Business logic
│   │   ├── contact.py
│   │   ├── portfolio.py
│   │   └── resume.py
│   ├── utils/          # Utilities
│   │   ├── exceptions.py
│   │   └── validators.py
│   └── main.py         # Application entry
├── tests/              # Test suite
├── requirements.txt    # Dependencies
└── .env.example        # Environment template
```

## API Endpoints

### Contact API
- `POST /api/v1/contact/` - Send contact message
- `GET /api/v1/contact/messages` - Get all messages (admin)
- `GET /api/v1/contact/messages/{id}` - Get specific message

### Portfolio API
- `GET /api/v1/portfolio/projects` - List projects
- `GET /api/v1/portfolio/projects/{id}` - Get project details
- `POST /api/v1/portfolio/projects` - Create project
- `PATCH /api/v1/portfolio/projects/{id}` - Update project
- `DELETE /api/v1/portfolio/projects/{id}` - Delete project

### Resume API
- `GET /api/v1/resume` - Get full resume
- `GET /api/v1/resume/contact` - Get contact info
- `GET /api/v1/resume/experience` - Get experiences
- `GET /api/v1/resume/projects` - Get projects
- `GET /api/v1/resume/skills` - Get skills
- `GET /api/v1/resume/education` - Get education
- `GET /api/v1/resume/awards` - Get awards
- `GET /api/v1/resume/certifications` - Get certifications
- `GET /api/v1/resume/community` - Get community engagement

## Setup

1. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the application:
   ```bash
   uvicorn app.main:app --reload
   ```

## Development

- API docs: http://localhost:8000/api/docs
- ReDoc: http://localhost:8000/api/redoc

## Next Steps

- Database integration with SQLAlchemy
- Authentication & authorization
- Rate limiting
- Caching with Redis
- Background tasks with Celery
- API tests with pytest