from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class CVSourceRequest(BaseModel):
    latex_source: str
    name: Optional[str] = "Resume"


class CVCompileRequest(BaseModel):
    latex_source: str
    save: bool = False
    name: Optional[str] = None


class CVCompileResponse(BaseModel):
    success: bool
    pdf_url: Optional[str] = None
    errors: List[str] = []
    warnings: List[str] = []
    compilation_time_ms: int = 0


class CVResponse(BaseModel):
    id: str
    name: str
    pdf_url: Optional[str] = None
    is_active: bool
    version: int
    updated_at: datetime


class CVSourceResponse(BaseModel):
    id: str
    name: str
    latex_source: str
    is_active: bool
    version: int
    updated_at: datetime


class CVTemplateResponse(BaseModel):
    id: str
    name: str
    description: str
    preview_image: Optional[str] = None
    category: str


class CVListResponse(BaseModel):
    documents: List[CVResponse]
    active_id: Optional[str] = None


class CVUpdateRequest(BaseModel):
    name: Optional[str] = None
    latex_source: Optional[str] = None
    is_active: Optional[bool] = None
