'use client'

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
    // Split text by keywords and wrap matches in <strong>
    let result = text
    keywords.forEach((keyword) => {
      const regex = new RegExp(`(${keyword})`, 'gi')
      result = result.replace(regex, '<strong>$1</strong>')
    })
    return <span dangerouslySetInnerHTML={{ __html: result }} />
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

