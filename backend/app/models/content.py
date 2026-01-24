from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum


class HeroContent(BaseModel):
    id: str = "hero"
    name: str
    roles: List[str]
    description: str
    metrics: Dict[str, str]
    updated_at: datetime


class AboutContent(BaseModel):
    id: str = "about"
    title: str
    description: List[str]
    skills: List[str]
    quick_facts: Dict[str, str]
    updated_at: datetime


class ExperienceEntry(BaseModel):
    id: str
    company: str
    role: str
    duration: str
    location: str
    description: str
    achievements: List[str]
    technologies: List[str]
    current: bool = False
    order: int = 0
    created_at: datetime
    updated_at: datetime


class SkillEntry(BaseModel):
    id: str
    name: str
    category: str
    level: int  # 0-100
    icon: str
    color: str
    order: int = 0
    created_at: datetime
    updated_at: datetime


class EducationEntry(BaseModel):
    id: str
    institution: str
    degree: str
    field: str
    duration: str
    location: str
    description: str = ""
    gpa: Optional[str] = None
    order: int = 0
    created_at: datetime
    updated_at: datetime


class AchievementEntry(BaseModel):
    id: str
    title: str
    value: str
    description: str
    icon: str
    color: str
    category: str
    details: List[str] = []
    percentage: float = 0
    order: int = 0
    created_at: datetime
    updated_at: datetime


class CertificationStatus(str, Enum):
    ACTIVE = "active"
    EXPIRED = "expired"
    IN_PROGRESS = "in_progress"


class CertificationEntry(BaseModel):
    id: str
    name: str
    organization: str
    year: str
    credential_id: Optional[str] = None
    credential_url: Optional[str] = None
    status: CertificationStatus = CertificationStatus.ACTIVE
    description: Optional[str] = None
    order: int = 0
    created_at: datetime
    updated_at: datetime


class ContactInfoContent(BaseModel):
    id: str = "contact"
    email: str
    phone: str
    location: str
    social_links: Dict[str, str]
    updated_at: datetime
