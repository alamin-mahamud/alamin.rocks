"use client"

import React from "react"
import { GraduationCap, Calendar, MapPin, Award, Book, Trophy } from "lucide-react"

interface EducationItem {
  degree: string
  institution: string
  location: string
  startYear: string
  endYear: string
  gpa?: string
  description: string
  achievements: string[]
  relevantCourses: string[]
  activities?: string[]
}

const Education = () => {
  const educationHistory: EducationItem[] = [
    {
      degree: "Bachelor of Science in Mechanical Engineering",
      institution: "Chittagong University of Engineering & Technology (CUET)",
      location: "Chittagong, Bangladesh",
      startYear: "2013",
      endYear: "2017",
      gpa: "3.67/4.00",
      description: "Comprehensive engineering education with focus on mechanical systems, thermodynamics, and manufacturing processes. Developed strong analytical and problem-solving skills that translated well to software engineering.",
      achievements: [
        "Hackathon Champion & App Fest Runner-Up (2015)",
        "Dean's List for Academic Excellence (2016-2017)",
        "Vice President, Programming Club (2015-2016)",
        "Engineering Innovation Project Award (2017)"
      ],
      relevantCourses: [
        "Engineering Mathematics",
        "Computer Programming (C/C++)",
        "Data Structures & Algorithms",
        "Engineering Design & Analysis",
        "Project Management",
        "Statistics & Probability"
      ],
      activities: [
        "Programming Club - Vice President",
        "Engineering Society - Active Member",
        "Tech Innovation Workshop - Organizer",
        "Inter-University Programming Contest - Participant"
      ]
    }
  ]

  const continuousLearning = [
    {
      platform: "Coursera",
      courses: ["Machine Learning", "Cloud Computing Specialization", "DevOps Culture and Mindset"],
      completed: "2018-2025"
    },
    {
      platform: "Udemy",
      courses: ["Docker & Kubernetes Mastery", "AWS Solutions Architect", "Advanced Python Programming"],
      completed: "2019-2025"
    },
    {
      platform: "Pluralsight",
      courses: ["Terraform Deep Dive", "Monitoring with Prometheus", "Go Programming Language"],
      completed: "2020-2025"
    },
    {
      platform: "A Cloud Guru",
      courses: ["AWS Certified Solutions Architect", "Kubernetes Security", "Infrastructure as Code"],
      completed: "2021-2025"
    }
  ]

  return (
    <section id="education" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Education & Learning
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Academic foundation and continuous learning journey in technology and engineering
          </p>
        </div>

        {/* Formal Education */}
        <div className="space-y-8 mb-16">
          {educationHistory.map((edu, index) => (
            <div
              key={index}
              className="group bg-card rounded-xl border border-border p-8 hover:shadow-lg hover:border-accent/30 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Education Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-accent/20 to-accent/10 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-accent" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-6">
                  {/* Header */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold text-foreground group-hover:text-accent transition-colors">
                      {edu.degree}
                    </h3>
                    <p className="text-xl text-accent font-medium">{edu.institution}</p>
                    
                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{edu.startYear} - {edu.endYear}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{edu.location}</span>
                      </div>
                      {edu.gpa && (
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          <span>GPA: {edu.gpa}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {edu.description}
                  </p>

                  {/* Achievements */}
                  {edu.achievements.length > 0 && (
                    <div>
                      <h4 className="text-lg font-medium text-foreground mb-3 flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-accent" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {edu.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start gap-2 text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Relevant Courses */}
                  <div>
                    <h4 className="text-lg font-medium text-foreground mb-3 flex items-center gap-2">
                      <Book className="w-5 h-5 text-accent" />
                      Relevant Coursework
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.relevantCourses.map((course, courseIndex) => (
                        <span
                          key={courseIndex}
                          className="badge-tech text-xs"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Activities */}
                  {edu.activities && edu.activities.length > 0 && (
                    <div>
                      <h4 className="text-lg font-medium text-foreground mb-3">Extracurricular Activities</h4>
                      <ul className="space-y-2">
                        {edu.activities.map((activity, actIndex) => (
                          <li key={actIndex} className="flex items-start gap-2 text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continuous Learning */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Continuous Learning & Professional Development
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {continuousLearning.map((platform, index) => (
              <div
                key={index}
                className="bg-muted/30 rounded-xl p-6 hover:bg-muted/50 transition-colors"
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
              >
                <h4 className="text-lg font-semibold text-foreground mb-3">{platform.platform}</h4>
                <p className="text-sm text-muted-foreground mb-3">{platform.completed}</p>
                <ul className="space-y-1">
                  {platform.courses.map((course, courseIndex) => (
                    <li key={courseIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="w-1 h-1 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span>{course}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-card rounded-xl border border-border">
            <div className="text-3xl font-bold text-accent mb-2">1</div>
            <div className="text-sm text-muted-foreground">Degree Completed</div>
          </div>
          <div className="text-center p-6 bg-card rounded-xl border border-border">
            <div className="text-3xl font-bold text-accent mb-2">4</div>
            <div className="text-sm text-muted-foreground">Years of Study</div>
          </div>
          <div className="text-center p-6 bg-card rounded-xl border border-border">
            <div className="text-3xl font-bold text-accent mb-2">4</div>
            <div className="text-sm text-muted-foreground">Major Achievements</div>
          </div>
          <div className="text-center p-6 bg-card rounded-xl border border-border">
            <div className="text-3xl font-bold text-accent mb-2">12+</div>
            <div className="text-sm text-muted-foreground">Online Courses</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education