# Component Documentation

## Overview

This portfolio website is built using a component-based architecture with React and Next.js 14. Each component is designed to be performant, accessible, and maintainable while showcasing technical expertise through interactive visualizations and animations.

## Core Components

### Hero Component (`/src/components/Hero.tsx`)

The landing section featuring dynamic animations and key metrics.

**Features:**
- Dynamic typing animation cycling through 5 professional roles
- Terminal-style command interface with realistic prompt
- Animated metrics counters with intersection observer
- Particle grid background with staggered animations
- Gradient buttons with shimmer effects

**Props:**
```typescript
// No props - self-contained component
```

**Key Hooks:**
- `useState` for typing state management
- `useEffect` for animation timing
- Intersection observer for scroll-triggered animations

**Performance Optimizations:**
- Memoized role arrays to prevent re-renders
- Debounced animation triggers
- CSS transforms for smooth animations

---

### TechStack Component (`/src/components/TechStack.tsx`)

Interactive technology showcase with filtering and detailed metrics.

**Features:**
- 20+ technologies with proficiency visualization
- Category filtering (Programming, Cloud, Infrastructure, etc.)
- Animated progress bars with staggered timing
- Hover overlays with detailed project metrics
- Summary statistics dashboard

**Interface:**
```typescript
interface TechSkill {
  name: string
  category: string
  level: number
  yearsExp: number
  icon: LucideIcon
  color: string
  projects: number
}
```

**State Management:**
```typescript
const [selectedCategory, setSelectedCategory] = useState("all")
const [animatedSkills, setAnimatedSkills] = useState<string[]>([])
const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
```

**Performance Features:**
- `useMemo` for skill arrays to prevent unnecessary re-renders
- Intersection observer for animation triggers
- Optimized re-renders with React.memo considerations

---

### Projects Component (`/src/components/Projects.tsx`)

Immersive project gallery showcasing AI and infrastructure work.

**Features:**
- 6 detailed projects with impact metrics
- Interactive category filtering
- Live demo, GitHub, and project links
- Status indicators (completed, in-progress, maintained)
- AI-powered and featured project badges

**Interface:**
```typescript
interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  github_url?: string
  live_url?: string
  demo_url?: string
  image_url?: string
  featured: boolean
  category: string
  impact: {
    users?: number
    savings?: string
    performance?: string
    reliability?: string
  }
  stats: {
    stars?: number
    forks?: number
    commits?: number
    contributors?: number
  }
  status: 'completed' | 'in-progress' | 'maintained'
  aiPowered?: boolean
}
```

**Key Features:**
- Expandable descriptions on hover
- Technology stack visualization
- Real impact metrics display
- GitHub statistics integration

---

### Achievements Component (`/src/components/Achievements.tsx`)

Animated dashboard showcasing quantified professional achievements.

**Features:**  
- 8 major accomplishments with metrics
- Animated counters using intersection observer
- Interactive category filtering
- Progress bars with staggered animations
- Financial, operational, and performance metrics

**Interface:**
```typescript
interface Achievement {
  id: string
  title: string
  value: string
  description: string
  icon: LucideIcon
  color: string
  percentage: number
  details: string[]
  category: string
}
```

**Custom Hook - AnimatedCounter:**
```typescript
interface CounterProps {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
  decimals?: number
}
```

**Animation Features:**
- Easing functions for natural motion
- Intersection observer for scroll triggers
- Staggered animation timing
- Performance-optimized counter updates

---

### Terminal Component (`/src/components/Terminal.tsx`)

Interactive terminal simulation showcasing DevOps expertise.

**Features:**
- Live command execution simulation  
- 6 realistic infrastructure management scenarios
- Auto-scrolling terminal interface
- Copy-to-clipboard functionality
- Authentic terminal styling with macOS-like window

**Interface:**
```typescript
interface Command {
  command: string
  output: string[]
  type: 'info' | 'success' | 'warning' | 'error'
  delay?: number
}
```

**State Management:**
```typescript
const [currentCommandIndex, setCurrentCommandIndex] = useState(0)
const [currentLineIndex, setCurrentLineIndex] = useState(0)
const [isTyping, setIsTyping] = useState(false)
const [displayedOutput, setDisplayedOutput] = useState<string[]>([])
```

**Command Scenarios:**
1. Kubernetes pod management
2. AWS infrastructure queries
3. Terraform planning
4. Docker container monitoring
5. Prometheus metrics
6. Git repository operations

---

### AIAssistant Component (`/src/components/AIAssistant.tsx`)

Intelligent chatbot providing portfolio information and context.

**Features:**
- Comprehensive knowledge base about experience and projects
- Context-aware response generation
- Quick question buttons for common topics
- Minimizable floating interface
- Real-time typing indicators and message history

**Interface:**
```typescript
interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
  typing?: boolean
}

interface QuickQuestion {
  id: string
  question: string
  category: string
}
```

**Knowledge Base Structure:**
```typescript
const knowledgeBase = {
  experience: {
    cloud: "...",
    devops: "...", 
    ai: "..."
  },
  achievements: {
    financial: "...",
    performance: "...",
    reliability: "..."
  },
  projects: {
    mcp: "...",
    optimization: "...",
    infrastructure: "..."
  },
  skills: {
    programming: "...",
    cloud: "...",
    orchestration: "...",
    monitoring: "..."
  }
}
```

**Response Generation:**
- Natural language processing for question categorization
- Context-aware response selection
- Fallback responses for unrecognized queries
- Professional tone with quantified achievements

---

## Supporting Components

### Navigation Component (`/src/components/Navigation.tsx`)
- Sticky navigation with smooth scrolling
- Mobile-responsive hamburger menu
- Active section highlighting

### About Component (`/src/components/About.tsx`)  
- Professional summary with key facts
- Skill tags with hover effects
- Location and experience details

### Experience Component (`/src/components/Experience.tsx`)
- Timeline-based career progression
- Detailed achievement lists per role
- Technology stack for each position

### Contact Component (`/src/components/Contact.tsx`)
- Contact form with validation
- Social media links
- Professional contact information

### Footer Component (`/src/components/Footer.tsx`)
- Copyright and legal information
- Additional navigation links
- Social media integration

## Component Patterns

### State Management Pattern
```typescript
// Local state for component-specific data
const [localState, setLocalState] = useState(initialValue)

// Derived state from props or other state
const derivedValue = useMemo(() => {
  return computeValue(localState)
}, [localState])

// Effects for side effects and subscriptions
useEffect(() => {
  // Effect logic
  return () => {
    // Cleanup
  }
}, [dependencies])
```

### Event Handler Pattern
```typescript
const handleEvent = useCallback((parameter: Type) => {
  // Event handling logic
  setLocalState(newValue)
}, [dependencies])
```

### Animation Pattern
```typescript
const [isVisible, setIsVisible] = useState(false)
const ref = useRef<HTMLDivElement>(null)

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
      }
    },
    { threshold: 0.1 }
  )

  if (ref.current) {
    observer.observe(ref.current)
  }

  return () => observer.disconnect()
}, [])
```

## Accessibility Features

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Proper tab order throughout the application
- Focus indicators with high contrast

### Screen Reader Support
- Semantic HTML structure
- ARIA labels and descriptions
- Alt text for all images and icons

### Color and Contrast
- WCAG 2.1 AA compliant color contrasts
- Color is not the only means of conveying information
- High contrast mode support

## Performance Optimizations

### React Optimizations
- `React.memo` for expensive components
- `useMemo` for expensive calculations
- `useCallback` for event handlers

### Animation Performance
- CSS transforms instead of layout properties
- `will-change` hints for animated elements
- Intersection observer for scroll-triggered animations

### Code Splitting
- Dynamic imports for large components
- Route-based code splitting with Next.js
- Lazy loading for non-critical components

## Testing Approach

### Unit Testing
```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import Component from './Component'

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('handles user interaction', () => {
    render(<Component />)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByText('Updated')).toBeInTheDocument()
  })
})
```

### Integration Testing
- Component interaction testing
- Props and state flow validation
- Animation and timing verification

## Component Guidelines

### Naming Conventions
- PascalCase for component names
- camelCase for props and variables
- kebab-case for CSS classes

### File Structure
```
ComponentName/
├── index.ts          # Export file
├── Component.tsx     # Main component
├── Component.test.tsx # Tests
├── Component.module.css # Styles (if needed)
└── types.ts          # TypeScript interfaces
```

### Props Interface
```typescript
interface ComponentProps {
  // Required props first
  requiredProp: string
  
  // Optional props second
  optionalProp?: number
  
  // Event handlers
  onEvent?: (data: Type) => void
  
  // Children and className last
  children?: React.ReactNode
  className?: string
}
```

This component architecture ensures maintainability, performance, and accessibility while providing an exceptional user experience that showcases technical expertise effectively.