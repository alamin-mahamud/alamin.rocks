from datetime import datetime, timedelta
from decimal import Decimal
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
import random

from app.core.dependencies import get_db
from app.schemas.assets import (
    Account, AccountCreate, AccountUpdate,
    Asset, AssetCreate, AssetUpdate,
    Liability, LiabilityCreate, LiabilityUpdate,
    Transaction, TransactionCreate, TransactionUpdate,
    BalanceSheetResponse, IncomeStatementResponse,
    ZakatCalculationRequest, ZakatCalculationResponse,
    FinancialSummary, AssetCategory, LiabilityCategory, TransactionType
)

router = APIRouter(prefix="/api/assets", tags=["Asset Management"])


def generate_sample_data():
    """Generate comprehensive sample data for demonstration"""
    assets = []
    liabilities = []
    transactions = []
    
    # Real asset names and values
    asset_data = [
        # Cash & Bank
        {"name": "Chase Checking Account", "category": AssetCategory.BANK, "value": 15000, "purchase": 15000, "zakatable": True},
        {"name": "Emergency Cash Fund", "category": AssetCategory.CASH, "value": 5000, "purchase": 5000, "zakatable": True},
        {"name": "Wells Fargo Savings", "category": AssetCategory.BANK, "value": 25000, "purchase": 25000, "zakatable": True},
        {"name": "Business Account", "category": AssetCategory.BANK, "value": 8500, "purchase": 8500, "zakatable": True},
        
        # Investments
        {"name": "Apple Stock (AAPL)", "category": AssetCategory.INVESTMENT, "value": 45000, "purchase": 38000, "zakatable": True},
        {"name": "S&P 500 Index Fund", "category": AssetCategory.INVESTMENT, "value": 75000, "purchase": 65000, "zakatable": True},
        {"name": "Tesla Stock (TSLA)", "category": AssetCategory.INVESTMENT, "value": 28000, "purchase": 35000, "zakatable": True},
        {"name": "Real Estate ETF", "category": AssetCategory.INVESTMENT, "value": 22000, "purchase": 20000, "zakatable": True},
        {"name": "401(k) Retirement", "category": AssetCategory.INVESTMENT, "value": 125000, "purchase": 95000, "zakatable": False},
        {"name": "Roth IRA", "category": AssetCategory.INVESTMENT, "value": 65000, "purchase": 50000, "zakatable": False},
        
        # Property
        {"name": "Primary Residence", "category": AssetCategory.PROPERTY, "value": 450000, "purchase": 380000, "zakatable": False},
        {"name": "Rental Property - Downtown", "category": AssetCategory.PROPERTY, "value": 320000, "purchase": 285000, "zakatable": True},
        {"name": "Commercial Land Plot", "category": AssetCategory.PROPERTY, "value": 180000, "purchase": 150000, "zakatable": True},
        
        # Vehicles
        {"name": "2022 Tesla Model S", "category": AssetCategory.VEHICLE, "value": 85000, "purchase": 95000, "zakatable": False},
        {"name": "2020 Honda Civic", "category": AssetCategory.VEHICLE, "value": 22000, "purchase": 28000, "zakatable": False},
        
        # Equipment & Other
        {"name": "MacBook Pro Setup", "category": AssetCategory.EQUIPMENT, "value": 8500, "purchase": 12000, "zakatable": False},
        {"name": "Home Office Equipment", "category": AssetCategory.EQUIPMENT, "value": 15000, "purchase": 18000, "zakatable": False},
        {"name": "Gold Jewelry", "category": AssetCategory.OTHER, "value": 12000, "purchase": 10000, "zakatable": True},
        {"name": "Collectible Watches", "category": AssetCategory.OTHER, "value": 25000, "purchase": 20000, "zakatable": True},
        {"name": "Inventory - Online Store", "category": AssetCategory.INVENTORY, "value": 35000, "purchase": 32000, "zakatable": True},
    ]
    
    for i, asset_info in enumerate(asset_data, 1):
        depreciation = max(0, asset_info["purchase"] - asset_info["value"])
        assets.append({
            "id": i,
            "account_id": 1,
            "name": asset_info["name"],
            "category": asset_info["category"].value,
            "purchase_price": Decimal(str(asset_info["purchase"])),
            "current_value": Decimal(str(asset_info["value"])),
            "purchase_date": datetime.now() - timedelta(days=random.randint(30, 1095)),
            "description": f"Asset acquired for investment/business purposes",
            "location": random.choice(["Home", "Office", "Bank", "Brokerage", "Property"]),
            "is_zakatable": asset_info["zakatable"],
            "depreciation_amount": Decimal(str(depreciation)),
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        })
    
    # Real liability data
    liability_data = [
        {"name": "Primary Mortgage", "category": LiabilityCategory.MORTGAGE, "original": 320000, "current": 285000, "rate": 3.75, "payment": 1850},
        {"name": "Rental Property Loan", "category": LiabilityCategory.MORTGAGE, "original": 240000, "current": 195000, "rate": 4.25, "payment": 1450},
        {"name": "Chase Credit Card", "category": LiabilityCategory.CREDIT_CARD, "original": 15000, "current": 8500, "rate": 18.99, "payment": 450},
        {"name": "American Express Gold", "category": LiabilityCategory.CREDIT_CARD, "original": 8000, "current": 2800, "rate": 21.24, "payment": 150},
        {"name": "Tesla Car Loan", "category": LiabilityCategory.LOAN, "original": 75000, "current": 52000, "rate": 2.49, "payment": 1250},
        {"name": "Business Line of Credit", "category": LiabilityCategory.LOAN, "original": 50000, "current": 12000, "rate": 6.5, "payment": 800},
        {"name": "Student Loan", "category": LiabilityCategory.LOAN, "original": 45000, "current": 18000, "rate": 4.5, "payment": 350},
    ]
    
    for i, liability_info in enumerate(liability_data, 1):
        liabilities.append({
            "id": i,
            "account_id": 2,
            "name": liability_info["name"],
            "category": liability_info["category"].value,
            "original_amount": Decimal(str(liability_info["original"])),
            "current_balance": Decimal(str(liability_info["current"])),
            "interest_rate": Decimal(str(liability_info["rate"])),
            "monthly_payment": Decimal(str(liability_info["payment"])),
            "due_date": datetime.now() + timedelta(days=random.randint(15, 45)),
            "description": f"Regular monthly payment due",
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        })
    
    # Generate realistic transactions
    transaction_data = [
        # Income transactions
        {"type": TransactionType.INCOME, "amount": 8500, "category": "Salary", "desc": "Monthly Software Engineer Salary"},
        {"type": TransactionType.INCOME, "amount": 1200, "category": "Rental Income", "desc": "Downtown Property Rent"},
        {"type": TransactionType.INCOME, "amount": 750, "category": "Freelance", "desc": "Web Development Project"},
        {"type": TransactionType.INCOME, "amount": 320, "category": "Dividends", "desc": "S&P 500 Quarterly Dividends"},
        {"type": TransactionType.INCOME, "amount": 185, "category": "Interest", "desc": "Savings Account Interest"},
        
        # Expense transactions
        {"type": TransactionType.EXPENSE, "amount": 1850, "category": "Housing", "desc": "Primary Mortgage Payment"},
        {"type": TransactionType.EXPENSE, "amount": 1450, "category": "Investment", "desc": "Rental Property Mortgage"},
        {"type": TransactionType.EXPENSE, "amount": 1250, "category": "Transportation", "desc": "Tesla Car Payment"},
        {"type": TransactionType.EXPENSE, "amount": 850, "category": "Food", "desc": "Groceries & Dining"},
        {"type": TransactionType.EXPENSE, "amount": 650, "category": "Utilities", "desc": "Electric, Gas, Internet"},
        {"type": TransactionType.EXPENSE, "amount": 450, "category": "Credit Card", "desc": "Chase Card Payment"},
        {"type": TransactionType.EXPENSE, "amount": 350, "category": "Education", "desc": "Student Loan Payment"},
        {"type": TransactionType.EXPENSE, "amount": 280, "category": "Insurance", "desc": "Auto & Home Insurance"},
        {"type": TransactionType.EXPENSE, "amount": 220, "category": "Healthcare", "desc": "Health Insurance Premium"},
        {"type": TransactionType.EXPENSE, "amount": 180, "category": "Entertainment", "desc": "Streaming & Subscriptions"},
        {"type": TransactionType.EXPENSE, "amount": 150, "category": "Shopping", "desc": "Clothing & Personal Items"},
        {"type": TransactionType.EXPENSE, "amount": 120, "category": "Gas", "desc": "Fuel for Vehicles"},
        {"type": TransactionType.EXPENSE, "amount": 95, "category": "Phone", "desc": "Mobile Phone Bill"},
        {"type": TransactionType.EXPENSE, "amount": 85, "category": "Software", "desc": "Development Tools"},
        {"type": TransactionType.EXPENSE, "amount": 75, "category": "Charity", "desc": "Monthly Donation"},
    ]
    
    for i, trans_info in enumerate(transaction_data, 1):
        # Create multiple instances of each transaction across different dates
        for j in range(random.randint(1, 3)):
            trans_id = i * 100 + j
            days_ago = random.randint(1, 90)
            transactions.append({
                "id": trans_id,
                "from_account_id": 1 if trans_info["type"] == TransactionType.EXPENSE else None,
                "to_account_id": 1 if trans_info["type"] == TransactionType.INCOME else None,
                "transaction_type": trans_info["type"].value,
                "amount": Decimal(str(trans_info["amount"] * random.uniform(0.8, 1.2))),  # Add some variance
                "transaction_date": datetime.now() - timedelta(days=days_ago),
                "category": trans_info["category"],
                "description": trans_info["desc"],
                "reference_number": f"TXN{trans_id:06d}",
                "tags": [trans_info["category"].lower(), "auto-generated"],
                "created_at": datetime.now(),
                "updated_at": datetime.now()
            })
    
    return assets, liabilities, transactions


@router.get("/accounts", response_model=List[Account])
async def get_accounts(db: Session = Depends(get_db)):
    """Get all accounts"""
    sample_accounts = [
        Account(
            id=1,
            name="Main Checking",
            account_type="asset",
            category="bank",
            description="Primary checking account",
            currency="USD",
            balance=Decimal("25000.00"),
            is_active=True,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Account(
            id=2,
            name="Credit Cards",
            account_type="liability",
            category="credit",
            description="All credit card accounts",
            currency="USD",
            balance=Decimal("-5000.00"),
            is_active=True,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Account(
            id=3,
            name="Investment Portfolio",
            account_type="asset",
            category="investment",
            description="Stock and bond investments",
            currency="USD",
            balance=Decimal("150000.00"),
            is_active=True,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
    ]
    return sample_accounts


@router.post("/accounts", response_model=Account)
async def create_account(account: AccountCreate, db: Session = Depends(get_db)):
    """Create a new account"""
    new_account = Account(
        id=random.randint(100, 999),
        name=account.name,
        account_type=account.account_type,
        category=account.category,
        description=account.description,
        currency=account.currency,
        balance=account.initial_balance,
        is_active=account.is_active,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    return new_account


@router.get("/assets", response_model=List[Asset])
async def get_assets(db: Session = Depends(get_db)):
    """Get all assets"""
    assets, _, _ = generate_sample_data()
    return [Asset(**asset) for asset in assets]


@router.post("/assets", response_model=Asset)
async def create_asset(asset: AssetCreate, db: Session = Depends(get_db)):
    """Create a new asset"""
    new_asset = Asset(
        id=random.randint(100, 999),
        account_id=asset.account_id,
        name=asset.name,
        category=asset.category,
        purchase_price=asset.purchase_price,
        current_value=asset.current_value,
        purchase_date=asset.purchase_date or datetime.now(),
        description=asset.description,
        location=asset.location,
        is_zakatable=asset.is_zakatable,
        depreciation_amount=Decimal("0.00"),
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    return new_asset


@router.get("/liabilities", response_model=List[Liability])
async def get_liabilities(db: Session = Depends(get_db)):
    """Get all liabilities"""
    _, liabilities, _ = generate_sample_data()
    return [Liability(**liability) for liability in liabilities]


@router.post("/liabilities", response_model=Liability)
async def create_liability(liability: LiabilityCreate, db: Session = Depends(get_db)):
    """Create a new liability"""
    new_liability = Liability(
        id=random.randint(100, 999),
        account_id=liability.account_id,
        name=liability.name,
        category=liability.category,
        original_amount=liability.original_amount,
        current_balance=liability.current_balance,
        interest_rate=liability.interest_rate,
        monthly_payment=liability.monthly_payment,
        due_date=liability.due_date,
        description=liability.description,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    return new_liability


@router.get("/transactions", response_model=List[Transaction])
async def get_transactions(
    limit: int = Query(default=50, le=100),
    offset: int = Query(default=0, ge=0),
    db: Session = Depends(get_db)
):
    """Get transactions with pagination"""
    _, _, transactions = generate_sample_data()
    return [Transaction(**trans) for trans in transactions[offset:offset+limit]]


@router.post("/transactions", response_model=Transaction)
async def create_transaction(transaction: TransactionCreate, db: Session = Depends(get_db)):
    """Create a new transaction"""
    new_transaction = Transaction(
        id=random.randint(1000, 9999),
        from_account_id=transaction.from_account_id,
        to_account_id=transaction.to_account_id,
        transaction_type=transaction.transaction_type,
        amount=transaction.amount,
        transaction_date=transaction.transaction_date,
        category=transaction.category,
        description=transaction.description,
        reference_number=transaction.reference_number,
        tags=transaction.tags,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    return new_transaction


@router.get("/balance-sheet", response_model=BalanceSheetResponse)
async def get_balance_sheet(db: Session = Depends(get_db)):
    """Get current balance sheet"""
    assets, liabilities, _ = generate_sample_data()
    
    asset_objects = [Asset(**asset) for asset in assets]
    liability_objects = [Liability(**liability) for liability in liabilities]
    
    total_assets = sum(a.current_value for a in asset_objects)
    total_liabilities = sum(l.current_balance for l in liability_objects)
    
    asset_breakdown = {}
    for asset in asset_objects:
        if asset.category not in asset_breakdown:
            asset_breakdown[asset.category] = 0
        asset_breakdown[asset.category] += float(asset.current_value)
    
    liability_breakdown = {}
    for liability in liability_objects:
        if liability.category not in liability_breakdown:
            liability_breakdown[liability.category] = 0
        liability_breakdown[liability.category] += float(liability.current_balance)
    
    return BalanceSheetResponse(
        assets=asset_objects,
        liabilities=liability_objects,
        total_assets=total_assets,
        total_liabilities=total_liabilities,
        net_worth=total_assets - total_liabilities,
        asset_breakdown=asset_breakdown,
        liability_breakdown=liability_breakdown,
        generated_at=datetime.now()
    )


@router.get("/income-statement", response_model=IncomeStatementResponse)
async def get_income_statement(
    period_days: int = Query(default=30, ge=1, le=365),
    db: Session = Depends(get_db)
):
    """Get income statement for specified period"""
    _, _, transactions = generate_sample_data()
    
    end_date = datetime.now()
    start_date = end_date - timedelta(days=period_days)
    
    revenue = []
    expenses = []
    
    for trans in transactions:
        trans_obj = Transaction(**trans)
        if trans_obj.transaction_type == "income":
            revenue.append(trans_obj)
        elif trans_obj.transaction_type == "expense":
            expenses.append(trans_obj)
    
    total_revenue = sum(r.amount for r in revenue)
    total_expenses = sum(e.amount for e in expenses)
    
    expense_breakdown = {}
    for expense in expenses:
        category = expense.category or "Uncategorized"
        if category not in expense_breakdown:
            expense_breakdown[category] = 0
        expense_breakdown[category] += float(expense.amount)
    
    revenue_breakdown = {}
    for rev in revenue:
        category = rev.category or "Uncategorized"
        if category not in revenue_breakdown:
            revenue_breakdown[category] = 0
        revenue_breakdown[category] += float(rev.amount)
    
    return IncomeStatementResponse(
        revenue=revenue,
        expenses=expenses,
        total_revenue=total_revenue,
        total_expenses=total_expenses,
        net_income=total_revenue - total_expenses,
        expense_breakdown=expense_breakdown,
        revenue_breakdown=revenue_breakdown,
        period_start=start_date,
        period_end=end_date,
        generated_at=datetime.now()
    )


@router.post("/zakat/calculate", response_model=ZakatCalculationResponse)
async def calculate_zakat(request: ZakatCalculationRequest):
    """Calculate zakat based on provided assets"""
    
    nisab_gold_grams = Decimal("85")
    nisab_silver_grams = Decimal("595")
    
    gold_price = request.gold_price_per_gram or Decimal("60")
    silver_price = request.silver_price_per_gram or Decimal("0.75")
    
    nisab_threshold_gold = nisab_gold_grams * gold_price
    nisab_threshold_silver = nisab_silver_grams * silver_price
    
    total_zakatable = Decimal("0")
    breakdown = {}
    
    if request.gold_weight_grams:
        gold_value = request.gold_weight_grams * gold_price
        total_zakatable += gold_value
        breakdown["gold"] = float(gold_value)
    
    if request.silver_weight_grams:
        silver_value = request.silver_weight_grams * silver_price
        total_zakatable += silver_value
        breakdown["silver"] = float(silver_value)
    
    if request.cash_amount:
        total_zakatable += request.cash_amount
        breakdown["cash"] = float(request.cash_amount)
    
    if request.bank_balance:
        total_zakatable += request.bank_balance
        breakdown["bank"] = float(request.bank_balance)
    
    if request.investment_value:
        total_zakatable += request.investment_value
        breakdown["investments"] = float(request.investment_value)
    
    if request.trade_goods_value:
        total_zakatable += request.trade_goods_value
        breakdown["trade_goods"] = float(request.trade_goods_value)
    
    if request.receivables:
        total_zakatable += request.receivables
        breakdown["receivables"] = float(request.receivables)
    
    if request.liabilities:
        total_zakatable -= request.liabilities
        breakdown["liabilities"] = float(-request.liabilities)
    
    is_above_nisab = total_zakatable >= min(nisab_threshold_gold, nisab_threshold_silver)
    zakat_due = total_zakatable * Decimal("0.025") if is_above_nisab else Decimal("0")
    
    return ZakatCalculationResponse(
        total_zakatable_wealth=total_zakatable,
        nisab_threshold_gold=nisab_threshold_gold,
        nisab_threshold_silver=nisab_threshold_silver,
        is_above_nisab=is_above_nisab,
        zakat_due=zakat_due,
        zakat_rate=Decimal("0.025"),
        breakdown=breakdown,
        calculated_at=datetime.now(),
        lunar_year=1446
    )


@router.get("/summary", response_model=FinancialSummary)
async def get_financial_summary(db: Session = Depends(get_db)):
    """Get overall financial summary"""
    assets, liabilities, transactions = generate_sample_data()
    
    total_assets = sum(a["current_value"] for a in assets)
    total_liabilities = sum(l["current_balance"] for l in liabilities)
    
    monthly_income = sum(t["amount"] for t in transactions if t["transaction_type"] == "income")
    monthly_expenses = sum(t["amount"] for t in transactions if t["transaction_type"] == "expense")
    
    liquid_assets = sum(a["current_value"] for a in assets if a["category"] in ["cash", "bank"])
    investment_value = sum(a["current_value"] for a in assets if a["category"] == "investment")
    
    debt_to_asset = (total_liabilities / total_assets * 100) if total_assets > 0 else Decimal("0")
    savings_rate = ((monthly_income - monthly_expenses) / monthly_income * 100) if monthly_income > 0 else Decimal("0")
    
    return FinancialSummary(
        total_assets=total_assets,
        total_liabilities=total_liabilities,
        net_worth=total_assets - total_liabilities,
        monthly_income=monthly_income,
        monthly_expenses=monthly_expenses,
        cash_flow=monthly_income - monthly_expenses,
        liquid_assets=liquid_assets,
        investment_value=investment_value,
        debt_to_asset_ratio=debt_to_asset,
        savings_rate=savings_rate,
        generated_at=datetime.now()
    )