export enum AccountType {
  ASSET = 'asset',
  LIABILITY = 'liability',
  EQUITY = 'equity',
  REVENUE = 'revenue',
  EXPENSE = 'expense'
}

export enum AssetCategory {
  CASH = 'cash',
  BANK = 'bank',
  INVESTMENT = 'investment',
  PROPERTY = 'property',
  VEHICLE = 'vehicle',
  EQUIPMENT = 'equipment',
  INVENTORY = 'inventory',
  RECEIVABLE = 'receivable',
  OTHER = 'other'
}

export enum LiabilityCategory {
  CREDIT_CARD = 'credit_card',
  LOAN = 'loan',
  MORTGAGE = 'mortgage',
  PAYABLE = 'payable',
  OTHER = 'other'
}

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
  TRANSFER = 'transfer',
  ADJUSTMENT = 'adjustment'
}

export interface Account {
  id: number;
  name: string;
  account_type: AccountType;
  category?: string;
  description?: string;
  currency: string;
  balance: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Asset {
  id: number;
  account_id: number;
  name: string;
  category: AssetCategory;
  purchase_price: number;
  current_value: number;
  purchase_date?: string;
  depreciation_amount?: number;
  description?: string;
  location?: string;
  is_zakatable: boolean;
  created_at: string;
  updated_at: string;
}

export interface Liability {
  id: number;
  account_id: number;
  name: string;
  category: LiabilityCategory;
  original_amount: number;
  current_balance: number;
  interest_rate?: number;
  monthly_payment?: number;
  due_date?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: number;
  from_account_id?: number;
  to_account_id?: number;
  transaction_type: TransactionType;
  amount: number;
  transaction_date: string;
  category?: string;
  description?: string;
  reference_number?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

export interface BalanceSheetResponse {
  assets: Asset[];
  liabilities: Liability[];
  total_assets: number;
  total_liabilities: number;
  net_worth: number;
  asset_breakdown: Record<string, number>;
  liability_breakdown: Record<string, number>;
  generated_at: string;
}

export interface IncomeStatementResponse {
  revenue: Transaction[];
  expenses: Transaction[];
  total_revenue: number;
  total_expenses: number;
  net_income: number;
  expense_breakdown: Record<string, number>;
  revenue_breakdown: Record<string, number>;
  period_start: string;
  period_end: string;
  generated_at: string;
}

export interface ZakatCalculationRequest {
  gold_weight_grams?: number;
  silver_weight_grams?: number;
  cash_amount?: number;
  bank_balance?: number;
  investment_value?: number;
  trade_goods_value?: number;
  receivables?: number;
  liabilities?: number;
  gold_price_per_gram?: number;
  silver_price_per_gram?: number;
  use_current_prices: boolean;
}

export interface ZakatCalculationResponse {
  total_zakatable_wealth: number;
  nisab_threshold_gold: number;
  nisab_threshold_silver: number;
  is_above_nisab: boolean;
  zakat_due: number;
  zakat_rate: number;
  breakdown: Record<string, number>;
  calculated_at: string;
  lunar_year?: number;
}

export interface FinancialSummary {
  total_assets: number;
  total_liabilities: number;
  net_worth: number;
  monthly_income: number;
  monthly_expenses: number;
  cash_flow: number;
  liquid_assets: number;
  investment_value: number;
  debt_to_asset_ratio: number;
  savings_rate: number;
  generated_at: string;
}