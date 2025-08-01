from pydantic import BaseModel, EmailStr, HttpUrl
from typing import List, Optional
from datetime import datetime

from app.models.resume import (
    ContactInfo, Experience, Project, Education,
    Award, Certification, SkillCategory, CommunityEngagement
)

class ResumeResponse(BaseModel):
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

    class Config:
        from_attributes = True

class ExperienceFilter(BaseModel):
    current_only: bool = False
    limit: Optional[int] = None

class ProjectFilter(BaseModel):
    featured_only: bool = False
    limit: Optional[int] = None