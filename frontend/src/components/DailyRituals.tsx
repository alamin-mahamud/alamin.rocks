"use client"

import React from "react"
import { Sun, Moon, BookOpen, Heart, Compass, Star, Sunrise } from "lucide-react"

interface Ritual {
  name: string
  arabicName: string
  time: string
  description: string
  icon: React.ReactNode
  color: string
  bgColor: string
}

interface ScheduleBlock {
  block: string
  work: string
  deliverables?: string
}

interface SuperObjective {
  title: string
  by: string
  outcome: string
}

const DailyRituals = () => {
  const superObjectives: SuperObjective[] = [
    {
      title: "Allah SWT's Satisfaction",
      by: "By",
      outcome: "Eventually"
    },
    {
      title: "Dawah (Inviting)",
      by: "Read the Quran (Read Bengali Translation and Tafsirs)",
      outcome: "Muslim Scholar, Mentor"
    },
    {
      title: "Khilafah (Caretaking)",
      by: "Q3 - Kahf - Become the best employee of Kahf",
      outcome: "Business Entrepreneur, Investor, Nation Builder"
    },
    {
      title: "Warrior",
      by: "CR7 - 2H Strength & Stretching",
      outcome: "CR7 Fitness Inshallah."
    }
  ]

  const schedule: ScheduleBlock[] = [
    {
      block: "Isha - Tahajjud Prayer (0900-0330)",
      work: "(Mandatory) - Sleep"
    },
    {
      block: "Tahajjud - Fajr Prayer (0330-0430)",
      work: "(Dawah) - Tahajjud, Quran, Fajr"
    },
    {
      block: "Fajr - Asr Prayer (0430-1700)",
      work: "(Khilafah) - Ihsan + Ilm"
    },
    {
      block: "Asr Prayer - Magrib Prayer (1700-1900)",
      work: "(Warrior) - CR7 Work Ethic"
    },
    {
      block: "Magrib - Isha Prayer (1900-2100)",
      work: "(Family Time) or Ilm"
    }
  ]

  const islamicRituals: Ritual[] = [
    {
      name: "Fajr Prayer",
      arabicName: "صلاة الفجر",
      time: "Before Dawn",
      description: "The first prayer of the day, performed before sunrise. A peaceful start to the day with reflection and gratitude.",
      icon: <Sunrise className="w-6 h-6" />,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    },
    {
      name: "Morning Dhikr",
      arabicName: "أذكار الصباح",
      time: "After Fajr",
      description: "Recitation of morning supplications and remembrance of Allah, including Quran recitation and prophetic invocations.",
      icon: <Sun className="w-6 h-6" />,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10"
    },
    {
      name: "Dhuhr Prayer",
      arabicName: "صلاة الظهر",
      time: "Midday",
      description: "The noon prayer performed after the sun passes its zenith. A moment of pause and reflection during the busy day.",
      icon: <Sun className="w-6 h-6" />,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      name: "Asr Prayer",
      arabicName: "صلاة العصر",
      time: "Afternoon",
      description: "The afternoon prayer performed when the shadow of an object equals its length plus the length of its midday shadow.",
      icon: <Compass className="w-6 h-6" />,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10"
    },
    {
      name: "Maghrib Prayer",
      arabicName: "صلاة المغرب",
      time: "Sunset",
      description: "The evening prayer performed just after sunset. A time of gratitude for the day&apos;s provisions and blessings.",
      icon: <Moon className="w-6 h-6" />,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      name: "Isha Prayer",
      arabicName: "صلاة العشاء",
      time: "Night",
      description: "The final prayer of the day, performed after the twilight has disappeared. Ending the day with reflection and peace.",
      icon: <Star className="w-6 h-6" />,
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10"
    }
  ]

  const additionalPractices = [
    {
      name: "Quran Recitation",
      description: "Daily recitation and reflection on the Holy Quran",
      frequency: "Daily",
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      name: "Sunnah Prayers",
      description: "Optional prayers following the example of Prophet Muhammad (PBUH)",
      frequency: "Throughout the day",
      icon: <Compass className="w-5 h-5" />
    },
    {
      name: "Istighfar",
      description: "Seeking forgiveness and repentance",
      frequency: "Continuous",
      icon: <Heart className="w-5 h-5" />
    },
    {
      name: "Gratitude & Reflection",
      description: "Counting blessings and reflecting on daily experiences",
      frequency: "Evening",
      icon: <Star className="w-5 h-5" />
    }
  ]

  return (
    <section id="daily-rituals" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Daily Rituals & Spiritual Practice
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Following the blessed example of Prophet Muhammad (PBUH) through daily Islamic practices that bring peace, purpose, and spiritual growth in both personal and professional life
          </p>
          <div className="flex items-center justify-center mt-6 gap-2">
            <div className="text-accent text-sm font-medium">
              ☪️ Practicing Muslim • Following the Sunnah • Seeking Allah&apos;s Guidance
            </div>
          </div>
        </div>

        {/* Super Objectives */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Super Objectives (Inshallah)
          </h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {superObjectives.map((objective, index) => (
              <div
                key={index}
                className="bg-card rounded-xl border border-border p-6 hover:shadow-lg hover:border-accent/30 transition-all duration-300"
              >
                <h4 className="text-lg font-semibold text-foreground mb-3">{objective.title}</h4>
                <div className="space-y-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">{objective.by}</span>
                    <span className="text-sm font-medium text-accent">{objective.outcome}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Schedule */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Daily Schedule
          </h3>
          <div className="max-w-4xl mx-auto bg-card rounded-xl border border-border overflow-hidden">
            <div className="grid grid-cols-2 bg-accent/10 p-4 border-b border-border">
              <div className="text-sm font-semibold text-foreground">Block</div>
              <div className="text-sm font-semibold text-foreground">Work / Deliverables</div>
            </div>
            {schedule.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-2 p-4 hover:bg-muted/50 transition-colors border-b border-border/50 last:border-b-0"
              >
                <div className="text-sm text-foreground pr-4">{item.block}</div>
                <div className="text-sm text-muted-foreground">{item.work}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Prayer Schedule */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Daily Prayer Schedule (Salah)
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {islamicRituals.map((ritual, index) => (
              <div
                key={index}
                className="group bg-card rounded-xl border border-border p-6 hover:shadow-lg hover:border-accent/30 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 ${ritual.bgColor} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <div className={ritual.color}>
                      {ritual.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                      {ritual.name}
                    </h4>
                    <p className="text-sm text-accent font-medium mb-1">{ritual.arabicName}</p>
                    <p className="text-xs text-muted-foreground">{ritual.time}</p>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {ritual.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Practices */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Additional Daily Practices
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalPractices.map((practice, index) => (
              <div
                key={index}
                className="group bg-card rounded-xl border border-border p-6 text-center hover:shadow-lg hover:border-accent/30 transition-all duration-300"
                style={{ animationDelay: `${(index + 6) * 100}ms` }}
              >
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-accent">
                    {practice.icon}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">{practice.name}</h4>
                <p className="text-muted-foreground text-sm mb-3">{practice.description}</p>
                <div className="inline-flex items-center px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                  {practice.frequency}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Islamic Values in Professional Life */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Islamic Values in Professional Life
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center p-6 bg-card rounded-xl border border-border hover:shadow-lg hover:border-accent/30 transition-all duration-300">
              <div className="w-16 h-16 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-8 h-8 text-green-500" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">Integrity (Amanah)</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Maintaining honesty, trustworthiness, and ethical conduct in all professional endeavors.
              </p>
            </div>
            <div className="group text-center p-6 bg-card rounded-xl border border-border hover:shadow-lg hover:border-accent/30 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Compass className="w-8 h-8 text-blue-500" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">Excellence (Ihsan)</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Striving for excellence in work as if Allah is watching, delivering quality and value.
              </p>
            </div>
            <div className="group text-center p-6 bg-card rounded-xl border border-border hover:shadow-lg hover:border-accent/30 transition-all duration-300">
              <div className="w-16 h-16 bg-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-8 h-8 text-purple-500" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">Knowledge (Ilm)</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Continuous learning and sharing knowledge as a means of worship and service to humanity.
              </p>
            </div>
          </div>
        </div>

        {/* Inspirational Quote */}
        <div className="text-center bg-gradient-to-r from-accent/10 to-accent/5 rounded-xl p-8 border border-accent/20">
          <div className="mb-6">
            <div className="text-4xl mb-4">☪️</div>
            <blockquote className="text-xl font-medium text-foreground mb-4 leading-relaxed">
              &ldquo;And it is He who created the heavens and earth in truth. And the day He says, &lsquo;Be,&rsquo; and it is, His word is the truth.&rdquo;
            </blockquote>
            <cite className="text-accent font-medium">— Quran 6:73</cite>
          </div>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            These daily rituals provide structure, peace, and purpose to my life, influencing how I approach challenges, 
            treat others, and strive for excellence in both personal and professional endeavors. Following the blessed 
            example of Prophet Muhammad (PBUH) brings balance and meaning to the journey of life.
          </p>
        </div>
      </div>
    </section>
  )
}

export default DailyRituals