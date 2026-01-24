from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from enum import Enum


class CVStatus(str, Enum):
    DRAFT = "draft"
    PUBLISHED = "published"
    ARCHIVED = "archived"


class CVDocument(BaseModel):
    id: str
    name: str
    latex_source: str
    pdf_path: Optional[str] = None
    is_active: bool = False
    status: CVStatus = CVStatus.DRAFT
    version: int = 1
    created_at: datetime
    updated_at: datetime


class CVTemplate(BaseModel):
    id: str
    name: str
    description: str
    preview_image: Optional[str] = None
    latex_template: str
    category: str  # "professional", "academic", "modern", "minimal"
    created_at: datetime


class CompilationResult(BaseModel):
    success: bool
    pdf_path: Optional[str] = None
    errors: List[str] = []
    warnings: List[str] = []
    compilation_time_ms: int = 0
