from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.models.portfolio import TechSkill
from datetime import datetime

router = APIRouter()

techstack_data = [
    # Programming & Frameworks
    {
        "id": "python",
        "name": "Python",
        "category": "programming",
        "level": 95,
        "years_exp": 8,
        "icon": "Code",
        "color": "text-yellow-400",
        "projects": 45,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "go",
        "name": "Go",
        "category": "programming",
        "level": 88,
        "years_exp": 5,
        "icon": "Code",
        "color": "text-blue-400",
        "projects": 28,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "typescript",
        "name": "TypeScript",
        "category": "programming",
        "level": 92,
        "years_exp": 6,
        "icon": "Code",
        "color": "text-blue-600",
        "projects": 35,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "fastapi",
        "name": "FastAPI",
        "category": "programming",
        "level": 90,
        "years_exp": 4,
        "icon": "Zap",
        "color": "text-green-500",
        "projects": 20,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "nextjs",
        "name": "Next.js",
        "category": "programming",
        "level": 85,
        "years_exp": 3,
        "icon": "Code",
        "color": "text-gray-300",
        "projects": 15,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    
    # Cloud & Infrastructure
    {
        "id": "aws",
        "name": "AWS",
        "category": "cloud",
        "level": 95,
        "years_exp": 7,
        "icon": "Cloud",
        "color": "text-orange-400",
        "projects": 50,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "gcp",
        "name": "GCP",
        "category": "cloud",
        "level": 82,
        "years_exp": 4,
        "icon": "Cloud",
        "color": "text-blue-500",
        "projects": 25,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "azure",
        "name": "Azure",
        "category": "cloud",
        "level": 78,
        "years_exp": 3,
        "icon": "Cloud",
        "color": "text-blue-400",
        "projects": 18,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "kubernetes",
        "name": "Kubernetes",
        "category": "orchestration",
        "level": 92,
        "years_exp": 6,
        "icon": "Container",
        "color": "text-blue-500",
        "projects": 40,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "docker",
        "name": "Docker",
        "category": "orchestration",
        "level": 95,
        "years_exp": 8,
        "icon": "Container",
        "color": "text-blue-400",
        "projects": 55,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "terraform",
        "name": "Terraform",
        "category": "iac",
        "level": 90,
        "years_exp": 5,
        "icon": "Server",
        "color": "text-purple-500",
        "projects": 35,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "ansible",
        "name": "Ansible",
        "category": "iac",
        "level": 85,
        "years_exp": 4,
        "icon": "Server",
        "color": "text-red-500",
        "projects": 30,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    
    # Databases & Storage
    {
        "id": "postgresql",
        "name": "PostgreSQL",
        "category": "database",
        "level": 88,
        "years_exp": 7,
        "icon": "Database",
        "color": "text-blue-600",
        "projects": 42,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "redis",
        "name": "Redis",
        "category": "database",
        "level": 85,
        "years_exp": 5,
        "icon": "Database",
        "color": "text-red-500",
        "projects": 25,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "elasticsearch",
        "name": "Elasticsearch",
        "category": "database",
        "level": 80,
        "years_exp": 4,
        "icon": "Database",
        "color": "text-yellow-500",
        "projects": 20,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    
    # Monitoring & Observability
    {
        "id": "prometheus",
        "name": "Prometheus",
        "category": "monitoring",
        "level": 90,
        "years_exp": 5,
        "icon": "Activity",
        "color": "text-orange-500",
        "projects": 35,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "grafana",
        "name": "Grafana",
        "category": "monitoring",
        "level": 88,
        "years_exp": 5,
        "icon": "Activity",
        "color": "text-orange-400",
        "projects": 32,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "datadog",
        "name": "DataDog",
        "category": "monitoring",
        "level": 85,
        "years_exp": 4,
        "icon": "Activity",
        "color": "text-purple-600",
        "projects": 20,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    
    # CI/CD & DevOps
    {
        "id": "github-actions",
        "name": "GitHub Actions",
        "category": "cicd",
        "level": 92,
        "years_exp": 5,
        "icon": "GitBranch",
        "color": "text-gray-300",
        "projects": 40,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "jenkins",
        "name": "Jenkins",
        "category": "cicd",
        "level": 78,
        "years_exp": 6,
        "icon": "GitBranch",
        "color": "text-blue-600",
        "projects": 25,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
]

@router.get("/", response_model=List[TechSkill])
async def get_tech_skills(
    category: Optional[str] = Query(None, description="Filter by category"),
    min_level: Optional[int] = Query(None, description="Minimum skill level (0-100)"),
    limit: Optional[int] = Query(None, description="Limit number of results")
):
    """Get all tech skills with optional filtering"""
    filtered_skills = techstack_data.copy()
    
    if category and category != "all":
        filtered_skills = [s for s in filtered_skills if s["category"] == category]
    
    if min_level is not None:
        filtered_skills = [s for s in filtered_skills if s["level"] >= min_level]
    
    if limit is not None:
        filtered_skills = filtered_skills[:limit]
    
    return filtered_skills

@router.get("/{skill_id}", response_model=TechSkill)
async def get_tech_skill(skill_id: str):
    """Get a specific tech skill by ID"""
    skill = next((s for s in techstack_data if s["id"] == skill_id), None)
    if not skill:
        raise HTTPException(status_code=404, detail="Tech skill not found")
    return skill

@router.get("/categories/list")
async def get_tech_categories():
    """Get all available tech skill categories"""
    return {
        "categories": [
            {"id": "all", "name": "All Technologies"},
            {"id": "programming", "name": "Programming"},
            {"id": "cloud", "name": "Cloud Platforms"},
            {"id": "orchestration", "name": "Orchestration"},
            {"id": "iac", "name": "Infrastructure as Code"},
            {"id": "database", "name": "Databases"},
            {"id": "monitoring", "name": "Monitoring"},
            {"id": "cicd", "name": "CI/CD"}
        ]
    }

@router.get("/summary/stats")
async def get_tech_summary():
    """Get summary statistics for tech skills"""
    total_technologies = len(techstack_data)
    total_projects = sum(skill["projects"] for skill in techstack_data)
    avg_proficiency = sum(skill["level"] for skill in techstack_data) / len(techstack_data)
    expert_level_skills = len([s for s in techstack_data if s["level"] >= 90])
    
    return {
        "total_technologies": total_technologies,
        "total_projects": total_projects,
        "average_proficiency": round(avg_proficiency, 1),
        "expert_level_skills": expert_level_skills
    }