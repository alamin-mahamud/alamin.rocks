"""
Translation API endpoints
"""

from fastapi import APIRouter, HTTPException, Query
from typing import Dict, List, Optional

from app.services.translations import translation_service
from app.models.translations import (
    Language, TranslationsResponse, LanguagesResponse,
    TranslatedHero, TranslatedAbout, TranslatedContactInfo,
    TranslatedProject, TranslatedTechSkill, TranslatedAchievement,
    TranslatedExperience
)

router = APIRouter(prefix="/translations", tags=["translations"])

@router.get("/languages", response_model=LanguagesResponse)
async def get_languages():
    """Get all available languages"""
    try:
        languages = await translation_service.get_languages()
        return LanguagesResponse(languages=languages)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching languages: {str(e)}")

@router.get("/ui/{language_code}", response_model=TranslationsResponse)
async def get_ui_translations(language_code: str = "en"):
    """Get UI translations for a specific language"""
    try:
        translations = await translation_service.get_ui_translations(language_code)
        return TranslationsResponse(language_code=language_code, translations=translations)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching UI translations: {str(e)}")

@router.get("/hero", response_model=TranslatedHero)
async def get_hero_with_translations(
    lang: str = Query("en", description="Language code for translations")
):
    """Get hero data with translations"""
    try:
        hero = await translation_service.get_hero_with_translations(lang)
        if not hero:
            raise HTTPException(status_code=404, detail="Hero data not found")
        return hero
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching hero data: {str(e)}")

@router.get("/about", response_model=TranslatedAbout)
async def get_about_with_translations(
    lang: str = Query("en", description="Language code for translations")
):
    """Get about data with translations"""
    try:
        about = await translation_service.get_about_with_translations(lang)
        if not about:
            raise HTTPException(status_code=404, detail="About data not found")
        return about
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching about data: {str(e)}")

@router.get("/contact", response_model=TranslatedContactInfo)
async def get_contact_info_with_translations(
    lang: str = Query("en", description="Language code for translations")
):
    """Get contact info with translations"""
    try:
        contact = await translation_service.get_contact_info_with_translations(lang)
        if not contact:
            raise HTTPException(status_code=404, detail="Contact info not found")
        return contact
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching contact info: {str(e)}")

@router.get("/projects", response_model=List[TranslatedProject])
async def get_projects_with_translations(
    lang: str = Query("en", description="Language code for translations"),
    featured: bool = Query(False, description="Get only featured projects")
):
    """Get projects with translations"""
    try:
        projects = await translation_service.get_projects_with_translations(lang, featured)
        return projects
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching projects: {str(e)}")

@router.get("/tech-skills", response_model=List[TranslatedTechSkill])
async def get_tech_skills_with_translations(
    lang: str = Query("en", description="Language code for translations")
):
    """Get tech skills with translations"""
    try:
        skills = await translation_service.get_tech_skills_with_translations(lang)
        return skills
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching tech skills: {str(e)}")

@router.get("/achievements", response_model=List[TranslatedAchievement])
async def get_achievements_with_translations(
    lang: str = Query("en", description="Language code for translations")
):
    """Get achievements with translations"""
    try:
        achievements = await translation_service.get_achievements_with_translations(lang)
        return achievements
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching achievements: {str(e)}")

@router.get("/experiences", response_model=List[TranslatedExperience])
async def get_experiences_with_translations(
    lang: str = Query("en", description="Language code for translations")
):
    """Get experiences with translations"""
    try:
        experiences = await translation_service.get_experiences_with_translations(lang)
        return experiences
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching experiences: {str(e)}")

@router.get("/completeness")
async def get_translation_completeness():
    """Get translation completeness statistics"""
    try:
        completeness = await translation_service.get_translation_completeness()
        return {"completeness": completeness}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching translation completeness: {str(e)}")

# Admin endpoints for managing translations
@router.post("/content/{table_name}/{record_id}/{field_name}")
async def add_or_update_content_translation(
    table_name: str,
    record_id: str, 
    field_name: str,
    language_code: str,
    content: str
):
    """Add or update content translation (Admin only)"""
    try:
        translation = await translation_service.add_or_update_translation(
            table_name, record_id, field_name, language_code, content
        )
        return {"message": "Translation updated successfully", "translation": translation}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating translation: {str(e)}")

@router.post("/ui/{key}")
async def add_or_update_ui_translation(
    key: str,
    language_code: str,
    value: str
):
    """Add or update UI translation (Admin only)"""
    try:
        translation = await translation_service.add_or_update_ui_translation(
            key, language_code, value
        )
        return {"message": "UI translation updated successfully", "translation": translation}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating UI translation: {str(e)}")

@router.delete("/content/{table_name}/{record_id}/{field_name}")
async def delete_content_translation(
    table_name: str,
    record_id: str,
    field_name: str,
    language_code: str
):
    """Delete content translation (Admin only)"""
    try:
        success = await translation_service.delete_translation(
            table_name, record_id, field_name, language_code
        )
        if success:
            return {"message": "Translation deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="Translation not found")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting translation: {str(e)}")