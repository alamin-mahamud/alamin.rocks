import asyncio
import logging
import os
import shutil
import subprocess
import tempfile
import time
import uuid
from datetime import datetime
from pathlib import Path
from typing import List, Optional, Tuple

from app.models.cv import CVDocument, CVStatus, CVTemplate, CompilationResult

logger = logging.getLogger(__name__)

# Storage paths
CV_STORAGE_PATH = Path("/app/storage/cv")
PDF_OUTPUT_PATH = Path("/app/storage/cv/pdf")
LATEX_SOURCE_PATH = Path("/app/storage/cv/source")
STATIC_CV_PATH = Path("/app/static/cv/Alamin_Mahamud_CV.pdf")

# Ensure directories exist
CV_STORAGE_PATH.mkdir(parents=True, exist_ok=True)
PDF_OUTPUT_PATH.mkdir(parents=True, exist_ok=True)
LATEX_SOURCE_PATH.mkdir(parents=True, exist_ok=True)


# In-memory storage for demo (replace with database in production)
_cv_documents: dict[str, CVDocument] = {}
_active_cv_id: Optional[str] = None
_initialized: bool = False


# Default LaTeX resume template
DEFAULT_LATEX_TEMPLATE = r"""\documentclass[11pt,a4paper,sans]{moderncv}

\moderncvstyle{classic}
\moderncvcolor{blue}

\usepackage[scale=0.85]{geometry}
\usepackage[utf8]{inputenc}

% Personal data
\name{Al-Amin}{Howlader}
\title{Senior DevOps/SRE Engineer}
\address{Dhaka}{Bangladesh}
\phone[mobile]{+880-XXX-XXXXXXX}
\email{contact@alamin.rocks}
\homepage{alamin.rocks}
\social[linkedin]{alamin-howlader}
\social[github]{alamin-rocks}

\begin{document}

\makecvtitle

\section{Professional Summary}
Experienced DevOps/SRE Engineer with 8+ years of expertise in cloud infrastructure,
Kubernetes orchestration, and CI/CD pipeline automation. Passionate about building
scalable, reliable systems and implementing SRE best practices.

\section{Experience}
\cventry{2020--Present}{Senior DevOps Engineer}{Company Name}{Dhaka}{}{
\begin{itemize}
\item Architected and maintained Kubernetes clusters serving 1M+ daily users
\item Reduced deployment time by 75\% through CI/CD pipeline optimization
\item Implemented comprehensive monitoring with Prometheus and Grafana
\end{itemize}}

\cventry{2018--2020}{DevOps Engineer}{Previous Company}{Dhaka}{}{
\begin{itemize}
\item Managed AWS infrastructure using Terraform and CloudFormation
\item Automated infrastructure provisioning reducing setup time by 80\%
\end{itemize}}

\section{Skills}
\cvitem{Cloud}{AWS, GCP, Azure, DigitalOcean}
\cvitem{Containers}{Docker, Kubernetes, Helm, Istio}
\cvitem{IaC}{Terraform, Ansible, Pulumi}
\cvitem{CI/CD}{GitLab CI, GitHub Actions, ArgoCD, Jenkins}
\cvitem{Monitoring}{Prometheus, Grafana, ELK Stack, Datadog}
\cvitem{Languages}{Python, Go, Bash, JavaScript}

\section{Education}
\cventry{2014--2018}{B.Sc. in Computer Science}{University Name}{Dhaka}{}{}

\section{Certifications}
\cvitem{2023}{AWS Solutions Architect Professional}
\cvitem{2022}{Certified Kubernetes Administrator (CKA)}
\cvitem{2021}{HashiCorp Terraform Associate}

\end{document}
"""


# Pre-built templates
CV_TEMPLATES: List[CVTemplate] = [
    CVTemplate(
        id="modern-professional",
        name="Modern Professional",
        description="Clean, modern design suitable for tech professionals",
        preview_image="/api/cv/templates/modern-professional/preview.png",
        latex_template=DEFAULT_LATEX_TEMPLATE,
        category="professional",
        created_at=datetime.now()
    ),
    CVTemplate(
        id="minimal-clean",
        name="Minimal Clean",
        description="Minimalist design with focus on content",
        preview_image="/api/cv/templates/minimal-clean/preview.png",
        latex_template=DEFAULT_LATEX_TEMPLATE.replace("moderncvstyle{classic}", "moderncvstyle{banking}"),
        category="minimal",
        created_at=datetime.now()
    ),
    CVTemplate(
        id="academic",
        name="Academic",
        description="Traditional academic CV format",
        preview_image="/api/cv/templates/academic/preview.png",
        latex_template=DEFAULT_LATEX_TEMPLATE.replace("moderncvcolor{blue}", "moderncvcolor{black}"),
        category="academic",
        created_at=datetime.now()
    )
]


async def compile_latex(latex_source: str) -> CompilationResult:
    """Compile LaTeX source to PDF using pdflatex."""
    start_time = time.time()
    errors: List[str] = []
    warnings: List[str] = []

    # Create temporary directory for compilation
    with tempfile.TemporaryDirectory() as tmpdir:
        tex_path = Path(tmpdir) / "resume.tex"
        pdf_path = Path(tmpdir) / "resume.pdf"

        # Write LaTeX source
        with open(tex_path, "w", encoding="utf-8") as f:
            f.write(latex_source)

        try:
            # Run pdflatex twice for proper references
            for _ in range(2):
                result = subprocess.run(
                    [
                        "pdflatex",
                        "-interaction=nonstopmode",
                        "-output-directory", tmpdir,
                        str(tex_path)
                    ],
                    capture_output=True,
                    text=True,
                    timeout=60,
                    cwd=tmpdir
                )

                # Parse output for errors and warnings
                for line in result.stdout.split("\n"):
                    if line.startswith("!"):
                        errors.append(line)
                    elif "Warning" in line:
                        warnings.append(line)

            if pdf_path.exists():
                # Generate unique filename and copy to storage
                output_filename = f"resume_{uuid.uuid4().hex[:8]}.pdf"
                output_path = PDF_OUTPUT_PATH / output_filename
                shutil.copy(pdf_path, output_path)

                compilation_time = int((time.time() - start_time) * 1000)
                return CompilationResult(
                    success=True,
                    pdf_path=f"/api/cv/pdf/{output_filename}",
                    errors=[],
                    warnings=warnings[:5],  # Limit warnings
                    compilation_time_ms=compilation_time
                )
            else:
                errors.append("PDF file was not generated")

        except subprocess.TimeoutExpired:
            errors.append("Compilation timed out after 60 seconds")
        except FileNotFoundError:
            errors.append("pdflatex not found. Please install TeXLive.")
        except Exception as e:
            errors.append(f"Compilation error: {str(e)}")

    compilation_time = int((time.time() - start_time) * 1000)
    return CompilationResult(
        success=False,
        pdf_path=None,
        errors=errors[:10],  # Limit errors
        warnings=warnings[:5],
        compilation_time_ms=compilation_time
    )


async def initialize_default_cv():
    """Initialize with the static CV PDF if available."""
    global _initialized, _active_cv_id

    if _initialized:
        return

    _initialized = True

    # Check if static PDF exists
    if STATIC_CV_PATH.exists():
        doc_id = "alamin-cv-default"
        now = datetime.now()

        doc = CVDocument(
            id=doc_id,
            name="Alamin Mahamud - CV",
            latex_source="",  # Will be loaded from cv.tex if needed
            pdf_path="/static/cv/Alamin_Mahamud_CV.pdf",
            is_active=True,
            status=CVStatus.PUBLISHED,
            version=1,
            created_at=now,
            updated_at=now
        )

        _cv_documents[doc_id] = doc
        _active_cv_id = doc_id
        logger.info(f"Initialized default CV from static PDF: {STATIC_CV_PATH}")


async def get_active_cv() -> Optional[CVDocument]:
    """Get the currently active CV document."""
    global _active_cv_id

    # Initialize default CV on first access
    await initialize_default_cv()

    if _active_cv_id and _active_cv_id in _cv_documents:
        return _cv_documents[_active_cv_id]

    # Return a default document if none exists
    if not _cv_documents:
        default_doc = await create_cv_document(DEFAULT_LATEX_TEMPLATE, "Default Resume")
        await set_active_cv(default_doc.id)
        return default_doc

    return None


async def get_cv_by_id(cv_id: str) -> Optional[CVDocument]:
    """Get a CV document by ID."""
    return _cv_documents.get(cv_id)


async def get_all_cvs() -> Tuple[List[CVDocument], Optional[str]]:
    """Get all CV documents and the active ID."""
    return list(_cv_documents.values()), _active_cv_id


async def create_cv_document(latex_source: str, name: str = "Resume") -> CVDocument:
    """Create a new CV document."""
    doc_id = str(uuid.uuid4())
    now = datetime.now()

    # Save source to file
    source_path = LATEX_SOURCE_PATH / f"{doc_id}.tex"
    with open(source_path, "w", encoding="utf-8") as f:
        f.write(latex_source)

    doc = CVDocument(
        id=doc_id,
        name=name,
        latex_source=latex_source,
        pdf_path=None,
        is_active=False,
        status=CVStatus.DRAFT,
        version=1,
        created_at=now,
        updated_at=now
    )

    _cv_documents[doc_id] = doc
    return doc


async def update_cv_document(
    cv_id: str,
    latex_source: Optional[str] = None,
    name: Optional[str] = None,
    is_active: Optional[bool] = None
) -> Optional[CVDocument]:
    """Update a CV document."""
    global _active_cv_id

    doc = _cv_documents.get(cv_id)
    if not doc:
        return None

    if latex_source is not None:
        doc.latex_source = latex_source
        doc.version += 1
        # Update source file
        source_path = LATEX_SOURCE_PATH / f"{cv_id}.tex"
        with open(source_path, "w", encoding="utf-8") as f:
            f.write(latex_source)

    if name is not None:
        doc.name = name

    if is_active is not None:
        if is_active:
            # Deactivate all others
            for d in _cv_documents.values():
                d.is_active = False
            doc.is_active = True
            _active_cv_id = cv_id
        else:
            doc.is_active = False
            if _active_cv_id == cv_id:
                _active_cv_id = None

    doc.updated_at = datetime.now()
    _cv_documents[cv_id] = doc
    return doc


async def set_active_cv(cv_id: str) -> bool:
    """Set a CV as the active one."""
    return await update_cv_document(cv_id, is_active=True) is not None


async def delete_cv_document(cv_id: str) -> bool:
    """Delete a CV document."""
    global _active_cv_id

    if cv_id not in _cv_documents:
        return False

    del _cv_documents[cv_id]

    if _active_cv_id == cv_id:
        _active_cv_id = None

    # Delete source file
    source_path = LATEX_SOURCE_PATH / f"{cv_id}.tex"
    if source_path.exists():
        source_path.unlink()

    return True


async def get_templates() -> List[CVTemplate]:
    """Get all available CV templates."""
    return CV_TEMPLATES


async def get_template_by_id(template_id: str) -> Optional[CVTemplate]:
    """Get a specific template by ID."""
    for template in CV_TEMPLATES:
        if template.id == template_id:
            return template
    return None
