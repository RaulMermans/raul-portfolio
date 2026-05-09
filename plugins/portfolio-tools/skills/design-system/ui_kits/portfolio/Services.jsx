// Services — accordion with flex-steal hover. Four vertical columns.
function Services({ lang }) {
  const [open, setOpen] = React.useState(0);

  const services = [
    {
      num: '/ 01',
      title: { en: 'AI Systems', es: 'Sistemas IA' },
      tags:  { en: 'Agents · Orchestration · Automation', es: 'Agentes · Orquestación · Automatización' },
      desc:  { en: 'Applied AI systems that turn repetitive, judgment-heavy work into reliable execution. Agents, orchestration, and decision flows built for real teams, not demo theatre.',
               es: 'Sistemas de IA aplicada que convierten trabajo repetitivo y de juicio en ejecución fiable. Agentes, orquestación y flujos de decisión para equipos reales, no teatro de demo.' },
      bullets: [
        { en: 'Agentic workflow design',  es: 'Diseño de flujos agénticos' },
        { en: 'Orchestration + deployment', es: 'Orquestación + despliegue' },
        { en: 'Human-review loops',        es: 'Bucles de revisión humana' },
        { en: 'Operational infrastructure',es: 'Infraestructura operativa' },
      ],
    },
    {
      num: '/ 02',
      title: { en: 'Web Development', es: 'Desarrollo Web' },
      tags:  { en: 'Product · Marketing · Commerce', es: 'Producto · Marketing · E-commerce' },
      desc:  { en: 'Calmer interfaces, faster builds. Product-minded sites for modern brands — focused on execution, not showreel.',
               es: 'Interfaces más calmadas, builds más rápidos. Sitios con mentalidad de producto para marcas modernas.' },
      bullets: [
        { en: 'Next.js · TypeScript', es: 'Next.js · TypeScript' },
        { en: 'Headless commerce',    es: 'Commerce headless' },
        { en: 'CMS integrations',     es: 'Integraciones CMS' },
        { en: 'Performance + SEO',    es: 'Rendimiento + SEO' },
      ],
    },
    {
      num: '/ 03',
      title: { en: 'Photography', es: 'Fotografía' },
      tags:  { en: 'Editorial · Lookbook · Product', es: 'Editorial · Lookbook · Producto' },
      desc:  { en: 'Supporting craft: composition, restraint, image judgment. Campaign, product and editorial work.',
               es: 'Oficio de apoyo: composición, contención, criterio visual. Campañas, producto y editorial.' },
      bullets: [
        { en: 'Editorial campaigns', es: 'Campañas editoriales' },
        { en: 'Product + lookbook',  es: 'Producto + lookbook' },
        { en: 'Archive + stills',    es: 'Archivo + still' },
        { en: 'Post + color',        es: 'Post + color' },
      ],
    },
    {
      num: '/ 04',
      title: { en: 'Creative Direction', es: 'Dirección Creativa' },
      tags:  { en: 'Brand · Identity · Visual Systems', es: 'Marca · Identidad · Sistemas Visuales' },
      desc:  { en: 'Creative direction in service of clarity and execution. Brand systems built to hold up across surfaces — CRM, content, ops, creative.',
               es: 'Dirección creativa al servicio de la claridad y la ejecución. Sistemas de marca que resisten en todas las superficies.' },
      bullets: [
        { en: 'Visual systems',     es: 'Sistemas visuales' },
        { en: 'Campaign direction', es: 'Dirección de campaña' },
        { en: 'Content strategy',   es: 'Estrategia de contenido' },
        { en: 'Brand voice',        es: 'Voz de marca' },
      ],
    },
  ];

  return (
    <section id="services" data-screen-label="Services" style={{
      minHeight: '100vh',
      padding: '120px clamp(1.5rem, 6vw, 6rem) 80px',
      background: 'var(--cream)',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 12,
          letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'var(--ink-faint)', marginBottom: 16,
        }}>— 02 / {lang === 'en' ? 'Services' : 'Servicios'}</div>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 7vw, 5.5rem)',
          lineHeight: 0.92, letterSpacing: '-0.02em',
          textTransform: 'uppercase', color: 'var(--ink)', margin: 0, marginBottom: 64,
          maxWidth: '20ch',
        }}>
          {lang === 'en' ? 'Four disciplines, one system.' : 'Cuatro disciplinas, un sistema.'}
        </h2>

        <div style={{
          display: 'flex',
          border: '1px solid var(--ink)',
          minHeight: 520,
        }}>
          {services.map((s, i) => {
            const active = i === open;
            return (
              <div key={i}
                onMouseEnter={() => setOpen(i)}
                onClick={() => setOpen(i)}
                style={{
                  flex: active ? 3 : 0.8,
                  padding: active ? '40px 36px' : '40px 24px',
                  borderRight: i < services.length - 1 ? '1px solid var(--ink)' : 'none',
                  background: active ? 'var(--cream-warm)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'flex 0.6s cubic-bezier(0.16,1,0.3,1), background 0.4s, padding 0.4s',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  minWidth: 0, overflow: 'hidden',
                }}>
                <div>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                    fontFamily: 'var(--font-mono)', fontSize: 11,
                    letterSpacing: '0.3em', textTransform: 'uppercase',
                    color: active ? 'var(--accent)' : 'var(--ink-faint)',
                    marginBottom: 28,
                  }}>
                    <span>{s.num}</span>
                    <span style={{ opacity: active ? 1 : 0 }}>↗</span>
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: active ? 'clamp(2.5rem, 4vw, 3.5rem)' : 'clamp(1.75rem, 2.5vw, 2.5rem)',
                    lineHeight: 0.95, letterSpacing: '-0.02em',
                    textTransform: 'uppercase', color: 'var(--ink)',
                    margin: 0, marginBottom: 12,
                    transition: 'font-size 0.4s',
                    writingMode: active ? 'horizontal-tb' : 'horizontal-tb',
                  }}>{s.title[lang]}</h3>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 11,
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: 'var(--ink-muted)', marginBottom: 28,
                  }}>{s.tags[lang]}</div>

                  {active && (
                    <>
                      <p style={{
                        fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7,
                        color: 'var(--ink-soft)', maxWidth: 420, marginTop: 12,
                      }}>{s.desc[lang]}</p>

                      <ul style={{
                        listStyle: 'none', padding: 0, margin: '28px 0 0',
                        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 24px',
                      }}>
                        {s.bullets.map((b, j) => (
                          <li key={j} style={{
                            fontFamily: 'var(--font-mono)', fontSize: 11,
                            letterSpacing: '0.15em', textTransform: 'uppercase',
                            color: 'var(--ink)',
                            display: 'flex', gap: 8,
                          }}>
                            <span style={{ color: 'var(--accent)' }}>/</span>{b[lang]}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

window.Services = Services;
