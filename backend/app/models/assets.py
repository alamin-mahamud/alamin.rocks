from datetime import datetime
from decimal import Decimal
from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, Numeric, Text, JSON, Enum as SQLEnum
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
import enum

Base = declarative_base()


class AccountTypeEnum(enum.Enum):
    ASSET = "asset"
    LIABILITY = "liability"
    EQUITY = "equity"
    REVENUE = "revenue"
    EXPENSE = "expense"


class AssetCategoryEnum(enum.Enum):
    CASH = "cash"
    BANK = "bank"
    INVESTMENT = "investment"
    PROPERTY = "property"
    VEHICLE = "vehicle"
    EQUIPMENT = "equipment"
    INVENTORY = "inventory"
    RECEIVABLE = "receivable"
    OTHER = "other"


class LiabilityCategoryEnum(enum.Enum):
    CREDIT_CARD = "credit_card"
    LOAN = "loan"
    MORTGAGE = "mortgage"
    PAYABLE = "payable"
    OTHER = "other"


class TransactionTypeEnum(enum.Enum):
    INCOME = "income"
    EXPENSE = "expense"
    TRANSFER = "transfer"
    ADJUSTMENT = "adjustment"


class Account(Base):
    __tablename__ = "accounts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    account_type = Column(SQLEnum(AccountTypeEnum), nullable=False)
    category = Column(String(50))
    description = Column(String(500))
    currency = Column(String(3), default="USD")
    balance = Column(Numeric(15, 2), default=Decimal("0.00"))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    assets = relationship("Asset", back_populates="account", cascade="all, delete-orphan")
    liabilities = relationship("Liability", back_populates="account", cascade="all, delete-orphan")
    transactions_from = relationship("Transaction", foreign_keys="Transaction.from_account_id", back_populates="from_account")
    transactions_to = relationship("Transaction", foreign_keys="Transaction.to_account_id", back_populates="to_account")


class Asset(Base):
    __tablename__ = "assets"

    id = Column(Integer, primary_key=True, index=True)
    account_id = Column(Integer, ForeignKey("accounts.id"), nullable=False)
    name = Column(String(200), nullable=False)
    category = Column(SQLEnum(AssetCategoryEnum), nullable=False)
    purchase_price = Column(Numeric(15, 2), nullable=False)
    current_value = Column(Numeric(15, 2), nullable=False)
    purchase_date = Column(DateTime)
    depreciation_amount = Column(Numeric(15, 2))
    description = Column(Text)
    location = Column(String(200))
    is_zakatable = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    account = relationship("Account", back_populates="assets")


class Liability(Base):
    __tablename__ = "liabilities"

    id = Column(Integer, primary_key=True, index=True)
    account_id = Column(Integer, ForeignKey("accounts.id"), nullable=False)
    name = Column(String(200), nullable=False)
    category = Column(SQLEnum(LiabilityCategoryEnum), nullable=False)
    original_amount = Column(Numeric(15, 2), nullable=False)
    current_balance = Column(Numeric(15, 2), nullable=False)
    interest_rate = Column(Numeric(5, 2))
    monthly_payment = Column(Numeric(15, 2))
    due_date = Column(DateTime)
    description = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    account = relationship("Account", back_populates="liabilities")


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    from_account_id = Column(Integer, ForeignKey("accounts.id"))
    to_account_id = Column(Integer, ForeignKey("accounts.id"))
    transaction_type = Column(SQLEnum(TransactionTypeEnum), nullable=False)
    amount = Column(Numeric(15, 2), nullable=False)
    transaction_date = Column(DateTime, nullable=False)
    category = Column(String(100))
    description = Column(String(500))
    reference_number = Column(String(100))
    tags = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    from_account = relationship("Account", foreign_keys=[from_account_id], back_populates="transactions_from")
    to_account = relationship("Account", foreign_keys=[to_account_id], back_populates="transactions_to")