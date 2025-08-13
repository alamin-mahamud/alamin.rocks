#!/usr/bin/env python3
"""
Generate test data in JSON format for the admin dashboard
Creates 1000+ records for stress testing and pagination
"""

import json
import random
from datetime import datetime, timedelta
from faker import Faker
import uuid

# Initialize Faker
fake = Faker()

def generate_contact_messages(count=300):
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
    
    statuses = ["unread", "read", "replied", "archived"]
    
    messages = []
    for i in range(count):
        created_date = fake.date_time_between(start_date='-1y', end_date='now')
        messages.append({
            "id": str(uuid.uuid4()),
            "name": fake.name(),
            "email": fake.email(),
            "subject": random.choice(subjects),
            "message": fake.text(max_nb_chars=500),
            "created_at": created_date.isoformat(),
            "status": random.choice(statuses),
            "is_starred": random.choice([True, False, False, False])  # 25% starred
        })
    
    return messages


def generate_projects(count=150):
    """Generate portfolio projects"""
    print(f"Generating {count} projects...")
    
    tech_stacks = [
        ["Python", "FastAPI", "PostgreSQL", "Redis"],
        ["TypeScript", "React", "Next.js", "TailwindCSS"],
        ["Python", "Django", "MySQL", "Celery"],
        ["JavaScript", "Node.js", "Express", "MongoDB"],
        ["Python", "TensorFlow", "PyTorch", "Docker"],
        ["Go", "Kubernetes", "Prometheus", "Grafana"],
        ["Java", "Spring Boot", "PostgreSQL", "RabbitMQ"],
        ["TypeScript", "Vue.js", "Nuxt.js", "GraphQL"]
    ]
    
    project_types = ["Web Application", "Mobile App", "API Service", "AI/ML Model", 
                    "DevOps Tool", "Data Pipeline", "Blockchain", "IoT System"]
    
    projects = []
    for i in range(count):
        start_date = fake.date_between(start_date='-3y', end_date='-6m')
        end_date = fake.date_between(start_date=start_date, end_date='now') if random.choice([True, False]) else None
        
        projects.append({
            "id": str(i + 1),
            "title": fake.catch_phrase(),
            "description": fake.text(max_nb_chars=200),
            "long_description": fake.text(max_nb_chars=1000),
            "tech_stack": random.choice(tech_stacks),
            "project_type": random.choice(project_types),
            "image_url": f"https://picsum.photos/800/600?random={i}",
            "github_url": f"https://github.com/{fake.user_name()}/{fake.slug()}" if random.choice([True, False]) else None,
            "live_url": f"https://{fake.domain_name()}" if random.choice([True, False]) else None,
            "start_date": start_date.isoformat(),
            "end_date": end_date.isoformat() if end_date else None,
            "is_featured": random.choice([True, False, False, False]),  # 25% featured
            "view_count": random.randint(0, 10000),
            "like_count": random.randint(0, 500)
        })
    
    return projects


def generate_experiences(count=50):
    """Generate work experiences"""
    print(f"Generating {count} experiences...")
    
    positions = [
        "Senior Software Engineer",
        "Full Stack Developer",
        "DevOps Engineer",
        "AI/ML Engineer",
        "Backend Engineer",
        "Frontend Developer",
        "Data Engineer",
        "Cloud Architect",
        "Technical Lead",
        "Solutions Architect"
    ]
    
    experiences = []
    for i in range(count):
        start_date = fake.date_between(start_date='-10y', end_date='-1y')
        end_date = fake.date_between(start_date=start_date, end_date='now') if i > 5 else None
        
        experiences.append({
            "id": str(i + 1),
            "company": fake.company(),
            "position": random.choice(positions),
            "location": f"{fake.city()}, {fake.country()}",
            "start_date": start_date.strftime("%Y-%m"),
            "end_date": end_date.strftime("%Y-%m") if end_date else "Present",
            "description": fake.text(max_nb_chars=500),
            "highlights": [fake.text(max_nb_chars=100) for _ in range(random.randint(2, 5))],
            "technologies": [fake.word().capitalize() for _ in range(random.randint(3, 8))]
        })
    
    return experiences


def generate_skills(count=100):
    """Generate skills"""
    print(f"Generating {count} skills...")
    
    categories = {
        "Languages": ["Python", "JavaScript", "TypeScript", "Go", "Java", "C++", "Rust", "Ruby", "PHP", "Swift"],
        "Frontend": ["React", "Vue.js", "Angular", "Next.js", "Svelte", "Redux", "MobX", "Webpack", "Vite", "TailwindCSS"],
        "Backend": ["FastAPI", "Django", "Flask", "Express", "NestJS", "Spring Boot", "Rails", "Laravel", "Gin", "Echo"],
        "Databases": ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "Cassandra", "DynamoDB", "Neo4j", "InfluxDB"],
        "Cloud": ["AWS", "GCP", "Azure", "Docker", "Kubernetes", "Terraform", "Ansible", "Jenkins", "GitLab CI", "GitHub Actions"],
        "AI/ML": ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "Pandas", "NumPy", "Hugging Face", "OpenAI", "LangChain"],
        "Tools": ["Git", "Linux", "Vim", "VS Code", "IntelliJ", "Postman", "Grafana", "Prometheus", "Datadog", "New Relic"]
    }
    
    skills = []
    skill_id = 1
    
    for category, skill_list in categories.items():
        for skill_name in skill_list[:count // len(categories)]:
            skills.append({
                "id": str(skill_id),
                "name": skill_name,
                "category": category,
                "proficiency": random.choice(["Beginner", "Intermediate", "Advanced", "Expert"]),
                "years_experience": random.randint(1, 10)
            })
            skill_id += 1
            if len(skills) >= count:
                break
        if len(skills) >= count:
            break
    
    return skills


def generate_certifications(count=40):
    """Generate certifications"""
    print(f"Generating {count} certifications...")
    
    cert_templates = [
        ("AWS", ["Solutions Architect", "Developer Associate", "DevOps Engineer", "Security Specialty"]),
        ("Google Cloud", ["Professional Cloud Architect", "Professional Data Engineer", "Associate Cloud Engineer"]),
        ("Microsoft", ["Azure Solutions Architect", "Azure Developer", "Azure Administrator"]),
        ("Kubernetes", ["CKA", "CKAD", "CKS"]),
        ("HashiCorp", ["Terraform Associate", "Vault Associate", "Consul Associate"]),
        ("Linux", ["LPIC-1", "LPIC-2", "RHCSA", "RHCE"]),
        ("Security", ["CISSP", "CEH", "Security+", "OSCP"])
    ]
    
    certifications = []
    for i in range(count):
        issuer, cert_names = random.choice(cert_templates)
        cert_name = random.choice(cert_names)
        issue_date = fake.date_between(start_date='-5y', end_date='now')
        
        certifications.append({
            "id": str(i + 1),
            "name": f"{issuer} {cert_name}",
            "issuer": issuer,
            "issue_date": issue_date.strftime("%Y-%m"),
            "expiry_date": (issue_date + timedelta(days=random.randint(365, 1095))).strftime("%Y-%m") if random.choice([True, False]) else None,
            "credential_id": fake.uuid4()[:12].upper(),
            "credential_url": f"https://verify.{issuer.lower().replace(' ', '')}.com/cert/{fake.uuid4()[:8]}"
        })
    
    return certifications


def generate_translations(count=350):
    """Generate translations"""
    print(f"Generating {count} translations...")
    
    languages = ["en", "es", "fr", "de", "zh", "ja", "ar", "ru", "pt", "it"]
    
    # Common UI strings to translate
    ui_strings = [
        "welcome.title",
        "welcome.subtitle", 
        "nav.home",
        "nav.about",
        "nav.projects",
        "nav.contact",
        "button.submit",
        "button.cancel",
        "button.save",
        "button.delete",
        "form.email",
        "form.name",
        "form.message",
        "error.required",
        "error.invalid_email",
        "success.saved",
        "success.deleted",
        "footer.copyright",
        "footer.privacy",
        "footer.terms"
    ]
    
    translations = []
    for i in range(min(count, len(ui_strings) * len(languages))):
        key_index = i // len(languages)
        lang_index = i % len(languages)
        
        if key_index < len(ui_strings):
            translations.append({
                "id": str(i + 1),
                "key": ui_strings[key_index],
                "language": languages[lang_index],
                "value": fake.text(max_nb_chars=100),
                "context": ui_strings[key_index].split('.')[0],
                "is_active": random.choice([True, True, True, False])  # 75% active
            })
    
    # Add more random translations if needed
    while len(translations) < count:
        translations.append({
            "id": str(len(translations) + 1),
            "key": f"{fake.word()}.{fake.word()}",
            "language": random.choice(languages),
            "value": fake.text(max_nb_chars=100),
            "context": random.choice(["ui", "content", "error", "message"]),
            "is_active": random.choice([True, True, True, False])
        })
    
    return translations


def main():
    """Generate all test data and save to JSON files"""
    print("🌱 Generating test data for admin dashboard...")
    
    # Generate all data
    data = {
        "contact_messages": generate_contact_messages(300),
        "projects": generate_projects(150),
        "experiences": generate_experiences(50),
        "skills": generate_skills(100),
        "certifications": generate_certifications(40),
        "translations": generate_translations(350)
    }
    
    # Save to JSON files
    for key, value in data.items():
        filename = f"test_data_{key}.json"
        with open(filename, 'w') as f:
            json.dump(value, f, indent=2, default=str)
        print(f"✓ Saved {len(value)} {key.replace('_', ' ')} to {filename}")
    
    # Save combined data
    with open('test_data_all.json', 'w') as f:
        json.dump(data, f, indent=2, default=str)
    
    print("\n✅ Test data generation completed!")
    print("📊 Summary:")
    print(f"  - {len(data['contact_messages'])} contact messages")
    print(f"  - {len(data['projects'])} projects")
    print(f"  - {len(data['experiences'])} experiences")
    print(f"  - {len(data['skills'])} skills")
    print(f"  - {len(data['certifications'])} certifications")
    print(f"  - {len(data['translations'])} translations")
    print(f"\n🎯 Total records generated: {sum(len(v) for v in data.values())}")


if __name__ == "__main__":
    main()