"""
Translation services for handling multilingual content.
Returns in-memory defaults when the database is not available.
"""

import asyncpg
import json
import logging
from typing import Dict, List, Optional, Any
from datetime import datetime

from app.core.config import settings
from app.models.translations import (
    Language, TranslationKey, TranslationValue, Translation,
    TranslatedHero, TranslatedAbout, TranslatedProject,
    TranslatedTechSkill, TranslatedAchievement, TranslatedExperience,
    TranslatedContactInfo, TranslationsResponse, LanguagesResponse
)

logger = logging.getLogger(__name__)

# Default languages when DB is unavailable
DEFAULT_LANGUAGES = [
    Language(code="en", name="English", native_name="English", enabled=True,
             created_at=datetime.utcnow(), updated_at=datetime.utcnow()),
    Language(code="ar", name="Arabic", native_name="العربية", enabled=True,
             created_at=datetime.utcnow(), updated_at=datetime.utcnow()),
    Language(code="bn", name="Bengali", native_name="বাংলা", enabled=True,
             created_at=datetime.utcnow(), updated_at=datetime.utcnow()),
]


class TranslationService:
    def __init__(self):
        self.connection = None
        self._db_available = None  # None = not checked yet

    async def get_connection(self):
        """Get database connection, returns None if unavailable"""
        if self._db_available is False:
            return None
        if self.connection:
            return self.connection
        try:
            self.connection = await asyncpg.connect(settings.database_url)
            self._db_available = True
            return self.connection
        except Exception as e:
            logger.warning(f"Database connection unavailable for translations: {e}")
            self._db_available = False
            return None

    async def close_connection(self):
        """Close database connection"""
        if self.connection:
            await self.connection.close()
            self.connection = None

    async def get_languages(self) -> List[Language]:
        """Get all available languages"""
        conn = await self.get_connection()
        if not conn:
            return DEFAULT_LANGUAGES
        try:
            rows = await conn.fetch("SELECT * FROM languages WHERE enabled = TRUE ORDER BY code")
            return [Language(**dict(row)) for row in rows]
        except Exception as e:
            logger.warning(f"Failed to fetch languages from DB: {e}")
            return DEFAULT_LANGUAGES

    async def get_ui_translations(self, language_code: str = "en") -> Dict[str, str]:
        """Get all UI translations for a specific language"""
        conn = await self.get_connection()
        if not conn:
            return {}
        try:
            rows = await conn.fetch("""
                SELECT tv.key, tv.value
                FROM translation_values tv
                JOIN translation_keys tk ON tv.key = tk.key
                WHERE tv.language_code = $1
                ORDER BY tk.category, tv.key
            """, language_code)
            return {row['key']: row['value'] for row in rows}
        except Exception as e:
            logger.warning(f"Failed to fetch UI translations: {e}")
            return {}

    async def get_content_translations(self, table_name: str, record_ids: List[str],
                                     language_code: str = "en") -> Dict[str, Dict[str, str]]:
        """Get content translations for specific records"""
        if not record_ids:
            return {}
        conn = await self.get_connection()
        if not conn:
            return {}
        try:
            placeholders = ', '.join([f'${i+3}' for i in range(len(record_ids))])
            rows = await conn.fetch(f"""
                SELECT record_id, field_name, content
                FROM translations
                WHERE table_name = $1 AND language_code = $2 AND record_id IN ({placeholders})
            """, table_name, language_code, *record_ids)
            translations = {}
            for row in rows:
                record_id = row['record_id']
                if record_id not in translations:
                    translations[record_id] = {}
                translations[record_id][row['field_name']] = row['content']
            return translations
        except Exception as e:
            logger.warning(f"Failed to fetch content translations: {e}")
            return {}

    async def get_hero_with_translations(self, language_code: str = "en") -> Optional[TranslatedHero]:
        """Get hero data with translations"""
        conn = await self.get_connection()
        if not conn:
            return None
        try:
            hero_row = await conn.fetchrow("SELECT * FROM hero WHERE id = 'hero'")
            if not hero_row:
                return None
            translations = await self.get_content_translations("hero", ["hero"], language_code)
            if language_code != "en":
                en_translations = await self.get_content_translations("hero", ["hero"], "en")
                if "hero" in en_translations:
                    if "hero" not in translations:
                        translations["hero"] = {}
                    translations["hero"] = {**en_translations["hero"], **translations.get("hero", {})}
            hero_data = dict(hero_row)
            hero_data['translations'] = {language_code: translations.get("hero", {})} if translations.get("hero") else {}
            if 'metrics' in hero_data and isinstance(hero_data['metrics'], str):
                hero_data['metrics'] = json.loads(hero_data['metrics'])
            return TranslatedHero(**hero_data)
        except Exception as e:
            logger.warning(f"Failed to fetch hero with translations: {e}")
            return None

    async def get_about_with_translations(self, language_code: str = "en") -> Optional[TranslatedAbout]:
        """Get about data with translations"""
        conn = await self.get_connection()
        if not conn:
            return None
        try:
            about_row = await conn.fetchrow("SELECT * FROM about WHERE id = 'about'")
            if not about_row:
                return None
            translations = await self.get_content_translations("about", ["about"], language_code)
            if language_code != "en":
                en_translations = await self.get_content_translations("about", ["about"], "en")
                if "about" in en_translations:
                    if "about" not in translations:
                        translations["about"] = {}
                    translations["about"] = {**en_translations["about"], **translations.get("about", {})}
            about_data = dict(about_row)
            about_data['translations'] = {language_code: translations.get("about", {})} if translations.get("about") else {}
            return TranslatedAbout(**about_data)
        except Exception as e:
            logger.warning(f"Failed to fetch about with translations: {e}")
            return None

    async def get_contact_info_with_translations(self, language_code: str = "en") -> Optional[TranslatedContactInfo]:
        """Get contact info with translations"""
        conn = await self.get_connection()
        if not conn:
            return None
        try:
            contact_row = await conn.fetchrow("SELECT * FROM contact_info WHERE id = 'contact'")
            if not contact_row:
                return None
            translations = await self.get_content_translations("contact_info", ["contact"], language_code)
            if language_code != "en":
                en_translations = await self.get_content_translations("contact_info", ["contact"], "en")
                if "contact" in en_translations:
                    if "contact" not in translations:
                        translations["contact"] = {}
                    translations["contact"] = {**en_translations["contact"], **translations.get("contact", {})}
            contact_data = dict(contact_row)
            contact_data['translations'] = {language_code: translations.get("contact", {})} if translations.get("contact") else {}
            if 'social_links' in contact_data and isinstance(contact_data['social_links'], str):
                contact_data['social_links'] = json.loads(contact_data['social_links'])
            return TranslatedContactInfo(**contact_data)
        except Exception as e:
            logger.warning(f"Failed to fetch contact info with translations: {e}")
            return None

    async def get_projects_with_translations(self, language_code: str = "en",
                                           featured_only: bool = False) -> List[TranslatedProject]:
        """Get projects with translations"""
        conn = await self.get_connection()
        if not conn:
            return []
        try:
            query = "SELECT * FROM projects"
            params = []
            if featured_only:
                query += " WHERE featured = TRUE"
            query += " ORDER BY created_at DESC"
            project_rows = await conn.fetch(query, *params)
            if not project_rows:
                return []
            project_ids = [row['id'] for row in project_rows]
            translations = await self.get_content_translations("projects", project_ids, language_code)
            if language_code != "en":
                en_translations = await self.get_content_translations("projects", project_ids, "en")
                for project_id in project_ids:
                    if project_id in en_translations:
                        if project_id not in translations:
                            translations[project_id] = {}
                        translations[project_id] = {**en_translations[project_id], **translations.get(project_id, {})}
            projects = []
            for row in project_rows:
                project_data = dict(row)
                project_id = project_data['id']
                project_data['translations'] = {language_code: translations.get(project_id, {})} if translations.get(project_id) else {}
                if 'impact' in project_data and isinstance(project_data['impact'], str):
                    project_data['impact'] = json.loads(project_data['impact'])
                if 'stats' in project_data and isinstance(project_data['stats'], str):
                    project_data['stats'] = json.loads(project_data['stats'])
                projects.append(TranslatedProject(**project_data))
            return projects
        except Exception as e:
            logger.warning(f"Failed to fetch projects with translations: {e}")
            return []

    async def get_tech_skills_with_translations(self, language_code: str = "en") -> List[TranslatedTechSkill]:
        """Get tech skills with translations"""
        conn = await self.get_connection()
        if not conn:
            return []
        try:
            skill_rows = await conn.fetch("SELECT * FROM tech_skills ORDER BY level DESC, name")
            if not skill_rows:
                return []
            skill_ids = [row['id'] for row in skill_rows]
            translations = await self.get_content_translations("tech_skills", skill_ids, language_code)
            if language_code != "en":
                en_translations = await self.get_content_translations("tech_skills", skill_ids, "en")
                for skill_id in skill_ids:
                    if skill_id in en_translations:
                        if skill_id not in translations:
                            translations[skill_id] = {}
                        translations[skill_id] = {**en_translations[skill_id], **translations.get(skill_id, {})}
            skills = []
            for row in skill_rows:
                skill_data = dict(row)
                skill_id = skill_data['id']
                skill_data['translations'] = {language_code: translations.get(skill_id, {})} if translations.get(skill_id) else {}
                skills.append(TranslatedTechSkill(**skill_data))
            return skills
        except Exception as e:
            logger.warning(f"Failed to fetch tech skills with translations: {e}")
            return []

    async def get_achievements_with_translations(self, language_code: str = "en") -> List[TranslatedAchievement]:
        """Get achievements with translations"""
        conn = await self.get_connection()
        if not conn:
            return []
        try:
            achievement_rows = await conn.fetch("SELECT * FROM achievements ORDER BY percentage DESC, created_at")
            if not achievement_rows:
                return []
            achievement_ids = [row['id'] for row in achievement_rows]
            translations = await self.get_content_translations("achievements", achievement_ids, language_code)
            if language_code != "en":
                en_translations = await self.get_content_translations("achievements", achievement_ids, "en")
                for achievement_id in achievement_ids:
                    if achievement_id in en_translations:
                        if achievement_id not in translations:
                            translations[achievement_id] = {}
                        translations[achievement_id] = {**en_translations[achievement_id], **translations.get(achievement_id, {})}
            achievements = []
            for row in achievement_rows:
                achievement_data = dict(row)
                achievement_id = achievement_data['id']
                achievement_data['translations'] = {language_code: translations.get(achievement_id, {})} if translations.get(achievement_id) else {}
                achievements.append(TranslatedAchievement(**achievement_data))
            return achievements
        except Exception as e:
            logger.warning(f"Failed to fetch achievements with translations: {e}")
            return []

    async def get_experiences_with_translations(self, language_code: str = "en") -> List[TranslatedExperience]:
        """Get experiences with translations"""
        conn = await self.get_connection()
        if not conn:
            return []
        try:
            experience_rows = await conn.fetch("SELECT * FROM experiences ORDER BY current DESC, created_at DESC")
            if not experience_rows:
                return []
            experience_ids = [row['id'] for row in experience_rows]
            translations = await self.get_content_translations("experiences", experience_ids, language_code)
            if language_code != "en":
                en_translations = await self.get_content_translations("experiences", experience_ids, "en")
                for experience_id in experience_ids:
                    if experience_id in en_translations:
                        if experience_id not in translations:
                            translations[experience_id] = {}
                        translations[experience_id] = {**en_translations[experience_id], **translations.get(experience_id, {})}
            experiences = []
            for row in experience_rows:
                experience_data = dict(row)
                experience_id = experience_data['id']
                experience_data['translations'] = {language_code: translations.get(experience_id, {})} if translations.get(experience_id) else {}
                experiences.append(TranslatedExperience(**experience_data))
            return experiences
        except Exception as e:
            logger.warning(f"Failed to fetch experiences with translations: {e}")
            return []

    async def add_or_update_translation(self, table_name: str, record_id: str, field_name: str,
                                      language_code: str, content: str) -> Translation:
        """Add or update a translation"""
        conn = await self.get_connection()
        if not conn:
            raise Exception("Database not available for write operations")
        now = datetime.utcnow()
        row = await conn.fetchrow("""
            INSERT INTO translations (table_name, record_id, field_name, language_code, content, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (table_name, record_id, field_name, language_code)
            DO UPDATE SET
                content = EXCLUDED.content,
                updated_at = EXCLUDED.updated_at
            RETURNING *
        """, table_name, record_id, field_name, language_code, content, now, now)
        return Translation(**dict(row))

    async def add_or_update_ui_translation(self, key: str, language_code: str, value: str) -> TranslationValue:
        """Add or update a UI translation"""
        conn = await self.get_connection()
        if not conn:
            raise Exception("Database not available for write operations")
        now = datetime.utcnow()
        row = await conn.fetchrow("""
            INSERT INTO translation_values (key, language_code, value, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (key, language_code)
            DO UPDATE SET
                value = EXCLUDED.value,
                updated_at = EXCLUDED.updated_at
            RETURNING *
        """, key, language_code, value, now, now)
        return TranslationValue(**dict(row))

    async def delete_translation(self, table_name: str, record_id: str, field_name: str, language_code: str) -> bool:
        """Delete a translation"""
        conn = await self.get_connection()
        if not conn:
            raise Exception("Database not available for write operations")
        result = await conn.execute("""
            DELETE FROM translations
            WHERE table_name = $1 AND record_id = $2 AND field_name = $3 AND language_code = $4
        """, table_name, record_id, field_name, language_code)
        return result == "DELETE 1"

    async def get_translation_completeness(self) -> Dict[str, Dict[str, float]]:
        """Get translation completeness statistics"""
        conn = await self.get_connection()
        if not conn:
            return {}
        try:
            total_keys = await conn.fetch("""
                SELECT
                    table_name,
                    COUNT(DISTINCT record_id || '.' || field_name) as total_keys
                FROM translations
                WHERE language_code = 'en'
                GROUP BY table_name
            """)
            translated_keys = await conn.fetch("""
                SELECT
                    table_name,
                    language_code,
                    COUNT(DISTINCT record_id || '.' || field_name) as translated_keys
                FROM translations
                GROUP BY table_name, language_code
            """)
            completeness = {}
            for total_row in total_keys:
                table_name = total_row['table_name']
                total = total_row['total_keys']
                completeness[table_name] = {}
                for trans_row in translated_keys:
                    if trans_row['table_name'] == table_name:
                        lang_code = trans_row['language_code']
                        translated = trans_row['translated_keys']
                        completeness[table_name][lang_code] = (translated / total) * 100 if total > 0 else 0
            return completeness
        except Exception as e:
            logger.warning(f"Failed to fetch translation completeness: {e}")
            return {}


# Global service instance
translation_service = TranslationService()
