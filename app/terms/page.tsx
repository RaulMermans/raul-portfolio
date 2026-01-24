import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DisableScrollSnap from '@/components/DisableScrollSnap'

export default function TermsOfService() {
  const formattedDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="legal-page-wrapper">
      <DisableScrollSnap />
      <Header />
      <div className="legal-page">
        <div className="legal-page__inner">
        <Link href="/" className="legal-page__back">
          ← Back to Home
        </Link>

        <h1 className="legal-page__title">Terms of Service</h1>
        <p className="legal-page__updated">Last updated: {formattedDate}</p>

        <div className="legal-page__content">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the website of Raúl Mermans (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)
              located at <a href="https://raulmermans.com" target="_blank" rel="noopener noreferrer">raulmermans.com</a>
              (the &quot;Website&quot;), you accept and agree to be bound by the terms and provision of this agreement.
            </p>
            <p>
              If you do not agree to abide by the above, please do not use this Website.
            </p>
          </section>

          <section>
            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily access and view the materials on this Website for personal,
              non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under
              this license you may not:
            </p>
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
              <li>Attempt to decompile or reverse engineer any software contained on the Website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server</li>
            </ul>
            <p>
              This license shall automatically terminate if you violate any of these restrictions and may be terminated by
              us at any time.
            </p>
          </section>

          <section>
            <h2>3. Intellectual Property Rights</h2>
            <p>
              All content on this Website, including but not limited to text, graphics, logos, images, photographs,
              audio clips, video clips, digital downloads, and software, is the property of Raúl Mermans or its content
              suppliers and is protected by international copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform,
              republish, download, store, or transmit any of the material on our Website without our prior written consent,
              except as follows:
            </p>
            <ul>
              <li>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials</li>
              <li>You may store files that are automatically cached by your Web browser for display enhancement purposes</li>
              <li>You may print or download one copy of a reasonable number of pages of the Website for your own personal,
              non-commercial use and not for further reproduction, publication, or distribution</li>
            </ul>
          </section>

          <section>
            <h2>4. User Conduct</h2>
            <p>You agree not to use the Website:</p>
            <ul>
              <li>In any way that violates any applicable federal, state, local, or international law or regulation</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
              <li>To impersonate or attempt to impersonate us, our employees, another user, or any other person or entity</li>
              <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful</li>
              <li>To engage in any other conduct that restricts or inhibits anyone&apos;s use or enjoyment of the Website</li>
            </ul>
          </section>

          <section>
            <h2>5. Disclaimer</h2>
            <p>
              The materials on this Website are provided on an &apos;as is&apos; basis. We make no warranties, expressed or
              implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties
              or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property
              or other violation of rights.
            </p>
            <p>
              Further, we do not warrant or make any representations concerning the accuracy, likely results, or reliability
              of the use of the materials on this Website or otherwise relating to such materials or on any sites linked to
              this Website.
            </p>
          </section>

          <section>
            <h2>6. Limitations</h2>
            <p>
              In no event shall Raúl Mermans or its suppliers be liable for any damages (including, without limitation,
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability to
              use the materials on this Website, even if we or our authorized representative has been notified orally or in
              writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2>7. Accuracy of Materials</h2>
            <p>
              The materials appearing on this Website could include technical, typographical, or photographic errors. We do
              not warrant that any of the materials on its Website are accurate, complete, or current. We may make changes
              to the materials contained on its Website at any time without notice.
            </p>
          </section>

          <section>
            <h2>8. Links</h2>
            <p>
              We have not reviewed all of the sites linked to our Website and are not responsible for the contents of any
              such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked
              website is at the user&apos;s own risk.
            </p>
          </section>

          <section>
            <h2>9. Modifications</h2>
            <p>
              We may revise these Terms of Service at any time without notice. By using this Website, you are agreeing to
              be bound by the then current version of these Terms of Service.
            </p>
          </section>

          <section>
            <h2>10. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of Spain, and you
              irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section>
            <h2>11. Contact Information</h2>
            <p>If you have any questions about these Terms of Service, please contact us:</p>
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
