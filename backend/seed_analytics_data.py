"""Seed analytics data for development"""

import asyncio
import json
import logging
from datetime import datetime, timedelta
from random import choice, randint
from uuid import uuid4

import asyncpg
from app.core.config import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


async def create_page_views_table(conn):
    """Create page_views table for analytics tracking"""
    await conn.execute("""
        CREATE TABLE IF NOT EXISTS page_views (
            id SERIAL PRIMARY KEY,
            session_id VARCHAR(255) NOT NULL,
            page_path VARCHAR(255) NOT NULL,
            referrer VARCHAR(255),
            user_agent TEXT,
            ip_address INET,
            created_at TIMESTAMP DEFAULT NOW()
        );
        
        CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);
        CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON page_views(session_id);
        CREATE INDEX IF NOT EXISTS idx_page_views_page_path ON page_views(page_path);
    """)
    logger.info("Created page_views table")


async def seed_page_views(conn, days_back=30):
    """Seed page views data for the last N days"""
    pages = [
        "/", "/projects", "/about", "/contact", "/resume",
        "/projects/1", "/projects/2", "/projects/3", "/projects/4",
        "/projects/5", "/podcast"
    ]
    
    referrers = [
        "https://google.com", "https://linkedin.com", "https://github.com",
        "https://twitter.com", "direct", "https://dev.to", "https://medium.com"
    ]
    
    user_agents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15"
    ]
    
    end_date = datetime.now()
    
    # Generate page views for each day
    for day_offset in range(days_back):
        current_date = end_date - timedelta(days=day_offset)
        
        # Base traffic with weekly patterns (lower on weekends)
        base_views = 80 if current_date.weekday() >= 5 else 150
        daily_views = randint(base_views, base_views + 100)
        
        # Generate unique sessions for the day
        sessions_count = randint(30, 60)
        session_ids = [str(uuid4()) for _ in range(sessions_count)]
        
        page_views_data = []
        for _ in range(daily_views):
            session_id = choice(session_ids)
            page_path = choice(pages)
            referrer = choice(referrers)
            user_agent = choice(user_agents)
            
            # Add some time variation within the day
            view_time = current_date.replace(
                hour=randint(0, 23),
                minute=randint(0, 59),
                second=randint(0, 59)
            )
            
            page_views_data.append((
                session_id, page_path, referrer, user_agent, "192.168.1.100", view_time
            ))
        
        # Batch insert page views
        await conn.executemany("""
            INSERT INTO page_views (session_id, page_path, referrer, user_agent, ip_address, created_at)
            VALUES ($1, $2, $3, $4, $5, $6)
        """, page_views_data)
        
        logger.info(f"Seeded {len(page_views_data)} page views for {current_date.date()}")


async def seed_analytics_data():
    """Main function to seed all analytics data"""
    try:
        # Parse the database URL
        import asyncpg
        from urllib.parse import urlparse
        
        parsed = urlparse(settings.database_url)
        
        # Connect to the database
        conn = await asyncpg.connect(
            host=parsed.hostname,
            port=parsed.port or 5432,
            user=parsed.username,
            password=parsed.password,
            database=parsed.path.lstrip('/')
        )
        
        logger.info("Connected to database")
        
        # Create tables
        await create_page_views_table(conn)
        
        # Clear existing data
        await conn.execute("DELETE FROM page_views")
        logger.info("Cleared existing page views data")
        
        # Seed data
        await seed_page_views(conn, days_back=60)
        
        # Get final counts
        page_views_count = await conn.fetchval("SELECT COUNT(*) FROM page_views")
        
        logger.info("Analytics seeding completed!")
        logger.info(f"- Page views: {page_views_count}")
        
        await conn.close()
        
    except Exception as e:
        logger.error(f"Error seeding analytics data: {e}")
        raise


if __name__ == "__main__":
    asyncio.run(seed_analytics_data())