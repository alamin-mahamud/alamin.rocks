from fastapi import APIRouter, HTTPException, Depends, status
from typing import List, Optional
from app.schemas.portfolio import ProjectCreate, ProjectUpdate, ProjectResponse
from app.services.portfolio import PortfolioService
from app.core.dependencies import get_portfolio_service

router = APIRouter()

@router.get("/projects", response_model=List[ProjectResponse])
async def get_projects(
    featured: Optional[bool] = None,
    service: PortfolioService = Depends(get_portfolio_service)
):
    """
    Get all projects with optional filtering by featured status
    """
    return await service.get_all_projects(featured=featured)

@router.get("/projects/{project_id}", response_model=ProjectResponse)
async def get_project(
    project_id: str,
    service: PortfolioService = Depends(get_portfolio_service)
):
    """
    Get specific project by ID
    """
    project = await service.get_project_by_id(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with ID {project_id} not found"
        )
    return project

@router.post("/projects", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
async def create_project(
    project: ProjectCreate,
    service: PortfolioService = Depends(get_portfolio_service)
):
    """
    Create a new project
    """
    try:
        return await service.create_project(project)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create project: {str(e)}"
        )

@router.patch("/projects/{project_id}", response_model=ProjectResponse)
async def update_project(
    project_id: str,
    project_update: ProjectUpdate,
    service: PortfolioService = Depends(get_portfolio_service)
):
    """
    Update an existing project
    """
    updated_project = await service.update_project(project_id, project_update)
    if not updated_project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with ID {project_id} not found"
        )
    return updated_project

@router.delete("/projects/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(
    project_id: str,
    service: PortfolioService = Depends(get_portfolio_service)
):
    """
    Delete a project
    """
    deleted = await service.delete_project(project_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with ID {project_id} not found"
        )