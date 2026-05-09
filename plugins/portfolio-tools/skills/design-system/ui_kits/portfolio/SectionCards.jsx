// SectionCards — the Work carousel. 3D-ish perspective: active card center,
// siblings slightly scaled/rotated. Per-section accent color.
function SectionCards({ lang }) {
  const sections = [
    {
      id: 'case-studies',
      eyebrow: { en: 'Case Studies', es: 'Casos de Estudio' },
      title:   { en: 'AI For Retail',  es: 'IA para Retail' },
      desc:    { en: 'Commercially credible agentic workflows for brand + operations teams.', es: 'Flujos agénticos con credibilidad comercial para marca y operaciones.' },
      meta: '01 / 04',
      accent: '#b94a53',
      bg: 'linear-gradient(135deg, #6B635A 0%, #3A3530 60%, #1A1714 100%)',
    },
    {
      id: 'apps',
      eyebrow: { en: 'Apps',          es: 'Apps' },
      title:   { en: 'Overflow',      es: 'Overflow' },
      desc:    { en: 'A reading companion for taste-driven archives. Quiet interface, opinionated defaults.', es: 'Un compañero de lectura para archivos con criterio. Interfaz tranquila, opiniones firmes.' },
      meta: '02 / 04',
      accent: '#3f9f8b',
      bg: 'linear-gradient(135deg, #2d5f54 0%, #1f4a42 60%, #0f2521 100%)',
    },
    {
      id: 'photography',
      eyebrow: { en: 'Photography',   es: 'Fotografía' },
      title:   { en: 'Archive 23',    es: 'Archivo 23' },
      desc:    { en: 'Supporting craft: composition, restraint, image judgment.', es: 'Oficio de apoyo: composición, contención, criterio visual.' },
      meta: '03 / 04',
      accent: '#9c7847',
      bg: 'linear-gradient(135deg, #6b4f2a 0%, #4a3820 60%, #2a1f12 100%)',
    },
    {
      id: 'visuals',
      eyebrow: { en: 'Visuals',       es: 'Visuales' },
      title:   { en: 'Brand Systems', es: 'Sistemas de Marca' },
      desc:    { en: 'Creative direction in service of clarity and execution.', es: 'Dirección creativa al servicio de la claridad y la ejecución.' },
      meta: '04 / 04',
      accent: '#d86d43',
      bg: 'linear-gradient(135deg, #8a4429 0%, #5f301c 60%, #2e1810 100%)',
    },
  ];

  const [active, setActive] = React.useState(0);
  const next = () => setActive(a => (a + 1) % sections.length);
  const prev = () => setActive(a => (a - 1 + sections.length) % sections.length);

  return (
    <section id="work" data-screen-label="Work" style={{
      minHeight: '100vh',
      padding: '120px clamp(1.5rem, 6vw, 6rem) 80px',
      background: 'var(--cream-warm)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        marginBottom: 48, maxWidth: 1400, marginInline: 'auto', gap: 24, flexWrap: 'wrap',
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 12,
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'var(--ink-faint)', marginBottom: 16,
          }}>— 01 / {lang === 'en' ? 'Selected Work' : 'Trabajo Seleccionado'}</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
            lineHeight: 0.92, letterSpacing: '-0.02em',
            textTransform: 'uppercase', color: 'var(--ink)', margin: 0,
          }}>
            {lang === 'en' ? (<>Systems in<br/>the Field.</>) : (<>Sistemas<br/>en Campo.</>)}
          </h2>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={prev} aria-label="Previous" style={carouselBtn}>‹</button>
          <button onClick={next} aria-label="Next" style={carouselBtn}>›</button>
        </div>
      </div>

      {/* carousel */}
      <div style={{
        position: 'relative', maxWidth: 1400, margin: '0 auto',
        height: 560, display: 'flex', alignItems: 'center', justifyContent: 'center',
        perspective: 1400,
      }}>
        {sections.map((s, i) => {
          const offset = i - active;
          const abs = Math.abs(offset);
          const hidden = abs > 2;
          const style = {
            position: 'absolute',
            width: 'min(640px, 80vw)', height: 520,
            transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.5s',
            transform: `translateX(${offset * 48}%) scale(${offset === 0 ? 1 : 0.84}) rotateY(${offset * -14}deg)`,
            opacity: hidden ? 0 : (offset === 0 ? 1 : 0.5),
            filter: offset === 0 ? 'none' : 'blur(2px)',
            zIndex: 10 - abs,
            cursor: offset === 0 ? 'default' : 'pointer',
          };
          return (
            <div key={s.id} style={style} onClick={() => offset !== 0 && setActive(i)}>
              <div style={{
                position: 'relative', width: '100%', height: '100%',
                background: s.bg,
                overflow: 'hidden',
                border: '1px solid rgba(26,23,20,0.2)',
              }}>
                {/* scrim */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, rgba(26,23,20,0.0) 0%, rgba(26,23,20,0.2) 40%, rgba(26,23,20,0.85) 100%)',
                }}/>
                {/* top accent line */}
                <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:s.accent }}/>
                {/* content */}
                <div style={{
                  position: 'absolute', inset: 0,
                  padding: 40,
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  color: 'var(--cream)',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 11,
                    letterSpacing: '0.3em', textTransform: 'uppercase',
                    color: s.accent,
                  }}>— {s.eyebrow[lang]}</div>

                  <div>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                      lineHeight: 0.95, letterSpacing: '-0.02em',
                      textTransform: 'uppercase', marginBottom: 16,
                    }}>{s.title[lang]}</div>
                    <div style={{
                      fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.6,
                      color: 'rgba(245,240,235,0.75)', maxWidth: 420, marginBottom: 24,
                    }}>{s.desc[lang]}</div>
                    <div style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                      borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 16,
                      fontFamily: 'var(--font-mono)', fontSize: 11,
                      letterSpacing: '0.25em', textTransform: 'uppercase',
                      color: 'rgba(245,240,235,0.7)',
                    }}>
                      <span>{s.meta}</span>
                      <span>{lang === 'en' ? 'Open' : 'Abrir'} ↗</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 48 }}>
        {sections.map((s, i) => (
          <button key={s.id} onClick={() => setActive(i)} aria-label={s.title.en} style={{
            width: active === i ? 40 : 8, height: 2, padding: 0, border: 'none',
            background: active === i ? s.accent : 'var(--ink-faint)',
            transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1), background 0.3s',
            cursor: 'pointer',
          }}/>
        ))}
      </div>
    </section>
  );
}

const carouselBtn = {
  width: 52, height: 52, borderRadius: '50%',
  border: '1px solid var(--ink)', background: 'transparent',
  fontFamily: 'var(--font-display)', fontSize: 28, lineHeight: 1,
  color: 'var(--ink)', cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
};

window.SectionCards = SectionCards;
