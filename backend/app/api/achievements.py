from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.models.portfolio import Achievement
from datetime import datetime

router = APIRouter()

achievements_data = [
    {
        "id": "cloud-savings",
        "title": "Cloud Cost Optimization",
        "value": "$1.2M+",
        "description": "Total cloud infrastructure cost savings achieved",
        "icon": "DollarSign",
        "color": "text-accent",
        "percentage": 100,
        "details": [
            "Optimized AWS CloudWatch log ingestion saving $36.5K/year",
            "Implemented intelligent resource rightsizing algorithms",
            "Automated cost monitoring and alert systems",
            "Cross-functional team leadership for cost optimization initiatives"
        ],
        "category": "financial",
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "saas-arr",
        "title": "SaaS ARR Generation",
        "value": "$20M+",
        "description": "Annual Recurring Revenue contribution to SaaS platforms",
        "icon": "TrendingUp",
        "color": "text-accent",
        "percentage": 100,
        "details": [
            "Designed and maintained highly available SaaS platforms",
            "Implemented scalable cloud architectures",
            "Enhanced platform reliability and performance",
            "Drove customer retention through system optimization"
        ],
        "category": "financial",
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "platform-reliability",
        "title": "System Reliability",
        "value": "99.99%",
        "description": "Uptime SLA maintained across 50+ client environments",
        "icon": "Shield",
        "color": "text-accent",
        "percentage": 100,
        "details": [
            "Advanced monitoring and alerting systems",
            "Blue/green deployment strategies eliminating downtime",
            "Proactive incident response and resolution",
            "Comprehensive disaster recovery planning"
        ],
        "category": "operational",
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "performance-improvement",
        "title": "Performance Optimization",
        "value": "40%",
        "description": "Average performance improvement across systems",
        "icon": "Zap",
        "color": "text-warning",
        "percentage": 40,
        "details": [
            "Accelerated time-to-market by 40% with MCP platform",
            "Reduced page load times by 90% through caching",
            "Eliminated 30% of production brownouts",
            "Optimized runtime configuration and state management"
        ],
        "category": "performance",
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "user-impact",
        "title": "User Base Served",
        "value": "100K+",
        "description": "Active users across deployed platforms and systems",
        "icon": "Users",
        "color": "text-accent",
        "percentage": 100,
        "details": [
            "LeadSync.ai platform serving 50K+ users",
            "AlterYouth scholarship platform with 10K+ users",
            "HomeLab framework adopted by 200+ users",
            "Enterprise platforms serving 50+ B2B clients"
        ],
        "category": "impact",
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "security-compliance",
        "title": "Security & Compliance",
        "value": "60%",
        "description": "Vulnerability exposure reduction achieving SOC2 compliance",
        "icon": "Award",
        "color": "text-accent",
        "percentage": 60,
        "details": [
            "Achieved SOC2 Type II compliance certification",
            "Implemented comprehensive security frameworks",
            "Mitigated data breaches and security vulnerabilities",
            "Enhanced client data protection measures"
        ],
        "category": "security",
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "automation-efficiency",
        "title": "Automation Efficiency",
        "value": "80%",
        "description": "Infrastructure provisioning time reduction through automation",
        "icon": "Target",
        "color": "text-accent",
        "percentage": 80,
        "details": [
            "Terraform modules streamlined provisioning by 80%",
            "CI/CD pipelines accelerated development cycles by 35%",
            "Automated support operations reducing manual toil by 75%",
            "GitOps workflows enabling continuous deployment"
        ],
        "category": "operational",
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "team-satisfaction",
        "title": "Team Satisfaction",
        "value": "90%",
        "description": "High-profile customer and internal team satisfaction scores",
        "icon": "CheckCircle",
        "color": "text-accent",
        "percentage": 90,
        "details": [
            "Boosted high-profile customer satisfaction to 90%",
            "Elevated internal team satisfaction by 20%",
            "Led cross-functional teams improving scalability by 40%",
            "Mentored junior engineers and knowledge sharing"
        ],
        "category": "leadership",
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
]

@router.get("/", response_model=List[Achievement])
async def get_achievements(
    category: Optional[str] = Query(None, description="Filter by category"),
    limit: Optional[int] = Query(None, description="Limit number of results")
):
    """Get all achievements with optional filtering"""
    filtered_achievements = achievements_data.copy()
    
    if category and category != "all":
        filtered_achievements = [a for a in filtered_achievements if a["category"] == category]
    
    if limit is not None:
        filtered_achievements = filtered_achievements[:limit]
    
    return filtered_achievements

@router.get("/{achievement_id}", response_model=Achievement)
async def get_achievement(achievement_id: str):
    """Get a specific achievement by ID"""
    achievement = next((a for a in achievements_data if a["id"] == achievement_id), None)
    if not achievement:
        raise HTTPException(status_code=404, detail="Achievement not found")
    return achievement

@router.get("/categories/list")
async def get_achievement_categories():
    """Get all available achievement categories"""
    return {
        "categories": [
            {"id": "all", "name": "All Achievements"},
            {"id": "financial", "name": "Financial Impact"},
            {"id": "operational", "name": "Operational Excellence"},
            {"id": "performance", "name": "Performance"},
            {"id": "impact", "name": "User Impact"},
            {"id": "security", "name": "Security"},
            {"id": "leadership", "name": "Leadership"}
        ]
    }

@router.get("/summary/metrics")
async def get_achievement_summary():
    """Get summary metrics for achievements"""
    financial_achievements = [a for a in achievements_data if a["category"] == "financial"]
    total_financial_impact = 21.2  # $1.2M + $20M
    total_users = 100000
    total_achievements = len(achievements_data)
    
    return {
        "total_financial_impact": f"${total_financial_impact}M+",
        "users_served": f"{total_users//1000}K+",
        "major_achievements": total_achievements,
        "reliability_score": "99.99%"
    }