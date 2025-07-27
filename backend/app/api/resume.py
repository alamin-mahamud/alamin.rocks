from fastapi import APIRouter, HTTPException
from typing import List
from datetime import datetime
from app.models.resume import (
    Resume, ContactInfo, Experience, Project, Education, 
    Award, Certification, SkillCategory, CommunityEngagement
)

router = APIRouter()

# Resume data based on the provided PDF
resume_data = Resume(
    contact=ContactInfo(
        name="Md. Alamin Mahamud",
        email="hello@alamin.rocks",
        phone="+880 168 7060 434",
        website="https://alamin.rocks",
        location="Istanbul, Turkey"
    ),
    
    executive_summary=[
        "Dynamic technology leader with 10+ years of expertise in building scalable cloud platforms & leading DevOps + SRE teams.",
        "Proven track record of saving over $1M in cloud costs and contributing to SaaS ARR of $20M+.",
        "A multi-dimensional thinker with a global mindset, systems-level thinking, and a relentless execution habit."
    ],
    
    experiences=[
        Experience(
            id="1",
            company="Kahf Yazılım A.Ş.",
            role="Senior DevOps Engineer",
            duration="May 2025 - July 2027",
            location="Istanbul, Turkey",
            current=True,
            achievements=[
                "On a mission to make online world safe & secure",
                "Migrating the entire infrastructure from Azure to Bare-metal"
            ],
            technologies=["Bind9", "CloudNative-PG", "Kubernetes", "Ansible", "Terraform", "Microsoft Azure", "Traefik", "Helm Charts", "Prometheus", "Grafana", "Loki"]
        ),
        
        Experience(
            id="2",
            company="LeadSync.ai",
            role="Senior Software Engineer - AI Products",
            duration="May 2025 - July 2027",
            location="Singapore, Remote",
            current=True,
            achievements=[
                "Accelerated time-to-market by 40% by architecting and deploying an end-to-end integration of the Model Customization Platform (MCP) with advanced large language models (LLMs)",
                "Boosted qualified lead discovery by 25% through AI-driven lead scoring, semantic enrichment, and personalized outreach recommendations"
            ],
            technologies=["MCP Protocol", "LLM Integration", "AI-SDK", "TypeScript", "PostgreSQL", "Nest.JS", "Next.JS"]
        ),
        
        Experience(
            id="3",
            company="BriteCore Inc",
            role="Senior Platform Engineer & SRE – Cloud Team",
            duration="Feb 2022 - Jan 2025",
            location="Springfield, MO, USA",
            current=False,
            achievements=[
                "Generated $20M+ ARR by designing, implementing, and maintaining highly available, cost-efficient SaaS platforms",
                "Cut $1M+ cloud bill by spearheading cloud cost-saving initiatives",
                "Eliminated 30% of production brownouts by optimizing runtime configuration and state management",
                "Accelerated development cycles by ~35% by engineering CI/CD pipelines with GitHub Actions self-hosted runners",
                "Attained SOC2 compliance by lowering vulnerability exposure by ~60%",
                "Neutralized DDoS attacks from high-volume bot traffic through proactive monitoring",
                "Streamlined infrastructure provisioning by 80% by leveraging Terraform modules"
            ],
            technologies=["AWS", "Terraform", "Kubernetes", "Docker", "GitHub Actions", "DataDog", "Python", "PostgreSQL"]
        ),
        
        Experience(
            id="4",
            company="Pathao LLC",
            role="Software Engineer",
            duration="May 2019 - Jul 2019",
            location="Dhaka, Bangladesh (On-Site)",
            current=False,
            achievements=[
                "Migrated 2M user ratings by architecting and deploying a scalable feedback system",
                "Standardized API structure by bootstrapping a robust API aggregation service",
                "Optimized order invoicing by authoring a stateless microservice to calculate invoice amounts accurately"
            ],
            technologies=["Microservices", "API Design", "Scalable Architecture", "Database Migration"]
        )
    ],
    
    projects=[
        Project(
            id="1",
            title="HomeLab",
            description="Infrastructure as Code and GitOps framework to automate provisioning, operating, and updating self-hosted services. Highly customizable homelab management system.",
            technologies=["Terraform", "Kubernetes", "Ansible", "GitOps", "Infrastructure as Code"],
            github_url="https://github.com/alamin-mahamud/homelab",
            featured=True
        ),
        
        Project(
            id="2",
            title="Alexandria",
            description="Terraform library providing Infrastructure as Code (IaC) templates and modules for deployment and management of cloud-based architectures.",
            technologies=["Terraform", "AWS", "GCP", "Azure", "Infrastructure as Code"],
            github_url="https://github.com/alamin-mahamud/alexandria",
            featured=True
        ),
        
        Project(
            id="3",
            title="Capstone: Asset Allocation Solver",
            description="Solves the Asset Allocation Problem - determining optimal resource allocation to maximize results given constraints and metrics. Strategy game optimization approach.",
            technologies=["Python", "Optimization Algorithms", "Mathematical Modeling", "Resource Management"],
            github_url="https://github.com/alamin-mahamud/capstone",
            featured=True
        ),
        
        Project(
            id="4",
            title="AlterYouth.com",
            description="'The Uber for Scholarships' - C2C scholarship platform enabling users worldwide to start scholarships for financially struggling students in Bangladesh through digital banking.",
            technologies=["Full-Stack Development", "Digital Banking Integration", "Payment Processing", "Social Impact Platform"],
            github_url="https://github.com/alamin-mahamud/alteryouth",
            featured=False
        )
    ],
    
    education=[
        Education(
            id="1",
            institution="Chittagong University of Engineering & Technology",
            degree="Bachelor of Science",
            field="Mechanical Engineering",
            location="Chittagong, Bangladesh",
            duration="Mar 2013 - Sep 2017"
        )
    ],
    
    awards=[
        Award(
            id="1",
            title="International Engineering Innovation Summit 2015",
            organization="Hackathon Champion & App Fest Runner-Up",
            location="Dhaka, Bangladesh",
            year="2015"
        )
    ],
    
    certifications=[
        Certification(
            id="1",
            name="Certified Kubernetes Administrator",
            organization="Kubernetes",
            status="In-Progress"
        )
    ],
    
    skills=[
        SkillCategory(
            category="SaaS Architecture, Development",
            skills=["Python", "Go", "TypeScript", "FastAPI", "Nest.JS", "Gin", "Flask", "Django", "REST", "gRPC", "JWT", "PostgreSQL", "MySQL", "Redis", "RabbitMQ", "Elasticsearch", "OpenSearch"]
        ),
        
        SkillCategory(
            category="Cloud & DevOps Tools",
            skills=["AWS", "GCP", "Azure", "Terraform", "AWS CDK", "CloudFormation", "Ansible", "SaltStack", "GitHub Actions", "Jenkins", "OSI", "IPv6", "DNS", "TLS", "Firewalls", "BGP"]
        ),
        
        SkillCategory(
            category="Kubernetes Ecosystem",
            skills=["Docker", "Containerd", "LXC", "Kubernetes", "ECS", "EKS", "kubeadm", "MetalLB", "Calico", "VXLAN/IPIP", "Longhorn", "Nginx", "Traefik", "Istio", "Helm", "Kustomize", "ArgoCD"]
        ),
        
        SkillCategory(
            category="Linux Administration & Performance Tuning",
            skills=["Debian", "Ubuntu", "Kali", "Arch", "sysctl", "cgroups", "eBPF", "perf", "strace", "lsof", "iostat", "htop", "sar", "LVM", "RAID", "ZFS"]
        ),
        
        SkillCategory(
            category="Observability & Security",
            skills=["DataDog", "CloudWatch", "Prometheus", "Grafana", "Loki", "ELK", "ElasticSearch", "LogStash", "Kibana", "SOC2", "OWASP", "DDoS Protection"]
        )
    ],
    
    community_engagement=[
        CommunityEngagement(
            id="1",
            type="Host",
            platform="Source Code Podcast",
            description="Host at Source Code Podcast"
        ),
        
        CommunityEngagement(
            id="2",
            type="Content Contributor",
            platform="LinkedIn",
            description="Regular content contributor around AI, DevOps, Startup Vision",
            followers="1K+"
        )
    ],
    
    updated_at=datetime.now()
)

@router.get("/resume", response_model=Resume)
async def get_resume():
    """Get complete resume data"""
    return resume_data

@router.get("/resume/contact", response_model=ContactInfo)
async def get_contact_info():
    """Get contact information"""
    return resume_data.contact

@router.get("/resume/experience", response_model=List[Experience])
async def get_experience(current_only: bool = False):
    """Get work experience"""
    if current_only:
        return [exp for exp in resume_data.experiences if exp.current]
    return resume_data.experiences

@router.get("/resume/projects", response_model=List[Project])
async def get_projects(featured_only: bool = False):
    """Get projects"""
    if featured_only:
        return [proj for proj in resume_data.projects if proj.featured]
    return resume_data.projects

@router.get("/resume/skills", response_model=List[SkillCategory])
async def get_skills():
    """Get skills categorized"""
    return resume_data.skills

@router.get("/resume/education", response_model=List[Education])
async def get_education():
    """Get education"""
    return resume_data.education

@router.get("/resume/awards", response_model=List[Award])
async def get_awards():
    """Get awards and recognitions"""
    return resume_data.awards

@router.get("/resume/certifications", response_model=List[Certification])
async def get_certifications():
    """Get certifications"""
    return resume_data.certifications