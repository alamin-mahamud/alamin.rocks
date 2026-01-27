'use client'

import { useState, useEffect } from 'react'
import { AuthWrapper } from '@/components/AuthWrapper'
import { Layout } from '@/components/Layout'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import {
  RefreshCw,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
  Building2,
  Landmark,
  Briefcase,
  DollarSign
} from 'lucide-react'
import { holdingsApi } from '@/lib/api'
import {
  HoldingsSummary,
  StockHolding,
  RealEstateProperty,
  BusinessInterest
} from '@/types/holdings'

type TabType = 'overview' | 'stocks' | 'real-estate' | 'business' | 'balance-sheet'

const formatBDT = (amount: number) => {
  if (amount >= 10000000) {
    return `৳${(amount / 10000000).toFixed(2)} Cr`
  } else if (amount >= 100000) {
    return `৳${(amount / 100000).toFixed(2)} L`
  }
  return `৳${amount.toLocaleString()}`
}

export default function HoldingsPage() {
  const [summary, setSummary] = useState<HoldingsSummary | null>(null)
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<number | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await holdingsApi.getSummary()
      setSummary(response.data)
    } catch (err) {
      console.error('Error fetching holdings:', err)
      setError('Failed to load holdings data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteStock = async (id: number) => {
    if (!confirm('Are you sure you want to delete this stock?')) return
    try {
      setDeleting(id)
      await holdingsApi.deleteStock(id)
      fetchData()
    } catch (err) {
      console.error('Error deleting stock:', err)
      alert('Failed to delete stock')
    } finally {
      setDeleting(null)
    }
  }

  const handleDeleteProperty = async (id: number) => {
    if (!confirm('Are you sure you want to delete this property?')) return
    try {
      setDeleting(id)
      await holdingsApi.deleteProperty(id)
      fetchData()
    } catch (err) {
      console.error('Error deleting property:', err)
      alert('Failed to delete property')
    } finally {
      setDeleting(null)
    }
  }

  const handleDeleteBusiness = async (id: number) => {
    if (!confirm('Are you sure you want to delete this business?')) return
    try {
      setDeleting(id)
      await holdingsApi.deleteBusiness(id)
      fetchData()
    } catch (err) {
      console.error('Error deleting business:', err)
      alert('Failed to delete business')
    } finally {
      setDeleting(null)
    }
  }

  if (loading) {
    return (
      <AuthWrapper>
        <Layout>
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="h-6 w-6 animate-spin mr-2" />
            <span className="text-muted-foreground">Loading holdings data...</span>
          </div>
        </Layout>
      </AuthWrapper>
    )
  }

  if (error) {
    return (
      <AuthWrapper>
        <Layout>
          <div className="flex items-center justify-center p-8 text-center">
            <div>
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="font-medium text-foreground mb-2">Error Loading Holdings</h3>
              <p className="text-sm text-muted-foreground mb-4">{error}</p>
              <Button onClick={fetchData} variant="secondary">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          </div>
        </Layout>
      </AuthWrapper>
    )
  }

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: DollarSign },
    { id: 'stocks' as TabType, label: 'Stocks', icon: TrendingUp },
    { id: 'real-estate' as TabType, label: 'Real Estate', icon: Building2 },
    { id: 'business' as TabType, label: 'Business', icon: Briefcase },
    { id: 'balance-sheet' as TabType, label: 'Balance Sheet', icon: Landmark },
  ]

  return (
    <AuthWrapper>
      <Layout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Holdings Management</h1>
              <p className="text-muted-foreground">Manage your assets, stocks, and investments</p>
            </div>
            <Button variant="secondary" onClick={fetchData} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-foreground text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && summary && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="text-sm text-muted-foreground">Net Worth</div>
                <div className="text-2xl font-bold text-foreground">
                  {formatBDT(summary.balance_sheet.net_worth)}
                </div>
                <div className="text-xs text-muted-foreground">
                  ${summary.balance_sheet.net_worth_usd.toLocaleString()} USD
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-sm text-muted-foreground">Total Stock Value</div>
                <div className="text-2xl font-bold text-foreground">
                  {formatBDT(summary.total_stock_value)}
                </div>
                <div className={`text-xs flex items-center ${summary.total_stock_gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {summary.total_stock_gain >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {summary.total_stock_gain_percent.toFixed(2)}%
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-sm text-muted-foreground">Real Estate Value</div>
                <div className="text-2xl font-bold text-foreground">
                  {formatBDT(summary.total_real_estate_value)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatBDT(summary.total_annual_rent)}/year rent
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-sm text-muted-foreground">Business Value</div>
                <div className="text-2xl font-bold text-foreground">
                  {formatBDT(summary.total_business_value)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatBDT(summary.total_business_income)}/year income
                </div>
              </Card>
            </div>
          )}

          {/* Stocks Tab */}
          {activeTab === 'stocks' && summary && (
            <Card>
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h2 className="font-semibold">Stock Holdings</h2>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Stock
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticker</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Shares</TableHead>
                    <TableHead className="text-right">Avg Cost</TableHead>
                    <TableHead className="text-right">Current</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                    <TableHead className="text-right">Gain</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {summary.stocks.map((stock) => (
                    <TableRow key={stock.id}>
                      <TableCell className="font-medium">{stock.ticker}</TableCell>
                      <TableCell>{stock.name}</TableCell>
                      <TableCell className="text-right">{stock.shares.toLocaleString()}</TableCell>
                      <TableCell className="text-right">৳{stock.avg_cost}</TableCell>
                      <TableCell className="text-right">৳{stock.current_price}</TableCell>
                      <TableCell className="text-right">{formatBDT(stock.value)}</TableCell>
                      <TableCell className={`text-right ${stock.gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {stock.gain >= 0 ? '+' : ''}{stock.gain_percent.toFixed(2)}%
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteStock(stock.id)}
                            disabled={deleting === stock.id}
                          >
                            {deleting === stock.id ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}

          {/* Real Estate Tab */}
          {activeTab === 'real-estate' && summary && (
            <Card>
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h2 className="font-semibold">Real Estate Properties</h2>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Property
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                    <TableHead className="text-right">Monthly Rent</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {summary.real_estate.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell className="font-medium">{property.name}</TableCell>
                      <TableCell>{property.location}</TableCell>
                      <TableCell className="capitalize">{property.property_type}</TableCell>
                      <TableCell className="text-right">{formatBDT(property.estimated_value)}</TableCell>
                      <TableCell className="text-right">{formatBDT(property.monthly_rent)}</TableCell>
                      <TableCell>
                        {property.is_primary_residence ? (
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">Primary</span>
                        ) : property.is_rented ? (
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">Rented</span>
                        ) : (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">Vacant</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteProperty(property.id)}
                            disabled={deleting === property.id}
                          >
                            {deleting === property.id ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}

          {/* Business Tab */}
          {activeTab === 'business' && summary && (
            <Card>
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h2 className="font-semibold">Business Interests</h2>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Business
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Equity %</TableHead>
                    <TableHead className="text-right">Invested</TableHead>
                    <TableHead className="text-right">Current Value</TableHead>
                    <TableHead className="text-right">Annual Income</TableHead>
                    <TableHead className="text-right">ROI</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {summary.business_interests.map((business) => (
                    <TableRow key={business.id}>
                      <TableCell className="font-medium">{business.name}</TableCell>
                      <TableCell className="text-right">{business.equity_percent}%</TableCell>
                      <TableCell className="text-right">{formatBDT(business.invested_value)}</TableCell>
                      <TableCell className="text-right">{formatBDT(business.current_value)}</TableCell>
                      <TableCell className="text-right">{formatBDT(business.annual_income)}</TableCell>
                      <TableCell className="text-right">{business.roi_percent}%</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteBusiness(business.id)}
                            disabled={deleting === business.id}
                          >
                            {deleting === business.id ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}

          {/* Balance Sheet Tab */}
          {activeTab === 'balance-sheet' && summary && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h2 className="font-semibold mb-4">Balance Sheet Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Total Assets</span>
                    <span className="font-medium">{formatBDT(summary.balance_sheet.total_assets)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Total Liabilities</span>
                    <span className="font-medium text-red-600">{formatBDT(summary.balance_sheet.total_liabilities)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-foreground font-medium">Net Worth</span>
                    <span className="font-bold text-green-600">{formatBDT(summary.balance_sheet.net_worth)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Net Worth (USD)</span>
                    <span className="font-medium">${summary.balance_sheet.net_worth_usd.toLocaleString()}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="font-semibold mb-4">Zakat Calculation</h2>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Available Balance</span>
                    <span className="font-medium">{formatBDT(summary.zakat.available_balance)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Nisab Threshold</span>
                    <span className="font-medium">{formatBDT(summary.zakat.nisab_threshold)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-foreground font-medium">Zakat Due (2.5%)</span>
                    <span className="font-bold text-amber-600">{formatBDT(summary.zakat.zakat_due)}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 lg:col-span-2">
                <h2 className="font-semibold mb-4">Income Sources</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Source</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {summary.income_sources.map((source) => (
                      <TableRow key={source.id}>
                        <TableCell className="font-medium">{source.name}</TableCell>
                        <TableCell className="capitalize">{source.frequency}</TableCell>
                        <TableCell className="text-right">{formatBDT(source.amount)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}
        </div>
      </Layout>
    </AuthWrapper>
  )
}
