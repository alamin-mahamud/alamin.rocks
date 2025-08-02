#!/usr/bin/env python3
"""
Simple script to run database seeding
"""

import subprocess
import sys
import os

def check_requirements():
    """Check if required packages are installed"""
    try:
        import asyncpg
        print("✓ asyncpg is available")
    except ImportError:
        print("✗ asyncpg is not installed")
        print("Run: pip install asyncpg")
        return False
    
    try:
        import pydantic
        print("✓ pydantic is available")
    except ImportError:
        print("✗ pydantic is not installed")
        print("Run: pip install pydantic")
        return False
        
    return True

def main():
    """Main function"""
    print("🚀 Portfolio Database Seeder")
    print("=" * 40)
    
    if not check_requirements():
        print("\nPlease install missing requirements and try again.")
        sys.exit(1)
    
    # Check if we're in the correct directory
    if not os.path.exists('seed_database.py'):
        print("✗ seed_database.py not found in current directory")
        print("Please run this script from the backend directory")
        sys.exit(1)
    
    print("\nStarting database seeding...")
    try:
        # Run the seed script
        result = subprocess.run([sys.executable, 'seed_database.py'], 
                              capture_output=True, text=True)
        
        if result.returncode == 0:
            print("✓ Database seeding completed successfully!")
            print(result.stdout)
        else:
            print("✗ Database seeding failed!")
            print("Error:", result.stderr)
            sys.exit(1)
            
    except Exception as e:
        print(f"✗ Error running seed script: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()