"use client"

import { useState, useEffect } from "react"
import { Github, Linkedin, Mail, ArrowRight, ExternalLink, MapPin, Briefcase, GraduationCap, Trophy, Server, Shield, Award, Quote, ChevronLeft, ChevronRight, Sun, Moon, Globe } from "lucide-react"
import Link from "next/link"

// Geometric SVG components
const GeometricCircle = ({ className = "" }: { className?: string }) => (
  <svg className={`absolute pointer-events-none ${className}`} viewBox="0 0 200 200" fill="none" aria-hidden="true">
    <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" opacity="0.1" />
    <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="1" opacity="0.08" />
  </svg>
)

const GeometricTriangle = ({ className = "" }: { className?: string }) => (
  <svg className={`absolute pointer-events-none ${className}`} viewBox="0 0 200 200" fill="none" aria-hidden="true">
    <polygon points="100,20 180,180 20,180" stroke="currentColor" strokeWidth="1" opacity="0.08" fill="none" />
  </svg>
)

// Connecting Dots Graph - Network visualization
const ConnectingDotsGraph = ({ className = "" }: { className?: string }) => (
  <svg className={`absolute pointer-events-none ${className}`} viewBox="0 0 300 300" fill="none" aria-hidden="true">
    {/* Nodes */}
    <circle cx="50" cy="50" r="6" fill="currentColor" opacity="0.15" />
    <circle cx="150" cy="30" r="8" fill="currentColor" opacity="0.12" />
    <circle cx="250" cy="60" r="5" fill="currentColor" opacity="0.18" />
    <circle cx="80" cy="150" r="7" fill="currentColor" opacity="0.14" />
    <circle cx="200" cy="130" r="9" fill="currentColor" opacity="0.1" />
    <circle cx="270" cy="180" r="6" fill="currentColor" opacity="0.16" />
    <circle cx="30" cy="220" r="5" fill="currentColor" opacity="0.12" />
    <circle cx="120" cy="250" r="8" fill="currentColor" opacity="0.15" />
    <circle cx="220" cy="270" r="6" fill="currentColor" opacity="0.13" />
    <circle cx="150" cy="150" r="10" fill="currentColor" opacity="0.08" />

    {/* Connecting Lines */}
    <line x1="50" y1="50" x2="150" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.06" />
    <line x1="150" y1="30" x2="250" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.06" />
    <line x1="50" y1="50" x2="80" y2="150" stroke="currentColor" strokeWidth="1" opacity="0.06" />
    <line x1="150" y1="30" x2="200" y2="130" stroke="currentColor" strokeWidth="1" opacity="0.06" />
    <line x1="250" y1="60" x2="270" y2="180" stroke="currentColor" strokeWidth="1" opacity="0.06" />
    <line x1="80" y1="150" x2="150" y2="150" stroke="currentColor" strokeWidth="1" opacity="0.06" />
    <line x1="150" y1="150" x2="200" y2="130" stroke="currentColor" strokeWidth="1" opacity="0.06" />
    <line x1="200" y1="130" x2="270" y2="180" stroke="currentColor" strokeWidth="1" opacity="0.06" />
    <line x1="30" y1="220" x2="80" y2="150" stroke="currentColor" strokeWidth="1" opacity="0.06" />
    <line x1="30" y1="220" x2="120" y2="250" stroke="currentColor" strokeWidth="1" opacity="0.06" />
    <line x1="120" y1="250" x2="150" y2="150" stroke="currentColor" strokeWidth="1" opacity="0.06" />
    <line x1="120" y1="250" x2="220" y2="270" stroke="currentColor" strokeWidth="1" opacity="0.06" />
    <line x1="220" y1="270" x2="270" y2="180" stroke="currentColor" strokeWidth="1" opacity="0.06" />
  </svg>
)

// 3D Cube
const Cube3D = ({ className = "" }: { className?: string }) => (
  <svg className={`absolute pointer-events-none ${className}`} viewBox="0 0 200 200" fill="none" aria-hidden="true">
    {/* Back face */}
    <polygon points="60,40 140,40 140,120 60,120" stroke="currentColor" strokeWidth="1" opacity="0.06" fill="none" />
    {/* Front face */}
    <polygon points="40,60 120,60 120,140 40,140" stroke="currentColor" strokeWidth="1" opacity="0.1" fill="none" />
    {/* Connecting edges */}
    <line x1="40" y1="60" x2="60" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.08" />
    <line x1="120" y1="60" x2="140" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.08" />
    <line x1="120" y1="140" x2="140" y2="120" stroke="currentColor" strokeWidth="1" opacity="0.08" />
    <line x1="40" y1="140" x2="60" y2="120" stroke="currentColor" strokeWidth="1" opacity="0.08" />
  </svg>
)

// 3D Pyramid
const Pyramid3D = ({ className = "" }: { className?: string }) => (
  <svg className={`absolute pointer-events-none ${className}`} viewBox="0 0 200 200" fill="none" aria-hidden="true">
    {/* Base */}
    <polygon points="30,150 100,180 170,150 100,120" stroke="currentColor" strokeWidth="1" opacity="0.08" fill="none" />
    {/* Apex lines */}
    <line x1="100" y1="40" x2="30" y2="150" stroke="currentColor" strokeWidth="1" opacity="0.1" />
    <line x1="100" y1="40" x2="100" y2="180" stroke="currentColor" strokeWidth="1" opacity="0.06" />
    <line x1="100" y1="40" x2="170" y2="150" stroke="currentColor" strokeWidth="1" opacity="0.1" />
    <line x1="100" y1="40" x2="100" y2="120" stroke="currentColor" strokeWidth="1" opacity="0.08" />
  </svg>
)

// 3D Sphere (wireframe)
const Sphere3D = ({ className = "" }: { className?: string }) => (
  <svg className={`absolute pointer-events-none ${className}`} viewBox="0 0 200 200" fill="none" aria-hidden="true">
    <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="1" opacity="0.1" fill="none" />
    <ellipse cx="100" cy="100" rx="60" ry="20" stroke="currentColor" strokeWidth="1" opacity="0.08" fill="none" />
    <ellipse cx="100" cy="100" rx="20" ry="60" stroke="currentColor" strokeWidth="1" opacity="0.08" fill="none" />
    <ellipse cx="100" cy="100" rx="45" ry="60" stroke="currentColor" strokeWidth="1" opacity="0.06" fill="none" transform="rotate(30 100 100)" />
    <ellipse cx="100" cy="100" rx="45" ry="60" stroke="currentColor" strokeWidth="1" opacity="0.06" fill="none" transform="rotate(-30 100 100)" />
  </svg>
)

const DotGrid = ({ className = "" }: { className?: string }) => (
  <div
    className={`absolute inset-0 ${className}`}
    style={{
      backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
      backgroundSize: '40px 40px',
      opacity: 0.03
    }}
    aria-hidden="true"
  />
)

// Multilingual content - English terms kept in English, headings uppercase
const translations = {
  en: {
    firstName: "AL AMIN",
    lastName: "MAHAMUD",
    tagline: "PLATFORM & SRE ARCHITECT",
    years: "10+ YEARS",
    heroDesc: "Building mission-critical infrastructure.",
    uptime: "99.99% UPTIME",
    mau: "2M+ MAU",
    infrastructure: "$60M+",
    getInTouch: "GET IN TOUCH",
    viewCV: "VIEW CV",
    about: "ABOUT",
    experience: "EXPERIENCE",
    skills: "SKILLS",
    education: "EDUCATION",
    contact: "CONTACT",
    recommendations: "RECOMMENDATIONS",
    strategicLeader: "STRATEGIC LEADER.",
    globalImpact: "GLOBAL IMPACT.",
    careerHighlights: "CAREER HIGHLIGHTS.",
    technicalExpertise: "TECHNICAL EXPERTISE.",
    academicBackground: "ACADEMIC BACKGROUND.",
    colleaguesSay: "WHAT COLLEAGUES SAY.",
    letsConnect: "LET'S CONNECT.",
    recognition: "RECOGNITION."
  },
  bn: {
    firstName: "আল আমিন",
    lastName: "মাহমুদ",
    tagline: "PLATFORM & SRE ARCHITECT",
    years: "10+ বছর",
    heroDesc: "Mission-critical infrastructure নির্মাণ।",
    uptime: "99.99% UPTIME",
    mau: "2M+ MAU",
    infrastructure: "$60M+",
    getInTouch: "যোগাযোগ করুন",
    viewCV: "CV দেখুন",
    about: "সম্পর্কে",
    experience: "অভিজ্ঞতা",
    skills: "দক্ষতা",
    education: "শিক্ষা",
    contact: "যোগাযোগ",
    recommendations: "সুপারিশ",
    strategicLeader: "STRATEGIC LEADER।",
    globalImpact: "GLOBAL IMPACT।",
    careerHighlights: "CAREER HIGHLIGHTS।",
    technicalExpertise: "TECHNICAL EXPERTISE।",
    academicBackground: "ACADEMIC BACKGROUND।",
    colleaguesSay: "সহকর্মীদের মতামত।",
    letsConnect: "যোগাযোগ করুন।",
    recognition: "স্বীকৃতি।"
  },
  ar: {
    firstName: "AL AMIN",
    lastName: "MAHAMUD",
    tagline: "PLATFORM & SRE ARCHITECT",
    years: "10+ سنوات",
    heroDesc: "بناء Mission-critical infrastructure.",
    uptime: "99.99% UPTIME",
    mau: "2M+ MAU",
    infrastructure: "$60M+",
    getInTouch: "تواصل معي",
    viewCV: "عرض CV",
    about: "نبذة",
    experience: "الخبرات",
    skills: "المهارات",
    education: "التعليم",
    contact: "اتصل",
    recommendations: "التوصيات",
    strategicLeader: "STRATEGIC LEADER.",
    globalImpact: "GLOBAL IMPACT.",
    careerHighlights: "CAREER HIGHLIGHTS.",
    technicalExpertise: "TECHNICAL EXPERTISE.",
    academicBackground: "ACADEMIC BACKGROUND.",
    colleaguesSay: "ماذا يقول الزملاء.",
    letsConnect: "لنتواصل.",
    recognition: "التقدير."
  }
}

type Language = 'en' | 'bn' | 'ar'

// Pagination component
const Pagination = ({ current, total, onPageChange }: { current: number; total: number; onPageChange: (page: number) => void }) => (
  <div className="flex items-center justify-center gap-4 mt-8">
    <button
      onClick={() => onPageChange(current - 1)}
      disabled={current === 0}
      className="p-2 border border-current disabled:opacity-30 hover:bg-[hsl(var(--muted))] transition-colors"
      aria-label="Previous page"
    >
      <ChevronLeft size={20} />
    </button>
    <span className="text-sm font-medium">
      {current + 1} / {total}
    </span>
    <button
      onClick={() => onPageChange(current + 1)}
      disabled={current === total - 1}
      className="p-2 border border-current disabled:opacity-30 hover:bg-[hsl(var(--muted))] transition-colors"
      aria-label="Next page"
    >
      <ChevronRight size={20} />
    </button>
  </div>
)

const sections = ['hero', 'about', 'experience', 'skills', 'education', 'recommendations', 'contact']

// All experiences from cv.tex
const experiences = [
  {
    company: "Kahf Yazılım A.Ş.",
    role: "Senior DevOps Engineer",
    period: "Aug 2025 - Present",
    location: "Dhaka, Bangladesh (Hybrid)",
    achievements: [
      { text: "Architected DNS filtering infrastructure serving", highlight: "15B+ queries/month", suffix: "across 3 regions" },
      { text: "Blocking", highlight: "1.5B+ malicious domains", suffix: "protecting 2M+ MAU" },
      { text: "Driving", highlight: "62.5% cost reduction ($145k+ annually)", suffix: "through strategic cloud exit" },
      { text: "Extended startup runway by", highlight: "4 months", suffix: "through infrastructure optimization" },
      { text: "Built enterprise-grade observability platform across 3 regions using", highlight: "Prometheus, Grafana, and Loki", suffix: "" }
    ]
  },
  {
    company: "LeadSync.AI",
    role: "Senior Software Engineer - AI Products",
    period: "May 2025 - Jul 2025",
    location: "Singapore (Remote)",
    achievements: [
      { text: "Executed product vision of AI-powered sales intelligence platform,", highlight: "accelerated time-to-market by 40%", suffix: "" },
      { text: "Architected end-to-end MCP integration with LLMs, contributing to", highlight: "$500k Seed funding", suffix: "validation" }
    ]
  },
  {
    company: "BriteCore Inc",
    role: "Senior Platform Engineer & SRE",
    period: "Feb 2022 - Jan 2025",
    location: "Springfield, MO, USA",
    achievements: [
      { text: "Generated", highlight: "$20M+ ARR", suffix: "by designing highly available, cost-efficient SaaS platforms" },
      { text: "Cut", highlight: "$1M+ in cloud spend", suffix: "through cloud cost-optimization initiatives" },
      { text: "Achieved", highlight: "SOC2 compliance", suffix: "reducing vulnerability exposure by ~60%" },
      { text: "Accelerated development cycles by", highlight: "~35%", suffix: "with CI/CD pipelines enabling 200+ daily builds" },
      { text: "Neutralized", highlight: "large-scale DDoS attacks", suffix: "through proactive monitoring and advanced filtering" }
    ]
  },
  {
    company: "BriteCore Inc",
    role: "Platform Engineer",
    period: "Apr 2021 - Jan 2022",
    location: "Springfield, MO, USA",
    achievements: [
      { text: "Reduced AWS cloud costs by", highlight: "~$36.5K annually", suffix: "by optimizing CloudWatch log ingestion" },
      { text: "Improved platform scalability and maintainability by", highlight: "40%", suffix: "" },
      { text: "Sustained", highlight: "99.99% uptime", suffix: "across environments" },
      { text: "Accelerated go-to-market timelines by", highlight: "~30%", suffix: "" }
    ]
  },
  {
    company: "BriteCore Inc",
    role: "Site Reliability Engineer",
    period: "Sep 2019 - Mar 2021",
    location: "Springfield, MO, USA",
    achievements: [
      { text: "Maintained", highlight: "99.99% SLA", suffix: "for 50+ clients" },
      { text: "Eliminated", highlight: "30 minutes recurring downtime", suffix: "with blue/green deployments" },
      { text: "Reduced operational toil by", highlight: "75%", suffix: "through automation" },
      { text: "Increased enterprise customer satisfaction to", highlight: "90%", suffix: "" }
    ]
  },
  {
    company: "Pathao LLC",
    role: "Software Engineer",
    period: "May 2019 - Jul 2019",
    location: "Dhaka, Bangladesh",
    achievements: [
      { text: "Migrated", highlight: "2M user ratings", suffix: "with zero data loss" },
      { text: "Standardized API structure by bootstrapping robust API aggregation service", highlight: "", suffix: "" }
    ]
  },
  {
    company: "Portonics LLC",
    role: "Software Engineer",
    period: "Apr 2018 - Apr 2019",
    location: "Dhaka, Bangladesh",
    achievements: [
      { text: "Sustained", highlight: "99.99% uptime", suffix: "for 1M+ daily users" },
      { text: "Reduced page load times by", highlight: "90%", suffix: "" },
      { text: "Decoupled monolithic architecture into microservices", highlight: "", suffix: "" }
    ]
  },
  {
    company: "Cookups LLC",
    role: "Jr. Software Engineer",
    period: "Dec 2017 - Mar 2018",
    location: "Dhaka, Bangladesh",
    achievements: [
      { text: "Streamlined promotional workflows by integrating promo code generation", highlight: "", suffix: "" },
      { text: "Developed messenger bot to automate customer interactions", highlight: "", suffix: "" }
    ]
  }
]

// Skills from cv.tex
const skills = {
  "Cloud & DevOps": ["AWS", "Azure", "Terraform", "Ansible", "CloudFormation", "SaltStack", "GitHub Actions", "GitLab CI"],
  "Container & Orchestration": ["Kubernetes", "Docker", "containerd", "LXC", "EKS", "ECS", "Helm", "ArgoCD"],
  "Programming": ["Python", "Go", "TypeScript", "FastAPI", "NestJS", "Gin", "Flask", "Django"],
  "Databases & Messaging": ["PostgreSQL", "MySQL", "Redis", "RabbitMQ", "Elasticsearch", "OpenSearch"],
  "Observability": ["Prometheus", "Grafana", "Loki", "Datadog", "CloudWatch", "ELK Stack"],
  "Linux & Security": ["Debian", "Arch", "eBPF", "SELinux", "AppArmor", "iptables", "SOC 2", "OWASP"],
  "Networking": ["BGP", "VXLAN", "VPN", "DNS", "TLS", "OSI Model", "pfSense", "VLANs"],
  "On-Prem & Homelab": ["Proxmox", "TrueNAS", "Ceph", "ZFS", "NFS", "LVM", "RAID"]
}

// Education from cv.tex
const education = [
  {
    institution: "Chittagong University of Engineering & Technology",
    degree: "B.Sc. in Mechanical Engineering",
    period: "Mar 2013 - Sep 2017",
    gpa: "CGPA: 3.24/4.00",
    achievements: [
      "Pivoted from mechanical to software engineering during sophomore year",
      "Founded university's Code Club with 50+ members",
      "Organized workshops training 200+ students",
      "Research: Automation of three wheeler vehicles registration"
    ]
  }
]

// Achievements/Metrics
const achievements = [
  { icon: Server, value: "$60M+", label: "Critical Infrastructure" },
  { icon: Shield, value: "15B+", label: "DNS Queries/Month" },
  { icon: Award, value: "99.99%", label: "Uptime Achieved" },
  { icon: Briefcase, value: "10+", label: "Years Experience" }
]

// Awards from cv.tex
const awards = [
  { name: "Hackathon Champion", event: "International Engineering Innovation Summit 2015", place: "1st Place, 10+ teams" },
  { name: "App Fest Runner-Up", event: "International Engineering Innovation Summit 2015", place: "2nd Place" }
]

// All LinkedIn Recommendations from cv.tex
const recommendations = [
  {
    name: "Omar Faruque Tuhin",
    title: "Staff Software Engineer at Pathao",
    date: "Apr. 2025",
    quote: "I had the privilege of mentoring him during his 2018 internship where he worked with Django REST Framework. Even then, he stood out for his technical prowess, problem-solving skills, and ability to deliver production-ready solutions. His curiosity and dedication to mastering complex concepts were truly impressive.",
    highlight: "Watching his career evolve has been rewarding - from a promising intern to a technology leader architecting scalable cloud platforms that drive real business impact."
  },
  {
    name: "Sian Lerk Lau",
    title: "Senior Software Engineer/Technical Services Lead at BriteCore",
    date: "Jan. 2025",
    quote: "It was pleasant working with Alamin at BriteCore. As a Senior Site Reliability Engineer, he brought not only exceptional skills in platform architecture, AWS, and IaC, but also a genuine passion for building systems that are reliable, secure, and efficient.",
    highlight: "Alamin has a rare ability to tackle complex challenges with calm confidence. He's the kind of colleague who makes everyone better, simply by how he approaches problems and treats people."
  },
  {
    name: "Sunny Parekh",
    title: "Director of Information Security, Technology and Compliance at BriteCore",
    date: "May 2025",
    quote: "I've had the pleasure of working with Alamin, whose expertise in building cloud-driven SaaS platforms is impressive.",
    highlight: "Alamin has guided DevOps efforts with a focus on scalability, functionality, and efficiency. Alamin is a reliable, forward-thinking professional who delivers real business impact through technology."
  },
  {
    name: "Ariful Islam",
    title: "Principal Software Engineer at Brain Station 23",
    date: "Jun. 2019",
    quote: "It is rare that you come across a person like Alamin Mahamud. I have known him since 2014. He has built a reputation in the dev community with his broad vision. Apart from developing skills he has exceptional communication skills and loves to read.",
    highlight: "He has transformed himself from a Mechanical Engineer to a professional Software Engineer. I recommend Alamin Mahamud highly as I know that he will never let anyone down."
  },
  {
    name: "Al Amin Ibne Mosaddeque Chayan",
    title: "Principal Software Engineer at Portonics Limited",
    date: "Jul. 2019",
    quote: "Alamin was a fantastic person to work with, and is not only a multi-skilled and insightful colleague, but also an inspiring strategist. Very good person.",
    highlight: "Great employee with a very strong problem solving skills. He is an asset to any company."
  },
  {
    name: "Ahmed Shamim Hassan",
    title: "Software Engineer at Kahf Yazılım A.Ş.",
    date: "Jun. 2019",
    quote: "I've known Alamin for quite some time. Even though we didn't work closely, still I figured out his enthusiasm about learning and experimenting with new stuff. As soon as I had the chance to refer him to the Pathao I didn't wait a bit.",
    highlight: "He is a real asset for any technology team. I'm wishing for his success in every aspect of life."
  },
  {
    name: "Sakibur Rahaman Chowdhury",
    title: "Senior Software Engineer at Turing",
    date: "Jun. 2019",
    quote: "His dreams may be bigger than skies, but his hard-working mentality and passion towards CS will guide him to the pinnacle of success.",
    highlight: "Courage & passion are the key elements Alamin possesses. All the best for his future endeavors."
  },
  {
    name: "Md Shoeb Abdullah",
    title: "Senior Golang Developer/Lead at Acore Health",
    date: "Mar. 2019",
    quote: "Thirst for new technologies made Md Alamin Mahmud 'Next Generation' programmer to me. When Alamin is in your team, you know he will keep you up-to-date with upcoming technologies. He is also a Linux expert.",
    highlight: "If you want to find the most social and jolly person in the company, probably Alamin will be the one. Finally, Alamin is a great motivation to me!"
  }
]

// Theme Toggle Component
const ThemeToggle = () => {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const isDark = document.documentElement.classList.contains('dark')
    setDark(isDark)
  }, [])

  const toggle = () => {
    const newDark = !dark
    setDark(newDark)
    document.documentElement.classList.toggle('dark', newDark)
    localStorage.setItem('theme', newDark ? 'dark' : 'light')
  }

  if (!mounted) return null

  return (
    <button
      onClick={toggle}
      className="p-2 hover:opacity-70 transition-opacity"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}

// Language Switcher Component
const LanguageSwitcher = ({ lang, setLang }: { lang: Language; setLang: (l: Language) => void }) => {
  const [open, setOpen] = useState(false)
  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'EN' },
    { code: 'bn', label: 'বাংলা', native: 'বাং' },
    { code: 'ar', label: 'العربية', native: 'عر' }
  ]

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 hover:opacity-70 transition-opacity flex items-center gap-1"
        aria-label="Change language"
      >
        <Globe size={18} />
        <span className="text-sm font-medium">{languages.find(l => l.code === lang)?.native}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-lg z-50 min-w-[120px]">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false); }}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-[hsl(var(--muted))] transition-colors ${lang === l.code ? 'font-bold' : ''}`}
              dir={l.code === 'ar' ? 'rtl' : 'ltr'}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const [activeSection, setActiveSection] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [expPage, setExpPage] = useState(0)
  const [recPage, setRecPage] = useState(0)
  const [skillPage, setSkillPage] = useState(0)
  const [lang, setLang] = useState<Language>('en')

  const t = translations[lang]
  const isRTL = lang === 'ar'

  const expPerPage = 3
  const recPerPage = 2
  const skillsPerPage = 4

  const totalExpPages = Math.ceil(experiences.length / expPerPage)
  const totalRecPages = Math.ceil(recommendations.length / recPerPage)
  const skillEntries = Object.entries(skills)
  const totalSkillPages = Math.ceil(skillEntries.length / skillsPerPage)

  const currentExperiences = experiences.slice(expPage * expPerPage, (expPage + 1) * expPerPage)
  const currentRecommendations = recommendations.slice(recPage * recPerPage, (recPage + 1) * recPerPage)
  const currentSkills = skillEntries.slice(skillPage * skillsPerPage, (skillPage + 1) * skillsPerPage)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') {
      document.documentElement.classList.add('dark')
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const sectionElements = document.querySelectorAll('.slide')
      sectionElements.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setActiveSection(index)
        }
      })
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (index: number) => {
    const sectionElements = document.querySelectorAll('.slide')
    sectionElements[index]?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Navigation */}
      <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="container flex items-center justify-between">
          <Link href="/" className="text-xl sm:text-2xl font-black tracking-tighter">
            AM<span className="text-[hsl(var(--muted-foreground))]">.</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {[
              { key: 'about', label: t.about },
              { key: 'experience', label: t.experience },
              { key: 'skills', label: t.skills },
              { key: 'education', label: t.education },
              { key: 'cv', label: 'CV' },
              { key: 'contact', label: t.contact }
            ].map((item) => (
              <Link
                key={item.key}
                href={item.key === 'cv' ? '/cv' : `#${item.key}`}
                className="nav-link"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher lang={lang} setLang={setLang} />
            <ThemeToggle />
            <a href="https://github.com/alamin-mahamud" target="_blank" rel="noopener noreferrer" className="p-2 hover:opacity-70" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/alamin-mahamud" target="_blank" rel="noopener noreferrer" className="p-2 hover:opacity-70" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </nav>

      {/* Slide Indicators */}
      <div className="slide-indicators hidden md:flex">
        {sections.map((section, index) => (
          <button
            key={index}
            className={`slide-dot ${activeSection === index ? 'active' : ''}`}
            onClick={() => scrollToSection(index)}
            aria-label={`Go to ${section} section`}
          />
        ))}
      </div>

      <main>
        {/* Hero Section */}
        <section id="hero" className="slide">
          <DotGrid />
          <ConnectingDotsGraph className="w-72 sm:w-96 lg:w-[500px] h-72 sm:h-96 lg:h-[500px] top-10 right-0 sm:right-10 text-gray-400" />
          <Cube3D className="w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bottom-20 left-0 sm:left-10 text-gray-400" />
          <Sphere3D className="w-40 sm:w-56 lg:w-72 h-40 sm:h-56 lg:h-72 top-1/3 left-1/4 text-gray-400 hidden lg:block" />

          <div className="container relative z-10">
            <div className="max-w-5xl">
              <p className="text-sm sm:text-base lg:text-lg uppercase tracking-[0.2em] mb-6 sm:mb-8" style={{ color: 'hsl(var(--muted-foreground))' }}>
                <span className="highlight">{t.tagline}</span> — <span className="highlight">{t.years}</span>
              </p>

              <h1 className="magazine-display mb-6 sm:mb-8">
                <span className="ltr-text">{t.firstName}</span><br />
                <span className="gradient-text ltr-text">{t.lastName}</span>
              </h1>

              <p className="text-lg sm:text-xl lg:text-2xl max-w-3xl mb-10 sm:mb-14 leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {t.heroDesc} <span className="highlight">{t.uptime}</span> {lang === 'en' ? 'for' : ''} <span className="highlight">{t.mau}</span>. {lang === 'en' ? 'Managing' : ''} <span className="highlight">{t.infrastructure}</span> {lang === 'en' ? 'infrastructure' : ''}.
              </p>

              <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                <Link href="#contact" className="btn btn-primary text-base sm:text-lg">
                  {t.getInTouch}
                  <ArrowRight size={20} className={isRTL ? 'rotate-180' : ''} />
                </Link>
                <Link href="/cv" className="btn btn-secondary text-base sm:text-lg">
                  {t.viewCV}
                </Link>
              </div>
            </div>
          </div>

          <div className="scroll-hint hidden sm:flex">
            <span className="scroll-hint-text">Scroll</span>
            <div className="scroll-hint-line" />
          </div>
        </section>

        {/* Metrics Section */}
        <section className="slide slide-alt">
          <div className="container relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-20">
              {achievements.map((metric) => (
                <div key={metric.label} className="text-center">
                  <metric.icon className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-4 sm:mb-6 opacity-50" />
                  <div className="magazine-metric mb-2 sm:mb-3">
                    <span className="highlight">{metric.value}</span>
                  </div>
                  <div className="text-sm sm:text-base uppercase tracking-widest" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="slide">
          <DotGrid className="opacity-[0.02]" />
          <Pyramid3D className="w-48 sm:w-64 h-48 sm:h-64 top-20 right-10 text-gray-400 hidden md:block" />
          <ConnectingDotsGraph className="w-64 sm:w-80 h-64 sm:h-80 bottom-10 left-0 text-gray-400 hidden lg:block" />
          <div className="container relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <p className="section-label mb-4 sm:mb-6">{t.about}</p>
                <h2 className="magazine-headline mb-6 sm:mb-8">
                  <span className="ltr-text">{t.strategicLeader}</span><br />
                  <span className="highlight ltr-text">{t.globalImpact}</span>
                </h2>
              </div>
              <div className="space-y-6 sm:space-y-8">
                <p className="text-base sm:text-lg lg:text-xl leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Platform & SRE Architect with <span className="highlight">10+ years</span> delivering mission-critical infrastructure across on-prem, hybrid, and multi-cloud environments.
                </p>
                <p className="text-base sm:text-lg lg:text-xl leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Business impact: <span className="highlight">$1M+ annual savings</span>, <span className="highlight">$20M+ ARR</span> enabled. Operating DNS infrastructure handling <span className="highlight">15B+ queries/month</span>.
                </p>
                <p className="text-base sm:text-lg lg:text-xl leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Global operator across <span className="highlight">Bangladesh, USA, and Turkey</span>. Technical depth in AWS, Kubernetes, Terraform, Python, Go.
                </p>
                <div className="flex flex-wrap gap-4 sm:gap-6 text-sm sm:text-base pt-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  <span className="flex items-center gap-2">
                    <MapPin size={18} />
                    Dhaka, Bangladesh
                  </span>
                  <span className="flex items-center gap-2">
                    <Briefcase size={18} />
                    Open to opportunities
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section - Paginated */}
        <section id="experience" className="slide slide-auto-height">
          <Cube3D className="w-48 sm:w-64 h-48 sm:h-64 bottom-20 right-0 sm:right-10 text-gray-400" />
          <Sphere3D className="w-40 sm:w-56 h-40 sm:h-56 top-40 left-0 text-gray-400 hidden lg:block" />
          <div className="container relative z-10">
            <div className="max-w-5xl mx-auto">
              <p className="section-label mb-4 sm:mb-6">{t.experience}</p>
              <h2 className="magazine-headline mb-12 sm:mb-16">
                <span className="ltr-text">{t.careerHighlights}</span>
              </h2>

              <div className="space-y-10 sm:space-y-14">
                {currentExperiences.map((exp) => (
                  <article key={`${exp.company}-${exp.period}`} className="timeline-item">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 mb-3">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold">{exp.company}</h3>
                      <span className="text-sm uppercase tracking-widest" style={{ color: 'hsl(var(--muted-foreground))' }}>{exp.period}</span>
                    </div>
                    <p className="text-base sm:text-lg lg:text-xl mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>{exp.role}</p>
                    <p className="text-sm sm:text-base mb-4 sm:mb-6 flex items-center gap-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      <MapPin size={14} />
                      {exp.location}
                    </p>
                    <ul className="space-y-3">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-base sm:text-lg flex items-start gap-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
                          <span className="text-green-600 dark:text-green-400 mt-2 flex-shrink-0">•</span>
                          <span>
                            {achievement.text}{' '}
                            {achievement.highlight && <span className="highlight">{achievement.highlight}</span>}
                            {achievement.suffix && ` ${achievement.suffix}`}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>

              <Pagination current={expPage} total={totalExpPages} onPageChange={setExpPage} />
            </div>
          </div>
        </section>

        {/* Skills Section - Paginated */}
        <section id="skills" className="slide slide-alt slide-auto-height">
          <ConnectingDotsGraph className="w-72 sm:w-96 h-72 sm:h-96 top-1/4 left-0 sm:left-10 text-gray-400" />
          <Pyramid3D className="w-48 sm:w-64 h-48 sm:h-64 bottom-20 right-10 text-gray-400 hidden md:block" />
          <div className="container relative z-10">
            <div className="text-center mb-12 sm:mb-16">
              <p className="section-label mb-4 sm:mb-6">{t.skills}</p>
              <h2 className="magazine-headline">
                <span className="ltr-text">{t.technicalExpertise}</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto">
              {currentSkills.map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 uppercase tracking-wider" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {items.map((skill) => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <Pagination current={skillPage} total={totalSkillPages} onPageChange={setSkillPage} />
          </div>
        </section>

        {/* Education & Awards Section */}
        <section id="education" className="slide slide-auto-height">
          <DotGrid className="opacity-[0.02]" />
          <Sphere3D className="w-48 sm:w-64 h-48 sm:h-64 top-20 right-10 text-gray-400 hidden md:block" />
          <div className="container relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                {/* Education */}
                <div>
                  <p className="section-label mb-4 sm:mb-6">{t.education}</p>
                  <h2 className="magazine-title mb-8 sm:mb-12">
                    <span className="ltr-text">{t.academicBackground}</span>
                  </h2>

                  {education.map((edu) => (
                    <article key={edu.institution}>
                      <div className="flex items-start gap-4 mb-3">
                        <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0 mt-1" />
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">{edu.institution}</h3>
                      </div>
                      <p className="text-base sm:text-lg lg:text-xl mb-2">{edu.degree}</p>
                      <p className="text-sm sm:text-base mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>{edu.period}</p>
                      <p className="text-base sm:text-lg mb-6"><span className="highlight">{edu.gpa}</span></p>
                      <ul className="space-y-2">
                        {edu.achievements.map((achievement, i) => (
                          <li key={i} className="text-sm sm:text-base lg:text-lg flex items-start gap-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
                            <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>

                {/* Awards */}
                <div>
                  <p className="section-label mb-4 sm:mb-6">AWARDS</p>
                  <h2 className="magazine-title mb-8 sm:mb-12">
                    <span className="ltr-text">{t.recognition}</span>
                  </h2>

                  <div className="space-y-6">
                    {awards.map((award) => (
                      <article key={award.name} className="card">
                        <div className="flex items-start gap-4">
                          <Trophy className="w-6 h-6 sm:w-7 sm:h-7 text-amber-500 flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold mb-1">{award.name}</h3>
                            <p className="text-sm sm:text-base mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>{award.event}</p>
                            <span className="inline-block text-sm px-3 py-1" style={{ background: 'hsl(var(--muted))' }}>
                              <span className="highlight">{award.place}</span>
                            </span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recommendations Section - Paginated */}
        <section id="recommendations" className="slide slide-alt slide-auto-height">
          <ConnectingDotsGraph className="w-64 sm:w-80 h-64 sm:h-80 top-20 left-10 text-gray-400 hidden lg:block" />
          <Cube3D className="w-40 sm:w-56 h-40 sm:h-56 bottom-20 right-10 text-gray-400 hidden md:block" />
          <div className="container relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <p className="section-label mb-4 sm:mb-6">{t.recommendations}</p>
                <h2 className="magazine-headline">
                  <span className="ltr-text">{t.colleaguesSay}</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
                {currentRecommendations.map((rec) => (
                  <article key={rec.name} className="card recommendation-card">
                    <Quote className="w-8 h-8 sm:w-10 sm:h-10 mb-4 sm:mb-6 opacity-20" />
                    <p className="text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      &ldquo;{rec.quote}&rdquo;
                    </p>
                    <p className="text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                      <span className="highlight-strong">&ldquo;{rec.highlight}&rdquo;</span>
                    </p>
                    <div className="border-t pt-4 sm:pt-6" style={{ borderColor: 'hsl(var(--border))' }}>
                      <p className="text-base sm:text-lg font-bold">{rec.name}</p>
                      <p className="text-sm sm:text-base" style={{ color: 'hsl(var(--muted-foreground))' }}>{rec.title}</p>
                      <p className="text-xs sm:text-sm mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>{rec.date}</p>
                    </div>
                  </article>
                ))}
              </div>

              <Pagination current={recPage} total={totalRecPages} onPageChange={setRecPage} />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="slide">
          <Pyramid3D className="w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 top-10 left-0 sm:left-10 text-gray-400" />
          <ConnectingDotsGraph className="w-72 sm:w-96 h-72 sm:h-96 bottom-10 right-0 sm:right-10 text-gray-400" />
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <p className="section-label mb-4 sm:mb-6">{t.contact}</p>
              <h2 className="magazine-display mb-8 sm:mb-12">
                <span className="ltr-text">{t.letsConnect}</span>
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl mb-12 sm:mb-16 leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Have a project in mind or want to discuss opportunities?<br />
                I&apos;d love to hear from you.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-16 sm:mb-20">
                <a href="mailto:hello@alamin.rocks" className="btn btn-primary text-base sm:text-lg">
                  <Mail size={20} />
                  hello@alamin.rocks
                </a>
                <a href="https://linkedin.com/in/alamin-mahamud" target="_blank" rel="noopener noreferrer" className="btn btn-secondary text-base sm:text-lg">
                  <Linkedin size={20} />
                  LinkedIn
                </a>
              </div>

              <div className="flex justify-center gap-6 sm:gap-8">
                <a href="https://github.com/alamin-mahamud" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-base sm:text-lg hover:opacity-70" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  <Github size={20} />
                  GitHub
                  <ExternalLink size={14} />
                </a>
                <a href="https://linkedin.com/in/alamin-mahamud" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-base sm:text-lg hover:opacity-70" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  <Linkedin size={20} />
                  LinkedIn
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 sm:py-12 border-t" style={{ borderColor: 'hsl(var(--border))' }}>
          <div className="container">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm sm:text-base" style={{ color: 'hsl(var(--muted-foreground))' }}>
                &copy; {new Date().getFullYear()} Alamin Mahamud. All rights reserved.
              </p>
              <div className="flex gap-6 sm:gap-8">
                <Link href="/cv" className="text-sm sm:text-base hover:opacity-70" style={{ color: 'hsl(var(--muted-foreground))' }}>CV</Link>
                <a href="mailto:hello@alamin.rocks" className="text-sm sm:text-base hover:opacity-70" style={{ color: 'hsl(var(--muted-foreground))' }}>Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
