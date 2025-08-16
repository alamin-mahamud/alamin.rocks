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
      <div className={`admin-card ${className}`}>
        <div className="text-center">Loading balance sheet...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`admin-card ${className}`}>
        <div className="text-red-600 dark:text-red-400">Error: {error}</div>
      </div>
    );
  }

  if (!balanceSheet) {
    return (
      <div className={`admin-card ${className}`}>
        <div className="text-center">No data available</div>
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
          <div className="admin-card bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <h3 className="text-sm font-medium text-green-800 dark:text-green-400 uppercase tracking-wide">Total Assets</h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">
              ${balanceSheet.total_assets.toLocaleString()}
            </p>
          </div>
          <div className="admin-card bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <h3 className="text-sm font-medium text-red-800 dark:text-red-400 uppercase tracking-wide">Total Liabilities</h3>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-2">
              ${balanceSheet.total_liabilities.toLocaleString()}
            </p>
          </div>
          <div className={`admin-card ${balanceSheet.net_worth >= 0 ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'}`}>
            <h3 className={`text-sm font-medium uppercase tracking-wide ${balanceSheet.net_worth >= 0 ? 'text-blue-800 dark:text-blue-400' : 'text-red-800 dark:text-red-400'}`}>
              Net Worth
            </h3>
            <p className={`text-2xl font-bold mt-2 ${balanceSheet.net_worth >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>
              ${balanceSheet.net_worth.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Summary Bar Chart */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Financial Overview</h3>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Assets Breakdown */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Assets Breakdown</h3>
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
          <div>
            <h3 className="text-xl font-semibold mb-4">Liabilities Breakdown</h3>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Assets List */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Assets Detail</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {balanceSheet.assets.map((asset) => (
                <div key={asset.id} className="flex justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium">{asset.name}</div>
                    <div className="text-sm text-gray-600">{asset.category.replace('_', ' ')}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${asset.current_value.toLocaleString()}</div>
                    {asset.is_zakatable && <div className="text-xs text-green-600">Zakatable</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Liabilities List */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Liabilities Detail</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {balanceSheet.liabilities.map((liability) => (
                <div key={liability.id} className="flex justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium">{liability.name}</div>
                    <div className="text-sm text-gray-600">{liability.category.replace('_', ' ')}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${liability.current_balance.toLocaleString()}</div>
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