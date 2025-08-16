from datetime import datetime
from decimal import Decimal
from enum import Enum
from typing import List, Optional
from pydantic import BaseModel, Field


class AccountType(str, Enum):
    ASSET = "asset"
    LIABILITY = "liability"
    EQUITY = "equity"
    REVENUE = "revenue"
    EXPENSE = "expense"


class AssetCategory(str, Enum):
    CASH = "cash"
    BANK = "bank"
    INVESTMENT = "investment"
    PROPERTY = "property"
    VEHICLE = "vehicle"
    EQUIPMENT = "equipment"
    INVENTORY = "inventory"
    RECEIVABLE = "receivable"
    OTHER = "other"


class LiabilityCategory(str, Enum):
    CREDIT_CARD = "credit_card"
    LOAN = "loan"
    MORTGAGE = "mortgage"
    PAYABLE = "payable"
    OTHER = "other"


class TransactionType(str, Enum):
    INCOME = "income"
    EXPENSE = "expense"
    TRANSFER = "transfer"
    ADJUSTMENT = "adjustment"


class ZakatCategory(str, Enum):
    GOLD = "gold"
    SILVER = "silver"
    CASH = "cash"
    TRADE_GOODS = "trade_goods"
    STOCKS = "stocks"
    AGRICULTURE = "agriculture"
    LIVESTOCK = "livestock"


class AccountBase(BaseModel):
    name: str = Field(..., max_length=100)
    account_type: AccountType
    category: Optional[str] = Field(None, max_length=50)
    description: Optional[str] = Field(None, max_length=500)
    currency: str = Field(default="USD", max_length=3)
    is_active: bool = Field(default=True)


class AccountCreate(AccountBase):
    initial_balance: Decimal = Field(default=Decimal("0.00"))


class AccountUpdate(BaseModel):
    name: Optional[str] = Field(None, max_length=100)
    category: Optional[str] = Field(None, max_length=50)
    description: Optional[str] = Field(None, max_length=500)
    is_active: Optional[bool] = None


class Account(AccountBase):
    id: int
    balance: Decimal
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class AssetBase(BaseModel):
    account_id: int
    name: str = Field(..., max_length=200)
    category: AssetCategory
    purchase_price: Decimal = Field(..., ge=0)
    current_value: Decimal = Field(..., ge=0)
    purchase_date: Optional[datetime] = None
    description: Optional[str] = Field(None, max_length=1000)
    location: Optional[str] = Field(None, max_length=200)
    is_zakatable: bool = Field(default=False)


class AssetCreate(AssetBase):
    pass


class AssetUpdate(BaseModel):
    name: Optional[str] = Field(None, max_length=200)
    current_value: Optional[Decimal] = Field(None, ge=0)
    description: Optional[str] = Field(None, max_length=1000)
    location: Optional[str] = Field(None, max_length=200)
    is_zakatable: Optional[bool] = None


class Asset(AssetBase):
    id: int
    depreciation_amount: Optional[Decimal] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class LiabilityBase(BaseModel):
    account_id: int
    name: str = Field(..., max_length=200)
    category: LiabilityCategory
    original_amount: Decimal = Field(..., ge=0)
    current_balance: Decimal = Field(..., ge=0)
    interest_rate: Optional[Decimal] = Field(None, ge=0, le=100)
    monthly_payment: Optional[Decimal] = Field(None, ge=0)
    due_date: Optional[datetime] = None
    description: Optional[str] = Field(None, max_length=1000)


class LiabilityCreate(LiabilityBase):
    pass


class LiabilityUpdate(BaseModel):
    name: Optional[str] = Field(None, max_length=200)
    current_balance: Optional[Decimal] = Field(None, ge=0)
    monthly_payment: Optional[Decimal] = Field(None, ge=0)
    due_date: Optional[datetime] = None
    description: Optional[str] = Field(None, max_length=1000)


class Liability(LiabilityBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class TransactionBase(BaseModel):
    from_account_id: Optional[int] = None
    to_account_id: Optional[int] = None
    transaction_type: TransactionType
    amount: Decimal = Field(..., gt=0)
    transaction_date: datetime
    category: Optional[str] = Field(None, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    reference_number: Optional[str] = Field(None, max_length=100)
    tags: Optional[List[str]] = Field(default_factory=list)


class TransactionCreate(TransactionBase):
    pass


class TransactionUpdate(BaseModel):
    category: Optional[str] = Field(None, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    tags: Optional[List[str]] = None


class Transaction(TransactionBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class BalanceSheetResponse(BaseModel):
    assets: List[Asset]
    liabilities: List[Liability]
    total_assets: Decimal
    total_liabilities: Decimal
    net_worth: Decimal
    asset_breakdown: dict
    liability_breakdown: dict
    generated_at: datetime


class IncomeStatementResponse(BaseModel):
    revenue: List[Transaction]
    expenses: List[Transaction]
    total_revenue: Decimal
    total_expenses: Decimal
    net_income: Decimal
    expense_breakdown: dict
    revenue_breakdown: dict
    period_start: datetime
    period_end: datetime
    generated_at: datetime


class ZakatCalculationRequest(BaseModel):
    gold_weight_grams: Optional[Decimal] = Field(None, ge=0)
    silver_weight_grams: Optional[Decimal] = Field(None, ge=0)
    cash_amount: Optional[Decimal] = Field(None, ge=0)
    bank_balance: Optional[Decimal] = Field(None, ge=0)
    investment_value: Optional[Decimal] = Field(None, ge=0)
    trade_goods_value: Optional[Decimal] = Field(None, ge=0)
    receivables: Optional[Decimal] = Field(None, ge=0)
    liabilities: Optional[Decimal] = Field(None, ge=0)
    gold_price_per_gram: Optional[Decimal] = Field(None, ge=0)
    silver_price_per_gram: Optional[Decimal] = Field(None, ge=0)
    use_current_prices: bool = Field(default=True)


class ZakatCalculationResponse(BaseModel):
    total_zakatable_wealth: Decimal
    nisab_threshold_gold: Decimal
    nisab_threshold_silver: Decimal
    is_above_nisab: bool
    zakat_due: Decimal
    zakat_rate: Decimal = Field(default=Decimal("0.025"))
    breakdown: dict
    calculated_at: datetime
    lunar_year: Optional[int] = None


class FinancialSummary(BaseModel):
    total_assets: Decimal
    total_liabilities: Decimal
    net_worth: Decimal
    monthly_income: Decimal
    monthly_expenses: Decimal
    cash_flow: Decimal
    liquid_assets: Decimal
    investment_value: Decimal
    debt_to_asset_ratio: Decimal
    savings_rate: Decimal
    generated_at: datetime