// Contact — glass card form on warm-glow background.
function Contact({ lang }) {
  const [form, setForm] = React.useState({ name: '', email: '', company: '', project: 'AI Systems', message: '' });
  const [status, setStatus] = React.useState('idle'); // idle | sending | sent
  const [focus, setFocus] = React.useState(null);

  const copy = {
    en: {
      eyebrow: '04 / Contact',
      title: "Let's Build the Right System.",
      lede: 'Short brief, long context, or a specific problem — send what you have. I reply within two working days.',
      labels: { name: 'Name', email: 'Email', company: 'Company', project: 'Project Type', message: 'Message' },
      types: ['AI Systems', 'Web Development', 'Photography', 'Creative Direction', 'Something Else'],
      send: 'Send Message',
      sent: 'Received — talk soon',
      sending: 'Sending…',
    },
    es: {
      eyebrow: '04 / Contacto',
      title: 'Construyamos el sistema correcto.',
      lede: 'Brief corto, contexto largo, o un problema específico — envía lo que tengas. Respondo en dos días laborables.',
      labels: { name: 'Nombre', email: 'Email', company: 'Empresa', project: 'Tipo de Proyecto', message: 'Mensaje' },
      types: ['Sistemas IA', 'Desarrollo Web', 'Fotografía', 'Dirección Creativa', 'Otra cosa'],
      send: 'Enviar mensaje',
      sent: 'Recibido — hablamos pronto',
      sending: 'Enviando…',
    },
  }[lang];

  const inputStyle = (name) => ({
    width: '100%', boxSizing: 'border-box',
    padding: '14px 16px',
    background: 'var(--cream-light)',
    border: `1px solid ${focus === name ? 'var(--accent)' : 'var(--cream-dark)'}`,
    borderRadius: 8,
    fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--ink)',
    outline: 'none',
    boxShadow: focus === name ? '0 0 0 4px rgba(196,30,58,0.10)' : '0 2px 8px rgba(26,23,20,0.04)',
    transition: 'border-color 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s',
  });
  const labelStyle = {
    display: 'block',
    fontFamily: 'var(--font-mono)', fontSize: 11,
    letterSpacing: '0.2em', textTransform: 'uppercase',
    color: 'var(--ink-faint)', marginBottom: 8,
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 900);
  };

  return (
    <section id="contact" data-screen-label="Contact" style={{
      minHeight: '100vh',
      padding: '120px clamp(1.5rem, 6vw, 6rem) 80px',
      background: 'var(--cream)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* warm glow */}
      <div aria-hidden style={{
        position: 'absolute',
        top: '10%', left: '50%', transform: 'translateX(-50%)',
        width: 900, height: 900,
        background: 'radial-gradient(circle, rgba(255,170,136,0.30) 0%, rgba(255,181,160,0.15) 40%, transparent 70%)',
        filter: 'blur(120px)',
        animation: 'glowPulse 8s ease-in-out infinite',
        pointerEvents: 'none',
      }}/>

      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 1200, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'minmax(260px, 420px) 1fr',
        gap: 'clamp(40px, 7vw, 96px)', alignItems: 'flex-start',
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 12,
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'var(--ink-faint)', marginBottom: 16,
          }}>— {copy.eyebrow}</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            lineHeight: 0.95, letterSpacing: '-0.02em',
            textTransform: 'uppercase', color: 'var(--ink)',
            margin: 0, marginBottom: 24,
          }}>{copy.title}</h2>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 17, lineHeight: 1.7,
            color: 'var(--ink-soft)', maxWidth: '42ch', margin: 0,
          }}>{copy.lede}</p>

          <div style={{
            marginTop: 40, display: 'flex', flexDirection: 'column', gap: 10,
            fontFamily: 'var(--font-mono)', fontSize: 12,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'var(--ink)',
          }}>
            <a href="mailto:hola@raulmermans.com" style={{ color: 'inherit', textDecoration: 'none', borderBottom: '1px solid currentColor', alignSelf: 'flex-start' }}>hola@raulmermans.com</a>
            <span style={{ color: 'var(--ink-muted)' }}>Spain · GMT+1</span>
          </div>
        </div>

        {/* glass form */}
        <form onSubmit={submit} style={{
          background: 'rgba(245, 240, 235, 0.7)',
          backdropFilter: 'blur(12px) saturate(180%)',
          WebkitBackdropFilter: 'blur(12px) saturate(180%)',
          border: '1px solid rgba(26,23,20,0.08)',
          borderRadius: 16,
          padding: 'clamp(24px, 4vw, 40px)',
          boxShadow: '0 8px 32px rgba(26,23,20,0.08), 0 2px 8px rgba(26,23,20,0.04)',
          display: 'grid', gap: 20,
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>{copy.labels.name}</label>
              <input style={inputStyle('name')} value={form.name}
                onFocus={() => setFocus('name')} onBlur={() => setFocus(null)}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>{copy.labels.email}</label>
              <input type="email" style={inputStyle('email')} value={form.email}
                onFocus={() => setFocus('email')} onBlur={() => setFocus(null)}
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>{copy.labels.company}</label>
            <input style={inputStyle('company')} value={form.company}
              onFocus={() => setFocus('company')} onBlur={() => setFocus(null)}
              onChange={(e) => setForm({ ...form, company: e.target.value })} />
          </div>

          <div>
            <label style={labelStyle}>{copy.labels.project}</label>
            <select style={inputStyle('project')} value={form.project}
              onFocus={() => setFocus('project')} onBlur={() => setFocus(null)}
              onChange={(e) => setForm({ ...form, project: e.target.value })}>
              {copy.types.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label style={labelStyle}>{copy.labels.message}</label>
            <textarea rows={5} style={{ ...inputStyle('message'), resize: 'vertical', minHeight: 120 }}
              value={form.message}
              onFocus={() => setFocus('message')} onBlur={() => setFocus(null)}
              onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginTop: 8 }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: status === 'sent' ? 'var(--accent)' : 'var(--ink-faint)',
              transition: 'color 0.3s',
            }}>
              {status === 'idle' && '— required: name · email · message'}
              {status === 'sending' && copy.sending}
              {status === 'sent' && `✓ ${copy.sent}`}
            </span>
            <Button variant="primary" onClick={submit}>{copy.send}</Button>
          </div>
        </form>
      </div>
    </section>
  );
}

window.Contact = Contact;
