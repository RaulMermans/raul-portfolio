interface RevealProps {
  children: React.ReactNode
  delay?: 1 | 2 | 3
}

export default function Reveal({ children, delay }: RevealProps) {
  return (
    <div
      className={`reveal ${delay ? `reveal-delay-${delay}` : ''}`}
    >
      {children}
    </div>
  )
}
