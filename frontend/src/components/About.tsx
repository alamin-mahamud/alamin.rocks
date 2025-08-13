"use client"

import React, { useState, useEffect } from "react"
import { ExternalLink, Award, Users, TrendingUp, MapPin, Calendar, Briefcase, Heart } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { portfolioApi, About as AboutType } from "@/lib/api"

interface AboutData extends Omit<AboutType, 'id'> {
  experience?: any[]
  projects?: any[]
  achievements?: {
    icon: any
    title: string
    description: string
  }[]
}

const About = () => {
  const { t, language } = useLanguage()

  // Get static data with language support
  const getStaticAboutData = (lang: string = 'en') => {
    const descriptions = {
      en: [
        "I'm a **strategic technology leader** dedicated to architecting and scaling **innovative cloud-native solutions** for global enterprises, with a strong **entrepreneurial spirit** that drives startup growth. Over the past **10+ years**, I've successfully built next-generation **Event-driven SaaS platforms**, led transformative **DevOps and SRE initiatives**, and consistently delivered **measurable impact**.",
        
        "Currently serving dual roles as **Senior DevOps Engineer** at [Kahf Yazılım A.Ş.](https://kahf.co) and **Senior Software Engineer - AI Products** at [LeadSync.ai](https://leadsync.ai), where I'm **migrating entire infrastructure from Azure to Bare-metal** and building **AI-powered Model Customization Platforms (MCP)** that accelerate time-to-market by **40%**.",
        
        "Previously at **BriteCore Inc** for **5 years 5 months**, I **generated $20M+ ARR** by designing and implementing highly available, cost-efficient SaaS platforms, while **cutting $1M+ cloud costs** through intelligent optimization strategies. I've **maintained 99.99% uptime** across 50+ client environments and **eliminated 30% of production brownouts** through advanced monitoring and automation.",
        
        "Beyond my technical expertise, I'm the **Founder & Host** of [Source Code Podcast](https://sourcecode.alamin.rocks) since **March 2025** and **Founder & Platform Architect** at [Dark Knight Technologies](https://darkknight.tech) since **November 2023**, where I empower businesses by building **highly scalable, fault-tolerant applications** with robust cybersecurity.",
        
        "I'm also a **Co-Founder & CSO** at **AK2 Tech** (August 2024 - April 2025), where I built **next-generation AI-powered solutions** to assist on-call support, spearheaded product strategy and GTM, secured initial customer traction in **Bangladesh and Southeast Asia**, and grew the internal team to **10+ members across 3 time zones**."
      ],
      bn: [
        "আমি একজন **কৌশলগত প্রযুক্তি নেতা** যিনি বিশ্বব্যাপী প্রতিষ্ঠানের জন্য **উদ্ভাবনী cloud-native সমাধান** ডিজাইন ও স্কেল করতে নিবেদিত, একটি শক্তিশালী **উদ্যোক্তা মনোভাব** নিয়ে যা startup-এর বৃদ্ধি চালিত করে। গত **১০+ বছরে**, আমি সফলভাবে নতুন প্রজন্মের **Event-driven SaaS platform** তৈরি করেছি, রূপান্তরকারী **DevOps ও SRE উদ্যোগ** পরিচালনা করেছি, এবং ধারাবাহিকভাবে **পরিমাপযোগ্য প্রভাব** প্রদান করেছি।",
        
        "বর্তমানে [Kahf Yazılım A.Ş.](https://kahf.co)-তে **Senior DevOps Engineer** এবং [LeadSync.ai](https://leadsync.ai)-তে **Senior Software Engineer - AI Products** হিসেবে দ্বৈত ভূমিকা পালন করছি, যেখানে আমি **Azure থেকে Bare-metal-এ সম্পূর্ণ infrastructure migrate** করছি এবং **AI-powered Model Customization Platform (MCP)** তৈরি করছি যা time-to-market **৪০%** ত্বরান্বিত করে।",
        
        "পূর্বে **BriteCore Inc**-তে **৫ বছর ৫ মাস** ধরে, আমি highly available, cost-efficient SaaS platform ডিজাইন ও বাস্তবায়নের মাধ্যমে **$20M+ ARR তৈরি** করেছি, এবং বুদ্ধিমান optimization কৌশলের মাধ্যমে **$1M+ cloud খরচ** কমিয়েছি। আমি ৫০+ client environment জুড়ে **৯৯.৯৯% uptime বজায়** রেখেছি এবং advanced monitoring ও automation-এর মাধ্যমে **৩০% production brownout দূর** করেছি।",
        
        "আমার প্রযুক্তিগত দক্ষতার পাশাপাশি, আমি **মার্চ ২০২৫** থেকে [Source Code Podcast](https://sourcecode.alamin.rocks)-এর **Founder ও Host** এবং **নভেম্বর ২০২৩** থেকে [Dark Knight Technologies](https://darkknight.tech)-এর **Founder ও Platform Architect**, যেখানে আমি শক্তিশালী cybersecurity সহ **highly scalable, fault-tolerant application** তৈরি করে ব্যবসাকে ক্ষমতায়ন করি।",
        
        "আমি **AK2 Tech**-এর **Co-Founder ও CSO** (আগস্ট ২০২৪ - এপ্রিল ২০২৫), যেখানে আমি on-call support সহায়তার জন্য **next-generation AI-powered সমাধান** তৈরি করেছি, product strategy ও GTM-এর নেতৃত্ব দিয়েছি, **বাংলাদেশ ও দক্ষিণ-পূর্ব এশিয়ায়** প্রাথমিক customer traction নিশ্চিত করেছি, এবং **৩টি time zone জুড়ে ১০+ সদস্যের** internal দল গড়ে তুলেছি।"
      ]
    }

    return {
      title: "About Me",
      description: descriptions[lang as keyof typeof descriptions] || descriptions.en,
      
      // Professional Experience Summary - keeping in English as it's factual data
      experience: [
        {
          company: "Kahf Yazılım A.Ş.",
          role: "Senior DevOps Engineer",
          duration: "July 2025 - Present",
          location: "Istanbul, Turkey",
          achievements: [
            "On a mission to make online world safe & secure",
            "Migrating entire infrastructure from Azure to Bare-metal"
          ],
          technologies: ["Bind9", "CloudNative-PG", "Kubernetes", "Ansible", "Terraform", "Microsoft Azure", "Traefik", "Helm Charts", "Prometheus", "Grafana", "Loki"]
        },
        {
          company: "LeadSync.ai",
          role: "Senior Software Engineer - AI Products",
          duration: "May 2025 - July 2025",
          location: "Singapore, Remote",
          achievements: [
            "Accelerated time-to-market by 40% by architecting end-to-end MCP integration with advanced LLMs",
            "Boosted qualified lead discovery by 25% through AI-driven lead scoring and semantic enrichment"
          ],
          technologies: ["MCP Protocol", "LLM Integration", "AI-SDK", "TypeScript", "PostgreSQL", "Nest.JS", "Next.JS"]
        },
        {
          company: "BriteCore Inc",
          role: "Senior Platform Engineer & SRE",
          duration: "February 2022 - January 2025 (3 years)",
          location: "Springfield, MO, USA",
          achievements: [
            "Generated $20M+ ARR by designing highly available, cost-efficient SaaS platforms",
            "Cut $1M+ cloud bill by spearheading cost-saving initiatives",
            "Eliminated 30% of production brownouts through runtime optimization",
            "Maintained 99.99% uptime across 50+ client environments"
          ],
          technologies: ["Amazon S3", "MongoDB", "Redis", "EventBridge", "DynamoDB", "Docker", "Kubernetes", "Terraform", "Python", "FastAPI", "React", "TypeScript"]
        }
      ],

      // Quick Facts
      quick_facts: {
        "🌍 Location": "Remote (Available Worldwide)",
        "💼 Experience": "10+ Years",
        "🎯 Specialization": "DevOps, SRE, AI Products",
        "🚀 Impact": "$21.2M+ Total Business Value",
        "📈 Success Rate": "99.99% Uptime SLA",
        "🌐 Global Reach": "100K+ Users Served"
      },

      // Skills categorized
      skills: [
        "Cloud Architecture", "DevOps", "SRE", "Kubernetes", "Docker", "Terraform",
        "AWS", "Azure", "GCP", "Python", "TypeScript", "React", "Node.js",
        "MongoDB", "PostgreSQL", "Redis", "Monitoring", "CI/CD", "GitOps"
      ],

      // Core Values & Principles
      achievements: [
        {
          icon: TrendingUp,
          title: "Innovation & Growth",
          description: "Driving technological innovation while ensuring sustainable business growth"
        },
        {
          icon: Users,
          title: "Team Leadership",
          description: "Building and mentoring high-performing engineering teams across multiple time zones"
        },
        {
          icon: Award,
          title: "Excellence",
          description: "Maintaining 99.99% uptime and delivering measurable business impact consistently"
        },
        {
          icon: Heart,
          title: "Social Impact",
          description: "Contributing to global communities through technology and entrepreneurship"
        }
      ],

      // Projects from Resume
      projects: [
        {
          name: "HomeLab",
          description: "Infrastructure as Code and GitOps framework for automating homelab provisioning and operations",
          technologies: ["Terraform", "Kubernetes", "Ansible", "GitOps", "ArgoCD"],
          type: "Infrastructure"
        },
        {
          name: "Alexandria",
          description: "Terraform library for Infrastructure as Code templates and modules for cloud-based architectures",
          technologies: ["Terraform", "AWS", "GCP", "Azure", "IaC"],
          type: "Infrastructure"
        },
        {
          name: "Capstone",
          description: "Asset Allocation Problem solver using optimization algorithms for strategic resource allocation",
          technologies: ["Python", "Optimization Algorithms", "Mathematical Modeling"],
          type: "AI/ML"
        },
        {
          name: "AlterYouth.com",
          description: "C2C scholarship platform enabling global scholarship funding through digital banking",
          technologies: ["Full-Stack Development", "Digital Banking", "Payment Processing"],
          type: "Social Impact"
        }
      ]
    }
  }

  const [aboutData, setAboutData] = useState<AboutData>(getStaticAboutData(language))
  const [loading, setLoading] = useState(true)

  // Fetch about data from API with fallback to static data
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await portfolioApi.getAbout()
        const staticData = getStaticAboutData(language)
        setAboutData({
          ...staticData,
          ...data,
          // Merge with static data for additional fields not in API
          experience: staticData.experience,
          achievements: staticData.achievements,
          projects: staticData.projects,
          quick_facts: staticData.quick_facts // Use static quick_facts to maintain type compatibility
        })
      } catch (error) {
        console.error("Failed to fetch about data:", error)
        // Use static data as fallback
        setAboutData(getStaticAboutData(language))
      } finally {
        setLoading(false)
      }
    }

    fetchAboutData()
  }, [language])

  // Update about data when language changes
  useEffect(() => {
    if (!loading) {
      setAboutData(prevData => ({
        ...prevData,
        ...getStaticAboutData(language),
        // Keep API data if available
        title: prevData.title || getStaticAboutData(language).title,
        description: prevData.description || getStaticAboutData(language).description,
        skills: prevData.skills || getStaticAboutData(language).skills,
        quick_facts: prevData.quick_facts || getStaticAboutData(language).quick_facts
      }))
    }
  }, [language, loading])

  const formatDescription = (text: string) => {
    // Convert markdown-style bold to HTML
    return text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-accent hover:text-accent/80 transition-colors inline-flex items-center gap-1">$1<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></a>')
  }

  const data = aboutData

  return (
    <section id="about" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
            {t('about.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A <strong className="text-foreground">multi-dimensional thinker</strong> with a <strong className="text-foreground">global mindset</strong>, 
            systems-level thinking, and a <strong className="text-foreground">relentless execution habit</strong>.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div className="space-y-6">
            {data.description?.map((paragraph, index) => (
              <p 
                key={index} 
                className="text-lg text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatDescription(paragraph) }}
              />
            ))}
          </div>

          <div className="space-y-6">
            {/* Quick Facts */}
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border card-hover">
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-accent" />
                Quick Facts
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location:
                  </span>
                  <span className="text-foreground font-medium">Remote (Global)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Experience:</span>
                  <span className="text-foreground font-medium">10+ Years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Specialization:</span>
                  <span className="text-foreground font-medium">DevOps, SRE, AI</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Impact:</span>
                  <span className="text-accent font-semibold">$21.2M+ Value</span>
                </div>
              </div>
            </div>

            {/* Core Values */}
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border card-hover">
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Heart className="w-5 h-5 text-accent" />
                Core Values
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {data.achievements?.map((achievement, index) => {
                  const Icon = achievement.icon
                  return (
                    <div key={index} className="text-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <Icon className="w-8 h-8 text-accent mx-auto mb-2" />
                      <h4 className="font-semibold text-sm text-foreground mb-1">{achievement.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{achievement.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About