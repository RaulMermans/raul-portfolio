'use client'

import { useState, FormEvent } from 'react'
import { getSiteCopy } from '@/data/site-copy'
import { PUBLIC_CONTACT_EMAIL } from '@/lib/contact'
import { trackFormSubmit } from '@/lib/gtag'
import { type Locale } from '@/lib/i18n'

interface ContactFormProps {
  locale?: Locale
}

export default function ContactForm({ locale = 'en' }: ContactFormProps) {
  const copy = getSiteCopy(locale).home.contactForm
  const PROJECT_TYPES = [{ value: '', label: copy.projectTypePlaceholder }, ...copy.projectTypes]
  const BUDGET_RANGES = [{ value: '', label: copy.budgetPlaceholder }, ...copy.budgetRanges]
  const TIMELINES = [{ value: '', label: copy.timelinePlaceholder }, ...copy.timelines]
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
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string }>({})

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')
    setFieldErrors({})

    // Client-side validation
    const errs: { name?: string; email?: string } = {}
    if (formData.name.trim().length < 2) {
      errs.name = copy.errors.name
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      errs.email = copy.errors.email
    }
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs)
      return
    }

    setStatus('loading')

    try {
      const subject = `Project brief from ${formData.name.trim()}`
      const body = [
        `Name: ${formData.name.trim()}`,
        `Email: ${formData.email.trim()}`,
        formData.projectType ? `Project focus: ${formData.projectType}` : '',
        formData.budget ? `Budget range: ${formData.budget}` : '',
        formData.timeline ? `Timeline: ${formData.timeline}` : '',
        '',
        formData.message.trim(),
      ].filter(Boolean).join('\n')

      window.location.href = `mailto:${PUBLIC_CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

      setStatus('success')
      setFormData({ name: '', email: '', projectType: '', budget: '', timeline: '', message: '' })
      trackFormSubmit('contact_mailto')
      
      // Reset success message after configured time
      setTimeout(() => {
        setStatus('idle')
      }, 5000) // CONTACT_FORM_SUCCESS_DISPLAY_TIME from constants
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : copy.errors.generic)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear field error when user corrects input
    if ((name === 'name' || name === 'email') && fieldErrors[name as 'name' | 'email']) {
      setFieldErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="contact-form__field">
        <label htmlFor="contact-name" className="contact-form__label">
          <span>{copy.fields.name}</span>
          <span className="contact-form__required">*</span>
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
          aria-invalid={!!fieldErrors.name}
          className="contact-form__input"
          placeholder={copy.placeholders.name}
        />
        {fieldErrors.name && (
          <span id="contact-name-error" className="contact-form__field-error" role="alert">
            {fieldErrors.name}
          </span>
        )}
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-email" className="contact-form__label">
          <span>{copy.fields.email}</span>
          <span className="contact-form__required">*</span>
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
          aria-invalid={!!fieldErrors.email}
          className="contact-form__input"
          placeholder={copy.placeholders.email}
        />
        {fieldErrors.email && (
          <span id="contact-email-error" className="contact-form__field-error" role="alert">
            {fieldErrors.email}
          </span>
        )}
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-project-type" className="contact-form__label">
          <span>{copy.fields.projectFocus}</span>
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
            <span>{copy.fields.budget}</span>
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
            <span>{copy.fields.timeline}</span>
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
          <span>{copy.fields.message}</span>
          <span className="contact-form__required">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          maxLength={2000}
          className="contact-form__textarea"
          placeholder={copy.placeholders.message}
        />
      </div>

      {status === 'error' && (
        <div className="contact-form__error" role="alert">
          {errorMessage}
        </div>
      )}

      {status === 'success' && (
        <div className="contact-form__success" role="alert">
          <span>{copy.success}</span>
          <button
            type="button"
            className="contact-form__success-dismiss"
            aria-label={copy.dismissSuccess}
            onClick={() => setStatus('idle')}
          >
            ×
          </button>
        </div>
      )}

      <p className="contact-form__response-note">
        {copy.responseNote}
      </p>

      <button
        type="submit"
        className="contact-form__submit btn"
        disabled={status === 'loading'}
        aria-label={status === 'loading' ? copy.sendingAria : copy.sendAria}
      >
        {status === 'loading' ? copy.sending : copy.send}
        {status !== 'loading' && <span className="btn__arrow">→</span>}
      </button>
    </form>
  )
}
