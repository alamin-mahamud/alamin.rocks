from pydantic import BaseModel, field_validator, model_validator
from typing import List, Optional, Dict, Any
from datetime import datetime
import json

class Language(BaseModel):
    code: str
    name: str
    native_name: str
    enabled: bool = True
    created_at: datetime
    updated_at: datetime

class TranslationKey(BaseModel):
    key: str
    category: str
    description: Optional[str] = None
    created_at: datetime
    updated_at: datetime

class TranslationValue(BaseModel):
    id: int
    key: str
    language_code: str
    value: str
    created_at: datetime
    updated_at: datetime

class Translation(BaseModel):
    id: int
    table_name: str
    record_id: str
    field_name: str
    language_code: str
    content: str
    created_at: datetime
    updated_at: datetime

class TranslatableContent(BaseModel):
    """Base class for content that can be translated"""
    translations: Optional[Dict[str, Dict[str, str]]] = {}
    
    def get_translated_field(self, field_name: str, language_code: str = "en") -> Optional[str]:
        """Get a translated field value with fallback to default language"""
        if self.translations and language_code in self.translations:
            return self.translations[language_code].get(field_name)
        # Fallback to English if translation not found
        if self.translations and "en" in self.translations:
            return self.translations["en"].get(field_name)
        return None

class TranslatedHero(BaseModel):
    id: str = "hero"
    name: str
    metrics: Dict[str, str]
    roles: Optional[List[str]] = None
    description: Optional[str] = None
    translations: Optional[Dict[str, Dict[str, Any]]] = {}
    created_at: datetime
    updated_at: datetime
    
    @model_validator(mode='before')
    @classmethod
    def parse_json_fields(cls, values):
        if isinstance(values, dict):
            # Parse metrics if it's a string
            if 'metrics' in values and isinstance(values['metrics'], str):
                values['metrics'] = json.loads(values['metrics'])
        return values
    
    def get_roles(self, language_code: str = "en") -> List[str]:
        """Get roles with translation support"""
        if self.translations and language_code in self.translations:
            roles_json = self.translations[language_code].get("roles")
            if roles_json:
                import json
                return json.loads(roles_json)
        return self.roles or []
    
    def get_description(self, language_code: str = "en") -> str:
        """Get description with translation support"""
        if self.translations and language_code in self.translations:
            return self.translations[language_code].get("description", "")
        return self.description or ""

class TranslatedAbout(BaseModel):
    id: str = "about"
    skills: List[str]
    title: Optional[str] = None
    description: Optional[List[str]] = None
    quick_facts: Optional[Dict[str, str]] = None
    translations: Optional[Dict[str, Dict[str, Any]]] = {}
    created_at: datetime
    updated_at: datetime
    
    def get_title(self, language_code: str = "en") -> str:
        """Get title with translation support"""
        if self.translations and language_code in self.translations:
            return self.translations[language_code].get("title", "")
        return self.title or ""
    
    def get_description(self, language_code: str = "en") -> List[str]:
        """Get description with translation support"""
        if self.translations and language_code in self.translations:
            desc_json = self.translations[language_code].get("description")
            if desc_json:
                import json
                return json.loads(desc_json)
        return self.description or []
    
    def get_quick_facts(self, language_code: str = "en") -> Dict[str, str]:
        """Get quick facts with translation support"""
        if self.translations and language_code in self.translations:
            facts_json = self.translations[language_code].get("quick_facts")
            if facts_json:
                import json
                return json.loads(facts_json)
        return self.quick_facts or {}

class TranslatedProject(BaseModel):
    id: str
    technologies: List[str]
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    demo_url: Optional[str] = None
    image_url: Optional[str] = None
    featured: bool = False
    impact: Dict[str, Any] = {}
    stats: Dict[str, Any] = {}
    status: str = "completed"
    ai_powered: bool = False
    title: Optional[str] = None
    description: Optional[str] = None
    long_description: Optional[str] = None
    category: Optional[str] = None
    translations: Optional[Dict[str, Dict[str, str]]] = {}
    created_at: datetime
    updated_at: datetime
    
    @model_validator(mode='before')
    @classmethod
    def parse_json_fields(cls, values):
        if isinstance(values, dict):
            # Parse impact and stats if they're strings
            if 'impact' in values and isinstance(values['impact'], str):
                values['impact'] = json.loads(values['impact'])
            if 'stats' in values and isinstance(values['stats'], str):
                values['stats'] = json.loads(values['stats'])
        return values
    
    def get_title(self, language_code: str = "en") -> str:
        """Get title with translation support"""
        if self.translations and language_code in self.translations:
            return self.translations[language_code].get("title", "")
        return self.title or ""
    
    def get_description(self, language_code: str = "en") -> str:
        """Get description with translation support"""
        if self.translations and language_code in self.translations:
            return self.translations[language_code].get("description", "")
        return self.description or ""
    
    def get_long_description(self, language_code: str = "en") -> str:
        """Get long description with translation support"""
        if self.translations and language_code in self.translations:
            return self.translations[language_code].get("long_description", "")
        return self.long_description or ""
    
    def get_category(self, language_code: str = "en") -> str:
        """Get category with translation support"""
        if self.translations and language_code in self.translations:
            return self.translations[language_code].get("category", "")
        return self.category or ""

class TranslatedTechSkill(BaseModel):
    id: str
    name: str
    level: int  # 0-100
    years_exp: int
    icon: str
    color: str
    projects: int
    category: Optional[str] = None
    translations: Optional[Dict[str, Dict[str, str]]] = {}
    created_at: datetime
    updated_at: datetime
    
    def get_category(self, language_code: str = "en") -> str:
        """Get category with translation support"""
        if self.translations and language_code in self.translations:
            return self.translations[language_code].get("category", "")
        return self.category or ""

class TranslatedAchievement(BaseModel):
    id: str
    value: str
    icon: str
    color: str
    percentage: int
    category: str
    title: Optional[str] = None
    description: Optional[str] = None
    details: Optional[List[str]] = None
    translations: Optional[Dict[str, Dict[str, Any]]] = {}
    created_at: datetime
    updated_at: datetime
    
    def get_title(self, language_code: str = "en") -> str:
        """Get title with translation support"""
        if self.translations and language_code in self.translations:
            return self.translations[language_code].get("title", "")
        return self.title or ""
    
    def get_description(self, language_code: str = "en") -> str:
        """Get description with translation support"""
        if self.translations and language_code in self.translations:
            return self.translations[language_code].get("description", "")
        return self.description or ""
    
    def get_details(self, language_code: str = "en") -> List[str]:
        """Get details with translation support"""
        if self.translations and language_code in self.translations:
            details_json = self.translations[language_code].get("details")
            if details_json:
                import json
                return json.loads(details_json)
        return self.details or []

class TranslatedExperience(BaseModel):
    id: str
    company: str
    duration: str
    current: bool = False
    technologies: List[str]
    website: Optional[str] = None
    role: Optional[str] = None
    location: Optional[str] = None
    achievements: Optional[List[str]] = None
    translations: Optional[Dict[str, Dict[str, Any]]] = {}
    created_at: datetime
    updated_at: datetime
    
    def get_role(self, language_code: str = "en") -> str:
        """Get role with translation support"""
        if self.translations and language_code in self.translations:
            return self.translations[language_code].get("role", "")
        return self.role or ""
    
    def get_location(self, language_code: str = "en") -> str:
        """Get location with translation support"""
        if self.translations and language_code in self.translations:
            return self.translations[language_code].get("location", "")
        return self.location or ""
    
    def get_achievements(self, language_code: str = "en") -> List[str]:
        """Get achievements with translation support"""
        if self.translations and language_code in self.translations:
            achievements_json = self.translations[language_code].get("achievements")
            if achievements_json:
                import json
                return json.loads(achievements_json)
        return self.achievements or []

class TranslatedContactInfo(BaseModel):
    id: str = "contact"
    email: str
    phone: Optional[str] = None
    social_links: Dict[str, str] = {}
    location: Optional[str] = None
    translations: Optional[Dict[str, Dict[str, str]]] = {}
    created_at: datetime
    updated_at: datetime
    
    @model_validator(mode='before')
    @classmethod
    def parse_json_fields(cls, values):
        if isinstance(values, dict):
            # Parse social_links if it's a string
            if 'social_links' in values and isinstance(values['social_links'], str):
                values['social_links'] = json.loads(values['social_links'])
        return values
    
    def get_location(self, language_code: str = "en") -> str:
        """Get location with translation support"""
        if self.translations and language_code in self.translations:
            return self.translations[language_code].get("location", "")
        return self.location or ""

# Response models for API
class TranslationsResponse(BaseModel):
    """Response containing UI translations for a specific language"""
    language_code: str
    translations: Dict[str, str]

class LanguagesResponse(BaseModel):
    """Response containing all available languages"""
    languages: List[Language]