// Holdings types for assets, stocks, real estate, and business interests

export type StockSector = 'cement' | 'pharma' | 'consumer' | 'telecom' | 'power' | 'bank' | 'insurance' | 'it' | 'other';

export interface StockHolding {
  id: number;
  ticker: string;
  name: string;
  shares: number;
  avg_cost: number;
  current_price: number;
  sector: StockSector;
  value: number;
  gain: number;
  gain_percent: number;
  created_at: string;
  updated_at: string;
}

export interface StockHoldingCreate {
  ticker: string;
  name: string;
  shares: number;
  avg_cost: number;
  current_price: number;
  sector: StockSector;
}

export interface StockHoldingUpdate {
  ticker?: string;
  name?: string;
  shares?: number;
  avg_cost?: number;
  current_price?: number;
  sector?: StockSector;
}

export interface RealEstateProperty {
  id: number;
  name: string;
  location: string;
  property_type: string;
  estimated_value: number;
  monthly_rent: number;
  annual_rent: number;
  is_rented: boolean;
  is_primary_residence: boolean;
  created_at: string;
  updated_at: string;
}

export interface RealEstatePropertyCreate {
  name: string;
  location: string;
  property_type?: string;
  estimated_value?: number;
  monthly_rent?: number;
  is_rented?: boolean;
  is_primary_residence?: boolean;
}

export interface RealEstatePropertyUpdate {
  name?: string;
  location?: string;
  property_type?: string;
  estimated_value?: number;
  monthly_rent?: number;
  is_rented?: boolean;
  is_primary_residence?: boolean;
}

export interface BusinessInterest {
  id: number;
  name: string;
  equity_percent: number;
  invested_value: number;
  current_value: number;
  annual_income: number;
  roi_percent: number;
  created_at: string;
  updated_at: string;
}

export interface BusinessInterestCreate {
  name: string;
  equity_percent: number;
  invested_value: number;
  current_value: number;
  annual_income?: number;
  roi_percent?: number;
}

export interface BusinessInterestUpdate {
  name?: string;
  equity_percent?: number;
  invested_value?: number;
  current_value?: number;
  annual_income?: number;
  roi_percent?: number;
}

export interface IncomeSource {
  id: number;
  name: string;
  amount: number;
  frequency: string;
}

export interface IncomeSourceCreate {
  name: string;
  amount: number;
  frequency?: string;
}

export interface AssetAllocationItem {
  name: string;
  value: number;
  color: string;
  percent: number;
}

export interface BalanceSheetSummary {
  total_assets: number;
  total_liabilities: number;
  net_worth: number;
  net_worth_usd: number;
  exchange_rate: number;
}

export interface ZakatData {
  available_balance: number;
  nisab_threshold: number;
  zakat_due: number;
}

export interface HoldingsSummary {
  balance_sheet: BalanceSheetSummary;
  asset_allocation: AssetAllocationItem[];
  stocks: StockHolding[];
  real_estate: RealEstateProperty[];
  business_interests: BusinessInterest[];
  income_sources: IncomeSource[];
  zakat: ZakatData;
  total_stock_value: number;
  total_stock_cost: number;
  total_stock_gain: number;
  total_stock_gain_percent: number;
  total_real_estate_value: number;
  total_annual_rent: number;
  total_business_value: number;
  total_business_income: number;
}
