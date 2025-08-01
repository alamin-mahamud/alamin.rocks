from functools import lru_cache
from app.services.contact import ContactService
from app.services.portfolio import PortfolioService
from app.services.resume import ResumeService

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