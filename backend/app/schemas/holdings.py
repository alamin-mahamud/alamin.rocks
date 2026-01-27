"""Holdings schemas for assets, stocks, real estate, and business interests."""
from datetime import datetime
from enum import Enum
from typing import Optional, List
from pydantic import BaseModel, Field


class HoldingType(str, Enum):
    STOCK = "stock"
    REAL_ESTATE = "real_estate"
    BUSINESS = "business"
    VEHICLE = "vehicle"
    CASH = "cash"
    OTHER = "other"


class StockSector(str, Enum):
    CEMENT = "cement"
    PHARMA = "pharma"
    CONSUMER = "consumer"
    TELECOM = "telecom"
    POWER = "power"
    BANK = "bank"
    INSURANCE = "insurance"
    IT = "it"
    OTHER = "other"


# Stock Holdings
class StockHoldingBase(BaseModel):
    ticker: str
    name: str
    shares: int
    avg_cost: float
    current_price: float
    sector: StockSector = StockSector.OTHER


class StockHoldingCreate(StockHoldingBase):
    pass


class StockHoldingUpdate(BaseModel):
    ticker: Optional[str] = None
    name: Optional[str] = None
    shares: Optional[int] = None
    avg_cost: Optional[float] = None
    current_price: Optional[float] = None
    sector: Optional[StockSector] = None


class StockHolding(StockHoldingBase):
    id: int
    value: float
    gain: float
    gain_percent: float
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Real Estate
class RealEstatePropertyBase(BaseModel):
    name: str
    location: str
    property_type: str = "residential"
    estimated_value: float = 0
    monthly_rent: float = 0
    is_rented: bool = False
    is_primary_residence: bool = False


class RealEstatePropertyCreate(RealEstatePropertyBase):
    pass


class RealEstatePropertyUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    property_type: Optional[str] = None
    estimated_value: Optional[float] = None
    monthly_rent: Optional[float] = None
    is_rented: Optional[bool] = None
    is_primary_residence: Optional[bool] = None


class RealEstateProperty(RealEstatePropertyBase):
    id: int
    annual_rent: float
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Business Interests
class BusinessInterestBase(BaseModel):
    name: str
    equity_percent: float
    invested_value: float
    current_value: float
    annual_income: float = 0
    roi_percent: float = 0


class BusinessInterestCreate(BusinessInterestBase):
    pass


class BusinessInterestUpdate(BaseModel):
    name: Optional[str] = None
    equity_percent: Optional[float] = None
    invested_value: Optional[float] = None
    current_value: Optional[float] = None
    annual_income: Optional[float] = None
    roi_percent: Optional[float] = None


class BusinessInterest(BusinessInterestBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Income Source
class IncomeSourceBase(BaseModel):
    name: str
    amount: float
    frequency: str = "monthly"  # monthly, quarterly, yearly


class IncomeSourceCreate(IncomeSourceBase):
    pass


class IncomeSource(IncomeSourceBase):
    id: int

    class Config:
        from_attributes = True


# Asset Allocation
class AssetAllocationItem(BaseModel):
    name: str
    value: float
    color: str
    percent: float


# Balance Sheet Summary
class BalanceSheetSummary(BaseModel):
    total_assets: float
    total_liabilities: float
    net_worth: float
    net_worth_usd: float
    exchange_rate: float = 120.0


# Zakat Data
class ZakatData(BaseModel):
    available_balance: float
    nisab_threshold: float
    zakat_due: float


# Holdings Summary Response
class HoldingsSummary(BaseModel):
    balance_sheet: BalanceSheetSummary
    asset_allocation: List[AssetAllocationItem]
    stocks: List[StockHolding]
    real_estate: List[RealEstateProperty]
    business_interests: List[BusinessInterest]
    income_sources: List[IncomeSource]
    zakat: ZakatData

    # Computed totals
    total_stock_value: float
    total_stock_cost: float
    total_stock_gain: float
    total_stock_gain_percent: float
    total_real_estate_value: float
    total_annual_rent: float
    total_business_value: float
    total_business_income: float
