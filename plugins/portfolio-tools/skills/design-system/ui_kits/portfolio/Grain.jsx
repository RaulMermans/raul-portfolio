// Fixed-position fractal-noise overlay applied brand-wide.
// z-index 500 · opacity 0.03 · mix-blend multiply.
function Grain() {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 500,
        opacity: 0.04,
        mixBlendMode: 'multiply',
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0'/></filter><rect width='180' height='180' filter='url(%23n)'/></svg>\")",
      }}
    />
  );
}

window.Grain = Grain;
