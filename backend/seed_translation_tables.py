#!/usr/bin/env python3
"""
Translation Tables Seeder
Seeds the correct translation tables that the service expects.
"""

import asyncio
import logging
import sys
import os

# Add the app directory to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Database configuration
DATABASE_URL = "postgresql+asyncpg://postgres:password@localhost:5452/alamin_rocks"
engine = create_async_engine(DATABASE_URL, echo=False)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def seed_translation_keys_and_values():
    """Seed translation keys and values"""
    logger.info("Seeding translation keys and values...")
    
    # Translation keys with categories
    translation_keys = [
        {"key": "hero.greeting", "category": "hero", "description": "Hero section greeting"},
        {"key": "hero.iam", "category": "hero", "description": "Hero section I am text"},
        {"key": "hero.viewProjects", "category": "hero", "description": "View projects button"},
        {"key": "hero.contactMe", "category": "hero", "description": "Contact me button"},
        {"key": "nav.home", "category": "navigation", "description": "Home navigation link"},
        {"key": "nav.about", "category": "navigation", "description": "About navigation link"},
        {"key": "nav.experience", "category": "navigation", "description": "Experience navigation link"},
        {"key": "nav.projects", "category": "navigation", "description": "Projects navigation link"},
        {"key": "nav.contact", "category": "navigation", "description": "Contact navigation link"},
        {"key": "about.title", "category": "about", "description": "About section title"},
        {"key": "projects.title", "category": "projects", "description": "Projects section title"},
        {"key": "contact.title", "category": "contact", "description": "Contact section title"},
        {"key": "techstack.title", "category": "techstack", "description": "Tech stack section title"},
        {"key": "achievements.title", "category": "achievements", "description": "Achievements section title"},
        {"key": "common.loading", "category": "common", "description": "Loading text"},
        {"key": "common.error", "category": "common", "description": "Error text"},
        {"key": "common.retry", "category": "common", "description": "Retry text"}
    ]
    
    # Translation values for both languages
    translation_values = {
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
        # Clear existing data
        await session.execute(text("DELETE FROM translation_values"))
        await session.execute(text("DELETE FROM translation_keys"))
        
        # Insert translation keys
        for key_data in translation_keys:
            insert_key_sql = """
                INSERT INTO translation_keys (key, category, description)
                VALUES (:key, :category, :description)
            """
            await session.execute(text(insert_key_sql), key_data)
        
        # Insert translation values
        for lang_code, translations in translation_values.items():
            for key, value in translations.items():
                insert_value_sql = """
                    INSERT INTO translation_values (key, language_code, value)
                    VALUES (:key, :language_code, :value)
                """
                await session.execute(text(insert_value_sql), {
                    "key": key,
                    "language_code": lang_code,
                    "value": value
                })
        
        await session.commit()
        logger.info(f"Seeded {len(translation_keys)} keys and {sum(len(v) for v in translation_values.values())} values")

async def main():
    """Main seeding function"""
    logger.info("Starting translation tables seeding...")
    
    try:
        await seed_translation_keys_and_values()
        logger.info("✅ Translation tables seeding completed successfully!")
        
    except Exception as e:
        logger.error(f"❌ Error during seeding: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
    
    finally:
        await engine.dispose()

if __name__ == "__main__":
    asyncio.run(main())