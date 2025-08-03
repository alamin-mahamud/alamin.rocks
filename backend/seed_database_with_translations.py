#!/usr/bin/env python3
"""
Database seed script for Alamin Rocks Portfolio with Translation Support
Populates the database with static data extracted from frontend components
and adds comprehensive translation support for multilingual content.
"""

import asyncio
import json
import os
import sys
from datetime import datetime
from typing import List, Dict, Any, Optional

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


class TranslationSeeder:
    def __init__(self):
        self.connection = None
        
    async def connect(self):
        """Connect to the PostgreSQL database"""
        try:
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
            
    async def create_translation_tables(self):
        """Create translation-enabled database tables"""
        queries = [
            # Languages table
            """
            CREATE TABLE IF NOT EXISTS languages (
                code VARCHAR(10) PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                native_name VARCHAR(100) NOT NULL,
                enabled BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """,
            
            # Generic translations table for any translatable content
            """
            CREATE TABLE IF NOT EXISTS translations (
                id SERIAL PRIMARY KEY,
                table_name VARCHAR(100) NOT NULL,
                record_id VARCHAR(100) NOT NULL,
                field_name VARCHAR(100) NOT NULL,
                language_code VARCHAR(10) NOT NULL REFERENCES languages(code),
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(table_name, record_id, field_name, language_code)
            )
            """,
            
            # Translation keys for UI elements
            """
            CREATE TABLE IF NOT EXISTS translation_keys (
                key VARCHAR(200) PRIMARY KEY,
                category VARCHAR(100) NOT NULL,
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """,
            
            # Translation values for UI elements
            """
            CREATE TABLE IF NOT EXISTS translation_values (
                id SERIAL PRIMARY KEY,
                key VARCHAR(200) NOT NULL REFERENCES translation_keys(key),
                language_code VARCHAR(10) NOT NULL REFERENCES languages(code),
                value TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(key, language_code)
            )
            """,
            
            # Extended hero table
            """
            CREATE TABLE IF NOT EXISTS hero (
                id VARCHAR PRIMARY KEY,
                name VARCHAR NOT NULL,
                metrics JSONB DEFAULT '{}',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """,
            
            # Extended about table
            """
            CREATE TABLE IF NOT EXISTS about (
                id VARCHAR PRIMARY KEY,
                skills TEXT[] DEFAULT '{}',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """,
            
            # Contact info table (mostly non-translatable)
            """
            CREATE TABLE IF NOT EXISTS contact_info (
                id VARCHAR PRIMARY KEY,
                email VARCHAR NOT NULL,
                phone VARCHAR,
                social_links JSONB DEFAULT '{}',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """,
            
            # Extended projects table
            """
            CREATE TABLE IF NOT EXISTS projects (
                id VARCHAR PRIMARY KEY,
                technologies TEXT[] DEFAULT '{}',
                github_url VARCHAR,
                live_url VARCHAR,
                demo_url VARCHAR,
                image_url VARCHAR,
                featured BOOLEAN DEFAULT FALSE,
                impact JSONB DEFAULT '{}',
                stats JSONB DEFAULT '{}',
                status VARCHAR DEFAULT 'completed',
                ai_powered BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """,
            
            # Extended tech skills table
            """
            CREATE TABLE IF NOT EXISTS tech_skills (
                id VARCHAR PRIMARY KEY,
                name VARCHAR NOT NULL,
                level INTEGER CHECK (level >= 0 AND level <= 100),
                years_exp INTEGER,
                icon VARCHAR,
                color VARCHAR,
                projects INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """,
            
            # Extended achievements table
            """
            CREATE TABLE IF NOT EXISTS achievements (
                id VARCHAR PRIMARY KEY,
                value VARCHAR NOT NULL,
                icon VARCHAR,
                color VARCHAR,
                percentage INTEGER DEFAULT 0,
                category VARCHAR,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """,
            
            # Extended recommendations table
            """
            CREATE TABLE IF NOT EXISTS recommendations (
                id VARCHAR PRIMARY KEY,
                recommender_name VARCHAR NOT NULL,
                recommender_title VARCHAR,
                recommender_company VARCHAR,
                recommender_image VARCHAR,
                relationship VARCHAR,
                date TIMESTAMP,
                skills_mentioned TEXT[] DEFAULT '{}',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """,
            
            # Extended experiences table
            """
            CREATE TABLE IF NOT EXISTS experiences (
                id VARCHAR PRIMARY KEY,
                company VARCHAR NOT NULL,
                duration VARCHAR NOT NULL,
                current BOOLEAN DEFAULT FALSE,
                technologies TEXT[] DEFAULT '{}',
                website VARCHAR,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """,
            
            # Extended education table
            """
            CREATE TABLE IF NOT EXISTS education (
                id VARCHAR PRIMARY KEY,
                institution VARCHAR NOT NULL,
                duration VARCHAR,
                gpa FLOAT,
                relevant_courses TEXT[] DEFAULT '{}',
                activities TEXT[] DEFAULT '{}',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """,
            
            # Extended certifications table
            """
            CREATE TABLE IF NOT EXISTS certifications (
                id VARCHAR PRIMARY KEY,
                organization VARCHAR NOT NULL,
                status VARCHAR,
                year VARCHAR,
                credential_id VARCHAR,
                expiry_date VARCHAR,
                skills TEXT[] DEFAULT '{}',
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
                
        print("Translation-enabled database tables created/verified")
        
    async def seed_languages(self):
        """Seed supported languages"""
        languages = [
            {"code": "en", "name": "English", "native_name": "English", "enabled": True},
            {"code": "bn", "name": "Bengali", "native_name": "বাংলা", "enabled": True}
        ]
        
        for lang in languages:
            await self.connection.execute("""
                INSERT INTO languages (code, name, native_name, enabled, created_at, updated_at)
                VALUES ($1, $2, $3, $4, $5, $6)
                ON CONFLICT (code) DO UPDATE SET
                    name = EXCLUDED.name,
                    native_name = EXCLUDED.native_name,
                    enabled = EXCLUDED.enabled,
                    updated_at = EXCLUDED.updated_at
            """, lang['code'], lang['name'], lang['native_name'], 
                lang['enabled'], datetime.utcnow(), datetime.utcnow())
        
        print(f"Seeded {len(languages)} languages")
        
    async def seed_translation_keys(self):
        """Seed UI translation keys from frontend translation files"""
        translation_keys = [
            # Navigation
            {"key": "nav.home", "category": "navigation", "description": "Home navigation link"},
            {"key": "nav.about", "category": "navigation", "description": "About navigation link"},
            {"key": "nav.experience", "category": "navigation", "description": "Experience navigation link"},
            {"key": "nav.projects", "category": "navigation", "description": "Projects navigation link"},
            {"key": "nav.contact", "category": "navigation", "description": "Contact navigation link"},
            
            # Hero section
            {"key": "hero.greeting", "category": "hero", "description": "Hero greeting text"},
            {"key": "hero.iam", "category": "hero", "description": "Hero I am text"},
            {"key": "hero.cta", "category": "hero", "description": "Hero call to action"},
            
            # About section
            {"key": "about.title", "category": "about", "description": "About section title"},
            {"key": "about.quick_facts", "category": "about", "description": "Quick facts section title"},
            {"key": "about.skills", "category": "about", "description": "Skills section title"},
            
            # Experience section
            {"key": "experience.title", "category": "experience", "description": "Experience section title"},
            {"key": "experience.current", "category": "experience", "description": "Current position indicator"},
            {"key": "experience.technologies", "category": "experience", "description": "Technologies used label"},
            
            # Projects section
            {"key": "projects.title", "category": "projects", "description": "Projects section title"},
            {"key": "projects.featured", "category": "projects", "description": "Featured projects label"},
            {"key": "projects.all", "category": "projects", "description": "All projects label"},
            {"key": "projects.github", "category": "projects", "description": "GitHub link text"},
            {"key": "projects.live", "category": "projects", "description": "Live demo link text"},
            
            # Tech stack
            {"key": "techstack.title", "category": "techstack", "description": "Tech stack section title"},
            {"key": "techstack.programming", "category": "techstack", "description": "Programming category"},
            {"key": "techstack.cloud", "category": "techstack", "description": "Cloud category"},
            {"key": "techstack.database", "category": "techstack", "description": "Database category"},
            {"key": "techstack.monitoring", "category": "techstack", "description": "Monitoring category"},
            {"key": "techstack.system", "category": "techstack", "description": "System category"},
            
            # Contact section
            {"key": "contact.title", "category": "contact", "description": "Contact section title"},
            {"key": "contact.send", "category": "contact", "description": "Send button text"},
            {"key": "contact.sending", "category": "contact", "description": "Sending state text"},
            {"key": "contact.success", "category": "contact", "description": "Success message"},
            
            # Common
            {"key": "common.loading", "category": "common", "description": "Loading text"},
            {"key": "common.error", "category": "common", "description": "Error message"},
            {"key": "common.retry", "category": "common", "description": "Retry button text"},
            {"key": "common.close", "category": "common", "description": "Close button text"},
        ]
        
        for key_data in translation_keys:
            await self.connection.execute("""
                INSERT INTO translation_keys (key, category, description, created_at, updated_at)
                VALUES ($1, $2, $3, $4, $5)
                ON CONFLICT (key) DO UPDATE SET
                    category = EXCLUDED.category,
                    description = EXCLUDED.description,
                    updated_at = EXCLUDED.updated_at
            """, key_data['key'], key_data['category'], key_data['description'],
                datetime.utcnow(), datetime.utcnow())
        
        print(f"Seeded {len(translation_keys)} translation keys")
        
    async def seed_translation_values(self):
        """Seed UI translation values"""
        translations = {
            "en": {
                # Navigation
                "nav.home": "Home",
                "nav.about": "About",
                "nav.experience": "Experience", 
                "nav.projects": "Projects",
                "nav.contact": "Contact",
                
                # Hero
                "hero.greeting": "Hi, I'm",
                "hero.iam": "I am a",
                "hero.cta": "Get In Touch",
                
                # About
                "about.title": "About Me",
                "about.quick_facts": "Quick Facts",
                "about.skills": "Skills",
                
                # Experience
                "experience.title": "Experience",
                "experience.current": "Present",
                "experience.technologies": "Technologies",
                
                # Projects
                "projects.title": "Projects",
                "projects.featured": "Featured Projects",
                "projects.all": "All Projects",
                "projects.github": "View on GitHub",
                "projects.live": "Live Demo",
                
                # Tech stack
                "techstack.title": "Tech Stack",
                "techstack.programming": "Programming",
                "techstack.cloud": "Cloud",
                "techstack.database": "Database",
                "techstack.monitoring": "Monitoring",
                "techstack.system": "System",
                
                # Contact
                "contact.title": "Contact Me",
                "contact.send": "Send Message",
                "contact.sending": "Sending...",
                "contact.success": "Message sent successfully!",
                
                # Common
                "common.loading": "Loading...",
                "common.error": "An error occurred",
                "common.retry": "Retry",
                "common.close": "Close",
            },
            "bn": {
                # Navigation
                "nav.home": "হোম",
                "nav.about": "সম্পর্কে",
                "nav.experience": "অভিজ্ঞতা",
                "nav.projects": "প্রজেক্ট",
                "nav.contact": "যোগাযোগ",
                
                # Hero
                "hero.greeting": "হ্যালো, আমি",
                "hero.iam": "আমি একজন",
                "hero.cta": "যোগাযোগ করুন",
                
                # About
                "about.title": "আমার সম্পর্কে",
                "about.quick_facts": "দ্রুত তথ্য",
                "about.skills": "দক্ষতা",
                
                # Experience
                "experience.title": "কর্মঅভিজ্ঞতা",
                "experience.current": "বর্তমান",
                "experience.technologies": "প্রযুক্তি",
                
                # Projects
                "projects.title": "প্রজেক্ট",
                "projects.featured": "বিশেষ প্রজেক্ট",
                "projects.all": "সকল প্রজেক্ট",
                "projects.github": "গিটহাবে দেখুন",
                "projects.live": "লাইভ ডেমো",
                
                # Tech stack
                "techstack.title": "টেক স্ট্যাক",
                "techstack.programming": "প্রোগ্রামিং",
                "techstack.cloud": "ক্লাউড",
                "techstack.database": "ডাটাবেস",
                "techstack.monitoring": "মনিটরিং",
                "techstack.system": "সিস্টেম",
                
                # Contact
                "contact.title": "যোগাযোগ করুন",
                "contact.send": "বার্তা পাঠান",
                "contact.sending": "পাঠানো হচ্ছে...",
                "contact.success": "বার্তা সফলভাবে পাঠানো হয়েছে!",
                
                # Common
                "common.loading": "লোড হচ্ছে...",
                "common.error": "একটি ত্রুটি ঘটেছে",
                "common.retry": "পুনরায় চেষ্টা করুন",
                "common.close": "বন্ধ করুন",
            }
        }
        
        for lang_code, lang_translations in translations.items():
            for key, value in lang_translations.items():
                await self.connection.execute("""
                    INSERT INTO translation_values (key, language_code, value, created_at, updated_at)
                    VALUES ($1, $2, $3, $4, $5)
                    ON CONFLICT (key, language_code) DO UPDATE SET
                        value = EXCLUDED.value,
                        updated_at = EXCLUDED.updated_at
                """, key, lang_code, value, datetime.utcnow(), datetime.utcnow())
        
        total_translations = sum(len(translations) for translations in translations.values())
        print(f"Seeded {total_translations} translation values")
        
    async def add_translation(self, table_name: str, record_id: str, field_name: str, 
                             language_code: str, content: str):
        """Helper method to add a translation"""
        await self.connection.execute("""
            INSERT INTO translations (table_name, record_id, field_name, language_code, content, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (table_name, record_id, field_name, language_code) DO UPDATE SET
                content = EXCLUDED.content,
                updated_at = EXCLUDED.updated_at
        """, table_name, record_id, field_name, language_code, content, 
            datetime.utcnow(), datetime.utcnow())
    
    async def seed_content_data(self):
        """Seed main content data with translations"""
        now = datetime.utcnow()
        
        # Seed Hero data
        hero_id = "hero"
        await self.connection.execute("""
            INSERT INTO hero (id, name, metrics, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (id) DO UPDATE SET
                name = EXCLUDED.name,
                metrics = EXCLUDED.metrics,
                updated_at = EXCLUDED.updated_at
        """, hero_id, "Alamin Mahamud", json.dumps({
            "cost_savings": "$1.2M+",
            "saas_arr": "$20M+", 
            "experience": "10+",
            "users_served": "100K+",
            "uptime_sla": "99.99%",
            "total_impact": "$21.2M+"
        }), now, now)
        
        # Hero translations
        hero_translations = {
            "en": {
                "roles": json.dumps([
                    "Senior DevOps Engineer",
                    "AI Products Engineer", 
                    "Site Reliability Engineer",
                    "Cloud Architect",
                    "Platform Engineer",
                    "Co-Founder & CSO",
                    "Founder & Host"
                ]),
                "description": "Strategic technology leader with 10+ years of expertise in building scalable cloud platforms & leading DevOps + SRE teams. Currently working as Senior DevOps Engineer at Kahf Yazılım A.Ş. and Senior Software Engineer at LeadSync.ai."
            },
            "bn": {
                "roles": json.dumps([
                    "সিনিয়র ডেভঅপস ইঞ্জিনিয়ার",
                    "এআই প্রোডাক্ট ইঞ্জিনিয়ার",
                    "সাইট রিলায়েবিলিটি ইঞ্জিনিয়ার",
                    "ক্লাউড আর্কিটেক্ট",
                    "প্ল্যাটফর্ম ইঞ্জিনিয়ার",
                    "সহ-প্রতিষ্ঠাতা ও সিএসও",
                    "প্রতিষ্ঠাতা ও হোস্ট"
                ]),
                "description": "১০+ বছরের অভিজ্ঞতা সম্পন্ন কৌশলগত প্রযুক্তি নেতা যিনি স্কেলেবল ক্লাউড প্ল্যাটফর্ম তৈরি এবং ডেভঅপস + এসআরই টিম নেতৃত্বে বিশেষজ্ঞ। বর্তমানে কাহফ ইয়াজলিম এ.শ.-এ সিনিয়র ডেভঅপস ইঞ্জিনিয়ার এবং লিডসিঙ্ক.এআই-এ সিনিয়র সফটওয়্যার ইঞ্জিনিয়ার হিসেবে কাজ করছেন।"
            }
        }
        
        for lang, translations in hero_translations.items():
            for field, content in translations.items():
                await self.add_translation("hero", hero_id, field, lang, content)
        
        print("Seeded hero data with translations")
        
        # Seed About data
        about_id = "about"
        await self.connection.execute("""
            INSERT INTO about (id, skills, created_at, updated_at)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (id) DO UPDATE SET
                skills = EXCLUDED.skills,
                updated_at = EXCLUDED.updated_at
        """, about_id, [
            "Python", "Go", "TypeScript", "Kubernetes", "AWS/GCP/Azure", "Terraform", 
            "Docker", "PostgreSQL", "Redis", "FastAPI", "Nest.JS", "Next.JS", 
            "Prometheus/Grafana", "Ansible", "Jenkins/GitHub Actions", "Elasticsearch"
        ], now, now)
        
        # About translations
        about_translations = {
            "en": {
                "title": "About Me",
                "description": json.dumps([
                    "I'm a **strategic technology leader** dedicated to building scalable cloud platforms and leading high-performing DevOps + SRE teams. With over 10 years of hands-on experience, I've architected systems that serve millions of users while maintaining 99.99% uptime.",
                    "Currently serving dual roles as **Senior DevOps Engineer** at Kahf Yazılım A.Ş. and **Senior Software Engineer** at LeadSync.ai, where I'm pioneering AI-powered infrastructure solutions and leading digital transformation initiatives.",
                    "My expertise spans the complete technology stack - from infrastructure automation and cloud architecture to AI/ML platform engineering. I've generated $20M+ in ARR through platform improvements and achieved $1M+ in cost savings through intelligent optimization.",
                    "As a **thought leader** in the DevOps community, I host the Source Code Podcast, reaching 1000+ developers monthly with insights on modern software engineering practices, cloud-native technologies, and emerging AI trends.",
                    "I'm passionate about **empowering teams** through technology, building fault-tolerant systems, and creating platforms that enable businesses to scale efficiently while maintaining security and reliability standards."
                ]),
                "quick_facts": json.dumps({
                    "location": "Istanbul, Turkey / Remote",
                    "experience": "10+ Years",
                    "focus": "DevOps & SRE",
                    "interests": "Cloud Architecture, AI, Podcasting"
                })
            },
            "bn": {
                "title": "আমার সম্পর্কে",
                "description": json.dumps([
                    "আমি একজন **কৌশলগত প্রযুক্তি নেতা** যিনি স্কেলেবল ক্লাউড প্ল্যাটফর্ম তৈরি এবং উচ্চ-পারফরমিং ডেভঅপস + এসআরই টিমের নেতৃত্বে নিবেদিত। ১০ বছরের বেশি হ্যান্ডস-অন অভিজ্ঞতার সাথে, আমি এমন সিস্টেম ডিজাইন করেছি যা লক্ষ লক্ষ ব্যবহারকারীকে সেবা দেয় এবং ৯৯.৯৯% আপটাইম বজায় রাখে।",
                    "বর্তমানে **কাহফ ইয়াজলিম এ.শ.**-এ সিনিয়র ডেভঅপস ইঞ্জিনিয়ার এবং **লিডসিঙ্ক.এআই**-এ সিনিয়র সফটওয়্যার ইঞ্জিনিয়ার হিসেবে দ্বৈত ভূমিকায় কাজ করছি, যেখানে আমি এআই-চালিত ইনফ্রাস্ট্রাকচার সমাধানের পথপ্রদর্শক এবং ডিজিটাল রূপান্তর উদ্যোগের নেতৃত্ব দিচ্ছি।",
                    "আমার দক্ষতা সম্পূর্ণ প্রযুক্তি স্ট্যাক জুড়ে বিস্তৃত - ইনফ্রাস্ট্রাকচার অটোমেশন এবং ক্লাউড আর্কিটেকচার থেকে এআই/এমএল প্ল্যাটফর্ম ইঞ্জিনিয়ারিং পর্যন্ত। আমি প্ল্যাটফর্ম উন্নতির মাধ্যমে $২০M+ ARR তৈরি করেছি এবং বুদ্ধিমান অপ্টিমাইজেশনের মাধ্যমে $১M+ খরচ সাশ্রয় অর্জন করেছি।",
                    "ডেভঅপস কমিউনিটিতে একজন **চিন্তা নেতা** হিসেবে, আমি সোর্স কোড পডকাস্ট হোস্ট করি, আধুনিক সফটওয়্যার ইঞ্জিনিয়ারিং অনুশীলন, ক্লাউড-নেটিভ প্রযুক্তি এবং উদীয়মান এআই ট্রেন্ডের উপর অন্তর্দৃষ্টি নিয়ে মাসিক ১০০০+ ডেভেলপারদের কাছে পৌঁছাই।",
                    "আমি প্রযুক্তির মাধ্যমে **টিমকে ক্ষমতায়ন** করতে, ফল্ট-টলারেন্ট সিস্টেম তৈরি করতে এবং এমন প্ল্যাটফর্ম তৈরি করতে আগ্রহী যা ব্যবসায়িকদের নিরাপত্তা ও নির্ভরযোগ্যতার মান বজায় রেখে দক্ষতার সাথে স্কেল করতে সক্ষম করে।"
                ]),
                "quick_facts": json.dumps({
                    "location": "ইস্তাম্বুল, তুরস্ক / রিমোট",
                    "experience": "১০+ বছর",
                    "focus": "ডেভঅপস ও এসআরই",
                    "interests": "ক্লাউড আর্কিটেকচার, এআই, পডকাস্টিং"
                })
            }
        }
        
        for lang, translations in about_translations.items():
            for field, content in translations.items():
                await self.add_translation("about", about_id, field, lang, content)
        
        print("Seeded about data with translations")
        
        # Seed Contact Info
        contact_id = "contact"
        await self.connection.execute("""
            INSERT INTO contact_info (id, email, phone, social_links, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (id) DO UPDATE SET
                email = EXCLUDED.email,
                phone = EXCLUDED.phone,
                social_links = EXCLUDED.social_links,
                updated_at = EXCLUDED.updated_at
        """, contact_id, "hello@alamin.rocks", "+880 168 7060 434", json.dumps({
            "github": "https://github.com/alamin-mahamud",
            "linkedin": "https://linkedin.com/in/alamin-mahamud",
            "twitter": "https://twitter.com/alamin_rocks"
        }), now, now)
        
        # Contact translations (only location needs translation)
        contact_translations = {
            "en": {"location": "Istanbul, Turkey"},
            "bn": {"location": "ইস্তাম্বুল, তুরস্ক"}
        }
        
        for lang, translations in contact_translations.items():
            for field, content in translations.items():
                await self.add_translation("contact_info", contact_id, field, lang, content)
        
        print("Seeded contact info with translations")
        
        # Seed sample projects with translations
        await self._seed_projects_with_translations(now)
        
        # Seed tech skills with translations  
        await self._seed_tech_skills_with_translations(now)
        
        # Seed achievements with translations
        await self._seed_achievements_with_translations(now)
        
        # Seed experiences with translations
        await self._seed_experiences_with_translations(now)
        
        print("Content seeding with translations completed!")
        
    async def _seed_projects_with_translations(self, now):
        """Seed projects data with translations"""
        projects = [
            {
                "id": "mcp-platform",
                "technologies": ["MCP Protocol", "LLM Integration", "AI-SDK", "TypeScript", "PostgreSQL", "Nest.JS", "Next.JS", "Python", "TensorFlow"],
                "github_url": "https://github.com/leadsync-ai/mcp-platform",
                "live_url": "https://leadsync.ai",
                "demo_url": "https://demo.leadsync.ai",
                "featured": True,
                "impact": json.dumps({
                    "users": 50000,
                    "performance": "40% faster time-to-market",
                    "savings": "$2M+ in development costs"
                }),
                "stats": json.dumps({
                    "stars": 342,
                    "forks": 67,
                    "commits": 1240,
                    "contributors": 8
                }),
                "status": "maintained",
                "ai_powered": True
            },
            {
                "id": "cloud-optimizer",
                "technologies": ["Python", "AWS", "Terraform", "CloudWatch", "Lambda", "EventBridge", "PostgreSQL", "React"],
                "github_url": "https://github.com/alamin-mahamud/cloud-optimizer",
                "featured": True,
                "impact": json.dumps({
                    "users": 1000,
                    "performance": "99.99% uptime maintained",
                    "savings": "$1M+ annual cost reduction"
                }),
                "stats": json.dumps({
                    "stars": 156,
                    "forks": 32,
                    "commits": 890,
                    "contributors": 5
                }),
                "status": "completed",
                "ai_powered": False
            }
        ]
        
        project_translations = {
            "mcp-platform": {
                "en": {
                    "title": "AI-Powered Model Customization Platform (MCP)",
                    "description": "Revolutionary LLM integration platform that accelerated time-to-market by 40% and boosted qualified lead discovery by 25%.",
                    "long_description": "End-to-end integration platform for advanced large language models featuring semantic enrichment, personalized AI-driven recommendations, and custom model fine-tuning capabilities. Built for enterprise-scale deployment with real-time inference optimization.",
                    "category": "AI/ML"
                },
                "bn": {
                    "title": "এআই-চালিত মডেল কাস্টমাইজেশন প্ল্যাটফর্ম (MCP)",
                    "description": "বিপ্লবী LLM ইন্টিগ্রেশন প্ল্যাটফর্ম যা টাইম-টু-মার্কেট ৪০% ত্বরান্বিত করেছে এবং যোগ্য লিড আবিষ্কার ২৫% বৃদ্ধি করেছে।",
                    "long_description": "উন্নত বড় ভাষা মডেলের জন্য এন্ড-টু-এন্ড ইন্টিগ্রেশন প্ল্যাটফর্ম যাতে রয়েছে সিমান্টিক এনরিচমেন্ট, ব্যক্তিগতকৃত এআই-চালিত সুপারিশ, এবং কাস্টম মডেল ফাইন-টিউনিং ক্ষমতা। রিয়েল-টাইম ইনফারেন্স অপ্টিমাইজেশন সহ এন্টারপ্রাইজ-স্কেল ডেপ্লয়মেন্টের জন্য তৈরি।",
                    "category": "এআই/এমএল"
                }
            },
            "cloud-optimizer": {
                "en": {
                    "title": "Cloud Infrastructure Optimization Platform",
                    "description": "Reduced AWS costs by $1M+ annually through intelligent resource optimization and automated cost management.",
                    "long_description": "Enterprise-scale cloud cost optimization platform that analyzes resource utilization patterns, implements automated rightsizing, and provides real-time cost monitoring. Achieved significant cost reduction while maintaining 99.99% uptime.",
                    "category": "DevOps/SRE"
                },
                "bn": {
                    "title": "ক্লাউড ইনফ্রাস্ট্রাকচার অপ্টিমাইজেশন প্ল্যাটফর্ম",
                    "description": "বুদ্ধিমান রিসোর্স অপ্টিমাইজেশন এবং স্বয়ংক্রিয় খরচ ব্যবস্থাপনার মাধ্যমে AWS খরচ বার্ষিক $১M+ কমিয়েছে।",
                    "long_description": "এন্টারপ্রাইজ-স্কেল ক্লাউড খরচ অপ্টিমাইজেশন প্ল্যাটফর্ম যা রিসোর্স ব্যবহারের প্যাটার্ন বিশ্লেষণ করে, স্বয়ংক্রিয় রাইটসাইজিং বাস্তবায়ন করে, এবং রিয়েল-টাইম খরচ মনিটরিং প্রদান করে। ৯৯.৯৯% আপটাইম বজায় রেখে উল্লেখযোগ্য খরচ হ্রাস অর্জন করেছে।",
                    "category": "ডেভঅপস/এসআরই"
                }
            }
        }
        
        for project in projects:
            await self.connection.execute("""
                INSERT INTO projects (
                    id, technologies, github_url, live_url, demo_url, featured,
                    impact, stats, status, ai_powered, created_at, updated_at
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
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
                    updated_at = EXCLUDED.updated_at
            """, project['id'], project['technologies'], project.get('github_url'),
                project.get('live_url'), project.get('demo_url'), project['featured'],
                project['impact'], project['stats'], project['status'], 
                project['ai_powered'], now, now)
            
            # Add translations
            if project['id'] in project_translations:
                for lang, translations in project_translations[project['id']].items():
                    for field, content in translations.items():
                        await self.add_translation("projects", project['id'], field, lang, content)
        
        print(f"Seeded {len(projects)} projects with translations")
        
    async def _seed_tech_skills_with_translations(self, now):
        """Seed tech skills with category translations"""
        skills = [
            {"id": "python", "name": "Python", "category": "programming", "level": 95, "years_exp": 8, "icon": "Code", "color": "text-yellow-400", "projects": 45},
            {"id": "kubernetes", "name": "Kubernetes", "category": "system", "level": 92, "years_exp": 6, "icon": "Server", "color": "text-blue-600", "projects": 35},
            {"id": "aws", "name": "AWS", "category": "cloud", "level": 95, "years_exp": 7, "icon": "Cloud", "color": "text-orange-500", "projects": 50},
            {"id": "postgresql", "name": "PostgreSQL", "category": "database", "level": 92, "years_exp": 8, "icon": "Database", "color": "text-blue-700", "projects": 45},
            {"id": "prometheus", "name": "Prometheus", "category": "monitoring", "level": 90, "years_exp": 5, "icon": "Activity", "color": "text-orange-600", "projects": 25}
        ]
        
        for skill in skills:
            await self.connection.execute("""
                INSERT INTO tech_skills (
                    id, name, level, years_exp, icon, color, projects, created_at, updated_at
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                ON CONFLICT (id) DO UPDATE SET
                    name = EXCLUDED.name,
                    level = EXCLUDED.level,
                    years_exp = EXCLUDED.years_exp,
                    icon = EXCLUDED.icon,
                    color = EXCLUDED.color,
                    projects = EXCLUDED.projects,
                    updated_at = EXCLUDED.updated_at
            """, skill['id'], skill['name'], skill['level'], skill['years_exp'],
                skill['icon'], skill['color'], skill['projects'], now, now)
            
            # Add category translations
            category_translations = {
                "en": {"category": skill['category']},
                "bn": {
                    "category": {
                        "programming": "প্রোগ্রামিং",
                        "system": "সিস্টেম",
                        "cloud": "ক্লাউড",
                        "database": "ডাটাবেস", 
                        "monitoring": "মনিটরিং"
                    }.get(skill['category'], skill['category'])
                }
            }
            
            for lang, translations in category_translations.items():
                for field, content in translations.items():
                    await self.add_translation("tech_skills", skill['id'], field, lang, content)
        
        print(f"Seeded {len(skills)} tech skills with translations")
        
    async def _seed_achievements_with_translations(self, now):
        """Seed achievements with translations"""
        achievements = [
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
                "color": "text-success",
                "percentage": 100,
                "category": "business"
            }
        ]
        
        achievement_translations = {
            "cloud-savings": {
                "en": {
                    "title": "Cloud Cost Optimization",
                    "description": "Total cloud infrastructure cost savings achieved",
                    "details": json.dumps([
                        "Optimized AWS CloudWatch log ingestion saving $36.5K/year",
                        "Implemented intelligent resource rightsizing algorithms", 
                        "Automated cost monitoring and alert systems",
                        "Cross-functional team leadership for cost optimization initiatives"
                    ])
                },
                "bn": {
                    "title": "ক্লাউড খরচ অপ্টিমাইজেশন",
                    "description": "অর্জিত মোট ক্লাউড ইনফ্রাস্ট্রাকচার খরচ সাশ্রয়",
                    "details": json.dumps([
                        "AWS CloudWatch লগ ইনজেস্ট অপ্টিমাইজ করে বার্ষিক $৩৬.৫K সাশ্রয়",
                        "বুদ্ধিমান রিসোর্স রাইটসাইজিং অ্যালগরিদম বাস্তবায়ন",
                        "স্বয়ংক্রিয় খরচ মনিটরিং এবং অ্যালার্ট সিস্টেম",
                        "খরচ অপ্টিমাইজেশন উদ্যোগের জন্য ক্রস-ফাংশনাল টিম নেতৃত্ব"
                    ])
                }
            },
            "saas-arr": {
                "en": {
                    "title": "SaaS Platform Growth",
                    "description": "Annual Recurring Revenue generated through platform improvements",
                    "details": json.dumps([
                        "Led platform engineering initiatives driving revenue growth",
                        "Improved system reliability to 99.99% uptime",
                        "Reduced customer churn through performance improvements",
                        "Enabled new feature deployment velocity"
                    ])
                },
                "bn": {
                    "title": "SaaS প্ল্যাটফর্ম বৃদ্ধি",
                    "description": "প্ল্যাটফর্ম উন্নতির মাধ্যমে উৎপন্ন বার্ষিক পুনরাবৃত্ত রাজস্ব",
                    "details": json.dumps([
                        "রাজস্ব বৃদ্ধি চালিত প্ল্যাটফর্ম ইঞ্জিনিয়ারিং উদ্যোগের নেতৃত্ব",
                        "সিস্টেম নির্ভরযোগ্যতা ৯৯.৯৯% আপটাইমে উন্নত",
                        "পারফরমেন্স উন্নতির মাধ্যমে গ্রাহক চার্ন কমানো",
                        "নতুন ফিচার ডেপ্লয়মেন্ট বেগ সক্ষম করা"
                    ])
                }
            }
        }
        
        for achievement in achievements:
            await self.connection.execute("""
                INSERT INTO achievements (
                    id, value, icon, color, percentage, category, created_at, updated_at
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                ON CONFLICT (id) DO UPDATE SET
                    value = EXCLUDED.value,
                    icon = EXCLUDED.icon,
                    color = EXCLUDED.color,
                    percentage = EXCLUDED.percentage,
                    category = EXCLUDED.category,
                    updated_at = EXCLUDED.updated_at
            """, achievement['id'], achievement['value'], achievement['icon'],
                achievement['color'], achievement['percentage'], achievement['category'], now, now)
            
            # Add translations
            if achievement['id'] in achievement_translations:
                for lang, translations in achievement_translations[achievement['id']].items():
                    for field, content in translations.items():
                        await self.add_translation("achievements", achievement['id'], field, lang, content)
        
        print(f"Seeded {len(achievements)} achievements with translations")
        
    async def _seed_experiences_with_translations(self, now):
        """Seed experiences with translations"""
        experiences = [
            {
                "id": "kahf-senior",
                "company": "Kahf Yazılım A.Ş.",
                "duration": "August 2025 - Present",
                "current": True,
                "technologies": ["Bind9", "CloudNative-PG", "Kubernetes", "Ansible", "Terraform", "Microsoft Azure", "Traefik", "Helm Charts", "Prometheus", "Grafana", "Loki"],
                "website": "https://kahf.co"
            },
            {
                "id": "leadsync-ai",
                "company": "LeadSync.ai",
                "duration": "May 2025 - July 2025",
                "current": False,
                "technologies": ["MCP Protocol", "LLM Integration", "AI-SDK", "TypeScript", "PostgreSQL", "Nest.JS", "Next.JS"],
                "website": "https://leadsync.ai"
            }
        ]
        
        experience_translations = {
            "kahf-senior": {
                "en": {
                    "role": "Senior DevOps Engineer",
                    "location": "Istanbul, Turkey",
                    "achievements": json.dumps([
                        "On a mission to make online world safe & secure",
                        "Migrating entire infrastructure from Azure to Bare-metal",
                        "Implementing cloud-native solutions with Kubernetes orchestration",
                        "Establishing robust monitoring and observability stack"
                    ])
                },
                "bn": {
                    "role": "সিনিয়র ডেভঅপস ইঞ্জিনিয়ার",
                    "location": "ইস্তাম্বুল, তুরস্ক",
                    "achievements": json.dumps([
                        "অনলাইন জগতকে নিরাপদ ও সুরক্ষিত করার মিশনে",
                        "Azure থেকে Bare-metal এ সম্পূর্ণ ইনফ্রাস্ট্রাকচার মাইগ্রেশন",
                        "Kubernetes অর্কেস্ট্রেশন সহ ক্লাউড-নেটিভ সমাধান বাস্তবায়ন",
                        "শক্তিশালী মনিটরিং এবং অবজারভেবিলিটি স্ট্যাক প্রতিষ্ঠা"
                    ])
                }
            },
            "leadsync-ai": {
                "en": {
                    "role": "Senior Software Engineer - AI Products",
                    "location": "Singapore, Remote",
                    "achievements": json.dumps([
                        "Accelerated time-to-market by 40% by architecting end-to-end MCP integration with advanced LLMs",
                        "Boosted qualified lead discovery by 25% through AI-driven lead scoring and semantic enrichment",
                        "Built enterprise-scale AI platform with real-time inference optimization",
                        "Implemented personalized AI-driven recommendations system"
                    ])
                },
                "bn": {
                    "role": "সিনিয়র সফটওয়্যার ইঞ্জিনিয়ার - এআই প্রোডাক্ট",
                    "location": "সিঙ্গাপুর, রিমোট",
                    "achievements": json.dumps([
                        "উন্নত LLMs এর সাথে এন্ড-টু-এন্ড MCP ইন্টিগ্রেশন আর্কিটেক্ট করে টাইম-টু-মার্কেট ৪০% ত্বরান্বিত করেছি",
                        "এআই-চালিত লিড স্কোরিং এবং সিমান্টিক এনরিচমেন্টের মাধ্যমে যোগ্য লিড আবিষ্কার ২৫% বৃদ্ধি করেছি",
                        "রিয়েল-টাইম ইনফারেন্স অপ্টিমাইজেশন সহ এন্টারপ্রাইজ-স্কেল এআই প্ল্যাটফর্ম তৈরি করেছি",
                        "ব্যক্তিগতকৃত এআই-চালিত সুপারিশ সিস্টেম বাস্তবায়ন করেছি"
                    ])
                }
            }
        }
        
        for experience in experiences:
            await self.connection.execute("""
                INSERT INTO experiences (
                    id, company, duration, current, technologies, website, created_at, updated_at
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                ON CONFLICT (id) DO UPDATE SET
                    company = EXCLUDED.company,
                    duration = EXCLUDED.duration,
                    current = EXCLUDED.current,
                    technologies = EXCLUDED.technologies,
                    website = EXCLUDED.website,
                    updated_at = EXCLUDED.updated_at
            """, experience['id'], experience['company'], experience['duration'],
                experience['current'], experience['technologies'], 
                experience.get('website'), now, now)
            
            # Add translations
            if experience['id'] in experience_translations:
                for lang, translations in experience_translations[experience['id']].items():
                    for field, content in translations.items():
                        await self.add_translation("experiences", experience['id'], field, lang, content)
        
        print(f"Seeded {len(experiences)} experiences with translations")
        
    async def clear_existing_data(self):
        """Clear existing data from all tables"""
        tables = [
            'translation_values', 'translation_keys', 'translations',
            'hero', 'about', 'contact_info', 'projects', 'tech_skills',
            'achievements', 'recommendations', 'experiences', 'education', 
            'certifications', 'languages'
        ]
        
        for table in tables:
            try:
                await self.connection.execute(f"TRUNCATE TABLE {table} CASCADE")
            except Exception as e:
                print(f"Error clearing table {table}: {e}")
                
        print("Cleared existing data from all tables")


async def main():
    """Main function to run the translation seed script"""
    seeder = TranslationSeeder()
    
    try:
        await seeder.connect()
        await seeder.create_translation_tables()
        
        # Ask user if they want to clear existing data
        response = input("Do you want to clear existing data before seeding? (y/N): ")
        if response.lower() == 'y':
            await seeder.clear_existing_data()
        
        # Seed all data
        await seeder.seed_languages()
        await seeder.seed_translation_keys()
        await seeder.seed_translation_values()
        await seeder.seed_content_data()
        
        print("\nDatabase seeding with translations completed successfully!")
        
    except Exception as e:
        print(f"Error during seeding: {e}")
        raise
    finally:
        await seeder.disconnect()


if __name__ == "__main__":
    asyncio.run(main())