'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { assetAPI } from '@/lib/assets-api';
import { IncomeStatementResponse } from '@/types/assets';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

interface IncomeStatementProps {
  className?: string;
}

export default function IncomeStatement({ className }: IncomeStatementProps) {
  const [incomeStatement, setIncomeStatement] = useState<IncomeStatementResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState(30);

  useEffect(() => {
    fetchIncomeStatement();
  }, [period]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchIncomeStatement = async () => {
    try {
      setLoading(true);
      const data = await assetAPI.getIncomeStatement(period);
      setIncomeStatement(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch income statement');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading income statement...</p>
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
            onClick={fetchIncomeStatement}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!incomeStatement) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="admin-card p-8 text-center">
          <p className="text-muted-foreground">No data available</p>
        </div>
      </div>
    );
  }

  const revenueChartData = Object.entries(incomeStatement.revenue_breakdown).map(([name, value]) => ({
    name: name.replace('_', ' ').toUpperCase(),
    value: Number(value)
  }));

  const expenseChartData = Object.entries(incomeStatement.expense_breakdown).map(([name, value]) => ({
    name: name.replace('_', ' ').toUpperCase(),
    value: Number(value)
  }));

  const summaryData = [
    { name: 'Total Revenue', value: Number(incomeStatement.total_revenue), color: '#00C49F' },
    { name: 'Total Expenses', value: Number(incomeStatement.total_expenses), color: '#FF8042' },
    { name: 'Net Income', value: Number(incomeStatement.net_income), color: incomeStatement.net_income >= 0 ? '#0088FE' : '#FF0000' }
  ];

  const dailyData = (() => {
    const days = [];
    const transactions = [...incomeStatement.revenue, ...incomeStatement.expenses];
    const groupedByDate = new Map();

    transactions.forEach(transaction => {
      const date = new Date(transaction.transaction_date).toLocaleDateString();
      if (!groupedByDate.has(date)) {
        groupedByDate.set(date, { revenue: 0, expenses: 0 });
      }
      
      if (transaction.transaction_type === 'income') {
        groupedByDate.get(date).revenue += Number(transaction.amount);
      } else if (transaction.transaction_type === 'expense') {
        groupedByDate.get(date).expenses += Number(transaction.amount);
      }
    });

    return Array.from(groupedByDate.entries()).map(([date, data]) => ({
      date,
      revenue: data.revenue,
      expenses: data.expenses,
      netIncome: data.revenue - data.expenses
    })).slice(-7);
  })();

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="admin-card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-foreground">Income Statement</h2>
          <select
            value={period}
            onChange={(e) => setPeriod(Number(e.target.value))}
            className="admin-input w-auto"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
            <option value={365}>Last year</option>
          </select>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="admin-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-foreground">${incomeStatement.total_revenue.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
          <div className="admin-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold text-foreground">${incomeStatement.total_expenses.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-red-500"></div>
              </div>
            </div>
          </div>
          <div className="admin-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Net Income</p>
                <p className={`text-2xl font-bold ${incomeStatement.net_income >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${incomeStatement.net_income.toLocaleString()}
                </p>
              </div>
              <div className={`h-12 w-12 rounded-full ${incomeStatement.net_income >= 0 ? 'bg-blue-500/10' : 'bg-red-500/10'} flex items-center justify-center`}>
                <div className={`h-6 w-6 rounded-full ${incomeStatement.net_income >= 0 ? 'bg-blue-500' : 'bg-red-500'}`}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Bar Chart */}
        <div className="admin-card mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Financial Performance</h3>
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

        {/* Daily Trend */}
        <div className="admin-card mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Daily Trend (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, '']} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#00C49F" strokeWidth={2} name="Revenue" />
              <Line type="monotone" dataKey="expenses" stroke="#FF8042" strokeWidth={2} name="Expenses" />
              <Line type="monotone" dataKey="netIncome" stroke="#0088FE" strokeWidth={2} name="Net Income" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue and Expense Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Breakdown */}
          <div className="admin-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Revenue Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {revenueChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Amount']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Expense Breakdown */}
          <div className="admin-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Expense Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expenseChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Amount']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Transaction Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Revenue Transactions */}
          <div className="admin-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recent Revenue</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {incomeStatement.revenue.slice(0, 10).map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center p-3 bg-background rounded border">
                  <div>
                    <div className="font-medium text-foreground">{transaction.description || 'Income'}</div>
                    <div className="text-sm text-muted-foreground">
                      {transaction.category} • {new Date(transaction.transaction_date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">+${transaction.amount.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expense Transactions */}
          <div className="admin-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recent Expenses</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {incomeStatement.expenses.slice(0, 10).map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center p-3 bg-background rounded border">
                  <div>
                    <div className="font-medium text-foreground">{transaction.description || 'Expense'}</div>
                    <div className="text-sm text-muted-foreground">
                      {transaction.category} • {new Date(transaction.transaction_date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-red-600">-${transaction.amount.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 text-sm text-muted-foreground">
          Period: {new Date(incomeStatement.period_start).toLocaleDateString()} - {new Date(incomeStatement.period_end).toLocaleDateString()}
          <br />
          Generated on: {new Date(incomeStatement.generated_at).toLocaleString()}
        </div>
      </div>
    </div>
  );
}