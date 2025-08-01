from typing import List, Optional
from datetime import datetime
import uuid
import logging
from app.schemas.portfolio import ProjectCreate, ProjectUpdate, ProjectResponse

logger = logging.getLogger(__name__)

class PortfolioService:
    def __init__(self):
        # Initialize with real project data from frontend
        self.projects = [
            ProjectResponse(
                id="1",
                title="AI-Powered Model Customization Platform (MCP)",
                description="Revolutionary LLM integration platform that accelerated time-to-market by 40% and boosted qualified lead discovery by 25%.",
                technologies=["MCP Protocol", "LLM Integration", "AI-SDK", "TypeScript", "PostgreSQL", "Nest.JS", "Next.JS", "Python", "TensorFlow"],
                github_url="https://github.com/leadsync-ai/mcp-platform",
                live_url="https://leadsync.ai",
                image_url="/images/projects/mcp-platform.png",
                featured=True,
                created_at=datetime.now(),
                updated_at=datetime.now()
            ),
            ProjectResponse(
                id="2",
                title="Cloud Cost Optimization Engine",
                description="AI-driven cost optimization system that saved $1M+ in cloud expenses across 50+ enterprise clients.",
                technologies=["Python", "AWS", "Terraform", "Kubernetes", "Machine Learning", "Prometheus", "Grafana", "DataDog"],
                github_url="https://github.com/alamin-mahamud/cloud-optimizer",
                image_url="/images/projects/cloud-optimizer.png",
                featured=True,
                created_at=datetime.now(),
                updated_at=datetime.now()
            ),
            ProjectResponse(
                id="3",
                title="HomeLab: GitOps Infrastructure",
                description="Production-grade homelab automation framework with Kubernetes orchestration and Infrastructure as Code.",
                technologies=["Terraform", "Kubernetes", "Ansible", "GitOps", "ArgoCD", "Prometheus", "Grafana", "Traefik"],
                github_url="https://github.com/alamin-mahamud/homelab",
                image_url="/images/projects/homelab.png",
                featured=True,
                created_at=datetime.now(),
                updated_at=datetime.now()
            ),
            ProjectResponse(
                id="4",
                title="Alexandria: Multi-Cloud IaC Library",
                description="Terraform modules library for enterprise-grade multi-cloud deployments across AWS, GCP, and Azure.",
                technologies=["Terraform", "AWS", "GCP", "Azure", "Infrastructure as Code", "Compliance", "Security"],
                github_url="https://github.com/alamin-mahamud/alexandria",
                image_url="/images/projects/alexandria.png",
                featured=True,
                created_at=datetime.now(),
                updated_at=datetime.now()
            ),
            ProjectResponse(
                id="5",
                title="Asset Allocation AI Solver",
                description="Machine learning-powered optimization engine for strategic resource allocation in complex environments.",
                technologies=["Python", "TensorFlow", "Optimization Algorithms", "Reinforcement Learning", "Mathematical Modeling"],
                github_url="https://github.com/alamin-mahamud/capstone",
                image_url="/images/projects/asset-optimizer.png",
                featured=False,
                created_at=datetime.now(),
                updated_at=datetime.now()
            ),
            ProjectResponse(
                id="6",
                title="AlterYouth: Social Impact Platform",
                description="Blockchain-powered scholarship platform connecting global donors with students in need.",
                technologies=["Full-Stack Development", "Blockchain", "Digital Banking", "Payment Processing", "React", "Node.js"],
                github_url="https://github.com/alamin-mahamud/alteryouth",
                live_url="https://alteryouth.com",
                image_url="/images/projects/alteryouth.png",
                featured=False,
                created_at=datetime.now(),
                updated_at=datetime.now()
            )
        ]
    
    async def get_all_projects(self, featured: Optional[bool] = None) -> List[ProjectResponse]:
        """Get all projects with optional filtering"""
        if featured is not None:
            return [p for p in self.projects if p.featured == featured]
        return self.projects
    
    async def get_project_by_id(self, project_id: str) -> Optional[ProjectResponse]:
        """Get specific project by ID"""
        for project in self.projects:
            if project.id == project_id:
                return project
        return None
    
    async def create_project(self, project_data: ProjectCreate) -> ProjectResponse:
        """Create a new project"""
        try:
            project_id = str(uuid.uuid4())
            new_project = ProjectResponse(
                id=project_id,
                **project_data.dict(),
                created_at=datetime.now(),
                updated_at=datetime.now()
            )
            self.projects.append(new_project)
            logger.info(f"Created new project: {new_project.title}")
            return new_project
        except Exception as e:
            logger.error(f"Error creating project: {str(e)}")
            raise
    
    async def update_project(self, project_id: str, update_data: ProjectUpdate) -> Optional[ProjectResponse]:
        """Update an existing project"""
        for i, project in enumerate(self.projects):
            if project.id == project_id:
                update_dict = update_data.dict(exclude_unset=True)
                if update_dict:
                    for field, value in update_dict.items():
                        setattr(project, field, value)
                    project.updated_at = datetime.now()
                    logger.info(f"Updated project: {project.title}")
                return project
        return None
    
    async def delete_project(self, project_id: str) -> bool:
        """Delete a project"""
        for i, project in enumerate(self.projects):
            if project.id == project_id:
                del self.projects[i]
                logger.info(f"Deleted project: {project_id}")
                return True
        return False