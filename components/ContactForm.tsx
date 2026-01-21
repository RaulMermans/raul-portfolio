'use client'

import { useState, FormEvent } from 'react'
import { trackFormSubmit } from '@/lib/gtag'

const PROJECT_TYPES = [
  { value: '', label: 'Select project type' },
  { value: 'photography', label: 'Photography' },
  { value: 'brand-identity', label: 'Brand Identity' },
  { value: 'ai-creatives', label: 'AI Creatives' },
  { value: 'digital-systems', label: 'Digital Systems' },
  { value: 'other', label: 'Other' },
]

const BUDGET_RANGES = [
  { value: '', label: 'Select budget range' },
  { value: 'under-2500', label: 'Under €2,500' },
  { value: '2500-5000', label: '€2,500 – €5,000' },
  { value: '5000-10000', label: '€5,000 – €10,000' },
  { value: 'over-10000', label: '€10,000+' },
  { value: 'flexible', label: 'Flexible / Not sure' },
]

const TIMELINES = [
  { value: '', label: 'Select timeline' },
  { value: 'asap', label: 'ASAP' },
  { value: '1-2-weeks', label: '1-2 weeks' },
  { value: '1-month', label: '1 month' },
  { value: 'flexible', label: 'Flexible' },
]

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setStatus('success')
      setFormData({ name: '', email: '', projectType: '', budget: '', timeline: '', message: '' })
      
      // Track form submission in Google Analytics
      trackFormSubmit('contact_form')
      
      // Reset success message after configured time
      setTimeout(() => {
        setStatus('idle')
      }, 5000) // CONTACT_FORM_SUCCESS_DISPLAY_TIME from constants
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message. Please try again.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="contact-form__field">
        <label htmlFor="contact-name" className="contact-form__label">
          <span>Name</span>
          <span className="contact-form__required">*</span>
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="contact-form__input"
          placeholder="John Doe"
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-email" className="contact-form__label">
          <span>Email</span>
          <span className="contact-form__required">*</span>
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="contact-form__input"
          placeholder="john@example.com"
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-project-type" className="contact-form__label">
          <span>Project Type</span>
        </label>
        <select
          id="contact-project-type"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          className="contact-form__select"
        >
          {PROJECT_TYPES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="contact-form__row">
        <div className="contact-form__field contact-form__field--half">
          <label htmlFor="contact-budget" className="contact-form__label">
            <span>Budget Range</span>
          </label>
          <select
            id="contact-budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="contact-form__select"
          >
            {BUDGET_RANGES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="contact-form__field contact-form__field--half">
          <label htmlFor="contact-timeline" className="contact-form__label">
            <span>Timeline</span>
          </label>
          <select
            id="contact-timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className="contact-form__select"
          >
            {TIMELINES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-message" className="contact-form__label">
          <span>Message</span>
          <span className="contact-form__required">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="contact-form__textarea"
          placeholder="Tell me about your project and what you're looking to achieve..."
        />
      </div>

      {status === 'error' && (
        <div className="contact-form__error" role="alert">
          {errorMessage}
        </div>
      )}

      {status === 'success' && (
        <div className="contact-form__success" role="alert">
          Thank you! I&apos;ll get back to you soon.
        </div>
      )}

      <p className="contact-form__response-note">
        I typically respond within 24 hours.
      </p>

      <button
        type="submit"
        className="contact-form__submit btn"
        disabled={status === 'loading'}
        aria-label={status === 'loading' ? 'Sending message' : 'Send message'}
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
        {status !== 'loading' && <span className="btn__arrow">→</span>}
      </button>
    </form>
  )
}

