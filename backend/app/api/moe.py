"""MoE (Mission & Objectives Engine) API endpoints."""
from datetime import datetime
from typing import List
from fastapi import APIRouter, HTTPException

from app.schemas.moe import (
    Persona, PersonaCreate, PersonaUpdate,
    Principle, PrincipleCreate, PrincipleUpdate,
    ScheduleBlock, ScheduleBlockCreate,
    LifestyleGuideline, LifestyleGuidelineCreate,
    ScheduleTable, ScheduleTableRow,
    MoESummary, Milestone, MilestoneCreate, MilestoneResponse
)

router = APIRouter(prefix="/api/moe", tags=["moe"])

# In-memory storage
_personas: List[dict] = [
    {
        "id": 1, "name": "Siddiq", "arabic_name": "الصِّدِّيق", "domain": "Practice + Dawah",
        "eventually": "Muslim Scholar, Mentor - Internalizing the Quran and maintaining the non-negotiables",
        "icon": "star", "color": "#e11d48",
        "one_thing": "Start and end with clear Niyyah (Intention) to please Allah.",
        "ritual": "Tahajjud and Daily Quran with Tadabbur and Ihsan",
        "guardrail": "Istikhara for All Major Decisions to Avoid the \"Optimization Trap\".",
        "points": ["Be the best in your field - Let excellence be your dawah", "Share how Islamic Principles led to success"],
        "milestones": [{"date": "Jan 31, 2026", "goal": "Surah Duha"}, {"date": "Feb 28, 2026", "goal": ".."}, {"date": "Mar 31, 2026", "goal": ".."}],
        "order": 1
    },
    {
        "id": 2, "name": "Khalid", "arabic_name": "خَالِد", "domain": "Health + Strategy",
        "eventually": "CR7-Level Fitness - Strong believer serving the Ummah",
        "icon": "dumbbell", "color": "#16a34a",
        "one_thing": "4 hours of total daily movement (Run + Strength/Stretching).",
        "ritual": "Post-Fajr 10-mile run and Post-Maghrib strength session.",
        "guardrail": "6 hours of sleep as \"training\" for recovery.",
        "points": [],
        "milestones": [{"date": "Jan 31, 2026", "goal": "20% Body Fat"}, {"date": "Feb 28, 2026", "goal": "15% Body Fat"}, {"date": "Mar 31, 2026", "goal": "10% Body Fat"}],
        "order": 2
    },
    {
        "id": 3, "name": "Omar", "arabic_name": "عُمَر", "domain": "Primary Responsibility",
        "eventually": "Business Entrepreneur, Investor, Nation Builder, by following Islamic values",
        "icon": "shield", "color": "#2563eb",
        "one_thing": "",
        "ritual": "Itqan (Excellence) during the 08:00–18:00 \"Responsibility Hours\".",
        "guardrail": "",
        "points": [
            "Build: Platform Architect and Platform-related SaaS",
            "Kubernetes Expert (KubeAstronaut)",
            "AWS Expert - AWS All Exams",
            "Go Expertise",
            "Import-Export Business",
            "Project Bagdad",
            "Sell: Sales, Marketing & Networking Expert [1 Book a Week]",
            "Connect: Help 1 Person/week by trying to solve a hard problem for them."
        ],
        "milestones": [{"date": "Jan 31, 2026", "goal": "LB Issues"}, {"date": "Feb 28, 2026", "goal": "Metal Infra Mastery"}, {"date": "Mar 31, 2026", "goal": "Google Level DNS Infra Basic"}],
        "order": 3
    },
    {
        "id": 4, "name": "Ali", "arabic_name": "عَلِيّ", "domain": "Growth",
        "eventually": "Platform Architect and Platform-related SaaS",
        "icon": "book-open", "color": "#7c3aed",
        "one_thing": "Complete the KubeAstronaut and AWS certs by March 31, 2026.",
        "ritual": "",
        "guardrail": "Deep focus using the \"Dhuha Time\" for your most important technical decisions.",
        "points": [],
        "milestones": [{"date": "Jan 31, 2026", "goal": "CKA + Homelab"}, {"date": "Feb 28, 2026", "goal": "CKAD, CKS"}, {"date": "Mar 31, 2026", "goal": "KubeAstronaut"}],
        "order": 4
    },
    {
        "id": 5, "name": "Abdur Rahman", "arabic_name": "عَبْدُ الرَّحْمَن", "domain": "Wealth + Business + Finance",
        "eventually": "Collect to give and create opportunity, not to stash",
        "icon": "wallet", "color": "#f97316",
        "one_thing": "Collect to give and create opportunity, not to stash",
        "ritual": "Weekend \"Growth & Connect\" - Sales psychology & networking.",
        "guardrail": "No desire, only responsibility - Finance as a tool for the Ummah.",
        "points": ["Weekend \"Growth & Connect\" - Sales psychology & networking.", "No desire, only responsibility - Finance as a tool for the Ummah."],
        "milestones": [{"date": "Jan 31, 2026", "goal": "20,000 BDT Zakat IA"}, {"date": "Mar 31, 2026", "goal": "৫০ শতক পাড় বাধা (৭নং ইউনিয়ন)"}, {"date": "Mar 31, 2026", "goal": "Harun মন্সুী ৫ কানি রেজিস্ট্রি"}],
        "order": 5
    }
]

_principles: List[dict] = [
    {"id": 1, "name": "NIYYAH", "arabic": "نِيَّة", "meaning": "Begin each day and each task with a clear intention (Niyyah) to please Allah (SWT) and benefit humanity.", "verse": None, "icon": "heart", "order": 1},
    {"id": 2, "name": "TAWAKKUL", "arabic": "تَوَكُّل", "meaning": "\"And put your trust in Allah if you are believers indeed.\"", "verse": "Quran 5:23", "icon": "shield", "order": 2},
    {"id": 3, "name": "ISTIKHARAH", "arabic": "اِسْتِخَارَة", "meaning": "Constantly seek Allah's guidance (Istikhara) for decisions, especially when you feel the optimization trap pulling you in.", "verse": None, "icon": "compass", "order": 3},
    {"id": 4, "name": "MUHASABAH", "arabic": "مُحَاسَبَة", "meaning": "\"Indeed, Allah will not change the condition of a people until they change what is in themselves.\"", "verse": "Quran 13:11", "icon": "target", "order": 4},
    {"id": 5, "name": "IHSAN", "arabic": "إِحْسَان", "meaning": "Strive for Excellence - \"Worship Allah as if you see Him\".", "verse": None, "icon": "flame", "order": 5},
    {"id": 6, "name": "ITQAN", "arabic": "إِتْقَان", "meaning": "\"Allah loves, when one of you does a job, that he does it with excellence.\"", "verse": None, "icon": "zap", "order": 6}
]

_schedule_blocks: List[dict] = [
    {"id": 1, "time": "04:30", "activity": "Tahajjud & Fajr Preparation", "persona_name": "Siddiq"},
    {"id": 2, "time": "05:00", "activity": "Fajr Salah + Adhkar", "persona_name": "Siddiq"},
    {"id": 3, "time": "05:30", "activity": "Quran Recitation & Memorization", "persona_name": "Siddiq"},
    {"id": 4, "time": "06:30", "activity": "Exercise & Physical Training", "persona_name": "Khalid"},
    {"id": 5, "time": "07:30", "activity": "Morning Routine & Breakfast", "persona_name": "Omar"},
    {"id": 6, "time": "08:00", "activity": "Deep Work Block 1", "persona_name": "Abdur Rahman"},
    {"id": 7, "time": "12:00", "activity": "Dhuhr Salah + Lunch", "persona_name": "Siddiq"},
    {"id": 8, "time": "13:00", "activity": "Deep Work Block 2", "persona_name": "Abdur Rahman"},
    {"id": 9, "time": "15:30", "activity": "Asr Salah + Short Break", "persona_name": "Siddiq"},
    {"id": 10, "time": "16:00", "activity": "Learning & Development", "persona_name": "Ali"},
    {"id": 11, "time": "18:00", "activity": "Maghrib Salah + Family Time", "persona_name": "Omar"},
    {"id": 12, "time": "19:30", "activity": "Isha Salah + Evening Adhkar", "persona_name": "Siddiq"},
    {"id": 13, "time": "20:00", "activity": "Personal Projects / Reading", "persona_name": "Ali"},
    {"id": 14, "time": "22:00", "activity": "Wind Down & Sleep Preparation", "persona_name": "Khalid"}
]

_lifestyle_guidelines: List[dict] = [
    {"id": 1, "title": "8 hours of sleep as a training", "description": "Recovery is part of the discipline", "is_active": True, "order": 1},
    {"id": 2, "title": "Drink only green tea - drink water often", "description": "Stay hydrated, avoid caffeine addiction", "is_active": True, "order": 2},
    {"id": 3, "title": "4 Hours workout", "description": "Total daily movement commitment", "is_active": True, "order": 3},
    {"id": 4, "title": "Every time you use a restroom, use water", "description": "Islamic hygiene practice", "is_active": True, "order": 4},
    {"id": 5, "title": "Always wear glasses when working with computers", "description": "Protect your vision", "is_active": True, "order": 5}
]

_non_negotiables = [
    "Five Daily Prayers on Time",
    "Tahajjud",
    "Morning & Evening Adhkar",
    "Daily Quran with Tadabbur",
    "Istighfar 100x daily"
]

_schedule_table = ScheduleTable(
    headers=["", "2200-0400", "Tahajjud-Fajr", "Fajr-0800", "0800-Magrib", "Magrib-Isha", "Isha-2200"],
    rows=[
        ScheduleTableRow(
            label="Weekdays",
            time_2200_0400="Sleep",
            tahajjud_fajr="Practice *P\nGrowth *G\nConnect *C\nFinance *F",
            fajr_0800="CR7 - Conditioning\n10 Mile Run",
            time_0800_maghrib="Responsibility *R",
            maghrib_isha="CR7 - Strength\nPush Pull Leg - *PPL",
            isha_2200="Rest [R, FT, G, C, F]\nPPL\n[FT, G, C, F]"
        ),
        ScheduleTableRow(
            label="Weekend",
            time_2200_0400="",
            tahajjud_fajr="Family Time [FT]\n[G, C, F]",
            fajr_0800="",
            time_0800_maghrib="Family Time [FT]\n[G, C, F]",
            maghrib_isha="Rest [R, FT, G, C, F]\nPPL",
            isha_2200=""
        )
    ]
)

_dua_for_success = "O Allah, I seek refuge in You from anxiety and grief, weakness and laziness, miserliness and cowardice, the burden of debts, and being overpowered by men."

_super_objective = "MoE - Allah SWT's Satisfaction"
_target_date = "March 31st, 2026"


def _add_timestamps(obj: dict) -> dict:
    """Add timestamps to object."""
    return {
        **obj,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }


# Persona endpoints
@router.get("/personas", response_model=List[Persona])
async def get_personas():
    """Get all personas."""
    return [_add_timestamps(p) for p in _personas]


@router.post("/personas", response_model=Persona)
async def create_persona(persona: PersonaCreate):
    """Create a new persona."""
    new_id = max([p["id"] for p in _personas], default=0) + 1
    new_persona = {"id": new_id, "milestones": [], "order": len(_personas) + 1, **persona.model_dump()}
    _personas.append(new_persona)
    return _add_timestamps(new_persona)


@router.put("/personas/{persona_id}", response_model=Persona)
async def update_persona(persona_id: int, persona: PersonaUpdate):
    """Update a persona."""
    for i, p in enumerate(_personas):
        if p["id"] == persona_id:
            update_data = persona.model_dump(exclude_unset=True)
            _personas[i] = {**p, **update_data}
            return _add_timestamps(_personas[i])
    raise HTTPException(status_code=404, detail="Persona not found")


@router.delete("/personas/{persona_id}")
async def delete_persona(persona_id: int):
    """Delete a persona."""
    global _personas
    _personas = [p for p in _personas if p["id"] != persona_id]
    return {"message": "Persona deleted"}


# Milestones
@router.post("/personas/{persona_id}/milestones", response_model=MilestoneResponse)
async def add_milestone(persona_id: int, milestone: MilestoneCreate):
    """Add a milestone to a persona."""
    for p in _personas:
        if p["id"] == persona_id:
            new_id = len(p.get("milestones", [])) + 1
            new_milestone = {"id": new_id, "persona_id": persona_id, **milestone.model_dump()}
            p.setdefault("milestones", []).append({"date": milestone.date, "goal": milestone.goal})
            return new_milestone
    raise HTTPException(status_code=404, detail="Persona not found")


# Principle endpoints
@router.get("/principles", response_model=List[Principle])
async def get_principles():
    """Get all principles."""
    return [_add_timestamps(p) for p in _principles]


@router.post("/principles", response_model=Principle)
async def create_principle(principle: PrincipleCreate):
    """Create a new principle."""
    new_id = max([p["id"] for p in _principles], default=0) + 1
    new_principle = {"id": new_id, "order": len(_principles) + 1, **principle.model_dump()}
    _principles.append(new_principle)
    return _add_timestamps(new_principle)


@router.put("/principles/{principle_id}", response_model=Principle)
async def update_principle(principle_id: int, principle: PrincipleUpdate):
    """Update a principle."""
    for i, p in enumerate(_principles):
        if p["id"] == principle_id:
            update_data = principle.model_dump(exclude_unset=True)
            _principles[i] = {**p, **update_data}
            return _add_timestamps(_principles[i])
    raise HTTPException(status_code=404, detail="Principle not found")


@router.delete("/principles/{principle_id}")
async def delete_principle(principle_id: int):
    """Delete a principle."""
    global _principles
    _principles = [p for p in _principles if p["id"] != principle_id]
    return {"message": "Principle deleted"}


# Schedule endpoints
@router.get("/schedule/blocks", response_model=List[ScheduleBlock])
async def get_schedule_blocks():
    """Get all schedule blocks."""
    return _schedule_blocks


@router.post("/schedule/blocks", response_model=ScheduleBlock)
async def create_schedule_block(block: ScheduleBlockCreate):
    """Create a new schedule block."""
    new_id = max([b["id"] for b in _schedule_blocks], default=0) + 1
    new_block = {"id": new_id, **block.model_dump()}
    _schedule_blocks.append(new_block)
    return new_block


@router.get("/schedule/table", response_model=ScheduleTable)
async def get_schedule_table():
    """Get the schedule table."""
    return _schedule_table


# Lifestyle endpoints
@router.get("/lifestyle/guidelines", response_model=List[LifestyleGuideline])
async def get_lifestyle_guidelines():
    """Get all lifestyle guidelines."""
    return _lifestyle_guidelines


@router.post("/lifestyle/guidelines", response_model=LifestyleGuideline)
async def create_lifestyle_guideline(guideline: LifestyleGuidelineCreate):
    """Create a new lifestyle guideline."""
    new_id = max([g["id"] for g in _lifestyle_guidelines], default=0) + 1
    new_guideline = {"id": new_id, "order": len(_lifestyle_guidelines) + 1, **guideline.model_dump()}
    _lifestyle_guidelines.append(new_guideline)
    return new_guideline


@router.get("/lifestyle/non-negotiables", response_model=List[str])
async def get_non_negotiables():
    """Get all non-negotiables."""
    return _non_negotiables


@router.put("/lifestyle/non-negotiables", response_model=List[str])
async def update_non_negotiables(items: List[str]):
    """Update non-negotiables."""
    global _non_negotiables
    _non_negotiables = items
    return _non_negotiables


@router.get("/lifestyle/dua", response_model=str)
async def get_dua():
    """Get du'a for success."""
    return _dua_for_success


@router.put("/lifestyle/dua", response_model=str)
async def update_dua(dua: str):
    """Update du'a for success."""
    global _dua_for_success
    _dua_for_success = dua
    return _dua_for_success


# Summary endpoint
@router.get("/summary", response_model=MoESummary)
async def get_moe_summary():
    """Get complete MoE summary."""
    return MoESummary(
        super_objective=_super_objective,
        target_date=_target_date,
        personas=[_add_timestamps(p) for p in _personas],
        principles=[_add_timestamps(p) for p in _principles],
        schedule_blocks=_schedule_blocks,
        schedule_table=_schedule_table,
        lifestyle_guidelines=_lifestyle_guidelines,
        non_negotiables=_non_negotiables,
        dua_for_success=_dua_for_success
    )
