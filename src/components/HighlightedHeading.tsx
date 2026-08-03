import React from 'react'

/**
 * Zamienia *tekst w gwiazdkach* na różowy akcent — tak jak w Figmie
 * („dla *dziecięcych ekip*"). Dzięki temu redaktor nie potrzebuje HTML-a.
 */
export const HighlightedHeading = ({ text }: { text: string }) => (
  <>
    {text.split(/(\*[^*]+\*)/g).map((part, index) =>
      part.startsWith('*') && part.endsWith('*') && part.length > 2 ? (
        <span className="accent" key={index}>
          {part.slice(1, -1)}
        </span>
      ) : (
        <React.Fragment key={index}>{part}</React.Fragment>
      ),
    )}
  </>
)
