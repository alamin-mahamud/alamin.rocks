import { Project } from "./api"

interface ProjectTemplate {
  titlePatterns: string[]
  descriptionPatterns: string[]
  categories: string[]
  technologies: string[][]
  impactMetrics: {
    users?: [number, number]
    performance?: string[]
    savings?: string[]
    reliability?: string[]
  }
}

const projectTemplates: Record<string, ProjectTemplate> = {
  "AI/ML": {
    titlePatterns: [
      "AI-Powered {domain} {solution}",
      "Machine Learning {application} for {industry}",
      "Deep Learning {framework} - {useCase}",
      "Neural Network {architecture} Implementation",
      "Computer Vision {application} System",
      "NLP-Based {tool} for {purpose}",
      "Predictive Analytics {platform} for {sector}",
      "Reinforcement Learning {agent} for {task}",
      "Generative AI {model} for {creation}",
      "MLOps Pipeline for {deployment}"
    ],
    descriptionPatterns: [
      "Revolutionary {adjective} solution leveraging {tech} to {outcome} achieving {metric} improvement",
      "End-to-end {type} platform featuring {feature1}, {feature2}, and {feature3} capabilities",
      "Enterprise-grade {category} system using {algorithm} for {purpose} with {result}",
      "Cutting-edge {domain} application implementing {technique} to deliver {benefit}",
      "Advanced {field} framework utilizing {method} for optimal {goal} performance"
    ],
    categories: ["AI/ML"],
    technologies: [
      ["Python", "TensorFlow", "PyTorch", "scikit-learn", "Keras", "NumPy", "Pandas"],
      ["FastAPI", "Docker", "Kubernetes", "AWS SageMaker", "MLflow", "Weights & Biases"],
      ["OpenCV", "NLTK", "spaCy", "Transformers", "BERT", "GPT", "YOLO"],
      ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "Apache Kafka"],
      ["Jupyter", "Streamlit", "Gradio", "Flask", "React", "Next.js"]
    ],
    impactMetrics: {
      users: [1000, 500000],
      performance: ["95% accuracy", "80% faster inference", "50% reduced latency", "10x throughput increase"],
      savings: ["$100K+ operational savings", "$500K+ productivity gains", "$1M+ revenue impact"],
      reliability: ["99.9% model uptime", "Zero-downtime deployments", "Real-time predictions"]
    }
  },
  "DevOps/SRE": {
    titlePatterns: [
      "Cloud-Native {infrastructure} Platform",
      "Kubernetes {automation} Framework",
      "CI/CD Pipeline for {scale} Deployments",
      "Infrastructure as Code - {cloudProvider}",
      "Monitoring & Observability {stack}",
      "Service Mesh Implementation - {technology}",
      "Container Orchestration {solution}",
      "GitOps Workflow for {environment}",
      "SRE Toolkit - {focus}",
      "Multi-Cloud {management} System"
    ],
    descriptionPatterns: [
      "Comprehensive {type} solution enabling {capability} with {metric} improvement in deployment efficiency",
      "Production-grade {category} platform supporting {scale} deployments across {scope}",
      "Automated {process} framework reducing {pain_point} by {percentage} through {approach}",
      "Enterprise {solution} delivering {benefit1}, {benefit2}, and {benefit3} for modern infrastructure",
      "Scalable {system} architecture handling {load} with {availability} SLA"
    ],
    categories: ["DevOps/SRE"],
    technologies: [
      ["Kubernetes", "Docker", "Helm", "Kustomize", "ArgoCD", "FluxCD"],
      ["Terraform", "Ansible", "CloudFormation", "Pulumi", "AWS CDK"],
      ["Jenkins", "GitLab CI", "GitHub Actions", "CircleCI", "Tekton"],
      ["Prometheus", "Grafana", "ELK Stack", "Datadog", "New Relic", "Splunk"],
      ["AWS", "GCP", "Azure", "DigitalOcean", "Linode"],
      ["Istio", "Linkerd", "Consul", "Traefik", "NGINX", "HAProxy"]
    ],
    impactMetrics: {
      users: [50, 100000],
      performance: ["90% faster deployments", "75% reduced MTTR", "60% less downtime", "5x deployment frequency"],
      savings: ["$200K+ infrastructure savings", "$800K+ operational efficiency", "$1.5M+ prevented outages"],
      reliability: ["99.99% uptime", "Zero-downtime deployments", "Automated failover"]
    }
  },
  "Infrastructure": {
    titlePatterns: [
      "Enterprise {network} Architecture",
      "Hybrid Cloud {integration} Platform",
      "Bare-Metal {orchestration} System",
      "Software-Defined {infrastructure} Solution",
      "Edge Computing {deployment} Framework",
      "High-Performance {computing} Cluster",
      "Disaster Recovery {automation} Suite",
      "Infrastructure Security {hardening} Toolkit",
      "Multi-Region {replication} System",
      "Cloud Migration {assessment} Platform"
    ],
    descriptionPatterns: [
      "Robust {type} infrastructure supporting {capacity} with {reliability} availability",
      "Next-generation {category} platform enabling {capability} across {scope} environments",
      "Highly available {solution} architecture delivering {metric} performance improvement",
      "Secure {system} implementation protecting {asset} with {standard} compliance",
      "Efficient {infrastructure} design reducing {cost} while maintaining {quality}"
    ],
    categories: ["Infrastructure"],
    technologies: [
      ["Linux", "VMware", "OpenStack", "Proxmox", "KVM", "Hyper-V"],
      ["Cisco", "Juniper", "Arista", "pfSense", "OPNsense", "VyOS"],
      ["Ceph", "GlusterFS", "ZFS", "NFS", "iSCSI", "S3"],
      ["BGP", "OSPF", "VXLAN", "MPLS", "SD-WAN", "VPN"],
      ["Puppet", "Chef", "SaltStack", "Packer", "Vagrant"],
      ["Nagios", "Zabbix", "Icinga", "PRTG", "LibreNMS"]
    ],
    impactMetrics: {
      users: [100, 50000],
      performance: ["10Gbps throughput", "sub-millisecond latency", "99.999% availability", "PB-scale storage"],
      savings: ["$300K+ hardware optimization", "$600K+ energy efficiency", "$2M+ operational savings"],
      reliability: ["Tier 4 datacenter standards", "N+2 redundancy", "Automated DR"]
    }
  },
  "Social Impact": {
    titlePatterns: [
      "{cause} Empowerment Platform",
      "Community {service} Application",
      "Non-Profit {management} System",
      "Educational {resource} Portal",
      "Healthcare {access} Solution",
      "Environmental {monitoring} Network",
      "Humanitarian {aid} Coordinator",
      "Social {justice} Toolkit",
      "Volunteer {matching} Platform",
      "Crisis {response} System"
    ],
    descriptionPatterns: [
      "Impactful {type} platform connecting {stakeholder1} with {stakeholder2} to {outcome}",
      "Community-driven {solution} addressing {challenge} through {approach} technology",
      "Accessible {system} enabling {population} to {benefit} with {metric} reach",
      "Sustainable {initiative} supporting {cause} via {method} achieving {impact}",
      "Inclusive {platform} democratizing {resource} for {community} empowerment"
    ],
    categories: ["Social Impact"],
    technologies: [
      ["React", "Vue.js", "Angular", "Next.js", "React Native", "Flutter"],
      ["Node.js", "Express", "NestJS", "Django", "Ruby on Rails", "Phoenix"],
      ["PostgreSQL", "MySQL", "MongoDB", "Firebase", "Supabase"],
      ["Stripe", "PayPal", "Square", "Blockchain", "Web3"],
      ["Twilio", "SendGrid", "Pusher", "Socket.io", "WebRTC"],
      ["Google Maps", "Mapbox", "OpenStreetMap", "Geolocation APIs"]
    ],
    impactMetrics: {
      users: [500, 1000000],
      performance: ["100K+ beneficiaries", "50+ partner organizations", "Global reach", "24/7 availability"],
      savings: ["$1M+ social value created", "$500K+ resources distributed", "$2M+ community impact"],
      reliability: ["Multi-language support", "Offline capability", "Accessibility compliant"]
    }
  }
}

const domainOptions = ["Healthcare", "Finance", "Retail", "Education", "Manufacturing", "Logistics", "Energy", "Agriculture", "Transportation", "Entertainment"]
const solutionTypes = ["Optimizer", "Analyzer", "Predictor", "Automator", "Monitor", "Assistant", "Engine", "Platform", "Framework", "Toolkit"]
const adjectives = ["innovative", "scalable", "robust", "intelligent", "adaptive", "real-time", "distributed", "secure", "efficient", "comprehensive"]
const techTerms = ["AI", "ML", "Deep Learning", "Computer Vision", "NLP", "Blockchain", "IoT", "Edge Computing", "Quantum", "AR/VR"]
const outcomes = ["optimize operations", "enhance efficiency", "reduce costs", "improve accuracy", "accelerate growth", "enable insights", "streamline processes", "maximize ROI", "ensure compliance", "drive innovation"]

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateProjectTitle(template: string, category: string): string {
  const replacements: Record<string, string> = {
    domain: getRandomElement(domainOptions),
    solution: getRandomElement(solutionTypes),
    application: getRandomElement(["System", "Platform", "Solution", "Tool", "Suite"]),
    industry: getRandomElement(domainOptions),
    framework: getRandomElement(["Framework", "Architecture", "Pipeline", "Workflow"]),
    useCase: getRandomElement(["Optimization", "Analysis", "Prediction", "Automation", "Detection"]),
    architecture: getRandomElement(["CNN", "RNN", "LSTM", "Transformer", "GAN", "VAE"]),
    tool: getRandomElement(["Assistant", "Analyzer", "Generator", "Processor", "Extractor"]),
    purpose: getRandomElement(["Business Intelligence", "Customer Experience", "Risk Management", "Quality Control"]),
    platform: getRandomElement(["Dashboard", "Portal", "Hub", "Console", "Studio"]),
    sector: getRandomElement(domainOptions),
    agent: getRandomElement(["Agent", "Bot", "System", "Controller", "Optimizer"]),
    task: getRandomElement(["Resource Allocation", "Task Scheduling", "Route Optimization", "Game Strategy"]),
    model: getRandomElement(["Model", "Engine", "System", "Network", "Pipeline"]),
    creation: getRandomElement(["Content Creation", "Design Generation", "Code Synthesis", "Music Composition"]),
    deployment: getRandomElement(["Model Deployment", "Pipeline Automation", "Version Control", "A/B Testing"]),
    infrastructure: getRandomElement(["Infrastructure", "Architecture", "Ecosystem", "Environment"]),
    automation: getRandomElement(["Automation", "Orchestration", "Management", "Provisioning"]),
    scale: getRandomElement(["Enterprise", "Global", "Multi-Region", "High-Volume"]),
    cloudProvider: getRandomElement(["AWS", "GCP", "Azure", "Multi-Cloud"]),
    stack: getRandomElement(["Stack", "Suite", "Platform", "Solution"]),
    technology: getRandomElement(["Istio", "Linkerd", "Consul", "Envoy"]),
    environment: getRandomElement(["Production", "Multi-Environment", "Hybrid Cloud", "Edge"]),
    focus: getRandomElement(["Reliability", "Performance", "Security", "Automation"]),
    management: getRandomElement(["Management", "Orchestration", "Governance", "Optimization"]),
    network: getRandomElement(["Network", "Infrastructure", "Connectivity", "Architecture"]),
    integration: getRandomElement(["Integration", "Migration", "Connectivity", "Synchronization"]),
    orchestration: getRandomElement(["Orchestration", "Management", "Provisioning", "Automation"]),
    computing: getRandomElement(["Computing", "Processing", "Analytics", "Workload"]),
    hardening: getRandomElement(["Hardening", "Compliance", "Monitoring", "Protection"]),
    replication: getRandomElement(["Replication", "Synchronization", "Backup", "Distribution"]),
    assessment: getRandomElement(["Assessment", "Planning", "Execution", "Validation"]),
    cause: getRandomElement(["Youth", "Women", "Education", "Health", "Environment"]),
    service: getRandomElement(["Service", "Support", "Resource", "Network"]),
    resource: getRandomElement(["Learning", "Training", "Knowledge", "Skill"]),
    access: getRandomElement(["Access", "Delivery", "Management", "Tracking"]),
    monitoring: getRandomElement(["Monitoring", "Tracking", "Analysis", "Reporting"]),
    aid: getRandomElement(["Aid", "Relief", "Support", "Assistance"]),
    justice: getRandomElement(["Justice", "Equity", "Rights", "Advocacy"]),
    matching: getRandomElement(["Matching", "Coordination", "Management", "Scheduling"]),
    response: getRandomElement(["Response", "Management", "Coordination", "Communication"])
  }
  
  return template.replace(/{(\w+)}/g, (match, key) => replacements[key] || match)
}

function generateTechnologies(techArrays: string[][]): string[] {
  const numArrays = getRandomInt(2, Math.min(4, techArrays.length))
  const selectedTechs = new Set<string>()
  
  for (let i = 0; i < numArrays; i++) {
    const techArray = getRandomElement(techArrays)
    const numTechs = getRandomInt(2, Math.min(5, techArray.length))
    
    for (let j = 0; j < numTechs; j++) {
      selectedTechs.add(getRandomElement(techArray))
    }
  }
  
  return Array.from(selectedTechs)
}

function generateImpactMetrics(template: ProjectTemplate["impactMetrics"]): Record<string, any> {
  const impact: Record<string, any> = {}
  
  if (template.users && Math.random() > 0.3) {
    impact.users = getRandomInt(template.users[0], template.users[1])
  }
  
  if (template.performance && Math.random() > 0.4) {
    impact.performance = getRandomElement(template.performance)
  }
  
  if (template.savings && Math.random() > 0.5) {
    impact.savings = getRandomElement(template.savings)
  }
  
  if (template.reliability && Math.random() > 0.4) {
    impact.reliability = getRandomElement(template.reliability)
  }
  
  return impact
}

function generateDescription(pattern: string): string {
  const replacements: Record<string, string> = {
    adjective: getRandomElement(adjectives),
    tech: getRandomElement(techTerms),
    outcome: getRandomElement(outcomes),
    metric: getRandomElement(["50%", "2x", "10x", "75%", "90%", "3x"]),
    type: getRandomElement(["enterprise", "cloud-native", "AI-driven", "automated", "intelligent"]),
    feature1: getRandomElement(["real-time processing", "automated scaling", "predictive analytics", "intelligent routing"]),
    feature2: getRandomElement(["advanced monitoring", "self-healing", "anomaly detection", "resource optimization"]),
    feature3: getRandomElement(["seamless integration", "multi-tenant support", "edge computing", "blockchain verification"]),
    category: getRandomElement(["analytics", "automation", "optimization", "orchestration", "intelligence"]),
    algorithm: getRandomElement(["neural networks", "gradient boosting", "transformer models", "reinforcement learning"]),
    purpose: getRandomElement(["business optimization", "customer satisfaction", "operational efficiency", "risk mitigation"]),
    result: getRandomElement(["unprecedented accuracy", "significant cost savings", "enhanced performance", "improved reliability"]),
    domain: getRandomElement(domainOptions),
    field: getRandomElement(["AI", "ML", "analytics", "automation", "optimization"]),
    technique: getRandomElement(["state-of-the-art algorithms", "cutting-edge technology", "innovative approaches", "advanced methodologies"]),
    benefit: getRandomElement(["transformative results", "measurable impact", "competitive advantage", "operational excellence"]),
    method: getRandomElement(["machine learning", "AI", "automation", "optimization", "analytics"]),
    goal: getRandomElement(["business", "operational", "customer", "financial", "strategic"]),
    capability: getRandomElement(["seamless scaling", "intelligent automation", "predictive insights", "real-time optimization"]),
    scale: getRandomElement(["10K+", "100K+", "1M+", "global", "enterprise"]),
    scope: getRandomElement(["multiple regions", "hybrid environments", "diverse platforms", "various industries"]),
    process: getRandomElement(["deployment", "provisioning", "configuration", "monitoring", "optimization"]),
    pain_point: getRandomElement(["manual toil", "deployment time", "operational overhead", "incident response time"]),
    percentage: getRandomElement(["50%", "70%", "80%", "90%", "95%"]),
    approach: getRandomElement(["intelligent automation", "GitOps", "Infrastructure as Code", "container orchestration"]),
    solution: getRandomElement(["platform", "framework", "toolkit", "system", "architecture"]),
    benefit1: getRandomElement(["cost optimization", "enhanced security", "improved reliability", "faster deployments"]),
    benefit2: getRandomElement(["automated scaling", "seamless integration", "comprehensive monitoring", "disaster recovery"]),
    benefit3: getRandomElement(["compliance automation", "multi-cloud support", "zero-downtime updates", "intelligent routing"]),
    system: getRandomElement(["infrastructure", "platform", "architecture", "framework", "solution"]),
    load: getRandomElement(["millions of requests", "PB-scale data", "thousands of containers", "global traffic"]),
    availability: getRandomElement(["99.9%", "99.99%", "99.999%", "five nines", "six nines"]),
    capacity: getRandomElement(["10K nodes", "1M requests/sec", "PB storage", "global scale"]),
    reliability: getRandomElement(["99.99%", "99.999%", "fault-tolerant", "highly available", "resilient"]),
    asset: getRandomElement(["critical infrastructure", "sensitive data", "customer information", "intellectual property"]),
    standard: getRandomElement(["SOC2", "ISO 27001", "HIPAA", "PCI-DSS", "GDPR"]),
    cost: getRandomElement(["operational costs", "infrastructure spend", "maintenance overhead", "energy consumption"]),
    quality: getRandomElement(["high performance", "reliability", "security", "compliance"]),
    stakeholder1: getRandomElement(["volunteers", "donors", "communities", "organizations", "beneficiaries"]),
    stakeholder2: getRandomElement(["causes", "projects", "initiatives", "opportunities", "resources"]),
    challenge: getRandomElement(["inequality", "accessibility", "education gaps", "healthcare access", "environmental issues"]),
    population: getRandomElement(["underserved communities", "students", "patients", "volunteers", "organizations"]),
    community: getRandomElement(["local", "global", "underrepresented", "disadvantaged", "rural"])
  }
  
  return pattern.replace(/{(\w+)}/g, (match, key) => replacements[key] || match)
}

export function generateProjects(count: number): Project[] {
  const projects: Project[] = []
  const categories = Object.keys(projectTemplates)
  
  for (let i = 0; i < count; i++) {
    const category = getRandomElement(categories)
    const template = projectTemplates[category]
    
    const titlePattern = getRandomElement(template.titlePatterns)
    const title = generateProjectTitle(titlePattern, category)
    
    const descriptionPattern = getRandomElement(template.descriptionPatterns)
    const description = generateDescription(descriptionPattern)
    const longDescription = description + " " + generateDescription(getRandomElement(template.descriptionPatterns))
    
    const technologies = generateTechnologies(template.technologies)
    const impact = generateImpactMetrics(template.impactMetrics)
    
    const isFeatured = Math.random() > 0.85
    const hasGithub = Math.random() > 0.3
    const hasLive = Math.random() > 0.5
    const hasDemo = Math.random() > 0.7
    const isAiPowered = category === "AI/ML" || Math.random() > 0.8
    
    const project: Project = {
      id: `project-${i + 8}`, // Start from 8 to not conflict with existing projects
      title,
      description: description.substring(0, 150) + "...",
      long_description: longDescription,
      technologies,
      github_url: hasGithub ? `https://github.com/alamin-mahamud/${title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}` : undefined,
      live_url: hasLive ? `https://${title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.alamin.rocks` : undefined,
      demo_url: hasDemo ? `https://demo.${title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.alamin.rocks` : undefined,
      featured: isFeatured,
      category: template.categories[0],
      impact,
      stats: {
        stars: hasGithub ? getRandomInt(10, 1000) : 0,
        forks: hasGithub ? getRandomInt(5, 200) : 0,
        commits: getRandomInt(50, 2000),
        contributors: getRandomInt(1, 15)
      },
      status: getRandomElement(["completed", "in-progress", "maintained"]),
      ai_powered: isAiPowered
    }
    
    projects.push(project)
  }
  
  return projects
}