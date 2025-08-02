#!/usr/bin/env python3
"""
Test database connection script
"""

import asyncio
import sys
import os

# Add the app directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.core.config import settings

async def test_connection():
    """Test database connection"""
    try:
        import asyncpg
        print(f"Attempting to connect to: {settings.database_url}")
        
        connection = await asyncpg.connect(settings.database_url)
        print("✓ Successfully connected to database!")
        
        # Test a simple query
        result = await connection.fetchval("SELECT version()")
        print(f"PostgreSQL version: {result}")
        
        await connection.close()
        print("✓ Connection closed successfully")
        
    except ImportError:
        print("✗ asyncpg not installed. Run: pip install asyncpg")
        return False
    except Exception as e:
        print(f"✗ Failed to connect to database: {e}")
        print("\nTroubleshooting:")
        print("1. Make sure PostgreSQL is running")
        print("2. Check database credentials in .env file or config")
        print("3. Ensure database exists")
        return False
        
    return True

if __name__ == "__main__":
    success = asyncio.run(test_connection())
    sys.exit(0 if success else 1)