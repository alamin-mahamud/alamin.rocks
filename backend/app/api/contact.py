from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional

router = APIRouter()

class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str

@router.post("/")
async def send_contact_message(contact: ContactMessage):
    # TODO: Implement email sending logic
    return {"message": "Message received successfully", "data": contact}