'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getLocaleFromPath, localizePath } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DisableScrollSnap from '@/components/DisableScrollSnap'

export default function PrivacyPolicy() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const isSpanish = locale === 'es'
  const formattedDate = new Date().toLocaleDateString(isSpanish ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="legal-page-wrapper">
      <DisableScrollSnap />
      <Header locale={locale} />
      <div className="legal-page">
        <div className="legal-page__inner">
          <Link href={localizePath('/', locale)} className="legal-page__back">
            {isSpanish ? '← Volver al inicio' : '← Back to Home'}
          </Link>

          <h1 className="legal-page__title">{isSpanish ? 'Política de Privacidad' : 'Privacy Policy'}</h1>
          <p className="legal-page__updated">
            {isSpanish ? 'Última actualización:' : 'Last updated:'} {formattedDate}
          </p>

          <div className="legal-page__content">
            {isSpanish ? (
              <>
                <section>
                  <h2>1. Introducción</h2>
                  <p>
                    Bienvenido al portfolio de Raúl Mermans (&quot;nosotros&quot;, &quot;nuestro&quot; o &quot;nos&quot;).
                    Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos tu información
                    cuando visitas nuestro sitio web en{' '}
                    <a href="https://www.raulmermans.com" target="_blank" rel="noopener noreferrer">
                      www.raulmermans.com
                    </a>
                    .
                  </p>
                  <p>
                    Al usar este sitio web, aceptas las prácticas de datos descritas en esta Política de Privacidad. Si no
                    estás de acuerdo con ellas, no deberías utilizar el sitio.
                  </p>
                </section>

                <section>
                  <h2>2. Información que recopilamos</h2>
                  <h3>2.1 Información que proporcionas</h3>
                  <p>Podemos recopilar la información que nos facilitas voluntariamente cuando:</p>
                  <ul>
                    <li>Nos contactas a través del formulario o por correo electrónico</li>
                    <li>Te suscribes a la newsletter, si aplica</li>
                    <li>Interactúas con el sitio de cualquier otra forma</li>
                  </ul>
                  <p>Esta información puede incluir:</p>
                  <ul>
                    <li>Nombre</li>
                    <li>Correo electrónico</li>
                    <li>Contenido del mensaje</li>
                    <li>Cualquier otra información que decidas compartir</li>
                  </ul>

                  <h3>2.2 Información recopilada automáticamente</h3>
                  <p>Cuando visitas el sitio, podemos recopilar automáticamente cierta información sobre tu dispositivo, incluyendo:</p>
                  <ul>
                    <li>Dirección IP</li>
                    <li>Tipo y versión del navegador</li>
                    <li>Sistema operativo</li>
                    <li>Páginas visitadas y tiempo pasado en ellas</li>
                    <li>Direcciones web de referencia</li>
                  </ul>
                </section>

                <section>
                  <h2>3. Cómo usamos tu información</h2>
                  <p>Usamos la información recopilada para:</p>
                  <ul>
                    <li>Responder a tus consultas y prestar atención al cliente</li>
                    <li>Enviarte información sobre nuestros servicios con tu consentimiento</li>
                    <li>Mejorar el sitio y la experiencia de uso</li>
                    <li>Analizar patrones y tendencias de uso</li>
                    <li>Garantizar la seguridad e integridad del sitio</li>
                    <li>Cumplir obligaciones legales</li>
                  </ul>
                </section>

                <section>
                  <h2>4. Cookies y tecnologías de seguimiento</h2>
                  <p>
                    El sitio puede usar cookies y tecnologías similares para mejorar tu experiencia. Las cookies son pequeños
                    archivos de datos almacenados en tu dispositivo que nos ayudan a mejorar el sitio y ofrecer una mejor
                    experiencia.
                  </p>
                  <p>
                    Puedes controlar las cookies desde la configuración de tu navegador. Sin embargo, desactivarlas puede
                    afectar a la funcionalidad del sitio.
                  </p>
                </section>

                <section>
                  <h2>5. Servicios de terceros</h2>
                  <p>El sitio puede incluir enlaces a webs y servicios de terceros, entre ellos:</p>
                  <ul>
                    <li>Plataformas sociales como Instagram, LinkedIn, Twitter o Unsplash</li>
                    <li>Proveedores de servicios externos</li>
                  </ul>
                  <p>
                    No somos responsables de las prácticas de privacidad de esos servicios externos. Te recomendamos revisar
                    sus políticas antes de compartir información personal.
                  </p>
                </section>

                <section>
                  <h2>6. Seguridad de los datos</h2>
                  <p>
                    Aplicamos medidas técnicas y organizativas apropiadas para proteger tu información personal. Aun así,
                    ningún método de transmisión por Internet ni de almacenamiento electrónico es 100 % seguro. Aunque nos
                    esforzamos por proteger tus datos, no podemos garantizar seguridad absoluta.
                  </p>
                </section>

                <section>
                  <h2>7. Tus derechos</h2>
                  <p>Según tu ubicación, puedes tener ciertos derechos sobre tu información personal, entre ellos:</p>
                  <ul>
                    <li>Derecho de acceso a tu información personal</li>
                    <li>Derecho de rectificación de información inexacta</li>
                    <li>Derecho a solicitar la eliminación de tu información</li>
                    <li>Derecho a oponerte al tratamiento de tu información</li>
                    <li>Derecho a la portabilidad de los datos</li>
                  </ul>
                  <p>Para ejercer estos derechos, puedes contactarnos usando la información que aparece más abajo.</p>
                </section>

                <section>
                  <h2>8. Conservación de los datos</h2>
                  <p>
                    Conservaremos tu información personal solo durante el tiempo necesario para cumplir los fines descritos en
                    esta Política de Privacidad, salvo que la ley requiera o permita un periodo mayor.
                  </p>
                </section>

                <section>
                  <h2>9. Privacidad infantil</h2>
                  <p>
                    El sitio no está destinado a menores de 13 años. No recopilamos conscientemente información personal de
                    menores de 13 años. Si crees que hemos recopilado información de un menor, contáctanos de inmediato.
                  </p>
                </section>

                <section>
                  <h2>10. Cambios en esta Política de Privacidad</h2>
                  <p>
                    Podemos actualizar esta Política de Privacidad ocasionalmente. Notificaremos cualquier cambio publicando la
                    nueva versión en esta página y actualizando la fecha de &quot;Última actualización&quot;. Te recomendamos revisarla
                    periódicamente.
                  </p>
                </section>

                <section>
                  <h2>11. Contacto</h2>
                  <p>Si tienes alguna duda sobre esta Política de Privacidad, puedes escribirnos a:</p>
                  <ul>
                    <li>
                      Email: <a href="mailto:raulmermans@gmail.com">raulmermans@gmail.com</a>
                    </li>
                    <li>Ubicación: Madrid, España</li>
                  </ul>
                </section>
              </>
            ) : (
              <>
                <section>
                  <h2>1. Introduction</h2>
                  <p>
                    Welcome to the portfolio website of Raúl Mermans (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;).
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit
                    our website located at{' '}
                    <a href="https://www.raulmermans.com" target="_blank" rel="noopener noreferrer">
                      www.raulmermans.com
                    </a>
                    .
                  </p>
                  <p>
                    By using our website, you consent to the data practices described in this Privacy Policy. If you do not
                    agree with the data practices described here, you should not use the site.
                  </p>
                </section>

                <section>
                  <h2>2. Information We Collect</h2>
                  <h3>2.1 Information You Provide</h3>
                  <p>We may collect information that you voluntarily provide when you:</p>
                  <ul>
                    <li>Contact us through the contact form or email</li>
                    <li>Subscribe to our newsletter, if applicable</li>
                    <li>Interact with the website in any other way</li>
                  </ul>
                  <p>This information may include:</p>
                  <ul>
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Message content</li>
                    <li>Any other information you choose to provide</li>
                  </ul>

                  <h3>2.2 Automatically Collected Information</h3>
                  <p>When you visit the website, we may automatically collect certain information about your device, including:</p>
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
                    <li>Send you information about our services with your consent</li>
                    <li>Improve the website and user experience</li>
                    <li>Analyze usage patterns and trends</li>
                    <li>Ensure the security and integrity of the website</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </section>

                <section>
                  <h2>4. Cookies and Tracking Technologies</h2>
                  <p>
                    Our website may use cookies and similar tracking technologies to enhance your experience. Cookies are
                    small data files stored on your device that help us improve the website and provide a better experience.
                  </p>
                  <p>
                    You can control cookies through your browser settings. However, disabling cookies may affect the
                    functionality of the website.
                  </p>
                </section>

                <section>
                  <h2>5. Third-Party Services</h2>
                  <p>Our website may contain links to third-party websites and services, including:</p>
                  <ul>
                    <li>Social media platforms such as Instagram, LinkedIn, Twitter, and Unsplash</li>
                    <li>External service providers</li>
                  </ul>
                  <p>
                    We are not responsible for the privacy practices of those third-party services. We encourage you to
                    review their privacy policies before providing any personal information.
                  </p>
                </section>

                <section>
                  <h2>6. Data Security</h2>
                  <p>
                    We implement appropriate technical and organizational measures to protect your personal information.
                    However, no method of transmission over the Internet or electronic storage is 100% secure. While we
                    strive to protect your information, we cannot guarantee absolute security.
                  </p>
                </section>

                <section>
                  <h2>7. Your Rights</h2>
                  <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
                  <ul>
                    <li>The right to access your personal information</li>
                    <li>The right to rectify inaccurate information</li>
                    <li>The right to request deletion of your information</li>
                    <li>The right to object to the processing of your information</li>
                    <li>The right to data portability</li>
                  </ul>
                  <p>To exercise these rights, please contact us using the information provided below.</p>
                </section>

                <section>
                  <h2>8. Data Retention</h2>
                  <p>
                    We will retain your personal information only for as long as necessary to fulfill the purposes outlined
                    in this Privacy Policy, unless a longer retention period is required or permitted by law.
                  </p>
                </section>

                <section>
                  <h2>9. Children&apos;s Privacy</h2>
                  <p>
                    Our website is not intended for children under the age of 13. We do not knowingly collect personal
                    information from children under 13. If you believe we have collected information from a child, please
                    contact us immediately.
                  </p>
                </section>

                <section>
                  <h2>10. Changes to This Privacy Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
                    version on this page and updating the &quot;Last updated&quot; date. You are encouraged to review this page
                    periodically.
                  </p>
                </section>

                <section>
                  <h2>11. Contact Us</h2>
                  <p>If you have any questions about this Privacy Policy, please contact us:</p>
                  <ul>
                    <li>
                      Email: <a href="mailto:raulmermans@gmail.com">raulmermans@gmail.com</a>
                    </li>
                    <li>Location: Madrid, Spain</li>
                  </ul>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer locale={locale} />
    </div>
  )
}
