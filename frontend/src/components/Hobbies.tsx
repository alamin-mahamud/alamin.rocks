"use client"

import React from "react"
import { Bike, Camera, Mountain, Coffee, Headphones, Gamepad2, Plane, BookOpen } from "lucide-react"

interface Hobby {
  name: string
  description: string
  icon: React.ReactNode
  color: string
  bgColor: string
  details: string[]
  frequency: string
}

const Hobbies = () => {
  const hobbies: Hobby[] = [
    {
      name: "Bike Riding",
      description: "Passionate cyclist exploring scenic routes and maintaining fitness through regular rides",
      icon: <Bike className="w-8 h-8" />,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      details: [
        "Weekend long-distance rides (50+ km)",
        "Mountain biking on challenging terrains",
        "Urban cycling for daily commute",
        "Bike maintenance and customization"
      ],
      frequency: "4-5 times per week"
    },
    {
      name: "Photography",
      description: "Capturing moments through the lens, focusing on landscapes, technology, and street photography",
      icon: <Camera className="w-8 h-8" />,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      details: [
        "Landscape and nature photography",
        "Technology and workspace setups",
        "Street photography during travels",
        "Photo editing and post-processing"
      ],
      frequency: "2-3 times per week"
    },
    {
      name: "Hiking & Trekking",
      description: "Exploring nature trails and mountain peaks for adventure and mental clarity",
      icon: <Mountain className="w-8 h-8" />,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      details: [
        "Weekend hiking trips to local trails",
        "Multi-day trekking expeditions",
        "Rock climbing and bouldering",
        "Camping under the stars"
      ],
      frequency: "2-3 times per month"
    },
    {
      name: "Coffee Brewing",
      description: "Exploring different coffee brewing methods and discovering unique flavor profiles",
      icon: <Coffee className="w-8 h-8" />,
      color: "text-amber-600",
      bgColor: "bg-amber-600/10",
      details: [
        "V60 pour-over techniques",
        "French press and cold brew methods",
        "Exploring single-origin beans",
        "Latte art practice"
      ],
      frequency: "Daily ritual"
    },
    {
      name: "Music & Podcasts",
      description: "Avid listener of diverse music genres and educational podcasts for continuous learning",
      icon: <Headphones className="w-8 h-8" />,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      details: [
        "Progressive rock and jazz fusion",
        "Tech and engineering podcasts",
        "Discovering new artists and genres",
        "Curating playlists for different moods"
      ],
      frequency: "Daily"
    },
    {
      name: "Gaming",
      description: "Strategy games and puzzles that challenge problem-solving skills and provide relaxation",
      icon: <Gamepad2 className="w-8 h-8" />,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      details: [
        "Strategy and simulation games",
        "Puzzle and brain training games",
        "Occasional multiplayer sessions",
        "Game development as a hobby"
      ],
      frequency: "2-3 times per week"
    },
    {
      name: "Travel & Exploration",
      description: "Discovering new cultures, cuisines, and experiences through travel adventures",
      icon: <Plane className="w-8 h-8" />,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      details: [
        "Cultural immersion and local experiences",
        "Food exploration and cooking experiments",
        "Historical site visits",
        "Meeting people from different backgrounds"
      ],
      frequency: "Seasonal trips"
    },
    {
      name: "Reading",
      description: "Continuous learning through books on technology, philosophy, and personal development",
      icon: <BookOpen className="w-8 h-8" />,
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
      details: [
        "Technical books and documentation",
        "Philosophy and psychology",
        "Biographies of inspiring leaders",
        "Science fiction and speculative fiction"
      ],
      frequency: "Daily reading habit"
    }
  ]

  return (
    <section id="hobbies" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Hobbies & Interests
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Life beyond code - exploring passions that fuel creativity, maintain balance, and inspire innovation
          </p>
        </div>

        {/* Featured Hobby - Bike Riding */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-green-500/10 to-green-400/5 rounded-2xl p-8 border border-green-500/20">
            <div className="flex flex-col lg:flex-row lg:items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-green-500/20 rounded-2xl flex items-center justify-center">
                  <Bike className="w-12 h-12 text-green-500" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  🚴‍♂️ Passionate Cyclist
                </h3>
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                  Bike riding is more than just a hobby for me - it&apos;s a way of life. Whether it&apos;s conquering challenging mountain trails, 
                  exploring scenic countryside routes, or simply commuting through the city, cycling provides the perfect balance of 
                  physical fitness, mental clarity, and environmental consciousness.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {hobbies[0].details.map((detail, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Hobbies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {hobbies.slice(1).map((hobby, index) => (
            <div
              key={index}
              className="group bg-card rounded-xl border border-border p-6 hover:shadow-lg hover:border-accent/30 transition-all duration-300"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 ${hobby.bgColor} rounded-xl flex items-center justify-center`}>
                  <div className={hobby.color}>
                    {hobby.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                    {hobby.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{hobby.frequency}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {hobby.description}
              </p>

              {/* Details */}
              <ul className="space-y-2">
                {hobby.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="w-1 h-1 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Balance Philosophy */}
        <div className="text-center bg-muted/30 rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Work-Life Balance Philosophy
          </h3>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I believe that diverse interests and hobbies are essential for maintaining creativity, preventing burnout, 
            and bringing fresh perspectives to professional challenges. Each hobby teaches valuable skills that translate 
            into better problem-solving, patience, attention to detail, and a well-rounded approach to life and work.
          </p>
          <div className="flex justify-center mt-6">
            <div className="inline-flex items-center px-6 py-3 bg-accent/10 rounded-full border border-accent/30">
              <span className="text-accent font-medium">
                &ldquo;Life is like riding a bicycle. To keep your balance, you must keep moving.&rdquo; - Albert Einstein
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hobbies