// Fixed top header. Transparent at scroll 0 → cream after scroll.
function Header({ lang, setLang, activeSection, onNav }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 'work',     en: 'Work',     es: 'Trabajo' },
    { id: 'services', en: 'Services', es: 'Servicios' },
    { id: 'about',    en: 'About',    es: 'Acerca' },
    { id: 'contact',  en: 'Contact',  es: 'Contacto' },
  ];

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      height: 80,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 clamp(1.5rem, 4vw, 3rem)',
      background: scrolled ? 'rgba(245, 240, 235, 0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px) saturate(180%)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(26,23,20,0.06)' : '1px solid transparent',
      transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
      zIndex: 100,
    }}>
      <a onClick={() => onNav('top')} style={{
        fontFamily: 'var(--font-display)', fontSize: 32, lineHeight: 1,
        letterSpacing: '-0.02em', color: 'var(--ink)', cursor: 'pointer',
        textDecoration: 'none',
      }}>RM</a>

      <nav style={{ display: 'flex', gap: 32 }}>
        {links.map(l => {
          const active = activeSection === l.id;
          return (
            <a key={l.id} onClick={() => onNav(l.id)} style={{
              position: 'relative', cursor: 'pointer',
              fontFamily: 'var(--font-mono)', fontSize: 12,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: active ? 'var(--ink)' : 'var(--ink-muted)',
              paddingBottom: 4,
              transition: 'color 0.3s cubic-bezier(0.16,1,0.3,1)',
            }}>
              {lang === 'en' ? l.en : l.es}
              <span style={{
                position: 'absolute', left: 0, right: 0, bottom: 0,
                height: 1.5, background: 'currentColor',
                transform: active ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
              }}/>
            </a>
          );
        })}
      </nav>

      <div style={{
        display: 'flex', gap: 6,
        fontFamily: 'var(--font-mono)', fontSize: 11,
        letterSpacing: '0.2em', textTransform: 'uppercase',
      }}>
        <span onClick={() => setLang('en')} style={{ cursor: 'pointer', color: lang==='en' ? 'var(--ink)' : 'var(--ink-faint)' }}>EN</span>
        <span style={{ color: 'var(--ink-faint)' }}>·</span>
        <span onClick={() => setLang('es')} style={{ cursor: 'pointer', color: lang==='es' ? 'var(--ink)' : 'var(--ink-faint)' }}>ES</span>
      </div>
    </header>
  );
}

window.Header = Header;
