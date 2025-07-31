# API Documentation

## Overview

The alamin.rocks portfolio backend provides a REST API built with FastAPI, offering endpoints for portfolio data, contact forms, and integration with external services like GitHub and LinkedIn.

## Base URL

```
Production: https://api.alamin.rocks
Development: http://localhost:8000
```

## Authentication

Currently, the API uses simple rate limiting for public endpoints. Future versions may implement JWT authentication for admin features.

```python
# Rate limiting configuration
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
```

## API Endpoints

### Health Check

#### GET /health
Basic health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "1.0.0"
}
```

#### GET /health/detailed
Comprehensive health check with system metrics.

**Response:**
```json
{
  "status": "healthy",
  "services": {
    "database": "healthy",
    "redis": "healthy"
  },
  "system": {
    "cpu_percent": 15.2,
    "memory_percent": 45.8,
    "memory_available": 8589934592
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Portfolio Data

#### GET /api/profile
Get basic profile information.

**Response:**
```json
{
  "name": "Alamin Mahamud",
  "title": "Senior DevOps Engineer & AI Products Engineer",
  "location": "Istanbul, Turkey / Remote",
  "experience_years": 10,
  "email": "hello@alamin.rocks",
  "linkedin": "https://linkedin.com/in/alamin-mahamud",
  "github": "https://github.com/alamin-mahamud",
  "summary": "Dynamic technology leader with 10+ years of expertise...",
  "current_roles": [
    {
      "company": "Kahf Yazılım A.Ş.",
      "position": "Senior DevOps Engineer",
      "start_date": "2025-05-01",
      "end_date": null,
      "current": true
    },
    {
      "company": "LeadSync.ai",
      "position": "Senior Software Engineer - AI Products",
      "start_date": "2025-05-01", 
      "end_date": null,
      "current": true
    }
  ]
}
```

#### GET /api/skills
Get technical skills with proficiency levels.

**Parameters:**
- `category` (optional): Filter by skill category (programming, cloud, orchestration, etc.)

**Response:**
```json
{
  "skills": [
    {
      "name": "Python",
      "category": "programming",
      "proficiency": 95,
      "years_experience": 8,
      "projects_count": 45,
      "icon": "python",
      "color": "#3776ab"
    },
    {
      "name": "AWS",
      "category": "cloud",
      "proficiency": 95,
      "years_experience": 7,
      "projects_count": 50,
      "icon": "aws",
      "color": "#ff9900"
    }
  ],
  "summary": {
    "total_skills": 20,
    "expert_level_skills": 8,
    "average_proficiency": 89,
    "total_projects": 600
  }
}
```

#### GET /api/projects
Get portfolio projects.

**Parameters:**
- `category` (optional): Filter by project category (AI/ML, DevOps/SRE, Infrastructure, etc.)
- `featured` (optional): Filter featured projects only
- `limit` (optional): Limit number of results (default: 20)

**Response:**
```json
{
  "projects": [
    {
      "id": "mcp-platform",
      "title": "AI-Powered Model Customization Platform (MCP)",
      "description": "Revolutionary LLM integration platform that accelerated time-to-market by 40%",
      "long_description": "End-to-end integration platform for advanced large language models...",
      "category": "AI/ML",
      "technologies": ["MCP Protocol", "LLM Integration", "TypeScript", "PostgreSQL"],
      "github_url": "https://github.com/leadsync-ai/mcp-platform",
      "live_url": "https://leadsync.ai",
      "demo_url": "https://demo.leadsync.ai",
      "featured": true,
      "status": "maintained",
      "ai_powered": true,
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
      "created_at": "2024-05-01T00:00:00Z",
      "updated_at": "2024-12-15T10:30:00Z"
    }
  ],
  "total": 6,
  "categories": ["AI/ML", "DevOps/SRE", "Infrastructure", "Social Impact"]
}
```

#### GET /api/achievements
Get professional achievements and metrics.

**Parameters:**
- `category` (optional): Filter by achievement category (financial, operational, performance, etc.)

**Response:**
```json
{
  "achievements": [
    {
      "id": "cloud-savings",
      "title": "Cloud Cost Optimization",
      "value": "$1.2M+",
      "description": "Total cloud infrastructure cost savings achieved",
      "category": "financial",
      "percentage": 100,
      "details": [
        "Optimized AWS CloudWatch log ingestion saving $36.5K/year",
        "Implemented intelligent resource rightsizing algorithms",
        "Automated cost monitoring and alert systems"
      ],
      "date_achieved": "2024-01-01T00:00:00Z"
    }
  ],
  "summary": {
    "total_financial_impact": "$21.2M+",
    "users_served": "100K+",
    "uptime_percentage": 99.99,
    "cost_savings": "$1.2M+",
    "arr_contribution": "$20M+"
  }
}
```

#### GET /api/experience
Get work experience timeline.

**Response:**
```json
{
  "experience": [
    {
      "company": "Kahf Yazılım A.Ş.",
      "position": "Senior DevOps Engineer",
      "start_date": "2025-05-01",
      "end_date": null,
      "current": true,
      "location": "Istanbul, Turkey",
      "employment_type": "Full-time",
      "achievements": [
        "On a mission to make online world safe & secure",
        "Migrating the entire infrastructure from Azure to Bare-metal"
      ],
      "technologies": ["Bind9", "CloudNative-PG", "Kubernetes", "Ansible"],
      "website": "https://kahf.co"
    }
  ],
  "total_years": 10,
  "current_positions": 2
}
```

### Contact Management

#### POST /api/contact
Submit contact form.

**Rate Limit:** 5 requests per minute per IP

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Collaboration Opportunity",
  "message": "Hi Alamin, I'd like to discuss a potential collaboration...",
  "company": "Tech Corp" // optional
}
```

**Response:**
```json
{
  "id": "contact_123456",
  "status": "received",
  "message": "Thank you for your message. I'll get back to you soon!",
  "created_at": "2024-01-15T10:30:00Z"
}
```

**Error Responses:**
```json
// Validation Error
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}

// Rate Limit Error
{
  "error": "Rate limit exceeded",
  "message": "Too many requests. Try again in 60 seconds.",
  "retry_after": 60
}
```

### External Integrations

#### GET /api/github/stats
Get GitHub statistics (cached for 1 hour).

**Response:**
```json
{
  "user": {
    "login": "alamin-mahamud",
    "name": "Alamin Mahamud",
    "public_repos": 45,
    "followers": 156,
    "following": 89
  },
  "repositories": [
    {
      "name": "homelab",
      "description": "Infrastructure as Code and GitOps framework",
      "stars": 89,
      "forks": 15,
      "language": "Python",
      "updated_at": "2024-01-10T15:30:00Z"
    }
  ],
  "stats": {
    "total_stars": 847,
    "total_forks": 234,
    "total_commits_2024": 1250,
    "languages": {
      "Python": 35.2,
      "TypeScript": 28.7,
      "Go": 18.1,
      "Shell": 12.3,
      "Other": 5.7
    }
  },
  "cached_at": "2024-01-15T10:00:00Z"
}
```

#### GET /api/github/activity
Get recent GitHub activity (cached for 30 minutes).

**Response:**
```json
{
  "recent_commits": [
    {
      "repo": "alamin-mahamud/homelab",
      "message": "feat: add Prometheus monitoring stack",
      "date": "2024-01-14T18:45:00Z",
      "sha": "a1b2c3d"
    }
  ],
  "recent_releases": [
    {
      "repo": "alamin-mahamud/alexandria",
      "tag": "v2.1.0",
      "name": "Multi-cloud Terraform modules update",
      "date": "2024-01-12T12:00:00Z"
    }
  ],
  "contribution_summary": {
    "commits_this_week": 15,
    "commits_this_month": 67,
    "commits_this_year": 1250
  }
}
```

### Resume and CV

#### GET /api/resume
Get structured resume data.

**Response:**
```json
{
  "personal_info": {
    "name": "Alamin Mahamud",
    "title": "Senior DevOps Engineer & AI Products Engineer",
    "email": "hello@alamin.rocks",
    "phone": null,
    "location": "Istanbul, Turkey / Remote",
    "linkedin": "https://linkedin.com/in/alamin-mahamud",
    "github": "https://github.com/alamin-mahamud"
  },
  "summary": "Dynamic technology leader with 10+ years of expertise...",
  "experience": [...], // Same as /api/experience
  "education": [
    {
      "institution": "University Name",
      "degree": "Computer Science",
      "start_date": "2013-09-01",
      "end_date": "2017-06-01",
      "gpa": null
    }
  ],
  "skills": [...], // Same as /api/skills
  "certifications": [
    {
      "name": "AWS Certified Solutions Architect",
      "issuer": "Amazon Web Services",
      "date": "2023-06-15",
      "credential_id": "AWS-123456"
    }
  ],
  "languages": [
    {
      "language": "English",
      "proficiency": "Native/Bilingual"
    },
    {
      "language": "Bengali",
      "proficiency": "Native"
    }
  ]
}
```

#### GET /api/resume/pdf
Download resume as PDF.

**Response:** PDF file download

**Headers:**
```
Content-Type: application/pdf
Content-Disposition: attachment; filename="Alamin_Mahamud_Resume.pdf"
```

## Error Handling

### Error Response Format
All API errors follow a consistent format:

```json
{
  "error": "error_code",
  "message": "Human readable error message",
  "details": {}, // Optional additional details
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `429` - Rate Limit Exceeded
- `500` - Internal Server Error
- `503` - Service Unavailable

### Common Error Codes
```json
// Validation Error
{
  "error": "validation_error",
  "message": "Invalid request data",
  "details": {
    "field": "email",
    "issue": "Invalid email format"
  }
}

// Rate Limit Error
{
  "error": "rate_limit_exceeded",
  "message": "Too many requests",
  "details": {
    "limit": 100,
    "window": 3600,
    "retry_after": 60
  }
}

// Not Found Error
{
  "error": "not_found",
  "message": "Resource not found",
  "details": {
    "resource": "project",
    "id": "invalid-id"
  }
}
```

## Rate Limiting

### Default Limits
- **Contact Form:** 5 requests per minute per IP
- **General API:** 100 requests per hour per IP
- **GitHub Integration:** 50 requests per hour per IP

### Rate Limit Headers
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642248000
```

## Caching

### Cache Headers
API responses include appropriate cache headers:

```
Cache-Control: public, max-age=3600
ETag: "a1b2c3d4e5f6"
Last-Modified: Mon, 15 Jan 2024 10:30:00 GMT
```

### Cache Strategy
- **Static Data:** 1 hour cache (profile, skills, experience)
- **Dynamic Data:** 30 minutes cache (GitHub stats, contact responses)
- **Real-time Data:** No cache (health checks, live metrics)

## WebSocket API (Future)

### Real-time Updates
```javascript
// Connect to WebSocket
const ws = new WebSocket('wss://api.alamin.rocks/ws')

// Subscribe to updates
ws.send(JSON.stringify({
  type: 'subscribe',
  channels: ['github_activity', 'portfolio_updates']
}))

// Receive updates
ws.onmessage = (event) => {
  const data = JSON.parse(event.data)
  console.log('Update received:', data)
}
```

## SDK and Client Libraries

### JavaScript/TypeScript SDK
```typescript
// npm install @alamin/portfolio-sdk
import { PortfolioAPI } from '@alamin/portfolio-sdk'

const api = new PortfolioAPI({
  baseURL: 'https://api.alamin.rocks',
  timeout: 10000
})

// Get projects
const projects = await api.projects.list({ category: 'AI/ML' })

// Submit contact form
await api.contact.submit({
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Hello!'
})
```

### Python SDK
```python
# pip install alamin-portfolio-sdk
from alamin_portfolio import PortfolioAPI

api = PortfolioAPI(base_url='https://api.alamin.rocks')

# Get achievements
achievements = api.achievements.list(category='financial')

# Get GitHub stats
github_stats = api.github.get_stats()
```

## OpenAPI/Swagger Documentation

Interactive API documentation is available at:
- **Production:** https://api.alamin.rocks/docs
- **Development:** http://localhost:8000/docs

### OpenAPI Specification
The complete OpenAPI 3.0 specification is available at:
- **JSON:** https://api.alamin.rocks/openapi.json
- **YAML:** https://api.alamin.rocks/openapi.yaml

## Testing

### Example API Tests
```python
import pytest
import httpx

@pytest.mark.asyncio
async def test_get_profile():
    async with httpx.AsyncClient() as client:
        response = await client.get("http://localhost:8000/api/profile")
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "Alamin Mahamud"
        assert "title" in data

@pytest.mark.asyncio  
async def test_contact_form():
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://localhost:8000/api/contact",
            json={
                "name": "Test User",
                "email": "test@example.com", 
                "message": "Test message"
            }
        )
        assert response.status_code == 201
        data = response.json()
        assert data["status"] == "received"
```

This comprehensive API documentation provides all the information needed to integrate with the alamin.rocks portfolio backend, including detailed endpoint specifications, error handling, and client SDK examples.