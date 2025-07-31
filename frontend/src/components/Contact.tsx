"use client"

import { useState, useEffect } from "react"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { portfolioApi, ContactInfo } from "@/lib/api"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const data = await portfolioApi.getContactInfo()
        setContactInfo(data)
      } catch (error) {
        console.error("Failed to fetch contact info:", error)
      }
    }

    fetchContactInfo()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      await portfolioApi.submitContactForm(formData)
      setSubmitStatus('success')
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="py-20 bg-muted">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 mono">
            $ ./contact.sh
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mono">
            # Let&apos;s discuss your next project or just say hello
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg p-8 shadow-sm border border-border card-hover">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2 mono">
                      --name * (required)
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent mono transition-all duration-200"
                      placeholder="enter_your_name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2 mono">
                      --email * (required)
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent mono transition-all duration-200"
                      placeholder="user@domain.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-2 mono">
                    --subject (optional)
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent mono transition-all duration-200"
                    placeholder="topic_of_discussion"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2 mono">
                    --message * (required)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent mono transition-all duration-200"
                    placeholder="# Tell me about your project or just say hello...\n# Use this space to describe your needs\n# I'll get back to you soon!"
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-accent/10 border border-accent rounded">
                    <p className="text-accent mono">✓ Message sent successfully! I&apos;ll get back to you soon.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-destructive/10 border border-destructive rounded">
                    <p className="text-destructive mono">✗ Error: Failed to send message. Please try again.</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-6 py-3 bg-accent text-accent-foreground rounded hover:bg-accent/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mono font-medium hover:-translate-y-0.5 hover:shadow-lg"
                >
                  {isSubmitting ? (
                    "Sending message..."
                  ) : (
                    <>
                      <Send size={20} className="mr-2" />
                      Execute
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border card-hover">
              <div className="flex items-center mb-4">
                <Mail size={24} className="text-accent mr-3" />
                <h3 className="text-lg font-semibold text-foreground mono">email:</h3>
              </div>
              <p className="text-accent mono">{contactInfo?.email || 'hello@alamin.rocks'}</p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border border-border card-hover">
              <div className="flex items-center mb-4">
                <Phone size={24} className="text-accent mr-3" />
                <h3 className="text-lg font-semibold text-foreground mono">phone:</h3>
              </div>
              <p className="text-accent mono">{contactInfo?.phone || '+880 168 7060 434'}</p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border border-border card-hover">
              <div className="flex items-center mb-4">
                <MapPin size={24} className="text-accent mr-3" />
                <h3 className="text-lg font-semibold text-foreground mono">location:</h3>
              </div>
              <p className="text-accent mono">{contactInfo?.location || 'Istanbul, Turkey'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact