#!/usr/bin/env python3
"""
Asset Management Database Seeder
Seeds the database with comprehensive asset management data.
"""

import asyncio
import logging
from datetime import datetime, timedelta
from decimal import Decimal
import random
import sys
import os

# Add the app directory to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text

# Import models
from app.models.assets import (
    Base, Account, Asset, Liability, Transaction,
    AccountTypeEnum, AssetCategoryEnum, LiabilityCategoryEnum, TransactionTypeEnum
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler('seed_assets.log')
    ]
)
logger = logging.getLogger(__name__)

# Database configuration
DATABASE_URL = "postgresql+asyncpg://postgres:password@localhost:5452/alamin_rocks"
engine = create_async_engine(DATABASE_URL, echo=False)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def create_tables():
    """Create asset management tables"""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    logger.info("Asset management tables created successfully")


async def seed_accounts(session: AsyncSession):
    """Seed account data"""
    accounts_data = [
        {
            "name": "Main Checking",
            "account_type": AccountTypeEnum.ASSET,
            "category": "bank",
            "description": "Primary checking account",
            "currency": "USD",
            "balance": Decimal("25000.00"),
            "is_active": True
        },
        {
            "name": "Credit Cards",
            "account_type": AccountTypeEnum.LIABILITY,
            "category": "credit",
            "description": "All credit card accounts",
            "currency": "USD",
            "balance": Decimal("-11300.00"),
            "is_active": True
        },
        {
            "name": "Investment Portfolio",
            "account_type": AccountTypeEnum.ASSET,
            "category": "investment",
            "description": "Stock and bond investments",
            "currency": "USD",
            "balance": Decimal("235000.00"),
            "is_active": True
        },
        {
            "name": "Real Estate",
            "account_type": AccountTypeEnum.ASSET,
            "category": "property",
            "description": "Property investments",
            "currency": "USD",
            "balance": Decimal("950000.00"),
            "is_active": True
        },
        {
            "name": "Loans & Mortgages",
            "account_type": AccountTypeEnum.LIABILITY,
            "category": "debt",
            "description": "All loan and mortgage accounts",
            "currency": "USD",
            "balance": Decimal("-562000.00"),
            "is_active": True
        }
    ]
    
    for account_data in accounts_data:
        account = Account(**account_data)
        session.add(account)
    
    await session.commit()
    logger.info(f"Seeded {len(accounts_data)} accounts")


async def seed_assets(session: AsyncSession):
    """Seed asset data"""
    assets_data = [
        # Cash & Bank
        {"account_id": 1, "name": "Chase Checking Account", "category": AssetCategoryEnum.BANK, "purchase_price": 15000, "current_value": 15000, "zakatable": True},
        {"account_id": 1, "name": "Emergency Cash Fund", "category": AssetCategoryEnum.CASH, "purchase_price": 5000, "current_value": 5000, "zakatable": True},
        {"account_id": 1, "name": "Wells Fargo Savings", "category": AssetCategoryEnum.BANK, "purchase_price": 25000, "current_value": 25000, "zakatable": True},
        {"account_id": 1, "name": "Business Account", "category": AssetCategoryEnum.BANK, "purchase_price": 8500, "current_value": 8500, "zakatable": True},
        
        # Investments
        {"account_id": 3, "name": "Apple Stock (AAPL)", "category": AssetCategoryEnum.INVESTMENT, "purchase_price": 38000, "current_value": 45000, "zakatable": True},
        {"account_id": 3, "name": "S&P 500 Index Fund", "category": AssetCategoryEnum.INVESTMENT, "purchase_price": 65000, "current_value": 75000, "zakatable": True},
        {"account_id": 3, "name": "Tesla Stock (TSLA)", "category": AssetCategoryEnum.INVESTMENT, "purchase_price": 35000, "current_value": 28000, "zakatable": True},
        {"account_id": 3, "name": "Real Estate ETF", "category": AssetCategoryEnum.INVESTMENT, "purchase_price": 20000, "current_value": 22000, "zakatable": True},
        {"account_id": 3, "name": "401(k) Retirement", "category": AssetCategoryEnum.INVESTMENT, "purchase_price": 95000, "current_value": 125000, "zakatable": False},
        {"account_id": 3, "name": "Roth IRA", "category": AssetCategoryEnum.INVESTMENT, "purchase_price": 50000, "current_value": 65000, "zakatable": False},
        
        # Property
        {"account_id": 4, "name": "Primary Residence", "category": AssetCategoryEnum.PROPERTY, "purchase_price": 380000, "current_value": 450000, "zakatable": False},
        {"account_id": 4, "name": "Rental Property - Downtown", "category": AssetCategoryEnum.PROPERTY, "purchase_price": 285000, "current_value": 320000, "zakatable": True},
        {"account_id": 4, "name": "Commercial Land Plot", "category": AssetCategoryEnum.PROPERTY, "purchase_price": 150000, "current_value": 180000, "zakatable": True},
        
        # Vehicles
        {"account_id": 1, "name": "2022 Tesla Model S", "category": AssetCategoryEnum.VEHICLE, "purchase_price": 95000, "current_value": 85000, "zakatable": False},
        {"account_id": 1, "name": "2020 Honda Civic", "category": AssetCategoryEnum.VEHICLE, "purchase_price": 28000, "current_value": 22000, "zakatable": False},
        
        # Equipment & Other
        {"account_id": 1, "name": "MacBook Pro Setup", "category": AssetCategoryEnum.EQUIPMENT, "purchase_price": 12000, "current_value": 8500, "zakatable": False},
        {"account_id": 1, "name": "Home Office Equipment", "category": AssetCategoryEnum.EQUIPMENT, "purchase_price": 18000, "current_value": 15000, "zakatable": False},
        {"account_id": 1, "name": "Gold Jewelry", "category": AssetCategoryEnum.OTHER, "purchase_price": 10000, "current_value": 12000, "zakatable": True},
        {"account_id": 1, "name": "Collectible Watches", "category": AssetCategoryEnum.OTHER, "purchase_price": 20000, "current_value": 25000, "zakatable": True},
        {"account_id": 1, "name": "Inventory - Online Store", "category": AssetCategoryEnum.INVENTORY, "purchase_price": 32000, "current_value": 35000, "zakatable": True},
    ]
    
    for asset_data in assets_data:
        depreciation = max(0, asset_data["purchase_price"] - asset_data["current_value"])
        asset = Asset(
            account_id=asset_data["account_id"],
            name=asset_data["name"],
            category=asset_data["category"],
            purchase_price=Decimal(str(asset_data["purchase_price"])),
            current_value=Decimal(str(asset_data["current_value"])),
            purchase_date=datetime.now() - timedelta(days=random.randint(30, 1095)),
            description="Asset acquired for investment/business purposes",
            location=random.choice(["Home", "Office", "Bank", "Brokerage", "Property"]),
            is_zakatable=asset_data["zakatable"],
            depreciation_amount=Decimal(str(depreciation))
        )
        session.add(asset)
    
    await session.commit()
    logger.info(f"Seeded {len(assets_data)} assets")


async def seed_liabilities(session: AsyncSession):
    """Seed liability data"""
    liabilities_data = [
        {"account_id": 5, "name": "Primary Mortgage", "category": LiabilityCategoryEnum.MORTGAGE, "original": 320000, "current": 285000, "rate": 3.75, "payment": 1850},
        {"account_id": 5, "name": "Rental Property Loan", "category": LiabilityCategoryEnum.MORTGAGE, "original": 240000, "current": 195000, "rate": 4.25, "payment": 1450},
        {"account_id": 2, "name": "Chase Credit Card", "category": LiabilityCategoryEnum.CREDIT_CARD, "original": 15000, "current": 8500, "rate": 18.99, "payment": 450},
        {"account_id": 2, "name": "American Express Gold", "category": LiabilityCategoryEnum.CREDIT_CARD, "original": 8000, "current": 2800, "rate": 21.24, "payment": 150},
        {"account_id": 5, "name": "Tesla Car Loan", "category": LiabilityCategoryEnum.LOAN, "original": 75000, "current": 52000, "rate": 2.49, "payment": 1250},
        {"account_id": 5, "name": "Business Line of Credit", "category": LiabilityCategoryEnum.LOAN, "original": 50000, "current": 12000, "rate": 6.5, "payment": 800},
        {"account_id": 5, "name": "Student Loan", "category": LiabilityCategoryEnum.LOAN, "original": 45000, "current": 18000, "rate": 4.5, "payment": 350},
    ]
    
    for liability_data in liabilities_data:
        liability = Liability(
            account_id=liability_data["account_id"],
            name=liability_data["name"],
            category=liability_data["category"],
            original_amount=Decimal(str(liability_data["original"])),
            current_balance=Decimal(str(liability_data["current"])),
            interest_rate=Decimal(str(liability_data["rate"])),
            monthly_payment=Decimal(str(liability_data["payment"])),
            due_date=datetime.now() + timedelta(days=random.randint(15, 45)),
            description="Regular monthly payment due"
        )
        session.add(liability)
    
    await session.commit()
    logger.info(f"Seeded {len(liabilities_data)} liabilities")


async def seed_transactions(session: AsyncSession):
    """Seed transaction data"""
    transaction_templates = [
        # Income transactions
        {"type": TransactionTypeEnum.INCOME, "amount": 8500, "category": "Salary", "desc": "Monthly Software Engineer Salary"},
        {"type": TransactionTypeEnum.INCOME, "amount": 1200, "category": "Rental Income", "desc": "Downtown Property Rent"},
        {"type": TransactionTypeEnum.INCOME, "amount": 750, "category": "Freelance", "desc": "Web Development Project"},
        {"type": TransactionTypeEnum.INCOME, "amount": 320, "category": "Dividends", "desc": "S&P 500 Quarterly Dividends"},
        {"type": TransactionTypeEnum.INCOME, "amount": 185, "category": "Interest", "desc": "Savings Account Interest"},
        
        # Expense transactions
        {"type": TransactionTypeEnum.EXPENSE, "amount": 1850, "category": "Housing", "desc": "Primary Mortgage Payment"},
        {"type": TransactionTypeEnum.EXPENSE, "amount": 1450, "category": "Investment", "desc": "Rental Property Mortgage"},
        {"type": TransactionTypeEnum.EXPENSE, "amount": 1250, "category": "Transportation", "desc": "Tesla Car Payment"},
        {"type": TransactionTypeEnum.EXPENSE, "amount": 850, "category": "Food", "desc": "Groceries & Dining"},
        {"type": TransactionTypeEnum.EXPENSE, "amount": 650, "category": "Utilities", "desc": "Electric, Gas, Internet"},
        {"type": TransactionTypeEnum.EXPENSE, "amount": 450, "category": "Credit Card", "desc": "Chase Card Payment"},
        {"type": TransactionTypeEnum.EXPENSE, "amount": 350, "category": "Education", "desc": "Student Loan Payment"},
        {"type": TransactionTypeEnum.EXPENSE, "amount": 280, "category": "Insurance", "desc": "Auto & Home Insurance"},
        {"type": TransactionTypeEnum.EXPENSE, "amount": 220, "category": "Healthcare", "desc": "Health Insurance Premium"},
        {"type": TransactionTypeEnum.EXPENSE, "amount": 180, "category": "Entertainment", "desc": "Streaming & Subscriptions"},
        {"type": TransactionTypeEnum.EXPENSE, "amount": 150, "category": "Shopping", "desc": "Clothing & Personal Items"},
        {"type": TransactionTypeEnum.EXPENSE, "amount": 120, "category": "Gas", "desc": "Fuel for Vehicles"},
        {"type": TransactionTypeEnum.EXPENSE, "amount": 95, "category": "Phone", "desc": "Mobile Phone Bill"},
        {"type": TransactionTypeEnum.EXPENSE, "amount": 85, "category": "Software", "desc": "Development Tools"},
        {"type": TransactionTypeEnum.EXPENSE, "amount": 75, "category": "Charity", "desc": "Monthly Donation"},
    ]
    
    transactions = []
    for template in transaction_templates:
        # Create multiple instances across different dates
        for _ in range(random.randint(2, 4)):
            days_ago = random.randint(1, 90)
            amount_variance = random.uniform(0.8, 1.2)
            
            transaction = Transaction(
                from_account_id=1 if template["type"] == TransactionTypeEnum.EXPENSE else None,
                to_account_id=1 if template["type"] == TransactionTypeEnum.INCOME else None,
                transaction_type=template["type"],
                amount=Decimal(str(template["amount"] * amount_variance)),
                transaction_date=datetime.now() - timedelta(days=days_ago),
                category=template["category"],
                description=template["desc"],
                reference_number=f"TXN{random.randint(100000, 999999)}",
                tags=[template["category"].lower(), "auto-generated"]
            )
            transactions.append(transaction)
    
    for transaction in transactions:
        session.add(transaction)
    
    await session.commit()
    logger.info(f"Seeded {len(transactions)} transactions")


async def seed_database():
    """Main seeding function"""
    try:
        logger.info("Starting asset management database seeding...")
        
        # Create tables
        await create_tables()
        
        # Create session
        async with AsyncSessionLocal() as session:
            # Clear existing data
            await session.execute(text("TRUNCATE TABLE transactions, assets, liabilities, accounts RESTART IDENTITY CASCADE"))
            await session.commit()
            logger.info("Cleared existing asset management data")
            
            # Seed data in order
            await seed_accounts(session)
            await seed_assets(session)
            await seed_liabilities(session)
            await seed_transactions(session)
        
        logger.info("Asset management database seeding completed successfully!")
        
    except Exception as e:
        logger.error(f"Seeding failed: {str(e)}")
        raise


if __name__ == "__main__":
    asyncio.run(seed_database())