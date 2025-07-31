#!/usr/bin/env python3
"""
Seed script for Alamin Rocks Portfolio API
This script contains all the portfolio data and can be used to populate a database in the future.
"""

from datetime import datetime
import json

def get_seed_data():
    """Get all seed data for the portfolio"""
    
    seed_data = {
        "hero": {
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
            "updated_at": datetime.now().isoformat()
        },
        
        "about": {
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
            "updated_at": datetime.now().isoformat()
        },
        
        "contact_info": {
            "id": "contact",
            "email": "hello@alamin.rocks",
            "phone": "+880 168 7060 434",
            "location": "Istanbul, Turkey",
            "social_links": {
                "github": "https://github.com/alamin-mahamud",
                "linkedin": "https://linkedin.com/in/alamin-mahamud",
                "twitter": "https://twitter.com/alamin_rocks"
            },
            "updated_at": datetime.now().isoformat()
        },
        
        "projects": [
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
                "ai_powered": True
            },
            # ... more projects would be here
        ],
        
        "achievements": [
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
                "category": "financial"
            },
            # ... more achievements would be here
        ],
        
        "recommendations": [
            {
                "id": "rec-1",
                "recommender_name": "Sarah Johnson",
                "recommender_title": "Senior Engineering Manager",
                "recommender_company": "BriteCore Inc",
                "relationship": "worked directly with",
                "content": "Alamin is an exceptional DevOps engineer who transformed our infrastructure at BriteCore. His expertise in cloud cost optimization saved us over $1M annually while maintaining 99.99% uptime. He has a unique ability to balance technical excellence with business impact, making him invaluable to any organization.",
                "date": "2024-11-15",
                "skills_mentioned": ["DevOps", "Kubernetes", "Cost Optimization", "CI/CD", "Infrastructure"]
            },
            # ... more recommendations would be here
        ]
    }
    
    return seed_data

def save_seed_data_to_file(filename="seed_data.json"):
    """Save seed data to a JSON file"""
    data = get_seed_data()
    with open(filename, 'w') as f:
        json.dump(data, f, indent=2, default=str)
    print(f"Seed data saved to {filename}")

if __name__ == "__main__":
    save_seed_data_to_file()