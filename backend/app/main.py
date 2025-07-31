from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api import (
    contact, portfolio, resume, projects, achievements, 
    techstack, recommendations, hero, about, contact_info
)

app = FastAPI(
    title=settings.app_name,
    debug=settings.debug,
    description="Alamin Mahamud's Portfolio API - Dynamic backend for portfolio website",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url, "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "Welcome to Alamin Rocks API", 
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}

# Include all API routers
app.include_router(contact.router, prefix="/api/contact", tags=["contact"])
app.include_router(portfolio.router, prefix="/api/portfolio", tags=["portfolio"])
app.include_router(resume.router, prefix="/api", tags=["resume"])

# New comprehensive API endpoints
app.include_router(projects.router, prefix="/api/projects", tags=["projects"])
app.include_router(achievements.router, prefix="/api/achievements", tags=["achievements"])
app.include_router(techstack.router, prefix="/api/techstack", tags=["techstack"])
app.include_router(recommendations.router, prefix="/api/recommendations", tags=["recommendations"])
app.include_router(hero.router, prefix="/api/hero", tags=["hero"])
app.include_router(about.router, prefix="/api/about", tags=["about"])
app.include_router(contact_info.router, prefix="/api/contact-info", tags=["contact-info"])