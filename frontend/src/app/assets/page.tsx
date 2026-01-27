'use client'

import { useState, useEffect } from 'react'
import {
  PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts'
import {
  TrendingUp, TrendingDown, Wallet, Building2, Landmark,
  LineChart, PieChart as PieChartIcon, MapPin, Sun, Moon, Menu, X, Briefcase,
  DollarSign, PiggyBank, Home, Car, ChevronRight, Loader2
} from 'lucide-react'
import Link from 'next/link'

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.alamin.rocks'

// Theme Toggle
const ThemeToggle = () => {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggle = () => {
    const newDark = !dark
    setDark(newDark)
    document.documentElement.classList.toggle('dark', newDark)
    localStorage.setItem('theme', newDark ? 'dark' : 'light')
  }

  if (!mounted) return null
  return (
    <button onClick={toggle} className="p-2 hover:opacity-70" aria-label="Toggle theme">
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}

// Format currency
const formatBDT = (value: number) => {
  if (value >= 10000000) return `৳${(value / 10000000).toFixed(2)}Cr`
  if (value >= 100000) return `৳${(value / 100000).toFixed(2)}L`
  if (value >= 1000) return `৳${(value / 1000).toFixed(1)}K`
  return `৳${value.toLocaleString()}`
}

const formatPercent = (value: number) => `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`

// Navigation items
const navItems = [
  { id: 'overview', label: 'Overview', icon: Wallet },
  { id: 'allocation', label: 'Asset Allocation', icon: PieChartIcon },
  { id: 'stocks', label: 'Capital Markets', icon: LineChart },
  { id: 'realestate', label: 'Real Estate', icon: Building2 },
  { id: 'business', label: 'Business Interests', icon: Briefcase },
  { id: 'income', label: 'Income Sources', icon: DollarSign },
  { id: 'zakat', label: 'Zakat', icon: PiggyBank },
]

// Static fallback data from Holdings PDF
const staticBalanceSheet = {
  totalAssets: 30640000,
  totalLiabilities: 3500000,
  netWorth: 27140000,
  netWorthUSD: 7770,
}

const staticAssetAllocation = [
  { name: 'Real Estate', value: 23900000, color: '#e11d48', percent: 78 },
  { name: 'Primary Residence', value: 2710000, color: '#1e293b', percent: 9 },
  { name: 'Business Interests', value: 660000, color: '#16a34a', percent: 2 },
  { name: 'Vehicles', value: 350000, color: '#2563eb', percent: 1 },
  { name: 'Capital Markets', value: 90000, color: '#f97316', percent: 0.3 },
]

const staticStocks = [
  { ticker: 'LHBL', name: 'LafargeHolcim Bangladesh', shares: 100000, avgCost: 60, currentPrice: 68, sector: 'Cement' },
  { ticker: 'SQURPHARMA', name: 'Square Pharmaceuticals', shares: 30000, avgCost: 209, currentPrice: 217, sector: 'Pharma' },
  { ticker: 'MARICO', name: 'Marico Bangladesh', shares: 2500, avgCost: 2310, currentPrice: 2500, sector: 'Consumer' },
  { ticker: 'GP', name: 'Grameenphone Ltd', shares: 15000, avgCost: 260, currentPrice: 235, sector: 'Telecom' },
  { ticker: 'BSCCL', name: 'Bangladesh Submarine Cable', shares: 5000, avgCost: 120, currentPrice: 165, sector: 'Telecom' },
  { ticker: 'UPGDCL', name: 'United Power Gen', shares: 5000, avgCost: 145, currentPrice: 150, sector: 'Power' },
]

const staticRealEstateProperties = [
  { name: 'Tanbir 5th Floor', location: 'Dhaka', monthlyRent: 30000, annualRent: 360000 },
  { name: 'Tanbir 4th Floor', location: 'Dhaka', monthlyRent: 20000, annualRent: 240000 },
  { name: 'Bagbari Land', location: 'Rural', monthlyRent: 8333, annualRent: 100000 },
  { name: 'Shimultoli Shop', location: 'Dhaka', monthlyRent: 7500, annualRent: 90000 },
  { name: 'Primary Residence', location: 'Dhaka', monthlyRent: 0, annualRent: 0 },
]

const staticBusinessInterests = [
  { name: 'City Care General Hospital', equity: '7%', value: 508629, roi: 10, annualIncome: 50863 },
  { name: 'Alisha Noor', equity: '100%', value: 68786, roi: 0, annualIncome: 0 },
  { name: 'Youtube', equity: '100%', value: 46000, roi: 0, annualIncome: 0 },
  { name: 'Agrani Printers', equity: '10%', value: 25000, roi: 0, annualIncome: 0 },
  { name: 'AIUB SR', equity: '50%', value: 14000, roi: 0, annualIncome: 0 },
]

const staticIncomeSources = [
  { name: 'Real Estate Rentals', amount: 170000, frequency: 'Monthly' },
  { name: 'Businesses', amount: 50000, frequency: 'Monthly' },
  { name: 'Dividends', amount: 30000, frequency: 'Quarterly' },
  { name: 'Contracts', amount: 20000, frequency: 'Monthly' },
]

const staticZakatData = {
  availableBalance: 69410,
  nisabThreshold: 52500,
  zakatDue: 1735,
}

// Types for API response
interface Stock {
  ticker: string
  name: string
  shares: number
  avgCost: number
  avg_cost?: number
  currentPrice: number
  current_price?: number
  sector: string
}

interface RealEstateProperty {
  name: string
  location: string
  monthlyRent: number
  monthly_rent?: number
  annualRent: number
  annual_rent?: number
}

interface BusinessInterest {
  name: string
  equity: string
  equity_percent?: number
  value: number
  current_value?: number
  roi: number
  roi_percent?: number
  annualIncome: number
  annual_income?: number
}

interface IncomeSource {
  name: string
  amount: number
  frequency: string
}

interface BalanceSheet {
  totalAssets: number
  total_assets?: number
  totalLiabilities: number
  total_liabilities?: number
  netWorth: number
  net_worth?: number
  netWorthUSD: number
  net_worth_usd?: number
}

interface ZakatData {
  availableBalance: number
  available_balance?: number
  nisabThreshold: number
  nisab_threshold?: number
  zakatDue: number
  zakat_due?: number
}

export default function AssetsPage() {
  const [activeSection, setActiveSection] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [dataSource, setDataSource] = useState<'api' | 'static'>('static')

  // State for data
  const [balanceSheet, setBalanceSheet] = useState<BalanceSheet>(staticBalanceSheet)
  const [stocks, setStocks] = useState<Stock[]>(staticStocks)
  const [realEstateProperties, setRealEstateProperties] = useState<RealEstateProperty[]>(staticRealEstateProperties)
  const [businessInterests, setBusinessInterests] = useState<BusinessInterest[]>(staticBusinessInterests)
  const [incomeSources, setIncomeSources] = useState<IncomeSource[]>(staticIncomeSources)
  const [zakatData, setZakatData] = useState<ZakatData>(staticZakatData)

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/holdings/summary`)
        if (!response.ok) throw new Error('API request failed')

        const data = await response.json()

        // Transform API data to match component format
        if (data.balance_sheet) {
          setBalanceSheet({
            totalAssets: data.balance_sheet.total_assets,
            totalLiabilities: data.balance_sheet.total_liabilities,
            netWorth: data.balance_sheet.net_worth,
            netWorthUSD: data.balance_sheet.net_worth_usd,
          })
        }

        if (data.stocks) {
          setStocks(data.stocks.map((s: any) => ({
            ticker: s.ticker,
            name: s.name,
            shares: s.shares,
            avgCost: s.avg_cost,
            currentPrice: s.current_price,
            sector: s.sector,
          })))
        }

        if (data.real_estate) {
          setRealEstateProperties(data.real_estate.map((p: any) => ({
            name: p.name,
            location: p.location,
            monthlyRent: p.monthly_rent,
            annualRent: p.monthly_rent * 12,
          })))
        }

        if (data.business_interests) {
          setBusinessInterests(data.business_interests.map((b: any) => ({
            name: b.name,
            equity: `${b.equity_percent}%`,
            value: b.current_value,
            roi: b.roi_percent,
            annualIncome: b.annual_income,
          })))
        }

        if (data.income_sources) {
          setIncomeSources(data.income_sources.map((i: any) => ({
            name: i.name,
            amount: i.amount,
            frequency: i.frequency.charAt(0).toUpperCase() + i.frequency.slice(1),
          })))
        }

        if (data.zakat) {
          setZakatData({
            availableBalance: data.zakat.available_balance,
            nisabThreshold: data.zakat.nisab_threshold,
            zakatDue: data.zakat.zakat_due,
          })
        }

        setDataSource('api')
      } catch (error) {
        console.log('Using static fallback data:', error)
        setDataSource('static')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    setSidebarOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Calculate stock metrics
  const totalStockValue = stocks.reduce((acc, s) => acc + (s.shares * s.currentPrice), 0)
  const totalStockCost = stocks.reduce((acc, s) => acc + (s.shares * s.avgCost), 0)
  const totalStockGain = totalStockValue - totalStockCost
  const totalStockGainPercent = (totalStockGain / totalStockCost) * 100

  // Calculate real estate metrics
  const totalAnnualRent = realEstateProperties.reduce((acc, p) => acc + p.annualRent, 0)

  // Calculate business metrics
  const totalBusinessValue = businessInterests.reduce((acc, b) => acc + b.value, 0)

  // Asset allocation (computed from current data)
  const assetAllocation = [
    { name: 'Real Estate', value: 23900000, color: '#e11d48', percent: 78 },
    { name: 'Primary Residence', value: 2710000, color: '#1e293b', percent: 9 },
    { name: 'Business Interests', value: totalBusinessValue, color: '#16a34a', percent: 2 },
    { name: 'Vehicles', value: 350000, color: '#2563eb', percent: 1 },
    { name: 'Capital Markets', value: totalStockValue, color: '#f97316', percent: 0.3 },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b bg-[hsl(var(--background))]" style={{ borderColor: 'hsl(var(--border))' }}>
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-[hsl(var(--muted))]"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link href="/" className="text-lg font-bold tracking-tight">AM.</Link>
            <span className="text-sm hidden sm:inline" style={{ color: 'hsl(var(--muted-foreground))' }}>/ Holdings</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/moe" className="text-sm px-3 py-1 hover:bg-[hsl(var(--muted))]">MoE</Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="flex pt-14">
        {/* Sidebar Navigation */}
        <aside className={`
          fixed lg:sticky top-14 left-0 z-40 h-[calc(100vh-3.5rem)] w-64
          border-r bg-[hsl(var(--background))] overflow-y-auto
          transition-transform lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `} style={{ borderColor: 'hsl(var(--border))' }}>
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded transition-colors ${
                    isActive
                      ? 'bg-[hsl(var(--foreground))] text-[hsl(var(--background))]'
                      : 'hover:bg-[hsl(var(--muted))]'
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              )
            })}
          </nav>

          {/* Quick Stats in Sidebar */}
          <div className="p-4 border-t" style={{ borderColor: 'hsl(var(--border))' }}>
            <p className="text-xs uppercase tracking-wider mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>Net Worth</p>
            <p className="text-2xl font-bold">{formatBDT(balanceSheet.netWorth)}</p>
            <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>${balanceSheet.netWorthUSD.toLocaleString()} USD</p>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-3.5rem)] lg:ml-0">
          <div className="w-full p-4 sm:p-6 lg:p-8 space-y-12">

            {/* Overview Section */}
            <section id="overview" className="scroll-mt-20">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Wallet size={20} />
                Balance Sheet Overview
              </h2>

              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 border" style={{ borderColor: 'hsl(var(--border))' }}>
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>Total Assets</p>
                  <p className="text-2xl font-bold">{formatBDT(balanceSheet.totalAssets)}</p>
                </div>
                <div className="p-4 border" style={{ borderColor: 'hsl(var(--border))' }}>
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>Liabilities</p>
                  <p className="text-2xl font-bold text-red-600">{formatBDT(balanceSheet.totalLiabilities)}</p>
                </div>
                <div className="p-4 border" style={{ borderColor: 'hsl(var(--highlight))' }}>
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>Net Worth</p>
                  <p className="text-2xl font-bold" style={{ color: 'hsl(var(--highlight))' }}>{formatBDT(balanceSheet.netWorth)}</p>
                  <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>${balanceSheet.netWorthUSD.toLocaleString()} USD</p>
                </div>
              </div>

              {/* Quick Summary Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-[hsl(var(--muted))]">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 size={16} />
                    <span className="text-xs uppercase">Real Estate</span>
                  </div>
                  <p className="text-lg font-bold">{formatBDT(23900000)}</p>
                  <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{formatBDT(totalAnnualRent)}/yr rental</p>
                </div>
                <div className="p-4 bg-[hsl(var(--muted))]">
                  <div className="flex items-center gap-2 mb-2">
                    <LineChart size={16} />
                    <span className="text-xs uppercase">Stocks</span>
                  </div>
                  <p className="text-lg font-bold">{formatBDT(totalStockValue)}</p>
                  <p className={`text-xs ${totalStockGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercent(totalStockGainPercent)} gain
                  </p>
                </div>
                <div className="p-4 bg-[hsl(var(--muted))]">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase size={16} />
                    <span className="text-xs uppercase">Business</span>
                  </div>
                  <p className="text-lg font-bold">{formatBDT(totalBusinessValue)}</p>
                  <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>5 investments</p>
                </div>
                <div className="p-4 bg-[hsl(var(--muted))]">
                  <div className="flex items-center gap-2 mb-2">
                    <Home size={16} />
                    <span className="text-xs uppercase">Residence</span>
                  </div>
                  <p className="text-lg font-bold">{formatBDT(2710000)}</p>
                  <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>Primary home</p>
                </div>
              </div>
            </section>

            {/* Asset Allocation Section */}
            <section id="allocation" className="scroll-mt-20">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <PieChartIcon size={20} />
                Asset Allocation
              </h2>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={assetAllocation}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                        stroke="none"
                      >
                        {assetAllocation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => formatBDT(value as number)}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '0'
                        }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-3">
                  {assetAllocation.map((item) => (
                    <div key={item.name} className="flex items-center justify-between p-3 border" style={{ borderColor: 'hsl(var(--border))' }}>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3" style={{ backgroundColor: item.color }} />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatBDT(item.value)}</p>
                        <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{item.percent}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Capital Markets Section */}
            <section id="stocks" className="scroll-mt-20">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <LineChart size={20} />
                Capital Markets
              </h2>

              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 border" style={{ borderColor: 'hsl(var(--border))' }}>
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>Market Value</p>
                  <p className="text-xl font-bold">{formatBDT(totalStockValue)}</p>
                </div>
                <div className="p-4 border" style={{ borderColor: 'hsl(var(--border))' }}>
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>Cost Basis</p>
                  <p className="text-xl font-bold">{formatBDT(totalStockCost)}</p>
                </div>
                <div className="p-4 border" style={{ borderColor: totalStockGain >= 0 ? 'hsl(142, 76%, 36%)' : 'hsl(0, 84%, 60%)' }}>
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>Total Gain</p>
                  <p className={`text-xl font-bold ${totalStockGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatBDT(Math.abs(totalStockGain))}
                  </p>
                  <p className={`text-xs ${totalStockGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercent(totalStockGainPercent)}
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b" style={{ borderColor: 'hsl(var(--border))' }}>
                      <th className="text-left py-3 px-2 font-medium">Ticker</th>
                      <th className="text-left py-3 px-2 font-medium hidden sm:table-cell">Sector</th>
                      <th className="text-right py-3 px-2 font-medium">Shares</th>
                      <th className="text-right py-3 px-2 font-medium">Avg Cost</th>
                      <th className="text-right py-3 px-2 font-medium">Current</th>
                      <th className="text-right py-3 px-2 font-medium">Value</th>
                      <th className="text-right py-3 px-2 font-medium">Gain</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stocks.map((stock) => {
                      const value = stock.shares * stock.currentPrice
                      const cost = stock.shares * stock.avgCost
                      const gain = value - cost
                      const gainPercent = (gain / cost) * 100
                      return (
                        <tr key={stock.ticker} className="border-b" style={{ borderColor: 'hsl(var(--border))' }}>
                          <td className="py-3 px-2">
                            <p className="font-medium">{stock.ticker}</p>
                            <p className="text-xs sm:hidden" style={{ color: 'hsl(var(--muted-foreground))' }}>{stock.sector}</p>
                          </td>
                          <td className="py-3 px-2 hidden sm:table-cell" style={{ color: 'hsl(var(--muted-foreground))' }}>{stock.sector}</td>
                          <td className="py-3 px-2 text-right">{stock.shares.toLocaleString()}</td>
                          <td className="py-3 px-2 text-right">৳{stock.avgCost}</td>
                          <td className="py-3 px-2 text-right">৳{stock.currentPrice}</td>
                          <td className="py-3 px-2 text-right font-medium">{formatBDT(value)}</td>
                          <td className={`py-3 px-2 text-right ${gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatPercent(gainPercent)}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Real Estate Section */}
            <section id="realestate" className="scroll-mt-20">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Building2 size={20} />
                Real Estate Portfolio
              </h2>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 border" style={{ borderColor: 'hsl(var(--border))' }}>
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>Total Value</p>
                  <p className="text-xl font-bold">{formatBDT(23900000)}</p>
                </div>
                <div className="p-4 border" style={{ borderColor: 'hsl(var(--highlight))' }}>
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>Annual Rental</p>
                  <p className="text-xl font-bold" style={{ color: 'hsl(var(--highlight))' }}>{formatBDT(totalAnnualRent)}</p>
                  <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{formatBDT(totalAnnualRent / 12)}/month</p>
                </div>
              </div>

              <div className="space-y-3">
                {realEstateProperties.map((property) => (
                  <div key={property.name} className="p-4 border flex items-center justify-between" style={{ borderColor: 'hsl(var(--border))' }}>
                    <div className="flex items-center gap-3">
                      <MapPin size={16} style={{ color: 'hsl(var(--muted-foreground))' }} />
                      <div>
                        <p className="font-medium">{property.name}</p>
                        <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{property.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {property.monthlyRent > 0 ? (
                        <>
                          <p className="font-medium">{formatBDT(property.monthlyRent)}/mo</p>
                          <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{formatBDT(property.annualRent)}/yr</p>
                        </>
                      ) : (
                        <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Self-occupied</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Business Interests Section */}
            <section id="business" className="scroll-mt-20">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Briefcase size={20} />
                Business Interests
              </h2>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 border" style={{ borderColor: 'hsl(var(--border))' }}>
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>Total Investment</p>
                  <p className="text-xl font-bold">{formatBDT(totalBusinessValue)}</p>
                </div>
                <div className="p-4 border" style={{ borderColor: 'hsl(var(--border))' }}>
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>Annual Income</p>
                  <p className="text-xl font-bold">{formatBDT(businessInterests.reduce((acc, b) => acc + b.annualIncome, 0))}</p>
                </div>
              </div>

              <div className="space-y-3">
                {businessInterests.map((business) => (
                  <div key={business.name} className="p-4 border" style={{ borderColor: 'hsl(var(--border))' }}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">{business.name}</p>
                        <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>Equity: {business.equity}</p>
                      </div>
                      <p className="font-medium">{formatBDT(business.value)}</p>
                    </div>
                    {business.roi > 0 && (
                      <div className="flex items-center justify-between text-xs pt-2 border-t" style={{ borderColor: 'hsl(var(--border))' }}>
                        <span style={{ color: 'hsl(var(--muted-foreground))' }}>ROI: {business.roi}%</span>
                        <span className="text-green-600">Income: {formatBDT(business.annualIncome)}/yr</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Income Sources Section */}
            <section id="income" className="scroll-mt-20">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <DollarSign size={20} />
                Income Sources
              </h2>

              <div className="mb-6">
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={incomeSources} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" tickFormatter={(v) => formatBDT(v)} />
                      <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12 }} />
                      <Tooltip
                        formatter={(value) => formatBDT(value as number)}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '0'
                        }}
                      />
                      <Bar dataKey="amount" fill="hsl(var(--highlight))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-3">
                {incomeSources.map((source) => (
                  <div key={source.name} className="p-4 border flex items-center justify-between" style={{ borderColor: 'hsl(var(--border))' }}>
                    <div>
                      <p className="font-medium">{source.name}</p>
                      <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{source.frequency}</p>
                    </div>
                    <p className="font-bold">{formatBDT(source.amount)}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Zakat Section */}
            <section id="zakat" className="scroll-mt-20">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <PiggyBank size={20} />
                Zakat Calculation
              </h2>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 border" style={{ borderColor: 'hsl(var(--border))' }}>
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>Available Balance</p>
                  <p className="text-xl font-bold">{formatBDT(zakatData.availableBalance)}</p>
                </div>
                <div className="p-4 border" style={{ borderColor: 'hsl(var(--border))' }}>
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>Nisab Threshold</p>
                  <p className="text-xl font-bold">{formatBDT(zakatData.nisabThreshold)}</p>
                </div>
                <div className="p-4 border" style={{ borderColor: 'hsl(var(--highlight))' }}>
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>Zakat Due (2.5%)</p>
                  <p className="text-xl font-bold" style={{ color: 'hsl(var(--highlight))' }}>{formatBDT(zakatData.zakatDue)}</p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="pt-8 border-t text-center" style={{ borderColor: 'hsl(var(--border))' }}>
              <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Holdings Dashboard — {dataSource === 'api' ? 'Live data from API' : 'Static data (API unavailable)'}
              </p>
            </footer>

          </div>
        </main>
      </div>
    </div>
  )
}
