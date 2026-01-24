from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime


# Hero schemas
class HeroUpdateRequest(BaseModel):
    name: Optional[str] = None
    roles: Optional[List[str]] = None
    description: Optional[str] = None
    metrics: Optional[Dict[str, str]] = None


class HeroResponse(BaseModel):
    id: str
    name: str
    roles: List[str]
    description: str
    metrics: Dict[str, str]
    updated_at: datetime


# About schemas
class AboutUpdateRequest(BaseModel):
    title: Optional[str] = None
    description: Optional[List[str]] = None
    skills: Optional[List[str]] = None
    quick_facts: Optional[Dict[str, str]] = None


class AboutResponse(BaseModel):
    id: str
    title: str
    description: List[str]
    skills: List[str]
    quick_facts: Dict[str, str]
    updated_at: datetime


# Experience schemas
class ExperienceCreateRequest(BaseModel):
    company: str
    role: str
    duration: str
    location: str
    description: str = ""
    achievements: List[str] = []
    technologies: List[str] = []
    current: bool = False


class ExperienceUpdateRequest(BaseModel):
    company: Optional[str] = None
    role: Optional[str] = None
    duration: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None
    achievements: Optional[List[str]] = None
    technologies: Optional[List[str]] = None
    current: Optional[bool] = None
    order: Optional[int] = None


class ExperienceResponse(BaseModel):
    id: str
    company: str
    role: str
    duration: str
    location: str
    description: str
    achievements: List[str]
    technologies: List[str]
    current: bool
    order: int
    created_at: datetime
    updated_at: datetime


# Skill schemas
class SkillCreateRequest(BaseModel):
    name: str
    category: str
    level: int = 80
    icon: str = "code"
    color: str = "#3B82F6"


class SkillUpdateRequest(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    level: Optional[int] = None
    icon: Optional[str] = None
    color: Optional[str] = None
    order: Optional[int] = None


class SkillResponse(BaseModel):
    id: str
    name: str
    category: str
    level: int
    icon: str
    color: str
    order: int
    created_at: datetime
    updated_at: datetime


# Education schemas
class EducationCreateRequest(BaseModel):
    institution: str
    degree: str
    field: str
    duration: str
    location: str
    description: str = ""
    gpa: Optional[str] = None


class EducationUpdateRequest(BaseModel):
    institution: Optional[str] = None
    degree: Optional[str] = None
    field: Optional[str] = None
    duration: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None
    gpa: Optional[str] = None
    order: Optional[int] = None


class EducationResponse(BaseModel):
    id: str
    institution: str
    degree: str
    field: str
    duration: str
    location: str
    description: str
    gpa: Optional[str]
    order: int
    created_at: datetime
    updated_at: datetime


# Achievement schemas
class AchievementCreateRequest(BaseModel):
    title: str
    value: str
    description: str
    icon: str = "trophy"
    color: str = "#F59E0B"
    category: str = "Impact"
    details: List[str] = []
    percentage: float = 0


class AchievementUpdateRequest(BaseModel):
    title: Optional[str] = None
    value: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    color: Optional[str] = None
    category: Optional[str] = None
    details: Optional[List[str]] = None
    percentage: Optional[float] = None
    order: Optional[int] = None


class AchievementResponse(BaseModel):
    id: str
    title: str
    value: str
    description: str
    icon: str
    color: str
    category: str
    details: List[str]
    percentage: float
    order: int
    created_at: datetime
    updated_at: datetime


# Certification schemas
class CertificationCreateRequest(BaseModel):
    name: str
    organization: str
    year: str
    credential_id: Optional[str] = None
    credential_url: Optional[str] = None
    status: str = "active"
    description: Optional[str] = None


class CertificationUpdateRequest(BaseModel):
    name: Optional[str] = None
    organization: Optional[str] = None
    year: Optional[str] = None
    credential_id: Optional[str] = None
    credential_url: Optional[str] = None
    status: Optional[str] = None
    description: Optional[str] = None
    order: Optional[int] = None


class CertificationResponse(BaseModel):
    id: str
    name: str
    organization: str
    year: str
    credential_id: Optional[str]
    credential_url: Optional[str]
    status: str
    description: Optional[str]
    order: int
    created_at: datetime
    updated_at: datetime


# Contact Info schemas
class ContactInfoUpdateRequest(BaseModel):
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    social_links: Optional[Dict[str, str]] = None


class ContactInfoResponse(BaseModel):
    id: str
    email: str
    phone: str
    location: str
    social_links: Dict[str, str]
    updated_at: datetime


# Bulk update schemas
class BulkExperiencesRequest(BaseModel):
    experiences: List[ExperienceCreateRequest]


class BulkSkillsRequest(BaseModel):
    skills: List[SkillCreateRequest]


class BulkEducationRequest(BaseModel):
    education: List[EducationCreateRequest]


class BulkAchievementsRequest(BaseModel):
    achievements: List[AchievementCreateRequest]


class BulkCertificationsRequest(BaseModel):
    certifications: List[CertificationCreateRequest]


class ReorderRequest(BaseModel):
    ids: List[str]
