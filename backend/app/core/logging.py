import logging
import logging.config
import sys
from pathlib import Path
from typing import Any, Dict
from pydantic import BaseModel

class LogConfig(BaseModel):
    """Logging configuration"""
    LOGGER_NAME: str = "app"
    LOG_FORMAT: str = "%(levelname)s - %(message)s | %(pathname)s:%(lineno)d"
    LOG_LEVEL: str = "DEBUG"
    
    # Logging config
    version: int = 1
    disable_existing_loggers: bool = False
    formatters: Dict[str, Any] = {
        "default": {
            "format": LOG_FORMAT,
            "datefmt": "%Y-%m-%d %H:%M:%S",
        },
    }
    handlers: Dict[str, Any] = {
        "default": {
            "formatter": "default",
            "class": "logging.StreamHandler",
            "stream": "ext://sys.stderr",
        },
    }
    loggers: Dict[str, Any] = {
        LOGGER_NAME: {"handlers": ["default"], "level": LOG_LEVEL},
    }

def setup_logging():
    """Configure logging for the application"""
    log_config = LogConfig()
    
    logging.config.dictConfig(log_config.dict())
    
    # Set up root logger
    logger = logging.getLogger()
    logger.setLevel(log_config.LOG_LEVEL)
    
    # Suppress some noisy loggers
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
    logging.getLogger("watchfiles").setLevel(logging.WARNING)
    
    return logger