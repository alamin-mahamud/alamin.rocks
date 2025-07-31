"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { Terminal as TerminalIcon, Play, Copy, Check, ChevronRight } from "lucide-react"

interface Command {
  command: string
  output: string[]
  type: 'info' | 'success' | 'warning' | 'error'
  delay?: number
}

const Terminal = () => {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0)
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [displayedOutput, setDisplayedOutput] = useState<string[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const commands: Command[] = useMemo(() => [
    {
      command: "kubectl get pods -n production",
      output: [
        "NAME                                READY   STATUS    RESTARTS   AGE",
        "api-gateway-7d8f9c6b4d-x2k9m       1/1     Running   0          2d",
        "auth-service-5c9d8f7b2a-h4j6n      1/1     Running   0          2d", 
        "data-processor-8a7b6c5d4e-m3p8q    1/1     Running   0          1d",
        "ml-inference-9f8e7d6c5b-r7t2s      1/1     Running   0          1d",
        "monitoring-stack-4b3a2c1d9e-w5y8x  1/1     Running   0          3d"
      ],
      type: 'success'
    },
    {
      command: "aws ec2 describe-instances --query 'Reservations[*].Instances[*].[InstanceId,State.Name,InstanceType]' --output table",
      output: [
        "---------------------------------------------------------------",
        "|                    DescribeInstances                        |",
        "+---------------------+-----------+-------------------------+",
        "|  i-0abc123def456789 |  running  |      m5.xlarge         |",
        "|  i-0def456abc789012 |  running  |      c5.2xlarge        |", 
        "|  i-0ghi789def012345 |  running  |      r5.large          |",
        "+---------------------+-----------+-------------------------+",
        "",
        "💰 Optimized instances saving $45K/month through rightsizing"
      ],
      type: 'info'
    },
    {
      command: "terraform plan -var-file=prod.tfvars",
      output: [
        "Refreshing Terraform state in-memory prior to plan...",
        "",
        "------------------------------------------------------------------------",
        "",
        "An execution plan has been generated and is shown below.",
        "Resource actions are indicated with the following symbols:",
        "  + create",
        "  ~ update in-place",
        "",
        "Terraform will perform the following actions:",
        "",
        "  # aws_autoscaling_group.api_cluster will be updated in-place",
        "  ~ resource \"aws_autoscaling_group\" \"api_cluster\" {",
        "      ~ max_size = 10 -> 15",
        "    }",
        "",
        "Plan: 0 to add, 1 to change, 0 to destroy.",
        "",
        "🚀 Infrastructure scaling ready for 50% traffic increase"
      ],
      type: 'success'
    },
    {
      command: "docker stats --no-stream",
      output: [
        "CONTAINER ID   NAME              CPU %     MEM USAGE / LIMIT     MEM %     NET I/O           BLOCK I/O         PIDS",
        "a1b2c3d4e5f6   api-gateway       0.5%      256MiB / 1GiB        25.0%     1.2MB / 800kB     0B / 0B           12",
        "b2c3d4e5f6a1   ml-inference      15.2%     1.5GiB / 4GiB        37.5%     45MB / 23MB       0B / 0B           28",
        "c3d4e5f6a1b2   redis-cache       0.3%      128MiB / 512MiB      25.0%     2.1MB / 1.8MB     0B / 0B           4",
        "d4e5f6a1b2c3   postgres-main     2.1%      512MiB / 2GiB        25.0%     5.2MB / 3.1MB     12MB / 8MB        15",
        "",
        "⚡ All services running optimally within resource limits"
      ],
      type: 'success'
    },
    {
      command: "prometheus-query 'rate(http_requests_total[5m])'",
      output: [
        "# HELP http_requests_total Total HTTP requests",
        "# TYPE http_requests_total counter",
        "",
        "api_endpoint{method=\"GET\",status=\"200\"}    1247.32",
        "api_endpoint{method=\"POST\",status=\"200\"}   892.15",
        "api_endpoint{method=\"PUT\",status=\"200\"}    156.89",
        "api_endpoint{method=\"DELETE\",status=\"200\"} 23.45",
        "",
        "ml_inference{model=\"gpt-3.5\",status=\"200\"}  234.67",
        "ml_inference{model=\"bert\",status=\"200\"}     178.23",
        "",
        "📊 Peak traffic: 2.5K RPS | P99 latency: 45ms | Uptime: 99.99%"
      ],
      type: 'info'
    },
    {
      command: "git log --oneline -10",
      output: [
        "a1b2c3d feat: implement AI-powered cost optimization",
        "b2c3d4e fix: resolve memory leak in ml-inference service", 
        "c3d4e5f feat: add real-time monitoring dashboard",
        "d4e5f6a refactor: optimize database connection pooling",
        "e5f6a1b feat: implement blue-green deployment pipeline",
        "f6a1b2c fix: enhance security headers and CORS policy",
        "a1b2c3d feat: add automated backup and disaster recovery",
        "b2c3d4e perf: implement Redis caching layer",
        "c3d4e5f feat: integrate Prometheus monitoring stack",
        "d4e5f6a docs: update API documentation and examples",
        "",
        "🔄 Continuous deployment: 847 commits this year"
      ],
      type: 'success'
    }
  ], [])

  const resetDemo = () => {
    setCurrentCommandIndex(0)
    setCurrentLineIndex(0)
    setDisplayedOutput([])
    setIsTyping(false)
    setIsPlaying(false)
  }

  const startDemo = () => {
    setIsPlaying(true)
    setCurrentCommandIndex(0)
    setCurrentLineIndex(0)
    setDisplayedOutput([])
    setIsTyping(true)
  }

  const copyCommand = async (command: string, index: number) => {
    try {
      await navigator.clipboard.writeText(command)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  useEffect(() => {
    if (!isPlaying || currentCommandIndex >= commands.length) {
      if (currentCommandIndex >= commands.length && isPlaying) {
        setIsPlaying(false)
        setIsTyping(false)
      }
      return
    }

    const currentCommand = commands[currentCommandIndex]
    const delay = currentCommand.delay || 100

    if (currentLineIndex < currentCommand.output.length) {
      const timer = setTimeout(() => {
        setDisplayedOutput(prev => [...prev, currentCommand.output[currentLineIndex]])
        setCurrentLineIndex(prev => prev + 1)
        
        // Auto-scroll to bottom
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight
        }
      }, delay)

      return () => clearTimeout(timer)
    } else {
      // Move to next command after a pause
      const nextCommandTimer = setTimeout(() => {
        setCurrentCommandIndex(prev => prev + 1)
        setCurrentLineIndex(0)
        if (currentCommandIndex + 1 < commands.length) {
          setDisplayedOutput(prev => [...prev, '']) // Add blank line
        }
      }, 1500)

      return () => clearTimeout(nextCommandTimer)
    }
  }, [isPlaying, currentCommandIndex, currentLineIndex, commands])

  const getPrompt = (index: number) => {
    const user = "alamin"
    const host = "production-cluster"
    const path = "~/infrastructure"
    return `${user}@${host}:${path}$`
  }

  const getOutputColor = (type: Command['type']) => {
    switch (type) {
      case 'success': return 'text-accent'
      case 'info': return 'text-accent'
      case 'warning': return 'text-warning'
      case 'error': return 'text-destructive'
      default: return 'text-foreground'
    }
  }

  return (
    <section id="terminal" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 mono">
            $ sudo su - devops_engineer
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mono">
            # Live terminal session showcasing real-world infrastructure management
          </p>
        </div>

        {/* Terminal window */}
        <div className="bg-card rounded-lg shadow-2xl border border-border overflow-hidden max-w-5xl mx-auto">
          {/* Terminal header */}
          <div className="flex items-center justify-between px-4 py-3 bg-solarized-base02 border-b border-solarized-base01">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-solarized-red"></div>
              <div className="w-3 h-3 rounded-full bg-solarized-yellow"></div>
              <div className="w-3 h-3 rounded-full bg-solarized-green"></div>
            </div>
            
            <div className="flex items-center space-x-2">
              <TerminalIcon size={16} className="text-solarized-base1" />
              <span className="text-solarized-base1 text-sm mono">Terminal — Infrastructure Management</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={startDemo}
                disabled={isPlaying}
                className="p-2 rounded bg-solarized-green hover:bg-solarized-cyan disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Play Demo"
              >
                <Play size={14} className="text-solarized-base3" />
              </button>
              <button
                onClick={resetDemo}
                className="px-3 py-1 text-xs bg-solarized-base01 text-solarized-base1 rounded hover:bg-solarized-base00 transition-colors mono"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Terminal content */}
          <div 
            ref={terminalRef}
            className="p-4 h-96 overflow-y-auto bg-solarized-base03 text-solarized-base0 mono text-sm leading-relaxed"
          >
            {/* Welcome message */}
            <div className="mb-4 text-solarized-base1">
              <div>Last login: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</div>
              <div>Welcome to Alamin&apos;s Infrastructure Terminal</div>
              <div>💡 Click Play to see live infrastructure management commands</div>
              <div className="border-b border-solarized-base02 my-3"></div>
            </div>

            {/* Command history */}
            {commands.slice(0, currentCommandIndex + 1).map((cmd, cmdIndex) => (
              <div key={cmdIndex} className="mb-4">
                {/* Command prompt and input */}
                <div className="flex items-center group">
                  <span className="text-solarized-green mr-2">
                    {getPrompt(cmdIndex)}
                  </span>
                  <span className="text-solarized-base0 flex-1">{cmd.command}</span>
                  <button
                    onClick={() => copyCommand(cmd.command, cmdIndex)}
                    className="opacity-0 group-hover:opacity-100 p-1 ml-2 text-solarized-base1 hover:text-solarized-green transition-all"
                    title="Copy command"
                  >
                    {copiedIndex === cmdIndex ? (
                      <Check size={14} className="text-solarized-green" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>

                {/* Command output */}
                <div className={`mt-1 pl-4 ${getOutputColor(cmd.type)}`}>
                  {cmdIndex < currentCommandIndex 
                    ? cmd.output.map((line, lineIndex) => (
                        <div key={lineIndex} className="whitespace-pre-wrap">
                          {line}
                        </div>
                      ))
                    : cmdIndex === currentCommandIndex
                      ? displayedOutput.slice(
                          cmdIndex === 0 ? 0 : commands.slice(0, cmdIndex).reduce((acc, c) => acc + c.output.length + 1, 0),
                          cmdIndex === 0 ? currentLineIndex : commands.slice(0, cmdIndex).reduce((acc, c) => acc + c.output.length + 1, 0) + currentLineIndex
                        ).map((line, lineIndex) => (
                          <div key={lineIndex} className="whitespace-pre-wrap">
                            {line}
                            {lineIndex === displayedOutput.length - 1 && isTyping && (
                              <span className="animate-pulse text-solarized-green">█</span>
                            )}
                          </div>
                        ))
                      : null
                  }
                </div>
              </div>
            ))}

            {/* Current prompt if not typing */}
            {!isTyping && currentCommandIndex >= commands.length && (
              <div className="flex items-center">
                <span className="text-solarized-green mr-2">
                  {getPrompt(commands.length)}
                </span>
                <span className="animate-pulse text-solarized-green">█</span>
              </div>
            )}
          </div>
        </div>

        {/* Command reference */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card rounded-lg p-6 border border-border card-hover">
            <h3 className="text-lg font-semibold text-foreground mono mb-4 flex items-center">
              <ChevronRight className="text-solarized-green mr-2" size={20} />
              Kubernetes
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground mono">Clusters:</span>
                <span className="text-accent mono">15+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground mono">Pods:</span>
                <span className="text-accent mono">500+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground mono">Uptime:</span>
                <span className="text-accent mono">99.99%</span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border card-hover">
            <h3 className="text-lg font-semibold text-foreground mono mb-4 flex items-center">
              <ChevronRight className="text-solarized-orange mr-2" size={20} />
              AWS/Cloud
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground mono">Accounts:</span>
                <span className="text-accent mono">50+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground mono">Cost Saved:</span>
                <span className="text-accent mono">$1M+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground mono">Resources:</span>
                <span className="text-accent mono">10K+</span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border card-hover">
            <h3 className="text-lg font-semibold text-foreground mono mb-4 flex items-center">
              <ChevronRight className="text-solarized-violet mr-2" size={20} />
              Monitoring
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground mono">Metrics:</span>
                <span className="text-accent mono">50K+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground mono">Alerts:</span>
                <span className="text-accent mono">200+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground mono">MTTR:</span>
                <span className="text-accent mono">&lt;5min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center px-6 py-3 bg-solarized-base03 text-solarized-base0 rounded-lg border border-solarized-green/30 mono">
            <TerminalIcon className="text-solarized-green mr-2" size={20} />
            <span>Ready to scale your infrastructure? Let&apos;s connect.</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Terminal