import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DisableScrollSnap from '@/components/DisableScrollSnap'
import OverflowLegalLinks from '@/components/overflow/OverflowLegalLinks'
import { PUBLIC_CONTACT_EMAIL } from '@/lib/contact'
import { type Locale, localizePath } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/metadata'

const LAST_UPDATED = '2026-04-10'
const SUPPORT_EMAIL = PUBLIC_CONTACT_EMAIL
const TESTFLIGHT_URL = 'https://testflight.apple.com/join/t7jQjsCx'

export type OverflowLegalPageKind = 'support' | 'privacy' | 'terms'

const metadataCopy = {
  support: {
    es: {
      title: 'Soporte de Overflow',
      description:
        'Página pública de soporte de Overflow con contacto, ayuda para la beta, enlaces legales y guía básica para incidencias de acceso, rutinas y sesiones.',
    },
    en: {
      title: 'Overflow Support',
      description:
        'Public Overflow support page with contact details, beta help, legal links, and guidance for access, routine, and workout-session issues.',
    },
  },
  privacy: {
    es: {
      title: 'Privacidad de Overflow',
      description:
        'Política de privacidad específica de Overflow sobre datos de cuenta, registros de entrenamiento, uso de la app, soporte y servicios de terceros.',
    },
    en: {
      title: 'Overflow Privacy Policy',
      description:
        'Overflow app privacy policy covering account data, workout records, app usage information, support requests, and third-party services.',
    },
  },
  terms: {
    es: {
      title: 'Términos de Overflow',
      description:
        'Términos públicos de Overflow para el uso de la app, cuentas, beta privada, propiedad intelectual, disponibilidad, soporte y limitaciones.',
    },
    en: {
      title: 'Overflow Terms',
      description:
        'Public Overflow terms covering app use, accounts, private beta access, intellectual property, availability, support, and limitations.',
    },
  },
} as const

function formatLastUpdated(locale: Locale) {
  return new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Europe/Madrid',
  }).format(new Date(`${LAST_UPDATED}T00:00:00+02:00`))
}

export function getOverflowLegalMetadata(page: OverflowLegalPageKind, locale: Locale = 'es'): Metadata {
  const meta = metadataCopy[page][locale]

  return buildPageMetadata({
    title: meta.title,
    description: meta.description,
    path: `/overflow/${page}`,
    locale,
    image: {
      url: '/images/apps/overflow/icon.webp',
      alt: locale === 'es' ? 'Icono de la app Overflow' : 'Overflow app icon',
    },
    keywords:
      locale === 'es'
        ? ['Overflow', 'soporte de app', 'política de privacidad', 'términos de la app', 'beta en TestFlight']
        : ['Overflow', 'app support', 'privacy policy', 'app terms', 'TestFlight beta'],
  })
}

function OverflowLegalShell({
  locale,
  page,
  title,
  intro,
  children,
}: {
  locale: Locale
  page: OverflowLegalPageKind
  title: string
  intro: string
  children: React.ReactNode
}) {
  const isSpanish = locale === 'es'

  return (
    <div className="legal-page-wrapper">
      <DisableScrollSnap />
      <Header locale={locale} />
      <main className="legal-page">
        <div className="legal-page__inner">
          <Link href={localizePath('/apps/overflow', locale)} className="legal-page__back">
            {isSpanish ? '← Volver a Overflow' : '← Back to Overflow'}
          </Link>

          <p className="legal-page__eyebrow">Overflow</p>
          <h1 className="legal-page__title">{title}</h1>
          <p className="legal-page__lede">{intro}</p>
          <div className="legal-page__section-links">
            <OverflowLegalLinks locale={locale} currentPage={page} />
          </div>
          <p className="legal-page__updated">
            {isSpanish ? 'Última actualización:' : 'Last updated:'} {formatLastUpdated(locale)}
          </p>

          <div className="legal-page__content">{children}</div>
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  )
}

function renderSupport(locale: Locale) {
  const isSpanish = locale === 'es'

  return (
    <>
      <section>
        <h2>{isSpanish ? '1. Cómo pedir ayuda' : '1. How to get help'}</h2>
        <p>
          {isSpanish
            ? 'Overflow es un diario de entrenamiento para iPhone, actualmente distribuido como beta privada por TestFlight. Si necesitas ayuda, la forma más directa es escribir a soporte con el contexto del problema.'
            : 'Overflow is an iPhone workout journal currently distributed as a private beta through TestFlight. If you need help, the fastest path is to email support with the context of the issue.'}
        </p>

        <div className="legal-page__panel-grid">
          <article className="legal-page__panel">
            <h3>{isSpanish ? 'Contacto directo' : 'Direct contact'}</h3>
            <p>
              {isSpanish
                ? 'Escribe a soporte desde el correo asociado a tu acceso a la beta para que podamos localizar tu caso más rápido.'
                : 'Email support from the address associated with your beta access so we can locate your case more quickly.'}
            </p>
            <p>
              <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
            </p>
          </article>

          <article className="legal-page__panel">
            <h3>{isSpanish ? 'Qué incluir' : 'What to include'}</h3>
            <p>
              {isSpanish
                ? 'Incluye tu modelo de iPhone, versión de iOS, build de TestFlight y una descripción breve de lo ocurrido.'
                : 'Include your iPhone model, iOS version, TestFlight build, and a short description of what happened.'}
            </p>
          </article>

          <article className="legal-page__panel">
            <h3>{isSpanish ? 'Acceso a la beta' : 'Beta access'}</h3>
            <p>
              {isSpanish
                ? 'Si el enlace de TestFlight no funciona o tu invitación ha caducado, vuelve a solicitar acceso desde la página pública de la app.'
                : 'If the TestFlight link no longer works or your invite expired, request access again from the public app page.'}
            </p>
            <p>
              <a href={TESTFLIGHT_URL} target="_blank" rel="noopener noreferrer">
                {isSpanish ? 'Abrir TestFlight' : 'Open TestFlight'}
              </a>
            </p>
          </article>

          <article className="legal-page__panel">
            <h3>{isSpanish ? 'Referencia pública' : 'Public reference'}</h3>
            <p>
              {isSpanish
                ? 'La página de Overflow dentro del portfolio resume el objetivo del producto, el flujo principal y el estado actual de la beta.'
                : 'The Overflow page on the portfolio summarizes the product goal, main flow, and current beta stage.'}
            </p>
            <p>
              <Link href={localizePath('/apps/overflow', locale)}>
                {isSpanish ? 'Ver la página de Overflow' : 'View the Overflow page'}
              </Link>
            </p>
          </article>
        </div>
      </section>

      <section>
        <h2>{isSpanish ? '2. Problemas habituales' : '2. Common issues'}</h2>
        <div className="legal-page__panel-grid">
          <article className="legal-page__panel">
            <h3>{isSpanish ? 'Cuenta o acceso' : 'Account or access'}</h3>
            <p>
              {isSpanish
                ? 'Si no puedes entrar, completar el flujo de acceso o abrir la beta, envíanos el correo que usaste y una captura si el error es visible.'
                : 'If you cannot sign in, finish the access flow, or open the beta, send the email you used and a screenshot if the issue is visible.'}
            </p>
          </article>

          <article className="legal-page__panel">
            <h3>{isSpanish ? 'Rutinas y planificación' : 'Routines and scheduling'}</h3>
            <p>
              {isSpanish
                ? 'Para incidencias al crear rutinas, asignarlas al calendario o mover sesiones dentro de la semana, indica el paso exacto que estabas intentando completar.'
                : 'For issues creating routines, placing them on the calendar, or moving sessions across the week, note the exact step you were trying to complete.'}
            </p>
          </article>

          <article className="legal-page__panel">
            <h3>{isSpanish ? 'Registro de sesiones y progreso' : 'Session log and progress'}</h3>
            <p>
              {isSpanish
                ? 'Si falta una sesión, un récord, una racha o un resumen de progreso, describe qué dato esperabas ver y desde qué pantalla estabas consultándolo.'
                : 'If a session, record, streak, or progress summary seems missing, describe what data you expected to see and which screen you were viewing.'}
            </p>
          </article>

          <article className="legal-page__panel">
            <h3>{isSpanish ? 'Perfil, privacidad o eliminación' : 'Profile, privacy, or deletion'}</h3>
            <p>
              {isSpanish
                ? 'También puedes usar este canal para solicitar ayuda con tu perfil, preguntas de privacidad o peticiones de eliminación de cuenta o datos.'
                : 'You can also use this channel for profile help, privacy questions, or account and data deletion requests.'}
            </p>
          </article>
        </div>
      </section>

      <section>
        <h2>{isSpanish ? '3. Cuenta y datos' : '3. Account and data help'}</h2>
        <p>
          {isSpanish
            ? 'Overflow está presentado públicamente como una app de entrenamiento centrada en rutinas, sesiones, planificación semanal y progreso. Si necesitas ayuda con el acceso a la cuenta o con los datos asociados a tu uso, escríbenos desde el correo vinculado a la beta.'
            : 'Overflow is publicly presented as a training app focused on routines, sessions, weekly planning, and progress. If you need help with account access or data associated with your use, email us from the address tied to your beta access.'}
        </p>
        <ul>
          <li>
            {isSpanish
              ? 'Solicitudes de eliminación: envía un correo indicando que quieres borrar tu cuenta y los datos asociados.'
              : 'Deletion requests: email support stating that you want your account and associated data removed.'}
          </li>
          <li>
            {isSpanish
              ? 'Preguntas sobre privacidad: utiliza la política de privacidad específica de Overflow como referencia principal.'
              : 'Privacy questions: use the Overflow privacy policy as the primary reference.'}
          </li>
          <li>
            {isSpanish
              ? 'Condiciones de uso: revisa los términos de Overflow para las reglas básicas de acceso y uso de la beta.'
              : 'Usage conditions: review the Overflow terms for the basic rules that apply to access and beta use.'}
          </li>
        </ul>
      </section>

      <section>
        <h2>{isSpanish ? '4. Privacidad y términos' : '4. Privacy and terms'}</h2>
        <p>
          {isSpanish
            ? 'Para detalles sobre tratamiento de datos, uso de la app y solicitudes de eliminación, consulta las páginas enlazadas aquí.'
            : 'For details about data handling, app use, and deletion requests, use the pages linked here.'}
        </p>
        <OverflowLegalLinks locale={locale} currentPage="support" />
      </section>

      <section>
        <h2>{isSpanish ? '5. Contacto' : '5. Contact'}</h2>
        <p>
          {isSpanish ? 'Soporte de Overflow:' : 'Overflow support:'}{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
        </p>
      </section>
    </>
  )
}

function renderPrivacy(locale: Locale) {
  const isSpanish = locale === 'es'

  return (
    <>
      <section>
        <h2>{isSpanish ? '1. Resumen' : '1. Overview'}</h2>
        <p>
          {isSpanish
            ? 'Esta política se aplica a la app móvil Overflow y a sus páginas públicas de soporte. Overflow se presenta en este repositorio como un diario de entrenamiento para iPhone centrado en rutinas, planificación semanal, registro rápido y seguimiento del progreso.'
            : 'This policy applies to the Overflow mobile app and its public support pages. Overflow is presented in this repository as an iPhone workout journal focused on routines, weekly planning, fast logging, and progress tracking.'}
        </p>
        <p>
          {isSpanish
            ? 'Como la app está en beta privada, algunas prácticas pueden evolucionar mientras el producto madura. Si un tratamiento importante cambia, esta política se actualizará.'
            : 'Because the app is in a private beta stage, some practices may evolve as the product matures. If a material data practice changes, this policy will be updated.'}
        </p>
      </section>

      <section>
        <h2>{isSpanish ? '2. Información que podemos recopilar' : '2. Information we may collect'}</h2>
        <p>
          {isSpanish
            ? 'Dependiendo de cómo uses Overflow, podemos tratar información que tú mismo proporcionas o que se genera a partir del uso de la app.'
            : 'Depending on how you use Overflow, we may process information you provide directly or information generated through use of the app.'}
        </p>
        <ul>
          <li>
            {isSpanish
              ? 'Datos de cuenta o perfil, como email, identificadores de acceso, nombre visible o preferencias, si la build que utilizas incluye registro o inicio de sesión.'
              : 'Account or profile data, such as your email address, sign-in identifiers, display name, or preferences, if the build you use includes registration or sign-in.'}
          </li>
          <li>
            {isSpanish
              ? 'Datos de entrenamiento que introduces en la app, como rutinas, sesiones programadas, registros de sets, peso, repeticiones, descanso, hitos, rachas y resúmenes de progreso.'
              : 'Training data you enter into the app, such as routines, scheduled sessions, set logs, weight, reps, rest, milestones, streaks, and progress summaries.'}
          </li>
          <li>
            {isSpanish
              ? 'Mensajes o información que compartes cuando pides soporte o haces una solicitud relacionada con tu cuenta.'
              : 'Messages or information you share when requesting support or making an account-related request.'}
          </li>
        </ul>
      </section>

      <section>
        <h2>{isSpanish ? '3. Cómo usamos la información' : '3. How we use information'}</h2>
        <ul>
          <li>
            {isSpanish
              ? 'Para prestar las funciones principales de Overflow, incluyendo planificación, registro y lectura del progreso.'
              : 'To provide Overflow’s core features, including planning, logging, and reviewing progress.'}
          </li>
          <li>
            {isSpanish
              ? 'Para mantener tu cuenta, tus preferencias y tus registros dentro de la beta.'
              : 'To maintain your account, preferences, and records within the beta.'}
          </li>
          <li>
            {isSpanish
              ? 'Para responder a soporte, revisar incidencias y mejorar la estabilidad del producto.'
              : 'To respond to support requests, review issues, and improve product stability.'}
          </li>
          <li>
            {isSpanish
              ? 'Para proteger la app, prevenir abuso y cumplir obligaciones legales razonables.'
              : 'To protect the app, prevent abuse, and comply with reasonable legal obligations.'}
          </li>
        </ul>
      </section>

      <section>
        <h2>{isSpanish ? '4. Datos de cuenta y autenticación' : '4. Account and authentication data'}</h2>
        <p>
          {isSpanish
            ? 'Las capturas y materiales públicos de Overflow incluyen superficies de autenticación y perfil. Si creas una cuenta o inicias sesión, Overflow puede procesar la información necesaria para identificarte, proteger el acceso y mantener tus preferencias y registros.'
            : 'Overflow’s public materials include authentication and profile surfaces. If you create an account or sign in, Overflow may process the information needed to identify you, protect access, and preserve your preferences and records.'}
        </p>
        {/* Manual review: confirm the exact authentication provider stack before naming any provider here. */}
      </section>

      <section>
        <h2>{isSpanish ? '5. Datos de uso y del dispositivo' : '5. App and device usage data'}</h2>
        <p>
          {isSpanish
            ? 'Dependiendo de la build y del contexto de soporte, Overflow puede recibir o generar información técnica como versión de la app, versión de iOS, tipo de dispositivo, idioma, zona horaria aproximada y eventos relacionados con el uso de la beta.'
            : 'Depending on the build and support context, Overflow may receive or generate technical information such as app version, iOS version, device type, language, approximate time zone, and events related to beta use.'}
        </p>
        <p>
          {isSpanish
            ? 'También puede conservar el historial operativo que tú mismo generas al usar la app, como sesiones completadas, registros de entrenamiento, calendarios, hitos y tendencias de progreso.'
            : 'Overflow may also retain the operating history you create through use of the app, such as completed sessions, workout logs, calendar entries, milestones, and progress trends.'}
        </p>
      </section>

      <section>
        <h2>{isSpanish ? '6. Acceso a fotos, medios o cámara' : '6. Media, photos, and camera access'}</h2>
        <p>
          {isSpanish
            ? 'Los materiales públicos actuales de Overflow describen una app de entrenamiento y planificación, no una app centrada en cámara o biblioteca de fotos. Si en el futuro una función requiere acceso a fotos, archivos o cámara, iOS pedirá permiso en ese momento.'
            : 'Overflow’s current public materials describe a training and planning app, not a camera-first or photo-library-first product. If a future feature requires access to photos, files, or the camera, iOS will request permission at that moment.'}
        </p>
        <p>
          {isSpanish
            ? 'Siempre podrás gestionar esos permisos desde los ajustes del dispositivo.'
            : 'You can manage those permissions from your device settings at any time.'}
        </p>
      </section>

      <section>
        <h2>{isSpanish ? '7. Servicios y proveedores de terceros' : '7. Third-party services and providers'}</h2>
        <p>
          {isSpanish
            ? 'Overflow se distribuye públicamente como beta privada mediante TestFlight. Si te unes a la beta, Apple puede procesar información relacionada con la distribución de la build según sus propias políticas y condiciones.'
            : 'Overflow is publicly distributed as a private beta through TestFlight. If you join the beta, Apple may process information related to build distribution under its own policies and terms.'}
        </p>
        <p>
          {isSpanish
            ? 'Overflow también puede apoyarse en proveedores externos para infraestructura, autenticación, almacenamiento, soporte o diagnósticos. Cuando eso ocurra, el acceso a la información debería limitarse a lo razonablemente necesario para operar la app o responderte.'
            : 'Overflow may also rely on external providers for infrastructure, authentication, storage, support, or diagnostics. When that happens, access to information should be limited to what is reasonably needed to operate the app or respond to you.'}
        </p>
        {/* Manual review: add named app-specific providers here once they are verified in product code or operational docs. */}
      </section>

      <section>
        <h2>{isSpanish ? '8. Conservación de los datos' : '8. Data retention'}</h2>
        <p>
          {isSpanish
            ? 'Conservamos la información durante el tiempo razonablemente necesario para operar Overflow, mantener tus registros, gestionar soporte, evaluar la beta y cumplir obligaciones legales. Los periodos concretos pueden variar según el tipo de dato y la etapa del producto.'
            : 'We keep information for as long as reasonably necessary to operate Overflow, maintain your records, handle support, evaluate the beta, and meet legal obligations. Exact retention periods may vary by data type and product stage.'}
        </p>
      </section>

      <section>
        <h2>{isSpanish ? '9. Eliminación de cuenta y datos' : '9. Account deletion and data deletion'}</h2>
        <p>
          {isSpanish
            ? 'Si quieres solicitar la eliminación de tu cuenta o de tus datos, escribe a soporte desde el correo vinculado a tu acceso a Overflow. Describe tu solicitud con suficiente detalle para poder localizar tu caso.'
            : 'If you want to request deletion of your account or your data, email support from the address linked to your Overflow access. Please describe your request clearly enough for us to locate your case.'}
        </p>
        <p>
          {isSpanish
            ? 'Si una build futura incorpora eliminación autoservicio dentro de la app, esta política se podrá actualizar para reflejar ese flujo.'
            : 'If a future build adds self-serve deletion inside the app, this policy may be updated to reflect that flow.'}
        </p>
        {/* Manual review: confirm whether any in-app self-serve deletion flow exists before changing this section. */}
      </section>

      <section>
        <h2>{isSpanish ? '10. Privacidad infantil' : '10. Children’s privacy'}</h2>
        <p>
          {isSpanish
            ? 'Overflow no está diseñado intencionadamente para menores de 13 años. Si crees que un menor nos ha proporcionado información personal, escríbenos para revisar el caso.'
            : 'Overflow is not intentionally designed for children under 13. If you believe a child has provided personal information, contact us so we can review the case.'}
        </p>
      </section>

      <section>
        <h2>{isSpanish ? '11. Cambios en esta política' : '11. Changes to this policy'}</h2>
        <p>
          {isSpanish
            ? 'Podemos actualizar esta política para reflejar cambios en Overflow, en la beta o en nuestras prácticas operativas. Cuando eso ocurra, publicaremos la versión revisada en esta misma página.'
            : 'We may update this policy to reflect changes to Overflow, the beta, or our operating practices. When that happens, we will publish the revised version on this page.'}
        </p>
      </section>

      <section>
        <h2>{isSpanish ? '12. Contacto' : '12. Contact'}</h2>
        <p>
          {isSpanish
            ? 'Para preguntas de privacidad o solicitudes relacionadas con tus datos:'
            : 'For privacy questions or requests related to your data:'}
        </p>
        <ul>
          <li>
            Email: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
          </li>
          <li>
            <Link href={localizePath('/overflow/support', locale)}>
              {isSpanish ? 'Página pública de soporte de Overflow' : 'Overflow support page'}
            </Link>
          </li>
        </ul>
      </section>

      <section>
        <h2>{isSpanish ? '13. Última actualización' : '13. Last updated'}</h2>
        <p>{formatLastUpdated(locale)}</p>
      </section>
    </>
  )
}

function renderTerms(locale: Locale) {
  const isSpanish = locale === 'es'

  return (
    <>
      <section>
        <h2>{isSpanish ? '1. Aceptación de los términos' : '1. Acceptance of terms'}</h2>
        <p>
          {isSpanish
            ? 'Al acceder a Overflow, usar la beta privada en TestFlight o visitar sus páginas públicas de soporte, aceptas estos términos.'
            : 'By accessing Overflow, using its private beta through TestFlight, or visiting its public support pages, you agree to these terms.'}
        </p>
      </section>

      <section>
        <h2>{isSpanish ? '2. Uso de la app' : '2. Use of the app'}</h2>
        <p>
          {isSpanish
            ? 'Overflow se ofrece como una app para iPhone centrada en rutinas, sesiones, planificación y progreso. Puedes usarla únicamente con fines legales y conforme a la finalidad prevista del producto.'
            : 'Overflow is offered as an iPhone app focused on routines, sessions, planning, and progress. You may use it only for lawful purposes and in line with the intended purpose of the product.'}
        </p>
      </section>

      <section>
        <h2>{isSpanish ? '3. Cuentas' : '3. Accounts'}</h2>
        <p>
          {isSpanish
            ? 'Si una build de Overflow incluye cuenta o inicio de sesión, eres responsable de la exactitud de la información que aportas y de mantener la confidencialidad de tus credenciales.'
            : 'If a build of Overflow includes an account or sign-in flow, you are responsible for the accuracy of the information you provide and for keeping your credentials confidential.'}
        </p>
      </section>

      <section>
        <h2>{isSpanish ? '4. Uso aceptable' : '4. Acceptable use'}</h2>
        <ul>
          <li>
            {isSpanish
              ? 'No utilices Overflow para infringir leyes, vulnerar derechos de terceros o interferir con la experiencia de otros usuarios.'
              : 'Do not use Overflow to break the law, infringe third-party rights, or interfere with the experience of other users.'}
          </li>
          <li>
            {isSpanish
              ? 'No intentes acceder a builds, cuentas o sistemas de forma no autorizada.'
              : 'Do not attempt to access builds, accounts, or systems without authorization.'}
          </li>
          <li>
            {isSpanish
              ? 'No descompiles, hagas ingeniería inversa ni explotes la beta más allá de lo permitido por la legislación aplicable.'
              : 'Do not decompile, reverse engineer, or exploit the beta beyond what applicable law allows.'}
          </li>
        </ul>
      </section>

      <section>
        <h2>{isSpanish ? '5. Disponibilidad y cambios' : '5. Availability and changes'}</h2>
        <p>
          {isSpanish
            ? 'Overflow está en fase beta privada. Las funciones, la disponibilidad, el acceso y el contenido de la app pueden cambiar, pausarse o retirarse sin previo aviso.'
            : 'Overflow is in a private beta stage. Features, availability, access, and app content may change, pause, or be removed without prior notice.'}
        </p>
      </section>

      <section>
        <h2>{isSpanish ? '6. Propiedad intelectual' : '6. Intellectual property'}</h2>
        <p>
          {isSpanish
            ? 'Overflow, su diseño, sus materiales y su documentación siguen siendo propiedad de Raúl Mermans o de sus licenciantes. Estos términos no te transfieren ningún derecho de propiedad sobre la app.'
            : 'Overflow, its design, materials, and documentation remain the property of Raúl Mermans or the relevant licensors. These terms do not transfer any ownership rights in the app to you.'}
        </p>
      </section>

      <section>
        <h2>{isSpanish ? '7. Exención de responsabilidad' : '7. Disclaimers'}</h2>
        <p>
          {isSpanish
            ? 'Overflow se ofrece “tal cual” y “según disponibilidad”, especialmente durante la beta privada. No garantizamos que la app sea ininterrumpida, esté libre de errores o sea adecuada para un objetivo concreto.'
            : 'Overflow is provided “as is” and “as available,” especially during the private beta. We do not guarantee that the app will be uninterrupted, error-free, or fit for a particular purpose.'}
        </p>
      </section>

      <section>
        <h2>{isSpanish ? '8. Limitación de responsabilidad' : '8. Limitation of liability'}</h2>
        <p>
          {isSpanish
            ? 'En la medida permitida por la ley, no seremos responsables de daños indirectos, incidentales, especiales o consecuentes derivados del uso o de la imposibilidad de uso de Overflow.'
            : 'To the extent permitted by law, we are not liable for indirect, incidental, special, or consequential damages arising from the use of, or inability to use, Overflow.'}
        </p>
      </section>

      <section>
        <h2>{isSpanish ? '9. Terminación' : '9. Termination'}</h2>
        <p>
          {isSpanish
            ? 'Podemos limitar, suspender o terminar el acceso a Overflow si es necesario para proteger la app, la beta o a otros usuarios, o si incumples estos términos.'
            : 'We may limit, suspend, or terminate access to Overflow if it is necessary to protect the app, the beta, or other users, or if you violate these terms.'}
        </p>
      </section>

      <section>
        <h2>{isSpanish ? '10. Contacto' : '10. Contact'}</h2>
        <p>
          {isSpanish
            ? 'Para preguntas sobre estos términos:'
            : 'For questions about these terms:'}
        </p>
        <ul>
          <li>
            Email: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
          </li>
          <li>
            <Link href={localizePath('/overflow/support', locale)}>
              {isSpanish ? 'Soporte de Overflow' : 'Overflow support'}
            </Link>
          </li>
        </ul>
      </section>

      <section>
        <h2>{isSpanish ? '11. Última actualización' : '11. Last updated'}</h2>
        <p>{formatLastUpdated(locale)}</p>
      </section>
    </>
  )
}

export function OverflowLegalPageView({
  page,
  locale = 'es',
}: {
  page: OverflowLegalPageKind
  locale?: Locale
}) {
  const isSpanish = locale === 'es'

  if (page === 'support') {
    return (
      <OverflowLegalShell
        locale={locale}
        page={page}
        title={isSpanish ? 'Soporte de Overflow' : 'Overflow Support'}
        intro={
          isSpanish
            ? 'Overflow es un diario de entrenamiento para iPhone con enfoque calmado, actualmente disponible como beta privada. Esta página reúne la referencia pública de soporte, privacidad y términos para App Store Connect y para los usuarios de la beta.'
            : 'Overflow is a calm iPhone training journal currently available as a private beta. This page is the public support, privacy, and terms reference for App Store Connect and beta users.'
        }
      >
        {renderSupport(locale)}
      </OverflowLegalShell>
    )
  }

  if (page === 'privacy') {
    return (
      <OverflowLegalShell
        locale={locale}
        page={page}
        title={isSpanish ? 'Privacidad de Overflow' : 'Overflow Privacy Policy'}
        intro={
          isSpanish
            ? 'Esta política describe, de forma conservadora y específica para la app, cómo Overflow puede tratar información relacionada con cuentas, entrenamientos, uso de la beta y solicitudes de soporte.'
            : 'This policy describes, in app-specific and conservative terms, how Overflow may handle information related to accounts, training records, beta usage, and support requests.'
        }
      >
        {renderPrivacy(locale)}
      </OverflowLegalShell>
    )
  }

  return (
    <OverflowLegalShell
      locale={locale}
      page={page}
      title={isSpanish ? 'Términos de Overflow' : 'Overflow Terms'}
      intro={
        isSpanish
          ? 'Estos términos explican las reglas básicas que se aplican al acceso y uso de Overflow, incluidas sus builds beta y sus páginas públicas de soporte.'
          : 'These terms explain the basic rules that apply to access and use of Overflow, including its beta builds and public support pages.'
      }
    >
      {renderTerms(locale)}
    </OverflowLegalShell>
  )
}
