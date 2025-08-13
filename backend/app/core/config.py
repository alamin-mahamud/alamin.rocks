from typing import Optional

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Alamin Rocks API"
    debug: bool = False
    database_url: str = "postgresql://postgres:password@db:5432/alamin_rocks"
    redis_url: Optional[str] = "redis://redis:6379"
    secret_key: str = "your-secret-key-here"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    frontend_url: str = "alamin.rocks"
    admin_url: str = "admin.alamin.rocks"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
