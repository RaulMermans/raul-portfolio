export default function PortfolioIntro({ title }: { title: string }) {
  const [first, ...rest] = title.split(' ')

  return (
    <header className="portfolio-intro" id="top">
      <h1 aria-label={title}>
        <span aria-hidden="true">{first} </span>
        <span aria-hidden="true">{rest.join(' ')}</span>
      </h1>
    </header>
  )
}
