'use client';

import { useState, useEffect } from 'react';
import { AuthWrapper } from '@/components/AuthWrapper';
import { Layout } from '@/components/Layout';
import { StatsCard } from '@/components/Dashboard/StatsCard';
import BalanceSheet from '@/components/Assets/BalanceSheet';
import IncomeStatement from '@/components/Assets/IncomeStatement';
import ZakatCalculator from '@/components/Assets/ZakatCalculator';
import { assetAPI } from '@/lib/assets-api';
import { FinancialSummary } from '@/types/assets';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  BarChart3, 
  Calculator,
  Building,
  CreditCard,
  Target
} from 'lucide-react';

export default function AssetManagementPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [summary, setSummary] = useState<FinancialSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const data = await assetAPI.getFinancialSummary();
      setSummary(data);
    } catch (error) {
      console.error('Failed to fetch financial summary:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: PieChart },
    { id: 'balance-sheet', label: 'Balance Sheet', icon: BarChart3 },
    { id: 'income-statement', label: 'Income Statement', icon: TrendingUp },
    { id: 'zakat', label: 'Zakat Calculator', icon: Calculator }
  ];

  return (
    <AuthWrapper>
      <Layout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Asset Management</h1>
              <p className="text-muted-foreground">Track your personal finances, investments, and Islamic obligations</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-muted p-1 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                  title="Net Worth"
                  value={loading ? "..." : summary ? `$${summary.net_worth.toLocaleString()}` : "$0"}
                  description="Assets - Liabilities"
                  icon={Wallet}
                  trend={summary ? { 
                    value: summary.net_worth >= 0 ? 12 : -5, 
                    label: 'from last month' 
                  } : undefined}
                  color={summary && summary.net_worth >= 0 ? 'success' : 'danger'}
                />
                <StatsCard
                  title="Total Assets"
                  value={loading ? "..." : summary ? `$${summary.total_assets.toLocaleString()}` : "$0"}
                  description="All owned assets"
                  icon={Building}
                  trend={{ value: 8, label: 'from last month' }}
                  color="default"
                />
                <StatsCard
                  title="Monthly Cash Flow"
                  value={loading ? "..." : summary ? `$${summary.cash_flow.toLocaleString()}` : "$0"}
                  description="Income - Expenses"
                  icon={summary && summary.cash_flow >= 0 ? TrendingUp : TrendingDown}
                  trend={summary ? { 
                    value: summary.cash_flow >= 0 ? 15 : -8, 
                    label: 'from last month' 
                  } : undefined}
                  color={summary && summary.cash_flow >= 0 ? 'success' : 'warning'}
                />
                <StatsCard
                  title="Savings Rate"
                  value={loading ? "..." : summary ? `${summary.savings_rate.toFixed(1)}%` : "0%"}
                  description="Of monthly income"
                  icon={Target}
                  trend={{ value: 5, label: 'from last month' }}
                  color="success"
                />
              </div>

              {/* Financial Health & Quick Actions */}
              {summary && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="admin-card">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Financial Health</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Debt-to-Asset Ratio</span>
                        <span className={`font-semibold ${
                          summary.debt_to_asset_ratio < 30 ? 'text-green-600' : 
                          summary.debt_to_asset_ratio < 50 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {summary.debt_to_asset_ratio.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Liquid Assets</span>
                        <span className="font-semibold text-foreground">${summary.liquid_assets.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Investment Value</span>
                        <span className="font-semibold text-foreground">${summary.investment_value.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Monthly Income</span>
                        <span className="font-semibold text-green-600">${summary.monthly_income.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Monthly Expenses</span>
                        <span className="font-semibold text-red-600">${summary.monthly_expenses.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="admin-card">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setActiveTab('balance-sheet')}
                        className="admin-button-secondary text-left p-4 h-auto flex flex-col items-start"
                      >
                        <BarChart3 className="h-6 w-6 mb-2 text-accent" />
                        <div className="font-semibold">Balance Sheet</div>
                        <div className="text-xs text-muted-foreground">Assets & Liabilities</div>
                      </button>
                      
                      <button
                        onClick={() => setActiveTab('income-statement')}
                        className="admin-button-secondary text-left p-4 h-auto flex flex-col items-start"
                      >
                        <TrendingUp className="h-6 w-6 mb-2 text-success" />
                        <div className="font-semibold">Income Analysis</div>
                        <div className="text-xs text-muted-foreground">Revenue & Expenses</div>
                      </button>
                      
                      <button
                        onClick={() => setActiveTab('zakat')}
                        className="admin-button-secondary text-left p-4 h-auto flex flex-col items-start"
                      >
                        <Calculator className="h-6 w-6 mb-2 text-warning" />
                        <div className="font-semibold">Zakat Calculator</div>
                        <div className="text-xs text-muted-foreground">Islamic Obligation</div>
                      </button>
                      
                      <button
                        className="admin-button-secondary text-left p-4 h-auto flex flex-col items-start opacity-50"
                        disabled
                      >
                        <DollarSign className="h-6 w-6 mb-2 text-muted-foreground" />
                        <div className="font-semibold">Add Transaction</div>
                        <div className="text-xs text-muted-foreground">Coming Soon</div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Activity Preview */}
              <div className="admin-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
                <div className="text-center text-muted-foreground py-8">
                  <div className="h-12 w-12 mx-auto mb-4 bg-muted rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <p className="font-medium">Transaction history will appear here</p>
                  <p className="text-sm">Connect your accounts to see recent transactions</p>
                </div>
              </div>
            </div>
          )}

          {/* Balance Sheet Tab */}
          {activeTab === 'balance-sheet' && (
            <BalanceSheet />
          )}

          {/* Income Statement Tab */}
          {activeTab === 'income-statement' && (
            <IncomeStatement />
          )}

          {/* Zakat Calculator Tab */}
          {activeTab === 'zakat' && (
            <ZakatCalculator />
          )}
        </div>
      </Layout>
    </AuthWrapper>
  );
}