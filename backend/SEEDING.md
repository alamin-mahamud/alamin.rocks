# Database Seeding Guide

This guide explains how to populate the database with static data from the frontend components.

## Overview

The seed scripts extract static data from the frontend components and populate the PostgreSQL database with:

- **Portfolio Data**: Projects, achievements, recommendations
- **Personal Data**: Hero section, about, contact info
- **Professional Data**: Experience, education, certifications  
- **Technical Data**: Tech skills and expertise

## Files

- `seed_database.py` - Main seeding script with comprehensive data
- `run_seed.py` - Simple runner script with dependency checks
- `test_db_connection.py` - Database connection test utility
- `seed_data.py` - Legacy seed data (JSON export)

## Prerequisites

1. **PostgreSQL Database**: Running and accessible
2. **Python Dependencies**:
   ```bash
   pip install asyncpg pydantic pydantic-settings
   ```
3. **Database Configuration**: Set `database_url` in settings or `.env` file

## Database Configuration

### Option 1: Environment Variables (.env file)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/alamin_rocks
```

### Option 2: Direct Configuration
Update `app/core/config.py`:
```python
database_url: str = "postgresql://user:password@localhost:5432/alamin_rocks"
```

### Option 3: Docker Compose
If using the provided `docker-compose.yml`:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/alamin_rocks
```

## Usage

### Quick Start
```bash
cd backend
python run_seed.py
```

### Manual Execution
```bash
cd backend
python seed_database.py
```

### Test Connection First
```bash
cd backend
python test_db_connection.py
```

## What Gets Seeded

### Core Portfolio Data
- **Hero Section**: Roles, name, description, key metrics
- **About Section**: Bio, skills, quick facts
- **Contact Info**: Email, phone, location, social links

### Projects (7 featured projects)
- AI-Powered MCP Platform
- Cloud Infrastructure Optimization
- Kubernetes Multi-Cluster Management
- Observability & Monitoring Stack
- GitOps CI/CD Pipeline Framework
- Source Code Podcast Platform
- Infrastructure as Code Templates

### Technical Skills (35+ technologies)
- Programming: Python, Go, TypeScript, JavaScript
- Frameworks: FastAPI, Nest.JS, Next.JS, Flask, Django
- Cloud: AWS, GCP, Azure, ECS, EKS
- DevOps: Docker, Kubernetes, Terraform, Ansible
- Databases: PostgreSQL, MySQL, Redis, Elasticsearch
- Monitoring: Prometheus, Grafana, DataDog, CloudWatch
- CI/CD: GitHub Actions, Jenkins, ArgoCD, Helm

### Professional Experience
- Current roles at Kahf Yazılım A.Ş. and LeadSync.ai
- Previous experience at BriteCore Inc, AK2 Tech
- Freelance and consulting work

### Education & Certifications
- CUET Mechanical Engineering degree
- AWS Solutions Architect Professional
- Kubernetes, Terraform, Grafana certifications
- In-progress CKA certification

### Achievements & Metrics
- $1.2M+ cloud cost savings
- $20M+ SaaS ARR impact
- 90% deployment efficiency improvement
- 50+ engineers mentored
- 10K+ infrastructure instances managed
- 2K+ GitHub stars across projects

## Database Schema

The script automatically creates these tables:
- `hero` - Hero section data
- `about` - About section content
- `contact_info` - Contact information
- `projects` - Portfolio projects
- `tech_skills` - Technical skills and proficiency
- `achievements` - Professional achievements
- `recommendations` - LinkedIn-style recommendations
- `experiences` - Work experience
- `education` - Educational background
- `certifications` - Professional certifications

## Options

### Clear Existing Data
The script will prompt to clear existing data before seeding:
```
Do you want to clear existing data before seeding? (y/N):
```

### Upsert Behavior
By default, the script uses `ON CONFLICT DO UPDATE` to:
- Insert new records
- Update existing records with same ID
- Preserve data integrity

## Troubleshooting

### Connection Issues
1. **Database not running**: Start PostgreSQL service
2. **Wrong credentials**: Check `database_url` in config
3. **Database doesn't exist**: Create database manually
4. **Port conflicts**: Ensure PostgreSQL is on correct port

### Permission Issues
1. **Script not executable**: Run `chmod +x *.py`
2. **Database permissions**: Ensure user has CREATE/INSERT privileges

### Dependency Issues
1. **Missing asyncpg**: Run `pip install asyncpg`
2. **Missing pydantic**: Run `pip install pydantic pydantic-settings`

### Data Issues
1. **Validation errors**: Check data format in script
2. **Foreign key constraints**: Ensure proper table creation order
3. **JSON serialization**: Verify JSONB data format

## Development

### Adding New Data
1. Update the respective `_get_*_data()` method in `seed_database.py`
2. Add corresponding table creation SQL
3. Add seeding logic in `seed_data()` method

### Testing Changes
1. Run `python test_db_connection.py` first
2. Use a test database for development
3. Review seeded data in database client

## Integration

### With Docker
```dockerfile
# In Dockerfile
RUN pip install asyncpg pydantic pydantic-settings
COPY seed_database.py .
RUN python seed_database.py
```

### With CI/CD
```yaml
# In GitHub Actions or similar
- name: Seed Database
  run: |
    cd backend
    python seed_database.py
```

### With Application Startup
```python
# In main.py or startup
if settings.seed_on_startup:
    from seed_database import DatabaseSeeder
    seeder = DatabaseSeeder()
    await seeder.seed_data()
```

## Data Sources

The seed data is extracted from these frontend components:
- `src/components/Experience.tsx` - Work experience
- `src/components/Projects.tsx` - Project listings
- `src/components/TechStack.tsx` - Technical skills
- `src/components/Certifications.tsx` - Certifications
- `src/components/Education.tsx` - Educational background
- `src/lib/projectGenerator.ts` - Project templates and categories

This ensures the database stays in sync with the frontend static data.