import logging.config
from pathlib import Path

from app.api import (
    about,
    achievements,
    analytics,
    assets,
    auth,
    contact,
    contact_info,
    content,
    cv,
    hero,
    portfolio,
    projects,
    recommendations,
    resume,
    techstack,
    translations,
)
from app.core.config import settings
from app.core.logging import setup_logging
from app.core.middleware import ErrorHandlingMiddleware, LoggingMiddleware
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

# Set up logging
setup_logging()
logger = logging.getLogger(__name__)

app = FastAPI(
    title=settings.app_name,
    debug=settings.debug,
    version="1.0.0",
    description="Backend API for alamin.rocks portfolio website",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# Add middleware
app.add_middleware(ErrorHandlingMiddleware)
app.add_middleware(LoggingMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.frontend_url,
        settings.admin_url,
        "https://alamin.rocks",
        "https://www.alamin.rocks",
        "https://admin.alamin.rocks",
        "http://alamin.rocks",
        "http://admin.alamin.rocks",
        "http://localhost:3120",
        "http://localhost:3121",
        "http://10.7.0.1:3121",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to Alamin Rocks API",
        "version": "1.0.0",
        "docs": "/api/docs",
        "health": "/health",
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": settings.app_name, "version": "1.0.0"}


# Include routers with API versioning
api_v1_prefix = "/api/v1"

app.include_router(auth.router, prefix=f"{api_v1_prefix}/auth", tags=["auth"])
app.include_router(contact.router, prefix=f"{api_v1_prefix}/contact", tags=["contact"])
app.include_router(
    portfolio.router, prefix=f"{api_v1_prefix}/portfolio", tags=["portfolio"]
)
app.include_router(resume.router, prefix=f"{api_v1_prefix}", tags=["resume"])

# New comprehensive API endpoints
app.include_router(projects.router, prefix="/api/projects", tags=["projects"])
app.include_router(
    achievements.router, prefix="/api/achievements", tags=["achievements"]
)
app.include_router(techstack.router, prefix="/api/techstack", tags=["techstack"])
app.include_router(
    recommendations.router, prefix="/api/recommendations", tags=["recommendations"]
)
app.include_router(hero.router, prefix="/api/hero", tags=["hero"])
app.include_router(about.router, prefix="/api/about", tags=["about"])
app.include_router(
    contact_info.router, prefix="/api/contact-info", tags=["contact-info"]
)
app.include_router(
    translations.router, prefix="/api", tags=["translations"]
)
app.include_router(
    analytics.router, prefix="/api/analytics", tags=["analytics"]
)
app.include_router(
    assets.router, tags=["assets"]
)
app.include_router(
    cv.router, prefix="/api/cv", tags=["cv"]
)
app.include_router(
    content.router, prefix="/api/content", tags=["content"]
)

# Mount static files for CV PDFs
static_path = Path(__file__).parent.parent / "static"
if static_path.exists():
    app.mount("/static", StaticFiles(directory=str(static_path)), name="static")


# Startup event
@app.on_event("startup")
async def startup_event():
    logger.info(f"{settings.app_name} starting up...")
    # TODO: Initialize database connection
    # TODO: Run migrations


# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    logger.info(f"{settings.app_name} shutting down...")
    # TODO: Close database connections
