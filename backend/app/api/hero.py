from fastapi import APIRouter
from app.models.portfolio import Hero
from datetime import datetime

router = APIRouter()

hero_data = {
    "id": "hero",
    "roles": [
        "Senior DevOps Engineer",
        "AI Products Engineer", 
        "Site Reliability Engineer",
        "Cloud Architect",
        "Platform Engineer"
    ],
    "name": "Alamin Mahamud",
    "description": "Dynamic technology leader with 10+ years of expertise in building scalable cloud platforms & leading DevOps + SRE teams.",
    "metrics": {
        "cost_savings": "$1M+",
        "saas_arr": "$20M+", 
        "experience": "10+"
    },
    "updated_at": datetime.now()
}

@router.get("/", response_model=Hero)
async def get_hero_data():
    """Get hero section data"""
    return hero_data