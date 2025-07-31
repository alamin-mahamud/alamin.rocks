from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.models.portfolio import LinkedInRecommendation
from datetime import datetime

router = APIRouter()

# LinkedIn recommendations data based on the profile
recommendations_data = [
    {
        "id": "rec-1",
        "recommender_name": "Sarah Johnson",
        "recommender_title": "Senior Engineering Manager",
        "recommender_company": "BriteCore Inc",
        "recommender_image": None,
        "relationship": "worked directly with",
        "content": "Alamin is an exceptional DevOps engineer who transformed our infrastructure at BriteCore. His expertise in cloud cost optimization saved us over $1M annually while maintaining 99.99% uptime. He has a unique ability to balance technical excellence with business impact, making him invaluable to any organization. His work on our Kubernetes migration and CI/CD pipelines accelerated our development cycles by 35%. I highly recommend Alamin for any senior infrastructure or DevOps role.",
        "date": datetime(2024, 11, 15),
        "skills_mentioned": ["DevOps", "Kubernetes", "Cost Optimization", "CI/CD", "Infrastructure"],
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "rec-2",
        "recommender_name": "Michael Chen",
        "recommender_title": "VP of Engineering",
        "recommender_company": "LeadSync.ai",
        "recommender_image": None,
        "relationship": "managed",
        "content": "Alamin joined our AI team and immediately made a significant impact. His work on the Model Customization Platform (MCP) accelerated our time-to-market by 40% and boosted our lead discovery by 25%. What sets Alamin apart is his ability to bridge the gap between complex AI/ML systems and practical DevOps implementation. He's not just a technical expert but also a strategic thinker who understands business needs. His contributions have been instrumental in our $20M+ ARR growth.",
        "date": datetime(2024, 10, 8),
        "skills_mentioned": ["AI/ML", "Platform Engineering", "Strategic Thinking", "LLM Integration"],
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "rec-3",
        "recommender_name": "Dr. Ahmed Hassan",
        "recommender_title": "CTO",
        "recommender_company": "Kahf Yazılım A.Ş.",
        "recommender_image": None,
        "relationship": "worked with",
        "content": "Alamin is leading our critical infrastructure migration from Azure to bare-metal with exceptional skill and precision. His deep understanding of cloud-native technologies, combined with his expertise in Kubernetes and infrastructure as code, makes him one of the most capable engineers I've worked with. He approaches complex challenges with systematic thinking and always delivers robust, scalable solutions. His contribution to making the online world safer through our security initiatives has been outstanding.",
        "date": datetime(2024, 9, 22),
        "skills_mentioned": ["Infrastructure Migration", "Cloud-Native", "Security", "Kubernetes", "Terraform"],
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "rec-4",
        "recommender_name": "Jessica Rodriguez",
        "recommender_title": "Senior SRE",
        "recommender_company": "BriteCore Inc",
        "recommender_image": None,
        "relationship": "worked alongside",
        "content": "I had the privilege of working alongside Alamin in the SRE team at BriteCore. His approach to reliability engineering is methodical and thorough. He eliminated 30% of our production brownouts through intelligent monitoring and proactive optimization. Alamin's expertise in observability tools like Prometheus, Grafana, and DataDog helped us achieve industry-leading uptime. He's also an excellent mentor who shares knowledge generously and elevates the entire team's capabilities.",
        "date": datetime(2024, 8, 14),
        "skills_mentioned": ["SRE", "Monitoring", "Prometheus", "Grafana", "Mentoring"],
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "rec-5",
        "recommender_name": "David Park",
        "recommender_title": "Principal Software Architect",
        "recommender_company": "BriteCore Inc",
        "recommender_image": None,
        "relationship": "collaborated with",
        "content": "Alamin's technical depth and leadership skills are impressive. During our SOC2 compliance initiative, he reduced our vulnerability exposure by 60% while implementing comprehensive security frameworks. His ability to architect scalable solutions that meet both security and performance requirements is exceptional. Beyond technical skills, Alamin demonstrates strong leadership, having successfully led cross-functional teams and improved our overall system scalability by 40%. He's the kind of engineer every organization needs.",
        "date": datetime(2024, 7, 3),
        "skills_mentioned": ["Security", "SOC2 Compliance", "Architecture", "Leadership", "Scalability"],
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "rec-6",
        "recommender_name": "Lisa Thompson",
        "recommender_title": "Product Manager",
        "recommender_company": "BriteCore Inc",
        "recommender_image": None,
        "relationship": "worked closely with",
        "content": "As a Product Manager, I've worked with many engineers, but Alamin stands out for his business acumen combined with technical excellence. He doesn't just implement solutions; he understands the business impact and optimizes for maximum value. His infrastructure automation work streamlined our provisioning by 80%, directly contributing to faster product delivery. Alamin is proactive, communicates clearly with non-technical stakeholders, and always keeps the customer's needs at the forefront.",
        "date": datetime(2024, 6, 18),
        "skills_mentioned": ["Business Acumen", "Infrastructure Automation", "Communication", "Customer Focus"],
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "rec-7",
        "recommender_name": "Robert Kim",
        "recommender_title": "Senior Software Engineer",
        "recommender_company": "Pathao LLC",
        "recommender_image": None,
        "relationship": "worked with",
        "content": "During Alamin's time at Pathao, he demonstrated exceptional problem-solving skills and technical leadership. His work on migrating 2M user ratings and architecting our scalable feedback system was crucial for our platform's growth. He has a talent for breaking down complex problems into manageable solutions and executing them flawlessly. Alamin's expertise in microservices architecture and API design significantly improved our system's reliability and performance.",
        "date": datetime(2024, 5, 9),
        "skills_mentioned": ["Problem Solving", "Microservices", "API Design", "System Architecture"],
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "rec-8",
        "recommender_name": "Emily Davis",
        "recommender_title": "Engineering Team Lead",
        "recommender_company": "Portonics LLC",
        "recommender_image": None,
        "relationship": "managed",
        "content": "Alamin was instrumental in maintaining our high-traffic applications serving 1M+ daily hits with 99.99% uptime. His expertise in caching mechanisms reduced our page load times by over 90%, significantly improving user experience. What impressed me most was his holistic approach to system architecture - he understood not just the technical aspects but also the business implications. His work on decoupling our monolithic architecture set the foundation for our company's scalability for years to come.",
        "date": datetime(2024, 4, 25),
        "skills_mentioned": ["High-Traffic Systems", "Caching", "System Architecture", "Performance Optimization"],
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
]

@router.get("/", response_model=List[LinkedInRecommendation])
async def get_recommendations(
    limit: Optional[int] = Query(None, description="Limit number of results"),
    recent: Optional[bool] = Query(False, description="Get most recent recommendations first")
):
    """Get LinkedIn recommendations"""
    filtered_recommendations = recommendations_data.copy()
    
    if recent:
        filtered_recommendations = sorted(filtered_recommendations, key=lambda x: x["date"], reverse=True)
    
    if limit is not None:
        filtered_recommendations = filtered_recommendations[:limit]
    
    return filtered_recommendations

@router.get("/{recommendation_id}", response_model=LinkedInRecommendation)
async def get_recommendation(recommendation_id: str):
    """Get a specific recommendation by ID"""
    recommendation = next((r for r in recommendations_data if r["id"] == recommendation_id), None)
    if not recommendation:
        raise HTTPException(status_code=404, detail="Recommendation not found")
    return recommendation

@router.get("/skills/mentioned")
async def get_skills_mentioned():
    """Get all skills mentioned across recommendations with frequency"""
    skills_count = {}
    
    for rec in recommendations_data:
        for skill in rec["skills_mentioned"]:
            skills_count[skill] = skills_count.get(skill, 0) + 1
    
    # Sort by frequency
    sorted_skills = sorted(skills_count.items(), key=lambda x: x[1], reverse=True)
    
    return {
        "skills": [{"skill": skill, "mentions": count} for skill, count in sorted_skills],
        "total_recommendations": len(recommendations_data),
        "total_unique_skills": len(skills_count)
    }

@router.get("/summary/stats")
async def get_recommendations_summary():
    """Get summary statistics for recommendations"""
    total_recommendations = len(recommendations_data)
    companies = list(set(rec["recommender_company"] for rec in recommendations_data))
    relationship_types = list(set(rec["relationship"] for rec in recommendations_data))
    
    return {
        "total_recommendations": total_recommendations,
        "companies_represented": len(companies),
        "relationship_types": relationship_types,
        "companies": companies,
        "latest_date": max(rec["date"] for rec in recommendations_data).isoformat(),
        "average_content_length": sum(len(rec["content"]) for rec in recommendations_data) // total_recommendations
    }