"""MoE (Mission & Objectives Engine) schemas."""
from datetime import datetime
from enum import Enum
from typing import Optional, List
from pydantic import BaseModel, Field


# Persona schemas
class PersonaBase(BaseModel):
    name: str
    arabic_name: str
    domain: str
    eventually: str
    icon: str = "star"
    color: str = "#e11d48"
    one_thing: Optional[str] = None
    ritual: Optional[str] = None
    guardrail: Optional[str] = None
    points: List[str] = []


class PersonaCreate(PersonaBase):
    pass


class PersonaUpdate(BaseModel):
    name: Optional[str] = None
    arabic_name: Optional[str] = None
    domain: Optional[str] = None
    eventually: Optional[str] = None
    icon: Optional[str] = None
    color: Optional[str] = None
    one_thing: Optional[str] = None
    ritual: Optional[str] = None
    guardrail: Optional[str] = None
    points: Optional[List[str]] = None


class Milestone(BaseModel):
    date: str
    goal: str


class Persona(PersonaBase):
    id: int
    milestones: List[Milestone] = []
    order: int = 0
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Principle schemas
class PrincipleBase(BaseModel):
    name: str
    arabic: str
    meaning: str
    verse: Optional[str] = None
    icon: str = "heart"


class PrincipleCreate(PrincipleBase):
    pass


class PrincipleUpdate(BaseModel):
    name: Optional[str] = None
    arabic: Optional[str] = None
    meaning: Optional[str] = None
    verse: Optional[str] = None
    icon: Optional[str] = None


class Principle(PrincipleBase):
    id: int
    order: int = 0
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Schedule schemas
class ScheduleBlockBase(BaseModel):
    time: str
    activity: str
    persona_name: str


class ScheduleBlockCreate(ScheduleBlockBase):
    pass


class ScheduleBlock(ScheduleBlockBase):
    id: int

    class Config:
        from_attributes = True


class ScheduleTableRow(BaseModel):
    label: str  # "Weekdays" or "Weekend"
    time_2200_0400: str
    tahajjud_fajr: str
    fajr_0800: str
    time_0800_maghrib: str
    maghrib_isha: str
    isha_2200: str


class ScheduleTable(BaseModel):
    headers: List[str]
    rows: List[ScheduleTableRow]


# Lifestyle schemas
class LifestyleGuidelineBase(BaseModel):
    title: str
    description: Optional[str] = None
    is_active: bool = True


class LifestyleGuidelineCreate(LifestyleGuidelineBase):
    pass


class LifestyleGuideline(LifestyleGuidelineBase):
    id: int
    order: int = 0

    class Config:
        from_attributes = True


# Non-negotiables
class NonNegotiable(BaseModel):
    id: int
    title: str
    is_active: bool = True


# MoE Summary Response
class MoESummary(BaseModel):
    super_objective: str
    target_date: str
    personas: List[Persona]
    principles: List[Principle]
    schedule_blocks: List[ScheduleBlock]
    schedule_table: ScheduleTable
    lifestyle_guidelines: List[LifestyleGuideline]
    non_negotiables: List[str]
    dua_for_success: str


# Milestone management
class MilestoneBase(BaseModel):
    persona_id: int
    date: str
    goal: str


class MilestoneCreate(MilestoneBase):
    pass


class MilestoneResponse(MilestoneBase):
    id: int

    class Config:
        from_attributes = True
