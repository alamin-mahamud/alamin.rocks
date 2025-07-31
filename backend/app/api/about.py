from fastapi import APIRouter
from app.models.portfolio import About
from datetime import datetime

router = APIRouter()

about_data = {
    "id": "about",
    "title": "About Me",
    "description": [
        "Dynamic technology leader with 10+ years of expertise in building scalable cloud platforms & leading DevOps + SRE teams. Currently working as Senior DevOps Engineer at Kahf Yazılım A.Ş. and Senior Software Engineer at LeadSync.ai.",
        "Previously Senior Platform Engineer & SRE at BriteCore Inc where I generated $20M+ ARR and cut $1M+ cloud costs. I specialize in cloud architecture, Kubernetes, Infrastructure as Code, and building highly available SaaS platforms.",
        "A multi-dimensional thinker with a global mindset, systems-level thinking, and a relentless execution habit."
    ],
    "skills": [
        "Python", "Go", "TypeScript", "Kubernetes", "AWS/GCP/Azure", "Terraform", 
        "Docker", "PostgreSQL", "Redis", "FastAPI", "Nest.JS", "Next.JS", 
        "Prometheus/Grafana", "Ansible", "Jenkins/GitHub Actions", "Elasticsearch"
    ],
    "quick_facts": {
        "location": "Istanbul, Turkey / Remote",
        "experience": "10+ Years", 
        "focus": "DevOps & SRE",
        "interests": "Cloud Architecture, AI, Podcasting"
    },
    "updated_at": datetime.now()
}

@router.get("/", response_model=About)
async def get_about_data():
    """Get about section data"""
    return about_data