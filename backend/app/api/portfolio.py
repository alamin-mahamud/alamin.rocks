from fastapi import APIRouter
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

class Project(BaseModel):
    id: str
    title: str
    description: str
    technologies: List[str]
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    image_url: Optional[str] = None
    featured: bool = False
    created_at: datetime

# Sample data
projects = [
    {
        "id": "1",
        "title": "E-commerce Platform",
        "description": "A full-stack e-commerce solution with real-time inventory management",
        "technologies": ["Next.js", "FastAPI", "PostgreSQL", "Redis"],
        "github_url": "https://github.com/alamin-mahamud/ecommerce",
        "live_url": "https://shop.example.com",
        "image_url": "/images/projects/ecommerce.png",
        "featured": True,
        "created_at": datetime.now()
    },
    {
        "id": "2", 
        "title": "Task Management System",
        "description": "Collaborative task management app with real-time updates",
        "technologies": ["React", "Node.js", "MongoDB", "Socket.io"],
        "github_url": "https://github.com/alamin-mahamud/taskmaster",
        "image_url": "/images/projects/taskmaster.png",
        "featured": True,
        "created_at": datetime.now()
    }
]

@router.get("/projects", response_model=List[Project])
async def get_projects(featured: Optional[bool] = None):
    if featured is not None:
        return [p for p in projects if p["featured"] == featured]
    return projects

@router.get("/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    project = next((p for p in projects if p["id"] == project_id), None)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project