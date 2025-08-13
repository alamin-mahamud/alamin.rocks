#!/usr/bin/env python3
"""
Seed script to generate test data for the admin dashboard
Generates 1000 records across different models for stress testing
"""

import asyncio
import random
from datetime import datetime, timedelta
from faker import Faker
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

from app.core.config import settings
from app.models.base import Base
from app.models.contact import ContactMessage
from app.models.portfolio import Project, Category, Technology
from app.models.resume import (
    Experience, Education, Skill, Certification, Language
)
from app.models.translations import Translation

# Initialize Faker
fake = Faker()

# Database connection
DATABASE_URL = settings.database_url.replace("postgresql://", "postgresql+asyncpg://")
engine = create_async_engine(DATABASE_URL, echo=False)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def seed_contact_messages(session: AsyncSession, count: int = 300):
    """Generate contact messages"""
    print(f"Generating {count} contact messages...")
    
    subjects = [
        "Inquiry about services",
        "Partnership opportunity",
        "Project collaboration",
        "Technical consultation",
        "Business proposal",
        "Career opportunity",
        "Feedback on portfolio",
        "Request for quote",
        "General inquiry",
        "Support request"
    ]
    
    for i in range(count):
        message = ContactMessage(
            name=fake.name(),
            email=fake.email(),
            subject=random.choice(subjects),
            message=fake.text(max_nb_chars=500),
            created_at=fake.date_time_between(start_date='-1y', end_date='now'),
            is_read=random.choice([True, False, False]),  # 33% read
            is_starred=random.choice([True, False, False, False])  # 25% starred
        )
        session.add(message)
    
    await session.commit()
    print(f"✓ Created {count} contact messages")


async def seed_projects(session: AsyncSession, count: int = 150):
    """Generate portfolio projects"""
    print(f"Generating {count} projects...")
    
    # Create categories
    categories = []
    category_names = ["Web Development", "Mobile Apps", "AI/ML", "DevOps", "UI/UX", 
                     "Backend", "Frontend", "Full Stack", "Data Science", "Blockchain"]
    
    for name in category_names:
        category = Category(
            name=name,
            slug=name.lower().replace(" ", "-").replace("/", "-"),
            description=f"Projects related to {name}"
        )
        session.add(category)
        categories.append(category)
    
    await session.flush()
    
    # Create technologies
    technologies = []
    tech_names = ["Python", "JavaScript", "TypeScript", "React", "Next.js", 
                 "FastAPI", "Node.js", "PostgreSQL", "MongoDB", "Redis",
                 "Docker", "Kubernetes", "AWS", "GCP", "Azure",
                 "TensorFlow", "PyTorch", "Vue.js", "Angular", "Django"]
    
    for name in tech_names:
        tech = Technology(
            name=name,
            icon=f"icon-{name.lower()}",
            color=f"#{fake.hex_color()[1:]}"
        )
        session.add(tech)
        technologies.append(tech)
    
    await session.flush()
    
    # Create projects
    project_types = ["web", "mobile", "desktop", "api", "library"]
    statuses = ["completed", "in_progress", "planned"]
    
    for i in range(count):
        project = Project(
            title=fake.catch_phrase(),
            slug=f"project-{i+1}-{fake.slug()}",
            short_description=fake.text(max_nb_chars=150),
            long_description=fake.text(max_nb_chars=1000),
            featured_image=f"https://picsum.photos/800/600?random={i}",
            images=[f"https://picsum.photos/800/600?random={i+j}" for j in range(random.randint(2, 5))],
            github_url=f"https://github.com/{fake.user_name()}/{fake.slug()}" if random.choice([True, False]) else None,
            live_url=f"https://{fake.domain_name()}" if random.choice([True, False]) else None,
            project_type=random.choice(project_types),
            status=random.choice(statuses),
            start_date=fake.date_between(start_date='-3y', end_date='-6m'),
            end_date=fake.date_between(start_date='-6m', end_date='now') if random.choice([True, False]) else None,
            is_featured=random.choice([True, False, False, False]),  # 25% featured
            order_index=i,
            view_count=random.randint(0, 10000),
            like_count=random.randint(0, 500)
        )
        
        # Add random categories and technologies
        project.categories = random.sample(categories, k=random.randint(1, 3))
        project.technologies = random.sample(technologies, k=random.randint(2, 6))
        
        session.add(project)
    
    await session.commit()
    print(f"✓ Created {count} projects with categories and technologies")


async def seed_resume(session: AsyncSession):
    """Generate resume data"""
    print("Generating resume data...")
    
    # Experiences
    experience_count = 50
    for i in range(experience_count):
        experience = Experience(
            company=fake.company(),
            position=fake.job(),
            location=f"{fake.city()}, {fake.country()}",
            start_date=fake.date_between(start_date='-10y', end_date='-1y'),
            end_date=fake.date_between(start_date='-1y', end_date='now') if random.choice([True, False]) else None,
            is_current=random.choice([True, False, False, False]) if i < 5 else False,
            description=fake.text(max_nb_chars=500),
            achievements=[fake.text(max_nb_chars=100) for _ in range(random.randint(2, 5))],
            technologies=[fake.word() for _ in range(random.randint(3, 8))],
            order_index=i
        )
        session.add(experience)
    
    # Education
    education_count = 30
    degrees = ["Bachelor of Science", "Master of Science", "PhD", "Certificate", "Diploma"]
    fields = ["Computer Science", "Software Engineering", "Data Science", "Information Technology", 
             "Artificial Intelligence", "Business Administration", "Mathematics", "Physics"]
    
    for i in range(education_count):
        education = Education(
            institution=f"{fake.company()} University",
            degree=random.choice(degrees),
            field_of_study=random.choice(fields),
            location=f"{fake.city()}, {fake.country()}",
            start_date=fake.date_between(start_date='-15y', end_date='-5y'),
            end_date=fake.date_between(start_date='-5y', end_date='now'),
            gpa=round(random.uniform(3.0, 4.0), 2) if random.choice([True, False]) else None,
            achievements=[fake.text(max_nb_chars=100) for _ in range(random.randint(1, 3))],
            relevant_courses=[fake.catch_phrase() for _ in range(random.randint(3, 6))],
            order_index=i
        )
        session.add(education)
    
    # Skills
    skill_count = 100
    skill_categories = ["Programming Languages", "Frameworks", "Databases", "Tools", 
                       "Cloud Services", "Soft Skills", "Languages", "Other"]
    proficiency_levels = ["beginner", "intermediate", "advanced", "expert"]
    
    for i in range(skill_count):
        skill = Skill(
            name=fake.word().capitalize(),
            category=random.choice(skill_categories),
            proficiency_level=random.choice(proficiency_levels),
            years_of_experience=random.randint(1, 15),
            icon=f"icon-{fake.word()}",
            order_index=i
        )
        session.add(skill)
    
    # Certifications
    cert_count = 40
    cert_issuers = ["Google", "Microsoft", "Amazon", "IBM", "Oracle", "Cisco", 
                   "CompTIA", "Red Hat", "VMware", "Coursera"]
    
    for i in range(cert_count):
        certification = Certification(
            name=f"{random.choice(cert_issuers)} {fake.catch_phrase()}",
            issuer=random.choice(cert_issuers),
            issue_date=fake.date_between(start_date='-5y', end_date='now'),
            expiry_date=fake.date_between(start_date='now', end_date='+3y') if random.choice([True, False]) else None,
            credential_id=fake.uuid4()[:12].upper(),
            credential_url=f"https://verify.{fake.domain_name()}/cert/{fake.uuid4()[:8]}",
            order_index=i
        )
        session.add(certification)
    
    # Languages
    language_count = 20
    language_names = ["English", "Spanish", "French", "German", "Chinese", "Japanese", 
                     "Arabic", "Russian", "Portuguese", "Italian", "Dutch", "Korean",
                     "Hindi", "Bengali", "Urdu", "Turkish", "Polish", "Vietnamese"]
    proficiency = ["native", "fluent", "advanced", "intermediate", "beginner"]
    
    for i, lang in enumerate(random.sample(language_names, min(language_count, len(language_names)))):
        language = Language(
            name=lang,
            proficiency_level=random.choice(proficiency),
            is_native=True if i == 0 else False,
            order_index=i
        )
        session.add(language)
    
    await session.commit()
    print(f"✓ Created resume data: {experience_count} experiences, {education_count} education, "
          f"{skill_count} skills, {cert_count} certifications, {language_count} languages")


async def seed_translations(session: AsyncSession, count: int = 350):
    """Generate translations"""
    print(f"Generating {count} translations...")
    
    languages = ["en", "es", "fr", "de", "zh", "ja", "ar", "ru", "pt", "it"]
    contexts = ["ui", "content", "error", "message", "form", "button", "menu", "header", "footer"]
    
    # Generate unique keys
    keys = []
    for i in range(count // len(languages)):
        key = f"{random.choice(contexts)}.{fake.word()}.{fake.word()}"
        keys.append(key)
    
    # Create translations for each key in multiple languages
    for key in keys:
        for lang in languages:
            translation = Translation(
                key=key,
                language=lang,
                value=fake.text(max_nb_chars=100),
                context=key.split('.')[0],
                is_active=random.choice([True, True, True, False]),  # 75% active
                created_at=fake.date_time_between(start_date='-1y', end_date='now'),
                updated_at=fake.date_time_between(start_date='-6m', end_date='now')
            )
            session.add(translation)
    
    await session.commit()
    print(f"✓ Created {len(keys) * len(languages)} translations")


async def main():
    """Main function to run all seeders"""
    print("🌱 Starting database seeding...")
    print(f"Database: {settings.database_url}")
    
    # Create tables if they don't exist
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    async with AsyncSessionLocal() as session:
        try:
            # Run seeders
            await seed_contact_messages(session, 300)
            await seed_projects(session, 150)
            await seed_resume(session)
            await seed_translations(session, 350)
            
            print("\n✅ Database seeding completed successfully!")
            print("📊 Summary:")
            print("  - 300 contact messages")
            print("  - 150 projects with categories and technologies")
            print("  - 50 experiences, 30 education, 100 skills, 40 certifications, 20 languages")
            print("  - 350+ translations in 10 languages")
            print("\n🎯 Total records created: ~1000+")
            
        except Exception as e:
            print(f"\n❌ Error during seeding: {e}")
            raise
        finally:
            await engine.dispose()


if __name__ == "__main__":
    asyncio.run(main())