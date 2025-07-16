import type { Message } from '@/store/types'

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
  return typeof content === 'string' && fileRegex.test(content.split(' ')[1])
}

export const getInitialMessages = (): { [key: string]: Message[] } => {
  try {
    const savedMessages = localStorage.getItem('chatMessages')
    return savedMessages ? JSON.parse(savedMessages) : {}
  } catch (error) {
    console.error('Gagal memuat pesan dari localStorage:', error)
    return {}
  }
}
