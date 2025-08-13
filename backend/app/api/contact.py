from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from app.schemas.contact import ContactRequest, ContactResponse
from app.services.contact import ContactService
from app.core.dependencies import get_contact_service

router = APIRouter()

@router.post("/", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
async def send_contact_message(
    contact: ContactRequest,
    service: ContactService = Depends(get_contact_service)
):
    """
    Send a contact message
    """
    try:
        return await service.send_message(contact)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process contact message: {str(e)}"
        )

@router.get("/messages", response_model=List[ContactResponse])
async def get_all_messages(
    service: ContactService = Depends(get_contact_service)
):
    """
    Get all contact messages (admin endpoint)
    """
    return await service.get_all_messages()

@router.get("/messages/{message_id}", response_model=ContactResponse)
async def get_message(
    message_id: str,
    service: ContactService = Depends(get_contact_service)
):
    """
    Get specific contact message by ID
    """
    message = await service.get_message_by_id(message_id)
    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Contact message with ID {message_id} not found"
        )
    return message

@router.patch("/messages/{message_id}/read", response_model=ContactResponse)
async def mark_message_as_read(
    message_id: str,
    service: ContactService = Depends(get_contact_service)
):
    """
    Mark message as read
    """
    message = await service.update_message_status(message_id, "read")
    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Contact message with ID {message_id} not found"
        )
    return message

@router.patch("/messages/{message_id}/replied", response_model=ContactResponse)
async def mark_message_as_replied(
    message_id: str,
    service: ContactService = Depends(get_contact_service)
):
    """
    Mark message as replied
    """
    message = await service.update_message_status(message_id, "replied")
    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Contact message with ID {message_id} not found"
        )
    return message

@router.delete("/messages/{message_id}")
async def delete_message(
    message_id: str,
    service: ContactService = Depends(get_contact_service)
):
    """
    Delete a message
    """
    success = await service.delete_message(message_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Contact message with ID {message_id} not found"
        )
    return {"message": "Message deleted successfully"}

@router.get("/stats")
async def get_message_stats(
    service: ContactService = Depends(get_contact_service)
):
    """
    Get message statistics
    """
    return await service.get_message_stats()