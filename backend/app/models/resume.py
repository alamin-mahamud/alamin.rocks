from pydantic import BaseModel, EmailStr, HttpUrl
from typing import List, Optional
from datetime import datetime

class ContactInfo(BaseModel):
    name: str
    email: EmailStr
    phone: str
    website: Optional[HttpUrl] = None
    location: str

class Experience(BaseModel):
    id: str
    company: str
    role: str
    duration: str
    location: str
    current: bool = False
    achievements: List[str]
    technologies: List[str]
    website: Optional[HttpUrl] = None

class Project(BaseModel):
    id: str
    title: str
    description: str
    technologies: List[str]
    github_url: Optional[HttpUrl] = None
    live_url: Optional[HttpUrl] = None
    featured: bool = False

class Education(BaseModel):
    id: str
    institution: str
    degree: str
    field: str
    location: str
    duration: str
    gpa: Optional[float] = None

class Award(BaseModel):
    id: str
    title: str
    organization: str
    location: str
    year: str
    description: Optional[str] = None

class Certification(BaseModel):
    id: str
    name: str
    organization: str
    status: str
    year: Optional[str] = None

class SkillCategory(BaseModel):
    category: str
    skills: List[str]

class CommunityEngagement(BaseModel):
    id: str
    type: str  # Host, Contributor, etc.
    platform: str
    description: str
    followers: Optional[str] = None

class Resume(BaseModel):
    contact: ContactInfo
    executive_summary: List[str]
    experiences: List[Experience]
    projects: List[Project]
    education: List[Education]
    awards: List[Award]
    certifications: List[Certification]
    skills: List[SkillCategory]
    community_engagement: List[CommunityEngagement]
    updated_at: datetime