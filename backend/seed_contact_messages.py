#!/usr/bin/env python3
"""
Script to seed the PostgreSQL database with test contact messages.
This creates 50+ realistic contact messages for testing purposes.

Usage:
    python seed_contact_messages.py
"""

import asyncio
import asyncpg
import uuid
from datetime import datetime, timedelta
import random

# Database connection string
DATABASE_URL = "postgresql://postgres:password@localhost:5452/alamin_rocks"

# Sample data for generating realistic contact messages
FIRST_NAMES = [
    "John", "Sarah", "Michael", "Emily", "David", "Lisa", "Robert", "Jennifer",
    "William", "Amanda", "James", "Michelle", "Christopher", "Jessica", "Daniel", 
    "Ashley", "Matthew", "Nicole", "Anthony", "Elizabeth", "Mark", "Megan",
    "Steven", "Rachel", "Andrew", "Lauren", "Kenneth", "Stephanie", "Paul",
    "Christina", "Joshua", "Amy", "Kevin", "Anna", "Brian", "Melissa", "George",
    "Rebecca", "Edward", "Laura", "Ronald", "Kimberly", "Timothy", "Deborah",
    "Jason", "Dorothy", "Jeffrey", "Lisa", "Ryan", "Nancy", "Jacob", "Karen",
    "Gary", "Betty", "Nicholas", "Helen", "Eric", "Sandra", "Jonathan", "Donna"
]

LAST_NAMES = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
    "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson",
    "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson",
    "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker",
    "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill",
    "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell",
    "Mitchell", "Carter", "Roberts", "Gomez", "Phillips", "Evans", "Turner", "Diaz"
]

COMPANY_DOMAINS = [
    "techcorp.com", "innovate.io", "startup.ai", "bigtech.com", "devcompany.net",
    "aitech.org", "cloudsolutions.com", "datatech.co", "mlcompany.ai", "webdev.io",
    "consultingfirm.com", "digitalagency.net", "techstartup.co", "enterprise.com",
    "university.edu", "research.org", "nonprofit.org", "government.gov"
]

SUBJECTS = [
    "Project Inquiry - AI Infrastructure",
    "Job Opportunity - Senior AI Engineer", 
    "Technical Consultation Request",
    "Speaking Opportunity at Tech Conference",
    "Partnership Proposal",
    "Freelance Project - DevOps Optimization",
    "Interview Request - Tech Podcast",
    "Collaboration Opportunity",
    "Cloud Architecture Consultation",
    "ML Platform Development Inquiry",
    "Cost Optimization Project",
    "Kubernetes Migration Help",
    "AI Strategy Consultation",
    "Technical Review Request",
    "Open Source Contribution",
    "Mentorship Request",
    "Career Advice",
    "Portfolio Feedback",
    "Technology Recommendation",
    "System Architecture Review",
    "Performance Optimization Help",
    "Docker Implementation Guidance",
    "CI/CD Pipeline Setup",
    "Database Migration Assistance",
    "Security Review Request",
    "Training Workshop Inquiry",
    "Code Review Service",
    "Technical Writing Opportunity",
    "Product Development Consultation",
    "Startup Technical Advisory"
]

MESSAGE_TEMPLATES = [
    "Hi Alamin, I came across your portfolio and I'm impressed with your {skill} work. I'd love to discuss a potential {opportunity} for a {project_type} project. Would you be available for a brief call this week?",
    
    "Hello Alamin, I'm a {role} at {company_type} and we have an exciting {position} that I think would be perfect for your background. The role involves {responsibility} and working with {technology}. Are you open to discussing this opportunity?",
    
    "Hi Alamin, I'm the {title} at a {industry} and we're looking for expertise on {topic}. Based on your experience with {achievement}, I'd love to explore if you'd be interested in a {engagement_type}.",
    
    "Dear Alamin, I'm organizing a {event_type} on {subject} and would love to have you as a {speaker_role}. Your work on {expertise} would be very valuable to our audience of {audience_size} {audience_type}.",
    
    "Hello Alamin, I've been following your work on {technology} and I'm particularly interested in {specific_aspect}. I'm currently working on {current_project} and would appreciate your insights on {challenge}. Would you be open to a consultation?",
    
    "Hi Alamin, I found your portfolio through {source} and I'm impressed by your {accomplishment}. We're facing similar challenges with {problem} at our company. Would you be interested in discussing a potential {solution_type}?",
    
    "Dear Alamin, I'm reaching out because I need help with {technical_challenge}. I noticed your experience with {relevant_tech} and thought you might be the right person to guide us through {implementation}. Are you available for a project discussion?",
    
    "Hello Alamin, I'm working on {project_description} and could use your expertise in {area_of_expertise}. Your background in {specific_skill} makes you an ideal candidate for this {project_type}. When would be a good time to discuss the details?",
]

SKILLS = ["AI", "DevOps", "cloud architecture", "machine learning", "Kubernetes", "Docker", "automation"]
OPPORTUNITIES = ["collaboration opportunity", "consulting project", "full-time position", "contract work", "partnership"]
PROJECT_TYPES = ["machine learning infrastructure", "cloud migration", "cost optimization", "DevOps transformation", "AI platform development"]
ROLES = ["technical recruiter", "hiring manager", "CTO", "VP of Engineering", "project manager"]
COMPANY_TYPES = ["TechCorp", "a fast-growing startup", "a Fortune 500 company", "an AI company", "a cloud solutions provider"]
POSITIONS = ["Senior AI Engineer position", "DevOps Lead role", "Cloud Architect position", "Technical Consultant role"]
RESPONSIBILITIES = ["leading AI infrastructure", "optimizing cloud costs", "implementing DevOps best practices", "designing scalable architectures"]
TECHNOLOGIES = ["LLM platforms", "Kubernetes clusters", "AWS services", "machine learning pipelines", "Docker containers"]

STATUS_OPTIONS = ["unread", "read", "replied"]
STATUS_WEIGHTS = [0.4, 0.35, 0.25]  # 40% unread, 35% read, 25% replied

def generate_email(first_name, last_name):
    """Generate a realistic email address"""
    formats = [
        f"{first_name.lower()}.{last_name.lower()}",
        f"{first_name.lower()}{last_name.lower()}",
        f"{first_name[0].lower()}{last_name.lower()}",
        f"{first_name.lower()}{last_name[0].lower()}",
        f"{first_name.lower()}.{last_name[0].lower()}"
    ]
    email_format = random.choice(formats)
    domain = random.choice(COMPANY_DOMAINS)
    return f"{email_format}@{domain}"

def generate_message():
    """Generate a realistic message using templates"""
    template = random.choice(MESSAGE_TEMPLATES)
    
    # Fill in template variables
    replacements = {
        'skill': random.choice(SKILLS),
        'opportunity': random.choice(OPPORTUNITIES),
        'project_type': random.choice(PROJECT_TYPES),
        'role': random.choice(ROLES),
        'company_type': random.choice(COMPANY_TYPES),
        'position': random.choice(POSITIONS),
        'responsibility': random.choice(RESPONSIBILITIES),
        'technology': random.choice(TECHNOLOGIES),
        'title': random.choice(["CTO", "VP of Engineering", "Technical Director", "Head of AI", "Engineering Manager"]),
        'industry': random.choice(["fintech startup", "healthcare company", "e-commerce platform", "SaaS company", "consulting firm"]),
        'topic': random.choice(["cloud cost optimization", "Kubernetes architecture", "AI infrastructure", "DevOps automation", "system scalability"]),
        'achievement': random.choice(["saving $1M+ in cloud costs", "scaling to millions of users", "implementing AI platforms", "DevOps transformations"]),
        'engagement_type': random.choice(["consulting engagement", "advisory role", "technical partnership", "project collaboration"]),
        'event_type': random.choice(["tech conference", "webinar series", "workshop", "industry summit", "meetup"]),
        'subject': random.choice(["AI and Infrastructure", "Cloud Cost Optimization", "DevOps Best Practices", "Machine Learning in Production"]),
        'speaker_role': random.choice(["keynote speaker", "technical presenter", "panelist", "workshop leader"]),
        'expertise': random.choice(["AI-powered platforms", "DevOps optimization", "cloud architecture", "cost reduction strategies"]),
        'audience_size': random.choice(["500+", "200+", "100+", "1000+"]),
        'audience_type': random.choice(["engineers and researchers", "technical professionals", "startup founders", "enterprise architects"]),
        'source': random.choice(["LinkedIn", "your GitHub", "a colleague's recommendation", "your portfolio website", "a tech blog"]),
        'accomplishment': random.choice(["cost optimization work", "AI platform development", "DevOps expertise", "cloud architecture skills"]),
        'problem': random.choice(["high cloud costs", "scaling challenges", "deployment bottlenecks", "infrastructure complexity"]),
        'solution_type': random.choice(["cost optimization strategy", "architecture review", "DevOps implementation", "consultation"]),
        'technical_challenge': random.choice(["Kubernetes migration", "cloud cost reduction", "CI/CD pipeline setup", "AI model deployment"]),
        'relevant_tech': random.choice(["AWS", "Docker", "Kubernetes", "machine learning platforms", "DevOps tools"]),
        'implementation': random.choice(["our migration", "cost optimization", "the deployment process", "infrastructure setup"]),
        'project_description': random.choice(["an AI platform migration", "a cost optimization initiative", "a DevOps transformation", "a cloud architecture review"]),
        'area_of_expertise': random.choice(["cloud cost optimization", "Kubernetes architecture", "AI infrastructure", "DevOps automation"]),
        'specific_skill': random.choice(["cost reduction", "system scaling", "container orchestration", "AI/ML deployment"]),
        'current_project': random.choice(["migrating to Kubernetes", "optimizing our cloud spend", "implementing CI/CD", "building an AI platform"])
    }
    
    # Replace placeholders in the template
    for key, value in replacements.items():
        template = template.replace(f"{{{key}}}", value)
    
    return template

def generate_random_datetime():
    """Generate a random datetime within the last 3 months"""
    now = datetime.now()
    start_date = now - timedelta(days=90)
    random_seconds = random.randint(0, int((now - start_date).total_seconds()))
    return start_date + timedelta(seconds=random_seconds)

async def create_contact_messages_table(conn):
    """Create the contact messages table if it doesn't exist"""
    create_table_sql = """
    CREATE TABLE IF NOT EXISTS contact_messages (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        message TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(50) NOT NULL DEFAULT 'unread'
    );
    """
    
    await conn.execute(create_table_sql)
    print("✓ Contact messages table created/verified")

async def seed_contact_messages(conn, count=60):
    """Seed the database with test contact messages"""
    
    messages = []
    
    for i in range(count):
        first_name = random.choice(FIRST_NAMES)
        last_name = random.choice(LAST_NAMES)
        name = f"{first_name} {last_name}"
        email = generate_email(first_name, last_name)
        subject = random.choice(SUBJECTS)
        message = generate_message()
        created_at = generate_random_datetime()
        status = random.choices(STATUS_OPTIONS, weights=STATUS_WEIGHTS)[0]
        message_id = str(uuid.uuid4())
        
        messages.append((message_id, name, email, subject, message, created_at, status))
    
    # Insert all messages in batch
    insert_sql = """
    INSERT INTO contact_messages (id, name, email, subject, message, created_at, status)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    """
    
    await conn.executemany(insert_sql, messages)
    print(f"✓ {count} contact messages inserted successfully")
    
    # Print some statistics
    stats = await conn.fetchrow("""
        SELECT 
            COUNT(*) as total,
            COUNT(CASE WHEN status = 'unread' THEN 1 END) as unread,
            COUNT(CASE WHEN status = 'read' THEN 1 END) as read,
            COUNT(CASE WHEN status = 'replied' THEN 1 END) as replied
        FROM contact_messages
    """)
    
    print(f"\n📊 Database Statistics:")
    print(f"   Total messages: {stats['total']}")
    print(f"   Unread: {stats['unread']}")
    print(f"   Read: {stats['read']}")
    print(f"   Replied: {stats['replied']}")

async def main():
    """Main function to run the seeding script"""
    try:
        print("🗃️  Connecting to PostgreSQL database...")
        conn = await asyncpg.connect(DATABASE_URL)
        
        print("📝 Creating contact messages table...")
        await create_contact_messages_table(conn)
        
        print("🌱 Seeding contact messages...")
        await seed_contact_messages(conn, count=60)
        
        print("\n✅ Database seeding completed successfully!")
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
    finally:
        if 'conn' in locals():
            await conn.close()
            print("🔌 Database connection closed")

if __name__ == "__main__":
    asyncio.run(main())