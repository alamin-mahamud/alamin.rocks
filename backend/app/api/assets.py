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
    """Generate random sample data for demonstration"""
    assets = []
    liabilities = []
    transactions = []
    
    asset_categories = list(AssetCategory)
    liability_categories = list(LiabilityCategory)
    
    for i in range(1, 6):
        assets.append({
            "id": i,
            "account_id": 1,
            "name": f"Asset {i}",
            "category": random.choice(asset_categories).value,
            "purchase_price": Decimal(str(random.uniform(1000, 50000))),
            "current_value": Decimal(str(random.uniform(1000, 60000))),
            "purchase_date": datetime.now() - timedelta(days=random.randint(30, 365)),
            "description": f"Sample asset {i}",
            "location": f"Location {i}",
            "is_zakatable": random.choice([True, False]),
            "depreciation_amount": Decimal(str(random.uniform(0, 1000))),
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        })
    
    for i in range(1, 4):
        liabilities.append({
            "id": i,
            "account_id": 2,
            "name": f"Liability {i}",
            "category": random.choice(liability_categories).value,
            "original_amount": Decimal(str(random.uniform(5000, 30000))),
            "current_balance": Decimal(str(random.uniform(1000, 25000))),
            "interest_rate": Decimal(str(random.uniform(2, 15))),
            "monthly_payment": Decimal(str(random.uniform(100, 1000))),
            "due_date": datetime.now() + timedelta(days=random.randint(30, 365)),
            "description": f"Sample liability {i}",
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        })
    
    for i in range(1, 21):
        trans_type = random.choice([TransactionType.INCOME, TransactionType.EXPENSE])
        transactions.append({
            "id": i,
            "from_account_id": 1 if trans_type == TransactionType.EXPENSE else None,
            "to_account_id": 1 if trans_type == TransactionType.INCOME else None,
            "transaction_type": trans_type.value,
            "amount": Decimal(str(random.uniform(50, 5000))),
            "transaction_date": datetime.now() - timedelta(days=random.randint(1, 30)),
            "category": f"Category {random.randint(1, 5)}",
            "description": f"Transaction {i}",
            "reference_number": f"REF{i:04d}",
            "tags": [f"tag{random.randint(1, 3)}", f"tag{random.randint(4, 6)}"],
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