// About — portrait on left, serif reading body on right.
function About({ lang }) {
  const copy = {
    en: {
      eyebrow: '03 / About',
      title: 'Business-minded builder, systems-first by default.',
      p1: 'I came into this work through business, not design. What I build today sits somewhere between systems engineering and product design — quiet infrastructure that lets teams execute with less friction.',
      p2: 'I work with modern brand and product teams that need sharper execution between marketing, CRM, content, ops, and creative. The output varies — applied AI, a web build, a brand system, a campaign image — but the shape of the work is the same: commercially credible, visually restrained, operationally calm.',
      p3: 'Based in Spain. Available worldwide.',
      role: 'Applied AI · Web · Photography · Creative Direction',
    },
    es: {
      eyebrow: '03 / Acerca',
      title: 'Constructor con mentalidad de negocio, sistemas primero.',
      p1: 'Llegué a este trabajo desde el negocio, no desde el diseño. Lo que construyo hoy está entre la ingeniería de sistemas y el diseño de producto — infraestructura tranquila que permite ejecutar con menos fricción.',
      p2: 'Trabajo con equipos modernos de marca y producto que necesitan ejecución más afilada entre marketing, CRM, contenido, ops y creativo. El output varía — IA aplicada, un desarrollo web, un sistema de marca, una imagen de campaña — pero la forma del trabajo es la misma: credibilidad comercial, contención visual, calma operativa.',
      p3: 'Con base en España. Disponible en todo el mundo.',
      role: 'IA Aplicada · Web · Fotografía · Dirección Creativa',
    },
  }[lang];

  return (
    <section id="about" data-screen-label="About" style={{
      minHeight: '100vh',
      padding: '120px clamp(1.5rem, 6vw, 6rem) 80px',
      background: 'var(--cream-warm)',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'minmax(260px, 420px) 1fr',
        gap: 'clamp(40px, 7vw, 96px)', alignItems: 'center',
      }}>
        {/* portrait frame */}
        <div style={{
          aspectRatio: '3 / 4',
          background: 'linear-gradient(135deg, #8A827A 0%, #3A3530 60%, #1A1714 100%)',
          position: 'relative',
          border: '1px solid rgba(26,23,20,0.12)',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 50% 30%, rgba(232,208,200,0.25), transparent 60%)',
          }}/>
          <div style={{
            position: 'absolute', inset: '8% 15% auto 15%',
            textAlign: 'center',
            fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'rgba(245,240,235,0.5)',
          }}>[ Portrait · replace with /images/raul.webp ]</div>
          <div style={{
            position: 'absolute', bottom: 24, left: 24, right: 24,
            display: 'flex', justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'rgba(245,240,235,0.7)',
          }}>
            <span>Raúl Mermans</span>
            <span>ES · 26</span>
          </div>
        </div>

        <div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 12,
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'var(--ink-faint)', marginBottom: 16,
          }}>— {copy.eyebrow}</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            lineHeight: 0.95, letterSpacing: '-0.02em',
            textTransform: 'uppercase', color: 'var(--ink)',
            margin: 0, marginBottom: 40,
            maxWidth: '16ch',
          }}>{copy.title}</h2>

          <div style={{
            fontFamily: 'var(--font-reading)', fontSize: 18, lineHeight: 1.8,
            color: 'var(--ink-soft)', maxWidth: '58ch',
          }}>
            <p style={{ marginTop: 0 }}>{copy.p1}</p>
            <p>{copy.p2}</p>
            <p style={{ color: 'var(--ink)', fontStyle: 'italic' }}>{copy.p3}</p>
          </div>

          <div style={{
            marginTop: 40, paddingTop: 24,
            borderTop: '1px solid rgba(26,23,20,0.15)',
            display: 'flex', justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)', fontSize: 11,
            letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'var(--ink-muted)', flexWrap: 'wrap', gap: 12,
          }}>
            <span>{copy.role}</span>
            <span>Est. 2019</span>
          </div>
        </div>
      </div>
    </section>
  );
}

window.About = About;
