import Navigation from "@/components/Navigation"
import Hero from "@/components/Hero"
import About from "@/components/About"
import TechStack from "@/components/TechStack"
import Achievements from "@/components/Achievements"
import Terminal from "@/components/Terminal"
import Experience from "@/components/Experience"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import AIAssistant from "@/components/AIAssistant"

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <About />
      <TechStack />
      <Achievements />
      <Terminal />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
      <AIAssistant />
    </main>
  )
}