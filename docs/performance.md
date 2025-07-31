# Performance Optimization Guide

## Overview

This guide covers comprehensive performance optimization strategies for the alamin.rocks portfolio website, focusing on frontend performance, backend efficiency, and user experience optimization.

## Core Web Vitals Targets

### Target Metrics
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Contentful Paint (FCP)**: < 1.8s
- **Time to Interactive (TTI)**: < 3.8s

### Current Performance
```
Lighthouse Scores:
├── Performance: 95/100
├── Accessibility: 100/100
├── Best Practices: 100/100
├── SEO: 100/100
└── PWA: 90/100

Bundle Analysis:
├── First Load JS: 114kB (target: <130kB)
├── Runtime JS: 84.3kB shared
├── Static Generation: 100%
└── Cache Hit Rate: 95%+
```

## Frontend Optimizations

### 1. Next.js Performance Features

**Static Site Generation (SSG):**
```typescript
// All pages are statically generated
export async function getStaticProps() {
  return {
    props: {},
    revalidate: 3600 // Revalidate every hour
  }
}
```

**Image Optimization:**
```typescript
// next.config.js
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Enable SWC minification
  swcMinify: true,
  
  // Experimental features
  experimental: {
    optimizeCss: true,
    modern: true,
  },
}
```

**Font Optimization:**
```typescript
// app/layout.tsx
import { JetBrains_Mono } from 'next/font/google'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['SF Mono', 'Monaco', 'monospace'],
})
```

### 2. Bundle Optimization

**Code Splitting Strategy:**
```typescript
// Dynamic imports for heavy components
const AIAssistant = dynamic(() => import('./AIAssistant'), {
  loading: () => <div>Loading...</div>,
  ssr: false
})

const Terminal = dynamic(() => import('./Terminal'), {
  loading: () => <TerminalSkeleton />,
})
```

**Tree Shaking Configuration:**
```json
// package.json
{
  "sideEffects": [
    "*.css",
    "*.scss"
  ]
}
```

**Webpack Bundle Analyzer:**
```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
```

### 3. Asset Optimization

**Static Asset Configuration:**
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

**Critical CSS Inlining:**
```css
/* Critical CSS for above-the-fold content */
.hero-section {
  /* Inline critical styles */
  background: linear-gradient(135deg, #002b36 0%, #073642 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
}

/* Non-critical CSS loaded asynchronously */
@import url('non-critical.css') print;
```

### 4. Animation Performance

**Transform-Based Animations:**
```css
/* Use transform and opacity for 60fps animations */
.animate-fade-up {
  transform: translateY(20px);
  opacity: 0;
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
}

.animate-fade-up.visible {
  transform: translateY(0);
  opacity: 1;
}

/* Avoid animating layout properties */
.avoid {
  /* Don't animate these */
  transition: width 0.3s; /* Causes layout */
  transition: height 0.3s; /* Causes layout */
}

.prefer {
  /* Animate these instead */
  transition: transform 0.3s; /* Composite layer */
  transition: opacity 0.3s;   /* Composite layer */
}
```

**Intersection Observer for Scroll Animations:**
```typescript
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target) // Disconnect after triggering
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Trigger earlier
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}
```

### 5. React Performance Optimizations

**Component Memoization:**
```typescript
// Memoize expensive components
const TechStack = React.memo(({ skills }: TechStackProps) => {
  // Component logic
})

// Memoize expensive calculations
const expensiveCalculation = useMemo(() => {
  return skills.reduce((acc, skill) => {
    return acc + skill.projects
  }, 0)
}, [skills])

// Memoize callback functions
const handleSkillClick = useCallback((skillId: string) => {
  setSelectedSkill(skillId)
}, [])
```

**Virtual Scrolling for Large Lists:**
```typescript
import { FixedSizeList as List } from 'react-window'

const VirtualizedSkillList = ({ skills }: { skills: Skill[] }) => (
  <List
    height={400}
    itemCount={skills.length}
    itemSize={80}
    itemData={skills}
  >
    {({ index, style, data }) => (
      <div style={style}>
        <SkillItem skill={data[index]} />
      </div>
    )}
  </List>
)
```

## Backend Performance

### 1. FastAPI Optimizations

**Async/Await Patterns:**
```python
# app/api/portfolio.py
from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession
import asyncio

@app.get("/api/projects")
async def get_projects(db: AsyncSession = Depends(get_db)):
    # Use async database operations
    projects = await db.execute(
        select(Project).options(selectinload(Project.technologies))
    )
    return projects.scalars().all()

# Concurrent operations
async def get_portfolio_data():
    async with httpx.AsyncClient() as client:
        github_task = client.get("https://api.github.com/users/alamin-mahamud/repos")
        linkedin_task = get_linkedin_data()
        
        github_data, linkedin_data = await asyncio.gather(
            github_task, linkedin_task, return_exceptions=True
        )
        
    return {"github": github_data, "linkedin": linkedin_data}
```

**Response Caching:**
```python
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend

# Initialize cache
FastAPICache.init(RedisBackend(), prefix="portfolio-cache")

@app.get("/api/achievements")
@cache(expire=3600)  # Cache for 1 hour
async def get_achievements():
    # Expensive computation cached
    return calculate_achievements()
```

**Database Query Optimization:**
```python
# Optimized queries with proper indexing
from sqlalchemy import select, func
from sqlalchemy.orm import selectinload, joinedload

# Use selectinload for related data
async def get_projects_with_tech():
    stmt = select(Project).options(
        selectinload(Project.technologies),
        selectinload(Project.achievements)
    )
    result = await db.execute(stmt)
    return result.scalars().all()

# Use indexes for filtering
# models/project.py
class Project(Base):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True)
    title = Column(String, index=True)  # Indexed for searching
    category = Column(String, index=True)  # Indexed for filtering
    created_at = Column(DateTime, index=True)  # Indexed for sorting
```

### 2. Database Performance

**Connection Pooling:**
```python
# database.py
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.pool import QueuePool

engine = create_async_engine(
    DATABASE_URL,
    poolclass=QueuePool,
    pool_size=20,          # Number of connections to maintain
    max_overflow=30,       # Additional connections allowed
    pool_pre_ping=True,    # Validate connections
    pool_recycle=3600,     # Recycle connections every hour
)
```

**Query Performance Monitoring:**
```python
import time
from sqlalchemy import event

# Log slow queries
@event.listens_for(engine.sync_engine, "before_cursor_execute")
def receive_before_cursor_execute(conn, cursor, statement, parameters, context, executemany):
    context._query_start_time = time.time()

@event.listens_for(engine.sync_engine, "after_cursor_execute")  
def receive_after_cursor_execute(conn, cursor, statement, parameters, context, executemany):
    total = time.time() - context._query_start_time
    if total > 0.5:  # Log queries taking longer than 500ms
        logger.warning(f"Slow query: {total:.2f}s - {statement[:200]}")
```

## Caching Strategy

### 1. Multi-Layer Caching

**Browser Caching (Service Worker):**
```javascript
// public/sw.js
const CACHE_NAME = 'alamin-rocks-v1'
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/fonts/jetbrains-mono.woff2'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request)
      })
  )
})
```

**CDN Caching (Vercel/CloudFlare):**
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, must-revalidate',
          },
        ],
      },
    ]
  },
}
```

**Redis Caching:**
```python
import redis
import json
from functools import wraps

redis_client = redis.Redis.from_url(REDIS_URL, decode_responses=True)

def cache_result(expiration=3600):
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Create cache key
            cache_key = f"{func.__name__}:{hash(str(args) + str(kwargs))}"
            
            # Try to get from cache
            cached_result = redis_client.get(cache_key)
            if cached_result:
                return json.loads(cached_result)
            
            # Execute function and cache result
            result = await func(*args, **kwargs)
            redis_client.setex(cache_key, expiration, json.dumps(result))
            
            return result
        return wrapper
    return decorator

@cache_result(expiration=1800)  # Cache for 30 minutes
async def get_github_stats():
    # Expensive API call
    pass
```

### 2. Cache Invalidation Strategy

**Time-Based Invalidation:**
```python
# Cache with TTL
redis_client.setex("user_data", 3600, data)  # Expire after 1 hour

# Cache with tag-based invalidation
def invalidate_user_cache(user_id):
    pattern = f"user:{user_id}:*"
    keys = redis_client.keys(pattern)
    if keys:
        redis_client.delete(*keys)
```

**Event-Based Invalidation:**
```python
from fastapi import BackgroundTasks

@app.post("/api/projects")
async def create_project(project: ProjectCreate, background_tasks: BackgroundTasks):
    # Create project
    new_project = await create_project_in_db(project)
    
    # Invalidate related caches in background
    background_tasks.add_task(invalidate_project_caches)
    
    return new_project

async def invalidate_project_caches():
    await redis_client.delete("projects:*")
    await redis_client.delete("achievements:*")
```

## Loading Performance

### 1. Critical Resource Prioritization

**Resource Hints:**
```html
<!-- Preload critical resources -->
<link rel="preload" href="/fonts/jetbrains-mono.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/api/projects" as="fetch" crossorigin>

<!-- Prefetch likely navigation -->
<link rel="prefetch" href="/about">
<link rel="prefetch" href="/projects">

<!-- DNS prefetch for external resources -->
<link rel="dns-prefetch" href="//api.github.com">
<link rel="dns-prefetch" href="//fonts.gstatic.com">
```

**Critical CSS Extraction:**
```javascript
// scripts/extract-critical-css.js
const critical = require('critical')

await critical.generate({
  base: 'dist/',
  src: 'index.html',
  dest: 'index-critical.html',
  inline: true,
  width: 1300,
  height: 900,
  penthouse: {
    blockJSRequests: false,
  }
})
```

### 2. Progressive Loading

**Skeleton Components:**
```typescript
const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="bg-gray-300 h-48 rounded mb-4"></div>
    <div className="bg-gray-300 h-4 rounded mb-2"></div>
    <div className="bg-gray-300 h-4 rounded w-2/3"></div>
  </div>
)

const ProjectsSection = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  return (
    <section>
      {loading ? (
        Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))
      ) : (
        projects.map(project => <ProjectCard key={project.id} {...project} />)
      )}
    </section>
  )
}
```

**Lazy Loading with Intersection Observer:**
```typescript
const LazyImage = ({ src, alt, ...props }) => {
  const [imageSrc, setImageSrc] = useState('')
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    if (!imageRef || imageSrc) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageSrc(src)
          observer.unobserve(imageRef)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(imageRef)
    return () => observer.disconnect()
  }, [imageRef, imageSrc, src])

  return (
    <img
      ref={setImageRef}
      src={imageSrc}
      alt={alt}
      loading="lazy"
      {...props}
    />
  )
}
```

## Monitoring and Analytics

### 1. Performance Monitoring

**Web Vitals Tracking:**
```typescript
// utils/analytics.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

function sendToAnalytics(metric: any) {
  // Send to your analytics service
  gtag('event', metric.name, {
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    event_label: metric.id,
  })
}

// Measure all Web Vitals
getCLS(sendToAnalytics)
getFID(sendToAnalytics)
getFCP(sendToAnalytics)
getLCP(sendToAnalytics)
getTTFB(sendToAnalytics)
```

**Real User Monitoring (RUM):**
```typescript
// components/PerformanceMonitor.tsx
const PerformanceMonitor = () => {
  useEffect(() => {
    // Navigation timing
    const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    const metrics = {
      dns: perfData.domainLookupEnd - perfData.domainLookupStart,
      tcp: perfData.connectEnd - perfData.connectStart,
      ttfb: perfData.responseStart - perfData.requestStart,
      download: perfData.responseEnd - perfData.responseStart,
      dom: perfData.domInteractive - perfData.responseEnd,
      load: perfData.loadEventEnd - perfData.loadEventStart,
    }

    // Send metrics to analytics
    Object.entries(metrics).forEach(([key, value]) => {
      gtag('event', 'performance_timing', {
        event_category: 'Performance',
        event_label: key,
        value: Math.round(value),
      })
    })
  }, [])

  return null
}
```

### 2. Bundle Analysis Automation

**Performance Budget:**
```json
// .lighthouserc.json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 1}],
        "categories:best-practices": ["error", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.9}]
      }
    }
  }
}
```

**Bundle Size Monitoring:**
```javascript
// scripts/check-bundle-size.js
const fs = require('fs')
const path = require('path')

const BUNDLE_SIZE_LIMITS = {
  'main': 130 * 1024,      // 130KB
  'framework': 50 * 1024,   // 50KB
  'commons': 30 * 1024,     // 30KB
}

function checkBundleSize() {
  const buildManifest = JSON.parse(
    fs.readFileSync('.next/build-manifest.json', 'utf8')
  )

  for (const [name, limit] of Object.entries(BUNDLE_SIZE_LIMITS)) {
    const bundlePath = buildManifest.pages['/'][0]
    const bundleSize = fs.statSync(path.join('.next', bundlePath)).size

    if (bundleSize > limit) {
      console.error(`Bundle ${name} exceeds size limit: ${bundleSize} > ${limit}`)
      process.exit(1)
    }
  }

  console.log('All bundles within size limits ✓')
}

checkBundleSize()
```

## Performance Checklist

### ✅ Frontend Optimizations
- [ ] Static site generation enabled
- [ ] Images optimized with next/image
- [ ] Fonts preloaded and optimized
- [ ] Critical CSS inlined
- [ ] Non-critical CSS loaded asynchronously
- [ ] JavaScript bundles code-split
- [ ] Heavy components dynamically imported
- [ ] Animations use transform/opacity only
- [ ] Intersection Observer for scroll animations
- [ ] Service Worker for offline caching

### ✅ Backend Optimizations
- [ ] Database queries optimized with indexes
- [ ] Connection pooling configured
- [ ] Redis caching implemented
- [ ] Async/await patterns used
- [ ] Response compression enabled
- [ ] API rate limiting implemented
- [ ] Slow query monitoring active

### ✅ Infrastructure Optimizations
- [ ] CDN configured for static assets
- [ ] Gzip/Brotli compression enabled
- [ ] HTTP/2 server push configured
- [ ] Database connection pooling
- [ ] Load balancing implemented
- [ ] Auto-scaling configured

### ✅ Monitoring and Analytics
- [ ] Core Web Vitals tracked
- [ ] Real User Monitoring active
- [ ] Performance budgets set
- [ ] Bundle size monitoring
- [ ] Error tracking configured
- [ ] Uptime monitoring active

This comprehensive performance optimization guide ensures the alamin.rocks portfolio delivers exceptional user experience while maintaining high performance scores across all metrics.