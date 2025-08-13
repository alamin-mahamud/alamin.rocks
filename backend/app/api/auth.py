import logging
from datetime import datetime, timedelta
from typing import Dict

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

logger = logging.getLogger(__name__)

router = APIRouter()

# Simple auth models for demo purposes
class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    expires_in: int

class TokenData(BaseModel):
    username: str
    expires_at: datetime

# In-memory token storage for demo (in production, use proper JWT with database)
active_tokens: Dict[str, TokenData] = {}

# Simple demo credentials (in production, use proper authentication)
DEMO_CREDENTIALS = {
    "admin": "admin123"
}

@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    """
    Authenticate admin user and return access token
    """
    try:
        # Validate credentials
        if request.username not in DEMO_CREDENTIALS:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )
        
        if DEMO_CREDENTIALS[request.username] != request.password:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )
        
        # Generate token (simple demo implementation)
        token = f"admin_token_{request.username}_{datetime.now().timestamp()}"
        expires_at = datetime.now() + timedelta(hours=24)
        
        # Store token
        active_tokens[token] = TokenData(
            username=request.username,
            expires_at=expires_at
        )
        
        logger.info(f"Admin user {request.username} logged in successfully")
        
        return LoginResponse(
            access_token=token,
            token_type="bearer",
            expires_in=86400  # 24 hours
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Login failed"
        )

class TokenRequest(BaseModel):
    token: str

@router.post("/verify")
async def verify_token(request: TokenRequest):
    """
    Verify if token is valid
    """
    token = request.token
    try:
        if token not in active_tokens:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token"
            )
        
        token_data = active_tokens[token]
        
        if datetime.now() > token_data.expires_at:
            # Token expired, remove it
            del active_tokens[token]
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token expired"
            )
        
        return {"username": token_data.username, "valid": True}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Token verification error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Token verification failed"
        )

@router.post("/logout")
async def logout(request: TokenRequest):
    """
    Logout and invalidate token
    """
    token = request.token
    try:
        if token in active_tokens:
            username = active_tokens[token].username
            del active_tokens[token]
            logger.info(f"Admin user {username} logged out")
        
        return {"message": "Logged out successfully"}
        
    except Exception as e:
        logger.error(f"Logout error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Logout failed"
        )

@router.get("/me")
async def get_current_user(token: str):
    """
    Get current user info
    """
    try:
        if token not in active_tokens:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token"
            )
        
        token_data = active_tokens[token]
        
        if datetime.now() > token_data.expires_at:
            del active_tokens[token]
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token expired"
            )
        
        return {
            "username": token_data.username,
            "expires_at": token_data.expires_at.isoformat()
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Get user error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get user info"
        )