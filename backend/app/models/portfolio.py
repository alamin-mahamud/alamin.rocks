from pydantic import BaseModel, HttpUrl
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum

class ProjectStatus(str, Enum):
    COMPLETED = "completed"
    IN_PROGRESS = "in-progress"
    MAINTAINED = "maintained"

class ProjectCategory(str, Enum):
    AI_ML = "AI/ML"
    DEVOPS_SRE = "DevOps/SRE"
    INFRASTRUCTURE = "Infrastructure"
    SOCIAL_IMPACT = "Social Impact"
    FULL_STACK = "Full Stack"

class Project(BaseModel):
    id: str
    title: str
    description: str
    long_description: Optional[str] = None
    technologies: List[str]
    github_url: Optional[HttpUrl] = None
    live_url: Optional[HttpUrl] = None
    demo_url: Optional[HttpUrl] = None
    image_url: Optional[str] = None
    featured: bool = False
    category: ProjectCategory
    impact: Dict[str, Any] = {}
    stats: Dict[str, Any] = {}
    status: ProjectStatus = ProjectStatus.COMPLETED
    ai_powered: bool = False
    created_at: datetime
    updated_at: datetime

class TechSkill(BaseModel):
    id: str
    name: str
    category: str
    level: int  # 0-100
    years_exp: int
    icon: str
    color: str
    projects: int
    created_at: datetime
    updated_at: datetime

class Achievement(BaseModel):
    id: str
    title: str
    value: str
    description: str
    icon: str
    color: str
    percentage: float
    details: List[str]
    category: str
    created_at: datetime
    updated_at: datetime

class LinkedInRecommendation(BaseModel):
    id: str
    recommender_name: str
    recommender_title: str
    recommender_company: str
    recommender_image: Optional[str] = None
    relationship: str  # "worked with", "managed", "was managed by", etc.
    content: str
    date: datetime
    skills_mentioned: List[str] = []
    created_at: datetime
    updated_at: datetime

class Hero(BaseModel):
    id: str = "hero"
    roles: List[str]
    name: str
    description: str
    metrics: Dict[str, str]
    updated_at: datetime

class About(BaseModel):
    id: str = "about"
    title: str
    description: List[str]
    skills: List[str]
    quick_facts: Dict[str, str]
    updated_at: datetime

class ContactInfo(BaseModel):
    id: str = "contact"
    email: str
    phone: str
    location: str
    social_links: Dict[str, str]
    updated_at: datetime