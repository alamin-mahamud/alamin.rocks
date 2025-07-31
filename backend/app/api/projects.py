from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.models.portfolio import Project, ProjectCategory, ProjectStatus
from datetime import datetime

router = APIRouter()

# Mock data - in production, this would come from a database
projects_data = [
    {
        "id": "1",
        "title": "AI-Powered Model Customization Platform (MCP)",
        "description": "Revolutionary LLM integration platform that accelerated time-to-market by 40% and boosted qualified lead discovery by 25%.",
        "long_description": "End-to-end integration platform for advanced large language models featuring semantic enrichment, personalized AI-driven recommendations, and custom model fine-tuning capabilities. Built for enterprise-scale deployment with real-time inference optimization.",
        "technologies": ["MCP Protocol", "LLM Integration", "AI-SDK", "TypeScript", "PostgreSQL", "Nest.JS", "Next.JS", "Python", "TensorFlow"],
        "github_url": "https://github.com/leadsync-ai/mcp-platform",
        "live_url": "https://leadsync.ai",
        "demo_url": "https://demo.leadsync.ai",
        "featured": True,
        "category": "AI/ML",
        "impact": {
            "users": 50000,
            "performance": "40% faster time-to-market",
            "savings": "$2M+ in development costs"
        },
        "stats": {
            "stars": 342,
            "forks": 67,
            "commits": 1240,
            "contributors": 8
        },
        "status": "maintained",
        "ai_powered": True,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "2",
        "title": "Cloud Cost Optimization Engine",
        "description": "AI-driven cost optimization system that saved $1M+ in cloud expenses across 50+ enterprise clients.",
        "long_description": "Intelligent cloud resource optimization platform using machine learning to predict usage patterns, automatically rightsizing instances, and implementing cost-saving strategies. Features real-time monitoring, predictive scaling, and automated resource lifecycle management.",
        "technologies": ["Python", "AWS", "Terraform", "Kubernetes", "Machine Learning", "Prometheus", "Grafana", "DataDog"],
        "github_url": "https://github.com/alamin-mahamud/cloud-optimizer",
        "featured": True,
        "category": "DevOps/SRE",
        "impact": {
            "savings": "$1M+ cloud cost reduction",
            "users": 50,
            "reliability": "99.99% SLA maintained"
        },
        "stats": {
            "stars": 156,
            "forks": 23,
            "commits": 890,
            "contributors": 4
        },
        "status": "completed",
        "ai_powered": True,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "3",
        "title": "HomeLab: GitOps Infrastructure",
        "description": "Production-grade homelab automation framework with Kubernetes orchestration and Infrastructure as Code.",
        "long_description": "Comprehensive homelab management system featuring GitOps workflows, automated service deployment, monitoring stack integration, and disaster recovery mechanisms. Supports multi-cloud deployment and hybrid infrastructure management.",
        "technologies": ["Terraform", "Kubernetes", "Ansible", "GitOps", "ArgoCD", "Prometheus", "Grafana", "Traefik"],
        "github_url": "https://github.com/alamin-mahamud/homelab",
        "demo_url": "https://demo.homelab.alamin.rocks",
        "featured": True,
        "category": "Infrastructure",
        "impact": {
            "performance": "80% faster deployment",
            "reliability": "Zero-downtime updates"
        },
        "stats": {
            "stars": 89,
            "forks": 15,
            "commits": 467,
            "contributors": 2
        },
        "status": "maintained",
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "4",
        "title": "Alexandria: Multi-Cloud IaC Library",
        "description": "Terraform modules library for enterprise-grade multi-cloud deployments across AWS, GCP, and Azure.",
        "long_description": "Comprehensive Infrastructure as Code library providing reusable Terraform modules for complex cloud architectures. Features automated compliance checking, cost estimation, and security best practices enforcement.",
        "technologies": ["Terraform", "AWS", "GCP", "Azure", "Infrastructure as Code", "Compliance", "Security"],
        "github_url": "https://github.com/alamin-mahamud/alexandria",
        "featured": True,
        "category": "Infrastructure",
        "impact": {
            "users": 200,
            "performance": "60% faster infrastructure provisioning"
        },
        "stats": {
            "stars": 203,
            "forks": 34,
            "commits": 324,
            "contributors": 6
        },
        "status": "maintained",
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "5",
        "title": "Asset Allocation AI Solver",
        "description": "Machine learning-powered optimization engine for strategic resource allocation in complex environments.",
        "long_description": "Advanced optimization system using genetic algorithms and reinforcement learning to solve multi-constraint asset allocation problems. Designed for financial portfolio management and strategic resource planning.",
        "technologies": ["Python", "TensorFlow", "Optimization Algorithms", "Reinforcement Learning", "Mathematical Modeling"],
        "github_url": "https://github.com/alamin-mahamud/capstone",
        "demo_url": "https://asset-optimizer.alamin.rocks",
        "featured": False,
        "category": "AI/ML",
        "impact": {
            "performance": "35% better allocation efficiency"
        },
        "stats": {
            "stars": 45,
            "forks": 8,
            "commits": 156,
            "contributors": 1
        },
        "status": "completed",
        "ai_powered": True,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": "6",
        "title": "AlterYouth: Social Impact Platform",
        "description": "Blockchain-powered scholarship platform connecting global donors with students in need.",
        "long_description": "Revolutionary C2C scholarship platform integrating digital banking, blockchain transparency, and AI-powered student matching. Features automated fund distribution, impact tracking, and community building tools.",
        "technologies": ["Full-Stack Development", "Blockchain", "Digital Banking", "Payment Processing", "React", "Node.js"],
        "github_url": "https://github.com/alamin-mahamud/alteryouth",
        "live_url": "https://alteryouth.com",
        "featured": False,
        "category": "Social Impact",
        "impact": {
            "users": 10000,
            "savings": "$500K+ in scholarships distributed"
        },
        "stats": {
            "stars": 67,
            "forks": 12,
            "commits": 289,
            "contributors": 3
        },
        "status": "completed",
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
]

@router.get("/", response_model=List[Project])
async def get_projects(
    featured: Optional[bool] = Query(None, description="Filter by featured projects"),
    category: Optional[ProjectCategory] = Query(None, description="Filter by category"),
    ai_powered: Optional[bool] = Query(None, description="Filter by AI-powered projects"),
    limit: Optional[int] = Query(None, description="Limit number of results")
):
    """Get all projects with optional filtering"""
    filtered_projects = projects_data.copy()
    
    if featured is not None:
        filtered_projects = [p for p in filtered_projects if p["featured"] == featured]
    
    if category is not None:
        filtered_projects = [p for p in filtered_projects if p["category"] == category]
    
    if ai_powered is not None:
        filtered_projects = [p for p in filtered_projects if p.get("ai_powered", False) == ai_powered]
    
    if limit is not None:
        filtered_projects = filtered_projects[:limit]
    
    return filtered_projects

@router.get("/{project_id}", response_model=Project)
async def get_project(project_id: str):
    """Get a specific project by ID"""
    project = next((p for p in projects_data if p["id"] == project_id), None)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.get("/categories/list")
async def get_project_categories():
    """Get all available project categories"""
    return {
        "categories": [
            {"id": "all", "name": "All Projects"},
            {"id": "AI/ML", "name": "AI/ML"},
            {"id": "DevOps/SRE", "name": "DevOps/SRE"},
            {"id": "Infrastructure", "name": "Infrastructure"},
            {"id": "Social Impact", "name": "Social Impact"}
        ]
    }