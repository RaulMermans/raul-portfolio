// Hero — full-viewport intro. Radial warm glow behind the text.
function Hero({ lang, onNav }) {
  const copy = {
    en: {
      eyebrow: 'Raúl Mermans — AI Systems · Agents · Automation',
      title1: 'Designing',
      title2: 'AI Systems',
      title3: 'for Modern',
      title4: 'Brands.',
      lede: 'Applied AI systems that turn repetitive, judgment-heavy work into reliable execution — agents, orchestration, and decision flows built for real teams, not demo theatre.',
      cta1: 'Start a Project',
      cta2: 'View Work',
      scroll: 'Scroll',
    },
    es: {
      eyebrow: 'Raúl Mermans — Sistemas IA · Agentes · Automatización',
      title1: 'Diseñando',
      title2: 'Sistemas IA',
      title3: 'para Marcas',
      title4: 'Modernas.',
      lede: 'Sistemas de IA aplicada que convierten trabajo repetitivo y de juicio en ejecución fiable — agentes, orquestación y flujos de decisión para equipos reales.',
      cta1: 'Empezar proyecto',
      cta2: 'Ver trabajo',
      scroll: 'Desliza',
    }
  }[lang];

  return (
    <section id="top" data-screen-label="Hero" style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      padding: '120px clamp(1.5rem, 6vw, 6rem) 80px',
      overflow: 'hidden',
    }}>
      {/* warm radial glow */}
      <div aria-hidden style={{
        position: 'absolute',
        top: '30%', right: '-10%',
        width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(255,170,136,0.35) 0%, rgba(255,181,160,0.15) 40%, transparent 70%)',
        filter: 'blur(80px)',
        animation: 'glowPulse 8s ease-in-out infinite',
        pointerEvents: 'none',
      }}/>
      <div aria-hidden style={{
        position: 'absolute',
        bottom: '10%', left: '-5%',
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(232,208,200,0.4) 0%, transparent 70%)',
        filter: 'blur(100px)',
        pointerEvents: 'none',
      }}/>

      <div style={{ maxWidth: 1200, width: '100%', position: 'relative', zIndex: 2 }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 12,
          letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'var(--ink-faint)', marginBottom: 32,
        }}>— {copy.eyebrow}</div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(4rem, 11vw, 10rem)',
          lineHeight: 0.88,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color: 'var(--ink)',
          margin: 0,
          maxWidth: '18ch',
        }}>
          {copy.title1}<br/>
          <span style={{ color: 'var(--ink-soft)' }}>{copy.title2}</span><br/>
          {copy.title3}<br/>
          {copy.title4}
        </h1>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(1rem, 1.4vw, 1.25rem)',
          lineHeight: 1.6,
          color: 'var(--ink-soft)',
          maxWidth: 560,
          marginTop: 48,
        }}>{copy.lede}</p>

        <div style={{ display: 'flex', gap: 16, marginTop: 48, flexWrap: 'wrap' }}>
          <Button variant="primary" onClick={() => onNav('contact')}>{copy.cta1}</Button>
          <Button variant="ghost" onClick={() => onNav('work')}>{copy.cta2}</Button>
        </div>
      </div>

      {/* scroll hint */}
      <div style={{
        position: 'absolute',
        bottom: 40, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        fontFamily: 'var(--font-mono)', fontSize: 11,
        letterSpacing: '0.3em', textTransform: 'uppercase',
        color: 'var(--ink-faint)',
      }}>
        <span>{copy.scroll}</span>
        <div style={{ width: 1, height: 40, background: 'var(--ink-faint)', animation: 'scrollLine 2s ease-in-out infinite' }}/>
      </div>

      <style>{`
        @keyframes glowPulse { 0%,100%{opacity:0.8;transform:scale(1)} 50%{opacity:1;transform:scale(1.05)} }
        @keyframes scrollLine { 0%,100%{transform:scaleY(1);opacity:1} 50%{transform:scaleY(0.3);opacity:0.3} }
      `}</style>
    </section>
  );
}

window.Hero = Hero;
