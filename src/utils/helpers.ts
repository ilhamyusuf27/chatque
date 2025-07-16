export function generateAltFromUrl(url: string) {
  const filename = url.split('/').pop()
  if (!filename) return 'Image'

  const nameWithExt = filename.split('.')[0]
  const parts = nameWithExt.split('-')

  const alt = parts[parts.length - 1]

  return alt.charAt(0).toUpperCase() + alt.slice(1)
}

export function isFileMessage(content: string): boolean {
  const fileRegex = /^https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|pdf|docx|mp4|mp3)(\?.*)?$/i
  console.log('content', typeof content === 'string' && fileRegex.test(content))
  return typeof content === 'string' && fileRegex.test(content.split(' ')[1])
}
