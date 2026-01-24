import logging
from datetime import datetime
from pathlib import Path
from typing import List

from fastapi import APIRouter, HTTPException, Response
from fastapi.responses import FileResponse

from app.schemas.cv import (
    CVCompileRequest,
    CVCompileResponse,
    CVListResponse,
    CVResponse,
    CVSourceRequest,
    CVSourceResponse,
    CVTemplateResponse,
    CVUpdateRequest,
)
from app.services.cv import (
    compile_latex,
    create_cv_document,
    delete_cv_document,
    get_active_cv,
    get_all_cvs,
    get_cv_by_id,
    get_template_by_id,
    get_templates,
    update_cv_document,
    PDF_OUTPUT_PATH,
)

logger = logging.getLogger(__name__)
router = APIRouter()


@router.get("", response_model=CVResponse)
async def get_cv():
    """Get the active CV document."""
    cv = await get_active_cv()
    if not cv:
        raise HTTPException(status_code=404, detail="No active CV found")

    return CVResponse(
        id=cv.id,
        name=cv.name,
        pdf_url=cv.pdf_path,
        is_active=cv.is_active,
        version=cv.version,
        updated_at=cv.updated_at
    )


@router.get("/list", response_model=CVListResponse)
async def list_cvs():
    """List all CV documents."""
    documents, active_id = await get_all_cvs()
    return CVListResponse(
        documents=[
            CVResponse(
                id=doc.id,
                name=doc.name,
                pdf_url=doc.pdf_path,
                is_active=doc.is_active,
                version=doc.version,
                updated_at=doc.updated_at
            )
            for doc in documents
        ],
        active_id=active_id
    )


@router.get("/source", response_model=CVSourceResponse)
async def get_cv_source():
    """Get the active CV source."""
    cv = await get_active_cv()
    if not cv:
        raise HTTPException(status_code=404, detail="No active CV found")

    return CVSourceResponse(
        id=cv.id,
        name=cv.name,
        latex_source=cv.latex_source,
        is_active=cv.is_active,
        version=cv.version,
        updated_at=cv.updated_at
    )


@router.get("/source/{cv_id}", response_model=CVSourceResponse)
async def get_cv_source_by_id(cv_id: str):
    """Get CV source by ID."""
    cv = await get_cv_by_id(cv_id)
    if not cv:
        raise HTTPException(status_code=404, detail="CV not found")

    return CVSourceResponse(
        id=cv.id,
        name=cv.name,
        latex_source=cv.latex_source,
        is_active=cv.is_active,
        version=cv.version,
        updated_at=cv.updated_at
    )


@router.put("/source", response_model=CVSourceResponse)
async def update_cv_source(request: CVSourceRequest):
    """Update the active CV source."""
    cv = await get_active_cv()
    if not cv:
        # Create a new CV if none exists
        cv = await create_cv_document(request.latex_source, request.name or "Resume")

    updated = await update_cv_document(
        cv.id,
        latex_source=request.latex_source,
        name=request.name
    )

    if not updated:
        raise HTTPException(status_code=500, detail="Failed to update CV")

    return CVSourceResponse(
        id=updated.id,
        name=updated.name,
        latex_source=updated.latex_source,
        is_active=updated.is_active,
        version=updated.version,
        updated_at=updated.updated_at
    )


@router.post("/compile", response_model=CVCompileResponse)
async def compile_cv(request: CVCompileRequest):
    """Compile LaTeX source to PDF."""
    result = await compile_latex(request.latex_source)

    if request.save and result.success:
        cv = await get_active_cv()
        if cv:
            await update_cv_document(cv.id, latex_source=request.latex_source)
        else:
            await create_cv_document(request.latex_source, request.name or "Resume")

    return CVCompileResponse(
        success=result.success,
        pdf_url=result.pdf_path,
        errors=result.errors,
        warnings=result.warnings,
        compilation_time_ms=result.compilation_time_ms
    )


@router.get("/pdf/{filename}")
async def get_pdf(filename: str):
    """Serve compiled PDF file."""
    pdf_path = PDF_OUTPUT_PATH / filename
    if not pdf_path.exists():
        raise HTTPException(status_code=404, detail="PDF not found")

    return FileResponse(
        path=str(pdf_path),
        media_type="application/pdf",
        filename=filename
    )


@router.get("/download")
async def download_cv():
    """Download the active CV PDF."""
    cv = await get_active_cv()
    if not cv or not cv.pdf_path:
        raise HTTPException(status_code=404, detail="No compiled CV available")

    filename = cv.pdf_path.split("/")[-1]
    pdf_path = PDF_OUTPUT_PATH / filename

    if not pdf_path.exists():
        raise HTTPException(status_code=404, detail="PDF file not found")

    return FileResponse(
        path=str(pdf_path),
        media_type="application/pdf",
        filename=f"{cv.name.replace(' ', '_')}_CV.pdf"
    )


@router.get("/templates", response_model=List[CVTemplateResponse])
async def list_templates():
    """Get all available CV templates."""
    templates = await get_templates()
    return [
        CVTemplateResponse(
            id=t.id,
            name=t.name,
            description=t.description,
            preview_image=t.preview_image,
            category=t.category
        )
        for t in templates
    ]


@router.get("/templates/{template_id}")
async def get_template(template_id: str):
    """Get a specific template with its LaTeX source."""
    template = await get_template_by_id(template_id)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")

    return {
        "id": template.id,
        "name": template.name,
        "description": template.description,
        "category": template.category,
        "latex_template": template.latex_template
    }


@router.post("", response_model=CVResponse)
async def create_cv(request: CVSourceRequest):
    """Create a new CV document."""
    cv = await create_cv_document(request.latex_source, request.name or "Resume")
    return CVResponse(
        id=cv.id,
        name=cv.name,
        pdf_url=cv.pdf_path,
        is_active=cv.is_active,
        version=cv.version,
        updated_at=cv.updated_at
    )


@router.put("/{cv_id}", response_model=CVResponse)
async def update_cv(cv_id: str, request: CVUpdateRequest):
    """Update a CV document."""
    cv = await update_cv_document(
        cv_id,
        latex_source=request.latex_source,
        name=request.name,
        is_active=request.is_active
    )

    if not cv:
        raise HTTPException(status_code=404, detail="CV not found")

    return CVResponse(
        id=cv.id,
        name=cv.name,
        pdf_url=cv.pdf_path,
        is_active=cv.is_active,
        version=cv.version,
        updated_at=cv.updated_at
    )


@router.delete("/{cv_id}")
async def delete_cv(cv_id: str):
    """Delete a CV document."""
    success = await delete_cv_document(cv_id)
    if not success:
        raise HTTPException(status_code=404, detail="CV not found")
    return {"success": True, "message": "CV deleted successfully"}


@router.post("/{cv_id}/activate")
async def activate_cv(cv_id: str):
    """Set a CV as active."""
    cv = await update_cv_document(cv_id, is_active=True)
    if not cv:
        raise HTTPException(status_code=404, detail="CV not found")
    return {"success": True, "message": "CV activated successfully"}
