import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | Raúl Mermans',
  description: 'Privacy Policy for Raúl Mermans portfolio website.',
}

export default function PrivacyPolicy() {
  return (
    <div>
      <Header />
      <div className="legal-page">
        <div className="legal-page__inner">
        <Link href="/" className="legal-page__back">
          ← Back to Home
        </Link>
        
        <h1 className="legal-page__title">Privacy Policy</h1>
        <p className="legal-page__updated">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="legal-page__content">
          <section>
            <h2>1. Introduction</h2>
            <p>
              Welcome to the portfolio website of Raúl Mermans (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit 
              our website located at <a href="https://raulmermans.com" target="_blank" rel="noopener noreferrer">raulmermans.com</a> 
              (the &quot;Website&quot;).
            </p>
            <p>
              By using our Website, you consent to the data practices described in this Privacy Policy. If you do not 
              agree with the data practices described in this policy, you should not use our Website.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <h3>2.1 Information You Provide</h3>
            <p>We may collect information that you voluntarily provide to us when you:</p>
            <ul>
              <li>Contact us through the contact form or email</li>
              <li>Subscribe to our newsletter (if applicable)</li>
              <li>Interact with our Website in any other way</li>
            </ul>
            <p>This information may include:</p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Message content</li>
              <li>Any other information you choose to provide</li>
            </ul>

            <h3>2.2 Automatically Collected Information</h3>
            <p>When you visit our Website, we may automatically collect certain information about your device, including:</p>
            <ul>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages you visit and time spent on pages</li>
              <li>Referring website addresses</li>
            </ul>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to your inquiries and provide customer service</li>
              <li>Send you information about our services (with your consent)</li>
              <li>Improve our Website and user experience</li>
              <li>Analyze usage patterns and trends</li>
              <li>Ensure the security and integrity of our Website</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2>4. Cookies and Tracking Technologies</h2>
            <p>
              Our Website may use cookies and similar tracking technologies to enhance your experience. Cookies are 
              small data files stored on your device that help us improve our Website and provide a better user experience.
            </p>
            <p>You can control cookies through your browser settings. However, disabling cookies may affect the functionality of our Website.</p>
          </section>

          <section>
            <h2>5. Third-Party Services</h2>
            <p>Our Website may contain links to third-party websites and services, including:</p>
            <ul>
              <li>Social media platforms (Instagram, LinkedIn, Twitter, Unsplash)</li>
              <li>External service providers</li>
            </ul>
            <p>
              We are not responsible for the privacy practices of these third-party services. We encourage you to review 
              their privacy policies before providing any personal information.
            </p>
          </section>

          <section>
            <h2>6. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information. However, 
              no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use 
              commercially acceptable means to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2>7. Your Rights</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
            <ul>
              <li>The right to access your personal information</li>
              <li>The right to rectify inaccurate information</li>
              <li>The right to request deletion of your information</li>
              <li>The right to object to processing of your information</li>
              <li>The right to data portability</li>
            </ul>
            <p>To exercise these rights, please contact us using the information provided below.</p>
          </section>

          <section>
            <h2>8. Data Retention</h2>
            <p>
              We will retain your personal information only for as long as necessary to fulfill the purposes outlined in 
              this Privacy Policy, unless a longer retention period is required or permitted by law.
            </p>
          </section>

          <section>
            <h2>9. Children&apos;s Privacy</h2>
            <p>
              Our Website is not intended for children under the age of 13. We do not knowingly collect personal 
              information from children under 13. If you believe we have collected information from a child under 13, 
              please contact us immediately.
            </p>
          </section>

          <section>
            <h2>10. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and updating the &quot;Last updated&quot; date. You are advised to review this 
              Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2>11. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <ul>
              <li>Email: <a href="mailto:raulmermans@gmail.com">raulmermans@gmail.com</a></li>
              <li>Location: Madrid, Spain</li>
            </ul>
          </section>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

