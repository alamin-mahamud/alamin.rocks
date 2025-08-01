from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from app.models.resume import (
    ContactInfo, Experience, Project, Education, 
    Award, Certification, SkillCategory, CommunityEngagement
)
from app.schemas.resume import ResumeResponse
from app.services.resume import ResumeService
from app.core.dependencies import get_resume_service

router = APIRouter()


@router.get("/resume", response_model=ResumeResponse)
async def get_resume(
    service: ResumeService = Depends(get_resume_service)
):
    """Get complete resume data"""
    return await service.get_resume()

@router.get("/resume/contact", response_model=ContactInfo)
async def get_contact_info(
    service: ResumeService = Depends(get_resume_service)
):
    """Get contact information"""
    return await service.get_contact_info()

@router.get("/resume/experience", response_model=List[Experience])
async def get_experience(
    current_only: bool = False,
    service: ResumeService = Depends(get_resume_service)
):
    """Get work experience with optional filtering"""
    return await service.get_experiences(current_only=current_only)

@router.get("/resume/projects", response_model=List[Project])
async def get_projects(
    featured_only: bool = False,
    service: ResumeService = Depends(get_resume_service)
):
    """Get projects with optional filtering"""
    return await service.get_projects(featured_only=featured_only)

@router.get("/resume/skills", response_model=List[SkillCategory])
async def get_skills(
    service: ResumeService = Depends(get_resume_service)
):
    """Get skills categorized"""
    return await service.get_skills()

@router.get("/resume/education", response_model=List[Education])
async def get_education(
    service: ResumeService = Depends(get_resume_service)
):
    """Get education details"""
    return await service.get_education()

@router.get("/resume/awards", response_model=List[Award])
async def get_awards(
    service: ResumeService = Depends(get_resume_service)
):
    """Get awards and recognitions"""
    return await service.get_awards()

@router.get("/resume/certifications", response_model=List[Certification])
async def get_certifications(
    service: ResumeService = Depends(get_resume_service)
):
    """Get certifications"""
    return await service.get_certifications()

@router.get("/resume/community", response_model=List[CommunityEngagement])
async def get_community_engagement(
    service: ResumeService = Depends(get_resume_service)
):
    """Get community engagement activities"""
    return await service.get_community_engagement()