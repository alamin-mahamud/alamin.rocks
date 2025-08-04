"use client"

import React, { useState, useEffect } from "react"
import { Quote, Linkedin, Users, Building, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { portfolioApi, LinkedInRecommendation as LinkedInRecommendationType } from "@/lib/api"
import Pagination from "./ui/Pagination"

interface LinkedInRecommendation {
  text: string
  author: string
  title: string
  relationship: string
  date: string
}

const RECOMMENDATIONS_PER_PAGE = 6

const LinkedInRecommendations = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRecommendation, setSelectedRecommendation] = useState<number | null>(null)
  const [recommendations, setRecommendations] = useState<LinkedInRecommendationType[]>([])
  const [loading, setLoading] = useState(true)

  // Load recommendations from API with fallback to static data
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await portfolioApi.getRecommendations({ recent: true, limit: 50 })
        setRecommendations(data)
      } catch (error) {
        console.error("Failed to fetch recommendations:", error)
        // Use static fallback data
        setRecommendations([
          {
            id: "rec-1",
            recommender_name: "Sunny Parekh", 
            recommender_title: "Director of Information Security, Technology and Compliance",
            recommender_company: "BriteCore Inc",
            recommender_image: "",
            relationship: "worked directly with",
            content: "I've had the pleasure of working with Alamin, whose **expertise in building cloud-driven SaaS platforms** is impressive. Alamin has guided **DevOps efforts with a focus on scalability, functionality, and efficiency**. Alamin is a **reliable, forward-thinking professional** who delivers **real business impact** through technology.",
            date: "2025-05-06",
            skills_mentioned: ["DevOps", "SaaS", "Cloud", "Scalability"]
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [])

  if (loading) {
    return (
      <section id="linkedin-recommendations" className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading recommendations...</div>
          </div>
        </div>
      </section>
    )
  }

  // Convert API data to display format for compatibility
  const displayRecommendations = recommendations.map(rec => ({
    text: rec.content,
    author: rec.recommender_name,
    title: rec.recommender_title,
    relationship: rec.relationship,
    date: new Date(rec.date).toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    }),
    company: rec.recommender_company
  }))

  // Static LinkedIn recommendations data as fallback
  const staticRecommendations: LinkedInRecommendation[] = [
    {
      text: "I've had the pleasure of working with Alamin, whose **expertise in building cloud-driven SaaS platforms** is impressive. Alamin has guided **DevOps efforts with a focus on scalability, functionality, and efficiency**. Alamin is a **reliable, forward-thinking professional** who delivers **real business impact** through technology.",
      author: "Sunny Parekh",
      title: "Director of Information Security, Technology and Compliance",
      relationship: "Sunny was senior to Alamin but didn't manage Alamin directly",
      date: "May 6, 2025"
    },
    {
      text: "I had the privilege of mentoring him during his 2018 internship where he worked with Django REST Framework. Even then, he stood out for his **technical prowess, problem-solving skills, and ability to deliver production-ready solutions**. His **curiosity and dedication to mastering complex concepts** were truly impressive. Watching his career evolve has been rewarding - from a promising intern to a technology leader architecting scalable cloud platforms that drive real business impact. His unique blend of technical expertise and strategic vision makes him an invaluable asset to any organization. I confidently recommend him and look forward to his continued success in shaping the future of technology.",
      author: "Omar Faruque Tuhin",
      title: "Leading Teams to Build Robust Solutions in Kubernetes & Node.js | Focused on Impact & Efficiency",
      relationship: "Omar Faruque managed Alamin directly",
      date: "April 29, 2025"
    },
    {
      text: "Punctual and Energetic, one of the most creative guys I've dealt with.",
      author: "Bikash K. Bhawmick",
      title: "Doctoral Researcher, Targeted Therapy Technology (3T) Research Group, City St George's, University of London",
      relationship: "Bikash K. was Alamin's mentor",
      date: "August 18, 2019"
    },
    {
      text: "I know Md. Alamin Mahamud from my university's days as he is one year senior to me and from that time to till now, I take technical help from him when I face tough and difficult situations. We worked together in several projects and he is a very **productive, hardworking, broad-minded person**. I am amazed by his **proficiency and skills on computer programming** and his **willingness to learn and take new responsibilities** is something to be desired in any professional. He is very good in **Python programming language** and he also helped me a lot on my BSC final year thesis. Working with Md. Alamin Mahamud is a **signature of success** where I have only optimistic predictions for his career trajectory.",
      author: "Ta-Seen Junaid",
      title: "Blockchain, Fintech & AI | GenAI",
      relationship: "Ta-Seen worked with Alamin but they were at different companies",
      date: "July 13, 2019"
    },
    {
      text: "I rarely come across **real talents** who stand out like Alamin. Alamin's **ability to handle multiple projects** was unlike any I've seen before and made a **dramatic increase in the productivity level** of our company. No matter how tense a meeting, Alamin made sure everyone left with a smile. As a team member, Alamin earns my **highest recommendation**.",
      author: "Ilias Kanchan",
      title: "kubernetes | CKA | AWS | Linux | RHCE | Ansible | Docker | MySQL | Python",
      relationship: "Ilias worked with Alamin on the same team",
      date: "July 6, 2019"
    },
    {
      text: "I have worked with him directly. He's **one of the finest developers** we have in the industry and an **excellent problem solver**. It's been a pleasure working with him. I wish him all the best.",
      author: "Riaz Rahman",
      title: "Lead iOS Developer at United Commercial Bank PLC | Fintech | Digital Banking | MFS",
      relationship: "Riaz worked with Alamin on the same team",
      date: "July 5, 2019"
    },
    {
      text: "He is very **enthusiastic and energetic person** to work with, always **thirsty to learn and discover new things**. Will definitely recommend him towards excellency.",
      author: "A. S. Md. Ferdousul Haque",
      title: "Senior Solution Architect - Grameenphone - SWE Digital | CSM | CSD | Problem Solver in Hackerrank, Leetcode | Ex-Banglalink Ex-Portonics Ex-Accenture",
      relationship: "A. S. Md. Ferdousul worked with Alamin on the same team",
      date: "July 5, 2019"
    },
    {
      text: "Md. Alamin Mahmud is a **great team player**. He loves to **learn new technologies and to practice them**. He is **self motivated, driven and highly skilled person** in his respected field. Also, with the attitude of **getting things done**, he is a **great problem solver**.",
      author: "Md Didarul Islam",
      title: "Mobile Software Engineer | Flutter | Android | iOS",
      relationship: "Md Didarul worked with Alamin but on different teams",
      date: "July 3, 2019"
    },
    {
      text: "Alamin was an amazing person to work with. His **analytical ability and expertise in django & Overall backend infrastructure ability** helped the product to stand in a very short time. Will definitely work with him again.",
      author: "Ahmad Firoz",
      title: "Senior Product Designer | UX Designer | Design Manager",
      relationship: "Ahmad worked with Alamin on the same team",
      date: "July 3, 2019"
    },
    {
      text: "He is a nice person with good skills. His **problem solving is amazing**. He listens with patience, tries to understand the scenarios, analyze the possible options and then takes the right decision to solve it.",
      author: "Anamoul Rouf 🇵🇸",
      title: "UX Product Designer | Problem Solver | Research Enthusiast | UX Consultant | Design System Enthusiast | AI-Driven, AR & VR Enthusiast | Ex- ShareTrip",
      relationship: "Anamoul worked with Alamin but on different teams",
      date: "July 3, 2019"
    },
    {
      text: "Alamin was a **fantastic person to work with**, and is not only a **multi-skilled and insightful colleague**, but also an **inspiring strategist**. Very good person. Great employee with a **very strong problem solving skills**. He is an **asset to any company**.",
      author: "Al Amin Ibne Mosaddeque Chayan",
      title: "Principal Software Engineer | Certified Laravel Developer, Zend Certified Engineer",
      relationship: "Al Amin Ibne Mosaddeque managed Alamin directly",
      date: "July 3, 2019"
    },
    {
      text: "Md. Alamin Mahamud is a **motivated, forward-thinking and intelligent software engineer** with lots of knowledge in his field. I have always found him to **embrace new technologies**. He is a **good problem solver, broad-minded and ambitious software engineer**.",
      author: "Sujit Kumar Chanda",
      title: "Software Engineer",
      relationship: "Sujit Kumar and Alamin studied together",
      date: "July 2, 2019"
    },
    {
      text: "I have had the opportunity to work with Md. Alamin Mahamud while working at Portonics Limited. He is **quick learner, good team player and hard worker**. He is a **passionate developer** to develop any projects by new technologies. He was very professional during developing any projects. I wish him all the best.",
      author: "Md. Jahangir Alam",
      title: "Senior Software Engineer at Sulaco Tec",
      relationship: "Md. Jahangir managed Alamin directly",
      date: "July 1, 2019"
    },
    {
      text: "Interest in working with new technology, interest in learning about something, always encourages me. If you want to be a **hilarious enthusiastic someone** at your team \"Alamin\" will be a good option. He has the **interesting power to keep the entire team in the same fashion**, it's always because of my envy. His **dedication to work** is one of his other qualities. Wish a good luck always for \"Alamin\".",
      author: "SHAH NOOR AlAM",
      title: "Senior Software Developer | Full Stack Developer | Node.js | React.js | Next.js | Nest.js",
      relationship: "SHAH NOOR worked with Alamin but on different teams",
      date: "July 1, 2019"
    },
    {
      text: "**Courage & passion** are the key elements Alamin possesses. His dreams may be bigger than skies, but his **hard-working mentality and passion towards CS** will guide him to the pinnacle of success. All the best for his future endeavors.",
      author: "Sakibur Rahaman Chowdhury",
      title: "Senior Software Engineer | Turing.com | Supply Gen",
      relationship: "Sakibur was Alamin's teacher",
      date: "June 30, 2019"
    },
    {
      text: "I've known Alamin for quite some time. Even though we didn't work closely, still I figured out his **enthusiasm about learning and experimenting with new stuff**. We had chat over messaging apps, discussed things over the phone regularly about career, technology, etc. As soon as I had the chance to refer him to the Pathao I didn't wait a bit. I knew that he is the **perfect guy to have in any fast growing team**. He is a **real asset for any technology team**. I'm wishing for his success in every aspect of life.",
      author: "Ahmed Shamim Hassan",
      title: "Muslim • Senior software engineer • Laravel core contributor • Mentor @ADPList",
      relationship: "Ahmed worked with Alamin but on different teams",
      date: "June 30, 2019"
    },
    {
      text: "As we worked on same team, I found Mr Alamin with **excellent problem solving skill** along with **out of box thinker**. Must recommend him for any tech base team for **better improvement and faster delivery**.",
      author: "Md Khorshed Alam",
      title: "Tech Leader | Entrepreneur | Cloud & Software Engineering Expert",
      relationship: "Md Khorshed worked with Alamin but on different teams",
      date: "June 30, 2019"
    },
    {
      text: "It is rare that you come across a person like Alamin Mahamud. I have known him since 2014. He has **transformed himself from a Mechanical Engineer to a professional Software Engineer**. He has built a **reputation in the dev community with his broad vision**. Apart from developing skills he has **exceptional communication skills and loves to read**. He has been a very good friend of mine and I know how well grounded he is. I recommend Alamin Mahamud highly as I know that he will **never let anyone down**.",
      author: "Ariful Islam",
      title: "Software Engineering | Android | Kotlin | Flutter | Node.Js | MongoDB",
      relationship: "Ariful was senior to Alamin but didn't manage Alamin directly",
      date: "June 29, 2019"
    },
    {
      text: "Alamin is a **problem solver and a very quick learner**. Worked with him in several services directly and found him very **passionate about what he does**. Wish him a very bright career ahead.",
      author: "Fazle Rabby",
      title: "Engineering Manager @ Wolt | DoorDash",
      relationship: "Fazle worked with Alamin on the same team",
      date: "June 27, 2019"
    },
    {
      text: "Thirst for new technologies made Md Alamin Mahmud **\"Next Generation\" programmer** to me. When Alamin is in your team, you know he will **keep you up-to-date with upcoming technologies**. He is also a **Linux expert**. If you want to find the most social and jolly person in the company, probably Alamin will be the one. Finally, Alamin is a **great motivation** to me!",
      author: "Md Shoeb Abdullah",
      title: "Experienced Full Stack Developer | Golang | Python | PHP | React | Laravel | Laravel Certified",
      relationship: "Md Shoeb worked with Alamin but on different teams",
      date: "March 16, 2019"
    },
    {
      text: "Md. Alamin, a Mechanical Engineer who is very **passionate about Computer Software**. **Hard-worker, responsible and a committed programmer**. Has an immense wish to **learn about new technologies**. Very dedicated and as a team member.",
      author: "Rakib Hasann",
      title: "Fullstack SWE | React | Node | Data Engineering",
      relationship: "Rakib worked with Alamin on the same team",
      date: "January 26, 2016"
    },
    {
      text: "MD. Alamin Mahamud consistently provides **outstanding work, quick turnaround on bug fixes and efficient solutions**. He is very **hardworking, capable and skilled**. He does his work with **great responsibility, preciseness and to the point**.",
      author: "Nur-A-Alam Shiddiki",
      title: "Lead Software Engineer at Samsung R&D Institute Bangladesh Ltd. | iOS | android",
      relationship: "Nur-A-Alam worked with Alamin on the same team",
      date: "January 12, 2016"
    }
  ]

  const formatDescription = (text: string) => {
    // Convert markdown-style bold to HTML
    return text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
  }

  // Use API data if available, otherwise use static data
  const linkedinRecommendations = displayRecommendations.length > 0 ? displayRecommendations : staticRecommendations

  // Pagination
  const totalPages = Math.ceil(linkedinRecommendations.length / RECOMMENDATIONS_PER_PAGE)
  const startIndex = (currentPage - 1) * RECOMMENDATIONS_PER_PAGE
  const paginatedRecommendations = linkedinRecommendations.slice(startIndex, startIndex + RECOMMENDATIONS_PER_PAGE)

  return (
    <section id="linkedin-recommendations" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Recommendations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            What colleagues and industry professionals say about working with me
          </p>
          <div className="flex items-center justify-center mt-4 gap-2">
            <Linkedin className="text-accent" size={20} />
            <span className="text-muted-foreground text-sm">
              {linkedinRecommendations.length} recommendations from industry professionals
            </span>
          </div>
        </div>

        {/* Results count */}
        <div className="text-center mb-6 text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(startIndex + RECOMMENDATIONS_PER_PAGE, linkedinRecommendations.length)} of {linkedinRecommendations.length} recommendations
        </div>

        {/* Recommendations Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {paginatedRecommendations.map((recommendation, index) => {
            const isExpanded = selectedRecommendation === (startIndex + index)
            const shouldTruncate = recommendation.text.length > 250

            return (
              <div
                key={index}
                className="group relative bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-foreground/5 hover:border-accent/30"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-8">
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Quote size={48} className="text-accent" />
                  </div>

                  {/* LinkedIn Badge */}
                  <div className="absolute top-6 left-6">
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-200 dark:border-blue-800">
                      <Linkedin size={14} className="text-blue-600 dark:text-blue-400" />
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400">LinkedIn</span>
                    </div>
                  </div>

                  {/* Recommender Info */}
                  <div className="flex items-start mb-6 mt-12">
                    <div className="w-14 h-14 bg-gradient-to-r from-accent to-accent/80 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                      <span className="text-accent-foreground font-semibold text-lg">
                        {recommendation.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">
                        {recommendation.author}
                      </h3>
                      <p className="text-accent font-medium text-sm">
                        {recommendation.title}
                      </p>
                      <div className="flex items-center justify-between text-muted-foreground text-sm mt-2">
                        <div className="flex items-center">
                          <Users size={12} className="mr-1" />
                          <span className="text-xs">{recommendation.relationship}</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <Calendar size={12} className="mr-1" />
                          <span>{recommendation.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommendation Content */}
                  <div className="mb-6">
                    <blockquote
                      className="text-muted-foreground leading-relaxed text-sm italic"
                      dangerouslySetInnerHTML={{
                        __html: formatDescription(
                          `"${shouldTruncate && !isExpanded
                            ? `${recommendation.text.substring(0, 250)}...`
                            : recommendation.text}"`
                        )
                      }}
                    />

                    {shouldTruncate && (
                      <button
                        onClick={() => setSelectedRecommendation(
                          isExpanded ? null : (startIndex + index)
                        )}
                        className="text-accent hover:text-accent/80 text-sm mt-2 font-medium transition-colors"
                      >
                        {isExpanded ? 'Show less' : 'Read more'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/3 to-accent/5 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none" />
              </div>
            )
          })}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-accent/10 to-accent/5 backdrop-blur-sm rounded-full border border-accent/30">
            <Linkedin className="text-accent mr-3" size={24} />
            <span className="text-lg font-medium text-foreground">
              <a
                href="https://linkedin.com/in/alamin-mahamud"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                View full LinkedIn profile for more recommendations
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LinkedInRecommendations
