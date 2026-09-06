interface BoldTextProps {
  text: string
  keywords?: string[]
}

/**
 * Renders text with specified keywords in bold
 * If keywords are provided, they'll be bolded. Otherwise, looks for **text** format.
 */
export default function BoldText({ text, keywords }: BoldTextProps) {
  if (keywords && keywords.length > 0) {
    const normalizedKeywords = [...new Set(keywords.filter(Boolean))].sort((a, b) => b.length - a.length)
    if (normalizedKeywords.length === 0) return <>{text}</>

    const escapedKeywords = normalizedKeywords.map((keyword) => keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    const parts = text.split(new RegExp(`(${escapedKeywords.join('|')})`, 'gi'))
    const keywordSet = new Set(normalizedKeywords.map((keyword) => keyword.toLocaleLowerCase()))

    return (
      <>
        {parts.map((part, index) =>
          keywordSet.has(part.toLocaleLowerCase()) ? <strong key={index}>{part}</strong> : <span key={index}>{part}</span>
        )}
      </>
    )
  }

  // Support **text** markdown-style syntax
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          const boldText = part.slice(2, -2)
          return <strong key={index}>{boldText}</strong>
        }
        return <span key={index}>{part}</span>
      })}
    </>
  )
}
