"use client"

import { useState, useEffect, useRef } from "react"
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Minimize2, 
  Maximize2, 
  X,
  Sparkles,
  Brain,
  Zap,
  Code
} from "lucide-react"

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

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentMessage, setCurrentMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const quickQuestions: QuickQuestion[] = [
    { id: "experience", question: "Tell me about Alamin's experience with cloud platforms", category: "Cloud" },
    { id: "achievements", question: "What are his biggest achievements?", category: "Impact" },
    { id: "ai-projects", question: "Show me his AI and ML projects", category: "AI/ML" },
    { id: "devops", question: "How does he approach DevOps and SRE?", category: "DevOps" },
    { id: "cost-optimization", question: "Tell me about the $1M+ cost savings", category: "Financial" },
    { id: "leadership", question: "What's his leadership experience?", category: "Leadership" }
  ]

  const knowledgeBase = {
    experience: {
      cloud: "Alamin has 10+ years of cloud expertise across AWS, GCP, and Azure. He's managed 50+ AWS accounts, achieved SOC2 compliance, and saved over $1M in cloud costs through intelligent optimization strategies.",
      devops: "As a Senior DevOps Engineer and SRE, he's maintained 99.99% uptime across 50+ client environments, eliminated 30% of production brownouts, and accelerated development cycles by 35% through CI/CD pipeline optimization.",
      ai: "Currently working as Senior Software Engineer - AI Products at LeadSync.ai, where he built an end-to-end Model Customization Platform (MCP) that accelerated time-to-market by 40% and boosted qualified lead discovery by 25%."
    },
    achievements: {
      financial: "Generated $20M+ in SaaS ARR and saved $1.2M+ in cloud infrastructure costs. This includes optimizing AWS CloudWatch logs ($36.5K/year savings) and implementing cost-saving initiatives across enterprise clients.",
      performance: "Achieved 40% performance improvements across systems, 80% faster infrastructure provisioning, and 75% reduction in manual operational toil through automation.",
      reliability: "Maintained 99.99% SLA across 50+ clients, implemented blue/green deployments eliminating downtime, and built robust disaster recovery systems."
    },
    projects: {
      mcp: "AI-Powered Model Customization Platform at LeadSync.ai - Revolutionary LLM integration platform featuring semantic enrichment, personalized AI recommendations, and custom model fine-tuning for enterprise deployment.",
      optimization: "Cloud Cost Optimization Engine - AI-driven system using machine learning to predict usage patterns, automatically rightsize instances, and implement cost-saving strategies across multi-cloud environments.",
      infrastructure: "HomeLab GitOps Infrastructure - Production-grade automation framework with Kubernetes orchestration, featuring GitOps workflows, automated service deployment, and disaster recovery mechanisms."
    },
    skills: {
      programming: "Expert in Python (8+ years), Go (5+ years), TypeScript (6+ years), with extensive experience in FastAPI, Next.js, and modern development frameworks.",
      cloud: "Deep expertise in AWS (7+ years), GCP (4+ years), Azure (3+ years), with hands-on experience managing large-scale cloud deployments and cost optimization.",
      orchestration: "Advanced Kubernetes (6+ years) and Docker (8+ years) experience, managing 15+ clusters with 500+ pods in production environments.",
      monitoring: "Comprehensive observability stack experience with Prometheus, Grafana, DataDog, and custom monitoring solutions serving 100K+ users."
    }
  }

  const generateResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase()
    
    if (lowerQuestion.includes('experience') || lowerQuestion.includes('background')) {
      if (lowerQuestion.includes('cloud')) return knowledgeBase.experience.cloud
      if (lowerQuestion.includes('devops') || lowerQuestion.includes('sre')) return knowledgeBase.experience.devops
      if (lowerQuestion.includes('ai') || lowerQuestion.includes('ml')) return knowledgeBase.experience.ai
      return "Alamin is a dynamic technology leader with 10+ years of expertise in building scalable cloud platforms and leading DevOps + SRE teams. He's currently working dual roles as Senior DevOps Engineer at Kahf Yazılım A.Ş. and Senior Software Engineer - AI Products at LeadSync.ai."
    }
    
    if (lowerQuestion.includes('achievement') || lowerQuestion.includes('impact') || lowerQuestion.includes('success')) {
      if (lowerQuestion.includes('cost') || lowerQuestion.includes('money') || lowerQuestion.includes('save')) return knowledgeBase.achievements.financial
      if (lowerQuestion.includes('performance') || lowerQuestion.includes('optimization')) return knowledgeBase.achievements.performance
      return `Alamin's key achievements include: 💰 $21.2M+ total financial impact ($20M+ SaaS ARR + $1.2M+ cost savings), ⚡ 40% average performance improvements, 🛡️ 99.99% system reliability, and 👥 100K+ users served across his platforms.`
    }
    
    if (lowerQuestion.includes('project') || lowerQuestion.includes('work') || lowerQuestion.includes('build')) {
      if (lowerQuestion.includes('ai') || lowerQuestion.includes('ml') || lowerQuestion.includes('mcp')) return knowledgeBase.projects.mcp
      if (lowerQuestion.includes('cost') || lowerQuestion.includes('optimization')) return knowledgeBase.projects.optimization
      if (lowerQuestion.includes('infrastructure') || lowerQuestion.includes('homelab')) return knowledgeBase.projects.infrastructure
      return "Alamin has built 6+ major projects including an AI-Powered Model Customization Platform, Cloud Cost Optimization Engine, HomeLab GitOps Infrastructure, and Alexandria multi-cloud IaC library. His projects have served 100K+ users and generated significant business impact."
    }
    
    if (lowerQuestion.includes('skill') || lowerQuestion.includes('technology') || lowerQuestion.includes('tech')) {
      if (lowerQuestion.includes('programming') || lowerQuestion.includes('language')) return knowledgeBase.skills.programming
      if (lowerQuestion.includes('cloud') || lowerQuestion.includes('aws') || lowerQuestion.includes('gcp')) return knowledgeBase.skills.cloud
      if (lowerQuestion.includes('kubernetes') || lowerQuestion.includes('docker')) return knowledgeBase.skills.orchestration
      return "Alamin has mastered 20+ technologies including Python, Go, TypeScript, AWS/GCP/Azure, Kubernetes, Docker, Terraform, and comprehensive monitoring stacks. He maintains expert-level proficiency (90%+) in 8 core technologies."
    }
    
    if (lowerQuestion.includes('leadership') || lowerQuestion.includes('team') || lowerQuestion.includes('management')) {
      return "Alamin has extensive leadership experience, achieving 90% high-profile customer satisfaction and boosting internal team satisfaction by 20%. He's led cross-functional teams improving scalability by 40% and has mentored junior engineers while driving technical excellence across organizations."
    }
    
    if (lowerQuestion.includes('contact') || lowerQuestion.includes('hire') || lowerQuestion.includes('available')) {
      return "You can connect with Alamin through his LinkedIn (linkedin.com/in/alamin-mahamud), GitHub (github.com/alamin-mahamud), or email (hello@alamin.rocks). He's passionate about solving complex infrastructure challenges and building AI-powered solutions that drive business impact."
    }
    
    // Default responses for general questions
    const defaultResponses = [
      "That's a great question! Alamin's expertise spans cloud infrastructure, AI/ML platforms, and DevOps excellence. Could you be more specific about what aspect interests you most?",
      "Alamin has achieved remarkable results in his 10+ year career. His $21.2M+ financial impact and 99.99% system reliability speak to his technical excellence. What specific area would you like to explore?",
      "With expertise in 20+ technologies and proven results across AI, cloud, and infrastructure, Alamin brings unique value to complex technical challenges. How can I help you learn more about his experience?"
    ]
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || currentMessage.trim()
    if (!text) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setCurrentMessage("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateResponse(text)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'ai',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000) // 1-2 second delay
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  useEffect(() => {
    if (isOpen && !isMinimized && messages.length === 0) {
      // Welcome message
      const welcomeMessage: Message = {
        id: 'welcome',
        content: "👋 Hi! I'm Alamin's AI assistant. I can answer questions about his experience, projects, achievements, and technical expertise. What would you like to know?",
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, isMinimized, messages.length])

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse opacity-50"></div>
          <MessageCircle size={24} className="relative z-10" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold animate-bounce">
            <Brain size={12} />
          </div>
        </button>
        <div className="absolute bottom-16 right-0 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm">
          Ask me about Alamin&apos;s experience!
        </div>
      </div>
    )
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 rounded-t-xl">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <Bot size={16} className="text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">AI Assistant</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Ask about Alamin&apos;s expertise</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto h-96 bg-gray-50 dark:bg-gray-950">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' 
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                  }`}>
                    {message.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  
                  <div className={`max-w-xs p-3 rounded-lg text-sm leading-relaxed ${
                    message.sender === 'user'
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 ml-auto'
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white'
                  }`}>
                    {message.content}
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 1 && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Quick questions:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickQuestions.slice(0, 4).map((q) => (
                  <button
                    key={q.id}
                    onClick={() => handleSendMessage(q.question)}
                    className="text-left p-2 text-xs bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all">
                    <div className="flex items-center mb-1">
                      <Sparkles size={10} className="text-blue-500 mr-1" />
                      <span className="text-blue-500 font-medium">{q.category}</span>
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 truncate">{q.question}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about Alamin's experience..."
                className="flex-1 px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:text-white"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!currentMessage.trim() || isTyping}
                className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AIAssistant