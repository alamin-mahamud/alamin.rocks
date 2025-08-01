"use client"

import React from "react"
import { Sun, Moon, BookOpen, Heart, Clock, Compass, Star, Sunrise } from "lucide-react"

interface Ritual {
  name: string
  arabicName: string
  time: string
  description: string
  significance: string
  icon: React.ReactNode
  color: string
  bgColor: string
}

const DailyRituals = () => {
  const islamicRituals: Ritual[] = [
    {
      name: "Fajr Prayer",
      arabicName: "صلاة الفجر",
      time: "Before Dawn",
      description: "The first prayer of the day, performed before sunrise. A peaceful start to the day with reflection and gratitude.",
      significance: "Beginning the day with remembrance of Allah (SWT) and seeking guidance for the day ahead.",
      icon: <Sunrise className="w-6 h-6" />,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    },
    {
      name: "Morning Dhikr",
      arabicName: "أذكار الصباح",
      time: "After Fajr",
      description: "Recitation of morning supplications and remembrance of Allah, including Quran recitation and prophetic invocations.",
      significance: "Seeking protection, guidance, and blessings for the day through the remembrance of Allah.",
      icon: <Sun className="w-6 h-6" />,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10"
    },
    {
      name: "Dhuhr Prayer",
      arabicName: "صلاة الظهر",
      time: "Midday",
      description: "The noon prayer performed after the sun passes its zenith. A moment of pause and reflection during the busy day.",
      significance: "Taking a break from worldly affairs to reconnect with spiritual purpose and gratitude.",
      icon: <Sun className="w-6 h-6" />,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      name: "Asr Prayer",
      arabicName: "صلاة العصر",
      time: "Afternoon",
      description: "The afternoon prayer performed when the shadow of an object equals its length plus the length of its midday shadow.",
      significance: "Maintaining spiritual connection during the productive hours of the day.",
      icon: <Clock className="w-6 h-6" />,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10"
    },
    {
      name: "Maghrib Prayer",
      arabicName: "صلاة المغرب",
      time: "Sunset",
      description: "The evening prayer performed just after sunset. A time of gratitude for the day&apos;s provisions and blessings.",
      significance: "Expressing gratitude for the day&apos;s achievements and seeking forgiveness for shortcomings.",
      icon: <Moon className="w-6 h-6" />,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      name: "Isha Prayer",
      arabicName: "صلاة العشاء",
      time: "Night",
      description: "The final prayer of the day, performed after the twilight has disappeared. Ending the day with reflection and peace.",
      significance: "Concluding the day with remembrance of Allah and preparation for restful sleep.",
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
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Following the blessed example of Prophet Muhammad (PBUH) through daily Islamic practices that bring peace, purpose, and spiritual growth
          </p>
          <div className="flex items-center justify-center mt-6 gap-2">
            <div className="text-accent text-sm font-medium">
              ☪️ Practicing Muslim • Following the Sunnah • Seeking Allah&apos;s Guidance
            </div>
          </div>
        </div>

        {/* Prayer Clock */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Daily Prayer Schedule (Salah)
          </h3>
          
          {/* Clock Display */}
          <div className="relative mx-auto mb-12" style={{ width: '400px', height: '400px' }}>
            {/* Clock Circle */}
            <div className="absolute inset-0 border-4 border-accent/20 rounded-full bg-gradient-to-br from-card to-muted/50"></div>
            
            {/* Clock Center */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-accent rounded-full shadow-lg flex items-center justify-center">
              <div className="text-accent-foreground text-xs font-bold">☪️</div>
            </div>

            {/* Prayer Times on Clock */}
            {islamicRituals.map((ritual, index) => {
              // Position prayers around the clock (roughly based on typical prayer times)
              const angles = [45, 0, 180, 225, 315, 270]; // Fajr, Morning Dhikr, Dhuhr, Asr, Maghrib, Isha
              const angle = angles[index] || 0;
              const radius = 160;
              const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
              const y = Math.sin((angle - 90) * Math.PI / 180) * radius;
              
              return (
                <div
                  key={index}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{
                    left: `${200 + x}px`,
                    top: `${200 + y}px`,
                    animationDelay: `${index * 200}ms`
                  }}
                >
                  {/* Prayer Indicator */}
                  <div className={`w-16 h-16 ${ritual.bgColor} rounded-full border-2 border-card shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <div className={ritual.color}>
                      {ritual.icon}
                    </div>
                  </div>
                  
                  {/* Prayer Info Tooltip */}
                  <div className="absolute top-20 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <div className="bg-card border border-border rounded-lg p-3 shadow-xl whitespace-nowrap">
                      <div className="text-sm font-semibold text-foreground">{ritual.name}</div>
                      <div className="text-xs text-accent">{ritual.arabicName}</div>
                      <div className="text-xs text-muted-foreground">{ritual.time}</div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Clock Labels */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground font-medium">Dawn</div>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground font-medium">Day</div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground font-medium">Night</div>
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground font-medium">Evening</div>
          </div>

          {/* Prayer Details Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {islamicRituals.map((ritual, index) => (
              <div
                key={index}
                className="bg-card/50 rounded-lg border border-border/50 p-4 hover:bg-card hover:border-accent/30 transition-all duration-300"
                style={{ animationDelay: `${index * 100 + 600}ms` }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-8 h-8 ${ritual.bgColor} rounded-lg flex items-center justify-center`}>
                    <div className={`${ritual.color} scale-75`}>
                      {ritual.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{ritual.name}</h4>
                    <p className="text-xs text-muted-foreground">{ritual.time}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
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
                className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-lg hover:border-accent/30 transition-all duration-300"
                style={{ animationDelay: `${(index + 6) * 100}ms` }}
              >
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <div className="text-accent">
                    {practice.icon}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{practice.name}</h4>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-500" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Integrity (Amanah)</h4>
              <p className="text-muted-foreground text-sm">
                Maintaining honesty, trustworthiness, and ethical conduct in all professional endeavors.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Compass className="w-8 h-8 text-blue-500" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Excellence (Ihsan)</h4>
              <p className="text-muted-foreground text-sm">
                Striving for excellence in work as if Allah is watching, delivering quality and value.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-purple-500" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Knowledge (Ilm)</h4>
              <p className="text-muted-foreground text-sm">
                Continuous learning and sharing knowledge as a means of worship and service to humanity.
              </p>
            </div>
          </div>
        </div>

        {/* Inspirational Quote */}
        <div className="text-center bg-gradient-to-r from-accent/10 to-accent/5 rounded-xl p-8">
          <div className="mb-4">
            <div className="text-3xl mb-2">☪️</div>
            <blockquote className="text-xl font-medium text-foreground mb-4">
              &ldquo;And it is He who created the heavens and earth in truth. And the day He says, &lsquo;Be,&rsquo; and it is, His word is the truth.&rdquo;
            </blockquote>
            <cite className="text-muted-foreground text-sm">— Quran 6:73</cite>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
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