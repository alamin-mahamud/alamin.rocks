#!/usr/bin/env python3
"""
Database seed script for Alamin Rocks Portfolio
Populates the database with static data extracted from frontend components
"""

import asyncio
import json
import os
import sys
from datetime import datetime
from typing import List, Dict, Any

import asyncpg
from pydantic import ValidationError

# Add the app directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.core.config import settings
from app.models.portfolio import (
    Project, TechSkill, Achievement, LinkedInRecommendation,
    Hero, About, ContactInfo, ProjectStatus, ProjectCategory
)
from app.models.resume import (
    Resume, ContactInfo as ResumeContact, Experience, 
    Education, Award, Certification, SkillCategory, CommunityEngagement
)


class DatabaseSeeder:
    def __init__(self):
        self.connection = None
        
    async def connect(self):
        """Connect to the PostgreSQL database"""
        try:
            # Use the database_url from settings
            self.connection = await asyncpg.connect(settings.database_url)
            print(f"Connected to database using: {settings.database_url}")
        except Exception as e:
            print(f"Failed to connect to database: {e}")
            print("Make sure PostgreSQL is running and database_url is correct in settings")
            raise
            
    async def disconnect(self):
        """Disconnect from the database"""
        if self.connection:
            await self.connection.close()
            print("Disconnected from database")
            
    async def create_tables(self):
        """Create database tables if they don't exist"""
        queries = [
            """
            CREATE TABLE IF NOT EXISTS hero (
                id VARCHAR PRIMARY KEY,
                roles TEXT[],
                name VARCHAR,
                description TEXT,
                metrics JSONB,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """,
            """
            CREATE TABLE IF NOT EXISTS about (
                id VARCHAR PRIMARY KEY,
                title VARCHAR,
                description TEXT[],
                skills TEXT[],
                quick_facts JSONB,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """,
            """
            CREATE TABLE IF NOT EXISTS contact_info (
                id VARCHAR PRIMARY KEY,
                email VARCHAR,
                phone VARCHAR,
                location VARCHAR,
                social_links JSONB,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """,
            """
            CREATE TABLE IF NOT EXISTS projects (
                id VARCHAR PRIMARY KEY,
                title VARCHAR NOT NULL,
                description TEXT NOT NULL,
                long_description TEXT,
                technologies TEXT[],
                github_url VARCHAR,
                live_url VARCHAR,
                demo_url VARCHAR,
                image_url VARCHAR,
                featured BOOLEAN DEFAULT FALSE,
                category VARCHAR NOT NULL,
                impact JSONB DEFAULT '{}',
                stats JSONB DEFAULT '{}',
                status VARCHAR DEFAULT 'completed',
                ai_powered BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """,
            """
            CREATE TABLE IF NOT EXISTS tech_skills (
                id VARCHAR PRIMARY KEY,
                name VARCHAR NOT NULL,
                category VARCHAR NOT NULL,
                level INTEGER CHECK (level >= 0 AND level <= 100),
                years_exp INTEGER,
                icon VARCHAR,
                color VARCHAR,
                projects INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """,
            """
            CREATE TABLE IF NOT EXISTS achievements (
                id VARCHAR PRIMARY KEY,
                title VARCHAR NOT NULL,
                value VARCHAR NOT NULL,
                description TEXT,
                icon VARCHAR,
                color VARCHAR,
                percentage INTEGER DEFAULT 0,
                details TEXT[],
                category VARCHAR,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """,
            """
            CREATE TABLE IF NOT EXISTS recommendations (
                id VARCHAR PRIMARY KEY,
                recommender_name VARCHAR NOT NULL,
                recommender_title VARCHAR,
                recommender_company VARCHAR,
                recommender_image VARCHAR,
                relationship VARCHAR,
                content TEXT NOT NULL,
                date TIMESTAMP,
                skills_mentioned TEXT[],
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """,
            """
            CREATE TABLE IF NOT EXISTS experiences (
                id VARCHAR PRIMARY KEY,
                company VARCHAR NOT NULL,
                role VARCHAR NOT NULL,
                duration VARCHAR NOT NULL,
                location VARCHAR,
                current BOOLEAN DEFAULT FALSE,
                achievements TEXT[],
                technologies TEXT[],
                website VARCHAR,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """,
            """
            CREATE TABLE IF NOT EXISTS education (
                id VARCHAR PRIMARY KEY,
                institution VARCHAR NOT NULL,
                degree VARCHAR NOT NULL,
                field VARCHAR,
                location VARCHAR,
                duration VARCHAR,
                gpa FLOAT,
                achievements TEXT[],
                relevant_courses TEXT[],
                activities TEXT[],
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """,
            """
            CREATE TABLE IF NOT EXISTS certifications (
                id VARCHAR PRIMARY KEY,
                name VARCHAR NOT NULL,
                organization VARCHAR NOT NULL,
                status VARCHAR,
                year VARCHAR,
                credential_id VARCHAR,
                expiry_date VARCHAR,
                description TEXT,
                skills TEXT[],
                certificate_url VARCHAR,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """
        ]
        
        for query in queries:
            try:
                await self.connection.execute(query)
            except Exception as e:
                print(f"Error creating table: {e}")
                
        print("Database tables created/verified")
        
    async def clear_existing_data(self):
        """Clear existing data from all tables"""
        tables = [
            'hero', 'about', 'contact_info', 'projects', 'tech_skills',
            'achievements', 'recommendations', 'experiences', 'education', 
            'certifications'
        ]
        
        for table in tables:
            try:
                await self.connection.execute(f"TRUNCATE TABLE {table} CASCADE")
            except Exception as e:
                print(f"Error clearing table {table}: {e}")
                
        print("Cleared existing data from all tables")
        
    def get_seed_data(self) -> Dict[str, Any]:
        """Get all seed data for the portfolio"""
        now = datetime.utcnow()
        
        return {
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
                "updated_at": now
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
                "updated_at": now
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
                "updated_at": now
            },
            
            "projects": self._get_projects_data(now),
            "tech_skills": self._get_tech_skills_data(now),
            "achievements": self._get_achievements_data(now),
            "recommendations": self._get_recommendations_data(now),
            "experiences": self._get_experiences_data(now),
            "education": self._get_education_data(now),
            "certifications": self._get_certifications_data(now)
        }
        
    def _get_projects_data(self, now) -> List[Dict]:
        """Get projects data"""
        return [
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
                "created_at": now,
                "updated_at": now
            },
            {
                "id": "2",
                "title": "Cloud Infrastructure Optimization Platform",
                "description": "Reduced AWS costs by $1M+ annually through intelligent resource optimization and automated cost management.",
                "long_description": "Enterprise-scale cloud cost optimization platform that analyzes resource utilization patterns, implements automated rightsizing, and provides real-time cost monitoring. Achieved significant cost reduction while maintaining 99.99% uptime.",
                "technologies": ["Python", "AWS", "Terraform", "CloudWatch", "Lambda", "EventBridge", "PostgreSQL", "React"],
                "github_url": "https://github.com/alamin-mahamud/cloud-optimizer",
                "live_url": None,
                "demo_url": None,
                "featured": True,
                "category": "DevOps/SRE",
                "impact": {
                    "users": 1000,
                    "performance": "99.99% uptime maintained",
                    "savings": "$1M+ annual cost reduction"
                },
                "stats": {
                    "stars": 156,
                    "forks": 32,
                    "commits": 890,
                    "contributors": 5
                },
                "status": "completed",
                "ai_powered": False,
                "created_at": now,
                "updated_at": now
            },
            {
                "id": "3",
                "title": "Kubernetes Multi-Cluster Management Platform",
                "description": "Orchestrating 50+ Kubernetes clusters across multiple regions with automated deployment and monitoring.",
                "long_description": "Comprehensive Kubernetes management platform enabling centralized control of multi-cluster deployments, automated rollouts, policy enforcement, and unified observability across hybrid cloud environments.",
                "technologies": ["Go", "Kubernetes", "Helm", "ArgoCD", "Prometheus", "Grafana", "Istio", "Terraform"],
                "github_url": "https://github.com/alamin-mahamud/k8s-multicluster",
                "live_url": None,
                "demo_url": "https://demo.k8s-platform.alamin.rocks",
                "featured": True,
                "category": "DevOps/SRE",
                "impact": {
                    "users": 500,
                    "performance": "50+ clusters managed",
                    "reliability": "Zero-downtime deployments"
                },
                "stats": {
                    "stars": 234,
                    "forks": 45,
                    "commits": 1560,
                    "contributors": 12
                },
                "status": "maintained",
                "ai_powered": False,
                "created_at": now,
                "updated_at": now
            },
            {
                "id": "4",
                "title": "Observability & Monitoring Stack",
                "description": "Built comprehensive monitoring solution processing 10TB+ logs daily with real-time alerting.",
                "long_description": "Enterprise observability platform combining metrics, logs, and traces with intelligent alerting. Processes massive data volumes while providing actionable insights and reducing MTTR by 60%.",
                "technologies": ["Prometheus", "Grafana", "Loki", "Elasticsearch", "Kafka", "Python", "Go", "Docker"],
                "github_url": "https://github.com/alamin-mahamud/observability-stack",
                "live_url": None,
                "demo_url": None,
                "featured": False,
                "category": "DevOps/SRE",
                "impact": {
                    "users": 2000,
                    "performance": "10TB+ daily log processing",
                    "reliability": "60% MTTR reduction"
                },
                "stats": {
                    "stars": 89,
                    "forks": 18,
                    "commits": 670,
                    "contributors": 6
                },
                "status": "completed",
                "ai_powered": False,
                "created_at": now,
                "updated_at": now
            },
            {
                "id": "5",
                "title": "GitOps CI/CD Pipeline Framework",
                "description": "Automated deployment pipeline reducing release cycle time by 75% with built-in security scanning.",
                "long_description": "Modern GitOps-based CI/CD framework implementing progressive deployments, automated testing, security scanning, and rollback capabilities. Supports multi-environment deployments with approval workflows.",
                "technologies": ["GitHub Actions", "ArgoCD", "Terraform", "Docker", "Kubernetes", "Python", "Bash", "Helm"],
                "github_url": "https://github.com/alamin-mahamud/gitops-pipeline",
                "live_url": None,
                "demo_url": None,
                "featured": False,
                "category": "DevOps/SRE",
                "impact": {
                    "users": 300,
                    "performance": "75% faster deployments",
                    "reliability": "Automated rollback capability"
                },
                "stats": {
                    "stars": 145,
                    "forks": 28,
                    "commits": 450,
                    "contributors": 8
                },
                "status": "maintained",
                "ai_powered": False,
                "created_at": now,
                "updated_at": now
            },
            {
                "id": "6",
                "title": "Source Code Podcast Platform",
                "description": "Building a platform for technology discussions reaching 1000+ developers monthly.",
                "long_description": "Comprehensive podcast platform featuring automated transcription, searchable content, interactive show notes, and community engagement features. Growing developer audience with high-quality technical content.",
                "technologies": ["Next.js", "TypeScript", "PostgreSQL", "Redis", "AWS S3", "CloudFront", "Docker", "Node.js"],
                "github_url": "https://github.com/alamin-mahamud/sourcecode-podcast",
                "live_url": "https://sourcecode.alamin.rocks",
                "demo_url": None,
                "featured": True,
                "category": "Social Impact",
                "impact": {
                    "users": 1000,
                    "performance": "Monthly active listeners",
                    "community": "Growing developer community"
                },
                "stats": {
                    "stars": 67,
                    "forks": 12,
                    "commits": 230,
                    "contributors": 3
                },
                "status": "in-progress",
                "ai_powered": True,
                "created_at": now,
                "updated_at": now
            },
            {
                "id": "7",
                "title": "Infrastructure as Code Templates",
                "description": "Open-source IaC templates used by 500+ organizations for AWS/GCP deployments.",
                "long_description": "Comprehensive collection of production-ready Infrastructure as Code templates covering common architectural patterns, security best practices, and cost optimization strategies for multi-cloud deployments.",
                "technologies": ["Terraform", "CloudFormation", "Ansible", "Python", "Bash", "AWS", "GCP", "Azure"],
                "github_url": "https://github.com/alamin-mahamud/iac-templates",
                "live_url": None,
                "demo_url": None,
                "featured": False,
                "category": "Infrastructure",
                "impact": {
                    "users": 500,
                    "performance": "Organizations using templates",
                    "savings": "Reduced deployment time by 80%"
                },
                "stats": {
                    "stars": 456,
                    "forks": 123,
                    "commits": 890,
                    "contributors": 24
                },
                "status": "maintained",
                "ai_powered": False,
                "created_at": now,
                "updated_at": now
            }
        ]
        
    def _get_tech_skills_data(self, now) -> List[Dict]:
        """Get tech skills data"""
        return [
            # Programming Languages
            {"id": "python", "name": "Python", "category": "programming", "level": 95, "years_exp": 8, "icon": "Code", "color": "text-yellow-400", "projects": 45, "created_at": now, "updated_at": now},
            {"id": "go", "name": "Go", "category": "programming", "level": 85, "years_exp": 4, "icon": "Code", "color": "text-blue-400", "projects": 12, "created_at": now, "updated_at": now},
            {"id": "typescript", "name": "TypeScript", "category": "programming", "level": 90, "years_exp": 6, "icon": "Code", "color": "text-blue-600", "projects": 35, "created_at": now, "updated_at": now},
            {"id": "javascript", "name": "JavaScript", "category": "programming", "level": 88, "years_exp": 7, "icon": "Code", "color": "text-yellow-300", "projects": 40, "created_at": now, "updated_at": now},
            
            # Web Frameworks
            {"id": "fastapi", "name": "FastAPI", "category": "programming", "level": 92, "years_exp": 4, "icon": "Code", "color": "text-green-500", "projects": 15, "created_at": now, "updated_at": now},
            {"id": "nestjs", "name": "Nest.JS", "category": "programming", "level": 88, "years_exp": 3, "icon": "Code", "color": "text-red-500", "projects": 8, "created_at": now, "updated_at": now},
            {"id": "nextjs", "name": "Next.JS", "category": "programming", "level": 85, "years_exp": 3, "icon": "Code", "color": "text-gray-700", "projects": 12, "created_at": now, "updated_at": now},
            {"id": "gin", "name": "Gin", "category": "programming", "level": 80, "years_exp": 2, "icon": "Code", "color": "text-blue-500", "projects": 6, "created_at": now, "updated_at": now},
            {"id": "flask", "name": "Flask", "category": "programming", "level": 85, "years_exp": 5, "icon": "Code", "color": "text-gray-600", "projects": 18, "created_at": now, "updated_at": now},
            {"id": "django", "name": "Django", "category": "programming", "level": 82, "years_exp": 4, "icon": "Code", "color": "text-green-600", "projects": 14, "created_at": now, "updated_at": now},
            
            # Cloud Platforms
            {"id": "aws", "name": "AWS", "category": "cloud", "level": 95, "years_exp": 7, "icon": "Cloud", "color": "text-orange-500", "projects": 50, "created_at": now, "updated_at": now},
            {"id": "gcp", "name": "GCP", "category": "cloud", "level": 80, "years_exp": 3, "icon": "Cloud", "color": "text-blue-500", "projects": 15, "created_at": now, "updated_at": now},
            {"id": "azure", "name": "Azure", "category": "cloud", "level": 88, "years_exp": 5, "icon": "Cloud", "color": "text-blue-600", "projects": 25, "created_at": now, "updated_at": now},
            
            # Container & Orchestration
            {"id": "docker", "name": "Docker", "category": "system", "level": 95, "years_exp": 8, "icon": "Server", "color": "text-blue-500", "projects": 60, "created_at": now, "updated_at": now},
            {"id": "kubernetes", "name": "Kubernetes", "category": "system", "level": 92, "years_exp": 6, "icon": "Server", "color": "text-blue-600", "projects": 35, "created_at": now, "updated_at": now},
            {"id": "ecs", "name": "ECS", "category": "cloud", "level": 85, "years_exp": 4, "icon": "Cloud", "color": "text-orange-400", "projects": 20, "created_at": now, "updated_at": now},
            {"id": "eks", "name": "EKS", "category": "cloud", "level": 88, "years_exp": 4, "icon": "Cloud", "color": "text-orange-500", "projects": 18, "created_at": now, "updated_at": now},
            
            # Infrastructure as Code  
            {"id": "terraform", "name": "Terraform", "category": "system", "level": 95, "years_exp": 6, "icon": "Server", "color": "text-purple-500", "projects": 40, "created_at": now, "updated_at": now},
            {"id": "ansible", "name": "Ansible", "category": "system", "level": 90, "years_exp": 5, "icon": "Server", "color": "text-red-600", "projects": 25, "created_at": now, "updated_at": now},
            {"id": "cloudformation", "name": "CloudFormation", "category": "cloud", "level": 80, "years_exp": 4, "icon": "Cloud", "color": "text-orange-400", "projects": 15, "created_at": now, "updated_at": now},
            
            # Databases & Caching
            {"id": "postgresql", "name": "PostgreSQL", "category": "database", "level": 92, "years_exp": 8, "icon": "Database", "color": "text-blue-700", "projects": 45, "created_at": now, "updated_at": now},
            {"id": "mysql", "name": "MySQL", "category": "database", "level": 85, "years_exp": 6, "icon": "Database", "color": "text-blue-600", "projects": 30, "created_at": now, "updated_at": now},
            {"id": "redis", "name": "Redis", "category": "database", "level": 88, "years_exp": 5, "icon": "Database", "color": "text-red-500", "projects": 28, "created_at": now, "updated_at": now},
            {"id": "elasticsearch", "name": "Elasticsearch", "category": "database", "level": 85, "years_exp": 4, "icon": "Database", "color": "text-yellow-600", "projects": 15, "created_at": now, "updated_at": now},
            
            # Monitoring & Observability
            {"id": "prometheus", "name": "Prometheus", "category": "monitoring", "level": 90, "years_exp": 5, "icon": "Activity", "color": "text-orange-600", "projects": 25, "created_at": now, "updated_at": now},
            {"id": "grafana", "name": "Grafana", "category": "monitoring", "level": 92, "years_exp": 5, "icon": "Activity", "color": "text-orange-500", "projects": 30, "created_at": now, "updated_at": now},
            {"id": "datadog", "name": "DataDog", "category": "monitoring", "level": 88, "years_exp": 4, "icon": "Activity", "color": "text-purple-600", "projects": 20, "created_at": now, "updated_at": now},
            {"id": "cloudwatch", "name": "CloudWatch", "category": "monitoring", "level": 85, "years_exp": 6, "icon": "Activity", "color": "text-orange-400", "projects": 35, "created_at": now, "updated_at": now},
            {"id": "loki", "name": "Loki", "category": "monitoring", "level": 80, "years_exp": 3, "icon": "Activity", "color": "text-orange-400", "projects": 12, "created_at": now, "updated_at": now},
            
            # CI/CD & DevOps
            {"id": "github-actions", "name": "GitHub Actions", "category": "system", "level": 95, "years_exp": 5, "icon": "Server", "color": "text-gray-700", "projects": 50, "created_at": now, "updated_at": now},
            {"id": "jenkins", "name": "Jenkins", "category": "system", "level": 82, "years_exp": 4, "icon": "Server", "color": "text-blue-600", "projects": 18, "created_at": now, "updated_at": now},
            {"id": "argocd", "name": "ArgoCD", "category": "system", "level": 85, "years_exp": 3, "icon": "Server", "color": "text-blue-500", "projects": 15, "created_at": now, "updated_at": now},
            {"id": "helm", "name": "Helm", "category": "system", "level": 88, "years_exp": 4, "icon": "Server", "color": "text-blue-600", "projects": 25, "created_at": now, "updated_at": now},
            
            # AI & ML
            {"id": "mcp-protocol", "name": "MCP Protocol", "category": "programming", "level": 90, "years_exp": 1, "icon": "Code", "color": "text-purple-500", "projects": 5, "created_at": now, "updated_at": now},
            {"id": "llm-integration", "name": "LLM Integration", "category": "programming", "level": 85, "years_exp": 1, "icon": "Code", "color": "text-purple-600", "projects": 8, "created_at": now, "updated_at": now},
            {"id": "ai-sdk", "name": "AI-SDK", "category": "programming", "level": 82, "years_exp": 1, "icon": "Code", "color": "text-purple-400", "projects": 6, "created_at": now, "updated_at": now},
            {"id": "tensorflow", "name": "TensorFlow", "category": "programming", "level": 75, "years_exp": 2, "icon": "Code", "color": "text-orange-500", "projects": 4, "created_at": now, "updated_at": now}
        ]
        
    def _get_achievements_data(self, now) -> List[Dict]:
        """Get achievements data"""
        return [
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
                "created_at": now,
                "updated_at": now
            },
            {
                "id": "saas-arr",
                "title": "SaaS Platform Growth",
                "value": "$20M+",
                "description": "Annual Recurring Revenue generated through platform improvements",
                "icon": "TrendingUp",
                "color": "text-success",
                "percentage": 100,
                "details": [
                    "Led platform engineering initiatives driving revenue growth",
                    "Improved system reliability to 99.99% uptime",
                    "Reduced customer churn through performance improvements",
                    "Enabled new feature deployment velocity"
                ],
                "category": "business",
                "created_at": now,
                "updated_at": now
            },
            {
                "id": "deployment-efficiency",
                "title": "Deployment Automation",
                "value": "90%",
                "description": "Reduction in deployment time through CI/CD automation",
                "icon": "Zap",
                "color": "text-warning",
                "percentage": 90,
                "details": [
                    "Implemented GitOps workflows with ArgoCD",
                    "Automated testing and security scanning pipelines",
                    "Zero-downtime deployment strategies",
                    "Self-service deployment capabilities for developers"
                ],
                "category": "technical",
                "created_at": now,
                "updated_at": now
            },
            {
                "id": "team-leadership",
                "title": "Team Leadership",
                "value": "50+",
                "description": "Engineers mentored and led across multiple organizations",
                "icon": "Users",
                "color": "text-info",
                "percentage": 100,
                "details": [
                    "Built and scaled DevOps teams from 3 to 15 engineers",
                    "Implemented engineering best practices and culture",
                    "Conducted technical interviews and onboarding",
                    "Fostered continuous learning environment"
                ],
                "category": "leadership",
                "created_at": now,
                "updated_at": now
            },
            {
                "id": "infrastructure-scale",
                "title": "Infrastructure Scale",
                "value": "10K+",
                "description": "Compute instances managed across multi-cloud environments",
                "icon": "Server",
                "color": "text-primary",
                "percentage": 100,
                "details": [
                    "Managed infrastructure across AWS, GCP, and Azure",
                    "Implemented auto-scaling for optimal resource utilization",
                    "Disaster recovery and multi-region failover",
                    "Infrastructure as Code for all deployments"
                ],
                "category": "technical",
                "created_at": now,
                "updated_at": now
            },
            {
                "id": "open-source",
                "title": "Open Source Impact",
                "value": "2K+",
                "description": "GitHub stars across open source projects",
                "icon": "GitBranch",
                "color": "text-secondary",
                "percentage": 100,
                "details": [
                    "Active contributor to major open source projects",
                    "Maintained popular DevOps tools and libraries",
                    "Speaker at technology conferences",
                    "Technical blog with 100K+ annual readers"
                ],
                "category": "community",
                "created_at": now,
                "updated_at": now
            }
        ]
        
    def _get_recommendations_data(self, now) -> List[Dict]:
        """Get recommendations data"""
        return [
            {
                "id": "rec-1",
                "recommender_name": "Sarah Johnson",
                "recommender_title": "Senior Engineering Manager",
                "recommender_company": "BriteCore Inc",
                "recommender_image": None,
                "relationship": "worked directly with",
                "content": "Alamin is an exceptional DevOps engineer who transformed our infrastructure at BriteCore. His expertise in cloud cost optimization saved us over $1M annually while maintaining 99.99% uptime. He has a unique ability to balance technical excellence with business impact, making him invaluable to any organization.",
                "date": datetime(2024, 11, 15),
                "skills_mentioned": ["DevOps", "Kubernetes", "Cost Optimization", "CI/CD", "Infrastructure"],
                "created_at": now,
                "updated_at": now
            },
            {
                "id": "rec-2",
                "recommender_name": "Michael Chen",
                "recommender_title": "VP of Engineering",
                "recommender_company": "LeadSync.ai",
                "recommender_image": None,
                "relationship": "managed",
                "content": "Alamin joined our team to lead the MCP integration project and exceeded all expectations. His deep understanding of AI/ML infrastructure combined with practical DevOps expertise enabled us to ship 40% faster. He's a rare engineer who can architect at scale while diving deep into implementation details.",
                "date": datetime(2025, 7, 20),
                "skills_mentioned": ["AI/ML", "Platform Engineering", "Leadership", "Architecture", "LLM Integration"],
                "created_at": now,
                "updated_at": now
            },
            {
                "id": "rec-3",
                "recommender_name": "Emily Rodriguez",
                "recommender_title": "Director of Infrastructure",
                "recommender_company": "TechCorp Global",
                "recommender_image": None,
                "relationship": "worked together on",
                "content": "I had the pleasure of collaborating with Alamin on several large-scale infrastructure projects. His expertise in Kubernetes and cloud-native technologies is outstanding. What sets him apart is his ability to mentor others and build high-performing teams while delivering complex technical solutions.",
                "date": datetime(2024, 3, 10),
                "skills_mentioned": ["Kubernetes", "Team Building", "Mentorship", "Cloud Native", "Technical Leadership"],
                "created_at": now,
                "updated_at": now
            },
            {
                "id": "rec-4",
                "recommender_name": "Ahmed Rahman",
                "recommender_title": "CTO",
                "recommender_company": "Kahf Yazılım A.Ş.",
                "recommender_image": None,
                "relationship": "works with",
                "content": "Alamin has been instrumental in our infrastructure transformation at Kahf. His expertise in migrating from cloud to bare-metal while maintaining security and performance standards is remarkable. He brings a unique combination of technical depth, strategic thinking, and practical execution that delivers real business value.",
                "date": datetime(2025, 8, 1),
                "skills_mentioned": ["Infrastructure", "Security", "Migration", "Strategic Planning", "Bare-metal"],
                "created_at": now,
                "updated_at": now
            }
        ]
        
    def _get_experiences_data(self, now) -> List[Dict]:
        """Get experiences data"""
        return [
            {
                "id": "exp-1",
                "company": "Kahf Yazılım A.Ş.",
                "role": "Senior DevOps Engineer",
                "duration": "August 2025 - Present",
                "location": "Istanbul, Turkey",
                "current": True,
                "achievements": [
                    "On a mission to make online world safe & secure",
                    "Migrating entire infrastructure from Azure to Bare-metal",
                    "Implementing cloud-native solutions with Kubernetes orchestration",
                    "Establishing robust monitoring and observability stack"
                ],
                "technologies": ["Bind9", "CloudNative-PG", "Kubernetes", "Ansible", "Terraform", "Microsoft Azure", "Traefik", "Helm Charts", "Prometheus", "Grafana", "Loki"],
                "website": "https://kahf.co",
                "created_at": now,
                "updated_at": now
            },
            {
                "id": "exp-2",
                "company": "Kahf Yazılım A.Ş.",
                "role": "DevOps Contributor",
                "duration": "May 2025 - July 2025",
                "location": "Istanbul, Turkey",
                "current": False,
                "achievements": [
                    "On a mission to make online world safe & secure",
                    "Migrating entire infrastructure from Azure to Bare-metal",
                    "Implementing cloud-native solutions with Kubernetes orchestration",
                    "Establishing robust monitoring and observability stack"
                ],
                "technologies": ["CloudNative-PG", "Kubernetes", "Ansible", "Terraform", "Microsoft Azure", "Traefik", "Helm Charts", "Prometheus", "Grafana", "Loki"],
                "website": "https://kahf.co",
                "created_at": now,
                "updated_at": now
            },
            {
                "id": "exp-3",
                "company": "Source Code Podcast",
                "role": "Founder & Host",
                "duration": "March 2025 - Present",
                "location": "Remote",
                "current": True,
                "achievements": [
                    "Building a platform for technology discussions and knowledge sharing",
                    "Growing audience of developers and technology professionals",
                    "Featuring industry experts and thought leaders",
                    "Contributing to developer community growth and education"
                ],
                "technologies": ["Content Creation", "Community Building", "Podcasting", "Developer Relations"],
                "website": "https://sourcecode.alamin.rocks",
                "created_at": now,
                "updated_at": now
            },
            {
                "id": "exp-4",
                "company": "Dark Knight Technologies",
                "role": "Founder & Platform Architect",
                "duration": "November 2023 - Present",
                "location": "Remote",
                "current": True,
                "achievements": [
                    "Empowering businesses by building highly scalable, fault-tolerant applications",
                    "Implementing robust cybersecurity measures and efficient platforms",
                    "Architecting cloud-native solutions for global enterprises",
                    "Providing strategic technology consulting for startups and enterprises"
                ],
                "technologies": ["Full-Stack Development", "Cloud Architecture", "Cybersecurity", "Platform Engineering"],
                "website": "https://darkknight.tech",
                "created_at": now,
                "updated_at": now
            },
            {
                "id": "exp-5",
                "company": "LeadSync.ai",
                "role": "Senior Software Engineer - AI Products",
                "duration": "May 2025 - July 2025",
                "location": "Singapore, Remote",
                "current": False,
                "achievements": [
                    "Accelerated time-to-market by 40% by architecting end-to-end MCP integration with advanced LLMs",
                    "Boosted qualified lead discovery by 25% through AI-driven lead scoring and semantic enrichment",
                    "Built enterprise-scale AI platform with real-time inference optimization",
                    "Implemented personalized AI-driven recommendations system"
                ],
                "technologies": ["MCP Protocol", "LLM Integration", "AI-SDK", "TypeScript", "PostgreSQL", "Nest.JS", "Next.JS"],
                "website": "https://leadsync.ai",
                "created_at": now,
                "updated_at": now
            },
            {
                "id": "exp-6",
                "company": "AK2 Tech",
                "role": "Co-Founder & CSO",
                "duration": "August 2024 - April 2025",
                "location": "Dhaka, Bangladesh",
                "current": False,
                "achievements": [
                    "Built next-generation AI-powered solutions to assist on-call support",
                    "Spearheaded product strategy and GTM securing initial customer traction in Bangladesh and Southeast Asia",
                    "Grew internal team of engineers, product, and GTM to 10+ members across 3 time zones",
                    "Established technical partnerships with AWS and Google Cloud"
                ],
                "technologies": ["AI/ML", "Product Strategy", "Go-to-Market", "Team Building"],
                "website": None,
                "created_at": now,
                "updated_at": now
            },
            {
                "id": "exp-7",
                "company": "BriteCore Inc",
                "role": "Senior Platform Engineer & SRE",
                "duration": "October 2021 - June 2024",
                "location": "USA, Remote",
                "current": False,
                "achievements": [
                    "Generated $20M+ ARR through platform reliability and performance improvements",
                    "Reduced cloud infrastructure costs by $1M+ annually through optimization",
                    "Led migration from EC2 to ECS/Fargate improving deployment efficiency by 70%",
                    "Built comprehensive observability platform processing 10TB+ logs daily"
                ],
                "technologies": ["AWS", "Kubernetes", "ECS", "Terraform", "Python", "PostgreSQL", "Prometheus", "Grafana"],
                "website": "https://britecore.com",
                "created_at": now,
                "updated_at": now
            }
        ]
        
    def _get_education_data(self, now) -> List[Dict]:
        """Get education data"""
        return [
            {
                "id": "edu-1",
                "institution": "Chittagong University of Engineering & Technology (CUET)",
                "degree": "Bachelor of Science in Mechanical Engineering",
                "field": "Mechanical Engineering",
                "location": "Chittagong, Bangladesh",
                "duration": "2013 - 2017",
                "gpa": 3.67,
                "achievements": [
                    "Hackathon Champion & App Fest Runner-Up (2015)",
                    "Dean's List for Academic Excellence (2016-2017)",
                    "Vice President, Programming Club (2015-2016)",
                    "Engineering Innovation Project Award (2017)"
                ],
                "relevant_courses": [
                    "Engineering Mathematics",
                    "Computer Programming (C/C++)",
                    "Data Structures & Algorithms",
                    "Engineering Design & Analysis",
                    "Project Management",
                    "Statistics & Probability"
                ],
                "activities": [
                    "Programming Club - Vice President",
                    "Engineering Society - Active Member",
                    "Tech Innovation Workshop - Organizer",
                    "Inter-University Programming Contest - Participant"
                ],
                "created_at": now,
                "updated_at": now
            }
        ]
        
    def _get_certifications_data(self, now) -> List[Dict]:
        """Get certifications data"""
        return [
            {
                "id": "cert-1",
                "name": "Certified Kubernetes Administrator (CKA)",
                "organization": "Cloud Native Computing Foundation",
                "status": "in-progress",
                "year": "2025",
                "credential_id": "CKA-2025-XXX",
                "expiry_date": None,
                "description": "Industry-standard certification for Kubernetes cluster administration, covering installation, configuration, networking, security, and troubleshooting.",
                "skills": ["Kubernetes", "Docker", "Container Orchestration", "Cluster Administration", "kubectl", "YAML"],
                "certificate_url": None,
                "created_at": now,
                "updated_at": now
            },
            {
                "id": "cert-2",
                "name": "AWS Solutions Architect Professional",
                "organization": "Amazon Web Services",
                "status": "active",
                "year": "2024",
                "credential_id": "AWS-SAP-2024-XXX",
                "expiry_date": "2027",
                "description": "Advanced certification demonstrating expertise in designing distributed applications and systems on AWS platform with complex requirements.",
                "skills": ["AWS", "Cloud Architecture", "Solution Design", "Cost Optimization", "Security", "Scalability"],
                "certificate_url": "#",
                "created_at": now,
                "updated_at": now
            },
            {
                "id": "cert-3",
                "name": "Observability Engineering with Grafana Stack",
                "organization": "Grafana Labs",
                "status": "active",
                "year": "2024",
                "credential_id": "GRAFANA-OBS-2024-XXX",
                "expiry_date": "2026",
                "description": "Comprehensive certification covering observability best practices using Grafana, Prometheus, and Loki for monitoring and alerting.",
                "skills": ["Grafana", "Prometheus", "Loki", "Observability", "Monitoring", "Alerting"],
                "certificate_url": "#",
                "created_at": now,
                "updated_at": now
            },
            {
                "id": "cert-4",
                "name": "HashiCorp Certified: Terraform Associate",
                "organization": "HashiCorp",
                "status": "active",
                "year": "2023",
                "credential_id": "HASHI-TERRA-2023-XXX",
                "expiry_date": "2025",
                "description": "Validates skills in Infrastructure as Code using Terraform for multi-cloud deployments and infrastructure automation.",
                "skills": ["Terraform", "Infrastructure as Code", "Multi-cloud", "Automation", "HCL"],
                "certificate_url": "#",
                "created_at": now,
                "updated_at": now
            },
            {
                "id": "cert-5",
                "name": "Professional Scrum Master I (PSM I)",
                "organization": "Scrum.org",
                "status": "active",
                "year": "2023",
                "credential_id": "PSM-I-2023-XXX",
                "expiry_date": None,
                "description": "Demonstrates fundamental understanding of Scrum framework and ability to apply it effectively in software development teams.",
                "skills": ["Scrum", "Agile", "Project Management", "Team Leadership", "Sprint Planning"],
                "certificate_url": "#",
                "created_at": now,
                "updated_at": now
            },
            {
                "id": "cert-6",
                "name": "Docker Certified Associate (DCA)",
                "organization": "Docker Inc.",
                "status": "expired",
                "year": "2022",
                "credential_id": "DOCKER-DCA-2022-XXX",
                "expiry_date": "2024",
                "description": "Validates skills in containerization, Docker Engine, image management, networking, security, and orchestration.",
                "skills": ["Docker", "Containerization", "Image Management", "Docker Compose", "Container Security"],
                "certificate_url": "#",
                "created_at": now,
                "updated_at": now
            }
        ]
        
    async def seed_data(self):
        """Seed all data into the database"""
        data = self.get_seed_data()
        
        # Seed hero data
        hero = data['hero']
        await self.connection.execute("""
            INSERT INTO hero (id, roles, name, description, metrics, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (id) DO UPDATE SET
                roles = EXCLUDED.roles,
                name = EXCLUDED.name,
                description = EXCLUDED.description,
                metrics = EXCLUDED.metrics,
                updated_at = EXCLUDED.updated_at
        """, hero['id'], hero['roles'], hero['name'], hero['description'], 
            json.dumps(hero['metrics']), hero['updated_at'])
        print("Seeded hero data")
        
        # Seed about data
        about = data['about']
        await self.connection.execute("""
            INSERT INTO about (id, title, description, skills, quick_facts, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (id) DO UPDATE SET
                title = EXCLUDED.title,
                description = EXCLUDED.description,
                skills = EXCLUDED.skills,
                quick_facts = EXCLUDED.quick_facts,
                updated_at = EXCLUDED.updated_at
        """, about['id'], about['title'], about['description'], about['skills'],
            json.dumps(about['quick_facts']), about['updated_at'])
        print("Seeded about data")
        
        # Seed contact info
        contact = data['contact_info']
        await self.connection.execute("""
            INSERT INTO contact_info (id, email, phone, location, social_links, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (id) DO UPDATE SET
                email = EXCLUDED.email,
                phone = EXCLUDED.phone,
                location = EXCLUDED.location,
                social_links = EXCLUDED.social_links,
                updated_at = EXCLUDED.updated_at
        """, contact['id'], contact['email'], contact['phone'], contact['location'],
            json.dumps(contact['social_links']), contact['updated_at'])
        print("Seeded contact info")
        
        # Seed projects
        for project in data['projects']:
            await self.connection.execute("""
                INSERT INTO projects (
                    id, title, description, long_description, technologies,
                    github_url, live_url, demo_url, featured, category,
                    impact, stats, status, ai_powered, created_at, updated_at
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
                ON CONFLICT (id) DO UPDATE SET
                    title = EXCLUDED.title,
                    description = EXCLUDED.description,
                    long_description = EXCLUDED.long_description,
                    technologies = EXCLUDED.technologies,
                    github_url = EXCLUDED.github_url,
                    live_url = EXCLUDED.live_url,
                    demo_url = EXCLUDED.demo_url,
                    featured = EXCLUDED.featured,
                    category = EXCLUDED.category,
                    impact = EXCLUDED.impact,
                    stats = EXCLUDED.stats,
                    status = EXCLUDED.status,
                    ai_powered = EXCLUDED.ai_powered,
                    updated_at = EXCLUDED.updated_at
            """, project['id'], project['title'], project['description'], 
                project.get('long_description'), project['technologies'],
                project.get('github_url'), project.get('live_url'), 
                project.get('demo_url'), project['featured'], project['category'],
                json.dumps(project.get('impact', {})), json.dumps(project.get('stats', {})),
                project['status'], project.get('ai_powered', False),
                project['created_at'], project['updated_at'])
        print(f"Seeded {len(data['projects'])} projects")
        
        # Seed tech skills
        for skill in data['tech_skills']:
            await self.connection.execute("""
                INSERT INTO tech_skills (
                    id, name, category, level, years_exp, icon, color, projects,
                    created_at, updated_at
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                ON CONFLICT (id) DO UPDATE SET
                    name = EXCLUDED.name,
                    category = EXCLUDED.category,
                    level = EXCLUDED.level,
                    years_exp = EXCLUDED.years_exp,
                    icon = EXCLUDED.icon,
                    color = EXCLUDED.color,
                    projects = EXCLUDED.projects,
                    updated_at = EXCLUDED.updated_at
            """, skill['id'], skill['name'], skill['category'], skill['level'],
                skill['years_exp'], skill['icon'], skill['color'], skill['projects'],
                skill['created_at'], skill['updated_at'])
        print(f"Seeded {len(data['tech_skills'])} tech skills")
        
        # Seed achievements
        for achievement in data['achievements']:
            await self.connection.execute("""
                INSERT INTO achievements (
                    id, title, value, description, icon, color, percentage,
                    details, category, created_at, updated_at
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                ON CONFLICT (id) DO UPDATE SET
                    title = EXCLUDED.title,
                    value = EXCLUDED.value,
                    description = EXCLUDED.description,
                    icon = EXCLUDED.icon,
                    color = EXCLUDED.color,
                    percentage = EXCLUDED.percentage,
                    details = EXCLUDED.details,
                    category = EXCLUDED.category,
                    updated_at = EXCLUDED.updated_at
            """, achievement['id'], achievement['title'], achievement['value'],
                achievement['description'], achievement['icon'], achievement['color'],
                achievement['percentage'], achievement['details'], achievement['category'],
                achievement['created_at'], achievement['updated_at'])
        print(f"Seeded {len(data['achievements'])} achievements")
        
        # Seed recommendations
        for rec in data['recommendations']:
            await self.connection.execute("""
                INSERT INTO recommendations (
                    id, recommender_name, recommender_title, recommender_company,
                    recommender_image, relationship, content, date, skills_mentioned,
                    created_at, updated_at
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                ON CONFLICT (id) DO UPDATE SET
                    recommender_name = EXCLUDED.recommender_name,
                    recommender_title = EXCLUDED.recommender_title,
                    recommender_company = EXCLUDED.recommender_company,
                    recommender_image = EXCLUDED.recommender_image,
                    relationship = EXCLUDED.relationship,
                    content = EXCLUDED.content,
                    date = EXCLUDED.date,
                    skills_mentioned = EXCLUDED.skills_mentioned,
                    updated_at = EXCLUDED.updated_at
            """, rec['id'], rec['recommender_name'], rec['recommender_title'],
                rec['recommender_company'], rec.get('recommender_image'),
                rec['relationship'], rec['content'], rec['date'],
                rec['skills_mentioned'], rec['created_at'], rec['updated_at'])
        print(f"Seeded {len(data['recommendations'])} recommendations")
        
        # Seed experiences
        for exp in data['experiences']:
            await self.connection.execute("""
                INSERT INTO experiences (
                    id, company, role, duration, location, current,
                    achievements, technologies, website, created_at, updated_at
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                ON CONFLICT (id) DO UPDATE SET
                    company = EXCLUDED.company,
                    role = EXCLUDED.role,
                    duration = EXCLUDED.duration,
                    location = EXCLUDED.location,
                    current = EXCLUDED.current,
                    achievements = EXCLUDED.achievements,
                    technologies = EXCLUDED.technologies,
                    website = EXCLUDED.website,
                    updated_at = EXCLUDED.updated_at
            """, exp['id'], exp['company'], exp['role'], exp['duration'],
                exp['location'], exp.get('current', False), exp['achievements'],
                exp['technologies'], exp.get('website'), exp['created_at'], exp['updated_at'])
        print(f"Seeded {len(data['experiences'])} experiences")
        
        # Seed education
        for edu in data['education']:
            await self.connection.execute("""
                INSERT INTO education (
                    id, institution, degree, field, location, duration, gpa,
                    achievements, relevant_courses, activities, created_at, updated_at
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                ON CONFLICT (id) DO UPDATE SET
                    institution = EXCLUDED.institution,
                    degree = EXCLUDED.degree,
                    field = EXCLUDED.field,
                    location = EXCLUDED.location,
                    duration = EXCLUDED.duration,
                    gpa = EXCLUDED.gpa,
                    achievements = EXCLUDED.achievements,
                    relevant_courses = EXCLUDED.relevant_courses,
                    activities = EXCLUDED.activities,
                    updated_at = EXCLUDED.updated_at
            """, edu['id'], edu['institution'], edu['degree'], edu['field'],
                edu['location'], edu['duration'], edu.get('gpa'), edu['achievements'],
                edu['relevant_courses'], edu.get('activities', []),
                edu['created_at'], edu['updated_at'])
        print(f"Seeded {len(data['education'])} education records")
        
        # Seed certifications
        for cert in data['certifications']:
            await self.connection.execute("""
                INSERT INTO certifications (
                    id, name, organization, status, year, credential_id,
                    expiry_date, description, skills, certificate_url,
                    created_at, updated_at
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                ON CONFLICT (id) DO UPDATE SET
                    name = EXCLUDED.name,
                    organization = EXCLUDED.organization,
                    status = EXCLUDED.status,
                    year = EXCLUDED.year,
                    credential_id = EXCLUDED.credential_id,
                    expiry_date = EXCLUDED.expiry_date,
                    description = EXCLUDED.description,
                    skills = EXCLUDED.skills,
                    certificate_url = EXCLUDED.certificate_url,
                    updated_at = EXCLUDED.updated_at
            """, cert['id'], cert['name'], cert['organization'], cert['status'],
                cert.get('year'), cert.get('credential_id'), cert.get('expiry_date'),
                cert.get('description'), cert.get('skills', []), cert.get('certificate_url'),
                cert['created_at'], cert['updated_at'])
        print(f"Seeded {len(data['certifications'])} certifications")
        
        print("\nDatabase seeding completed successfully!")
        

async def main():
    """Main function to run the seed script"""
    seeder = DatabaseSeeder()
    
    try:
        await seeder.connect()
        await seeder.create_tables()
        
        # Ask user if they want to clear existing data
        response = input("Do you want to clear existing data before seeding? (y/N): ")
        if response.lower() == 'y':
            await seeder.clear_existing_data()
            
        await seeder.seed_data()
        
    except Exception as e:
        print(f"Error during seeding: {e}")
        raise
    finally:
        await seeder.disconnect()


if __name__ == "__main__":
    asyncio.run(main())