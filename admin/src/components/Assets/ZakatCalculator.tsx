'use client';

import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { assetAPI } from '@/lib/assets-api';
import { ZakatCalculationRequest, ZakatCalculationResponse } from '@/types/assets';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

interface ZakatCalculatorProps {
  className?: string;
}

export default function ZakatCalculator({ className }: ZakatCalculatorProps) {
  const [formData, setFormData] = useState<ZakatCalculationRequest>({
    gold_weight_grams: 0,
    silver_weight_grams: 0,
    cash_amount: 0,
    bank_balance: 0,
    investment_value: 0,
    trade_goods_value: 0,
    receivables: 0,
    liabilities: 0,
    gold_price_per_gram: 60,
    silver_price_per_gram: 0.75,
    use_current_prices: true
  });

  const [result, setResult] = useState<ZakatCalculationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof ZakatCalculationRequest, value: number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateZakat = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await assetAPI.calculateZakat(formData);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to calculate zakat');
    } finally {
      setLoading(false);
    }
  };

  const breakdownData = result ? Object.entries(result.breakdown).map(([name, value]) => ({
    name: name.replace('_', ' ').toUpperCase(),
    value: Math.abs(Number(value))
  })).filter(item => item.value > 0) : [];

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="admin-card">
        <h2 className="text-lg font-semibold text-foreground mb-6">Zakat Calculator</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Assets & Wealth</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Gold (grams)</label>
                <input
                  type="number"
                  value={formData.gold_weight_grams || ''}
                  onChange={(e) => handleInputChange('gold_weight_grams', Number(e.target.value))}
                  placeholder="0"
                  className="admin-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Gold Price ($/gram)</label>
                <input
                  type="number"
                  className="admin-input"
                  value={formData.gold_price_per_gram || ''}
                  onChange={(e) => handleInputChange('gold_price_per_gram', Number(e.target.value))}
                  placeholder="60"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Silver (grams)</label>
                <input
                  type="number"
                  value={formData.silver_weight_grams || ''}
                  onChange={(e) => handleInputChange('silver_weight_grams', Number(e.target.value))}
                  placeholder="0"
                  className="admin-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Silver Price ($/gram)</label>
                <input
                  type="number"
                  className="admin-input"
                  value={formData.silver_price_per_gram || ''}
                  onChange={(e) => handleInputChange('silver_price_per_gram', Number(e.target.value))}
                  placeholder="0.75"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Cash Amount ($)</label>
              <input
                type="number"
                value={formData.cash_amount || ''}
                onChange={(e) => handleInputChange('cash_amount', Number(e.target.value))}
                placeholder="0" className="admin-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Bank Balance ($)</label>
              <input
                type="number"
                value={formData.bank_balance || ''}
                onChange={(e) => handleInputChange('bank_balance', Number(e.target.value))}
                placeholder="0" className="admin-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Investment Value ($)</label>
              <input
                type="number"
                value={formData.investment_value || ''}
                onChange={(e) => handleInputChange('investment_value', Number(e.target.value))}
                placeholder="0" className="admin-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Trade Goods Value ($)</label>
              <input
                type="number"
                value={formData.trade_goods_value || ''}
                onChange={(e) => handleInputChange('trade_goods_value', Number(e.target.value))}
                placeholder="0" className="admin-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Receivables ($)</label>
              <input
                type="number"
                value={formData.receivables || ''}
                onChange={(e) => handleInputChange('receivables', Number(e.target.value))}
                placeholder="0" className="admin-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Liabilities ($)</label>
              <input
                type="number"
                value={formData.liabilities || ''}
                onChange={(e) => handleInputChange('liabilities', Number(e.target.value))}
                placeholder="0" className="admin-input"
              />
            </div>

            <button 
              onClick={calculateZakat} 
              disabled={loading}
              className="admin-button-primary w-full"
            >
              {loading ? 'Calculating...' : 'Calculate Zakat'}
            </button>

            {error && (
              <div className="admin-card border-l-4 border-l-red-500">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
          </div>

          {/* Results */}
          <div>
            {result && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Zakat Calculation Results</h3>
                
                {/* Summary Cards */}
                <div className="space-y-4">
                  <div className="admin-card">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Zakatable Wealth</p>
                        <p className="text-2xl font-bold text-foreground">${result.total_zakatable_wealth.toLocaleString()}</p>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <div className="h-6 w-6 rounded-full bg-blue-500"></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="admin-card">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Nisab (Gold)</p>
                          <p className="text-lg font-bold text-foreground">${result.nisab_threshold_gold.toLocaleString()}</p>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
                          <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
                        </div>
                      </div>
                    </div>
                    <div className="admin-card">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Nisab (Silver)</p>
                          <p className="text-lg font-bold text-foreground">${result.nisab_threshold_silver.toLocaleString()}</p>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-gray-500/10 flex items-center justify-center">
                          <div className="h-4 w-4 rounded-full bg-gray-500"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="admin-card">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Zakat Status</p>
                        <p className={`text-lg font-bold ${result.is_above_nisab ? 'text-green-600' : 'text-red-600'}`}>
                          {result.is_above_nisab ? 'Zakat is due' : 'Below nisab threshold'}
                        </p>
                      </div>
                      <div className={`h-8 w-8 rounded-full ${result.is_above_nisab ? 'bg-green-500/10' : 'bg-red-500/10'} flex items-center justify-center`}>
                        <div className={`h-4 w-4 rounded-full ${result.is_above_nisab ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      </div>
                    </div>
                  </div>

                  {result.is_above_nisab && (
                    <div className="admin-card">
                      <div className="text-center">
                        <p className="text-sm font-medium text-muted-foreground mb-2">Zakat Due</p>
                        <p className="text-3xl font-bold text-purple-600 mb-1">
                          ${result.zakat_due.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ({(result.zakat_rate * 100).toFixed(1)}% of zakatable wealth)
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Breakdown Chart */}
                {breakdownData.length > 0 && (
                  <div className="admin-card">
                    <h4 className="text-lg font-semibold text-foreground mb-4">Wealth Breakdown</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={breakdownData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {breakdownData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Value']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* Detailed Breakdown */}
                <div className="admin-card">
                  <h4 className="text-lg font-semibold text-foreground mb-4">Detailed Breakdown</h4>
                  <div className="space-y-3">
                    {Object.entries(result.breakdown).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center p-3 bg-background rounded border">
                        <span className="capitalize text-foreground">{key.replace('_', ' ')}</span>
                        <span className={`font-semibold ${Number(value) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {Number(value) >= 0 ? '+' : ''}${Number(value).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Islamic Information */}
                <div className="admin-card border-l-4 border-l-green-500">
                  <h4 className="text-lg font-semibold text-foreground mb-3">Islamic Guidelines</h4>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>• Zakat is calculated at 2.5% (1/40) of eligible wealth</p>
                    <p>• Nisab is the minimum threshold for zakat obligation</p>
                    <p>• Gold nisab: 85 grams (~3 oz) of gold</p>
                    <p>• Silver nisab: 595 grams (~21 oz) of silver</p>
                    <p>• Wealth must be held for one lunar year (Hawl)</p>
                    <p>• Debts and immediate expenses can be deducted</p>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  Calculated on: {new Date(result.calculated_at).toLocaleString()}
                  {result.lunar_year && <br />}
                  {result.lunar_year && `Lunar Year: ${result.lunar_year} AH`}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}