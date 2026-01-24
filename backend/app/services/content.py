import logging
import uuid
from datetime import datetime
from typing import List, Optional, Dict, Any

from app.models.content import (
    HeroContent,
    AboutContent,
    ExperienceEntry,
    SkillEntry,
    EducationEntry,
    AchievementEntry,
    CertificationEntry,
    CertificationStatus,
    ContactInfoContent,
)

logger = logging.getLogger(__name__)

# In-memory storage (replace with database in production)
_hero_content: Optional[HeroContent] = None
_about_content: Optional[AboutContent] = None
_experiences: Dict[str, ExperienceEntry] = {}
_skills: Dict[str, SkillEntry] = {}
_education: Dict[str, EducationEntry] = {}
_achievements: Dict[str, AchievementEntry] = {}
_certifications: Dict[str, CertificationEntry] = {}
_contact_info: Optional[ContactInfoContent] = None


# Initialize with default data
def _init_defaults():
    global _hero_content, _about_content, _contact_info

    now = datetime.now()

    if _hero_content is None:
        _hero_content = HeroContent(
            id="hero",
            name="Al-Amin Howlader",
            roles=["Senior DevOps Engineer", "SRE Specialist", "Cloud Architect"],
            description="Building scalable infrastructure and reliable systems.",
            metrics={
                "Years Experience": "8+",
                "Projects Delivered": "50+",
                "Uptime Achieved": "99.99%"
            },
            updated_at=now
        )

    if _about_content is None:
        _about_content = AboutContent(
            id="about",
            title="About Me",
            description=[
                "I am a passionate DevOps engineer with 8+ years of experience building and maintaining scalable cloud infrastructure.",
                "I specialize in Kubernetes, AWS, and implementing SRE best practices to ensure high availability and reliability."
            ],
            skills=["Kubernetes", "AWS", "Terraform", "Python", "CI/CD", "Monitoring"],
            quick_facts={
                "Location": "Dhaka, Bangladesh",
                "Languages": "English, Bengali",
                "Availability": "Open to opportunities"
            },
            updated_at=now
        )

    if _contact_info is None:
        _contact_info = ContactInfoContent(
            id="contact",
            email="contact@alamin.rocks",
            phone="+880-XXX-XXXXXXX",
            location="Dhaka, Bangladesh",
            social_links={
                "linkedin": "https://linkedin.com/in/alamin-howlader",
                "github": "https://github.com/alamin-rocks",
                "twitter": "https://twitter.com/alamin_rocks"
            },
            updated_at=now
        )


_init_defaults()


# Hero content operations
async def get_hero() -> HeroContent:
    return _hero_content


async def update_hero(data: Dict[str, Any]) -> HeroContent:
    global _hero_content
    if _hero_content is None:
        _init_defaults()

    for key, value in data.items():
        if value is not None and hasattr(_hero_content, key):
            setattr(_hero_content, key, value)

    _hero_content.updated_at = datetime.now()
    return _hero_content


# About content operations
async def get_about() -> AboutContent:
    return _about_content


async def update_about(data: Dict[str, Any]) -> AboutContent:
    global _about_content
    if _about_content is None:
        _init_defaults()

    for key, value in data.items():
        if value is not None and hasattr(_about_content, key):
            setattr(_about_content, key, value)

    _about_content.updated_at = datetime.now()
    return _about_content


# Experience operations
async def get_experiences() -> List[ExperienceEntry]:
    return sorted(_experiences.values(), key=lambda x: x.order)


async def get_experience(exp_id: str) -> Optional[ExperienceEntry]:
    return _experiences.get(exp_id)


async def create_experience(data: Dict[str, Any]) -> ExperienceEntry:
    now = datetime.now()
    exp_id = str(uuid.uuid4())
    order = len(_experiences)

    entry = ExperienceEntry(
        id=exp_id,
        order=order,
        created_at=now,
        updated_at=now,
        **data
    )
    _experiences[exp_id] = entry
    return entry


async def update_experience(exp_id: str, data: Dict[str, Any]) -> Optional[ExperienceEntry]:
    if exp_id not in _experiences:
        return None

    entry = _experiences[exp_id]
    for key, value in data.items():
        if value is not None and hasattr(entry, key):
            setattr(entry, key, value)

    entry.updated_at = datetime.now()
    _experiences[exp_id] = entry
    return entry


async def delete_experience(exp_id: str) -> bool:
    if exp_id in _experiences:
        del _experiences[exp_id]
        return True
    return False


async def bulk_update_experiences(experiences: List[Dict[str, Any]]) -> List[ExperienceEntry]:
    global _experiences
    _experiences = {}
    result = []

    for i, exp_data in enumerate(experiences):
        now = datetime.now()
        exp_id = exp_data.get("id") or str(uuid.uuid4())

        entry = ExperienceEntry(
            id=exp_id,
            order=i,
            created_at=now,
            updated_at=now,
            company=exp_data.get("company", ""),
            role=exp_data.get("role", ""),
            duration=exp_data.get("duration", ""),
            location=exp_data.get("location", ""),
            description=exp_data.get("description", ""),
            achievements=exp_data.get("achievements", []),
            technologies=exp_data.get("technologies", []),
            current=exp_data.get("current", False)
        )
        _experiences[exp_id] = entry
        result.append(entry)

    return result


# Skill operations
async def get_skills(category: Optional[str] = None) -> List[SkillEntry]:
    skills = list(_skills.values())
    if category:
        skills = [s for s in skills if s.category == category]
    return sorted(skills, key=lambda x: x.order)


async def get_skill(skill_id: str) -> Optional[SkillEntry]:
    return _skills.get(skill_id)


async def create_skill(data: Dict[str, Any]) -> SkillEntry:
    now = datetime.now()
    skill_id = str(uuid.uuid4())
    order = len(_skills)

    entry = SkillEntry(
        id=skill_id,
        order=order,
        created_at=now,
        updated_at=now,
        **data
    )
    _skills[skill_id] = entry
    return entry


async def update_skill(skill_id: str, data: Dict[str, Any]) -> Optional[SkillEntry]:
    if skill_id not in _skills:
        return None

    entry = _skills[skill_id]
    for key, value in data.items():
        if value is not None and hasattr(entry, key):
            setattr(entry, key, value)

    entry.updated_at = datetime.now()
    _skills[skill_id] = entry
    return entry


async def delete_skill(skill_id: str) -> bool:
    if skill_id in _skills:
        del _skills[skill_id]
        return True
    return False


async def bulk_update_skills(skills: List[Dict[str, Any]]) -> List[SkillEntry]:
    global _skills
    _skills = {}
    result = []

    for i, skill_data in enumerate(skills):
        now = datetime.now()
        skill_id = skill_data.get("id") or str(uuid.uuid4())

        entry = SkillEntry(
            id=skill_id,
            order=i,
            created_at=now,
            updated_at=now,
            name=skill_data.get("name", ""),
            category=skill_data.get("category", ""),
            level=skill_data.get("level", 80),
            icon=skill_data.get("icon", "code"),
            color=skill_data.get("color", "#3B82F6")
        )
        _skills[skill_id] = entry
        result.append(entry)

    return result


# Education operations
async def get_education_list() -> List[EducationEntry]:
    return sorted(_education.values(), key=lambda x: x.order)


async def get_education(edu_id: str) -> Optional[EducationEntry]:
    return _education.get(edu_id)


async def create_education(data: Dict[str, Any]) -> EducationEntry:
    now = datetime.now()
    edu_id = str(uuid.uuid4())
    order = len(_education)

    entry = EducationEntry(
        id=edu_id,
        order=order,
        created_at=now,
        updated_at=now,
        **data
    )
    _education[edu_id] = entry
    return entry


async def update_education(edu_id: str, data: Dict[str, Any]) -> Optional[EducationEntry]:
    if edu_id not in _education:
        return None

    entry = _education[edu_id]
    for key, value in data.items():
        if value is not None and hasattr(entry, key):
            setattr(entry, key, value)

    entry.updated_at = datetime.now()
    _education[edu_id] = entry
    return entry


async def delete_education(edu_id: str) -> bool:
    if edu_id in _education:
        del _education[edu_id]
        return True
    return False


async def bulk_update_education(education: List[Dict[str, Any]]) -> List[EducationEntry]:
    global _education
    _education = {}
    result = []

    for i, edu_data in enumerate(education):
        now = datetime.now()
        edu_id = edu_data.get("id") or str(uuid.uuid4())

        entry = EducationEntry(
            id=edu_id,
            order=i,
            created_at=now,
            updated_at=now,
            institution=edu_data.get("institution", ""),
            degree=edu_data.get("degree", ""),
            field=edu_data.get("field", ""),
            duration=edu_data.get("duration", ""),
            location=edu_data.get("location", ""),
            description=edu_data.get("description", ""),
            gpa=edu_data.get("gpa")
        )
        _education[edu_id] = entry
        result.append(entry)

    return result


# Achievement operations
async def get_achievements(category: Optional[str] = None) -> List[AchievementEntry]:
    achievements = list(_achievements.values())
    if category:
        achievements = [a for a in achievements if a.category == category]
    return sorted(achievements, key=lambda x: x.order)


async def get_achievement(ach_id: str) -> Optional[AchievementEntry]:
    return _achievements.get(ach_id)


async def create_achievement(data: Dict[str, Any]) -> AchievementEntry:
    now = datetime.now()
    ach_id = str(uuid.uuid4())
    order = len(_achievements)

    entry = AchievementEntry(
        id=ach_id,
        order=order,
        created_at=now,
        updated_at=now,
        **data
    )
    _achievements[ach_id] = entry
    return entry


async def update_achievement(ach_id: str, data: Dict[str, Any]) -> Optional[AchievementEntry]:
    if ach_id not in _achievements:
        return None

    entry = _achievements[ach_id]
    for key, value in data.items():
        if value is not None and hasattr(entry, key):
            setattr(entry, key, value)

    entry.updated_at = datetime.now()
    _achievements[ach_id] = entry
    return entry


async def delete_achievement(ach_id: str) -> bool:
    if ach_id in _achievements:
        del _achievements[ach_id]
        return True
    return False


async def bulk_update_achievements(achievements: List[Dict[str, Any]]) -> List[AchievementEntry]:
    global _achievements
    _achievements = {}
    result = []

    for i, ach_data in enumerate(achievements):
        now = datetime.now()
        ach_id = ach_data.get("id") or str(uuid.uuid4())

        entry = AchievementEntry(
            id=ach_id,
            order=i,
            created_at=now,
            updated_at=now,
            title=ach_data.get("title", ""),
            value=ach_data.get("value", ""),
            description=ach_data.get("description", ""),
            icon=ach_data.get("icon", "trophy"),
            color=ach_data.get("color", "#F59E0B"),
            category=ach_data.get("category", "Impact"),
            details=ach_data.get("details", []),
            percentage=ach_data.get("percentage", 0)
        )
        _achievements[ach_id] = entry
        result.append(entry)

    return result


# Certification operations
async def get_certifications() -> List[CertificationEntry]:
    return sorted(_certifications.values(), key=lambda x: x.order)


async def get_certification(cert_id: str) -> Optional[CertificationEntry]:
    return _certifications.get(cert_id)


async def create_certification(data: Dict[str, Any]) -> CertificationEntry:
    now = datetime.now()
    cert_id = str(uuid.uuid4())
    order = len(_certifications)

    status = data.get("status", "active")
    if isinstance(status, str):
        status = CertificationStatus(status)

    entry = CertificationEntry(
        id=cert_id,
        order=order,
        created_at=now,
        updated_at=now,
        name=data.get("name", ""),
        organization=data.get("organization", ""),
        year=data.get("year", ""),
        credential_id=data.get("credential_id"),
        credential_url=data.get("credential_url"),
        status=status,
        description=data.get("description")
    )
    _certifications[cert_id] = entry
    return entry


async def update_certification(cert_id: str, data: Dict[str, Any]) -> Optional[CertificationEntry]:
    if cert_id not in _certifications:
        return None

    entry = _certifications[cert_id]
    for key, value in data.items():
        if value is not None and hasattr(entry, key):
            if key == "status" and isinstance(value, str):
                value = CertificationStatus(value)
            setattr(entry, key, value)

    entry.updated_at = datetime.now()
    _certifications[cert_id] = entry
    return entry


async def delete_certification(cert_id: str) -> bool:
    if cert_id in _certifications:
        del _certifications[cert_id]
        return True
    return False


async def bulk_update_certifications(certifications: List[Dict[str, Any]]) -> List[CertificationEntry]:
    global _certifications
    _certifications = {}
    result = []

    for i, cert_data in enumerate(certifications):
        now = datetime.now()
        cert_id = cert_data.get("id") or str(uuid.uuid4())

        status = cert_data.get("status", "active")
        if isinstance(status, str):
            status = CertificationStatus(status)

        entry = CertificationEntry(
            id=cert_id,
            order=i,
            created_at=now,
            updated_at=now,
            name=cert_data.get("name", ""),
            organization=cert_data.get("organization", ""),
            year=cert_data.get("year", ""),
            credential_id=cert_data.get("credential_id"),
            credential_url=cert_data.get("credential_url"),
            status=status,
            description=cert_data.get("description")
        )
        _certifications[cert_id] = entry
        result.append(entry)

    return result


# Contact info operations
async def get_contact_info() -> ContactInfoContent:
    return _contact_info


async def update_contact_info(data: Dict[str, Any]) -> ContactInfoContent:
    global _contact_info
    if _contact_info is None:
        _init_defaults()

    for key, value in data.items():
        if value is not None and hasattr(_contact_info, key):
            setattr(_contact_info, key, value)

    _contact_info.updated_at = datetime.now()
    return _contact_info
