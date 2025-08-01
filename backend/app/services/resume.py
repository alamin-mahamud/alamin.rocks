from typing import List, Optional
from datetime import datetime
import logging
from app.models.resume import (
    Resume, ContactInfo, Experience, Project, Education,
    Award, Certification, SkillCategory, CommunityEngagement
)

logger = logging.getLogger(__name__)

class ResumeService:
    def __init__(self):
        # Initialize with resume data
        self.resume_data = self._initialize_resume_data()
    
    def _initialize_resume_data(self) -> Resume:
        """Initialize resume with default data"""
        return Resume(
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
                    company="BriteCore Inc",
                    role="Platform Engineer - Platform & Cloud Team",
                    duration="Apr 2021 - Jan 2022",
                    location="Springfield, MO, USA",
                    current=False,
                    achievements=[
                        "Cut AWS cloud costs by ~$36.5K/year by optimizing log ingestion on CloudWatch",
                        "Mitigated data breaches and multi-million dollar customer churn by enhancing client data security",
                        "Boosted system scalability and maintainability by 40% by leading cross-functional teams",
                        "Expedited go-to-market timelines by ~30% and boosted overall product performance by ~15%",
                        "Engineered a robust Data Abstraction Layer (DAL) enabling users to query observability metrics from 50+ accounts"
                    ],
                    technologies=["AWS", "CloudWatch", "Terraform", "Python", "PostgreSQL", "Multi-account AWS"]
                ),
                
                Experience(
                    id="5",
                    company="BriteCore Inc",
                    role="Site Reliability Engineer - SRE & SysOps Team",
                    duration="Sep 2019 - Mar 2021",
                    location="Springfield, MO, USA",
                    current=False,
                    achievements=[
                        "Upheld 99.99% SLA for 50+ clients by integrating advanced monitoring tools",
                        "Eliminated 30 minutes of downtime by implementing blue/green deployments",
                        "Elevated internal team satisfaction by 20% by enabling custom production data selection",
                        "Automated support operations by reducing manual toil by 75%",
                        "Boosted high-profile customer satisfaction to 90% by enabling continuous delivery"
                    ],
                    technologies=["AWS", "Monitoring", "Blue/Green Deployments", "Automation", "SLA Management"]
                ),
                
                Experience(
                    id="6",
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
                ),
                
                Experience(
                    id="7",
                    company="Portonics LLC",
                    role="Software Engineer",
                    duration="Apr 2018 - Apr 2019",
                    location="Dhaka, Bangladesh (On-Site)",
                    current=False,
                    achievements=[
                        "Sustained 99.99% uptime for high-traffic applications with 1M+ daily hits",
                        "Reduced page load times by over 90% by implementing robust caching mechanisms",
                        "Enabled EMI features in the payment module by integrating with secure payment gateway",
                        "Expanded system scalability for nationwide distribution network by decoupling monolithic architecture"
                    ],
                    technologies=["High-traffic systems", "Caching", "Payment Integration", "Microservices", "Load Balancing"]
                ),
                
                Experience(
                    id="8",
                    company="Cookups LLC",
                    role="Jr. Software Engineer",
                    duration="Dec 2017 - Mar 2018",
                    location="Dhaka, Bangladesh (On-Site)",
                    current=False,
                    achievements=[
                        "Streamlined promotional workflows by 25% by integrating enhanced promo code generation",
                        "Developed a messenger bot that can automate customer interactions for delivery service"
                    ],
                    technologies=["Workflow Automation", "Bot Development", "Integration Systems"]
                )
            ],
            
            projects=self._get_projects(),
            education=self._get_education(),
            awards=self._get_awards(),
            certifications=self._get_certifications(),
            skills=self._get_skills(),
            community_engagement=self._get_community_engagement(),
            updated_at=datetime.now()
        )
    
    def _get_projects(self) -> List[Project]:
        return [
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
        ]
    
    def _get_education(self) -> List[Education]:
        return [
            Education(
                id="1",
                institution="Chittagong University of Engineering & Technology",
                degree="Bachelor of Science",
                field="Mechanical Engineering",
                location="Chittagong, Bangladesh",
                duration="Mar 2013 - Sep 2017"
            )
        ]
    
    def _get_awards(self) -> List[Award]:
        return [
            Award(
                id="1",
                title="International Engineering Innovation Summit 2015",
                organization="Hackathon Champion & App Fest Runner-Up",
                location="Dhaka, Bangladesh",
                year="2015"
            )
        ]
    
    def _get_certifications(self) -> List[Certification]:
        return [
            Certification(
                id="1",
                name="Certified Kubernetes Administrator",
                organization="Kubernetes",
                status="In-Progress"
            )
        ]
    
    def _get_skills(self) -> List[SkillCategory]:
        return [
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
        ]
    
    def _get_community_engagement(self) -> List[CommunityEngagement]:
        return [
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
        ]
    
    async def get_resume(self) -> Resume:
        """Get complete resume data"""
        return self.resume_data
    
    async def get_contact_info(self) -> ContactInfo:
        """Get contact information"""
        return self.resume_data.contact
    
    async def get_experiences(self, current_only: bool = False) -> List[Experience]:
        """Get work experiences with optional filtering"""
        if current_only:
            return [exp for exp in self.resume_data.experiences if exp.current]
        return self.resume_data.experiences
    
    async def get_projects(self, featured_only: bool = False) -> List[Project]:
        """Get projects with optional filtering"""
        if featured_only:
            return [proj for proj in self.resume_data.projects if proj.featured]
        return self.resume_data.projects
    
    async def get_skills(self) -> List[SkillCategory]:
        """Get categorized skills"""
        return self.resume_data.skills
    
    async def get_education(self) -> List[Education]:
        """Get education details"""
        return self.resume_data.education
    
    async def get_awards(self) -> List[Award]:
        """Get awards and recognitions"""
        return self.resume_data.awards
    
    async def get_certifications(self) -> List[Certification]:
        """Get certifications"""
        return self.resume_data.certifications
    
    async def get_community_engagement(self) -> List[CommunityEngagement]:
        """Get community engagement activities"""
        return self.resume_data.community_engagement