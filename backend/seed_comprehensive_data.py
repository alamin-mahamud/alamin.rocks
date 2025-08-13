#!/usr/bin/env python3
"""
Comprehensive Database Seeder
Seeds the database with all portfolio data based on frontend static data structure.
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
        logging.FileHandler('seed_comprehensive.log')
    ]
)
logger = logging.getLogger(__name__)

# Database configuration
DATABASE_URL = "postgresql+asyncpg://postgres:password@localhost:5452/alamin_rocks"
engine = create_async_engine(DATABASE_URL, echo=False)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

# Comprehensive seed data based on frontend static data
SEED_DATA = {
    "languages": [
        {"code": "en", "name": "English", "native_name": "English", "is_active": True},
        {"code": "bn", "name": "Bengali", "native_name": "বাংলা", "is_active": True}
    ],
    
    "hero": {
        "id": "hero",
        "name": "Alamin Mahamud",
        "roles": ["Senior DevOps Engineer", "AI Products Engineer", "Site Reliability Engineer", "Cloud Architect", "Platform Engineer"],
        "description": "Strategic technology leader with 10+ years of expertise in building scalable cloud platforms, leading DevOps + SRE teams, and architecting AI-powered solutions that drive $20M+ ARR and serve 100K+ users globally.",
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
        "title": "About Me",
        "description": [
            "I'm a **strategic technology leader** dedicated to architecting and scaling **innovative cloud-native solutions** for global enterprises, with a strong **entrepreneurial spirit** that drives startup growth. Over the past **10+ years**, I've successfully built next-generation **Event-driven SaaS platforms**, led transformative **DevOps and SRE initiatives**, and consistently delivered **measurable impact**.",
            "Currently serving dual roles as **Senior DevOps Engineer** at [Kahf Yazılım A.Ş.](https://kahf.co) and **Senior Software Engineer - AI Products** at [LeadSync.ai](https://leadsync.ai), where I'm **migrating entire infrastructure from Azure to Bare-metal** and building **AI-powered Model Customization Platforms (MCP)** that accelerate time-to-market by **40%**.",
            "Previously at **BriteCore Inc** for **5 years 5 months**, I **generated $20M+ ARR** by designing and implementing highly available, cost-efficient SaaS platforms, while **cutting $1M+ cloud costs** through intelligent optimization strategies. I've **maintained 99.99% uptime** across 50+ client environments and **eliminated 30% of production brownouts** through advanced monitoring and automation.",
            "Beyond my technical expertise, I'm the **Founder & Host** of [Source Code Podcast](https://sourcecode.alamin.rocks) since **March 2025** and **Founder & Platform Architect** at [Dark Knight Technologies](https://darkknight.tech) since **November 2023**, where I empower businesses by building **highly scalable, fault-tolerant applications** with robust cybersecurity."
        ],
        "skills": ["Python", "Go", "TypeScript", "JavaScript", "FastAPI", "Nest.JS", "Next.JS", "Gin", "Flask", "Django", "AWS", "GCP", "Azure", "Docker", "Kubernetes", "ECS", "EKS", "Containerd", "LXC", "Terraform", "AWS CDK", "CloudFormation", "Ansible", "SaltStack", "GitHub Actions", "Jenkins", "ArgoCD", "Helm", "Kustomize", "PostgreSQL", "MySQL", "Redis", "Elasticsearch", "OpenSearch", "Prometheus", "Grafana", "DataDog", "CloudWatch", "Loki", "ELK Stack", "Traefik", "Nginx", "Istio", "Calico", "pfSense", "VPN", "TLS", "BGP", "MCP Protocol", "LLM Integration", "AI-SDK", "TensorFlow", "RabbitMQ", "Longhorn", "Ceph", "ZFS", "NFS", "TrueNAS", "Linux", "Ubuntu", "Debian", "Arch"],
        "quick_facts": {
            "location": "Istanbul, Turkey / Remote",
            "experience": "10+ Years",
            "focus": "AI, Cloud & MLOps",
            "interests": "Source Code Podcast, Open Source, Mentoring",
            "languages": "English (Native/Bilingual), Bangla (Native/Bilingual), Hindi (Native/Bilingual), Urdu (Full Professional), Turkish (Limited Working)",
            "education": "BSc Mechanical Engineering, CUET (2013-2017)",
            "certifications": "CKA (In-Progress), Observability with Grafana/Prometheus/Loki",
            "awards": "Hackathon Champion & App Fest Runner-Up (2015)"
        }
    },
    
    "contact_info": {
        "id": "contact",
        "email": "hello@alamin.rocks",
        "phone": "+880 168 7060 434",
        "location": "Istanbul, Turkey",
        "social_links": {
            "github": "https://github.com/alamin-mahamud",
            "linkedin": "https://linkedin.com/in/alamin-mahamud",
            "twitter": "https://twitter.com/alamin_rocks",
            "website": "https://alamin.rocks"
        }
    },
    
    "experiences": [
        {
            "id": "1",
            "company": "Kahf Yazılım A.Ş.",
            "role": "Senior DevOps Engineer",
            "duration": "May 2025 - Present",
            "start_date": "2025-05-01",
            "end_date": None,
            "location": "Istanbul, Turkey",
            "is_current": True,
            "achievements": [
                "On a mission to make online world safe & secure",
                "Migrating the entire infrastructure from Azure to Bare-metal"
            ],
            "technologies": "Bind9,CloudNative-PG,Kubernetes,Ansible,Terraform,Microsoft Azure,Traefik,Helm Charts,Prometheus,Grafana,Loki",
            "website": "https://kahf.co"
        },
        {
            "id": "2", 
            "company": "LeadSync.ai",
            "role": "Senior Software Engineer - AI Products",
            "duration": "May 2025 - Present",
            "start_date": "2025-05-01",
            "end_date": None,
            "location": "Singapore, Remote",
            "is_current": True,
            "achievements": [
                "Accelerated time-to-market by 40% by architecting and deploying an end-to-end integration of the Model Customization Platform (MCP) with advanced large language models (LLMs)",
                "Boosted qualified lead discovery by 25% through AI-driven lead scoring, semantic enrichment, and personalized outreach recommendations"
            ],
            "technologies": "MCP Protocol,LLM Integration,AI-SDK,TypeScript,PostgreSQL,Nest.JS,Next.JS",
            "website": "https://leadsync.ai"
        },
        {
            "id": "3",
            "company": "BriteCore Inc",
            "role": "Senior Platform Engineer & SRE – Cloud Team",
            "duration": "Feb 2022 - Jan 2025",
            "start_date": "2022-02-01",
            "end_date": "2025-01-31",
            "location": "Springfield, MO, USA",
            "is_current": False,
            "achievements": [
                "Generated $20M+ ARR by designing, implementing, and maintaining highly available, cost-efficient SaaS platforms",
                "Cut $1M+ cloud bill by spearheading cloud cost-saving initiatives",
                "Eliminated 30% of production brownouts by optimizing runtime configuration and state management",
                "Accelerated development cycles by ~35% by engineering CI/CD pipelines with GitHub Actions self-hosted runners",
                "Attained SOC2 compliance by lowering vulnerability exposure by ~60%",
                "Neutralized DDoS attacks from high-volume bot traffic through proactive monitoring",
                "Streamlined infrastructure provisioning by 80% by leveraging Terraform modules"
            ],
            "technologies": "AWS,Terraform,Kubernetes,Docker,GitHub Actions,DataDog,Python,PostgreSQL",
            "website": None
        }
    ],
    
    "projects": [
        {
            "id": "1",
            "title": "AI-Powered Model Customization Platform (MCP)",
            "description": "Revolutionary LLM integration platform that accelerated time-to-market by 40% and boosted qualified lead discovery by 25%.",
            "long_description": "End-to-end integration platform for advanced large language models featuring semantic enrichment, personalized AI-driven recommendations, and custom model fine-tuning capabilities. Built for enterprise-scale deployment with real-time inference optimization at LeadSync.ai.",
            "technologies": "MCP Protocol,LLM Integration,AI-SDK,TypeScript,PostgreSQL,Nest.JS,Next.JS,Python,TensorFlow",
            "github_url": "https://github.com/leadsync-ai/mcp-platform",
            "live_url": "https://leadsync.ai",
            "demo_url": "https://demo.leadsync.ai",
            "is_featured": True,
            "category": "AI/ML",
            "impact": '{"users": 50000, "performance": "40% faster time-to-market", "savings": "$2M+ in development costs"}',
            "stats": '{"stars": 342, "forks": 67, "commits": 1240, "contributors": 8}',
            "status": "maintained",
            "ai_powered": True,
            "start_date": "2024-01-01"
        },
        {
            "id": "2",
            "title": "Enterprise SaaS Platform - BriteCore",
            "description": "Generated $20M+ ARR by designing highly available, cost-efficient SaaS platforms for 50+ enterprise clients.",
            "long_description": "Comprehensive enterprise SaaS platform featuring multi-tenant architecture, advanced monitoring, automated deployment pipelines, and cost optimization strategies. Achieved 99.99% uptime across 50+ client environments while cutting $1M+ in cloud costs through intelligent optimization.",
            "technologies": "AWS,Kubernetes,Terraform,GitHub Actions,DataDog,Prometheus,Grafana,Python,PostgreSQL",
            "is_featured": True,
            "category": "DevOps/SRE",
            "impact": '{"savings": "$20M+ ARR + $1M+ cost reduction", "users": 100000, "reliability": "99.99% SLA maintained"}',
            "stats": '{"commits": 5000, "contributors": 20, "deployments": 200}',
            "status": "completed",
            "start_date": "2022-02-01",
            "end_date": "2025-01-31"
        }
    ],
    
    "achievements": [
        {
            "id": "cloud-savings",
            "title": "Cloud Cost Optimization",
            "value": "$1.2M+",
            "description": "Total cloud infrastructure cost savings achieved",
            "icon": "DollarSign",
            "color": "text-accent",
            "percentage": 100.0,
            "details": '["Optimized AWS CloudWatch log ingestion saving $36.5K/year", "Implemented intelligent resource rightsizing algorithms", "Automated cost monitoring and alert systems", "Cross-functional team leadership for cost optimization initiatives"]',
            "category": "financial"
        },
        {
            "id": "saas-arr",
            "title": "SaaS ARR Generation",
            "value": "$20M+",
            "description": "Annual Recurring Revenue contribution to SaaS platforms",
            "icon": "TrendingUp",
            "color": "text-accent", 
            "percentage": 100.0,
            "details": '["Designed and maintained highly available SaaS platforms", "Implemented scalable cloud architectures", "Enhanced platform reliability and performance", "Drove customer retention through system optimization"]',
            "category": "financial"
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
    
    "certifications": [
        {
            "id": "1",
            "name": "Certified Kubernetes Administrator",
            "organization": "Cloud Native Computing Foundation",
            "status": "In Progress",
            "year": None,
            "description": "Advanced Kubernetes administration and troubleshooting",
            "credential_url": None
        }
    ],
    
    "education": [
        {
            "id": "1",
            "institution": "Chittagong University of Engineering & Technology",
            "degree": "Bachelor of Science",
            "field": "Mechanical Engineering",
            "location": "Chittagong, Bangladesh",
            "duration": "Mar 2013 - Sep 2017",
            "start_date": "2013-03-01",
            "end_date": "2017-09-30",
            "gpa": None,
            "description": "Comprehensive mechanical engineering curriculum with focus on system design and optimization"
        }
    ]
}

async def create_tables():
    """Create database tables if they don't exist"""
    logger.info("Creating database tables...")
    
    async with AsyncSessionLocal() as session:
        # Create tables SQL
        tables_sql = [
            # Languages table
            """
            CREATE TABLE IF NOT EXISTS languages (
                code VARCHAR(10) PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                native_name VARCHAR(100) NOT NULL,
                is_active BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
            """,
            
            # Hero table
            """
            CREATE TABLE IF NOT EXISTS hero (
                id VARCHAR(50) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                roles TEXT[],
                description TEXT,
                metrics JSONB,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
            """,
            
            # About table
            """
            CREATE TABLE IF NOT EXISTS about (
                id VARCHAR(50) PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT[],
                skills TEXT[],
                quick_facts JSONB,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
            """,
            
            # Contact info table
            """
            CREATE TABLE IF NOT EXISTS contact_info (
                id VARCHAR(50) PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(50),
                location VARCHAR(255),
                social_links JSONB,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
            """,
            
            # Experiences table
            """
            CREATE TABLE IF NOT EXISTS experiences (
                id VARCHAR(50) PRIMARY KEY,
                company VARCHAR(255) NOT NULL,
                role VARCHAR(255) NOT NULL,
                duration VARCHAR(100),
                start_date DATE,
                end_date DATE,
                location VARCHAR(255),
                is_current BOOLEAN DEFAULT false,
                achievements TEXT[],
                technologies TEXT,
                website VARCHAR(500),
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
            """,
            
            # Projects table
            """
            CREATE TABLE IF NOT EXISTS projects (
                id VARCHAR(50) PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                long_description TEXT,
                technologies TEXT,
                github_url VARCHAR(500),
                live_url VARCHAR(500),
                demo_url VARCHAR(500),
                image_url VARCHAR(500),
                is_featured BOOLEAN DEFAULT false,
                category VARCHAR(100),
                impact JSONB,
                stats JSONB,
                status VARCHAR(50),
                ai_powered BOOLEAN DEFAULT false,
                start_date DATE,
                end_date DATE,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
            """,
            
            # Achievements table
            """
            CREATE TABLE IF NOT EXISTS achievements (
                id VARCHAR(50) PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                value VARCHAR(100),
                description TEXT,
                icon VARCHAR(100),
                color VARCHAR(100),
                percentage DECIMAL(5,2),
                details JSONB,
                category VARCHAR(100),
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
            """,
            
            # Skills table
            """
            CREATE TABLE IF NOT EXISTS skills (
                id VARCHAR(50) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                category VARCHAR(255),
                proficiency INTEGER CHECK (proficiency >= 0 AND proficiency <= 100),
                years_experience INTEGER,
                icon VARCHAR(100),
                color VARCHAR(100),
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
            """,
            
            # Certifications table
            """
            CREATE TABLE IF NOT EXISTS certifications (
                id VARCHAR(50) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                organization VARCHAR(255),
                status VARCHAR(100),
                year INTEGER,
                description TEXT,
                credential_url VARCHAR(500),
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
            """,
            
            # Education table
            """
            CREATE TABLE IF NOT EXISTS education (
                id VARCHAR(50) PRIMARY KEY,
                institution VARCHAR(255) NOT NULL,
                degree VARCHAR(255),
                field VARCHAR(255),
                location VARCHAR(255),
                duration VARCHAR(100),
                start_date DATE,
                end_date DATE,
                gpa VARCHAR(20),
                description TEXT,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
            """,
            
            # Content translations table
            """
            CREATE TABLE IF NOT EXISTS content_translations (
                id SERIAL PRIMARY KEY,
                table_name VARCHAR(100) NOT NULL,
                record_id VARCHAR(100) NOT NULL,
                field_name VARCHAR(100) NOT NULL,
                language_code VARCHAR(10) NOT NULL REFERENCES languages(code),
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW(),
                UNIQUE(table_name, record_id, field_name, language_code)
            );
            """,
            
            # UI translations table
            """
            CREATE TABLE IF NOT EXISTS ui_translations (
                id SERIAL PRIMARY KEY,
                key VARCHAR(255) NOT NULL,
                language_code VARCHAR(10) NOT NULL REFERENCES languages(code),
                value TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW(),
                UNIQUE(key, language_code)
            );
            """,
            
            # Contact messages table
            """
            CREATE TABLE IF NOT EXISTS contact_messages (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                subject VARCHAR(500),
                message TEXT NOT NULL,
                is_read BOOLEAN DEFAULT false,
                is_replied BOOLEAN DEFAULT false,
                replied_at TIMESTAMP,
                session_id VARCHAR(255),
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
            """,
            
            # Page views table (for analytics)
            """
            CREATE TABLE IF NOT EXISTS page_views (
                id SERIAL PRIMARY KEY,
                page_path VARCHAR(500),
                session_id VARCHAR(255),
                user_agent TEXT,
                ip_address INET,
                created_at TIMESTAMP DEFAULT NOW()
            );
            """
        ]
        
        for table_sql in tables_sql:
            try:
                await session.execute(text(table_sql))
                await session.commit()
            except Exception as e:
                logger.error(f"Error creating table: {e}")
                await session.rollback()
                
    logger.info("Database tables created successfully")

async def clear_existing_data():
    """Clear existing data from all tables"""
    logger.info("Clearing existing data...")
    
    async with AsyncSessionLocal() as session:
        tables = [
            'ui_translations', 'content_translations', 'contact_messages', 
            'page_views', 'achievements', 'skills', 'certifications', 
            'education', 'projects', 'experiences', 'contact_info', 
            'about', 'hero', 'languages'
        ]
        
        for table in tables:
            try:
                await session.execute(text(f"DELETE FROM {table}"))
                await session.commit()
                logger.info(f"Cleared {table} table")
            except Exception as e:
                logger.error(f"Error clearing {table}: {e}")
                await session.rollback()

async def seed_languages():
    """Seed languages data"""
    logger.info("Seeding languages...")
    
    async with AsyncSessionLocal() as session:
        for lang in SEED_DATA["languages"]:
            insert_sql = """
                INSERT INTO languages (code, name, native_name, is_active)
                VALUES (:code, :name, :native_name, :is_active)
                ON CONFLICT (code) DO UPDATE SET
                    name = EXCLUDED.name,
                    native_name = EXCLUDED.native_name,
                    is_active = EXCLUDED.is_active,
                    updated_at = NOW()
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
            INSERT INTO hero (id, name, roles, description, metrics)
            VALUES (:id, :name, :roles, :description, :metrics)
            ON CONFLICT (id) DO UPDATE SET
                name = EXCLUDED.name,
                roles = EXCLUDED.roles,
                description = EXCLUDED.description,
                metrics = EXCLUDED.metrics,
                updated_at = NOW()
        """
        await session.execute(text(insert_sql), {
            "id": hero["id"],
            "name": hero["name"], 
            "roles": hero["roles"],
            "description": hero["description"],
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
            INSERT INTO about (id, title, description, skills, quick_facts)
            VALUES (:id, :title, :description, :skills, :quick_facts)
            ON CONFLICT (id) DO UPDATE SET
                title = EXCLUDED.title,
                description = EXCLUDED.description,
                skills = EXCLUDED.skills,
                quick_facts = EXCLUDED.quick_facts,
                updated_at = NOW()
        """
        await session.execute(text(insert_sql), {
            "id": about["id"],
            "title": about["title"],
            "description": about["description"],
            "skills": about["skills"],
            "quick_facts": json.dumps(about["quick_facts"])
        })
        
        await session.commit()
        logger.info("Seeded about data")

async def seed_contact_info():
    """Seed contact info data"""
    logger.info("Seeding contact info...")
    
    async with AsyncSessionLocal() as session:
        contact = SEED_DATA["contact_info"]
        insert_sql = """
            INSERT INTO contact_info (id, email, phone, location, social_links)
            VALUES (:id, :email, :phone, :location, :social_links)
            ON CONFLICT (id) DO UPDATE SET
                email = EXCLUDED.email,
                phone = EXCLUDED.phone,
                location = EXCLUDED.location,
                social_links = EXCLUDED.social_links,
                updated_at = NOW()
        """
        await session.execute(text(insert_sql), {
            "id": contact["id"],
            "email": contact["email"],
            "phone": contact["phone"],
            "location": contact["location"],
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
                INSERT INTO experiences 
                (id, company, role, duration, start_date, end_date, location, is_current, achievements, technologies, website)
                VALUES (:id, :company, :role, :duration, :start_date, :end_date, :location, :is_current, :achievements, :technologies, :website)
                ON CONFLICT (id) DO UPDATE SET
                    company = EXCLUDED.company,
                    role = EXCLUDED.role,
                    duration = EXCLUDED.duration,
                    start_date = EXCLUDED.start_date,
                    end_date = EXCLUDED.end_date,
                    location = EXCLUDED.location,
                    is_current = EXCLUDED.is_current,
                    achievements = EXCLUDED.achievements,
                    technologies = EXCLUDED.technologies,
                    website = EXCLUDED.website,
                    updated_at = NOW()
            """
            
            # Parse dates
            start_date = datetime.strptime(exp["start_date"], "%Y-%m-%d").date() if exp["start_date"] else None
            end_date = datetime.strptime(exp["end_date"], "%Y-%m-%d").date() if exp["end_date"] else None
            
            await session.execute(text(insert_sql), {
                **exp,
                "start_date": start_date,
                "end_date": end_date
            })
        
        await session.commit()
        logger.info(f"Seeded {len(SEED_DATA['experiences'])} experiences")

async def seed_projects():
    """Seed projects data"""
    logger.info("Seeding projects...")
    
    async with AsyncSessionLocal() as session:
        for project in SEED_DATA["projects"]:
            insert_sql = """
                INSERT INTO projects 
                (id, title, description, long_description, technologies, github_url, live_url, demo_url, 
                 is_featured, category, impact, stats, status, ai_powered, start_date, end_date)
                VALUES (:id, :title, :description, :long_description, :technologies, :github_url, :live_url, :demo_url,
                        :is_featured, :category, :impact, :stats, :status, :ai_powered, :start_date, :end_date)
                ON CONFLICT (id) DO UPDATE SET
                    title = EXCLUDED.title,
                    description = EXCLUDED.description,
                    long_description = EXCLUDED.long_description,
                    technologies = EXCLUDED.technologies,
                    github_url = EXCLUDED.github_url,
                    live_url = EXCLUDED.live_url,
                    demo_url = EXCLUDED.demo_url,
                    is_featured = EXCLUDED.is_featured,
                    category = EXCLUDED.category,
                    impact = EXCLUDED.impact,
                    stats = EXCLUDED.stats,
                    status = EXCLUDED.status,
                    ai_powered = EXCLUDED.ai_powered,
                    start_date = EXCLUDED.start_date,
                    end_date = EXCLUDED.end_date,
                    updated_at = NOW()
            """
            
            # Parse dates if they exist
            start_date = datetime.strptime(project["start_date"], "%Y-%m-%d").date() if project.get("start_date") else None
            end_date = datetime.strptime(project["end_date"], "%Y-%m-%d").date() if project.get("end_date") else None
            
            project_data = {
                **project,
                "start_date": start_date,
                "end_date": end_date
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
                INSERT INTO achievements 
                (id, title, value, description, icon, color, percentage, details, category)
                VALUES (:id, :title, :value, :description, :icon, :color, :percentage, :details, :category)
                ON CONFLICT (id) DO UPDATE SET
                    title = EXCLUDED.title,
                    value = EXCLUDED.value,
                    description = EXCLUDED.description,
                    icon = EXCLUDED.icon,
                    color = EXCLUDED.color,
                    percentage = EXCLUDED.percentage,
                    details = EXCLUDED.details,
                    category = EXCLUDED.category,
                    updated_at = NOW()
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
                INSERT INTO skills 
                (id, name, category, proficiency, years_experience, icon, color)
                VALUES (:id, :name, :category, :proficiency, :years_experience, :icon, :color)
                ON CONFLICT (id) DO UPDATE SET
                    name = EXCLUDED.name,
                    category = EXCLUDED.category,
                    proficiency = EXCLUDED.proficiency,
                    years_experience = EXCLUDED.years_experience,
                    icon = EXCLUDED.icon,
                    color = EXCLUDED.color,
                    updated_at = NOW()
            """
            await session.execute(text(insert_sql), skill)
        
        await session.commit()
        logger.info(f"Seeded {len(SEED_DATA['skills'])} skills")

async def seed_certifications():
    """Seed certifications data"""
    logger.info("Seeding certifications...")
    
    async with AsyncSessionLocal() as session:
        for cert in SEED_DATA["certifications"]:
            insert_sql = """
                INSERT INTO certifications 
                (id, name, organization, status, year, description, credential_url)
                VALUES (:id, :name, :organization, :status, :year, :description, :credential_url)
                ON CONFLICT (id) DO UPDATE SET
                    name = EXCLUDED.name,
                    organization = EXCLUDED.organization,
                    status = EXCLUDED.status,
                    year = EXCLUDED.year,
                    description = EXCLUDED.description,
                    credential_url = EXCLUDED.credential_url,
                    updated_at = NOW()
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
                (id, institution, degree, field, location, duration, start_date, end_date, gpa, description)
                VALUES (:id, :institution, :degree, :field, :location, :duration, :start_date, :end_date, :gpa, :description)
                ON CONFLICT (id) DO UPDATE SET
                    institution = EXCLUDED.institution,
                    degree = EXCLUDED.degree,
                    field = EXCLUDED.field,
                    location = EXCLUDED.location,
                    duration = EXCLUDED.duration,
                    start_date = EXCLUDED.start_date,
                    end_date = EXCLUDED.end_date,
                    gpa = EXCLUDED.gpa,
                    description = EXCLUDED.description,
                    updated_at = NOW()
            """
            
            # Parse dates
            start_date = datetime.strptime(edu["start_date"], "%Y-%m-%d").date() if edu.get("start_date") else None
            end_date = datetime.strptime(edu["end_date"], "%Y-%m-%d").date() if edu.get("end_date") else None
            
            await session.execute(text(insert_sql), {
                **edu,
                "start_date": start_date,
                "end_date": end_date
            })
        
        await session.commit()
        logger.info(f"Seeded {len(SEED_DATA['education'])} education records")

async def seed_sample_ui_translations():
    """Seed sample UI translations based on frontend data"""
    logger.info("Seeding UI translations...")
    
    # UI translations from frontend/src/lib/translations/en.json
    ui_translations = {
        "en": {
            "hero.greeting": "Hi, I'm",
            "hero.iam": "I am a",
            "hero.viewProjects": "View Projects",
            "hero.contactMe": "Contact Me",
            "nav.home": "Home",
            "nav.about": "About",
            "nav.experience": "Experience", 
            "nav.projects": "Projects",
            "nav.contact": "Contact",
            "about.title": "About Me",
            "projects.title": "Featured Projects",
            "contact.title": "Get In Touch",
            "techstack.title": "Tech Stack",
            "achievements.title": "Achievements",
            "common.loading": "Loading...",
            "common.error": "Error",
            "common.retry": "Retry"
        },
        "bn": {
            "hero.greeting": "হ্যালো, আমি",
            "hero.iam": "আমি একজন",
            "hero.viewProjects": "প্রকল্প দেখুন",
            "hero.contactMe": "যোগাযোগ করুন",
            "nav.home": "হোম",
            "nav.about": "সম্পর্কে",
            "nav.experience": "অভিজ্ঞতা",
            "nav.projects": "প্রকল্প",
            "nav.contact": "যোগাযোগ",
            "about.title": "আমার সম্পর্কে",
            "projects.title": "বৈশিষ্ট্যযুক্ত প্রকল্প",
            "contact.title": "যোগাযোগ করুন",
            "techstack.title": "প্রযুক্তি স্ট্যাক",
            "achievements.title": "অর্জন",
            "common.loading": "লোড হচ্ছে...",
            "common.error": "ত্রুটি",
            "common.retry": "পুনরায় চেষ্টা করুন"
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
                        updated_at = NOW()
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
    logger.info("Starting comprehensive database seeding...")
    
    try:
        # Create tables
        await create_tables()
        
        # Clear existing data (optional - comment out if you want to preserve data)
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
        await seed_certifications()
        await seed_education()
        await seed_sample_ui_translations()
        
        logger.info("✅ Comprehensive database seeding completed successfully!")
        
        # Summary
        logger.info("Seeded data summary:")
        logger.info(f"- Languages: {len(SEED_DATA['languages'])}")
        logger.info(f"- Experiences: {len(SEED_DATA['experiences'])}")
        logger.info(f"- Projects: {len(SEED_DATA['projects'])}")
        logger.info(f"- Achievements: {len(SEED_DATA['achievements'])}")
        logger.info(f"- Skills: {len(SEED_DATA['skills'])}")
        logger.info(f"- Certifications: {len(SEED_DATA['certifications'])}")
        logger.info(f"- Education: {len(SEED_DATA['education'])}")
        
    except Exception as e:
        logger.error(f"❌ Error during seeding: {e}")
        sys.exit(1)
    
    finally:
        # Close engine
        await engine.dispose()

if __name__ == "__main__":
    asyncio.run(main())