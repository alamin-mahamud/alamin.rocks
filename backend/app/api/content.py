import logging
from typing import List, Optional

from fastapi import APIRouter, HTTPException

from app.schemas.content import (
    HeroResponse, HeroUpdateRequest,
    AboutResponse, AboutUpdateRequest,
    ExperienceResponse, ExperienceCreateRequest, ExperienceUpdateRequest,
    SkillResponse, SkillCreateRequest, SkillUpdateRequest,
    EducationResponse, EducationCreateRequest, EducationUpdateRequest,
    AchievementResponse, AchievementCreateRequest, AchievementUpdateRequest,
    CertificationResponse, CertificationCreateRequest, CertificationUpdateRequest,
    ContactInfoResponse, ContactInfoUpdateRequest,
    ReorderRequest,
)
from app.services import content as content_service

logger = logging.getLogger(__name__)
router = APIRouter()


# ============ Hero Endpoints ============

@router.get("/hero", response_model=HeroResponse)
async def get_hero():
    """Get hero section content."""
    return await content_service.get_hero()


@router.put("/hero", response_model=HeroResponse)
async def update_hero(request: HeroUpdateRequest):
    """Update hero section content."""
    data = request.model_dump(exclude_unset=True)
    return await content_service.update_hero(data)


# ============ About Endpoints ============

@router.get("/about", response_model=AboutResponse)
async def get_about():
    """Get about section content."""
    return await content_service.get_about()


@router.put("/about", response_model=AboutResponse)
async def update_about(request: AboutUpdateRequest):
    """Update about section content."""
    data = request.model_dump(exclude_unset=True)
    return await content_service.update_about(data)


# ============ Experience Endpoints ============

@router.get("/experiences", response_model=List[ExperienceResponse])
async def get_experiences():
    """Get all experience entries."""
    return await content_service.get_experiences()


@router.get("/experiences/{exp_id}", response_model=ExperienceResponse)
async def get_experience(exp_id: str):
    """Get a specific experience entry."""
    entry = await content_service.get_experience(exp_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Experience not found")
    return entry


@router.post("/experiences", response_model=ExperienceResponse)
async def create_experience(request: ExperienceCreateRequest):
    """Create a new experience entry."""
    data = request.model_dump()
    return await content_service.create_experience(data)


@router.put("/experiences/{exp_id}", response_model=ExperienceResponse)
async def update_experience(exp_id: str, request: ExperienceUpdateRequest):
    """Update an experience entry."""
    data = request.model_dump(exclude_unset=True)
    entry = await content_service.update_experience(exp_id, data)
    if not entry:
        raise HTTPException(status_code=404, detail="Experience not found")
    return entry


@router.delete("/experiences/{exp_id}")
async def delete_experience(exp_id: str):
    """Delete an experience entry."""
    if not await content_service.delete_experience(exp_id):
        raise HTTPException(status_code=404, detail="Experience not found")
    return {"success": True}


@router.put("/experiences", response_model=List[ExperienceResponse])
async def bulk_update_experiences(experiences: List[dict]):
    """Bulk update all experiences."""
    return await content_service.bulk_update_experiences(experiences)


# ============ Skills Endpoints ============

@router.get("/skills", response_model=List[SkillResponse])
async def get_skills(category: Optional[str] = None):
    """Get all skill entries."""
    return await content_service.get_skills(category)


@router.get("/skills/{skill_id}", response_model=SkillResponse)
async def get_skill(skill_id: str):
    """Get a specific skill entry."""
    entry = await content_service.get_skill(skill_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Skill not found")
    return entry


@router.post("/skills", response_model=SkillResponse)
async def create_skill(request: SkillCreateRequest):
    """Create a new skill entry."""
    data = request.model_dump()
    return await content_service.create_skill(data)


@router.put("/skills/{skill_id}", response_model=SkillResponse)
async def update_skill(skill_id: str, request: SkillUpdateRequest):
    """Update a skill entry."""
    data = request.model_dump(exclude_unset=True)
    entry = await content_service.update_skill(skill_id, data)
    if not entry:
        raise HTTPException(status_code=404, detail="Skill not found")
    return entry


@router.delete("/skills/{skill_id}")
async def delete_skill(skill_id: str):
    """Delete a skill entry."""
    if not await content_service.delete_skill(skill_id):
        raise HTTPException(status_code=404, detail="Skill not found")
    return {"success": True}


@router.put("/skills", response_model=List[SkillResponse])
async def bulk_update_skills(skills: List[dict]):
    """Bulk update all skills."""
    return await content_service.bulk_update_skills(skills)


# ============ Education Endpoints ============

@router.get("/education", response_model=List[EducationResponse])
async def get_education():
    """Get all education entries."""
    return await content_service.get_education_list()


@router.get("/education/{edu_id}", response_model=EducationResponse)
async def get_education_entry(edu_id: str):
    """Get a specific education entry."""
    entry = await content_service.get_education(edu_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Education not found")
    return entry


@router.post("/education", response_model=EducationResponse)
async def create_education(request: EducationCreateRequest):
    """Create a new education entry."""
    data = request.model_dump()
    return await content_service.create_education(data)


@router.put("/education/{edu_id}", response_model=EducationResponse)
async def update_education(edu_id: str, request: EducationUpdateRequest):
    """Update an education entry."""
    data = request.model_dump(exclude_unset=True)
    entry = await content_service.update_education(edu_id, data)
    if not entry:
        raise HTTPException(status_code=404, detail="Education not found")
    return entry


@router.delete("/education/{edu_id}")
async def delete_education(edu_id: str):
    """Delete an education entry."""
    if not await content_service.delete_education(edu_id):
        raise HTTPException(status_code=404, detail="Education not found")
    return {"success": True}


@router.put("/education", response_model=List[EducationResponse])
async def bulk_update_education(education: List[dict]):
    """Bulk update all education entries."""
    return await content_service.bulk_update_education(education)


# ============ Achievements Endpoints ============

@router.get("/achievements", response_model=List[AchievementResponse])
async def get_achievements(category: Optional[str] = None):
    """Get all achievement entries."""
    return await content_service.get_achievements(category)


@router.get("/achievements/{ach_id}", response_model=AchievementResponse)
async def get_achievement(ach_id: str):
    """Get a specific achievement entry."""
    entry = await content_service.get_achievement(ach_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Achievement not found")
    return entry


@router.post("/achievements", response_model=AchievementResponse)
async def create_achievement(request: AchievementCreateRequest):
    """Create a new achievement entry."""
    data = request.model_dump()
    return await content_service.create_achievement(data)


@router.put("/achievements/{ach_id}", response_model=AchievementResponse)
async def update_achievement(ach_id: str, request: AchievementUpdateRequest):
    """Update an achievement entry."""
    data = request.model_dump(exclude_unset=True)
    entry = await content_service.update_achievement(ach_id, data)
    if not entry:
        raise HTTPException(status_code=404, detail="Achievement not found")
    return entry


@router.delete("/achievements/{ach_id}")
async def delete_achievement(ach_id: str):
    """Delete an achievement entry."""
    if not await content_service.delete_achievement(ach_id):
        raise HTTPException(status_code=404, detail="Achievement not found")
    return {"success": True}


@router.put("/achievements", response_model=List[AchievementResponse])
async def bulk_update_achievements(achievements: List[dict]):
    """Bulk update all achievements."""
    return await content_service.bulk_update_achievements(achievements)


# ============ Certifications Endpoints ============

@router.get("/certifications", response_model=List[CertificationResponse])
async def get_certifications():
    """Get all certification entries."""
    return await content_service.get_certifications()


@router.get("/certifications/{cert_id}", response_model=CertificationResponse)
async def get_certification(cert_id: str):
    """Get a specific certification entry."""
    entry = await content_service.get_certification(cert_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Certification not found")
    return entry


@router.post("/certifications", response_model=CertificationResponse)
async def create_certification(request: CertificationCreateRequest):
    """Create a new certification entry."""
    data = request.model_dump()
    return await content_service.create_certification(data)


@router.put("/certifications/{cert_id}", response_model=CertificationResponse)
async def update_certification(cert_id: str, request: CertificationUpdateRequest):
    """Update a certification entry."""
    data = request.model_dump(exclude_unset=True)
    entry = await content_service.update_certification(cert_id, data)
    if not entry:
        raise HTTPException(status_code=404, detail="Certification not found")
    return entry


@router.delete("/certifications/{cert_id}")
async def delete_certification(cert_id: str):
    """Delete a certification entry."""
    if not await content_service.delete_certification(cert_id):
        raise HTTPException(status_code=404, detail="Certification not found")
    return {"success": True}


@router.put("/certifications", response_model=List[CertificationResponse])
async def bulk_update_certifications(certifications: List[dict]):
    """Bulk update all certifications."""
    return await content_service.bulk_update_certifications(certifications)


# ============ Contact Info Endpoints ============

@router.get("/contact-info", response_model=ContactInfoResponse)
async def get_contact_info():
    """Get contact information."""
    return await content_service.get_contact_info()


@router.put("/contact-info", response_model=ContactInfoResponse)
async def update_contact_info(request: ContactInfoUpdateRequest):
    """Update contact information."""
    data = request.model_dump(exclude_unset=True)
    return await content_service.update_contact_info(data)
