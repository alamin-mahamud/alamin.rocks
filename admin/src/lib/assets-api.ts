import api from './api';
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

class AssetAPI {

  // Account endpoints
  async getAccounts(): Promise<Account[]> {
    const response = await api.get('/api/assets/accounts');
    return response.data;
  }

  async createAccount(account: Omit<Account, 'id' | 'balance' | 'created_at' | 'updated_at'>): Promise<Account> {
    const response = await api.post('/api/assets/accounts', account);
    return response.data;
  }

  // Asset endpoints
  async getAssets(): Promise<Asset[]> {
    const response = await api.get('/api/assets/assets');
    return response.data;
  }

  async createAsset(asset: Omit<Asset, 'id' | 'depreciation_amount' | 'created_at' | 'updated_at'>): Promise<Asset> {
    const response = await api.post('/api/assets/assets', asset);
    return response.data;
  }

  // Liability endpoints
  async getLiabilities(): Promise<Liability[]> {
    const response = await api.get('/api/assets/liabilities');
    return response.data;
  }

  async createLiability(liability: Omit<Liability, 'id' | 'created_at' | 'updated_at'>): Promise<Liability> {
    const response = await api.post('/api/assets/liabilities', liability);
    return response.data;
  }

  // Transaction endpoints
  async getTransactions(limit: number = 50, offset: number = 0): Promise<Transaction[]> {
    const response = await api.get('/api/assets/transactions', { params: { limit, offset } });
    return response.data;
  }

  async createTransaction(transaction: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>): Promise<Transaction> {
    const response = await api.post('/api/assets/transactions', transaction);
    return response.data;
  }

  // Financial reports
  async getBalanceSheet(): Promise<BalanceSheetResponse> {
    const response = await api.get('/api/assets/balance-sheet');
    return response.data;
  }

  async getIncomeStatement(periodDays: number = 30): Promise<IncomeStatementResponse> {
    const response = await api.get('/api/assets/income-statement', { params: { period_days: periodDays } });
    return response.data;
  }

  async getFinancialSummary(): Promise<FinancialSummary> {
    const response = await api.get('/api/assets/summary');
    return response.data;
  }

  // Zakat calculation
  async calculateZakat(request: ZakatCalculationRequest): Promise<ZakatCalculationResponse> {
    const response = await api.post('/api/assets/zakat/calculate', request);
    return response.data;
  }
}

export const assetAPI = new AssetAPI();