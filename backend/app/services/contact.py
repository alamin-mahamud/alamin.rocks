from typing import Optional
from datetime import datetime
import uuid
import logging
from app.schemas.contact import ContactRequest, ContactResponse
from app.core.config import settings

logger = logging.getLogger(__name__)

class ContactService:
    def __init__(self):
        # Initialize with some mock contact messages
        self.contacts = [
            ContactResponse(
                id="1",
                name="John Doe",
                email="john.doe@example.com",
                subject="Project Inquiry",
                message="Hi Alamin, I came across your portfolio and I'm impressed with your AI and DevOps work. I'd love to discuss a potential collaboration opportunity for a machine learning infrastructure project. Would you be available for a brief call this week?",
                created_at=datetime(2024, 1, 15, 10, 30),
                status="unread"
            ),
            ContactResponse(
                id="2",
                name="Sarah Johnson",
                email="sarah.j@techcorp.com",
                subject="Job Opportunity - Senior AI Engineer",
                message="Hello Alamin, I'm a technical recruiter at TechCorp and we have an exciting Senior AI Engineer position that I think would be perfect for your background. The role involves leading AI infrastructure and working with LLM platforms. Are you open to discussing this opportunity?",
                created_at=datetime(2024, 1, 14, 14, 20),
                status="read"
            ),
            ContactResponse(
                id="3",
                name="Mike Chen",
                email="mike.chen@startup.io",
                subject="Technical Consultation",
                message="Hi Alamin, I'm the CTO at a fintech startup and we're looking for expertise on cloud cost optimization and Kubernetes architecture. Based on your experience saving $1M+ in cloud costs, I'd love to explore if you'd be interested in a consulting engagement.",
                created_at=datetime(2024, 1, 13, 9, 15),
                status="replied"
            ),
            ContactResponse(
                id="4", 
                name="Lisa Wang",
                email="lisa.wang@university.edu",
                subject="Speaking Opportunity",
                message="Dear Alamin, I'm organizing a tech conference on AI and Infrastructure and would love to have you as a keynote speaker. Your work on AI-powered platforms and DevOps optimization would be very valuable to our audience of 500+ engineers and researchers.",
                created_at=datetime(2024, 1, 12, 16, 45),
                status="unread"
            )
        ]
    
    async def send_message(self, contact_data: ContactRequest) -> ContactResponse:
        """
        Process contact message submission
        """
        try:
            contact_id = str(uuid.uuid4())
            contact_response = ContactResponse(
                id=contact_id,
                name=contact_data.name,
                email=contact_data.email,
                subject=contact_data.subject,
                message=contact_data.message,
                created_at=datetime.now(),
                status="pending"
            )
            
            # Store in memory (later replace with database)
            self.contacts.append(contact_response)
            
            # TODO: Implement email sending logic
            # TODO: Store in database
            
            logger.info(f"Contact message received from {contact_data.email}")
            return contact_response
            
        except Exception as e:
            logger.error(f"Error processing contact message: {str(e)}")
            raise
    
    async def get_all_messages(self) -> list[ContactResponse]:
        """Get all contact messages"""
        return self.contacts
    
    async def get_message_by_id(self, message_id: str) -> Optional[ContactResponse]:
        """Get specific contact message by ID"""
        for contact in self.contacts:
            if contact.id == message_id:
                return contact
        return None
    
    async def update_message_status(self, message_id: str, status: str) -> Optional[ContactResponse]:
        """Update message status"""
        for contact in self.contacts:
            if contact.id == message_id:
                contact.status = status
                return contact
        return None
    
    async def delete_message(self, message_id: str) -> bool:
        """Delete a message"""
        for i, contact in enumerate(self.contacts):
            if contact.id == message_id:
                del self.contacts[i]
                return True
        return False
    
    async def get_message_stats(self) -> dict:
        """Get message statistics"""
        total = len(self.contacts)
        unread = len([c for c in self.contacts if c.status == "unread"])
        read = len([c for c in self.contacts if c.status == "read"])
        replied = len([c for c in self.contacts if c.status == "replied"])
        
        return {
            "total": total,
            "unread": unread,
            "read": read,
            "replied": replied
        }