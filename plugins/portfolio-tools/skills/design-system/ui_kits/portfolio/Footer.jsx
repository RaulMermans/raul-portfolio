// Footer — dark ink surface. 4 columns + letter-mark social row.
function Footer({ lang, onNav }) {
  const cols = [
    {
      head: { en: 'Services', es: 'Servicios' },
      items: lang === 'en'
        ? ['AI Systems', 'Web Development', 'Photography', 'Creative Direction']
        : ['Sistemas IA', 'Desarrollo Web', 'Fotografía', 'Dirección Creativa'],
    },
    {
      head: { en: 'Work', es: 'Trabajo' },
      items: lang === 'en'
        ? ['Case Studies', 'Apps', 'Photography Archive', 'Visuals']
        : ['Casos de Estudio', 'Apps', 'Archivo Fotográfico', 'Visuales'],
    },
    {
      head: { en: 'Studio', es: 'Estudio' },
      items: lang === 'en'
        ? ['About', 'Contact', 'Availability', 'Press']
        : ['Acerca', 'Contacto', 'Disponibilidad', 'Prensa'],
    },
    {
      head: { en: 'Elsewhere', es: 'Otros' },
      items: ['Instagram', 'LinkedIn', 'Unsplash', 'X / Twitter'],
    },
  ];

  const socials = [
    { short: 'IG', label: 'Instagram' },
    { short: 'LI', label: 'LinkedIn' },
    { short: 'UN', label: 'Unsplash' },
    { short: 'X',  label: 'X / Twitter' },
  ];

  return (
    <footer id="footer" data-screen-label="Footer" style={{
      background: 'var(--ink)',
      color: 'var(--cream)',
      padding: '96px clamp(1.5rem, 6vw, 6rem) 48px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* subtle warm glow top-right */}
      <div aria-hidden style={{
        position: 'absolute',
        top: '-20%', right: '-10%',
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(255,170,136,0.12) 0%, transparent 65%)',
        filter: 'blur(90px)',
        pointerEvents: 'none',
      }}/>

      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 1400, margin: '0 auto',
      }}>
        {/* Giant wordmark */}
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(4rem, 12vw, 11rem)',
          lineHeight: 0.88, letterSpacing: '-0.02em',
          textTransform: 'uppercase', color: 'var(--cream)',
          margin: 0,
          paddingBottom: 48,
          borderBottom: '1px solid rgba(255,255,255,0.15)',
        }}>
          Raúl<br/>Mermans<span style={{ color: 'var(--accent)' }}>.</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 40, paddingTop: 48,
        }}>
          {cols.map((c, i) => (
            <div key={i}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 11,
                letterSpacing: '0.3em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)', marginBottom: 20,
              }}>— {c.head[lang]}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {c.items.map((item, j) => (
                  <li key={j}>
                    <a onClick={() => onNav && onNav(item)} style={{
                      fontFamily: 'var(--font-body)', fontSize: 15,
                      color: 'var(--cream)', textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'color 0.3s cubic-bezier(0.16,1,0.3,1)',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--cream)'}
                    >{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* socials row */}
        <div style={{
          marginTop: 72, paddingTop: 32,
          borderTop: '1px solid rgba(255,255,255,0.15)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 24,
        }}>
          <div style={{ display: 'flex', gap: 12 }}>
            {socials.map(s => (
              <a key={s.short} href="#" aria-label={s.label} style={{
                width: 44, height: 44, borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.25)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-mono)', fontSize: 11,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--cream)', textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.background = 'rgba(196,30,58,0.08)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = 'var(--cream)'; e.currentTarget.style.background = 'transparent'; }}
              >{s.short}</a>
            ))}
          </div>

          <div style={{
            display: 'flex', gap: 24, flexWrap: 'wrap',
            fontFamily: 'var(--font-mono)', fontSize: 11,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
          }}>
            <span>© 2026 Raúl Mermans</span>
            <span>Spain · GMT+1</span>
            <span>{lang === 'en' ? 'Available worldwide' : 'Disponible globalmente'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
