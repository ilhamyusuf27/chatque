interface Meta {
  current_total: number
  cursor_after: string | null
  cursor_before: string | null
}

export interface ApiResponse<T> {
  data: T
  meta: Meta
  status: number
}

export interface CustomerChatRooms {
  channel_id: number
  contact_id: number
  id: number
  is_calling: boolean
  is_handled_by_bot: boolean
  is_resolved: boolean
  is_waiting: boolean
  last_comment_sender: string
  last_comment_sender_type: 'sent' | 'receive' | 'system' | 'customer' | 'admin'
  last_comment_text: string
  last_comment_timestamp: string
  last_customer_comment_text: string | null
  last_customer_timestamp: string
  name: string
  room_badge: null
  room_id: string
  room_type: string
  source: string
  user_avatar_url: string
  user_id: string
}

export interface Message {
  id: number
  text: string
  type: 'text' | 'file' | 'image' | 'product'
  timestamp: string
  direction: 'sent' | 'receive' | 'system' | 'customer' | 'admin'
  price?: number
  productName?: string
}

export interface ChatState {
  customerChatRoom: CustomerChatRooms[]
  isLoading: boolean
  errorMessage: string | null
  activeRoomId: string | null
  messageByRoom: {
    [key: string]: Message[]
  }
}

export interface RootState {
  chats: ChatState
}
