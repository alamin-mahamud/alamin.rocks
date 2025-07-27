"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Send } from "lucide-react"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // TODO: Integrate with backend API
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      
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
            <div className="bg-card rounded-lg p-8 shadow-sm border border-border">
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
                      className="w-full px-4 py-3 border border-border rounded bg-background text-foreground focus:ring-2 focus:ring-solarized-green focus:border-solarized-green mono"
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
                      className="w-full px-4 py-3 border border-border rounded bg-background text-foreground focus:ring-2 focus:ring-solarized-green focus:border-solarized-green mono"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="# Tell me about your project or just say hello...\n# Use this space to describe your needs\n# I'll get back to you soon!"
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-solarized-green/10 border border-solarized-green rounded">
                    <p className="text-solarized-green mono">✓ Message sent successfully! I&apos;ll get back to you soon.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-solarized-red/10 border border-solarized-red rounded">
                    <p className="text-solarized-red mono">✗ Error: Failed to send message. Please try again.</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-6 py-3 bg-solarized-green text-solarized-base3 rounded hover:bg-solarized-cyan transition-colors disabled:opacity-50 disabled:cursor-not-allowed mono font-medium"
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
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <div className="flex items-center mb-4">
                <Mail size={24} className="text-solarized-blue mr-3" />
                <h3 className="text-lg font-semibold text-foreground mono">email:</h3>
              </div>
              <p className="text-solarized-blue mono">hello@alamin.rocks</p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <div className="flex items-center mb-4">
                <Phone size={24} className="text-solarized-green mr-3" />
                <h3 className="text-lg font-semibold text-foreground mono">phone:</h3>
              </div>
              <p className="text-solarized-green mono">+880 168 7060 434</p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <div className="flex items-center mb-4">
                <MapPin size={24} className="text-solarized-orange mr-3" />
                <h3 className="text-lg font-semibold text-foreground mono">location:</h3>
              </div>
              <p className="text-solarized-orange mono">Istanbul, Turkey</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact