import Navigation from "@/components/Navigation"
import Hero from "@/components/Hero"
import About from "@/components/About"
import TechStack from "@/components/TechStack"
import Experience from "@/components/Experience"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <About />
      <TechStack />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}