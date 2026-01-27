"""Holdings API endpoints for managing assets, stocks, real estate, and business interests."""
from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query

from app.schemas.holdings import (
    StockHolding, StockHoldingCreate, StockHoldingUpdate,
    RealEstateProperty, RealEstatePropertyCreate, RealEstatePropertyUpdate,
    BusinessInterest, BusinessInterestCreate, BusinessInterestUpdate,
    IncomeSource, IncomeSourceCreate,
    AssetAllocationItem, BalanceSheetSummary, ZakatData,
    HoldingsSummary, StockSector
)

router = APIRouter(prefix="/api/holdings", tags=["holdings"])

# In-memory storage (will be replaced with database)
_stocks: List[dict] = [
    {"id": 1, "ticker": "LHBL", "name": "LafargeHolcim Bangladesh", "shares": 100000, "avg_cost": 60, "current_price": 68, "sector": "cement"},
    {"id": 2, "ticker": "SQURPHARMA", "name": "Square Pharmaceuticals", "shares": 30000, "avg_cost": 209, "current_price": 217, "sector": "pharma"},
    {"id": 3, "ticker": "MARICO", "name": "Marico Bangladesh", "shares": 2500, "avg_cost": 2310, "current_price": 2500, "sector": "consumer"},
    {"id": 4, "ticker": "GP", "name": "Grameenphone Ltd", "shares": 15000, "avg_cost": 260, "current_price": 235, "sector": "telecom"},
    {"id": 5, "ticker": "BSCCL", "name": "Bangladesh Submarine Cable", "shares": 5000, "avg_cost": 120, "current_price": 165, "sector": "telecom"},
    {"id": 6, "ticker": "UPGDCL", "name": "United Power Gen", "shares": 5000, "avg_cost": 145, "current_price": 150, "sector": "power"},
]

_real_estate: List[dict] = [
    {"id": 1, "name": "Tanbir 5th Floor", "location": "Dhaka", "property_type": "residential", "estimated_value": 8000000, "monthly_rent": 30000, "is_rented": True, "is_primary_residence": False},
    {"id": 2, "name": "Tanbir 4th Floor", "location": "Dhaka", "property_type": "residential", "estimated_value": 7000000, "monthly_rent": 20000, "is_rented": True, "is_primary_residence": False},
    {"id": 3, "name": "Bagbari Land", "location": "Rural", "property_type": "land", "estimated_value": 5000000, "monthly_rent": 8333, "is_rented": True, "is_primary_residence": False},
    {"id": 4, "name": "Shimultoli Shop", "location": "Dhaka", "property_type": "commercial", "estimated_value": 3900000, "monthly_rent": 7500, "is_rented": True, "is_primary_residence": False},
    {"id": 5, "name": "Primary Residence", "location": "Dhaka", "property_type": "residential", "estimated_value": 2710000, "monthly_rent": 0, "is_rented": False, "is_primary_residence": True},
]

_business_interests: List[dict] = [
    {"id": 1, "name": "City Care General Hospital", "equity_percent": 7, "invested_value": 500000, "current_value": 508629, "annual_income": 50863, "roi_percent": 10},
    {"id": 2, "name": "Alisha Noor", "equity_percent": 100, "invested_value": 68786, "current_value": 68786, "annual_income": 0, "roi_percent": 0},
    {"id": 3, "name": "Youtube", "equity_percent": 100, "invested_value": 46000, "current_value": 46000, "annual_income": 0, "roi_percent": 0},
    {"id": 4, "name": "Agrani Printers", "equity_percent": 10, "invested_value": 25000, "current_value": 25000, "annual_income": 0, "roi_percent": 0},
    {"id": 5, "name": "AIUB SR", "equity_percent": 50, "invested_value": 14000, "current_value": 14000, "annual_income": 0, "roi_percent": 0},
]

_income_sources: List[dict] = [
    {"id": 1, "name": "Real Estate Rentals", "amount": 170000, "frequency": "monthly"},
    {"id": 2, "name": "Businesses", "amount": 50000, "frequency": "monthly"},
    {"id": 3, "name": "Dividends", "amount": 30000, "frequency": "quarterly"},
    {"id": 4, "name": "Contracts", "amount": 20000, "frequency": "monthly"},
]

_balance_sheet = {
    "total_assets": 30640000,
    "total_liabilities": 3500000,
    "net_worth": 27140000,
    "net_worth_usd": 7770,
    "exchange_rate": 120.0
}

_zakat_data = {
    "available_balance": 69410,
    "nisab_threshold": 52500,
    "zakat_due": 1735
}


def _compute_stock(stock: dict) -> dict:
    """Compute stock values."""
    value = stock["shares"] * stock["current_price"]
    cost = stock["shares"] * stock["avg_cost"]
    gain = value - cost
    gain_percent = (gain / cost * 100) if cost > 0 else 0
    return {
        **stock,
        "value": value,
        "gain": gain,
        "gain_percent": round(gain_percent, 2),
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }


def _compute_property(prop: dict) -> dict:
    """Compute property values."""
    annual_rent = prop["monthly_rent"] * 12
    return {
        **prop,
        "annual_rent": annual_rent,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }


def _compute_business(biz: dict) -> dict:
    """Add timestamps to business."""
    return {
        **biz,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }


# Stock endpoints
@router.get("/stocks", response_model=List[StockHolding])
async def get_stocks():
    """Get all stock holdings."""
    return [_compute_stock(s) for s in _stocks]


@router.post("/stocks", response_model=StockHolding)
async def create_stock(stock: StockHoldingCreate):
    """Create a new stock holding."""
    new_id = max([s["id"] for s in _stocks], default=0) + 1
    new_stock = {"id": new_id, **stock.model_dump()}
    _stocks.append(new_stock)
    return _compute_stock(new_stock)


@router.put("/stocks/{stock_id}", response_model=StockHolding)
async def update_stock(stock_id: int, stock: StockHoldingUpdate):
    """Update a stock holding."""
    for i, s in enumerate(_stocks):
        if s["id"] == stock_id:
            update_data = stock.model_dump(exclude_unset=True)
            _stocks[i] = {**s, **update_data}
            return _compute_stock(_stocks[i])
    raise HTTPException(status_code=404, detail="Stock not found")


@router.delete("/stocks/{stock_id}")
async def delete_stock(stock_id: int):
    """Delete a stock holding."""
    global _stocks
    _stocks = [s for s in _stocks if s["id"] != stock_id]
    return {"message": "Stock deleted"}


# Real Estate endpoints
@router.get("/real-estate", response_model=List[RealEstateProperty])
async def get_real_estate():
    """Get all real estate properties."""
    return [_compute_property(p) for p in _real_estate]


@router.post("/real-estate", response_model=RealEstateProperty)
async def create_property(prop: RealEstatePropertyCreate):
    """Create a new property."""
    new_id = max([p["id"] for p in _real_estate], default=0) + 1
    new_prop = {"id": new_id, **prop.model_dump()}
    _real_estate.append(new_prop)
    return _compute_property(new_prop)


@router.put("/real-estate/{property_id}", response_model=RealEstateProperty)
async def update_property(property_id: int, prop: RealEstatePropertyUpdate):
    """Update a property."""
    for i, p in enumerate(_real_estate):
        if p["id"] == property_id:
            update_data = prop.model_dump(exclude_unset=True)
            _real_estate[i] = {**p, **update_data}
            return _compute_property(_real_estate[i])
    raise HTTPException(status_code=404, detail="Property not found")


@router.delete("/real-estate/{property_id}")
async def delete_property(property_id: int):
    """Delete a property."""
    global _real_estate
    _real_estate = [p for p in _real_estate if p["id"] != property_id]
    return {"message": "Property deleted"}


# Business Interest endpoints
@router.get("/business", response_model=List[BusinessInterest])
async def get_business_interests():
    """Get all business interests."""
    return [_compute_business(b) for b in _business_interests]


@router.post("/business", response_model=BusinessInterest)
async def create_business(biz: BusinessInterestCreate):
    """Create a new business interest."""
    new_id = max([b["id"] for b in _business_interests], default=0) + 1
    new_biz = {"id": new_id, **biz.model_dump()}
    _business_interests.append(new_biz)
    return _compute_business(new_biz)


@router.put("/business/{business_id}", response_model=BusinessInterest)
async def update_business(business_id: int, biz: BusinessInterestUpdate):
    """Update a business interest."""
    for i, b in enumerate(_business_interests):
        if b["id"] == business_id:
            update_data = biz.model_dump(exclude_unset=True)
            _business_interests[i] = {**b, **update_data}
            return _compute_business(_business_interests[i])
    raise HTTPException(status_code=404, detail="Business not found")


@router.delete("/business/{business_id}")
async def delete_business(business_id: int):
    """Delete a business interest."""
    global _business_interests
    _business_interests = [b for b in _business_interests if b["id"] != business_id]
    return {"message": "Business deleted"}


# Income Source endpoints
@router.get("/income-sources", response_model=List[IncomeSource])
async def get_income_sources():
    """Get all income sources."""
    return _income_sources


@router.post("/income-sources", response_model=IncomeSource)
async def create_income_source(source: IncomeSourceCreate):
    """Create a new income source."""
    new_id = max([s["id"] for s in _income_sources], default=0) + 1
    new_source = {"id": new_id, **source.model_dump()}
    _income_sources.append(new_source)
    return new_source


# Balance Sheet and Summary endpoints
@router.get("/balance-sheet", response_model=BalanceSheetSummary)
async def get_balance_sheet():
    """Get balance sheet summary."""
    return _balance_sheet


@router.put("/balance-sheet", response_model=BalanceSheetSummary)
async def update_balance_sheet(data: BalanceSheetSummary):
    """Update balance sheet."""
    global _balance_sheet
    _balance_sheet = data.model_dump()
    return _balance_sheet


@router.get("/zakat", response_model=ZakatData)
async def get_zakat():
    """Get zakat calculation data."""
    return _zakat_data


@router.put("/zakat", response_model=ZakatData)
async def update_zakat(data: ZakatData):
    """Update zakat data."""
    global _zakat_data
    _zakat_data = data.model_dump()
    return _zakat_data


@router.get("/summary", response_model=HoldingsSummary)
async def get_holdings_summary():
    """Get complete holdings summary."""
    stocks = [_compute_stock(s) for s in _stocks]
    properties = [_compute_property(p) for p in _real_estate]
    businesses = [_compute_business(b) for b in _business_interests]

    # Calculate totals
    total_stock_value = sum(s["value"] for s in stocks)
    total_stock_cost = sum(s["shares"] * s["avg_cost"] for s in stocks)
    total_stock_gain = total_stock_value - total_stock_cost
    total_stock_gain_percent = (total_stock_gain / total_stock_cost * 100) if total_stock_cost > 0 else 0

    total_real_estate_value = sum(p["estimated_value"] for p in _real_estate)
    total_annual_rent = sum(p["monthly_rent"] * 12 for p in _real_estate)

    total_business_value = sum(b["current_value"] for b in _business_interests)
    total_business_income = sum(b["annual_income"] for b in _business_interests)

    # Asset allocation
    asset_allocation = [
        {"name": "Real Estate", "value": total_real_estate_value, "color": "#e11d48", "percent": 78},
        {"name": "Primary Residence", "value": 2710000, "color": "#1e293b", "percent": 9},
        {"name": "Business Interests", "value": total_business_value, "color": "#16a34a", "percent": 2},
        {"name": "Vehicles", "value": 350000, "color": "#2563eb", "percent": 1},
        {"name": "Capital Markets", "value": total_stock_value, "color": "#f97316", "percent": 0.3},
    ]

    return HoldingsSummary(
        balance_sheet=BalanceSheetSummary(**_balance_sheet),
        asset_allocation=asset_allocation,
        stocks=stocks,
        real_estate=properties,
        business_interests=businesses,
        income_sources=_income_sources,
        zakat=ZakatData(**_zakat_data),
        total_stock_value=total_stock_value,
        total_stock_cost=total_stock_cost,
        total_stock_gain=total_stock_gain,
        total_stock_gain_percent=round(total_stock_gain_percent, 2),
        total_real_estate_value=total_real_estate_value,
        total_annual_rent=total_annual_rent,
        total_business_value=total_business_value,
        total_business_income=total_business_income
    )
