#!/usr/bin/env python3
"""
Updated Comprehensive Database Seeder
Seeds the database with complete portfolio data matching the existing schema.
"""

import asyncio
import logging
from datetime import datetime, date
from typing import List, Dict, Any
import json
import sys
import os

# Add the app directory to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler('seed_updated_comprehensive.log')
    ]
)
logger = logging.getLogger(__name__)

# Database configuration
DATABASE_URL = "postgresql+asyncpg://postgres:password@localhost:5452/alamin_rocks"
engine = create_async_engine(DATABASE_URL, echo=False)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

# Comprehensive seed data matching frontend static data exactly
SEED_DATA = {
    "languages": [
        {"code": "en", "name": "English", "native_name": "English", "enabled": True},
        {"code": "bn", "name": "Bengali", "native_name": "বাংলা", "enabled": True}
    ],
    
    "hero": {
        "id": "hero",
        "name": "Alamin Mahamud",
        "metrics": {
            "cost_savings": "$1.2M+",
            "saas_arr": "$20M+",
            "experience": "10+",
            "users_served": "100K+",
            "uptime_sla": "99.99%",
            "total_impact": "$21.2M+"
        }
    },
    
    "about": {
        "id": "about", 
        "skills": [
            # Programming Languages
            "Python", "Go", "TypeScript", "JavaScript",
            # Web Frameworks
            "FastAPI", "Nest.JS", "Next.JS", "Gin", "Flask", "Django",
            # Cloud Platforms
            "AWS", "GCP", "Azure",
            # Container & Orchestration
            "Docker", "Kubernetes", "ECS", "EKS", "Containerd", "LXC",
            # Infrastructure as Code
            "Terraform", "AWS CDK", "CloudFormation", "Ansible", "SaltStack",
            # CI/CD & DevOps
            "GitHub Actions", "Jenkins", "ArgoCD", "Helm", "Kustomize",
            # Databases & Caching
            "PostgreSQL", "MySQL", "Redis", "Elasticsearch", "OpenSearch",
            # Monitoring & Observability
            "Prometheus", "Grafana", "DataDog", "CloudWatch", "Loki", "ELK Stack",
            # Networking & Security
            "Traefik", "Nginx", "Istio", "Calico", "pfSense", "VPN", "TLS", "BGP",
            # AI & ML
            "MCP Protocol", "LLM Integration", "AI-SDK", "TensorFlow",
            # Messaging & Queues
            "RabbitMQ",
            # Storage & Backup
            "Longhorn", "Ceph", "ZFS", "NFS", "TrueNAS",
            # Operating Systems
            "Linux", "Ubuntu", "Debian", "Arch"
        ]
    },
    
    "contact_info": {
        "id": "contact",
        "email": "hello@alamin.rocks",
        "phone": "+880 168 7060 434",
        "social_links": {
            "github": "https://github.com/alamin-mahamud",
            "linkedin": "https://linkedin.com/in/alamin-mahamud",
            "twitter": "https://twitter.com/alamin_rocks"
        }
    },
    
    "experiences": [
        {
            "id": "kahf-current",
            "company": "Kahf Yazılım A.Ş.",
            "duration": "August 2025 - Present",
            "current": True,
            "technologies": ["Bind9", "CloudNative-PG", "Kubernetes", "Ansible", "Terraform", 
                           "Microsoft Azure", "Traefik", "Helm Charts", "Prometheus", "Grafana", "Loki"],
            "website": "https://kahf.co"
        },
        {
            "id": "source-code-podcast",
            "company": "Source Code Podcast",
            "duration": "March 2025 - Present",
            "current": True,
            "technologies": ["Content Creation", "Community Building", "Podcasting", "Developer Relations"],
            "website": "https://sourcecode.alamin.rocks"
        },
        {
            "id": "dark-knight-tech",
            "company": "Dark Knight Technologies",
            "duration": "November 2023 - Present",
            "current": True,
            "technologies": ["Full-Stack Development", "Cloud Architecture", "Cybersecurity", "Platform Engineering"],
            "website": "https://darkknight.tech"
        },
        {
            "id": "leadsync",
            "company": "LeadSync.ai",
            "duration": "May 2025 - July 2025",
            "current": False,
            "technologies": ["MCP Protocol", "LLM Integration", "AI-SDK", "TypeScript", 
                           "PostgreSQL", "Nest.JS", "Next.JS"],
            "website": "https://leadsync.ai"
        },
        {
            "id": "ak2-tech",
            "company": "AK2 Tech",
            "duration": "August 2024 - April 2025",
            "current": False,
            "technologies": ["AI/ML", "Python", "TypeScript", "Kubernetes", "AWS", "Product Strategy", "GTM"],
            "website": None
        },
        {
            "id": "britecore",
            "company": "BriteCore Inc",
            "duration": "February 2022 - January 2025 (3 years)",
            "current": False,
            "technologies": ["Amazon S3", "MongoDB", "Redis", "EventBridge", "DynamoDB", "Docker", 
                           "Kubernetes", "Terraform", "Python", "FastAPI", "React", "TypeScript"],
            "website": None
        }
    ],
    
    "projects": [
        {
            "id": "1",
            "technologies": ["MCP Protocol", "LLM Integration", "AI-SDK", "TypeScript", 
                           "PostgreSQL", "Nest.JS", "Next.JS", "Python", "TensorFlow"],
            "github_url": "https://github.com/leadsync-ai/mcp-platform",
            "live_url": "https://leadsync.ai",
            "demo_url": "https://demo.leadsync.ai",
            "featured": True,
            "impact": {
                "users": 50000, 
                "performance": "40% faster time-to-market", 
                "savings": "$2M+ in development costs"
            },
            "stats": {"stars": 342, "forks": 67, "commits": 1240, "contributors": 8},
            "status": "maintained",
            "ai_powered": True
        },
        {
            "id": "2",
            "technologies": ["AWS", "Kubernetes", "Terraform", "GitHub Actions", "DataDog", 
                           "Prometheus", "Grafana", "Python", "PostgreSQL"],
            "github_url": None,
            "live_url": None,
            "demo_url": None,
            "featured": True,
            "impact": {
                "savings": "$20M+ ARR + $1M+ cost reduction", 
                "users": 100000, 
                "reliability": "99.99% SLA maintained"
            },
            "stats": {"commits": 5000, "contributors": 20, "deployments": 200},
            "status": "completed",
            "ai_powered": False
        },
        {
            "id": "3",
            "technologies": ["Terraform", "Kubernetes", "Ansible", "GitOps", "ArgoCD", 
                           "Prometheus", "Grafana", "Traefik"],
            "github_url": "https://github.com/alamin-mahamud/homelab",
            "live_url": None,
            "demo_url": "https://demo.homelab.alamin.rocks",
            "featured": True,
            "impact": {
                "performance": "80% faster deployment",
                "reliability": "Zero-downtime updates"
            },
            "stats": {"stars": 89, "forks": 15, "commits": 467, "contributors": 2},
            "status": "maintained",
            "ai_powered": False
        },
        {
            "id": "4",
            "technologies": ["Terraform", "AWS", "GCP", "Azure", "Infrastructure as Code", 
                           "Compliance", "Security"],
            "github_url": "https://github.com/alamin-mahamud/alexandria",
            "live_url": None,
            "demo_url": None,
            "featured": True,
            "impact": {
                "users": 200,
                "performance": "60% faster infrastructure provisioning"
            },
            "stats": {"stars": 203, "forks": 34, "commits": 324, "contributors": 6},
            "status": "maintained",
            "ai_powered": False
        },
        {
            "id": "5",
            "technologies": ["Python", "TensorFlow", "Optimization Algorithms", 
                           "Reinforcement Learning", "Mathematical Modeling"],
            "github_url": "https://github.com/alamin-mahamud/capstone",
            "live_url": None,
            "demo_url": "https://asset-optimizer.alamin.rocks",
            "featured": False,
            "impact": {
                "performance": "35% better allocation efficiency"
            },
            "stats": {"stars": 45, "forks": 8, "commits": 156, "contributors": 1},
            "status": "completed",
            "ai_powered": True
        },
        {
            "id": "6",
            "technologies": ["Full-Stack Development", "Digital Banking", "Payment Processing", 
                           "React", "Node.js", "Blockchain"],
            "github_url": "https://github.com/alamin-mahamud/alteryouth",
            "live_url": "https://alteryouth.com",
            "demo_url": None,
            "featured": False,
            "impact": {
                "users": 10000,
                "savings": "$500K+ in scholarships distributed"
            },
            "stats": {"stars": 67, "forks": 12, "commits": 289, "contributors": 3},
            "status": "completed",
            "ai_powered": False
        },
        {
            "id": "7",
            "technologies": ["AI/ML", "Python", "TypeScript", "Kubernetes", "AWS", 
                           "Product Strategy", "GTM"],
            "github_url": None,
            "live_url": None,
            "demo_url": None,
            "featured": False,
            "impact": {
                "users": 5000,
                "performance": "Secured initial customer traction",
                "team": "10+ members across 3 time zones"
            },
            "stats": {"commits": 800, "contributors": 10},
            "status": "in-progress",
            "ai_powered": True
        }
    ],
    
    "achievements": [
        {
            "id": "cloud-savings",
            "value": "$1.2M+",
            "icon": "DollarSign",
            "color": "text-accent",
            "percentage": 100,
            "category": "financial"
        },
        {
            "id": "saas-arr",
            "value": "$20M+",
            "icon": "TrendingUp", 
            "color": "text-accent",
            "percentage": 100,
            "category": "financial"
        },
        {
            "id": "platform-reliability",
            "value": "99.99%",
            "icon": "Shield",
            "color": "text-accent",
            "percentage": 99,
            "category": "operational"
        },
        {
            "id": "performance-improvement",
            "value": "40%",
            "icon": "Zap",
            "color": "text-warning",
            "percentage": 40,
            "category": "performance"
        },
        {
            "id": "user-impact",
            "value": "100K+",
            "icon": "Users",
            "color": "text-accent",
            "percentage": 100,
            "category": "impact"
        },
        {
            "id": "security-compliance",
            "value": "60%",
            "icon": "Award",
            "color": "text-accent",
            "percentage": 60,
            "category": "security"
        },
        {
            "id": "automation-efficiency",
            "value": "80%",
            "icon": "Target",
            "color": "text-accent",
            "percentage": 80,
            "category": "operational"
        },
        {
            "id": "team-satisfaction",
            "value": "90%",
            "icon": "CheckCircle",
            "color": "text-accent",
            "percentage": 90,
            "category": "leadership"
        }
    ],
    
    "skills": [
        {
            "id": "python",
            "name": "Python",
            "category": "Programming Languages",
            "proficiency": 95,
            "years_experience": 8,
            "icon": "Code",
            "color": "text-yellow-400"
        },
        {
            "id": "aws",
            "name": "AWS", 
            "category": "Cloud Platforms",
            "proficiency": 95,
            "years_experience": 7,
            "icon": "Cloud",
            "color": "text-orange-500"
        },
        {
            "id": "kubernetes",
            "name": "Kubernetes",
            "category": "Container Orchestration", 
            "proficiency": 92,
            "years_experience": 6,
            "icon": "Container",
            "color": "text-blue-500"
        }
    ],
    
    "tech_skills": [
        # Programming Languages
        {"id": "python", "name": "Python", "level": 95, "years_exp": 8, "icon": "Code", "color": "text-yellow-400", "projects": 45},
        {"id": "go", "name": "Go", "level": 85, "years_exp": 4, "icon": "Code", "color": "text-blue-400", "projects": 12},
        {"id": "typescript", "name": "TypeScript", "level": 90, "years_exp": 6, "icon": "Code", "color": "text-blue-600", "projects": 35},
        {"id": "javascript", "name": "JavaScript", "level": 88, "years_exp": 7, "icon": "Code", "color": "text-yellow-300", "projects": 40},
        
        # Web Frameworks
        {"id": "fastapi", "name": "FastAPI", "level": 92, "years_exp": 4, "icon": "Code", "color": "text-green-500", "projects": 15},
        {"id": "nestjs", "name": "Nest.JS", "level": 88, "years_exp": 3, "icon": "Code", "color": "text-red-500", "projects": 8},
        {"id": "nextjs", "name": "Next.JS", "level": 85, "years_exp": 3, "icon": "Code", "color": "text-gray-700", "projects": 12},
        {"id": "gin", "name": "Gin", "level": 80, "years_exp": 2, "icon": "Code", "color": "text-blue-500", "projects": 6},
        {"id": "flask", "name": "Flask", "level": 85, "years_exp": 5, "icon": "Code", "color": "text-gray-600", "projects": 18},
        {"id": "django", "name": "Django", "level": 82, "years_exp": 4, "icon": "Code", "color": "text-green-600", "projects": 14},
        
        # Cloud Platforms
        {"id": "aws", "name": "AWS", "level": 95, "years_exp": 7, "icon": "Cloud", "color": "text-orange-500", "projects": 50},
        {"id": "gcp", "name": "GCP", "level": 80, "years_exp": 3, "icon": "Cloud", "color": "text-blue-500", "projects": 15},
        {"id": "azure", "name": "Azure", "level": 88, "years_exp": 5, "icon": "Cloud", "color": "text-blue-600", "projects": 25},
        
        # Container & Orchestration
        {"id": "docker", "name": "Docker", "level": 95, "years_exp": 8, "icon": "Server", "color": "text-blue-500", "projects": 60},
        {"id": "kubernetes", "name": "Kubernetes", "level": 92, "years_exp": 6, "icon": "Server", "color": "text-blue-600", "projects": 35},
        {"id": "ecs", "name": "ECS", "level": 85, "years_exp": 4, "icon": "Cloud", "color": "text-orange-400", "projects": 20},
        {"id": "eks", "name": "EKS", "level": 88, "years_exp": 4, "icon": "Cloud", "color": "text-orange-500", "projects": 18},
        
        # Infrastructure as Code
        {"id": "terraform", "name": "Terraform", "level": 95, "years_exp": 6, "icon": "Server", "color": "text-purple-500", "projects": 40},
        {"id": "ansible", "name": "Ansible", "level": 90, "years_exp": 5, "icon": "Server", "color": "text-red-600", "projects": 25},
        {"id": "cloudformation", "name": "CloudFormation", "level": 80, "years_exp": 4, "icon": "Cloud", "color": "text-orange-400", "projects": 15},
        
        # Databases & Caching
        {"id": "postgresql", "name": "PostgreSQL", "level": 92, "years_exp": 8, "icon": "Database", "color": "text-blue-700", "projects": 45},
        {"id": "mysql", "name": "MySQL", "level": 85, "years_exp": 6, "icon": "Database", "color": "text-blue-600", "projects": 30},
        {"id": "redis", "name": "Redis", "level": 88, "years_exp": 5, "icon": "Database", "color": "text-red-500", "projects": 28},
        {"id": "elasticsearch", "name": "Elasticsearch", "level": 85, "years_exp": 4, "icon": "Database", "color": "text-yellow-600", "projects": 15},
        
        # Monitoring & Observability
        {"id": "prometheus", "name": "Prometheus", "level": 90, "years_exp": 5, "icon": "Activity", "color": "text-orange-600", "projects": 25},
        {"id": "grafana", "name": "Grafana", "level": 92, "years_exp": 5, "icon": "Activity", "color": "text-orange-500", "projects": 30},
        {"id": "datadog", "name": "DataDog", "level": 88, "years_exp": 4, "icon": "Activity", "color": "text-purple-600", "projects": 20},
        {"id": "cloudwatch", "name": "CloudWatch", "level": 85, "years_exp": 6, "icon": "Activity", "color": "text-orange-400", "projects": 35},
        {"id": "loki", "name": "Loki", "level": 80, "years_exp": 3, "icon": "Activity", "color": "text-orange-400", "projects": 12},
        
        # CI/CD & DevOps
        {"id": "github-actions", "name": "GitHub Actions", "level": 95, "years_exp": 5, "icon": "Server", "color": "text-gray-700", "projects": 50},
        {"id": "jenkins", "name": "Jenkins", "level": 82, "years_exp": 4, "icon": "Server", "color": "text-blue-600", "projects": 18},
        {"id": "argocd", "name": "ArgoCD", "level": 85, "years_exp": 3, "icon": "Server", "color": "text-blue-500", "projects": 15},
        {"id": "helm", "name": "Helm", "level": 88, "years_exp": 4, "icon": "Server", "color": "text-blue-600", "projects": 25},
        
        # AI & ML
        {"id": "mcp-protocol", "name": "MCP Protocol", "level": 90, "years_exp": 1, "icon": "Code", "color": "text-purple-500", "projects": 5},
        {"id": "llm-integration", "name": "LLM Integration", "level": 85, "years_exp": 1, "icon": "Code", "color": "text-purple-600", "projects": 8},
        {"id": "ai-sdk", "name": "AI-SDK", "level": 82, "years_exp": 1, "icon": "Code", "color": "text-purple-400", "projects": 6},
        {"id": "tensorflow", "name": "TensorFlow", "level": 75, "years_exp": 2, "icon": "Code", "color": "text-orange-500", "projects": 4}
    ],
    
    "certifications": [
        {
            "id": "cka",
            "organization": "Cloud Native Computing Foundation",
            "status": "In Progress",
            "year": None,
            "credential_id": None,
            "expiry_date": None,
            "skills": ["Kubernetes", "Container Orchestration", "Cloud Native"],
            "certificate_url": None
        }
    ],
    
    "education": [
        {
            "id": "cuet",
            "institution": "Chittagong University of Engineering & Technology",
            "duration": "Mar 2013 - Sep 2017",
            "gpa": None,
            "relevant_courses": ["Engineering Mathematics", "Thermodynamics", "System Design"],
            "activities": ["Engineering Club", "Tech Competition Winner"]
        }
    ],
    
    "recommendations": [
        {
            "id": "rec-1",
            "recommender_name": "Sunny Parekh",
            "recommender_title": "Director of Information Security, Technology and Compliance",
            "recommender_company": "BriteCore Inc",
            "recommender_image": None,
            "relationship": "Worked directly with Alamin",
            "date": "2024-11-15",
            "skills_mentioned": ["DevOps", "Kubernetes", "Cost Optimization", "CI/CD", "Infrastructure"]
        },
        {
            "id": "rec-2", 
            "recommender_name": "Omar Faruque Tuhin",
            "recommender_title": "Leading Teams to Build Robust Solutions in Kubernetes & Node.js",
            "recommender_company": "Senior Software Engineer",
            "recommender_image": None,
            "relationship": "Mentored Alamin",
            "date": "2024-10-20",
            "skills_mentioned": ["Django", "REST Framework", "Problem Solving", "Technical Prowess"]
        },
        {
            "id": "rec-3",
            "recommender_name": "Ilias Kanchan", 
            "recommender_title": "Kubernetes | CKA | AWS | Linux | RHCE | Ansible | Docker",
            "recommender_company": "Cloud Engineering",
            "recommender_image": None,
            "relationship": "Worked with Alamin",
            "date": "2024-09-15",
            "skills_mentioned": ["Multi-project Management", "Productivity", "Leadership"]
        },
        {
            "id": "rec-4",
            "recommender_name": "Fazle Rabby",
            "recommender_title": "Engineering Manager @ Wolt | DoorDash", 
            "recommender_company": "Wolt",
            "recommender_image": None,
            "relationship": "Worked with Alamin on several services",
            "date": "2024-08-10",
            "skills_mentioned": ["Problem Solving", "Quick Learning", "Service Architecture"]
        },
        {
            "id": "rec-5",
            "recommender_name": "Ariful Islam",
            "recommender_title": "Software Engineering | Android | Kotlin | Flutter | Node.Js | MongoDB",
            "recommender_company": "Software Engineering",
            "recommender_image": None,
            "relationship": "Knows Alamin professionally",
            "date": "2024-07-05",
            "skills_mentioned": ["Career Transformation", "Community Leadership", "Vision"]
        },
        {
            "id": "rec-6",
            "recommender_name": "Al Amin Ibne Mosaddeque Chayan",
            "recommender_title": "Principal Software Engineer | Certified Laravel Developer, Zend Certified Engineer",
            "recommender_company": "Software Engineering",
            "recommender_image": None,
            "relationship": "Worked with Alamin",
            "date": "2024-06-20",
            "skills_mentioned": ["Multi-skilled", "Strategic Thinking", "Problem Solving"]
        }
    ]
}

async def clear_existing_data():
    """Clear existing data from all tables"""
    logger.info("Clearing existing data...")
    
    async with AsyncSessionLocal() as session:
        # Order matters due to foreign key constraints
        tables = [
            'ui_translations', 'content_translations', 'contact_messages', 
            'page_views', 'achievements', 'skills', 'tech_skills', 'certifications', 
            'education', 'projects', 'experiences', 'contact_info', 'recommendations',
            'about', 'hero', 'languages', 'translations', 'translation_keys', 'translation_values'
        ]
        
        for table in tables:
            try:
                await session.execute(text(f"DELETE FROM {table}"))
                await session.commit()
                logger.info(f"Cleared {table} table")
            except Exception as e:
                logger.warning(f"Could not clear {table}: {e}")
                await session.rollback()

async def seed_languages():
    """Seed languages data"""
    logger.info("Seeding languages...")
    
    async with AsyncSessionLocal() as session:
        for lang in SEED_DATA["languages"]:
            insert_sql = """
                INSERT INTO languages (code, name, native_name, enabled)
                VALUES (:code, :name, :native_name, :enabled)
                ON CONFLICT (code) DO UPDATE SET
                    name = EXCLUDED.name,
                    native_name = EXCLUDED.native_name,
                    enabled = EXCLUDED.enabled,
                    updated_at = CURRENT_TIMESTAMP
            """
            await session.execute(text(insert_sql), lang)
        
        await session.commit()
        logger.info(f"Seeded {len(SEED_DATA['languages'])} languages")

async def seed_hero():
    """Seed hero data"""
    logger.info("Seeding hero data...")
    
    async with AsyncSessionLocal() as session:
        hero = SEED_DATA["hero"]
        insert_sql = """
            INSERT INTO hero (id, name, metrics)
            VALUES (:id, :name, :metrics)
            ON CONFLICT (id) DO UPDATE SET
                name = EXCLUDED.name,
                metrics = EXCLUDED.metrics,
                updated_at = CURRENT_TIMESTAMP
        """
        await session.execute(text(insert_sql), {
            "id": hero["id"],
            "name": hero["name"],
            "metrics": json.dumps(hero["metrics"])
        })
        
        await session.commit()
        logger.info("Seeded hero data")

async def seed_about():
    """Seed about data"""
    logger.info("Seeding about data...")
    
    async with AsyncSessionLocal() as session:
        about = SEED_DATA["about"]
        insert_sql = """
            INSERT INTO about (id, skills)
            VALUES (:id, :skills)
            ON CONFLICT (id) DO UPDATE SET
                skills = EXCLUDED.skills,
                updated_at = CURRENT_TIMESTAMP
        """
        await session.execute(text(insert_sql), {
            "id": about["id"],
            "skills": about["skills"]
        })
        
        await session.commit()
        logger.info("Seeded about data")

async def seed_contact_info():
    """Seed contact info data"""
    logger.info("Seeding contact info...")
    
    async with AsyncSessionLocal() as session:
        contact = SEED_DATA["contact_info"]
        insert_sql = """
            INSERT INTO contact_info (id, email, phone, social_links)
            VALUES (:id, :email, :phone, :social_links)
            ON CONFLICT (id) DO UPDATE SET
                email = EXCLUDED.email,
                phone = EXCLUDED.phone,
                social_links = EXCLUDED.social_links,
                updated_at = CURRENT_TIMESTAMP
        """
        await session.execute(text(insert_sql), {
            "id": contact["id"],
            "email": contact["email"],
            "phone": contact["phone"],
            "social_links": json.dumps(contact["social_links"])
        })
        
        await session.commit()
        logger.info("Seeded contact info")

async def seed_experiences():
    """Seed experiences data"""
    logger.info("Seeding experiences...")
    
    async with AsyncSessionLocal() as session:
        for exp in SEED_DATA["experiences"]:
            insert_sql = """
                INSERT INTO experiences (id, company, duration, current, technologies, website)
                VALUES (:id, :company, :duration, :current, :technologies, :website)
                ON CONFLICT (id) DO UPDATE SET
                    company = EXCLUDED.company,
                    duration = EXCLUDED.duration,
                    current = EXCLUDED.current,
                    technologies = EXCLUDED.technologies,
                    website = EXCLUDED.website,
                    updated_at = CURRENT_TIMESTAMP
            """
            await session.execute(text(insert_sql), exp)
        
        await session.commit()
        logger.info(f"Seeded {len(SEED_DATA['experiences'])} experiences")

async def seed_projects():
    """Seed projects data"""
    logger.info("Seeding projects...")
    
    async with AsyncSessionLocal() as session:
        for project in SEED_DATA["projects"]:
            insert_sql = """
                INSERT INTO projects 
                (id, technologies, github_url, live_url, demo_url, featured, 
                 impact, stats, status, ai_powered)
                VALUES (:id, :technologies, :github_url, :live_url, :demo_url, :featured,
                        :impact, :stats, :status, :ai_powered)
                ON CONFLICT (id) DO UPDATE SET
                    technologies = EXCLUDED.technologies,
                    github_url = EXCLUDED.github_url,
                    live_url = EXCLUDED.live_url,
                    demo_url = EXCLUDED.demo_url,
                    featured = EXCLUDED.featured,
                    impact = EXCLUDED.impact,
                    stats = EXCLUDED.stats,
                    status = EXCLUDED.status,
                    ai_powered = EXCLUDED.ai_powered,
                    updated_at = CURRENT_TIMESTAMP
            """
            
            project_data = {
                **project,
                "impact": json.dumps(project.get("impact", {})),
                "stats": json.dumps(project.get("stats", {}))
            }
            
            await session.execute(text(insert_sql), project_data)
        
        await session.commit()
        logger.info(f"Seeded {len(SEED_DATA['projects'])} projects")

async def seed_achievements():
    """Seed achievements data"""
    logger.info("Seeding achievements...")
    
    async with AsyncSessionLocal() as session:
        for achievement in SEED_DATA["achievements"]:
            insert_sql = """
                INSERT INTO achievements (id, value, icon, color, percentage, category)
                VALUES (:id, :value, :icon, :color, :percentage, :category)
                ON CONFLICT (id) DO UPDATE SET
                    value = EXCLUDED.value,
                    icon = EXCLUDED.icon,
                    color = EXCLUDED.color,
                    percentage = EXCLUDED.percentage,
                    category = EXCLUDED.category,
                    updated_at = CURRENT_TIMESTAMP
            """
            await session.execute(text(insert_sql), achievement)
        
        await session.commit()
        logger.info(f"Seeded {len(SEED_DATA['achievements'])} achievements")

async def seed_skills():
    """Seed skills data"""
    logger.info("Seeding skills...")
    
    async with AsyncSessionLocal() as session:
        for skill in SEED_DATA["skills"]:
            insert_sql = """
                INSERT INTO skills (id, name, category, proficiency, years_experience, icon, color)
                VALUES (:id, :name, :category, :proficiency, :years_experience, :icon, :color)
                ON CONFLICT (id) DO UPDATE SET
                    name = EXCLUDED.name,
                    category = EXCLUDED.category,
                    proficiency = EXCLUDED.proficiency,
                    years_experience = EXCLUDED.years_experience,
                    icon = EXCLUDED.icon,
                    color = EXCLUDED.color,
                    updated_at = now()
            """
            await session.execute(text(insert_sql), skill)
        
        await session.commit()
        logger.info(f"Seeded {len(SEED_DATA['skills'])} skills")

async def seed_tech_skills():
    """Seed tech skills data"""
    logger.info("Seeding tech skills...")
    
    async with AsyncSessionLocal() as session:
        for skill in SEED_DATA["tech_skills"]:
            insert_sql = """
                INSERT INTO tech_skills (id, name, level, years_exp, icon, color, projects)
                VALUES (:id, :name, :level, :years_exp, :icon, :color, :projects)
                ON CONFLICT (id) DO UPDATE SET
                    name = EXCLUDED.name,
                    level = EXCLUDED.level,
                    years_exp = EXCLUDED.years_exp,
                    icon = EXCLUDED.icon,
                    color = EXCLUDED.color,
                    projects = EXCLUDED.projects,
                    updated_at = CURRENT_TIMESTAMP
            """
            await session.execute(text(insert_sql), skill)
        
        await session.commit()
        logger.info(f"Seeded {len(SEED_DATA['tech_skills'])} tech skills")

async def seed_certifications():
    """Seed certifications data"""
    logger.info("Seeding certifications...")
    
    async with AsyncSessionLocal() as session:
        for cert in SEED_DATA["certifications"]:
            insert_sql = """
                INSERT INTO certifications 
                (id, organization, status, year, credential_id, expiry_date, skills, certificate_url)
                VALUES (:id, :organization, :status, :year, :credential_id, :expiry_date, :skills, :certificate_url)
                ON CONFLICT (id) DO UPDATE SET
                    organization = EXCLUDED.organization,
                    status = EXCLUDED.status,
                    year = EXCLUDED.year,
                    credential_id = EXCLUDED.credential_id,
                    expiry_date = EXCLUDED.expiry_date,
                    skills = EXCLUDED.skills,
                    certificate_url = EXCLUDED.certificate_url,
                    updated_at = CURRENT_TIMESTAMP
            """
            await session.execute(text(insert_sql), cert)
        
        await session.commit()
        logger.info(f"Seeded {len(SEED_DATA['certifications'])} certifications")

async def seed_education():
    """Seed education data"""
    logger.info("Seeding education...")
    
    async with AsyncSessionLocal() as session:
        for edu in SEED_DATA["education"]:
            insert_sql = """
                INSERT INTO education 
                (id, institution, duration, gpa, relevant_courses, activities)
                VALUES (:id, :institution, :duration, :gpa, :relevant_courses, :activities)
                ON CONFLICT (id) DO UPDATE SET
                    institution = EXCLUDED.institution,
                    duration = EXCLUDED.duration,
                    gpa = EXCLUDED.gpa,
                    relevant_courses = EXCLUDED.relevant_courses,
                    activities = EXCLUDED.activities,
                    updated_at = CURRENT_TIMESTAMP
            """
            await session.execute(text(insert_sql), edu)
        
        await session.commit()
        logger.info(f"Seeded {len(SEED_DATA['education'])} education records")

async def seed_recommendations():
    """Seed recommendations data"""
    logger.info("Seeding recommendations...")
    
    async with AsyncSessionLocal() as session:
        for rec in SEED_DATA["recommendations"]:
            insert_sql = """
                INSERT INTO recommendations 
                (id, recommender_name, recommender_title, recommender_company, 
                 recommender_image, relationship, date, skills_mentioned)
                VALUES (:id, :recommender_name, :recommender_title, :recommender_company,
                        :recommender_image, :relationship, :date, :skills_mentioned)
                ON CONFLICT (id) DO UPDATE SET
                    recommender_name = EXCLUDED.recommender_name,
                    recommender_title = EXCLUDED.recommender_title,
                    recommender_company = EXCLUDED.recommender_company,
                    recommender_image = EXCLUDED.recommender_image,
                    relationship = EXCLUDED.relationship,
                    date = EXCLUDED.date,
                    skills_mentioned = EXCLUDED.skills_mentioned,
                    updated_at = CURRENT_TIMESTAMP
            """
            
            # Handle date conversion
            rec_data = dict(rec)
            if rec_data.get("date"):
                rec_data["date"] = datetime.strptime(rec["date"], "%Y-%m-%d").date()
            
            await session.execute(text(insert_sql), rec_data)
        
        await session.commit()
        logger.info(f"Seeded {len(SEED_DATA['recommendations'])} recommendations")

async def seed_ui_translations():
    """Seed UI translations based on frontend data"""
    logger.info("Seeding UI translations...")
    
    ui_translations = {
        "en": {
            "hero.greeting": "Hi, I'm",
            "hero.iam": "I am a",
            "hero.viewProjects": "View Projects",
            "hero.contactMe": "Contact Me",
            "hero.yearsExperience": "Years Experience",
            "hero.costSavings": "Cost Savings",
            "hero.saasArr": "SaaS ARR",
            "hero.usersServed": "Users Served",
            "hero.uptimeSla": "Uptime SLA",
            "hero.totalImpact": "Total Impact",
            "nav.home": "Home",
            "nav.about": "About",
            "nav.experience": "Experience", 
            "nav.projects": "Projects",
            "nav.goals": "Goals",
            "nav.podcast": "Podcast",
            "nav.contact": "Contact",
            "about.title": "About Me",
            "about.intro": "Strategic technology leader with over a decade of experience in building scalable cloud platforms and leading DevOps teams.",
            "about.journey": "Professional Journey",
            "about.values": "Core Values",
            "about.technical": "Technical Leadership",
            "about.innovation": "Innovation & Growth",
            "about.community": "Community Impact",
            "experience.title": "Experience",
            "experience.current": "Current",
            "experience.viewMore": "View More",
            "projects.title": "Featured Projects",
            "projects.viewDemo": "View Demo",
            "projects.viewCode": "View Code",
            "projects.technologies": "Technologies",
            "goals.title": "Goals & Mission",
            "contact.title": "Get In Touch",
            "contact.email": "Email",
            "contact.linkedin": "LinkedIn",
            "contact.github": "GitHub",
            "contact.sendMessage": "Send Message",
            "contact.yourName": "Your Name",
            "contact.yourEmail": "Your Email",
            "contact.yourMessage": "Your Message",
            "contact.sending": "Sending...",
            "contact.success": "Message sent successfully!",
            "contact.error": "Failed to send message. Please try again.",
            "techstack.title": "Tech Stack",
            "techstack.cloud": "Cloud & Infrastructure",
            "techstack.backend": "Backend Development",
            "techstack.frontend": "Frontend Development",
            "techstack.devops": "DevOps & Automation",
            "techstack.monitoring": "Monitoring & Observability",
            "techstack.ai": "AI & Machine Learning",
            "achievements.title": "Achievements",
            "achievements.certifications": "Certifications",
            "achievements.awards": "Awards & Recognition",
            "common.loading": "Loading...",
            "common.error": "Error",
            "common.retry": "Retry",
            "common.viewAll": "View All",
            "common.close": "Close",
            "common.open": "Open",
            "common.language": "Language",
            "common.english": "English",
            "common.bengali": "বাংলা",
            "common.learnMore": "Learn More",
            "common.present": "Present",
            "common.remote": "Remote"
        },
        "bn": {
            "hero.greeting": "হ্যালো, আমি",
            "hero.iam": "আমি একজন",
            "hero.viewProjects": "প্রকল্প দেখুন",
            "hero.contactMe": "যোগাযোগ করুন",
            "hero.yearsExperience": "বছরের অভিজ্ঞতা",
            "hero.costSavings": "খরচ সাশ্রয়",
            "hero.saasArr": "SaaS ARR",
            "hero.usersServed": "ব্যবহারকারী পরিষেবা",
            "hero.uptimeSla": "আপটাইম SLA", 
            "hero.totalImpact": "মোট প্রভাব",
            "nav.home": "হোম",
            "nav.about": "সম্পর্কে",
            "nav.experience": "অভিজ্ঞতা",
            "nav.projects": "প্রকল্প",
            "nav.goals": "লক্ষ্য",
            "nav.podcast": "পডকাস্ট",
            "nav.contact": "যোগাযোগ",
            "about.title": "আমার সম্পর্কে",
            "about.intro": "একটি দশকেরও বেশি অভিজ্ঞতার সাথে কৌশলগত প্রযুক্তি নেতা।",
            "experience.title": "অভিজ্ঞতা",
            "experience.current": "বর্তমান",
            "experience.viewMore": "আরো দেখুন",
            "projects.title": "বৈশিষ্ট্যযুক্ত প্রকল্প",
            "projects.viewDemo": "ডেমো দেখুন",
            "projects.viewCode": "কোড দেখুন",
            "projects.technologies": "প্রযুক্তি",
            "goals.title": "লক্ষ্য ও মিশন",
            "contact.title": "যোগাযোগ করুন",
            "contact.email": "ইমেইল",
            "contact.linkedin": "লিংকডইন",
            "contact.github": "গিটহাব",
            "contact.sendMessage": "বার্তা পাঠান",
            "contact.yourName": "আপনার নাম",
            "contact.yourEmail": "আপনার ইমেইল",
            "contact.yourMessage": "আপনার বার্তা",
            "contact.sending": "পাঠানো হচ্ছে...",
            "contact.success": "বার্তা সফলভাবে পাঠানো হয়েছে!",
            "contact.error": "বার্তা পাঠাতে ব্যর্থ। আবার চেষ্টা করুন।",
            "techstack.title": "প্রযুক্তি স্ট্যাক",
            "techstack.cloud": "ক্লাউড ও অবকাঠামো",
            "techstack.backend": "ব্যাকএন্ড ডেভেলপমেন্ট",
            "techstack.frontend": "ফ্রন্টএন্ড ডেভেলপমেন্ট",
            "techstack.devops": "ডেভঅপস ও অটোমেশন",
            "techstack.monitoring": "মনিটরিং ও অবজারভেবিলিটি",
            "techstack.ai": "এআই ও মেশিন লার্নিং",
            "achievements.title": "অর্জন",
            "achievements.certifications": "সার্টিফিকেশন",
            "achievements.awards": "পুরস্কার ও স্বীকৃতি",
            "common.loading": "লোড হচ্ছে...",
            "common.error": "ত্রুটি",
            "common.retry": "পুনরায় চেষ্টা করুন",
            "common.viewAll": "সব দেখুন",
            "common.close": "বন্ধ",
            "common.open": "খুলুন",
            "common.language": "ভাষা",
            "common.english": "English",
            "common.bengali": "বাংলা",
            "common.learnMore": "আরও জানুন",
            "common.present": "বর্তমান",
            "common.remote": "দূরবর্তী"
        }
    }
    
    async with AsyncSessionLocal() as session:
        for lang_code, translations in ui_translations.items():
            for key, value in translations.items():
                insert_sql = """
                    INSERT INTO ui_translations (key, language_code, value)
                    VALUES (:key, :language_code, :value)
                    ON CONFLICT (key, language_code) DO UPDATE SET
                        value = EXCLUDED.value,
                        updated_at = now()
                """
                await session.execute(text(insert_sql), {
                    "key": key,
                    "language_code": lang_code,
                    "value": value
                })
        
        await session.commit()
        logger.info("Seeded UI translations")

async def main():
    """Main seeding function"""
    logger.info("Starting updated comprehensive database seeding...")
    
    try:
        # Optional: Clear existing data (uncomment if needed)
        # await clear_existing_data()
        
        # Seed data in correct order (respecting foreign key constraints)
        await seed_languages()
        await seed_hero()
        await seed_about()
        await seed_contact_info()
        await seed_experiences()
        await seed_projects()
        await seed_achievements()
        await seed_skills()
        await seed_tech_skills()
        await seed_certifications()
        await seed_education()
        await seed_recommendations()
        await seed_ui_translations()
        
        logger.info("✅ Updated comprehensive database seeding completed successfully!")
        
        # Summary
        logger.info("Seeded data summary:")
        logger.info(f"- Languages: {len(SEED_DATA['languages'])}")
        logger.info(f"- Experiences: {len(SEED_DATA['experiences'])}")
        logger.info(f"- Projects: {len(SEED_DATA['projects'])}")
        logger.info(f"- Achievements: {len(SEED_DATA['achievements'])}")
        logger.info(f"- Skills: {len(SEED_DATA['skills'])}")
        logger.info(f"- Tech Skills: {len(SEED_DATA['tech_skills'])}")
        logger.info(f"- Certifications: {len(SEED_DATA['certifications'])}")
        logger.info(f"- Education: {len(SEED_DATA['education'])}")
        logger.info(f"- Recommendations: {len(SEED_DATA['recommendations'])}")
        
    except Exception as e:
        logger.error(f"❌ Error during seeding: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
    
    finally:
        # Close engine
        await engine.dispose()

if __name__ == "__main__":
    asyncio.run(main())