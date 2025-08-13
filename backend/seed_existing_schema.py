#!/usr/bin/env python3
"""
Simple Database Seeder for Existing Schema
Seeds the database with data compatible with existing table structure.
"""

import asyncio
import logging
from datetime import datetime, date
import json
import sys
import os

# Add the app directory to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Database configuration
DATABASE_URL = "postgresql+asyncpg://postgres:password@localhost:5452/alamin_rocks"
engine = create_async_engine(DATABASE_URL, echo=False)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def seed_languages():
    """Seed languages if not exists"""
    logger.info("Seeding languages...")
    
    async with AsyncSessionLocal() as session:
        # Check if languages already exist
        result = await session.execute(text("SELECT COUNT(*) FROM languages"))
        count = result.scalar()
        
        if count >= 2:
            logger.info("Languages already exist, skipping...")
            return
            
        languages = [
            {"code": "en", "name": "English", "native_name": "English", "enabled": True},
            {"code": "bn", "name": "Bengali", "native_name": "বাংলা", "enabled": True}
        ]
        
        for lang in languages:
            insert_sql = """
                INSERT INTO languages (code, name, native_name, enabled)
                VALUES (:code, :name, :native_name, :enabled)
                ON CONFLICT (code) DO UPDATE SET
                    name = EXCLUDED.name,
                    native_name = EXCLUDED.native_name,
                    enabled = EXCLUDED.enabled,
                    updated_at = CURRENT_TIMESTAMP
            """
            await session.execute(text(insert_sql), lang)
        
        await session.commit()
        logger.info(f"Seeded {len(languages)} languages")

async def seed_ui_translations():
    """Seed UI translations"""
    logger.info("Seeding UI translations...")
    
    # Basic UI translations
    ui_translations = {
        "en": {
            "hero.greeting": "Hi, I'm",
            "hero.iam": "I am a", 
            "hero.viewProjects": "View Projects",
            "hero.contactMe": "Contact Me",
            "nav.home": "Home",
            "nav.about": "About",
            "nav.experience": "Experience",
            "nav.projects": "Projects",
            "nav.contact": "Contact",
            "about.title": "About Me",
            "projects.title": "Featured Projects",
            "contact.title": "Get In Touch",
            "techstack.title": "Tech Stack",
            "achievements.title": "Achievements",
            "common.loading": "Loading...",
            "common.error": "Error",
            "common.retry": "Retry"
        },
        "bn": {
            "hero.greeting": "হ্যালো, আমি",
            "hero.iam": "আমি একজন",
            "hero.viewProjects": "প্রকল্প দেখুন", 
            "hero.contactMe": "যোগাযোগ করুন",
            "nav.home": "হোম",
            "nav.about": "সম্পর্কে",
            "nav.experience": "অভিজ্ঞতা",
            "nav.projects": "প্রকল্প",
            "nav.contact": "যোগাযোগ",
            "about.title": "আমার সম্পর্কে",
            "projects.title": "বৈশিষ্ট্যযুক্ত প্রকল্প",
            "contact.title": "যোগাযোগ করুন",
            "techstack.title": "প্রযুক্তি স্ট্যাক",
            "achievements.title": "অর্জন",
            "common.loading": "লোড হচ্ছে...",
            "common.error": "ত্রুটি", 
            "common.retry": "পুনরায় চেষ্টা করুন"
        }
    }
    
    async with AsyncSessionLocal() as session:
        # Clear existing UI translations
        await session.execute(text("DELETE FROM ui_translations"))
        
        for lang_code, translations in ui_translations.items():
            for key, value in translations.items():
                insert_sql = """
                    INSERT INTO ui_translations (key, language_code, value)
                    VALUES (:key, :language_code, :value)
                """
                await session.execute(text(insert_sql), {
                    "key": key,
                    "language_code": lang_code,
                    "value": value
                })
        
        await session.commit()
        logger.info(f"Seeded UI translations for {len(ui_translations)} languages")

async def seed_basic_content():
    """Seed basic content for API endpoints that need database data"""
    logger.info("Seeding basic content...")
    
    async with AsyncSessionLocal() as session:
        # Check existing content
        result = await session.execute(text("SELECT COUNT(*) FROM projects"))
        project_count = result.scalar()
        
        if project_count > 0:
            logger.info("Projects already exist, skipping content seeding...")
            return
            
        # Insert basic project data that matches existing schema
        projects = [
            {
                "id": "1",
                "technologies": ["Python", "FastAPI", "PostgreSQL", "Docker"],
                "github_url": "https://github.com/alamin-mahamud/portfolio",
                "live_url": "https://alamin.rocks",
                "featured": True,
                "impact": {"users": 1000, "performance": "Fast loading"},
                "stats": {"stars": 50, "forks": 10},
                "status": "completed",
                "ai_powered": False
            }
        ]
        
        for project in projects:
            insert_sql = """
                INSERT INTO projects (id, technologies, github_url, live_url, featured, impact, stats, status, ai_powered)
                VALUES (:id, :technologies, :github_url, :live_url, :featured, :impact, :stats, :status, :ai_powered)
            """
            await session.execute(text(insert_sql), {
                **project,
                "impact": json.dumps(project["impact"]),
                "stats": json.dumps(project["stats"])
            })
        
        # Insert basic experiences
        experiences = [
            {
                "id": "1",
                "company": "Kahf Yazılım A.Ş.",
                "duration": "May 2025 - Present",
                "current": True,
                "technologies": ["Kubernetes", "Terraform", "Azure"],
                "website": "https://kahf.co"
            }
        ]
        
        for exp in experiences:
            insert_sql = """
                INSERT INTO experiences (id, company, duration, current, technologies, website)
                VALUES (:id, :company, :duration, :current, :technologies, :website)
            """
            await session.execute(text(insert_sql), exp)
        
        await session.commit()
        logger.info("Seeded basic content")

async def main():
    """Main seeding function"""
    logger.info("Starting basic database seeding...")
    
    try:
        await seed_languages()
        await seed_ui_translations()
        await seed_basic_content()
        
        logger.info("✅ Basic database seeding completed successfully!")
        
    except Exception as e:
        logger.error(f"❌ Error during seeding: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
    
    finally:
        await engine.dispose()

if __name__ == "__main__":
    asyncio.run(main())