from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    subject: Optional[str] = Field(None, max_length=200)
    message: str = Field(..., min_length=1, max_length=1000)

class ContactResponse(BaseModel):
    id: str
    name: str
    email: EmailStr
    subject: Optional[str]
    message: str
    created_at: datetime
    status: str = "pending"

    class Config:
        from_attributes = True