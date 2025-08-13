from functools import lru_cache
from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings
from app.services.contact import ContactService
from app.services.portfolio import PortfolioService
from app.services.resume import ResumeService

# Database setup
DATABASE_URL = settings.database_url.replace("postgresql://", "postgresql+asyncpg://")
engine = create_async_engine(DATABASE_URL, echo=settings.debug)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

@lru_cache()
def get_contact_service() -> ContactService:
    """Get contact service instance"""
    return ContactService()

@lru_cache()
def get_portfolio_service() -> PortfolioService:
    """Get portfolio service instance"""
    return PortfolioService()

@lru_cache()
def get_resume_service() -> ResumeService:
    """Get resume service instance"""
    return ResumeService()


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """Get database session"""
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()