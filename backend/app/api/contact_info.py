from fastapi import APIRouter
from app.models.portfolio import ContactInfo
from datetime import datetime

router = APIRouter()

contact_data = {
    "id": "contact",
    "email": "hello@alamin.rocks",
    "phone": "+880 168 7060 434",
    "location": "Istanbul, Turkey",
    "social_links": {
        "github": "https://github.com/alamin-mahamud",
        "linkedin": "https://linkedin.com/in/alamin-mahamud",
        "twitter": "https://twitter.com/alamin_rocks"
    },
    "updated_at": datetime.now()
}

@router.get("/", response_model=ContactInfo)
async def get_contact_info():
    """Get contact information"""
    return contact_data