'use client'

import { useState, useEffect } from 'react'
import {
  Target, Star, Clock, Sun, Moon, Menu, X,
  Dumbbell, Shield, BookOpen, Heart, Wallet, Users,
  Compass, Flame, Zap, ChevronRight, ChevronDown, CheckCircle2, Loader2
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

// Navigation items
const navItems = [
  { id: 'overview', label: 'Overview', icon: Target },
  { id: 'siddiq', label: 'Siddiq', icon: Star },
  { id: 'khalid', label: 'Khalid', icon: Dumbbell },
  { id: 'omar', label: 'Omar', icon: Shield },
  { id: 'ali', label: 'Ali', icon: BookOpen },
  { id: 'abdurrahman', label: 'Abdur Rahman', icon: Wallet },
  { id: 'principles', label: 'Principles', icon: Compass },
  { id: 'schedule', label: 'Schedule', icon: Clock },
  { id: 'lifestyle', label: 'Lifestyle', icon: Heart },
]

// Icon mapping for personas
const iconMap: { [key: string]: any } = {
  'star': Star,
  'dumbbell': Dumbbell,
  'shield': Shield,
  'book-open': BookOpen,
  'wallet': Wallet,
}

// Static fallback data from MoE PDF
const staticPersonas = [
  {
    id: 'siddiq',
    name: 'Siddiq',
    arabicName: 'الصِّدِّيق',
    icon: Star,
    domain: 'Practice + Dawah',
    eventually: 'Muslim Scholar, Mentor - Internalizing the Quran and maintaining the non-negotiables',
    points: [
      'Be the best in your field - Let excellence be your dawah',
      'Share how Islamic Principles led to success',
    ],
    oneThing: 'Start and end with clear Niyyah (Intention) to please Allah.',
    ritual: 'Tahajjud and Daily Quran with Tadabbur and Ihsan',
    guardrail: 'Istikhara for All Major Decisions to Avoid the "Optimization Trap".',
    milestones: [
      { date: 'Jan 31, 2026', goal: 'Surah Duha' },
      { date: 'Feb 28, 2026', goal: '..' },
      { date: 'Mar 31, 2026', goal: '..' },
    ],
    color: '#e11d48'
  },
  {
    id: 'khalid',
    name: 'Khalid',
    arabicName: 'خَالِد',
    icon: Dumbbell,
    domain: 'Health + Strategy',
    eventually: 'CR7-Level Fitness - Strong believer serving the Ummah',
    points: [],
    oneThing: '4 hours of total daily movement (Run + Strength/Stretching).',
    ritual: 'Post-Fajr 10-mile run and Post-Maghrib strength session.',
    guardrail: '6 hours of sleep as "training" for recovery.',
    milestones: [
      { date: 'Jan 31, 2026', goal: '20% Body Fat' },
      { date: 'Feb 28, 2026', goal: '15% Body Fat' },
      { date: 'Mar 31, 2026', goal: '10% Body Fat' },
    ],
    color: '#16a34a'
  },
  {
    id: 'omar',
    name: 'Omar',
    arabicName: 'عُمَر',
    icon: Shield,
    domain: 'Primary Responsibility',
    eventually: 'Business Entrepreneur, Investor, Nation Builder, by following Islamic values',
    points: [
      'Build: Platform Architect and Platform-related SaaS',
      'Kubernetes Expert (KubeAstronaut)',
      'AWS Expert - AWS All Exams',
      'Go Expertise',
      'Import-Export Business',
      'Project Bagdad',
      'Sell: Sales, Marketing & Networking Expert [1 Book a Week]',
      'Connect: Help 1 Person/week by trying to solve a hard problem for them.',
    ],
    oneThing: '',
    ritual: 'Itqan (Excellence) during the 08:00–18:00 "Responsibility Hours".',
    guardrail: '',
    milestones: [
      { date: 'Jan 31, 2026', goal: 'LB Issues' },
      { date: 'Feb 28, 2026', goal: 'Metal Infra Mastery' },
      { date: 'Mar 31, 2026', goal: 'Google Level DNS Infra Basic' },
    ],
    color: '#2563eb'
  },
  {
    id: 'ali',
    name: 'Ali',
    arabicName: 'عَلِيّ',
    icon: BookOpen,
    domain: 'Growth',
    eventually: 'Platform Architect and Platform-related SaaS',
    points: [],
    oneThing: 'Complete the KubeAstronaut and AWS certs by March 31, 2026.',
    ritual: '',
    guardrail: 'Deep focus using the "Dhuha Time" for your most important technical decisions.',
    milestones: [
      { date: 'Jan 31, 2026', goal: 'CKA + Homelab' },
      { date: 'Feb 28, 2026', goal: 'CKAD, CKS' },
      { date: 'Mar 31, 2026', goal: 'KubeAstronaut' },
    ],
    color: '#7c3aed'
  },
  {
    id: 'abdurrahman',
    name: 'Abdur Rahman',
    arabicName: 'عَبْدُ الرَّحْمَن',
    icon: Wallet,
    domain: 'Wealth + Business + Finance',
    eventually: 'Collect to give and create opportunity, not to stash',
    points: [
      'Weekend "Growth & Connect" - Sales psychology & networking.',
      'No desire, only responsibility - Finance as a tool for the Ummah.',
    ],
    oneThing: 'Collect to give and create opportunity, not to stash',
    ritual: 'Weekend "Growth & Connect" - Sales psychology & networking.',
    guardrail: 'No desire, only responsibility - Finance as a tool for the Ummah.',
    milestones: [
      { date: 'Jan 31, 2026', goal: '20,000 BDT Zakat IA' },
      { date: 'Mar 31, 2026', goal: '৫০ শতক পাড় বাধা (৭নং ইউনিয়ন)' },
      { date: 'Mar 31, 2026', goal: 'Harun মন্সুী ৫ কানি রেজিস্ট্রি' },
    ],
    color: '#f97316'
  }
]

const staticPrinciples = [
  {
    name: 'NIYYAH',
    arabic: 'نِيَّة',
    meaning: 'Begin each day and each task with a clear intention (Niyyah) to please Allah (SWT) and benefit humanity.',
    icon: Heart
  },
  {
    name: 'TAWAKKUL',
    arabic: 'تَوَكُّل',
    meaning: '"And put your trust in Allah if you are believers indeed."',
    verse: 'Quran 5:23',
    icon: Shield
  },
  {
    name: 'ISTIKHARAH',
    arabic: 'اِسْتِخَارَة',
    meaning: 'Constantly seek Allah\'s guidance (Istikhara) for decisions, especially when you feel the optimization trap pulling you in.',
    icon: Compass
  },
  {
    name: 'MUHASABAH',
    arabic: 'مُحَاسَبَة',
    meaning: '"Indeed, Allah will not change the condition of a people until they change what is in themselves."',
    verse: 'Quran 13:11',
    icon: Target
  },
  {
    name: 'IHSAN',
    arabic: 'إِحْسَان',
    meaning: 'Strive for Excellence - "Worship Allah as if you see Him".',
    icon: Flame
  },
  {
    name: 'ITQAN',
    arabic: 'إِتْقَان',
    meaning: '"Allah loves, when one of you does a job, that he does it with excellence."',
    icon: Zap
  }
]

const staticDailyNonNegotiables = [
  'Five Daily Prayers on Time',
  'Tahajjud',
  'Morning & Evening Adhkar',
  'Daily Quran with Tadabbur',
  'Istighfar 100x daily'
]

const staticLifestyleGuidelines = [
  '8 hours of sleep as a training',
  'Drink only green tea - drink water often.',
  '4 Hours workout',
  'Every time you use a restroom, use water',
  'Always wear glasses when working with computers.',
]

const staticDuaForSuccess = "O Allah, I seek refuge in You from anxiety and grief, weakness and laziness, miserliness and cowardice, the burden of debts, and being overpowered by men."

// Types for personas with resolved icons
interface PersonaWithIcon {
  id: string
  name: string
  arabicName: string
  icon: any
  domain: string
  eventually: string
  points: string[]
  oneThing: string
  ritual: string
  guardrail: string
  milestones: { date: string; goal: string }[]
  color: string
}

interface Principle {
  name: string
  arabic: string
  meaning: string
  verse?: string
  icon: any
}

// Time blocks for the day progress bar and schedule
const timeBlocks = [
  { startHour: 22, endHour: 28.5, persona: 'Sleep', activity: 'Rest & Recovery', color: '#64748b', arabicName: '' },
  { startHour: 4.5, endHour: 6, persona: 'Siddiq', activity: 'Tahajjud & Quran', color: '#e11d48', arabicName: 'الصِّدِّيق' },
  { startHour: 6, endHour: 8, persona: 'Khalid', activity: 'CR7 Conditioning', color: '#16a34a', arabicName: 'خَالِد' },
  { startHour: 8, endHour: 18, persona: 'Omar', activity: 'Responsibility', color: '#2563eb', arabicName: 'عُمَر' },
  { startHour: 18, endHour: 20, persona: 'Khalid', activity: 'CR7 Strength', color: '#16a34a', arabicName: 'خَالِد' },
  { startHour: 20, endHour: 22, persona: 'Ali', activity: 'Growth & Rest', color: '#7c3aed', arabicName: 'عَلِيّ' },
]

// Normalized blocks for display (0-24 scale, sleep split into two segments)
const displayBlocks = [
  { startHour: 0, endHour: 4.5, persona: 'Sleep', activity: 'Rest & Recovery', color: '#64748b', arabicName: '' },
  { startHour: 4.5, endHour: 6, persona: 'Siddiq', activity: 'Tahajjud & Quran', color: '#e11d48', arabicName: 'الصِّدِّيق' },
  { startHour: 6, endHour: 8, persona: 'Khalid', activity: 'CR7 Conditioning', color: '#16a34a', arabicName: 'خَالِد' },
  { startHour: 8, endHour: 18, persona: 'Omar', activity: 'Responsibility', color: '#2563eb', arabicName: 'عُمَر' },
  { startHour: 18, endHour: 20, persona: 'Khalid', activity: 'CR7 Strength', color: '#16a34a', arabicName: 'خَالِد' },
  { startHour: 20, endHour: 22, persona: 'Ali', activity: 'Growth & Rest', color: '#7c3aed', arabicName: 'عَلِيّ' },
  { startHour: 22, endHour: 24, persona: 'Sleep', activity: 'Rest & Recovery', color: '#64748b', arabicName: '' },
]

function useNow() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(id)
  }, [])
  return now
}

function getCurrentBlock(now: Date) {
  const h = now.getHours() + now.getMinutes() / 60
  return displayBlocks.find(b => h >= b.startHour && h < b.endHour) || displayBlocks[0]
}

function formatHour(h: number) {
  const hh = Math.floor(h) % 24
  const mm = Math.round((h % 1) * 60)
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`
}

function DayProgressBar({ now }: { now: Date }) {
  const currentHour = now.getHours() + now.getMinutes() / 60
  const pct = (currentHour / 24) * 100
  const current = getCurrentBlock(now)

  return (
    <div className="mb-6">
      {/* Active block label */}
      <div className="flex items-center gap-2 mb-2 text-sm">
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: current.color }} />
        <span className="font-medium" style={{ color: current.color }}>{current.persona}</span>
        <span style={{ color: 'hsl(var(--muted-foreground))' }}>— {current.activity}</span>
      </div>
      {/* Bar */}
      <div className="relative w-full h-3 rounded-full overflow-hidden flex">
        {displayBlocks.map((block, i) => {
          const width = ((block.endHour - block.startHour) / 24) * 100
          const isActive = block === current
          return (
            <div
              key={i}
              className="h-full transition-opacity duration-500"
              style={{
                width: `${width}%`,
                backgroundColor: block.color,
                opacity: isActive ? 0.9 : 0.3,
              }}
            />
          )
        })}
        {/* Current time marker */}
        <div
          className="absolute top-0 h-full w-0.5 bg-[hsl(var(--foreground))]"
          style={{ left: `${pct}%`, transition: 'left 60s linear' }}
        />
      </div>
      {/* Time labels */}
      <div className="relative w-full mt-1 h-4">
        {[0, 4, 6, 8, 12, 18, 20, 22].map(h => (
          <span
            key={h}
            className="absolute text-[10px]"
            style={{ left: `${(h / 24) * 100}%`, color: 'hsl(var(--muted-foreground))', transform: 'translateX(-50%)' }}
          >
            {formatHour(h)}
          </span>
        ))}
      </div>
    </div>
  )
}

function CurrentBlockCard({ now, personas: personaList }: { now: Date; personas: PersonaWithIcon[] }) {
  const current = getCurrentBlock(now)
  const currentHour = now.getHours() + now.getMinutes() / 60
  const blockDuration = current.endHour - current.startHour
  const elapsed = currentHour - current.startHour
  const progress = Math.max(0, Math.min(1, elapsed / blockDuration))
  const remainingMin = Math.max(0, Math.round((blockDuration - elapsed) * 60))
  const remainHrs = Math.floor(remainingMin / 60)
  const remainMins = remainingMin % 60

  // Find next block
  const idx = displayBlocks.indexOf(current)
  const next = displayBlocks[(idx + 1) % displayBlocks.length]

  const persona = personaList.find(p => p.name === current.persona)
  const PersonaIcon = persona?.icon

  return (
    <div className="p-4 border mb-6 relative overflow-hidden" style={{ borderColor: current.color }}>
      {/* Progress background */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{ backgroundColor: current.color, opacity: 0.06, width: `${progress * 100}%` }}
      />
      <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-3 flex-1">
          {PersonaIcon && <PersonaIcon size={28} style={{ color: current.color }} />}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider px-2 py-0.5 font-medium text-white rounded" style={{ backgroundColor: current.color }}>NOW</span>
              <span className="font-bold text-lg">{current.persona}</span>
              {current.arabicName && <span className="opacity-50 text-sm" dir="rtl">{current.arabicName}</span>}
            </div>
            <p className="text-sm mt-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>{current.activity}</p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <div>
            <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>Remaining</p>
            <p className="font-bold">{remainHrs > 0 ? `${remainHrs}h ` : ''}{remainMins}m</p>
          </div>
          <div className="w-16 h-16 relative">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
              <circle
                cx="18" cy="18" r="15.5" fill="none"
                stroke={current.color}
                strokeWidth="3"
                strokeDasharray={`${progress * 97.4} 97.4`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">{Math.round(progress * 100)}%</span>
          </div>
        </div>
      </div>
      {/* Next block preview */}
      <div className="relative mt-3 pt-3 border-t flex items-center gap-2 text-xs" style={{ borderColor: 'hsl(var(--border))' }}>
        <ChevronRight size={14} style={{ color: 'hsl(var(--muted-foreground))' }} />
        <span style={{ color: 'hsl(var(--muted-foreground))' }}>Next:</span>
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: next.color }} />
        <span className="font-medium">{next.persona}</span>
        <span style={{ color: 'hsl(var(--muted-foreground))' }}>— {next.activity} ({formatHour(next.startHour)})</span>
      </div>
    </div>
  )
}

function ScheduleTimeline({ now }: { now: Date }) {
  const current = getCurrentBlock(now)
  return (
    <div className="space-y-0">
      {displayBlocks.filter(b => !(b.startHour === 0 && b.persona === 'Sleep')).map((block, i) => {
        const isActive = block === current
        return (
          <div key={i} className="flex items-stretch gap-4 group">
            {/* Time */}
            <div className="w-20 flex-shrink-0 text-right py-3">
              <p className="text-xs font-mono" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {formatHour(block.startHour)}
              </p>
              <p className="text-xs font-mono" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {formatHour(block.endHour % 24)}
              </p>
            </div>
            {/* Bar */}
            <div className="relative flex flex-col items-center">
              <div
                className="w-2 flex-1 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: block.color,
                  opacity: isActive ? 0.9 : 0.3,
                  boxShadow: isActive ? `0 0 12px ${block.color}55` : 'none',
                }}
              />
            </div>
            {/* Content */}
            <div className={`flex-1 py-3 flex items-center gap-3 ${isActive ? '' : 'opacity-60'}`}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{block.persona}</span>
                  {block.arabicName && <span className="text-xs opacity-50" dir="rtl">{block.arabicName}</span>}
                  {isActive && (
                    <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 font-bold text-white rounded" style={{ backgroundColor: block.color }}>
                      NOW
                    </span>
                  )}
                </div>
                <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{block.activity}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function MOEPage() {
  const [activeSection, setActiveSection] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [dataSource, setDataSource] = useState<'api' | 'static'>('static')
  const now = useNow()

  // State for data
  const [personas, setPersonas] = useState<PersonaWithIcon[]>(staticPersonas)
  const [principles, setPrinciples] = useState<Principle[]>(staticPrinciples)
  const [dailyNonNegotiables, setDailyNonNegotiables] = useState<string[]>(staticDailyNonNegotiables)
  const [lifestyleGuidelines, setLifestyleGuidelines] = useState<string[]>(staticLifestyleGuidelines)
  const [duaForSuccess, setDuaForSuccess] = useState<string>(staticDuaForSuccess)
  const [superObjective, setSuperObjective] = useState<string>("Allah SWT's Satisfaction")
  const [targetDate, setTargetDate] = useState<string>("March 31st, 2026")

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/moe/summary`)
        if (!response.ok) throw new Error('API request failed')

        const data = await response.json()

        // Transform API data to match component format
        if (data.super_objective) {
          setSuperObjective(data.super_objective)
        }
        if (data.target_date) {
          setTargetDate(data.target_date)
        }

        if (data.personas && data.personas.length > 0) {
          setPersonas(data.personas.map((p: any) => ({
            id: p.name.toLowerCase().replace(/\s+/g, ''),
            name: p.name,
            arabicName: p.arabic_name || '',
            icon: iconMap[p.icon] || Star,
            domain: p.domain,
            eventually: p.eventually || '',
            points: p.points || [],
            oneThing: p.one_thing || '',
            ritual: p.ritual || '',
            guardrail: p.guardrail || '',
            milestones: p.milestones || [],
            color: p.color || '#e11d48',
          })))
        }

        if (data.principles && data.principles.length > 0) {
          const principleIconMap: { [key: string]: any } = {
            'heart': Heart,
            'shield': Shield,
            'compass': Compass,
            'target': Target,
            'flame': Flame,
            'zap': Zap,
          }
          setPrinciples(data.principles.map((p: any) => ({
            name: p.name,
            arabic: p.arabic || '',
            meaning: p.meaning,
            verse: p.verse,
            icon: principleIconMap[p.icon] || Heart,
          })))
        }

        if (data.non_negotiables && data.non_negotiables.length > 0) {
          setDailyNonNegotiables(data.non_negotiables)
        }

        if (data.lifestyle_guidelines && data.lifestyle_guidelines.length > 0) {
          setLifestyleGuidelines(data.lifestyle_guidelines.map((g: any) => g.title || g))
        }

        if (data.dua_for_success) {
          setDuaForSuccess(data.dua_for_success)
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

  const currentBlock = getCurrentBlock(now)
  const currentPersona = personas.find(p => p.name === currentBlock.persona) || null

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
            <span className="text-sm hidden sm:inline" style={{ color: 'hsl(var(--muted-foreground))' }}>/ MoE</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/assets" className="text-sm px-3 py-1 hover:bg-[hsl(var(--muted))]">Assets</Link>
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
              const persona = personas.find(p => p.id === item.id)
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
                  <Icon size={16} style={persona && !isActive ? { color: persona.color } : undefined} />
                  {item.label}
                </button>
              )
            })}
          </nav>

          {/* Current Mode in Sidebar */}
          {currentPersona && (
            <div className="p-4 border-t" style={{ borderColor: 'hsl(var(--border))' }}>
              <p className="text-xs uppercase tracking-wider mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>Current Mode</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: currentPersona.color }} />
                <span className="font-medium">{currentPersona.name}</span>
              </div>
            </div>
          )}
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
              <p className="text-xs mb-2" style={{ color: 'hsl(var(--muted-foreground))' }} dir="rtl">
                بسم الله الرحمن الرحيم
              </p>
              <h1 className="text-2xl font-bold mb-2">MoE - {superObjective}</h1>
              <p className="text-sm mb-6" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Super Objective (Inshallah) — {targetDate} Eventually
              </p>

              {/* Day Progress Bar */}
              <DayProgressBar now={now} />

              {/* Current Block Card */}
              <CurrentBlockCard now={now} personas={personas} />

              {/* Quick Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {personas.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => scrollToSection(p.id)}
                    className="p-3 border text-left hover:bg-[hsl(var(--muted))] transition-colors"
                    style={{ borderColor: 'hsl(var(--border))' }}
                  >
                    <p.icon size={18} style={{ color: p.color }} />
                    <p className="text-sm font-medium mt-2">{p.name}</p>
                    <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{p.domain}</p>
                  </button>
                ))}
              </div>
            </section>

            {/* Persona Sections */}
            {personas.map((persona) => (
              <section key={persona.id} id={persona.id} className="scroll-mt-20">
                <div className="flex items-center gap-3 mb-4">
                  <persona.icon size={24} style={{ color: persona.color }} />
                  <div>
                    <h2 className="text-xl font-bold">
                      {persona.name} <span className="font-normal opacity-60" dir="rtl">{persona.arabicName}</span>
                    </h2>
                    <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>({persona.domain})</p>
                  </div>
                </div>

                {/* Eventually */}
                <div className="p-4 mb-4" style={{ backgroundColor: 'hsl(var(--muted))' }}>
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>Eventually</p>
                  <p className="font-medium">{persona.eventually}</p>
                </div>

                {/* Points */}
                {persona.points.length > 0 && (
                  <div className="mb-4 space-y-2">
                    {persona.points.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: persona.color }} />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* The One Thing, Ritual, Guardrail */}
                <div className="grid sm:grid-cols-3 gap-4 mb-4">
                  {persona.oneThing && (
                    <div className="p-3 border" style={{ borderColor: 'hsl(var(--border))' }}>
                      <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>The One Thing</p>
                      <p className="text-sm">{persona.oneThing}</p>
                    </div>
                  )}
                  {persona.ritual && (
                    <div className="p-3 border" style={{ borderColor: 'hsl(var(--border))' }}>
                      <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>The Ritual</p>
                      <p className="text-sm">{persona.ritual}</p>
                    </div>
                  )}
                  {persona.guardrail && (
                    <div className="p-3 border" style={{ borderColor: 'hsl(var(--border))' }}>
                      <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>The Guardrail</p>
                      <p className="text-sm">{persona.guardrail}</p>
                    </div>
                  )}
                </div>

                {/* Milestones */}
                <div className="p-4 border" style={{ borderColor: 'hsl(var(--border))' }}>
                  <p className="text-xs uppercase tracking-wider mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>March 31st, 2026 Milestones</p>
                  <div className="space-y-2">
                    {persona.milestones.map((milestone, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm">
                        <span className="text-xs px-2 py-0.5" style={{ backgroundColor: 'hsl(var(--muted))' }}>{milestone.date}</span>
                        <span>{milestone.goal}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ))}

            {/* Principles Section */}
            <section id="principles" className="scroll-mt-20">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Compass size={20} />
                Guiding Principles
              </h2>

              <div className="space-y-4 mb-6">
                {principles.map((principle) => (
                  <div key={principle.name} className="p-4 border" style={{ borderColor: 'hsl(var(--border))' }}>
                    <div className="flex items-start gap-3">
                      <principle.icon size={20} style={{ color: 'hsl(var(--highlight))' }} className="flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold">{principle.name}</span>
                          <span className="opacity-60" dir="rtl">{principle.arabic}</span>
                        </div>
                        <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>{principle.meaning}</p>
                        {principle.verse && (
                          <p className="text-xs mt-1" style={{ color: 'hsl(var(--highlight))' }}>({principle.verse})</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Daily Non-Negotiables */}
              <div className="p-4 border" style={{ borderColor: 'hsl(var(--highlight))' }}>
                <h3 className="font-bold mb-3">Daily Non-Negotiables (IHSAN)</h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {dailyNonNegotiables.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 size={16} style={{ color: 'hsl(var(--highlight))' }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Schedule Section */}
            <section id="schedule" className="scroll-mt-20">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Clock size={20} />
                Schedule (Laser Focus)
              </h2>

              <ScheduleTimeline now={now} />
            </section>

            {/* Lifestyle Section */}
            <section id="lifestyle" className="scroll-mt-20">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Heart size={20} />
                Lifestyle
              </h2>

              {/* Du'a for Success */}
              <div className="p-4 border mb-6" style={{ borderColor: 'hsl(var(--highlight))', backgroundColor: 'hsl(var(--muted))' }}>
                <h3 className="font-bold mb-2">Du&apos;a for Success</h3>
                <p className="text-sm italic" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {duaForSuccess}
                </p>
              </div>

              {/* Guidelines */}
              <div className="space-y-3">
                {lifestyleGuidelines.map((guideline, idx) => (
                  <div key={idx} className="p-4 border flex items-center gap-3" style={{ borderColor: 'hsl(var(--border))' }}>
                    <CheckCircle2 size={18} style={{ color: 'hsl(var(--highlight))' }} />
                    <span className="text-sm">{guideline}</span>
                  </div>
                ))}
              </div>

              {/* Prayer Times */}
              <div className="mt-6 p-4 border text-center" style={{ borderColor: 'hsl(var(--border))' }}>
                <h3 className="font-bold mb-3">Prayer Times Structure</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map((prayer) => (
                    <div key={prayer} className="flex items-center gap-2">
                      {prayer === 'Fajr' || prayer === 'Isha' ? <Moon size={14} className="opacity-50" /> : <Sun size={14} className="opacity-50" />}
                      <span className="text-sm">{prayer}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="pt-8 border-t text-center" style={{ borderColor: 'hsl(var(--border))' }}>
              <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Mission & Objectives Engine — {dataSource === 'api' ? 'Live data from API' : 'Static data (API unavailable)'}
              </p>
            </footer>

          </div>
        </main>
      </div>
    </div>
  )
}
