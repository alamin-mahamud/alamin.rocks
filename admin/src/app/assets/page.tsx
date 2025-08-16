'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import BalanceSheet from '@/components/Assets/BalanceSheet';
import IncomeStatement from '@/components/Assets/IncomeStatement';
import ZakatCalculator from '@/components/Assets/ZakatCalculator';
import { assetAPI } from '@/lib/assets-api';
import { FinancialSummary } from '@/types/assets';

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
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'balance-sheet', label: 'Balance Sheet', icon: '📈' },
    { id: 'income-statement', label: 'Income Statement', icon: '💰' },
    { id: 'zakat', label: 'Zakat Calculator', icon: '🕌' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Asset Management</h1>
          <p className="text-gray-600">Track your personal finances, investments, and Islamic obligations</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </Card>
              ))}
            </div>
          ) : summary ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 bg-green-50 border-green-200">
                <h3 className="text-lg font-semibold text-green-800">Net Worth</h3>
                <p className="text-3xl font-bold text-green-600">
                  ${summary.net_worth.toLocaleString()}
                </p>
                <p className="text-sm text-green-600">
                  Assets - Liabilities
                </p>
              </Card>

              <Card className="p-6 bg-blue-50 border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800">Total Assets</h3>
                <p className="text-3xl font-bold text-blue-600">
                  ${summary.total_assets.toLocaleString()}
                </p>
                <p className="text-sm text-blue-600">
                  All owned assets
                </p>
              </Card>

              <Card className="p-6 bg-purple-50 border-purple-200">
                <h3 className="text-lg font-semibold text-purple-800">Monthly Cash Flow</h3>
                <p className={`text-3xl font-bold ${summary.cash_flow >= 0 ? 'text-purple-600' : 'text-red-600'}`}>
                  ${summary.cash_flow.toLocaleString()}
                </p>
                <p className="text-sm text-purple-600">
                  Income - Expenses
                </p>
              </Card>

              <Card className="p-6 bg-yellow-50 border-yellow-200">
                <h3 className="text-lg font-semibold text-yellow-800">Savings Rate</h3>
                <p className="text-3xl font-bold text-yellow-600">
                  {summary.savings_rate.toFixed(1)}%
                </p>
                <p className="text-sm text-yellow-600">
                  Of monthly income
                </p>
              </Card>
            </div>
          ) : null}

          {/* Quick Stats */}
          {summary && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Financial Health</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Debt-to-Asset Ratio</span>
                    <span className={`font-semibold ${summary.debt_to_asset_ratio < 30 ? 'text-green-600' : summary.debt_to_asset_ratio < 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {summary.debt_to_asset_ratio.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Liquid Assets</span>
                    <span className="font-semibold">${summary.liquid_assets.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Investment Value</span>
                    <span className="font-semibold">${summary.investment_value.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Income</span>
                    <span className="font-semibold text-green-600">${summary.monthly_income.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Expenses</span>
                    <span className="font-semibold text-red-600">${summary.monthly_expenses.toLocaleString()}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setActiveTab('balance-sheet')}
                    className="p-4 text-left bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <div className="text-2xl mb-2">📊</div>
                    <div className="font-semibold">View Balance Sheet</div>
                    <div className="text-sm text-gray-600">Assets & Liabilities</div>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('income-statement')}
                    className="p-4 text-left bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <div className="text-2xl mb-2">💰</div>
                    <div className="font-semibold">Income Analysis</div>
                    <div className="text-sm text-gray-600">Revenue & Expenses</div>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('zakat')}
                    className="p-4 text-left bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    <div className="text-2xl mb-2">🕌</div>
                    <div className="font-semibold">Calculate Zakat</div>
                    <div className="text-sm text-gray-600">Islamic Obligation</div>
                  </button>
                  
                  <button
                    className="p-4 text-left bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                    disabled
                  >
                    <div className="text-2xl mb-2">📝</div>
                    <div className="font-semibold">Add Transaction</div>
                    <div className="text-sm text-gray-600">Coming Soon</div>
                  </button>
                </div>
              </Card>
            </div>
          )}

          {/* Recent Activity Preview */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
            <div className="text-center text-gray-500 py-8">
              <div className="text-4xl mb-2">📊</div>
              <p>Transaction history will appear here</p>
              <p className="text-sm">Connect your accounts to see recent transactions</p>
            </div>
          </Card>
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
  );
}