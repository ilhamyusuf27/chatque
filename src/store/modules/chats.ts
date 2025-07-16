import type { ChatState, RootState, CustomerChatRooms, ApiResponse, Message } from '@/store/types'
import type { ActionTree, GetterTree, Module, MutationTree } from 'vuex/types/index.js'
import { ChatActions, ChatGetter, ChatMutations } from '../enums/ChatsEnums'
import { isFileMessage } from '@/utils/helpers'

const state: ChatState = {
  customerChatRoom: [],
  isLoading: false,
  errorMessage: null,
  activeRoomId: null,
  messageByRoom: {},
}

const getters: GetterTree<ChatState, RootState> = {
  [ChatGetter.GET_ALL_CUSTOMER_CHAT_ROOM]: (state: ChatState): CustomerChatRooms[] =>
    state.customerChatRoom,
  [ChatGetter.GET_CUSTOMER_CHAT_ROOM]: (state: ChatState) => {
    console.log(
      'find',
      state.customerChatRoom.find((chatRoom) => chatRoom.room_id === state.activeRoomId),
      state.activeRoomId,
    )
    return state.customerChatRoom.find((chatRoom) => chatRoom.room_id === state.activeRoomId)
  },
  [ChatGetter.GET_MESSAGE_DATA]: (state: ChatState): Message[] => {
    if (!state.activeRoomId) return []
    return state.messageByRoom[state.activeRoomId] || []
  },
  [ChatGetter.GET_ACTIVE_ROOM_ID]: (state: ChatState): string | null => state.activeRoomId,
}

const mutations: MutationTree<ChatState> = {
  [ChatMutations.SET_CUSTOMER_CHAT_ROOM](state, chatRooms: CustomerChatRooms[]) {
    state.customerChatRoom = chatRooms
  },
  [ChatMutations.SET_LOADING](state, status: boolean) {
    state.isLoading = status
  },
  [ChatMutations.SET_ERROR_MESSAGE](state, message: string | null) {
    state.errorMessage = message
  },
  [ChatMutations.SET_ACTIVE_CHAT](state: ChatState, activeRoomId: string | null) {
    state.activeRoomId = activeRoomId
  },
  [ChatMutations.ADD_MESSAGE_FOR_ROOM](
    state: ChatState,
    payload: { roomId: string; message: Message[] },
  ) {
    console.log('mutations', payload)
    const existingMessages = state.messageByRoom[payload.roomId] || []
    const updatedMessages = [...existingMessages, ...(payload.message || [])]

    state.messageByRoom = {
      ...state.messageByRoom,
      [payload.roomId]: updatedMessages,
    }
  },
}

const actions: ActionTree<ChatState, RootState> = {
  async [ChatActions.GET_ALL_CUSTOMER_CHAT_ROOM]({ commit }) {
    commit(ChatMutations.SET_LOADING, true)
    try {
      const response = await fetch('/data/list_rooms.json')

      if (!response.ok) {
        throw new Error(`Gagal mengambil data, status ${response.status}`)
      }

      const result: ApiResponse<{ customer_rooms: CustomerChatRooms[] }> = await response.json()
      commit(ChatMutations.SET_CUSTOMER_CHAT_ROOM, result.data.customer_rooms)
      commit(ChatMutations.SET_ERROR_MESSAGE, null)
    } catch (error: any) {
      console.error(error)
      commit(ChatMutations.SET_ERROR_MESSAGE, error.message)
    } finally {
      commit(ChatMutations.SET_LOADING, false)
    }
  },

  [ChatActions.SELECT_ROOM]({ commit, state }, payload: CustomerChatRooms) {
    if (!state.messageByRoom[payload.room_id]) {
      const type = isFileMessage(payload.last_comment_text) ? 'file' : 'text'
      const hasText = Boolean(payload.last_comment_text)
      console.log('selectroom', payload, hasText)

      const newMessageData: Message[] = hasText
        ? [
            {
              id: 1,
              text: payload.last_comment_text || '',
              type,
              timestamp: payload.last_comment_timestamp,
              direction: payload.last_comment_sender_type,
            },
          ]
        : []

      console.log('actions', {
        payload,
        roomId: payload.room_id,
        message: newMessageData,
      })

      commit(ChatMutations.ADD_MESSAGE_FOR_ROOM, {
        roomId: payload.room_id,
        message: newMessageData,
      })
    }
    commit(ChatMutations.SET_ACTIVE_CHAT, payload.room_id)
  },
}

const chatsModules: Module<ChatState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}

export default chatsModules
