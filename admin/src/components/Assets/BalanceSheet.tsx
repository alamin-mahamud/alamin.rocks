'use client';

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { assetAPI } from '@/lib/assets-api';
import { BalanceSheetResponse } from '@/types/assets';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

interface BalanceSheetProps {
  className?: string;
}

export default function BalanceSheet({ className }: BalanceSheetProps) {
  const [balanceSheet, setBalanceSheet] = useState<BalanceSheetResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBalanceSheet();
  }, []);

  const fetchBalanceSheet = async () => {
    try {
      setLoading(true);
      const data = await assetAPI.getBalanceSheet();
      setBalanceSheet(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch balance sheet');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading balance sheet...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="admin-card p-8 max-w-md text-center">
          <h2 className="text-xl font-bold text-destructive mb-4">Error</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button 
            onClick={fetchBalanceSheet}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!balanceSheet) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="admin-card p-8 text-center">
          <p className="text-muted-foreground">No data available</p>
        </div>
      </div>
    );
  }

  const assetChartData = Object.entries(balanceSheet.asset_breakdown).map(([name, value]) => ({
    name: name.replace('_', ' ').toUpperCase(),
    value: Number(value)
  }));

  const liabilityChartData = Object.entries(balanceSheet.liability_breakdown).map(([name, value]) => ({
    name: name.replace('_', ' ').toUpperCase(),
    value: Number(value)
  }));

  const summaryData = [
    { name: 'Total Assets', value: Number(balanceSheet.total_assets), color: '#00C49F' },
    { name: 'Total Liabilities', value: Number(balanceSheet.total_liabilities), color: '#FF8042' },
    { name: 'Net Worth', value: Number(balanceSheet.net_worth), color: balanceSheet.net_worth >= 0 ? '#0088FE' : '#FF0000' }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="admin-card">
        <h2 className="text-lg font-semibold text-foreground mb-6">Balance Sheet</h2>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="admin-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Assets</p>
                <p className="text-2xl font-bold text-foreground">${balanceSheet.total_assets.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
          <div className="admin-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Liabilities</p>
                <p className="text-2xl font-bold text-foreground">${balanceSheet.total_liabilities.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-red-500"></div>
              </div>
            </div>
          </div>
          <div className="admin-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Net Worth</p>
                <p className={`text-2xl font-bold ${balanceSheet.net_worth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${balanceSheet.net_worth.toLocaleString()}
                </p>
              </div>
              <div className={`h-12 w-12 rounded-full ${balanceSheet.net_worth >= 0 ? 'bg-blue-500/10' : 'bg-red-500/10'} flex items-center justify-center`}>
                <div className={`h-6 w-6 rounded-full ${balanceSheet.net_worth >= 0 ? 'bg-blue-500' : 'bg-red-500'}`}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Bar Chart */}
        <div className="admin-card mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Financial Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={summaryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Amount']} />
              <Bar dataKey="value" fill="#8884d8">
                {summaryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Asset and Liability Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Assets Breakdown */}
          <div className="admin-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Assets Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={assetChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {assetChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Value']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Liabilities Breakdown */}
          <div className="admin-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Liabilities Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={liabilityChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {liabilityChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Value']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Assets List */}
          <div className="admin-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Assets Detail</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {balanceSheet.assets.map((asset) => (
                <div key={asset.id} className="flex justify-between items-center p-3 bg-background rounded border">
                  <div>
                    <div className="font-medium text-foreground">{asset.name}</div>
                    <div className="text-sm text-muted-foreground">{asset.category.replace('_', ' ')}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-foreground">${asset.current_value.toLocaleString()}</div>
                    {asset.is_zakatable && <div className="text-xs text-green-600">Zakatable</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Liabilities List */}
          <div className="admin-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Liabilities Detail</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {balanceSheet.liabilities.map((liability) => (
                <div key={liability.id} className="flex justify-between items-center p-3 bg-background rounded border">
                  <div>
                    <div className="font-medium text-foreground">{liability.name}</div>
                    <div className="text-sm text-muted-foreground">{liability.category.replace('_', ' ')}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-foreground">${liability.current_balance.toLocaleString()}</div>
                    {liability.interest_rate && (
                      <div className="text-xs text-red-600">{liability.interest_rate}% APR</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 text-sm text-muted-foreground">
          Generated on: {new Date(balanceSheet.generated_at).toLocaleString()}
        </div>
      </div>
    </div>
  );
}