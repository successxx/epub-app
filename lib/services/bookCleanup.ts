// Utility functions to clean up book content

export function cleanTitle(title: string): string {
  // Remove leading asterisks and spaces
  return title
    .replace(/^\*+\s*/, '') // Remove leading asterisks
    .replace(/\*+$/, '') // Remove trailing asterisks
    .replace(/\s+/g, ' ') // Normalize spaces
    .trim()
}

export function cleanFilename(title: string): string {
  // Clean title first
  const cleaned = cleanTitle(title)

  // Convert to filename-safe format
  return cleaned
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_') // Replace non-alphanumeric with underscore
    .replace(/^_+|_+$/g, '') // Remove leading/trailing underscores
    .replace(/_+/g, '_') // Replace multiple underscores with single
    .substring(0, 100) // Limit length
}

export function cleanChapterContent(content: string): string {
  // Remove any parsing artifacts but preserve intentional formatting
  return content
    .replace(/h2\d+:\s*/g, '') // Remove chapter header markers
    .replace(/content\d+:\s*/g, '') // Remove content markers
    .replace(/###/g, '') // Remove parsing delimiters
    .trim()
}

export function formatMarkdownToHtml(text: string): string {
  // Split into paragraphs
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim())

  // Process each paragraph with formatting
  const formattedParagraphs = paragraphs.map(paragraph => {
    let formatted = paragraph.trim()

    // Convert **bold** to <strong> tags
    formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')

    // Convert *italic* to <em> tags (but not if it's part of **bold**)
    formatted = formatted.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em>$1</em>')

    // Add premium paragraph styling
    return `<p class="premium-paragraph">${formatted}</p>`
  })

  return formattedParagraphs.join('\n')
}