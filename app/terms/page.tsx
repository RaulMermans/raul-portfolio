'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getLocaleFromPath, localizePath } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DisableScrollSnap from '@/components/DisableScrollSnap'

export default function TermsOfService() {
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

          <h1 className="legal-page__title">{isSpanish ? 'Términos de Servicio' : 'Terms of Service'}</h1>
          <p className="legal-page__updated">
            {isSpanish ? 'Última actualización:' : 'Last updated:'} {formattedDate}
          </p>

          <div className="legal-page__content">
            {isSpanish ? (
              <>
                <section>
                  <h2>1. Aceptación de los términos</h2>
                  <p>
                    Al acceder y utilizar el sitio web de Raúl Mermans (&quot;nosotros&quot;, &quot;nuestro&quot; o
                    &quot;nos&quot;) en{' '}
                    <a href="https://www.raulmermans.com" target="_blank" rel="noopener noreferrer">
                      www.raulmermans.com
                    </a>
                    , aceptas quedar vinculado por estos términos y condiciones.
                  </p>
                  <p>Si no estás de acuerdo con ellos, por favor no utilices este sitio web.</p>
                </section>

                <section>
                  <h2>2. Licencia de uso</h2>
                  <p>
                    Se concede permiso para acceder y visualizar temporalmente los materiales de este sitio únicamente con
                    fines personales, no comerciales y transitorios. Esto supone una licencia, no una transferencia de
                    titularidad, y bajo esta licencia no puedes:
                  </p>
                  <ul>
                    <li>Modificar o copiar los materiales</li>
                    <li>Usarlos con fines comerciales o para exhibición pública, comercial o no comercial</li>
                    <li>Intentar descompilar o hacer ingeniería inversa del software del sitio</li>
                    <li>Eliminar avisos de copyright u otras indicaciones de propiedad</li>
                    <li>Transferir los materiales a otra persona o replicarlos en otro servidor</li>
                  </ul>
                  <p>
                    Esta licencia se extinguirá automáticamente si incumples cualquiera de estas restricciones y puede ser
                    revocada por nosotros en cualquier momento.
                  </p>
                </section>

                <section>
                  <h2>3. Derechos de propiedad intelectual</h2>
                  <p>
                    Todo el contenido del sitio, incluyendo texto, gráficos, logotipos, imágenes, fotografías, clips de
                    audio, clips de vídeo, descargas digitales y software, es propiedad de Raúl Mermans o de sus proveedores
                    de contenido y está protegido por leyes internacionales de propiedad intelectual.
                  </p>
                  <p>
                    No puedes reproducir, distribuir, modificar, crear obras derivadas, mostrar públicamente, volver a
                    publicar, descargar, almacenar o transmitir ningún material del sitio sin consentimiento previo por
                    escrito, salvo en los siguientes casos:
                  </p>
                  <ul>
                    <li>Tu ordenador puede almacenar copias temporales en memoria RAM como parte normal de la navegación</li>
                    <li>Tu navegador puede guardar archivos en caché para mejorar la visualización</li>
                    <li>Puedes imprimir o descargar una copia razonable de páginas del sitio para uso personal y no comercial</li>
                  </ul>
                </section>

                <section>
                  <h2>4. Conducta del usuario</h2>
                  <p>Aceptas no usar el sitio web:</p>
                  <ul>
                    <li>De ninguna forma que infrinja la legislación aplicable</li>
                    <li>Para transmitir o promover material publicitario sin nuestro consentimiento previo</li>
                    <li>Para suplantarnos a nosotros, a nuestros empleados o a cualquier otra persona o entidad</li>
                    <li>De cualquier modo que infrinja derechos ajenos, o que sea ilegal, amenazante, fraudulento o dañino</li>
                    <li>Para realizar cualquier conducta que limite o impida el uso del sitio por parte de otras personas</li>
                  </ul>
                </section>

                <section>
                  <h2>5. Exención de responsabilidad</h2>
                  <p>
                    Los materiales del sitio se proporcionan &quot;tal cual&quot;. No ofrecemos garantías, expresas o
                    implícitas, y rechazamos todas las demás garantías, incluidas sin limitación las de comerciabilidad,
                    idoneidad para un fin determinado o no infracción.
                  </p>
                  <p>
                    Tampoco garantizamos ni hacemos declaraciones sobre la exactitud, resultados probables o fiabilidad del
                    uso de los materiales del sitio o de los sitios enlazados.
                  </p>
                </section>

                <section>
                  <h2>6. Limitaciones</h2>
                  <p>
                    En ningún caso Raúl Mermans o sus proveedores serán responsables de daños, incluyendo sin limitación
                    pérdida de datos, beneficios o interrupción del negocio, derivados del uso o la imposibilidad de uso de
                    los materiales del sitio, incluso si se hubiera advertido de dicha posibilidad.
                  </p>
                </section>

                <section>
                  <h2>7. Exactitud de los materiales</h2>
                  <p>
                    Los materiales publicados en el sitio podrían incluir errores técnicos, tipográficos o fotográficos. No
                    garantizamos que sean exactos, completos o actuales. Podemos cambiar los materiales del sitio en
                    cualquier momento sin previo aviso.
                  </p>
                </section>

                <section>
                  <h2>8. Enlaces</h2>
                  <p>
                    No hemos revisado todos los sitios enlazados desde esta web y no somos responsables de sus contenidos.
                    La inclusión de cualquier enlace no implica respaldo alguno. El uso de esos sitios enlazados es por
                    cuenta y riesgo del usuario.
                  </p>
                </section>

                <section>
                  <h2>9. Modificaciones</h2>
                  <p>
                    Podemos revisar estos Términos de Servicio en cualquier momento sin previo aviso. Al usar el sitio,
                    aceptas quedar vinculado por la versión vigente en cada momento.
                  </p>
                </section>

                <section>
                  <h2>10. Ley aplicable</h2>
                  <p>
                    Estos términos se rigen e interpretan conforme a las leyes de España, y aceptas someterte a la
                    jurisdicción exclusiva de sus tribunales.
                  </p>
                </section>

                <section>
                  <h2>11. Información de contacto</h2>
                  <p>Si tienes preguntas sobre estos Términos de Servicio, puedes contactarnos en:</p>
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
                  <h2>1. Acceptance of Terms</h2>
                  <p>
                    By accessing and using the website of Raúl Mermans (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)
                    located at{' '}
                    <a href="https://www.raulmermans.com" target="_blank" rel="noopener noreferrer">
                      www.raulmermans.com
                    </a>
                    , you accept and agree to be bound by these terms and conditions.
                  </p>
                  <p>If you do not agree to abide by them, please do not use this website.</p>
                </section>

                <section>
                  <h2>2. Use License</h2>
                  <p>
                    Permission is granted to temporarily access and view the materials on this website for personal,
                    non-commercial, transitory viewing only. This is the grant of a license, not a transfer of title, and
                    under this license you may not:
                  </p>
                  <ul>
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or public display</li>
                    <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                    <li>Transfer the materials to another person or mirror them on another server</li>
                  </ul>
                  <p>
                    This license shall automatically terminate if you violate any of these restrictions and may be terminated
                    by us at any time.
                  </p>
                </section>

                <section>
                  <h2>3. Intellectual Property Rights</h2>
                  <p>
                    All content on this website, including text, graphics, logos, images, photographs, audio clips, video
                    clips, digital downloads, and software, is the property of Raúl Mermans or its content suppliers and is
                    protected by international intellectual property laws.
                  </p>
                  <p>
                    You may not reproduce, distribute, modify, create derivative works of, publicly display, republish,
                    download, store, or transmit any material from the website without prior written consent, except as
                    follows:
                  </p>
                  <ul>
                    <li>Your computer may temporarily store copies in RAM incidental to viewing the materials</li>
                    <li>Your browser may cache files to enhance display</li>
                    <li>You may print or download one reasonable copy of pages for personal, non-commercial use</li>
                  </ul>
                </section>

                <section>
                  <h2>4. User Conduct</h2>
                  <p>You agree not to use the website:</p>
                  <ul>
                    <li>In any way that violates applicable law or regulation</li>
                    <li>To transmit advertising or promotional material without prior written consent</li>
                    <li>To impersonate us, our employees, another user, or any other person or entity</li>
                    <li>In any way that infringes on the rights of others or is unlawful, threatening, fraudulent, or harmful</li>
                    <li>To engage in conduct that restricts or inhibits anyone&apos;s use of the website</li>
                  </ul>
                </section>

                <section>
                  <h2>5. Disclaimer</h2>
                  <p>
                    The materials on this website are provided on an &quot;as is&quot; basis. We make no warranties, express
                    or implied, and disclaim all other warranties including, without limitation, implied warranties of
                    merchantability, fitness for a particular purpose, or non-infringement.
                  </p>
                  <p>
                    We also do not warrant or make representations concerning the accuracy, likely results, or reliability of
                    the use of the materials on this website or on any sites linked from it.
                  </p>
                </section>

                <section>
                  <h2>6. Limitations</h2>
                  <p>
                    In no event shall Raúl Mermans or its suppliers be liable for any damages, including without limitation
                    damages for loss of data or profit, or due to business interruption, arising out of the use or inability
                    to use the materials on this website, even if we have been notified of the possibility of such damage.
                  </p>
                </section>

                <section>
                  <h2>7. Accuracy of Materials</h2>
                  <p>
                    The materials appearing on this website could include technical, typographical, or photographic errors.
                    We do not warrant that any of the materials are accurate, complete, or current. We may make changes to
                    the materials at any time without notice.
                  </p>
                </section>

                <section>
                  <h2>8. Links</h2>
                  <p>
                    We have not reviewed all of the sites linked from this website and are not responsible for the contents
                    of any linked site. The inclusion of any link does not imply endorsement. Use of any linked website is
                    at the user&apos;s own risk.
                  </p>
                </section>

                <section>
                  <h2>9. Modifications</h2>
                  <p>
                    We may revise these Terms of Service at any time without notice. By using this website, you agree to be
                    bound by the then-current version.
                  </p>
                </section>

                <section>
                  <h2>10. Governing Law</h2>
                  <p>
                    These terms and conditions are governed by and construed in accordance with the laws of Spain, and you
                    irrevocably submit to the exclusive jurisdiction of its courts.
                  </p>
                </section>

                <section>
                  <h2>11. Contact Information</h2>
                  <p>If you have any questions about these Terms of Service, please contact us:</p>
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
