// Shared Button component — hairline, uppercase mono label, arrow suffix, hover lift.
function Button({ variant = 'ghost', children, onClick, href }) {
  const [hover, setHover] = React.useState(false);

  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 12,
    padding: '16px 32px', minHeight: 52, boxSizing: 'border-box',
    fontFamily: 'var(--font-mono)', fontSize: 13,
    letterSpacing: '0.2em', textTransform: 'uppercase',
    border: '1px solid var(--ink)',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
    transform: hover ? 'translateY(-3px)' : 'translateY(0)',
    boxShadow: hover ? '0 6px 16px rgba(196,30,58,0.20)' : 'none',
  };

  const variants = {
    primary: {
      background: hover ? 'var(--accent)' : 'var(--ink)',
      color: 'var(--cream)',
      borderColor: hover ? 'var(--accent)' : 'var(--ink)',
    },
    ghost: {
      background: hover ? 'rgba(196,30,58,0.06)' : 'transparent',
      color: hover ? 'var(--accent)' : 'var(--ink)',
      borderColor: hover ? 'var(--accent)' : 'var(--ink)',
    },
    ghostDark: {
      background: hover ? 'rgba(196,30,58,0.12)' : 'transparent',
      color: hover ? 'var(--accent)' : 'var(--cream)',
      borderColor: hover ? 'var(--accent)' : 'var(--cream)',
    },
  };

  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...base, ...variants[variant] }}
    >
      {children}
      <span style={{
        fontSize: 16,
        transform: hover ? 'translateX(4px)' : 'translateX(0)',
        transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
      }}>→</span>
    </Tag>
  );
}

window.Button = Button;
