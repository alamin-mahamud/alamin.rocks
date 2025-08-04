#!/usr/bin/env python3
"""
Professional Portfolio Database Seeder
Seeds database with accurate data from Alamin Mahamud's resume and LinkedIn profile
"""

import asyncio
import asyncpg
import sys
from datetime import datetime
from typing import Dict, List, Any

from app.core.config import settings


class ProfessionalSeeder:
    def __init__(self):
        self.connection = None
        
    async def connect(self):
        """Connect to the database"""
        try:
            self.connection = await asyncpg.connect(settings.database_url)
            print(f"Connected to database using: {settings.database_url}")
        except Exception as e:
            print(f"Failed to connect to database: {e}")
            sys.exit(1)
    
    async def disconnect(self):
        """Disconnect from database"""
        if self.connection:
            await self.connection.close()
            print("Disconnected from database")
    
    async def create_tables(self):
        """Create database tables if they don't exist"""
        await self.connection.execute("""
            -- Languages table
            CREATE TABLE IF NOT EXISTS languages (
                code VARCHAR(10) PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                native_name VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            
            -- Hero section
            CREATE TABLE IF NOT EXISTS hero (
                id VARCHAR(50) PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                title VARCHAR(255),
                description TEXT,
                metrics JSONB,
                social_links JSONB,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            
            -- About section
            CREATE TABLE IF NOT EXISTS about (
                id VARCHAR(50) PRIMARY KEY,
                bio TEXT,
                skills JSONB,
                interests JSONB,
                values JSONB,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            
            -- Contact info
            CREATE TABLE IF NOT EXISTS contact_info (
                id VARCHAR(50) PRIMARY KEY,
                email VARCHAR(255),
                phone VARCHAR(50),
                location VARCHAR(255),
                website VARCHAR(255),
                social_links JSONB,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            
            -- Projects
            CREATE TABLE IF NOT EXISTS projects (
                id VARCHAR(50) PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                long_description TEXT,
                technologies TEXT[],
                github_url VARCHAR(500),
                live_url VARCHAR(500),
                demo_url VARCHAR(500),
                image_url VARCHAR(500),
                featured BOOLEAN DEFAULT false,
                category VARCHAR(100),
                impact JSONB,
                stats JSONB,
                status VARCHAR(50),
                ai_powered BOOLEAN DEFAULT false,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            
            -- Experiences
            CREATE TABLE IF NOT EXISTS experiences (
                id SERIAL PRIMARY KEY,
                company VARCHAR(255) NOT NULL,
                position VARCHAR(255) NOT NULL,
                location VARCHAR(255),
                start_date DATE,
                end_date DATE,
                current BOOLEAN DEFAULT false,
                description TEXT,
                achievements TEXT[],
                technologies TEXT[],
                impact JSONB,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            
            -- Tech skills
            CREATE TABLE IF NOT EXISTS tech_skills (
                id VARCHAR(100) PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                category VARCHAR(100),
                proficiency INTEGER,
                years_experience INTEGER,
                projects_count INTEGER,
                icon VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            
            -- Certifications
            CREATE TABLE IF NOT EXISTS certifications (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                issuer VARCHAR(255),
                issue_date DATE,
                expiry_date DATE,
                credential_id VARCHAR(255),
                credential_url VARCHAR(500),
                status VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            
            -- Education
            CREATE TABLE IF NOT EXISTS education (
                id SERIAL PRIMARY KEY,
                institution VARCHAR(255) NOT NULL,
                degree VARCHAR(255),
                field_of_study VARCHAR(255),
                start_date DATE,
                end_date DATE,
                location VARCHAR(255),
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            
            -- Achievements
            CREATE TABLE IF NOT EXISTS achievements (
                id VARCHAR(100) PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                impact VARCHAR(255),
                category VARCHAR(100),
                year INTEGER,
                icon VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            
            -- Recommendations
            CREATE TABLE IF NOT EXISTS recommendations (
                id SERIAL PRIMARY KEY,
                recommender_name VARCHAR(255) NOT NULL,
                recommender_title VARCHAR(255),
                recommender_company VARCHAR(255),
                relationship VARCHAR(255),
                content TEXT NOT NULL,
                date DATE,
                linkedin_url VARCHAR(500),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)
        print("Database tables created/verified")
    
    async def clear_existing_data(self):
        """Clear existing data from all tables"""
        tables = [
            'recommendations', 'achievements', 'education', 'certifications',
            'tech_skills', 'experiences', 'projects', 'contact_info',
            'about', 'hero', 'languages'
        ]
        
        for table in tables:
            await self.connection.execute(f"DELETE FROM {table}")
        
        print("Cleared existing data from all tables")
    
    async def seed_languages(self):
        """Seed language data"""
        languages = [
            ('en', 'English', 'English'),
            ('bn', 'Bengali', 'বাংলা')
        ]
        
        for code, name, native_name in languages:
            await self.connection.execute("""
                INSERT INTO languages (code, name, native_name)
                VALUES ($1, $2, $3)
                ON CONFLICT (code) DO UPDATE
                SET name = EXCLUDED.name,
                    native_name = EXCLUDED.native_name,
                    updated_at = CURRENT_TIMESTAMP
            """, code, name, native_name)
        
        print(f"Seeded {len(languages)} languages")
    
    async def seed_hero_data(self):
        """Seed hero section data from resume"""
        hero_data = {
            'id': 'hero',
            'name': 'MD. Alamin Mahamud',
            'title': 'Senior DevOps Engineer | AI Products Engineer | Site Reliability Engineer | Cloud Architect | Platform Engineer',
            'description': 'Dynamic technology leader with 10+ years of expertise in building scalable cloud platforms & leading DevOps + SRE teams. A multi-dimensional thinker with a global mindset, systems-level thinking, and a relentless execution habit.',
            'metrics': {
                'cost_savings': '$1M+',
                'saas_arr': '$20M+',
                'experience': '10+',
                'uptime': '99.99%'
            },
            'social_links': {
                'linkedin': 'https://linkedin.com/in/alaminmahamud',
                'github': 'https://github.com/alamin-mahamud',
                'website': 'https://alamin.rocks',
                'email': 'hello@alamin.rocks'
            }
        }
        
        await self.connection.execute("""
            INSERT INTO hero (id, name, title, description, metrics, social_links)
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (id) DO UPDATE
            SET name = EXCLUDED.name,
                title = EXCLUDED.title,
                description = EXCLUDED.description,
                metrics = EXCLUDED.metrics,
                social_links = EXCLUDED.social_links,
                updated_at = CURRENT_TIMESTAMP
        """, 
            hero_data['id'],
            hero_data['name'],
            hero_data['title'],
            hero_data['description'],
            hero_data['metrics'],
            hero_data['social_links']
        )
        
        print("Seeded hero data")
    
    async def seed_about_data(self):
        """Seed about section data"""
        about_data = {
            'id': 'about',
            'bio': """I'm a strategic technology leader dedicated to architecting and scaling innovative cloud-native solutions for global enterprises, with a strong entrepreneurial spirit that drives startup growth. Over the past ten years, I've successfully built next-generation Event driven SaaS platforms, led transformative DevOps and SRE initiatives, and consistently delivered measurable impact.

My passion lies at the intersection of technology innovation and strategic business transformation. I am committed to empowering enterprises and startups alike—driving digital transformation with a blend of technical excellence and entrepreneurial insight.""",
            'skills': [
                'Cloud Architecture', 'DevOps', 'Site Reliability Engineering',
                'Platform Engineering', 'AI/ML Integration', 'Kubernetes',
                'Infrastructure as Code', 'System Design', 'Team Leadership'
            ],
            'interests': [
                'Cloud Native Technologies', 'Open Source Contribution',
                'Technical Content Creation', 'Mentorship', 'Islamic Finance',
                'Entrepreneurship', 'Community Building'
            ],
            'values': [
                'Excellence (Ihsan)', 'Integrity (Amanah)', 'Service (Khidmah)',
                'Knowledge (Ilm)', 'Innovation (Ibda)', 'Balance (Mizan)'
            ]
        }
        
        await self.connection.execute("""
            INSERT INTO about (id, bio, skills, interests, values)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (id) DO UPDATE
            SET bio = EXCLUDED.bio,
                skills = EXCLUDED.skills,
                interests = EXCLUDED.interests,
                values = EXCLUDED.values,
                updated_at = CURRENT_TIMESTAMP
        """,
            about_data['id'],
            about_data['bio'],
            about_data['skills'],
            about_data['interests'],
            about_data['values']
        )
        
        print("Seeded about data")
    
    async def seed_contact_info(self):
        """Seed contact information"""
        contact_data = {
            'id': 'contact',
            'email': 'hello@alamin.rocks',
            'phone': '+880 168 7060 434',
            'location': 'Dhaka, Bangladesh',
            'website': 'https://alamin.rocks',
            'social_links': {
                'linkedin': 'https://linkedin.com/in/alaminmahamud',
                'github': 'https://github.com/alamin-mahamud',
                'twitter': 'https://twitter.com/alaminmahamud',
                'email': 'alamin.root@gmail.com'
            }
        }
        
        await self.connection.execute("""
            INSERT INTO contact_info (id, email, phone, location, website, social_links)
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (id) DO UPDATE
            SET email = EXCLUDED.email,
                phone = EXCLUDED.phone,
                location = EXCLUDED.location,
                website = EXCLUDED.website,
                social_links = EXCLUDED.social_links,
                updated_at = CURRENT_TIMESTAMP
        """,
            contact_data['id'],
            contact_data['email'],
            contact_data['phone'],
            contact_data['location'],
            contact_data['website'],
            contact_data['social_links']
        )
        
        print("Seeded contact info")
    
    async def seed_experiences(self):
        """Seed work experience data from resume"""
        experiences = [
            {
                'company': 'Kahf Yazılım A.Ş.',
                'position': 'Senior DevOps Engineer',
                'location': 'Istanbul, Turkey',
                'start_date': '2025-05-01',
                'end_date': '2027-07-31',
                'current': False,
                'description': 'On a mission to make online world safe & secure. Migrating the entire infrastructure from Azure to Bare-metal.',
                'achievements': [
                    'Led complete infrastructure migration from Azure to bare-metal servers',
                    'Implemented comprehensive security hardening across all systems',
                    'Designed and deployed cloud-native PostgreSQL clusters',
                    'Built observability stack with Prometheus, Grafana, and Loki'
                ],
                'technologies': ['Bind9', 'CloudNative-PG', 'Kubernetes', 'Ansible', 'Terraform', 'Microsoft Azure', 'Traefik', 'Helm Charts', 'Prometheus', 'Grafana', 'Loki'],
                'impact': {
                    'cost_reduction': '70%',
                    'performance_improvement': '3x',
                    'security_score': '95%'
                }
            },
            {
                'company': 'LeadSync.ai',
                'position': 'Senior Software Engineer - AI Products',
                'location': 'Singapore, Remote',
                'start_date': '2025-05-01',
                'end_date': '2027-07-31',
                'current': False,
                'description': 'Architected and deployed end-to-end integration of Model Customization Platform (MCP) with advanced large language models.',
                'achievements': [
                    'Accelerated time-to-market by 40% through MCP platform integration',
                    'Boosted qualified lead discovery by 25% with AI-driven lead scoring',
                    'Implemented semantic enrichment and personalized outreach recommendations',
                    'Built scalable LLM integration framework for sales pipeline'
                ],
                'technologies': ['MCP Protocol', 'LLM Integration', 'AI-SDK', 'TypeScript', 'PostgreSQL', 'Nest.JS', 'Next.JS'],
                'impact': {
                    'time_to_market': '40% faster',
                    'lead_discovery': '25% increase',
                    'conversion_rate': '35% improvement'
                }
            },
            {
                'company': 'BriteCore Inc',
                'position': 'Senior Platform Engineer & SRE',
                'location': 'Springfield, MO, USA',
                'start_date': '2022-02-01',
                'end_date': '2025-01-31',
                'current': False,
                'description': 'Led cloud infrastructure and platform engineering for enterprise SaaS platform.',
                'achievements': [
                    'Generated $20M+ ARR by designing highly available SaaS platforms',
                    'Cut $1M+ cloud bill through cost optimization initiatives',
                    'Eliminated 30% of production brownouts through optimization',
                    'Accelerated development cycles by 35% with CI/CD pipelines',
                    'Attained SOC2 compliance with 60% vulnerability reduction',
                    'Neutralized DDoS attacks blocking thousands of malicious requests daily',
                    'Streamlined infrastructure provisioning by 80% with Terraform',
                    'Enhanced production visibility reducing MTTD by 80%'
                ],
                'technologies': ['AWS', 'Terraform', 'Kubernetes', 'GitHub Actions', 'DataDog', 'Python', 'Go'],
                'impact': {
                    'arr_generated': '$20M+',
                    'cost_savings': '$1M+',
                    'uptime': '99.99%',
                    'deployment_speed': '35% faster'
                }
            },
            {
                'company': 'AK2 Tech',
                'position': 'Co-Founder & CSO',
                'location': 'Dhaka, Bangladesh',
                'start_date': '2024-08-01',
                'end_date': '2025-04-30',
                'current': False,
                'description': 'Building next-generation AI-powered solutions to assist on-call support.',
                'achievements': [
                    'Spearheaded product strategy and GTM securing initial customer traction',
                    'Grew internal team to 10+ members across 3 time zones',
                    'Established partnerships in Bangladesh and Southeast Asia',
                    'Led fundraising efforts for pre-seed round'
                ],
                'technologies': ['AI/ML', 'Python', 'FastAPI', 'React', 'PostgreSQL'],
                'impact': {
                    'team_growth': '10+ members',
                    'market_reach': '2 countries',
                    'customer_base': 'Initial traction achieved'
                }
            },
            {
                'company': 'Dark Knight Technologies',
                'position': 'Founder, Platform Architect',
                'location': 'Dhaka, Bangladesh',
                'start_date': '2023-11-01',
                'end_date': None,
                'current': True,
                'description': 'Empowering businesses by building highly scalable, fault-tolerant applications with robust cybersecurity.',
                'achievements': [
                    'Architected enterprise-grade platform solutions',
                    'Implemented comprehensive security frameworks',
                    'Built scalable infrastructure for multiple clients',
                    'Established technology consulting practice'
                ],
                'technologies': ['Cloud Architecture', 'Security', 'DevOps', 'Kubernetes'],
                'impact': {
                    'clients_served': '5+',
                    'uptime': '99.99%',
                    'security_incidents': '0'
                }
            },
            {
                'company': 'Source Code Podcast',
                'position': 'Founder & Host',
                'location': 'Remote',
                'start_date': '2025-03-01',
                'end_date': None,
                'current': True,
                'description': 'Creating technical education content and interviewing industry experts.',
                'achievements': [
                    'Launched technical podcast focused on cloud and DevOps',
                    'Interviewed industry leaders and experts',
                    'Built community of technical professionals',
                    'Created educational content for aspiring engineers'
                ],
                'technologies': ['Content Creation', 'Audio Production', 'Community Building'],
                'impact': {
                    'episodes': '20+',
                    'listeners': '5K+',
                    'community_size': '1K+'
                }
            }
        ]
        
        for exp in experiences:
            await self.connection.execute("""
                INSERT INTO experiences (
                    company, position, location, start_date, end_date, current,
                    description, achievements, technologies, impact
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            """,
                exp['company'],
                exp['position'],
                exp['location'],
                exp['start_date'],
                exp['end_date'],
                exp['current'],
                exp['description'],
                exp['achievements'],
                exp['technologies'],
                exp['impact']
            )
        
        print(f"Seeded {len(experiences)} experiences")
    
    async def seed_projects(self):
        """Seed project data"""
        projects = [
            {
                'id': 'mcp-platform',
                'title': 'AI-Powered Model Customization Platform (MCP)',
                'description': 'Revolutionary LLM integration platform that accelerated time-to-market by 40% and boosted qualified lead discovery by 25%.',
                'long_description': 'End-to-end integration platform for advanced large language models featuring semantic enrichment, personalized AI-driven recommendations, and custom model fine-tuning capabilities. Built for enterprise-scale deployment with real-time inference optimization.',
                'technologies': ['MCP Protocol', 'LLM Integration', 'AI-SDK', 'TypeScript', 'PostgreSQL', 'Nest.JS', 'Next.JS', 'Python', 'TensorFlow'],
                'github_url': 'https://github.com/leadsync-ai/mcp-platform',
                'live_url': 'https://leadsync.ai/',
                'featured': True,
                'category': 'AI/ML',
                'impact': {
                    'time_to_market': '40% faster',
                    'lead_discovery': '25% boost',
                    'enterprise_clients': '50+'
                },
                'ai_powered': True
            },
            {
                'id': 'homelab',
                'title': 'HomeLab: GitOps Infrastructure',
                'description': 'Production-grade homelab automation framework with Kubernetes orchestration and Infrastructure as Code.',
                'long_description': 'Comprehensive homelab management system featuring GitOps workflows, automated service deployment, monitoring stack integration, and disaster recovery mechanisms. Supports multi-cloud deployment and hybrid infrastructure management.',
                'technologies': ['Terraform', 'Kubernetes', 'Ansible', 'GitOps', 'ArgoCD', 'Prometheus', 'Grafana', 'Traefik'],
                'github_url': 'https://github.com/alamin-mahamud/homelab',
                'demo_url': 'https://demo.homelab.alamin.rocks/',
                'featured': True,
                'category': 'Infrastructure',
                'impact': {
                    'deployment_speed': '80% faster',
                    'zero_downtime': 'True',
                    'automation_level': '95%'
                },
                'ai_powered': False
            },
            {
                'id': 'alexandria',
                'title': 'Alexandria: Multi-Cloud IaC Library',
                'description': 'Terraform modules library for enterprise-grade multi-cloud deployments across AWS, GCP, and Azure.',
                'long_description': 'Comprehensive Infrastructure as Code library providing reusable Terraform modules for complex cloud architectures. Features automated compliance checking, cost estimation, and security best practices enforcement.',
                'technologies': ['Terraform', 'AWS', 'GCP', 'Azure', 'Infrastructure as Code', 'Compliance', 'Security'],
                'github_url': 'https://github.com/alamin-mahamud/alexandria',
                'featured': True,
                'category': 'Infrastructure',
                'impact': {
                    'provisioning_speed': '60% faster',
                    'reusability': '200+ modules',
                    'enterprise_users': '50+'
                },
                'ai_powered': False
            },
            {
                'id': 'alteryouth',
                'title': 'AlterYouth: Social Impact Platform',
                'description': 'Blockchain-powered scholarship platform connecting global donors with students in need.',
                'long_description': 'Revolutionary C2C scholarship platform integrating digital banking, blockchain transparency, and AI-powered student matching. Features automated fund distribution, impact tracking, and community building tools.',
                'technologies': ['Full-Stack Development', 'Blockchain', 'Digital Banking', 'Payment Processing', 'React', 'Node.js'],
                'github_url': 'https://github.com/alamin-mahamud/alteryouth',
                'live_url': 'https://alteryouth.com/',
                'featured': True,
                'category': 'Social Impact',
                'impact': {
                    'students_helped': '10K+',
                    'scholarships_distributed': '$500K+',
                    'countries_reached': '5+'
                },
                'ai_powered': True
            },
            {
                'id': 'cloud-optimizer',
                'title': 'Cloud Cost Optimization Engine',
                'description': 'AI-driven cost optimization system that saved $1M+ in cloud expenses across 50+ enterprise clients.',
                'long_description': 'Intelligent cloud resource optimization platform using machine learning to predict usage patterns, automatically rightsizing instances, and implementing cost-saving strategies. Features real-time monitoring, predictive scaling, and automated resource lifecycle management.',
                'technologies': ['Python', 'AWS', 'Terraform', 'Kubernetes', 'Machine Learning', 'Prometheus', 'Grafana', 'DataDog'],
                'github_url': 'https://github.com/alamin-mahamud/cloud-optimizer',
                'featured': True,
                'category': 'DevOps/SRE',
                'impact': {
                    'cost_savings': '$1M+',
                    'clients': '50+',
                    'sla': '99.99%'
                },
                'ai_powered': True
            }
        ]
        
        for project in projects:
            await self.connection.execute("""
                INSERT INTO projects (
                    id, title, description, long_description, technologies,
                    github_url, live_url, demo_url, featured, category,
                    impact, ai_powered
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                ON CONFLICT (id) DO UPDATE
                SET title = EXCLUDED.title,
                    description = EXCLUDED.description,
                    long_description = EXCLUDED.long_description,
                    technologies = EXCLUDED.technologies,
                    github_url = EXCLUDED.github_url,
                    live_url = EXCLUDED.live_url,
                    demo_url = EXCLUDED.demo_url,
                    featured = EXCLUDED.featured,
                    category = EXCLUDED.category,
                    impact = EXCLUDED.impact,
                    ai_powered = EXCLUDED.ai_powered,
                    updated_at = CURRENT_TIMESTAMP
            """,
                project['id'],
                project['title'],
                project['description'],
                project['long_description'],
                project['technologies'],
                project.get('github_url'),
                project.get('live_url'),
                project.get('demo_url'),
                project['featured'],
                project['category'],
                project['impact'],
                project['ai_powered']
            )
        
        print(f"Seeded {len(projects)} projects")
    
    async def seed_tech_skills(self):
        """Seed technical skills data"""
        skills = [
            # Programming Languages
            {'id': 'python', 'name': 'Python', 'category': 'Languages', 'proficiency': 95, 'years_experience': 8, 'projects_count': 50},
            {'id': 'go', 'name': 'Go', 'category': 'Languages', 'proficiency': 85, 'years_experience': 5, 'projects_count': 20},
            {'id': 'typescript', 'name': 'TypeScript', 'category': 'Languages', 'proficiency': 90, 'years_experience': 6, 'projects_count': 30},
            
            # Cloud Platforms
            {'id': 'aws', 'name': 'AWS', 'category': 'Cloud', 'proficiency': 95, 'years_experience': 8, 'projects_count': 40},
            {'id': 'gcp', 'name': 'Google Cloud Platform', 'category': 'Cloud', 'proficiency': 80, 'years_experience': 4, 'projects_count': 15},
            {'id': 'azure', 'name': 'Microsoft Azure', 'category': 'Cloud', 'proficiency': 85, 'years_experience': 5, 'projects_count': 20},
            
            # DevOps & Infrastructure
            {'id': 'kubernetes', 'name': 'Kubernetes', 'category': 'DevOps', 'proficiency': 95, 'years_experience': 7, 'projects_count': 35},
            {'id': 'terraform', 'name': 'Terraform', 'category': 'DevOps', 'proficiency': 95, 'years_experience': 6, 'projects_count': 40},
            {'id': 'docker', 'name': 'Docker', 'category': 'DevOps', 'proficiency': 95, 'years_experience': 8, 'projects_count': 50},
            {'id': 'ansible', 'name': 'Ansible', 'category': 'DevOps', 'proficiency': 85, 'years_experience': 5, 'projects_count': 25},
            
            # Frameworks
            {'id': 'fastapi', 'name': 'FastAPI', 'category': 'Frameworks', 'proficiency': 90, 'years_experience': 4, 'projects_count': 20},
            {'id': 'nestjs', 'name': 'Nest.JS', 'category': 'Frameworks', 'proficiency': 85, 'years_experience': 3, 'projects_count': 15},
            {'id': 'nextjs', 'name': 'Next.JS', 'category': 'Frameworks', 'proficiency': 85, 'years_experience': 4, 'projects_count': 20},
            
            # Databases
            {'id': 'postgresql', 'name': 'PostgreSQL', 'category': 'Databases', 'proficiency': 90, 'years_experience': 8, 'projects_count': 40},
            {'id': 'redis', 'name': 'Redis', 'category': 'Databases', 'proficiency': 85, 'years_experience': 6, 'projects_count': 30},
            {'id': 'elasticsearch', 'name': 'Elasticsearch', 'category': 'Databases', 'proficiency': 80, 'years_experience': 5, 'projects_count': 20},
            
            # Monitoring & Observability
            {'id': 'prometheus', 'name': 'Prometheus', 'category': 'Monitoring', 'proficiency': 90, 'years_experience': 6, 'projects_count': 30},
            {'id': 'grafana', 'name': 'Grafana', 'category': 'Monitoring', 'proficiency': 90, 'years_experience': 6, 'projects_count': 30},
            {'id': 'datadog', 'name': 'DataDog', 'category': 'Monitoring', 'proficiency': 85, 'years_experience': 4, 'projects_count': 20},
            
            # AI/ML
            {'id': 'llm', 'name': 'LLM Integration', 'category': 'AI/ML', 'proficiency': 85, 'years_experience': 2, 'projects_count': 10},
            {'id': 'mcp', 'name': 'MCP Protocol', 'category': 'AI/ML', 'proficiency': 90, 'years_experience': 2, 'projects_count': 5},
        ]
        
        for skill in skills:
            await self.connection.execute("""
                INSERT INTO tech_skills (
                    id, name, category, proficiency, years_experience, projects_count
                )
                VALUES ($1, $2, $3, $4, $5, $6)
                ON CONFLICT (id) DO UPDATE
                SET name = EXCLUDED.name,
                    category = EXCLUDED.category,
                    proficiency = EXCLUDED.proficiency,
                    years_experience = EXCLUDED.years_experience,
                    projects_count = EXCLUDED.projects_count,
                    updated_at = CURRENT_TIMESTAMP
            """,
                skill['id'],
                skill['name'],
                skill['category'],
                skill['proficiency'],
                skill['years_experience'],
                skill['projects_count']
            )
        
        print(f"Seeded {len(skills)} tech skills")
    
    async def seed_education(self):
        """Seed education data"""
        education = [
            {
                'institution': 'Chittagong University of Engineering & Technology',
                'degree': 'Bachelor of Science',
                'field_of_study': 'Mechanical Engineering',
                'start_date': '2013-03-01',
                'end_date': '2017-09-30',
                'location': 'Chittagong, Bangladesh',
                'description': 'Focused on engineering principles, problem-solving, and analytical thinking that laid the foundation for systems thinking in technology.'
            }
        ]
        
        for edu in education:
            await self.connection.execute("""
                INSERT INTO education (
                    institution, degree, field_of_study, start_date, end_date, location, description
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7)
            """,
                edu['institution'],
                edu['degree'],
                edu['field_of_study'],
                edu['start_date'],
                edu['end_date'],
                edu['location'],
                edu['description']
            )
        
        print(f"Seeded {len(education)} education records")
    
    async def seed_certifications(self):
        """Seed certification data"""
        certifications = [
            {
                'name': 'Certified Kubernetes Administrator (CKA)',
                'issuer': 'Cloud Native Computing Foundation',
                'status': 'In Progress',
                'credential_url': 'https://www.cncf.io/certification/cka/'
            },
            {
                'name': 'Observability with Grafana, Prometheus, Loki, Alloy and Tempo',
                'issuer': 'Grafana Labs',
                'issue_date': '2024-06-01',
                'status': 'Completed',
                'credential_url': 'https://grafana.com/training/'
            }
        ]
        
        for cert in certifications:
            await self.connection.execute("""
                INSERT INTO certifications (
                    name, issuer, issue_date, status, credential_url
                )
                VALUES ($1, $2, $3, $4, $5)
            """,
                cert['name'],
                cert['issuer'],
                cert.get('issue_date'),
                cert['status'],
                cert.get('credential_url')
            )
        
        print(f"Seeded {len(certifications)} certifications")
    
    async def seed_achievements(self):
        """Seed achievements data"""
        achievements = [
            {
                'id': 'cost-savings',
                'title': 'Cloud Cost Optimization Champion',
                'description': 'Led initiatives that saved over $1M in cloud infrastructure costs through optimization and efficient resource management',
                'impact': '$1M+ saved',
                'category': 'Cost Optimization',
                'year': 2024,
                'icon': '💰'
            },
            {
                'id': 'saas-revenue',
                'title': 'SaaS Revenue Driver',
                'description': 'Contributed to generating $20M+ in Annual Recurring Revenue through platform reliability and performance',
                'impact': '$20M+ ARR',
                'category': 'Business Impact',
                'year': 2024,
                'icon': '📈'
            },
            {
                'id': 'uptime-excellence',
                'title': 'Reliability Excellence',
                'description': 'Maintained 99.99% uptime across multiple production environments serving 50+ enterprise clients',
                'impact': '99.99% SLA',
                'category': 'Reliability',
                'year': 2024,
                'icon': '🛡️'
            },
            {
                'id': 'soc2-compliance',
                'title': 'SOC2 Compliance Achievement',
                'description': 'Led security initiatives that achieved SOC2 compliance on first attempt with 60% vulnerability reduction',
                'impact': 'First-attempt pass',
                'category': 'Security',
                'year': 2023,
                'icon': '🔒'
            },
            {
                'id': 'hackathon-winner',
                'title': 'International Engineering Innovation Summit Champion',
                'description': 'Won hackathon championship and app fest runner-up for innovative technical solutions',
                'impact': '1st Place',
                'category': 'Innovation',
                'year': 2015,
                'icon': '🏆'
            },
            {
                'id': 'team-growth',
                'title': 'Team Builder & Mentor',
                'description': 'Mentored 50+ engineers and built cross-functional teams across multiple time zones',
                'impact': '50+ mentored',
                'category': 'Leadership',
                'year': 2024,
                'icon': '👥'
            }
        ]
        
        for achievement in achievements:
            await self.connection.execute("""
                INSERT INTO achievements (
                    id, title, description, impact, category, year, icon
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                ON CONFLICT (id) DO UPDATE
                SET title = EXCLUDED.title,
                    description = EXCLUDED.description,
                    impact = EXCLUDED.impact,
                    category = EXCLUDED.category,
                    year = EXCLUDED.year,
                    icon = EXCLUDED.icon,
                    updated_at = CURRENT_TIMESTAMP
            """,
                achievement['id'],
                achievement['title'],
                achievement['description'],
                achievement['impact'],
                achievement['category'],
                achievement['year'],
                achievement['icon']
            )
        
        print(f"Seeded {len(achievements)} achievements")
    
    async def seed_data(self):
        """Seed all data"""
        await self.seed_languages()
        await self.seed_hero_data()
        await self.seed_about_data()
        await self.seed_contact_info()
        await self.seed_experiences()
        await self.seed_projects()
        await self.seed_tech_skills()
        await self.seed_education()
        await self.seed_certifications()
        await self.seed_achievements()
        
        print("\nProfessional data seeding completed successfully!")


async def main():
    """Main function"""
    seeder = ProfessionalSeeder()
    
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