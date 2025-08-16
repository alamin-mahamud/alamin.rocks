import {
  Account,
  Asset,
  Liability,
  Transaction,
  BalanceSheetResponse,
  IncomeStatementResponse,
  ZakatCalculationRequest,
  ZakatCalculationResponse,
  FinancialSummary
} from '@/types/assets';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class AssetAPI {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Account endpoints
  async getAccounts(): Promise<Account[]> {
    return this.request<Account[]>('/api/assets/accounts');
  }

  async createAccount(account: Omit<Account, 'id' | 'balance' | 'created_at' | 'updated_at'>): Promise<Account> {
    return this.request<Account>('/api/assets/accounts', {
      method: 'POST',
      body: JSON.stringify(account),
    });
  }

  // Asset endpoints
  async getAssets(): Promise<Asset[]> {
    return this.request<Asset[]>('/api/assets/assets');
  }

  async createAsset(asset: Omit<Asset, 'id' | 'depreciation_amount' | 'created_at' | 'updated_at'>): Promise<Asset> {
    return this.request<Asset>('/api/assets/assets', {
      method: 'POST',
      body: JSON.stringify(asset),
    });
  }

  // Liability endpoints
  async getLiabilities(): Promise<Liability[]> {
    return this.request<Liability[]>('/api/assets/liabilities');
  }

  async createLiability(liability: Omit<Liability, 'id' | 'created_at' | 'updated_at'>): Promise<Liability> {
    return this.request<Liability>('/api/assets/liabilities', {
      method: 'POST',
      body: JSON.stringify(liability),
    });
  }

  // Transaction endpoints
  async getTransactions(limit: number = 50, offset: number = 0): Promise<Transaction[]> {
    return this.request<Transaction[]>(`/api/assets/transactions?limit=${limit}&offset=${offset}`);
  }

  async createTransaction(transaction: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>): Promise<Transaction> {
    return this.request<Transaction>('/api/assets/transactions', {
      method: 'POST',
      body: JSON.stringify(transaction),
    });
  }

  // Financial reports
  async getBalanceSheet(): Promise<BalanceSheetResponse> {
    return this.request<BalanceSheetResponse>('/api/assets/balance-sheet');
  }

  async getIncomeStatement(periodDays: number = 30): Promise<IncomeStatementResponse> {
    return this.request<IncomeStatementResponse>(`/api/assets/income-statement?period_days=${periodDays}`);
  }

  async getFinancialSummary(): Promise<FinancialSummary> {
    return this.request<FinancialSummary>('/api/assets/summary');
  }

  // Zakat calculation
  async calculateZakat(request: ZakatCalculationRequest): Promise<ZakatCalculationResponse> {
    return this.request<ZakatCalculationResponse>('/api/assets/zakat/calculate', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }
}

export const assetAPI = new AssetAPI();