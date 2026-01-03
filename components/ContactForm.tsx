'use client'

import { useState, FormEvent } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
      setFormData({ name: '', email: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle')
      }, 5000)
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message. Please try again.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="contact-form__field">
        <label htmlFor="contact-name" className="contact-form__label">
          Name
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="contact-form__input"
          placeholder="Your name"
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-email" className="contact-form__label">
          Email
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="contact-form__input"
          placeholder="your.email@example.com"
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-message" className="contact-form__label">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="contact-form__textarea"
          placeholder="Tell me about your project..."
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

      <button
        type="submit"
        className="contact-form__submit btn"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
        {status !== 'loading' && <span className="btn__arrow">→</span>}
      </button>
    </form>
  )
}

