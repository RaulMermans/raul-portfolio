import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { escapeHtml } from '@/lib/utils'
import { logger } from '@/lib/logger'
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limiter'

// Initialize Resend client only if API key is available
const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return null
  return new Resend(apiKey)
}

// Your email address where you want to receive contact form submissions
const RECIPIENT_EMAIL = process.env.CONTACT_EMAIL || 'raulmermans@gmail.com'
// The "from" email must be verified in your Resend account
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientId = getClientIdentifier(request)
    const rateLimit = checkRateLimit(clientId)
    
    if (!rateLimit.success) {
      const retryAfter = Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
      return NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.',
          retryAfter,
        },
        { 
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
          },
        }
      )
    }
    
    const body = await request.json()
    const { name, email, message } = body

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if Resend API key is configured
    const resend = getResendClient()
    if (!resend) {
      // In development, log the submission instead of failing
      if (process.env.NODE_ENV === 'development') {
        logger.log('📧 Contact form submission (Resend not configured):', {
          name,
          email,
          message,
        })
        return NextResponse.json(
          {
            success: true,
            message: 'Thank you for your message! I will get back to you soon.',
            note: 'Email sending not configured - check logs',
          },
          { status: 200 }
        )
      }
      // In production, return error
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Escape all user input to prevent HTML injection
    const escapedName = escapeHtml(name)
    const escapedEmail = escapeHtml(email)
    // Escape message and preserve line breaks
    const escapedMessage = escapeHtml(message).replace(/\n/g, '<br>')

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: RECIPIENT_EMAIL,
      replyTo: email, // So you can reply directly to the sender
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #FFAA88 0%, #FFB5A0 100%); padding: 30px; text-align: center; color: white; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 8px; margin-top: 20px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: 600; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; }
              .value { color: #1a1714; font-size: 16px; }
              .message-box { background: white; padding: 20px; border-left: 3px solid #FFAA88; margin-top: 10px; }
              .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999; text-align: center; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Name</div>
                  <div class="value">${escapedName}</div>
                </div>
                <div class="field">
                  <div class="label">Email</div>
                  <div class="value"><a href="mailto:${escapedEmail}" style="color: #C41E3A; text-decoration: none;">${escapedEmail}</a></div>
                </div>
                <div class="field">
                  <div class="label">Message</div>
                  <div class="message-box">${escapedMessage}</div>
                </div>
              </div>
              <div class="footer">
                <p>This email was sent from your portfolio contact form.</p>
                <p>Reply directly to this email to respond to ${escapedName}.</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}

---
Reply directly to this email to respond to ${name}.
      `.trim(),
    })

    if (error) {
      logger.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message! I will get back to you soon.',
        emailId: data?.id, // Resend email ID for tracking
      },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
        },
      }
    )
  } catch (error) {
    logger.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}

